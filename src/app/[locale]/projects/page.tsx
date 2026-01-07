'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  Train,
  Car,
  Cpu,
  Factory,
  Heart,
  Sun,
  GraduationCap,
  Baby,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  Users,
  Target,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'
import { cn } from '@/lib/utils'

// Project categories config
const categoriesConfig = [
  { id: 'all', key: 'all', count: 9 },
  { id: 'infrastructure', key: 'infrastructure', count: 2 },
  { id: 'smart-city', key: 'smartCity', count: 1 },
  { id: 'industrial', key: 'industrial', count: 1 },
  { id: 'healthcare', key: 'healthcare', count: 2 },
  { id: 'energy', key: 'energy', count: 1 },
  { id: 'education', key: 'education', count: 2 },
]

// Projects config with translation keys
const projectsConfig = [
  { id: 1, key: 'tramway', investment: "$500M+", year: "2024-2028", category: "infrastructure", icon: Train, color: "turquoise", featured: true },
  { id: 2, key: 'ringRoad', investment: "$800M+", year: "2025-2029", category: "infrastructure", icon: Car, color: "gold", featured: false },
  { id: 3, key: 'smartCity', investment: "$20B+", year: "2024-2035", category: "smart-city", icon: Cpu, color: "gold", featured: true },
  { id: 4, key: 'industrialPark', investment: "$350M", year: "2024-2027", category: "industrial", icon: Factory, color: "emerald", featured: false },
  { id: 5, key: 'stateHospital', investment: "$400M", year: "2025-2028", category: "healthcare", icon: Heart, color: "rose", featured: false },
  { id: 6, key: 'privateClinic', investment: "$80M", year: "2024-2026", category: "healthcare", icon: Heart, color: "violet", featured: false },
  { id: 7, key: 'solarEnergy', investment: "$200M", year: "2024-2026", category: "energy", icon: Sun, color: "amber", featured: false },
  { id: 8, key: 'eduJob', investment: "$15M", year: "2023-ongoing", category: "education", icon: GraduationCap, color: "violet", featured: true },
  { id: 9, key: 'kidsTime', investment: "$5M", year: "2023-ongoing", category: "education", icon: Baby, color: "rose", featured: false },
]

// Color mappings
const colorClasses = {
  gold: {
    bg: 'bg-gold-500/10',
    border: 'border-gold-500/30',
    text: 'text-gold-400',
    badge: 'bg-gold-500/20 text-gold-400',
    gradient: 'from-gold-500/20 via-navy-800/50 to-navy-900',
    hover: 'hover:border-gold-500/50',
  },
  turquoise: {
    bg: 'bg-turquoise-500/10',
    border: 'border-turquoise-500/30',
    text: 'text-turquoise-400',
    badge: 'bg-turquoise-500/20 text-turquoise-400',
    gradient: 'from-turquoise-500/20 via-navy-800/50 to-navy-900',
    hover: 'hover:border-turquoise-500/50',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-400',
    gradient: 'from-emerald-500/20 via-navy-800/50 to-navy-900',
    hover: 'hover:border-emerald-500/50',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    badge: 'bg-violet-500/20 text-violet-400',
    gradient: 'from-violet-500/20 via-navy-800/50 to-navy-900',
    hover: 'hover:border-violet-500/50',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    badge: 'bg-rose-500/20 text-rose-400',
    gradient: 'from-rose-500/20 via-navy-800/50 to-navy-900',
    hover: 'hover:border-rose-500/50',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-400',
    gradient: 'from-amber-500/20 via-navy-800/50 to-navy-900',
    hover: 'hover:border-amber-500/50',
  },
}

