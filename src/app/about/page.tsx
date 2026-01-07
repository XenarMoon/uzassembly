'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Quote,
  Building2,
  Users,
  Globe2,
  Landmark,
  Handshake,
  Calendar,
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'
import { cn } from '@/lib/utils'

// Leadership
const chairman = {
  name: 'Muhtor Umarov',
  fullName: 'UMAROV MUKHTOR MANSURKHODJAYEVICH',
  role: 'Assotsiatsiya Raisi',
  roleEn: 'Chairman',
  quote: "Bizning qarashimiz hamma uchun yaxshiroq kelajak qurishni nazarda tutadi. Biz o'zbek xalqi, biznes rahbarlari, hukumat va butun dunyo mamlakatlari o'rtasida iloji boricha mustahkam aloqalarni o'rnatish tarafdorimiz.",
  image: '/images/team/mukhtor-umarov.webp',
}

// Team members
const teamMembers = [
  {
    name: 'Jurabek Matyakubov',
    fullName: 'MATYAKUBOV JURABEK KUZIYEVICH',
    role: 'Rais O\'rinbosari',
    roleEn: 'Deputy Chairman',
    image: '/images/team/MATYAKUBOV JURABEK KUZIYEVICH.JPG',
    featured: true,
  },
  {
    name: 'Gulrukh Radjabova',
    fullName: 'RADJABOVA GULRUKH ALISHEROVNA',
    role: 'Direktor',
    roleEn: 'Director',
    image: '/images/team/RADJABOVA GULRUKH ALISHEROVNA.JPG',
    featured: true,
  },
  {
    name: 'Sunnat Aliyev',
    fullName: 'ALIYEV SUNNAT KAMILOVICH',
    role: 'Xavfsizlik va Huquqiy Xizmatlar bo\'yicha Rais O\'rinbosari',
    roleEn: 'Deputy Chairman for Security and Legal Services',
    image: '/images/team/ALIYEV SUNNAT KAMILOVICH.jpg',
    featured: true,
  },
  {
    name: 'Sabrina Ruzmatova',
    fullName: 'RUZMATOVA SABRINA RUSTAMBEKOVNA',
    role: 'Ayollar Masalalari bo\'yicha Rais O\'rinbosari',
    roleEn: 'Deputy Chairperson for Women\'s Affairs',
    image: '/images/team/RUZMATOVA SABRINA RUSTAMBEKOVNA.JPG',
    featured: false,
  },
  {
    name: 'Malika Ruziyeva',
    fullName: 'RUZIYEVA MALIKA BAKHROM QIZI',
    role: 'Matbuot Kotibi - Axborot Siyosati bo\'yicha Rais O\'rinbosari',
    roleEn: 'Press Secretary - Deputy Chairperson for Information Policy',
    image: '/images/team/RUZIYEVA MALIKA BAKHROM QIZI.JPG',
    featured: false,
  },
  {
    name: 'Mirsulton Mirzarakhmatov',
    fullName: 'MIRZARAKHMATOV MIRSULTON MIRODIL UGLI',
    role: 'Davlat Idoralari bilan Ishlash Bo\'limi Boshlig\'i',
    roleEn: 'Head of Department for work with State Agencies',
    image: '/images/team/MIRZARAKHMATOV MIRSULTON MIRODIL UGLI.jpg',
    featured: false,
  },
  {
    name: 'Sarvara Ahmadova',
    fullName: 'AHMADOVA SARVARA BAKHTIYOR QIZI',
    role: 'Yoshlar Masalalari bo\'yicha Rais Yordamchisi',
    roleEn: 'Assistant to the Chairperson for Youth Affairs',
    image: '/images/team/AHMADOVA SARVARA BAKHTIYOR QIZI.JPG',
    featured: false,
  },
]

// Key facts
const keyFacts = [
  { label: 'Tashkil etilgan', value: '2021', icon: Calendar },
  { label: 'Assotsiatsiyalar', value: '46+', icon: Building2 },
  { label: "A'zo korxonalar", value: '30+', icon: Users },
  { label: 'Jamoa a\'zolari', value: '8', icon: Globe2 },
]

