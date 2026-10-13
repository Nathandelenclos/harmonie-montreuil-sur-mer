import { timingSafeEqual } from 'node:crypto'
import { supabaseConfig } from '@/lib/supabase/config'

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  const provided = Buffer.from(request.headers.get('authorization') ?? '')
  const expected = Buffer.from(`Bearer ${secret ?? ''}`)
  const headers = { 'Cache-Control': 'no-store' }
  if (!secret || provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401, headers })
  }
  const config = supabaseConfig()
  if (!config) return Response.json({ ok: false }, { status: 503, headers })
  try {
    const response = await fetch(`${config.url}/rest/v1/published_content?select=id&limit=1`, {
      headers: { apikey: config.key, Authorization: `Bearer ${config.key}` },
      cache: 'no-store', signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) throw new Error('Database unavailable')
    return Response.json({ ok: true }, { headers })
  } catch {
    return Response.json({ ok: false }, { status: 503, headers })
  }
}
