"use client"

export default function GlobalError({ reset }: { reset: () => void }) {
  return <html lang="fr"><body><main><h1>Le site n’a pas pu s’afficher</h1><p>Réessayez ou contactez l’harmonie au +33 6 68 85 30 79.</p><button onClick={reset}>Réessayer</button></main></body></html>
}
