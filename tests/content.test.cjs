const { test } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const { partitionEvents } = require('../data/Events.ts');
const { pageMetadata } = require('../lib/metadata.ts');
const sitemap = require('../app/sitemap.ts').default;

test('keeps the concert visible throughout its Paris calendar day, then archives it', () => {
  assert.equal(partitionEvents(new Date('2026-11-28T22:59:59Z')).upcoming.length, 1);
  const result = partitionEvents(new Date('2026-11-28T23:00:00Z'));
  assert.equal(result.upcoming.length, 0);
  assert.equal(result.past[0].slug, 'mille-legendes-en-harmonie');
});
test('each public page has its own canonical URL and sharing metadata', () => {
  const meta = pageMetadata('École', 'Cours de musique', '/ecole-de-musique');
  assert.equal(meta.alternates.canonical, 'https://harmonie-montreuil-sur-mer.fr/ecole-de-musique');
  assert.equal(meta.openGraph.url, meta.alternates.canonical);
  assert.equal(meta.openGraph.title, meta.title);
  assert.equal(meta.twitter.description, 'Cours de musique');
});
test('the sitemap includes the concert and excludes unfinished pages', () => {
  const urls = sitemap().map(item => item.url);
  assert.ok(urls.some(url => url.endsWith('/evenements/mille-legendes-en-harmonie')));
  assert.equal(urls.some(url => /\/(galerie|histoire)$/.test(url)), false);
  assert.equal(urls.length, new Set(urls).size);
});
