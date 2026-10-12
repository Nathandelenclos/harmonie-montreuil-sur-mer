import Image from "next/image"
import Link from "next/link"
import PageHeader from "@/components/page-header"
import albums from "@/data/photo-albums.json"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata("Les archives en images", "Retrouvez les concerts, les musiciens et les souvenirs de l’Harmonie de Montreuil-sur-Mer en photos.", "/galerie")

export default function GalleryPage() {
  return <>
    <PageHeader homeLink={<Link href="/">Accueil</Link>} title="Les archives en images" description="Concerts, rencontres et souvenirs : la vie de l’harmonie au fil des années." />
    <section className="site-container py-16 md:py-24" aria-labelledby="albums-title">
      <div className="section-heading">
        <h2 id="albums-title" className="section-title text-primary">Parcourir les albums</h2>
        <p className="section-subtitle">Choisissez une période ou retrouvez les souvenirs de l’école de musique et des tambours.</p>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-default)),1fr))] gap-8">
        {albums.map(album => <li key={album.slug}>
          <Link href={`/galerie/${album.slug}`} className="block h-full overflow-hidden rounded-lg border bg-white text-primary hover:underline underline-offset-4">
            <div className="relative aspect-[4/3] bg-muted"><Image src={album.photos[0].src} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-contain" /></div>
            <div className="border-t-4 border-secondary p-6"><h3 className="text-2xl font-bold mb-2">{album.title}</h3><p>{album.photos.length} photos · Ouvrir l’album ↗</p></div>
          </Link>
        </li>)}
      </ul>
      <Link href="/videos" className="inline-flex min-h-11 items-center mt-12 font-semibold text-primary underline">Retrouver les concerts en vidéos →</Link>
    </section>
  </>
}
