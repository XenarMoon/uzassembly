'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import { ArrowLeft, Calendar, Clock, Share2, Play } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'
import { cn } from '@/lib/utils'

export default function NewsDetailClient() {
  const params = useParams()
  const id = params.id as string
  const locale = useLocale()
  const t = useTranslations('newsPage')

  const [news, setNews] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/public/news/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setNews(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  const getLocalized = (item: any, base: string) => {
    if (!item) return ''
    if (locale === 'ru') return item[`${base}Ru`] || item[`${base}Uz`] || ''
    if (locale === 'en') return item[`${base}En`] || item[`${base}Uz`] || ''
    return item[`${base}Uz`] || ''
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'en' ? 'en-US' : 'uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getVideoEmbed = (url: string) => {
    if (!url) return null
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
    // YouTube Shorts
    const ytShortMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)
    if (ytShortMatch) return `https://www.youtube.com/embed/${ytShortMatch[1]}`
    return null
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-primary-500">
        <Header />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <div className="text-white/50 text-lg">Yuklanmoqda...</div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!news) {
    return (
      <main className="min-h-screen bg-primary-500">
        <Header />
        <div className="pt-32 pb-20 flex flex-col items-center justify-center gap-4">
          <div className="text-6xl">📰</div>
          <div className="text-white/50 text-lg">
            {locale === 'uz' ? 'Yangilik topilmadi' : locale === 'ru' ? 'Новость не найдена' : 'News not found'}
          </div>
          <Link href="/news" className="btn-primary mt-4">
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === 'uz' ? 'Yangiliklarга qaytish' : locale === 'ru' ? 'Вернуться к новостям' : 'Back to news'}</span>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const title = getLocalized(news, 'title')
  const content = getLocalized(news, 'content')
  const summary = getLocalized(news, 'summary')
  const publishDate = news.publishedAt || news.createdAt
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))
  const videoEmbed = news.videoUrl ? getVideoEmbed(news.videoUrl) : null

  return (
    <main className="min-h-screen bg-primary-500">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          {/* Back button */}
          <Link href="/news" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{locale === 'uz' ? 'Barcha yangiliklar' : locale === 'ru' ? 'Все новости' : 'All news'}</span>
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5 text-white/40 text-sm">
              <Calendar className="w-4 h-4" />
              {formatDate(publishDate)}
            </span>
            <span className="flex items-center gap-1.5 text-white/40 text-sm">
              <Clock className="w-4 h-4" />
              {readTime} {locale === 'uz' ? 'daqiqa' : locale === 'ru' ? 'мин' : 'min'}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 max-w-4xl" style={{ letterSpacing: '-0.025em' }}>
            {title}
          </h1>

          {/* Summary */}
          {summary && (
            <p className="text-white/60 text-lg leading-relaxed max-w-3xl mb-8">
              {summary}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {news.imageUrl && (
              <div className="relative rounded-2xl overflow-hidden mb-10 aspect-video">
                <img
                  src={news.imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Video Embed */}
            {videoEmbed && (
              <div className="relative rounded-2xl overflow-hidden mb-10 aspect-video bg-black">
                <iframe
                  src={videoEmbed}
                  title={title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            )}

            {/* Video Link (non-embeddable) */}
            {news.videoUrl && !videoEmbed && (
              <a
                href={news.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 transition-all mb-10"
              >
                <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">
                    {locale === 'uz' ? 'Videoni ko\'rish' : locale === 'ru' ? 'Смотреть видео' : 'Watch video'}
                  </div>
                  <div className="text-white/40 text-xs truncate max-w-xs">{news.videoUrl}</div>
                </div>
              </a>
            )}

            {/* Article Content */}
            <div
              className={cn(
                'prose prose-invert prose-lg max-w-none',
                'prose-headings:font-heading prose-headings:text-white',
                'prose-p:text-white/70 prose-p:leading-relaxed',
                'prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline',
                'prose-strong:text-white',
                'prose-img:rounded-xl',
                'prose-blockquote:border-sky-500/30 prose-blockquote:text-white/60',
              )}
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <span className="text-white/40 text-sm">
                  {locale === 'uz' ? 'Ulashish:' : locale === 'ru' ? 'Поделиться:' : 'Share:'}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  {locale === 'uz' ? 'Havolani nusxalash' : locale === 'ru' ? 'Копировать ссылку' : 'Copy link'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
