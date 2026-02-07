import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    const item = await prisma.teamMember.findUnique({ where: { id } })
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(item)
  } catch (err) {
    console.error('Team get error', err)
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
      nameUz, nameRu, nameEn,
      position, positionUz, positionRu, positionEn,
      bioUz, bioRu, bioEn,
      photoUrl, phone, socialLink, category, order,
    } = body
    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        nameUz, nameRu, nameEn,
        position: position || positionUz || '',
        positionUz: positionUz || position || '',
        positionRu: positionRu || '',
        positionEn: positionEn || '',
        bioUz, bioRu, bioEn,
        photoUrl: photoUrl || null,
        phone: phone || null,
        socialLink: socialLink || null,
        category: category || 'member',
        order,
      },
    })
    return NextResponse.json(updated)
  } catch (err) {
    console.error('Team update error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    await prisma.teamMember.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Team delete error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
