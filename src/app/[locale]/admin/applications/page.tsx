'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ApplicationsPage() {
  const params = useParams()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    // Fetch applications from DB via API
    fetch('/api/admin/applications')
      .then(r => r.ok ? r.json() : [])
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => {
        // If no API route exists yet, try fetching from the page itself
        setLoading(false)
      })
  }, [])

  async function updateStatus(id: number, status: string) {
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    if (res.ok) {
      setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i))
    }
  }

  const filteredItems = filter === 'all' ? items : items.filter(i => i.status === filter)
  const newCount = items.filter(i => i.status === 'New').length

  if (loading) return <main className="p-6"><div className="text-gray-500">Yuklanmoqda...</div></main>

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Murojaatlar</h1>
            <p className="text-sm text-gray-500">Jami: {items.length} ta, Yangi: {newCount} ta</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['all', 'New', 'Reviewed', 'Completed'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === s ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'
              }`}
            >
              {s === 'all' ? 'Barchasi' : s === 'New' ? 'Yangi' : s === 'Reviewed' ? 'Ko\'rilgan' : 'Bajarilgan'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="p-5 bg-white rounded-lg shadow-sm border">
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                <span className="font-semibold text-gray-900 text-base">{item.name || 'Noma\'lum'}</span>
                <span className="text-gray-400">•</span>
                <span>{item.email}</span>
                {item.phone && <><span className="text-gray-400">•</span><span>{item.phone}</span></>}
                {item.company && <><span className="text-gray-400">•</span><span>{item.company}</span></>}
                {item.reasonTitle && (
                  <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs font-medium">{item.reasonTitle}</span>
                )}
              </div>
              <div className="text-gray-700 whitespace-pre-wrap mb-3">{item.message}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</span>
                <div className="flex gap-2">
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                      item.status === 'New' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      item.status === 'Reviewed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-green-50 text-green-700 border-green-200'
                    }`}
                  >
                    <option value="New">Yangi</option>
                    <option value="Reviewed">Ko&apos;rilgan</option>
                    <option value="Completed">Bajarilgan</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">📨</div>
            <p>Hozircha murojaatlar yo&apos;q</p>
          </div>
        )}
      </div>
    </main>
  )
}
