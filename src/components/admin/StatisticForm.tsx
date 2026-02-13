'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { uploadFile } from '@/lib/upload'

const ICON_OPTIONS = [
  '📊', '💼', '👥', '🌍', '📈', '🚀', '⭐', '💡', '🎯', '📱',
  '🔧', '🏆', '✅', '💰', '🎨', '📝', '🌟', '🔗', '📞', '🎓'
]

interface StatisticFormProps {
  initial?: any
  onSaved?: () => void
}

export default function StatisticForm({ initial, onSaved }: StatisticFormProps) {
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string
  const listPath = `/${locale || 'uz'}/admin/statistics`

  const [data, setData] = useState({
    labelEn: initial?.labelEn || '',
    labelRu: initial?.labelRu || '',
    labelUz: initial?.labelUz || '',
    value: initial?.value || '',
    icon: initial?.icon || '📊',
    order: initial?.order ?? 0,
  })
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState<string>(initial?.icon || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIconFile(file)
      setIconPreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')
    try {
      const method = initial?.id ? 'PUT' : 'POST'
      const url = initial?.id ? `/api/admin/statistics/${initial.id}` : '/api/admin/statistics'

      let iconValue = data.icon
      if (iconFile) {
        iconValue = await uploadFile(iconFile)
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, icon: iconValue }),
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
        <div className="grid grid-cols-3 gap-3">
          {['Uz', 'Ru', 'En'].map((lang) => (
            <div key={lang}>
              <input
                type="text"
                value={data[`label${lang}` as keyof typeof data]}
                onChange={(e) => setData(prev => ({ ...prev, [`label${lang}`]: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={`Label (${lang})`}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Qiymati</label>
        <input
          type="text"
          value={data.value}
          onChange={(e) => setData(prev => ({ ...prev, value: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="500+"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
        {iconPreview && (
          <div className="mb-3 inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            {iconPreview.startsWith('http') || iconPreview.startsWith('/') ? (
              <img src={iconPreview} alt="icon preview" className="h-10 w-10 object-contain" />
            ) : (
              <span className="text-2xl">{iconPreview}</span>
            )}
            <span className="text-xs text-gray-400">Preview</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {ICON_OPTIONS.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => {
                setData(prev => ({ ...prev, icon }))
                setIconFile(null)
                setIconPreview(icon)
              }}
              className={`text-2xl p-2 rounded-lg border transition ${
                data.icon === icon ? 'bg-primary-50 border-primary-600 ring-2 ring-primary-200' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              {icon}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 cursor-pointer mb-3">
          <span className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors">
            Icon yuklash
          </span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
            onChange={handleIconChange}
            className="hidden"
          />
          <span className="text-xs text-gray-400">PNG, JPG, SVG, WebP</span>
        </label>

        <input
          type="text"
          value={data.icon}
          onChange={(e) => {
            setData(prev => ({ ...prev, icon: e.target.value }))
            setIconFile(null)
            setIconPreview(e.target.value)
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Yoki boshqa emoji/matn kiriting"
        />
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
