import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseConfig } from './config'

export async function createSessionClient(writable = false) {
  const config = supabaseConfig()
  if (!config) throw new Error('Supabase is not configured')
  const store = await cookies()
  return createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: values => {
        // Middleware refreshes read-only Server Components before rendering.
        if (writable) values.forEach(({ name, value, options }) => store.set(name, value, options))
      },
    },
  })
}

export async function getEditor() {
  const client = await createSessionClient()
  const { data: { user }, error } = await client.auth.getUser()
  if (error || !user) return null
  const { data, error: membershipError } = await client.from('editorial_editors').select('user_id').eq('user_id', user.id).maybeSingle()
  if (membershipError) throw new Error('Unable to verify editor access', { cause: membershipError })
  return data ? { client, user } : null
}
