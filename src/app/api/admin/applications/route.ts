import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

export async function GET(request: NextRequest) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any
  try {
    const items = await prisma.application.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(items)
  } catch (err) {
    console.error('Applications list error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
