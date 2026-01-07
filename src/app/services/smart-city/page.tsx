'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  MapPin,
  Factory,
  Users,
  Leaf,
  Wifi,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Zap,
  Droplets,
  Sun,
  Shield,
  Car,
  Home,
  TreePine,
  Network
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'

const stats = [
  { value: '6,400', label: 'Gektar', description: 'Umumiy maydon' },
  { value: '$20B', label: 'Investitsiya', description: 'Loyiha hajmi' },
  { value: '50K+', label: 'Ish o\'rni', description: 'Yaratiladi' },
  { value: '2030', label: 'Yil', description: 'Tugash muddati' },
]

const zones = [
  {
    icon: Factory,
    name: 'Sanoat Zonasi',
    area: '2,500 ga',
    description: 'Zamonaviy ishlab chiqarish majmualari',
    color: 'gold',
  },
  {
    icon: Building2,
    name: 'Tijorat Zonasi',
    area: '1,200 ga',
    description: 'Biznes markazlar va ofislar',
    color: 'blue',
  },
  {
    icon: Home,
    name: 'Turar-joy Zonasi',
    area: '1,800 ga',
    description: 'Zamonaviy uy-joylar va kvartiralar',
    color: 'emerald',
  },
  {
    icon: TreePine,
    name: 'Yashil Zonalar',
    area: '900 ga',
    description: 'Bog\'lar, parklar va dam olish maskanlari',
    color: 'green',
  },
]

const infrastructure = [
  {
    icon: Car,
    title: 'Transport',
    items: ['Zamonaviy yo\'llar', 'Metro aloqasi', 'Elektr avtobus', 'Veloyo\'laklar'],
  },
  {
    icon: Zap,
    title: 'Energiya',
    items: ['Quyosh panellari', 'Smart grid tizimi', 'Yashil energiya', 'Energiya tejash'],
  },
  {
    icon: Wifi,
    title: 'Raqamli',
    items: ['5G qamrov', 'IoT infratuzilma', 'Smart boshqaruv', 'Raqamli xizmatlar'],
  },
  {
    icon: Droplets,
    title: 'Kommunal',
    items: ['Suv tozalash', 'Chiqindi qayta ishlash', 'Markaziy isitish', 'Kanalizatsiya'],
  },
]

const investmentOpportunities = [
  {
    title: 'Sanoat korxonalari',
    description: 'Ishlab chiqarish korxonalarini joylashtirish uchun tayyor maydonlar',
    benefits: ['Soliq imtiyozlari', 'Tayyor infratuzilma', 'Logistik qulaylik'],
  },
  {
    title: 'Tijorat obyektlari',
    description: 'Savdo va xizmat ko\'rsatish markazlari qurilishi',
    benefits: ['Yuqori trafik', 'Zamonaviy dizayn', 'Parking maydonlari'],
  },
  {
    title: 'Turar-joy qurilishi',
    description: 'Turli sinflardag uy-joy loyihalari',
    benefits: ['Yashil muhit', 'Smart home', 'Ijtimoiy infratuzilma'],
  },
]

const timeline = [
  { year: '2024', title: 'Loyiha boshlandi', description: 'Infratuzilma qurilishi boshlanishi' },
  { year: '2025', title: 'Birinchi bosqich', description: 'Sanoat zonasi ishga tushirilishi' },
  { year: '2027', title: 'Ikkinchi bosqich', description: 'Tijorat va turar-joy zonalari' },
  { year: '2030', title: 'Tugallash', description: 'Loyihaning to\'liq ishga tushishi' },
]

