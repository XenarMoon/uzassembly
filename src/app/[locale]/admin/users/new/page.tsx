"use client"
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

export default function NewUserPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string || 'uz'
  const { t } = useAdminTranslations()

  const inputClass = 'w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#005E85]/20 focus:border-[#005E85] outline-none transition-all bg-gray-50/50 placeholder:text-gray-300'

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError(t('users', 'fillRequired')); return }
    if (password.length < 6) { setError(t('users', 'minChars')); return }
    setSaving(true); setError('')
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    })
    if (res.ok) {
      router.push(`/${locale}/admin/users`)
    } else {
      const err = await res.json().catch(() => ({}))
      if (err.error === 'emailTaken') setError(t('users', 'emailTaken'))
      else if (err.error === 'shortPassword') setError(t('users', 'minChars'))
      else setError(t('common', 'error'))
    }
    setSaving(false)
  }

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button onClick={() => router.push(`/${locale}/admin/users`)} className="hover:text-[#005E85] transition-colors">{t('users', 'title')}</button>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-600 font-medium">{t('users', 'addNew')}</span>
        </div>

        <form onSubmit={submit}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#005E85]/10 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-[#005E85]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">{t('users', 'addNew')}</h1>
                <p className="text-xs text-gray-400">{t('users', 'addDesc')}</p>
              </div>
            </div>

            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('users', 'email')}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                  </span>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={`${inputClass} pl-10`} placeholder="admin@example.com" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('users', 'password')}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </span>
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    className={`${inputClass} pl-10 pr-10`} placeholder={t('users', 'minChars')} required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                    {showPass ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('users', 'role')}</label>
                <select value={role} onChange={e => setRole(e.target.value)} className={inputClass}>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6">
            <button type="button" onClick={() => router.push(`/${locale}/admin/users`)}
              className="px-6 py-2.5 rounded-xl font-medium text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all">
              {t('common', 'cancel')}
            </button>
            <button type="submit" disabled={saving}
              className="bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-50">
              {saving && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {saving ? t('common', 'saving') : t('common', 'save')}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
