"use client"

import { useState } from "react"
import type React from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFieldValidation } from "@/lib/use-field-validation"
import { sendEmail } from "@/lib/sendMail"

export default function JoinForm() {
  const { fieldErrors, validateField, clearFieldError } = useFieldValidation()
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
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    clearFieldError(e.target)
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setError("")
    try {
      await sendEmail(`Nous rejoindre - ${formState.name}`, `Nom : ${formState.name}\nTéléphone : ${formState.phone}\nInstrument : ${formState.instrument}\nExpérience : ${formState.experience}\n\n${formState.message}`, formState.email)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", phone: "", instrument: "", experience: "", message: "" })
    } catch (error) {
      setError(error instanceof Error ? error.message : "L’envoi a échoué. Réessayez ou contactez-nous directement.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
                {isSubmitted ? (
                  <div role="status" className="text-center py-12">
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
                  <form onSubmit={handleSubmit} onBlur={validateField} onInvalid={validateField} className="space-y-6" aria-busy={isSubmitting}>
                    <p className="text-sm text-muted-foreground">Les champs marqués * sont obligatoires.</p>
                    {error && <p role="alert" className="rounded-md border border-red-800 bg-red-50 p-4 text-red-900">{error}</p>}
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">
                        Nom complet *
                      </label>
                        <input
                          id="name"
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? "name-error" : undefined}
                          name="name"
                        autoComplete="name" maxLength={100}
                          type="text"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Votre nom"
                        />
                      {fieldErrors.name && <p id="name-error" role="alert" className="text-sm text-red-900">{fieldErrors.name}</p>}
                      </div>

                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </label>
                        <input
                          id="email"
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                          name="email"
                        autoComplete="email" maxLength={254}
                          type="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Votre email"
                        />
                      {fieldErrors.email && <p id="email-error" role="alert" className="text-sm text-red-900">{fieldErrors.email}</p>}
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="grid gap-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                        Téléphone (facultatif)
                      </label>
                        <input
                          id="phone"
                        aria-invalid={!!fieldErrors.phone}
                        aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                          name="phone"
                        autoComplete="tel" maxLength={30}
                          type="tel"
                          value={formState.phone}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Votre numéro de téléphone"
                        />
                      {fieldErrors.phone && <p id="phone-error" role="alert" className="text-sm text-red-900">{fieldErrors.phone}</p>}
                      </div>

                      <div className="grid gap-2">
                        <label htmlFor="instrument" className="text-sm font-medium">
                        Instrument *
                      </label>
                        <input
                          id="instrument"
                        aria-invalid={!!fieldErrors.instrument}
                        aria-describedby={fieldErrors.instrument ? "instrument-error" : undefined}
                          name="instrument"
                        maxLength={100}
                          type="text"
                          required
                          value={formState.instrument}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Votre instrument"
                        />
                      {fieldErrors.instrument && <p id="instrument-error" role="alert" className="text-sm text-red-900">{fieldErrors.instrument}</p>}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="experience" className="text-sm font-medium">
                        Niveau / Expérience *
                      </label>
                      <select
                        id="experience"
                        aria-invalid={!!fieldErrors.experience}
                        aria-describedby={fieldErrors.experience ? "experience-error" : undefined}
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
                      {fieldErrors.experience && <p id="experience-error" role="alert" className="text-sm text-red-900">{fieldErrors.experience}</p>}
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message (facultatif)
                      </label>
                      <textarea
                        id="message"
                        aria-invalid={!!fieldErrors.message}
                        aria-describedby={fieldErrors.message ? "message-error" : undefined}
                        name="message"
                        maxLength={4000}
                        value={formState.message}
                        onChange={handleChange}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Parlez-nous de vous, de votre parcours musical et de vos motivations pour rejoindre l&#39;harmonie"
                      />
                      {fieldErrors.message && <p id="message-error" role="alert" className="text-sm text-red-900">{fieldErrors.message}</p>}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Vos coordonnées servent uniquement à répondre à votre demande. L’envoi déclenche la vérification anti-spam Google reCAPTCHA.
                      {" "}<a href="/politique-confidentialite" className="text-primary underline">Confidentialité</a>.
                      {" "}<a href="https://policies.google.com/privacy" className="text-primary underline">Confidentialité Google</a>
                      {" · "}<a href="https://policies.google.com/terms" className="text-primary underline">Conditions Google</a>.
                    </p>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                    </Button>
                  </form>
                )}
              </div>
  )
}
