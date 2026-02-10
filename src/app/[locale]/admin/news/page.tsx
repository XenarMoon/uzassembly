'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

export default function NewsListPage() {
  const params = useParams()
  const locale = (params.locale as string) || 'uz'
  const base = `/${locale}/admin/news`
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const { t } = useAdminTranslations()

  useEffect(() => {
    fetch('/api/admin/news')
      .then(r => r.json())
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleDelete(id: number) {
    if (!confirm(t('common', 'confirmDelete'))) return
    const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' })
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id))
  }

  const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, '') || ''

  const getTitle = (n: any) =>
    locale === 'en' ? (n.titleEn || n.titleUz) : locale === 'ru' ? (n.titleRu || n.titleUz) : n.titleUz

  const getSummary = (n: any) =>
    locale === 'en' ? (n.summaryEn || n.summaryUz) : locale === 'ru' ? (n.summaryRu || n.summaryUz) : n.summaryUz

  const filtered = useMemo(() => {
    if (!search.trim()) return items
    const q = search.toLowerCase()
    return items.filter(n =>
      (n.titleUz || '').toLowerCase().includes(q) ||
      (n.titleRu || '').toLowerCase().includes(q) ||
      (n.titleEn || '').toLowerCase().includes(q) ||
      stripHtml(n.contentUz).toLowerCase().includes(q)
    )
  }, [items, search])

  const formatDate = (d: string) => {
    const date = new Date(d)
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'ru' ? 'ru-RU' : 'uz-UZ', {
      year: 'numeric', month: 'short', day: 'numeric'
    })
  }

  if (loading) return (
    <main className="p-6 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg w-48" />
          <div className="h-10 bg-gray-100 rounded-xl w-full max-w-sm" />
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-white rounded-2xl border border-gray-100" />
          ))}
        </div>
      </div>
    </main>
  )

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('news', 'title')}</h1>
            <p className="text-sm text-gray-400 mt-1">{t('news', 'count', { count: items.length })}</p>
          </div>
          <Link href={`${base}/new`} className="bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] text-white px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md text-sm font-semibold flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            {t('news', 'addNew')}
          </Link>
        </div>

        {/* Search */}
        {items.length > 0 && (
          <div className="mb-6">
            <div className="relative max-w-md">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('news', 'searchPlaceholder')}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#005E85]/20 focus:border-[#005E85] outline-none transition-all bg-white placeholder:text-gray-300"
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="space-y-3">
          {filtered.map((n: any) => {
            const hasVideo = !!n.videoUrl
            const hasImage = !!n.imageUrl
            const isPublished = !!n.publishedAt
            return (
              <div key={n.id} className="group p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200">
                <div className="flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="w-28 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 relative">
                    {hasImage ? (
                      <img src={n.imageUrl} alt={getTitle(n)} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#005E85]/5 to-[#3E9EEE]/10">
                        <svg className="w-8 h-8 text-[#005E85]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                      </div>
                    )}
                    {hasVideo && (
                      <div className="absolute bottom-1 right-1 w-6 h-6 bg-violet-500/90 rounded-md flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <h3 className="font-semibold text-gray-900 truncate flex-1">{getTitle(n) || t('common', 'unnamed')}</h3>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {isPublished ? (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[11px] font-semibold rounded-md">{t('news', 'published')}</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[11px] font-semibold rounded-md">{t('news', 'draft')}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-1 mt-1">
                      {getSummary(n) || stripHtml(locale === 'en' ? (n.contentEn || n.contentUz) : locale === 'ru' ? (n.contentRu || n.contentUz) : n.contentUz).slice(0, 150)}
                    </p>
                    <div className="flex items-center gap-3 mt-2.5">
                      <span className="text-xs text-gray-300 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {formatDate(n.publishedAt || n.createdAt)}
                      </span>
                      {/* Language indicators */}
                      <div className="flex items-center gap-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${n.titleUz ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-300'}`}>UZ</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${n.titleRu ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-300'}`}>RU</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${n.titleEn ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-300'}`}>EN</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`${base}/${n.id}`} className="text-[#005E85] hover:bg-[#005E85]/10 p-2 rounded-lg transition-colors" title={t('common', 'edit')}>
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </Link>
                    <button onClick={() => handleDelete(n.id)} className="text-red-400 hover:bg-red-50 hover:text-red-500 p-2 rounded-lg transition-colors" title={t('common', 'delete')}>
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Search no results */}
        {search && filtered.length === 0 && items.length > 0 && (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <p className="font-medium">{t('news', 'noResults')}</p>
          </div>
        )}

        {/* Empty state */}
        {items.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#005E85]/5 to-[#3E9EEE]/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#005E85]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            </div>
            <p className="font-semibold text-gray-500">{t('news', 'empty')}</p>
            <Link href={`${base}/new`} className="text-[#005E85] hover:underline mt-2 inline-block text-sm font-medium">{t('news', 'addFirst')}</Link>
          </div>
        )}
      </div>
    </main>
  )
}
