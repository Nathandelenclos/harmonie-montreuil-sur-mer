import Link from "next/link"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return <><PageHeader homeLink={<Link href="/">Accueil</Link>} title="Page introuvable" /><section className="reading-content"><p>Cette page n’est pas disponible. Retrouvez les concerts et les cours de musique depuis l’accueil.</p><Button asChild><Link href="/">Retour à l’accueil</Link></Button></section></>
}
