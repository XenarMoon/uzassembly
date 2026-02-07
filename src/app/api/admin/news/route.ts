import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

export async function GET() {
  try {
    const items = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(items)
  } catch (err) {
    console.error('News list error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // require authentication
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any

  try {
    const body = await request.json()
    const {
      titleUz, titleRu, titleEn,
      summaryUz, summaryRu, summaryEn,
      contentUz, contentRu, contentEn,
      imageUrl, videoUrl, publishedAt,
    } = body

    const created = await prisma.news.create({
      data: {
        titleUz: titleUz || '',
        titleRu: titleRu || '',
        titleEn: titleEn || '',
        summaryUz: summaryUz || '',
        summaryRu: summaryRu || '',
        summaryEn: summaryEn || '',
        contentUz: contentUz || '',
        contentRu: contentRu || '',
        contentEn: contentEn || '',
        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    console.error('News create error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
