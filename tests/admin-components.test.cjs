const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost:3000/admin/event/new' });
for (const name of ['window', 'document', 'HTMLElement', 'HTMLInputElement', 'MutationObserver', 'getComputedStyle', 'FormData']) global[name] = dom.window[name];
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.IS_REACT_ACT_ENVIRONMENT = true;
const React = require('react');
const { render, screen, fireEvent, cleanup, waitFor } = require('@testing-library/react');
const ContentEditor = require('../components/admin/content-editor.tsx').default;
const AuthForm = require('../components/admin/auth-form.tsx').default;
const { emptyContent } = require('../src/editorial/domain/content.ts');
afterEach(cleanup);
const content = { ...emptyContent(), title: 'Album test', slug: 'album-test', photos: [{ src: '/assets/montreuil.jpg', title: 'Vue de Montreuil', width: 1600, height: 900 }] };
const entry = () => ({ id: 'sample', kind: 'album', draft: structuredClone(content), version: 1, published_version: null, updated_at: new Date().toISOString() });

test('a failed save preserves captions and offers another attempt', async () => {
  let attempts = 0;
  render(React.createElement(ContentEditor, { kind: 'album', initialEntry: entry(), onSave: async input => ++attempts === 1 ? { ok: false, errors: { form: 'Indisponible, réessayez.' } } : { ok: true, entry: { ...entry(), draft: Object.fromEntries(Object.entries(input.content).sort()), version: 2 } }, onTransition: async () => ({ ok: true }) }));
  fireEvent.change(screen.getByLabelText('Légende de la photo 1'), { target: { value: 'Notre concert' } });
  assert.equal(screen.getByRole('button', { name: 'Publier' }).disabled, true);
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer le brouillon' }));
  assert.match((await screen.findByRole('alert')).textContent, /réessayez/);
  assert.equal(screen.getByLabelText('Légende de la photo 1').value, 'Notre concert');
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer le brouillon' }));
  await waitFor(() => assert.match(screen.getByRole('status').textContent, /Brouillon enregistré/));
  assert.equal(screen.getByRole('button', { name: 'Publier' }).disabled, false);
  assert.ok(screen.getByRole('link', { name: /Prévisualiser/ }));
});
test('moving a photo updates the visible caption order', () => {
  const initial = entry(); initial.draft.photos.push({ ...initial.draft.photos[0], src: '/assets/sainte-cecile-2025.jpg', title: 'Deuxième' });
  render(React.createElement(ContentEditor, { kind: 'album', initialEntry: initial, onSave: async () => ({ ok: true }), onTransition: async () => ({ ok: true }) }));
  fireEvent.click(screen.getByRole('button', { name: 'Monter la photo 2' }));
  assert.equal(screen.getByLabelText('Légende de la photo 1').value, 'Deuxième');
  assert.equal(screen.getByLabelText('Légende de la photo 2').value, 'Vue de Montreuil');
});
test('choosing the cover announces which photo is selected', () => {
  render(React.createElement(ContentEditor, { kind: 'album', initialEntry: entry(), onSave: async () => ({ ok: true }), onTransition: async () => ({ ok: true }) }));
  const cover = screen.getByRole('button', { name: 'Couverture' });
  fireEvent.click(cover);
  assert.equal(cover.getAttribute('aria-pressed'), 'true');
});
test('a successful publication shows confirmation and updates the saved version', async () => {
  const initial = entry();
  let called;
  render(React.createElement(ContentEditor, { kind: 'album', initialEntry: initial, onSave: async () => ({ ok: true }), onTransition: async (id, version, action) => { called = { id, version, action }; return { ok: true, entry: { ...initial, version: 2, published_version: 2 } }; } }));
  fireEvent.click(screen.getByRole('button', { name: 'Publier' }));
  await waitFor(() => assert.equal(screen.getByRole('status').textContent, 'Contenu publié.'));
  assert.deepEqual(called, { id: 'sample', version: 1, action: 'publish' });
  assert.ok(screen.getByRole('button', { name: 'Retirer du site' }));
});
test('an interrupted batch retains successfully imported images', async () => {
  let count = 0;
  render(React.createElement(ContentEditor, { kind: 'album', initialEntry: entry(), onSave: async () => ({ ok: true }), onTransition: async () => ({ ok: true }), importImage: async () => { if (++count === 2) throw new Error('Réessayez.'); return { src: '/assets/sainte-cecile-2025.jpg', title: '', width: 1200, height: 900 }; } }));
  fireEvent.change(screen.getByLabelText(/Ajouter des photos/), { target: { files: [new File(['a'], 'concert.jpg', { type: 'image/jpeg' }), new File(['b'], 'orchestre.jpg', { type: 'image/jpeg' })] } });
  await screen.findByRole('alert');
  assert.equal(screen.getByLabelText('Légende de la photo 2').value, 'concert');
  assert.match(screen.getByRole('alert').textContent, /déjà importées sont conservées/);
});
test('an invalid email is announced after leaving the field', () => {
  render(React.createElement(AuthForm, { mode: 'login', action: async () => ({ error: 'Connexion refusée.' }) }));
  const email = screen.getByLabelText('Adresse e-mail');
  fireEvent.change(email, { target: { value: 'invalid' } }); fireEvent.blur(email);
  assert.equal(email.getAttribute('aria-invalid'), 'true');
  assert.match(screen.getByRole('alert').textContent, /nom@domaine.fr/);
});
test('a refused login preserves the email and offers another attempt', async () => {
  render(React.createElement(AuthForm, { mode: 'login', action: async () => ({ error: 'Connexion refusée.' }) }));
  const email = screen.getByLabelText('Adresse e-mail');
  fireEvent.change(email, { target: { value: 'editor@example.test' } });
  fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'test-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }));
  await waitFor(() => assert.match(screen.getByRole('alert').textContent, /Connexion refusée/));
  assert.equal(email.value, 'editor@example.test');
});

test('recovery codes use a labeled input without appearing in navigation URLs', async () => {
  render(React.createElement(AuthForm, { mode: 'verify', action: async () => ({ error: 'Le code est incorrect ou expiré.' }) }));
  fireEvent.change(screen.getByLabelText('Adresse e-mail'), { target: { value: 'editor@example.test' } });
  const code = screen.getByLabelText('Code à 6 chiffres');
  assert.equal(code.autocomplete, 'one-time-code');
  fireEvent.change(code, { target: { value: '123456' } });
  fireEvent.click(screen.getByRole('button', { name: 'Vérifier le code' }));
  await screen.findByRole('alert');
  assert.equal(window.location.search, '');
  assert.equal(window.location.hash, '');
});
