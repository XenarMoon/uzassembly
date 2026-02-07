import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { path, locale, userAgent } = await request.json()

    if (!path) {
      return NextResponse.json({ error: 'Path required' }, { status: 400 })
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || ''

    await prisma.pageView.create({
      data: {
        path: path || '/',
        locale: locale || 'uz',
        userAgent: userAgent || null,
        ip: ip || null,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PageView track error:', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
