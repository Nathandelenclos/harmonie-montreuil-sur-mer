import { pageMetadata } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata = pageMetadata("Contacter l’harmonie", "Contactez l’Harmonie de Montreuil-sur-Mer : téléphone, e-mail et formulaire. Répétitions le vendredi de 20 h 30 à 22 h, rue du Paon.", "/contact")

export default function Layout({ children }: { children: ReactNode }) { return children }
