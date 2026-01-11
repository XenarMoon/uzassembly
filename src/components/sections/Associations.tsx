'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from '@/lib/navigation'
import { ArrowRight, Building2, Factory, Wheat, Cpu, Car, Shirt, Pill, Construction, Zap } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const associationsConfig = [
  { key: 'textile', icon: Shirt, members: 450 },
  { key: 'pharma', icon: Pill, members: 120 },
  { key: 'construction', icon: Construction, members: 380 },
  { key: 'it', icon: Cpu, members: 890 },
  { key: 'automotive', icon: Car, members: 85 },
  { key: 'agriculture', icon: Wheat, members: 1200 },
  { key: 'energy', icon: Zap, members: 95 },
  { key: 'food', icon: Factory, members: 650 },
]

export default function Associations() {
  const t = useTranslations('associations')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const sectorKeyMap: Record<string, string> = {
    textile: 'lightIndustry',
    pharma: 'medicine',
    construction: 'construction',
    it: 'it',
    automotive: 'automotive',
    agriculture: 'agriculture',
    energy: 'energy',
    food: 'food',
  }

  const associations = associationsConfig.map((assoc) => ({
    ...assoc,
    name: t(`cards.${assoc.key}.name`),
    sector: t(`sectors.${sectorKeyMap[assoc.key]}`),
  }))

  // Duplicate for seamless loop
  const duplicatedAssociations = [...associations, ...associations]

  return (
    <section
      id="associations"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-primary-500 via-primary-600 to-primary-700 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(62, 158, 238, 0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '20%',
            left: '-10%',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
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
          className="text-center mb-16"
        >
          <span className="badge-primary mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            {t('badge')}
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6" style={{ letterSpacing: '-0.025em' }}>
            {t('headline')} <span className="text-gradient-sky font-display">{t('headlineHighlight')}</span>
          </h2>

          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>
      </div>

      {/* Marquee Carousel */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary-600 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary-600 to-transparent z-10 pointer-events-none" />

        {/* First Row - Left to Right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4 mb-4 animate-marquee"
        >
          {duplicatedAssociations.map((assoc, index) => (
            <Link
              key={`row1-${index}`}
              href="/associations"
              className="group flex-shrink-0"
            >
              <div className={cn(
                'rounded-2xl p-5 w-[280px] transition-all duration-300',
                'bg-white/[0.03] border border-white/10 hover:border-sky-500/30',
                'hover:bg-white/[0.06] backdrop-blur-sm'
              )}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500/30 transition-colors">
                    <assoc.icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white truncate group-hover:text-sky-400 transition-colors">
                      {assoc.name}
                    </h3>
                    <p className="text-white/50 text-sm">{assoc.sector}</p>
                    <p className="text-sky-400 text-sm mt-1">
                      {assoc.members}+ {t('membersCount')}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Second Row - Right to Left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4 animate-marquee-reverse"
        >
          {[...duplicatedAssociations].reverse().map((assoc, index) => (
            <Link
              key={`row2-${index}`}
              href="/associations"
              className="group flex-shrink-0"
            >
              <div className={cn(
                'rounded-2xl p-5 w-[280px] transition-all duration-300',
                'bg-white/[0.03] border border-white/10 hover:border-orange-500/30',
                'hover:bg-white/[0.06] backdrop-blur-sm'
              )}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/30 transition-colors">
                    <assoc.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white truncate group-hover:text-orange-400 transition-colors">
                      {assoc.name}
                    </h3>
                    <p className="text-white/50 text-sm">{assoc.sector}</p>
                    <p className="text-orange-400 text-sm mt-1">
                      {assoc.members}+ {t('membersCount')}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container-custom mt-12 text-center"
      >
        <Link href="/associations" className="btn-secondary inline-flex">
          <span>{t('viewAll')}</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  )
}
