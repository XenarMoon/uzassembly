'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Validation
    if (!email.trim()) {
      setError('Email talab qilinadi')
      setLoading(false)
      return
    }
    if (!password.trim()) {
      setError('Parol talab qilinadi')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: 'include', // ✅ Cookie yuborish uchun
      })

      const data = await res.json()
      
      if (!res.ok) {
        setError(data.error || 'Login muvaffaq bo\'lmadi')
        setLoading(false)
        return
      }

      // ✅ Token backend tomondan cookie ga qo'yildi
      console.log('Login muvaffaqiyatli!')
      
      // ✅ Redirect to admin panel
      // router.push ishlamasa, window.location ishlatamiz
      window.location.href = `/${locale || 'uz'}/admin`
      
      // Yoki router.push + refresh:
      // router.push(`/${locale || 'uz'}/admin`)
      // router.refresh()
      
    } catch (err) {
      console.error('Login xatosi:', err)
      setError('Server xatosi. Qayta urinib ko\'ring.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
      <form onSubmit={submit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
        <p className="text-gray-500 mb-6">O'zbekiston Iqtisodiyot Assambleyasi</p>

        {error && (
          <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Manzili
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="admin@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parol
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email.trim() || !password.trim()}
            className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {loading ? 'Kirilyapti...' : 'Kirish'}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Test hisob:</p>
          <p className="font-mono text-xs mt-2">
            Email: admin@example.com<br/>
            Parol: Admin123456!
          </p>
        </div>
      </form>
    </div>
  )
}