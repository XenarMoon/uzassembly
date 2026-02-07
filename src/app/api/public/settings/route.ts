import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findMany()
    const result: Record<string, string> = {}
    for (const s of settings) {
      result[s.key] = s.value
    }
    return NextResponse.json(result)
  } catch (err) {
    console.error('Public settings GET error:', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
