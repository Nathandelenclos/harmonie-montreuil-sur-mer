"use client"

import { useEffect, useRef, type ReactNode } from "react"

const revealTargets = ".section-heading, .home-section-title, .school-course, .home-photo-grid, .home-orchestra, .event-card, .media-feature-layout, .school-instruments > li, #albums li, #captations li, .reading-content > section"

export default function PageTemplate({ children }: { children: ReactNode }) {
  const page = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = page.current
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!root || motion.matches || !window.IntersectionObserver || !HTMLElement.prototype.animate) return

    const pending = new Set<HTMLElement>()
    const animations = new Set<Animation>()
    const reveal = (element: HTMLElement, animate: boolean) => {
      if (!pending.delete(element)) return
      element.style.removeProperty("opacity")
      delete element.dataset.scrollPending
      observer.unobserve(element)
      if (animate && !motion.matches) {
        const animation = element.animate([
          { opacity: 0, transform: "translateY(24px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" })
        animations.add(animation)
        animation.onfinish = () => animations.delete(animation)
      }
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target as HTMLElement, true) })
    }, { rootMargin: `0px 0px -${Math.min(120, window.innerHeight / 4)}px 0px` })

    root.querySelectorAll<HTMLElement>(revealTargets).forEach(element => {
      // Keep the initial viewport, restored scroll position and focused content immediately visible.
      if (element.getBoundingClientRect().top < window.innerHeight || element.contains(document.activeElement)) return
      pending.add(element)
      element.dataset.scrollPending = ""
      element.style.opacity = "0"
      observer.observe(element)
    })

    const revealFocus = (event: FocusEvent) => {
      const target = event.target
      if (target instanceof Node) pending.forEach(element => { if (element.contains(target)) reveal(element, false) })
    }
    const stop = () => {
      pending.forEach(element => reveal(element, false))
      animations.forEach(animation => animation.cancel())
      animations.clear()
      observer.disconnect()
    }
    const reduceMotion = () => { if (motion.matches) stop() }
    root.addEventListener("focusin", revealFocus)
    motion.addEventListener("change", reduceMotion)
    return () => {
      stop()
      root.removeEventListener("focusin", revealFocus)
      motion.removeEventListener("change", reduceMotion)
    }
  }, [])

  return <div ref={page} className="page-transition">{children}</div>
}
