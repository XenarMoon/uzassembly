"use client"
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

export default function TeamForm({
  initial = {} as any,
  onSaved,
  redirectTo,
}: {
  initial?: any
  onSaved?: () => void
  redirectTo?: string
}) {
  const [nameUz, setNameUz] = useState(initial.nameUz || '')
  const [nameRu, setNameRu] = useState(initial.nameRu || '')
  const [nameEn, setNameEn] = useState(initial.nameEn || '')
  const [positionUz, setPositionUz] = useState(initial.positionUz || initial.position || '')
  const [positionRu, setPositionRu] = useState(initial.positionRu || '')
  const [positionEn, setPositionEn] = useState(initial.positionEn || '')
  const [bioUz, setBioUz] = useState(initial.bioUz || '')
  const [bioRu, setBioRu] = useState(initial.bioRu || '')
  const [bioEn, setBioEn] = useState(initial.bioEn || '')
  const [photoUrl, setPhotoUrl] = useState(initial.photoUrl || '')
  const [phone, setPhone] = useState(initial.phone || '')
  const [socialLink, setSocialLink] = useState(initial.socialLink || '')
  const [category, setCategory] = useState(initial.category || 'member')
  const [order, setOrder] = useState(initial.order || 0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'uz' | 'ru' | 'en'>('uz')

  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  async function uploadFile(file: File) {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/uploads', { method: 'POST', body: form })
    const data = await res.json()
    if (res.ok) setPhotoUrl(data.url)
    else setError('Rasm yuklashda xatolik')
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      nameUz, nameRu, nameEn,
      position: positionUz,
      positionUz, positionRu, positionEn,
      bioUz, bioRu, bioEn,
      photoUrl, phone, socialLink, category, order,
    }
    const method = initial.id ? 'PUT' : 'POST'
    const url = initial.id ? `/api/admin/team/${initial.id}` : '/api/admin/team'
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Saqlashda xatolik')
      if (onSaved) onSaved()
      else router.push(`/${locale || 'uz'}/admin/${redirectTo || 'team'}`)
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

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Toifa</label>
        <div className="flex gap-3">
          <label className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition ${
            category === 'member' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}>
            <input type="radio" name="category" value="member" checked={category === 'member'}
              onChange={() => setCategory('member')} className="sr-only" />
            <span>👥 Jamoa a&apos;zosi</span>
          </label>
          <label className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition ${
            category === 'advisor' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}>
            <input type="radio" name="category" value="advisor" checked={category === 'advisor'}
              onChange={() => setCategory('advisor')} className="sr-only" />
            <span>🌍 Chet ellik maslahatchi</span>
          </label>
        </div>
      </div>

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

      {/* Ism */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">F.I.SH (Ism Familiya)</label>
        {activeTab === 'uz' && <input placeholder="Ism (UZ)" value={nameUz} onChange={e => setNameUz(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />}
        {activeTab === 'ru' && <input placeholder="Имя (RU)" value={nameRu} onChange={e => setNameRu(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />}
        {activeTab === 'en' && <input placeholder="Name (EN)" value={nameEn} onChange={e => setNameEn(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />}
      </div>

      {/* Lavozim */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Lavozimi</label>
        {activeTab === 'uz' && <input placeholder="Lavozim (UZ)" value={positionUz} onChange={e => setPositionUz(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />}
        {activeTab === 'ru' && <input placeholder="Должность (RU)" value={positionRu} onChange={e => setPositionRu(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />}
        {activeTab === 'en' && <input placeholder="Position (EN)" value={positionEn} onChange={e => setPositionEn(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />}
      </div>

      {/* Biografiya */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tarjimai hol (Bio)</label>
        <div style={{ minHeight: '250px' }}>
          {activeTab === 'uz' && <ReactQuill theme="snow" value={bioUz} onChange={setBioUz} />}
          {activeTab === 'ru' && <ReactQuill theme="snow" value={bioRu} onChange={setBioRu} />}
          {activeTab === 'en' && <ReactQuill theme="snow" value={bioEn} onChange={setBioEn} />}
        </div>
      </div>

      {/* Rasm */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">📷 Rasm</label>
        <input type="file" accept="image/*" onChange={e => e.target.files && uploadFile(e.target.files[0])} className="text-sm" />
        {photoUrl && (
          <div className="mt-3 relative inline-block">
            <img src={photoUrl} className="max-w-xs rounded-lg" alt="photo" />
            <button type="button" onClick={() => setPhotoUrl('')} className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-red-600">✕</button>
          </div>
        )}
      </div>

      {/* Additional fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">📞 Telefon raqami (ixtiyoriy)</label>
          <input placeholder="+998 90 123 45 67" value={phone} onChange={e => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">🔗 Ijtimoiy tarmoq havolasi (ixtiyoriy)</label>
          <input placeholder="https://linkedin.com/in/..." value={socialLink} onChange={e => setSocialLink(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tartib raqami</label>
        <input type="number" placeholder="0" value={order} onChange={e => setOrder(Number(e.target.value))}
          className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
        <p className="text-xs text-gray-500 mt-1">Kichik raqam = birinchi chiqadi</p>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button disabled={saving} className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition">
          {saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
        <button type="button" onClick={() => router.push(`/${locale || 'uz'}/admin/${redirectTo || 'team'}`)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition">
          Bekor qilish
        </button>
      </div>
    </form>
  )
}
