import type React from "react"
import "./globals.css"
import Script from 'next/script';
import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Harmonie de Montreuil-sur-Mer",
  description: "Harmonie municipale de Montreuil-sur-Mer, fondée en 1865 - Musique, concerts et événements culturels",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">

      <body className={`${playfair.variable} ${montserrat.variable} font-sans`}>
        <Script
            src={`https://www.googletagmanager.com/gtag/js?id=G-KYZ6HDRZ7J`}
            strategy="afterInteractive"
        />
        <Script id="ga4-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KYZ6HDRZ7J', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Navigation />
        <ScrollToTop />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

