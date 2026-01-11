'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import {
  ArrowLeft,
  ArrowRight,
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
  Users,
  Target,
  CheckCircle2,
  ExternalLink,
  Share2,
  Bookmark,
  TrendingUp,
  Globe2
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'
import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'

// Project configuration
const projectsConfig = [
  { id: 1, key: 'tramway', investment: "$500M+", year: "2024-2028", category: "infrastructure", icon: Train, color: "sky" },
  { id: 2, key: 'ringRoad', investment: "$800M+", year: "2025-2029", category: "infrastructure", icon: Car, color: "orange" },
  { id: 3, key: 'smartCity', investment: "$20B+", year: "2024-2035", category: "smartCity", icon: Cpu, color: "sky" },
  { id: 4, key: 'industrialPark', investment: "$350M", year: "2024-2027", category: "industrial", icon: Factory, color: "emerald" },
  { id: 5, key: 'stateHospital', investment: "$400M", year: "2025-2028", category: "healthcare", icon: Heart, color: "rose" },
  { id: 6, key: 'privateClinic', investment: "$80M", year: "2024-2026", category: "healthcare", icon: Heart, color: "violet" },
  { id: 7, key: 'solarEnergy', investment: "$200M", year: "2024-2026", category: "energy", icon: Sun, color: "amber" },
  { id: 8, key: 'eduJob', investment: "$15M", year: "2023-ongoing", category: "education", icon: GraduationCap, color: "violet" },
  { id: 9, key: 'kidsTime', investment: "$5M", year: "2023-ongoing", category: "education", icon: Baby, color: "rose" },
]

