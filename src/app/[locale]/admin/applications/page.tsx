'use client'

import { useEffect, useState, useMemo } from 'react'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

interface Application {
  id: number
  name: string | null
  email: string
  phone: string | null
  company: string | null
  subject: string | null
  reason: string | null
  reasonTitle: string | null
  message: string
  status: string
  createdAt: string
  updatedAt: string
}

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  New:       { bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-400',   border: 'border-amber-200' },
  Reviewed:  { bg: 'bg-blue-50',    text: 'text-blue-700',    dot: 'bg-blue-400',     border: 'border-blue-200' },
  Completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400',  border: 'border-emerald-200' },
}

export default function ApplicationsPage() {
  const [items, setItems] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [successMsg, setSuccessMsg] = useState('')
  const { t } = useAdminTranslations()

  useEffect(() => {
    fetch('/api/admin/applications')
      .then(r => r.ok ? r.json() : [])
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // Status update
  async function updateStatus(id: number, status: string) {
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    if (res.ok) {
      setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i))
      const statusLabel = status === 'New' ? t('applications', 'new')
        : status === 'Reviewed' ? t('applications', 'reviewed')
        : t('applications', 'completed')
      setSuccessMsg(t('applications', 'statusChanged', { status: statusLabel }))
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  }

  // Delete
  async function deleteApplication(id: number) {
    const res = await fetch(`/api/admin/applications/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setItems(prev => prev.filter(i => i.id !== id))
      setDeleteId(null)
      if (expandedId === id) setExpandedId(null)
      setSuccessMsg(t('applications', 'deleted'))
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  }

  // Counts
  const newCount = items.filter(i => i.status === 'New').length
  const reviewedCount = items.filter(i => i.status === 'Reviewed').length
  const completedCount = items.filter(i => i.status === 'Completed').length

  // Filter + search
  const filteredItems = useMemo(() => {
    let result = filter === 'all' ? items : items.filter(i => i.status === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(i =>
        (i.name || '').toLowerCase().includes(q) ||
        (i.email || '').toLowerCase().includes(q) ||
        (i.phone || '').toLowerCase().includes(q) ||
        (i.reasonTitle || '').toLowerCase().includes(q) ||
        (i.message || '').toLowerCase().includes(q) ||
        (i.company || '').toLowerCase().includes(q)
      )
    }
    return result
  }, [items, filter, search])

  // Format date
  function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
      ' ' + d.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
  }

  // Status badge component
  function StatusBadge({ status }: { status: string }) {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.New
    const label = status === 'New' ? t('applications', 'new')
      : status === 'Reviewed' ? t('applications', 'reviewed')
      : t('applications', 'completed')
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        {label}
      </span>
    )
  }

  // Filter tabs config
  const statusFilters = [
    { key: 'all',       label: t('common', 'all'),              count: items.length },
    { key: 'New',       label: t('applications', 'new'),        count: newCount },
    { key: 'Reviewed',  label: t('applications', 'reviewed'),   count: reviewedCount },
    { key: 'Completed', label: t('applications', 'completed'),  count: completedCount },
  ]

  // Loading skeleton
  if (loading) {
    return (
      <main className="p-4 md:p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mb-8" />
          <div className="flex gap-2 mb-6">
            {[1,2,3,4].map(i => <div key={i} className="h-10 w-24 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50">
                <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-28 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-40 bg-gray-50 rounded animate-pulse flex-1" />
                <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                <div className="h-6 w-20 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Success toast */}
        {successMsg && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg font-medium text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {successMsg}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('applications', 'title')}</h1>
            <p className="text-sm text-gray-400 mt-1">{t('applications', 'totalCount', { total: items.length, newCount })}</p>
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t('applications', 'searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#005E85]/20 focus:border-[#005E85] transition-all outline-none"
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statusFilters.map(s => (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                filter === s.key
                  ? 'bg-[#005E85] text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              {s.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                filter === s.key
                  ? s.key === 'New' && s.count > 0 ? 'bg-red-500 text-white' : 'bg-white/20 text-white'
                  : s.key === 'New' && s.count > 0 ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {s.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        {filteredItems.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table header */}
            <div className="hidden md:grid md:grid-cols-[2fr_1.5fr_2fr_3fr_1.5fr_1.2fr_auto] gap-4 px-6 py-3.5 bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>{t('applications', 'colName')}</span>
              <span>{t('applications', 'colPhone')}</span>
              <span>{t('applications', 'colSubject')}</span>
              <span>{t('applications', 'colMessage')}</span>
              <span>{t('applications', 'colDate')}</span>
              <span>{t('applications', 'colStatus')}</span>
              <span className="text-right">{t('applications', 'colActions')}</span>
            </div>

            {/* Rows */}
            {filteredItems.map((item) => (
              <div key={item.id}>
                {/* Main row */}
                <div
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className={`grid grid-cols-1 md:grid-cols-[2fr_1.5fr_2fr_3fr_1.5fr_1.2fr_auto] gap-3 md:gap-4 px-6 py-4 border-b border-gray-50 cursor-pointer transition-all duration-200 group ${
                    expandedId === item.id ? 'bg-[#005E85]/[0.03]' : 'hover:bg-gray-50/80'
                  } ${item.status === 'New' ? 'border-l-3 border-l-amber-400' : ''}`}
                >
                  {/* Name + Email */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#005E85]/10 text-[#005E85] flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {(item.name || '?')[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 text-sm truncate">{item.name || t('applications', 'unknown')}</div>
                      <div className="text-xs text-gray-400 truncate">{item.email}</div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center text-sm text-gray-600 md:pl-0 pl-11">
                    {item.phone ? (
                      <span className="truncate">{item.phone}</span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </div>

                  {/* Subject (reasonTitle) */}
                  <div className="flex items-center md:pl-0 pl-11">
                    {item.reasonTitle ? (
                      <span className="inline-block px-2.5 py-1 bg-[#005E85]/[0.08] text-[#005E85] rounded-lg text-xs font-medium truncate max-w-full">
                        {item.reasonTitle}
                      </span>
                    ) : item.subject ? (
                      <span className="inline-block px-2.5 py-1 bg-[#005E85]/[0.08] text-[#005E85] rounded-lg text-xs font-medium truncate max-w-full">
                        {item.subject}
                      </span>
                    ) : (
                      <span className="text-gray-300 text-sm">—</span>
                    )}
                  </div>

                  {/* Message preview */}
                  <div className="flex items-center text-sm text-gray-500 min-w-0 md:pl-0 pl-11">
                    <span className="truncate">{item.message.length > 80 ? item.message.slice(0, 80) + '...' : item.message}</span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center text-xs text-gray-400 md:pl-0 pl-11">
                    {formatDate(item.createdAt)}
                  </div>

                  {/* Status */}
                  <div className="flex items-center md:pl-0 pl-11">
                    <StatusBadge status={item.status} />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1 md:pl-0 pl-11" onClick={e => e.stopPropagation()}>
                    {/* Expand */}
                    <button
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="p-1.5 rounded-lg bg-[#005E85]/10 text-[#005E85] hover:bg-[#005E85] hover:text-white transition-colors"
                      title={t('applications', 'viewDetail')}
                    >
                      <svg className={`w-4 h-4 transition-transform duration-200 ${expandedId === item.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      title={t('applications', 'delete')}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Expanded detail panel */}
                {expandedId === item.id && (
                  <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-5 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="max-w-4xl">
                      {/* Info grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                        <div>
                          <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">{t('applications', 'colName')}</div>
                          <div className="text-sm font-semibold text-gray-900">{item.name || t('applications', 'unknown')}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">Email</div>
                          <a href={`mailto:${item.email}`} className="text-sm text-[#005E85] hover:underline">{item.email}</a>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">{t('applications', 'colPhone')}</div>
                          {item.phone ? (
                            <a href={`tel:${item.phone}`} className="text-sm text-[#005E85] hover:underline">{item.phone}</a>
                          ) : (
                            <span className="text-sm text-gray-300">—</span>
                          )}
                        </div>
                        {item.company && (
                          <div>
                            <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">{t('applications', 'colCompany')}</div>
                            <div className="text-sm font-medium text-gray-700">{item.company}</div>
                          </div>
                        )}
                      </div>

                      {/* Subject */}
                      {(item.reasonTitle || item.subject) && (
                        <div className="mb-4">
                          <div className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">{t('applications', 'colSubject')}</div>
                          <span className="inline-block px-3 py-1.5 bg-[#005E85]/[0.08] text-[#005E85] rounded-lg text-sm font-medium">
                            {item.reasonTitle || item.subject}
                          </span>
                        </div>
                      )}

                      {/* Message */}
                      <div className="mb-5">
                        <div className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">{t('applications', 'colMessage')}</div>
                        <div className="bg-white rounded-xl border border-gray-100 p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {item.message}
                        </div>
                      </div>

                      {/* Status change + date */}
                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <div className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">{t('applications', 'changeStatus')}</div>
                          <select
                            value={item.status}
                            onChange={(e) => updateStatus(item.id, e.target.value)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold border cursor-pointer transition-all ${
                              STATUS_CONFIG[item.status]?.bg || 'bg-gray-50'
                            } ${STATUS_CONFIG[item.status]?.text || 'text-gray-700'} ${
                              STATUS_CONFIG[item.status]?.border || 'border-gray-200'
                            } focus:ring-2 focus:ring-[#005E85]/20 outline-none`}
                          >
                            <option value="New">{t('applications', 'new')}</option>
                            <option value="Reviewed">{t('applications', 'reviewed')}</option>
                            <option value="Completed">{t('applications', 'completed')}</option>
                          </select>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">{t('applications', 'colDate')}</div>
                          <div className="text-sm text-gray-500">{formatDate(item.createdAt)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <p className="font-medium text-gray-400">{t('applications', 'empty')}</p>
            {search && (
              <p className="text-sm text-gray-300 mt-1">{t('applications', 'noSearchResults')}</p>
            )}
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
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{t('applications', 'deleteTitle')}</h3>
              <p className="text-sm text-gray-500 text-center mb-6">{t('applications', 'deleteConfirm')}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  {t('common', 'cancel')}
                </button>
                <button
                  onClick={() => deleteApplication(deleteId)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  {t('applications', 'delete')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
