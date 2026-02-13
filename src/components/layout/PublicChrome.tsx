'use client'

import { ReactNode, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'
import PageViewTracker from '@/components/PageViewTracker'

type PublicChromeProps = {
  children: ReactNode
  locale: string
}

export default function PublicChrome({ children, locale }: PublicChromeProps) {
  const pathname = usePathname()
  const isAdminRoute = useMemo(() => pathname?.includes('/admin'), [pathname])

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <>
      <PageViewTracker locale={locale} />
      <Header />
      {children}
      <Footer />
    </>
  )
}
