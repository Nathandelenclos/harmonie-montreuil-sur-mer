"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

type Photo = { src: string; alt: string; caption: string }

export default function PhotoSlideshow({ photos }: { photos: [Photo, ...Photo[]] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(preference.matches)
    update()
    preference.addEventListener("change", update)
    return () => preference.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion || photos.length < 2) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(index => (index + 1) % photos.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [paused, reducedMotion, photos.length])

  return <figure>
    <div className="slideshow-frame relative aspect-[4/3] overflow-hidden rounded-lg">
      {photos.map((photo, index) => <Image key={photo.src} src={photo.src} alt={photo.alt} aria-hidden={index !== active} fill priority={index === 0} sizes="(max-width: 911px) 100vw, 50vw" className={`object-cover ${index === active ? "opacity-100" : "opacity-0"}`} />)}
      {photos.length > 1 && !reducedMotion && <Button type="button" size="icon" variant="secondary" className="absolute bottom-3 right-3" aria-label={paused ? "Reprendre le diaporama" : "Mettre le diaporama en pause"} onClick={() => setPaused(value => !value)}>
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </Button>}
    </div>
    <figcaption className="mt-3 grid border-l-4 border-secondary pl-3 text-sm">
      {photos.map((photo, index) => <span key={photo.src} aria-hidden={index !== active} className={`col-start-1 row-start-1 ${index === active ? "opacity-100" : "opacity-0"}`}>{photo.caption}</span>)}
    </figcaption>
  </figure>
}
