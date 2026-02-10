import Link from 'next/link'
import TeamForm from '@/components/admin/TeamForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditTeamPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params
  const item = await prisma.teamMember.findUnique({ where: { id: Number(id) } })
  if (!item) notFound()
  const messages = (await import(`@/messages/${locale || 'uz'}.json`)).default

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href={`/${locale}/admin/team`} className="hover:text-[#005E85] transition-colors">{messages.admin.team.title}</Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-600 font-medium">{messages.admin.team.editTitle}</span>
        </div>
        <TeamForm initial={JSON.parse(JSON.stringify(item))} redirectTo="team" />
      </div>
    </main>
  )
}
