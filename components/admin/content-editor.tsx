'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { emptyContent, canAddPhotos, reorderPhoto, validateContent, type Content, type ContentKind, type Entry, type FieldErrors, type Photo } from '@/src/editorial/domain/content'
import type { ContentResult } from '@/src/editorial/application/use-cases/content-use-cases'

export type Props = {
  kind: ContentKind; initialEntry: Entry | null
  onSave: (input: { id?: string; version?: number; kind: string; content: unknown }) => Promise<ContentResult>
  onTransition: (id: string, version: number, action: 'publish' | 'unpublish' | 'delete') => Promise<ContentResult>
  importImage: (file: File) => Promise<Photo>
}
const eventSteps = [['title', 'slug', 'description', 'image'], ['date', 'archiveAfter', 'location', 'price', 'bookingUrl', 'featured']]
const localDate = (value: string) => {
  if (!value) return ''
  const date = new Date(value)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

export default function ContentEditor({ kind, initialEntry, onSave, onTransition, importImage }: Props) {
  const [entry, setEntry] = useState(initialEntry)
  const [content, setContent] = useState<Content>(initialEntry?.draft || emptyContent())
  const [errors, setErrors] = useState<FieldErrors>({})
  const [notice, setNotice] = useState('')
  const [pending, setPending] = useState(false)
  const [step, setStep] = useState(0)
  const busy = useRef(false)
  const form = useRef<HTMLFormElement>(null)
  const dirty = JSON.stringify(content) !== JSON.stringify(entry?.draft || emptyContent())
  useEffect(() => {
    if (!dirty) return
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault() }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])
  const change = <K extends keyof Content>(key: K, value: Content[K]) => { setContent(current => ({ ...current, [key]: value })); setNotice('') }
  const report = (next: FieldErrors) => {
    setErrors(next)
    const first = Object.keys(next)[0]
    if (kind === 'event') setStep(Math.max(0, eventSteps.findIndex(fields => fields.includes(first))))
    setTimeout(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0)
  }
  const run = async (action: () => Promise<void>) => {
    if (busy.current) return
    busy.current = true; setPending(true); setNotice('')
    try { await action() } catch { setErrors({ form: 'L’opération n’a pas abouti. Vos modifications sont conservées ; réessayez.' }) }
    finally { busy.current = false; setPending(false) }
  }
  const save = () => run(async () => {
    const validation = validateContent(kind, content)
    if (Object.keys(validation).length) { report(validation); return }
    const result = await onSave({ id: entry?.id, version: entry?.version, kind, content })
    if (!result.ok) { report(result.errors); return }
    if (result.entry) { setEntry(result.entry); setContent(result.entry.draft); window.history.replaceState(null, '', `/admin/${kind}/${result.entry.id}`) }
    setErrors({}); setNotice('Brouillon enregistré. Vous pouvez le prévisualiser avant de publier.')
  })
  const transition = (action: 'publish' | 'unpublish' | 'delete') => run(async () => {
    if (!entry || dirty) return
    if (action !== 'publish' && !window.confirm(action === 'delete' ? 'Supprimer définitivement ce brouillon ?' : 'Retirer ce contenu du site public ?')) return
    const result = await onTransition(entry.id, entry.version, action)
    if (!result.ok) { report(result.errors); return }
    if (action === 'delete') { window.location.assign(`/admin?kind=${kind}`); return }
    if (result.entry) setEntry(result.entry)
    setErrors({}); setNotice(action === 'publish' ? 'Contenu publié.' : 'Contenu retiré du site. Le brouillon est conservé.')
  })
  const upload = (files: FileList | null, album: boolean) => run(async () => {
    if (!files?.length) return
    const batch = Array.from(files)
    if (album && !canAddPhotos(content.photos.length, batch.length)) { setErrors({ photos: 'Un album peut contenir jusqu’à 500 photos.' }); return }
    for (let i = 0; i < batch.length; i++) {
      setNotice(`Import de la photo ${i + 1} sur ${batch.length}…`)
      try {
        const photo = { ...await importImage(batch[i]), title: batch[i].name.replace(/\.[^.]+$/, '').slice(0, 300) }
        setContent(current => album ? { ...current, photos: [...current.photos, photo] } : { ...current, image: photo })
      } catch { setNotice(''); setErrors({ [album ? 'photos' : 'image']: `${batch[i].name} : import interrompu. Vérifiez le format, la taille (30 Mo maximum) et votre connexion, puis réessayez. Les photos déjà importées sont conservées.` }); return }
    }
    setErrors({}); setNotice('Import terminé. Enregistrez le brouillon pour conserver ces images dans le contenu.')
  })
  const field = (key: keyof Content, label: string, required = false, type = 'text') => {
    const id = `content-${key}`
    const value = content[key] as string
    const props = { id, name: key, required, value: type === 'datetime-local' ? localDate(value) : value, 'aria-invalid': !!errors[key], 'aria-describedby': errors[key] ? `${id}-error` : undefined,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { const value = event.target.value; change(key, type === 'datetime-local' && value ? new Date(value).toISOString() : value) },
      onBlur: () => setErrors(current => ({ ...current, [key]: validateContent(kind, content)[key] || '' })),
    }
    return <div key={key}><label htmlFor={id}>{label}{!required && ' (facultatif)'}</label>{key === 'description' ? <textarea {...props} maxLength={10000} /> : <input {...props} type={type} maxLength={key === 'source' || key === 'bookingUrl' ? 2000 : key === 'slug' ? 100 : 300} readOnly={key === 'slug' && !!entry && !!(entry as Entry & { first_published_at?: string }).first_published_at} />}{errors[key] && <p id={`${id}-error`} className="admin-error" aria-live="polite">{errors[key]}</p>}</div>
  }
  const imageInput = (label: string, album = false) => <div><label htmlFor={album ? 'photos-upload' : 'image-upload'}>{label} (JPEG, PNG, WebP ou AVIF)<input id={album ? 'photos-upload' : 'image-upload'} type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple={album} disabled={pending} onChange={event => { void upload(event.target.files, album); event.target.value = '' }} /></label>{errors[album ? 'photos' : 'image'] && <p role="alert" className="admin-error">{errors[album ? 'photos' : 'image']}</p>}</div>
  return <form ref={form} className="admin-form" onSubmit={event => { event.preventDefault(); void save() }}>
    <p>{entry?.published_version ? 'Une version est en ligne. Vos modifications restent privées jusqu’à la publication.' : 'Ce contenu est un brouillon privé.'} Les champs facultatifs sont indiqués.</p>
    {kind === 'event' && <nav aria-label="Étapes de l’événement" className="admin-actions"><span>Étape {step + 1} sur 2</span>{['Présentation', 'Informations pratiques'].map((label, index) => <Button key={label} type="button" variant={step === index ? 'default' : 'outline'} aria-current={step === index ? 'step' : undefined} onClick={() => setStep(index)}>{label}</Button>)}</nav>}
    <fieldset disabled={pending} className="grid gap-5 min-w-0">
      {(kind !== 'event' || step === 0) && <>{field('title', 'Titre', true)}{field('slug', 'Identifiant dans l’adresse de la page', true)}{field('description', 'Description')}
        {kind !== 'album' && <>{imageInput(kind === 'event' ? 'Affiche (facultative)' : 'Miniature (facultative)')}{content.image && <div className="admin-photo"><Image src={content.image.src} alt="Image sélectionnée" width={112} height={96} unoptimized /><Button type="button" variant="outline" onClick={() => change('image', null)}>Retirer l’image</Button></div>}</>}
      </>}
      {kind === 'event' && step === 1 && <><p className="text-sm">Les heures sont saisies dans le fuseau horaire de votre ordinateur et affichées à l’heure de Paris sur le site.</p>{field('date', 'Début du concert', true, 'datetime-local')}{field('archiveAfter', 'Archiver à partir du', true, 'datetime-local')}{field('location', 'Lieu', true)}{field('price', 'Tarif affiché', true)}{field('bookingUrl', 'Lien de réservation', false, 'url')}<label htmlFor="content-featured" className="!flex items-center gap-3"><input id="content-featured" type="checkbox" checked={content.featured} onChange={event => change('featured', event.target.checked)} />Mettre en avant sur l’accueil</label></>}
      {kind === 'video' && <>{field('source', 'Lien de la vidéo', true, 'url')}{field('year', 'Année', true)}{field('album', 'Identifiant de l’album associé')}<details><summary className="admin-link cursor-pointer">Regroupement de vidéos (facultatif)</summary><div className="grid gap-5">{field('group', 'Identifiant du groupe')}{field('groupTitle', 'Titre du groupe')}{field('groupDescription', 'Description du groupe')}</div></details></>}
      {kind === 'album' && <>{imageInput('Ajouter des photos', true)}<p className="text-sm">{content.photos.length} photo{content.photos.length > 1 ? 's' : ''}. La première sert de couverture si aucune autre n’est choisie.</p><ol>{content.photos.map((photo, index) => <li className="admin-photo" key={photo.src}>
        <Image src={photo.src} alt={`Photo ${index + 1}`} width={112} height={96} unoptimized /><div><label htmlFor={`caption-${index}`}>Légende de la photo {index + 1}<input id={`caption-${index}`} value={photo.title} maxLength={300} onChange={event => change('photos', content.photos.map((p, i) => i === index ? { ...p, title: event.target.value } : p))} /></label><div className="admin-actions mt-3"><Button type="button" variant="outline" disabled={index === 0} onClick={() => change('photos', reorderPhoto(content.photos, index, -1))} aria-label={`Monter la photo ${index + 1}`}>Monter</Button><Button type="button" variant="outline" disabled={index === content.photos.length - 1} onClick={() => change('photos', reorderPhoto(content.photos, index, 1))} aria-label={`Descendre la photo ${index + 1}`}>Descendre</Button><Button type="button" variant="outline" aria-pressed={content.image?.src === photo.src} onClick={() => change('image', photo)}>Couverture</Button><Button type="button" variant="outline" onClick={() => { change('photos', content.photos.filter((_, i) => i !== index)); if (content.image?.src === photo.src) change('image', null) }} aria-label={`Retirer la photo ${index + 1}`}>Retirer</Button></div></div>
      </li>)}</ol></>}
    </fieldset>
    {errors.form && <p role="alert" className="admin-error">{errors.form}</p>}
    <p role="status" aria-live="polite">{notice || (dirty ? 'Modifications non enregistrées.' : '')}</p>
    <div className="admin-actions"><Button type="submit" disabled={pending}>{pending ? 'Veuillez patienter…' : 'Enregistrer le brouillon'}</Button>{entry && !dirty && <a href={`/admin/preview/${entry.id}`} target="_blank" rel="noopener noreferrer" className="admin-link">Prévisualiser (nouvel onglet)</a>}<Button type="button" variant="secondary" disabled={pending || dirty || !entry} onClick={() => void transition('publish')}>Publier</Button></div>
    {entry && <div className="admin-actions border-t pt-5">{entry.published_version !== null ? <Button type="button" variant="outline" disabled={pending || dirty} onClick={() => void transition('unpublish')}>Retirer du site</Button> : <Button type="button" variant="outline" disabled={pending || dirty} onClick={() => void transition('delete')}>Supprimer le brouillon</Button>}</div>}
  </form>
}
