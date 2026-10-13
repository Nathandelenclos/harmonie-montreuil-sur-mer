import type { MetadataRoute } from "next"
import { publishedAlbums, publishedEvents } from "@/lib/published-content"
import { siteUrl } from "@/lib/metadata"

export const revalidate = 300
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [albums, events] = await Promise.all([publishedAlbums(), publishedEvents()])
  return ["", "/a-propos", "/ecole-de-musique", "/evenements", "/galerie", "/videos", ...albums.map(album => `/galerie/${album.slug}`), "/contact", "/rejoindre", "/mentions-legales", "/politique-confidentialite", ...events.map(event => `/evenements/${event.slug}`)].map(path => ({ url: `${siteUrl}${path}` }))
}
