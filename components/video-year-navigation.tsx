"use client"

import { useEffect, useRef, useState } from "react"

export default function VideoYearNavigation({ years }: { years: string[] }) {
  const [activeYear, setActiveYear] = useState(years[0])
  const navigation = useRef<HTMLElement>(null)

  useEffect(() => {
    let frame: number | null = null
    const update = () => {
      frame = null
      const nav = navigation.current
      if (!nav) return
      const edge = nav.getBoundingClientRect().bottom + (parseFloat(getComputedStyle(nav).marginBottom) || 0)
      let current = years[0]
      for (const year of years) {
        const section = document.getElementById(`videos-${year}`)
        if (section && section.getBoundingClientRect().top <= edge) current = year
      }
      setActiveYear(current)
      const link = nav.querySelector<HTMLAnchorElement>(`a[href="#videos-${current}"]`)
      if (link && (link.offsetLeft < nav.scrollLeft || link.offsetLeft + link.offsetWidth > nav.scrollLeft + nav.clientWidth)) {
        nav.scrollTo({ left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2, behavior: "auto" })
      }
    }
    const schedule = () => { if (frame === null) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [years])

  return <nav ref={navigation} aria-label="Années des vidéos" className="sticky top-20 z-40 mb-8 overflow-x-auto bg-background py-2">
    <div className="flex w-max min-w-full px-1">
      {years.map(year => <a key={year} href={`#videos-${year}`} aria-current={activeYear === year ? "location" : undefined}
        className={`group relative flex min-h-12 min-w-16 flex-1 flex-col items-center px-3 py-2 font-semibold text-primary underline-offset-4 hover:underline before:absolute before:inset-x-0 before:top-3 before:h-0.5 before:bg-primary/20 ${activeYear === year ? "underline decoration-2" : ""}`}>
        <span aria-hidden="true" className={`relative mb-2 h-2 w-2 rounded-full ring-4 motion-safe:transition-transform motion-safe:group-hover:scale-150 motion-safe:group-focus-visible:scale-150 ${activeYear === year ? "bg-secondary ring-primary" : "bg-primary ring-background"}`} />
        {year}
      </a>)}
    </div>
  </nav>
}
