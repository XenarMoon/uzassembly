import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any
  try {
    const { id } = await params
    const body = await request.json()
    const updated = await prisma.application.update({
      where: { id: Number(id) },
      data: { status: body.status },
    })
    return NextResponse.json(updated)
  } catch (err) {
    console.error('Application update error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any
  try {
    const { id } = await params
    await prisma.application.delete({ where: { id: Number(id) } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Application delete error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
