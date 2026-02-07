import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    const partner = await prisma.partner.findUnique({ where: { id } })

    if (!partner) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(partner)
  } catch (error) {
    console.error('Partners [id] GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch partner' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireAuth(req)
    const { id: idStr } = await params
    const id = Number(idStr)
    const data = await req.json()

    const partner = await prisma.partner.update({
      where: { id },
      data: {
        name: data.name,
        logo: data.logo,
        link: data.link || null,
        order: data.order,
      },
    })
    return NextResponse.json(partner)
  } catch (error) {
    console.error('Partners [id] PUT error:', error)
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireAuth(req)
    const { id: idStr } = await params
    const id = Number(idStr)

    await prisma.partner.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Partners [id] DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 })
  }
}
