const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('./register.cjs');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost:3000' });
for (const name of ['window', 'document', 'HTMLElement', 'HTMLInputElement', 'MutationObserver', 'getComputedStyle']) global[name] = dom.window[name];
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.IS_REACT_ACT_ENVIRONMENT = true;
dom.window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
dom.window.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); this.dispatchEvent(new dom.window.Event('close')); };
const React = require('react');
const { render, screen, fireEvent, cleanup, within, act } = require('@testing-library/react');
const PhotoGallery = require('../components/photo-gallery.tsx').default;
const albums = require('../data/photo-albums.json');
afterEach(cleanup);

const photos = [
  { src: '/assets/archives/harmonie-1927.jpg', title: '1927', width: 1400, height: 918 },
  { src: '/assets/archives/harmonie-1949.jpg', title: '1949', width: 2048, height: 1196 },
];

test('visitors can enlarge a photo, browse in both directions and close the gallery', () => {
  render(React.createElement(PhotoGallery, { photos, title: 'Le XXe siècle' }));
  assert.equal(screen.queryByRole('dialog'), null);
  const opener = screen.getByRole('button', { name: 'Agrandir : 1927 — photo 1' });
  fireEvent.click(opener);
  let dialog = screen.getByRole('dialog', { name: '1927' });
  assert.ok(within(dialog).getByRole('img', { name: '1927' }));
  assert.equal(document.body.style.overflow, 'hidden');
  fireEvent.click(within(dialog).getByRole('button', { name: 'Suivante' }));
  dialog = screen.getByRole('dialog', { name: '1949' });
  fireEvent.keyDown(dialog, { key: 'ArrowRight' });
  dialog = screen.getByRole('dialog', { name: '1927' });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Précédente' }));
  dialog = screen.getByRole('dialog', { name: '1949' });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Fermer' }));
  assert.equal(screen.queryByRole('dialog'), null);
  assert.equal(document.body.style.overflow, '');
  fireEvent.click(opener);
  assert.ok(screen.getByRole('dialog', { name: '1927' }));
});

test('closing a native dialog and unmounting both restore scrolling', () => {
  const view = render(React.createElement(PhotoGallery, { photos: photos.slice(0, 1), title: 'Album' }));
  fireEvent.click(screen.getByRole('button', { name: /Agrandir/ }));
  const dialog = screen.getByRole('dialog');
  assert.equal(within(dialog).getByRole('button', { name: 'Suivante' }).disabled, true);
  act(() => dialog.close());
  assert.equal(document.body.style.overflow, '');
  fireEvent.click(screen.getByRole('button', { name: /Agrandir/ }));
  view.unmount();
  assert.equal(document.body.style.overflow, '');
});

test('every imported album has local, dimensioned photos and a unique published URL', () => {
  assert.equal(albums.length, 13);
  assert.equal(new Set(albums.map(album => album.slug)).size, albums.length);
  const files = new Set();
  for (const album of albums) {
    assert.ok(album.photos.length > 0);
    assert.equal(new Set(album.photos.map(photo => photo.src)).size, album.photos.length);
    for (const photo of album.photos) {
      assert.match(photo.src, /^\/assets\/archives\/[a-f0-9]{16}\.webp$/);
      assert.ok(photo.title && photo.width > 0 && photo.height > 0);
      const file = fs.readFileSync(path.join(__dirname, '../public', photo.src));
      assert.equal(file.subarray(8, 12).toString(), 'WEBP');
      files.add(photo.src);
    }
  }
  assert.equal(files.size, 293);
  const sitemap = require('../app/sitemap.ts').default().map(item => item.url);
  for (const album of albums) assert.ok(sitemap.some(url => url.endsWith(`/galerie/${album.slug}`)));
});

test('album routes publish metadata and reject unknown albums', async () => {
  const { generateMetadata, generateStaticParams, default: AlbumPage } = require('../app/galerie/[album]/page.tsx');
  assert.equal(generateStaticParams().length, albums.length);
  const meta = await generateMetadata({ params: Promise.resolve({ album: '20e-siecle' }) });
  assert.match(meta.alternates.canonical, /\/galerie\/20e-siecle$/);
  await assert.rejects(() => AlbumPage({ params: Promise.resolve({ album: 'missing' }) }), /404/);
});