// Pillars
const pillars = [
  {
    title: 'Hukumat bilan Munosabatlar',
    subtitle: 'Government Relations',
    description: "Prezident Administratsiyasi, Vazirlar Mahkamasi, Oliy Majlis Senati va vazirliklar bilan hamkorlik.",
    icon: Landmark,
    color: 'gold',
  },
  {
    title: 'Biznes Diplomatiya',
    subtitle: 'Business Diplomacy',
    description: "Xorijdagi tashkilotlar bilan aloqalar, ishbilarmonlik delegatsiyalari almashinuvi.",
    icon: Globe2,
    color: 'turquoise',
  },
  {
    title: 'Mahalliy Biznes',
    subtitle: 'Local Business',
    description: "35+ assotsiatsiyalarni birlashtirish, samarali hamkorlik va muloqot.",
    icon: Users,
    color: 'violet',
  },
  {
    title: 'Davlat-Xususiy Sheriklik',
    subtitle: 'PPP',
    description: "Davlat va xususiy sektor hamkorligini rivojlantirish, tadbirkorlarni qo'llab-quvvatlash.",
    icon: Handshake,
    color: 'emerald',
  },
]

// Mission points
const missionPoints = [
  "Tadbirkorlar manfaatlarini himoya qilish",
  "Investitsiyalarni jalb qilish va himoya qilish",
  "Qonunchilikni isloh qilish tashabbuslarida ishtirok",
  "Ish o'rinlari yaratishga ko'maklashish",
]

// Milestones
const milestones = [
  { year: '2021', event: "Adliya vazirligi tomonidan rasman tashkil etildi" },
  { year: '2022', event: "30+ a'zo korxonalarni jamladi" },
  { year: '2023', event: '35+ assotsiatsiyalarni birlashtirdi' },
  { year: '2024', event: 'Smart City va xalqaro hamkorliklar' },
]

