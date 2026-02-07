'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { uploadFile } from '@/lib/upload'

interface PartnerFormProps {
  initial?: any
  onSaved?: () => void
}

export default function PartnerForm({ initial, onSaved }: PartnerFormProps) {
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string
  const listPath = `/${locale || 'uz'}/admin/partners`
  const [data, setData] = useState({
    name: initial?.name || '',
    logo: initial?.logo || '',
    link: initial?.link || '',
    order: initial?.order ?? 0,
  })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>(initial?.logo || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const preview = URL.createObjectURL(file)
      setLogoPreview(preview)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')
    try {
      let logoUrl = data.logo
      if (logoFile) {
        logoUrl = await uploadFile(logoFile)
      }

      const method = initial?.id ? 'PUT' : 'POST'
      const url = initial?.id ? `/api/admin/partners/${initial.id}` : '/api/admin/partners'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, logo: logoUrl }),
      })

      if (!response.ok) throw new Error('Saqlashda xatolik')
      if (onSaved) onSaved()
      else router.push(listPath)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nomi</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Kompaniya nomi"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
        {logoPreview && (
          <img src={logoPreview} alt="preview" className="h-16 mb-3 rounded" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">🔗 Havola (ixtiyoriy)</label>
        <input
          type="text"
          value={data.link}
          onChange={(e) => setData(prev => ({ ...prev, link: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="https://partner-sayt.uz"
        />
        <p className="text-xs text-gray-500 mt-1">Agar havola qo&apos;yilsa, logotip ustiga bosganda shu saytga o&apos;tadi</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tartib raqami</label>
        <input
          type="number"
          value={data.order}
          onChange={(e) => setData(prev => ({ ...prev, order: Number(e.target.value) }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition"
        >
          {loading ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
        <button
          onClick={() => router.push(listPath)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition"
        >
          Bekor qilish
        </button>
      </div>
    </div>
  )
}
