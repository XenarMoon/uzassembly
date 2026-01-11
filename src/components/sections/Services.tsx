'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from '@/lib/navigation'
import {
  Building2,
  TrendingUp,
  GraduationCap,
  Video,
  Landmark,
  Globe2,
  Handshake,
  MapPin,
  ArrowRight,
  Sparkles,
  ArrowUpRight
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

// Assembly Brand Service Configuration
const servicesConfig = [
  {
    id: 'smart-city',
    key: 'smartCity',
    icon: MapPin,
    href: '/services/smart-city',
    featured: true,
    gradient: 'from-orange-500/20 via-orange-400/10 to-transparent',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
  },
  {
    id: 'biznes-darcha',
    key: 'biznesDarcha',
    icon: Building2,
    href: '/services/biznes-darcha',
    gradient: 'from-sky-500/20 via-sky-400/10 to-transparent',
    iconBg: 'bg-sky-500/20',
    iconColor: 'text-sky-400',
  },
  {
    id: 'invest-hub',
    key: 'investHub',
    icon: TrendingUp,
    href: '/services/invest-hub',
    gradient: 'from-success/20 via-success/10 to-transparent',
    iconBg: 'bg-success/20',
    iconColor: 'text-success',
  },
  {
    id: 'edu-job',
    key: 'eduJob',
    icon: GraduationCap,
    href: '/services/edu-job',
    gradient: 'from-sky-500/20 via-sky-400/10 to-transparent',
    iconBg: 'bg-sky-500/20',
    iconColor: 'text-sky-400',
  },
  {
    id: 'reportaj-go',
    key: 'reportajGo',
    icon: Video,
    href: '/services/reportaj-go',
    gradient: 'from-orange-500/20 via-orange-400/10 to-transparent',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
  },
  {
    id: 'government-relations',
    key: 'gr',
    icon: Landmark,
    href: '/services/government-relations',
    gradient: 'from-sky-500/20 via-sky-400/10 to-transparent',
    iconBg: 'bg-sky-500/20',
    iconColor: 'text-sky-400',
  },
  {
    id: 'foreign-relations',
    key: 'fr',
    icon: Globe2,
    href: '/services/foreign-relations',
    gradient: 'from-sky-500/20 via-sky-400/10 to-transparent',
    iconBg: 'bg-sky-500/20',
    iconColor: 'text-sky-400',
  },
  {
    id: 'business-relations',
    key: 'br',
    icon: Handshake,
    href: '/services/business-relations',
    gradient: 'from-slate-400/20 via-slate-300/10 to-transparent',
    iconBg: 'bg-slate-400/20',
    iconColor: 'text-slate-300',
  },
]

export default function Services() {
  const t = useTranslations('services')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const services = servicesConfig.map((service) => ({
    ...service,
    name: t(`items.${service.key}.name`),
    tagline: t(`items.${service.key}.tagline`),
    description: t(`items.${service.key}.description`),
  }))

  const featuredService = {
    ...services[0],
    stats: { value: t('items.smartCity.stats.area'), label: t('items.smartCity.stats.unit') },
    location: 'Ohangaron, Toshkent',
  }
  const otherServices = services.slice(1)

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 lg:py-32 pb-24 lg:pb-40 bg-gradient-to-b from-primary-500 via-primary-600 to-primary-700"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top gradient fade from hero */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-500 to-transparent" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(62, 158, 238, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(62, 158, 238, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating Orb */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(62, 158, 238, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '10%',
            right: '-10%',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Second Orb */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(242, 122, 33, 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
            bottom: '20%',
            left: '-5%',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
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
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16"
        >
          <div className="max-w-2xl">
            <span className="badge-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              {t('badge')}
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-4 lg:mb-6" style={{ letterSpacing: '-0.025em' }}>
              {t('headline')} <span className="text-gradient-sky font-display">{t('headlineHighlight')}</span>
            </h2>

            <p className="text-lg lg:text-xl text-white/60">
              {t('description')}
            </p>
          </div>

          <Link href="/services" className="btn-secondary self-start lg:self-auto">
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Featured Service - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 lg:mb-8"
        >
          <Link href={featuredService.href} className="group block">
            <div className={cn(
              'relative rounded-2xl lg:rounded-3xl overflow-hidden',
              'bg-gradient-to-br from-orange-500/10 via-primary-700/80 to-primary-800',
              'border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500',
              'p-6 lg:p-10 xl:p-12'
            )}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(rgba(242, 122, 33, 0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(242, 122, 33, 0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />

              <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
                {/* Left Content */}
                <div className="lg:col-span-7 xl:col-span-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {t('flagshipProject')}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-success/20 text-success text-sm font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      {t('active')}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center icon-container-orange">
                      <featuredService.icon className="w-8 h-8 lg:w-10 lg:h-10 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-orange-400/80 text-sm font-medium uppercase tracking-wider">{featuredService.tagline}</p>
                      <h3 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-white group-hover:text-orange-400 transition-colors">
                        {featuredService.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-white/60 text-lg lg:text-xl max-w-2xl mb-6 lg:mb-8">
                    {featuredService.description}
                  </p>

                  <div className="flex items-center gap-3 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <span className="font-semibold text-lg">{t('viewProject')}</span>
                    <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>

                {/* Right Stats */}
                <div className="lg:col-span-5 xl:col-span-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass rounded-2xl p-5 lg:p-6">
                      <p className="text-white/40 text-sm mb-2">{t('area')}</p>
                      <p className="font-display text-3xl lg:text-4xl font-bold text-orange-400">
                        {featuredService.stats?.value}
                      </p>
                      <p className="text-orange-400/60 text-sm">{featuredService.stats?.label}</p>
                    </div>
                    <div className="glass rounded-2xl p-5 lg:p-6">
                      <p className="text-white/40 text-sm mb-2">{t('location')}</p>
                      <p className="text-white font-semibold text-lg lg:text-xl">{featuredService.location}</p>
                    </div>
                    <div className="glass rounded-2xl p-5 lg:p-6">
                      <p className="text-white/40 text-sm mb-2">{t('investment')}</p>
                      <p className="font-display text-2xl lg:text-3xl font-bold text-success">$2.5B</p>
                    </div>
                    <div className="glass rounded-2xl p-5 lg:p-6">
                      <p className="text-white/40 text-sm mb-2">{t('status')}</p>
                      <p className="text-white font-semibold">2024-2030</p>
                      <p className="text-white/40 text-sm">{t('planned')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Other Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {otherServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              className="group"
            >
              <Link href={service.href} className="block h-full">
                <div className={cn(
                  'relative h-full rounded-xl overflow-hidden transition-all duration-500',
                  'bg-white/[0.03] border border-white/10',
                  'hover:border-sky-500/30 hover:bg-white/[0.06]',
                  'hover:shadow-xl hover:-translate-y-1',
                  'backdrop-blur-sm p-4'
                )}>
                  {/* Background Gradient on Hover */}
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    service.gradient
                  )} />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110',
                      service.iconBg
                    )}>
                      <service.icon className={cn('w-6 h-6', service.iconColor)} />
                    </div>

                    {/* Content */}
                    <p className={cn('text-[10px] font-medium uppercase tracking-wider mb-1', service.iconColor)}>
                      {service.tagline}
                    </p>
                    <h3 className="font-heading font-semibold text-base text-white group-hover:text-sky-400 transition-colors">
                      {service.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
