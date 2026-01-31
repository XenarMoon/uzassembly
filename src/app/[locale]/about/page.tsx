'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/lib/navigation'
import {
  ArrowRight,
  Quote,
  Building2,
  Users,
  Globe2,
  Landmark,
  Handshake,
  Calendar,
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'
import { cn } from '@/lib/utils'

// Leadership - static data
const chairmanConfig = {
  name: 'Muhtor Umarov',
  fullName: 'UMAROV MUKHTOR MANSURKHODJAYEVICH',
  image: '/images/team/mukhtor-umarov.webp',
}

// Team members config - only static data, roles from translations
const teamMembersConfig = [
  {
    key: 'matyakubov',
    name: 'Jurabek Matyakubov',
    image: '/images/team/MATYAKUBOV JURABEK KUZIYEVICH.JPG',
    featured: true,
  },
  {
    key: 'radjabova',
    name: 'Gulrukh Radjabova',
    image: '/images/team/RADJABOVA GULRUKH ALISHEROVNA.JPG',
    featured: true,
  },
  {
    key: 'aliyev',
    name: 'Sunnat Aliyev',
    image: '/images/team/ALIYEV SUNNAT KAMILOVICH.jpg',
    featured: true,
  },
  {
    key: 'ruzmatova',
    name: 'Sabrina Ruzmatova',
    image: '/images/team/RUZMATOVA SABRINA RUSTAMBEKOVNA.JPG',
    featured: false,
  },
  {
    key: 'ruziyeva',
    name: 'Malika Ruziyeva',
    image: '/images/team/RUZIYEVA MALIKA BAKHROM QIZI.JPG',
    featured: false,
  },
  {
    key: 'mirzarakhmatov',
    name: 'Mirsulton Mirzarakhmatov',
    image: '/images/team/MIRZARAKHMATOV MIRSULTON MIRODIL UGLI.jpg',
    featured: false,
  },
  {
    key: 'ahmadova',
    name: 'Sarvara Ahmadova',
    image: '/images/team/AHMADOVA SARVARA BAKHTIYOR QIZI.JPG',
    featured: false,
  },
]

// Key facts config
const keyFactsConfig = [
  { key: 'founded', value: '2021', icon: Calendar },
  { key: 'associations', value: '46+', icon: Building2 },
  { key: 'members', value: '100+', icon: Users },
  { key: 'team', value: '25', icon: Globe2 },
]

// Pillars config
const pillarsConfig = [
  { key: 'gr', icon: Landmark, color: 'gold' },
  { key: 'fr', icon: Globe2, color: 'turquoise' },
  { key: 'local', icon: Users, color: 'violet' },
  { key: 'ppp', icon: Handshake, color: 'emerald' },
]

// Milestones config
const milestonesConfig = [
  { year: '2021', key: '2021', icon: Building2, color: 'gold' },
  { year: '2022', key: '2022', icon: Users, color: 'turquoise' },
  { year: '2023', key: '2023', icon: Handshake, color: 'violet' },
  { year: '2024', key: '2024', icon: Globe2, color: 'emerald' },
]

export default function AboutPage() {
  const t = useTranslations('aboutPage')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])
  const orbY2 = useTransform(smoothProgress, [0, 1], [0, -300])

  // Build translated data
  const chairman = {
    ...chairmanConfig,
    role: t('chairman.role'),
    quote: t('chairman.quote'),
  }

  const teamMembers = teamMembersConfig.map((member) => ({
    ...member,
    role: t(`team.members.${member.key}.role`),
    roleEn: t(`team.members.${member.key}.roleEn`),
  }))

  const keyFacts = keyFactsConfig.map((fact) => ({
    ...fact,
    label: t(`keyFacts.${fact.key}`),
  }))

  const pillars = pillarsConfig.map((pillar) => ({
    ...pillar,
    title: t(`pillars.${pillar.key}.title`),
    subtitle: t(`pillars.${pillar.key}.subtitle`),
    description: t(`pillars.${pillar.key}.description`),
  }))

  const missionPoints = t.raw('mission.points') as string[]

  const milestones = milestonesConfig.map((milestone) => ({
    ...milestone,
    title: t(`timeline.milestones.${milestone.key}.title`),
    event: t(`timeline.milestones.${milestone.key}.event`),
    details: t(`timeline.milestones.${milestone.key}.details`),
  }))

  return (
    <>
      <Header />
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

        {/* === HERO + CHAIRMAN COMBINED === */}
        <section className="relative pt-28 lg:pt-32 pb-16 lg:pb-20">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Top: Badge + Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="badge-gold mb-4">
                <Sparkles className="w-4 h-4" />
                {t('badge')}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
                {t('headline')}{' '}
                <span className="text-gradient-gold font-display">{t('headlineHighlight')}</span>
              </h1>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                {t('description')}
              </p>
            </motion.div>

            {/* Key Facts Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
            >
              {keyFacts.map((fact, index) => (
                <div
                  key={fact.label}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                    <fact.icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <p className="font-mono text-xl font-bold text-white">{fact.value}</p>
                    <p className="text-white/40 text-xs">{fact.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Chairman Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Photo */}
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent rounded-2xl blur-2xl" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={chairman.image}
                    alt={`${chairman.name} - ${chairman.role}`}
                    fill
                    className="object-cover object-[75%_20%]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                </div>
                <div className="absolute -right-3 -bottom-3 px-4 py-2 rounded-xl bg-gold-500 text-navy-900">
                  <p className="font-mono text-xs font-semibold">2021</p>
                  <p className="text-[10px] opacity-70">{t('chairman.since')}</p>
                </div>
              </div>

              {/* Quote */}
              <div>
                <Quote className="w-10 h-10 text-gold-500/40 mb-4" />
                <blockquote className="text-xl lg:text-2xl font-heading text-white leading-relaxed mb-6">
                  {chairman.quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-px bg-gold-500" />
                  <div>
                    <p className="font-heading font-semibold text-white">{chairman.name}</p>
                    <p className="text-white/40 text-sm">{chairman.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === PILLARS + MISSION COMBINED === */}
        <section className="relative py-16 lg:py-20">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left: Mission */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                    {t('mission.badge')}
                  </span>
                  <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                    {t('mission.title')}{' '}
                    <span className="text-gradient-gold font-display">{t('mission.titleHighlight')}</span>
                  </h2>
                  <p className="text-white/50 mb-6 leading-relaxed">
                    {t('mission.description')}
                  </p>
                  <div className="space-y-3">
                    {missionPoints.map((point, index) => (
                      <motion.div
                        key={point}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/70 text-sm">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right: Pillars Grid */}
              <div className="lg:col-span-7">
                <div className="grid sm:grid-cols-2 gap-4">
                  {pillars.map((pillar, index) => (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
                        pillar.color === 'gold' && 'bg-gold-500/10',
                        pillar.color === 'turquoise' && 'bg-turquoise-500/10',
                        pillar.color === 'violet' && 'bg-violet-500/10',
                        pillar.color === 'emerald' && 'bg-emerald-500/10',
                      )}>
                        <pillar.icon className={cn(
                          'w-5 h-5',
                          pillar.color === 'gold' && 'text-gold-400',
                          pillar.color === 'turquoise' && 'text-turquoise-400',
                          pillar.color === 'violet' && 'text-violet-400',
                          pillar.color === 'emerald' && 'text-emerald-400',
                        )} />
                      </div>
                      <h3 className="font-heading font-semibold text-white mb-1 group-hover:text-gold-400 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-white/30 text-xs mb-2">{pillar.subtitle}</p>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === TEAM SECTION === */}
        <section id="leadership" className="relative py-16 lg:py-20">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/[0.02] to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                {t('team.badge')}
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                {t('team.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('team.headlineHighlight')}</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                {t('team.description')}
              </p>
            </motion.div>

            {/* Featured Team Members (Leadership) */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {teamMembers.filter(m => m.featured).map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-gold-500/30 transition-all duration-500">
                    {/* Photo */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-heading text-lg font-semibold text-white mb-1 group-hover:text-gold-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-gold-400/80 text-sm font-medium mb-1">
                        {member.role}
                      </p>
                      <p className="text-white/40 text-xs">
                        {member.roleEn}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Other Team Members */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamMembers.filter(m => !m.featured).map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative rounded-xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
                    {/* Photo */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-white text-sm mb-0.5 group-hover:text-gold-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-white/50 text-xs line-clamp-2">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === STUNNING TIMELINE SECTION === */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900" />
            {/* Animated gradient orbs */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
                filter: 'blur(60px)'
              }}
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.08, 0.15, 0.08]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(13, 148, 136, 0.12) 0%, transparent 60%)',
                filter: 'blur(50px)'
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 lg:mb-20"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 font-mono text-xs tracking-widest uppercase mb-6"
              >
                <Sparkles className="w-4 h-4" />
                {t('timeline.badge')}
              </motion.span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
                {t('timeline.headline')} <span className="text-gradient-gold font-display">{t('timeline.headlineHighlight')}</span>
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                {t('timeline.description')}
              </p>
            </motion.div>

            {/* Desktop Timeline */}
            <div className="hidden lg:block relative">
              {/* Main Timeline Line with Glow */}
              <div className="absolute top-[88px] left-0 right-0 h-1 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/30 to-gold-500/0 blur-sm" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-gold-500/20 via-gold-500/60 to-gold-500/20 rounded-full origin-left"
                />
              </div>

              {/* Timeline Cards */}
              <div className="grid grid-cols-4 gap-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                    className="relative pt-4"
                  >
                    {/* Animated Node */}
                    <div className="flex justify-center mb-8 relative z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.15, type: 'spring' }}
                        className="relative"
                      >
                        {/* Outer glow ring */}
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          className={cn(
                            'absolute -inset-3 rounded-full blur-md',
                            milestone.color === 'gold' && 'bg-gold-500/40',
                            milestone.color === 'turquoise' && 'bg-turquoise-500/40',
                            milestone.color === 'violet' && 'bg-violet-500/40',
                            milestone.color === 'emerald' && 'bg-emerald-500/40',
                          )}
                        />
                        {/* Main node */}
                        <div className={cn(
                          'w-14 h-14 rounded-2xl flex items-center justify-center relative border-2 shadow-2xl',
                          milestone.color === 'gold' && 'bg-gradient-to-br from-gold-500 to-amber-600 border-gold-400',
                          milestone.color === 'turquoise' && 'bg-gradient-to-br from-turquoise-500 to-teal-600 border-turquoise-400',
                          milestone.color === 'violet' && 'bg-gradient-to-br from-violet-500 to-purple-600 border-violet-400',
                          milestone.color === 'emerald' && 'bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-400',
                        )}>
                          <milestone.icon className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="group relative"
                    >
                      {/* Card glow on hover */}
                      <div className={cn(
                        'absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl',
                        milestone.color === 'gold' && 'bg-gold-500/20',
                        milestone.color === 'turquoise' && 'bg-turquoise-500/20',
                        milestone.color === 'violet' && 'bg-violet-500/20',
                        milestone.color === 'emerald' && 'bg-emerald-500/20',
                      )} />

                      <div className={cn(
                        'relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500',
                        'bg-white/[0.03] border-white/10',
                        'group-hover:bg-white/[0.06] group-hover:border-white/20'
                      )}>
                        {/* Year Badge */}
                        <div className={cn(
                          'inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-4',
                          milestone.color === 'gold' && 'bg-gold-500/20',
                          milestone.color === 'turquoise' && 'bg-turquoise-500/20',
                          milestone.color === 'violet' && 'bg-violet-500/20',
                          milestone.color === 'emerald' && 'bg-emerald-500/20',
                        )}>
                          <span className={cn(
                            'font-mono text-2xl font-bold',
                            milestone.color === 'gold' && 'text-gold-400',
                            milestone.color === 'turquoise' && 'text-turquoise-400',
                            milestone.color === 'violet' && 'text-violet-400',
                            milestone.color === 'emerald' && 'text-emerald-400',
                          )}>
                            {milestone.year}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                          {milestone.title}
                        </h3>

                        {/* Event */}
                        <p className="text-white/70 text-sm mb-3 leading-relaxed">
                          {milestone.event}
                        </p>

                        {/* Details */}
                        <p className="text-white/40 text-xs leading-relaxed">
                          {milestone.details}
                        </p>

                        {/* Decorative corner */}
                        <div className={cn(
                          'absolute top-0 right-0 w-20 h-20 opacity-10 rounded-tr-2xl overflow-hidden',
                        )}>
                          <div className={cn(
                            'absolute -top-10 -right-10 w-20 h-20 rounded-full',
                            milestone.color === 'gold' && 'bg-gold-500',
                            milestone.color === 'turquoise' && 'bg-turquoise-500',
                            milestone.color === 'violet' && 'bg-violet-500',
                            milestone.color === 'emerald' && 'bg-emerald-500',
                          )} />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline - Vertical */}
            <div className="lg:hidden relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500/50 via-turquoise-500/50 to-emerald-500/50" />

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-16"
                  >
                    {/* Node */}
                    <div className="absolute left-0 top-0">
                      <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center border-2 shadow-lg',
                        milestone.color === 'gold' && 'bg-gradient-to-br from-gold-500 to-amber-600 border-gold-400',
                        milestone.color === 'turquoise' && 'bg-gradient-to-br from-turquoise-500 to-teal-600 border-turquoise-400',
                        milestone.color === 'violet' && 'bg-gradient-to-br from-violet-500 to-purple-600 border-violet-400',
                        milestone.color === 'emerald' && 'bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-400',
                      )}>
                        <milestone.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Card */}
                    <div className={cn(
                      'p-5 rounded-2xl border backdrop-blur-sm',
                      'bg-white/[0.03] border-white/10'
                    )}>
                      {/* Year */}
                      <span className={cn(
                        'font-mono text-xl font-bold mb-2 block',
                        milestone.color === 'gold' && 'text-gold-400',
                        milestone.color === 'turquoise' && 'text-turquoise-400',
                        milestone.color === 'violet' && 'text-violet-400',
                        milestone.color === 'emerald' && 'text-emerald-400',
                      )}>
                        {milestone.year}
                      </span>
                      <h3 className="font-heading text-base font-semibold text-white mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-2">
                        {milestone.event}
                      </p>
                      <p className="text-white/40 text-xs leading-relaxed">
                        {milestone.details}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 lg:mt-20 p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] border border-white/10"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                <div className="text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="font-mono text-3xl lg:text-4xl font-bold text-gold-400 block"
                  >
                    4+
                  </motion.span>
                  <span className="text-white/50 text-sm">{t('timeline.stats.experience')}</span>
                </div>
                <div className="text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="font-mono text-3xl lg:text-4xl font-bold text-turquoise-400 block"
                  >
                    46+
                  </motion.span>
                  <span className="text-white/50 text-sm">{t('timeline.stats.associations')}</span>
                </div>
                <div className="text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="font-mono text-3xl lg:text-4xl font-bold text-violet-400 block"
                  >
                    100+
                  </motion.span>
                  <span className="text-white/50 text-sm">{t('timeline.stats.members')}</span>
                </div>
                <div className="text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="font-mono text-3xl lg:text-4xl font-bold text-emerald-400 block"
                  >
                    20+
                  </motion.span>
                  <span className="text-white/50 text-sm">{t('timeline.stats.projects')}</span>
                </div>
              </div>
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
                {t('cta.headline')} <span className="text-gradient-gold font-display">{t('cta.headlineHighlight')}</span>
              </h2>
              <p className="text-white/50 mb-8">
                {t('cta.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/membership" className="btn-primary">
                  <span>{t('cta.button')}</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  {t('cta.contact')}
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
