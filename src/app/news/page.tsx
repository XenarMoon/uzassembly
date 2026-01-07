'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Tag,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  Play,
  Image as ImageIcon,
  FileText,
  Video,
  Newspaper,
  TrendingUp,
  Users,
  Building2,
  Globe2,
  GraduationCap,
  Sparkles,
  Bell,
  Mail,
  CheckCircle2,
  Eye,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'
import { cn } from '@/lib/utils'

// News categories
const categories = [
  { id: 'all', name: 'Barcha', icon: Newspaper, count: 24 },
  { id: 'investment', name: 'Investitsiya', icon: TrendingUp, count: 6 },
  { id: 'events', name: 'Tadbirlar', icon: Users, count: 5 },
  { id: 'projects', name: 'Loyihalar', icon: Building2, count: 4 },
  { id: 'international', name: 'Xalqaro', icon: Globe2, count: 4 },
  { id: 'education', name: 'Ta\'lim', icon: GraduationCap, count: 3 },
  { id: 'announcements', name: 'E\'lonlar', icon: Bell, count: 2 },
]

// Uzbek month names
const months: Record<string, string> = {
  '01': 'yanvar',
  '02': 'fevral',
  '03': 'mart',
  '04': 'aprel',
  '05': 'may',
  '06': 'iyun',
  '07': 'iyul',
  '08': 'avgust',
  '09': 'sentyabr',
  '10': 'oktyabr',
  '11': 'noyabr',
  '12': 'dekabr',
}

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split('-')
  return `${parseInt(day)}-${months[month]}, ${year}`
}

function formatDateShort(dateString: string) {
  const [year, month, day] = dateString.split('-')
  return `${parseInt(day)} ${months[month]}`
}

