"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div role="alert">
    <PageHeader homeLink={<Link href="/">Accueil</Link>} title="Cette page n’a pas pu s’afficher" />
    <div className="reading-content"><p>Réessayez ou contactez l’harmonie au +33 6 68 85 30 79.</p><Button onClick={reset}>Réessayer</Button></div>
  </div>
}
