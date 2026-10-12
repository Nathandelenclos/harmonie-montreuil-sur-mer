import { pageMetadata } from "@/lib/metadata"
import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, ChevronRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export const metadata = pageMetadata("École de musique : cours, tarifs et inscriptions", "Éveil dès 4 ans, formation musicale et chorale, instruments, tarifs et contacts de l’école de musique de Montreuil-sur-Mer.", "/ecole-de-musique")

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

      <section className="container px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Cours de musique à Montreuil-sur-Mer</h2>
        <p className="max-w-3xl mb-6">Éveil musical dès 4 ans, chant choral, instruments et orchestre : un parcours pour les enfants et les adultes, débutants ou confirmés.</p>
        <dl className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="rounded-lg border bg-white p-6"><dt className="font-bold mb-2">Formule formation + instrument</dt><dd>320 € / an à Montreuil<br />400 € / an hors Montreuil<br /><span className="text-sm text-muted-foreground">Hors frais d’adhésion et d’examen</span></dd></div>
          <div className="rounded-lg border bg-white p-6"><dt className="font-bold mb-2">Rencontrer l’équipe</dt><dd>Mercredi, 14 h – 18 h<br />École de musique, rue du Paon</dd></div>
          <div className="rounded-lg border bg-white p-6"><dt className="font-bold mb-2">Parlons de votre projet</dt><dd><a className="text-primary underline" href="tel:+33612130889">06 12 13 08 89</a><br /><a className="text-primary underline" href="#contacts">Tous les contacts</a></dd></div>
        </dl>
        <nav aria-label="Dans la page école de musique" className="flex flex-wrap gap-3">
          {[['#cours', 'Cours'], ['#instruments', 'Instruments'], ['#tarifs', 'Tarifs'], ['#contacts', 'Contacts'], ['#equipe', 'Équipe pédagogique']].map(([href, label]) => <a key={href} href={href} className="rounded-md border bg-white px-4 py-3 text-primary font-semibold hover:bg-muted">{label}</a>)}
        </nav>
      </section>

      {/* Inscription */}
      <section
        id="inscription"
        className="py-12 md:py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"
      >
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Tarifs et contacts</h2>
            <p className="section-subtitle">Rejoignez notre école de musique !</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="min-w-0">
              <div className="bg-white rounded-lg shadow-lg p-5 sm:p-8">
                <h3 className="text-2xl font-bold mb-6">Informations pratiques</h3>

                <div className="space-y-6">
                  <div>
                    <table id="tarifs" className="w-full text-sm text-left">
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
            </div>

            <div className="min-w-0">
              <div className="bg-white rounded-lg shadow-lg p-5 sm:p-8">
                <h3 id="contacts" className="text-2xl font-bold mb-6">Contacts</h3>

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
            </div>
          </div>
        </div>
      </section>

      {/* Nos cours */}
      <section id="cours" className="py-12 md:py-16">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Nos cours</h2>
            <p className="section-subtitle">
              Découvrez notre offre pédagogique complète pour tous les âges et tous les niveaux
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-12 mb-16">
            <li>
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
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>1 h 30 par semaine, chorale incluse</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Cours collectifs par niveau</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Approche ludique et interactive</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li>
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
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>30 min par semaine</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Cours individuels adaptés à chaque élève</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Répertoire varié et adapté aux goûts de l&#39;élève</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>

          <ul className="grid md:grid-cols-2 gap-12">
            <li>
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
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>1h par semaine le lundi de 18h à 19h</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Orchestre junior pour les débutants</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Harmonie pour les élèves plus avancés</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li>
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
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>1h par semaine</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Approche ludique et sensorielle</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Découverte des instruments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Nos instruments */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 id="instruments" className="section-title mb-4">Nos instruments</h2>
            <p className="section-subtitle">
              Découvrez les instruments que vous pouvez apprendre à notre école de musique
            </p>
          </div>

          <div className="space-y-10">
            {instrumentFamilies.map((family) => (
              <section key={family.name}>
                <h3 className="text-2xl font-bold mb-6">{family.name}</h3>
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-6">
                  {family.instruments.map((instrument) => (
                    <li key={instrument.name} className="max-w-80">
                      <div className="card-hover">
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
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Nos professeurs */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 id="equipe" className="section-title mb-4">Notre équipe pédagogique</h2>
            <p className="section-subtitle">
              Des professeurs qualifiés et passionnés pour vous accompagner dans votre apprentissage musical
            </p>
          </div>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-8">
            {teachers.map((teacher) => (
              <li key={teacher.name}>
                <div className="card-hover h-full">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                    <div className="p-6">
                      <h3 className="text-xl font-bold">{teacher.name}</h3>
                      <p className="text-primary mb-4">{teacher.role}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 brand-gradient text-white">
        <div className="container px-4 text-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Commencez votre parcours musical</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-white">
              Que vous soyez débutant ou musicien confirmé, notre école de musique vous accueille dans un cadre
              bienveillant et stimulant.
            </p>
            <Button asChild size="lg" variant="outline" className="bg-white text-primary">
              <Link href="/contact">Contactez-nous</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

