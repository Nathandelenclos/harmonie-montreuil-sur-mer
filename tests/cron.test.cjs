const { test, beforeEach, afterEach, mock } = require('node:test');
const assert = require('node:assert/strict');
require('./register.cjs');
const { GET } = require('../app/api/cron/supabase/route.ts');
const request = token => new Request('https://example.test/api/cron/supabase', { headers: token ? { authorization: token } : {} });
beforeEach(() => { process.env.CRON_SECRET = 'test-only'; process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'; process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'test-public-key'; });
afterEach(() => mock.restoreAll());
test('unauthorized cron requests cannot query Supabase', async () => {
  const fetch = mock.method(global, 'fetch', async () => { throw new Error('must not query'); });
  for (const token of [undefined, 'Bearer wrong', 'Bearer test-onlx']) assert.equal((await GET(request(token))).status, 401);
  delete process.env.CRON_SECRET; assert.equal((await GET(request('Bearer undefined'))).status, 401);
  assert.equal(fetch.mock.callCount(), 0);
});
test('the authorized cron performs an uncached public database read', async () => {
  const fetch = mock.method(global, 'fetch', async () => Response.json([]));
  const response = await GET(request('Bearer test-only'));
  assert.equal(response.status, 200); assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.match(fetch.mock.calls[0].arguments[0], /published_content\?select=id&limit=1$/);
  assert.equal(fetch.mock.calls[0].arguments[1].cache, 'no-store');
});
test('database outages are reported as failed cron executions', async () => {
  mock.method(global, 'fetch', async () => new Response(null, { status: 503 }));
  assert.equal((await GET(request('Bearer test-only'))).status, 503);
  mock.method(global, 'fetch', async () => { throw new Error('offline'); });
  assert.equal((await GET(request('Bearer test-only'))).status, 503);
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  assert.equal((await GET(request('Bearer test-only'))).status, 503);
});
