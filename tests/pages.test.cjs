const { test } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { JSDOM } = require('jsdom');
const { getByRole, getAllByRole, within } = require('@testing-library/react');
const PageHeader = require('../components/page-header.tsx').default;

for (const image of [undefined, '/assets/montreuil.jpg']) {
  test(`page header provides a title and home breadcrumb ${image ? 'with' : 'without'} a decorative photo`, async () => {
    const page = new JSDOM(renderToStaticMarkup(React.createElement(PageHeader, { homeLink: React.createElement('a', { href: '/' }, 'Accueil'), title: 'Notre harmonie', description: 'Les musiciens', image }))).window.document.body;
    assert.ok(getByRole(page, 'heading', { level: 1, name: 'Notre harmonie' }));
    const breadcrumb = getByRole(page, 'navigation', { name: 'Fil d’Ariane' });
    assert.equal(within(breadcrumb).getByRole('link', { name: 'Accueil' }).getAttribute('href'), '/');
    assert.equal(breadcrumb.querySelector('[aria-current="page"]').textContent, 'Notre harmonie');
    assert.equal(page.querySelectorAll('img:not([alt=""])').length, 0);
  });
}

test('school shortcuts still reach the courses, instruments, prices and contacts after reordering', async () => {
  const School = require('../app/ecole-de-musique/page.tsx').default;
  const document = new JSDOM(renderToStaticMarkup(React.createElement(School))).window.document;
  const shortcuts = getByRole(document.body, 'navigation', { name: 'Dans la page école de musique' });
  for (const link of getAllByRole(shortcuts, 'link')) assert.ok(document.querySelector(link.getAttribute('href')));
  const prices = getByRole(document.body, 'table', { name: 'Tarifs annuels' });
  const lesson = within(prices).getByRole('row', { name: 'Instrument d’harmonie (30 cours de 30 minutes) 190 € 230 €' });
  assert.equal(within(lesson).getAllByRole('cell').length, 2);
  assert.equal(document.querySelectorAll('h1').length, 1);
});

test('archive photos link to the locally hosted albums', async () => {
  const About = require('../app/a-propos/page.tsx').default;
  const page = new JSDOM(renderToStaticMarkup(React.createElement(About))).window.document.body;
  const archives = getByRole(page, 'region', { name: 'Des générations en musique' });
  assert.equal(getAllByRole(archives, 'img').length, 2);
  assert.match(archives.textContent, /1927/);
  assert.match(archives.textContent, /1949/);
  assert.doesNotMatch(archives.textContent, /ancien site|wix|site d’archives/i);
  assert.equal(getByRole(archives, 'link', { name: 'Parcourir les photos d’archives' }).getAttribute('href'), '/galerie');
});

test('concerts provide three embedded video previews and a link to all recordings', async () => {
  const Events = require('../app/evenements/page.tsx').default;
  const page = new JSDOM(renderToStaticMarkup(await Events())).window.document.body;
  const videos = getByRole(page, 'region', { name: 'L’harmonie en concert' });
  assert.equal(getAllByRole(videos, 'button', { name: /Lire avec YouTube sur cette page/ }).length, 3);
  assert.equal(getByRole(videos, 'link', { name: /Toutes les vidéos/ }).getAttribute('href'), '/videos');
  assert.match(videos.textContent, /publiées par MARLENE47100/);
  assert.equal(videos.querySelector('iframe'), null);
});

for (const [route, video] of [['', '0DapvwTHhz4'], ['a-propos/', 'tBcUdDxvP0k'], ['ecole-de-musique/', 'j591F-YCkBs'], ['rejoindre/', 'KGIi6CUYmLw']]) {
  test(`${route || 'home'} showcases a catalogued Montreuil video without loading YouTube upfront`, async () => {
    const Page = require(`../app/${route}page.tsx`).default;
    const page = new JSDOM(renderToStaticMarkup(await Page())).window.document.body;
    assert.ok(page.querySelector(`img[src*="${video}"]`));
    assert.ok(require('../data/videos.json').some(item => item.id === video));
    assert.ok(getAllByRole(page, 'button', { name: /Lire avec YouTube sur cette page/ }).length);
    assert.equal(page.querySelector('iframe[src*="youtube"]'), null);
  });
}

