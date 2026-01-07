'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Globe2,
  Landmark,
  GraduationCap,
  Users,
  TrendingUp,
  MapPin,
  Play,
  Shield,
  Briefcase,
  Target,
  Sparkles,
  CheckCircle2,
  Zap,
  Network,
  Award,
  Video,
  Handshake
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'
import { cn } from '@/lib/utils'

// Main services
const services = [
  {
    id: 'invest-hub',
    number: '01',
    title: 'Investment & Infrastructure',
    subtitle: 'Invest Hub & Smart City',
    description: 'Yirik investitsiya imkoniyatlari va zamonaviy sanoat infratuzilmasiga kirish. "Central Asia Smart City" mega-loyihasi ($20B) doirasida jahon darajasidagi sanoat zonalarida faoliyat yuritish.',
    icon: TrendingUp,
    color: 'gold',
    features: [
      'Smart City mega-loyihasiga kirish',
      'Global investorlar bilan bevosita muloqot',
      'Auditoriyadan o\'tgan loyihalar bazasi',
      'Moliyalashtirish imkoniyatlari',
    ],
    stats: { value: '$20B', label: 'Loyihalar hajmi' },
    href: '/services/invest-hub',
  },
  {
    id: 'government-relations',
    number: '02',
    title: 'Government Relations',
    subtitle: 'Davlat bilan munosabatlar (GR)',
    description: 'Xususiy sektor va davlat o\'rtasidagi ko\'prik. Byurokratik to\'siqlarni bartaraf etish va qonunchilik muammolarini hal qilish uchun konstruktiv dialog.',
    icon: Landmark,
    color: 'turquoise',
    features: [
      'Biznes manfaatlarini huquqiy himoya',
      'Siyosat yaxshilash takliflari',
      'Qonunchilik tashabbuslarida ishtirok',
      'Qulay biznes muhitini yaratish',
    ],
    stats: { value: 'GR', label: 'Legal Advocacy' },
    href: '/services/government-relations',
  },
  {
    id: 'edu-job',
    number: '03',
    title: 'Human Capital Development',
    subtitle: 'Edu-Job dasturi',
    description: 'Xususiy sektordagi kadrlar tanqisligini hal qilish uchun maxsus tizim. Zamonaviy biznes ehtiyojlariga moslashtirilgan malakali mutaxassislarni tayyorlash.',
    icon: GraduationCap,
    color: 'violet',
    features: [
      'Real vaqt rejimida kadrlar tayyorlash',
      '"Bozorga tayyor" mutaxassislar',
      'Malaka oshirish dasturlari',
      'Ish beruvchilar talablariga moslashish',
    ],
    stats: { value: 'Edu', label: 'Job Ready' },
    href: '/services/edu-job',
  },
  {
    id: 'international',
    number: '04',
    title: 'International Diplomacy',
    subtitle: 'Global Branding & Media',
    description: 'O\'zbek korxonalarining obro\'sini global miqyosda oshirish. Xorijiy bozorlarga kirish va xalqaro hamkorlar bilan mustahkam aloqalar o\'rnatish.',
    icon: Globe2,
    color: 'emerald',
    features: [
      'Xorijiy bozorlarga kirish',
      'Xalqaro hamkorliklar',
      'Fikrat Online TV media platformasi',
      'Brend targ\'iboti va tahlil',
    ],
    stats: { value: 'TV', label: 'Media Platform' },
    href: '/services/international',
  },
  {
    id: 'networking',
    number: '05',
    title: 'Sectoral Integration',
    subtitle: 'Executive Networking',
    description: '35+ sanoat assotsiatsiyalarini birlashtirish va tarmoqlararo hamkorlikni rivojlantirish. Ekspert hamjamiyatiga kirish va tajriba almashish.',
    icon: Network,
    color: 'rose',
    features: [
      '35+ sanoat assotsiatsiyalari',
      'Mashvarat Club - elita networking',
      'Yuqori darajadagi yechimlar',
      'Strategik ittifoqlar',
    ],
    stats: { value: '35+', label: 'Assotsiatsiyalar' },
    href: '/services/networking',
  },
]

// Platform benefits
const benefits = [
  { icon: Shield, title: 'Huquqiy Himoya', description: 'Biznes manfaatlarini har tomonlama himoya' },
  { icon: Zap, title: 'Tezkor Xizmat', description: 'Barcha xizmatlar bir platformada' },
  { icon: Target, title: 'Aniq Natija', description: 'Maqsadga yo\'naltirilgan yondashuv' },
  { icon: Award, title: 'Ekspert Jamoa', description: 'Professional mutaxassislar xizmati' },
]

