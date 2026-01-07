'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Building2, Factory, Wheat, Cpu, Car, Shirt, Pill, Construction, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const associations = [
  { name: "To'qimachilik Assotsiatsiyasi", icon: Shirt, members: 450, sector: "Yengil sanoat" },
  { name: "Farmatsevtika Assotsiatsiyasi", icon: Pill, members: 120, sector: "Tibbiyot" },
  { name: "Qurilish Materiallari", icon: Construction, members: 380, sector: "Qurilish" },
  { name: "IT Assotsiatsiyasi", icon: Cpu, members: 890, sector: "Texnologiya" },
  { name: "Avtomobil Sanoati", icon: Car, members: 85, sector: "Mashinasozlik" },
  { name: "Qishloq Xo'jaligi", icon: Wheat, members: 1200, sector: "Agro" },
  { name: "Energetika Sektori", icon: Zap, members: 95, sector: "Energetika" },
  { name: "Oziq-ovqat Sanoati", icon: Factory, members: 650, sector: "Ishlab chiqarish" },
]

// Duplicate for seamless loop
const duplicatedAssociations = [...associations, ...associations]

export default function Associations() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      id="associations"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-navy-800 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-gold mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-500" />
            46+ Sanoat Assotsiatsiyasi
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6" style={{ letterSpacing: '-0.025em' }}>
            Barcha Sohalar <span className="text-gradient-gold font-display">Bir Joyda</span>
          </h2>

          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            O'zbekiston iqtisodiyotining barcha tarmoqlarini birlashtiruvchi assotsiatsiyalar tarmog'i
          </p>
        </motion.div>
      </div>

      {/* Marquee Carousel */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy-800 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy-800 to-transparent z-10 pointer-events-none" />

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
                'glass rounded-2xl p-5 w-[280px] transition-all duration-300',
                'border border-white/5 hover:border-gold-500/30',
                'hover:bg-gold-500/5'
              )}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                    <assoc.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white truncate group-hover:text-gold-400 transition-colors">
                      {assoc.name}
                    </h3>
                    <p className="text-white/40 text-sm">{assoc.sector}</p>
                    <p className="text-gold-400/80 text-sm mt-1">
                      {assoc.members}+ a'zolar
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
                'glass rounded-2xl p-5 w-[280px] transition-all duration-300',
                'border border-white/5 hover:border-turquoise-500/30',
                'hover:bg-turquoise-500/5'
              )}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-turquoise-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-turquoise-500/20 transition-colors">
                    <assoc.icon className="w-6 h-6 text-turquoise-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white truncate group-hover:text-turquoise-400 transition-colors">
                      {assoc.name}
                    </h3>
                    <p className="text-white/40 text-sm">{assoc.sector}</p>
                    <p className="text-turquoise-400/80 text-sm mt-1">
                      {assoc.members}+ a'zolar
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Stats Bar */}
      <div className="container-custom mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-mono text-3xl md:text-4xl font-bold text-gold-400 mb-2 tracking-tight">46+</div>
              <p className="text-white/50 text-sm">Assotsiatsiyalar</p>
            </div>
            <div>
              <div className="font-mono text-3xl md:text-4xl font-bold text-turquoise-400 mb-2 tracking-tight">15K+</div>
              <p className="text-white/50 text-sm">Faol A'zolar</p>
            </div>
            <div>
              <div className="font-mono text-3xl md:text-4xl font-bold text-gold-400 mb-2 tracking-tight">28</div>
              <p className="text-white/50 text-sm">Iqtisodiy Tarmoq</p>
            </div>
            <div>
              <div className="font-mono text-3xl md:text-4xl font-bold text-turquoise-400 mb-2 tracking-tight">14</div>
              <p className="text-white/50 text-sm">Viloyat Qamrovi</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-10"
        >
          <Link href="/associations" className="btn-secondary inline-flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            <span>Barcha Assotsiatsiyalarni Ko'rish</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
