import Link from "next/link"
import PageHeader from "@/components/page-header"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata("Mentions légales", "Éditeur, responsable de publication et hébergeur du site de l’Harmonie de Montreuil-sur-Mer.", "/mentions-legales")

export default function LegalPage() {
  return <>
    <PageHeader homeLink={<Link href="/">Accueil</Link>} title="Mentions légales" />
    <div className="reading-content">
      <section><h2 className="text-2xl font-bold mb-4">Éditeur du site</h2>
        <p>HARMONIE MUNICIPALE - ECOLE DE MUSIQUE DE MONTREUIL-SUR-MER</p>
        <p>Association — numéro RNA : W624000285.<br />Siège social : Mairie, 62170 Montreuil, France.</p>
        <p>Déclaration du 16 novembre 2009 à la sous-préfecture de Montreuil-sur-Mer. Parution n° 20100001, annonce n° 894.</p>
        <p className="mt-4"><a className="text-primary underline [overflow-wrap:anywhere]" href="mailto:harmoniemontreuilsurmer@orange.fr">harmoniemontreuilsurmer@orange.fr</a><br /><a className="text-primary underline" href="tel:+33668853079">+33 6 68 85 30 79</a></p>
      </section>
      <section><h2 className="text-2xl font-bold mb-4">Responsable de publication</h2><p>Milo DELATTRE ISRAËL, secrétaire de l’association.</p></section>
      <section><h2 className="text-2xl font-bold mb-4">Réalisation du site</h2><p><a className="text-primary underline" href="https://www.linkedin.com/in/nathan-delenclos/">Nathan Delenclos</a>.</p></section>
      <section><h2 className="text-2xl font-bold mb-4">Hébergement</h2><p>Vercel Inc.<br />440 N Barranca Avenue #4133<br />Covina, CA 91723, États-Unis.</p><p><a className="text-primary underline" href="https://vercel.com/legal/privacy-notice">Coordonnées et informations légales de Vercel</a> · <a className="text-primary underline" href="https://vercel.com/help">Contacter Vercel</a>.</p></section>
      <section><h2 className="text-2xl font-bold mb-4">Contenus et photographies</h2><p>Pour toute demande de réutilisation d’un texte, d’une photographie ou d’une affiche, contactez l’association. Pour signaler une erreur ou demander le retrait d’une photographie vous concernant, utilisez les coordonnées ci-dessus.</p></section>
    </div>
  </>
}
