import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

export async function GET() {
  try {
    const items = await prisma.statistic.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Statistics GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req)
    const data = await req.json()

    const statistic = await prisma.statistic.create({
      data: {
        labelEn: data.labelEn,
        labelRu: data.labelRu,
        labelUz: data.labelUz,
        value: data.value,
        icon: data.icon,
        order: data.order ?? 0,
      },
    })
    return NextResponse.json(statistic, { status: 201 })
  } catch (error) {
    console.error('Statistics POST error:', error)
    return NextResponse.json({ error: 'Failed to create statistic' }, { status: 500 })
  }
}
