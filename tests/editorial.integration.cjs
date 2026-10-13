const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { randomBytes } = require('node:crypto');
const { createClient } = require('@supabase/supabase-js');
require('./register.cjs');
const { emptyContent } = require('../src/editorial/domain/content.ts');
const { SupabaseContentRepository } = require('../src/editorial/infrastructure/supabase-content-repository.ts');
const { SaveContentUseCase, PublishContentUseCase } = require('../src/editorial/application/use-cases/content-use-cases.ts');

let admin, editor, outsider, anon, repository;
const users = [], entries = [], files = [];
before(async () => {
  const config = JSON.parse(execFileSync('npx', ['-y', 'supabase@latest', 'status', '--output', 'json'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }));
  assert.match(config.API_URL, /^http:\/\/(127\.0\.0\.1|localhost):/);
  admin = createClient(config.API_URL, config.SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  anon = createClient(config.API_URL, config.ANON_KEY, { auth: { persistSession: false } });
  for (const role of ['editor', 'outsider']) {
    const email = `${role}-${randomBytes(5).toString('hex')}@example.test`;
    const password = randomBytes(24).toString('base64url');
    const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
    assert.ifError(error); users.push(data.user.id);
    if (role === 'editor') assert.ifError((await admin.from('editorial_editors').insert({ user_id: data.user.id })).error);
    const client = createClient(config.API_URL, config.ANON_KEY, { auth: { persistSession: false } });
    assert.ifError((await client.auth.signInWithPassword({ email, password })).error);
    if (role === 'editor') editor = client; else outsider = client;
  }
  repository = new SupabaseContentRepository(editor);
});
after(async () => {
  if (!admin) return;
  for (const id of entries) { await admin.from('published_content').delete().eq('id', id); await admin.from('editorial_entries').delete().eq('id', id); }
  if (files.length) await admin.storage.from('editorial-images').remove(files);
  for (const id of users) await admin.auth.admin.deleteUser(id);
});
const draft = () => ({ ...emptyContent(), title: 'Concert test', slug: 'test-' + randomBytes(8).toString('hex'), description: 'Programme initial', date: '2027-05-01T18:00:00Z', archiveAfter: '2027-05-02T00:00:00Z', location: 'Montreuil', price: 'Gratuit' });
async function create() { const entry = await repository.save({ kind: 'event', content: draft() }); entries.push(entry.id); return entry; }

test('an authorized editor can save a private draft without publishing it', async () => {
  const entry = await create();
  assert.equal((await repository.get(entry.id)).draft.title, 'Concert test');
  assert.deepEqual((await anon.from('published_content').select('*').eq('id', entry.id)).data, []);
  for (const client of [anon, outsider]) {
    const result = await client.from('editorial_entries').select('*').eq('id', entry.id);
    assert.ok(result.error || result.data.length === 0);
  }
});
test('an authenticated outsider cannot create, publish or grant themselves editorial access', async () => {
  const entry = await create();
  assert.ok((await outsider.from('editorial_entries').insert({ kind: 'event', slug: 'forbidden', draft: draft() })).error);
  assert.ok((await outsider.rpc('transition_content', { entry_id: entry.id, expected_version: 1, action: 'publish' })).error);
  assert.ok((await outsider.from('editorial_editors').insert({ user_id: users[1] })).error);
  assert.equal((await repository.get(entry.id)).version, 1);
  assert.deepEqual((await anon.from('published_content').select('*').eq('id', entry.id)).data, []);
});
test('editing a published concert preserves the public version until explicit publication', async () => {
  let entry = await create();
  assert.equal((await new PublishContentUseCase(repository).execute({ id: entry.id, version: entry.version })).ok, true);
  entry = await repository.get(entry.id);
  assert.equal(entry.published_version, entry.version);
  entry = await repository.save({ id: entry.id, version: entry.version, kind: entry.kind, content: { ...entry.draft, title: 'Nouveau programme' } });
  assert.equal((await anon.from('published_content').select('data').eq('id', entry.id).single()).data.data.title, 'Concert test');
  await repository.publish(entry.id, entry.version);
  assert.equal((await anon.from('published_content').select('data').eq('id', entry.id).single()).data.data.title, 'Nouveau programme');
});
test('concurrent editors cannot overwrite a newer draft or publish an obsolete version', async () => {
  const entry = await create();
  const command = { id: entry.id, version: entry.version, kind: entry.kind, content: { ...entry.draft, title: 'Newer' } };
  await repository.save(command);
  await assert.rejects(() => repository.save({ ...command, content: { ...entry.draft, title: 'Stale' } }), /autre session/);
  await assert.rejects(() => repository.publish(entry.id, entry.version), /autre session/);
  assert.equal((await repository.get(entry.id)).draft.title, 'Newer');
});
test('unpublishing removes a concert from the public catalog', async () => {
  let entry = await create(); await repository.publish(entry.id, entry.version);
  entry = await repository.get(entry.id); await repository.unpublish(entry.id, entry.version);
  assert.deepEqual((await anon.from('published_content').select('*').eq('id', entry.id)).data, []);
  assert.equal((await repository.get(entry.id)).draft.title, 'Concert test');
});
test('an address remains stable after its first publication', async () => {
  let entry = await create(); await repository.publish(entry.id, entry.version);
  entry = await repository.get(entry.id); await repository.unpublish(entry.id, entry.version);
  entry = await repository.get(entry.id);
  await assert.rejects(() => repository.save({ id: entry.id, version: entry.version, kind: entry.kind, content: { ...entry.draft, slug: 'new-url' } }));
  assert.equal((await repository.get(entry.id)).draft.slug, entry.draft.slug);
});
test('an unpublished draft can be deleted', async () => {
  const entry = await create(); await repository.remove(entry.id, entry.version);
  assert.equal(await repository.get(entry.id), null);
});
test('an album preserves ordered captions and its cover after saving and publishing', async () => {
  const photos = [
    { src: '/assets/montreuil.jpg', title: 'Notre ville', width: 1600, height: 900 },
    { src: '/assets/sainte-cecile-2025.jpg', title: 'Notre concert', width: 1200, height: 800 }
  ];
  const result = await new SaveContentUseCase(repository).execute({ kind: 'album', content: { ...emptyContent(), title: 'Souvenirs', slug: 'album-' + randomBytes(8).toString('hex'), photos: photos.toReversed(), image: photos[0] } });
  assert.equal(result.ok, true); entries.push(result.entry.id);
  const reloaded = await repository.get(result.entry.id);
  assert.deepEqual(reloaded.draft.photos.map(photo => photo.title), ['Notre concert', 'Notre ville']);
  assert.equal(reloaded.draft.image.src, photos[0].src);
  await new PublishContentUseCase(repository).execute({ id: reloaded.id, version: reloaded.version });
  const publicAlbum = (await anon.from('published_content').select('data').eq('id', reloaded.id).single()).data.data;
  assert.deepEqual(publicAlbum.photos, reloaded.draft.photos);
  assert.deepEqual(publicAlbum.image, reloaded.draft.image);
});
test('draft images are private and only become publicly readable when referenced by published content', async () => {
  const sharp = require('sharp');
  const name = `${crypto.randomUUID()}.webp`; files.push(name);
  const image = await sharp({ create: { width: 8, height: 8, channels: 3, background: '#ffffff' } }).webp().toBuffer();
  assert.ifError((await editor.storage.from('editorial-images').upload(name, image, { contentType: 'image/webp' })).error);
  assert.ok((await anon.storage.from('editorial-images').download(name)).error);
  assert.ok((await outsider.storage.from('editorial-images').download(name)).error);
  let entry = await repository.save({ kind: 'event', content: { ...draft(), image: { src: `/media/${name}`, title: '', width: 8, height: 8 } } }); entries.push(entry.id);
  await repository.publish(entry.id, entry.version);
  assert.ifError((await anon.storage.from('editorial-images').download(name)).error);
  entry = await repository.get(entry.id); await repository.unpublish(entry.id, entry.version);
  assert.ok((await anon.storage.from('editorial-images').download(name)).error);
});
test('legacy import is atomic, retryable and never overwrites an edited entry', async () => {
  const content = draft();
  const items = [{ kind: 'event', content }];
  const first = await admin.rpc('import_legacy_content', { items }); assert.ifError(first.error); assert.equal(first.data, 1);
  const entry = (await editor.from('editorial_entries').select('*').eq('slug', content.slug).single()).data; entries.push(entry.id);
  await new SaveContentUseCase(repository).execute({ id: entry.id, version: entry.version, kind: 'event', content: { ...content, title: 'Edited' } });
  assert.equal((await admin.rpc('import_legacy_content', { items })).data, 0);
  assert.equal((await repository.get(entry.id)).draft.title, 'Edited');
  assert.ok((await editor.rpc('import_legacy_content', { items })).error);
});

const { SupabaseSubmissionRepository } = require('../src/submissions/infrastructure/supabase-submission-repository.ts');
const requests = [];
after(async () => { if (admin && requests.length) await admin.from('form_submissions').delete().in('id', requests); });
async function receiveRequest() {
  const input = { id: crypto.randomUUID(), source: 'join', name: 'Visiteur test', email: 'visitor@example.test', subject: 'Rejoindre', text: 'Instrument : flûte' };
  requests.push(input.id);
  const repository = new SupabaseSubmissionRepository(admin);
  assert.equal(await repository.receive(input), true);
  return input;
}
test('an authorized editor can read a received request and mark it as processed', async () => {
  const input = await receiveRequest();
  const repository = new SupabaseSubmissionRepository(editor);
  assert.ok((await repository.list(1)).some(entry => entry.id === input.id && entry.text === input.text));
  await repository.setStatus(input.id, 'processed');
  assert.equal((await editor.from('form_submissions').select('status').eq('id', input.id).single()).data.status, 'processed');
});
for (const actor of ['anonymous', 'outsider']) {
  test(`${actor} cannot read private form submissions`, async () => {
    const input = await receiveRequest(); const client = actor === 'anonymous' ? anon : outsider;
    const result = await client.from('form_submissions').select('*').eq('id', input.id);
    assert.ok(result.error || result.data.length === 0);
  });
  test(`${actor} cannot change the treatment status of a request`, async () => {
    const input = await receiveRequest(); const client = actor === 'anonymous' ? anon : outsider;
    await client.from('form_submissions').update({ status: 'processed' }).eq('id', input.id);
    assert.equal((await admin.from('form_submissions').select('status').eq('id', input.id).single()).data.status, 'new');
  });
  test(`${actor} cannot bypass anti-spam by submitting directly to Supabase`, async () => {
    const input = { id: crypto.randomUUID(), source: 'contact', name: 'Forged', email: 'visitor@example.test', subject: 'Spam', text: 'Spam' };
    requests.push(input.id); const client = actor === 'anonymous' ? anon : outsider;
    assert.ok((await client.rpc('receive_submission', { submission: input })).error);
    assert.ok((await client.from('form_submissions').insert(input)).error);
    assert.equal((await admin.from('form_submissions').select('id').eq('id', input.id)).data.length, 0);
  });
}
test('an editor cannot overwrite the original message or notification outcome', async () => {
  const input = await receiveRequest();
  assert.ok((await editor.from('form_submissions').update({ text: 'Changed', notification: 'sent' }).eq('id', input.id)).error);
  assert.equal((await admin.from('form_submissions').select('text').eq('id', input.id).single()).data.text, input.text);
});
test('concurrent retries create a single received request and reject reuse for different contents', async () => {
  const input = { id: crypto.randomUUID(), source: 'contact', name: 'Visiteur', email: 'visitor@example.test', subject: 'Bonjour', text: 'Question' };
  requests.push(input.id); const repository = new SupabaseSubmissionRepository(admin);
  assert.deepEqual((await Promise.all([repository.receive(input), repository.receive(input)])).sort(), [false, true]);
  await assert.rejects(() => repository.receive({ ...input, text: 'Changed' }));
  const rows = (await admin.from('form_submissions').select('*').eq('id', input.id)).data;
  assert.equal(rows.length, 1); assert.equal(rows[0].text, input.text);
});
