import type { Metadata } from "next"

export const siteUrl = "https://harmonie-montreuil-sur-mer.fr"

export function pageMetadata(title: string, description: string, path: string, image = "/assets/sainte-cecile-2025.jpg"): Metadata {
  const fullTitle = path === "/" ? title : `${title} | Harmonie de Montreuil-sur-Mer`
  return {
    title: fullTitle,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: { type: "website", locale: "fr_FR", siteName: "Harmonie de Montreuil-sur-Mer", title: fullTitle, description, url: `${siteUrl}${path}`, images: [{ url: `${siteUrl}${image}`, alt: title }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [`${siteUrl}${image}`] },
  }
}
