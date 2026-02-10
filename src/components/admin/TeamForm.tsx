'use client'

import { useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const LangIcon = ({ flag }: { flag: string }) => <span className="text-base">{flag}</span>

const SectionIcon = ({ d, color = '#005E85' }: { d: string; color?: string }) => (
  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}14` }}>
    <svg className="w-4.5 h-4.5" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  </div>
)

export default function TeamForm({
  initial = {} as any,
  onSaved,
  redirectTo,
}: {
  initial?: any
  onSaved?: () => void
  redirectTo?: string
}) {
  const { t } = useAdminTranslations()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

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
  const [order, setOrder] = useState(initial.order ?? 0)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'uz' | 'ru' | 'en'>('uz')
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  const photoInputRef = useRef<HTMLInputElement>(null)

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#005E85]/20 focus:border-[#005E85] outline-none transition-all bg-white placeholder:text-gray-300'

  async function handlePhotoUpload(file: File) {
    setUploadingPhoto(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/admin/uploads', { method: 'POST', body: form })
      const data = await res.json()
      if (res.ok) setPhotoUrl(data.url)
      else setError(t('team', 'photoError'))
    } catch { setError(t('team', 'photoError')) }
    finally { setUploadingPhoto(false) }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)

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
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(t('common', 'error'))
      setSaved(true)
      setTimeout(() => {
        if (onSaved) onSaved()
        else router.push(`/${locale || 'uz'}/admin/${redirectTo || 'team'}`)
      }, 600)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common', 'error'))
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { key: 'uz' as const, label: "O'zbekcha", flag: '🇺🇿' },
    { key: 'ru' as const, label: 'Русский', flag: '🇷🇺' },
    { key: 'en' as const, label: 'English', flag: '🇬🇧' },
  ]

  const hasContent = (lang: 'uz' | 'ru' | 'en') => {
    const name = lang === 'uz' ? nameUz : lang === 'ru' ? nameRu : nameEn
    return name.trim().length > 0
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Alerts */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          {error}
        </div>
      )}
      {saved && (
        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {t('common', 'saved')}
        </div>
      )}

      {/* ──────── CATEGORY ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" color="#8B5CF6" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('team', 'formCategory')}</h3>
            <p className="text-xs text-gray-400">{t('team', 'formCategoryDesc')}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => setCategory('member')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
              category === 'member'
                ? 'bg-[#005E85]/5 border-[#005E85] text-[#005E85]'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {t('team', 'categoryMember')}
          </button>
          <button type="button" onClick={() => setCategory('advisor')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
              category === 'advisor'
                ? 'bg-sky-50 border-sky-500 text-sky-600'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {t('team', 'categoryAdvisor')}
          </button>
        </div>
      </section>

      {/* ──────── LANGUAGE TABS ──────── */}
      <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl w-fit">
        {tabs.map(tab => (
          <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}>
            <LangIcon flag={tab.flag} />
            {tab.label}
            {hasContent(tab.key) && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
          </button>
        ))}
      </div>

      {/* ──────── 1. NAME (3 langs) ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('team', 'formName')}</h3>
            <p className="text-xs text-gray-400">{t('team', 'formNameDesc')}</p>
          </div>
        </div>
        {activeTab === 'uz' && <input value={nameUz} onChange={e => setNameUz(e.target.value)} placeholder={t('team', 'namePlaceholderUz')} className={inputClass} required />}
        {activeTab === 'ru' && <input value={nameRu} onChange={e => setNameRu(e.target.value)} placeholder={t('team', 'namePlaceholderRu')} className={inputClass} />}
        {activeTab === 'en' && <input value={nameEn} onChange={e => setNameEn(e.target.value)} placeholder={t('team', 'namePlaceholderEn')} className={inputClass} />}
      </section>

      {/* ──────── 2. POSITION (3 langs) ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" color="#3E9EEE" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('team', 'formPosition')}</h3>
            <p className="text-xs text-gray-400">{t('team', 'formPositionDesc')}</p>
          </div>
        </div>
        {activeTab === 'uz' && <input value={positionUz} onChange={e => setPositionUz(e.target.value)} placeholder={t('team', 'positionPlaceholderUz')} className={inputClass} />}
        {activeTab === 'ru' && <input value={positionRu} onChange={e => setPositionRu(e.target.value)} placeholder={t('team', 'positionPlaceholderRu')} className={inputClass} />}
        {activeTab === 'en' && <input value={positionEn} onChange={e => setPositionEn(e.target.value)} placeholder={t('team', 'positionPlaceholderEn')} className={inputClass} />}
      </section>

      {/* ──────── 3. BIO / WYSIWYG (3 langs) ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" color="#F27A21" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('team', 'formBio')}</h3>
            <p className="text-xs text-gray-400">{t('team', 'formBioDesc')}</p>
          </div>
        </div>
        <div className="min-h-[280px] [&_.ql-toolbar]:rounded-t-xl [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:rounded-b-xl [&_.ql-container]:border-gray-200 [&_.ql-editor]:min-h-[200px] [&_.ql-editor]:text-sm">
          {activeTab === 'uz' && <ReactQuill value={bioUz} onChange={setBioUz} theme="snow" placeholder={t('team', 'bioPlaceholderUz')} />}
          {activeTab === 'ru' && <ReactQuill value={bioRu} onChange={setBioRu} theme="snow" placeholder={t('team', 'bioPlaceholderRu')} />}
          {activeTab === 'en' && <ReactQuill value={bioEn} onChange={setBioEn} theme="snow" placeholder={t('team', 'bioPlaceholderEn')} />}
        </div>
      </section>

      {/* ──────── 4. PHOTO ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" color="#10B981" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('team', 'formPhoto')}</h3>
            <p className="text-xs text-gray-400">{t('team', 'formPhotoDesc')}</p>
          </div>
        </div>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#005E85]/30 transition-colors">
          {uploadingPhoto ? (
            <div className="flex flex-col items-center gap-2 py-6">
              <svg className="animate-spin w-8 h-8 text-[#005E85]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              <span className="text-sm text-gray-400">{t('team', 'uploading')}</span>
            </div>
          ) : photoUrl ? (
            <div className="flex flex-col items-center gap-3">
              <img src={photoUrl} alt="Photo" className="w-32 h-32 rounded-2xl object-cover" />
              <div className="flex gap-2">
                <button type="button" onClick={() => photoInputRef.current?.click()} className="text-xs text-[#005E85] hover:underline font-medium">{t('team', 'changePhoto')}</button>
                <span className="text-gray-200">|</span>
                <button type="button" onClick={() => setPhotoUrl('')} className="text-xs text-red-400 hover:underline font-medium">{t('team', 'removePhoto')}</button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => photoInputRef.current?.click()} className="flex flex-col items-center gap-2 py-6 w-full">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <span className="text-sm text-gray-500 font-medium">{t('team', 'uploadPhoto')}</span>
              <span className="text-[11px] text-gray-300">PNG, JPG, WebP — max 5MB</span>
            </button>
          )}
          <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files && handlePhotoUpload(e.target.files[0])} />
        </div>
      </section>

      {/* ──────── 5. CONTACT INFO ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" color="#EF4444" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('team', 'formContact')}</h3>
            <p className="text-xs text-gray-400">{t('team', 'formContactDesc')}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('team', 'phoneLabel')}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </span>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+998 90 123 45 67" className={`${inputClass} pl-11`} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('team', 'socialLabel')}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </span>
              <input value={socialLink} onChange={e => setSocialLink(e.target.value)} placeholder="https://linkedin.com/in/..." className={`${inputClass} pl-11`} />
            </div>
          </div>
        </div>
      </section>

      {/* ──────── 6. ORDER ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M4 6h16M4 10h16M4 14h16M4 18h16" color="#6366F1" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('team', 'formOrder')}</h3>
            <p className="text-xs text-gray-400">{t('team', 'formOrderDesc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={order}
            onChange={e => setOrder(Number(e.target.value))}
            min={0}
            className={`${inputClass} max-w-[120px] text-center text-lg font-semibold`}
          />
          <span className="text-xs text-gray-400">{t('team', 'orderHint')}</span>
        </div>
      </section>

      {/* ──────── SAVE / CANCEL ──────── */}
      <div className="flex items-center justify-between pt-2">
        <button type="button" onClick={() => router.push(`/${locale || 'uz'}/admin/${redirectTo || 'team'}`)}
          className="px-6 py-2.5 rounded-xl font-medium text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all">
          {t('common', 'cancel')}
        </button>
        <button type="submit" disabled={saving}
          className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 ${
            saved ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] text-white'
          } disabled:opacity-50`}>
          {saving ? (
            <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>{t('common', 'saving')}</>
          ) : saved ? (
            <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>{t('common', 'saved')}</>
          ) : (
            <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>{t('common', 'save')}</>
          )}
        </button>
      </div>
    </form>
  )
}
