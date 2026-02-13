import { headers } from 'next/headers'
import { getTranslations, getLocale } from 'next-intl/server'
import {
  Newspaper,
  TrendingUp,
  Users,
  Building2,
  Globe2,
  GraduationCap,
  Bell
} from 'lucide-react'
import NewsClient, { type Category, type NewsArticle, type MediaItem, type NewsTranslations } from './NewsClient'
import type { Locale } from '@/i18n/config'

// ─────────────────────────────────────────────────────────────────────────────
// Static Configuration
// ─────────────────────────────────────────────────────────────────────────────

const categoriesConfig = [
  { id: 'all', key: 'all', icon: Newspaper },
  { id: 'investment', key: 'investment', icon: TrendingUp },
  { id: 'events', key: 'events', icon: Users },
  { id: 'projects', key: 'projects', icon: Building2 },
  { id: 'international', key: 'international', icon: Globe2 },
  { id: 'education', key: 'education', icon: GraduationCap },
  { id: 'announcements', key: 'announcements', icon: Bell },
]

const mediaItemsConfig = [
  { id: 1, key: 'smartCityPresentation', type: 'video', thumbnail: '/images/media/smart-city-video.jpg', duration: '12:45', date: '2024-12-15' },
  { id: 2, key: 'economicForumHighlights', type: 'video', thumbnail: '/images/media/forum-video.jpg', duration: '8:30', date: '2024-12-28' },
  { id: 3, key: 'investorsForumGallery', type: 'gallery', thumbnail: '/images/media/investors-gallery.jpg', count: 45, date: '2024-11-10' },
  { id: 4, key: 'assemblyInterview', type: 'video', thumbnail: '/images/media/interview-video.jpg', duration: '15:20', date: '2024-12-01' },
]

const categoryColors = {
  investment: { bg: 'bg-gold-500/20', text: 'text-gold-400', border: 'border-gold-500/30' },
  events: { bg: 'bg-turquoise-500/20', text: 'text-turquoise-400', border: 'border-turquoise-500/30' },
  projects: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  international: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30' },
  education: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30' },
  announcements: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

function getLocalized(item: any, base: 'title' | 'content' | 'summary', locale: Locale) {
  if (locale === 'ru') return item[`${base}Ru`] || item[`${base}Uz`] || ''
  if (locale === 'en') return item[`${base}En`] || item[`${base}Uz`] || ''
  return item[`${base}Uz`] || ''
}

function stripHtml(html: string) {
  return html?.replace(/<[^>]*>/g, '') || ''
}

// ─────────────────────────────────────────────────────────────────────────────
// Server Component
// ─────────────────────────────────────────────────────────────────────────────

async function fetchNews() {
  try {
    const headersList = await headers()
    const host = headersList.get('x-forwarded-host') ?? headersList.get('host')
    const proto = headersList.get('x-forwarded-proto') ?? 'http'
    const baseUrl = host ? `${proto}://${host}` : 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/public/news`, {
      next: { revalidate: 60 }
    })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Failed to fetch news:', error)
    return []
  }
}

export default async function NewsPage() {
  const t = await getTranslations('newsPage')
  const locale = (await getLocale()) as Locale

  const dbNews = await fetchNews()

  const categories: Category[] = categoriesConfig.map((cat) => ({
    id: cat.id,
    name: t(`categories.${cat.key}`),
    icon: cat.icon,
  }))

  const articles: NewsArticle[] = dbNews.map((item, index) => {
    const title = getLocalized(item, 'title', locale)
    const summary = getLocalized(item, 'summary', locale)
    const content = getLocalized(item, 'content', locale)
    const plainContent = stripHtml(content)
    const excerpt = summary || plainContent.slice(0, 200)
    const words = plainContent.split(/\s+/).filter(Boolean).length
    const readTime = `${Math.max(1, Math.ceil(words / 200))} min`
    const d = item.publishedAt ? new Date(item.publishedAt) : new Date(item.createdAt)
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

    return {
      id: `db-${item.id}`,
      dbId: item.id,
      key: `db-${item.id}`,
      category: 'announcements',
      date: dateStr,
      views: 0,
      featured: index === 0,
      type: item.videoUrl ? 'video' : 'article',
      title,
      excerpt,
      content: plainContent,
      readTime,
      tags: [],
      author: '',
      imageUrl: item.imageUrl || '',
      videoUrl: item.videoUrl || '',
      isFromDb: true,
    }
  })

  const mediaItems: MediaItem[] = mediaItemsConfig.map((item) => ({
    ...item,
    title: t(`media.${item.key}`),
  }))

  const translations: NewsTranslations = {
    hero: {
      badge: t('hero.badge'),
      headline: t('hero.headline'),
      headlineHighlight: t('hero.headlineHighlight'),
      description: t('hero.description'),
      searchPlaceholder: t('hero.searchPlaceholder'),
    },
    allNewsSection: {
      badge: t('allNewsSection.badge'),
      headline: t('allNewsSection.headline'),
      headlineHighlight: t('allNewsSection.headlineHighlight'),
      newsCount: t('allNewsSection.newsCount'),
      noNews: t('allNewsSection.noNews'),
      noNewsDescription: t('allNewsSection.noNewsDescription'),
    },
    mediaSection: {
      badge: t('mediaSection.badge'),
      headline: t('mediaSection.headline'),
      headlineHighlight: t('mediaSection.headlineHighlight'),
      allMedia: t('mediaSection.allMedia'),
      photos: t('mediaSection.photos'),
    },
    newsletter: {
      badge: t('newsletter.badge'),
      headline: t('newsletter.headline'),
      headlineHighlight: t('newsletter.headlineHighlight'),
      description: t('newsletter.description'),
      emailPlaceholder: t('newsletter.emailPlaceholder'),
      subscribeButton: t('newsletter.subscribeButton'),
      privacyNote: t('newsletter.privacyNote'),
      benefits: {
        free: t('newsletter.benefits.free'),
        noSpam: t('newsletter.benefits.noSpam'),
        unsubscribe: t('newsletter.benefits.unsubscribe'),
      },
      success: {
        title: t('newsletter.success.title'),
        description: t('newsletter.success.description'),
      },
    },
    modal: {
      views: t('modal.views'),
      tags: t('modal.tags'),
      share: t('modal.share'),
      save: t('modal.save'),
      close: t('modal.close'),
    },
    months: {
      month01: t('months.january'),
      month02: t('months.february'),
      month03: t('months.march'),
      month04: t('months.april'),
      month05: t('months.may'),
      month06: t('months.june'),
      month07: t('months.july'),
      month08: t('months.august'),
      month09: t('months.september'),
      month10: t('months.october'),
      month11: t('months.november'),
      month12: t('months.december'),
    },
  }

  return (
    <NewsClient
      categories={categories}
      articles={articles}
      mediaItems={mediaItems}
      categoryColors={categoryColors}
      translations={translations}
    />
  )
}