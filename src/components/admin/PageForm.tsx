'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { uploadFile } from '@/lib/upload'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

interface PageFormProps {
  initial?: any
  onSaved?: () => void
}

export default function PageForm({ initial, onSaved }: PageFormProps) {
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string
  const listPath = `/${locale || 'uz'}/admin/pages`

  const [data, setData] = useState({
    slug: initial?.slug || '',
    titleEn: initial?.titleEn || '',
    titleRu: initial?.titleRu || '',
    titleUz: initial?.titleUz || '',
    contentEn: initial?.contentEn || '',
    contentRu: initial?.contentRu || '',
    contentUz: initial?.contentUz || '',
    bannerImage: initial?.bannerImage || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const handleBannerUpload = async (file: File) => {
    try {
      const url = await uploadFile(file)
      handleChange('bannerImage', url)
    } catch {
      setError('Rasm yuklashda xatolik')
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')
    try {
      const method = initial?.id ? 'PUT' : 'POST'
      const url = initial?.id ? `/api/admin/pages/${initial.id}` : '/api/admin/pages'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
        <input
          type="text"
          value={data.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="masalan: about-us"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sarlavhalar</label>
        <div className="grid grid-cols-3 gap-3">
          {['Uz', 'Ru', 'En'].map((lang) => (
            <input
              key={lang}
              type="text"
              value={data[`title${lang}` as keyof typeof data]}
              onChange={(e) => handleChange(`title${lang}`, e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={`Sarlavha (${lang})`}
            />
          ))}
        </div>
      </div>

      {['Uz', 'Ru', 'En'].map((lang) => (
        <div key={lang}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Matn ({lang})</label>
          <ReactQuill
            value={data[`content${lang}` as keyof typeof data]}
            onChange={(value: string) => handleChange(`content${lang}`, value)}
            theme="snow"
            style={{ height: '250px', marginBottom: '50px' }}
          />
        </div>
      ))}

      {/* Banner Image */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">🖼️ Banner Rasmi</label>
        <input type="file" accept="image/*" onChange={e => e.target.files && handleBannerUpload(e.target.files[0])} className="text-sm" />
        {data.bannerImage && (
          <div className="mt-3 relative inline-block">
            <img src={data.bannerImage} className="max-w-md rounded-lg" alt="banner" />
            <button type="button" onClick={() => handleChange('bannerImage', '')}
              className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-red-600">✕</button>
          </div>
        )}
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
