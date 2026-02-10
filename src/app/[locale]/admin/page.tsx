import prisma from '@/lib/prisma'
import Link from 'next/link'

async function safeCount(promise: Promise<number>, label: string) {
  try {
    return await promise
  } catch (error) {
    console.error(`Admin count error (${label}):`, error)
    return 0
  }
}

async function getPageViewStats() {
  try {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const [totalViews, todayViews, monthViews] = await Promise.all([
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.pageView.count({ where: { createdAt: { gte: monthStart } } }),
    ])
    return { totalViews, todayViews, monthViews }
  } catch {
    return { totalViews: 0, todayViews: 0, monthViews: 0 }
  }
}

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = (await import(`@/messages/${locale || 'uz'}.json`)).default
  const a = messages.admin

  const [
    newsCount, teamCount, partnersCount, statisticsCount,
    pagesCount, usersCount, appsCount, applicationsTotal, viewStats,
  ] = await Promise.all([
    safeCount(prisma.news.count(), 'news'),
    safeCount(prisma.teamMember.count(), 'team'),
    safeCount(prisma.partner.count(), 'partners'),
    safeCount(prisma.statistic.count(), 'statistics'),
    safeCount(prisma.page.count(), 'pages'),
    safeCount(prisma.user.count(), 'users'),
    safeCount(prisma.application.count({ where: { status: 'New' } }), 'applications-new'),
    safeCount(prisma.application.count(), 'applications-total'),
    getPageViewStats(),
  ])

  const sections = [
    { label: a.sidebar.news, count: newsCount, href: 'news', icon: '📰', gradient: 'from-blue-500 to-blue-600' },
    { label: a.sidebar.team, count: teamCount, href: 'team', icon: '👥', gradient: 'from-emerald-500 to-emerald-600' },
    { label: a.sidebar.partners, count: partnersCount, href: 'partners', icon: '🤝', gradient: 'from-violet-500 to-violet-600' },
    { label: a.sidebar.statistics, count: statisticsCount, href: 'statistics', icon: '📊', gradient: 'from-orange-500 to-orange-600' },
    { label: a.sidebar.pages, count: pagesCount, href: 'pages', icon: '📄', gradient: 'from-cyan-500 to-cyan-600' },
    { label: a.sidebar.applications, count: applicationsTotal, href: 'applications', icon: '📨', gradient: 'from-amber-500 to-amber-600' },
    { label: a.sidebar.users, count: usersCount, href: 'users', icon: '🔐', gradient: 'from-slate-500 to-slate-600' },
  ]

  const quickActions = [
    { label: a.dashboard.addNews, href: 'news/new', icon: '➕' },
    { label: a.dashboard.settingsAction, href: 'settings', icon: '⚙️' },
    { label: a.dashboard.applicationsAction, href: 'applications', icon: '📨' },
  ]

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{a.dashboard.title}</h1>
          <p className="text-gray-500 text-sm mt-1">{a.subtitle}</p>
        </div>

        {/* New Applications Alert */}
        {appsCount > 0 && (
          <Link href="applications">
            <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200/60 mb-8 hover:shadow-lg hover:shadow-red-100/50 transition-all duration-300 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <span className="text-2xl animate-pulse">🔔</span>
              </div>
              <div>
                <h2 className="font-bold text-red-800 text-sm">{a.dashboard.newApplications}</h2>
                <p className="text-red-600 text-lg font-bold">{a.dashboard.unreviewed.replace('{count}', String(appsCount))}</p>
              </div>
              <div className="ml-auto text-red-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-lg">📊</span>
              </div>
              <span className="text-sm font-medium text-gray-500">{a.dashboard.today}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{viewStats.todayViews.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">{a.dashboard.visits}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                <span className="text-emerald-600 text-lg">📈</span>
              </div>
              <span className="text-sm font-medium text-gray-500">{a.dashboard.thisMonth}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{viewStats.monthViews.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">{a.dashboard.visits}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                <span className="text-violet-600 text-lg">🌍</span>
              </div>
              <span className="text-sm font-medium text-gray-500">{a.dashboard.total}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{viewStats.totalViews.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">{a.dashboard.visits}</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {sections.map((section) => (
            <Link key={section.href} href={section.href}>
              <div className="group h-full p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white text-lg">{section.icon}</span>
                </div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{section.label}</h3>
                <p className="text-2xl font-bold text-gray-900">{section.count}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">{a.dashboard.quickActions}</h2>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <div className="px-5 py-2.5 bg-gray-50 hover:bg-[#005E85] hover:text-white rounded-xl border border-gray-200 hover:border-[#005E85] text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2.5 shadow-sm hover:shadow-md">
                  <span>{action.icon}</span>
                  {action.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
