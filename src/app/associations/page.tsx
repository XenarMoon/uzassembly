'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Building2,
  Users,
  Factory,
  Wheat,
  Shirt,
  Cpu,
  Pill,
  Home,
  Utensils,
  Zap,
  Search,
  ArrowUpRight,
  ArrowRight,
  Globe2,
  Award,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Star,
  ChevronRight
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'
import { cn } from '@/lib/utils'

const stats = [
  { value: '35+', label: 'Assotsiatsiyalar', icon: Building2 },
  { value: '1,500+', label: 'A\'zo korxonalar', icon: Users },
  { value: '9', label: 'Sanoat sektori', icon: Factory },
  { value: '30+', label: 'Xalqaro hamkorlar', icon: Globe2 },
]

const sectors = [
  { id: 'all', name: 'Barcha sektorlar', icon: Building2 },
  { id: 'food', name: 'Oziq-ovqat sanoati', icon: Utensils },
  { id: 'textile', name: 'To\'qimachilik', icon: Shirt },
  { id: 'agriculture', name: 'Qishloq xo\'jaligi', icon: Wheat },
  { id: 'it', name: 'IT & Texnologiya', icon: Cpu },
  { id: 'manufacturing', name: 'Ishlab chiqarish', icon: Factory },
  { id: 'construction', name: 'Qurilish', icon: Home },
  { id: 'energy', name: 'Energetika', icon: Zap },
  { id: 'pharma', name: 'Farmatsevtika', icon: Pill },
]

const associations = [
  { id: 1, name: 'Oziq-ovqat Sanoati Assotsiatsiyasi', shortName: 'OOSA', sector: 'food', members: 120, founded: 2018, logo: '🍞', featured: true, description: 'O\'zbekiston oziq-ovqat ishlab chiqaruvchilarini birlashtiruvchi yetakchi assotsiatsiya' },
  { id: 2, name: 'To\'qimachilik Sanoati Assotsiatsiyasi', shortName: 'TTSA', sector: 'textile', members: 85, founded: 2017, logo: '🧵', featured: true, description: 'To\'qimachilik va tikuvchilik korxonalarining birlashmasi' },
  { id: 3, name: 'Agrosanoat Majmuasi Assotsiatsiyasi', shortName: 'AMA', sector: 'agriculture', members: 200, founded: 2016, logo: '🌾', featured: true, description: 'Qishloq xo\'jaligi va agrosanoat korxonalari uyushmasi' },
  { id: 4, name: 'IT Park Assotsiatsiyasi', shortName: 'ITPA', sector: 'it', members: 150, founded: 2019, logo: '💻', featured: true, description: 'IT kompaniyalar va startaplarni qo\'llab-quvvatlash' },
  { id: 5, name: 'Farmatsevtika Assotsiatsiyasi', shortName: 'FIA', sector: 'pharma', members: 45, founded: 2018, logo: '💊', description: 'Dori-darmon ishlab chiqaruvchilari assotsiatsiyasi' },
  { id: 6, name: 'Qurilish Materiallari Assotsiatsiyasi', shortName: 'QMIA', sector: 'construction', members: 90, founded: 2017, logo: '🏗️', description: 'Qurilish materiallari ishlab chiqaruvchilari' },
  { id: 7, name: 'Yashil Energetika Assotsiatsiyasi', shortName: 'YEA', sector: 'energy', members: 35, founded: 2020, logo: '⚡', description: 'Qayta tiklanadigan energiya manbalari' },
  { id: 8, name: 'Logistika va Transport Assotsiatsiyasi', shortName: 'LTA', sector: 'manufacturing', members: 75, founded: 2018, logo: '🚛', description: 'Logistika va transport xizmatlari' },
  { id: 9, name: 'Mashinasozlik Assotsiatsiyasi', shortName: 'MMA', sector: 'manufacturing', members: 60, founded: 2017, logo: '⚙️', description: 'Mashina va uskunalar ishlab chiqarish' },
  { id: 10, name: 'Sut Mahsulotlari Assotsiatsiyasi', shortName: 'SSMA', sector: 'food', members: 55, founded: 2019, logo: '🥛', description: 'Sut va sut mahsulotlari ishlab chiqaruvchilari' },
  { id: 11, name: 'Meva-sabzavot Eksportchilari Assotsiatsiyasi', shortName: 'MSEA', sector: 'agriculture', members: 110, founded: 2018, logo: '🍎', description: 'Meva-sabzavot eksport qiluvchi korxonalar' },
  { id: 12, name: 'Charm va Poyabzal Assotsiatsiyasi', shortName: 'CPSA', sector: 'textile', members: 40, founded: 2019, logo: '👞', description: 'Charm va poyabzal ishlab chiqaruvchilari' },
  { id: 13, name: 'Plastmassa Mahsulotlari Assotsiatsiyasi', shortName: 'PPMA', sector: 'manufacturing', members: 50, founded: 2018, logo: '🧪', description: 'Plastmassa va polimer mahsulotlari' },
  { id: 14, name: 'Elektrotexnika Assotsiatsiyasi', shortName: 'ESA', sector: 'manufacturing', members: 45, founded: 2019, logo: '🔌', description: 'Elektr uskunalar ishlab chiqarish' },
  { id: 15, name: 'Mebel Ishlab Chiqaruvchilari Assotsiatsiyasi', shortName: 'MIA', sector: 'manufacturing', members: 70, founded: 2017, logo: '🪑', description: 'Mebel va yog\'och mahsulotlari' },
  { id: 16, name: 'Konditer Mahsulotlari Assotsiatsiyasi', shortName: 'KSMA', sector: 'food', members: 65, founded: 2018, logo: '🍰', description: 'Shirinlik va konditer mahsulotlari' },
  { id: 17, name: 'Go\'sht Mahsulotlari Assotsiatsiyasi', shortName: 'GGMA', sector: 'food', members: 45, founded: 2019, logo: '🥩', description: 'Go\'sht qayta ishlash korxonalari' },
  { id: 18, name: 'Ichimliklar Sanoati Assotsiatsiyasi', shortName: 'IIA', sector: 'food', members: 35, founded: 2018, logo: '🥤', description: 'Ichimliklar ishlab chiqaruvchilari' },
  { id: 19, name: 'IT Outsourcing Assotsiatsiyasi', shortName: 'ITOA', sector: 'it', members: 80, founded: 2020, logo: '🖥️', description: 'IT xizmatlar va outsourcing kompaniyalari' },
  { id: 20, name: 'FinTech Assotsiatsiyasi', shortName: 'FTA', sector: 'it', members: 40, founded: 2021, logo: '💳', description: 'Moliyaviy texnologiyalar startaplari' },
  { id: 21, name: 'Qishloq Xo\'jaligi Texnikasi Assotsiatsiyasi', shortName: 'QXTA', sector: 'agriculture', members: 30, founded: 2019, logo: '🚜', description: 'Agrar texnika va uskunalar' },
  { id: 22, name: 'Paxta Qayta Ishlash Assotsiatsiyasi', shortName: 'PQA', sector: 'textile', members: 55, founded: 2017, logo: '🧶', description: 'Paxta va ip-gazlama sanoati' },
  { id: 23, name: 'Sement va Beton Assotsiatsiyasi', shortName: 'SBMA', sector: 'construction', members: 35, founded: 2018, logo: '🏛️', description: 'Sement va beton mahsulotlari' },
  { id: 24, name: 'Quyosh Energetikasi Assotsiatsiyasi', shortName: 'QEA', sector: 'energy', members: 25, founded: 2021, logo: '☀️', description: 'Quyosh energiyasi loyihalari' },
]

