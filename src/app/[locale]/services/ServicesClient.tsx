'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from '@/lib/navigation'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Globe2,
  Landmark,
  GraduationCap,
  Users,
  TrendingUp,
  MapPin,
  Shield,
  Target,
  Sparkles,
  CheckCircle2,
  Zap,
  Network,
  Award
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Service configurations (icons stay client-side)
const servicesConfig = [
  {
    id: 'invest-hub',
    key: 'investHub',
    number: '01',
    icon: TrendingUp,
    color: 'gold',
    statsValue: '$20B',
    href: '/services/invest-hub',
  },
  {
    id: 'government-relations',
    key: 'governmentRelations',
    number: '02',
    icon: Landmark,
    color: 'turquoise',
    statsValue: 'GR',
    href: '/services/government-relations',
  },
  {
    id: 'edu-job',
    key: 'eduJob',
    number: '03',
    icon: GraduationCap,
    color: 'violet',
    statsValue: 'Edu',
    href: '/services/edu-job',
  },
  {
    id: 'international',
    key: 'international',
    number: '04',
    icon: Globe2,
    color: 'emerald',
    statsValue: 'TV',
    href: '/services/international',
  },
  {
    id: 'networking',
    key: 'networking',
    number: '05',
    icon: Network,
    color: 'rose',
    statsValue: '35+',
    href: '/services/networking',
  },
]

const benefitsConfig = [
  { key: 'legalProtection', icon: Shield },
  { key: 'fastService', icon: Zap },
  { key: 'clearResults', icon: Target },
  { key: 'expertTeam', icon: Award },
]

const smartCityStats = [
  { value: '6,400', labelKey: 'area' },
  { value: '$20B', labelKey: 'investment' },
  { value: '2024-30', labelKey: 'timeline' },
  { value: '50K+', labelKey: 'jobs' },
]

export interface ServicesTranslations {
  hero: {
    badge: string
    headline: string
    headlineHighlight: string
    description: string
  }
  services: Record<string, {
    title: string
    subtitle: string
    description: string
    features: string[]
    statsLabel: string
  }>
  whyUs: {
    badge: string
    headline: string
    headlineHighlight: string
    description: string
  }
  benefits: Record<string, {
    title: string
    description: string
  }>
  smartCity: {
    flagshipBadge: string
    activeBadge: string
    location: string
    description: string
    learnMore: string
    stats: Record<string, {
      label: string
      sublabel: string
    }>
  }
  mashvaratClub: {
    badge: string
    description: string
  }
  cta: {
    headline: string
    headlineHighlight: string
    description: string
    membershipButton: string
  }
}

interface ServicesClientProps {
  translations: ServicesTranslations
}

