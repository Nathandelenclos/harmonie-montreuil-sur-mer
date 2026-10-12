import { pageMetadata } from "@/lib/metadata"
import Image from "next/image"
import Link from "next/link"
import { MapPin, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import MediaFeature from "@/components/media-feature"
import YouTubeEmbed from "@/components/youtube-embed"

export const metadata = pageMetadata("École de musique : cours, tarifs et inscriptions", "Éveil dès 4 ans, formation musicale et chorale, instruments, tarifs et contacts de l’école de musique de Montreuil-sur-Mer.", "/ecole-de-musique")

export default function MusicSchoolPage() {
  const instrumentFamilies = [
    {
      name: "Bois",
      instruments: [
        { name: "Flûte", image: "/assets/instruments/studio/flute.webp" },
        { name: "Hautbois", image: "/assets/instruments/studio/hautbois.webp" },
        { name: "Clarinette", image: "/assets/instruments/studio/clarinette.webp" },
        { name: "Saxophone", image: "/assets/instruments/studio/saxophone.webp" },
      ],
    },
    {
      name: "Cuivres",
      instruments: [
        { name: "Trompette", image: "/assets/instruments/studio/trompette.webp" },
        { name: "Trombone", image: "/assets/instruments/studio/trombone.webp" },
        { name: "Cor", image: "/assets/instruments/studio/cor.webp" },
        { name: "Tuba", image: "/assets/instruments/studio/tuba.webp" },
      ],
    },
    { name: "Percussions", instruments: [{ name: "Percussions", image: "/assets/instruments/studio/percussions.webp" }] },
    { name: "Piano", instruments: [{ name: "Piano", image: "/assets/instruments/studio/piano.webp" }] },
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
    <div className="content-page">
      <PageHeader homeLink={<Link href="/">Accueil</Link>} eyebrow="École de musique de Montreuil-sur-Mer" title="La musique commence avec vous."
        description="Enfants, adultes, débutants ou confirmés : découvrir un instrument, trouver son rythme et prendre plaisir à jouer ensemble."
        media={<figure><Image src="/assets/formation-musicale.jpg" alt="Les élèves réunis pendant un cours de formation musicale" width={1200} height={613} priority sizes="(max-width: 911px) 100vw, 50vw" className="w-full h-auto rounded-lg" /><figcaption className="mt-3 border-l-4 border-secondary pl-3 text-sm">Apprendre, écouter et progresser ensemble.</figcaption></figure>}
        actions={<><Button asChild size="lg" variant="secondary"><a href="#cours">Trouver mon cours</a></Button><Button asChild size="lg" variant="outline" className="bg-white text-primary"><a href="#contacts">Parlons de votre projet</a></Button></>}
      />

      <div className="border-b bg-white">
        <nav aria-label="Dans la page école de musique" className="site-container flex flex-wrap gap-x-6 gap-y-1 py-3">
          {[['#cours', 'Cours'], ['#instruments', 'Instruments'], ['#tarifs', 'Tarifs'], ['#contacts', 'Contacts'], ['#equipe', 'Équipe pédagogique']].map(([href, label]) => <a key={href} href={href} className="home-text-link text-primary">{label}</a>)}
        </nav>
      </div>

      <section id="cours" className="site-container py-12 md:py-16" aria-labelledby="courses-title">
        <div className="section-heading">
          <p className="text-sm font-semibold text-primary">À chacun son point de départ</p>
          <h2 id="courses-title" className="section-title">Une envie, un premier pas.</h2>
          <p className="section-subtitle">De la découverte des sons au plaisir de l’orchestre, quatre façons de faire de la musique.</p>
        </div>
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
          {[
            { title: "Éveil musical", image: "/assets/eveil-musical.jpg", alt: "Les enfants de l’éveil musical sur scène", label: "Découvrir · 4 à 6 ans", duration: "1 h par semaine", description: "Chanter, écouter, explorer le rythme et découvrir les instruments : une approche ludique et sensorielle pour les premiers pas en musique." },
            { title: "Formation musicale", image: "/assets/formation-musicale.jpg", alt: "Un cours collectif de formation musicale", label: "Comprendre · Cours collectifs par niveau", duration: "1 h 30 par semaine, chorale incluse", description: "Lecture de notes, rythme, écoute et culture musicale : les bases pour progresser à l’instrument, avec une approche ludique et la pratique du chant choral." },
            { title: "Cours d’instruments", image: "/assets/cours-instruments.jpg", alt: "Les élèves de flûte en concert", label: "Pratiquer · Cours individuels", duration: "30 min par semaine", description: "Un suivi personnalisé, adapté à chaque élève, et un répertoire varié selon ses goûts. Instruments à vent, percussions ou piano : trouvez votre voix." },
            { title: "Pratique collective", image: "/assets/pratique-collective.jpg", alt: "Les élèves réunis pour jouer en orchestre", label: "Partager · Jouer ensemble", duration: "1 h par semaine, le lundi de 18 h à 19 h", description: "Développer l’écoute, le sens du rythme et le plaisir de jouer en groupe. Orchestre junior pour les débutants, harmonie pour les élèves plus avancés." },
          ].map(course => <article key={course.title} className="school-course">
            <Image src={course.image} alt={course.alt} width={600} height={450} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 40vw, 20vw" className="aspect-[4/3] w-full rounded-lg object-contain bg-muted" />
            <div>
              <p className="mb-2 text-sm font-semibold text-primary">{course.label}</p>
              <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
              <p className="text-muted-foreground">{course.description}</p>
              <p className="mt-4 border-l-4 border-secondary pl-3 text-sm font-semibold">{course.duration}</p>
            </div>
          </article>)}
        </div>
      </section>

      <MediaFeature id="school-stage-title" eyebrow="La classe orchestre en vidéo" title="Le plaisir de jouer ensemble."
        media={<figure><YouTubeEmbed id="j591F-YCkBs" title="We don’t talk about Bruno — classe orchestre de Montreuil à Samer" /><figcaption className="mt-3 text-sm">Classe orchestre de Montreuil à Samer · Vidéo publiée en mars 2024 par MARLENE47100.</figcaption></figure>}
        actions={<Button asChild variant="secondary"><Link href="/videos">Voir les autres captations</Link></Button>}
      >
        <p>Écouter les autres, trouver sa place dans l’ensemble et partager la scène : la pratique collective fait partie du parcours musical.</p>
        <p>La classe d’orchestre complète la formation après deux à trois années de pratique instrumentale.</p>
      </MediaFeature>

      <section id="instruments" className="bg-muted py-12 md:py-16" aria-labelledby="instruments-title">
        <div className="site-container">
          <div className="section-heading">
            <p className="text-sm font-semibold text-primary">Bois, cuivres, percussions et piano</p>
            <h2 id="instruments-title" className="section-title">Quel sera votre instrument ?</h2>
            <p className="section-subtitle">Découvrez les instruments enseignés à l’école. L’équipe est là pour échanger avec vous sur votre choix.</p>
          </div>
          <ul className="school-instruments">
            {instrumentFamilies.flatMap(family => family.instruments.map(instrument => <li key={instrument.name} className="overflow-hidden rounded-lg bg-white border">
              <Image src={instrument.image} alt={`Illustration de l’instrument : ${instrument.name}`} width={800} height={800} sizes="(max-width: 767px) 50vw, 25vw" className="w-full aspect-square object-contain" />
              <div className="p-2 sm:p-4 border-t">{family.name !== instrument.name && <p className="text-sm text-muted-foreground">{family.name}</p>}<h3 className="text-base sm:text-xl font-bold text-primary">{instrument.name}</h3></div>
            </li>))}
          </ul>
          <Button asChild className="mt-6"><a href="#contacts">Être accompagné dans mon choix</a></Button>
        </div>
      </section>

      <section className="site-container py-12 md:py-16" aria-labelledby="school-photos-title">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <figure>
            <Image src="/assets/archives/85c2087db2123161.webp" alt="Les élèves et les musiciens réunis sur scène lors d’une audition" width={1600} height={1063} sizes="(max-width: 1023px) 100vw, 50vw" className="w-full h-auto rounded-lg" />
            <figcaption className="mt-3 border-l-4 border-secondary pl-3 text-sm text-muted-foreground">Audition 2018 · Archives de l’école de musique</figcaption>
          </figure>
          <div>
            <h2 id="school-photos-title" className="section-title mb-6">Des notes, des visages,<br />des souvenirs.</h2>
            <p className="text-lg mb-6">Les auditions et les moments partagés se retrouvent aussi en images. Parcourez les archives de l’école.</p>
            <Button asChild variant="outline"><Link href="/galerie/ecole-de-musique">Photos de l’école de musique</Link></Button>
          </div>
        </div>
      </section>

      {/* Inscription */}
      <section
        id="inscription"
        className="py-12 md:py-16 bg-muted"
      >
        <div className="site-container">
          <div className="section-heading">
            <h2 className="section-title mb-4">Préparons votre inscription</h2>
            <p className="section-subtitle">Les tarifs, les horaires et les bons interlocuteurs, au même endroit.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="min-w-0">
              <div className="surface p-5 sm:p-8">
                <h3 className="text-2xl font-bold mb-6">Informations pratiques</h3>

                <div className="space-y-6">
                  <div>
                    <table id="tarifs" className="w-full table-fixed text-sm text-left [overflow-wrap:anywhere]">
                      <caption className="text-lg font-bold text-left mb-4">Tarifs annuels</caption>
                      <thead>
                        <tr className="border-b">
                          <th scope="col" className="w-1/2 py-3 pr-2">Formation / frais</th>
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
              <div className="surface p-5 sm:p-8">
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

      {/* Nos professeurs */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-heading">
            <h2 id="equipe" className="section-title mb-4">Notre équipe pédagogique</h2>
            <p className="section-subtitle">
              Des professeurs qualifiés et passionnés pour vous accompagner dans votre apprentissage musical
            </p>
          </div>

          <ul className="grid gap-x-12 md:grid-cols-2">
            {teachers.map((teacher) => (
              <li key={teacher.name}>
                <div className="border-t border-primary/20 py-6">
                  <div>
                    <div>
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
      <section className="callout">
        <div className="site-container">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Commencez votre parcours musical</h2>
            <p className="text-lg max-w-2xl mb-8 text-white">
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

