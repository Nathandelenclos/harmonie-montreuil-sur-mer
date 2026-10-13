import { redirect } from 'next/navigation'
import { requireEditor } from '@/lib/editorial-admin'
import { isContentKind } from '@/src/editorial/domain/content'
import { SupabaseDashboardReader } from '@/src/editorial/infrastructure/supabase-dashboard-reader'
import Dashboard from '@/components/admin/dashboard'

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  const { client } = await requireEditor()
  const { kind } = await searchParams
  if (isContentKind(kind)) redirect(`/admin/contents/${kind}`)
  return <Dashboard data={await new SupabaseDashboardReader(client).read()} />
}
