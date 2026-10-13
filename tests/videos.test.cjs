const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('./register.cjs');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost:3000' });
for (const name of ['window', 'document', 'HTMLElement', 'MutationObserver', 'getComputedStyle']) global[name] = dom.window[name];
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.IS_REACT_ACT_ENVIRONMENT = true;
const React = require('react');
const { render, screen, fireEvent, cleanup, act } = require('@testing-library/react');
const { renderToStaticMarkup } = require('react-dom/server');
const YouTubeEmbed = require('../components/youtube-embed.tsx').default;
const videos = require('../data/videos.json');
afterEach(cleanup);

test('YouTube loads only after activation and receives keyboard focus', () => {
  const { container } = render(React.createElement(YouTubeEmbed, { id: '0DapvwTHhz4', title: 'Concert' }));
  assert.equal(container.querySelector('iframe'), null);
  const poster = new URL(container.querySelector('img').getAttribute('src'), 'http://localhost:3000');
  assert.equal(poster.origin, 'http://localhost:3000');
  assert.equal(poster.searchParams.get('url'), '/assets/videos/0DapvwTHhz4.jpg');
  const play = screen.getByRole('button', { name: 'Lire avec YouTube sur cette page : Concert' });
  assert.match(play.textContent, /Lire avec YouTube/);
  fireEvent.click(play);
  const frame = screen.getByTitle('Concert');
  assert.equal(frame.src, 'https://www.youtube-nocookie.com/embed/0DapvwTHhz4?autoplay=1');
  assert.equal(document.activeElement, frame);
  assert.equal(frame.getAttribute('referrerpolicy'), 'strict-origin-when-cross-origin');
  assert.equal(screen.queryByRole('button'), null);
});

test('the catalog contains all 81 identified recordings with local thumbnails and source evidence', () => {
  assert.equal(videos.length, 81);
  assert.equal(new Set(videos.map(video => video.id)).size, videos.length);
  for (const video of videos) {
    assert.match(video.id, /^[A-Za-z0-9_-]{11}$/);
    assert.match(video.title + ' ' + video.description, /montreuil/i);
    assert.ok(Number.isFinite(Date.parse(video.published)));
    const thumb = fs.readFileSync(path.join(__dirname, '../public/assets/videos', video.id + '.jpg'));
    assert.equal(thumb.readUInt16BE(0), 0xffd8);
  }
});

test('the video page renders every recording once, groups by publication year and defers players', () => {
  const { default: VideosPage, metadata } = require('../app/videos/page.tsx');
  const page = new JSDOM(renderToStaticMarkup(React.createElement(VideosPage))).window.document;
  assert.equal(page.querySelectorAll('button').length, videos.length + require('../data/recordings.json').flatMap(group => group.recordings).filter(recording => recording.provider !== 'YouTube').length);
  assert.equal(page.querySelectorAll('iframe').length, 0);
  assert.equal(page.querySelectorAll('h1').length, 1);
  for (const link of page.querySelectorAll('nav[aria-label="Années des vidéos"] a')) assert.ok(page.querySelector(link.getAttribute('href')));
  for (const video of videos) {
    const section = page.getElementById('videos-' + video.published.slice(0, 4));
    assert.ok(section.querySelector(`a[href="https://www.youtube.com/watch?v=${video.id}"]`));
  }
  assert.match(metadata.alternates.canonical, /\/videos$/);
  assert.ok(require('../app/sitemap.ts').default().some(item => item.url.endsWith('/videos')));
});

test('new recordings share the year timeline with YouTube and keep event context', () => {
  const { default: VideosPage } = require('../app/videos/page.tsx');
  const page = new JSDOM(renderToStaticMarkup(React.createElement(VideosPage))).window.document;
  const nav = page.querySelector('nav[aria-label="Années des vidéos"]');
  assert.ok(nav);
  assert.ok(nav.parentElement.contains(page.getElementById('videos-2011')));
  for (const [group, year] of [['dordogne-2026', '2026'], ['fiesta-harmonie', '2025'], ['fiesta-chorale', '2025'], ['fiesta-orchestre', '2025'], ['vie-harmonie', '2026']]) {
    const collection = page.getElementById(group);
    assert.equal(collection.closest('[id^="videos-"]').id, `videos-${year}`);
    assert.ok(nav.compareDocumentPosition(collection) & 4);
  }
  assert.equal(page.querySelectorAll('#youtube-0DapvwTHhz4').length, 1);
  assert.ok(page.getElementById('fiesta-harmonie').contains(page.getElementById('youtube-0DapvwTHhz4')));
  assert.equal(page.querySelectorAll('nav[aria-label="Collections de vidéos"]').length, 0);
});

test('the year navigation follows scrolling in both directions and reveals the active year without moving focus', () => {
  const VideoYearNavigation = require('../components/video-year-navigation.tsx').default;
  let pending = null;
  window.requestAnimationFrame = callback => { pending = callback; return 1; };
  window.cancelAnimationFrame = () => { pending = null; };
  const view = render(React.createElement(React.Fragment, null,
    React.createElement(VideoYearNavigation, { years: ['2025', '2024', '2023'] }),
    ...['2025', '2024', '2023'].map(year => React.createElement('section', { key: year, id: `videos-${year}` }, year))));
  const nav = screen.getByRole('navigation', { name: 'Années des vidéos' });
  nav.getBoundingClientRect = () => ({ bottom: 150 });
  Object.defineProperty(nav, 'clientWidth', { value: 120 });
  nav.scrollTo = ({ left }) => { nav.scrollLeft = left; };
  const links = screen.getAllByRole('link');
  links.forEach((link, index) => {
    Object.defineProperty(link, 'offsetLeft', { value: index * 64 });
    Object.defineProperty(link, 'offsetWidth', { value: 64 });
  });
  const sections = [...document.querySelectorAll('section')];
  let positions = [-500, -100, 120];
  sections.forEach((section, index) => { section.getBoundingClientRect = () => ({ top: positions[index] }); });
  links[0].focus();
  fireEvent.scroll(window);
  act(() => pending());
  assert.equal(links[2].getAttribute('aria-current'), 'location');
  assert.equal(links.filter(link => link.hasAttribute('aria-current')).length, 1);
  assert.ok(nav.scrollLeft > 0);
  assert.equal(document.activeElement, links[0]);
  positions = [120, 800, 1600];
  fireEvent.scroll(window);
  act(() => pending());
  assert.equal(links[0].getAttribute('aria-current'), 'location');
  fireEvent.resize(window);
  view.unmount();
  assert.equal(pending, null);
  fireEvent.scroll(window);
  assert.equal(pending, null);
});
