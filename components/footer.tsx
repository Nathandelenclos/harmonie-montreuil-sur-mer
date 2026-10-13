import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import BrandLogo from "@/components/brand-logo"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold">
              <BrandLogo />
            </Link>
            <p className="text-white">
              Fondée en 1854, l&#39;Harmonie de Montreuil-sur-Mer est une formation musicale qui anime la vie culturelle de
              notre belle cité depuis plus de 170 ans.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100062936003912"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center text-white hover:text-secondary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/harmoniemontreuilsurmer/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center text-white hover:text-secondary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="mailto:harmoniemontreuilsurmer@orange.fr"
                className="inline-flex min-h-11 min-w-11 items-center justify-center text-white hover:text-secondary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:text-secondary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-white hover:text-secondary transition-colors">
                  L’harmonie
                </Link>
              </li>
              <li>
                <Link href="/evenements" className="text-white hover:text-secondary transition-colors">
                  Concerts
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="text-white hover:text-secondary transition-colors">Photos</Link>
              </li>
              <li>
                <Link href="/videos" className="text-white hover:text-secondary transition-colors">Vidéos</Link>
              </li>

              <li>
                <Link href="/ecole-de-musique" className="text-white hover:text-secondary transition-colors">
                  École de Musique
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold">Contact</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-white">
                  Rue du Paon,
                  <br />62170 Montreuil-sur-Mer, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white shrink-0" />
                <span className="text-white hover:text-secondary transition-colors"><a href="tel:+33321860569">+33 3 21 86 05 69</a></span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white shrink-0" />
                <a href="tel:+33668853079" className="text-white hover:text-secondary transition-colors">+33 6 68 85 30 79</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white shrink-0" />
                <a
                  href="mailto:harmoniemontreuilsurmer@orange.fr"
                  className="min-w-0 [overflow-wrap:anywhere] text-white hover:text-secondary transition-colors"
                >
                  harmoniemontreuilsurmer@orange.fr
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold">Répétitions</h2>
            <p className="text-white">
              Tous les vendredis de 20 h 30 à 22 h
              <br />
              Rue du Paon,
              <br />
              62170 Montreuil-sur-Mer, France
            </p>
            <Link href="/rejoindre" className="inline-block text-white hover:underline font-medium">
              Rejoignez-nous →
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} Harmonie de Montreuil-sur-Mer. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/mentions-legales"
              className="text-sm text-white hover:text-secondary transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="text-sm text-white hover:text-secondary transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

