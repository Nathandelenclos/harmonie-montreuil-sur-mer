const { test } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { JSDOM } = require('jsdom');
const { getByRole, getAllByRole, within } = require('@testing-library/react');
const PageHeader = require('../components/page-header.tsx').default;

for (const image of [undefined, '/assets/montreuil.jpg']) {
  test(`page header provides a title and home breadcrumb ${image ? 'with' : 'without'} a decorative photo`, () => {
    const page = new JSDOM(renderToStaticMarkup(React.createElement(PageHeader, { homeLink: React.createElement('a', { href: '/' }, 'Accueil'), title: 'Notre harmonie', description: 'Les musiciens', image }))).window.document.body;
    assert.ok(getByRole(page, 'heading', { level: 1, name: 'Notre harmonie' }));
    const breadcrumb = getByRole(page, 'navigation', { name: 'Fil d’Ariane' });
    assert.equal(within(breadcrumb).getByRole('link', { name: 'Accueil' }).getAttribute('href'), '/');
    assert.equal(breadcrumb.querySelector('[aria-current="page"]').textContent, 'Notre harmonie');
    assert.equal(page.querySelectorAll('img:not([alt=""])').length, 0);
  });
}

test('school shortcuts still reach the courses, instruments, prices and contacts after reordering', () => {
  const School = require('../app/ecole-de-musique/page.tsx').default;
  const document = new JSDOM(renderToStaticMarkup(React.createElement(School))).window.document;
  const shortcuts = getByRole(document.body, 'navigation', { name: 'Dans la page école de musique' });
  for (const link of getAllByRole(shortcuts, 'link')) assert.ok(document.querySelector(link.getAttribute('href')));
  const prices = getByRole(document.body, 'table', { name: 'Tarifs annuels' });
  const lesson = within(prices).getByRole('row', { name: 'Instrument d’harmonie (30 cours de 30 minutes) 190 € 230 €' });
  assert.equal(within(lesson).getAllByRole('cell').length, 2);
  assert.equal(document.querySelectorAll('h1').length, 1);
});

test('archive photos link to the locally hosted albums', () => {
  const About = require('../app/a-propos/page.tsx').default;
  const page = new JSDOM(renderToStaticMarkup(React.createElement(About))).window.document.body;
  const archives = getByRole(page, 'region', { name: 'Des générations en musique' });
  assert.equal(getAllByRole(archives, 'img').length, 2);
  assert.match(archives.textContent, /1927/);
  assert.match(archives.textContent, /1949/);
  assert.doesNotMatch(archives.textContent, /ancien site|wix|site d’archives/i);
  assert.equal(getByRole(archives, 'link', { name: 'Parcourir les photos d’archives' }).getAttribute('href'), '/galerie');
});

test('concerts provide three embedded video previews and a link to all recordings', () => {
  const Events = require('../app/evenements/page.tsx').default;
  const page = new JSDOM(renderToStaticMarkup(React.createElement(Events))).window.document.body;
  const videos = getByRole(page, 'region', { name: 'L’harmonie en concert' });
  assert.equal(getAllByRole(videos, 'button', { name: /Lire sur cette page/ }).length, 3);
  assert.equal(getByRole(videos, 'link', { name: /Toutes les vidéos/ }).getAttribute('href'), '/videos');
  assert.match(videos.textContent, /publiées par MARLENE47100/);
  assert.equal(videos.querySelector('iframe'), null);
});
