import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    const item = await prisma.news.findUnique({ where: { id } })
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(item)
  } catch (err) {
    console.error('News get error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    const body = await request.json()
    const {
      titleUz, titleRu, titleEn,
      summaryUz, summaryRu, summaryEn,
      contentUz, contentRu, contentEn,
      imageUrl, videoUrl, publishedAt,
    } = body

    const data: any = {
      titleUz, titleRu, titleEn,
      summaryUz: summaryUz || '',
      summaryRu: summaryRu || '',
      summaryEn: summaryEn || '',
      contentUz, contentRu, contentEn,
      imageUrl: imageUrl || null,
      videoUrl: videoUrl || null,
    }
    if (publishedAt !== undefined) data.publishedAt = publishedAt ? new Date(publishedAt) : null

    const updated = await prisma.news.update({
      where: { id },
      data,
    })
    return NextResponse.json(updated)
  } catch (err) {
    console.error('News update error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    await prisma.news.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('News delete error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
