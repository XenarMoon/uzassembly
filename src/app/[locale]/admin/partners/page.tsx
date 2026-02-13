'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

interface Partner {
  id: number
  name: string
  logo: string | null
  link: string | null
  order: number
  createdAt: string
}

export default function PartnersListPage() {
  const params = useParams()
  const locale = params.locale as string
  const base = `/${locale || 'uz'}/admin/partners`
  const [items, setItems] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [successMsg, setSuccessMsg] = useState('')
  const { t } = useAdminTranslations()

  useEffect(() => {
    fetch('/api/admin/partners')
      .then(r => r.json())
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleDelete(id: number) {
    const res = await fetch(`/api/admin/partners/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setItems(prev => prev.filter(i => i.id !== id))
      setDeleteId(null)
      setSuccessMsg(t('partners', 'deleted'))
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <main className="p-4 md:p-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 w-40 bg-gray-200 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-56 bg-gray-100 rounded animate-pulse mb-8" />
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50">
                <div className="w-14 h-10 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-4 w-40 bg-gray-100 rounded animate-pulse flex-1" />
                <div className="h-6 w-12 bg-gray-50 rounded-lg animate-pulse" />
                <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Success toast */}
        {successMsg && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg font-medium text-sm flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {successMsg}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('partners', 'title')}</h1>
            <p className="text-sm text-gray-400 mt-1">{t('partners', 'count', { count: items.length })}</p>
          </div>
          <Link
            href={`${base}/new`}
            className="bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] text-white px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md text-sm font-semibold flex items-center gap-2 w-fit"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t('partners', 'addNew')}
          </Link>
        </div>

        {/* Table */}
        {items.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table header */}
            <div className="hidden md:grid md:grid-cols-[auto_2fr_2fr_1fr_auto] gap-4 px-6 py-3.5 bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span className="w-16">{t('partners', 'logo')}</span>
              <span>{t('partners', 'name')}</span>
              <span>{t('partners', 'link')}</span>
              <span>{t('partners', 'order')}</span>
              <span className="text-right w-28">{t('partners', 'actions')}</span>
            </div>

            {/* Rows */}
            {items.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-1 md:grid-cols-[auto_2fr_2fr_1fr_auto] gap-3 md:gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center group"
              >
                {/* Logo */}
                <div className="w-16 h-11 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-xl p-1">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="h-9 max-w-[60px] object-contain" />
                  ) : (
                    <div className="w-14 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="flex items-center min-w-0">
                  <span className="font-semibold text-gray-900 text-sm truncate">{p.name}</span>
                </div>

                {/* Link */}
                <div className="flex items-center min-w-0 md:pl-0 pl-0">
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#005E85] hover:underline truncate flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      <span className="truncate">{p.link.replace(/^https?:\/\//, '')}</span>
                    </a>
                  ) : (
                    <span className="text-gray-300 text-sm">—</span>
                  )}
                </div>

                {/* Order */}
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg font-semibold border border-gray-100">#{p.order}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1.5 w-28">
                  <Link
                    href={`${base}/${p.id}`}
                    className="p-1.5 rounded-lg bg-[#005E85]/10 text-[#005E85] hover:bg-[#005E85] hover:text-white transition-colors"
                    title={t('common', 'edit')}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => setDeleteId(p.id)}
                    className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    title={t('common', 'delete')}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <p className="font-medium text-gray-400">{t('partners', 'empty')}</p>
            <Link href={`${base}/new`} className="text-[#005E85] hover:underline mt-2 inline-block text-sm font-medium">{t('partners', 'addFirst')}</Link>
          </div>
        )}

        {/* Delete confirmation modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteId(null)}>
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{t('partners', 'deleteTitle')}</h3>
              <p className="text-sm text-gray-500 text-center mb-6">{t('partners', 'deleteConfirm')}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  {t('common', 'cancel')}
                </button>
                <button
                  onClick={() => deleteId && handleDelete(deleteId)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  {t('common', 'delete')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
