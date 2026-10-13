import MediaFeature from "@/components/media-feature"
import YouTubeEmbed from "@/components/youtube-embed"
import JoinForm from "@/components/join-form"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import Link from "next/link"
import Image from "next/image"

export default function JoinPage() {
  return (
    <div className="content-page">
      <PageHeader homeLink={<Link href="/">Accueil</Link>} eyebrow="Rejoindre l’harmonie" title="Votre place dans l’orchestre."
        description="Vous jouez d’un instrument, vous reprenez après une pause ou vous souhaitez partager votre expérience ? Venez rencontrer les musiciens."
        media={<figure><Image src="/assets/archives/0ebe50977a8de8d1.webp" alt="Les musiciens de l’Harmonie réunis au château en Dordogne" width={1600} height={1071} priority sizes="(max-width: 911px) 100vw, 50vw" className="w-full h-auto rounded-lg" /><figcaption className="mt-3 border-l-4 border-secondary pl-3 text-sm">Un souvenir partagé en Dordogne · 2026.</figcaption></figure>}
        actions={<><Button asChild variant="secondary"><a href="#rejoindre-formulaire">Faire connaissance</a></Button><Link className="home-text-link" href="/ecole-de-musique">Je souhaite apprendre →</Link></>}
      />

      <section className="site-container py-12 md:py-16" aria-labelledby="join-reasons-title">
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <h2 id="join-reasons-title" className="section-title">Un instrument.<br />Un groupe. Des moments partagés.</h2>
          <div className="space-y-4 text-lg text-muted-foreground"><p>L’harmonie accueille des musiciens de tous niveaux et de tous âges : amateurs, jeunes issus de l’école de musique, musiciens confirmés ou anciens musiciens souhaitant reprendre.</p><p className="border-l-4 border-secondary pl-4 font-semibold text-primary">Répétitions le vendredi de 20 h 30 à 22 h, rue du Paon.</p></div>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-default)),1fr))] gap-8">
          {[
            ['Pratiquer régulièrement', 'Un ensemble, un répertoire varié et accessible, et le plaisir de faire de la musique chaque semaine.'],
            ['Trouver un collectif', 'Bonne humeur, entraide et convivialité : la vie de l’harmonie se partage aussi au-delà des partitions.'],
            ['Progresser ensemble', 'Les conseils de musiciens expérimentés pour avancer à votre rythme dans un cadre bienveillant.'],
          ].map(([title, description]) => <li key={title} className="border-t-4 border-secondary pt-6"><h3 className="text-2xl font-bold text-primary mb-4">{title}</h3><p className="text-muted-foreground">{description}</p></li>)}
        </ul>
      </section>

      <section className="bg-muted py-12 md:py-16">
        <div className="site-container grid items-center gap-8 lg:grid-cols-2">
          <Image src="/assets/archives/2908f7532e393c5f.webp" alt="Les élèves de la classe orchestre réunis sur scène en 2026" width={1600} height={900} sizes="(max-width: 1023px) 100vw, 50vw" className="w-full max-h-96 object-contain rounded-lg" />
          <div><p className="text-sm font-semibold text-primary mb-4">L’école de musique</p><h2 className="section-title mb-6">Avant la scène,<br />les premiers pas.</h2><p className="text-lg mb-4">Cours d’instruments, formation musicale et pratique collective : l’école accueille les élèves de tous âges, débutants ou confirmés.</p><p className="text-muted-foreground mb-6">Dès que votre niveau le permet, vous pouvez participer aux répétitions et intégrer progressivement l’harmonie.</p><Button asChild><Link href="/ecole-de-musique">Découvrir l’école de musique</Link></Button></div>
        </div>
      </section>

      <MediaFeature id="join-stage-title" eyebrow="L’harmonie et la classe orchestre" title="Partager la scène."
        media={<figure><YouTubeEmbed id="KGIi6CUYmLw" title="Wellerman — final avec la classe orchestre de Montreuil" /><figcaption className="mt-3 text-sm">Wellerman · Final avec la classe orchestre · Vidéo publiée en avril 2024 par MARLENE47100.</figcaption></figure>}
        actions={<Button asChild variant="secondary"><a href="#rejoindre-formulaire">Rencontrer l’harmonie</a></Button>}
      ><p>Un aperçu du plaisir de jouer ensemble, avec ce final réunissant l’harmonie et la classe orchestre.</p><Link href="/galerie" className="home-text-link">Découvrir aussi les photos du collectif →</Link></MediaFeature>

      <section id="rejoindre-formulaire" className="site-container py-12 md:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div><p className="text-sm font-semibold text-primary mb-4">Le premier contact</p><h2 className="section-title mb-6">Faisons connaissance.</h2><p className="text-lg max-w-lg">Présentez-nous votre instrument, votre parcours et vos envies. Ce formulaire permet de prendre contact avec l’association.</p><Link href="/contact" className="home-text-link text-primary mt-4">Retrouver nos coordonnées →</Link></div>
          <JoinForm />
        </div>
      </section>
    </div>
  )
}
