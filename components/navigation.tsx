"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import BrandLogo from "@/components/brand-logo"
import { Button } from "@/components/ui/button"

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "L’harmonie" },
  { href: "/evenements", label: "Concerts" },
  { href: "/ecole-de-musique", label: "École de musique" },
  { href: "/galerie", label: "Photos" },
  { href: "/videos", label: "Vidéos" },
  { href: "/contact", label: "Contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href)

  useEffect(() => { setIsOpen(false) }, [pathname])
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)")
    const close = () => { if (desktop.matches) setIsOpen(false) }
    desktop.addEventListener("change", close)
    return () => desktop.removeEventListener("change", close)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md" onKeyDown={event => {
      if (event.key === "Escape" && isOpen) { setIsOpen(false); button.current?.focus() }
    }}>
      <div className="site-container">
        <div className="flex items-center justify-between min-h-20 gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-primary">
            <BrandLogo />
          </Link>
          <nav aria-label="Navigation principale" className="hidden xl:flex items-center gap-6">
            {links.map(link => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}
              className={`py-3 text-sm hover:underline ${isActive(link.href) ? "text-primary font-bold underline underline-offset-4" : "font-medium"}`}>
              {link.label}
            </Link>)}
            <Button asChild size="sm"><Link href="/rejoindre" aria-current={pathname === "/rejoindre" ? "page" : undefined}>Nous rejoindre</Link></Button>
          </nav>
          <button ref={button} type="button" className="xl:hidden flex min-h-11 min-w-11 items-center justify-center rounded-md border"
            onClick={() => setIsOpen(open => !open)} aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={isOpen} aria-controls="mobile-navigation">
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <nav id="mobile-navigation" aria-label="Navigation mobile" hidden={!isOpen} className="xl:hidden max-h-[70dvh] overflow-y-auto pb-4">
          {links.map(link => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} aria-current={isActive(link.href) ? "page" : undefined}
            className={`block py-3 border-b ${isActive(link.href) ? "text-primary font-bold underline" : "font-medium"}`}>
            {link.label}
          </Link>)}
          <Button asChild className="mt-4 w-full"><Link href="/rejoindre" onClick={() => setIsOpen(false)} aria-current={pathname === "/rejoindre" ? "page" : undefined}>Nous rejoindre</Link></Button>
        </nav>
      </div>
    </header>
  )
}
