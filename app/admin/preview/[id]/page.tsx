import { notFound } from 'next/navigation'
import { requireEditor } from '@/lib/editorial-admin'
import { asEvent } from '@/lib/published-content'
import { parseVideoUrl } from '@/src/editorial/domain/content'
import EventDetail from '@/components/event-detail'
import PhotoGallery from '@/components/photo-gallery'
import RecordingEmbed from '@/components/recording-embed'
import YouTubeEmbed from '@/components/youtube-embed'

export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { repository } = await requireEditor()
  const entry = await repository.get((await params).id)
  if (!entry) notFound()
  const content = entry.draft
  const video = entry.kind === 'video' ? parseVideoUrl(content.source) : null
  return <><aside className="admin-preview-banner">Aperçu du brouillon enregistré. Ce contenu n’est pas publié par cette action. <a className="admin-link" href={`/admin/${entry.kind}/${entry.id}`}>Revenir à la modification</a></aside>
    {entry.kind === 'event' && <EventDetail event={asEvent(content)} />}
    {entry.kind === 'album' && <><h1>{content.title}</h1><p className="mb-6 whitespace-pre-line">{content.description}</p><PhotoGallery photos={content.photos} title={content.title} /></>}
    {entry.kind === 'video' && video && <><h1>{content.title}</h1><p className="mb-6 whitespace-pre-line">{content.description}</p>{video.provider === 'YouTube' ? <YouTubeEmbed id={video.id} title={content.title} poster={content.image?.src || '/assets/brand/crest.webp'} /> : <RecordingEmbed provider={video.provider} source={video.source} title={content.title} poster={content.image?.src || '/assets/brand/crest.webp'} />}</>}
  </>
}
