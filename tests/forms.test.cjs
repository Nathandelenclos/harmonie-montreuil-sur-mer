const { test, afterEach, mock } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost:3000' });
for (const name of ['window', 'document', 'HTMLElement', 'HTMLInputElement', 'MutationObserver', 'getComputedStyle']) global[name] = dom.window[name];
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.self = dom.window;
global.IS_REACT_ACT_ENVIRONMENT = true;
const React = require('react');
const { render, screen, fireEvent, waitFor, cleanup, act } = require('@testing-library/react');
const ContactPage = require('../components/contact-form.tsx').default;
const JoinPage = require('../components/join-form.tsx').default;
afterEach(() => { cleanup(); mock.restoreAll(); });

for (const [name, Page, buttonLabel] of [['contact', ContactPage, 'Envoyer le message'], ['join', JoinPage, 'Envoyer ma demande']]) {
  test(`${name}: preserves entered details when sending fails and allows a successful retry`, async () => {
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 'test-public-key';
    window.grecaptcha = { ready: callback => callback(), execute: async () => 'test-token' };
    mock.method(global, 'fetch', async () => Response.json({ error: 'L’envoi a échoué. Réessayez.' }, { status: 503 }));
    render(React.createElement(Page));
    fireEvent.change(screen.getByLabelText(/Nom.*\*/), { target: { value: 'Test visitor' } });
    fireEvent.change(screen.getByLabelText(/Email.*\*/), { target: { value: 'visitor@example.org' } });
    if (name === 'contact') {
      fireEvent.change(screen.getByLabelText(/Sujet/), { target: { value: 'information' } });
      fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Bonjour' } });
    } else {
      fireEvent.change(screen.getByLabelText(/Instrument/), { target: { value: 'Flûte' } });
      fireEvent.change(screen.getByLabelText(/Expérience/), { target: { value: 'debutant' } });
    }
    fireEvent.submit(screen.getByRole('button', { name: buttonLabel }).closest('form'));
    assert.equal(screen.getByRole('button', { name: /Envoi en cours/ }).disabled, true);
    await screen.findByRole('alert');
    assert.equal(screen.queryByText(/^(Message|Demande) envoyé/), null);
    assert.equal(screen.getByLabelText(/Nom.*\*/).value, 'Test visitor');
    assert.equal(screen.getByLabelText(/Email.*\*/).value, 'visitor@example.org');
    mock.method(global, 'fetch', async () => Response.json({ message: 'Message envoyé.' }));
    fireEvent.submit(screen.getByRole('button', { name: buttonLabel }).closest('form'));
    await waitFor(() => assert.ok(screen.getByRole('status').textContent.includes('envoyé')));
    assert.equal(screen.queryByRole('button', { name: buttonLabel }), null);
  });
}

test('captcha failure keeps the contact form available without calling the email API', async () => {
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 'test-public-key';
  window.grecaptcha = { ready: callback => callback(), execute: async () => { throw new Error('captcha down'); } };
  const fetchMock = mock.method(global, 'fetch', async () => { throw new Error('must not send'); });
  render(React.createElement(ContactPage));
  fireEvent.submit(screen.getByRole('button', { name: 'Envoyer le message' }).closest('form'));
  await screen.findByRole('alert');
  assert.equal(fetchMock.mock.callCount(), 0);
  assert.equal(screen.queryByRole('status'), null);
});

test('navigation announces the current page and restores focus when Escape closes the mobile menu', async () => {
  const moduleId = require.resolve('next/navigation');
  require(moduleId);
  require.cache[moduleId].exports = { ...require.cache[moduleId].exports, usePathname: () => '/contact' };
  window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  const Navigation = require('../components/navigation.tsx').default;
  render(React.createElement(Navigation));
  const toggle = screen.getByRole('button', { name: 'Ouvrir le menu' });
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  fireEvent.click(toggle);
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  const mobile = screen.getByRole('navigation', { name: 'Navigation mobile' });
  const contact = mobile.querySelector('a[href="/contact"]');
  assert.equal(contact.getAttribute('aria-current'), 'page');
  contact.focus();
  fireEvent.keyDown(contact, { key: 'Escape' });
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(document.activeElement, toggle);
});

