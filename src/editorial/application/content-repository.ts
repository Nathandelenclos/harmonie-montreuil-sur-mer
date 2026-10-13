import type { Content, ContentKind, Entry } from '../domain/content'

export interface ContentRepository {
  list(kind: ContentKind): Promise<Entry[]>
  get(id: string): Promise<Entry | null>
  save(input: { id?: string; version?: number; kind: ContentKind; content: Content }): Promise<Entry>
  publish(id: string, version: number): Promise<void>
  unpublish(id: string, version: number): Promise<void>
  remove(id: string, version: number): Promise<void>
}

export class ContentConflict extends Error {
  constructor() { super('Ce contenu a changé dans une autre session. Rechargez la page avant de réessayer.') }
}
