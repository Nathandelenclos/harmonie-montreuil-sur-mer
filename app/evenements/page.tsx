import NoUpcomingEvents from "@/components/no-upcoming-events"
import Link from "next/link"
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
    <PageHeader title="Concerts et événements" description="Le programme de l’Harmonie de Montreuil-sur-Mer" />
    <section className="container px-4 py-12 max-w-6xl">
      <h2 className="section-title mb-8">Prochains concerts</h2>
      <ul className="space-y-8">
        {upcoming.map(event => <li key={event.slug}><EventCard event={event} /></li>)}
      </ul>
      {!upcoming.length && <NoUpcomingEvents />}
    </section>
    {!!past.length && <section className="container px-4 py-12 max-w-6xl"><h2 className="section-title mb-8">Concerts passés</h2><ul className="space-y-8">{past.map(event => <li key={event.slug}><EventCard event={event} past /></li>)}</ul></section>}
    <section className="bg-muted py-12"><div className="container px-4 max-w-6xl"><h2 className="text-2xl font-bold mb-4">Inviter l’harmonie à votre événement</h2><p className="mb-6">Un concert, une fête ou une commémoration : échangeons sur votre projet.</p><Button asChild><Link href="/contact">Contacter l’harmonie</Link></Button></div></section>
  </>
}
