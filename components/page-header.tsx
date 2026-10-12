import Image from "next/image"
import type { ReactNode } from "react"

interface PageHeaderProps {
  homeLink: ReactNode
  title: string
  description?: string
  image?: string
  eyebrow?: string
  media?: ReactNode
  actions?: ReactNode
}

export default function PageHeader({ homeLink, title, description, image, eyebrow, media, actions }: PageHeaderProps) {
  const hasVisual = Boolean(image || media)
  return (
    <header className={`page-header ${hasVisual ? "bg-primary text-white" : "bg-muted text-primary"}`}>
      {image && <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />}
      {image && <div className="page-header-shade absolute inset-0" />}
      <div className="page-header-content">
        <nav aria-label="Fil d’Ariane" className="mb-6 flex flex-wrap items-center gap-x-3 text-sm">
          {homeLink}
          <span aria-hidden="true">/</span><span aria-current="page">{title}</span>
        </nav>
        <div className={media ? "page-header-layout grid items-center gap-8" : ""}>
          <div className="min-w-0">
            {eyebrow && <p className={`mb-4 text-sm font-semibold ${hasVisual ? "text-secondary" : "text-primary"}`}>{eyebrow}</p>}
            <h1 className="display-title mb-6 max-w-4xl font-bold">{title}</h1>
            {description && <p className="max-w-2xl text-lg leading-relaxed">{description}</p>}
            {actions && <div className="mt-8 flex flex-wrap gap-4">{actions}</div>}
          </div>
          {media && <div className="min-w-0">{media}</div>}
        </div>
      </div>
    </header>
  )
}
