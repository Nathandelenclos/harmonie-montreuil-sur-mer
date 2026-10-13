const { test, mock, afterEach } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const { ReceiveSubmissionUseCase } = require('../src/submissions/application/use-cases/receive-submission.ts');
const { SmtpSubmissionNotifier } = require('../src/submissions/infrastructure/smtp-submission-notifier.ts');
const nodemailer = require('nodemailer');
afterEach(() => mock.restoreAll());
const input = { id: crypto.randomUUID(), source: 'contact', name: 'Visiteur', email: 'visitor@example.test', subject: 'Question', text: 'Bonjour' };
function fixture() {
  const inbox = new Map(); let notifications = 0;
  const repository = { receive: async entry => { if (inbox.has(entry.id)) return false; inbox.set(entry.id, { ...entry }); return true; }, recordNotification: async (id, notification) => { inbox.get(id).notification = notification; } };
  const notifier = { send: async () => { notifications++; } };
  return { inbox, repository, notifier, notifications: () => notifications, receive: new ReceiveSubmissionUseCase(repository, notifier) };
}
test('given a valid request, receiving it makes it available before notifying the association', async () => {
  const f = fixture(); f.notifier.send = async () => assert.equal(f.inbox.get(input.id).text, 'Bonjour');
  await f.receive.execute(input); assert.equal(f.inbox.get(input.id).notification, 'sent');
});
test('given an SMTP outage, a received request remains available to the editors', async () => {
  const f = fixture(); f.notifier.send = async () => { throw new Error('offline'); };
  await f.receive.execute(input); assert.equal(f.inbox.get(input.id).text, 'Bonjour'); assert.equal(f.inbox.get(input.id).notification, 'failed');
});
test('given a lost response, retrying the same request produces one inbox message', async () => {
  const f = fixture(); await Promise.all([f.receive.execute(input), f.receive.execute(input)]);
  assert.equal(f.inbox.size, 1); assert.equal(f.notifications(), 1);
});
test('given unavailable storage, the request fails without sending a notification', async () => {
  const f = fixture(); f.repository.receive = async () => { throw new Error('offline'); };
  await assert.rejects(() => f.receive.execute(input)); assert.equal(f.notifications(), 0);
});
test('given a notification tracking outage, the accepted request stays accepted', async () => {
  const f = fixture(); f.repository.recordNotification = async () => { throw new Error('offline'); };
  await f.receive.execute(input); assert.equal(f.inbox.size, 1);
});
test('notification always targets the association and uses the visitor as reply address', async () => {
  Object.assign(process.env, { SMTP_HOST: 'smtp.example.test', SMTP_PORT: '465', SMTP_USER: 'sender@example.test', SMTP_PASS: 'test-only' });
  const sent = []; mock.method(nodemailer, 'createTransport', () => ({ sendMail: async message => sent.push(message) }));
  await new SmtpSubmissionNotifier().send(input);
  assert.equal(sent[0].to, 'harmoniemontreuilsurmer@orange.fr'); assert.equal(sent[0].replyTo, input.email);
  assert.equal(sent[0].disableFileAccess, true); assert.equal(sent[0].disableUrlAccess, true);
});
