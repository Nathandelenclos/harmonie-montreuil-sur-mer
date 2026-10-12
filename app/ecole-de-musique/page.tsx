import Image from "next/image"
import Link from "next/link"
import { Music, GraduationCap, Clock, Calendar, MapPin, ChevronRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import AnimatedSection from "@/components/animated-section"
import type React from "react";

export default function MusicSchoolPage() {
  const instrumentFamilies = [
    {
      name: "Bois",
      instruments: [
        { name: "Flûte", image: "/assets/instruments/flute.png" },
        { name: "Hautbois", image: "/assets/instruments/hautbois.webp" },
        { name: "Clarinette", image: "/assets/instruments/clarinette.jpg" },
        { name: "Saxophone", image: "/assets/instruments/saxophone.jpg" },
      ],
    },
    {
      name: "Cuivres",
      instruments: [
        { name: "Trompette", image: "/assets/instruments/trompette.jpeg" },
        { name: "Trombone", image: "/assets/instruments/trombone.jpg" },
        { name: "Cor", image: "/assets/instruments/cor.avif" },
        { name: "Tuba", image: "/assets/instruments/tuba.jpg" },
      ],
    },
    { name: "Percussions", instruments: [{ name: "Percussions", image: "/assets/instruments/percussion.jpg" }] },
    { name: "Piano", instruments: [{ name: "Piano", image: "/assets/instruments/piano.jpeg" }] },
  ]

  const teachers = [
    {
      name: "Magalie DELMOTTE",
      role: "Directrice, professeure d’éveil et de formation musicale, professeure de chant choral, professeure de cuivres",
     },
    {
      name: "Fabien ROGER",
      role: "Professeur de formation musicale, professeur de percussions, professeur de cuivres",
    },
    {
      name: "Jean-François AUBEL",
      role: "Professeur de clarinette",
    },
    {
      name: "Gaëlle DELECROIX",
      role: "Professeure de flûte",
    },
    {
      name: "Hugo MOREAU",
      role: "Professeur de saxophone et de clarinette",
    },
    {
      name: "Audrey BERNARD",
      role: "Professeure d’éveil, professeure de hautbois",
    },
    {
      name: "Céline GRAY",
      role: "Professeure de piano",
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
                  src="/assets/cours-de-groupe.avif?height=600&width=500"
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
                <div className="relative h-64 bg-primary/5">
                  <Image src="/assets/formation-musicale.jpg" alt="Les élèves pendant un cours de formation musicale" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Formation musicale</h3>
                  <p className="text-muted-foreground mb-6">
                    La formation musicale est le socle de l&#39;apprentissage musical. Elle permet d&#39;acquérir les bases
                    théoriques et pratiques nécessaires à la pratique instrumentale : lecture de notes, rythme, écoute,
                    culture musicale... Elle inclut également la pratique du chant choral.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>1 h 30 par semaine, chorale incluse</span>
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
                <div className="relative h-64 bg-primary/5">
                  <Image src="/assets/cours-instruments.jpg" alt="Les élèves de flûte en concert" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-contain" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Cours d&#39;instruments</h3>
                  <p className="text-muted-foreground mb-6">
                    Les cours d&#39;instruments sont dispensés en cours individuels pour permettre un suivi personnalisé de
                    chaque élève. Notre école propose l&#39;apprentissage de nombreux instruments à vent et à percussion.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>30 min par semaine</span>
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
                <div className="relative h-64 bg-primary/5">
                  <Image src="/assets/pratique-collective.jpg" alt="Les élèves réunis pour la pratique collective" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
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
                      <span>1h par semaine le lundi de 18h à 19h</span>
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
                <div className="relative h-64 bg-primary/5">
                  <Image src="/assets/eveil-musical.jpg" alt="Les enfants de l’éveil musical sur scène" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-contain" />
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
                      <span>1h par semaine</span>
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

          <div className="space-y-10">
            {instrumentFamilies.map((family) => (
              <section key={family.name}>
                <h3 className="text-2xl font-bold mb-6">{family.name}</h3>
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-6">
                  {family.instruments.map((instrument, index) => (
                    <li key={instrument.name} className="max-w-80">
                      <AnimatedSection delay={0.1 * index} className="card-hover">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                          <div className="aspect-square relative">
                            <Image
                              src={instrument.image}
                              alt={`Cours de ${instrument.name}`}
                              fill
                              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="text-xl font-bold">{instrument.name}</h4>
                          </div>
                        </div>
                      </AnimatedSection>
                    </li>
                  ))}
                </ul>
              </section>
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

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-8">
            {teachers.map((teacher, index) => (
              <li key={teacher.name}>
                <AnimatedSection delay={0.1 * index} className="card-hover h-full">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                    <div className="p-6">
                      <h3 className="text-xl font-bold">{teacher.name}</h3>
                      <p className="text-primary mb-4">{teacher.role}</p>
                    </div>
                  </div>
                </AnimatedSection>
              </li>
            ))}
          </ul>
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
            <p className="section-subtitle">Rejoignez notre école de musique !</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <AnimatedSection delay={0.1} className="min-w-0">
              <div className="bg-white rounded-lg shadow-lg p-5 sm:p-8">
                <h3 className="text-2xl font-bold mb-6">Informations pratiques</h3>

                <div className="space-y-6">
                  <div>
                    <table className="w-full text-sm text-left">
                      <caption className="text-lg font-bold text-left mb-4">Tarifs annuels</caption>
                      <thead>
                        <tr className="border-b">
                          <th scope="col" className="py-3 pr-2">Formation / frais</th>
                          <th scope="col" className="py-3 px-1 text-right">Montreuil</th>
                          <th scope="col" className="py-3 pl-1 text-right">Hors Montreuil</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <th scope="row" className="py-3 pr-2 font-normal">Éveil musical dès 4 ans (30 heures)</th>
                          <td className="py-3 px-1 text-right whitespace-nowrap font-bold">85 €</td>
                          <td className="py-3 pl-1 text-right whitespace-nowrap font-bold">105 €</td>
                        </tr>
                        <tr className="border-b">
                          <th scope="row" className="py-3 pr-2 font-normal">Formation musicale et chant choral (45 heures)</th>
                          <td className="py-3 px-1 text-right whitespace-nowrap font-bold">130 €</td>
                          <td className="py-3 pl-1 text-right whitespace-nowrap font-bold">170 €</td>
                        </tr>
                        <tr className="border-b">
                          <th scope="row" className="py-3 pr-2 font-normal">Instrument d’harmonie (30 cours de 30 minutes)</th>
                          <td className="py-3 px-1 text-right whitespace-nowrap font-bold">190 €</td>
                          <td className="py-3 pl-1 text-right whitespace-nowrap font-bold">230 €</td>
                        </tr>
                        <tr className="border-b">
                          <th scope="row" className="py-3 pr-2 font-normal">Instrument — musicien intégré à l’harmonie</th>
                          <td className="py-3 px-1 text-right whitespace-nowrap font-bold">95 €</td>
                          <td className="py-3 pl-1 text-right whitespace-nowrap font-bold">115 €</td>
                        </tr>
                        <tr className="border-b">
                          <th scope="row" className="py-3 pr-2 font-normal">Formation musicale appliquée avec instrument pour adultes (30 cours collectifs d’une heure)</th>
                          <td className="py-3 px-1 text-right whitespace-nowrap font-bold">130 €</td>
                          <td className="py-3 pl-1 text-right whitespace-nowrap font-bold">170 €</td>
                        </tr>
                        <tr className="border-b">
                          <th scope="row" className="py-3 pr-2 font-normal">Formation musicale appliquée — musicien intégré à l’harmonie</th>
                          <td className="py-3 px-1 text-right whitespace-nowrap font-bold">65 €</td>
                          <td className="py-3 pl-1 text-right whitespace-nowrap font-bold">85 €</td>
                        </tr>
                        <tr className="border-b">
                          <th scope="row" className="py-3 pr-2 font-normal">Adhésion à l’association</th>
                          <td className="py-3 px-1 text-right whitespace-nowrap font-bold">5 €</td>
                          <td className="py-3 pl-1 text-right whitespace-nowrap font-bold">5 €</td>
                        </tr>
                        <tr className="border-b">
                          <th scope="row" className="py-3 pr-2 font-normal">Inscription aux examens</th>
                          <td className="py-3 px-1 text-right whitespace-nowrap font-bold">16 €</td>
                          <td className="py-3 pl-1 text-right whitespace-nowrap font-bold">16 €</td>
                        </tr>
                        <tr className="border-b">
                          <th scope="row" className="py-3 pr-2 font-normal">Caution instrument</th>
                          <td className="py-3 px-1 text-right whitespace-nowrap font-bold">400 €</td>
                          <td className="py-3 pl-1 text-right whitespace-nowrap font-bold">400 €</td>
                        </tr>
                        <tr className="border-b">
                          <th scope="row" className="py-3 pr-2 font-normal">Cours particuliers (30 cours de 30 minutes)</th>
                          <td className="py-3 px-1 text-right whitespace-nowrap font-bold">400 €</td>
                          <td className="py-3 pl-1 text-right whitespace-nowrap font-bold">470 €</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-sm text-muted-foreground mt-4">
                      Réduction de 10 % pour une famille à partir de deux membres.
                      Possibilité de régler en plusieurs fois et en chèques-vacances.
                    </p>
                    <div className="text-sm text-muted-foreground mt-4 space-y-2">
                      <p>Formation musicale + chant choral + instrument : 60 heures de cours par an.</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Montreuillois : 320 € par an, soit environ 5,33 €/heure.</li>
                        <li>Non-Montreuillois : 400 € par an, soit environ 6,67 €/heure.</li>
                      </ul>
                      <p>
                        30 heures de pratique collective en classe d’orchestre s’ajoutent après deux à trois années
                        de formation instrumentale.
                      </p>
                    </div>
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
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="min-w-0">
              <div className="bg-white rounded-lg shadow-lg p-5 sm:p-8">
                <h3 className="text-2xl font-bold mb-6">Contacts</h3>

                <div className="space-y-6">
                  <ol className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                        1
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-bold">Sur place</h4>
                        <p className="text-muted-foreground">
                          Rendez-vous à l’école de musique pendant les horaires des cours : les mercredis de 14 h à 18 h.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                        2
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-bold">Par téléphone</h4>
                        <p className="text-muted-foreground">
                          Contactez-nous au <a href="tel:+33321860569" className="text-primary hover:underline">+33 3 21 86 05 69</a> ou au <a href="tel:+33612130889" className="text-primary hover:underline">+33 6 12 13 08 89</a>.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                        3
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-bold">Par email</h4>
                        <p className="text-muted-foreground">
                          Envoyez-nous un email à{" "}
                          <a href="mailto:harmoniemontreuilsurmer@orange.fr" className="text-primary hover:underline [overflow-wrap:anywhere]">
                            harmoniemontreuilsurmer@orange.fr
                          </a>.
                        </p>
                      </div>
                    </li>
                  </ol>

                  <div className="pt-4">
                    <Button asChild size="lg" className="w-full h-auto whitespace-normal py-3 text-center">
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

