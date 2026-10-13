import albums from '@/data/photo-albums.json'
import videos from '@/data/videos.json'
import recordings from '@/data/recordings.json'
import { events } from '@/data/Events'
import { emptyContent, type Content, type ContentKind } from '../domain/content'

export function legacyContent(): { kind: ContentKind; content: Content }[] {
  const groupedIds = new Set(recordings.flatMap(group => group.recordings).filter(r => r.provider === 'YouTube').map(r => r.source.replace('#youtube-', '')))
  return [
    ...events.map(event => ({ kind: 'event' as const, content: { ...emptyContent(), ...event, image: event.image ? { src: event.image, title: event.title, width: 1200, height: 1500 } : null, date: event.date.toISOString(), featured: !!event.featured } })),
    ...albums.map(album => ({ kind: 'album' as const, content: { ...emptyContent(), ...album } })),
    ...recordings.flatMap(group => group.recordings.map(recording => {
      const youtubeId = recording.source.replace('#youtube-', '')
      return { kind: 'video' as const, content: { ...emptyContent(), title: recording.title, slug: `${group.id}-${recording.id}`.toLowerCase().replace(/[^a-z0-9-]/g, '-'), source: recording.provider === 'YouTube' ? `https://www.youtube.com/watch?v=${youtubeId}` : recording.source, year: group.year, album: group.album || '', group: group.id, groupTitle: group.title, groupDescription: group.description, image: { src: recording.poster, title: '', width: 1280, height: 720 } } }
    })),
    ...videos.filter(video => !groupedIds.has(video.id)).map(video => ({ kind: 'video' as const, content: { ...emptyContent(), title: video.title, description: video.description, slug: `youtube-${video.id.toLowerCase()}`.replace(/[^a-z0-9]+/g, "-").replace(/-$/, ""), source: `https://www.youtube.com/watch?v=${video.id}`, year: video.published.slice(0, 4), image: { src: `/assets/videos/${video.id}.jpg`, title: '', width: 1280, height: 720 } } })),
  ]
}
