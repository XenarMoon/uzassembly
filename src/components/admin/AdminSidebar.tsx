'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

// SVG icon components
const icons = {
  dashboard: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  pages: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  ),
  news: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  team: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  applications: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  partners: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  statistics: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  settings: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  goToSite: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  logout: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
}

const mainNav = [
  { key: 'dashboard', href: '' },
  { key: 'pages', href: 'pages' },
  { key: 'news', href: 'news' },
  { key: 'team', href: 'team' },
  { key: 'applications', href: 'applications' },
  { key: 'users', href: 'users' },
  { key: 'partners', href: 'partners' },
  { key: 'statistics', href: 'statistics' },
]

export default function AdminSidebar() {
  const params = useParams()
  const locale = params.locale as string
  const pathname = usePathname()
  const basePath = `/${locale || 'uz'}/admin`
  const [loggingOut, setLoggingOut] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t, tRoot } = useAdminTranslations()

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      window.location.href = `/${locale || 'uz'}/admin/login`
    } catch {
      setLoggingOut(false)
    }
  }

  const sidebarContent = (
    <>
      <div className="p-5 pb-4 border-b border-white/10">
        <Link href={`/${locale || 'uz'}`} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            A
          </div>
          <div>
            <div className="text-base font-bold tracking-tight">{tRoot('panel')}</div>
            <div className="text-[11px] text-white/50 font-medium">Assembly.uz</div>
          </div>
        </Link>
      </div>

      <nav className="p-3 space-y-0.5 flex-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-semibold text-white/30 uppercase tracking-widest">{t('sidebar', 'menuLabel')}</div>
        {mainNav.map((item) => {
          const href = item.href ? `${basePath}/${item.href}` : basePath
          const isActive = pathname === href || (item.href && pathname.startsWith(`${basePath}/${item.href}`))
          return (
            <Link
              key={item.key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200',
                isActive
                  ? 'bg-white/[0.12] text-white shadow-sm backdrop-blur-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
              )}
            >
              <span className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-sky-400' : 'text-white/50')}>
                {icons[item.key as keyof typeof icons]}
              </span>
              <span>{t('sidebar', item.key)}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-0.5">
        {/* Settings */}
        {(() => {
          const settingsHref = `${basePath}/settings`
          const isSettingsActive = pathname === settingsHref || pathname.startsWith(`${basePath}/settings`)
          return (
            <Link
              href={settingsHref}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200',
                isSettingsActive
                  ? 'bg-white/[0.12] text-white shadow-sm backdrop-blur-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
              )}
            >
              <span className={cn('w-5 h-5 flex-shrink-0', isSettingsActive ? 'text-sky-400' : 'text-white/50')}>
                {icons.settings}
              </span>
              <span>{t('sidebar', 'settings')}</span>
              {isSettingsActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400" />}
            </Link>
          )
        })()}

        {/* Go to site */}
        <Link
          href={`/${locale || 'uz'}`}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          <span className="w-5 h-5 flex-shrink-0 text-white/50">{icons.goToSite}</span>
          <span>{t('sidebar', 'goToSite')}</span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-all disabled:opacity-50"
        >
          <span className="w-5 h-5 flex-shrink-0">{icons.logout}</span>
          <span>{loggingOut ? t('sidebar', 'loggingOut') : t('sidebar', 'logout')}</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary-700/90 backdrop-blur-sm text-white p-2.5 rounded-xl shadow-lg hover:bg-primary-600 transition-all"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={cn(
        'lg:hidden fixed inset-y-0 left-0 z-40 w-[280px] bg-gradient-to-b from-[#002B3D] via-[#001A25] to-[#001020] text-white flex flex-col transition-transform duration-300 shadow-2xl',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[280px] min-h-screen bg-gradient-to-b from-[#002B3D] via-[#001A25] to-[#001020] text-white border-r border-white/[0.06] flex-col shadow-xl">
        {sidebarContent}
      </aside>
    </>
  )
}
