import { validateContent, type Content, type ContentKind, type Entry, type FieldErrors } from '../../domain/content'
import type { ContentRepository } from '../content-repository'

export type ContentResult = { ok: true; entry?: Entry } | { ok: false; errors: FieldErrors }

export class SaveContentUseCase {
  constructor(private readonly repository: ContentRepository) {}
  async execute(input: { id?: string; version?: number; kind: ContentKind; content: unknown }): Promise<ContentResult> {
    const errors = validateContent(input.kind, input.content)
    if (Object.keys(errors).length) return { ok: false, errors }
    return { ok: true, entry: await this.repository.save({ ...input, content: input.content as Content }) }
  }
}

export class PublishContentUseCase {
  constructor(private readonly repository: ContentRepository) {}
  async execute({ id, version }: { id: string; version: number }): Promise<ContentResult> {
    const entry = await this.repository.get(id)
    if (!entry || entry.version !== version) return { ok: false, errors: { form: 'Le contenu a changé. Rechargez la page avant de publier.' } }
    const errors = validateContent(entry.kind, entry.draft, true)
    if (Object.keys(errors).length) return { ok: false, errors }
    await this.repository.publish(id, version)
    return { ok: true }
  }
}
