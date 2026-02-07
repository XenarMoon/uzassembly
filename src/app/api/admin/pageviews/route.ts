import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/serverAuth'

export async function GET(request: NextRequest) {
  const maybeUser = await requireAuth(request)
  if ((maybeUser as any)?.status === 401) return maybeUser as any

  try {
    const url = new URL(request.url)
    const days = parseInt(url.searchParams.get('days') || '30')
    
    const since = new Date()
    since.setDate(since.getDate() - days)

    const totalViews = await prisma.pageView.count({
      where: { createdAt: { gte: since } },
    })

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayViews = await prisma.pageView.count({
      where: { createdAt: { gte: todayStart } },
    })

    // Views per page (top 10)
    const viewsByPage = await prisma.pageView.groupBy({
      by: ['path'],
      _count: { path: true },
      where: { createdAt: { gte: since } },
      orderBy: { _count: { path: 'desc' } },
      take: 10,
    })

    // Views per locale
    const viewsByLocale = await prisma.pageView.groupBy({
      by: ['locale'],
      _count: { locale: true },
      where: { createdAt: { gte: since } },
    })

    // Daily views for chart (last N days)
    const dailyViews: { date: string; count: number }[] = []
    for (let i = days - 1; i >= 0; i--) {
      const dayStart = new Date()
      dayStart.setDate(dayStart.getDate() - i)
      dayStart.setHours(0, 0, 0, 0)
      const dayEnd = new Date(dayStart)
      dayEnd.setDate(dayEnd.getDate() + 1)

      const count = await prisma.pageView.count({
        where: {
          createdAt: { gte: dayStart, lt: dayEnd },
        },
      })

      dailyViews.push({
        date: dayStart.toISOString().split('T')[0],
        count,
      })
    }

    return NextResponse.json({
      totalViews,
      todayViews,
      viewsByPage: viewsByPage.map((v) => ({
        path: v.path,
        count: v._count.path,
      })),
      viewsByLocale: viewsByLocale.map((v) => ({
        locale: v.locale,
        count: v._count.locale,
      })),
      dailyViews,
    })
  } catch (err) {
    console.error('PageView stats error:', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
