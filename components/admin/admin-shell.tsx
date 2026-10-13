"use client"

import type { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

export type AdminNavItem = { href: string; label: string; active: boolean }
function SignOutButton() {
  const { pending } = useFormStatus()
  return <button type="submit" disabled={pending}>{pending ? 'Déconnexion…' : 'Se déconnecter'}</button>
}
export default function AdminShell({ children, navigation, email, onSignOut, siteHref }: { children: ReactNode; navigation: AdminNavItem[]; email: string; onSignOut: () => Promise<void>; siteHref: string }) {
  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <a className="admin-brand" href={navigation[0].href}><span>Harmonie</span><span>Montreuil-sur-Mer</span></a>
      <p className="admin-sidebar-label">Espace de l’équipe</p>
      <nav aria-label="Administration"><ul>{navigation.map(item => <li key={item.href}><a href={item.href} aria-current={item.active ? 'page' : undefined}>{item.label}</a></li>)}</ul></nav>
      <div className="admin-account"><a href={siteHref}>Voir le site public</a><p>{email}</p><form action={onSignOut}><SignOutButton /></form></div>
    </aside>
    <div className="admin-desk"><div className="admin-workspace">{children}</div></div>
  </div>
}
