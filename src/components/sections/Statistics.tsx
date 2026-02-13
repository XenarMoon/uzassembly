'use client'

import { useEffect, useMemo, useState } from 'react'
import { Eye } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { formatNumber } from '@/lib/utils'

interface StatisticItem {
  id: number
  labelEn: string
  labelRu: string
  labelUz: string
  value: string
  icon: string
  order: number
}

interface ViewStats {
  totalViews: number
}

export default function StatisticsSection() {
  const t = useTranslations('statisticsSection')
  const locale = useLocale()
  const [items, setItems] = useState<StatisticItem[]>([])
  const [viewStats, setViewStats] = useState<ViewStats | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true
    Promise.all([
      fetch('/api/public/statistics').then(r => r.ok ? r.json() : []),
      fetch('/api/public/pageviews').then(r => r.ok ? r.json() : null),
    ])
      .then(([statsData, viewData]) => {
        if (!active) return
        setItems(Array.isArray(statsData) ? statsData : [])
        setViewStats(viewData && typeof viewData.totalViews === 'number' ? viewData : null)
        setLoaded(true)
      })
      .catch(() => {
        if (!active) return
        setItems([])
        setViewStats(null)
        setLoaded(true)
      })

    return () => {
      active = false
    }
  }, [])

  const displayItems = useMemo(() => {
    const stats = items.map((item) => {
      const label = locale === 'ru'
        ? item.labelRu
        : locale === 'en'
          ? item.labelEn
          : item.labelUz
      return {
        id: item.id,
        label: label || item.labelUz || item.labelEn || item.labelRu,
        value: item.value,
        icon: item.icon,
      }
    })

    if (viewStats?.totalViews !== undefined) {
      stats.push({
        id: -1,
        label: t('viewsLabel'),
        value: formatNumber(viewStats.totalViews),
        icon: 'views',
      })
    }

    return stats
  }, [items, locale, viewStats, t])

  if (!loaded) {
    return (
      <section id="statistics" className="relative py-20 lg:py-32 bg-gradient-to-b from-primary-700 via-primary-600 to-primary-700">
        <div className="container-custom text-center text-white/50">{t('loading')}</div>
      </section>
    )
  }

  if (displayItems.length === 0) {
    return (
      <section id="statistics" className="relative py-20 lg:py-32 bg-gradient-to-b from-primary-700 via-primary-600 to-primary-700">
        <div className="container-custom text-center text-white/60">{t('empty')}</div>
      </section>
    )
  }

  return (
    <section id="statistics" className="relative py-20 lg:py-32 bg-gradient-to-b from-primary-700 via-primary-600 to-primary-700">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-10 right-0 w-[520px] h-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(62, 158, 238, 0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute -bottom-10 left-0 w-[420px] h-[420px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 94, 133, 0.1) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <span className="badge-primary mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            {t('badge')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-4 sm:mb-6" style={{ letterSpacing: '-0.025em' }}>
            {t('title')} <span className="text-gradient-sky font-display">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg lg:text-xl text-white/60 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((stat) => (
            <div key={String(stat.id)} className="rounded-2xl border border-white/10 bg-white/5 px-6 py-7 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                  {stat.icon === 'views' ? (
                    <Eye className="w-6 h-6 text-sky-300" />
                  ) : (stat.icon?.startsWith('http') || stat.icon?.startsWith('/')) ? (
                    <img src={stat.icon} alt="icon" className="h-8 w-8 object-contain" />
                  ) : (
                    <span className="text-2xl">{stat.icon}</span>
                  )}
                </div>
                <div>
                  <div className="text-3xl font-semibold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
