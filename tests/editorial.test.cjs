const { test } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const { validateContent, parseVideoUrl, emptyContent, reorderPhoto, canAddPhotos } = require('../src/editorial/domain/content.ts');
const { SaveContentUseCase, PublishContentUseCase } = require('../src/editorial/application/use-cases/content-use-cases.ts');

const concert = () => ({ ...emptyContent(), title: 'Concert de printemps', slug: 'concert-printemps', description: 'Un concert ouvert à tous.', date: '2027-04-10T18:00:00Z', archiveAfter: '2027-04-11T00:00:00Z', location: 'Montreuil', price: 'Entrée libre' });
test('a concert needs a valid date and an archive boundary after its start', () => {
  assert.deepEqual(validateContent('event', concert()), {});
  assert.ok(validateContent('event', { ...concert(), archiveAfter: '2027-04-09T00:00:00Z' }).archiveAfter);
  assert.ok(validateContent('event', { ...concert(), date: 'invalid' }).date);
});
test('links reject executable URLs and video lookalike domains', () => {
  assert.ok(validateContent('event', { ...concert(), bookingUrl: 'javascript:alert(1)' }).bookingUrl);
  for (const url of ['https://youtube.com.evil.test/watch?v=abcdefghijk', 'javascript:alert(1)', 'https://drive.google.com.evil.test/file/d/abc/view']) assert.equal(parseVideoUrl(url), null);
  assert.equal(parseVideoUrl('https://youtu.be/0DapvwTHhz4')?.id, '0DapvwTHhz4');
  assert.equal(parseVideoUrl('https://drive.google.com/file/d/1abcdEFghi/view')?.source, 'https://drive.google.com/file/d/1abcdEFghi/preview');
});
test('moving a photo keeps its caption and does not mutate the original album', () => {
  const photos = [{ src: '/a', title: 'A' }, { src: '/b', title: 'B' }];
  assert.deepEqual(reorderPhoto(photos, 1, -1).map(p => p.title), ['B', 'A']);
  assert.deepEqual(photos.map(p => p.title), ['A', 'B']);
  assert.deepEqual(reorderPhoto(photos, 0, -1), photos);
});
test('saving invalid content has no persistence effect', async () => {
  let writes = 0;
  const useCase = new SaveContentUseCase({ save: async () => { writes++; } });
  const result = await useCase.execute({ kind: 'event', content: emptyContent() });
  assert.equal(result.ok, false);
  assert.equal(writes, 0);
});
test('publishing validates the stored draft and uses its exact version', async () => {
  let published;
  const repository = { get: async () => ({ id: 'entry', kind: 'event', draft: concert(), version: 3 }), publish: async (id, version) => { published = { id, version }; } };
  const result = await new PublishContentUseCase(repository).execute({ id: 'entry', version: 3 });
  assert.equal(result.ok, true);
  assert.deepEqual(published, { id: 'entry', version: 3 });
  published = null;
  assert.equal((await new PublishContentUseCase(repository).execute({ id: 'entry', version: 2 })).ok, false);
  assert.equal(published, null);
});

test('an album accepts up to 500 photos per import', () => {
  assert.equal(canAddPhotos(499, 1), true);
  assert.equal(canAddPhotos(499, 2), false);
});
