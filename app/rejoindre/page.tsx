import JoinForm from "@/components/join-form"
import { Music, Users, BookOpen, CheckCircle2, GraduationCap, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import Link from "next/link"
import Image from "next/image"

export default function JoinPage() {
  return (
    <div className="content-page">
      <PageHeader homeLink={<Link href="/">Accueil</Link>} title="Rejoignez-nous" image="/assets/harmonie-dordogne.jpg" description="Devenez membre de l&#39;Harmonie de Montreuil-sur-Mer" />

      <section className="py-16 md:py-24">
        <div className="site-container">
          <div className="section-heading">
            <h2 className="section-title mb-4">Pourquoi nous rejoindre ?</h2>
            <p className="section-subtitle">
              L&#39;Harmonie de Montreuil-sur-Mer vous offre l&#39;opportunité de partager votre passion pour la musique dans
              une ambiance conviviale
            </p>
          </div>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-default)),1fr))] gap-8 mb-20">
            <li className="card-hover">
              <div className="surface p-8 h-full">
                <div className="w-12 h-12 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Music className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Pratiquer la musique</h3>
                <p className="text-muted-foreground">
                  Jouez régulièrement au sein d&#39;un ensemble et développez votre pratique musicale avec un répertoire
                  varié et accessible.
                </p>
              </div>
            </li>

            <li className="card-hover">
              <div className="surface p-8 h-full">
                <div className="w-12 h-12 mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Intégrer une famille</h3>
                <p className="text-muted-foreground">
                  Rejoignez un groupe chaleureux où règnent bonne humeur, entraide et convivialité. Partagez des moments
                  inoubliables.
                </p>
              </div>
            </li>

            <li className="card-hover">
              <div className="surface p-8 h-full">
                <div className="w-12 h-12 mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Progresser ensemble</h3>
                <p className="text-muted-foreground">
                  Bénéficiez des conseils de musiciens expérimentés et progressez à votre rythme dans un environnement
                  bienveillant.
                </p>
              </div>
            </li>
          </ul>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Qui peut nous rejoindre ?</h2>
                <p className="text-muted-foreground">
                  L&#39;Harmonie de Montreuil-sur-Mer accueille tous les musiciens, quel que soit leur niveau ou leur âge.
                  Que vous soyez débutant ou confirmé, jeune ou moins jeune, il y a une place pour vous parmi nous !
                </p>

                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Musiciens amateurs de tous niveaux</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Jeunes musiciens issus de l&#39;école de musique</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Musiciens confirmés souhaitant partager leur expérience</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Anciens musiciens souhaitant reprendre une pratique</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Button asChild className="group h-auto whitespace-normal py-3 text-center">
                    <Link href="/contact" className="flex items-center gap-2">
                      Contactez-nous pour plus d&#39;informations
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="photo-frame">
                <Image
                  src="/assets/harmonie-dordogne.jpg"
                  alt="Les musiciens de l’Harmonie au château en Dordogne"
                  width={1800}
                  height={1205}
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* École de Musique Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="site-container">
          <div className="section-heading">
            <h2 className="section-title mb-4">Notre École de Musique</h2>
            <p className="section-subtitle">
              Débutez ou perfectionnez votre pratique musicale avant de rejoindre l&#39;harmonie
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="photo-frame">
                <Image
                  src="/assets/cours-de-groupe.avif"
                  alt="École de Musique"
                  width={500}
                  height={600}
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>

            <div>
              <div className="space-y-6">
                <div className="inline-block bg-secondary/20 text-primary px-4 py-1 rounded-full mb-2 font-medium">
                  Inscriptions ouvertes
                </div>
                <h3 className="text-3xl font-bold mb-4">Formez-vous à la musique</h3>
                <p className="text-muted-foreground">
                  Notre école de musique est le tremplin idéal pour rejoindre l&#39;harmonie. Elle accueille les élèves de
                  tous âges, débutants ou confirmés, désireux d&#39;apprendre ou de perfectionner leur pratique
                  instrumentale.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Formation complète</h4>
                      <p className="text-muted-foreground">
                        Cours d&#39;instruments, formation musicale, pratique collective... Notre offre pédagogique vous
                        prépare à intégrer l&#39;harmonie.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      <Music className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Intégration progressive</h4>
                      <p className="text-muted-foreground">
                        Dès que votre niveau le permet, vous pourrez participer aux répétitions de l&#39;harmonie et
                        progressivement intégrer l&#39;ensemble.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="group h-auto whitespace-normal py-3 text-center">
                    <Link href="/ecole-de-musique" className="flex items-center gap-2">
                      Découvrir notre école de musique
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-16 md:py-24">
        <div className="site-container">
          <div className="section-heading">
            <h2 className="section-title mb-4">Contactez-nous</h2>
            <p className="section-subtitle">
              Vous souhaitez nous rejoindre ou obtenir plus d&#39;informations ? Remplissez le formulaire ci-dessous.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div>
              <JoinForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

