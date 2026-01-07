'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Users,
  Award,
  BookOpen,
  Target,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
  Building2,
  Globe2,
  Sparkles,
  FileCheck,
  UserCheck,
  Laptop
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'

const eduJobStatsConfig = [
  { key: 'students', value: '10K+' },
  { key: 'companies', value: '500+' },
  { key: 'employment', value: '85%' },
  { key: 'courses', value: '50+' },
]

const eduJobFeaturesConfig = [
  { key: 'professionalEducation', icon: BookOpen },
  { key: 'jobDatabase', icon: Briefcase },
  { key: 'mentoring', icon: Users },
  { key: 'certification', icon: Award },
]

const educationTracksConfig = [
  { key: 'it', icon: Laptop },
  { key: 'business', icon: TrendingUp },
  { key: 'industry', icon: Building2 },
]

export default function EduJobPage() {
  const t = useTranslations('eduJobPage')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])

  // Build translated arrays
  const eduJobStats = eduJobStatsConfig.map((stat) => ({
    ...stat,
    label: t(`stats.${stat.key}.label`),
    description: t(`stats.${stat.key}.description`),
  }))

  const eduJobFeatures = eduJobFeaturesConfig.map((feature) => ({
    ...feature,
    title: t(`features.${feature.key}.title`),
    description: t(`features.${feature.key}.description`),
  }))

  const educationTracks = educationTracksConfig.map((track) => ({
    ...track,
    title: t(`tracks.${track.key}.title`),
    courses: t.raw(`tracks.${track.key}.courses`) as string[],
  }))

  const partnerCompanies = t.raw('partnerCompanies') as string[]

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
                radial-gradient(ellipse 60% 40% at 30% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 70% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)
              `
            }}
          />
          <motion.div
            style={{ y: orbY1 }}
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            initial={{ x: '50%', y: '30%' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-emerald-500/40 to-turquoise-400/20 rounded-full" />
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
                    <GraduationCap className="w-4 h-4" />
                    {t('hero.badge')}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {t('hero.activeBadge')}
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
                  Human Capital{' '}
                  <span className="text-gradient-gold font-display">Development</span>
                </h1>

                <p className="text-lg text-white/50 mb-6 leading-relaxed">
                  {t('hero.description')}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    <span>{t('hero.registerButton')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="#tracks" className="btn-secondary">
                    {t('hero.tracksButton')}
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
                {eduJobStats.map((stat) => (
                  <div
                    key={stat.key}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <p className="font-mono text-3xl font-bold text-emerald-400">{stat.value}</p>
                    <p className="text-white font-medium">{stat.label}</p>
                    <p className="text-white/40 text-sm">{stat.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                Edu-Job
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                {t('featuresSection.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('featuresSection.headlineHighlight')}</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eduJobFeatures.map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Tracks */}
        <section id="tracks" className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.02] via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                {t('tracksSection.badge')}
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                {t('tracksSection.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('tracksSection.headlineHighlight')}</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                {t('tracksSection.description')}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {educationTracks.map((track, index) => (
                <motion.div
                  key={track.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <track.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-4">{track.title}</h3>
                  <ul className="space-y-2">
                    {track.courses.map((course) => (
                      <li key={course} className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Companies */}
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
                  <Building2 className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">
                  {t('partnersTitle')}
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {partnerCompanies.map((company) => (
                  <div key={company} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-white/70">{company}</span>
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
                  {t('cta.companiesButton')}
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
