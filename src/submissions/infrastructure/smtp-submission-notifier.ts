import nodemailer from 'nodemailer'
import type { SubmissionNotifier } from '../application/ports'
import type { SubmissionInput } from '../domain/submission'

export class SmtpSubmissionNotifier implements SubmissionNotifier {
  async send(input: SubmissionInput): Promise<void> {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) throw new Error('SMTP unavailable')
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465,
      requireTLS: true, auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 10000,
    })
    await transporter.sendMail({ from: SMTP_USER, to: 'harmoniemontreuilsurmer@orange.fr', replyTo: input.email,
      subject: input.subject, text: input.text, disableFileAccess: true, disableUrlAccess: true })
  }
}
