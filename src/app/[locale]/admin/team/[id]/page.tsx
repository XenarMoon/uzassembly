import TeamForm from '@/components/admin/TeamForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await prisma.teamMember.findUnique({ where: { id: Number(id) } })
  if (!item) notFound()

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Jamoa a&apos;zosini tahrirlash</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <TeamForm initial={JSON.parse(JSON.stringify(item))} redirectTo="team" />
        </div>
      </div>
    </main>
  )
}
