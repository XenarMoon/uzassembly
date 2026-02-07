"use client"
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function NewUserPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/admin/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
    router.push(`/${locale || 'uz'}/admin/users`)
  }

  return (
    <main className="p-6">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create Admin</h1>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full border p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="w-full border p-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="bg-primary-500 text-white px-4 py-2 rounded">Create</button>
        </form>
      </div>
    </main>
  )
}
