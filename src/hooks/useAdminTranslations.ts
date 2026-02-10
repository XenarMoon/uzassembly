'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type AdminMessages = {
  panel: string
  subtitle: string
  sidebar: Record<string, string>
  dashboard: Record<string, string>
  common: Record<string, string>
  login: Record<string, string>
  news: Record<string, string>
  team: Record<string, string>
  partners: Record<string, string>
  statistics: Record<string, string>
  pages: Record<string, string>
  applications: Record<string, string>
  users: Record<string, string>
  settings: Record<string, string>
}

const cache: Record<string, AdminMessages> = {}

export function useAdminTranslations() {
  const params = useParams()
  const locale = (params.locale as string) || 'uz'
  const [messages, setMessages] = useState<AdminMessages | null>(cache[locale] || null)

  useEffect(() => {
    if (cache[locale]) {
      setMessages(cache[locale])
      return
    }
    import(`@/messages/${locale}.json`).then((mod) => {
      const admin = mod.default?.admin || mod.admin
      if (admin) {
        cache[locale] = admin
        setMessages(admin)
      }
    })
  }, [locale])

  const t = (section: keyof AdminMessages, key: string, replacements?: Record<string, string | number>): string => {
    if (!messages) return key
    const sectionData = messages[section]
    if (!sectionData) return key
    if (typeof sectionData === 'string') return sectionData
    let text = (sectionData as Record<string, string>)[key] || key
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v))
      })
    }
    return text
  }

  const tRoot = (key: 'panel' | 'subtitle'): string => {
    if (!messages) return key
    return (messages[key] as string) || key
  }

  return { t, tRoot, locale, ready: !!messages }
}
