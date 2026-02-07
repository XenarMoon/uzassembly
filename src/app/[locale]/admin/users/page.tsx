'use client'

import { useEffect, useState } from 'react'

interface User {
  id: number
  email: string
  role: string
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)

  // New user form
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newRole, setNewRole] = useState('admin')

  // Edit user form
  const [editEmail, setEditEmail] = useState('')
  const [editPassword, setEditPassword] = useState('')
  const [editRole, setEditRole] = useState('admin')

  const [saving, setSaving] = useState(false)

  useEffect(() => { loadUsers() }, [])

  async function loadUsers() {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch { setUsers([]) }
    setLoading(false)
  }

  async function handleAdd() {
    if (!newEmail || !newPassword) return
    setSaving(true)
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newEmail, password: newPassword, role: newRole })
    })
    if (res.ok) {
      setShowAdd(false)
      setNewEmail(''); setNewPassword(''); setNewRole('admin')
      loadUsers()
    } else {
      const err = await res.json().catch(() => ({}))
      alert(err.error || 'Xatolik yuz berdi')
    }
    setSaving(false)
  }

  async function handleUpdate(id: number) {
    setSaving(true)
    const body: Record<string, string> = { email: editEmail, role: editRole }
    if (editPassword) body.password = editPassword
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.ok) {
      setEditId(null)
      loadUsers()
    } else {
      const err = await res.json().catch(() => ({}))
      alert(err.error || 'Xatolik yuz berdi')
    }
    setSaving(false)
  }

  async function handleDelete(id: number) {
    if (!confirm('Bu foydalanuvchini o\'chirmoqchimisiz?')) return
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    if (res.ok) loadUsers()
    else alert('O\'chirib bo\'lmadi')
  }

  function startEdit(u: User) {
    setEditId(u.id)
    setEditEmail(u.email)
    setEditRole(u.role)
    setEditPassword('')
  }

  if (loading) return <main className="p-6"><div className="text-gray-500">Yuklanmoqda...</div></main>

  return (
    <main className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Foydalanuvchilar</h1>
            <p className="text-sm text-gray-500">{users.length} ta admin</p>
          </div>
          <button
            onClick={() => { setShowAdd(!showAdd); setEditId(null) }}
            className="bg-[#005E85] hover:bg-[#004a6a] text-white px-4 py-2 rounded-lg transition text-sm font-medium"
          >
            + Yangi qo&apos;shish
          </button>
        </div>

        {/* Add new user form */}
        {showAdd && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4">Yangi foydalanuvchi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-sm" placeholder="admin@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parol</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-sm" placeholder="Kamida 6 belgi" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select value={newRole} onChange={e => setNewRole(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-sm">
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAdd} disabled={saving}
                className="bg-[#005E85] hover:bg-[#004a6a] text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
                {saving ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
              <button onClick={() => setShowAdd(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
                Bekor qilish
              </button>
            </div>
          </div>
        )}

        {/* Users list */}
        <div className="space-y-3">
          {users.map(u => (
            <div key={u.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {editId === u.id ? (
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Tahrirlash</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)}
                        className="w-full p-2.5 border rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Yangi parol (ixtiyoriy)</label>
                      <input type="password" value={editPassword} onChange={e => setEditPassword(e.target.value)}
                        className="w-full p-2.5 border rounded-lg text-sm" placeholder="O'zgartirmasangiz bo'sh qoldiring" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                      <select value={editRole} onChange={e => setEditRole(e.target.value)}
                        className="w-full p-2.5 border rounded-lg text-sm">
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(u.id)} disabled={saving}
                      className="bg-[#005E85] hover:bg-[#004a6a] text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
                      {saving ? 'Saqlanmoqda...' : 'Yangilash'}
                    </button>
                    <button onClick={() => setEditId(null)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
                      Bekor qilish
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{u.email}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        u.role === 'admin' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}>{u.role}</span>
                      <span>•</span>
                      <span>{new Date(u.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(u)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1.5 hover:bg-blue-50 rounded-lg transition">
                      Tahrirlash
                    </button>
                    <button onClick={() => handleDelete(u.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition">
                      O&apos;chirish
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">🔐</div>
            <p>Foydalanuvchilar yo&apos;q</p>
          </div>
        )}
      </div>
    </main>
  )
}
