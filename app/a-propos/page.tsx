import { pageMetadata } from "@/lib/metadata"
import Image from "next/image"
import Link from "next/link"
import { Music, Users, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export const metadata = pageMetadata("L’harmonie et son équipe", "Découvrez l’Harmonie de Montreuil-sur-Mer, ses chefs d’orchestre, son bureau et les musiciens qui font vivre la musique dans la cité.", "/a-propos")

export default function AboutPage() {
  return (
    <div className="content-page">
      <PageHeader homeLink={<Link href="/">Accueil</Link>}
        title="L’harmonie et son équipe"
        image="/assets/harmonie-officiel.jpg"
        description="Découvrez l'Harmonie de Montreuil-sur-Mer, son histoire et ses musiciens"
      />

      <section className="py-16 md:py-24">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Notre harmonie</h2>
                <p className="text-muted-foreground">
                  L&#39;Harmonie de Montreuil-sur-Mer est une formation musicale composée d&#39;une trentaine de musiciens
                  amateurs passionnés, de tous âges et de tous horizons. Fondée en 1865, elle perpétue une tradition
                  musicale plus que centenaire dans notre belle cité.
                </p>
                <p className="text-muted-foreground">
                  Notre répertoire est varié et s&#39;adapte aux différentes manifestations auxquelles nous participons :
                  cérémonies officielles, concerts thématiques, animations locales... Nous interprétons aussi bien des
                  œuvres classiques que des musiques de films, des morceaux de variété ou des compositions originales
                  pour orchestre d&#39;harmonie.
                </p>
                <p className="text-muted-foreground">
                  Plus qu&#39;un simple ensemble musical, l&#39;Harmonie de Montreuil-sur-Mer est un lieu de partage,
                  d&#39;apprentissage et de convivialité, où chacun peut s&#39;épanouir dans sa pratique musicale tout en
                  contribuant à la vie culturelle locale.
                </p>
              </div>
            </div>

            <div>
              <div className="photo-frame">
                <Image
                  src="/assets/sainte-cecile-2025.jpg"
                  alt="L’Harmonie réunie pour la Sainte-Cécile 2025"
                  width={1800}
                  height={1350}
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
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
              <div className="surface p-8">
                <div className="w-12 h-12 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Music className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Promouvoir la musique</h3>
                <p className="text-muted-foreground">
                  Nous nous efforçons de faire découvrir et apprécier la musique d&#39;harmonie au plus grand nombre, à
                  travers nos concerts et nos participations aux événements locaux.
                </p>
              </div>
            </li>

            <li className="card-hover">
              <div className="surface p-8">
                <div className="w-12 h-12 mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Former des musiciens</h3>
                <p className="text-muted-foreground">
                  Nous accueillons des musiciens de tous niveaux et les accompagnons dans leur progression, en
                  collaboration avec l&#39;école de musique locale.
                </p>
              </div>
            </li>

            <li className="card-hover">
              <div className="surface p-8">
                <div className="w-12 h-12 mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Préserver le patrimoine</h3>
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
            <h2 className="section-title mb-4">Notre équipe</h2>
            <p className="section-subtitle">Découvrez les personnes qui font vivre l&#39;Harmonie de Montreuil-sur-Mer</p>
          </div>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-wide)),1fr))] gap-8">
            {[
              { name: "Raphaël MOREAU", role: "Président", image: "/placeholder.svg?height=300&width=300&text=Jean" },
              {
                name: "Magalie DELMOTTE",
                role: "Cheffe d'orchestre",
                image: "/placeholder.svg?height=300&width=300&text=Marie",
              },
              { name: "Fabien ROGER", role: "Chef d’orchestre" },
              { name: "Cyrille SAISON", role: "Trésorier", image: "/placeholder.svg?height=300&width=300&text=Pierre" },
              {
                name: "Milo DELATTRE ISRAËL",
                role: "Secrétaire",
                image: "/placeholder.svg?height=300&width=300&text=Sophie",
              },
            ].map((member) => (
              <li key={member.name}>
                <div className="card-hover">
                  <div className="surface overflow-hidden">
                    {/*<div className="aspect-square relative">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover"/>
                    </div>*/}
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-primary">{member.role}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
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

