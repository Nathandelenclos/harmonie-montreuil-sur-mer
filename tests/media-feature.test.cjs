const { test } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { JSDOM } = require('jsdom');
const { getByRole, within } = require('@testing-library/react');
const MediaFeature = require('../components/media-feature.tsx').default;

test('media feature names its region and preserves media and action semantics', () => {
  const page = new JSDOM(renderToStaticMarkup(React.createElement(MediaFeature, {
    id: 'performance', eyebrow: 'Archive 2024', title: 'Jouer ensemble',
    media: React.createElement('button', null, 'Lire la vidéo'),
    actions: React.createElement('a', { href: '/videos' }, 'Toutes les vidéos'),
  }, React.createElement('p', null, 'La classe orchestre sur scène.')))).window.document.body;
  const section = getByRole(page, 'region', { name: 'Jouer ensemble' });
  assert.ok(within(section).getByRole('heading', { level: 2, name: 'Jouer ensemble' }));
  assert.ok(within(section).getByRole('button', { name: 'Lire la vidéo' }));
  assert.equal(within(section).getByRole('link').getAttribute('href'), '/videos');
  assert.match(section.textContent, /Archive 2024/);
});
