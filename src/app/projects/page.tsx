'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  Train,
  Car,
  Cpu,
  Factory,
  Heart,
  Sun,
  GraduationCap,
  Baby,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  Users,
  Target,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'
import { cn } from '@/lib/utils'

// Project categories
const categories = [
  { id: 'all', name: 'Barcha Loyihalar', count: 9 },
  { id: 'infrastructure', name: 'Infratuzilma', count: 2 },
  { id: 'smart-city', name: 'Smart City', count: 1 },
  { id: 'industrial', name: 'Sanoat', count: 1 },
  { id: 'healthcare', name: 'Sog\'liqni Saqlash', count: 2 },
  { id: 'energy', name: 'Energetika', count: 1 },
  { id: 'education', name: 'Ta\'lim', count: 2 },
]

// Comprehensive project data from assembly.uz
const projects = [
  {
    id: 1,
    title: "Tramvay Liniyasi",
    titleEn: "Tramline",
    description: "Toshkent viloyatini shahar markazi bilan bog'laydigan tramvay liniyasini qurish. Zamonaviy transport infratuzilmasi.",
    fullDescription: "Toshkent viloyatini shahar markazi bilan bog'laydigan zamonaviy tramvay liniyasining qurilishi. Ushbu loyiha shaharga kirish-chiqish masalasini hal qiladi va ekologik toza transport turini taqdim etadi.",
    location: "Toshkent shahri",
    investment: "$500M+",
    status: "Faol",
    year: "2024-2028",
    category: "infrastructure",
    icon: Train,
    color: "turquoise",
    featured: true,
    partners: [
      "Toshkent shahar hokimligi",
      "Transport vazirligi",
      "Dovus Group",
      "Islom Taraqqiyot Banki"
    ],
    benefits: [
      "Tashqi viloyatdan markazga qulay kirish",
      "Ekologik toza transport",
      "Yo'l tirbandligini kamaytirish",
      "Zamonaviy infratuzilma"
    ],
    stats: [
      { label: "Uzunlik", value: "25+ km" },
      { label: "Bekatlar", value: "15+" },
      { label: "Yo'lovchilar", value: "100K+" },
    ]
  },
  {
    id: 2,
    title: "Toshkent Halqa Yo'li",
    titleEn: "Tashkent Ring Road",
    description: "Toshkent shahrida 3-halqa yo'lining qurilishi. Shahardagi transport muammolarini hal qilish.",
    fullDescription: "Toshkent shahri uchun 3-halqa yo'lining qurilishi bo'yicha yirik infratuzilma loyihasi. Bu loyiha shahar markazidagi yo'l tirbandligini sezilarli darajada kamaytiradi.",
    location: "Toshkent shahri",
    investment: "$800M+",
    status: "Rejalashtirilmoqda",
    year: "2025-2029",
    category: "infrastructure",
    icon: Car,
    color: "gold",
    featured: false,
    partners: [
      "Toshkent shahar hokimligi",
      "Transport vazirligi",
      "Dovus Group",
      "Islom Taraqqiyot Banki"
    ],
    benefits: [
      "Shahar markazidagi yuklamani kamaytirish",
      "Tezkor tranzit harakati",
      "Iqtisodiy zonalarni bog'lash",
      "Xavfsiz va zamonaviy yo'l"
    ],
    stats: [
      { label: "Uzunlik", value: "65 km" },
      { label: "Ko'priklar", value: "12" },
      { label: "Almashinuv", value: "8" },
    ]
  },
  {
    id: 3,
    title: "Smart City Ohangaron",
    titleEn: "Smart City Development",
    description: "6,400 gektar maydonda 'smart city' qurilishi. O'zbekistonning eng yirik shaharsozlik loyihasi.",
    fullDescription: "Toshkent viloyatida 6,400 gektarlik maydonda zamonaviy 'smart city' qurilishi. Bu loyiha O'zbekistonning eng yirik shaharsozlik va investitsiya loyihasi bo'lib, jahon standartlariga mos infratuzilma yaratadi.",
    location: "Toshkent viloyati, Ohangaron",
    investment: "$20B+",
    status: "Faol",
    year: "2024-2035",
    category: "smart-city",
    icon: Cpu,
    color: "gold",
    featured: true,
    partners: [
      "Adliya vazirligi",
      "Toshkent viloyati hokimligi",
      "Dovush Group",
      "Multinational Investment Group (MIG)"
    ],
    benefits: [
      "Zamonaviy yashash muhiti",
      "Aqlli transport tizimi",
      "Yashil texnologiyalar",
      "50,000+ ish o'rni"
    ],
    stats: [
      { label: "Maydon", value: "6,400 ga" },
      { label: "Investitsiya", value: "$20B+" },
      { label: "Ish o'rni", value: "50K+" },
    ]
  },
  {
    id: 4,
    title: "Sanoat Parkი",
    titleEn: "Industrial Park",
    description: "Chirchiq tumanida 150 gektarlik sanoat parki. Zamonaviy ishlab chiqarish zonasi.",
    fullDescription: "Chirchiq tumanida 150 gektarlik maydonda zamonaviy sanoat parkining qurilishi. Loyiha import o'rnini bosuvchi va eksportga mo'ljallangan ishlab chiqarishni yo'lga qo'yishga qaratilgan.",
    location: "Chirchiq tumani",
    investment: "$350M",
    status: "Faol",
    year: "2024-2027",
    category: "industrial",
    icon: Factory,
    color: "emerald",
    featured: false,
    partners: [
      "DSAK Group",
      "Dovus Group"
    ],
    benefits: [
      "Zamonaviy ishlab chiqarish zonasi",
      "Logistika infratuzilmasi",
      "Soliq imtiyozlari",
      "Eksport imkoniyatlari"
    ],
    stats: [
      { label: "Maydon", value: "150 ga" },
      { label: "Rezidentlar", value: "30+" },
      { label: "Ish o'rni", value: "5K+" },
    ]
  },
  {
    id: 5,
    title: "Davlat Shifoxonasi",
    titleEn: "Municipal Hospital",
    description: "2,000 o'rinlik zamonaviy davlat shifoxonasi. Xalq salomatligini himoya qilish.",
    fullDescription: "2,000 o'rinlik zamonaviy davlat shifoxonasining qurilishi. Loyiha aholi salomatligini himoya qilish va tibbiy xizmatlar sifatini oshirishga qaratilgan.",
    location: "Toshkent shahri",
    investment: "$400M",
    status: "Rejalashtirilmoqda",
    year: "2025-2028",
    category: "healthcare",
    icon: Heart,
    color: "rose",
    featured: false,
    partners: [
      "Sog'liqni saqlash vazirligi",
      "Vazirlar Mahkamasi",
      "Islom Taraqqiyot Banki"
    ],
    benefits: [
      "Zamonaviy tibbiy uskunalar",
      "Yuqori malakali shifokorlar",
      "Xalqqa qulay narxlar",
      "24/7 favqulodda yordam"
    ],
    stats: [
      { label: "O'rinlar", value: "2,000" },
      { label: "Bo'limlar", value: "25+" },
      { label: "Shifokorlar", value: "500+" },
    ]
  },
  {
    id: 6,
    title: "Xususiy Klinika",
    titleEn: "Private Hospital",
    description: "200 o'rinlik xususiy klinika. Premium tibbiy xizmatlar.",
    fullDescription: "200 o'rinlik xususiy klinikaning qurilishi. Loyiha yuqori sifatli va premium tibbiy xizmatlarni taqdim etishga qaratilgan.",
    location: "Toshkent shahri",
    investment: "$80M",
    status: "Faol",
    year: "2024-2026",
    category: "healthcare",
    icon: Heart,
    color: "violet",
    featured: false,
    partners: [
      "N'MEDOV Holding",
      "DSAK Group"
    ],
    benefits: [
      "Premium tibbiy xizmat",
      "Xalqaro standartlar",
      "Zamonaviy diagnostika",
      "VIP palatalar"
    ],
    stats: [
      { label: "O'rinlar", value: "200" },
      { label: "Operatsion", value: "8" },
      { label: "Laboratoriya", value: "5" },
    ]
  },
  {
    id: 7,
    title: "Quyosh Energiyasi",
    titleEn: "Solar Farm",
    description: "Toshkent viloyatida quyosh elektr stansiyasi. Yashil energiya kelajagi.",
    fullDescription: "Toshkent viloyatida yirik quyosh elektr stansiyasining qurilishi. Loyiha qayta tiklanadigan energiya manbalaridan foydalanishni oshirish va ekologiyani yaxshilashga qaratilgan.",
    location: "Toshkent viloyati",
    investment: "$200M",
    status: "Faol",
    year: "2024-2026",
    category: "energy",
    icon: Sun,
    color: "amber",
    featured: false,
    partners: [
      "DSAK Group",
      "Solar Nature",
      "Quwwat Group"
    ],
    benefits: [
      "Toza energiya ishlab chiqarish",
      "Karbon chiqindilarini kamaytirish",
      "Energiya xavfsizligi",
      "Innovatsion texnologiyalar"
    ],
    stats: [
      { label: "Quvvat", value: "100 MW" },
      { label: "Maydon", value: "200 ga" },
      { label: "Uylar", value: "50K+" },
    ]
  },
  {
    id: 8,
    title: "EDU-JOB Platformasi",
    titleEn: "Educational Platform",
    description: "Online va offline ta'lim platformasi. Malakali kadrlar tayyorlash.",
    fullDescription: "EDU-JOB - online va offline kurslar orqali malakali kadrlar tayyorlash platformasi. Yadin School, Coursera, Mohirdev va Quwwat bilan hamkorlikda.",
    location: "Butun O'zbekiston",
    investment: "$15M",
    status: "Faol",
    year: "2023-davom",
    category: "education",
    icon: GraduationCap,
    color: "violet",
    featured: true,
    partners: [
      "Yadin School",
      "Coursera",
      "Mohirdev",
      "Quwwat Group"
    ],
    benefits: [
      "Online ta'lim imkoniyatlari",
      "Xalqaro sertifikatlar",
      "Amaliy ko'nikmalar",
      "Ish bilan ta'minlash"
    ],
    stats: [
      { label: "Kurslar", value: "200+" },
      { label: "O'quvchilar", value: "10K+" },
      { label: "Ish topgan", value: "70%" },
    ]
  },
  {
    id: 9,
    title: "Kids Time Academy",
    titleEn: "Kids Time Academy",
    description: "Rivojlanishda qiyinchiliklari bo'lgan bolalar uchun o'quv markazi.",
    fullDescription: "Kids Time Academy - rivojlanishda qiyinchiliklari bo'lgan bolalar uchun maxsus o'quv markazi. Tegritymax tomonidan boshqariladi.",
    location: "Toshkent shahri",
    investment: "$5M",
    status: "Faol",
    year: "2023-davom",
    category: "education",
    icon: Baby,
    color: "rose",
    featured: false,
    partners: [
      "Tegritymax"
    ],
    benefits: [
      "Individual yondashuv",
      "Professional pedagoglar",
      "Zamonaviy metodlar",
      "Oilaviy qo'llab-quvvatlash"
    ],
    stats: [
      { label: "Bolalar", value: "200+" },
      { label: "Mutaxassislar", value: "30+" },
      { label: "Dasturlar", value: "15" },
    ]
  },
]

