const { test, afterEach, mock } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>');
for (const name of ['window', 'document', 'HTMLElement', 'Node', 'MutationObserver', 'getComputedStyle']) global[name] = dom.window[name];
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.IS_REACT_ACT_ENVIRONMENT = true;
const React = require('react');
const { render, screen, cleanup, act } = require('@testing-library/react');
const { renderToStaticMarkup } = require('react-dom/server');
const PageTemplate = require('../app/template.tsx').default;
afterEach(() => { cleanup(); mock.restoreAll(); });

function setup({ reduced = false, supported = true } = {}) {
  const media = new window.EventTarget();
  media.matches = reduced;
  window.matchMedia = () => media;
  const animations = [];
  HTMLElement.prototype.animate = function (frames, options) {
    const animation = { element: this, frames, options, cancel: mock.fn(), onfinish: null };
    animations.push(animation);
    return animation;
  };
  let observer;
  window.IntersectionObserver = global.IntersectionObserver = supported ? class {
    constructor(callback) { this.callback = callback; this.observe = mock.fn(); this.unobserve = mock.fn(); this.disconnect = mock.fn(); observer = this; }
  } : undefined;
  mock.method(HTMLElement.prototype, 'getBoundingClientRect', function () {
    return { top: this.dataset.position === 'below' ? window.innerHeight + 200 : 100 };
  });
  const view = render(React.createElement(PageTemplate, null,
    React.createElement('section', { className: 'school-course', 'aria-label': 'Visible dès l’arrivée' }, 'Cours'),
    React.createElement('section', { className: 'school-course', 'aria-label': 'Plus bas dans la page', 'data-position': 'below' },
      React.createElement('a', { href: '#cours' }, 'Découvrir les cours')),
    React.createElement('section', { className: 'school-course', 'aria-label': 'Dernière section', 'data-position': 'below' }, 'Photos')));
  return { ...view, media, animations, observer };
}

test('below-fold content starts invisible and appears once when it enters the viewport', () => {
  const { observer, animations } = setup();
  const initial = screen.getByRole('region', { name: 'Visible dès l’arrivée' });
  const below = screen.getByRole('region', { name: 'Plus bas dans la page' });
  assert.notEqual(getComputedStyle(initial).opacity, '0');
  assert.equal(getComputedStyle(below).opacity, '0');
  assert.equal(animations.length, 0);
  act(() => observer.callback([{ target: below, isIntersecting: true }]));
  assert.notEqual(getComputedStyle(below).opacity, '0');
  assert.equal(animations.length, 1);
  assert.deepEqual(animations[0].frames.map(frame => frame.opacity), [0, 1]);
  act(() => observer.callback([{ target: below, isIntersecting: false }, { target: below, isIntersecting: true }]));
  assert.equal(animations.length, 1);
  assert.notEqual(getComputedStyle(below).opacity, '0');
});

test('keyboard focus reveals content immediately without waiting for an animation', () => {
  const { animations } = setup();
  const link = screen.getByRole('link', { name: 'Découvrir les cours' });
  act(() => link.focus());
  assert.equal(document.activeElement, link);
  assert.notEqual(getComputedStyle(link.closest('section')).opacity, '0');
  assert.equal(animations.length, 0);
});

test('enabling reduced motion reveals pending content and cancels running effects', () => {
  const { observer, animations, media } = setup();
  const below = screen.getByRole('region', { name: 'Plus bas dans la page' });
  act(() => observer.callback([{ target: below, isIntersecting: true }]));
  act(() => { media.matches = true; media.dispatchEvent(new window.Event('change')); });
  for (const region of screen.getAllByRole('region')) assert.notEqual(getComputedStyle(region).opacity, '0');
  assert.equal(animations[0].cancel.mock.callCount(), 1);
  assert.equal(observer.disconnect.mock.callCount(), 1);
});

for (const options of [{ reduced: true }, { supported: false }]) {
  test(`content remains visible without motion support: ${JSON.stringify(options)}`, () => {
    const { animations, observer } = setup(options);
    for (const region of screen.getAllByRole('region')) assert.notEqual(getComputedStyle(region).opacity, '0');
    assert.equal(animations.length, 0);
    assert.equal(observer, undefined);
  });
}

test('unmount disconnects the observer, cancels animations and restores pending content', () => {
  const { observer, animations, unmount, media } = setup();
  const below = screen.getByRole('region', { name: 'Plus bas dans la page' });
  const last = screen.getByRole('region', { name: 'Dernière section' });
  act(() => observer.callback([{ target: below, isIntersecting: true }]));
  unmount();
  assert.equal(observer.disconnect.mock.callCount(), 1);
  assert.equal(animations[0].cancel.mock.callCount(), 1);
  assert.notEqual(last.style.opacity, '0');
  media.matches = true;
  media.dispatchEvent(new window.Event('change'));
  assert.equal(observer.disconnect.mock.callCount(), 1);
});

test('server-rendered content is visible before JavaScript runs', () => {
  const html = renderToStaticMarkup(React.createElement(PageTemplate, null, React.createElement('h2', { className: 'section-heading' }, 'Nos cours')));
  assert.match(html, /Nos cours/);
  assert.doesNotMatch(html, /opacity|scroll-pending/);
});
