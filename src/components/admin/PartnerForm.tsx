'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { uploadFile } from '@/lib/upload'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

interface PartnerFormProps {
  initial?: any
  onSaved?: () => void
}

export default function PartnerForm({ initial, onSaved }: PartnerFormProps) {
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string
  const listPath = `/${locale || 'uz'}/admin/partners`
  const { t } = useAdminTranslations()
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
    if (!data.name.trim()) {
      setError(t('partners', 'nameRequired'))
      return
    }
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

      if (!response.ok) throw new Error(t('partners', 'saveError'))
      if (onSaved) onSaved()
      else router.push(listPath)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('partners', 'saveError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3.5 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c-.866 1.5.217 3.374 1.948 3.374H1.749c1.73 0 2.813-1.874 1.948-3.374L10.051 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('partners', 'name')} <span className="text-red-400">*</span></label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#005E85]/20 focus:border-[#005E85] transition-all outline-none"
          placeholder={t('partners', 'namePlaceholder')}
        />
      </div>

      {/* Logo */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('partners', 'logo')}</label>
        {logoPreview && (
          <div className="mb-3 p-3 bg-gray-50 rounded-xl inline-block">
            <img src={logoPreview} alt="preview" className="h-16 max-w-[200px] object-contain rounded-lg" />
          </div>
        )}
        <label className="flex items-center gap-3 cursor-pointer">
          <span className="px-4 py-2 bg-[#005E85]/10 text-[#005E85] rounded-xl text-sm font-medium hover:bg-[#005E85]/20 transition-colors">
            {logoPreview ? t('partners', 'changeLogo') : t('partners', 'uploadLogo')}
          </span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleLogoChange}
            className="hidden"
          />
          <span className="text-xs text-gray-400">PNG, JPG, WebP</span>
        </label>
      </div>

      {/* Link */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            {t('partners', 'link')}
            <span className="text-xs text-gray-400 font-normal">({t('partners', 'optional')})</span>
          </span>
        </label>
        <input
          type="url"
          value={data.link}
          onChange={(e) => setData(prev => ({ ...prev, link: e.target.value }))}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#005E85]/20 focus:border-[#005E85] transition-all outline-none"
          placeholder="https://partner-sayt.uz"
        />
        <p className="text-xs text-gray-400 mt-1.5">{t('partners', 'linkHint')}</p>
      </div>

      {/* Order */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('partners', 'order')}</label>
        <input
          type="number"
          value={data.order}
          onChange={(e) => setData(prev => ({ ...prev, order: Number(e.target.value) }))}
          className="w-32 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#005E85]/20 focus:border-[#005E85] transition-all outline-none"
          min={0}
        />
        <p className="text-xs text-gray-400 mt-1.5">{t('partners', 'orderHint')}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2"
        >
          {loading && (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {loading ? t('partners', 'saving') : t('partners', 'save')}
        </button>
        <button
          onClick={() => router.push(listPath)}
          className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          {t('common', 'cancel')}
        </button>
      </div>
    </div>
  )
}
