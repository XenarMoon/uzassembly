import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'
import { hashPassword } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any
  try {
    const users = await prisma.user.findMany({ select: { id: true, email: true, role: true, createdAt: true } })
    return NextResponse.json(users)
  } catch (err) {
    console.error('Users list error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any
  try {
    const { email, password, role } = await request.json()
    if (!email || !password) return NextResponse.json({ error: 'missing' }, { status: 400 })
    if (password.length < 6) return NextResponse.json({ error: 'shortPassword' }, { status: 400 })
    const hashed = await hashPassword(password)
    const user = await prisma.user.create({ data: { email, password: hashed, role: role || 'admin' } })
    return NextResponse.json({ id: user.id, email: user.email, role: user.role }, { status: 201 })
  } catch (err: any) {
    if (err?.code === 'P2002') return NextResponse.json({ error: 'emailTaken' }, { status: 400 })
    console.error('Create user error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
