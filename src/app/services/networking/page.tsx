'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  Users,
  Crown,
  Handshake,
  Building2,
  Star,
  Coffee,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  UserPlus,
  Calendar
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'

const networkingStats = [
  { value: '200+', label: 'A\'zolar', description: 'Top rahbarlar' },
  { value: '12', label: 'Sektorlar', description: 'Qamrov' },
  { value: '24', label: 'Yig\'ilishlar', description: 'Yiliga' },
  { value: '50+', label: 'Loyihalar', description: 'Hamkorlikda' },
]

const networkingFeatures = [
  {
    icon: Crown,
    title: 'Eksklyuziv Uchrashuvlar',
    description: 'Faqat top-menejment uchun mo\'ljallangan yopiq formatdagi uchrashuvlar',
  },
  {
    icon: Building2,
    title: 'Sektorlararo Loyihalar',
    description: 'Turli sektorlar o\'rtasida strategik hamkorlik loyihalarini shakllantirish',
  },
  {
    icon: Star,
    title: 'VIP Networking',
    description: 'Yetakchi biznes rahbarlari va investorlar bilan bevosita muloqot',
  },
  {
    icon: Handshake,
    title: 'Strategic Partnerships',
    description: 'Uzoq muddatli strategik hamkorliklar va biznes aloqalarni rivojlantirish',
  },
]

const clubBenefits = [
  {
    title: 'Mashvarat yig\'ilishlari',
    description: 'Har oyda o\'tkaziladigan strategik mashvarat yig\'ilishlari',
    icon: Calendar,
  },
  {
    title: 'Biznes matching',
    description: 'Sizning ehtiyojlaringizga mos hamkorlarni topish xizmati',
    icon: UserPlus,
  },
  {
    title: 'Prioritet kirish',
    description: 'Barcha Assembly tadbirlariga VIP kirish huquqi',
    icon: Award,
  },
]

const sectors = [
  'IT & Texnologiya',
  'Moliya & Banking',
  'Ishlab chiqarish',
  'Qurilish & Infratuzilma',
  'Qishloq xo\'jaligi',
  'Energetika',
  'Savdo & Logistika',
  'Xizmat ko\'rsatish',
  'Farmatsevtika',
  'To\'qimachilik',
  'Turizm',
  'Telekommunikatsiya',
]

const membershipLevels = [
  {
    name: 'Standard',
    description: 'Yangi a\'zolar uchun',
    features: ['Oylik yig\'ilishlarga kirish', 'Networking platformasi', 'Newsletter'],
  },
  {
    name: 'Premium',
    description: 'Faol ishtirokchilar uchun',
    features: ['Barcha Standard imkoniyatlar', 'VIP tadbirlarga kirish', 'Biznes matching', 'Mentorlik dasturi'],
    highlighted: true,
  },
  {
    name: 'Elite',
    description: 'Top rahbarlar uchun',
    features: ['Barcha Premium imkoniyatlar', 'Individual konsalting', 'Board uchrashuvlari', 'Global networking'],
  },
]

export default function NetworkingPage() {
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
                radial-gradient(ellipse 50% 30% at 70% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)
              `
            }}
          />
          <motion.div
            style={{ y: orbY1 }}
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            initial={{ x: '40%', y: '20%' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gold-500/40 to-amber-500/20 rounded-full" />
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
                    <Users className="w-4 h-4" />
                    05 — Networking
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Eksklyuziv
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
                  Executive{' '}
                  <span className="text-gradient-gold font-display">Networking</span>
                </h1>

                <p className="text-lg text-white/50 mb-6 leading-relaxed">
                  Mashvarat klubi va sektorlararo integratsiya platformasi.
                  Rahbarlar uchun eksklyuziv networking va strategik hamkorlik
                  imkoniyatlari.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    <span>A'zo bo'lish</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="#membership" className="btn-secondary">
                    Tariflar
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
                {networkingStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <p className="font-mono text-3xl font-bold text-amber-400">{stat.value}</p>
                    <p className="text-white font-medium">{stat.label}</p>
                    <p className="text-white/40 text-sm">{stat.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-amber-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                Mashvarat Klubi
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                Eksklyuziv{' '}
                <span className="text-gradient-gold font-display">imkoniyatlar</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {networkingFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Club Benefits */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.02] via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                A'zolik afzalliklari
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                Klub{' '}
                <span className="text-gradient-gold font-display">imtiyozlari</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              {clubBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/10 text-center"
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{benefit.title}</h3>
                  <p className="text-white/50 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">
                  Qamrab olingan sektorlar
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {sectors.map((sector) => (
                  <div key={sector} className="flex items-center gap-2 text-white/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    {sector}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Membership Levels */}
        <section id="membership" className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                A'zolik{' '}
                <span className="text-gradient-gold font-display">darajalari</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {membershipLevels.map((level, index) => (
                <motion.div
                  key={level.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-6 rounded-2xl border ${
                    level.highlighted
                      ? 'bg-gradient-to-br from-gold-500/10 to-amber-500/5 border-gold-500/30'
                      : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  {level.highlighted && (
                    <span className="inline-block px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-medium mb-4">
                      Tavsiya etiladi
                    </span>
                  )}
                  <h3 className="font-semibold text-white text-xl mb-1">{level.name}</h3>
                  <p className="text-white/50 text-sm mb-4">{level.description}</p>
                  <ul className="space-y-2">
                    {level.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-white/70 text-sm">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${level.highlighted ? 'text-gold-400' : 'text-amber-400'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
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
                Mashvarat klubiga{' '}
                <span className="text-gradient-gold font-display">qo'shiling</span>
              </h2>
              <p className="text-white/50 mb-8">
                O'zbekistonning eng nufuzli biznes rahbarlari jamoasiga
                qo'shiling va yangi imkoniyatlarni kashf eting.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-primary">
                  <span>A'zo bo'lish</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/membership" className="btn-secondary">
                  Batafsil
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
