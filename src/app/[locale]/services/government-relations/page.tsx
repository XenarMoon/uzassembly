'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  ArrowLeft,
  Scale,
  FileText,
  BarChart3,
  Users,
  Building2,
  Shield,
  CheckCircle2,
  ArrowUpRight,
  Landmark,
  Gavel,
  TrendingUp,
  Target,
  Briefcase,
  MessageSquare
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'

const grStatsConfig = [
  { key: 'laws', value: '50+' },
  { key: 'ministries', value: '30+' },
  { key: 'meetings', value: '100+' },
  { key: 'efficiency', value: '95%' },
]

const grServicesConfig = [
  { key: 'legislativeMonitoring', icon: FileText },
  { key: 'economicAnalysis', icon: BarChart3 },
  { key: 'lobbying', icon: MessageSquare },
  { key: 'stakeholderManagement', icon: Users },
]

const workProcessConfig = [
  { step: '01', key: 'analysis' },
  { step: '02', key: 'strategy' },
  { step: '03', key: 'communication' },
  { step: '04', key: 'results' },
]

export default function GovernmentRelationsPage() {
  const t = useTranslations('grPage')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])

  // Build translated arrays
  const grStats = grStatsConfig.map((stat) => ({
    ...stat,
    label: t(`stats.${stat.key}.label`),
    description: t(`stats.${stat.key}.description`),
  }))

  const grServices = grServicesConfig.map((service) => ({
    ...service,
    title: t(`services.${service.key}.title`),
    description: t(`services.${service.key}.description`),
  }))

  const workProcess = workProcessConfig.map((step) => ({
    ...step,
    title: t(`workProcess.${step.key}.title`),
    description: t(`workProcess.${step.key}.description`),
  }))

  const ministries = t.raw('ministries') as string[]

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
                radial-gradient(ellipse 60% 40% at 30% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 70% 80%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)
              `
            }}
          />
          <motion.div
            style={{ y: orbY1 }}
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            initial={{ x: '60%', y: '10%' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-turquoise-400/40 to-emerald-500/20 rounded-full" />
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
                    <Scale className="w-4 h-4" />
                    {t('hero.badge')}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-turquoise-400/20 text-turquoise-400 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-turquoise-400 animate-pulse" />
                    {t('hero.activeBadge')}
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
                  Government{' '}
                  <span className="text-gradient-gold font-display">Relations</span>
                </h1>

                <p className="text-lg text-white/50 mb-6 leading-relaxed">
                  {t('hero.description')}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    <span>{t('hero.consultButton')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="#services" className="btn-secondary">
                    {t('hero.servicesButton')}
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
                {grStats.map((stat) => (
                  <div
                    key={stat.key}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <p className="font-mono text-3xl font-bold text-turquoise-400">{stat.value}</p>
                    <p className="text-white font-medium">{stat.label}</p>
                    <p className="text-white/40 text-sm">{stat.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-turquoise-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                {t('servicesSection.badge')}
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                {t('servicesSection.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('servicesSection.headlineHighlight')}</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {grServices.map((service, index) => (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-turquoise-400/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-turquoise-400/10 flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-turquoise-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-white/50 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Process */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-turquoise-400/[0.02] via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-turquoise-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                {t('processSection.badge')}
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                {t('processSection.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('processSection.headlineHighlight')}</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {workProcess.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                  <span className="font-mono text-4xl font-bold text-turquoise-400/20">{step.step}</span>
                  <h3 className="font-semibold text-white mt-2 mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ministries */}
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
                  <Landmark className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">
                  {t('ministriesTitle')}
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ministries.map((ministry) => (
                  <div key={ministry} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-white/70">{ministry}</span>
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
                  <span>{t('cta.contactButton')}</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/membership" className="btn-secondary">
                  {t('cta.membershipButton')}
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
