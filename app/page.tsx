import Link from "next/link"
import Image from "next/image"
import { Calendar, ChevronRight, MapPin, Music, Users, GraduationCap, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import AnimatedSection from "@/components/animated-section"
import {events} from "@/data/Events";

export default function Home() {


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/montreuil.jpg"
            alt="Harmonie de Montreuil-sur-Mer en concert"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-accent/70 to-secondary/80 mix-blend-multiply" />
        </div>

        {/* Animated music notes */}
        <Music
          className="absolute text-white/10 text-6xl top-1/4 left-1/4 animate-float"
          style={{ animationDelay: "0s" }}
        />
        <Music
          className="absolute text-white/10 text-7xl top-1/3 left-2/3 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <Music
          className="absolute text-white/10 text-5xl top-1/2 left-1/3 animate-float"
          style={{ animationDelay: "4s" }}
        />
        <Music
          className="absolute text-white/10 text-6xl top-2/3 left-3/4 animate-float"
          style={{ animationDelay: "6s" }}
        />
        <Music
          className="absolute text-white/10 text-7xl top-3/4 left-1/5 animate-float"
          style={{ animationDelay: "8s" }}
        />

        {/* Content */}
        <div className="container relative z-10 px-4 text-center">
          <AnimatedSection delay={0.2} animation="fade-up">
            <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Harmonie de
              <br />
              Montreuil-sur-Mer
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.4} animation="fade-up">
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Plus de 150 ans d&#39;histoire musicale au service de la culture et du patrimoine de notre belle cité
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.6} animation="fade-up" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-secondary text-white border-white/40 hover:bg-secondary/90 group">
              <Link href="/evenements" className="flex items-center gap-2">
                Nos prochains concerts
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-secondary text-white border-white/40 hover:bg-secondary/90 group"
            >
              <Link href="/rejoindre" className="flex items-center gap-2">
                Rejoindre l&#39;harmonie
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>

          <AnimatedSection delay={0.8} className="mt-12">
            <div className="animate-bounce">
              <Link href="#about" className="text-white/80 hover:text-white flex flex-col items-center">
                <span className="mb-2">Découvrir</span>
                <ChevronRight className="h-6 w-6 rotate-90" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-white">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16" animation="fade-up">
            <h2 className="section-title mb-4">À propos de nous</h2>
            <p className="section-subtitle">
              L&#39;Harmonie de Montreuil-sur-Mer est composée de musiciens amateurs passionnés de tous âges. Notre
              répertoire est varié, allant des musiques de films aux œuvres classiques.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.2} animation="slide-right">
              <div className="relative hover-glow">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full -z-10"></div>
                <Image
                  src="/assets/harmonie.avif"
                  alt="Musiciens de l&#39;Harmonie"
                  width={500}
                  height={600}
                  className="rounded-lg shadow-xl w-full object-cover hover-scale"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4} animation="slide-left">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shimmer-effect">
                    <Music className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Une passion commune</h3>
                    <p className="text-muted-foreground">
                      Notre harmonie réunit des musiciens de tous horizons et de tous niveaux, unis par l&#39;amour de la
                      musique et le plaisir de jouer ensemble.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground shimmer-effect">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Des événements variés</h3>
                    <p className="text-muted-foreground">
                      Nous participons à de nombreux événements tout au long de l&#39;année : concerts, cérémonies
                      officielles, festivals et animations locales.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white shimmer-effect">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Une grande famille</h3>
                    <p className="text-muted-foreground">
                      Plus qu&#39;un ensemble musical, l&#39;Harmonie de Montreuil-sur-Mer est une véritable famille où règnent
                      convivialité, entraide et bonne humeur.
                    </p>
                  </div>
                </div>

                <Button asChild className="mt-4 group">
                  <Link href="/a-propos" className="flex items-center gap-2 internal-link">
                    En savoir plus
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* École de Musique Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16" animation="fade-up">
            <div className="inline-block bg-secondary/20 text-primary px-4 py-1 rounded-full mb-4 font-medium">
              Nouveau ! Inscriptions ouvertes
            </div>
            <h2 className="section-title mb-4">Notre École de Musique</h2>
            <p className="section-subtitle">
              Découvrez notre école de musique et commencez votre parcours musical dans un environnement bienveillant et
              stimulant
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.2} animation="slide-right">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold mb-4">Formez-vous à la musique</h3>
                <p className="text-muted-foreground">
                  Notre école de musique accueille les élèves de tous âges, débutants ou confirmés, désireux d&#39;apprendre
                  ou de perfectionner leur pratique instrumentale dans une ambiance conviviale et bienveillante.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Des cours adaptés à tous</h4>
                      <p className="text-muted-foreground">
                        Cours individuels d&#39;instruments, formation musicale, pratique collective... Notre offre
                        pédagogique s&#39;adapte à vos besoins et à votre niveau.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Des professeurs qualifiés</h4>
                      <p className="text-muted-foreground">
                        Notre équipe pédagogique est composée de musiciens professionnels et passionnés, soucieux de
                        transmettre leur savoir et leur amour de la musique.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button asChild size="lg" className="group">
                    <Link href="/ecole-de-musique" className="flex items-center gap-2">
                      Découvrir l&#39;école
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="group">
                    <Link href="/ecole-de-musique#inscription" className="flex items-center gap-2">
                      S&#39;inscrire maintenant
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4} animation="slide-left">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full -z-10"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src="/assets/instruments/piano.jpeg?height=300&width=300&text=Cours+Piano"
                        alt="Cours de piano"
                        width={300}
                        height={300}
                        className="w-full h-auto hover-scale"
                      />
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src="/assets/cours-de-groupe.avif?height=300&width=300&text=Cours+Groupe"
                        alt="Cours en groupe"
                        width={300}
                        height={300}
                        className="w-full h-auto hover-scale"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-6">
                    <div className="overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src="/assets/instruments/saxophone.jpg?height=300&width=300&text=Cours+Violon"
                        alt="Cours de saxophone"
                        width={300}
                        height={300}
                        className="w-full h-auto hover-scale"
                      />
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src="/assets/instruments/trompette.jpeg?height=300&width=300&text=Cours+Trompette"
                        alt="Cours de trompette"
                        width={300}
                        height={300}
                        className="w-full h-auto hover-scale"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16" animation="fade-up">
            <h2 className="section-title mb-4">Nos prochains événements</h2>
            <p className="section-subtitle">Retrouvez-nous lors de nos prochains concerts et manifestations</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <AnimatedSection key={index} delay={0.2 * index} animation="zoom-in" className="card-hover">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full card-equal">
                  <div className="bg-gradient-to-r from-primary/90 via-accent/80 to-secondary/90 flex items-center justify-center h-40">
                    {event.image && <Image src={event.image} alt={event.title} width={600} height={300} className="object-cover" />}
                    {!event.image && <Music className="h-16 w-16 text-white hover-rotate" />}

                  </div>
                  <div className="p-6 card-equal-body">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Calendar className="h-5 w-5" />
                      <span className="font-medium">
                        {new Intl.DateTimeFormat("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(event.date)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex items-center gap-2 text-muted-foreground card-equal-footer">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="group">
              <Link href="/evenements" className="flex items-center gap-2 internal-link">
                Voir tous les événements
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      {/* <section className="py-20 md:py-32 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16" animation="fade-up">
            <h2 className="section-title mb-4">Galerie photos</h2>
            <p className="section-subtitle">Quelques souvenirs de nos concerts et événements</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <AnimatedSection key={i} delay={0.1 * i} animation="zoom-in">
                <div className="overflow-hidden rounded-lg shadow-lg aspect-square relative group hover-glow">
                  <Image
                    src={`/placeholder.svg?height=400&width=400&text=Photo+${i}`}
                    alt={`Photo de l&#39;Harmonie ${i}`}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h3 className="text-white font-medium">Concert {2024 - i}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="group">
              <Link href="/galerie" className="flex items-center gap-2 internal-link">
                Voir toute la galerie
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>*/}

      {/* Call to Action */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary via-accent to-secondary text-white">
        <div className="container px-4 text-center">
          <AnimatedSection animation="bounce">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Rejoignez notre harmonie</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-white/90">
              Vous êtes musicien amateur ou confirmé ? Venez partager votre passion avec nous !
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 hover:bg-white/20 group"
              >
                <Link href="/rejoindre" className="flex items-center gap-2">
                  Nous rejoindre
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-secondary/20 border-white/30 hover:bg-secondary/30 group"
              >
                <Link href="/ecole-de-musique" className="flex items-center gap-2">
                  École de musique
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

