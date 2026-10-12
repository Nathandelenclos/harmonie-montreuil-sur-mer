"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type Photo = { src: string; title: string; width: number; height: number }

export default function PhotoGallery({ photos, title }: { photos: Photo[]; title: string }) {
  const [selected, setSelected] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const photo = selected === null ? null : photos[selected]

  useEffect(() => {
    if (selected === null) return
    const element = dialog.current
    if (!element?.open) element?.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = overflow }
  }, [selected])

  return <>
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-default)),1fr))] gap-8">
      {photos.map((item, index) => <li key={item.src}>
        <Button type="button" variant="outline" onClick={() => setSelected(index)} className="block h-full w-full overflow-hidden rounded-lg bg-white p-0 text-left text-base font-normal whitespace-normal hover:bg-white hover:text-primary hover:underline underline-offset-4" aria-label={`Agrandir : ${item.title} — photo ${index + 1}`}>
          <span className="relative block aspect-[4/3] bg-muted">
            <Image src={item.src} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-contain" />
          </span>
          <span className="block border-t-4 border-secondary p-4 font-semibold text-primary">{item.title}</span>
        </Button>
      </li>)}
    </ul>
    <dialog ref={dialog} aria-labelledby="photo-title" className="photo-dialog rounded-lg bg-background p-4 md:p-6" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }} onKeyDown={event => {
      if (selected === null) return
      if (event.key === "ArrowLeft") { event.preventDefault(); setSelected((selected + photos.length - 1) % photos.length) }
      if (event.key === "ArrowRight") { event.preventDefault(); setSelected((selected + 1) % photos.length) }
    }}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <p className="font-semibold text-primary">{title}</p>
        <Button type="button" variant="outline" onClick={() => dialog.current?.close()}>Fermer</Button>
      </div>
      {photo && <figure>
        <Image src={photo.src} alt={photo.title} width={photo.width} height={photo.height} sizes="100vw" className="mx-auto h-auto max-h-[65dvh] w-auto max-w-full object-contain" />
        <figcaption id="photo-title" className="mt-4 font-semibold text-primary" aria-live="polite">{photo.title}</figcaption>
      </figure>}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="outline" disabled={photos.length < 2} onClick={() => setSelected(index => index === null ? null : (index + photos.length - 1) % photos.length)}>Précédente</Button>
        <p className="text-sm" aria-live="polite">{selected === null ? 0 : selected + 1} / {photos.length}</p>
        <Button type="button" variant="outline" disabled={photos.length < 2} onClick={() => setSelected(index => index === null ? null : (index + 1) % photos.length)}>Suivante</Button>
      </div>
    </dialog>
  </>
}
