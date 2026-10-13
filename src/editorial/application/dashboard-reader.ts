export type DashboardData = {
  newRequestsCount: number
  draftsCount: number
  newRequests: { id: string; name: string; subject: string; created_at: string }[]
  drafts: { id: string; kind: 'event' | 'album' | 'video'; title: string }[]
}
export interface DashboardReader { read(): Promise<DashboardData> }
