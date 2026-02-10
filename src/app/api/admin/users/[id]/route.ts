import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'
import { hashPassword, verifyPassword } from '@/lib/auth'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any
  try {
    const { id: idStr } = await params
    const user = await prisma.user.findUnique({
      where: { id: Number(idStr) },
      select: { id: true, email: true, role: true, createdAt: true }
    })
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(user)
  } catch (err) {
    console.error('User get error:', err)
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
    const { email, password, role, currentPassword, newPassword } = body

    // Password change flow: verify current password first
    if (newPassword) {
      const existing = await prisma.user.findUnique({ where: { id } })
      if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      if (currentPassword) {
        const valid = await verifyPassword(currentPassword, existing.password)
        if (!valid) return NextResponse.json({ error: 'wrongPassword' }, { status: 400 })
      }
      const data: any = { password: await hashPassword(newPassword) }
      if (email) data.email = email
      if (role) data.role = role
      const user = await prisma.user.update({ where: { id }, data, select: { id: true, email: true, role: true } })
      return NextResponse.json(user)
    }

    // Regular update
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
  } catch (err: any) {
    if (err?.code === 'P2002') return NextResponse.json({ error: 'emailTaken' }, { status: 400 })
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
    
    // Prevent deleting last admin
    const adminCount = await prisma.user.count({ where: { role: 'admin' } })
    const targetUser = await prisma.user.findUnique({ where: { id } })
    if (targetUser?.role === 'admin' && adminCount <= 1) {
      return NextResponse.json({ error: 'lastAdmin' }, { status: 400 })
    }

    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('User delete error:', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
