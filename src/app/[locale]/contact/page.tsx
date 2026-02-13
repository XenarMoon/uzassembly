import { headers } from 'next/headers'
import ContactClient, { type ContactSettings } from './ContactClient'

async function fetchSettings(): Promise<ContactSettings> {
  try {
    const headersList = await headers()
    const host = headersList.get('x-forwarded-host') ?? headersList.get('host')
    const proto = headersList.get('x-forwarded-proto') ?? 'http'
    const baseUrl = host ? `${proto}://${host}` : 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/public/settings`, {
      next: { revalidate: 60 }
    })
    if (!res.ok) return {}
    const data = await res.json()
    return data && typeof data === 'object' ? data : {}
  } catch (error) {
    console.error('Failed to fetch settings:', error)
    return {}
  }
}

export default async function ContactPage() {
  const settings = await fetchSettings()

  return <ContactClient settings={settings} />
}