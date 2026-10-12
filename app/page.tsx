import NoUpcomingEvents from "@/components/no-upcoming-events"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/event-card"
import { partitionEvents } from "@/data/Events"

export const revalidate = 300

export default function Home() {
  const nextEvent = partitionEvents().upcoming[0]
  return <>
    <section className="relative bg-primary text-white">
      <Image src="/assets/montreuil.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 brand-gradient opacity-95" />
      <div className="container relative px-4 py-16 md:py-24 max-w-6xl">
        <p className="font-semibold text-white mb-4">Concerts, école de musique et orchestre</p>
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl mb-6">Harmonie de Montreuil-sur-Mer</h1>
        <p className="max-w-2xl text-lg mb-8">Écouter un concert, apprendre un instrument ou jouer ensemble : la musique se partage à Montreuil depuis 1865.</p>
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg" variant="secondary"><Link href={nextEvent ? `/evenements/${nextEvent.slug}` : "/evenements"}>{nextEvent ? "Découvrir le prochain concert" : "Voir les concerts"}</Link></Button>
          <Button asChild size="lg" variant="outline" className="bg-white text-primary"><Link href="/ecole-de-musique">Cours et inscriptions</Link></Button>
        </div>
      </div>
    </section>
    <section className="container max-w-6xl px-4 py-12 md:py-16">
      <h2 className="section-title mb-8">{nextEvent ? "À l’affiche" : "Nos concerts"}</h2>
      {nextEvent ? <EventCard event={nextEvent} /> : <NoUpcomingEvents />}
    </section>
    <section className="bg-muted py-12 md:py-16">
      <div className="container max-w-6xl px-4 grid md:grid-cols-2 gap-8 items-center">
        <Image src="/assets/formation-musicale.jpg" alt="Les élèves de l’école de musique en formation musicale" width={900} height={600} sizes="(max-width: 767px) 100vw, 50vw" className="rounded-lg aspect-[3/2] object-cover" />
        <div><h2 className="section-title mb-6">Apprendre la musique</h2><p className="mb-4">Éveil dès 4 ans, formation musicale et chant choral, cours d’instruments et pratique collective : chacun avance à son rythme.</p><p className="mb-6">Rencontrez l’équipe à l’école, rue du Paon, le mercredi de 14 h à 18 h.</p><div className="flex flex-wrap gap-3"><Button asChild><Link href="/ecole-de-musique">Découvrir les cours</Link></Button><Button asChild variant="outline"><Link href="/ecole-de-musique#tarifs">Consulter les tarifs</Link></Button></div></div>
      </div>
    </section>
    <section className="container max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
      <div><h2 className="section-title mb-6">Jouer dans l’harmonie</h2><p className="mb-4">Vous pratiquez un instrument et souhaitez partager la musique en groupe ? Venez rencontrer les musiciens.</p><p className="font-semibold mb-6">Répétitions le vendredi de 20 h 30 à 22 h, rue du Paon.</p><div className="flex flex-wrap gap-3"><Button asChild><Link href="/rejoindre">Rejoindre l’orchestre</Link></Button><Button asChild variant="outline"><Link href="/a-propos">L’harmonie et son équipe</Link></Button></div></div>
      <Image src="/assets/sainte-cecile-2025.jpg" alt="L’Harmonie réunie à la Sainte-Cécile 2025" width={1200} height={800} sizes="(max-width: 767px) 100vw, 50vw" className="rounded-lg aspect-[3/2] object-cover" />
    </section>
  </>
}
