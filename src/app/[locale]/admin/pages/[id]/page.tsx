import PageForm from '@/components/admin/PageForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditPagePage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params
  const page = await prisma.page.findUnique({ where: { id: Number(id) } })
  if (!page) notFound()
  const messages = (await import(`@/messages/${locale || 'uz'}.json`)).default

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">{messages.admin.pages.editTitle}</h1>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <PageForm initial={JSON.parse(JSON.stringify(page))} />
        </div>
      </div>
    </main>
  )
}
