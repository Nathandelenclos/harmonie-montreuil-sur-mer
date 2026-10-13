import { pageMetadata } from "@/lib/metadata"
import Image from "next/image"
import Link from "next/link"
import MediaFeature from "@/components/media-feature"
import YouTubeEmbed from "@/components/youtube-embed"
import PhotoSlideshow from "@/components/photo-slideshow"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export const metadata = pageMetadata("L’harmonie et son équipe", "Découvrez l’Harmonie de Montreuil-sur-Mer, ses chefs d’orchestre, son bureau et les musiciens qui font vivre la musique dans la cité.", "/a-propos")

export default function AboutPage() {
  return (
    <div className="content-page">
      <PageHeader homeLink={<Link href="/">Accueil</Link>} eyebrow="Montreuil-sur-Mer · Depuis 1854" title="Une histoire de musique. Et de rencontres."
        description="Une trentaine de musiciens amateurs, de tous âges et de tous horizons, réunis par le plaisir de jouer ensemble et de faire vivre la musique à Montreuil."
        media={<PhotoSlideshow photos={[
          { src: "/assets/sainte-cecile-2025.jpg", alt: "L’Harmonie réunie pour la Sainte-Cécile 2025", caption: "Les musiciens réunis pour la Sainte-Cécile 2025." },
          { src: "/assets/archives/878fe25780b01788.webp", alt: "Les musiciens costumés sur scène au concert de printemps", caption: "Concert de printemps 2018." },
          { src: "/assets/archives/eaced13a52ac384d.webp", alt: "L’orchestre et sa cheffe pendant le concert d’automne", caption: "Concert d’automne 2018." },
          { src: "/assets/archives/e1b96b853f6ec045.webp", alt: "Les musiciens de l’harmonie jouent sous un kiosque", caption: "Festival du Touquet · 2018." },
          { src: "/assets/archives/0b29b15e5107d464.webp", alt: "Les musiciens de l’harmonie réunis pour une photo de groupe", caption: "L’Harmonie de Montreuil-sur-Mer · 2018." },
        ]} />}
        actions={<><Button asChild variant="secondary"><Link href="/rejoindre">Jouer avec nous</Link></Button><Link href="#equipe-harmonie" className="home-text-link">Rencontrer l’équipe →</Link></>}
      />

      <section className="site-container py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <h2 className="section-title">La musique,<br />ça se partage.</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>Œuvres classiques, musiques de films, variété et compositions pour orchestre d’harmonie : notre répertoire accompagne les concerts thématiques, les cérémonies et les animations locales.</p>
            <p>Fondée en 1854, l’harmonie est aussi un lieu d’apprentissage et de convivialité. Chacun contribue, à sa manière, à la vie culturelle de la cité.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="site-container">
          <div className="section-heading">
            <h2 className="section-title mb-4">Notre mission</h2>
            <p className="section-subtitle">
              L&#39;Harmonie de Montreuil-sur-Mer s&#39;engage à promouvoir la musique et à enrichir la vie culturelle locale
            </p>
          </div>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-default)),1fr))] gap-8">
            <li className="card-hover">
              <div className="h-full">
                <figure className="mb-6"><Image src="/assets/archives/878fe25780b01788.webp" alt="Les musiciens costumés au concert de printemps" width={1600} height={1063} sizes="(max-width: 767px) 100vw, 33vw" className="aspect-[3/2] w-full object-cover rounded-lg" /><figcaption className="mt-3 text-sm text-muted-foreground">Concert de printemps 2018</figcaption></figure>
                <h3 className="text-2xl font-bold mb-4">Promouvoir la musique</h3>
                <p className="text-muted-foreground">
                  Nous nous efforçons de faire découvrir et apprécier la musique d&#39;harmonie au plus grand nombre, à
                  travers nos concerts et nos participations aux événements locaux.
                </p>
              </div>
            </li>

            <li className="card-hover">
              <div className="h-full">
                <figure className="mb-6"><Image src="/assets/archives/85c2087db2123161.webp" alt="Les élèves et musiciens réunis pour une audition" width={1600} height={1063} sizes="(max-width: 767px) 100vw, 33vw" className="aspect-[3/2] w-full object-cover rounded-lg" /><figcaption className="mt-3 text-sm text-muted-foreground">Audition de l’école · 2018</figcaption></figure>
                <h3 className="text-2xl font-bold mb-4">Former des musiciens</h3>
                <p className="text-muted-foreground">
                  Nous accueillons des musiciens de tous niveaux et les accompagnons dans leur progression, en
                  collaboration avec l&#39;école de musique locale.
                </p>
              </div>
            </li>

            <li className="card-hover">
              <div className="h-full">
                <figure className="mb-6"><Image src="/assets/archives/5c7fa995c817cb7e.webp" alt="Le pupitre des tambours sur scène" width={1600} height={1063} sizes="(max-width: 767px) 100vw, 33vw" className="aspect-[3/2] w-full object-cover rounded-lg" /><figcaption className="mt-3 text-sm text-muted-foreground">Les tambours · Printemps 2018</figcaption></figure>
                <h3 className="text-2xl font-bold mb-4">Préserver le patrimoine</h3>
                <p className="text-muted-foreground">
                  Nous perpétuons une tradition musicale plus que centenaire et contribuons à la préservation du
                  patrimoine culturel immatériel de notre région.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="site-container">
          <div className="section-heading">
            <h2 id="equipe-harmonie" className="section-title mb-4">Les visages de l’association</h2>
            <p className="section-subtitle">Découvrez les personnes qui font vivre l&#39;Harmonie de Montreuil-sur-Mer</p>
          </div>

          <ul className="grid gap-x-12 md:grid-cols-2">
            {[
              { name: "Raphaël MOREAU", role: "Président" },
              { name: "Magalie DELMOTTE", role: "Cheffe d’orchestre" },
              { name: "Fabien ROGER", role: "Chef d’orchestre" },
              { name: "Cyrille SAISON", role: "Trésorier" },
              { name: "Milo DELATTRE ISRAËL", role: "Secrétaire" },
            ].map(member => <li key={member.name} className="border-t border-primary/20 py-6"><p className="text-sm text-muted-foreground mb-2">{member.role}</p><h3 className="text-2xl font-bold text-primary">{member.name}</h3></li>)}
          </ul>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24" aria-labelledby="archives-title">
        <div className="site-container">
          <div className="section-heading">
            <h2 id="archives-title" className="section-title">Des générations en musique</h2>
            <p className="section-subtitle">Les visages et les souvenirs d’une histoire musicale partagée.</p>
          </div>
          <div className="grid items-start gap-8 md:grid-cols-2">
            <figure>
              <Image src="/assets/archives/harmonie-1927.jpg" alt="Portrait ancien des musiciens réunis avec leurs instruments et la bannière de l’harmonie" width={1400} height={918} sizes="(max-width: 767px) 100vw, 50vw" className="h-auto w-full rounded-lg" />
              <figcaption className="border-l-4 border-secondary pl-4 mt-4">1927</figcaption>
            </figure>
            <figure>
              <Image src="/assets/archives/harmonie-1949.jpg" alt="Photographie ancienne de l’harmonie posant en groupe avec ses instruments" width={2048} height={1196} sizes="(max-width: 767px) 100vw, 50vw" className="h-auto w-full rounded-lg" />
              <figcaption className="border-l-4 border-secondary pl-4 mt-4">1949</figcaption>
            </figure>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            <Link className="home-text-link text-primary" href="/galerie">Parcourir les photos d’archives</Link>
            <Link className="home-text-link text-primary" href="/videos">Écouter nos concerts</Link>
          </div>
        </div>
      </section>

      <MediaFeature id="about-film-title" eyebrow="Dans les archives · 2017" title="Une harmonie, une histoire vivante."
        media={<figure><YouTubeEmbed id="tBcUdDxvP0k" title="Montreuil en harmonie — reportage de Frédéric Touchard" /><figcaption className="mt-3 text-sm">Reportage de Frédéric Touchard dans le cadre du CLEA · Publié en juillet 2017 par MARLENE47100.</figcaption></figure>}
        actions={<Button asChild variant="secondary"><Link href="/videos">Découvrir les captations</Link></Button>}
      ><p>Un regard sur l’harmonie à l’occasion du concert de printemps. Un souvenir à découvrir aux côtés des photos et des autres captations.</p></MediaFeature>

      <section className="callout">
        <div className="site-container">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Rejoignez notre harmonie</h2>
            <p className="text-lg max-w-2xl mb-8 text-white">
              Vous êtes musicien amateur ou confirmé ? Venez partager votre passion avec nous !
            </p>
            <Button asChild size="lg" variant="outline" className="bg-white text-primary">
              <Link href="/rejoindre">Nous rejoindre</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

