import NewsForm from '@/components/admin/NewsForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await prisma.news.findUnique({ where: { id: Number(id) } })
  if (!item) notFound()

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Yangilikni tahrirlash</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <NewsForm initial={JSON.parse(JSON.stringify(item))} redirectTo="news" />
        </div>
      </div>
    </main>
  )
}
