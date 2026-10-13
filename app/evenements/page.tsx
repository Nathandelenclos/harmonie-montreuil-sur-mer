import Image from "next/image"
import NoUpcomingEvents from "@/components/no-upcoming-events"
import Link from "next/link"
import YouTubeEmbed from "@/components/youtube-embed"
import { publishedEvents } from "@/lib/published-content"
import { partitionEvents } from "@/data/Events"
import { pageMetadata } from "@/lib/metadata"
import PageHeader from "@/components/page-header"
import EventCard from "@/components/event-card"
import { Button } from "@/components/ui/button"

export const metadata = pageMetadata("Concerts et événements", "Les concerts de l’Harmonie de Montreuil-sur-Mer : programmation, dates, lieux, tarifs et réservation en ligne.", "/evenements")
export const revalidate = 300

export default async function EventsPage() {
  const { upcoming, past } = partitionEvents(new Date(), await publishedEvents())
  return <>
    <PageHeader homeLink={<Link href="/">Accueil</Link>} eyebrow="À l’affiche et en souvenirs" title="La musique se vit ensemble." description="Retrouvez les prochains rendez-vous de l’harmonie et prolongez le concert avec nos captations."
      media={<figure><Image src="/assets/archives/911bcb816da624c3.webp" alt="L’harmonie en concert à la Chartreuse de Neuville en 2026" width={1600} height={1071} priority sizes="(max-width: 911px) 100vw, 50vw" className="w-full h-auto rounded-lg" /><figcaption className="mt-3 border-l-4 border-secondary pl-3 text-sm">Chartreuse de Neuville · 2026</figcaption></figure>}
      actions={<><Button asChild variant="secondary"><a href="#programme">Voir le programme</a></Button><Link href="#videos" className="home-text-link">Écouter l’harmonie →</Link></>}
    />
    <section id="programme" className="site-container py-12 md:py-16">
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
        <ul className="concert-recordings grid items-start gap-8">
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
        <Button asChild className="mt-8"><Link href="/videos">Toutes les vidéos de Montreuil →</Link></Button>
      </div>
    </section>
    <section className="site-container py-12 md:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <figure><Image src="/assets/archives/a86f5ea708073ab6.webp" alt="Les musiciens réunis sur scène lors de Sacrée Fiesta" width={1600} height={999} sizes="(max-width: 1023px) 100vw, 50vw" className="w-full h-auto rounded-lg" /><figcaption className="mt-3 border-l-4 border-secondary pl-3 text-sm text-muted-foreground">Sacrée Fiesta · 2025</figcaption></figure>
        <div><h2 className="section-title text-primary mb-6">La scène se raconte aussi en photos.</h2><p className="mb-6 text-lg">Concerts, rencontres et souvenirs : retrouvez les albums de l’harmonie.</p><Button asChild variant="outline"><Link href="/galerie">Parcourir les albums</Link></Button></div>
      </div>
    </section>
    <section className="callout"><div className="site-container"><h2 className="section-title mb-6">Inviter l’harmonie à votre événement</h2><p className="mb-8 max-w-2xl text-lg">Un concert, une fête ou une commémoration : échangeons sur votre projet.</p><Button asChild variant="secondary"><Link href="/contact">Contacter l’harmonie</Link></Button></div></section>
  </>
}
