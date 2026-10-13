import { requireEditor } from '@/lib/editorial-admin'
import { isContentKind, kindLabels } from '@/src/editorial/domain/content'
import { Button } from '@/components/ui/button'
import { signOut } from './auth-actions'

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  const { repository, user } = await requireEditor()
  const params = await searchParams
  const kind = isContentKind(params.kind) ? params.kind : 'event'
  const entries = await repository.list(kind)
  return <>
    <div className="flex flex-wrap justify-between gap-6 mb-8"><div><h1>Les nouvelles de l’harmonie</h1><p>Préparez, vérifiez et publiez vos contenus.</p></div><form action={signOut}><p className="text-sm mb-2">{user.email}</p><Button variant="outline">Se déconnecter</Button></form></div>
    <nav className="admin-nav" aria-label="Rubriques de l’administration">{Object.entries(kindLabels).map(([value, label]) => <a key={value} href={`/admin?kind=${value}`} aria-current={value === kind ? 'page' : undefined}>{label}</a>)}</nav>
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6"><h2>{kindLabels[kind]}</h2><Button asChild><a href={`/admin/${kind}/new`}>{kind === 'event' ? 'Créer un événement' : kind === 'album' ? 'Créer un album' : 'Ajouter une vidéo'}</a></Button></div>
    {!entries.length ? <p className="py-12 border-y">Aucun contenu pour le moment. Créez votre premier {kind === 'album' ? 'album' : kind === 'event' ? 'événement' : 'contenu vidéo'}.</p> : <table className="admin-list"><caption>{entries.length} contenu{entries.length > 1 ? 's' : ''}</caption><thead><tr><th scope="col">Titre</th><th scope="col">Publication</th><th scope="col">Modifié le</th></tr></thead><tbody>{entries.map(entry => <tr key={entry.id}><td><a className="admin-link" href={`/admin/${kind}/${entry.id}`}>{entry.draft.title}</a></td><td>{entry.published_version === null ? 'Brouillon' : entry.published_version === entry.version ? 'Publié' : 'Modifications non publiées'}</td><td>{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeZone: 'Europe/Paris' }).format(new Date(entry.updated_at))}</td></tr>)}</tbody></table>}
  </>
}