export default function AboutPage() {
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

        {/* === HERO + CHAIRMAN COMBINED === */}
        <section className="relative pt-28 lg:pt-32 pb-16 lg:pb-20">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Top: Badge + Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="badge-gold mb-4">
                <Sparkles className="w-4 h-4" />
                Biz Haqimizda
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
                Fuqarolar, biznes va{' '}
                <span className="text-gradient-gold font-display">hukumatni birlashtiruvchi</span>
              </h1>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                O'zbekiston Iqtisodiyot Assambleyasi — nodavlat notijorat tashkilot.
                Mamlakatimizning innovatsion xususiy sektorga intilishida muhim bosqich.
              </p>
            </motion.div>

            {/* Key Facts Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
            >
              {keyFacts.map((fact, index) => (
                <div
                  key={fact.label}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                    <fact.icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <p className="font-mono text-xl font-bold text-white">{fact.value}</p>
                    <p className="text-white/40 text-xs">{fact.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Chairman Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Photo */}
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent rounded-2xl blur-2xl" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={chairman.image}
                    alt={`${chairman.name} - ${chairman.role}`}
                    fill
                    className="object-cover object-[75%_20%]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                </div>
                <div className="absolute -right-3 -bottom-3 px-4 py-2 rounded-xl bg-gold-500 text-navy-900">
                  <p className="font-mono text-xs font-semibold">2021</p>
                  <p className="text-[10px] opacity-70">yildan beri</p>
                </div>
              </div>

              {/* Quote */}
              <div>
                <Quote className="w-10 h-10 text-gold-500/40 mb-4" />
                <blockquote className="text-xl lg:text-2xl font-heading text-white leading-relaxed mb-6">
                  {chairman.quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-px bg-gold-500" />
                  <div>
                    <p className="font-heading font-semibold text-white">{chairman.name}</p>
                    <p className="text-white/40 text-sm">{chairman.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === PILLARS + MISSION COMBINED === */}
        <section className="relative py-16 lg:py-20">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left: Mission */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                    Missiyamiz
                  </span>
                  <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                    Tadbirkorlar uchun{' '}
                    <span className="text-gradient-gold font-display">ishonchli hamkor</span>
                  </h2>
                  <p className="text-white/50 mb-6 leading-relaxed">
                    Biz barcha hajmdagi biznesga yordam berish va O'zbekistonda iqtisodiy
                    o'sishni oldinga surishga sodiqmiz.
                  </p>
                  <div className="space-y-3">
                    {missionPoints.map((point, index) => (
                      <motion.div
                        key={point}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/70 text-sm">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right: Pillars Grid */}
              <div className="lg:col-span-7">
                <div className="grid sm:grid-cols-2 gap-4">
                  {pillars.map((pillar, index) => (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
                        pillar.color === 'gold' && 'bg-gold-500/10',
                        pillar.color === 'turquoise' && 'bg-turquoise-500/10',
                        pillar.color === 'violet' && 'bg-violet-500/10',
                        pillar.color === 'emerald' && 'bg-emerald-500/10',
                      )}>
                        <pillar.icon className={cn(
                          'w-5 h-5',
                          pillar.color === 'gold' && 'text-gold-400',
                          pillar.color === 'turquoise' && 'text-turquoise-400',
                          pillar.color === 'violet' && 'text-violet-400',
                          pillar.color === 'emerald' && 'text-emerald-400',
                        )} />
                      </div>
                      <h3 className="font-heading font-semibold text-white mb-1 group-hover:text-gold-400 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-white/30 text-xs mb-2">{pillar.subtitle}</p>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === TEAM SECTION === */}
        <section id="leadership" className="relative py-16 lg:py-20">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/[0.02] to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                Rahbariyat
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-4">
                Bizning{' '}
                <span className="text-gradient-gold font-display">Jamoamiz</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Professional va tajribali mutaxassislar jamoasi O'zbekiston biznes muhitini
                rivojlantirish uchun xizmat qiladi.
              </p>
            </motion.div>

            {/* Featured Team Members (Leadership) */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {teamMembers.filter(m => m.featured).map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-gold-500/30 transition-all duration-500">
                    {/* Photo */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-heading text-lg font-semibold text-white mb-1 group-hover:text-gold-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-gold-400/80 text-sm font-medium mb-1">
                        {member.role}
                      </p>
                      <p className="text-white/40 text-xs">
                        {member.roleEn}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Other Team Members */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamMembers.filter(m => !m.featured).map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative rounded-xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
                    {/* Photo */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-white text-sm mb-0.5 group-hover:text-gold-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-white/50 text-xs line-clamp-2">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === HORIZONTAL TIMELINE === */}
        <section className="relative py-16 lg:py-20">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-800/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                Tarix
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                Rivojlanish <span className="text-gradient-gold font-display">yo'li</span>
              </h2>
            </motion.div>

            {/* Horizontal Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent hidden sm:block" />

              {/* Timeline Items */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative text-center"
                  >
                    {/* Dot */}
                    <div className="hidden sm:flex items-center justify-center mb-6">
                      <div className="w-4 h-4 rounded-full bg-navy-900 border-2 border-gold-500 relative z-10">
                        <div className="absolute inset-1 rounded-full bg-gold-500" />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-gold-500/30 transition-all group">
                      <span className="font-mono text-2xl sm:text-3xl font-bold text-gold-400 block mb-2 group-hover:scale-110 transition-transform">
                        {milestone.year}
                      </span>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                        {milestone.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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
                Bizga <span className="text-gradient-gold font-display">qo'shiling</span>
              </h2>
              <p className="text-white/50 mb-8">
                O'zbekiston Iqtisodiyot Assambleyasi a'zosi bo'ling va 35+ assotsiatsiya,
                30+ tadbirkor hamjamiyatiga kirish imkoniyatiga ega bo'ling.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/membership" className="btn-primary">
                  <span>A'zo bo'lish</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Bog'lanish
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
