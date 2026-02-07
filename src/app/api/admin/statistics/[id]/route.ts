import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    const statistic = await prisma.statistic.findUnique({ where: { id } })

    if (!statistic) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(statistic)
  } catch (error) {
    console.error('Statistics [id] GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch statistic' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireAuth(req)
    const { id: idStr } = await params
    const id = Number(idStr)
    const data = await req.json()

    const statistic = await prisma.statistic.update({
      where: { id },
      data: {
        labelEn: data.labelEn,
        labelRu: data.labelRu,
        labelUz: data.labelUz,
        value: data.value,
        icon: data.icon,
        order: data.order,
      },
    })
    return NextResponse.json(statistic)
  } catch (error) {
    console.error('Statistics [id] PUT error:', error)
    return NextResponse.json({ error: 'Failed to update statistic' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireAuth(req)
    const { id: idStr } = await params
    const id = Number(idStr)

    await prisma.statistic.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Statistics [id] DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete statistic' }, { status: 500 })
  }
}