// Comprehensive news data
const newsArticles = [
  {
    id: 1,
    title: "Smart City Loyihasiga $5 Milliard Yangi Investitsiya Jalb Qilindi",
    excerpt: "Xalqaro konsorsium Markaziy Osiyodagi eng yirik shahar qurilish loyihasi uchun muhim moliyalashtirish bosqichini e'lon qildi — bu O'zbekiston iqtisodiy modernizatsiyasida muhim qadam.",
    content: "Xalqaro investorlar guruhi O'zbekistonning flagship Smart City loyihasiga $5 milliard hajmida yangi investitsiya kiritish bo'yicha kelishuv imzoladi. Bu moliyalashtirish loyihaning ikkinchi bosqichini qamrab oladi va 2030-yilgacha amalga oshiriladi.",
    category: "investment",
    date: "2025-01-02",
    readTime: "5 daqiqa",
    views: 12500,
    featured: true,
    type: "article",
    tags: ["Smart City", "Investitsiya", "Infratuzilma"],
    author: "Assambleya Press",
  },
  {
    id: 2,
    title: "2025-yilgi Markaziy Osiyo Iqtisodiy Forumi Muvaffaqiyatli Yakunlandi",
    excerpt: "15 davlat rahbarlari mintaqaviy iqtisodiy integratsiya bo'yicha uch kunlik sammit uchun Toshkentda yig'ildi. Forum doirasida 50+ memorandum imzolandi.",
    content: "Toshkentda o'tkazilgan Markaziy Osiyo Iqtisodiy Forumi muvaffaqiyatli yakunlandi. Tadbirda 15 davlatdan 500+ delegat ishtirok etdi va 50 dan ortiq hamkorlik memorandumi imzolandi.",
    category: "events",
    date: "2024-12-28",
    readTime: "4 daqiqa",
    views: 8900,
    featured: true,
    type: "article",
    tags: ["Forum", "Xalqaro", "Hamkorlik"],
    author: "Assambleya Press",
  },
  {
    id: 3,
    title: "Yevropa Ittifoqi Bilan Yangi Savdo Bitimi Imzolandi",
    excerpt: "O'zbekiston YI bilan keng qamrovli savdo sheriklarini imzoladi, asosiy eksport sektorlarida tariflarni sezilarli darajada kamaytirdi.",
    content: "O'zbekiston va Yevropa Ittifoqi o'rtasida yangi savdo bitimi imzolandi. Bitim doirasida to'qimachilik, qishloq xo'jaligi va sanoat mahsulotlari uchun tariflar kamaytirildi.",
    category: "international",
    date: "2024-12-20",
    readTime: "4 daqiqa",
    views: 7200,
    featured: false,
    type: "article",
    tags: ["Yevropa Ittifoqi", "Savdo", "Eksport"],
    author: "Assambleya Press",
  },
  {
    id: 4,
    title: "To'qimachilik Assotsiatsiyasi Rekord Eksport O'sishini Qayd Etdi",
    excerpt: "A'zo assotsiatsiya to'qimachilik va kiyim-kechak eksportida yildan-yilga 40% o'sishni nishonlamoqda.",
    content: "O'zbekiston To'qimachilik Sanoati Assotsiatsiyasi 2024-yilda rekord ko'rsatkichlarga erishdi. Eksport hajmi 40% ga oshdi va $3.5 milliardni tashkil etdi.",
    category: "investment",
    date: "2024-12-15",
    readTime: "3 daqiqa",
    views: 5400,
    featured: false,
    type: "article",
    tags: ["To'qimachilik", "Eksport", "Sanoat"],
    author: "Assambleya Press",
  },
  {
    id: 5,
    title: "Milliy Malaka Rivojlantirish Tashabbusi Ishga Tushirildi",
    excerpt: "Assambleya Ta'lim vazirligi bilan keng qamrovli kadrlar tayyorlash dasturi bo'yicha hamkorlik bitimini imzoladi.",
    content: "Yangi milliy malaka rivojlantirish tashabbusi doirasida 100,000 dan ortiq mutaxassis tayyorlanadi. Dastur IT, sanoat va xizmat ko'rsatish sektorlarini qamrab oladi.",
    category: "education",
    date: "2024-12-10",
    readTime: "4 daqiqa",
    views: 6100,
    featured: false,
    type: "article",
    tags: ["Ta'lim", "Kadrlar", "Malaka"],
    author: "Assambleya Press",
  },
  {
    id: 6,
    title: "Dubai Savdo Palatasi Bilan Strategik Hamkorlik",
    excerpt: "Dubai Chamber bilan imzolangan memorandum O'zbek kompaniyalariga BAAda biznes yuritish imkoniyatlarini ochadi.",
    content: "O'zbekiston Iqtisodiyot Assambleyasi va Dubai Savdo Palatasi o'rtasida strategik hamkorlik memorandumi imzolandi. Bu O'zbek kompaniyalari uchun yangi bozorlarni ochadi.",
    category: "international",
    date: "2024-12-05",
    readTime: "3 daqiqa",
    views: 4800,
    featured: false,
    type: "article",
    tags: ["Dubai", "BAA", "Hamkorlik"],
    author: "Assambleya Press",
  },
  {
    id: 7,
    title: "Sanoat Parki Loyihasining Birinchi Bosqichi Tugadi",
    excerpt: "Chirchiq tumanidagi sanoat parki o'z faoliyatini boshladi. Birinchi 10 ta rezident kompaniya ishga tushdi.",
    content: "Chirchiq sanoat parkining birinchi bosqichi muvaffaqiyatli yakunlandi. 10 ta rezident kompaniya ishlab chiqarishni boshladi va 2,000 dan ortiq ish o'rni yaratildi.",
    category: "projects",
    date: "2024-12-01",
    readTime: "3 daqiqa",
    views: 4200,
    featured: false,
    type: "article",
    tags: ["Sanoat Parki", "Ishlab chiqarish", "Ish o'rinlari"],
    author: "Assambleya Press",
  },
  {
    id: 8,
    title: "Yangi A'zolik Dasturi: Kichik Biznes Uchun Maxsus Imtiyozlar",
    excerpt: "Kichik va o'rta biznes uchun maxsus imtiyozli a'zolik dasturi e'lon qilindi. Yillik to'lov 50% kamaytrildi.",
    content: "Assambleya kichik va o'rta biznes uchun yangi a'zolik dasturini taqdim etdi. Dastur doirasida a'zolik to'lovi 50% ga kamaytirildi va qo'shimcha xizmatlar taqdim etiladi.",
    category: "announcements",
    date: "2024-11-28",
    readTime: "2 daqiqa",
    views: 3900,
    featured: false,
    type: "announcement",
    tags: ["A'zolik", "KO'B", "Imtiyozlar"],
    author: "Assambleya Press",
  },
  {
    id: 9,
    title: "Tramvay Loyihasi: Qurilish Ishlari Boshlandi",
    excerpt: "Toshkent tramvay liniyasining qurilishi rasman boshlandi. Birinchi bosqich 2026-yilda yakunlanadi.",
    content: "Toshkent viloyatini shahar markazi bilan bog'laydigan tramvay liniyasining qurilish ishlari boshlandi. Loyiha Islom Taraqqiyot Banki tomonidan moliyalashtirilmoqda.",
    category: "projects",
    date: "2024-11-25",
    readTime: "4 daqiqa",
    views: 5600,
    featured: false,
    type: "article",
    tags: ["Tramvay", "Transport", "Infratuzilma"],
    author: "Assambleya Press",
  },
  {
    id: 10,
    title: "Quyosh Energiyasi Stansiyasi Ishga Tushdi",
    excerpt: "100 MW quvvatga ega quyosh elektr stansiyasi Toshkent viloyatida ishga tushdi. Yilda 50,000 uy uchun energiya ishlab chiqaradi.",
    content: "Toshkent viloyatidagi yangi quyosh elektr stansiyasi muvaffaqiyatli ishga tushdi. Stansiya 100 MW quvvatga ega va yilda 50,000 dan ortiq uyni energiya bilan ta'minlaydi.",
    category: "projects",
    date: "2024-11-20",
    readTime: "3 daqiqa",
    views: 4100,
    featured: false,
    type: "article",
    tags: ["Quyosh energiyasi", "Yashil energiya", "Ekologiya"],
    author: "Assambleya Press",
  },
  {
    id: 11,
    title: "IT Park Rezidentlari Soni 500 ga Yetdi",
    excerpt: "O'zbekiston IT Parklari rezidentlar sonini 500 ga yetkazdi. Soha eksporti $500 millionni tashkil etdi.",
    content: "O'zbekiston IT Parklaridagi rezident kompaniyalar soni 500 ga yetdi. Soha eksporti $500 millionni tashkil etdi va 15,000 dan ortiq dasturchi faoliyat yuritmoqda.",
    category: "investment",
    date: "2024-11-15",
    readTime: "3 daqiqa",
    views: 3800,
    featured: false,
    type: "article",
    tags: ["IT", "Texnologiya", "Eksport"],
    author: "Assambleya Press",
  },
  {
    id: 12,
    title: "Xalqaro Investorlar Forumi: Natijalar va Kelishuvlar",
    excerpt: "Toshkentda o'tkazilgan xalqaro investorlar forumida $2 milliardlik kelishuvlar imzolandi.",
    content: "Xalqaro investorlar forumi muvaffaqiyatli yakunlandi. Forum doirasida 30 ta loyiha bo'yicha $2 milliardlik kelishuvlar imzolandi.",
    category: "events",
    date: "2024-11-10",
    readTime: "5 daqiqa",
    views: 6800,
    featured: false,
    type: "article",
    tags: ["Forum", "Investitsiya", "Kelishuvlar"],
    author: "Assambleya Press",
  },
  {
    id: 13,
    title: "Agro-sanoat Klasteri Tashkil Etildi",
    excerpt: "Farg'ona vodiysida yangi agro-sanoat klasteri tashkil etildi. Klaster 50 ta korxonani birlashtiradi.",
    content: "Farg'ona vodiysida yangi agro-sanoat klasteri faoliyatini boshladi. Klaster 50 ta qishloq xo'jaligi va qayta ishlash korxonasini birlashtiradi.",
    category: "investment",
    date: "2024-11-05",
    readTime: "3 daqiqa",
    views: 3200,
    featured: false,
    type: "article",
    tags: ["Qishloq xo'jaligi", "Klaster", "Farg'ona"],
    author: "Assambleya Press",
  },
  {
    id: 14,
    title: "EDU-JOB Platformasi: 10,000 Nafar Bitiruvchi",
    excerpt: "EDU-JOB ta'lim platformasi 10,000 nafar bitiruvchini nishonladi. 70% i ish bilan ta'minlandi.",
    content: "EDU-JOB platformasi 10,000 nafar bitiruvchiga erishdi. Bitiruvchilarning 70% dan ortig'i ish bilan ta'minlandi.",
    category: "education",
    date: "2024-11-01",
    readTime: "3 daqiqa",
    views: 4500,
    featured: false,
    type: "article",
    tags: ["EDU-JOB", "Ta'lim", "Ish bilan ta'minlash"],
    author: "Assambleya Press",
  },
  {
    id: 15,
    title: "Turkiya Bilan Yangi Hamkorlik Dasturi",
    excerpt: "O'zbekiston va Turkiya o'rtasida yangi iqtisodiy hamkorlik dasturi imzolandi.",
    content: "O'zbekiston va Turkiya o'rtasida yangi iqtisodiy hamkorlik dasturi imzolandi. Dastur savdo, investitsiya va turizm sohalarini qamrab oladi.",
    category: "international",
    date: "2024-10-28",
    readTime: "3 daqiqa",
    views: 3600,
    featured: false,
    type: "article",
    tags: ["Turkiya", "Hamkorlik", "Savdo"],
    author: "Assambleya Press",
  },
  {
    id: 16,
    title: "Yangi Soliq Imtiyozlari: Eksportchilar Uchun",
    excerpt: "Eksportchi korxonalar uchun yangi soliq imtiyozlari joriy etildi. Foyda solig'i 50% ga kamaytirildi.",
    content: "Hukumat eksportchi korxonalar uchun yangi soliq imtiyozlarini joriy etdi. Foyda solig'i stavkasi 50% ga kamaytirildi.",
    category: "announcements",
    date: "2024-10-25",
    readTime: "2 daqiqa",
    views: 5200,
    featured: false,
    type: "announcement",
    tags: ["Soliq", "Imtiyozlar", "Eksport"],
    author: "Assambleya Press",
  },
]

