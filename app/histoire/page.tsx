import Image from "next/image"
import { BookOpen, Award } from "lucide-react"

import PageHeader from "@/components/page-header"
import AnimatedSection from "@/components/animated-section"

export default function HistoryPage() {
  const timelineEvents = [
    {
      year: "1865",
      title: "Fondation",
      description: "Création de l'Harmonie de Montreuil-sur-Mer par un groupe de musiciens amateurs passionnés.",
    },
    {
      year: "1880-1900",
      title: "Âge d'or",
      description: "L'Harmonie connaît un essor important et participe à de nombreux concours régionaux et nationaux.",
    },
    {
      year: "1914-1918",
      title: "Première Guerre mondiale",
      description: "Les activités sont suspendues pendant le conflit. Plusieurs musiciens ne reviendront pas du front.",
    },
    {
      year: "1920",
      title: "Renaissance",
      description: "Reprise des activités après la guerre avec une nouvelle génération de musiciens.",
    },
    {
      year: "1939-1945",
      title: "Seconde Guerre mondiale",
      description:
        "Nouvelle interruption pendant l'occupation. L'Harmonie maintient cependant quelques activités discrètes.",
    },
    {
      year: "1950-1960",
      title: "Renouveau",
      description: "Période de reconstruction et de modernisation du répertoire sous l'impulsion d'un nouveau chef.",
    },
    {
      year: "1965",
      title: "Centenaire",
      description: "Célébration du centenaire de l'Harmonie avec un grand concert réunissant d'anciens musiciens.",
    },
    {
      year: "1980-2000",
      title: "Développement",
      description:
        "Diversification du répertoire et ouverture à de nouveaux styles musicaux. Collaboration avec l'école de musique.",
    },
    {
      year: "2015",
      title: "150ème anniversaire",
      description:
        "150ème anniversaire de l'Harmonie, marqué par une série de concerts exceptionnels et la publication d'un livre retraçant son histoire.",
    },
    {
      year: "Aujourd'hui",
      title: "Continuité",
      description:
        "L'Harmonie continue de se produire régulièrement et accueille de nouveaux musiciens de tous âges et de tous niveaux.",
    },
  ]

  return (
    <div className="flex flex-col">
      <PageHeader title="Notre histoire" description="Plus de 150 ans d'histoire musicale à Montreuil-sur-Mer" />

      <section className="py-16 md:py-24">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Notre parcours à travers le temps</h2>
            <p className="section-subtitle">
              Découvrez les moments clés qui ont façonné l'histoire de notre harmonie depuis sa création en 1865
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <AnimatedSection>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Une tradition musicale centenaire</h2>
                <p className="text-muted-foreground">
                  L'Harmonie de Montreuil-sur-Mer a traversé les époques, les guerres et les changements sociaux tout en
                  maintenant vivante la tradition musicale de notre cité. Fondée en 1865 par un groupe de passionnés,
                  elle est l'une des plus anciennes associations culturelles encore en activité dans la région.
                </p>
                <p className="text-muted-foreground">
                  Au fil des décennies, l'Harmonie a su s'adapter aux évolutions musicales et sociétales, tout en
                  préservant son identité et sa mission : faire vivre la musique au cœur de Montreuil-sur-Mer et de ses
                  environs.
                </p>
                <p className="text-muted-foreground">
                  De génération en génération, les musiciens se sont succédé, transmettant leur passion et leur
                  savoir-faire, contribuant ainsi à créer une véritable institution culturelle locale reconnue dans
                  toute la région.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full -z-10"></div>
                <Image
                  src="/placeholder.svg?height=600&width=500&text=Photo+historique"
                  alt="Photo historique de l'Harmonie"
                  width={500}
                  height={600}
                  className="rounded-lg shadow-xl w-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent"></div>

            {/* Timeline events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <AnimatedSection key={index} delay={0.1 * index}>
                  <div className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}>
                    <div className="w-1/2"></div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg border-4 border-primary z-10 mx-4">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-1/2">
                      <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
                        <div className="text-primary font-bold text-xl mb-2">{event.year}</div>
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <p className="text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Nos distinctions</h2>
            <p className="section-subtitle">Les récompenses et reconnaissances obtenues au fil des années</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                year: "1890",
                title: "Premier prix",
                description: "Concours régional des harmonies du Nord de la France",
              },
              { year: "1925", title: "Médaille d'or", description: "Festival international de musique d'Arras" },
              {
                year: "2015",
                title: "Prix du patrimoine culturel",
                description: "Décerné par le Conseil Départemental du Pas-de-Calais",
              },
            ].map((award, index) => (
              <AnimatedSection key={index} delay={0.1 * index} className="card-hover">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Award className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="text-primary font-bold mb-2">{award.year}</div>
                  <h3 className="text-xl font-bold mb-4">{award.title}</h3>
                  <p className="text-muted-foreground">{award.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Témoignages</h2>
            <p className="section-subtitle">
              Souvenirs et anecdotes de musiciens qui ont marqué l'histoire de notre harmonie
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Robert Dumont",
                role: "Ancien président (1980-1995)",
                quote:
                  "J'ai vu l'Harmonie traverser des périodes difficiles, mais la passion et la détermination des musiciens ont toujours permis de surmonter les obstacles. C'est cette résilience qui fait la force de notre association depuis plus de 150 ans.",
                image: "/placeholder.svg?height=300&width=300&text=Robert",
              },
              {
                name: "Jeanne Leroy",
                role: "Musicienne depuis 1975",
                quote:
                  "L'Harmonie a été comme une seconde famille pour moi. J'y ai rencontré des personnes extraordinaires et vécu des moments inoubliables. Les concerts, les voyages, les répétitions... Chaque instant passé avec l'Harmonie est un souvenir précieux.",
                image: "/placeholder.svg?height=300&width=300&text=Jeanne",
              },
            ].map((testimonial, index) => (
              <AnimatedSection key={index} delay={0.1 * index} className="card-hover">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <blockquote className="text-muted-foreground italic mb-4">"{testimonial.quote}"</blockquote>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-primary text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

