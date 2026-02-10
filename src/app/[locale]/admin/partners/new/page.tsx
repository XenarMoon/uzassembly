"use client"
import PartnerForm from '@/components/admin/PartnerForm'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

export default function NewPartnerPage() {
  const { t } = useAdminTranslations()
  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">{t('partners', 'addNew')}</h1>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <PartnerForm />
        </div>
      </div>
    </main>
  )
}
