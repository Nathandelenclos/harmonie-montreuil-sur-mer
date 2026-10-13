// Defaults to validation only. Explicit --apply imports missing content without overwriting edits.
require('../tests/register.cjs');
const { createClient } = require('@supabase/supabase-js');
const { legacyContent } = require('../src/editorial/infrastructure/legacy-content.ts');
const { validateContent } = require('../src/editorial/domain/content.ts');

async function main() {
  const items = legacyContent();
  for (const item of items) {
    const errors = validateContent(item.kind, item.content, true);
    if (Object.keys(errors).length) throw new Error(`Invalid legacy content: ${item.kind}/${item.content.slug}: ${Object.keys(errors).join(', ')}`);
  }
  if (new Set(items.map(item => `${item.kind}/${item.content.slug}`)).size !== items.length) throw new Error('Duplicate legacy identifiers');
  if (!process.argv.includes('--apply')) { console.log(`${items.length} contents validated. No database changes.`); return; }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Inject NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY into the process environment.');
  const client = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await client.rpc('import_legacy_content', { items });
  if (error) throw new Error(`Import failed (${error.code || 'network'}). No partial import was committed.`);
  console.log(`${data} contents imported; existing entries preserved. Original public assets remain served by Vercel.`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
