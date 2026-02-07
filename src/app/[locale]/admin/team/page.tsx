'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TeamListPage() {
  const params = useParams()
  const locale = params.locale as string
  const base = `/${locale || 'uz'}/admin/team`
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/team')
      .then(r => r.json())
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleDelete(id: number) {
    if (!confirm('Haqiqatan o\'chirmoqchimisiz?')) return
    const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id))
  }

  if (loading) return <main className="p-6"><div className="text-gray-500">Yuklanmoqda...</div></main>

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Jamoa a&apos;zolari</h1>
            <p className="text-sm text-gray-500">{items.length} ta a&apos;zo</p>
          </div>
          <Link href={`${base}/new`} className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition">
            + Yangi qo&apos;shish
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((n: any) => (
            <div key={n.id} className="p-4 bg-white rounded-lg shadow-sm border flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                {n.photoUrl ? (
                  <img src={n.photoUrl} alt={n.nameUz} className="w-full h-full object-cover" />
                ) : <div className="w-full h-full flex items-center justify-center text-xl">👤</div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900">{n.nameUz || 'Nomsiz'}</div>
                <div className="text-sm text-gray-500">{n.position || ''}</div>
              </div>
              <div className="text-xs text-gray-400">#{n.order}</div>
              <div className="flex gap-2 flex-shrink-0">
                <Link href={`${base}/${n.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Tahrirlash</Link>
                <button onClick={() => handleDelete(n.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">O&apos;chirish</button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">👥</div>
            <p>Hozircha jamoa a&apos;zolari yo&apos;q</p>
            <Link href={`${base}/new`} className="text-primary-600 hover:underline mt-2 inline-block">Birinchi a&apos;zoni qo&apos;shing</Link>
          </div>
        )}
      </div>
    </main>
  )
}
