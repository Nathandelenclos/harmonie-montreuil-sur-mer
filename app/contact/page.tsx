import GoogleMap from "@/components/google-map"
import ContactForm from "@/components/contact-form"
import { MapPin, Mail, Phone, Calendar } from "lucide-react"

import PageHeader from "@/components/page-header"

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="Contactez-nous" description="Nous sommes à votre écoute pour toute question ou demande" />

      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="min-w-0">
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
                      <a href="https://www.google.com/maps/search/?api=1&query=Harmonie+Municipale+Rue+du+Paon+Montreuil-sur-Mer" className="text-primary underline">
                        Rue du Paon,
                        <br />
                        62170 Montreuil-sur-Mer, France
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold mb-1">Email</h3>
                      <a href="mailto:harmoniemontreuilsurmer@orange.fr" className="text-primary hover:underline [overflow-wrap:anywhere]">
                        harmoniemontreuilsurmer@orange.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Téléphone</h3>
                      <a href="tel:+33321860569" className="text-muted-foreground">+33 3 21 86 05 69</a>
                      <br />
                      <a href="tel:+33668853079" className="text-muted-foreground">+33 6 68 85 30 79</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Répétitions</h3>
                      <p className="text-muted-foreground">
                        Tous les vendredis de 20 h 30 à 22 h
                        <br />
                        Rue du Paon,
                        <br />
                        62170 Montreuil-sur-Mer, France
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-lg font-bold mb-4">Localisation</h3>
                  <GoogleMap />
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

