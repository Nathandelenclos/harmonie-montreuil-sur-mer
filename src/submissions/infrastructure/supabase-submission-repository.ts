import type { SupabaseClient } from '@supabase/supabase-js'
import type { SubmissionRepository } from '../application/ports'
import type { Submission, SubmissionInput } from '../domain/submission'

export class SupabaseSubmissionRepository implements SubmissionRepository {
  constructor(private readonly client: SupabaseClient) {}
  async receive(input: SubmissionInput): Promise<boolean> {
    const { data, error } = await this.client.rpc('receive_submission', { submission: input })
    if (error) throw new Error('Unable to save submission')
    return data === true
  }
  async recordNotification(id: string, notification: 'sent' | 'failed'): Promise<void> {
    const { error } = await this.client.from('form_submissions').update({ notification }).eq('id', id)
    if (error) throw new Error('Unable to record notification')
  }
  async list(page: number): Promise<Submission[]> {
    const { data, error } = await this.client.from('form_submissions').select('*').order('created_at', { ascending: false }).order('id').range((page - 1) * 50, page * 50)
    if (error) throw new Error('Unable to load submissions')
    return data as Submission[]
  }
  async setStatus(id: string, status: 'new' | 'processed'): Promise<void> {
    const { data, error } = await this.client.from('form_submissions').update({ status }).eq('id', id).select('id').single()
    if (error || !data) throw new Error('Unable to update submission')
  }
}
