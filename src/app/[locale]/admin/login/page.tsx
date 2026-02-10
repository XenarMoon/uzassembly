'use client'
import { useState, useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRouter, usePathname } from '@/lib/navigation'
import { locales, localeFlags, type Locale } from '@/i18n/config'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const locale = (params.locale as string) || 'uz'
  const router = useRouter()
  const pathname = usePathname()
  const { t, tRoot } = useAdminTranslations()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLocale = (loc: Locale) => {
    router.replace(pathname, { locale: loc })
    setLangOpen(false)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!email.trim()) {
      setError(t('login', 'emailRequired'))
      setLoading(false)
      return
    }
    if (!password.trim()) {
      setError(t('login', 'passwordRequired'))
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: 'include',
      })

      const data = await res.json()
      
      if (!res.ok) {
        setError(data.error || t('login', 'loginFailed'))
        setLoading(false)
        return
      }

      window.location.href = `/${locale || 'uz'}/admin`
    } catch (err) {
      console.error('Login error:', err)
      setError(t('login', 'serverError'))
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001A25] via-[#005E85] to-[#002B3D] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
      </div>

      {/* Language Switcher */}
      <div className="absolute top-5 right-5 z-10" ref={langRef}>
        <button
          onClick={() => setLangOpen(!langOpen)}
          className="flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-medium transition-all border border-white/10"
        >
          <span>{localeFlags[locale as Locale]}</span>
          <span>{locale.toUpperCase()}</span>
          <svg className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
        {langOpen && (
          <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[120px]">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                  locale === loc ? 'bg-[#005E85]/10 text-[#005E85]' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{localeFlags[loc]}</span>
                <span>{loc.toUpperCase()}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={submit} className="relative w-full max-w-md mx-4 p-8 md:p-10 bg-white rounded-3xl shadow-2xl">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            A
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('login', 'title')}</h1>
            <p className="text-gray-400 text-sm">{t('login', 'subtitle')}</p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('login', 'email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#005E85]/30 focus:border-[#005E85] disabled:bg-gray-50 disabled:cursor-not-allowed transition-all bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('login', 'password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#005E85]/30 focus:border-[#005E85] disabled:bg-gray-50 disabled:cursor-not-allowed transition-all bg-gray-50/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email.trim() || !password.trim()}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl shadow-primary-500/20"
          >
            {loading ? t('login', 'submitting') : t('login', 'submit')}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
          <p className="font-medium">{t('login', 'testAccount')}:</p>
          <div className="mt-2 p-3 bg-gray-50 rounded-xl">
            <p className="font-mono text-xs text-gray-500">
              Email: admin@example.com<br/>
              Password: Admin123456!
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}