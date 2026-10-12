import { pageMetadata } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata = pageMetadata("Rejoindre l’orchestre", "Vous jouez d’un instrument ? Rejoignez l’Harmonie de Montreuil-sur-Mer et ses répétitions du vendredi de 20 h 30 à 22 h.", "/rejoindre")

export default function Layout({ children }: { children: ReactNode }) { return children }
