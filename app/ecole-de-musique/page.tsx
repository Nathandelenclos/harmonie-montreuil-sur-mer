import Image from "next/image"
import Link from "next/link"
import { Music, GraduationCap, Clock, Calendar, MapPin, ChevronRight, CheckCircle2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import AnimatedSection from "@/components/animated-section"
import type React from "react";

export default function MusicSchoolPage() {
  const instruments = [
    { name: "Piano", image: "/assets/piano.jpeg?height=300&width=300&text=Piano" },
    { name: "Violon", image: "/assets/violon.jpeg?height=300&width=300&text=Violon" },
    { name: "Flûte", image: "/assets/flute.png?height=300&width=300&text=Flûte" },
    { name: "Clarinette", image: "/assets/clarinette.jpg?height=300&width=300&text=Clarinette" },
    { name: "Saxophone", image: "/assets/saxophone.jpg?height=300&width=300&text=Saxophone" },
    { name: "Trompette", image: "/assets/trompette.jpeg?height=300&width=300&text=Trompette" },
    { name: "Trombone", image: "/assets/trombone.jpg?height=300&width=300&text=Trombone" },
    { name: "Hautbois", image: "/assets/hautbois.webp?height=300&width=300&text=Trombone" },
    { name: "Cor", image: "/assets/cor.avif?height=300&width=300&text=Trombone" },
    { name: "Percussion", image: "/assets/percussion.jpg?height=300&width=300&text=Percussion" },
  ]

  const teachers = [
    {
      name: "Magalie DELMOTTE",
      role: "Directrice",
      image: "/placeholder.svg?height=300&width=300&text=Marie",
      bio: "Diplômée du Conservatoire National de Paris, Marie enseigne le piano depuis plus de 15 ans avec passion et bienveillance.",
    },
    {
      name: "Fabien ROGER",
      role: "Professeur de cuivres",
      image: "/placeholder.svg?height=300&width=300&text=Jean",
      bio: "Trompettiste professionnel, Jean partage son temps entre l'enseignement et les concerts avec différents orchestres de la région.",
    },
    {
      name: "Jean-François AUBEL",
      role: "Professeur de cordes",
      image: "/placeholder.svg?height=300&width=300&text=Sophie",
      bio: "Violoniste passionnée, Sophie a à cœur de transmettre son amour de la musique aux élèves de tous âges et de tous niveaux.",
    },
    {
      name: "Annie JOUSSE",
      role: "Professeur de bois",
      image: "/placeholder.svg?height=300&width=300&text=Thomas",
      bio: "Clarinettiste et saxophoniste, Thomas enseigne avec enthousiasme et adapte sa pédagogie à chaque élève.",
    },
    {
      name: "Hugo MOREAU",
      role: "Professeur de bois",
      image: "/placeholder.svg?height=300&width=300&text=Thomas",
      bio: "Saxophoniste, Hugo enseigne avec enthousiasme et adapte sa pédagogie à chaque élève.",
    },
    {
      name: "Audrey BERNARD",
      role: "Professeur de bois",
      image: "/placeholder.svg?height=300&width=300&text=Thomas",
      bio: "Clarinettiste et saxophoniste, Thomas enseigne avec enthousiasme et adapte sa pédagogie à chaque élève.",
    },
    {
      name: "Céline GRAY",
      role: "Professeur de bois",
      image: "/placeholder.svg?height=300&width=300&text=Thomas",
      bio: "Clarinettiste et saxophoniste, Thomas enseigne avec enthousiasme et adapte sa pédagogie à chaque élève.",
    },
    {
      name: "Karim AFFREINGHUE",
      role: "Professeur de piano",
      image: "/placeholder.svg?height=300&width=300&text=Thomas",
      bio: "Clarinettiste et saxophoniste, Thomas enseigne avec enthousiasme et adapte sa pédagogie à chaque élève.",
    },
  ]

  return (
    <div className="flex flex-col">
      <PageHeader title="École de Musique" description="Apprenez la musique dans un cadre convivial et bienveillant" />

      {/* Introduction */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="inline-block bg-secondary/20 text-primary px-4 py-1 rounded-full mb-2 font-medium">
                  Inscriptions ouvertes pour l&#39;année 2025-2026
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Bienvenue à l&#39;École de Musique de Montreuil-sur-Mer</h2>
                <p className="text-muted-foreground">
                  Notre école de musique accueille les élèves de tous âges, débutants ou confirmés, désireux d&#39;apprendre
                  ou de perfectionner leur pratique instrumentale dans une ambiance conviviale et bienveillante.
                </p>
                <p className="text-muted-foreground">
                  Étroitement liée à l&#39;Harmonie de Montreuil-sur-Mer, notre école propose un enseignement de qualité
                  dispensé par des professeurs qualifiés et passionnés. Notre approche pédagogique favorise
                  l&#39;épanouissement musical de chaque élève à son rythme.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="group">
                    <Link href="#inscription" className="flex items-center gap-2">
                      S&#39;inscrire maintenant
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="group">
                    <Link href="#cours" className="flex items-center gap-2">
                      Découvrir nos cours
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full -z-10"></div>
                <Image
                  src="/placeholder.svg?height=600&width=500&text=École+de+Musique"
                  alt="École de Musique de Montreuil-sur-Mer"
                  width={500}
                  height={600}
                  className="rounded-lg shadow-xl w-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nos atouts */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Pourquoi choisir notre école ?</h2>
            <p className="section-subtitle">
              Notre école de musique se distingue par son approche pédagogique et son environnement bienveillant
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1} className="card-hover">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Enseignement de qualité</h3>
                <p className="text-muted-foreground">
                  Des professeurs qualifiés et passionnés qui adaptent leur pédagogie à chaque élève pour favoriser son
                  épanouissement musical.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="card-hover">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Music className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Pratique collective</h3>
                <p className="text-muted-foreground">
                  En plus des cours individuels, nous encourageons la pratique collective à travers des ensembles
                  adaptés à chaque niveau, permettant aux élèves de développer leur écoute et leur sens musical.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="card-hover">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Événements réguliers</h3>
                <p className="text-muted-foreground">
                  Des auditions, concerts et masterclasses sont organisés tout au long de l&#39;année pour permettre aux
                  élèves de se produire en public et de progresser.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nos cours */}
      <section id="cours" className="py-16 md:py-24">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Nos cours</h2>
            <p className="section-subtitle">
              Découvrez notre offre pédagogique complète pour tous les âges et tous les niveaux
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-primary/90 via-accent/80 to-secondary/90 flex items-center justify-center">
                  <Music className="h-16 w-16 text-white" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Formation musicale</h3>
                  <p className="text-muted-foreground mb-6">
                    La formation musicale est le socle de l&#39;apprentissage musical. Elle permet d&#39;acquérir les bases
                    théoriques et pratiques nécessaires à la pratique instrumentale : lecture de notes, rythme, écoute,
                    culture musicale...
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>1h à 1h30 par semaine selon le niveau</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Cours collectifs par niveau</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Approche ludique et interactive</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-primary/90 via-accent/80 to-secondary/90 flex items-center justify-center">
                  <GraduationCap className="h-16 w-16 text-white" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Cours d&#39;instruments</h3>
                  <p className="text-muted-foreground mb-6">
                    Les cours d&#39;instruments sont dispensés en cours individuels pour permettre un suivi personnalisé de
                    chaque élève. Notre école propose l&#39;apprentissage de nombreux instruments à vent, à cordes et à
                    percussion.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>30 min à 1h par semaine selon le niveau</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Cours individuels adaptés à chaque élève</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Répertoire varié et adapté aux goûts de l&#39;élève</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection delay={0.3}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-primary/90 via-accent/80 to-secondary/90 flex items-center justify-center">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Pratique collective</h3>
                  <p className="text-muted-foreground mb-6">
                    La pratique collective est essentielle dans l&#39;apprentissage musical. Elle permet de développer
                    l&#39;écoute, le sens du rythme et le plaisir de jouer ensemble. Plusieurs ensembles sont proposés selon
                    les niveaux.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>1h à 2h par semaine selon l&#39;ensemble</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Orchestre junior pour les débutants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Harmonie pour les élèves plus avancés</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-primary/90 via-accent/80 to-secondary/90 flex items-center justify-center">
                  <Music className="h-16 w-16 text-white" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Éveil musical</h3>
                  <p className="text-muted-foreground mb-6">
                    L&#39;éveil musical s&#39;adresse aux enfants de 4 à 6 ans. Il permet de découvrir la musique de manière
                    ludique et sensorielle à travers le chant, le rythme, l&#39;écoute et la découverte des instruments.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>45 min par semaine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Approche ludique et sensorielle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Découverte des instruments</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nos instruments */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Nos instruments</h2>
            <p className="section-subtitle">
              Découvrez les instruments que vous pouvez apprendre à notre école de musique
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {instruments.map((instrument, index) => (
              <AnimatedSection key={index} delay={0.1 * index} className="card-hover">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={instrument.image || "/placeholder.svg"}
                      alt={`Cours de ${instrument.name}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <h3 className="text-white font-medium">{instrument.name}</h3>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-bold">{instrument.name}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Nos professeurs */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Notre équipe pédagogique</h2>
            <p className="section-subtitle">
              Des professeurs qualifiés et passionnés pour vous accompagner dans votre apprentissage musical
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher, index) => (
              <AnimatedSection key={index} delay={0.1 * index} className="card-hover">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{teacher.name}</h3>
                    <p className="text-primary mb-4">{teacher.role}</p>
                    <p className="text-muted-foreground">{teacher.bio}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Inscription */}
      <section
        id="inscription"
        className="py-16 md:py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"
      >
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Inscriptions</h2>
            <p className="section-subtitle">Rejoignez notre école de musique pour l&#39;année 2025-2026</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Informations pratiques</h3>

                <div className="space-y-6">
                  <div>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center pb-2">
                        <h4 className="text-lg font-bold mb-2">Tarifs annuels</h4>
                        <div className="flex gap-1">
                          <span className="font-bold">Montreuil</span>
                          <span>|</span>
                          <span className="font-bold">Hors Montreuil</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center border-b pb-2">
                        <span>Eveil musical (4-6 ans)</span>
                        <div className="flex gap-1">
                          <span className="font-bold">80€</span>
                          <span>|</span>
                          <span className="font-bold">100€</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center border-b pb-2">
                        <span>Formation musicale</span>
                        <div className="flex gap-1">
                          <span className="font-bold">125€</span>
                          <span>|</span>
                          <span className="font-bold">160€</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center border-b pb-2">
                        <span>Formation instrumentale</span>
                        <div className="flex gap-1">
                          <span className="font-bold">180€</span>
                          <span>|</span>
                          <span className="font-bold">220€</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center border-b pb-2">
                        <span>Musicien intégré à l’harmonie</span>
                        <div className="flex gap-1">
                          <span className="font-bold">90€</span>
                          <span>|</span>
                          <span className="font-bold">   111€</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center border-b pb-2">
                        <span>Adhésion à l’association</span>
                        <div className="flex gap-1">
                          <span className="font-bold">5€</span>
                          <span>|</span>
                          <span className="font-bold">5€</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center border-b pb-2">
                        <span>Inscription aux examens</span>
                        <div className="flex gap-1">
                          <span className="font-bold">16€</span>
                          <span>|</span>
                          <span className="font-bold">16€</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center border-b pb-2">
                        <span>Caution Instrument</span>
                        <div className="flex gap-1">
                          <span className="font-bold">400€</span>
                          <span>|</span>
                          <span className="font-bold">400€</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Cours Particuliers</span>
                        <div className="flex gap-1">
                          <span className="font-bold">380€</span>
                          <span>|</span>
                          <span className="font-bold">445€</span>
                        </div>
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">
                      Réduction de 10% pour le 2ème membre d&#39;une même famille, 20% pour le 3ème.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Tarif horaire global : Formation Musicale + Instrument soit 60 heures de cours par an.
                      <ul>
                        <li>
                          - Montreuillois: 305€ : 60 heures = 5,1€/heure
                        </li>
                        <li>
                          - Non Montreuillois: 380€ : 60 heures = 6,3€/heure
                        </li>
                      </ul>
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-2">Lieu des cours</h4>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>
                        École de Musique de Montreuil-sur-Mer
                        <br />
                        Rue du Paon,
                        <br />
                        62170 Montreuil-sur-Mer, France
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-2">Calendrier</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span>Inscriptions : du 1er juin au 15 septembre 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span>Rentrée : semaine du 15 septembre 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span>Auditions : décembre 2025 et juin 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Comment s&#39;inscrire ?</h3>

                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    Pour vous inscrire à l&#39;École de Musique de Montreuil-sur-Mer, plusieurs options s&#39;offrent à vous :
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Sur place</h4>
                        <p className="text-muted-foreground">
                          Rendez-vous à l&#39;École de Musique pendant les permanences d&#39;inscription :
                          <br />- Mercredis de 14h à 18h
                          <br />- Samedis de 10h à 12h
                          <br />
                          (du 1er juin au 15 septembre 2025)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Par téléphone</h4>
                        <p className="text-muted-foreground">
                          Contactez-nous au 03 21 06 XX XX pour une pré-inscription par téléphone.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Par email</h4>
                        <p className="text-muted-foreground">
                          Envoyez-nous un email à{" "}
                          <a href="mailto:harmoniemontreuilsurmer@orange.fr" className="text-primary hover:underline">
                            harmoniemontreuilsurmer@orange.fr
                          </a>{" "}
                          avec vos coordonnées et nous vous contacterons.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button asChild size="lg" className="w-full">
                      <Link href="/contact" className="flex items-center justify-center gap-2">
                        Nous contacter pour plus d&#39;informations
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary via-accent to-secondary text-white">
        <div className="container px-4 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Commencez votre parcours musical</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-white/90">
              Que vous soyez débutant ou musicien confirmé, notre école de musique vous accueille dans un cadre
              bienveillant et stimulant.
            </p>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 hover:bg-white/20">
              <Link href="/contact">Contactez-nous</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

