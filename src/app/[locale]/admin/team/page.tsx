'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

export default function TeamListPage() {
  const params = useParams()
  const locale = (params.locale as string) || 'uz'
  const base = `/${locale}/admin/team`
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<'all' | 'member' | 'advisor'>('all')
  const { t } = useAdminTranslations()

  useEffect(() => {
    fetch('/api/admin/team')
      .then(r => r.json())
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleDelete(id: number) {
    if (!confirm(t('common', 'confirmDelete'))) return
    const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id))
  }

  const getName = (n: any) =>
    locale === 'en' ? (n.nameEn || n.nameUz) : locale === 'ru' ? (n.nameRu || n.nameUz) : n.nameUz

  const getPosition = (n: any) =>
    locale === 'en' ? (n.positionEn || n.positionUz || n.position) : locale === 'ru' ? (n.positionRu || n.positionUz || n.position) : (n.positionUz || n.position)

  const filtered = useMemo(() => {
    let result = items
    if (activeCategory !== 'all') {
      result = result.filter(i => i.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(n =>
        (n.nameUz || '').toLowerCase().includes(q) ||
        (n.nameRu || '').toLowerCase().includes(q) ||
        (n.nameEn || '').toLowerCase().includes(q) ||
        (n.positionUz || '').toLowerCase().includes(q)
      )
    }
    return result
  }, [items, search, activeCategory])

  const memberCount = items.filter(i => i.category === 'member' || !i.category).length
  const advisorCount = items.filter(i => i.category === 'advisor').length

  if (loading) return (
    <main className="p-6 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg w-48" />
          <div className="h-10 bg-gray-100 rounded-xl w-full max-w-sm" />
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white rounded-2xl border border-gray-100" />)}
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
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('team', 'title')}</h1>
            <p className="text-sm text-gray-400 mt-1">{t('team', 'count', { count: items.length })}</p>
          </div>
          <Link href={`${base}/new`} className="bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] text-white px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md text-sm font-semibold flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            {t('team', 'addNew')}
          </Link>
        </div>

        {/* Category Tabs + Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit">
            <button onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {t('team', 'allMembers')} <span className="text-xs text-gray-400 ml-1">{items.length}</span>
            </button>
            <button onClick={() => setActiveCategory('member')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${activeCategory === 'member' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {t('team', 'categoryMember')} <span className="text-xs text-gray-400">{memberCount}</span>
            </button>
            <button onClick={() => setActiveCategory('advisor')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${activeCategory === 'advisor' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {t('team', 'categoryAdvisor')} <span className="text-xs text-gray-400">{advisorCount}</span>
            </button>
          </div>

          {items.length > 0 && (
            <div className="relative max-w-xs">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('team', 'searchPlaceholder')}
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#005E85]/20 focus:border-[#005E85] outline-none transition-all bg-white placeholder:text-gray-300" />
            </div>
          )}
        </div>

        {/* Items */}
        <div className="space-y-2">
          {filtered.map((n: any) => (
            <div key={n.id} className="group p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200">
              <div className="flex items-center gap-4">
                {/* Order badge */}
                <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {n.order}
                </div>

                {/* Avatar */}
                <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  {n.photoUrl ? (
                    <img src={n.photoUrl} alt={getName(n)} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#005E85]/5 to-[#3E9EEE]/10">
                      <span className="text-[#005E85]/40 font-bold text-lg">
                        {(getName(n) || '?').split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">{getName(n) || t('common', 'unnamed')}</h3>
                    {n.category === 'advisor' ? (
                      <span className="px-2 py-0.5 bg-sky-50 text-sky-600 text-[10px] font-semibold rounded-md flex-shrink-0">{t('team', 'categoryAdvisor')}</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#005E85]/5 text-[#005E85] text-[10px] font-semibold rounded-md flex-shrink-0">{t('team', 'categoryMember')}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 truncate mt-0.5">{getPosition(n)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {n.phone && (
                      <span className="text-[11px] text-gray-300 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        {n.phone}
                      </span>
                    )}
                    {n.socialLink && (
                      <span className="text-[11px] text-gray-300 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                        {t('team', 'hasSocial')}
                      </span>
                    )}
                    {/* Language indicators */}
                    <div className="flex items-center gap-1 ml-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${n.nameUz ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-300'}`}>UZ</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${n.nameRu ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-300'}`}>RU</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${n.nameEn ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-300'}`}>EN</span>
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
          ))}
        </div>

        {/* Search no results */}
        {(search || activeCategory !== 'all') && filtered.length === 0 && items.length > 0 && (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <p className="font-medium">{t('team', 'noResults')}</p>
          </div>
        )}

        {/* Empty state */}
        {items.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#005E85]/5 to-[#3E9EEE]/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#005E85]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <p className="font-semibold text-gray-500">{t('team', 'empty')}</p>
            <Link href={`${base}/new`} className="text-[#005E85] hover:underline mt-2 inline-block text-sm font-medium">{t('team', 'addFirst')}</Link>
          </div>
        )}
      </div>
    </main>
  )
}
