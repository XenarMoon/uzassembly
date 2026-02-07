// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyPassword, signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email va parol talab qilinadi' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { error: 'Email yoki parol noto\'g\'ri' },
        { status: 401 }
      )
    }

    const ok = await verifyPassword(password, user.password)
    if (!ok) {
      return NextResponse.json(
        { error: 'Email yoki parol noto\'g\'ri' },
        { status: 401 }
      )
    }

    const token = signToken({ userId: user.id, role: user.role })

    const response = NextResponse.json({ 
      ok: true, 
      message: 'Kirishingiz muvaffaqiyatli bo\'ldi' 
    })

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response

  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json(
      { error: 'Server xatosi. Qayta urinib ko\'ring.' },
      { status: 500 }
    )
  }
}