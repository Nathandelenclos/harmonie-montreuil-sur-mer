import type { Metadata } from "next"

export const siteUrl = "https://harmonie-montreuil-sur-mer.fr"

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = path === "/" ? title : `${title} | Harmonie de Montreuil-sur-Mer`
  const image = `${siteUrl}/assets/og/${path === "/" ? "accueil" : path.slice(1)}.png`
  return {
    title: fullTitle,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: { type: "website", locale: "fr_FR", siteName: "Harmonie de Montreuil-sur-Mer", title: fullTitle, description, url: `${siteUrl}${path}`, images: [{ url: image, width: 1200, height: 630, type: "image/png", alt: title }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [{ url: image, alt: title }] },
  }
}
