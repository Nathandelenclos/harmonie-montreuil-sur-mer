import type { SubmissionInput } from '../domain/submission'

export interface SubmissionRepository {
  receive(input: SubmissionInput): Promise<boolean>
  recordNotification(id: string, state: 'sent' | 'failed'): Promise<void>
}
export interface SubmissionNotifier { send(input: SubmissionInput): Promise<void> }
