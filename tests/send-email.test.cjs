const { test, beforeEach, mock } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const nodemailer = require('nodemailer');
let POST;
let sent;
const payload = { subject: 'Question', text: 'Bonjour', email: 'visitor@example.org', reCaptchaToken: 'test-token' };
const request = (body = payload, origin = 'https://harmonie-montreuil-sur-mer.fr') => new Request(`${origin}/api/send-email`, { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) });
beforeEach(() => {
  mock.restoreAll();
  delete require.cache[require.resolve('../app/api/send-email/route.ts')];
  POST = require('../app/api/send-email/route.ts').POST;
  process.env.RECAPTCHA_SECRET_KEY = 'test-only';
  process.env.SMTP_HOST = 'smtp.example.org';
  process.env.SMTP_PORT = '465';
  process.env.SMTP_USER = 'sender@example.org';
  process.env.SMTP_PASS = 'test-only';
  sent = [];
  mock.method(nodemailer, 'createTransport', () => ({ sendMail: async message => { sent.push(message); } }));
  mock.method(global, 'fetch', async () => Response.json({ success: true, score: 0.9, action: 'submit_form', hostname: 'harmonie-montreuil-sur-mer.fr' }));
});
test('delivers only to the association, regardless of the submitted recipient', async () => {
  assert.equal((await POST(request({ ...payload, to: 'attacker@example.org', apiSecret: 'ignored' }))).status, 200);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'harmoniemontreuilsurmer@orange.fr');
  assert.equal(sent[0].replyTo, payload.email);
});
test('rejects malformed, oversized and header-injection fields before any delivery', async () => {
  for (const body of [null, [], { ...payload, text: {} }, { ...payload, text: 'x'.repeat(5001) }, { ...payload, subject: 'Subject\r\nBcc: attacker@example.org' }, { ...payload, email: 'not an email' }]) {
    assert.equal((await POST(request(body))).status, 400);
  }
  assert.equal((await POST(new Request('https://harmonie-montreuil-sur-mer.fr/api/send-email', { method: 'POST', headers: { origin: 'https://harmonie-montreuil-sur-mer.fr', 'content-type': 'application/json' }, body: '{' }))).status, 400);
  assert.equal(sent.length, 0);
});
test('rejects a forged origin prefix', async () => {
  assert.equal((await POST(request(payload, 'https://harmonie-montreuil-sur-mer.fr.evil.example'))).status, 403);
  assert.equal(sent.length, 0);
});
test('requires the captcha hostname, action and score', async () => {
  for (const invalid of [{ hostname: 'evil.example' }, { action: 'other' }, { score: 0.1 }, { score: '0.9' }, { success: false }]) {
    mock.method(global, 'fetch', async () => Response.json({ success: true, score: 0.9, action: 'submit_form', hostname: 'harmonie-montreuil-sur-mer.fr', ...invalid }));
    assert.equal((await POST(request())).status, 403);
  }
  assert.equal(sent.length, 0);
});
test('reports captcha and SMTP outages without a false success', async () => {
  mock.method(global, 'fetch', async () => { throw new Error('offline'); });
  assert.equal((await POST(request())).status, 503);
  mock.method(global, 'fetch', async () => Response.json({ success: true, score: 0.9, action: 'submit_form', hostname: 'harmonie-montreuil-sur-mer.fr' }));
  mock.method(nodemailer, 'createTransport', () => ({ sendMail: async () => { throw new Error('smtp offline'); } }));
  assert.equal((await POST(request())).status, 503);
});
test('caps email attempts per server instance and recovers after the window', async () => {
  let now = 1_000_000;
  mock.method(Date, 'now', () => now);
  for (let i = 0; i < 20; i++) assert.equal((await POST(request())).status, 200);
  assert.equal((await POST(request())).status, 429);
  now += 61_000;
  assert.equal((await POST(request())).status, 200);
});
test('rejects a body beyond the byte limit', async () => {
  assert.equal((await POST(request({ ...payload, text: 'x'.repeat(40_000) }))).status, 413);
  assert.equal(sent.length, 0);
});
