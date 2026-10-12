import type { MetadataRoute } from "next"
import { events } from "@/data/Events"
import { siteUrl } from "@/lib/metadata"

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/a-propos", "/ecole-de-musique", "/evenements", "/contact", "/rejoindre", "/mentions-legales", "/politique-confidentialite", ...events.map(event => `/evenements/${event.slug}`)].map(path => ({ url: `${siteUrl}${path}` }))
}
