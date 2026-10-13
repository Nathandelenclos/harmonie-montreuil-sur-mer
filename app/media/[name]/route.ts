import { NextResponse } from 'next/server'
import { createSessionClient } from '@/lib/supabase/server'

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  if (!/^[a-f0-9-]{36}\.webp$/.test(name)) return new NextResponse(null, { status: 404 })
  const client = await createSessionClient(true)
  const { data, error } = await client.storage.from('editorial-images').download(name)
  if (error || !data) return new NextResponse(null, { status: 404, headers: { 'Cache-Control': 'private, no-store' } })
  return new NextResponse(data, { headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' } })
}
