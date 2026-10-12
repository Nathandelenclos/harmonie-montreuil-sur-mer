interface PageHeaderProps {
  title: string
  description?: string
  image?: string
}

export default function PageHeader({ title, description, image }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header-bg brand-gradient" style={image ? { backgroundImage: `linear-gradient(#082c66cc, #082c66cc), url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}} />
      <div className="page-header-pattern" />
      <div className="page-header-content">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
        {description && <p className="text-white text-lg max-w-3xl mx-auto">{description}</p>}
      </div>
    </header>
  )
}
