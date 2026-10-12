import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import PageHeader from "@/components/page-header"
import YouTubeEmbed from "@/components/youtube-embed"
import VideoYearNavigation from "@/components/video-year-navigation"
import videos from "@/data/videos.json"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata("L’harmonie en vidéos", "Concerts, spectacles et classe d’orchestre de Montreuil-sur-Mer : retrouvez les vidéos et regardez-les directement sur le site.", "/videos")

const years = [...new Set(videos.map(video => video.published.slice(0, 4)))].sort().reverse()

export default function VideosPage() {
  return <>
    <PageHeader homeLink={<Link href="/">Accueil</Link>} eyebrow="Concerts, spectacles et projets partagés" title="Remettez un peu de musique." description="Retrouver un morceau, revivre un concert, découvrir la classe d’orchestre. Choisissez une année et lancez la lecture."
      media={<figure><Image src="/assets/archives/5c7fa995c817cb7e.webp" alt="Les tambours en costume pendant le concert de printemps" width={1600} height={1059} priority sizes="(max-width: 911px) 100vw, 50vw" className="w-full h-auto rounded-lg" /><figcaption className="mt-3 border-l-4 border-secondary pl-3 text-sm">Les tambours · Concert de printemps 2018</figcaption></figure>}
      actions={<><Button asChild variant="secondary"><a href="#captations">Choisir une captation</a></Button><Link className="home-text-link" href="/galerie">Parcourir les photos →</Link></>}
    />
    <div id="captations" className="site-container py-8 md:py-12">
      <VideoYearNavigation years={years} />
      <div className="space-y-16">
        {years.map(year => <section key={year} id={`videos-${year}`} aria-labelledby={`year-${year}`} className="scroll-mt-24">
          <h2 id={`year-${year}`} className="section-title text-primary mb-8 border-b border-primary/20 pb-6"><span className="block text-sm font-sans font-semibold mb-3">Année de publication</span>{year}</h2>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-default)),1fr))] gap-8">
            {videos.filter(video => video.published.startsWith(year)).map(video => <li key={video.id} className="min-w-0 border-b border-primary/20 pb-4">
              <YouTubeEmbed id={video.id} title={video.title} />
              <h3 className="mt-4 text-xl font-bold text-primary break-words">{video.title}</h3>
              <a href={`https://www.youtube.com/watch?v=${video.id}`} className="inline-flex min-h-11 items-center text-primary underline">Ouvrir sur YouTube <span className="sr-only">: {video.title}</span></a>
            </li>)}
          </ul>
        </section>)}
      </div>
      <p className="max-w-3xl text-sm text-muted-foreground mt-16 mb-2">{videos.length} vidéos liées à Montreuil-sur-Mer, publiées par MARLENE47100 : l’harmonie, ses invités et les projets partagés.</p>
      <p className="max-w-3xl text-sm text-muted-foreground mb-8">Vidéos hébergées sur YouTube. <Link href="/politique-confidentialite" className="text-primary underline">Confidentialité</Link></p>
      <Link href="/galerie" className="inline-flex min-h-11 items-center font-semibold text-primary underline">Découvrir aussi les archives photos →</Link>
    </div>
  </>
}
