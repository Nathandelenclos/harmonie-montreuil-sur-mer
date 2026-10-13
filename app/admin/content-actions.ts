'use server'

import { revalidatePath } from 'next/cache'
import { requireEditor } from '@/lib/editorial-admin'
import { ContentConflict } from '@/src/editorial/application/content-repository'
import { SaveContentUseCase, PublishContentUseCase, type ContentResult } from '@/src/editorial/application/use-cases/content-use-cases'
import { isContentKind } from '@/src/editorial/domain/content'

function failure(error: unknown): ContentResult {
  const code = error && typeof error === 'object' && 'code' in error ? error.code : null
  const message = error instanceof ContentConflict ? error.message : code === '23505' ? 'Cet identifiant est déjà utilisé. Choisissez-en un autre.' : code === '23514' ? 'La modification a été refusée. Conservez l’identifiant d’un contenu déjà publié et vérifiez les champs.' : 'L’enregistrement a échoué. Vos modifications sont conservées dans le formulaire ; réessayez.'
  return { ok: false, errors: { [code === '23505' ? 'slug' : 'form']: message } }
}

export async function saveContent(input: { id?: string; version?: number; kind: string; content: unknown }): Promise<ContentResult> {
  const { repository } = await requireEditor()
  if (!isContentKind(input.kind) || JSON.stringify(input.content).length > 1000000) return { ok: false, errors: { form: 'Ce contenu ne peut pas être enregistré.' } }
  try { return await new SaveContentUseCase(repository).execute({ ...input, kind: input.kind }) } catch (error) { return failure(error) }
}

export async function transitionContent(id: string, version: number, action: 'publish' | 'unpublish' | 'delete'): Promise<ContentResult> {
  const { repository } = await requireEditor()
  if (!Number.isInteger(version) || version < 1 || !['publish', 'unpublish', 'delete'].includes(action)) return { ok: false, errors: { form: 'Action invalide.' } }
  try {
    if (action === 'publish') {
      const result = await new PublishContentUseCase(repository).execute({ id, version })
      if (!result.ok) return result
    } else if (action === 'unpublish') await repository.unpublish(id, version)
    else await repository.remove(id, version)
    for (const path of ['/', '/evenements', '/galerie', '/videos', '/sitemap.xml', '/admin']) revalidatePath(path, 'layout')
    const entry = action === 'delete' ? undefined : await repository.get(id)
    return { ok: true, entry: entry || undefined }
  } catch (error) { return failure(error) }
}
