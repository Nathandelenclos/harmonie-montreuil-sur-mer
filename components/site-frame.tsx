"use client"

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Navigation from './navigation'
import Footer from './footer'

export default function SiteFrame({ children }: { children: ReactNode }) {
  const admin = usePathname().startsWith('/admin')
  return <>{!admin && <Navigation />}<main id="main-content" tabIndex={-1} className="min-h-screen">{children}</main>{!admin && <Footer />}</>
}
