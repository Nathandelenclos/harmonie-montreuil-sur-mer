import Image from "next/image"
import type { ReactNode } from "react"

interface PageHeaderProps {
  homeLink: ReactNode
  title: string
  description?: string
  image?: string
}

export default function PageHeader({ homeLink, title, description, image }: PageHeaderProps) {
  return (
    <header className="page-header bg-primary text-white">
      {image && <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />}
      {image && <div className="page-header-shade absolute inset-0" />}
      <div className="page-header-content">
        <nav aria-label="Fil d’Ariane" className="mb-6 flex flex-wrap items-center gap-x-3 text-sm">
          {homeLink}
          <span aria-hidden="true">/</span><span aria-current="page">{title}</span>
        </nav>
        <h1 className="display-title mb-6 max-w-4xl font-bold">{title}</h1>
        {description && <p className="max-w-2xl text-lg leading-relaxed">{description}</p>}
      </div>
    </header>
  )
}
