import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

export async function GET() {
  try {
    const items = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (err) {
    console.error('Team list error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any
  try {
    const body = await request.json()
    const {
      nameUz, nameRu, nameEn,
      position, positionUz, positionRu, positionEn,
      bioUz, bioRu, bioEn,
      photoUrl, phone, socialLink, category, order,
    } = body
    const created = await prisma.teamMember.create({
      data: {
        nameUz: nameUz || '',
        nameRu: nameRu || '',
        nameEn: nameEn || '',
        position: position || positionUz || '',
        positionUz: positionUz || position || '',
        positionRu: positionRu || '',
        positionEn: positionEn || '',
        bioUz: bioUz || '',
        bioRu: bioRu || '',
        bioEn: bioEn || '',
        photoUrl: photoUrl || null,
        phone: phone || null,
        socialLink: socialLink || null,
        category: category || 'member',
        order: order || 0,
      },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    console.error('Team create error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