// Color classes
const colorClasses: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  sky: {
    bg: 'bg-sky-500/20',
    text: 'text-sky-400',
    border: 'border-sky-500/30',
    gradient: 'from-sky-500/20 via-primary-700 to-primary-800',
  },
  orange: {
    bg: 'bg-orange-500/20',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
    gradient: 'from-orange-500/20 via-primary-700 to-primary-800',
  },
  emerald: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    gradient: 'from-emerald-500/20 via-primary-700 to-primary-800',
  },
  violet: {
    bg: 'bg-violet-500/20',
    text: 'text-violet-400',
    border: 'border-violet-500/30',
    gradient: 'from-violet-500/20 via-primary-700 to-primary-800',
  },
  rose: {
    bg: 'bg-rose-500/20',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
    gradient: 'from-rose-500/20 via-primary-700 to-primary-800',
  },
  amber: {
    bg: 'bg-amber-500/20',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    gradient: 'from-amber-500/20 via-primary-700 to-primary-800',
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const t = useTranslations('projectsPage')
  const projectId = parseInt(params.id as string)

  // Find project config
  const projectConfig = projectsConfig.find(p => p.id === projectId)

  if (!projectConfig) {
    return (
      <main className="min-h-screen bg-primary-500">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
            <p className="text-white/60 mb-8">The project you're looking for doesn't exist.</p>
            <Link href="/projects" className="btn-primary inline-flex">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Projects</span>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const colors = colorClasses[projectConfig.color] || colorClasses.sky
  const IconComponent = projectConfig.icon

  // Get translations for this project
  const title = t(`projects.${projectConfig.key}.title`)
  const titleEn = t(`projects.${projectConfig.key}.titleEn`)
  const description = t(`projects.${projectConfig.key}.description`)
  const fullDescription = t(`projects.${projectConfig.key}.fullDescription`)
  const location = t(`projects.${projectConfig.key}.location`)
  const status = t(`projects.${projectConfig.key}.status`)
  const partners = t.raw(`projects.${projectConfig.key}.partners`) as string[]
  const benefits = t.raw(`projects.${projectConfig.key}.benefits`) as string[]
  const stats = t.raw(`projects.${projectConfig.key}.stats`) as { label: string; value: string }[]

  // Get adjacent projects for navigation
  const currentIndex = projectsConfig.findIndex(p => p.id === projectId)
  const prevProject = currentIndex > 0 ? projectsConfig[currentIndex - 1] : null
  const nextProject = currentIndex < projectsConfig.length - 1 ? projectsConfig[currentIndex + 1] : null

  return (
    <main className="min-h-screen bg-primary-500">
      <Header />

      {/* Hero Section */}
      <section className={cn('relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-br', colors.gradient)}>
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(62, 158, 238, 0.15) 0%, transparent 70%)',
              filter: 'blur(80px)',
              top: '-20%',
              right: '-10%',
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-white/50 text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-white">{title}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Status Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className={cn('px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2', colors.bg, colors.text)}>
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  {status}
                </span>
                <span className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm font-medium">
                  {t(`categories.${projectConfig.category}`)}
                </span>
              </div>

              {/* Icon and Title */}
              <div className="flex items-start gap-5 mb-6">
                <div className={cn('w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0', colors.bg)}>
                  <IconComponent className={cn('w-10 h-10', colors.text)} />
                </div>
                <div>
                  <p className={cn('text-sm font-medium uppercase tracking-wider mb-2', colors.text)}>{titleEn}</p>
                  <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                    {title}
                  </h1>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                {description}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colors.bg)}>
                    <DollarSign className={cn('w-6 h-6', colors.text)} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Investment</p>
                    <p className="text-white font-bold text-xl">{projectConfig.investment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colors.bg)}>
                    <Calendar className={cn('w-6 h-6', colors.text)} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Timeline</p>
                    <p className="text-white font-bold text-xl">{projectConfig.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colors.bg)}>
                    <MapPin className={cn('w-6 h-6', colors.text)} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Location</p>
                    <p className="text-white font-bold text-xl">{location}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  <span>Invest in Project</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn-secondary">
                  <Share2 className="w-5 h-5" />
                  <span>Share Project</span>
                </button>
              </div>
            </motion.div>

            {/* Right - Key Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className={cn(
                    'glass rounded-2xl p-6 lg:p-8 text-center',
                    index === 0 && 'col-span-2'
                  )}
                >
                  <p className={cn('font-display text-4xl lg:text-5xl font-bold mb-2', colors.text)}>
                    {stat.value}
                  </p>
                  <p className="text-white/60 text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary-700 via-primary-600 to-primary-500">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left - Full Description */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h2 className="font-heading text-3xl font-semibold text-white mb-6">{t('modal.aboutProject')}</h2>
              <div className="glass rounded-2xl p-8 mb-8">
                <p className="text-white/70 text-lg leading-relaxed">
                  {fullDescription}
                </p>
              </div>

              {/* Benefits */}
              <h3 className="font-heading text-2xl font-semibold text-white mb-6">{t('modal.benefits')}</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center gap-3 glass rounded-xl p-4"
                  >
                    <CheckCircle2 className={cn('w-5 h-5 flex-shrink-0', colors.text)} />
                    <span className="text-white/80">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Partners */}
              <h3 className="font-heading text-2xl font-semibold text-white mb-6">{t('modal.partners')}</h3>
              <div className="flex flex-wrap gap-3">
                {partners.map((partner) => (
                  <span
                    key={partner}
                    className="px-5 py-3 rounded-full bg-white/[0.05] border border-white/10 text-white/70 text-sm font-medium"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right - Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Investment Card */}
              <div className={cn('glass rounded-2xl p-6 border', colors.border)}>
                <h4 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className={cn('w-5 h-5', colors.text)} />
                  Investment Details
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Total Investment</span>
                    <span className="text-white font-bold">{projectConfig.investment}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Timeline</span>
                    <span className="text-white font-bold">{projectConfig.year}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Status</span>
                    <span className={cn('font-bold', colors.text)}>{status}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-white/60">Location</span>
                    <span className="text-white font-bold">{location}</span>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="glass rounded-2xl p-6">
                <h4 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-sky-400" />
                  Interested in this project?
                </h4>
                <p className="text-white/60 text-sm mb-4">
                  Contact us for more information about investment opportunities and partnership.
                </p>
                <Link href="/contact" className="btn-primary w-full justify-center">
                  <span>Contact Us</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white/70 hover:bg-white/10 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white/70 hover:bg-white/10 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  <span className="text-sm">Save</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="py-12 bg-primary-700 border-t border-white/10">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.id}`}
                className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wider mb-1">Previous Project</p>
                  <p className="font-semibold text-white">{t(`projects.${prevProject.key}.title`)}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/projects"
              className="px-6 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              All Projects
            </Link>

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors"
              >
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider mb-1">Next Project</p>
                  <p className="font-semibold text-white">{t(`projects.${nextProject.key}.title`)}</p>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
