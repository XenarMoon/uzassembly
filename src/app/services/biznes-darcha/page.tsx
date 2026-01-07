'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  DoorOpen,
  FileText,
  Calculator,
  Scale,
  Shield,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Building2,
  Clock,
  Briefcase,
  HeadphonesIcon,
  FileCheck,
  Landmark,
  Receipt,
  ClipboardList
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'

const stats = [
  { value: '1000+', label: 'Mijozlar', description: 'Xizmat olgan' },
  { value: '50+', label: 'Xizmatlar', description: 'Mavjud' },
  { value: '24/7', label: 'Qo\'llab-quvvatlash', description: 'Doimiy' },
  { value: '98%', label: 'Mamnunlik', description: 'Darajasi' },
]

const services = [
  {
    icon: FileText,
    title: 'Hujjatlarni rasmiylashtirish',
    description: 'Biznes uchun barcha turdagi hujjatlarni tayyorlash va rasmiylashtirish xizmati',
  },
  {
    icon: Calculator,
    title: 'Buxgalteriya xizmatlari',
    description: 'Professional buxgalteriya hisobi va moliyaviy hisobotlarni yuritish',
  },
  {
    icon: Scale,
    title: 'Yuridik maslahat',
    description: 'Biznes huquqi bo\'yicha malakali yuridik yordam va maslahatlar',
  },
  {
    icon: Shield,
    title: 'Litsenziya va ruxsatnomalar',
    description: 'Faoliyat uchun zarur litsenziya va ruxsatnomalarni olishda yordam',
  },
]

const serviceCategories = [
  {
    title: 'Ro\'yxatdan o\'tish',
    description: 'Korxonani tashkil etish va ro\'yxatdan o\'tkazish',
    items: ['YaTT ochish', 'MChJ tashkil etish', 'QK ro\'yxatdan o\'tkazish', 'Filial ochish'],
    icon: Building2,
    color: 'gold',
  },
  {
    title: 'Soliq xizmatlari',
    description: 'Soliq hisoboti va optimallashtirish',
    items: ['Soliq deklaratsiyalari', 'Soliq rejalashtirish', 'Soliq auditi', 'Imtiyozlar olish'],
    icon: Receipt,
    color: 'emerald',
  },
  {
    title: 'Kadrlar bo\'limi',
    description: 'HR va kadrlar hujjatlari',
    items: ['Mehnat shartnomalari', 'Kadrlar hisobi', 'Ish haqi hisoblash', 'HR konsalting'],
    icon: ClipboardList,
    color: 'turquoise',
  },
]

const benefits = [
  { icon: Clock, title: 'Tezkor xizmat', description: '1-3 kun ichida natija' },
  { icon: HeadphonesIcon, title: 'Shaxsiy menejer', description: 'Doimiy aloqada' },
  { icon: FileCheck, title: 'Kafolat', description: '100% qonuniy' },
  { icon: Landmark, title: 'Davlat organlari', description: 'Bevosita aloqa' },
]

export default function BiznesDarchaPage() {
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
                radial-gradient(ellipse 60% 40% at 30% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 70% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
              `
            }}
          />
          <motion.div
            style={{ y: orbY1 }}
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            initial={{ x: '10%', y: '20%' }}
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
                    <DoorOpen className="w-4 h-4" />
                    Biznes Xizmatlar
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Faol
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
                  Biznes{' '}
                  <span className="text-gradient-gold font-display">Darcha</span>
                </h1>

                <p className="text-lg text-white/50 mb-6 leading-relaxed">
                  Tadbirkorlar uchun yagona darcha — barcha biznes xizmatlarini bir joyda oling.
                  Hujjatlashtirish, buxgalteriya, yuridik maslahat va litsenziyalash xizmatlari.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    <span>Murojaat qilish</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="#services" className="btn-secondary">
                    Xizmatlar
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
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5"
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

        {/* Main Services */}
        <section id="services" className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                Asosiy xizmatlar
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                Biznes uchun{' '}
                <span className="text-gradient-gold font-display">yechimlar</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold-500/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                    <service.icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-white/50 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Categories */}
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
                <Sparkles className="w-4 h-4" />
                Xizmat turlari
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                Kategoriyalar bo'yicha{' '}
                <span className="text-gradient-gold font-display">xizmatlar</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-6 rounded-2xl border ${
                    category.color === 'gold'
                      ? 'bg-gradient-to-br from-gold-500/5 to-transparent border-gold-500/10'
                      : category.color === 'emerald'
                      ? 'bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/10'
                      : 'bg-gradient-to-br from-turquoise-400/5 to-transparent border-turquoise-400/10'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    category.color === 'gold'
                      ? 'bg-gold-500/10'
                      : category.color === 'emerald'
                      ? 'bg-emerald-500/10'
                      : 'bg-turquoise-400/10'
                  }`}>
                    <category.icon className={`w-6 h-6 ${
                      category.color === 'gold'
                        ? 'text-gold-400'
                        : category.color === 'emerald'
                        ? 'text-emerald-400'
                        : 'text-turquoise-400'
                    }`} />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{category.title}</h3>
                  <p className="text-white/50 text-sm mb-4">{category.description}</p>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${
                          category.color === 'gold'
                            ? 'text-gold-400'
                            : category.color === 'emerald'
                            ? 'text-emerald-400'
                            : 'text-turquoise-400'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <h3 className="font-heading text-xl font-semibold text-white mb-6 text-center">
                Nima uchun Biznes Darcha?
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={benefit.title} className="text-center p-4">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-gold-500/10 flex items-center justify-center mb-3">
                      <benefit.icon className="w-6 h-6 text-gold-400" />
                    </div>
                    <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
                    <p className="text-white/50 text-sm">{benefit.description}</p>
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
                Biznesingizni{' '}
                <span className="text-gradient-gold font-display">boshlang</span>
              </h2>
              <p className="text-white/50 mb-8">
                Barcha biznes xizmatlarini bir joyda oling. Professional jamoa
                sizning muvaffaqiyatingiz uchun ishlaydi.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-primary">
                  <span>Bog'lanish</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/membership" className="btn-secondary">
                  A'zo bo'lish
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
