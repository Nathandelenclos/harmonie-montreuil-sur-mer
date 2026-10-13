import Image from "next/image"
import Link from "next/link"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import albums from "@/data/photo-albums.json"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata("Les archives en images", "Retrouvez les concerts, les musiciens et les souvenirs de l’Harmonie de Montreuil-sur-Mer en photos.", "/galerie")

export default function GalleryPage() {
  return <>
    <PageHeader homeLink={<Link href="/">Accueil</Link>} eyebrow="Les archives de l’harmonie" title="Ces moments qui restent." description="Des visages, des concerts et des souvenirs partagés. Parcourez les albums de l’harmonie, de l’école et des tambours."
      media={<figure><Image src="/assets/archives/a6baddadb6ae14a2.webp" alt="L’harmonie réunie à la Chartreuse de Neuville en 2026" width={1600} height={1071} priority sizes="(max-width: 911px) 100vw, 50vw" className="w-full h-auto rounded-lg" /><figcaption className="mt-3 border-l-4 border-secondary pl-3 text-sm">Chartreuse de Neuville · 2026</figcaption></figure>}
      actions={<><Button asChild variant="secondary"><a href="#albums">Explorer les albums</a></Button><Link href="/videos" className="home-text-link">Et avec le son →</Link></>}
    />
    <div id="albums" className="site-container py-12 md:py-16 space-y-16">
      {[
        { title: 'Au cœur du collectif', description: 'L’école de musique, les tambours et les rendez-vous de l’harmonie.', albums: albums.filter(album => ['ecole-de-musique', 'tambours', 'ceremonies'].includes(album.slug)) },
        { title: 'Remonter le fil des années', description: 'Choisissez une période, puis ouvrez les photos pour les regarder en grand.', albums: albums.filter(album => !['ecole-de-musique', 'tambours', 'ceremonies'].includes(album.slug)).slice().reverse() },
      ].map(group => <section key={group.title}>
        <div className="section-heading"><h2 className="section-title text-primary">{group.title}</h2><p className="section-subtitle">{group.description}</p></div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-wide)),1fr))] gap-x-8 gap-y-10">
          {group.albums.map(album => <li key={album.slug}>
            <Link href={`/galerie/${album.slug}`} className="group block text-primary underline-offset-4 hover:underline">
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-muted"><Image src={album.photos[0].src} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-contain" /></div>
              <div className="flex items-start justify-between gap-4 border-b border-primary/20 py-4"><div><h3 className="text-2xl font-bold mb-2">{album.title}</h3><p className="text-sm text-muted-foreground">{album.photos.length} photos</p></div><span aria-hidden="true" className="text-2xl">↗</span></div>
            </Link>
          </li>)}
        </ul>
      </section>)}
    </div>
  </>
}
