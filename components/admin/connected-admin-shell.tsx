"use client"

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import AdminShell from './admin-shell'
import { signOut } from '@/app/admin/auth-actions'

const sections = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/submissions', label: 'Demandes reçues' },
  { href: '/admin/contents/event', label: 'Événements' },
  { href: '/admin/contents/album', label: 'Photos' },
  { href: '/admin/contents/video', label: 'Vidéos' },
]
const authenticationPages = ['/admin/login', '/admin/forgot-password', '/admin/confirm', '/admin/reset-password']
export default function ConnectedAdminShell({ children, email }: { children: ReactNode; email: string | null }) {
  const path = usePathname()
  if (!email || authenticationPages.includes(path)) return <div className="admin-workspace site-container py-10 md:py-14">{children}</div>
  const current = path.match(/^\/admin\/(event|album|video)\//)?.[1]
  const navigation = sections.map(section => ({ ...section, active: section.href === '/admin' ? path === '/admin' : path.startsWith(section.href) || !!current && section.href === `/admin/contents/${current}` }))
  return <AdminShell email={email} navigation={navigation} onSignOut={signOut} siteHref="/">{children}</AdminShell>
}
