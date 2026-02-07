"use client"
import TeamForm from '@/components/admin/TeamForm'

export default function NewTeamPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Jamoa a&apos;zosi qo&apos;shish</h1>
      <TeamForm redirectTo="team" />
    </div>
  )
}
