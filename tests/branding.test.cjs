const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('./register.cjs');
const { pageMetadata, siteUrl } = require('../lib/metadata.ts');
const sitemap = require('../app/sitemap.ts').default;
const pages = require('../data/social-images.json');
const albums = require('../data/photo-albums.json');
const { events } = require('../data/Events.ts');

test('every published page shares an existing 1200 × 630 PNG with matching Open Graph and Twitter metadata', () => {
  const paths = [...pages.map(page => page.path), ...albums.map(album => `/galerie/${album.slug}`), ...events.map(event => `/evenements/${event.slug}`)];
  assert.deepEqual(paths.sort(), sitemap().map(item => new URL(item.url).pathname).sort());
  for (const pagePath of paths) {
    const meta = pageMetadata('Titre de la page', 'Description', pagePath);
    const image = meta.openGraph.images[0];
    const url = new URL(image.url);
    assert.equal(url.origin, siteUrl);
    assert.deepEqual(meta.twitter.images, [{ url: image.url, alt: image.alt }]);
    assert.equal(image.type, 'image/png');
    const png = fs.readFileSync(path.join(__dirname, '../public', url.pathname));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16), image.width);
    assert.equal(png.readUInt32BE(20), image.height);
    assert.equal(image.width, 1200);
    assert.equal(image.height, 630);
    assert.ok(image.alt);
  }
});

test('brand sources and social photos exist; browser and Apple icons use the intended sizes', () => {
  for (const page of pages) assert.ok(fs.existsSync(path.join(__dirname, '../public', page.image)), page.image);
  for (const [file, size] of [['icon.png', 512], ['apple-icon.png', 180]]) {
    const png = fs.readFileSync(path.join(__dirname, '../app', file));
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
  const ico = fs.readFileSync(path.join(__dirname, '../app/favicon.ico'));
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  assert.deepEqual([ico[6], ico[22], ico[38]], [16, 32, 48]);
});

test('the shared brand has visible identifying text and a decorative crest inside its home link', () => {
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const { JSDOM } = require('jsdom');
  const { getByRole } = require('@testing-library/react');
  const BrandLogo = require('../components/brand-logo.tsx').default;
  const page = new JSDOM(renderToStaticMarkup(React.createElement('a', { href: '/' }, React.createElement(BrandLogo)))).window.document.body;
  const link = getByRole(page, 'link', { name: 'Harmonie Montreuil-sur-Mer' });
  assert.equal(link.getAttribute('href'), '/');
  const logo = link.querySelector('img');
  assert.equal(logo.alt, '');
  assert.equal(logo.width, 48);
  assert.equal(logo.height, 48);
  assert.ok(fs.existsSync(path.join(__dirname, '../public', new URL(logo.src, 'http://localhost').searchParams.get('url'))));
});

test('header and footer home links expose the same complete visible brand name', () => {
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const { JSDOM } = require('jsdom');
  const { getByRole } = require('@testing-library/react');
  const { PathnameContext } = require('next/dist/shared/lib/hooks-client-context.shared-runtime');
  const Navigation = require('../components/navigation.tsx').default;
  const Footer = require('../components/footer.tsx').default;
  const page = new JSDOM(renderToStaticMarkup(React.createElement(PathnameContext.Provider, { value: '/' },
    React.createElement(Navigation), React.createElement(Footer)))).window.document.body;
  for (const region of ['banner', 'contentinfo']) {
    const link = getByRole(getByRole(page, region), 'link', { name: 'Harmonie Montreuil-sur-Mer', exact: true });
    assert.equal(link.getAttribute('href'), '/');
  }
});
