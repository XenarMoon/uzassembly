'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NewsListPage() {
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string
  const base = `/${locale || 'uz'}/admin/news`
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/news')
      .then(r => r.json())
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleDelete(id: number) {
    if (!confirm('Haqiqatan o\'chirmoqchimisiz?')) return
    const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' })
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id))
  }

  const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, '') || ''

  if (loading) return <main className="p-6"><div className="text-gray-500">Yuklanmoqda...</div></main>

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Yangiliklar</h1>
            <p className="text-sm text-gray-500">{items.length} ta yangilik</p>
          </div>
          <Link href={`${base}/new`} className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition">
            + Yangi qo&apos;shish
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((n: any) => (
            <div key={n.id} className="p-4 bg-white rounded-lg shadow-sm border flex gap-4 items-start">
              <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                {n.imageUrl ? (
                  <img src={n.imageUrl} alt={n.titleUz || 'news'} className="w-full h-full object-cover" />
                ) : <div className="w-full h-full flex items-center justify-center text-2xl">📰</div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">{n.titleUz || 'Nomsiz'}</div>
                <div className="text-sm text-gray-500 line-clamp-1">
                  {stripHtml(n.contentUz).slice(0, 120)}
                </div>
                <div className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link href={`${base}/${n.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Tahrirlash</Link>
                <button onClick={() => handleDelete(n.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">O&apos;chirish</button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">📰</div>
            <p>Hozircha yangiliklar yo&apos;q</p>
            <Link href={`${base}/new`} className="text-primary-600 hover:underline mt-2 inline-block">Birinchi yangilikni qo&apos;shing</Link>
          </div>
        )}
      </div>
    </main>
  )
}