// Color mappings
const colorClasses = {
  gold: {
    bg: 'bg-gold-500/10',
    border: 'border-gold-500/30',
    text: 'text-gold-400',
    badge: 'bg-gold-500/20 text-gold-400',
    gradient: 'from-gold-500/20 via-navy-800/50 to-navy-900',
    hover: 'hover:border-gold-500/50',
  },
  turquoise: {
    bg: 'bg-turquoise-500/10',
    border: 'border-turquoise-500/30',
    text: 'text-turquoise-400',
    badge: 'bg-turquoise-500/20 text-turquoise-400',
    gradient: 'from-turquoise-500/20 via-navy-800/50 to-navy-900',
    hover: 'hover:border-turquoise-500/50',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-400',
    gradient: 'from-emerald-500/20 via-navy-800/50 to-navy-900',
    hover: 'hover:border-emerald-500/50',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    badge: 'bg-violet-500/20 text-violet-400',
    gradient: 'from-violet-500/20 via-navy-800/50 to-navy-900',
    hover: 'hover:border-violet-500/50',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    badge: 'bg-rose-500/20 text-rose-400',
    gradient: 'from-rose-500/20 via-navy-800/50 to-navy-900',
    hover: 'hover:border-rose-500/50',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-400',
    gradient: 'from-amber-500/20 via-navy-800/50 to-navy-900',
    hover: 'hover:border-amber-500/50',
  },
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])
  const orbY2 = useTransform(smoothProgress, [0, 1], [0, -300])

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const featuredProjects = projects.filter(p => p.featured)

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

        {/* === HERO SECTION === */}
        <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-20">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="badge-gold mb-6">
                <Sparkles className="w-4 h-4" />
                Strategik Loyihalar
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
                Yirik{' '}
                <span className="text-gradient-gold font-display">Investitsiya</span>{' '}
                Loyihalari
              </h1>

              <p className="text-lg lg:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
                O'zbekiston Iqtisodiyot Assambleyasi yetakchiligidagi strategik loyihalar —
                infratuzilma, sog'liqni saqlash, ta'lim va yangi texnologiyalar sohasida.
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {[
                { value: '$25B+', label: 'Umumiy investitsiya' },
                { value: '9', label: 'Faol loyihalar' },
                { value: '20+', label: 'Hamkorlar' },
                { value: '60K+', label: 'Ish o\'rinlari' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                  <p className="font-mono text-2xl lg:text-3xl font-bold text-gold-400">{stat.value}</p>
                  <p className="text-white/40 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* === FEATURED PROJECTS === */}
        <section className="relative py-12 lg:py-16">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-2 block">
                Asosiy Loyihalar
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                Strategik{' '}
                <span className="text-gradient-gold font-display">Yo'nalishlar</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => {
                const colors = colorClasses[project.color as keyof typeof colorClasses]
                const IconComponent = project.icon

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className={cn(
                        'group relative h-full rounded-2xl overflow-hidden cursor-pointer',
                        'bg-gradient-to-br border transition-all duration-500',
                        colors.gradient,
                        colors.border,
                        colors.hover
                      )}
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                          backgroundSize: '30px 30px',
                        }}
                      />

                      <div className="relative p-6 lg:p-8 h-full flex flex-col">
                        {/* Icon & Status */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colors.bg)}>
                            <IconComponent className={cn('w-6 h-6', colors.text)} />
                          </div>
                          <span className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1',
                            project.status === 'Faol'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          )}>
                            {project.status === 'Faol' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                            {project.status}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-heading text-xl lg:text-2xl font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/50 text-sm mb-4 flex-grow">
                          {project.description}
                        </p>

                        {/* Location & Investment */}
                        <div className="space-y-3 pt-4 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white/40 text-sm">
                              <MapPin className="w-4 h-4" />
                              <span>{project.location}</span>
                            </div>
                            <span className={cn('font-mono font-bold', colors.text)}>
                              {project.investment}
                            </span>
                          </div>

                          {/* Mini Stats */}
                          <div className="grid grid-cols-3 gap-2">
                            {project.stats.map((stat) => (
                              <div key={stat.label} className="text-center p-2 rounded-lg bg-navy-900/50">
                                <p className="font-mono text-sm font-bold text-white">{stat.value}</p>
                                <p className="text-white/30 text-xs">{stat.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-4 flex items-center gap-2 text-gold-400 group-hover:text-gold-300 transition-colors">
                          <span className="text-sm font-medium">Batafsil</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* === ALL PROJECTS WITH FILTER === */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header with Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8"
            >
              <div>
                <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-2 block">
                  Barcha Loyihalar
                </span>
                <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                  Loyihalar{' '}
                  <span className="text-gradient-gold font-display">Katalogi</span>
                </h2>
              </div>

              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 rounded-md transition-colors',
                      viewMode === 'grid' ? 'bg-gold-500 text-navy-900' : 'text-white/50 hover:text-white'
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 rounded-md transition-colors',
                      viewMode === 'list' ? 'bg-gold-500 text-navy-900' : 'text-white/50 hover:text-white'
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    activeCategory === category.id
                      ? 'bg-gold-500 text-navy-900'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                  )}
                >
                  {category.name}
                  <span className={cn(
                    'ml-2 px-1.5 py-0.5 rounded-full text-xs',
                    activeCategory === category.id
                      ? 'bg-navy-900/20 text-navy-900'
                      : 'bg-white/10 text-white/40'
                  )}>
                    {category.count}
                  </span>
                </button>
              ))}
            </motion.div>

            {/* Projects Grid/List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  viewMode === 'grid'
                    ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                )}
              >
                {filteredProjects.map((project, index) => {
                  const colors = colorClasses[project.color as keyof typeof colorClasses]
                  const IconComponent = project.icon

                  if (viewMode === 'list') {
                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={cn(
                          'group relative rounded-xl overflow-hidden cursor-pointer',
                          'bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300'
                        )}
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="p-5 lg:p-6">
                          <div className="flex items-center gap-6">
                            {/* Icon */}
                            <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0', colors.bg)}>
                              <IconComponent className={cn('w-7 h-7', colors.text)} />
                            </div>

                            {/* Content */}
                            <div className="flex-grow min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h3 className="font-heading text-lg font-semibold text-white group-hover:text-gold-400 transition-colors">
                                    {project.title}
                                  </h3>
                                  <p className="text-white/50 text-sm mt-1 line-clamp-1">
                                    {project.description}
                                  </p>
                                </div>
                                <span className={cn(
                                  'px-3 py-1 rounded-full text-xs font-medium flex-shrink-0',
                                  project.status === 'Faol'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-amber-500/20 text-amber-400'
                                )}>
                                  {project.status}
                                </span>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
                              <div className="text-right">
                                <p className={cn('font-mono text-lg font-bold', colors.text)}>{project.investment}</p>
                                <p className="text-white/30 text-xs">Investitsiya</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-1 text-white/40 text-sm">
                                  <MapPin className="w-4 h-4" />
                                  <span>{project.location}</span>
                                </div>
                                <p className="text-white/30 text-xs mt-1">{project.year}</p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  }

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        'group relative rounded-2xl overflow-hidden cursor-pointer',
                        'bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300',
                        'hover:bg-white/[0.04]'
                      )}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colors.bg)}>
                            <IconComponent className={cn('w-6 h-6', colors.text)} />
                          </div>
                          <span className={cn(
                            'px-2.5 py-1 rounded-full text-xs font-medium',
                            project.status === 'Faol'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          )}>
                            {project.status}
                          </span>
                        </div>

                        {/* Content */}
                        <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/50 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex items-center gap-1.5 text-white/40 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate max-w-[120px]">{project.location}</span>
                          </div>
                          <span className={cn('font-mono font-bold text-sm', colors.text)}>
                            {project.investment}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* === PARTNERS SECTION === */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/[0.02] to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                Ishonchli Hamkorlar
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                Loyiha{' '}
                <span className="text-gradient-gold font-display">Hamkorlari</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto mb-8">
                Davlat tashkilotlari, xalqaro moliya institutlari va yetakchi xususiy kompaniyalar bilan hamkorlikda ishlaymiz.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'Islom Taraqqiyot Banki',
                  'Toshkent shahar hokimligi',
                  'Transport vazirligi',
                  'Dovus Group',
                  'DSAK Group',
                  'MIG',
                  'Quwwat Group'
                ].map((partner, index) => (
                  <motion.div
                    key={partner}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 text-sm font-medium"
                  >
                    {partner}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* === CTA SECTION === */}
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
                Loyihalarga{' '}
                <span className="text-gradient-gold font-display">qo'shiling</span>
              </h2>
              <p className="text-white/50 mb-8">
                Strategik loyihalarimizda ishtirok etish va investitsiya imkoniyatlarini
                o'rganish uchun biz bilan bog'laning.
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

        {/* === PROJECT DETAIL MODAL === */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/90 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-navy-800 border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const colors = colorClasses[selectedProject.color as keyof typeof colorClasses]
                  const IconComponent = selectedProject.icon

                  return (
                    <>
                      {/* Header */}
                      <div className={cn('p-6 lg:p-8 bg-gradient-to-br', colors.gradient)}>
                        <div className="flex items-start gap-4">
                          <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center', colors.bg)}>
                            <IconComponent className={cn('w-7 h-7', colors.text)} />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-2">
                              <h2 className="font-heading text-2xl font-semibold text-white">
                                {selectedProject.title}
                              </h2>
                              <span className={cn(
                                'px-3 py-1 rounded-full text-xs font-medium',
                                selectedProject.status === 'Faol'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-amber-500/20 text-amber-400'
                              )}>
                                {selectedProject.status}
                              </span>
                            </div>
                            <p className="text-white/50">{selectedProject.titleEn}</p>
                          </div>
                          <button
                            onClick={() => setSelectedProject(null)}
                            className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 mt-6">
                          {selectedProject.stats.map((stat) => (
                            <div key={stat.label} className="text-center p-3 rounded-xl bg-navy-900/50">
                              <p className="font-mono text-xl font-bold text-white">{stat.value}</p>
                              <p className="text-white/40 text-xs">{stat.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 lg:p-8 space-y-6">
                        {/* Description */}
                        <div>
                          <h3 className="font-semibold text-white mb-2">Loyiha haqida</h3>
                          <p className="text-white/60 leading-relaxed">{selectedProject.fullDescription}</p>
                        </div>

                        {/* Meta Info */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
                              <MapPin className="w-4 h-4" />
                              <span>Joylashuv</span>
                            </div>
                            <p className="text-white font-medium">{selectedProject.location}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
                              <Calendar className="w-4 h-4" />
                              <span>Muddat</span>
                            </div>
                            <p className="text-white font-medium">{selectedProject.year}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
                              <DollarSign className="w-4 h-4" />
                              <span>Investitsiya</span>
                            </div>
                            <p className={cn('font-mono font-bold text-lg', colors.text)}>{selectedProject.investment}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
                              <Target className="w-4 h-4" />
                              <span>Holat</span>
                            </div>
                            <p className={cn(
                              'font-medium',
                              selectedProject.status === 'Faol' ? 'text-emerald-400' : 'text-amber-400'
                            )}>
                              {selectedProject.status}
                            </p>
                          </div>
                        </div>

                        {/* Benefits */}
                        <div>
                          <h3 className="font-semibold text-white mb-3">Afzalliklar</h3>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {selectedProject.benefits.map((benefit) => (
                              <div key={benefit} className="flex items-center gap-2 text-white/60 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Partners */}
                        <div>
                          <h3 className="font-semibold text-white mb-3">Hamkorlar</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.partners.map((partner) => (
                              <span
                                key={partner}
                                className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-sm border border-white/10"
                              >
                                {partner}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex gap-3 pt-4">
                          <Link
                            href="/contact"
                            className="flex-1 btn-primary justify-center"
                            onClick={() => setSelectedProject(null)}
                          >
                            <span>Bog'lanish</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setSelectedProject(null)}
                            className="btn-secondary"
                          >
                            Yopish
                          </button>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
      <Footer />
    </>
  )
}
