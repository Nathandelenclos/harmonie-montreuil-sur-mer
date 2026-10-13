import { notFound } from 'next/navigation'
import { requireEditor } from '@/lib/editorial-admin'
import { isContentKind, kindLabels } from '@/src/editorial/domain/content'
import ContentEditor from '@/components/admin/connected-content-editor'
import { saveContent, transitionContent } from '../../content-actions'

export default async function EditorPage({ params }: { params: Promise<{ kind: string; id: string }> }) {
  const { repository } = await requireEditor()
  const { kind, id } = await params
  if (!isContentKind(kind)) notFound()
  const entry = id === 'new' ? null : await repository.get(id)
  if (id !== 'new' && (!entry || entry.kind !== kind)) notFound()
  return <><a href={`/admin?kind=${kind}`} className="admin-link mb-6">Retour : {kindLabels[kind]}</a><h1>{entry ? entry.draft.title : kind === 'album' ? 'Un nouvel album' : kind === 'video' ? 'Une nouvelle vidéo' : 'Un nouveau rendez-vous'}</h1><ContentEditor kind={kind} initialEntry={entry} onSave={saveContent} onTransition={transitionContent} /></>
}
