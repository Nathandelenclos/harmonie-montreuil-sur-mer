import Link from "next/link"
import { Calendar, MapPin, Music, Clock, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import AnimatedSection from "@/components/animated-section"
import { formatDate } from "@/lib/utils"

export default function EventsPage() {
  const events = [
    {
      title: "Concert d'été",
      date: new Date(2025, 6, 15),
      time: "20h00",
      location: "Jardins de l'Abbatiale Saint-Saulve",
      description:
        "Concert en plein air avec un répertoire estival varié. Au programme : musiques de films, œuvres classiques et morceaux de variété.",
      featured: true,
    },
    {
      title: "Fête de la musique",
      date: new Date(2025, 5, 21),
      time: "18h30",
      location: "Place du Général de Gaulle",
      description:
        "Animation musicale dans le cadre de la Fête de la Musique. Venez nombreux pour célébrer la musique avec nous !",
      featured: false,
    },
    {
      title: "Cérémonie du 14 juillet",
      date: new Date(2025, 6, 14),
      time: "11h00",
      location: "Monument aux morts",
      description: "Participation à la cérémonie officielle de la Fête Nationale.",
      featured: false,
    },
    {
      title: "Festival des Remparts",
      date: new Date(2025, 7, 10),
      time: "15h00",
      location: "Citadelle de Montreuil-sur-Mer",
      description:
        "Concert dans le cadre du Festival des Remparts. Un programme spécial mettant à l&#39;honneur la musique médiévale et Renaissance.",
      featured: true,
    },
    {
      title: "Cérémonie commémorative",
      date: new Date(2025, 10, 11),
      time: "11h00",
      location: "Monument aux morts",
      description: "Participation aux cérémonies du 11 novembre.",
      featured: false,
    },
    {
      title: "Concert de Noël",
      date: new Date(2025, 11, 20),
      time: "20h00",
      location: "Théâtre municipal",
      description:
        "Concert de fin d'année avec un répertoire festif. Venez vous immerger dans la magie de Noël avec des musiques traditionnelles et contemporaines.",
      featured: true,
    },
  ]

  // Trier les événements par date
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime())

  // Séparer les événements en vedette
  const featuredEvents = sortedEvents.filter((event) => event.featured)

  return (
    <div className="flex flex-col">
      <PageHeader title="Nos événements" description="Retrouvez tous nos concerts et manifestations à venir" />

      {/* Featured Events */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Événements à ne pas manquer</h2>
            <p className="section-subtitle">Nos concerts et manifestations phares de l&#39;année</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <AnimatedSection key={index} delay={0.1 * index} animation="zoom-in" className="card-hover">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full card-equal">
                  <div className="h-48 bg-gradient-to-r from-primary/90 via-accent/80 to-secondary/90 flex items-center justify-center">
                    <Music className="h-16 w-16 text-white hover-rotate" />
                  </div>
                  <div className="p-6 flex flex-col card-equal-body">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Calendar className="h-5 w-5" />
                      <span className="font-medium">{formatDate(event.date)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{event.description}</p>
                    <div className="space-y-2 card-equal-footer">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar of Events */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Calendrier des événements</h2>
            <p className="section-subtitle">Tous nos concerts et manifestations à venir</p>
          </AnimatedSection>

          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary via-accent to-secondary p-4 text-white">
              <h3 className="text-xl font-bold">Programmation 2025</h3>
            </div>
            <div className="divide-y">
              {sortedEvents.map((event, index) => (
                <AnimatedSection key={index} delay={0.05 * index} animation="slide-right">
                  <div className="p-6 hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-1/6">
                        <div className="text-primary font-bold">{formatDate(event.date)}</div>
                        <div className="text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="md:w-2/6">
                        <h4 className="text-lg font-bold">{event.title}</h4>
                        <div className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="md:w-3/6">
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

      {/* Call to Action */}
      <section className="py-16 md:py-24">
        <div className="container px-4 text-center">
          <AnimatedSection animation="bounce">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Vous souhaitez nous inviter ?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-muted-foreground">
              Vous organisez un événement et souhaitez que l&#39;Harmonie de Montreuil-sur-Mer s&#39;y produise ? N&#39;hésitez pas
              à nous contacter !
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/contact" className="flex items-center gap-2">
                Contactez-nous
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

