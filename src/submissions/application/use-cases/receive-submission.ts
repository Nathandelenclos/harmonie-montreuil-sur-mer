import type { SubmissionInput } from '../../domain/submission'
import type { SubmissionRepository, SubmissionNotifier } from '../ports'

export class ReceiveSubmissionUseCase {
  constructor(private readonly repository: SubmissionRepository, private readonly notifier: SubmissionNotifier) {}

  async execute(input: SubmissionInput): Promise<void> {
    if (!await this.repository.receive(input)) return
    // The inbox is authoritative. SMTP is a best-effort notification, never retried automatically.
    let state: 'sent' | 'failed' = 'sent'
    try { await this.notifier.send(input) } catch { state = 'failed' }
    // A notification bookkeeping outage must not turn an accepted message into a failure.
    try { await this.repository.recordNotification(input.id, state) } catch { /* Remains visibly pending in the inbox. */ }
  }
}
