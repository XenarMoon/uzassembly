import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

export async function GET() {
  try {
    const items = await prisma.partner.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Partners GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req)
    const data = await req.json()

    const partner = await prisma.partner.create({
      data: {
        name: data.name,
        logo: data.logo,
        link: data.link || null,
        order: data.order ?? 0,
      },
    })
    return NextResponse.json(partner, { status: 201 })
  } catch (error) {
    console.error('Partners POST error:', error)
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 })
  }
}
