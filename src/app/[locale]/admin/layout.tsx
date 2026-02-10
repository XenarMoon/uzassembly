'use client'

import { usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname?.includes('/admin/login')

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-gray-900">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  )
}
