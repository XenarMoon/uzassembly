'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import { useTranslations } from 'next-intl'
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
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    return `${parseInt(day)} ${t(`months.${monthKeys[month]}`)}, ${year}`
  }

  const news = newsConfig.map((item) => ({
    ...item,
    title: t(`articles.${item.key}.title`),
    excerpt: t(`articles.${item.key}.excerpt`),
    category: t(`categories.${item.categoryKey}`),
  }))

  const featuredNews = news[0]
  const otherNews = news.slice(1)

  return (
    <section
      id="news"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-navy-800"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
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
            <span className="badge-gold mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              {t('badge')}
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white" style={{ letterSpacing: '-0.025em' }}>
              {t('headline')} <span className="text-gradient-gold font-display">{t('headlineHighlight')}</span>
            </h2>
          </div>

          <Link href="/news" className="btn-secondary inline-flex items-center gap-2 self-start md:self-auto">
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
            <Link href={`/news/${featuredNews.id}`} className="group block h-full">
              <div className={cn(
                'relative h-full min-h-[450px] rounded-3xl overflow-hidden',
                'bg-gradient-to-br from-gold-500/10 via-navy-700/80 to-navy-800',
                'border border-white/5 hover:border-gold-500/30 transition-all duration-500'
              )}>
                {/* Background */}
                <div className="absolute inset-0 bg-navy-900/60" />

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-sm font-medium flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      {featuredNews.category}
                    </span>
                    <span className="text-white/40 text-sm flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredNews.readTime} {t('readTime')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-4 group-hover:text-gold-400 transition-colors leading-tight" style={{ letterSpacing: '-0.02em' }}>
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
                      <span className="text-sm">{formatDate(featuredNews.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gold-400 group-hover:text-gold-300 transition-colors">
                      <span className="font-medium">{t('readMore')}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other News */}
          <div className="lg:col-span-5 xl:col-span-4 grid gap-4">
            {otherNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Link href={`/news/${item.id}`} className="group block">
                  <div className={cn(
                    'glass rounded-2xl p-5 lg:p-6',
                    'border border-white/5 hover:border-turquoise-500/30 transition-all duration-300',
                    'hover:bg-turquoise-500/5'
                  )}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-turquoise-500/20 text-turquoise-400 text-xs font-medium">
                        {item.category}
                      </span>
                      <span className="text-white/30 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.readTime} {t('readTime')}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-turquoise-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-white/50 text-sm line-clamp-2 mb-3">
                      {item.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-white/30 text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.date)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-turquoise-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
