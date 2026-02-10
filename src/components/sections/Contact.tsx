'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { MapPin, Phone, Mail, Clock, ArrowRight, Globe2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import type { Locale } from '@/i18n/config'

export default function Contact() {
  const t = useTranslations('contact')
  const locale = useLocale() as Locale
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // ─── Dynamic settings from admin panel ───
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/public/settings')
      .then(r => r.ok ? r.json() : {})
      .then(data => setSettings(data))
      .catch(() => {})
  }, [])

  // Use settings with translation fallback
  const address = locale === 'en' ? (settings.addressEn || t('info.address.value')) :
                  locale === 'ru' ? (settings.addressRu || t('info.address.value')) :
                  (settings.address || t('info.address.value'))
  const phone = settings.phone1 || t('info.phone.value')
  const email = settings.email || t('info.email.value')

  const offices = [
    {
      city: t('info.city'),
      country: t('info.country'),
      address,
      phone,
      email,
      hours: t('info.hours.value'),
      main: true,
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-12 sm:py-16 lg:py-32 bg-gradient-to-b from-primary-700 via-primary-600 to-primary-700"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      </div>

      <div className="container-custom px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="badge-primary mb-4 sm:mb-6 text-xs sm:text-sm">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sky-500" />
            {t('badge')}
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-semibold text-white mb-4 sm:mb-6" style={{ letterSpacing: '-0.025em' }}>
            {t('headline')} <span className="text-gradient-primary font-display">{t('headlineHighlight')}</span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Office Card */}
        <div className="max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-12">
          {offices.map((office, index) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className={cn(
                'glass rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full',
                'border transition-all duration-300',
                office.main
                  ? 'border-sky-500/30 hover:border-sky-500/50'
                  : 'border-white/10 hover:border-sky-500/30'
              )}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Globe2 className={cn(
                        'w-4 h-4 sm:w-5 sm:h-5',
                        office.main ? 'text-sky-400' : 'text-sky-400'
                      )} />
                      <span className="text-white/40 text-xs sm:text-sm">{office.country}</span>
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white">
                      {office.city}
                    </h3>
                  </div>
                  {office.main && (
                    <span className="px-2 py-1 rounded-full bg-sky-500/20 text-sky-400 text-[10px] sm:text-xs font-medium">
                      {t('info.address.label')}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 mt-0.5 flex-shrink-0" />
                    <span className="text-white/60 text-xs sm:text-sm">{office.address}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 flex-shrink-0" />
                    <a href={`tel:${office.phone}`} className="text-white/60 text-xs sm:text-sm hover:text-sky-400 transition-colors">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-white/60 text-xs sm:text-sm hover:text-sky-400 transition-colors">
                      {office.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 flex-shrink-0" />
                    <span className="text-white/60 text-xs sm:text-sm">{office.hours}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/contact" className="btn-primary inline-flex text-sm sm:text-base">
            <span>{t('form.submit')}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
