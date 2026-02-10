import StatisticForm from '@/components/admin/StatisticForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditStatisticPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params
  const statistic = await prisma.statistic.findUnique({ where: { id: Number(id) } })
  if (!statistic) notFound()
  const messages = (await import(`@/messages/${locale || 'uz'}.json`)).default

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">{messages.admin.statistics.editTitle}</h1>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <StatisticForm initial={JSON.parse(JSON.stringify(statistic))} />
        </div>
      </div>
    </main>
  )
}
