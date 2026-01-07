'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Building2,
  Leaf,
  Wifi,
  Zap,
  Home,
  Users,
  ArrowRight,
  MapPin,
  CheckCircle2
} from 'lucide-react'

const highlights = [
  {
    icon: Building2,
    value: '6,400',
    unit: 'ga',
    label: 'Umumiy maydon',
  },
  {
    icon: Users,
    value: '500K+',
    unit: '',
    label: 'Aholi sig\'imi',
  },
  {
    icon: Home,
    value: '150K',
    unit: '+',
    label: 'Turar-joy birliklari',
  },
  {
    icon: Zap,
    value: '100%',
    unit: '',
    label: 'Yashil energiya',
  },
]

const features = [
  {
    icon: Wifi,
    title: 'Raqamli Infratuzilma',
    description: '5G qamrov, IoT sensorlar, aqlli boshqaruv tizimlari',
    color: 'turquoise',
  },
  {
    icon: Leaf,
    title: 'Yashil Texnologiyalar',
    description: 'Quyosh energiyasi, suv tozalash, chiqindi qayta ishlash',
    color: 'gold',
  },
  {
    icon: Building2,
    title: 'Innovatsion Hub',
    description: 'Texnopark, startap inkubatorlar, R&D markazlari',
    color: 'terracotta',
  },
  {
    icon: Home,
    title: 'Zamonaviy Turar-joy',
    description: 'Aqlli uylar, yashil hududlar, ijtimoiy infratuzilma',
    color: 'turquoise',
  },
]

const phases = [
  {
    phase: '1-bosqich',
    year: '2024-2026',
    title: 'Infratuzilma',
    items: ['Yo\'l tarmoqlari', 'Kommunikatsiyalar', 'Energiya tizimi'],
    completed: true,
  },
  {
    phase: '2-bosqich',
    year: '2026-2028',
    title: 'Ishlab chiqarish',
    items: ['Sanoat zonalari', 'Logistika markazi', 'Biznes park'],
    completed: false,
  },
  {
    phase: '3-bosqich',
    year: '2028-2030',
    title: 'Turar-joy',
    items: ['Uy-joy majmualari', 'Ta\'lim muassasalari', 'Tibbiyot markazlari'],
    completed: false,
  },
  {
    phase: '4-bosqich',
    year: '2030-2032',
    title: 'Yakunlash',
    items: ['Dam olish infratuzilmasi', 'Smart tizimlar integratsiyasi', 'To\'liq ishga tushirish'],
    completed: false,
  },
]

export default function SmartCity() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="smart-city" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
      <div className="absolute inset-0 pattern-silk" />

      {/* Animated glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-turquoise-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-turquoise-500/10 border border-turquoise-500/30 text-turquoise-400 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              Toshkent viloyati, O'zbekiston
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-display text-white mb-6"
          >
            <span className="text-gradient-turquoise">Smart City</span> — Kelajak Shahri
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/70"
          >
            O'zbekistonning eng yirik va ambitsiyali loyihasi — zamonaviy texnologiyalar,
            barqaror rivojlanish va hayot sifatining yangi standarti.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {highlights.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-6 text-center transition-all duration-300 hover:bg-turquoise-500/5 hover:border-turquoise-500/20">
                <div className="w-12 h-12 rounded-xl bg-turquoise-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-turquoise-500/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-turquoise-400" />
                </div>
                <div className="font-serif text-4xl text-turquoise-400 mb-1">
                  {stat.value}<span className="text-2xl">{stat.unit}</span>
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const colorClasses = {
              turquoise: 'bg-turquoise-500/10 text-turquoise-400 group-hover:bg-turquoise-500/20',
              gold: 'bg-gold-500/10 text-gold-500 group-hover:bg-gold-500/20',
              terracotta: 'bg-terracotta-500/10 text-terracotta-400 group-hover:bg-terracotta-500/20',
            }
            const colorClass = colorClasses[feature.color as keyof typeof colorClasses]

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="glass rounded-2xl p-6 group card-hover"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${colorClass}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-white mb-2">{feature.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <h3 className="font-serif text-heading-lg text-white text-center mb-10">
            Loyiha Bosqichlari
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-1/2" />

            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4 md:gap-6 relative">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="relative pl-8 md:pl-0"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full -translate-x-1/2 md:hidden ${
                    phase.completed ? 'bg-turquoise-500' : 'bg-white/20 border-2 border-turquoise-500/50'
                  }`} />

                  <div className={`p-5 rounded-xl transition-all ${
                    phase.completed ? 'bg-turquoise-500/10 border border-turquoise-500/30' : 'bg-white/[0.02] border border-white/[0.06]'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {phase.completed && <CheckCircle2 className="w-4 h-4 text-turquoise-400" />}
                      <span className={`text-xs font-medium uppercase tracking-wider ${
                        phase.completed ? 'text-turquoise-400' : 'text-white/40'
                      }`}>
                        {phase.phase}
                      </span>
                    </div>
                    <div className="text-white/50 text-sm mb-2">{phase.year}</div>
                    <h4 className="font-serif text-lg text-white mb-3">{phase.title}</h4>
                    <ul className="space-y-1.5">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-white/60 text-sm">
                          <div className={`w-1 h-1 rounded-full ${phase.completed ? 'bg-turquoise-400' : 'bg-white/40'}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="#contact" className="btn-turquoise">
              Investitsiya Imkoniyatlari
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
