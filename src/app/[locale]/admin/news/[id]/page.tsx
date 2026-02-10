import Link from 'next/link'
import NewsForm from '@/components/admin/NewsForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditNewsPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params
  const item = await prisma.news.findUnique({ where: { id: Number(id) } })
  if (!item) notFound()
  const messages = (await import(`@/messages/${locale || 'uz'}.json`)).default

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href={`/${locale || 'uz'}/admin/news`} className="text-gray-400 hover:text-[#005E85] transition-colors">
            {messages.admin.news.title}
          </Link>
          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-700 font-medium">{messages.admin.news.editTitle}</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">{messages.admin.news.editTitle}</h1>
        <NewsForm initial={JSON.parse(JSON.stringify(item))} redirectTo="news" />
      </div>
    </main>
  )
}
