import Image from 'next/image'
import type { Event } from '@/data/Events'
import { Button } from '@/components/ui/button'

export default function EventDetail({ event }: { event: Event }) {
  const past = new Date(event.archiveAfter) <= new Date()
  return <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
    <div className="relative aspect-[4/5] overflow-hidden rounded-lg">{event.image && <Image src={event.image} unoptimized={event.image.startsWith('/media/')} alt={`Affiche du concert ${event.title}`} fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-contain" />}</div>
    <div className="space-y-6 border-t-4 border-secondary pt-6">
      {past && <p className="font-bold text-primary">Ce concert a eu lieu.</p>}
      <h1 className="display-title font-bold text-primary">{event.title}</h1>
      <p className="text-xl font-semibold"><time dateTime={event.date.toISOString()}>{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeZone: 'Europe/Paris' }).format(event.date)} · {event.time}</time></p>
      <p>{event.location}</p><p className="font-bold">{event.price}</p>
      {!past && event.bookingUrl && <Button asChild size="lg" variant="secondary"><a href={event.bookingUrl}>{new URL(event.bookingUrl).hostname === 'www.helloasso.com' ? 'Réserver sur HelloAsso' : 'Réserver'}</a></Button>}
      <h2 className="text-2xl font-bold text-primary">À propos du concert</h2><p className="leading-relaxed whitespace-pre-line">{event.description}</p>
      <h2 className="text-2xl font-bold text-primary">Renseignements</h2><p><a href="tel:+33668853079" className="text-primary underline">+33 6 68 85 30 79</a><br /><a href="mailto:harmoniemontreuilsurmer@orange.fr" className="text-primary underline [overflow-wrap:anywhere]">harmoniemontreuilsurmer@orange.fr</a></p>
    </div>
  </div>
}
