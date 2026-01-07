'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check, Crown, Zap, Shield, Globe2, Users, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const benefits = [
  { icon: Shield, text: "46+ assotsiatsiyaga kirish huquqi" },
  { icon: Globe2, text: "Xalqaro tadbirlarda ishtirok" },
  { icon: Users, text: "Networking va B2B aloqalar" },
  { icon: TrendingUp, text: "Investitsiya imkoniyatlari" },
  { icon: Zap, text: "Biznes Darcha premium xizmatlari" },
  { icon: Crown, text: "VIP tadbirlarga taklif" },
]

export default function Membership() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-navy-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gold Gradient Orb */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
            filter: 'blur(100px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212, 175, 55, 1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Card */}
          <div className={cn(
            'relative rounded-3xl overflow-hidden',
            'bg-gradient-to-br from-gold-500/20 via-navy-700/80 to-navy-800',
            'border border-gold-500/30',
            'p-8 md:p-12 lg:p-16'
          )}>
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold-500/20 to-transparent rounded-bl-full" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 text-gold-400 text-sm font-medium mb-6">
                    <Crown className="w-4 h-4" />
                    Premium A'zolik
                  </span>

                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.025em' }}>
                    Biznes <span className="text-gradient-gold font-display">Imkoniyatlarini</span> Kengaytiring
                  </h2>

                  <p className="text-lg text-white/60 mb-8 leading-relaxed">
                    O'zbekiston Iqtisodiyot Assambleyasi a'zosi bo'ling va biznesingiz uchun yangi gorizontlarni oching.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/membership" className="btn-primary">
                      <span>A'zo Bo'lish</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link href="/membership#plans" className="btn-secondary">
                      Tariflar
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Right - Benefits */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glass rounded-2xl p-6 md:p-8"
                >
                  <h3 className="font-heading text-xl font-semibold text-white mb-6">
                    A'zolik Imtiyozlari
                  </h3>

                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-5 h-5 text-gold-400" />
                        </div>
                        <span className="text-white/80">{benefit.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/40 text-sm">Yillik a'zolik</p>
                        <p className="font-mono text-2xl font-bold text-gold-400 tracking-tight">$1,200</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                        -20% chegirma
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
