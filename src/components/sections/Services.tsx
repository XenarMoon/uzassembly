'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Building2,
  TrendingUp,
  GraduationCap,
  Video,
  Landmark,
  Globe2,
  Handshake,
  MapPin,
  ArrowRight,
  Sparkles,
  ArrowUpRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  {
    id: 'smart-city',
    name: 'Smart City',
    tagline: 'Kelajak Shahri',
    description: "6,400 gektar maydonda qurilayotgan O'zbekistonning eng yirik smart city loyihasi. Zamonaviy infratuzilma, yashil texnologiyalar.",
    icon: MapPin,
    href: '/services/smart-city',
    stats: { value: '6,400', label: 'gektar' },
    location: 'Ohangaron, Toshkent',
    featured: true,
    gradient: 'from-gold-500/20 via-gold-400/10 to-transparent',
    iconBg: 'bg-gold-500/20',
    iconColor: 'text-gold-400',
  },
  {
    id: 'biznes-darcha',
    name: 'Biznes Darcha',
    tagline: 'Raqamli Platforma',
    description: "Barcha biznes xizmatlari bir joyda — litsenziyalar, ruxsatnomalar, konsultatsiyalar",
    icon: Building2,
    href: '/services/biznes-darcha',
    gradient: 'from-turquoise-500/20 via-turquoise-400/10 to-transparent',
    iconBg: 'bg-turquoise-500/20',
    iconColor: 'text-turquoise-400',
  },
  {
    id: 'invest-hub',
    name: 'Invest Hub',
    tagline: 'Investitsiya Markazi',
    description: "Investorlar va loyihalar uchun yagona platforma. $20B+ loyihalar bazasi",
    icon: TrendingUp,
    href: '/services/invest-hub',
    gradient: 'from-emerald-500/20 via-emerald-400/10 to-transparent',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'edu-job',
    name: 'Edu Job',
    tagline: "Ta'lim va Ish",
    description: "Kadrlar tayyorlash, malaka oshirish va ish joylarini yaratish dasturlari",
    icon: GraduationCap,
    href: '/services/edu-job',
    gradient: 'from-amber-500/20 via-amber-400/10 to-transparent',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    id: 'reportaj-go',
    name: 'Reportaj GO',
    tagline: 'Media Platforma',
    description: "Tadbirkorlik yangiliklari, voqealar va media kontentni yaratish xizmati",
    icon: Video,
    href: '/services/reportaj-go',
    gradient: 'from-rose-500/20 via-rose-400/10 to-transparent',
    iconBg: 'bg-rose-500/20',
    iconColor: 'text-rose-400',
  },
  {
    id: 'government-relations',
    name: 'GR',
    tagline: 'Government Relations',
    description: "Davlat organlari bilan munosabatlar, qonunchilik tashabbuslarida ishtirok",
    icon: Landmark,
    href: '/services/government-relations',
    gradient: 'from-blue-500/20 via-blue-400/10 to-transparent',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 'foreign-relations',
    name: 'FR',
    tagline: 'Foreign Relations',
    description: "Xalqaro aloqalar, eksport ko'magi, xorijiy delegatsiyalar bilan hamkorlik",
    icon: Globe2,
    href: '/services/foreign-relations',
    gradient: 'from-purple-500/20 via-purple-400/10 to-transparent',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    id: 'business-relations',
    name: 'BR',
    tagline: 'Business Relations',
    description: "B2B aloqalar, biznes networking, hamkorlik imkoniyatlari",
    icon: Handshake,
    href: '/services/business-relations',
    gradient: 'from-cyan-500/20 via-cyan-400/10 to-transparent',
    iconBg: 'bg-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const featuredService = services[0]
  const otherServices = services.slice(1)

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 lg:py-32 pb-24 lg:pb-40 bg-navy-800"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

        {/* Floating Orb */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '10%',
            right: '-5%',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
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
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16"
        >
          <div className="max-w-2xl">
            <span className="badge-gold mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              8 ta Strategik Yo'nalish
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-4 lg:mb-6" style={{ letterSpacing: '-0.025em' }}>
              Xizmatlar <span className="text-gradient-gold font-display">Ekotizimi</span>
            </h2>

            <p className="text-lg lg:text-xl text-white/60">
              Tadbirkorlik faoliyatingizni rivojlantirish uchun barcha zarur xizmatlar — bir joyda
            </p>
          </div>

          <Link href="/services" className="btn-secondary inline-flex items-center gap-2 self-start lg:self-auto">
            <span>Barcha Xizmatlar</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Featured Service - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 lg:mb-8"
        >
          <Link href={featuredService.href} className="group block">
            <div className={cn(
              'relative rounded-2xl lg:rounded-3xl overflow-hidden',
              'bg-gradient-to-br from-gold-500/10 via-navy-700/80 to-navy-800',
              'border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500',
              'p-6 lg:p-10 xl:p-12'
            )}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />

              <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
                {/* Left Content */}
                <div className="lg:col-span-7 xl:col-span-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1.5 rounded-full bg-gold-500/20 text-gold-400 text-sm font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Flagship Loyiha
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Faol
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center icon-container-gold">
                      <featuredService.icon className="w-8 h-8 lg:w-10 lg:h-10 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-gold-400/80 text-sm font-medium uppercase tracking-wider">{featuredService.tagline}</p>
                      <h3 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-white group-hover:text-gold-400 transition-colors">
                        {featuredService.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-white/60 text-lg lg:text-xl max-w-2xl mb-6 lg:mb-8">
                    {featuredService.description}
                  </p>

                  <div className="flex items-center gap-3 text-gold-400 group-hover:text-gold-300 transition-colors">
                    <span className="font-semibold text-lg">Loyihani Ko'rish</span>
                    <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>

                {/* Right Stats */}
                <div className="lg:col-span-5 xl:col-span-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass rounded-2xl p-5 lg:p-6">
                      <p className="text-white/40 text-sm mb-2">Maydon</p>
                      <p className="font-display text-3xl lg:text-4xl font-bold text-gold-400">
                        {featuredService.stats?.value}
                      </p>
                      <p className="text-gold-400/60 text-sm">{featuredService.stats?.label}</p>
                    </div>
                    <div className="glass rounded-2xl p-5 lg:p-6">
                      <p className="text-white/40 text-sm mb-2">Joylashuv</p>
                      <p className="text-white font-semibold text-lg lg:text-xl">{featuredService.location}</p>
                    </div>
                    <div className="glass rounded-2xl p-5 lg:p-6">
                      <p className="text-white/40 text-sm mb-2">Investitsiya</p>
                      <p className="font-display text-2xl lg:text-3xl font-bold text-emerald-400">$2.5B</p>
                    </div>
                    <div className="glass rounded-2xl p-5 lg:p-6">
                      <p className="text-white/40 text-sm mb-2">Status</p>
                      <p className="text-white font-semibold">2024-2030</p>
                      <p className="text-white/40 text-sm">Qurilish</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Other Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {otherServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              className="group"
            >
              <Link href={service.href} className="block h-full">
                <div className={cn(
                  'relative h-full rounded-xl overflow-hidden transition-all duration-500',
                  'bg-navy-700/50 backdrop-blur-sm border border-white/5',
                  'hover:border-white/20 hover:bg-navy-700/70',
                  'hover:shadow-xl hover:-translate-y-1',
                  'p-4'
                )}>
                  {/* Background Gradient on Hover */}
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    service.gradient
                  )} />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110',
                      service.iconBg
                    )}>
                      <service.icon className={cn('w-6 h-6', service.iconColor)} />
                    </div>

                    {/* Content */}
                    <p className={cn('text-[10px] font-medium uppercase tracking-wider mb-1', service.iconColor)}>
                      {service.tagline}
                    </p>
                    <h3 className="font-heading font-semibold text-base text-white group-hover:text-gold-400 transition-colors">
                      {service.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
