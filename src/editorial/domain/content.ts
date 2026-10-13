export const contentKinds = ['event', 'album', 'video'] as const
export type ContentKind = typeof contentKinds[number]
export type Photo = { src: string; title: string; width: number; height: number }
export type Content = {
  title: string; slug: string; description: string; image: Photo | null
  date: string; archiveAfter: string; location: string; price: string; bookingUrl: string; featured: boolean
  photos: Photo[]; source: string; year: string; album: string; group: string; groupTitle: string; groupDescription: string
}
export type FieldErrors = Record<string, string>
export type Entry = { id: string; kind: ContentKind; draft: Content; version: number; published_version: number | null; updated_at: string }
export const kindLabels: Record<ContentKind, string> = { event: 'Événements', album: 'Albums photo', video: 'Vidéothèque' }
export const isContentKind = (value: unknown): value is ContentKind => contentKinds.includes(value as ContentKind)
export const emptyContent = (): Content => ({ title: '', slug: '', description: '', image: null, date: '', archiveAfter: '', location: '', price: '', bookingUrl: '', featured: false, photos: [], source: '', year: '', album: '', group: '', groupTitle: '', groupDescription: '' })

export const canAddPhotos = (current: number, incoming: number) => current >= 0 && incoming >= 0 && current + incoming <= 500

export function parseVideoUrl(value: string): { provider: 'YouTube' | 'Facebook' | 'Google Drive'; id: string; source: string } | null {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null
    if (['www.youtube.com', 'youtube.com', 'youtu.be'].includes(url.hostname)) {
      const id = url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.match(/^\/(?:shorts|embed)\/([^/]+)$/)?.[1]
      return id && /^[\w-]{11}$/.test(id) ? { provider: 'YouTube', id, source: `https://www.youtube.com/watch?v=${id}` } : null
    }
    if (url.hostname === 'drive.google.com') {
      const id = url.pathname.match(/^\/file\/d\/([\w-]+)\/(?:view|preview)$/)?.[1]
      return id ? { provider: 'Google Drive', id, source: `https://drive.google.com/file/d/${id}/preview` } : null
    }
    if (['facebook.com', 'www.facebook.com', 'm.facebook.com'].includes(url.hostname) && /^\/(?:reel\/\d+|[^/]+\/videos\/\d+|watch\/?)/.test(url.pathname)) {
      return { provider: 'Facebook', id: url.pathname, source: url.href }
    }
  } catch { return null }
  return null
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export function isPhoto(value: unknown): value is Photo {
  if (!value || typeof value !== 'object') return false
  const p = value as Photo
  return typeof p.src === 'string' && /^(?:\/assets\/[a-zA-Z0-9_./-]+\.(?:webp|jpg|jpeg|png|avif)|\/media\/[a-f0-9-]{36}\.webp)$/.test(p.src) && !p.src.includes('..') && typeof p.title === 'string' && p.title.length <= 300 && Number.isInteger(p.width) && p.width > 0 && p.width <= 20000 && Number.isInteger(p.height) && p.height > 0 && p.height <= 20000
}

export function validateContent(kind: ContentKind, value: unknown, publishing = false): FieldErrors {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { title: 'Renseignez le contenu à enregistrer.' }
  const c = value as Content
  const errors: FieldErrors = {}
  const text = (field: keyof Content, max: number, required = false) => {
    if (typeof c[field] !== 'string' || (c[field] as string).length > max || (required && !(c[field] as string).trim())) errors[field] = required ? `Renseignez ce champ (${max} caractères maximum).` : `Limitez ce champ à ${max} caractères.`
  }
  text('title', 200, true); text('slug', 100, true); text('description', 10000)
  if (typeof c.slug === 'string' && !slugPattern.test(c.slug)) errors.slug = 'Utilisez des lettres minuscules, des chiffres et des tirets.'
  if (c.image !== null && !isPhoto(c.image)) errors.image = 'Choisissez une image importée dans le site.'
  if (kind === 'event') {
    text('location', 300, true); text('price', 200, true); text('bookingUrl', 2000)
    for (const field of ['date', 'archiveAfter'] as const) {
      if (typeof c[field] !== 'string' || !/T.*(?:Z|[+-]\d\d:\d\d)$/.test(c[field]) || !Number.isFinite(Date.parse(c[field]))) errors[field] = 'Choisissez une date et une heure valides.'
    }
    if (!errors.date && !errors.archiveAfter && Date.parse(c.archiveAfter) <= Date.parse(c.date)) errors.archiveAfter = 'L’archivage doit être postérieur au début du concert.'
    if (c.bookingUrl) {
      try { const url = new URL(c.bookingUrl); if (url.protocol !== 'https:' || url.username || url.password) errors.bookingUrl = 'Utilisez un lien de réservation HTTPS.' } catch { errors.bookingUrl = 'Utilisez un lien de réservation HTTPS.' }
    }
    if (typeof c.featured !== 'boolean') errors.featured = 'Choisissez si cet événement est mis en avant.'
  }
  if (kind === 'album') {
    if (!Array.isArray(c.photos) || !canAddPhotos(0, c.photos.length) || !c.photos.every(isPhoto)) errors.photos = 'Importez jusqu’à 500 photos valides par album.'
    else if (new Set(c.photos.map(p => p.src)).size !== c.photos.length) errors.photos = 'Une photo ne peut figurer qu’une fois dans cet album.'
    else if (publishing && !c.photos.length) errors.photos = 'Ajoutez au moins une photo avant de publier.'
    if (c.image && Array.isArray(c.photos) && !c.photos.some(p => p.src === c.image?.src)) errors.image = 'Choisissez la couverture parmi les photos de l’album.'
  }
  if (kind === 'video') {
    text('source', 2000, true); text('year', 4, true); text('album', 100); text('group', 100); text('groupTitle', 200); text('groupDescription', 2000)
    if (typeof c.source !== 'string' || !parseVideoUrl(c.source)) errors.source = 'Collez un lien HTTPS YouTube, Facebook (vidéo ou reel) ou Google Drive.'
    if (!/^\d{4}$/.test(c.year) || Number(c.year) < 1854 || Number(c.year) > 2100) errors.year = 'Indiquez une année entre 1854 et 2100.'
    if (c.album && !slugPattern.test(c.album)) errors.album = 'Utilisez l’identifiant d’un album.'
    if (c.group && !slugPattern.test(c.group)) errors.group = 'Utilisez des lettres minuscules, chiffres et tirets.'
  }
  return errors
}

export function reorderPhoto<T>(photos: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction
  if (index < 0 || index >= photos.length || target < 0 || target >= photos.length) return photos
  const result = [...photos]
  ;[result[index], result[target]] = [result[target], result[index]]
  return result
}
