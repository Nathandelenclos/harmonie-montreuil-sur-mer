"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RecordingEmbed({ provider, source, title, poster }: {
  provider: "Facebook" | "Google Drive"
  source: string
  title: string
  poster: string
}) {
  const [playing, setPlaying] = useState(false)
  const playerUrl = provider === "Facebook"
    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(source)}&show_text=false`
    : source

  return <div>
    <div className="relative aspect-video min-h-52 w-full overflow-hidden rounded-lg bg-primary">
      {playing ? <iframe src={playerUrl} title={title} className="absolute inset-0 h-full w-full border-0"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin" ref={frame => frame?.focus()} /> : <>
        <Image src={poster} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-contain" />
        <Button type="button" variant="secondary" className="absolute bottom-4 left-4"
          onClick={() => setPlaying(true)}>
          <Play className="h-5 w-5" aria-hidden="true" /> Lire avec {provider}<span className="sr-only"> : {title}</span>
        </Button>
      </>}
    </div>
    <a href={source} className="inline-flex min-h-11 items-center text-primary underline">
      Ouvrir sur {provider}<span className="sr-only"> : {title}</span>
    </a>
  </div>
}
