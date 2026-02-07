import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
  title: 'Admin Panel - Assembly.uz',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary-950 text-white">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          <div className="text-gray-900">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
