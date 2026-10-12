import NoUpcomingEvents from "@/components/no-upcoming-events"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/event-card"
import { partitionEvents } from "@/data/Events"
import { ArrowDown, ArrowUpRight } from "lucide-react"

export const revalidate = 300

export default function Home() {
  const nextEvent = partitionEvents().upcoming[0]
  return <div className="home-page">
    <section className="home-hero relative isolate overflow-hidden bg-primary text-white">
      <Image src="/assets/montreuil.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="home-hero-shade absolute inset-0" />
      <div className="container relative max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="home-hero-copy">
          <p className="mb-6 flex items-center gap-3 text-sm font-semibold"><span aria-hidden="true" className="h-px w-8 bg-secondary" />Concerts, école de musique et orchestre</p>
          <h1 className="home-title mb-8 font-bold">Harmonie de<br />Montreuil-sur-Mer</h1>
          <p className="max-w-lg text-base leading-relaxed md:text-lg">Écouter un concert, apprendre un instrument ou jouer ensemble : la musique se partage à Montreuil depuis 1865.</p>
        </div>
        <div className="home-hero-actions mt-8 flex flex-wrap gap-4">
          <Button asChild size="lg" variant="secondary" className="hover:bg-secondary hover:underline"><Link href={nextEvent ? `/evenements/${nextEvent.slug}` : "/evenements"}>{nextEvent ? "Découvrir le prochain concert" : "Voir les concerts"}</Link></Button>
          <Button asChild size="lg" variant="outline" className="border-white bg-white text-primary hover:bg-white hover:text-primary hover:underline"><Link href="/ecole-de-musique">Cours et inscriptions</Link></Button>
        </div>
        <a href="#a-laffiche" className="home-discover mt-12 inline-flex min-h-11 items-center gap-3 text-sm font-semibold underline-offset-4 hover:underline"><ArrowDown aria-hidden="true" className="h-5 w-5" />Découvrir l’harmonie</a>
      </div>
    </section>

    <section id="a-laffiche" className="home-concert container max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
        <h2 className="home-section-title font-bold text-primary">{nextEvent ? "À l’affiche" : "Nos concerts"}</h2>
        <Link href="/evenements" className="home-text-link text-primary">Tous les concerts<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></Link>
      </div>
      {nextEvent ? <EventCard event={nextEvent} /> : <NoUpcomingEvents />}
    </section>

    <section className="home-school bg-muted py-16 md:py-24">
      <div className="container grid max-w-7xl items-center gap-12 px-6 md:px-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="home-section-title mb-6 font-bold text-primary">Apprendre<br />la musique</h2>
          <p className="mb-6 max-w-lg text-lg leading-relaxed">Éveil dès 4 ans, formation musicale et chant choral, cours d’instruments et pratique collective : chacun avance à son rythme.</p>
          <p className="mb-8 max-w-lg leading-relaxed">Rencontrez l’équipe à l’école, rue du Paon, le mercredi de 14 h à 18 h.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg"><Link href="/ecole-de-musique">Découvrir les cours</Link></Button>
            <Link href="/ecole-de-musique#tarifs" className="home-text-link text-primary">Consulter les tarifs<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></Link>
          </div>
        </div>
        <div className="home-photo-grid grid grid-cols-2 items-start gap-4">
          <Image src="/assets/formation-musicale.jpg" alt="Les élèves de l’école de musique en formation musicale" width={900} height={600} sizes="(max-width: 1023px) 100vw, 50vw" className="col-span-2 aspect-[3/2] w-full rounded-lg object-cover" />
          <Image src="/assets/instruments/piano.jpeg" alt="Un piano" width={600} height={450} sizes="(max-width: 1023px) 50vw, 25vw" className="aspect-[4/3] w-full rounded-lg object-cover" />
          <Image src="/assets/instruments/saxophone.jpg" alt="Un saxophone" width={600} height={450} sizes="(max-width: 1023px) 50vw, 25vw" className="mt-6 aspect-[4/3] w-full rounded-lg object-cover" />
        </div>
      </div>
    </section>

    <section className="container max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <div className="home-orchestra overflow-hidden rounded-lg bg-primary text-white">
        <Image src="/assets/sainte-cecile-2025.jpg" alt="L’Harmonie réunie à la Sainte-Cécile 2025" width={1800} height={1349} sizes="(max-width: 1023px) 100vw, 60vw" className="h-auto w-full" />
        <div className="p-6 md:p-12">
          <h2 className="home-section-title mb-6 font-bold">Jouer dans l’harmonie</h2>
          <p className="mb-6 max-w-lg leading-relaxed">Vous pratiquez un instrument et souhaitez partager la musique en groupe ? Venez rencontrer les musiciens.</p>
          <p className="mb-8 max-w-lg font-semibold leading-relaxed">Répétitions le vendredi de 20 h 30 à 22 h, rue du Paon.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg" variant="secondary" className="hover:bg-secondary hover:underline"><Link href="/rejoindre">Rejoindre l’orchestre</Link></Button>
            <Link href="/a-propos" className="home-text-link">L’harmonie et son équipe<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </section>
  </div>
}
