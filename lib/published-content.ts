import { createClient } from '@supabase/supabase-js'
import { supabaseConfig } from './supabase/config'
import { legacyContent } from '@/src/editorial/infrastructure/legacy-content'
import { parseVideoUrl, validateContent, type Content, type ContentKind } from '@/src/editorial/domain/content'
import type { Event } from '@/data/Events'

export async function publishedContent(kind: ContentKind): Promise<Content[]> {
  if (process.env.CONTENT_SOURCE !== 'supabase') return legacyContent().filter(entry => entry.kind === kind).map(entry => entry.content)
  const config = supabaseConfig()
  if (!config) throw new Error('The published content source is not configured')
  const client = createClient(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (url, options) => fetch(url, { ...options, next: { revalidate: 300 } }) } })
  const { data, error } = await client.from('published_content').select('data').eq('kind', kind).order('published_at')
  if (error) throw new Error('Published content is unavailable', { cause: error })
  return data.map(row => {
    if (Object.keys(validateContent(kind, row.data, true)).length) throw new Error('Published content does not match its contract')
    return row.data as Content
  })
}

export function asEvent(content: Content): Event {
  return { ...content, image: content.image?.src, date: new Date(content.date), time: new Intl.DateTimeFormat('fr-FR', { hour: 'numeric', minute: '2-digit', timeZone: 'Europe/Paris' }).format(new Date(content.date)).replace(':', ' h ') }
}
export async function publishedEvents() { return (await publishedContent('event')).map(asEvent) }
export async function publishedAlbums() { return (await publishedContent('album')).map(album => ({ ...album, cover: album.image || album.photos[0] })) }

export function videoCatalog(contents: Content[]) {
  const videos: { id: string; title: string; description: string; published: string; poster: string }[] = []
  const recordings: { id: string; title: string; description: string; album: string | null; year: string; recordings: { id: string; title: string; description: string; provider: string; source: string; poster: string }[] }[] = []
  for (const content of contents) {
    const video = parseVideoUrl(content.source)
    if (!video) continue
    const poster = content.image?.src || '/assets/brand/crest.webp'
    if (video.provider === 'YouTube') videos.push({ id: video.id, title: content.title, description: content.description, published: `${content.year}-01-01`, poster })
    if (content.group || video.provider !== 'YouTube') {
      const groupId = content.group || content.slug
      let group = recordings.find(g => g.id === groupId && g.year === content.year)
      if (!group) { group = { id: groupId, title: content.groupTitle || content.title, description: content.groupDescription || content.description, album: content.album || null, year: content.year, recordings: [] }; recordings.push(group) }
      group.recordings.push({ id: content.slug, title: content.title, description: content.description, provider: video.provider, source: video.provider === 'YouTube' ? `#youtube-${video.id}` : video.source, poster })
    }
  }
  return { videos, recordings }
}
export async function publishedVideos() { return videoCatalog(await publishedContent('video')) }
