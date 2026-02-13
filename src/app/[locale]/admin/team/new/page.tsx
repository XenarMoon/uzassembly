"use client"
import Link from 'next/link'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

const TeamForm = dynamic(() => import('@/components/admin/TeamForm'), {
  loading: () => <div className="animate-pulse space-y-4"><div className="h-10 bg-gray-200 rounded" /><div className="h-40 bg-gray-200 rounded" /><div className="h-10 bg-gray-200 rounded w-1/3" /></div>
})

export default function NewTeamPage() {
  const { t } = useAdminTranslations()
  const params = useParams()
  const locale = params.locale as string || 'uz'
  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href={`/${locale}/admin/team`} className="hover:text-[#005E85] transition-colors">{t('team', 'title')}</Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-600 font-medium">{t('team', 'addNew')}</span>
        </div>
        <TeamForm redirectTo="team" />
      </div>
    </main>
  )
}
