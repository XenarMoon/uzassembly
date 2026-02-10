"use client"
import Link from 'next/link'
import { useParams } from 'next/navigation'
import NewsForm from '@/components/admin/NewsForm'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

export default function NewNewsPage() {
  const { t } = useAdminTranslations()
  const params = useParams()
  const locale = (params.locale as string) || 'uz'

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href={`/${locale}/admin/news`} className="text-gray-400 hover:text-[#005E85] transition-colors">
            {t('news', 'title')}
          </Link>
          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-700 font-medium">{t('news', 'addNew')}</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">{t('news', 'addNew')}</h1>
        <NewsForm redirectTo="news" />
      </div>
    </main>
  )
}
