'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Building, Factory, ShoppingBag, Cpu, Wheat, Truck, Hotel, Stethoscope, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const sectors = [
  { id: 'all', name: 'All Sectors' },
  { id: 'manufacturing', name: 'Manufacturing' },
  { id: 'services', name: 'Services' },
  { id: 'technology', name: 'Technology' },
  { id: 'agriculture', name: 'Agriculture' },
  { id: 'trade', name: 'Trade & Logistics' },
]

const associations = [
  { name: 'Textile Manufacturers Association', sector: 'manufacturing', members: 450, icon: Factory },
  { name: 'IT & Digital Services Chamber', sector: 'technology', members: 320, icon: Cpu },
  { name: 'Agricultural Producers Union', sector: 'agriculture', members: 580, icon: Wheat },
  { name: 'Retail Trade Federation', sector: 'trade', members: 890, icon: ShoppingBag },
  { name: 'Logistics & Transportation Guild', sector: 'trade', members: 210, icon: Truck },
  { name: 'Tourism & Hospitality Board', sector: 'services', members: 340, icon: Hotel },
  { name: 'Construction Industry Alliance', sector: 'manufacturing', members: 420, icon: Building },
  { name: 'Healthcare Providers Network', sector: 'services', members: 180, icon: Stethoscope },
  { name: 'Food Processing Association', sector: 'manufacturing', members: 290, icon: Factory },
  { name: 'Automotive Industry Cluster', sector: 'manufacturing', members: 150, icon: Factory },
  { name: 'FinTech Association', sector: 'technology', members: 95, icon: Cpu },
  { name: 'Export Promotion Council', sector: 'trade', members: 520, icon: Truck },
]

export default function Associations() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filteredAssociations = associations.filter(
    (a) => activeFilter === 'all' || a.sector === activeFilter
  )

  const displayedAssociations = showAll ? filteredAssociations : filteredAssociations.slice(0, 8)

  return (
    <section id="associations" className="section-padding relative bg-navy-950">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 uzbek-pattern opacity-20" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-gold-500 text-sm font-medium uppercase tracking-wider mb-4"
          >
            Our Network
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-display text-white mb-6"
          >
            46 Industry Associations
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70"
          >
            United under one roof to drive economic transformation across every sector
            of Uzbekistan&apos;s economy.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => {
                setActiveFilter(sector.id)
                setShowAll(false)
              }}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                activeFilter === sector.id
                  ? 'bg-gold-500 text-navy-900'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              {sector.name}
            </button>
          ))}
        </motion.div>

        {/* Associations Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedAssociations.map((association, index) => (
              <motion.div
                key={association.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group glass rounded-2xl p-6 card-hover cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                    <association.icon className="w-6 h-6 text-gold-500" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-white/50 text-xs capitalize">
                    {association.sector}
                  </span>
                </div>

                <h3 className="font-medium text-white mb-2 group-hover:text-gold-500 transition-colors">
                  {association.name}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">
                    {association.members.toLocaleString()} members
                  </span>
                  <ChevronRight className="w-4 h-4 text-gold-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More Button */}
        {filteredAssociations.length > 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-4 border border-gold-500/30 text-gold-500 rounded-lg hover:bg-gold-500/10 transition-colors"
            >
              {showAll ? 'Show Less' : `View All ${filteredAssociations.length} Associations`}
              <ChevronRight className={cn('w-5 h-5 transition-transform', showAll && 'rotate-90')} />
            </button>
          </motion.div>
        )}

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '46', label: 'Associations' },
            { value: '12,000+', label: 'Member Companies' },
            { value: '6', label: 'Economic Sectors' },
            { value: '500K+', label: 'Jobs Represented' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-gold-500 mb-1">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
