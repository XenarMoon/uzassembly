import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const totalViews = await prisma.pageView.count()
    return NextResponse.json({ totalViews })
  } catch (err) {
    console.error('Public pageviews error:', err)
    return NextResponse.json({ error: 'Failed to fetch page views' }, { status: 500 })
  }
}
