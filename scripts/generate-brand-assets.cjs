// Run with Node >= 22.12: node --experimental-strip-types scripts/generate-brand-assets.cjs
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const sharp = require('sharp');
const { createElement: h } = require('react');
const { ImageResponse } = require('next/og');
const pages = require('../data/social-images.json');
const albums = require('../data/photo-albums.json');
const { events } = require('../data/Events.ts');
const root = path.join(__dirname, '..');
const publicPath = source => path.join(root, 'public', source);

async function main() {
  const css = await fs.readFile(path.join(root, 'app/globals.css'), 'utf8');
  const color = token => {
    const value = css.match(new RegExp(`--${token}: ([\\d.]+) ([\\d.]+)% ([\\d.]+)%`));
    assert.ok(value, `Missing brand color: ${token}`);
    return `hsl(${value[1]}, ${value[2]}%, ${value[3]}%)`;
  };
  const blue = color('primary');
  const yellow = color('secondary');
  const background = color('background');
  const crest = publicPath('/assets/brand/crest.png');
  await sharp(crest).resize(256, 256).webp({ quality: 90 }).toFile(publicPath('/assets/brand/crest.webp'));
  await sharp(crest).resize(512, 512).png().toFile(path.join(root, 'app/icon.png'));
  await sharp(crest).resize(148, 148).flatten({ background }).extend({ top: 16, bottom: 16, left: 16, right: 16, background }).png().toFile(path.join(root, 'app/apple-icon.png'));
  const icons = await Promise.all([16, 32, 48].map(size => sharp(crest).resize(size, size).png().toBuffer()));
  const header = Buffer.alloc(6 + icons.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(icons.length, 4);
  let offset = header.length;
  icons.forEach((icon, index) => {
    const entry = 6 + index * 16;
    header[entry] = header[entry + 1] = [16, 32, 48][index];
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(icon.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += icon.length;
  });
  await fs.writeFile(path.join(root, 'app/favicon.ico'), Buffer.concat([header, ...icons]));
  const logo = `data:image/png;base64,${(await sharp(crest).resize(160, 160).png().toBuffer()).toString('base64')}`;
  const cards = [
    ...pages,
    ...events.map(event => ({ path: `/evenements/${event.slug}`, title: event.title, label: 'Concert & spectacle', image: event.image || pages[0].image, contain: true })),
    ...albums.map(album => ({ path: `/galerie/${album.slug}`, title: album.title, label: 'Les archives photos', image: album.photos[0].src })),
  ];
  assert.equal(new Set(cards.map(card => card.path)).size, cards.length, 'Duplicate sharing image path');
  for (const card of cards) {
    const photo = `data:image/png;base64,${(await sharp(publicPath(card.image)).resize(560, 630, { fit: card.contain ? 'contain' : 'cover', background }).png().toBuffer()).toString('base64')}`;
    const response = new ImageResponse(h('div', { style: { display: 'flex', width: '100%', height: '100%', background, color: blue, fontFamily: 'sans-serif' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', width: 640, padding: 48, borderTop: `12px solid ${yellow}` } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 24 } },
          h('img', { src: logo, width: 96, height: 96, alt: '' }),
          h('div', { style: { display: 'flex', flexDirection: 'column' } },
            h('span', { style: { fontSize: 32, fontWeight: 700 } }, 'Harmonie'),
            h('span', { style: { fontSize: 24 } }, 'Montreuil-sur-Mer'))),
        h('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, gap: 16 } },
          h('span', { style: { fontSize: 20, textTransform: 'uppercase', letterSpacing: 2 } }, card.label),
          h('span', { style: { fontSize: 56, lineHeight: 1.1, fontWeight: 700 } }, card.title)),
        h('span', { style: { fontSize: 18 } }, 'harmonie-montreuil-sur-mer.fr')),
      h('img', { src: photo, width: 560, height: 630, alt: '' }),
    ), { width: 1200, height: 630 });
    const output = publicPath(`/assets/og/${card.path === '/' ? 'accueil' : card.path.slice(1)}.png`);
    await fs.mkdir(path.dirname(output), { recursive: true });
    await fs.writeFile(output, await sharp(Buffer.from(await response.arrayBuffer())).png({ palette: true }).toBuffer());
    const dimensions = await sharp(output).metadata();
    assert.equal(dimensions.width, 1200);
    assert.equal(dimensions.height, 630);
  }
  console.log(`Generated ${cards.length} sharing images and favicon, Apple and site icons.`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
