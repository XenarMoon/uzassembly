'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { ArrowRight, MapPin, DollarSign, Calendar, Building2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const projectsConfig = [
  {
    id: 1,
    key: 'smartCity',
    investment: "$2.5B",
    statusKey: 'active',
    year: "2024-2030",
    featured: true,
    image: "/images/smart-city.jpg",
    categoryKey: 'smartCity',
  },
  {
    id: 2,
    key: 'industrialPark',
    investment: "$800M",
    statusKey: 'planned',
    year: "2025-2028",
    image: "/images/industrial.jpg",
    categoryKey: 'industrial',
  },
  {
    id: 3,
    key: 'agroTechHub',
    investment: "$350M",
    statusKey: 'active',
    year: "2024-2027",
    image: "/images/agro.jpg",
    categoryKey: 'agro',
  },
  {
    id: 4,
    key: 'textileCenter',
    investment: "$500M",
    statusKey: 'active',
    year: "2024-2026",
    image: "/images/textile.jpg",
    categoryKey: 'manufacturing',
  },
]

export default function Projects() {
  const t = useTranslations('projects')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const projects = projectsConfig.map((project) => ({
    ...project,
    title: t(`items.${project.key}.title`),
    description: t(`items.${project.key}.description`),
    location: t(`items.${project.key}.location`),
    status: t(`statuses.${project.statusKey}`),
    category: t(`categories.${project.categoryKey}`),
  }))

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-primary-500"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(62, 158, 238, 0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
            bottom: '10%',
            left: '-10%',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <span className="badge-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              {t('badge')}
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white" style={{ letterSpacing: '-0.025em' }}>
              {t('headline')} <span className="text-gradient-primary font-display">{t('headlineHighlight')}</span>
            </h2>
          </div>

          <Link href="/projects" className="btn-secondary inline-flex items-center gap-2 self-start md:self-auto">
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Featured Project */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 xl:col-span-8"
          >
            <Link href={`/projects/${projects[0].id}`} className="group block h-full">
              <div className={cn(
                'relative h-full min-h-[500px] rounded-3xl overflow-hidden',
                'bg-gradient-to-br from-orange-500/20 via-primary-600/80 to-primary-700',
                'border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500'
              )}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `linear-gradient(rgba(242, 122, 33, 0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(242, 122, 33, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Status Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium">
                      {projects[0].category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {projects[0].status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4 group-hover:text-orange-400 transition-colors" style={{ letterSpacing: '-0.02em' }}>
                    {projects[0].title}
                  </h3>

                  <p className="text-white/60 text-lg mb-8 max-w-md">
                    {projects[0].description}
                  </p>

                  {/* Stats */}
                  <div className="flex-1" />
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center gap-2 text-orange-400 mb-2">
                        <DollarSign className="w-5 h-5" />
                        <span className="text-sm text-white/50">{t('labels.investment')}</span>
                      </div>
                      <p className="font-mono text-2xl font-bold text-white tracking-tight">{projects[0].investment}</p>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center gap-2 text-orange-400 mb-2">
                        <MapPin className="w-5 h-5" />
                        <span className="text-sm text-white/50">{t('labels.location')}</span>
                      </div>
                      <p className="font-heading text-lg font-semibold text-white">{projects[0].location}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex items-center gap-2 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <span className="font-medium">{t('readMore')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other Projects */}
          <div className="lg:col-span-5 xl:col-span-4 grid gap-4">
            {projects.slice(1).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Link href={`/projects/${project.id}`} className="group block">
                  <div className={cn(
                    'glass rounded-2xl p-5 lg:p-6 h-full',
                    'border border-white/10 hover:border-sky-500/30 transition-all duration-300',
                    'hover:bg-sky-500/10'
                  )}>
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-sm font-medium">
                        {project.category}
                      </span>
                      <span className={cn(
                        'text-xs font-medium px-2 py-1 rounded-full',
                        project.statusKey === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      )}>
                        {project.status}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg lg:text-xl font-semibold text-white mb-2 group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-white/50 text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-white/40">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sky-400">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold">{project.investment}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
