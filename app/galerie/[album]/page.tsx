import Link from "next/link"
import { notFound } from "next/navigation"
import PageHeader from "@/components/page-header"
import PhotoGallery from "@/components/photo-gallery"
import albums from "@/data/photo-albums.json"
import { pageMetadata } from "@/lib/metadata"

export const dynamicParams = false
export function generateStaticParams() { return albums.map(({ slug }) => ({ album: slug })) }

export async function generateMetadata({ params }: { params: Promise<{ album: string }> }) {
  const { album: slug } = await params
  const album = albums.find(item => item.slug === slug)
  if (!album) notFound()
  return pageMetadata(`${album.title} — Archives photos`, `Les souvenirs de l’Harmonie de Montreuil-sur-Mer : ${album.title}.`, `/galerie/${album.slug}`)
}

export default async function AlbumPage({ params }: { params: Promise<{ album: string }> }) {
  const { album: slug } = await params
  const album = albums.find(item => item.slug === slug)
  if (!album) notFound()
  return <>
    <PageHeader homeLink={<Link href="/galerie">Tous les albums</Link>} eyebrow="Archives photographiques" title={album.title} actions={<Link href="/galerie" className="home-text-link">Changer d’album →</Link>} description={`${album.photos.length} photos à parcourir. Sélectionnez une photo pour l’agrandir.`} />
    <section className="site-container py-8 md:py-12" aria-label={`Photos : ${album.title}`}>
      <PhotoGallery photos={album.photos} title={album.title} />
      <Link href="/galerie" className="home-text-link mt-8 text-primary">Retour aux albums</Link>
    </section>
  </>
}
