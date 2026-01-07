'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  ArrowLeft,
  Handshake,
  Users,
  Building2,
  Target,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Network,
  Briefcase,
  TrendingUp,
  Link2,
  Calendar,
  MessageSquare,
  Award
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'

const statsConfig = [
  { key: 'companies', value: '500+' },
  { key: 'meetings', value: '1000+' },
  { key: 'contracts', value: '300+' },
  { key: 'sectors', value: '35+' },
]

const servicesConfig = [
  { key: 'matching', icon: Network },
  { key: 'meetings', icon: Calendar },
  { key: 'supplyChain', icon: Link2 },
  { key: 'negotiation', icon: MessageSquare },
]

const processSteps = ['01', '02', '03', '04']

const partnerTypesConfig = [
  { key: 'suppliers', icon: Building2, count: '200+' },
  { key: 'distributors', icon: TrendingUp, count: '150+' },
  { key: 'manufacturers', icon: Briefcase, count: '100+' },
  { key: 'serviceProviders', icon: Users, count: '150+' },
]

export default function BusinessRelationsPage() {
  const t = useTranslations('businessRelationsPage')

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

  const matchingProcess = processSteps.map((step, index) => ({
    step,
    title: t(`process.step${index + 1}.title`),
    description: t(`process.step${index + 1}.description`),
  }))

  const partnerTypes = partnerTypesConfig.map((type) => ({
    ...type,
    title: t(`partnerTypes.${type.key}.title`),
    description: t(`partnerTypes.${type.key}.description`),
  }))

  const sectors = t.raw('sectors') as string[]
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
                radial-gradient(ellipse 60% 40% at 30% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 70% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)
              `
            }}
          />
          <motion.div
            style={{ y: orbY1 }}
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            initial={{ x: '50%', y: '20%' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-green-500/40 to-emerald-500/20 rounded-full" />
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
                    <Handshake className="w-4 h-4" />
                    {t('hero.badge')}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {t('hero.activeBadge')}
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
                  Business{' '}
                  <span className="text-gradient-gold font-display">Relations</span>
                </h1>

                <p className="text-lg text-white/50 mb-6 leading-relaxed">
                  {t('hero.description')}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    <span>{t('hero.findPartnerButton')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="#process" className="btn-secondary">
                    {t('hero.howItWorksButton')}
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
                    <p className="font-mono text-3xl font-bold text-green-400">{stat.value}</p>
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
              <span className="text-green-400 font-mono text-xs tracking-widest uppercase mb-3 block">
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
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-green-500/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                    <service.icon className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-white/50 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/[0.02] via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                {t('processSection.badge')}
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                {t('processSection.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('processSection.headlineHighlight')}</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {matchingProcess.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                  <span className="font-mono text-4xl font-bold text-green-500/20">{step.step}</span>
                  <h3 className="font-semibold text-white mt-2 mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                {t('partnerTypesSection.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('partnerTypesSection.headlineHighlight')}</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partnerTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <type.icon className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="font-mono text-lg font-bold text-green-400">{type.count}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{type.title}</h3>
                  <p className="text-white/50 text-sm">{type.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
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
                  <Target className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">
                  {t('sectorsTitle')}
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {sectors.map((sector) => (
                  <div key={sector} className="flex items-center gap-2 text-white/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {sector}
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
                  <span>{t('cta.registerButton')}</span>
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
