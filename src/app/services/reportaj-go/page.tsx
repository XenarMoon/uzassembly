'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  Video,
  Camera,
  Mic2,
  Film,
  Play,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Globe2,
  TrendingUp,
  Award,
  Eye,
  Share2,
  Tv,
  Radio,
  Newspaper
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'

const stats = [
  { value: '500+', label: 'Reportajlar', description: 'Tayyorlangan' },
  { value: '1M+', label: 'Ko\'rishlar', description: 'Yetib borilgan' },
  { value: '50+', label: 'Kompaniyalar', description: 'Hamkorlik' },
  { value: '4K', label: 'Sifat', description: 'Professional' },
]

const services = [
  {
    icon: Video,
    title: 'Video Reportajlar',
    description: 'Kompaniyangiz haqida professional video reportajlar tayyorlash',
  },
  {
    icon: Camera,
    title: 'Korporativ Suratga Olish',
    description: 'Yuqori sifatli foto va video materiallar ishlab chiqarish',
  },
  {
    icon: Mic2,
    title: 'Intervyular',
    description: 'Rahbarlar va ekspertlar bilan eksklyuziv intervyular',
  },
  {
    icon: Film,
    title: 'Dokumentallar',
    description: 'Korxona tarixi va muvaffaqiyat hikoyalari haqida filmlar',
  },
]

const contentTypes = [
  {
    title: 'Biznes Reportaj',
    description: 'Korxonangiz faoliyati haqida batafsil reportaj',
    features: ['3-5 daqiqalik video', '4K sifatda suratga olish', 'Professional montaj', 'Musiqa va grafika'],
    icon: Tv,
    popular: true,
  },
  {
    title: 'Success Story',
    description: 'Muvaffaqiyat hikoyangizni dunyoga ulashing',
    features: ['Intervyu format', 'Arxiv materiallar', 'Animatsion grafikalar', 'Subtitles (3 til)'],
    icon: Award,
  },
  {
    title: 'Tadbir Yoritish',
    description: 'Tadbirlaringizni professional yoritish',
    features: ['Ko\'p kamerali suratga olish', 'Jonli efir imkoniyati', 'Highlights video', 'Foto reportaj'],
    icon: Camera,
  },
]

const distribution = [
  { name: 'Fikrat Online TV', icon: Tv, reach: '200K+ auditoriya' },
  { name: 'YouTube kanal', icon: Play, reach: '100K+ obunachi' },
  { name: 'Ijtimoiy tarmoqlar', icon: Share2, reach: '500K+ followers' },
  { name: 'Xalqaro media', icon: Globe2, reach: '20+ davlat' },
]

export default function ReportajGoPage() {
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
                radial-gradient(ellipse 60% 40% at 30% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 70% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)
              `
            }}
          />
          <motion.div
            style={{ y: orbY1 }}
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            initial={{ x: '60%', y: '10%' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-red-500/40 to-orange-500/20 rounded-full" />
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
                    <Video className="w-4 h-4" />
                    Media
                  </span>
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    LIVE
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
                  Reportaj{' '}
                  <span className="text-gradient-gold font-display">GO</span>
                </h1>

                <p className="text-lg text-white/50 mb-6 leading-relaxed">
                  Biznesingizni professional video kontentlar orqali targ'ib qiling.
                  Reportajlar, intervyular va dokumentallar — barchasi bir joyda.
                  Fikrat Online TV orqali minglab auditoriyaga yetib boring.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    <span>Buyurtma berish</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="#content" className="btn-secondary">
                    <Play className="w-4 h-4" />
                    Namunalar
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
                    <p className="font-mono text-3xl font-bold text-red-400">{stat.value}</p>
                    <p className="text-white font-medium">{stat.label}</p>
                    <p className="text-white/40 text-sm">{stat.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-red-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                Xizmatlarimiz
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                Professional{' '}
                <span className="text-gradient-gold font-display">video ishlab chiqarish</span>
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
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-red-500/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                    <service.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-white/50 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Types */}
        <section id="content" className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.02] via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Kontent turlari
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                Sizga mos{' '}
                <span className="text-gradient-gold font-display">format</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {contentTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl border ${
                    type.popular
                      ? 'bg-gradient-to-br from-red-500/10 to-orange-500/5 border-red-500/20'
                      : 'bg-gradient-to-br from-white/[0.02] to-transparent border-white/5'
                  }`}
                >
                  {type.popular && (
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
                      Mashhur
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    type.popular ? 'bg-red-500/20' : 'bg-white/5'
                  }`}>
                    <type.icon className={`w-6 h-6 ${type.popular ? 'text-red-400' : 'text-white/60'}`} />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{type.title}</h3>
                  <p className="text-white/50 text-sm mb-4">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${type.popular ? 'text-red-400' : 'text-gold-400'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Distribution */}
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
                  <Globe2 className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-white">
                    Tarqatish kanallari
                  </h3>
                  <p className="text-white/50 text-sm">Kontentingiz qayerda ko'rsatiladi</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {distribution.map((channel) => (
                  <div key={channel.name} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <channel.icon className="w-8 h-8 text-red-400 mb-3" />
                    <h4 className="font-semibold text-white mb-1">{channel.name}</h4>
                    <p className="text-gold-400 text-sm font-mono">{channel.reach}</p>
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
                Hikoyangizni{' '}
                <span className="text-gradient-gold font-display">aytib bering</span>
              </h2>
              <p className="text-white/50 mb-8">
                Professional video kontentlar orqali brendingizni kuchaytiring.
                Reportaj GO jamoasi sizning xizmatingizda.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-primary">
                  <span>Buyurtma berish</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/services/international" className="btn-secondary">
                  Assembly Media
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
