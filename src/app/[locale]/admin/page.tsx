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

export default async function AdminPage() {
  const [
    newsCount,
    teamCount,
    partnersCount,
    statisticsCount,
    pagesCount,
    usersCount,
    appsCount,
    applicationsTotal,
    viewStats,
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
    { label: 'Yangiliklar', count: newsCount, href: 'news', icon: '📰', color: 'bg-blue-50 border-blue-200' },
    { label: 'Jamoa', count: teamCount, href: 'team', icon: '👥', color: 'bg-green-50 border-green-200' },
    { label: 'Hamkorlar', count: partnersCount, href: 'partners', icon: '🤝', color: 'bg-purple-50 border-purple-200' },
    { label: 'Statistika', count: statisticsCount, href: 'statistics', icon: '📊', color: 'bg-orange-50 border-orange-200' },
    { label: 'Sahifalar', count: pagesCount, href: 'pages', icon: '📄', color: 'bg-cyan-50 border-cyan-200' },
    { label: 'Murojaatlar', count: applicationsTotal, href: 'applications', icon: '📨', color: 'bg-yellow-50 border-yellow-200' },
    { label: 'Foydalanuvchilar', count: usersCount, href: 'users', icon: '🔐', color: 'bg-gray-50 border-gray-200' },
  ]

  const quickActions = [
    { label: 'Yangilik qo\'shish', href: 'news', icon: '➕' },
    { label: 'Sozlamalar', href: 'settings', icon: '⚙️' },
    { label: 'Murojaatlar', href: 'applications', icon: '📨' },
  ]

  return (
    <main className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Boshqaruv Paneli</h1>
          <p className="text-gray-500 text-sm">O&apos;zbekiston Iqtisodiyot Assambleyasi</p>
        </div>

        {/* Yangi murojaatlar */}
        {appsCount > 0 && (
          <Link href="applications">
            <div className="p-4 bg-red-50 rounded-xl border border-red-200 mb-6 hover:shadow-md transition flex items-center gap-3">
              <span className="text-2xl animate-pulse">🔔</span>
              <div>
                <h2 className="font-semibold text-red-900 text-sm">Yangi Murojaatlar</h2>
                <p className="text-red-700 text-lg font-bold">{appsCount} ta ko&apos;rib chiqilmagan murojaat</p>
              </div>
            </div>
          </Link>
        )}

        {/* Sayt ko'rishlari */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-xl p-5 shadow">
            <p className="text-sm opacity-80">Bugun</p>
            <p className="text-3xl font-bold">{viewStats.todayViews.toLocaleString()}</p>
            <p className="text-xs opacity-70 mt-1">tashrif</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl p-5 shadow">
            <p className="text-sm opacity-80">Bu oy</p>
            <p className="text-3xl font-bold">{viewStats.monthViews.toLocaleString()}</p>
            <p className="text-xs opacity-70 mt-1">tashrif</p>
          </div>
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-xl p-5 shadow">
            <p className="text-sm opacity-80">Jami</p>
            <p className="text-3xl font-bold">{viewStats.totalViews.toLocaleString()}</p>
            <p className="text-xs opacity-70 mt-1">tashrif</p>
          </div>
        </div>

        {/* Kontent bo'limlari */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {sections.map((section) => (
            <Link key={section.href} href={section.href}>
              <div className={`h-full p-4 md:p-5 bg-white rounded-xl border ${section.color} shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer`}>
                <div className="text-3xl mb-2">{section.icon}</div>
                <h3 className="text-xs font-medium text-gray-500 mb-0.5">{section.label}</h3>
                <p className="text-2xl font-bold text-gray-900">{section.count}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Tezkor harakatlar */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Tezkor harakatlar</h2>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <div className="px-4 py-2 bg-gray-50 hover:bg-[#005E85] hover:text-white rounded-lg border border-gray-200 text-sm font-medium transition-all cursor-pointer flex items-center gap-2">
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