export default function ProjectsPage() {
  const t = useTranslations('projectsPage')
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Build translated arrays
  const categories = categoriesConfig.map((cat) => ({
    ...cat,
    name: t(`categories.${cat.key}`),
  }))

  const projects = projectsConfig.map((proj) => ({
    ...proj,
    title: t(`projects.${proj.key}.title`),
    titleEn: t(`projects.${proj.key}.titleEn`),
    description: t(`projects.${proj.key}.description`),
    fullDescription: t(`projects.${proj.key}.fullDescription`),
    location: t(`projects.${proj.key}.location`),
    status: t(`projects.${proj.key}.status`),
    partners: t.raw(`projects.${proj.key}.partners`) as string[],
    benefits: t.raw(`projects.${proj.key}.benefits`) as string[],
    stats: (t.raw(`projects.${proj.key}.stats`) as { label: string; value: string }[]),
  }))

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])
  const orbY2 = useTransform(smoothProgress, [0, 1], [0, -300])

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const featuredProjects = projects.filter(p => p.featured)

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

        {/* === HERO SECTION === */}
        <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-20">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="badge-gold mb-6">
                <Sparkles className="w-4 h-4" />
                {t('hero.badge')}
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
                {t('hero.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('hero.headlineHighlight')}</span>{' '}
                {t('hero.headlineSuffix')}
              </h1>

              <p className="text-lg lg:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
                {t('hero.description')}
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {[
                { value: '$25B+', label: t('stats.investment') },
                { value: '9', label: t('stats.activeProjects') },
                { value: '20+', label: t('stats.partners') },
                { value: '60K+', label: t('stats.jobs') },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                  <p className="font-mono text-2xl lg:text-3xl font-bold text-gold-400">{stat.value}</p>
                  <p className="text-white/40 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* === FEATURED PROJECTS === */}
        <section className="relative py-12 lg:py-16">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-2 block">
                {t('featuredSection.badge')}
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                {t('featuredSection.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('featuredSection.headlineHighlight')}</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => {
                const colors = colorClasses[project.color as keyof typeof colorClasses]
                const IconComponent = project.icon

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className={cn(
                        'group relative h-full rounded-2xl overflow-hidden cursor-pointer',
                        'bg-gradient-to-br border transition-all duration-500',
                        colors.gradient,
                        colors.border,
                        colors.hover
                      )}
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                          backgroundSize: '30px 30px',
                        }}
                      />

                      <div className="relative p-6 lg:p-8 h-full flex flex-col">
                        {/* Icon & Status */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colors.bg)}>
                            <IconComponent className={cn('w-6 h-6', colors.text)} />
                          </div>
                          <span className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1',
                            project.status === t('status.active')
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          )}>
                            {project.status === t('status.active') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                            {project.status}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-heading text-xl lg:text-2xl font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/50 text-sm mb-4 flex-grow">
                          {project.description}
                        </p>

                        {/* Location & Investment */}
                        <div className="space-y-3 pt-4 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white/40 text-sm">
                              <MapPin className="w-4 h-4" />
                              <span>{project.location}</span>
                            </div>
                            <span className={cn('font-mono font-bold', colors.text)}>
                              {project.investment}
                            </span>
                          </div>

                          {/* Mini Stats */}
                          <div className="grid grid-cols-3 gap-2">
                            {project.stats.map((stat) => (
                              <div key={stat.label} className="text-center p-2 rounded-lg bg-navy-900/50">
                                <p className="font-mono text-sm font-bold text-white">{stat.value}</p>
                                <p className="text-white/30 text-xs">{stat.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-4 flex items-center gap-2 text-gold-400 group-hover:text-gold-300 transition-colors">
                          <span className="text-sm font-medium">{t('common.details')}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* === ALL PROJECTS WITH FILTER === */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header with Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8"
            >
              <div>
                <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-2 block">
                  {t('directory.badge')}
                </span>
                <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                  {t('directory.headline')}{' '}
                  <span className="text-gradient-gold font-display">{t('directory.headlineHighlight')}</span>
                </h2>
              </div>

              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 rounded-md transition-colors',
                      viewMode === 'grid' ? 'bg-gold-500 text-navy-900' : 'text-white/50 hover:text-white'
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 rounded-md transition-colors',
                      viewMode === 'list' ? 'bg-gold-500 text-navy-900' : 'text-white/50 hover:text-white'
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    activeCategory === category.id
                      ? 'bg-gold-500 text-navy-900'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                  )}
                >
                  {category.name}
                  <span className={cn(
                    'ml-2 px-1.5 py-0.5 rounded-full text-xs',
                    activeCategory === category.id
                      ? 'bg-navy-900/20 text-navy-900'
                      : 'bg-white/10 text-white/40'
                  )}>
                    {category.count}
                  </span>
                </button>
              ))}
            </motion.div>

            {/* Projects Grid/List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  viewMode === 'grid'
                    ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                )}
              >
                {filteredProjects.map((project, index) => {
                  const colors = colorClasses[project.color as keyof typeof colorClasses]
                  const IconComponent = project.icon

                  if (viewMode === 'list') {
                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={cn(
                          'group relative rounded-xl overflow-hidden cursor-pointer',
                          'bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300'
                        )}
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="p-5 lg:p-6">
                          <div className="flex items-center gap-6">
                            {/* Icon */}
                            <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0', colors.bg)}>
                              <IconComponent className={cn('w-7 h-7', colors.text)} />
                            </div>

                            {/* Content */}
                            <div className="flex-grow min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h3 className="font-heading text-lg font-semibold text-white group-hover:text-gold-400 transition-colors">
                                    {project.title}
                                  </h3>
                                  <p className="text-white/50 text-sm mt-1 line-clamp-1">
                                    {project.description}
                                  </p>
                                </div>
                                <span className={cn(
                                  'px-3 py-1 rounded-full text-xs font-medium flex-shrink-0',
                                  project.status === t('status.active')
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-amber-500/20 text-amber-400'
                                )}>
                                  {project.status}
                                </span>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
                              <div className="text-right">
                                <p className={cn('font-mono text-lg font-bold', colors.text)}>{project.investment}</p>
                                <p className="text-white/30 text-xs">{t('labels.investment')}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-1 text-white/40 text-sm">
                                  <MapPin className="w-4 h-4" />
                                  <span>{project.location}</span>
                                </div>
                                <p className="text-white/30 text-xs mt-1">{project.year}</p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  }

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        'group relative rounded-2xl overflow-hidden cursor-pointer',
                        'bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300',
                        'hover:bg-white/[0.04]'
                      )}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colors.bg)}>
                            <IconComponent className={cn('w-6 h-6', colors.text)} />
                          </div>
                          <span className={cn(
                            'px-2.5 py-1 rounded-full text-xs font-medium',
                            project.status === t('status.active')
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          )}>
                            {project.status}
                          </span>
                        </div>

                        {/* Content */}
                        <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/50 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex items-center gap-1.5 text-white/40 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate max-w-[120px]">{project.location}</span>
                          </div>
                          <span className={cn('font-mono font-bold text-sm', colors.text)}>
                            {project.investment}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* === PARTNERS SECTION === */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/[0.02] to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                {t('partners.badge')}
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                {t('partners.headline')}{' '}
                <span className="text-gradient-gold font-display">{t('partners.headlineHighlight')}</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto mb-8">
                {t('partners.description')}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {(t.raw('partners.list') as string[]).map((partner, index) => (
                  <motion.div
                    key={partner}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 text-sm font-medium"
                  >
                    {partner}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* === CTA SECTION === */}
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

        {/* === PROJECT DETAIL MODAL === */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/90 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-navy-800 border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const colors = colorClasses[selectedProject.color as keyof typeof colorClasses]
                  const IconComponent = selectedProject.icon

                  return (
                    <>
                      {/* Header */}
                      <div className={cn('p-6 lg:p-8 bg-gradient-to-br', colors.gradient)}>
                        <div className="flex items-start gap-4">
                          <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center', colors.bg)}>
                            <IconComponent className={cn('w-7 h-7', colors.text)} />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-2">
                              <h2 className="font-heading text-2xl font-semibold text-white">
                                {selectedProject.title}
                              </h2>
                              <span className={cn(
                                'px-3 py-1 rounded-full text-xs font-medium',
                                selectedProject.status === t('status.active')
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-amber-500/20 text-amber-400'
                              )}>
                                {selectedProject.status}
                              </span>
                            </div>
                            <p className="text-white/50">{selectedProject.titleEn}</p>
                          </div>
                          <button
                            onClick={() => setSelectedProject(null)}
                            className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 mt-6">
                          {selectedProject.stats.map((stat) => (
                            <div key={stat.label} className="text-center p-3 rounded-xl bg-navy-900/50">
                              <p className="font-mono text-xl font-bold text-white">{stat.value}</p>
                              <p className="text-white/40 text-xs">{stat.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 lg:p-8 space-y-6">
                        {/* Description */}
                        <div>
                          <h3 className="font-semibold text-white mb-2">{t('modal.aboutProject')}</h3>
                          <p className="text-white/60 leading-relaxed">{selectedProject.fullDescription}</p>
                        </div>

                        {/* Meta Info */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
                              <MapPin className="w-4 h-4" />
                              <span>{t('labels.location')}</span>
                            </div>
                            <p className="text-white font-medium">{selectedProject.location}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
                              <Calendar className="w-4 h-4" />
                              <span>{t('labels.duration')}</span>
                            </div>
                            <p className="text-white font-medium">{selectedProject.year}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{t('labels.investment')}</span>
                            </div>
                            <p className={cn('font-mono font-bold text-lg', colors.text)}>{selectedProject.investment}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
                              <Target className="w-4 h-4" />
                              <span>{t('labels.status')}</span>
                            </div>
                            <p className={cn(
                              'font-medium',
                              selectedProject.status === t('status.active') ? 'text-emerald-400' : 'text-amber-400'
                            )}>
                              {selectedProject.status}
                            </p>
                          </div>
                        </div>

                        {/* Benefits */}
                        <div>
                          <h3 className="font-semibold text-white mb-3">{t('modal.benefits')}</h3>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {selectedProject.benefits.map((benefit) => (
                              <div key={benefit} className="flex items-center gap-2 text-white/60 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Partners */}
                        <div>
                          <h3 className="font-semibold text-white mb-3">{t('modal.partners')}</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.partners.map((partner) => (
                              <span
                                key={partner}
                                className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-sm border border-white/10"
                              >
                                {partner}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex gap-3 pt-4">
                          <Link
                            href="/contact"
                            className="flex-1 btn-primary justify-center"
                            onClick={() => setSelectedProject(null)}
                          >
                            <span>{t('cta.contactButton')}</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setSelectedProject(null)}
                            className="btn-secondary"
                          >
                            {t('modal.close')}
                          </button>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
      <Footer />
    </>
  )
}
