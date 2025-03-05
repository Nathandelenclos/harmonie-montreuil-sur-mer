import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Music, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold">
              <Music className="h-6 w-6 text-primary" />
              <span>
                <span className="text-primary">Harmonie</span> <span className="text-secondary">Montreuil</span>
              </span>
            </Link>
            <p className="text-muted-foreground">
              Fondée en 1865, l&#39;Harmonie de Montreuil-sur-Mer est une formation musicale qui anime la vie culturelle de
              notre belle cité depuis plus de 150 ans.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="mailto:harmonie.montreuil@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/evenements" className="text-muted-foreground hover:text-primary transition-colors">
                  Événements
                </Link>
              </li>
              <li>
                <Link href="/histoire" className="text-muted-foreground hover:text-primary transition-colors">
                  Histoire
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="text-muted-foreground hover:text-primary transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Salle des fêtes, Place du Général de Gaulle
                  <br />
                  62170 Montreuil-sur-Mer
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">+33 3 21 06 XX XX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="mailto:harmonie.montreuil@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  harmonie.montreuil@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold">Répétitions</h3>
            <p className="text-muted-foreground">
              Tous les vendredis de 20h à 22h
              <br />
              Salle des fêtes de Montreuil-sur-Mer
            </p>
            <Link href="/rejoindre" className="inline-block text-primary hover:underline font-medium">
              Rejoignez-nous →
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Harmonie de Montreuil-sur-Mer. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link
              href="/mentions-legales"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

