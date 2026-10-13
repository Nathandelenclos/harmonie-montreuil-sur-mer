import YouTubeEmbed from "@/components/youtube-embed"
import EventDetail from "@/components/event-detail"
import Link from "next/link"
import { notFound } from "next/navigation"
import { publishedEvents } from "@/lib/published-content"
import { pageMetadata, siteUrl } from "@/lib/metadata"

export const revalidate = 300
export const dynamicParams = true
export async function generateStaticParams() { return (await publishedEvents()).map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = (await publishedEvents()).find(event => event.slug === slug)
  if (!event) notFound()
  return pageMetadata(event.title, (event.description.trim() || `${event.title} à ${event.location}. Retrouvez les informations du concert de l’Harmonie de Montreuil-sur-Mer.`).slice(0, 180), `/evenements/${slug}`)
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = (await publishedEvents()).find(event => event.slug === slug)
  if (!event) notFound()
  const past = new Date(event.archiveAfter) <= new Date()
  const structuredData = {
    "@context": "https://schema.org", "@type": "MusicEvent", name: event.title,
    description: event.description, startDate: event.date.toISOString(),
    eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `${siteUrl}/evenements/${slug}`, ...(event.image && { image: [`${siteUrl}${event.image}`] }),
    location: { "@type": "Place", name: event.location },
    organizer: { "@type": "MusicGroup", name: "Harmonie de Montreuil-sur-Mer", url: siteUrl },
    performer: { "@type": "MusicGroup", name: "Harmonie de Montreuil-sur-Mer et École de musique" },
    ...(!past && event.bookingUrl && { offers: { "@type": "Offer", url: event.bookingUrl, description: event.price } }),
  }
  return <article className="site-container py-12 md:py-16">
    <nav aria-label="Fil d’Ariane" className="mb-8 flex flex-wrap items-center gap-x-3 text-sm text-primary"><Link href="/" className="inline-flex min-h-11 items-center underline">Accueil</Link><span aria-hidden="true">/</span><Link href="/evenements" className="inline-flex min-h-11 items-center underline">Concerts</Link><span aria-hidden="true">/</span><span aria-current="page">{event.title}</span></nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <EventDetail event={event} />
    <section className="mt-16 grid grid-cols-1 items-center gap-8 border-t border-primary/20 pt-12 lg:grid-cols-2" aria-labelledby="concert-preview-title">
      <div><p className="mb-4 text-sm font-semibold text-primary">Un aperçu de l’orchestre</p><h2 id="concert-preview-title" className="section-title text-primary mb-6">Retrouvez-nous aussi en musique.</h2><p className="text-lg mb-6">Une captation de l’harmonie à Fruges pour découvrir un autre moment de scène.</p><Link href="/videos" className="home-text-link text-primary">Toutes les captations →</Link></div>
      <figure><YouTubeEmbed id="8SaXsLgCffM" title="The Greatest Showman — l’harmonie à Fruges" /><figcaption className="mt-3 text-sm text-muted-foreground">Vidéo publiée en avril 2025 par MARLENE47100.</figcaption></figure>
    </section>
  </article>
}
