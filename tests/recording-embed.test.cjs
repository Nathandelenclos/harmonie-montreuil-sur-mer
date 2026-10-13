const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost:3000' });
for (const name of ['window', 'document', 'HTMLElement', 'MutationObserver', 'getComputedStyle']) global[name] = dom.window[name];
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.IS_REACT_ACT_ENVIRONMENT = true;
const React = require('react');
const { render, screen, fireEvent, cleanup } = require('@testing-library/react');
const RecordingEmbed = require('../components/recording-embed.tsx').default;
afterEach(cleanup);
for (const [provider, source, expectedHost] of [
  ['Facebook', 'https://www.facebook.com/reel/1137310918577428', 'www.facebook.com'],
  ['Google Drive', 'https://drive.google.com/file/d/1er53uKDy7A1UBceTE2GS5qMqC9PFQoHz/preview', 'drive.google.com'],
]) test(`${provider} loads only on activation, receives focus and keeps an alternative link`, () => {
  const { container } = render(React.createElement(RecordingEmbed, { provider, source, title: 'Concert de Montreuil', poster: '/assets/videos/fiesta-1.jpg' }));
  assert.equal(container.querySelector('iframe'), null);
  const link = screen.getByRole('link', { name: `Ouvrir sur ${provider}: Concert de Montreuil` });
  assert.equal(link.href, source);
  fireEvent.click(screen.getByRole('button', { name: `Lire avec ${provider}: Concert de Montreuil` }));
  const frame = screen.getByTitle('Concert de Montreuil');
  const url = new URL(frame.src);
  assert.equal(url.hostname, expectedHost);
  if (provider === 'Facebook') assert.equal(url.searchParams.get('href'), source);
  assert.equal(document.activeElement, frame);
  assert.ok(screen.getByRole('link', { name: `Ouvrir sur ${provider}: Concert de Montreuil` }));
});

test('imported collections have local posters, known hosts, unique recordings and working page anchors', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const { renderToStaticMarkup } = require('react-dom/server');
  const groups = require('../data/recordings.json');
  const recordings = groups.flatMap(group => group.recordings);
  assert.equal(recordings.length, 24);
  assert.equal(new Set(recordings.map(recording => recording.source)).size, recordings.length);
  const page = new JSDOM(renderToStaticMarkup(React.createElement(require('../app/videos/page.tsx').default))).window.document;
  for (const group of groups) {
    assert.ok(page.getElementById(group.id));
    if (group.album) assert.ok(require('../data/photo-albums.json').some(album => album.slug === group.album));
    for (const recording of group.recordings) {
      assert.ok(fs.existsSync(path.join(__dirname, '../public', recording.poster)));
      if (recording.provider === 'YouTube') assert.ok(page.querySelector(recording.source));
      else assert.equal(new URL(recording.source).hostname, recording.provider === 'Facebook' ? 'www.facebook.com' : 'drive.google.com');
    }
  }
  assert.equal(page.querySelectorAll('iframe').length, 0);
  assert.equal(page.querySelectorAll('h1').length, 1);
  assert.doesNotMatch(page.documentElement.outerHTML, /sites\.google\.com/);
});
