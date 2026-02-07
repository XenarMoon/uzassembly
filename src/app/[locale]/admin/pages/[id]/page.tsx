import PageForm from '@/components/admin/PageForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const page = await prisma.page.findUnique({ where: { id: Number(id) } })
  if (!page) notFound()

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Sahifani tahrirlash</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <PageForm initial={JSON.parse(JSON.stringify(page))} />
        </div>
      </div>
    </main>
  )
}
