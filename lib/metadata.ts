import type { Metadata } from "next"
import socialImages from '@/data/social-images.json'
import albums from '@/data/photo-albums.json'
import { events } from '@/data/Events'

export const siteUrl = "https://harmonie-montreuil-sur-mer.fr"

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = path === "/" ? title : `${title} | Harmonie de Montreuil-sur-Mer`
  const hasImage = socialImages.some(page => page.path === path) || albums.some(album => `/galerie/${album.slug}` === path) || events.some(event => `/evenements/${event.slug}` === path)
  const imagePath = hasImage ? path : path.startsWith('/galerie/') ? '/galerie' : path.startsWith('/evenements/') ? '/evenements' : '/'
  const image = `${siteUrl}/assets/og/${imagePath === "/" ? "accueil" : imagePath.slice(1)}.png`
  return {
    title: fullTitle,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: { type: "website", locale: "fr_FR", siteName: "Harmonie de Montreuil-sur-Mer", title: fullTitle, description, url: `${siteUrl}${path}`, images: [{ url: image, width: 1200, height: 630, type: "image/png", alt: title }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [{ url: image, alt: title }] },
  }
}
