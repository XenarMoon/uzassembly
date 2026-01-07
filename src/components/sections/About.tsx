'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Award, Users, TrendingUp, Globe2, Shield, Target, Zap, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const highlights = [
  {
    icon: Users,
    value: '46+',
    label: 'Sanoat Assotsiatsiyalari',
    description: 'Barcha sohalarni qamrab oluvchi',
  },
  {
    icon: TrendingUp,
    value: '$20B+',
    label: 'Investitsiya Loyihalari',
    description: 'Faol portfolio',
  },
  {
    icon: Globe2,
    value: '3',
    label: 'Xalqaro Ofis',
    description: 'Dubay, Singapur, Pekin',
  },
  {
    icon: Award,
    value: '15+',
    label: 'Strategik Hamkor',
    description: 'Xalqaro tashkilotlar',
  },
]

const features = [
  'Davlat organlari bilan to\'g\'ridan-to\'g\'ri dialog',
  'Xalqaro investorlar bilan aloqa',
  'Ekspert va konsultatsiya xizmatlari',
  'Networking va biznes uchrashuvlar',
  'Huquqiy va moliyaviy yordam',
  'Ta\'lim va malaka oshirish dasturlari',
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-navy-900 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] rounded-full -translate-y-1/2 -translate-x-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full translate-x-1/4 translate-y-1/4"
          style={{
            background: 'radial-gradient(circle, rgba(13, 148, 136, 0.05) 0%, transparent 70%)',
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
            <span className="badge-gold mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              Biz Haqimizda
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.025em' }}>
              O'zbekiston Biznes <span className="text-gradient-gold font-display">Ekotizimining</span> Markazi
            </h2>

            <p className="text-lg lg:text-xl text-white/60 mb-6 leading-relaxed">
              O'zbekiston Iqtisodiyot Assambleyasi — mamlakatning eng yirik tadbirkorlik tashkiloti
              bo'lib, 46+ sanoat assotsiatsiyasini birlashtiradi.
            </p>

            <p className="text-white/50 mb-8 leading-relaxed">
              Biz davlat va biznes o'rtasida samarali dialog yaratamiz, xalqaro investitsiyalarni
              jalb qilamiz va O'zbekiston iqtisodiyotining raqobatbardoshligini oshiramiz.
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
                  <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/about" className="btn-primary inline-flex">
              <span>Batafsil Ma'lumot</span>
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
                    'border border-white/5 hover:border-gold-500/20 transition-all duration-500',
                    'hover:bg-gold-500/5'
                  )}>
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gold-500/10 flex items-center justify-center mb-5 group-hover:bg-gold-500/20 transition-colors">
                      <item.icon className="w-7 h-7 lg:w-8 lg:h-8 text-gold-400" />
                    </div>
                    <div className="font-mono text-4xl lg:text-5xl xl:text-6xl font-bold text-gold-400 mb-2 tracking-tight">
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
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-5">
                  <Shield className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="font-heading text-xl lg:text-2xl font-semibold text-white mb-3">Missiyamiz</h3>
                <p className="text-white/60 leading-relaxed">
                  O'zbekiston tadbirkorligini xalqaro miqyosda raqobatbardosh qilish va barqaror iqtisodiy o'sishni ta'minlash.
                </p>
              </div>
              <div className="lg:border-r border-white/10 lg:pr-12">
                <div className="w-14 h-14 rounded-2xl bg-turquoise-500/10 flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-turquoise-400" />
                </div>
                <h3 className="font-heading text-xl lg:text-2xl font-semibold text-white mb-3">Maqsadimiz</h3>
                <p className="text-white/60 leading-relaxed">
                  2030 yilgacha O'zbekistonni Markaziy Osiyoning biznes markazi sifatida shakllantirish.
                </p>
              </div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5">
                  <Zap className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="font-heading text-xl lg:text-2xl font-semibold text-white mb-3">Qadriyatlarimiz</h3>
                <p className="text-white/60 leading-relaxed">
                  Shaffoflik, innovatsiya, hamkorlik va milliy manfaatlarni himoya qilish.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
