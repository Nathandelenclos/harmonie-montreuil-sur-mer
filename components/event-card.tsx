import Image from "next/image"
import Link from "next/link"
import type { Event } from "@/data/Events"
import { Button } from "@/components/ui/button"

export default function EventCard({ event, past = false }: { event: Event; past?: boolean }) {
  return (
    <article className="event-card overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="event-card-layout">
      <div className="relative aspect-[4/5] bg-muted">
        {event.image && <Image src={event.image} alt={`Affiche : ${event.title}`} fill sizes="(max-width: 767px) 100vw, 40vw" className="object-contain" />}
      </div>
      <div className="flex flex-col justify-center event-card-content gap-4 p-6 min-w-0">
        <p className="font-semibold text-primary">{past ? "Concert passé · " : "Prochain concert · "}<time dateTime={event.date.toISOString()}>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Europe/Paris" }).format(event.date)}</time></p>
        <h3 className="text-2xl md:text-3xl font-bold"><Link href={`/evenements/${event.slug}`} className="hover:underline">{event.title}</Link></h3>
        <p>{event.time} · {event.location}</p>
        <p className="text-muted-foreground">Un livre magique, des sirènes, des dragons et des chevaliers : un concert-spectacle avec la participation de l’École de musique.</p>
        <p className="font-semibold">{event.price}</p>
        <div className="flex flex-wrap gap-3">
          {!past && <Button asChild variant="secondary"><a href={event.bookingUrl}>Réserver sur HelloAsso</a></Button>}
          <Button asChild variant="outline"><Link href={`/evenements/${event.slug}`}>Programme et informations</Link></Button>
        </div>
      </div>
      </div>
    </article>
  )
}
