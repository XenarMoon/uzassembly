import StatisticForm from '@/components/admin/StatisticForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditStatisticPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const statistic = await prisma.statistic.findUnique({ where: { id: Number(id) } })
  if (!statistic) notFound()

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Statistikani tahrirlash</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <StatisticForm initial={JSON.parse(JSON.stringify(statistic))} />
        </div>
      </div>
    </main>
  )
}
