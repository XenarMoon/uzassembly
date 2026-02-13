'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Building2,
  MapPin,
  DollarSign,
  Users,
  Factory,
  Leaf,
  Wifi,
  Shield,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Globe2,
  BarChart3,
  FileCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'

const smartCityStatsConfig = [
  { key: 'area', value: '6,400' },
  { key: 'investment', value: '$20B' },
  { key: 'jobs', value: '50K+' },
  { key: 'year', value: '2030' },
]

const investHubFeaturesConfig = [
  { key: 'projectsBase', icon: BarChart3 },
  { key: 'globalInvestors', icon: Globe2 },
  { key: 'dueDiligence', icon: FileCheck },
  { key: 'investmentProtection', icon: Shield },
]

const smartCityZonesConfig = [
  { key: 'industrial', area: '2,500 ga', icon: Factory },
  { key: 'commercial', area: '1,200 ga', icon: Building2 },
  { key: 'residential', area: '1,800 ga', icon: Users },
  { key: 'green', area: '900 ga', icon: Leaf },
]

export default function InvestHubClient() {
  const t = useTranslations('investHubPage')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])

  const smartCityStats = smartCityStatsConfig.map((stat) => ({
    ...stat,
    label: t(`stats.${stat.key}.label`),
    description: t(`stats.${stat.key}.description`),
  }))

  const investHubFeatures = investHubFeaturesConfig.map((feature) => ({
    ...feature,
    title: t(`features.${feature.key}.title`),
    description: t(`features.${feature.key}.description`),
  }))

  const smartCityZones = smartCityZonesConfig.map((zone) => ({
    ...zone,
    name: t(`zones.${zone.key}`),
  }))

  const infrastructure = t.raw('infrastructure') as string[]

  return (
    <main ref={containerRef} className="relative bg-navy-900 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 30% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 50% 30% at 70% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
            `
          }}
        />
        <motion.div
          style={{ y: orbY1 }}
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
          initial={{ x: '10%', y: '20%' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gold-500/40 to-amber-500/20 rounded-full" />
        </motion.div>
      </div>

      {/* Hero */}
      <section className="relative pt-28 lg:pt-32 pb-12">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
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
        </div>
      </section>

      {/* Invest Hub Features */}
      <section className="relative py-16">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
              Invest Hub
            </span>
            <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
              {t('investHub.headline')}{' '}
              <span className="text-gradient-gold font-display">{t('investHub.headlineHighlight')}</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {investHubFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold-500/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart City Section */}
      <section id="smart-city" className="relative py-16">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/[0.02] via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              {t('smartCity.flagshipBadge')}
            </span>
            <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
              Central Asia{' '}
              <span className="text-gradient-gold font-display">Smart City</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              {t('smartCity.description')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {smartCityZones.map((zone, index) => (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-gold-500/5 to-transparent border border-gold-500/10 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gold-500/10 flex items-center justify-center mb-3">
                  <zone.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="font-semibold text-white mb-1">{zone.name}</h3>
                <p className="text-gold-400 font-mono text-lg">{zone.area}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/5"
          >
            <h3 className="font-heading text-xl font-semibold text-white mb-6">
              {t('infrastructureTitle')}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {infrastructure.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
