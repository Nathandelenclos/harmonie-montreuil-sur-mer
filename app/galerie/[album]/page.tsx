import Link from "next/link"
import { notFound } from "next/navigation"
import PageHeader from "@/components/page-header"
import PhotoGallery from "@/components/photo-gallery"
import { publishedAlbums, publishedVideos } from "@/lib/published-content"
import { pageMetadata } from "@/lib/metadata"

export const revalidate = 300
export const dynamicParams = true
export async function generateStaticParams() { return (await publishedAlbums()).map(({ slug }) => ({ album: slug })) }

export async function generateMetadata({ params }: { params: Promise<{ album: string }> }) {
  const { album: slug } = await params
  const album = (await publishedAlbums()).find(item => item.slug === slug)
  if (!album) notFound()
  return pageMetadata(`${album.title} — Archives photos`, `Les souvenirs de l’Harmonie de Montreuil-sur-Mer : ${album.title}.`, `/galerie/${album.slug}`)
}

export default async function AlbumPage({ params }: { params: Promise<{ album: string }> }) {
  const { album: slug } = await params
  const album = (await publishedAlbums()).find(item => item.slug === slug)
  if (!album) notFound()
  const { recordings } = await publishedVideos()
  return <>
    <PageHeader homeLink={<Link href="/galerie">Tous les albums</Link>} eyebrow="Archives photographiques" title={album.title} actions={<Link href="/galerie" className="home-text-link">Changer d’album →</Link>} description={`${album.photos.length} photos à parcourir. Sélectionnez une photo pour l’agrandir.`} />
    <section className="site-container py-8 md:py-12" aria-label={`Photos : ${album.title}`}>
      {recordings.filter(group => group.album === album.slug).map(group => <Link key={group.id} href={`/videos#${group.id}`} className="home-text-link mr-6 mb-6 text-primary">Voir les vidéos : {group.title} →</Link>)}
      {album.description && <p className="mb-6 whitespace-pre-line">{album.description}</p>}
      <PhotoGallery photos={album.photos} title={album.title} />
      <Link href="/galerie" className="home-text-link mt-8 text-primary">Retour aux albums</Link>
    </section>
  </>
}