export default function ServicesClient({ translations: t }: ServicesClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])
  const orbY2 = useTransform(smoothProgress, [0, 1], [0, -300])

  const services = servicesConfig.map((service) => ({
    ...service,
    ...t.services[service.key],
  }))

  const benefits = benefitsConfig.map((benefit) => ({
    ...benefit,
    ...t.benefits[benefit.key],
  }))

  return (
    <main ref={containerRef} className="relative bg-navy-900 overflow-hidden">
      {/* === BACKGROUND === */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 20% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 50% 30% at 80% 70%, rgba(13, 148, 136, 0.06) 0%, transparent 50%)
            `
          }}
        />
        <motion.div
          style={{ y: orbY1 }}
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
          initial={{ x: '5%', y: '10%' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gold-500/40 to-amber-500/20 rounded-full" />
        </motion.div>
        <motion.div
          style={{ y: orbY2 }}
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-15"
          initial={{ x: '70%', y: '50%' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-turquoise-500/30 to-emerald-500/20 rounded-full" />
        </motion.div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* === HERO === */}
      <section className="relative pt-28 lg:pt-32 pb-12 lg:pb-16">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="badge-gold mb-4">
              <Sparkles className="w-4 h-4" />
              {t.hero.badge}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
              {t.hero.headline}{' '}
              <span className="text-gradient-gold font-display">{t.hero.headlineHighlight}</span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              {t.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* === SERVICES LIST === */}
      <section className="relative py-12 lg:py-16">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href} className="group block">
                  <div className={cn(
                    'relative rounded-2xl overflow-hidden border transition-all duration-500',
                    'bg-white/[0.02] border-white/5 hover:border-white/15',
                    'hover:bg-white/[0.04]'
                  )}>
                    <div className={cn(
                      'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                      service.color === 'gold' && 'bg-gradient-to-r from-gold-500/10 via-transparent to-transparent',
                      service.color === 'turquoise' && 'bg-gradient-to-r from-turquoise-500/10 via-transparent to-transparent',
                      service.color === 'violet' && 'bg-gradient-to-r from-violet-500/10 via-transparent to-transparent',
                      service.color === 'emerald' && 'bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent',
                      service.color === 'rose' && 'bg-gradient-to-r from-rose-500/10 via-transparent to-transparent',
                    )} />

                    <div className="relative p-6 lg:p-8">
                      <div className="grid lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-5 flex items-start gap-4">
                          <div className="flex-shrink-0 flex items-center gap-4">
                            <span className="font-mono text-3xl lg:text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                              {service.number}
                            </span>
                            <div className={cn(
                              'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110',
                              service.color === 'gold' && 'bg-gold-500/10',
                              service.color === 'turquoise' && 'bg-turquoise-500/10',
                              service.color === 'violet' && 'bg-violet-500/10',
                              service.color === 'emerald' && 'bg-emerald-500/10',
                              service.color === 'rose' && 'bg-rose-500/10',
                            )}>
                              <service.icon className={cn(
                                'w-6 h-6',
                                service.color === 'gold' && 'text-gold-400',
                                service.color === 'turquoise' && 'text-turquoise-400',
                                service.color === 'violet' && 'text-violet-400',
                                service.color === 'emerald' && 'text-emerald-400',
                                service.color === 'rose' && 'text-rose-400',
                              )} />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-heading text-xl lg:text-2xl font-semibold text-white group-hover:text-gold-400 transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-white/40 text-sm">{service.subtitle}</p>
                          </div>
                        </div>

                        <div className="lg:col-span-5">
                          <p className="text-white/60 text-sm leading-relaxed mb-3">
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {service.features?.slice(0, 2).map((feature) => (
                              <span
                                key={feature}
                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 text-white/50 text-xs"
                              >
                                <CheckCircle2 className="w-3 h-3 text-gold-400" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold-500 transition-all">
                            <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-navy-900 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === BENEFITS === */}
      <section className="relative py-12 lg:py-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                {t.whyUs.badge}
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                {t.whyUs.headline}{' '}
                <span className="text-gradient-gold font-display">{t.whyUs.headlineHighlight}</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                {t.whyUs.description}
              </p>
            </motion.div>

            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center"
                  >
                    <div className="w-10 h-10 mx-auto rounded-lg bg-gold-500/10 flex items-center justify-center mb-3">
                      <benefit.icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1">{benefit.title}</h3>
                    <p className="text-white/40 text-xs">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SMART CITY HIGHLIGHT === */}
      <section className="relative py-12 lg:py-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/[0.03] via-transparent to-turquoise-500/[0.03]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-gold-500/20 bg-gradient-to-br from-gold-500/5 via-navy-800/50 to-navy-900"
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }}
            />

            <div className="relative p-6 lg:p-10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-medium">
                      {t.smartCity.flagshipBadge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {t.smartCity.activeBadge}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-2">
                    Central Asia{' '}
                    <span className="text-gradient-gold font-display">Smart City</span>
                  </h3>
                  <p className="text-white/40 text-sm mb-4">{t.smartCity.location}</p>

                  <p className="text-white/60 leading-relaxed mb-6">
                    {t.smartCity.description}
                  </p>

                  <Link
                    href="/services/invest-hub#smart-city"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-navy-900 rounded-full font-semibold text-sm hover:bg-gold-400 transition-colors"
                  >
                    <span>{t.smartCity.learnMore}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {smartCityStats.map((stat) => (
                    <div
                      key={stat.labelKey}
                      className="p-4 rounded-xl bg-navy-900/50 border border-white/5"
                    >
                      <p className="font-mono text-2xl font-bold text-gold-400">{stat.value}</p>
                      <p className="text-white font-medium text-sm">{t.smartCity.stats[stat.labelKey].label}</p>
                      <p className="text-white/40 text-xs">{t.smartCity.stats[stat.labelKey].sublabel}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === MASHVARAT CLUB === */}
      <section className="relative py-12 lg:py-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              {t.mashvaratClub.badge}
            </span>
            <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
              Mashvarat{' '}
              <span className="text-gradient-gold font-display">Club</span>
            </h2>
            <p className="text-white/50">
              {t.mashvaratClub.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="relative py-16 lg:py-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 60%)',
              filter: 'blur(40px)'
            }}
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
              {t.cta.headline}{' '}
              <span className="text-gradient-gold font-display">{t.cta.headlineHighlight}</span>
            </h2>
            <p className="text-white/50 mb-8">
              {t.cta.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/membership" className="btn-primary">
                <span>{t.cta.membershipButton}</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
