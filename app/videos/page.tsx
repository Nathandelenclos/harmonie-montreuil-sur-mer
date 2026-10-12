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
    <PageHeader homeLink={<Link href="/">Accueil</Link>} title="L’harmonie en vidéos" description="Retrouver un morceau, revivre un concert, découvrir la classe d’orchestre." />
    <div className="site-container py-8 md:py-12">
      <VideoYearNavigation years={years} />
      <div className="space-y-16">
        {years.map(year => <section key={year} id={`videos-${year}`} aria-labelledby={`year-${year}`} className="scroll-mt-24">
          <h2 id={`year-${year}`} className="section-title text-primary mb-8">Publiées en {year}</h2>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-default)),1fr))] gap-8">
            {videos.filter(video => video.published.startsWith(year)).map(video => <li key={video.id} className="min-w-0">
              <YouTubeEmbed id={video.id} title={video.title} />
              <h3 className="mt-4 text-xl font-bold text-primary break-words">{video.title}</h3>
              <a href={`https://www.youtube.com/watch?v=${video.id}`} className="inline-flex min-h-11 items-center text-primary underline">Ouvrir sur YouTube <span className="sr-only">: {video.title}</span></a>
            </li>)}
          </ul>
        </section>)}
      </div>
      <p className="max-w-3xl text-lg mt-16 mb-4">{videos.length} vidéos liées à Montreuil-sur-Mer, publiées par MARLENE47100 : l’harmonie, ses invités et les projets partagés.</p>
      <p className="max-w-3xl mb-8">La lecture charge le lecteur YouTube et transmet des informations techniques à Google. <Link href="/politique-confidentialite" className="text-primary underline">Confidentialité</Link></p>
      <Link href="/galerie" className="inline-flex min-h-11 items-center font-semibold text-primary underline">Découvrir aussi les archives photos →</Link>
    </div>
  </>
}
