import NoUpcomingEvents from "@/components/no-upcoming-events"
import Link from "next/link"
import YouTubeEmbed from "@/components/youtube-embed"
import { partitionEvents } from "@/data/Events"
import { pageMetadata } from "@/lib/metadata"
import PageHeader from "@/components/page-header"
import EventCard from "@/components/event-card"
import { Button } from "@/components/ui/button"

export const metadata = pageMetadata("Concerts et événements", "Les concerts de l’Harmonie de Montreuil-sur-Mer : programmation, dates, lieux, tarifs et réservation en ligne.", "/evenements")
export const revalidate = 300

export default function EventsPage() {
  const { upcoming, past } = partitionEvents()
  return <>
    <PageHeader homeLink={<Link href="/">Accueil</Link>} title="Concerts et événements" description="Le programme de l’Harmonie de Montreuil-sur-Mer" />
    <section className="site-container py-16 md:py-24">
      <h2 className="section-title mb-8 text-primary">Prochains concerts</h2>
      <ul className="space-y-8">
        {upcoming.map(event => <li key={event.slug}><EventCard event={event} /></li>)}
      </ul>
      {!upcoming.length && <NoUpcomingEvents />}
    </section>
    {!!past.length && <section className="site-container py-16"><h2 className="section-title mb-8 text-primary">Concerts passés</h2><ul className="space-y-8">{past.map(event => <li key={event.slug}><EventCard event={event} past /></li>)}</ul></section>}
    <section id="videos" className="bg-muted py-16 md:py-24" aria-labelledby="videos-title">
      <div className="site-container">
        <div className="section-heading">
          <h2 id="videos-title" className="section-title text-primary">L’harmonie en concert</h2>
          <p className="section-subtitle">Trois captations de l’Harmonie de Montreuil-sur-Mer, publiées par MARLENE47100 sur YouTube.</p>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-default)),1fr))] gap-8">
          {[
            { id: "0DapvwTHhz4", title: "O’Connel’s Sacrée Soirée", description: "Projet Lille 3000 · 2025 · Simon Fache" },
            { id: "XQZA28P2dxY", title: "Morgana", description: "Fabien Roger · Concert d’automne 2024" },
            { id: "8SaXsLgCffM", title: "The Greatest Showman", description: "L’harmonie en concert à Fruges" },
          ].map(video => <li key={video.id}>
            <YouTubeEmbed id={video.id} title={video.title} />
            <h3 className="text-2xl font-bold text-primary mt-4 mb-3">{video.title}</h3>
            <p>{video.description}</p>
          </li>)}
        </ul>
        <p className="mt-8 mb-6">La lecture charge le lecteur YouTube et transmet des informations techniques à Google. <Link href="/politique-confidentialite" className="text-primary underline">Confidentialité</Link></p>
        <Button asChild><Link href="/videos">Toutes les vidéos de Montreuil →</Link></Button>
      </div>
    </section>
    <section className="callout"><div className="site-container"><h2 className="section-title mb-6">Inviter l’harmonie à votre événement</h2><p className="mb-8 max-w-2xl text-lg">Un concert, une fête ou une commémoration : échangeons sur votre projet.</p><Button asChild variant="secondary"><Link href="/contact">Contacter l’harmonie</Link></Button></div></section>
  </>
}
