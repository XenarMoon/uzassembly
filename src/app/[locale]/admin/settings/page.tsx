'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { uploadFile } from '@/lib/upload'

const SETTINGS_KEYS = [
  { key: 'logo', label: 'Sayt logotipi', type: 'image' },
  { key: 'logoEn', label: 'Logo (English version)', type: 'image' },
  { key: 'phone1', label: 'Telefon raqam 1', type: 'text', placeholder: '+998 77 736 55 60' },
  { key: 'phone2', label: 'Telefon raqam 2', type: 'text', placeholder: '+998 ...' },
  { key: 'email', label: 'Email manzil', type: 'text', placeholder: 'info@assembly.uz' },
  { key: 'address', label: 'Manzil', type: 'text', placeholder: 'Toshkent sh., ...' },
  { key: 'addressRu', label: 'Manzil (RU)', type: 'text', placeholder: 'г. Ташкент, ...' },
  { key: 'addressEn', label: 'Address (EN)', type: 'text', placeholder: 'Tashkent, ...' },
  { key: 'telegram', label: 'Telegram', type: 'text', placeholder: 'https://t.me/uzassembly' },
  { key: 'instagram', label: 'Instagram', type: 'text', placeholder: 'https://instagram.com/...' },
  { key: 'facebook', label: 'Facebook', type: 'text', placeholder: 'https://facebook.com/...' },
  { key: 'youtube', label: 'YouTube', type: 'text', placeholder: 'https://youtube.com/...' },
  { key: 'linkedin', label: 'LinkedIn', type: 'text', placeholder: 'https://linkedin.com/...' },
  { key: 'tiktok', label: 'TikTok', type: 'text', placeholder: 'https://tiktok.com/...' },
  { key: 'mapLat', label: 'Google Map - Kenglik (Latitude)', type: 'text', placeholder: '41.311081' },
  { key: 'mapLng', label: 'Google Map - Uzunlik (Longitude)', type: 'text', placeholder: '69.279737' },
  { key: 'mapZoom', label: 'Google Map - Zoom', type: 'text', placeholder: '15' },
]

export default function SettingsPage() {
  const params = useParams()
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.ok ? res.json() : {})
      .then(data => { setSettings(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleImageUpload = async (key: string, file: File) => {
    try {
      const url = await uploadFile(file)
      handleChange(key, url)
    } catch {
      setError('Rasm yuklashda xatolik')
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error('Saqlashda xatolik')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <main className="p-6 bg-gray-50 min-h-screen"><div className="text-gray-500">Yuklanmoqda...</div></main>

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Umumiy Sozlamalar</h1>
            <p className="text-sm text-gray-500">Sayt logotipi, aloqa ma&apos;lumotlari, ijtimoiy tarmoqlar</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition flex items-center gap-2"
          >
            {saving ? 'Saqlanmoqda...' : saved ? '✓ Saqlandi' : 'Saqlash'}
          </button>
        </div>

        {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm mb-4">{error}</div>}
        {saved && <div className="p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 text-sm mb-4">✓ Sozlamalar muvaffaqiyatli saqlandi</div>}

        <div className="space-y-6">
          {/* Logo Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📷 Logotiplar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SETTINGS_KEYS.filter(s => s.type === 'image').map(setting => (
                <div key={setting.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{setting.label}</label>
                  {settings[setting.key] && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg inline-block">
                      <img src={settings[setting.key]} alt={setting.label} className="h-16 object-contain" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => e.target.files && handleImageUpload(setting.key, e.target.files[0])}
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📞 Aloqa Ma&apos;lumotlari</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SETTINGS_KEYS.filter(s => ['phone1', 'phone2', 'email'].includes(s.key)).map(setting => (
                <div key={setting.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{setting.label}</label>
                  <input
                    type="text"
                    value={settings[setting.key] || ''}
                    onChange={e => handleChange(setting.key, e.target.value)}
                    placeholder={setting.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📍 Manzil</h2>
            <div className="space-y-3">
              {SETTINGS_KEYS.filter(s => s.key.startsWith('address')).map(setting => (
                <div key={setting.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{setting.label}</label>
                  <input
                    type="text"
                    value={settings[setting.key] || ''}
                    onChange={e => handleChange(setting.key, e.target.value)}
                    placeholder={setting.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🌐 Ijtimoiy Tarmoqlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SETTINGS_KEYS.filter(s => ['telegram', 'instagram', 'facebook', 'youtube', 'linkedin', 'tiktok'].includes(s.key)).map(setting => (
                <div key={setting.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{setting.label}</label>
                  <input
                    type="text"
                    value={settings[setting.key] || ''}
                    onChange={e => handleChange(setting.key, e.target.value)}
                    placeholder={setting.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Google Map */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🗺️ Google Map</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SETTINGS_KEYS.filter(s => s.key.startsWith('map')).map(setting => (
                <div key={setting.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{setting.label}</label>
                  <input
                    type="text"
                    value={settings[setting.key] || ''}
                    onChange={e => handleChange(setting.key, e.target.value)}
                    placeholder={setting.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
            {settings.mapLat && settings.mapLng && (
              <div className="mt-4">
                <iframe
                  src={`https://www.google.com/maps?q=${settings.mapLat},${settings.mapLng}&z=${settings.mapZoom || 15}&output=embed`}
                  className="w-full h-64 rounded-lg border"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Save */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition"
          >
            {saving ? 'Saqlanmoqda...' : 'Barcha o\'zgarishlarni saqlash'}
          </button>
        </div>
      </div>
    </main>
  )
}
