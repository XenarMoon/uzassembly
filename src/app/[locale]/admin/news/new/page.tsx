"use client"
import NewsForm from '@/components/admin/NewsForm'

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Yangilik qo&apos;shish</h1>
      <NewsForm redirectTo="news" />
    </div>
  )
}
