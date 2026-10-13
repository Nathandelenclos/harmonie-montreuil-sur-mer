import type { SupabaseClient } from '@supabase/supabase-js'
import { ContentConflict, type ContentRepository } from '../application/content-repository'
import type { Content, ContentKind, Entry } from '../domain/content'

export class SupabaseContentRepository implements ContentRepository {
  constructor(private readonly client: SupabaseClient) {}
  async list(kind: ContentKind): Promise<Entry[]> {
    const { data, error } = await this.client.from('editorial_entries').select('*').eq('kind', kind).order('updated_at', { ascending: false })
    if (error) throw error
    return data as Entry[]
  }
  async get(id: string): Promise<Entry | null> {
    const { data, error } = await this.client.from('editorial_entries').select('*').eq('id', id).maybeSingle()
    if (error) throw error
    return data as Entry | null
  }
  async save(input: { id?: string; version?: number; kind: ContentKind; content: Content }): Promise<Entry> {
    const query = input.id
      ? this.client.from('editorial_entries').update({ draft: input.content, slug: input.content.slug }).eq('id', input.id).eq('version', input.version).eq('kind', input.kind)
      : this.client.from('editorial_entries').insert({ kind: input.kind, slug: input.content.slug, draft: input.content })
    const { data, error } = await query.select().maybeSingle()
    if (error) throw error
    if (!data) throw new ContentConflict()
    return data as Entry
  }
  private async transition(action: string, id: string, version: number) {
    const { error } = await this.client.rpc('transition_content', { entry_id: id, expected_version: version, action })
    if (error?.code === '40001') throw new ContentConflict()
    if (error) throw error
  }
  publish(id: string, version: number) { return this.transition('publish', id, version) }
  unpublish(id: string, version: number) { return this.transition('unpublish', id, version) }
  remove(id: string, version: number) { return this.transition('delete', id, version) }
}
