"use client"

import { Button } from "@/components/ui/button"

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section role="alert" className="container max-w-3xl px-4 py-16">
    <h1 className="text-3xl font-bold mb-4">Cette page n’a pas pu s’afficher</h1>
    <p className="mb-6">Réessayez ou contactez l’harmonie au +33 6 68 85 30 79.</p>
    <Button onClick={reset}>Réessayer</Button>
  </section>
}
