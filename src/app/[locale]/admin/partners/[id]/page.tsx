import PartnerForm from '@/components/admin/PartnerForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const partner = await prisma.partner.findUnique({ where: { id: Number(id) } })
  if (!partner) notFound()

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Hamkorni tahrirlash</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <PartnerForm initial={JSON.parse(JSON.stringify(partner))} />
        </div>
      </div>
    </main>
  )
}