export default function SmartCityPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])

  return (
    <>
      <Header />
      <main ref={containerRef} className="relative bg-navy-900 overflow-hidden">

        {/* Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 30% 20%, rgba(212, 175, 55, 0.12) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 70% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
              `
            }}
          />
          <motion.div
            style={{ y: orbY1 }}
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-25"
            initial={{ x: '30%', y: '10%' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gold-500/50 to-emerald-500/30 rounded-full" />
          </motion.div>
        </div>

        {/* Hero */}
        <section className="relative pt-28 lg:pt-32 pb-12">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Barcha xizmatlar
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge-gold">
                    <Sparkles className="w-4 h-4" />
                    Flagship Loyiha
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Faol qurilish
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
                  Central Asia{' '}
                  <span className="text-gradient-gold font-display">Smart City</span>
                </h1>

                <p className="text-lg text-white/50 mb-4 leading-relaxed">
                  Ohangaron tumanida qurilayotgan O'zbekistonning eng yirik va zamonaviy
                  smart city loyihasi. 6,400 gektar maydonda jahon standartlariga mos
                  shahar infratuzilmasi.
                </p>

                <div className="flex items-center gap-2 text-white/60 mb-6">
                  <MapPin className="w-5 h-5 text-gold-400" />
                  <span>Ohangaron tumani, Toshkent viloyati</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    <span>Investitsiya qilish</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="#zones" className="btn-secondary">
                    Zonalar
                  </Link>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-2xl bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20"
                  >
                    <p className="font-mono text-3xl font-bold text-gold-400">{stat.value}</p>
                    <p className="text-white font-medium">{stat.label}</p>
                    <p className="text-white/40 text-sm">{stat.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Zones */}
        <section id="zones" className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                Master Plan
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                Shahar{' '}
                <span className="text-gradient-gold font-display">zonalari</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {zones.map((zone, index) => (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-5 rounded-2xl border text-center ${
                    zone.color === 'gold'
                      ? 'bg-gradient-to-br from-gold-500/10 to-transparent border-gold-500/20'
                      : zone.color === 'blue'
                      ? 'bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20'
                      : zone.color === 'emerald'
                      ? 'bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20'
                      : 'bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20'
                  }`}
                >
                  <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                    zone.color === 'gold'
                      ? 'bg-gold-500/20'
                      : zone.color === 'blue'
                      ? 'bg-blue-500/20'
                      : zone.color === 'emerald'
                      ? 'bg-emerald-500/20'
                      : 'bg-green-500/20'
                  }`}>
                    <zone.icon className={`w-7 h-7 ${
                      zone.color === 'gold'
                        ? 'text-gold-400'
                        : zone.color === 'blue'
                        ? 'text-blue-400'
                        : zone.color === 'emerald'
                        ? 'text-emerald-400'
                        : 'text-green-400'
                    }`} />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-1">{zone.name}</h3>
                  <p className={`font-mono text-2xl font-bold mb-2 ${
                    zone.color === 'gold'
                      ? 'text-gold-400'
                      : zone.color === 'blue'
                      ? 'text-blue-400'
                      : zone.color === 'emerald'
                      ? 'text-emerald-400'
                      : 'text-green-400'
                  }`}>{zone.area}</p>
                  <p className="text-white/50 text-sm">{zone.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-gold-500/[0.02] via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium mb-4">
                <Network className="w-4 h-4" />
                Smart Infrastructure
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                Zamonaviy{' '}
                <span className="text-gradient-gold font-display">infratuzilma</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {infrastructure.map((infra, index) => (
                <motion.div
                  key={infra.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4">
                    <infra.icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-3">{infra.title}</h3>
                  <ul className="space-y-2">
                    {infra.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Opportunities */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                Invest
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                Investitsiya{' '}
                <span className="text-gradient-gold font-display">imkoniyatlari</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {investmentOpportunities.map((opp, index) => (
                <motion.div
                  key={opp.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-gold-500/5 to-transparent border border-gold-500/10"
                >
                  <h3 className="font-semibold text-white text-lg mb-2">{opp.title}</h3>
                  <p className="text-white/50 text-sm mb-4">{opp.description}</p>
                  <ul className="space-y-2">
                    {opp.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-white/70 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <h3 className="font-heading text-xl font-semibold text-white mb-8 text-center">
                Loyiha jadvali
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {timeline.map((item, index) => (
                  <div key={item.year} className="text-center">
                    <span className="font-mono text-3xl font-bold text-gold-400">{item.year}</span>
                    <h4 className="font-semibold text-white mt-2 mb-1">{item.title}</h4>
                    <p className="text-white/50 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                Kelajak shahrida{' '}
                <span className="text-gradient-gold font-display">o'z o'rningizni egallang</span>
              </h2>
              <p className="text-white/50 mb-8">
                Central Asia Smart City loyihasiga investitsiya kiriting va
                mintaqaning eng ilg'or shahri qurilishida ishtirok eting.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-primary">
                  <span>Investitsiya qilish</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/services/invest-hub" className="btn-secondary">
                  Invest Hub
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
