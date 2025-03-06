"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Mail, Phone, Calendar, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import AnimatedSection from "@/components/animated-section"
import {sendEmail} from "@/lib/sendMail";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
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
          'nathan.delenclos@gmail.com',
          formState.subject + ` - ${formState.name} <${formState.email}>`,
          formState.message,
          token
      )
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col">
      <PageHeader title="Contactez-nous" description="Nous sommes à votre écoute pour toute question ou demande" />

      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Restons en contact</h2>
                  <p className="text-muted-foreground">
                    Vous souhaitez nous rejoindre, nous inviter à un événement ou simplement en savoir plus sur nos
                    activités ? N&#39;hésitez pas à nous contacter par le biais du formulaire ci-contre ou via les
                    coordonnées ci-dessous.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Adresse</h3>
                      <p className="text-muted-foreground">
                        Salle des fêtes, Place du Général de Gaulle
                        <br />
                        62170 Montreuil-sur-Mer
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Email</h3>
                      <a href="mailto:harmonie.montreuil@gmail.com" className="text-primary hover:underline">
                        harmonie.montreuil@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Téléphone</h3>
                      <p className="text-muted-foreground">+33 3 21 06 XX XX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Répétitions</h3>
                      <p className="text-muted-foreground">
                        Tous les vendredis de 20h à 22h
                        <br />
                        Salle des fêtes de Montreuil-sur-Mer
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-lg font-bold mb-4">Localisation</h3>
                  <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.1786147696734!2d1.7580892!3d50.4654029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd2c1c31a0b0c3%3A0x40af13e81646360!2sPlace%20du%20G%C3%A9n%C3%A9ral%20de%20Gaulle%2C%2062170%20Montreuil!5e0!3m2!1sfr!2sfr!4v1646579595693!5m2!1sfr!2sfr"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
                    <p className="text-muted-foreground mb-6">
                      Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>Envoyer un autre message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nom
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

                    <div className="grid gap-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Sujet
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formState.subject}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="rejoindre">Rejoindre l&#39;harmonie</option>
                        <option value="invitation">Invitation à un événement</option>
                        <option value="information">Demande d&#39;information</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formState.message}
                        onChange={handleChange}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Votre message"
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
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

