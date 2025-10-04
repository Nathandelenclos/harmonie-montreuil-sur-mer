"use client"

import type React from "react"

import { useState } from "react"
import { Music, Users, BookOpen, CheckCircle2, GraduationCap, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import AnimatedSection from "@/components/animated-section"
import Link from "next/link"
import Image from "next/image"
import {sendEmail} from "@/lib/sendMail";

export default function JoinPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    instrument: "",
    experience: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
      const token = await window.grecaptcha.execute(siteKey, {
        action: 'submit_form',
      });
      await sendEmail(
          'harmoniemontreuilsurmer@orange.fr',
          `Nous rejoindre - ${formState.name} <${formState.email}>`,
          `
          Nom: ${formState.name}
          Email: ${formState.email}
          Téléphone: ${formState.phone}
          Instrument: ${formState.instrument}
          Niveau / Expérience: ${formState.experience}
          
          Message: 
          ${formState.message}
          `,
          token
      )
    } catch (err) {
      console.error(err);
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        instrument: "",
        experience: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col">
      <PageHeader title="Rejoignez-nous" description="Devenez membre de l&#39;Harmonie de Montreuil-sur-Mer" />

      <section className="py-16 md:py-24">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Pourquoi nous rejoindre ?</h2>
            <p className="section-subtitle">
              L&#39;Harmonie de Montreuil-sur-Mer vous offre l&#39;opportunité de partager votre passion pour la musique dans
              une ambiance conviviale
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <AnimatedSection delay={0.1} className="card-hover">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Music className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Pratiquer la musique</h3>
                <p className="text-muted-foreground">
                  Jouez régulièrement au sein d&#39;un ensemble et développez votre pratique musicale avec un répertoire
                  varié et accessible.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="card-hover">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Intégrer une famille</h3>
                <p className="text-muted-foreground">
                  Rejoignez un groupe chaleureux où règnent bonne humeur, entraide et convivialité. Partagez des moments
                  inoubliables.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="card-hover">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Progresser ensemble</h3>
                <p className="text-muted-foreground">
                  Bénéficiez des conseils de musiciens expérimentés et progressez à votre rythme dans un environnement
                  bienveillant.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Qui peut nous rejoindre ?</h2>
                <p className="text-muted-foreground">
                  L&#39;Harmonie de Montreuil-sur-Mer accueille tous les musiciens, quel que soit leur niveau ou leur âge.
                  Que vous soyez débutant ou confirmé, jeune ou moins jeune, il y a une place pour vous parmi nous !
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Musiciens amateurs de tous niveaux</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Jeunes musiciens issus de l&#39;école de musique</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Musiciens confirmés souhaitant partager leur expérience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Anciens musiciens souhaitant reprendre une pratique</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild className="group">
                    <Link href="/contact" className="flex items-center gap-2">
                      Contactez-nous pour plus d&#39;informations
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
                  src="/assets/harmonie-officiel.jpg?height=600&width=500&text=Rejoignez-nous"
                  alt="Musiciens de l&#39;Harmonie"
                  width={500}
                  height={600}
                  className="rounded-lg shadow-xl w-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* École de Musique Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Notre École de Musique</h2>
            <p className="section-subtitle">
              Débutez ou perfectionnez votre pratique musicale avant de rejoindre l&#39;harmonie
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.1}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full -z-10"></div>
                <Image
                  src="/assets/cours-de-groupe.avif?height=600&width=500&text=École+de+Musique"
                  alt="École de Musique"
                  width={500}
                  height={600}
                  className="rounded-lg shadow-xl w-full object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
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
                  <Button asChild size="lg" className="group">
                    <Link href="/ecole-de-musique" className="flex items-center gap-2">
                      Découvrir notre école de musique
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Contactez-nous</h2>
            <p className="section-subtitle">
              Vous souhaitez nous rejoindre ou obtenir plus d&#39;informations ? Remplissez le formulaire ci-dessous.
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-lg shadow-xl p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Demande envoyée !</h3>
                    <p className="text-muted-foreground mb-6">
                      Merci pour votre intérêt. Nous vous contacterons très prochainement pour discuter de votre
                      intégration dans notre harmonie.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>Envoyer une autre demande</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nom complet
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Votre nom"
                        />
                      </div>

                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Votre email"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="grid gap-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Téléphone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formState.phone}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Votre numéro de téléphone"
                        />
                      </div>

                      <div className="grid gap-2">
                        <label htmlFor="instrument" className="text-sm font-medium">
                          Instrument
                        </label>
                        <input
                          id="instrument"
                          name="instrument"
                          type="text"
                          required
                          value={formState.instrument}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Votre instrument"
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="experience" className="text-sm font-medium">
                        Niveau / Expérience
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        required
                        value={formState.experience}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Sélectionnez votre niveau</option>
                        <option value="debutant">Débutant (moins de 2 ans de pratique)</option>
                        <option value="intermediaire">Intermédiaire (2 à 5 ans de pratique)</option>
                        <option value="avance">Avancé (plus de 5 ans de pratique)</option>
                        <option value="confirme">Confirmé (plus de 10 ans de pratique)</option>
                      </select>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Parlez-nous de vous, de votre parcours musical et de vos motivations pour rejoindre l&#39;harmonie"
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}

