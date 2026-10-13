import { redirect } from 'next/navigation'
import { getEditor } from './supabase/server'
import { supabaseConfig } from './supabase/config'
import { SupabaseContentRepository } from '@/src/editorial/infrastructure/supabase-content-repository'

export async function requireEditor() {
  if (!supabaseConfig()) redirect('/admin/login')
  const editor = await getEditor()
  if (!editor) redirect('/admin/login')
  return { ...editor, repository: new SupabaseContentRepository(editor.client) }
}
