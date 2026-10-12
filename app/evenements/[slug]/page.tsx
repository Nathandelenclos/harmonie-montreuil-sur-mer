import YouTubeEmbed from "@/components/youtube-embed"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { events } from "@/data/Events"
import { pageMetadata, siteUrl } from "@/lib/metadata"
import { Button } from "@/components/ui/button"

export const revalidate = 300
export const dynamicParams = false
export function generateStaticParams() { return events.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = events.find(event => event.slug === slug)
  if (!event) notFound()
  return pageMetadata(event.title, "Concert-spectacle le 28 novembre 2026 à 20 h 30, salle Rheinberg à Montreuil-sur-Mer. 10 €, gratuit pour les moins de 10 ans. Réservez sur HelloAsso.", `/evenements/${slug}`, event.image)
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = events.find(event => event.slug === slug)
  if (!event) notFound()
  const past = new Date(event.archiveAfter) <= new Date()
  const structuredData = {
    "@context": "https://schema.org", "@type": "MusicEvent", name: event.title,
    description: event.description, startDate: event.date.toISOString(),
    eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `${siteUrl}/evenements/${slug}`, image: [`${siteUrl}${event.image}`],
    location: { "@type": "Place", name: "Salle Rheinberg", address: { "@type": "PostalAddress", addressLocality: "Montreuil-sur-Mer", postalCode: "62170", addressCountry: "FR" } },
    organizer: { "@type": "MusicGroup", name: "Harmonie de Montreuil-sur-Mer", url: siteUrl },
    performer: { "@type": "MusicGroup", name: "Harmonie de Montreuil-sur-Mer et École de musique" },
    ...(!past && { offers: { "@type": "Offer", url: event.bookingUrl, price: 10, priceCurrency: "EUR", description: "Gratuit pour les moins de 10 ans" } }),
  }
  return <article className="site-container py-12 md:py-16">
    <nav aria-label="Fil d’Ariane" className="mb-8 flex flex-wrap items-center gap-x-3 text-sm text-primary"><Link href="/" className="inline-flex min-h-11 items-center underline">Accueil</Link><span aria-hidden="true">/</span><Link href="/evenements" className="inline-flex min-h-11 items-center underline">Concerts</Link><span aria-hidden="true">/</span><span aria-current="page">{event.title}</span></nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg">{event.image && <Image src={event.image} alt={`Affiche du concert ${event.title}`} fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-contain" />}</div>
      <div className="space-y-6 border-t-4 border-secondary pt-6">
        {past && <p className="font-bold text-primary">Ce concert a eu lieu.</p>}
        <h1 className="display-title font-bold text-primary">{event.title}</h1>
        <p className="text-xl font-semibold"><time dateTime={event.date.toISOString()}>Samedi 28 novembre 2026 · {event.time}</time></p>
        <p>{event.location}</p><p className="font-bold">{event.price}</p>
        {!past && <Button asChild size="lg" variant="secondary"><a href={event.bookingUrl}>Réserver sur HelloAsso</a></Button>}
        <h2 className="text-2xl font-bold text-primary">Un concert-spectacle légendaire</h2>
        <p className="leading-relaxed">{event.description}</p>
        <h2 className="text-2xl font-bold text-primary">Renseignements</h2>
        <p><a href="tel:+33668853079" className="text-primary underline">+33 6 68 85 30 79</a><br /><a href="mailto:harmoniemontreuilsurmer@orange.fr" className="text-primary underline [overflow-wrap:anywhere]">harmoniemontreuilsurmer@orange.fr</a></p>
        <p>Écrivez-nous aussi sur <a className="text-primary underline" href="https://www.instagram.com/harmoniemontreuilsurmer/">Instagram</a> ou <a className="text-primary underline" href="https://www.facebook.com/profile.php?id=100062936003912">Facebook</a>.</p>
      </div>
    </div>
    <section className="mt-16 grid grid-cols-1 items-center gap-8 border-t border-primary/20 pt-12 lg:grid-cols-2" aria-labelledby="concert-preview-title">
      <div><p className="mb-4 text-sm font-semibold text-primary">Un aperçu de l’orchestre</p><h2 id="concert-preview-title" className="section-title text-primary mb-6">Retrouvez-nous aussi en musique.</h2><p className="text-lg mb-6">Une captation de l’harmonie à Fruges pour découvrir un autre moment de scène.</p><Link href="/videos" className="home-text-link text-primary">Toutes les captations →</Link></div>
      <figure><YouTubeEmbed id="8SaXsLgCffM" title="The Greatest Showman — l’harmonie à Fruges" /><figcaption className="mt-3 text-sm text-muted-foreground">Vidéo publiée en avril 2025 par MARLENE47100.</figcaption></figure>
    </section>
  </article>
}
