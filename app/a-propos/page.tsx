import Image from "next/image"
import Link from "next/link"
import { Music, Users, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import AnimatedSection from "@/components/animated-section"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="À propos de nous"
        description="Découvrez l'Harmonie de Montreuil-sur-Mer, son histoire et ses musiciens"
      />

      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
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
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full -z-10"></div>
                <Image
                  src="/assets/harmonie-montreuil-sur-mer.jpg?height=600&width=500"
                  alt="L'Harmonie en répétition"
                  width={500}
                  height={600}
                  className="rounded-lg shadow-xl w-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Notre mission</h2>
            <p className="section-subtitle">
              L&#39;Harmonie de Montreuil-sur-Mer s&#39;engage à promouvoir la musique et à enrichir la vie culturelle locale
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1} className="card-hover">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Music className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Promouvoir la musique</h3>
                <p className="text-muted-foreground">
                  Nous nous efforçons de faire découvrir et apprécier la musique d&#39;harmonie au plus grand nombre, à
                  travers nos concerts et nos participations aux événements locaux.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="card-hover">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Former des musiciens</h3>
                <p className="text-muted-foreground">
                  Nous accueillons des musiciens de tous niveaux et les accompagnons dans leur progression, en
                  collaboration avec l&#39;école de musique locale.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="card-hover">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Préserver le patrimoine</h3>
                <p className="text-muted-foreground">
                  Nous perpétuons une tradition musicale plus que centenaire et contribuons à la préservation du
                  patrimoine culturel immatériel de notre région.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Notre équipe</h2>
            <p className="section-subtitle">Découvrez les personnes qui font vivre l&#39;Harmonie de Montreuil-sur-Mer</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Raphaël Moreau", role: "Président", image: "/placeholder.svg?height=300&width=300&text=Jean" },
              {
                name: "Magalie Birault",
                role: "Cheffe d'orchestre",
                image: "/placeholder.svg?height=300&width=300&text=Marie",
              },
              { name: "Cyril Saison", role: "Trésorier", image: "/placeholder.svg?height=300&width=300&text=Pierre" },
              {
                name: "Bertille Depre",
                role: "Secrétaire",
                image: "/placeholder.svg?height=300&width=300&text=Sophie",
              },
            ].map((member, index) => (
              <AnimatedSection key={index} delay={0.1 * index} className="card-hover">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/*<div className="aspect-square relative">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover"/>
                  </div>*/}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-primary via-accent to-secondary text-white">
        <div className="container px-4 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Rejoignez notre harmonie</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-white/90">
              Vous êtes musicien amateur ou confirmé ? Venez partager votre passion avec nous !
            </p>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 hover:bg-white/20">
              <Link href="/rejoindre">Nous rejoindre</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

