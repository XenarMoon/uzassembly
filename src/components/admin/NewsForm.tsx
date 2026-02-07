'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

export default function NewsForm({
  initial = {} as any,
  onSaved,
  redirectTo,
}: {
  initial?: any
  onSaved?: () => void
  redirectTo?: string
}) {
  const [titleUz, setTitleUz] = useState(initial.titleUz || '')
  const [titleRu, setTitleRu] = useState(initial.titleRu || '')
  const [titleEn, setTitleEn] = useState(initial.titleEn || '')
  const [summaryUz, setSummaryUz] = useState(initial.summaryUz || '')
  const [summaryRu, setSummaryRu] = useState(initial.summaryRu || '')
  const [summaryEn, setSummaryEn] = useState(initial.summaryEn || '')
  const [contentUz, setContentUz] = useState(initial.contentUz || '')
  const [contentRu, setContentRu] = useState(initial.contentRu || '')
  const [contentEn, setContentEn] = useState(initial.contentEn || '')
  const [imageUrl, setImageUrl] = useState(initial.imageUrl || '')
  const [videoUrl, setVideoUrl] = useState(initial.videoUrl || '')
  const [publishedAt, setPublishedAt] = useState(
    initial.publishedAt ? new Date(initial.publishedAt).toISOString().slice(0, 16) : ''
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'uz' | 'ru' | 'en'>('uz')

  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  async function uploadImage(file: File) {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/uploads', { method: 'POST', body: form })
    const data = await res.json()
    if (res.ok) setImageUrl(data.url)
    else setError('Rasm yuklashda xatolik')
  }

  async function uploadVideo(file: File) {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/uploads', { method: 'POST', body: form })
    const data = await res.json()
    if (res.ok) setVideoUrl(data.url)
    else setError('Video yuklashda xatolik')
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      titleUz, titleRu, titleEn,
      summaryUz, summaryRu, summaryEn,
      contentUz, contentRu, contentEn,
      imageUrl, videoUrl,
      publishedAt: publishedAt || null,
    }

    const method = initial.id ? 'PUT' : 'POST'
    const url = initial.id ? `/api/admin/news/${initial.id}` : '/api/admin/news'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Saqlashda xatolik')
      if (onSaved) onSaved()
      else router.push(`/${locale || 'uz'}/admin/${redirectTo || 'news'}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { key: 'uz' as const, label: "O'zbekcha 🇺🇿" },
    { key: 'ru' as const, label: 'Русский 🇷🇺' },
    { key: 'en' as const, label: 'English 🇬🇧' },
  ]

  return (
    <form onSubmit={submit} className="space-y-6">
      {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">{error}</div>}

      {/* Language Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map(tab => (
          <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sarlavha */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sarlavha</label>
        {activeTab === 'uz' && <input value={titleUz} onChange={e => setTitleUz(e.target.value)} placeholder="Sarlavha (UZ)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />}
        {activeTab === 'ru' && <input value={titleRu} onChange={e => setTitleRu(e.target.value)} placeholder="Заголовок (RU)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />}
        {activeTab === 'en' && <input value={titleEn} onChange={e => setTitleEn(e.target.value)} placeholder="Title (EN)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />}
      </div>

      {/* Qisqacha mazmun */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Qisqacha mazmuni</label>
        {activeTab === 'uz' && <textarea value={summaryUz} onChange={e => setSummaryUz(e.target.value)} placeholder="Qisqacha mazmun (UZ)" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />}
        {activeTab === 'ru' && <textarea value={summaryRu} onChange={e => setSummaryRu(e.target.value)} placeholder="Краткое описание (RU)" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />}
        {activeTab === 'en' && <textarea value={summaryEn} onChange={e => setSummaryEn(e.target.value)} placeholder="Summary (EN)" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />}
      </div>

      {/* To'liq matn */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">To&apos;liq matn</label>
        <div style={{ minHeight: '300px' }}>
          {activeTab === 'uz' && <ReactQuill value={contentUz} onChange={setContentUz} theme="snow" />}
          {activeTab === 'ru' && <ReactQuill value={contentRu} onChange={setContentRu} theme="snow" />}
          {activeTab === 'en' && <ReactQuill value={contentEn} onChange={setContentEn} theme="snow" />}
        </div>
      </div>

      {/* Rasm */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">📷 Asosiy rasm (Thumbnail)</label>
        <input type="file" accept="image/*" onChange={e => e.target.files && uploadImage(e.target.files[0])} className="text-sm" />
        {imageUrl && (
          <div className="mt-3 relative inline-block">
            <img src={imageUrl} className="max-w-xs rounded-lg" alt="thumbnail" />
            <button type="button" onClick={() => setImageUrl('')} className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-red-600">✕</button>
          </div>
        )}
      </div>

      {/* Video */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">🎬 Video</label>
        <p className="text-xs text-gray-500 mb-3">Videoni fayl sifatida yuklang yoki YouTube/Telegram havolasini kiriting</p>
        <div className="space-y-3">
          <input type="text" value={videoUrl} onChange={e => setVideoUrl(e.target.value)}
            placeholder="YouTube/Telegram havola: https://youtube.com/watch?v=... yoki https://t.me/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
          <div className="text-xs text-gray-500">yoki</div>
          <input type="file" accept="video/*" onChange={e => e.target.files && uploadVideo(e.target.files[0])} className="text-sm" />
          {videoUrl && (
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
              <span>✓</span>
              <span className="truncate">{videoUrl}</span>
              <button type="button" onClick={() => setVideoUrl('')} className="ml-auto text-red-500 hover:text-red-700">✕</button>
            </div>
          )}
        </div>
      </div>

      {/* Sana */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">📅 Nashr sanasi</label>
        <input type="datetime-local" value={publishedAt} onChange={e => setPublishedAt(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
        <p className="text-xs text-gray-500 mt-1">Bo&apos;sh qoldirilsa avtomatik sana qo&apos;yilmaydi</p>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button disabled={saving} className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition">
          {saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
        <button type="button" onClick={() => router.push(`/${locale || 'uz'}/admin/${redirectTo || 'news'}`)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition">
          Bekor qilish
        </button>
      </div>
    </form>
  )
}
