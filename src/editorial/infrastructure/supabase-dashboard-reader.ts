import type { SupabaseClient } from '@supabase/supabase-js'
import type { DashboardData, DashboardReader } from '../application/dashboard-reader'

export class SupabaseDashboardReader implements DashboardReader {
  constructor(private readonly client: SupabaseClient) {}
  async read(): Promise<DashboardData> {
    const [requests, drafts] = await Promise.all([
      this.client.from('form_submissions').select('id,name,subject,created_at', { count: 'exact' }).eq('status', 'new').order('created_at', { ascending: false }).order('id').limit(5),
      this.client.from('editorial_entries').select('id,kind,title:draft->>title', { count: 'exact' }).is('published_version', null).order('updated_at', { ascending: false }).order('id').limit(5),
    ])
    if (requests.error || drafts.error) throw new Error('Unable to load dashboard')
    return { newRequestsCount: requests.count ?? 0, draftsCount: drafts.count ?? 0, newRequests: requests.data, drafts: drafts.data as DashboardData['drafts'] }
  }
}
