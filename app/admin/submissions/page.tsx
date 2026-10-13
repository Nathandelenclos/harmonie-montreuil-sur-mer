import Link from 'next/link'
import { requireEditor } from '@/lib/editorial-admin'
import { SupabaseSubmissionRepository } from '@/src/submissions/infrastructure/supabase-submission-repository'
import SubmissionCard from '@/components/admin/submission-card'
import { setSubmissionStatus } from './actions'

export default async function SubmissionsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { client } = await requireEditor()
  const params = await searchParams
  const page = /^\d{1,5}$/.test(params.page ?? '') ? Math.max(1, Number(params.page)) : 1
  const entries = await new SupabaseSubmissionRepository(client).list(page)
  return <>
    <Link className="admin-link" href="/admin">Retour aux contenus</Link>
    <h1 className="mt-6">Demandes reçues</h1>
    <p className="mb-8">Messages de contact et demandes pour rejoindre l’harmonie.</p>
    {!entries.length ? <p>Aucune demande sur cette page.</p> : <div className="space-y-6">{entries.slice(0, 50).map(entry => <SubmissionCard key={entry.id} submission={entry} onStatusChange={setSubmissionStatus} />)}</div>}
    <nav aria-label="Pages des demandes" className="flex gap-6 mt-8">
      {page > 1 && <a className="admin-link" href={`/admin/submissions?page=${page - 1}`}>Page précédente</a>}
      {entries.length > 50 && <a className="admin-link" href={`/admin/submissions?page=${page + 1}`}>Page suivante</a>}
    </nav>
  </>
}
