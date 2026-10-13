import type { ReactNode } from 'react'
import { getEditor } from '@/lib/supabase/server'
import { supabaseConfig } from '@/lib/supabase/config'
import ConnectedAdminShell from '@/components/admin/connected-admin-shell'
import './admin.css'

export const metadata = { title: 'Administration | Harmonie de Montreuil-sur-Mer', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const editor = supabaseConfig() ? await getEditor() : null
  return <ConnectedAdminShell email={editor?.user.email ?? null}>{children}</ConnectedAdminShell>
}
