import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './auth'
import prisma from './prisma'

export async function getUserFromRequest(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) return null
  const payload: any = verifyToken(token)
  if (!payload?.userId) return null
  const user = await prisma.user.findUnique({ where: { id: Number(payload.userId) } })
  return user
}

export async function requireAuth(request: NextRequest) {
  const user = await getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return user
}
