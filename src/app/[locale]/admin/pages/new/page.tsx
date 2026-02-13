"use client"
import dynamic from 'next/dynamic'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

const PageForm = dynamic(() => import('@/components/admin/PageForm'), {
  loading: () => <div className="animate-pulse space-y-4"><div className="h-10 bg-gray-200 rounded" /><div className="h-40 bg-gray-200 rounded" /><div className="h-10 bg-gray-200 rounded w-1/3" /></div>
})

export default function NewPagePage() {
  const { t } = useAdminTranslations()
  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">{t('pages', 'addNew')}</h1>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <PageForm />
        </div>
      </div>
    </main>
  )
}
