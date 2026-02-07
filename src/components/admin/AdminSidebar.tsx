'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard', href: '', icon: '🏠' },
  { label: 'Sozlamalar', href: 'settings', icon: '⚙️' },
  { label: 'Yangiliklar', href: 'news', icon: '📰' },
  { label: 'Jamoa', href: 'team', icon: '👥' },
  { label: 'Hamkorlar', href: 'partners', icon: '🤝' },
  { label: 'Statistika', href: 'statistics', icon: '📊' },
  { label: 'Sahifalar', href: 'pages', icon: '📄' },
  { label: 'Murojaatlar', href: 'applications', icon: '📨' },
  { label: 'Foydalanuvchilar', href: 'users', icon: '🔐' },
]

export default function AdminSidebar() {
  const params = useParams()
  const locale = params.locale as string
  const pathname = usePathname()
  const basePath = `/${locale || 'uz'}/admin`
  const [loggingOut, setLoggingOut] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
      <div className="p-6 border-b border-white/10">
        <Link href={`/${locale || 'uz'}`} className="block">
          <div className="text-lg font-semibold">Admin Panel</div>
          <div className="text-xs text-white/60">Assembly.uz</div>
        </Link>
      </div>

      <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const href = item.href ? `${basePath}/${item.href}` : basePath
          const isActive = pathname === href || (item.href && pathname.startsWith(`${basePath}/${item.href}`))
          return (
            <Link
              key={item.href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href={`/${locale || 'uz'}`}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors mb-1"
        >
          <span className="text-base">🌐</span>
          <span>Saytga o&apos;tish</span>
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-50"
        >
          <span className="text-base">🚪</span>
          <span>{loggingOut ? 'Chiqilmoqda...' : 'Chiqish'}</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary-800 text-white p-2.5 rounded-lg shadow-lg hover:bg-primary-700 transition"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={cn(
        'lg:hidden fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-primary-800 via-primary-900 to-primary-950 text-white flex flex-col transition-transform duration-300',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 min-h-screen bg-gradient-to-b from-primary-800 via-primary-900 to-primary-950 text-white border-r border-white/10 flex-col">
        {sidebarContent}
      </aside>
    </>
  )
}
