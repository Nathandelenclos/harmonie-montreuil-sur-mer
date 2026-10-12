import Link from "next/link"

export default function NotFound() {
  return <section className="container max-w-3xl px-4 py-16"><h1 className="text-3xl font-bold mb-4">Page introuvable</h1><p className="mb-6">Cette page n’est pas disponible. Retrouvez les concerts et les cours de musique depuis l’accueil.</p><Link href="/" className="text-primary underline">Retour à l’accueil</Link></section>
}
