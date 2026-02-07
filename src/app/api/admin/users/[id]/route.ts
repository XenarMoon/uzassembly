import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'
import { hashPassword } from '@/lib/auth'

type RouteContext = { params: Promise<{ id: string }> }

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any

  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    const { email, password, role } = await request.json()

    const data: any = {}
    if (email) data.email = email
    if (password) data.password = await hashPassword(password)
    if (role) data.role = role

    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, role: true },
    })

    return NextResponse.json(user)
  } catch (err) {
    console.error('User update error:', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any

  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('User delete error:', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
