import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

export async function GET() {
  try {
    const items = await prisma.page.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Pages GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req)
    const data = await req.json()

    const page = await prisma.page.create({
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
    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error('Pages POST error:', error)
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}
