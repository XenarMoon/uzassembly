'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PartnersListPage() {
  const params = useParams()
  const locale = params.locale as string
  const base = `/${locale || 'uz'}/admin/partners`
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/partners')
      .then(r => r.json())
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleDelete(id: number) {
    if (!confirm('Haqiqatan o\'chirmoqchimisiz?')) return
    const res = await fetch(`/api/admin/partners/${id}`, { method: 'DELETE' })
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id))
  }

  if (loading) return <main className="p-6"><div className="text-gray-500">Yuklanmoqda...</div></main>

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hamkorlar</h1>
            <p className="text-sm text-gray-500">{items.length} ta hamkor</p>
          </div>
          <Link href={`${base}/new`} className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition">
            + Yangi qo&apos;shish
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm border overflow-hidden">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Logo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Nomi</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tartib</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {p.logo ? <img src={p.logo} alt={p.name} className="h-10 rounded" /> : <span className="text-2xl">🤝</span>}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                  <td className="px-4 py-3 text-gray-500">{p.order}</td>
                  <td className="px-4 py-3 text-center">
                    <Link href={`${base}/${p.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Tahrirlash</Link>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">O&apos;chirish</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">🤝</div>
            <p>Hozircha hamkorlar yo&apos;q</p>
            <Link href={`${base}/new`} className="text-primary-600 hover:underline mt-2 inline-block">Birinchi hamkorni qo&apos;shing</Link>
          </div>
        )}
      </div>
    </main>
  )
}
