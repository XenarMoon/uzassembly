import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findMany()
    const result: Record<string, string> = {}
    for (const s of settings) {
      result[s.key] = s.value
    }
    return NextResponse.json(result)
  } catch (err) {
    console.error('Settings GET error:', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any

  try {
    const body = await request.json()

    // body is { key: value, key2: value2, ... }
    const entries = Object.entries(body) as [string, string][]

    for (const [key, value] of entries) {
      await prisma.siteSettings.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Settings PUT error:', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
