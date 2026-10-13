"use client"

import { useState } from 'react'
import type { Submission } from '@/src/submissions/domain/submission'

export default function SubmissionCard({ submission, onStatusChange }: { submission: Submission; onStatusChange: (id: string, status: 'new' | 'processed') => Promise<{ ok: boolean }> }) {
  const [status, setStatus] = useState(submission.status)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  async function toggleStatus() {
    if (pending) return
    setPending(true); setError('')
    const next = status === 'new' ? 'processed' : 'new'
    try {
      if (!(await onStatusChange(submission.id, next)).ok) throw new Error('Update failed')
      setStatus(next)
    } catch { setError('Le statut n’a pas été enregistré. Réessayez.') }
    finally { setPending(false) }
  }
  return <article className="border rounded-xl p-6 space-y-3">
    <p className="text-sm">{submission.source === 'join' ? 'Nous rejoindre' : 'Contact'} · <time dateTime={submission.created_at}>{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Paris' }).format(new Date(submission.created_at))}</time></p>
    <h2 className="text-xl">{submission.subject}</h2>
    <p>{submission.name} — <a className="admin-link" href={`mailto:${encodeURIComponent(submission.email)}`}>{submission.email}</a></p>
    <details><summary className="cursor-pointer admin-link">Lire le message</summary><p className="whitespace-pre-wrap break-words mt-4">{submission.text}</p></details>
    <p className="text-sm">Notification e-mail : {submission.notification === 'sent' ? 'envoyée' : submission.notification === 'failed' ? 'échec de l’envoi — demande conservée ici' : 'envoi non confirmé — demande conservée ici'}</p>
    <p role="status">{pending ? 'Enregistrement…' : status === 'new' ? 'Nouveau' : 'Traité'}</p>
    <button className="admin-link" type="button" onClick={toggleStatus} disabled={pending}>{pending ? 'Enregistrement…' : status === 'new' ? 'Marquer comme traité' : 'Marquer comme nouveau'}</button>
    {error && <p role="alert">{error}</p>}
  </article>
}
