'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  Scale,
  FileText,
  BarChart3,
  Users,
  Building2,
  Shield,
  CheckCircle2,
  ArrowUpRight,
  Landmark,
  Gavel,
  TrendingUp,
  Target,
  Briefcase,
  MessageSquare
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'

const grStats = [
  { value: '50+', label: 'Qonunlar', description: 'Tahlil qilingan' },
  { value: '30+', label: 'Vazirliklar', description: 'Hamkorlik' },
  { value: '100+', label: 'Uchrashuvlar', description: 'Yiliga' },
  { value: '95%', label: 'Samaradorlik', description: 'Murojatlar' },
]

const grServices = [
  {
    icon: FileText,
    title: 'Qonunchilik Monitoringi',
    description: 'Biznesingizga ta\'sir qiluvchi qonun loyihalari va normativ hujjatlarni kuzatish va tahlil qilish',
  },
  {
    icon: BarChart3,
    title: 'Iqtisodiy Tahlil',
    description: 'Davlat siyosatining biznesga ta\'siri bo\'yicha chuqur tahlil va prognozlar',
  },
  {
    icon: MessageSquare,
    title: 'Lobbichilik',
    description: 'Biznes manfaatlarini davlat darajasida himoya qilish va siyosat shakllantirish',
  },
  {
    icon: Users,
    title: 'Stakeholder Management',
    description: 'Davlat organlari, biznes va jamoat o\'rtasidagi munosabatlarni boshqarish',
  },
]

const workProcess = [
  {
    step: '01',
    title: 'Muammo tahlili',
    description: 'Biznesingiz duch kelayotgan tartibga solish muammolarini aniqlash',
  },
  {
    step: '02',
    title: 'Strategiya ishlab chiqish',
    description: 'Davlat organlari bilan ishlash strategiyasini tuzish',
  },
  {
    step: '03',
    title: 'Muloqot o\'rnatish',
    description: 'Tegishli vazirlik va idoralar bilan konstruktiv muloqot',
  },
  {
    step: '04',
    title: 'Natijaga erishish',
    description: 'Biznes manfaatlarini himoya qilish va ijobiy natijaga erishish',
  },
]

const ministries = [
  'Iqtisodiyot va moliya vazirligi',
  'Investitsiyalar, sanoat va savdo vazirligi',
  'Soliq qo\'mitasi',
  'Bojxona qo\'mitasi',
  'Antimonopoliya qo\'mitasi',
  'Raqamli texnologiyalar vazirligi',
]

export default function GovernmentRelationsPage() {
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
                radial-gradient(ellipse 50% 30% at 70% 80%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)
              `
            }}
          />
          <motion.div
            style={{ y: orbY1 }}
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            initial={{ x: '60%', y: '10%' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-turquoise-400/40 to-emerald-500/20 rounded-full" />
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
                    <Scale className="w-4 h-4" />
                    02 — GR
                  </span>
                  <span className="px-3 py-1 rounded-full bg-turquoise-400/20 text-turquoise-400 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-turquoise-400 animate-pulse" />
                    Faol
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
                  Government{' '}
                  <span className="text-gradient-gold font-display">Relations</span>
                </h1>

                <p className="text-lg text-white/50 mb-6 leading-relaxed">
                  Biznes manfaatlarini himoya qilish va davlat organlari bilan konstruktiv muloqot.
                  Qonunchilik va davlat siyosatida ishtirok etish orqali biznesingiz uchun qulay
                  muhit yaratish.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    <span>Konsultatsiya</span>
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
                {grStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <p className="font-mono text-3xl font-bold text-turquoise-400">{stat.value}</p>
                    <p className="text-white font-medium">{stat.label}</p>
                    <p className="text-white/40 text-sm">{stat.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-turquoise-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                GR Xizmatlari
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                Davlat bilan{' '}
                <span className="text-gradient-gold font-display">munosabatlar</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {grServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-turquoise-400/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-turquoise-400/10 flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-turquoise-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-white/50 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Process */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-turquoise-400/[0.02] via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-turquoise-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                Jarayon
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                Qanday{' '}
                <span className="text-gradient-gold font-display">ishlaymiz</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {workProcess.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                  <span className="font-mono text-4xl font-bold text-turquoise-400/20">{step.step}</span>
                  <h3 className="font-semibold text-white mt-2 mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ministries */}
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
                  <Landmark className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">
                  Hamkorlik qiladigan organlar
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ministries.map((ministry) => (
                  <div key={ministry} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-white/70">{ministry}</span>
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
                Professional{' '}
                <span className="text-gradient-gold font-display">GR xizmati</span>
              </h2>
              <p className="text-white/50 mb-8">
                Davlat organlari bilan munosabatlaringizni professional darajada
                boshqarish uchun biz bilan bog'laning.
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
