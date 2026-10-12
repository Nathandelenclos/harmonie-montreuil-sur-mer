import Image from "next/image"
import Link from "next/link"
import GoogleMap from "@/components/google-map"
import ContactForm from "@/components/contact-form"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return <div className="content-page">
    <PageHeader homeLink={<Link href="/">Accueil</Link>} eyebrow="Harmonie de Montreuil-sur-Mer" title="Et si on parlait musique ?"
      description="Un concert à organiser, l’envie de nous rejoindre ou une question sur l’association : écrivez-nous."
      media={<figure><Image src="/assets/archives/0b29b15e5107d464.webp" alt="Les musiciens de l’harmonie réunis avec leur bannière" width={1024} height={682} priority sizes="(max-width: 911px) 100vw, 50vw" className="w-full h-auto rounded-lg" /><figcaption className="mt-3 border-l-4 border-secondary pl-3 text-sm">L’Harmonie de Montreuil-sur-Mer · Archive 2018</figcaption></figure>}
      actions={<><Button asChild variant="secondary"><a href="#message">Écrire un message</a></Button><Link href="/ecole-de-musique#contacts" className="home-text-link">Contacter l’école →</Link></>}
    />
    <section className="site-container py-12 md:py-16">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div id="message" className="min-w-0"><ContactForm /></div>
        <div className="min-w-0">
          <h2 className="section-title mb-8">À votre écoute.</h2>
          <dl className="space-y-6">
            <div className="border-t border-primary/20 pt-5"><dt className="text-sm text-muted-foreground mb-2">Par email</dt><dd><a href="mailto:harmoniemontreuilsurmer@orange.fr" className="home-text-link text-primary [overflow-wrap:anywhere]">harmoniemontreuilsurmer@orange.fr</a></dd></div>
            <div className="border-t border-primary/20 pt-5"><dt className="text-sm text-muted-foreground mb-2">Par téléphone</dt><dd className="flex flex-wrap gap-x-6"><a href="tel:+33321860569" className="home-text-link text-primary">+33 3 21 86 05 69</a><a href="tel:+33668853079" className="home-text-link text-primary">+33 6 68 85 30 79</a></dd></div>
            <div className="border-t border-primary/20 pt-5"><dt className="text-sm text-muted-foreground mb-2">Pour nous trouver</dt><dd><a href="https://www.google.com/maps/search/?api=1&query=Harmonie+Municipale+Rue+du+Paon+Montreuil-sur-Mer" className="home-text-link text-primary">Rue du Paon, 62170 Montreuil-sur-Mer, France</a></dd></div>
            <div className="border-l-4 border-secondary pl-4"><dt className="font-semibold mb-2">Les répétitions</dt><dd>Tous les vendredis de 20 h 30 à 22 h<br />Rue du Paon, Montreuil-sur-Mer</dd></div>
          </dl>
          <div className="mt-8"><GoogleMap /></div>
        </div>
      </div>
      <div className="mt-12 border-t pt-6 flex flex-wrap justify-between gap-4"><p className="text-lg">Un aperçu de la vie de l’association ?</p><div className="flex flex-wrap gap-x-6"><Link href="/galerie" className="home-text-link text-primary">Le collectif en photos →</Link><Link href="/videos" className="home-text-link text-primary">Écouter l’harmonie →</Link></div></div>
    </section>
  </div>
}
