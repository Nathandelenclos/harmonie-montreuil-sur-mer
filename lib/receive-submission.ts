import { createClient } from '@supabase/supabase-js'
import { supabaseConfig } from './supabase/config'
import { ReceiveSubmissionUseCase } from '@/src/submissions/application/use-cases/receive-submission'
import { SupabaseSubmissionRepository } from '@/src/submissions/infrastructure/supabase-submission-repository'
import { SmtpSubmissionNotifier } from '@/src/submissions/infrastructure/smtp-submission-notifier'
import type { SubmissionInput } from '@/src/submissions/domain/submission'

// Server route composition only; never import into a Client Component.
export async function receiveSubmission(input: SubmissionInput) {
  const config = supabaseConfig()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!config || !key) throw new Error('Submission storage unavailable')
  const client = createClient(config.url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (url, init) => fetch(url, { ...init, cache: 'no-store', signal: AbortSignal.timeout(8000) }) } })
  await new ReceiveSubmissionUseCase(new SupabaseSubmissionRepository(client), new SmtpSubmissionNotifier()).execute(input)
}
