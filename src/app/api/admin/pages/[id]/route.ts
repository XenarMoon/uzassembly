import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    const page = await prisma.page.findUnique({ where: { id } })

    if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(page)
  } catch (error) {
    console.error('Pages [id] GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireAuth(req)
    const { id: idStr } = await params
    const id = Number(idStr)
    const data = await req.json()

    const page = await prisma.page.update({
      where: { id },
      data: {
        slug: data.slug,
        titleEn: data.titleEn,
        titleRu: data.titleRu,
        titleUz: data.titleUz,
        contentEn: data.contentEn,
        contentRu: data.contentRu,
        contentUz: data.contentUz,
        bannerImage: data.bannerImage || null,
      },
    })
    return NextResponse.json(page)
  } catch (error) {
    console.error('Pages [id] PUT error:', error)
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireAuth(req)
    const { id: idStr } = await params
    const id = Number(idStr)

    await prisma.page.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Pages [id] DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
  }
}
