"use client"

import { useState } from "react"
import type React from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFieldValidation } from "@/lib/use-field-validation"
import { sendEmail } from "@/lib/sendMail"

export default function ContactForm() {
  const { fieldErrors, validateField, clearFieldError } = useFieldValidation()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
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
      await sendEmail(formState.subject + ` - ${formState.name}`, formState.message, formState.email)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setError(error instanceof Error ? error.message : "L’envoi a échoué. Réessayez ou contactez-nous directement.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="form-panel">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>

                {isSubmitted ? (
                    <div role="status" className="text-center py-12">
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
                  <form onSubmit={handleSubmit} onBlur={validateField} onInvalid={validateField} className="space-y-6" aria-busy={isSubmitting}>
                    <p className="text-sm text-muted-foreground">Les champs marqués * sont obligatoires.</p>
                    {error && <p role="alert" className="rounded-md border border-red-800 bg-red-50 p-4 text-red-900">{error}</p>}
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nom *
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

                    <div className="grid gap-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Sujet *
                      </label>
                      <select
                        id="subject"
                        aria-invalid={!!fieldErrors.subject}
                        aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
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
                      {fieldErrors.subject && <p id="subject-error" role="alert" className="text-sm text-red-900">{fieldErrors.subject}</p>}
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        aria-invalid={!!fieldErrors.message}
                        aria-describedby={fieldErrors.message ? "message-error" : undefined}
                        name="message"
                        maxLength={4000}
                        required
                        value={formState.message}
                        onChange={handleChange}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Votre message"
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
                      {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                    </Button>
                  </form>
                )}
              </div>
  )
}
