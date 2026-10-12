"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GoogleMap() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="w-full min-h-72 aspect-[4/3] rounded-lg overflow-hidden bg-muted relative">
      {enabled ? (
        <iframe
          title="Localisation de l’Harmonie municipale de Montreuil-sur-Mer"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.8162474014025!2d1.763416706945495!3d50.46314635669665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ddc66397fcd1d1%3A0xb1d6ec0b38659778!2sHarmonie%20Municipale!5e0!3m2!1sfr!2shr!4v1741475925105!5m2!1sfr!2shr"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          ref={(frame) => frame?.focus()}
        />
      ) : (
        <div className="flex h-full min-h-72 flex-col items-center justify-center gap-4 p-6 text-center">
          <MapPin className="h-8 w-8 text-primary" aria-hidden="true" />
          <p className="text-sm text-left text-muted-foreground">En affichant la carte, vous autorisez le chargement de Google Maps, qui peut déposer des cookies. <a href="https://policies.google.com/privacy" className="text-primary underline">Confidentialité Google</a></p>
          <Button onClick={() => setEnabled(true)} className="h-auto min-h-11 whitespace-normal">Afficher la carte Google Maps</Button>
        </div>
      )}
    </div>
  )
}