// Featured projects
const featuredProjects = [
  { title: 'Smart City', value: '6,400 ga', location: 'Ohangaron' },
  { title: 'Invest Hub', value: '$20B+', location: 'Loyihalar bazasi' },
  { title: 'Edu-Job', value: '1000+', location: 'Mutaxassislar' },
]

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])
  const orbY2 = useTransform(smoothProgress, [0, 1], [0, -300])

  return (
    <>
      <Header />
      <main ref={containerRef} className="relative bg-navy-900 overflow-hidden">

        {/* === BACKGROUND === */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 20% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 80% 70%, rgba(13, 148, 136, 0.06) 0%, transparent 50%)
              `
            }}
          />
          <motion.div
            style={{ y: orbY1 }}
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            initial={{ x: '5%', y: '10%' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gold-500/40 to-amber-500/20 rounded-full" />
          </motion.div>
          <motion.div
            style={{ y: orbY2 }}
            className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-15"
            initial={{ x: '70%', y: '50%' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-turquoise-500/30 to-emerald-500/20 rounded-full" />
          </motion.div>
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* === HERO === */}
        <section className="relative pt-28 lg:pt-32 pb-12 lg:pb-16">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="badge-gold mb-4">
                <Sparkles className="w-4 h-4" />
                Xizmatlar Ekotizimi
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
                5 ta strategik{' '}
                <span className="text-gradient-gold font-display">yo'nalish</span>
              </h1>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Biznes sub'ektlarini birlashtirish, manfaatlarini himoya qilish va mahalliy
                korxonalarni global miqyosga olib chiqish uchun multi-funksional platforma.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-6 mb-8"
            >
              {featuredProjects.map((project, index) => (
                <div
                  key={project.title}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/5"
                >
                  <span className="font-mono text-lg font-bold text-gold-400">{project.value}</span>
                  <span className="text-white/50 text-sm">{project.title}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* === SERVICES LIST === */}
        <section className="relative py-12 lg:py-16">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={service.href} className="group block">
                    <div className={cn(
                      'relative rounded-2xl overflow-hidden border transition-all duration-500',
                      'bg-white/[0.02] border-white/5 hover:border-white/15',
                      'hover:bg-white/[0.04]'
                    )}>
                      {/* Hover gradient */}
                      <div className={cn(
                        'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                        service.color === 'gold' && 'bg-gradient-to-r from-gold-500/10 via-transparent to-transparent',
                        service.color === 'turquoise' && 'bg-gradient-to-r from-turquoise-500/10 via-transparent to-transparent',
                        service.color === 'violet' && 'bg-gradient-to-r from-violet-500/10 via-transparent to-transparent',
                        service.color === 'emerald' && 'bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent',
                        service.color === 'rose' && 'bg-gradient-to-r from-rose-500/10 via-transparent to-transparent',
                      )} />

                      <div className="relative p-6 lg:p-8">
                        <div className="grid lg:grid-cols-12 gap-6 items-center">
                          {/* Left: Number + Icon + Title */}
                          <div className="lg:col-span-5 flex items-start gap-4">
                            <div className="flex-shrink-0 flex items-center gap-4">
                              <span className="font-mono text-3xl lg:text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                                {service.number}
                              </span>
                              <div className={cn(
                                'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110',
                                service.color === 'gold' && 'bg-gold-500/10',
                                service.color === 'turquoise' && 'bg-turquoise-500/10',
                                service.color === 'violet' && 'bg-violet-500/10',
                                service.color === 'emerald' && 'bg-emerald-500/10',
                                service.color === 'rose' && 'bg-rose-500/10',
                              )}>
                                <service.icon className={cn(
                                  'w-6 h-6',
                                  service.color === 'gold' && 'text-gold-400',
                                  service.color === 'turquoise' && 'text-turquoise-400',
                                  service.color === 'violet' && 'text-violet-400',
                                  service.color === 'emerald' && 'text-emerald-400',
                                  service.color === 'rose' && 'text-rose-400',
                                )} />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-heading text-xl lg:text-2xl font-semibold text-white group-hover:text-gold-400 transition-colors">
                                {service.title}
                              </h3>
                              <p className="text-white/40 text-sm">{service.subtitle}</p>
                            </div>
                          </div>

                          {/* Middle: Description */}
                          <div className="lg:col-span-5">
                            <p className="text-white/60 text-sm leading-relaxed mb-3">
                              {service.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {service.features.slice(0, 2).map((feature) => (
                                <span
                                  key={feature}
                                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 text-white/50 text-xs"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-gold-400" />
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Right: Stats + Arrow */}
                          <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-4">
                            <div className="text-right">
                              <p className={cn(
                                'font-mono text-2xl font-bold',
                                service.color === 'gold' && 'text-gold-400',
                                service.color === 'turquoise' && 'text-turquoise-400',
                                service.color === 'violet' && 'text-violet-400',
                                service.color === 'emerald' && 'text-emerald-400',
                                service.color === 'rose' && 'text-rose-400',
                              )}>
                                {service.stats.value}
                              </p>
                              <p className="text-white/30 text-xs">{service.stats.label}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold-500 transition-all">
                              <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-navy-900 transition-colors" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === BENEFITS === */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Left: Title */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-4"
              >
                <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                  Nima uchun biz?
                </span>
                <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                  Yagona{' '}
                  <span className="text-gradient-gold font-display">platforma</span>
                </h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Barcha biznes xizmatlari bir joyda — professional jamoa va tizimli yondashuv bilan.
                </p>
              </motion.div>

              {/* Right: Benefits Grid */}
              <div className="lg:col-span-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center"
                    >
                      <div className="w-10 h-10 mx-auto rounded-lg bg-gold-500/10 flex items-center justify-center mb-3">
                        <benefit.icon className="w-5 h-5 text-gold-400" />
                      </div>
                      <h3 className="font-semibold text-white text-sm mb-1">{benefit.title}</h3>
                      <p className="text-white/40 text-xs">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === SMART CITY HIGHLIGHT === */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/[0.03] via-transparent to-turquoise-500/[0.03]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-gold-500/20 bg-gradient-to-br from-gold-500/5 via-navy-800/50 to-navy-900"
            >
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }}
              />

              <div className="relative p-6 lg:p-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Left Content */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-medium">
                        Flagship Loyiha
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Faol
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-2">
                      Central Asia{' '}
                      <span className="text-gradient-gold font-display">Smart City</span>
                    </h3>
                    <p className="text-white/40 text-sm mb-4">Ohangaron, Toshkent viloyati</p>

                    <p className="text-white/60 leading-relaxed mb-6">
                      6,400 gektar maydonda qurilayotgan O'zbekistonning eng yirik smart city loyihasi.
                      Jahon darajasidagi sanoat zonalari, zamonaviy infratuzilma va yashil texnologiyalar.
                    </p>

                    <Link
                      href="/services/invest-hub#smart-city"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-navy-900 rounded-full font-semibold text-sm hover:bg-gold-400 transition-colors"
                    >
                      <span>Batafsil</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Right Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '6,400', label: 'Gektar', sublabel: 'Umumiy maydon' },
                      { value: '$20B', label: 'Investitsiya', sublabel: 'Loyiha hajmi' },
                      { value: '2024-30', label: 'Muddat', sublabel: 'Qurilish davri' },
                      { value: '50K+', label: 'Ish o\'rni', sublabel: 'Yaratiladi' },
                    ].map((stat, index) => (
                      <div
                        key={stat.label}
                        className="p-4 rounded-xl bg-navy-900/50 border border-white/5"
                      >
                        <p className="font-mono text-2xl font-bold text-gold-400">{stat.value}</p>
                        <p className="text-white font-medium text-sm">{stat.label}</p>
                        <p className="text-white/40 text-xs">{stat.sublabel}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === MEDIA PLATFORM === */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                  Media Platforma
                </span>
                <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                  Fikrat{' '}
                  <span className="text-gradient-gold font-display">Online TV</span>
                </h2>
                <p className="text-white/50 mb-6 leading-relaxed">
                  Biznes tahlili va brend targ'iboti uchun maxsus media platforma.
                  Professional va keng auditoriya orasida kompaniyangiz ko'rinishini ta'minlang.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/services/reportaj-go"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white rounded-full font-semibold text-sm border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>Reportaj GO</span>
                  </Link>
                  <Link
                    href="/services/international"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-gold-400 font-semibold text-sm hover:text-gold-300 transition-colors"
                  >
                    <span>Batafsil</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Right: Features */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { icon: Video, title: 'Video kontentlar', desc: 'Professional suratga olish' },
                  { icon: Globe2, title: 'Xalqaro tarqatish', desc: 'Global auditoriya' },
                  { icon: TrendingUp, title: 'Biznes tahlil', desc: 'Ekspert sharhlar' },
                  { icon: Award, title: 'Brend targ\'iboti', desc: 'Marketing xizmatlari' },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <item.icon className="w-5 h-5 text-turquoise-400 mb-2" />
                    <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-white/40 text-xs">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* === MASHVARAT CLUB === */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Elita Networking
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                Mashvarat{' '}
                <span className="text-gradient-gold font-display">Club</span>
              </h2>
              <p className="text-white/50">
                Yuqori darajadagi rahbarlar va qaror qabul qiluvchilar uchun eksklyuziv muhit.
                Strategik ittifoqlar tuzish va yuqori darajadagi yechimlar ustida ishlash.
              </p>
            </motion.div>
          </div>
        </section>

        {/* === CTA === */}
        <section className="relative py-16 lg:py-20">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 60%)',
                filter: 'blur(40px)'
              }}
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                Biznesingizni{' '}
                <span className="text-gradient-gold font-display">rivojlantiring</span>
              </h2>
              <p className="text-white/50 mb-8">
                Barcha xizmatlarimizdan foydalanish uchun Assambleyaga a'zo bo'ling
                va professional jamoamiz yordamida maqsadlaringizga erishing.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/membership" className="btn-primary">
                  <span>A'zo bo'lish</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Maslahat olish
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
