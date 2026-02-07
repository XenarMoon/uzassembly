'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function PageViewTracker({ locale }: { locale: string }) {
  const pathname = usePathname()

  useEffect(() => {
    // Don't track admin pages
    if (pathname?.includes('/admin')) return

    const controller = new AbortController()
    
    fetch('/api/public/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        locale: locale,
      }),
      signal: controller.signal,
    }).catch(() => {
      // Silently ignore tracking errors
    })

    return () => controller.abort()
  }, [pathname, locale])

  return null
}
