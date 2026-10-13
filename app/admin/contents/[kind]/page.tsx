import { notFound } from 'next/navigation'
import { requireEditor } from '@/lib/editorial-admin'
import { isContentKind, kindLabels } from '@/src/editorial/domain/content'
import { Button } from '@/components/ui/button'

export default async function ContentListPage({ params }: { params: Promise<{ kind: string }> }) {
  const { repository } = await requireEditor()
  const { kind } = await params
  if (!isContentKind(kind)) notFound()
  const entries = await repository.list(kind)
  return <>
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6"><h1>{kindLabels[kind]}</h1><Button asChild><a href={`/admin/${kind}/new`}>{kind === 'event' ? 'Créer un événement' : kind === 'album' ? 'Créer un album' : 'Ajouter une vidéo'}</a></Button></div>
    {!entries.length ? <p className="py-12 border-y">Aucun contenu pour le moment. Créez votre premier {kind === 'album' ? 'album' : kind === 'event' ? 'événement' : 'contenu vidéo'}.</p> : <table className="admin-list"><caption>{entries.length} contenu{entries.length > 1 ? 's' : ''}</caption><thead><tr><th scope="col">Titre</th><th scope="col">Publication</th><th scope="col">Modifié le</th></tr></thead><tbody>{entries.map(entry => <tr key={entry.id}><td><a className="admin-link" href={`/admin/${kind}/${entry.id}`}>{entry.draft.title}</a></td><td>{entry.published_version === null ? 'Brouillon' : entry.published_version === entry.version ? 'Publié' : 'Modifications non publiées'}</td><td>{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeZone: 'Europe/Paris' }).format(new Date(entry.updated_at))}</td></tr>)}</tbody></table>}
  </>
}
