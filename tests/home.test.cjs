const { test } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { JSDOM } = require('jsdom');
const { getByRole, queryByRole } = require('@testing-library/react');
const Home = require('../app/page.tsx').default;

test('the homepage presents the next concert and keeps access to lessons and the orchestra', t => {
  t.mock.timers.enable({ apis: ['Date'], now: new Date('2026-10-12T12:00:00Z') });
  const { document } = new JSDOM(renderToStaticMarkup(React.createElement(Home))).window;
  const page = document.body;
  assert.equal(document.querySelectorAll('h1').length, 1);
  assert.match(getByRole(page, 'heading', { level: 1 }).textContent, /Harmonie de.*Montreuil-sur-Mer/s);
  assert.equal(getByRole(page, 'link', { name: 'Découvrir le prochain concert' }).getAttribute('href'), '/evenements/mille-legendes-en-harmonie');
  assert.equal(getByRole(page, 'link', { name: 'Réserver sur HelloAsso' }).getAttribute('href'), 'https://www.helloasso.com/associations/ecole-de-musique-harmonie-municipale-de-montreuil-sur-mer/evenements/mille-legendes-en-harmonie');
  assert.match(page.textContent, /28 novembre 2026/);
  assert.match(page.textContent, /20 h 30/);
  assert.equal(getByRole(page, 'link', { name: 'Découvrir les cours' }).getAttribute('href'), '/ecole-de-musique');
  assert.equal(getByRole(page, 'link', { name: 'Consulter les tarifs' }).getAttribute('href'), '/ecole-de-musique#tarifs');
  assert.equal(getByRole(page, 'link', { name: 'Rejoindre l’orchestre' }).getAttribute('href'), '/rejoindre');
  assert.ok(getByRole(page, 'img', { name: 'Les élèves de l’école de musique en formation musicale' }));
  assert.equal(new URL(getByRole(page, 'img', { name: 'Des flûtistes de l’école de musique réunies sur scène' }).getAttribute('src'), 'https://example.test').searchParams.get('url'), '/assets/cours-instruments.jpg');
  assert.equal(new URL(getByRole(page, 'img', { name: 'Les élèves et les musiciens jouent ensemble à l’audition de 2018' }).getAttribute('src'), 'https://example.test').searchParams.get('url'), '/assets/archives/85c2087db2123161.webp');
  assert.ok(getByRole(page, 'img', { name: 'L’Harmonie réunie à la Sainte-Cécile 2025' }));
});

test('the homepage still invites visitors to concerts when no upcoming date remains', t => {
  t.mock.timers.enable({ apis: ['Date'], now: new Date('2026-12-01T12:00:00Z') });
  const page = new JSDOM(renderToStaticMarkup(React.createElement(Home))).window.document.body;
  assert.equal(getByRole(page, 'link', { name: 'Voir les concerts' }).getAttribute('href'), '/evenements');
  assert.ok(getByRole(page, 'heading', { name: 'La prochaine programmation arrive bientôt' }));
  assert.ok(getByRole(page, 'link', { name: /Instagram/ }));
  assert.equal(queryByRole(page, 'link', { name: 'Réserver sur HelloAsso' }), null);
  assert.ok(getByRole(page, 'link', { name: 'Rejoindre l’orchestre' }));
});