const benefits = [
  { icon: Users, title: 'Keng tarmoq', description: '1500+ a\'zo korxona bilan bevosita aloqa' },
  { icon: Award, title: 'Maxsus imtiyozlar', description: 'Chegirmalar va preferensial tariflar' },
  { icon: Globe2, title: 'Xalqaro aloqalar', description: '30+ davlat bilan hamkorlik imkoniyati' },
  { icon: Briefcase, title: 'Professional xizmatlar', description: 'GR, FR, BR xizmatlari mavjud' },
  { icon: TrendingUp, title: 'Rivojlanish', description: 'O\'quv dasturlari va treninglar' },
  { icon: CheckCircle2, title: 'Huquqiy yordam', description: 'Huquqiy maslahat va himoya' },
]

export default function AssociationsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedSector, setSelectedSector] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(6)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])

  const filteredAssociations = associations.filter((assoc) => {
    const matchesSector = selectedSector === 'all' || assoc.sector === selectedSector
    const matchesSearch = assoc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assoc.shortName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSector && matchesSearch
  })

  const visibleAssociations = filteredAssociations.slice(0, visibleCount)
  const hasMore = visibleCount < filteredAssociations.length
  const remainingCount = filteredAssociations.length - visibleCount

  const featuredAssociations = associations.filter(a => a.featured)

  // Reset visible count when filters change
  const handleSectorChange = (sectorId: string) => {
    setSelectedSector(sectorId)
    setVisibleCount(6)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setVisibleCount(6)
  }

  const loadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  return (
    <>
      <Header />
      <main ref={containerRef} className="relative bg-navy-900 overflow-hidden min-h-screen">

        {/* Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 30% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 70% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
              `
            }}
          />
          <motion.div
            style={{ y: orbY1 }}
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            initial={{ x: '10%', y: '20%' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gold-500/50 to-amber-500/30 rounded-full" />
          </motion.div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 lg:pt-40 pb-20">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="badge-gold">
                  <Building2 className="w-4 h-4" />
                  Assotsiatsiyalar
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
                Biznes{' '}
                <span className="text-gradient-gold font-display">Assotsiatsiyalari</span>
              </h1>

              <p className="text-lg text-white/60 leading-relaxed">
                O'zbekiston Iqtisodiyot Assambleyasi tarkibidagi sanoat assotsiatsiyalari —
                har bir sektorda biznesingiz uchun kuchli hamkor va qo'llab-quvvatlash tizimi.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-center group hover:border-gold-500/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <p className="font-mono text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Associations */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-gold-500/[0.02] via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium mb-4">
                  <Star className="w-4 h-4" />
                  Yetakchi assotsiatsiyalar
                </span>
                <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                  Eng yirik{' '}
                  <span className="text-gradient-gold font-display">a'zo tashkilotlar</span>
                </h2>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredAssociations.map((assoc, index) => (
                <motion.div
                  key={assoc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-gold-500/5 to-transparent border border-gold-500/10 hover:border-gold-500/30 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{assoc.logo}</span>
                    <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-mono">
                      {assoc.shortName}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-gold-400 transition-colors">
                    {assoc.name}
                  </h3>
                  <p className="text-white/50 text-sm mb-4 line-clamp-2">
                    {assoc.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{assoc.members} a'zo</span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Associations Directory */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                Katalog
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-8">
                Barcha{' '}
                <span className="text-gradient-gold font-display">assotsiatsiyalar</span>
              </h2>

              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                {/* Search */}
                <div className="relative w-full lg:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="text"
                    placeholder="Assotsiatsiya qidirish..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                  />
                </div>

                {/* Sector Pills */}
                <div className="flex flex-wrap gap-2">
                  {sectors.map((sector) => (
                    <button
                      key={sector.id}
                      onClick={() => handleSectorChange(sector.id)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                        selectedSector === sector.id
                          ? 'bg-gold-500 text-navy-900'
                          : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white border border-white/5'
                      )}
                    >
                      <sector.icon className="w-4 h-4" />
                      <span>{sector.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Results count */}
            <p className="text-white/40 text-sm mb-6">
              {filteredAssociations.length} ta assotsiatsiya topildi
            </p>

            {/* Associations Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {visibleAssociations.map((assoc, index) => (
                  <motion.div
                    key={assoc.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold-500/20 hover:bg-white/[0.04] transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-4xl">{assoc.logo}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-white/5 text-white/50 text-xs font-mono">
                            {assoc.shortName}
                          </span>
                          <span className="text-white/30 text-xs">{assoc.founded}</span>
                        </div>
                        <h3 className="text-white font-semibold group-hover:text-gold-400 transition-colors line-clamp-2">
                          {assoc.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm mb-4 line-clamp-2">
                      {assoc.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{assoc.members} a'zo korxona</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center mt-10"
              >
                <button
                  onClick={loadMore}
                  className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-gold-500/30 hover:bg-white/[0.05] transition-all"
                >
                  <span className="text-white font-medium">Ko'proq ko'rsatish</span>
                  <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-sm font-mono">
                    +{remainingCount}
                  </span>
                </button>
              </motion.div>
            )}

            {filteredAssociations.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-white/40 text-lg">Hech narsa topilmadi</p>
                <p className="text-white/30 text-sm mt-2">Boshqa kalit so'z bilan qidirib ko'ring</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/[0.02] to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                A'zolik afzalliklari
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                Nima uchun{' '}
                <span className="text-gradient-gold font-display">a'zo bo'lish kerak?</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Assambleyaga a'zo bo'lgan korxonalar quyidagi imkoniyatlardan foydalanadi
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold-500/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                    <benefit.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-white/50 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-8 lg:p-12 rounded-3xl overflow-hidden"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-gold-500/5 to-transparent" />
              <div className="absolute inset-0 border border-gold-500/20 rounded-3xl" />

              <div className="relative z-10 text-center">
                <h2 className="font-heading text-2xl lg:text-4xl font-semibold text-white mb-4">
                  Assotsiatsiyangizni{' '}
                  <span className="text-gradient-gold font-display">ro'yxatdan o'tkazing</span>
                </h2>
                <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                  A'zolik mutlaqo bepul. Bugun arizangizni topshiring va
                  Assambleyaning barcha imkoniyatlaridan foydalaning.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/contact" className="btn-primary">
                    <span>Ariza topshirish</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/membership" className="btn-secondary">
                    A'zolik haqida
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
