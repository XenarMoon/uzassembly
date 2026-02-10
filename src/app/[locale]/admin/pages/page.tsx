'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

export default function PagesListPage() {
  const params = useParams()
  const locale = params.locale as string
  const base = `/${locale || 'uz'}/admin/pages`
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useAdminTranslations()

  useEffect(() => {
    fetch('/api/admin/pages')
      .then(r => r.json())
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleDelete(id: number) {
    if (!confirm(t('common', 'confirmDelete'))) return
    const res = await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' })
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id))
  }

  if (loading) return <main className="p-6 md:p-8 min-h-screen"><div className="text-gray-400 font-medium">{t('common', 'loading')}</div></main>

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('pages', 'title')}</h1>
            <p className="text-sm text-gray-400 mt-1">{t('pages', 'count', { count: items.length })}</p>
          </div>
          <Link href={`${base}/new`} className="bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] text-white px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md text-sm font-semibold flex items-center gap-2">
            <span>+</span> {t('pages', 'addNew')}
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{t('pages', 'slug')}</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{t('pages', 'titleUz')}</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{t('common', 'created')}</th>
                <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">{t('common', 'actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-5 py-3.5"><code className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg font-mono">{page.slug}</code></td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{page.titleUz || page.titleEn}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-400">{new Date(page.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-3.5 text-center">
                    <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`${base}/${page.id}`} className="text-[#005E85] hover:bg-[#005E85]/10 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors">{t('common', 'edit')}</Link>
                      <button onClick={() => handleDelete(page.id)} className="text-red-500 hover:bg-red-50 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors">{t('common', 'delete')}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {items.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyan-50 flex items-center justify-center text-3xl">📄</div>
            <p className="font-medium">{t('pages', 'empty')}</p>
            <Link href={`${base}/new`} className="text-[#005E85] hover:underline mt-2 inline-block text-sm font-medium">{t('pages', 'addFirst')}</Link>
          </div>
        )}
      </div>
    </main>
  )
}