// Media items for gallery
const mediaItems = [
  {
    id: 1,
    type: 'video',
    title: "Smart City Loyihasi Taqdimoti",
    thumbnail: "/images/media/smart-city-video.jpg",
    duration: "12:45",
    date: "2024-12-15",
  },
  {
    id: 2,
    type: 'video',
    title: "Iqtisodiy Forum 2024 Highlights",
    thumbnail: "/images/media/forum-video.jpg",
    duration: "8:30",
    date: "2024-12-28",
  },
  {
    id: 3,
    type: 'gallery',
    title: "Xalqaro Investorlar Forumi",
    thumbnail: "/images/media/investors-gallery.jpg",
    count: 45,
    date: "2024-11-10",
  },
  {
    id: 4,
    type: 'video',
    title: "Assambleya Rahbariyati Intervyusi",
    thumbnail: "/images/media/interview-video.jpg",
    duration: "15:20",
    date: "2024-12-01",
  },
]

// Color mappings for categories
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  investment: { bg: 'bg-gold-500/20', text: 'text-gold-400', border: 'border-gold-500/30' },
  events: { bg: 'bg-turquoise-500/20', text: 'text-turquoise-400', border: 'border-turquoise-500/30' },
  projects: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  international: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30' },
  education: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30' },
  announcements: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedArticle, setSelectedArticle] = useState<typeof newsArticles[0] | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const itemsPerPage = 9

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])
  const orbY2 = useTransform(smoothProgress, [0, 1], [0, -300])

  // Filter articles
  const filteredArticles = useMemo(() => {
    let filtered = newsArticles

    if (activeCategory !== 'all') {
      filtered = filtered.filter(a => a.category === activeCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.tags.some(t => t.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [activeCategory, searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const featuredArticles = newsArticles.filter(a => a.featured).slice(0, 2)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

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
        <section className="relative pt-28 lg:pt-36 pb-12 lg:pb-16">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="badge-gold mb-6">
                <Newspaper className="w-4 h-4" />
                Yangiliklar Markazi
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
                Yangiliklar va{' '}
                <span className="text-gradient-gold font-display">Tadbirlar</span>
              </h1>

              <p className="text-lg lg:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
                O'zbekiston Iqtisodiyot Assambleyasi faoliyati, loyihalar, xalqaro hamkorlik
                va biznes muhitidagi so'nggi yangiliklar.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Yangiliklar qidirish..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* === FEATURED NEWS === */}
        <section className="relative py-8 lg:py-12">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase">
                Asosiy Yangiliklar
              </span>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6">
              {featuredArticles.map((article, index) => {
                const colors = categoryColors[article.category] || categoryColors.investment

                return (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className={cn(
                      'relative h-full min-h-[350px] lg:min-h-[400px] rounded-2xl overflow-hidden',
                      'bg-gradient-to-br from-gold-500/10 via-navy-800/80 to-navy-900',
                      'border border-white/5 hover:border-gold-500/30 transition-all duration-500'
                    )}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                          backgroundSize: '40px 40px',
                        }}
                      />

                      <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
                        {/* Meta */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className={cn('px-3 py-1 rounded-full text-xs font-medium', colors.bg, colors.text)}>
                            {categories.find(c => c.id === article.category)?.name}
                          </span>
                          <span className="text-white/40 text-sm flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-heading text-xl lg:text-2xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors leading-tight">
                          {article.title}
                        </h2>

                        <p className="text-white/50 leading-relaxed mb-4 flex-grow line-clamp-3">
                          {article.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-1 rounded-full bg-white/5 text-white/40 text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center gap-4 text-white/40 text-sm">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {formatDate(article.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Eye className="w-4 h-4" />
                              {article.views.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gold-400 group-hover:text-gold-300 transition-colors">
                            <span className="text-sm font-medium">O'qish</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* === ALL NEWS WITH FILTER === */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Header with Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8"
            >
              <div>
                <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-2 block">
                  Barcha Yangiliklar
                </span>
                <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                  Yangiliklar{' '}
                  <span className="text-gradient-gold font-display">Arxivi</span>
                </h2>
              </div>

              <div className="flex items-center gap-4">
                {/* Results Count */}
                <span className="text-white/40 text-sm">
                  {filteredArticles.length} ta yangilik
                </span>

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
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setCurrentPage(1)
                    }}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                      activeCategory === category.id
                        ? 'bg-gold-500 text-navy-900'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                    )}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                    <span className={cn(
                      'px-1.5 py-0.5 rounded-full text-xs',
                      activeCategory === category.id
                        ? 'bg-navy-900/20 text-navy-900'
                        : 'bg-white/10 text-white/40'
                    )}>
                      {category.count}
                    </span>
                  </button>
                )
              })}
            </motion.div>

            {/* Articles Grid/List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + viewMode + currentPage}
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
                {paginatedArticles.map((article, index) => {
                  const colors = categoryColors[article.category] || categoryColors.investment

                  if (viewMode === 'list') {
                    return (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group cursor-pointer"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <div className={cn(
                          'relative rounded-xl overflow-hidden',
                          'bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300'
                        )}>
                          <div className="p-5 lg:p-6">
                            <div className="flex items-start gap-6">
                              {/* Date Badge */}
                              <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-gold-500/10 flex-shrink-0">
                                <span className="font-mono text-lg font-bold text-gold-400">
                                  {article.date.split('-')[2]}
                                </span>
                                <span className="text-white/40 text-xs uppercase">
                                  {months[article.date.split('-')[1]]?.slice(0, 3)}
                                </span>
                              </div>

                              {/* Content */}
                              <div className="flex-grow min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', colors.bg, colors.text)}>
                                    {categories.find(c => c.id === article.category)?.name}
                                  </span>
                                  <span className="text-white/30 text-xs flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {article.readTime}
                                  </span>
                                </div>
                                <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors line-clamp-1">
                                  {article.title}
                                </h3>
                                <p className="text-white/50 text-sm line-clamp-2">
                                  {article.excerpt}
                                </p>
                              </div>

                              {/* Meta */}
                              <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
                                <div className="flex items-center gap-1.5 text-white/40 text-sm">
                                  <Eye className="w-4 h-4" />
                                  <span>{article.views.toLocaleString()}</span>
                                </div>
                                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    )
                  }

                  return (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className={cn(
                        'relative h-full rounded-xl overflow-hidden',
                        'bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300',
                        'hover:bg-white/[0.04]'
                      )}>
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4">
                            <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', colors.bg, colors.text)}>
                              {categories.find(c => c.id === article.category)?.name}
                            </span>
                            <span className="text-white/30 text-xs flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </span>
                          </div>

                          {/* Content */}
                          <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-white/50 text-sm mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {article.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3 text-white/40 text-xs">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDateShort(article.date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {article.views.toLocaleString()}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-2 mt-12"
              >
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    currentPage === 1
                      ? 'text-white/20 cursor-not-allowed'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      'w-10 h-10 rounded-lg font-medium transition-colors',
                      currentPage === page
                        ? 'bg-gold-500 text-navy-900'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    currentPage === totalPages
                      ? 'text-white/20 cursor-not-allowed'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* === MEDIA GALLERY === */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-turquoise-500/[0.02] to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between gap-6 mb-8"
            >
              <div>
                <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-2 block">
                  Media Kutubxonasi
                </span>
                <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                  Video va{' '}
                  <span className="text-gradient-gold font-display">Foto</span>
                </h2>
              </div>
              <Link
                href="/media"
                className="hidden sm:inline-flex items-center gap-2 text-gold-400 font-medium hover:text-gold-300 transition-colors"
              >
                Barcha media
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mediaItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className={cn(
                    'relative aspect-video rounded-xl overflow-hidden',
                    'bg-gradient-to-br from-navy-700/80 to-navy-800',
                    'border border-white/5 hover:border-gold-500/30 transition-all duration-300'
                  )}>
                    {/* Placeholder Pattern */}
                    <div className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                      }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/20 transition-colors" />

                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={cn(
                        'w-14 h-14 rounded-full flex items-center justify-center transition-all',
                        'bg-white/10 group-hover:bg-gold-500 group-hover:scale-110'
                      )}>
                        {item.type === 'video' ? (
                          <Play className="w-6 h-6 text-white group-hover:text-navy-900 transition-colors ml-1" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-white group-hover:text-navy-900 transition-colors" />
                        )}
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full bg-navy-900/70 text-white text-xs font-medium backdrop-blur-sm">
                        {item.type === 'video' ? item.duration : `${item.count} foto`}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-medium text-white text-sm group-hover:text-gold-400 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-white/40 text-xs mt-1">
                      {formatDateShort(item.date)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === NEWSLETTER SUBSCRIPTION === */}
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

              <div className="relative p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-5 h-5 text-gold-400" />
                      <span className="text-gold-400 font-mono text-xs tracking-widest uppercase">
                        Newsletter
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                      Xabardor{' '}
                      <span className="text-gradient-gold font-display">Bo'ling</span>
                    </h2>

                    <p className="text-white/50 leading-relaxed">
                      Iqtisodiy rivojlanish, investitsiya imkoniyatlari va Assambleya
                      tashabbuslaridagi so'nggi yangiliklar uchun haftalik newsletter ga obuna bo'ling.
                    </p>

                    <div className="flex items-center gap-4 mt-6 text-white/40 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Bepul</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Spam yo'q</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Istalgan vaqtda bekor qilish</span>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div>
                    {isSubscribed ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                      >
                        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h3 className="font-semibold text-white text-lg mb-2">Obuna muvaffaqiyatli!</h3>
                        <p className="text-white/50 text-sm">
                          Tez orada birinchi newsletter ni olasiz.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubscribe} className="space-y-4">
                        <div>
                          <input
                            type="email"
                            placeholder="Email manzilingiz"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-6 py-4 rounded-xl bg-navy-900/50 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500/50 transition-colors"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full btn-primary justify-center"
                        >
                          <span>Obuna Bo'lish</span>
                          <ArrowRight className="w-5 h-5" />
                        </button>
                        <p className="text-white/30 text-xs text-center">
                          "Obuna bo'lish" tugmasini bosish orqali maxfiylik siyosatimizga rozilik bildirasiz.
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === ARTICLE DETAIL MODAL === */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/90 backdrop-blur-sm"
              onClick={() => setSelectedArticle(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-navy-800 border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const colors = categoryColors[selectedArticle.category] || categoryColors.investment

                  return (
                    <>
                      {/* Header */}
                      <div className="relative p-6 lg:p-8 bg-gradient-to-br from-gold-500/10 via-navy-800/80 to-navy-900">
                        {/* Close Button */}
                        <button
                          onClick={() => setSelectedArticle(null)}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>

                        {/* Meta */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className={cn('px-3 py-1 rounded-full text-xs font-medium', colors.bg, colors.text)}>
                            {categories.find(c => c.id === selectedArticle.category)?.name}
                          </span>
                          <span className="text-white/40 text-sm flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {selectedArticle.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4 pr-10">
                          {selectedArticle.title}
                        </h2>

                        {/* Author & Date */}
                        <div className="flex items-center gap-4 text-white/50 text-sm">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {formatDate(selectedArticle.date)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Eye className="w-4 h-4" />
                            {selectedArticle.views.toLocaleString()} ko'rilgan
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 lg:p-8 space-y-6">
                        {/* Excerpt */}
                        <p className="text-white/70 text-lg leading-relaxed">
                          {selectedArticle.excerpt}
                        </p>

                        {/* Full Content */}
                        <p className="text-white/60 leading-relaxed">
                          {selectedArticle.content}
                        </p>

                        {/* Tags */}
                        <div>
                          <h4 className="text-white/40 text-xs uppercase tracking-wider mb-3">Teglar</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedArticle.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-sm border border-white/10"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Share & Actions */}
                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                          <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                              <Share2 className="w-4 h-4" />
                              <span className="text-sm">Ulashish</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                              <Bookmark className="w-4 h-4" />
                              <span className="text-sm">Saqlash</span>
                            </button>
                          </div>
                          <button
                            onClick={() => setSelectedArticle(null)}
                            className="btn-secondary text-sm px-6 py-2"
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