test('email validation appears on blur, is associated with the field and clears after correction', () => {
  render(React.createElement(ContactPage));
  const email = screen.getByLabelText(/Email.*\*/);
  fireEvent.change(email, { target: { value: 'wrong' } });
  assert.equal(screen.queryByRole('alert'), null);
  fireEvent.blur(email);
  assert.equal(email.getAttribute('aria-invalid'), 'true');
  assert.equal(email.getAttribute('aria-describedby'), screen.getByRole('alert').id);
  assert.match(screen.getByRole('alert').textContent, /nom@domaine.fr/);
  fireEvent.change(email, { target: { value: 'visitor@example.org' } });
  fireEvent.blur(email);
  assert.equal(email.getAttribute('aria-invalid'), 'false');
  assert.equal(screen.queryByRole('alert'), null);
});

test('required fields explain what is missing on blur', () => {
  render(React.createElement(ContactPage));
  fireEvent.blur(screen.getByLabelText(/Nom.*\*/));
  assert.equal(screen.getByRole('alert').textContent, 'Ce champ est obligatoire.');
});

test('the empty concert state has a heading and a next action', () => {
  const Empty = require('../components/no-upcoming-events.tsx').default;
  render(React.createElement(Empty));
  assert.ok(screen.getByRole('heading', { name: /programmation arrive/ }));
  assert.equal(screen.getByRole('link', { name: /Instagram/ }).href, 'https://www.instagram.com/harmoniemontreuilsurmer/');
});

test('archived event cards keep their details but remove the booking action', () => {
  const EventCard = require('../components/event-card.tsx').default;
  const { events } = require('../data/Events.ts');
  const view = render(React.createElement(EventCard, { event: events[0] }));
  assert.equal(screen.getByRole('link', { name: /Réserver/ }).href, events[0].bookingUrl);
  view.rerender(React.createElement(EventCard, { event: events[0], past: true }));
  assert.equal(screen.queryByRole('link', { name: /Réserver/ }), null);
  assert.ok(screen.getByRole('link', { name: 'Programme et informations' }));
});

test('the Google Map only loads after activation and receives keyboard focus', () => {
  const GoogleMap = require('../components/google-map.tsx').default;
  const { container } = render(React.createElement(GoogleMap));
  assert.equal(container.querySelector('iframe'), null);
  fireEvent.click(screen.getByRole('button', { name: 'Afficher la carte Google Maps' }));
  const frame = screen.getByTitle('Localisation de l’Harmonie municipale de Montreuil-sur-Mer');
  assert.match(frame.src, /^https:\/\/www.google.com\/maps\/embed\?/);
  assert.equal(document.activeElement, frame);
});

for (const [name, Form, buttonLabel] of [['contact', ContactPage, 'Envoyer le message'], ['join', JoinPage, 'Envoyer ma demande']]) {
  test(`${name}: submits a corrected email on the first attempt without another blur`, async () => {
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 'test-public-key';
    window.grecaptcha = { ready: callback => callback(), execute: async () => 'test-token' };
    const sent = mock.method(global, 'fetch', async () => Response.json({ message: 'Message envoyé.' }));
    render(React.createElement(Form));
    fireEvent.change(screen.getByLabelText(/Nom.*\*/), { target: { value: 'Test visitor' } });
    if (name === 'contact') {
      fireEvent.change(screen.getByLabelText(/Sujet/), { target: { value: 'information' } });
      fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Bonjour' } });
    } else {
      fireEvent.change(screen.getByLabelText(/Instrument/), { target: { value: 'Flûte' } });
      fireEvent.change(screen.getByLabelText(/Expérience/), { target: { value: 'debutant' } });
    }
    const email = screen.getByLabelText(/Email.*\*/);
    fireEvent.change(email, { target: { value: 'wrong' } });
    fireEvent.blur(email);
    assert.equal(email.validity.customError, true);
    fireEvent.change(email, { target: { value: 'visitor@example.org' } });
    const form = screen.getByRole('button', { name: buttonLabel }).closest('form');
    act(() => form.requestSubmit());
    await screen.findByRole('status');
    assert.equal(sent.mock.callCount(), 1);
  });
}
