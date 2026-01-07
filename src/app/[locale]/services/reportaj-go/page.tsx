'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  ArrowLeft,
  Video,
  Camera,
  Mic2,
  Film,
  Play,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Globe2,
  TrendingUp,
  Award,
  Eye,
  Share2,
  Tv,
  Radio,
  Newspaper
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'

const statsConfig = [
  { key: 'reports', value: '500+' },
  { key: 'views', value: '1M+' },
  { key: 'companies', value: '50+' },
  { key: 'quality', value: '4K' },
]

const servicesConfig = [
  { key: 'videoReports', icon: Video },
  { key: 'corporatePhoto', icon: Camera },
  { key: 'interviews', icon: Mic2 },
  { key: 'documentaries', icon: Film },
]

const contentTypesConfig = [
  { key: 'businessReport', icon: Tv, popular: true },
  { key: 'successStory', icon: Award, popular: false },
  { key: 'eventCoverage', icon: Camera, popular: false },
]

const distributionConfig = [
  { key: 'fikratTv', icon: Tv },
  { key: 'youtube', icon: Play },
  { key: 'social', icon: Share2 },
  { key: 'international', icon: Globe2 },
]

export default function ReportajGoPage() {
  const t = useTranslations('reportajGoPage')

  // Build translated arrays
  const stats = statsConfig.map((stat) => ({
    ...stat,
    label: t(`stats.${stat.key}.label`),
    description: t(`stats.${stat.key}.description`),
  }))

  const services = servicesConfig.map((service) => ({
    ...service,
    title: t(`services.${service.key}.title`),
    description: t(`services.${service.key}.description`),
  }))

  const contentTypes = contentTypesConfig.map((type) => ({
    ...type,
    title: t(`contentTypes.${type.key}.title`),
    description: t(`contentTypes.${type.key}.description`),
    features: t.raw(`contentTypes.${type.key}.features`) as string[],
  }))

  const distribution = distributionConfig.map((channel) => ({
    ...channel,
    name: t(`distribution.${channel.key}.name`),
    reach: t(`distribution.${channel.key}.reach`),
  }))
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])

  return (
    <>
      <Header />
      <main ref={containerRef} className="relative bg-navy-900 overflow-hidden">

        {/* Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 30% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 70% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)
              `
            }}
          />
          <motion.div
            style={{ y: orbY1 }}
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            initial={{ x: '60%', y: '10%' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-red-500/40 to-orange-500/20 rounded-full" />
          </motion.div>
        </div>

        {/* Hero */}
        <section className="relative pt-28 lg:pt-32 pb-12">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('backToServices')}
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge-gold">
                    <Video className="w-4 h-4" />
                    {t('hero.badge')}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    {t('hero.liveBadge')}
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
                  Reportaj{' '}
                  <span className="text-gradient-gold font-display">GO</span>
                </h1>

                <p className="text-lg text-white/50 mb-6 leading-relaxed">
                  {t('hero.description')}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    <span>{t('hero.orderButton')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="#content" className="btn-secondary">
                    <Play className="w-4 h-4" />
                    {t('hero.samplesButton')}
                  </Link>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <p className="font-mono text-3xl font-bold text-red-400">{stat.value}</p>
                    <p className="text-white font-medium">{stat.label}</p>
                    <p className="text-white/40 text-sm">{stat.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-red-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                {t('servicesSection.badge')}
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                {t('servicesSection.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('servicesSection.headlineHighlight')}</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-red-500/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                    <service.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-white/50 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Types */}
        <section id="content" className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.02] via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                {t('contentSection.badge')}
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                {t('contentSection.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('contentSection.headlineHighlight')}</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {contentTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl border ${
                    type.popular
                      ? 'bg-gradient-to-br from-red-500/10 to-orange-500/5 border-red-500/20'
                      : 'bg-gradient-to-br from-white/[0.02] to-transparent border-white/5'
                  }`}
                >
                  {type.popular && (
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
                      {t('contentSection.popular')}
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    type.popular ? 'bg-red-500/20' : 'bg-white/5'
                  }`}>
                    <type.icon className={`w-6 h-6 ${type.popular ? 'text-red-400' : 'text-white/60'}`} />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{type.title}</h3>
                  <p className="text-white/50 text-sm mb-4">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${type.popular ? 'text-red-400' : 'text-gold-400'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Distribution */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <Globe2 className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-white">
                    {t('distributionSection.title')}
                  </h3>
                  <p className="text-white/50 text-sm">{t('distributionSection.description')}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {distribution.map((channel) => (
                  <div key={channel.name} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <channel.icon className="w-8 h-8 text-red-400 mb-3" />
                    <h4 className="font-semibold text-white mb-1">{channel.name}</h4>
                    <p className="text-gold-400 text-sm font-mono">{channel.reach}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                {t('cta.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('cta.headlineHighlight')}</span>
              </h2>
              <p className="text-white/50 mb-8">
                {t('cta.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-primary">
                  <span>{t('cta.orderButton')}</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/services/international" className="btn-secondary">
                  {t('cta.mediaButton')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
