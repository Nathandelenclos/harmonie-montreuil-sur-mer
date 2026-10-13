"use server"

import { revalidatePath } from 'next/cache'
import { requireEditor } from '@/lib/editorial-admin'
import { isSubmissionId } from '@/src/submissions/domain/submission'
import { SupabaseSubmissionRepository } from '@/src/submissions/infrastructure/supabase-submission-repository'

export async function setSubmissionStatus(id: string, status: 'new' | 'processed'): Promise<{ ok: boolean }> {
  const { client } = await requireEditor()
  if (!isSubmissionId(id) || !['new', 'processed'].includes(status)) return { ok: false }
  try {
    await new SupabaseSubmissionRepository(client).setStatus(id, status)
    revalidatePath('/admin/submissions')
    return { ok: true }
  } catch { return { ok: false } }
}
