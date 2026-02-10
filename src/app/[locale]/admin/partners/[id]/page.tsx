import PartnerForm from '@/components/admin/PartnerForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params
  const partner = await prisma.partner.findUnique({ where: { id: Number(id) } })
  if (!partner) notFound()
  const messages = (await import(`@/messages/${locale || 'uz'}.json`)).default

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">{messages.admin.partners.editTitle}</h1>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <PartnerForm initial={JSON.parse(JSON.stringify(partner))} />
        </div>
      </div>
    </main>
  )
}
