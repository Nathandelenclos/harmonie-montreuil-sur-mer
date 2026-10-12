import type { ReactNode } from "react"

export default function MediaFeature({ id, eyebrow, title, children, media, actions }: {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
  media: ReactNode
  actions: ReactNode
}) {
  return <section className="media-feature bg-primary text-white" aria-labelledby={id}>
    <div className="site-container py-12 md:py-16">
      <div className="media-feature-layout grid items-center gap-8">
        <div className="min-w-0">
          <p className="mb-4 text-sm font-semibold text-secondary">{eyebrow}</p>
          <h2 id={id} className="section-title text-white mb-6">{title}</h2>
          <div className="max-w-xl space-y-4 leading-relaxed">{children}</div>
          <div className="mt-6 flex flex-wrap gap-4">{actions}</div>
        </div>
        <div className="min-w-0">{media}</div>
      </div>
    </div>
  </section>
}
