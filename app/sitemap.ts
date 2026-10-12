import type { MetadataRoute } from "next"
import albums from "@/data/photo-albums.json"
import { events } from "@/data/Events"
import { siteUrl } from "@/lib/metadata"

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/a-propos", "/ecole-de-musique", "/evenements", "/galerie", "/videos", ...albums.map(album => `/galerie/${album.slug}`), "/contact", "/rejoindre", "/mentions-legales", "/politique-confidentialite", ...events.map(event => `/evenements/${event.slug}`)].map(path => ({ url: `${siteUrl}${path}` }))
}
