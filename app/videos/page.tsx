import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import PageHeader from "@/components/page-header"
import YouTubeEmbed from "@/components/youtube-embed"
import VideoYearNavigation from "@/components/video-year-navigation"
import RecordingEmbed from "@/components/recording-embed"
import { publishedVideos } from "@/lib/published-content"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata("L’harmonie en vidéos", "Concerts, spectacles et classe d’orchestre de Montreuil-sur-Mer : retrouvez les vidéos et regardez-les directement sur le site.", "/videos")

export const revalidate = 300
export default async function VideosPage() {
  const { videos, recordings } = await publishedVideos()
  const years = [...new Set([...videos.map(video => video.published.slice(0, 4)), ...recordings.map(group => group.year)])].sort().reverse()
const groupedYouTubeIds = new Set(recordings.flatMap(group => group.recordings).filter(recording => recording.provider === "YouTube").map(recording => recording.source.replace("#youtube-", "")))


  return <>
    <PageHeader homeLink={<Link href="/">Accueil</Link>} eyebrow="Concerts, spectacles et projets partagés" title="Remettez un peu de musique." description="Retrouver un morceau, revivre un concert, découvrir la classe d’orchestre. Choisissez une année et lancez la lecture."
      media={<figure><Image src="/assets/archives/464dd9e774a827e3.webp" alt="L’harmonie joue sur scène lors de Sacrée Fiesta en 2025" width={1600} height={1200} priority sizes="(max-width: 911px) 100vw, 50vw" className="w-full h-auto rounded-lg" /><figcaption className="mt-3 border-l-4 border-secondary pl-3 text-sm">Sacrée Fiesta · 2025</figcaption></figure>}
      actions={<><Button asChild variant="secondary"><a href="#captations">Choisir une captation</a></Button><Link className="home-text-link" href="/galerie">Parcourir les photos →</Link></>}
    />
    <div id="captations" className="site-container py-8 md:py-12">
      <VideoYearNavigation years={years} />
      <div className="space-y-16">
        {years.map(year => <section key={year} id={`videos-${year}`} aria-labelledby={`year-${year}`} className="scroll-mt-24">
          <h2 id={`year-${year}`} className="section-title text-primary mb-8 border-b border-primary/20 pb-6">{year}</h2>
          {recordings.filter(group => group.year === year).map(group => <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="mb-12 scroll-mt-24">
            <div className="mb-6">
              <h3 id={`${group.id}-title`} className="text-2xl font-bold text-primary">{group.title}</h3>
              <p className="mt-2 text-muted-foreground">{group.description}</p>
              {group.album && <Link href={`/galerie/${group.album}`} className="home-text-link text-primary">Les photos de cet événement →</Link>}
            </div>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-default)),1fr))] gap-8">
              {group.recordings.map(recording => <li key={recording.id} id={recording.provider === "YouTube" ? recording.source.slice(1) : undefined} className="min-w-0 scroll-mt-24 border-b border-primary/20 pb-4">
                {recording.provider === "YouTube" ? <>
                  <YouTubeEmbed id={recording.source.replace("#youtube-", "")} title={recording.title} poster={recording.poster} />
                  <h4 className="mt-4 text-xl font-bold text-primary break-words">{recording.title}</h4><p className="whitespace-pre-line">{recording.description}</p>
                  <a href={`https://www.youtube.com/watch?v=${recording.source.replace("#youtube-", "")}`} className="inline-flex min-h-11 items-center text-primary underline">Ouvrir sur YouTube <span className="sr-only">: {recording.title}</span></a>
                </> : <>
                  <RecordingEmbed provider={recording.provider === "Facebook" ? "Facebook" : "Google Drive"} source={recording.source} title={recording.title} poster={recording.poster} />
                  <h4 className="mt-4 text-xl font-bold text-primary break-words">{recording.title}</h4><p className="whitespace-pre-line">{recording.description}</p>
                </>}
              </li>)}
            </ul>
          </section>)}
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-default)),1fr))] gap-8">
            {videos.filter(video => video.published.startsWith(year) && !groupedYouTubeIds.has(video.id)).map(video => <li key={video.id} id={`youtube-${video.id}`} className="min-w-0 border-b border-primary/20 pb-4">
              <YouTubeEmbed id={video.id} title={video.title} poster={video.poster} />
              <h3 className="mt-4 text-xl font-bold text-primary break-words">{video.title}</h3><p className="whitespace-pre-line">{video.description}</p>
              <a href={`https://www.youtube.com/watch?v=${video.id}`} className="inline-flex min-h-11 items-center text-primary underline">Ouvrir sur YouTube <span className="sr-only">: {video.title}</span></a>
            </li>)}
          </ul>
        </section>)}
      </div>
      <p className="max-w-3xl text-sm text-muted-foreground mt-16 mb-2">Les vidéos de l’harmonie, de ses invités et des projets partagés.</p>
      <p className="max-w-3xl text-sm text-muted-foreground mb-8">Lecteurs YouTube, Facebook et Google Drive activés uniquement à votre demande. <Link href="/politique-confidentialite" className="text-primary underline">Confidentialité</Link></p>
      <Link href="/galerie" className="inline-flex min-h-11 items-center font-semibold text-primary underline">Découvrir aussi les archives photos →</Link>
    </div>
  </>
}
