const { test, afterEach, mock } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { pretendToBeVisual: true, url: 'http://localhost:3000' });
for (const name of ['window', 'document', 'HTMLElement', 'MutationObserver', 'getComputedStyle']) global[name] = dom.window[name];
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.IS_REACT_ACT_ENVIRONMENT = true;
const React = require('react');
const { render, screen, fireEvent, cleanup, act } = require('@testing-library/react');
const PhotoSlideshow = require('../components/photo-slideshow.tsx').default;
afterEach(() => { cleanup(); mock.restoreAll(); });
const photos = [
  { src: '/assets/formation-musicale.jpg', alt: 'Cours collectif', caption: 'Apprendre ensemble.' },
  { src: '/assets/archives/85c2087db2123161.webp', alt: 'Audition de l’école', caption: 'Audition 2018.' },
];

function setup(t, reduced = false) {
  t.mock.timers.enable({ apis: ['setInterval'] });
  mock.method(window, 'setInterval', (callback, delay) => setInterval(callback, delay));
  mock.method(window, 'clearInterval', timer => clearInterval(timer));
  const preference = new window.EventTarget();
  preference.matches = reduced;
  window.matchMedia = () => preference;
  return { ...render(React.createElement(PhotoSlideshow, { photos })), preference };
}

test('the slideshow changes photo and caption every seven seconds and loops', t => {
  setup(t);
  assert.equal(screen.getByRole('img').alt, 'Cours collectif');
  act(() => t.mock.timers.tick(6999));
  assert.equal(screen.getByRole('img').alt, 'Cours collectif');
  act(() => t.mock.timers.tick(1));
  assert.equal(screen.getByRole('img').alt, 'Audition de l’école');
  assert.equal(screen.getByText('Audition 2018.').getAttribute('aria-hidden'), 'false');
  act(() => t.mock.timers.tick(7000));
  assert.equal(screen.getByRole('img').alt, 'Cours collectif');
});

test('visitors can pause and resume the slideshow', t => {
  setup(t);
  fireEvent.click(screen.getByRole('button', { name: 'Mettre le diaporama en pause' }));
  act(() => t.mock.timers.tick(14000));
  assert.equal(screen.getByRole('img').alt, 'Cours collectif');
  fireEvent.click(screen.getByRole('button', { name: 'Reprendre le diaporama' }));
  act(() => t.mock.timers.tick(7000));
  assert.equal(screen.getByRole('img').alt, 'Audition de l’école');
});

test('reduced motion keeps a static photo without autoplay controls', t => {
  setup(t, true);
  act(() => t.mock.timers.tick(14000));
  assert.equal(screen.getByRole('img').alt, 'Cours collectif');
  assert.equal(screen.queryByRole('button'), null);
});

test('changing motion preference stops autoplay during a visit', t => {
  const { preference } = setup(t);
  act(() => t.mock.timers.tick(7000));
  act(() => { preference.matches = true; preference.dispatchEvent(new window.Event('change')); });
  act(() => t.mock.timers.tick(14000));
  assert.equal(screen.getByRole('img').alt, 'Audition de l’école');
  assert.equal(screen.queryByRole('button'), null);
});

test('a hidden tab keeps the same photo and unmount clears its timer', t => {
  const { unmount } = setup(t);
  mock.getter(document, 'hidden', () => true);
  act(() => t.mock.timers.tick(7000));
  assert.equal(screen.getByRole('img').alt, 'Cours collectif');
  unmount();
  assert.equal(window.clearInterval.mock.callCount(), 1);
});
