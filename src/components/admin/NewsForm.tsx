'use client'

import { useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

/* ─── SVG Icons ─── */
const LangIcon = ({ flag }: { flag: string }) => <span className="text-base">{flag}</span>

const SectionIcon = ({ d, color = '#005E85' }: { d: string; color?: string }) => (
  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}14` }}>
    <svg className="w-4.5 h-4.5" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  </div>
)

export default function NewsForm({
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

  // ─── State ───
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
  const [videoType, setVideoType] = useState<'link' | 'upload'>('link')
  const [publishedAt, setPublishedAt] = useState(
    initial.publishedAt ? new Date(initial.publishedAt).toISOString().slice(0, 16) : ''
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'uz' | 'ru' | 'en'>('uz')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)

  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#005E85]/20 focus:border-[#005E85] outline-none transition-all bg-white placeholder:text-gray-300'

  // ─── Handlers ───
  async function handleImageUpload(file: File) {
    setUploadingImage(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/admin/uploads', { method: 'POST', body: form })
      const data = await res.json()
      if (res.ok) setImageUrl(data.url)
      else setError(t('news', 'imageError'))
    } catch { setError(t('news', 'imageError')) }
    finally { setUploadingImage(false) }
  }

  async function handleVideoUpload(file: File) {
    setUploadingVideo(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/admin/uploads', { method: 'POST', body: form })
      const data = await res.json()
      if (res.ok) setVideoUrl(data.url)
      else setError(t('news', 'videoError'))
    } catch { setError(t('news', 'videoError')) }
    finally { setUploadingVideo(false) }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)

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
      if (!res.ok) throw new Error(t('common', 'error'))
      setSaved(true)
      setTimeout(() => {
        if (onSaved) onSaved()
        else router.push(`/${locale || 'uz'}/admin/${redirectTo || 'news'}`)
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

  // Check if each language has content
  const hasContent = (lang: 'uz' | 'ru' | 'en') => {
    const title = lang === 'uz' ? titleUz : lang === 'ru' ? titleRu : titleEn
    return title.trim().length > 0
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

      {/* ──────── LANGUAGE TABS ──────── */}
      <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <LangIcon flag={tab.flag} />
            {tab.label}
            {hasContent(tab.key) && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>
        ))}
      </div>

      {/* ──────── 1. TITLE (3 langs) ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('news', 'formTitle')}</h3>
            <p className="text-xs text-gray-400">{t('news', 'formTitleDesc')}</p>
          </div>
        </div>

        {activeTab === 'uz' && (
          <input value={titleUz} onChange={e => setTitleUz(e.target.value)} placeholder={t('news', 'titlePlaceholderUz')} className={inputClass} required />
        )}
        {activeTab === 'ru' && (
          <input value={titleRu} onChange={e => setTitleRu(e.target.value)} placeholder={t('news', 'titlePlaceholderRu')} className={inputClass} />
        )}
        {activeTab === 'en' && (
          <input value={titleEn} onChange={e => setTitleEn(e.target.value)} placeholder={t('news', 'titlePlaceholderEn')} className={inputClass} />
        )}
      </section>

      {/* ──────── 2. SUMMARY (3 langs) ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M4 6h16M4 12h16M4 18h7" color="#3E9EEE" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('news', 'formSummary')}</h3>
            <p className="text-xs text-gray-400">{t('news', 'formSummaryDesc')}</p>
          </div>
        </div>

        {activeTab === 'uz' && (
          <textarea value={summaryUz} onChange={e => setSummaryUz(e.target.value)} placeholder={t('news', 'summaryPlaceholderUz')} rows={3} className={inputClass} />
        )}
        {activeTab === 'ru' && (
          <textarea value={summaryRu} onChange={e => setSummaryRu(e.target.value)} placeholder={t('news', 'summaryPlaceholderRu')} rows={3} className={inputClass} />
        )}
        {activeTab === 'en' && (
          <textarea value={summaryEn} onChange={e => setSummaryEn(e.target.value)} placeholder={t('news', 'summaryPlaceholderEn')} rows={3} className={inputClass} />
        )}
      </section>

      {/* ──────── 3. FULL TEXT / WYSIWYG (3 langs) ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" color="#F27A21" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('news', 'formContent')}</h3>
            <p className="text-xs text-gray-400">{t('news', 'formContentDesc')}</p>
          </div>
        </div>

        <div className="min-h-[320px] [&_.ql-toolbar]:rounded-t-xl [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:rounded-b-xl [&_.ql-container]:border-gray-200 [&_.ql-editor]:min-h-[250px] [&_.ql-editor]:text-sm">
          {activeTab === 'uz' && <ReactQuill value={contentUz} onChange={setContentUz} theme="snow" placeholder={t('news', 'contentPlaceholderUz')} />}
          {activeTab === 'ru' && <ReactQuill value={contentRu} onChange={setContentRu} theme="snow" placeholder={t('news', 'contentPlaceholderRu')} />}
          {activeTab === 'en' && <ReactQuill value={contentEn} onChange={setContentEn} theme="snow" placeholder={t('news', 'contentPlaceholderEn')} />}
        </div>
      </section>

      {/* ──────── 4. THUMBNAIL IMAGE ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" color="#10B981" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('news', 'formImage')}</h3>
            <p className="text-xs text-gray-400">{t('news', 'formImageDesc')}</p>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#005E85]/30 transition-colors">
          {uploadingImage ? (
            <div className="flex flex-col items-center gap-2 py-6">
              <svg className="animate-spin w-8 h-8 text-[#005E85]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              <span className="text-sm text-gray-400">{t('news', 'uploading')}</span>
            </div>
          ) : imageUrl ? (
            <div className="flex flex-col items-center gap-3">
              <div className="relative inline-block">
                <img src={imageUrl} alt="Thumbnail" className="max-h-48 rounded-xl object-cover" />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => imageInputRef.current?.click()} className="text-xs text-[#005E85] hover:underline font-medium">{t('news', 'changeImage')}</button>
                <span className="text-gray-200">|</span>
                <button type="button" onClick={() => setImageUrl('')} className="text-xs text-red-400 hover:underline font-medium">{t('news', 'removeImage')}</button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => imageInputRef.current?.click()} className="flex flex-col items-center gap-2 py-6 w-full">
              <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <span className="text-sm text-gray-500 font-medium">{t('news', 'uploadImage')}</span>
              <span className="text-[11px] text-gray-300">PNG, JPG, WebP — max 5MB</span>
            </button>
          )}
          <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files && handleImageUpload(e.target.files[0])} />
        </div>
      </section>

      {/* ──────── 5. VIDEO ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" color="#8B5CF6" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('news', 'formVideo')}</h3>
            <p className="text-xs text-gray-400">{t('news', 'formVideoDesc')}</p>
          </div>
        </div>

        {/* Toggle: Link vs Upload */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit mb-5">
          <button type="button" onClick={() => setVideoType('link')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              videoType === 'link' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              {t('news', 'videoLink')}
            </span>
          </button>
          <button type="button" onClick={() => setVideoType('upload')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              videoType === 'upload' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              {t('news', 'videoUpload')}
            </span>
          </button>
        </div>

        {videoType === 'link' ? (
          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </span>
              <input
                type="text"
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... yoki https://t.me/..."
                className={`${inputClass} pl-11`}
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-2">{t('news', 'videoLinkHint')}</p>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-violet-300 transition-colors">
            {uploadingVideo ? (
              <div className="flex flex-col items-center gap-2 py-4">
                <svg className="animate-spin w-8 h-8 text-violet-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                <span className="text-sm text-gray-400">{t('news', 'uploading')}</span>
              </div>
            ) : (
              <button type="button" onClick={() => videoInputRef.current?.click()} className="flex flex-col items-center gap-2 py-4 w-full">
                <div className="w-14 h-14 rounded-xl bg-violet-50 flex items-center justify-center">
                  <svg className="w-7 h-7 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-sm text-gray-500 font-medium">{t('news', 'uploadVideoFile')}</span>
                <span className="text-[11px] text-gray-300">MP4, WebM, MOV</span>
              </button>
            )}
            <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={e => e.target.files && handleVideoUpload(e.target.files[0])} />
          </div>
        )}

        {/* Current video preview */}
        {videoUrl && (
          <div className="flex items-center gap-3 mt-4 p-3 bg-violet-50 rounded-xl border border-violet-100">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-sm text-violet-700 truncate flex-1">{videoUrl}</span>
            <button type="button" onClick={() => setVideoUrl('')} className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
      </section>

      {/* ──────── 6. DATE ──────── */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <SectionIcon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" color="#EF4444" />
          <div>
            <h3 className="text-base font-bold text-gray-900">{t('news', 'formDate')}</h3>
            <p className="text-xs text-gray-400">{t('news', 'formDateDesc')}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <input
            type="datetime-local"
            value={publishedAt}
            onChange={e => setPublishedAt(e.target.value)}
            className={`${inputClass} max-w-xs`}
          />
          {!publishedAt && (
            <button
              type="button"
              onClick={() => setPublishedAt(new Date().toISOString().slice(0, 16))}
              className="text-sm text-[#005E85] hover:underline font-medium"
            >
              {t('news', 'setNow')}
            </button>
          )}
          {publishedAt && (
            <button
              type="button"
              onClick={() => setPublishedAt('')}
              className="text-sm text-red-400 hover:underline font-medium"
            >
              {t('news', 'clearDate')}
            </button>
          )}
        </div>
      </section>

      {/* ──────── SAVE / CANCEL ──────── */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push(`/${locale || 'uz'}/admin/${redirectTo || 'news'}`)}
          className="px-6 py-2.5 rounded-xl font-medium text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
        >
          {t('common', 'cancel')}
        </button>
        <button
          type="submit"
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
          ) : saved ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {t('common', 'saved')}
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {t('common', 'save')}
            </>
          )}
        </button>
      </div>
    </form>
  )
}
