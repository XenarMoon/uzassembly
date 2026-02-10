'use client'

import { useEffect, useState } from 'react'
import { useAdminTranslations } from '@/hooks/useAdminTranslations'

interface User {
  id: number
  email: string
  role: string
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [changePassId, setChangePassId] = useState<number | null>(null)
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newRole, setNewRole] = useState('admin')
  const [editEmail, setEditEmail] = useState('')
  const [editRole, setEditRole] = useState('admin')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showAddPass, setShowAddPass] = useState(false)
  const { t } = useAdminTranslations()

  useEffect(() => { loadUsers() }, [])

  useEffect(() => { if (success) { const timer = setTimeout(() => setSuccess(''), 3000); return () => clearTimeout(timer) } }, [success])

  async function loadUsers() {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch { setUsers([]) }
    setLoading(false)
  }

  async function handleAdd() {
    if (!newEmail || !newPassword) { setError(t('users', 'fillRequired')); return }
    if (newPassword.length < 6) { setError(t('users', 'minChars')); return }
    setSaving(true); setError('')
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newEmail, password: newPassword, role: newRole })
    })
    if (res.ok) {
      setShowAdd(false); setNewEmail(''); setNewPassword(''); setNewRole('admin')
      setSuccess(t('users', 'addSuccess')); loadUsers()
    } else {
      const err = await res.json().catch(() => ({}))
      if (err.error === 'emailTaken') setError(t('users', 'emailTaken'))
      else if (err.error === 'shortPassword') setError(t('users', 'minChars'))
      else setError(t('common', 'error'))
    }
    setSaving(false)
  }

  async function handleUpdate(id: number) {
    if (!editEmail) { setError(t('users', 'fillRequired')); return }
    setSaving(true); setError('')
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: editEmail, role: editRole })
    })
    if (res.ok) {
      setEditId(null); setSuccess(t('users', 'updateSuccess')); loadUsers()
    } else {
      const err = await res.json().catch(() => ({}))
      if (err.error === 'emailTaken') setError(t('users', 'emailTaken'))
      else setError(t('common', 'error'))
    }
    setSaving(false)
  }

  async function handlePasswordChange(id: number) {
    if (!newPass) { setError(t('users', 'fillRequired')); return }
    if (newPass.length < 6) { setError(t('users', 'minChars')); return }
    if (newPass !== confirmPass) { setError(t('users', 'passwordMismatch')); return }
    setSaving(true); setError('')
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword: newPass })
    })
    if (res.ok) {
      setChangePassId(null); setCurrentPassword(''); setNewPass(''); setConfirmPass('')
      setSuccess(t('users', 'passwordChanged'))
    } else {
      const err = await res.json().catch(() => ({}))
      if (err.error === 'wrongPassword') setError(t('users', 'wrongPassword'))
      else setError(t('common', 'error'))
    }
    setSaving(false)
  }

  async function handleDelete(id: number) {
    if (!confirm(t('users', 'deleteConfirm'))) return
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    if (res.ok) { setSuccess(t('users', 'deleteSuccess')); loadUsers() }
    else {
      const err = await res.json().catch(() => ({}))
      if (err.error === 'lastAdmin') alert(t('users', 'lastAdmin'))
      else alert(t('users', 'deleteFailed'))
    }
  }

  function startEdit(u: User) {
    setEditId(u.id); setEditEmail(u.email); setEditRole(u.role)
    setChangePassId(null); setError('')
  }

  function startChangePass(u: User) {
    setChangePassId(u.id); setCurrentPassword(''); setNewPass(''); setConfirmPass('')
    setEditId(null); setError('')
  }

  const filtered = search.trim()
    ? users.filter(u => u.email.toLowerCase().includes(search.toLowerCase()))
    : users

  const EyeIcon = ({ show }: { show: boolean }) => show ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
  )

  const inputClass = 'w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#005E85]/20 focus:border-[#005E85] outline-none transition-all bg-gray-50/50 placeholder:text-gray-300'

  if (loading) return (
    <main className="p-6 md:p-8 min-h-screen">
      <div className="max-w-5xl mx-auto animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded-lg w-48" />
        <div className="h-10 bg-gray-100 rounded-xl w-full max-w-sm" />
        {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white rounded-2xl border border-gray-100" />)}
      </div>
    </main>
  )

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('users', 'title')}</h1>
            <p className="text-sm text-gray-400 mt-1">{t('users', 'count', { count: users.length })}</p>
          </div>
          <button onClick={() => { setShowAdd(!showAdd); setEditId(null); setChangePassId(null); setError('') }}
            className="bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] text-white px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md text-sm font-semibold flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            {t('users', 'addNew')}
          </button>
        </div>

        {/* Success toast — fixed top */}
        {success && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-emerald-500 text-white rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-top-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            <span className="text-sm font-semibold">{success}</span>
          </div>
        )}

        {/* Search */}
        {users.length > 0 && (
          <div className="relative max-w-sm mb-6">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('users', 'searchPlaceholder')}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#005E85]/20 focus:border-[#005E85] outline-none transition-all bg-white placeholder:text-gray-300" />
          </div>
        )}

        {/* Add new user panel */}
        {showAdd && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[#005E85]/10 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-[#005E85]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">{t('users', 'addNew')}</h2>
                <p className="text-xs text-gray-400">{t('users', 'addDesc')}</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('users', 'email')}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                  </span>
                  <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}
                    className={`${inputClass} pl-10`} placeholder="admin@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('users', 'password')}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </span>
                  <input type={showAddPass ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)}
                    className={`${inputClass} pl-10 pr-10`} placeholder={t('users', 'minChars')} />
                  <button type="button" onClick={() => setShowAddPass(!showAddPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-gray-500 transition-colors">
                    <EyeIcon show={showAddPass} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('users', 'role')}</label>
                <select value={newRole} onChange={e => setNewRole(e.target.value)} className={inputClass}>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAdd} disabled={saving}
                className="bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] text-white px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                {saving && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                {saving ? t('common', 'saving') : t('common', 'save')}
              </button>
              <button onClick={() => { setShowAdd(false); setError('') }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all">
                {t('common', 'cancel')}
              </button>
            </div>
          </div>
        )}

        {/* Users list */}
        <div className="space-y-2">
          {filtered.map(u => (
            <div key={u.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
              {/* Edit Mode */}
              {editId === u.id ? (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                      <svg className="w-4.5 h-4.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{t('users', 'editTitle')}</h3>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('users', 'email')}</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                        </span>
                        <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} className={`${inputClass} pl-10`} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('users', 'role')}</label>
                      <select value={editRole} onChange={e => setEditRole(e.target.value)} className={inputClass}>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(u.id)} disabled={saving}
                      className="bg-gradient-to-r from-[#005E85] to-[#003D57] hover:from-[#004D6D] hover:to-[#002B3D] text-white px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition-all shadow-sm flex items-center gap-2">
                      {saving && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                      {saving ? t('common', 'saving') : t('common', 'update')}
                    </button>
                    <button onClick={() => { setEditId(null); setError('') }}
                      className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all">
                      {t('common', 'cancel')}
                    </button>
                  </div>
                </div>

              /* Password Change Mode */
              ) : changePassId === u.id ? (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                      <svg className="w-4.5 h-4.5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{t('users', 'changePassword')}</h3>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('users', 'currentPassword')}</label>
                      <div className="relative">
                        <input type={showCurrentPass ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
                          className={`${inputClass} pr-10`} placeholder={t('users', 'currentPasswordHint')} />
                        <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                          <EyeIcon show={showCurrentPass} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('users', 'newPasswordLabel')}</label>
                      <div className="relative">
                        <input type={showNewPass ? 'text' : 'password'} value={newPass} onChange={e => setNewPass(e.target.value)}
                          className={`${inputClass} pr-10`} placeholder={t('users', 'minChars')} />
                        <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                          <EyeIcon show={showNewPass} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('users', 'confirmPassword')}</label>
                      <div className="relative">
                        <input type={showConfirmPass ? 'text' : 'password'} value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                          className={`${inputClass} pr-10`} placeholder={t('users', 'confirmPasswordHint')} />
                        <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                          <EyeIcon show={showConfirmPass} />
                        </button>
                      </div>
                      {newPass && confirmPass && newPass !== confirmPass && (
                        <p className="text-xs text-red-400 mt-1">{t('users', 'passwordMismatch')}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handlePasswordChange(u.id)} disabled={saving || !newPass || newPass !== confirmPass}
                      className="bg-gradient-to-r from-violet-500 to-violet-700 hover:from-violet-600 hover:to-violet-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition-all shadow-sm flex items-center gap-2">
                      {saving && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                      {saving ? t('common', 'saving') : t('users', 'changePasswordBtn')}
                    </button>
                    <button onClick={() => { setChangePassId(null); setError('') }}
                      className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all">
                      {t('common', 'cancel')}
                    </button>
                  </div>
                </div>

              /* Normal Display Mode */
              ) : (
                <div className="p-5 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#005E85]/10 to-[#3E9EEE]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#005E85] font-bold text-sm">{(u.email[0] || '?').toUpperCase()}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{u.email}</h3>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                          u.role === 'admin'
                            ? 'bg-[#005E85]/10 text-[#005E85]'
                            : 'bg-amber-50 text-amber-600'
                        }`}>{u.role}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-300">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {new Date(u.createdAt).toLocaleDateString()} {new Date(u.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons — always visible */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={() => startEdit(u)} className="bg-[#005E85]/10 text-[#005E85] hover:bg-[#005E85] hover:text-white p-2 rounded-lg transition-all" title={t('common', 'edit')}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => startChangePass(u)} className="bg-violet-100 text-violet-600 hover:bg-violet-500 hover:text-white p-2 rounded-lg transition-all" title={t('users', 'changePassword')}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                    </button>
                    <button onClick={() => handleDelete(u.id)} className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-all" title={t('common', 'delete')}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Search no results */}
        {search && filtered.length === 0 && users.length > 0 && (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <p className="font-medium">{t('users', 'noResults')}</p>
          </div>
        )}

        {/* Empty state */}
        {users.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#005E85]/5 to-[#3E9EEE]/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#005E85]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <p className="font-semibold text-gray-500">{t('users', 'empty')}</p>
          </div>
        )}
      </div>
    </main>
  )
}