test('school retains course durations, all instruments, teachers and practical details', async () => {
  const School = require('../app/ecole-de-musique/page.tsx').default;
  const page = new JSDOM(renderToStaticMarkup(React.createElement(School))).window.document.body;
  for (const name of ['Éveil musical', 'Formation musicale', 'Cours d’instruments', 'Pratique collective'])
    assert.ok(getByRole(page, 'heading', { name, exact: true }));
  for (const name of ['Flûte', 'Hautbois', 'Clarinette', 'Saxophone', 'Trompette', 'Trombone', 'Cor', 'Tuba', 'Percussions', 'Piano'])
  {
    const image = getByRole(page, 'img', { name: `Illustration de l’instrument : ${name}` });
    const source = new URL(image.getAttribute('src'), 'http://localhost').searchParams.get('url');
    assert.ok(require('node:fs').existsSync(require('node:path').join(__dirname, '../public', source)), source);
  }
  for (const text of ['4 à 6 ans', '1 h 30', '30 min', '18 h à 19 h', 'Magalie DELMOTTE', 'Céline GRAY', '320 €', '400 €', '14 h à 18 h'])
    assert.ok(page.textContent.includes(text), text);
  assert.match(page.textContent, /Audition de Noël 2025/);
  assert.ok(getByRole(page, 'link', { name: /Photos de l’école/ }));
});

test('page header composes a photographic introduction and real navigation actions', async () => {
  const page = new JSDOM(renderToStaticMarkup(React.createElement(PageHeader, {
    homeLink: React.createElement('a', { href: '/' }, 'Accueil'), title: 'Jouer ensemble', eyebrow: 'Depuis 1854',
    media: React.createElement('figure', null, React.createElement('img', { src: '/group.jpg', alt: 'Les musiciens' }), React.createElement('figcaption', null, 'Archive 2018')),
    actions: React.createElement('a', { href: '#programme' }, 'Voir le programme'),
  }))).window.document.body;
  assert.ok(getByRole(page, 'heading', { level: 1, name: 'Jouer ensemble' }));
  assert.ok(getByRole(page, 'img', { name: 'Les musiciens' }));
  assert.equal(getByRole(page, 'link', { name: 'Voir le programme' }).getAttribute('href'), '#programme');
  assert.match(page.textContent, /Archive 2018/);
});

test('the redesigned albums index preserves every album link exactly once', async () => {
  const Gallery = require('../app/galerie/page.tsx').default;
  const page = new JSDOM(renderToStaticMarkup(await Gallery())).window.document.body;
  for (const album of require('../data/photo-albums.json'))
    assert.equal(page.querySelectorAll(`a[href="/galerie/${album.slug}"]`).length, 1);
  assert.equal(getAllByRole(page, 'heading', { level: 1 }).length, 1);
});

test('the contact redesign keeps the form, phone numbers, email and deferred map available', async () => {
  const Contact = require('../app/contact/page.tsx').default;
  const page = new JSDOM(renderToStaticMarkup(React.createElement(Contact))).window.document.body;
  for (const href of ['tel:+33321860569', 'tel:+33668853079', 'mailto:harmoniemontreuilsurmer@orange.fr'])
    assert.ok(page.querySelector(`a[href="${href}"]`));
  assert.ok(getByRole(page, 'heading', { name: 'Envoyez-nous un message' }));
  assert.ok(getByRole(page, 'button', { name: 'Afficher la carte Google Maps' }));
  assert.equal(page.querySelector('iframe'), null);
});

test('concert details preserve booking and show a dated, deferred recording', async t => {
  t.mock.timers.enable({ apis: ['Date'], now: new Date('2026-10-12T12:00:00Z') });
  const EventPage = require('../app/evenements/[slug]/page.tsx').default;
  const page = new JSDOM(renderToStaticMarkup(await EventPage({ params: Promise.resolve({ slug: 'mille-legendes-en-harmonie' }) }))).window.document.body;
  assert.ok(getByRole(page, 'heading', { level: 1, name: 'Mille Légendes en Harmonie' }));
  assert.ok(getByRole(page, 'button', { name: /The Greatest Showman/ }));
  assert.ok(getByRole(page, 'link', { name: 'Réserver sur HelloAsso' }));
  assert.match(page.textContent, /avril 2025/);
  assert.equal(page.querySelector('iframe'), null);
});

test('a concert without a description still has descriptive sharing metadata', async () => {
  const { events } = require('../data/Events.ts');
  const event = events[0];
  const previous = event.description;
  try {
    event.description = '';
    const { generateMetadata } = require('../app/evenements/[slug]/page.tsx');
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: event.slug }) });
    assert.ok(metadata.description.includes(event.title));
    assert.ok(metadata.description.includes(event.location));
    assert.equal(metadata.openGraph.description, metadata.description);
  } finally { event.description = previous; }
});
