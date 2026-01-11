'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { ArrowRight, Award, Users, TrendingUp, Globe2, Shield, Target, Zap, CheckCircle2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const highlightsConfig = [
  { key: 'associations', icon: Users },
  { key: 'investment', icon: TrendingUp },
  { key: 'offices', icon: Globe2 },
  { key: 'partners', icon: Award },
]

export default function About() {
  const t = useTranslations('about')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const highlights = highlightsConfig.map((item) => ({
    ...item,
    value: t(`highlights.${item.key}.value`),
    label: t(`highlights.${item.key}.label`),
    description: t(`highlights.${item.key}.description`),
  }))

  const features = t.raw('features') as string[]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-primary-500 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] rounded-full -translate-y-1/2 -translate-x-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(62, 158, 238, 0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full translate-x-1/4 translate-y-1/4"
          style={{
            background: 'radial-gradient(circle, rgba(0, 94, 133, 0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Top Section - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 lg:mb-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              {t('badge')}
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.025em' }}>
              {t('headline')} <span className="text-gradient-primary font-display">{t('headlineHighlight')}</span> {t('headlineSuffix')}
            </h2>

            <p className="text-lg lg:text-xl text-white/60 mb-6 leading-relaxed">
              {t('description1')}
            </p>

            <p className="text-white/50 mb-8 leading-relaxed">
              {t('description2')}
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/about" className="btn-primary inline-flex">
              <span>{t('cta')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Right - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:pt-8"
          >
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className={cn(
                    'group',
                    index % 2 === 1 && 'lg:mt-8'
                  )}
                >
                  <div className={cn(
                    'glass rounded-2xl lg:rounded-3xl p-6 lg:p-8 h-full',
                    'border border-white/10 hover:border-sky-500/30 transition-all duration-500',
                    'hover:bg-sky-500/10'
                  )}>
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-sky-500/20 flex items-center justify-center mb-5 group-hover:bg-sky-500/30 transition-colors">
                      <item.icon className="w-7 h-7 lg:w-8 lg:h-8 text-sky-400" />
                    </div>
                    <div className="font-mono text-4xl lg:text-5xl xl:text-6xl font-bold text-sky-400 mb-2 tracking-tight">
                      {item.value}
                    </div>
                    <p className="text-white font-semibold text-lg mb-1">{item.label}</p>
                    <p className="text-white/40 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Full Width Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          <div className="glass rounded-2xl lg:rounded-3xl p-8 lg:p-12 border border-white/5">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:border-r border-white/10 lg:pr-12">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/20 flex items-center justify-center mb-5">
                  <Shield className="w-7 h-7 text-sky-400" />
                </div>
                <h3 className="font-heading text-xl lg:text-2xl font-semibold text-white mb-3">{t('mission.title')}</h3>
                <p className="text-white/60 leading-relaxed">
                  {t('mission.text')}
                </p>
              </div>
              <div className="lg:border-r border-white/10 lg:pr-12">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="font-heading text-xl lg:text-2xl font-semibold text-white mb-3">{t('goal.title')}</h3>
                <p className="text-white/60 leading-relaxed">
                  {t('goal.text')}
                </p>
              </div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5">
                  <Zap className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="font-heading text-xl lg:text-2xl font-semibold text-white mb-3">{t('values.title')}</h3>
                <p className="text-white/60 leading-relaxed">
                  {t('values.text')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
