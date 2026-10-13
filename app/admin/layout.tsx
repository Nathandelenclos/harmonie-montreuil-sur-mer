import type { ReactNode } from 'react'
import './admin.css'

export const metadata = { title: 'Administration | Harmonie de Montreuil-sur-Mer', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="admin-workspace site-container py-10 md:py-14">{children}</div>
}
