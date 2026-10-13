import type { DashboardData } from '@/src/editorial/application/dashboard-reader'

const inboxHref = '/admin/submissions'
const kindLabels = { event: 'Événement', album: 'Album photo', video: 'Vidéo' }
const createLinks = [
  { href: '/admin/event/new', label: 'Créer un événement', detail: 'Annoncer le prochain rendez-vous.' },
  { href: '/admin/album/new', label: 'Créer un album photo', detail: 'Partager les souvenirs de l’harmonie.' },
  { href: '/admin/video/new', label: 'Ajouter une vidéo', detail: 'Faire découvrir une captation.' },
]
export default function Dashboard({ data }: { data: DashboardData }) {
  return <>
    <header className="dashboard-heading"><div><p className="admin-overline">Bienvenue dans votre espace</p><h1>Tableau de bord</h1><p>Les demandes à suivre, les contenus à préparer.</p></div><a className="admin-primary-action" href={createLinks[0].href}>Créer un événement</a></header>
    <div className="dashboard-summary"><a href={inboxHref}><strong>{data.newRequestsCount}</strong><span>{data.newRequestsCount > 1 ? 'nouvelles demandes' : 'nouvelle demande'}</span></a><div><strong>{data.draftsCount}</strong><span>{data.draftsCount > 1 ? 'brouillons à publier' : 'brouillon à publier'}</span></div></div>
    <div className="dashboard-grid">
      <section className="dashboard-panel"><div className="dashboard-section-heading"><h2>Demandes à traiter</h2><a className="admin-link" href={inboxHref}>Toutes les demandes</a></div>
        {!data.newRequests.length ? <div className="dashboard-empty"><p>Aucune nouvelle demande.</p><p>Les messages envoyés depuis le site apparaîtront ici.</p><a className="admin-link" href={inboxHref}>Consulter les demandes traitées</a></div> : <ul className="dashboard-items">{data.newRequests.map(item => <li key={item.id}><a href={`${inboxHref}?status=new#request-${item.id}`}><strong>{item.subject}</strong><span>{item.name || 'Visiteur'} · {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeZone: 'Europe/Paris' }).format(new Date(item.created_at))}</span></a></li>)}</ul>}
      </section>
      <section className="dashboard-create"><h2>Faire vivre le site</h2><p>Préparez un contenu à votre rythme, puis publiez-le lorsqu’il est prêt.</p><ul>{createLinks.map(item => <li key={item.href}><a href={item.href}><strong>{item.label}</strong><span>{item.detail}</span></a></li>)}</ul></section>
      <section className="dashboard-panel dashboard-drafts"><div className="dashboard-section-heading"><h2>Reprendre un brouillon</h2><span>Les 5 derniers modifiés</span></div>
        {!data.drafts.length ? <div className="dashboard-empty"><p>Aucun brouillon en attente.</p><a className="admin-link" href={createLinks[0].href}>Préparer votre prochain événement</a></div> : <ul className="dashboard-items">{data.drafts.map(item => <li key={item.id}><a href={`/admin/${item.kind}/${item.id}`}><strong>{item.title}</strong><span>{kindLabels[item.kind]} · Brouillon</span></a></li>)}</ul>}
      </section>
    </div>
  </>
}
