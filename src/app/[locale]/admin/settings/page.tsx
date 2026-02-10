'use client'

import { useState, useEffect, useRef } from 'react'
import { uploadFile } from '@/lib/upload'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

/* ─── SVG Section Icons ─── */
const SectionIcon = ({ d, color = '#005E85' }: { d: string; color?: string }) => (
  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}14` }}>
    <svg className="w-5 h-5" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  </div>
)

/* ─── Social platform metadata ─── */
const socialPlatforms = [
  { key: 'telegram', label: 'Telegram', placeholder: 'https://t.me/uzassembly', color: '#0088cc',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.97 1.25-5.56 3.67-.53.36-1 .54-1.42.53-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.44 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .37z' },
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...', color: '#E4405F',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...', color: '#1877F2',
    icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...', color: '#FF0000',
    icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/...', color: '#0A66C2',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/...', color: '#000000',
    icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState<string | null>(null)
  const { t } = useAdminTranslations()
  const logoInputRef = useRef<HTMLInputElement>(null)
  const logoEnInputRef = useRef<HTMLInputElement>(null)

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
    setUploading(key)
    try {
      const url = await uploadFile(file)
      handleChange(key, url)
    } catch {
      setError(t('settings', 'imageUploadError'))
    } finally {
      setUploading(null)
    }
  }

  const handleRemoveImage = (key: string) => {
    handleChange(key, '')
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
      if (!res.ok) throw new Error(t('settings', 'saveError'))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common', 'error'))
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#005E85]/20 focus:border-[#005E85] outline-none transition-all bg-white placeholder:text-gray-300'

  if (loading) {
    return (
      <main className="p-6 md:p-8 min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="font-medium">{t('common', 'loading')}</span>
        </div>
      </main>
    )
  }

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('settings', 'title')}</h1>
            <p className="text-sm text-gray-400 mt-1">{t('settings', 'subtitle')}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 shrink-0 ${
              saved
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] text-white'
            } disabled:opacity-50`}
          >
            {saving ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                {t('common', 'saving')}
              </>
            ) : saved ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {t('settings', 'saved')}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {t('common', 'save')}
              </>
            )}
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm mb-6 font-medium flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            {error}
          </div>
        )}
        {saved && (
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 text-sm mb-6 font-medium flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {t('settings', 'savedSuccess')}
          </div>
        )}

        <div className="space-y-6">

          {/* ──────── 1. LOGO ──────── */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <SectionIcon d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">{t('settings', 'logos')}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{t('settings', 'logosDesc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Logo */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{t('settings', 'siteLogo')}</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#005E85]/30 transition-colors relative group">
                  {uploading === 'logo' ? (
                    <div className="flex flex-col items-center gap-2 py-4">
                      <svg className="animate-spin w-8 h-8 text-[#005E85]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      <span className="text-sm text-gray-400">{t('settings', 'uploading')}</span>
                    </div>
                  ) : settings.logo ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-gray-50 rounded-xl p-4 inline-block">
                        <img src={settings.logo} alt="Logo" className="h-16 max-w-[200px] object-contain" />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => logoInputRef.current?.click()} className="text-xs text-[#005E85] hover:underline font-medium">{t('settings', 'change')}</button>
                        <span className="text-gray-200">|</span>
                        <button onClick={() => handleRemoveImage('logo')} className="text-xs text-red-400 hover:underline font-medium">{t('settings', 'remove')}</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => logoInputRef.current?.click()} className="flex flex-col items-center gap-2 py-4 w-full">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">{t('settings', 'uploadLogo')}</span>
                      <span className="text-[11px] text-gray-300">PNG, SVG, JPG</span>
                    </button>
                  )}
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files && handleImageUpload('logo', e.target.files[0])} />
                </div>
              </div>
              {/* English Logo */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{t('settings', 'logoEn')}</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#005E85]/30 transition-colors relative group">
                  {uploading === 'logoEn' ? (
                    <div className="flex flex-col items-center gap-2 py-4">
                      <svg className="animate-spin w-8 h-8 text-[#005E85]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      <span className="text-sm text-gray-400">{t('settings', 'uploading')}</span>
                    </div>
                  ) : settings.logoEn ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-gray-50 rounded-xl p-4 inline-block">
                        <img src={settings.logoEn} alt="Logo EN" className="h-16 max-w-[200px] object-contain" />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => logoEnInputRef.current?.click()} className="text-xs text-[#005E85] hover:underline font-medium">{t('settings', 'change')}</button>
                        <span className="text-gray-200">|</span>
                        <button onClick={() => handleRemoveImage('logoEn')} className="text-xs text-red-400 hover:underline font-medium">{t('settings', 'remove')}</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => logoEnInputRef.current?.click()} className="flex flex-col items-center gap-2 py-4 w-full">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">{t('settings', 'uploadLogo')}</span>
                      <span className="text-[11px] text-gray-300">PNG, SVG, JPG</span>
                    </button>
                  )}
                  <input ref={logoEnInputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files && handleImageUpload('logoEn', e.target.files[0])} />
                </div>
              </div>
            </div>
          </section>

          {/* ──────── 2. PHONE NUMBERS ──────── */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <SectionIcon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">{t('settings', 'contactInfo')}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{t('settings', 'contactDesc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t('settings', 'phone1')}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </span>
                  <input type="text" value={settings.phone1 || ''} onChange={e => handleChange('phone1', e.target.value)} placeholder="+998 77 736 55 60" className={`${inputClass} pl-11`} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t('settings', 'phone2')}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </span>
                  <input type="text" value={settings.phone2 || ''} onChange={e => handleChange('phone2', e.target.value)} placeholder="+998 ..." className={`${inputClass} pl-11`} />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t('settings', 'emailAddress')}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </span>
                  <input type="email" value={settings.email || ''} onChange={e => handleChange('email', e.target.value)} placeholder="info@assembly.uz" className={`${inputClass} pl-11`} />
                </div>
              </div>
            </div>
          </section>

          {/* ──────── 3. ADDRESS ──────── */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <SectionIcon d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">{t('settings', 'address')}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{t('settings', 'addressDesc')}</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'address', label: t('settings', 'addressUz'), placeholder: "Toshkent sh., ...", flag: "🇺🇿" },
                { key: 'addressRu', label: t('settings', 'addressRu'), placeholder: "г. Ташкент, ...", flag: "🇷🇺" },
                { key: 'addressEn', label: t('settings', 'addressEn'), placeholder: "Tashkent, ...", flag: "🇬🇧" },
              ].map(item => (
                <div key={item.key}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <span>{item.flag}</span> {item.label}
                  </label>
                  <input type="text" value={settings[item.key] || ''} onChange={e => handleChange(item.key, e.target.value)} placeholder={item.placeholder} className={inputClass} />
                </div>
              ))}
            </div>
          </section>

          {/* ──────── 4. SOCIAL MEDIA ──────── */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <SectionIcon d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">{t('settings', 'socialMedia')}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{t('settings', 'socialDesc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialPlatforms.map(platform => (
                <div key={platform.key}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{platform.label}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: platform.color }}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={platform.icon} /></svg>
                    </span>
                    <input
                      type="url"
                      value={settings[platform.key] || ''}
                      onChange={e => handleChange(platform.key, e.target.value)}
                      placeholder={platform.placeholder}
                      className={`${inputClass} pl-11`}
                    />
                    {settings[platform.key] && (
                      <a href={settings[platform.key]} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#005E85] transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ──────── 5. GOOGLE MAP ──────── */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <SectionIcon d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" color="#34A853" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">Google Map</h2>
                <p className="text-xs text-gray-400 mt-0.5">{t('settings', 'mapDesc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t('settings', 'mapLat')}</label>
                <input type="text" value={settings.mapLat || ''} onChange={e => handleChange('mapLat', e.target.value)} placeholder="41.311081" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t('settings', 'mapLng')}</label>
                <input type="text" value={settings.mapLng || ''} onChange={e => handleChange('mapLng', e.target.value)} placeholder="69.279737" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t('settings', 'mapZoom')}</label>
                <input type="text" value={settings.mapZoom || ''} onChange={e => handleChange('mapZoom', e.target.value)} placeholder="15" className={inputClass} />
              </div>
            </div>
            {settings.mapLat && settings.mapLng && (
              <div className="mt-5 rounded-xl overflow-hidden border border-gray-100">
                <iframe
                  src={`https://www.google.com/maps?q=${settings.mapLat},${settings.mapLng}&z=${settings.mapZoom || 15}&output=embed`}
                  className="w-full h-72"
                  loading="lazy"
                />
              </div>
            )}
          </section>
        </div>

        {/* ──────── Bottom Save ──────── */}
        <div className="mt-8 pb-4 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 ${
              saved
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] text-white'
            } disabled:opacity-50`}
          >
            {saving ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                {t('common', 'saving')}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {t('settings', 'saveAll')}
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  )
}
