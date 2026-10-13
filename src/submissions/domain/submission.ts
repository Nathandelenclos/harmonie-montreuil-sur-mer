export type SubmissionInput = { id: string; source: 'contact' | 'join'; name: string; email: string; subject: string; text: string }
export type Submission = SubmissionInput & { created_at: string; status: 'new' | 'processed'; notification: 'pending' | 'sent' | 'failed' }
export const isSubmissionId = (value: unknown): value is string => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
