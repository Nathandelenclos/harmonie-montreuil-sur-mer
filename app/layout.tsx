import type React from "react"
import "./globals.css"
import { pageMetadata, siteUrl } from "@/lib/metadata"
import { Playfair_Display, Montserrat } from "next/font/google"
import SiteFrame from "@/components/site-frame"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata("Harmonie de Montreuil-sur-Mer — Concerts et école de musique", "Concerts, cours de musique et pratique d’orchestre à Montreuil-sur-Mer. Découvrez notre programmation, nos instruments et les inscriptions à l’école.", "/"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans`}>
        <a href="#main-content" className="skip-link">Aller au contenu principal</a>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  )
}

