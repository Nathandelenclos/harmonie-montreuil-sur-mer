"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  return <div className="youtube-preview relative w-full min-h-52 aspect-video overflow-hidden rounded-lg bg-primary">
    {playing ? <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
      title={title}
      className="absolute inset-0 h-full w-full border-0"
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      ref={frame => frame?.focus()}
    /> : <>
      <Image src={`/assets/videos/${id}.jpg`} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" />
      <Button type="button" variant="secondary" className="absolute bottom-4 left-4" aria-label={`Lire avec YouTube sur cette page : ${title}`} onClick={() => setPlaying(true)}>
        <Play className="h-5 w-5" aria-hidden="true" /> Lire avec YouTube
      </Button>
    </>}
  </div>
}
