'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const newsConfig = [
  {
    id: 1,
    key: 'investorsForum',
    categoryKey: 'events',
    date: "2024-12-28",
    readTime: 5,
    featured: true,
    image: "/images/news/forum.jpg",
  },
  {
    id: 2,
    key: 'smartCityPhase',
    categoryKey: 'projects',
    date: "2024-12-25",
    readTime: 3,
    image: "/images/news/smart-city.jpg",
  },
  {
    id: 3,
    key: 'membershipProgram',
    categoryKey: 'announcements',
    date: "2024-12-22",
    readTime: 4,
    image: "/images/news/membership.jpg",
  },
  {
    id: 4,
    key: 'dubaiChamber',
    categoryKey: 'partnership',
    date: "2024-12-20",
    readTime: 3,
    image: "/images/news/dubai.jpg",
  },
]

const monthKeys: Record<string, string> = {
  '01': 'january',
  '02': 'february',
  '03': 'march',
  '04': 'april',
  '05': 'may',
  '06': 'june',
  '07': 'july',
  '08': 'august',
  '09': 'september',
  '10': 'october',
  '11': 'november',
  '12': 'december',
}

export default function News() {
  const t = useTranslations('news')
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [dynamicNews, setDynamicNews] = useState<any[]>([])

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    return `${parseInt(day)} ${t(`months.${monthKeys[month]}`)}, ${year}`
  }

  const formatDateSafe = (date: Date) => {
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, '0')
    const day = `${date.getDate()}`.padStart(2, '0')
    return formatDate(`${year}-${month}-${day}`)
  }

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '')

  const getLocalized = (item: any, base: 'title' | 'content') => {
    if (locale === 'ru') return item[`${base}Ru`] || ''
    if (locale === 'en') return item[`${base}En`] || ''
    return item[`${base}Uz`] || ''
  }

  useEffect(() => {
    let active = true
    fetch('/api/public/news')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!active) return
        setDynamicNews(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (active) setDynamicNews([])
      })
    return () => {
      active = false
    }
  }, [])

  const fallbackNews = newsConfig.map((item) => ({
    ...item,
    title: t(`articles.${item.key}.title`),
    excerpt: t(`articles.${item.key}.excerpt`),
    category: t(`categories.${item.categoryKey}`),
    date: formatDate(item.date),
  }))

  const computedDynamicNews = useMemo(() => {
    if (!dynamicNews.length) return []
    return dynamicNews.map((item: any, index: number) => {
      const content = getLocalized(item, 'content')
      const excerpt = stripHtml(content).slice(0, 180)
      const words = stripHtml(content).split(/\s+/).filter(Boolean).length
      const readTime = Math.max(1, Math.ceil(words / 200))
      const date = item.publishedAt ? new Date(item.publishedAt) : new Date(item.createdAt)
      return {
        id: item.id,
        key: `dynamic-${item.id}`,
        categoryKey: 'announcements',
        category: t('categories.announcements'),
        date: formatDateSafe(date),
        readTime,
        featured: index === 0,
        image: item.imageUrl || newsConfig[0]?.image,
        title: getLocalized(item, 'title'),
        excerpt,
      }
    })
  }, [dynamicNews, locale, t])

  const news = computedDynamicNews.length ? computedDynamicNews : fallbackNews
  const featuredNews = news[0]
  const otherNews = news.slice(1)

  return (
    <section
      id="news"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-primary-500 via-primary-600 to-primary-700"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

        {/* Floating Orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(62, 158, 238, 0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
            bottom: '10%',
            right: '-10%',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <span className="badge-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              {t('badge')}
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white" style={{ letterSpacing: '-0.025em' }}>
              {t('headline')} <span className="text-gradient-sky font-display">{t('headlineHighlight')}</span>
            </h2>
          </div>

          <Link href="/news" className="btn-secondary self-start md:self-auto">
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Featured News */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 xl:col-span-8"
          >
            {featuredNews && (
              <Link href={`/news/${featuredNews.id}`} className="group block h-full">
              <div className={cn(
                'relative h-full min-h-[450px] rounded-3xl overflow-hidden',
                'bg-gradient-to-br from-sky-500/10 via-primary-700/80 to-primary-800',
                'border border-sky-500/20 hover:border-sky-500/40 transition-all duration-500'
              )}>
                {/* Background */}
                <div className="absolute inset-0 bg-primary-700/60" />
                {featuredNews.image && (
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />
                )}

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-sm font-medium flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      {featuredNews.category}
                    </span>
                    <span className="text-white/40 text-sm flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredNews.readTime} {t('readTime')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-4 group-hover:text-sky-400 transition-colors leading-tight" style={{ letterSpacing: '-0.02em' }}>
                    {featuredNews.title}
                  </h3>

                  <p className="text-white/60 text-lg leading-relaxed mb-6">
                    {featuredNews.excerpt}
                  </p>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 text-white/40">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{featuredNews.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sky-400 group-hover:text-sky-300 transition-colors">
                      <span className="font-medium">{t('readMore')}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            )}
          </motion.div>

          {/* Other News */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4"
          >
            {otherNews.slice(0, 3).map((article, index) => (
              <Link key={article.id} href={`/news/${article.id}`} className="group block">
                <div className={cn(
                  'rounded-2xl overflow-hidden p-5',
                  'bg-white/[0.03] border border-white/5 hover:border-sky-500/30',
                  'transition-all duration-300'
                )}>
                  <div className="flex gap-4">
                    {article.image && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-primary-700">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-xs font-medium">
                          {article.category}
                        </span>
                        <span className="text-white/30 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />{article.readTime} {t('readTime')}
                        </span>
                      </div>
                      <h4 className="text-white font-medium text-sm line-clamp-2 group-hover:text-sky-400 transition-colors mb-1">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-white/30 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
