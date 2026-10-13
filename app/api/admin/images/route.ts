import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { getEditor } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) return new NextResponse(null, { status: 403 })
  const editor = await getEditor()
  if (!editor) return new NextResponse(null, { status: 401 })
  if (!request.body || Number(request.headers.get('content-length') || 0) > 2097152) return new NextResponse(null, { status: 413 })
  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.length
    if (size > 2097152) { await reader.cancel(); return new NextResponse(null, { status: 413 }) }
    chunks.push(value)
  }
  let image
  try {
    image = await sharp(Buffer.concat(chunks), { limitInputPixels: 16000000, animated: false }).rotate().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toBuffer({ resolveWithObject: true })
  } catch { return NextResponse.json({ error: 'Image illisible.' }, { status: 400 }) }
  const name = `${crypto.randomUUID()}.webp`
  const { error } = await editor.client.storage.from('editorial-images').upload(name, image.data, { contentType: 'image/webp', upsert: false })
  if (error) return NextResponse.json({ error: 'Import indisponible.' }, { status: 503 })
  return NextResponse.json({ src: `/media/${name}`, width: image.info.width, height: image.info.height, title: '' }, { headers: { 'Cache-Control': 'private, no-store' } })
}
