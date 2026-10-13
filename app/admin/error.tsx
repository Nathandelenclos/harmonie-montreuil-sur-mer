'use client'
import { Button } from '@/components/ui/button'
export default function AdminError({ reset }: { reset: () => void }) {
  return <section role="alert"><h1>L’administration est indisponible</h1><p className="mb-6">Les contenus n’ont pas pu être chargés. Réessayez dans quelques instants.</p><Button onClick={reset}>Réessayer</Button></section>
}
