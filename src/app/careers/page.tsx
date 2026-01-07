'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Briefcase,
  Users,
  TrendingUp,
  Globe2,
  Heart,
  Coffee,
  GraduationCap,
  ArrowRight,
  Send,
  Bell,
  Building2
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'
import { cn } from '@/lib/utils'

const benefits = [
  {
    icon: TrendingUp,
    title: "Karera O'sishi",
    description: "Professional rivojlanish va martaba ko'tarish imkoniyatlari",
    color: "text-gold-400",
    bgColor: "bg-gold-500/10",
    borderColor: "border-gold-500/20",
  },
  {
    icon: GraduationCap,
    title: "Ta'lim & Treninglar",
    description: "Doimiy o'qish va malaka oshirish dasturlari",
    color: "text-turquoise-400",
    bgColor: "bg-turquoise-500/10",
    borderColor: "border-turquoise-500/20",
  },
  {
    icon: Users,
    title: "Professional Jamoa",
    description: "Tajribali mutaxassislar bilan ishlash imkoniyati",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    icon: Globe2,
    title: "Xalqaro Loyihalar",
    description: "Global miqyosdagi loyihalarda ishtirok etish",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    icon: Heart,
    title: "Sog'liq Sug'urtasi",
    description: "To'liq tibbiy sug'urta paketi",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
  },
  {
    icon: Coffee,
    title: "Qulay Muhit",
    description: "Zamonaviy ofis va ijodiy ish muhiti",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
]

const stats = [
  { value: "200+", label: "Xodimlar" },
  { value: "46+", label: "Assotsiatsiyalar" },
  { value: "8", label: "Yo'nalishlar" },
  { value: "3", label: "Xalqaro Ofislar" },
]

export default function CareersPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const isBenefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 })

  return (
    <main className="min-h-screen relative bg-navy-900">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-turquoise-500/5 blur-[100px]" />
        </div>

        <div ref={heroRef} className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="badge-gold mb-6 inline-flex">
              <Briefcase className="w-4 h-4" />
              Karyera
            </span>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6" style={{ letterSpacing: '-0.025em' }}>
              Biz Bilan <span className="text-gradient-gold font-display">Ishlang</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto mb-8">
              O'zbekiston Iqtisodiyot Assambleyasi jamoasiga qo'shiling va
              mamlakatimiz iqtisodiyotini rivojlantirishga hissa qo'shing
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-gold-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* No Vacancies Section */}
      <section className="py-12 sm:py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center border border-white/10">
              {/* Icon */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-navy-800 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-white/30" />
              </div>

              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-4">
                Hozircha Ochiq Vakansiyalar Yo'q
              </h2>

              <p className="text-sm sm:text-base text-white/60 mb-8 max-w-md mx-auto">
                Ayni paytda barcha lavozimlar to'ldirilgan. Yangi imkoniyatlar haqida birinchi bo'lib xabardor bo'lish uchun rezyumeyingizni qoldiring.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href="mailto:hr@uzassembly.uz?subject=Rezyume%20-%20Karyera"
                  className="btn-primary w-full sm:w-auto"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Rezyume Yuborish</span>
                </a>
                <button
                  onClick={() => {
                    alert("Tez orada bu funksiya ishga tushadi. Hozircha hr@uzassembly.uz ga yozing.")
                  }}
                  className="btn-secondary w-full sm:w-auto"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Xabarnoma Olish</span>
                </button>
              </div>

              {/* Email hint */}
              <p className="text-xs sm:text-sm text-white/40 mt-6">
                Rezyumeyingizni <a href="mailto:hr@uzassembly.uz" className="text-gold-400 hover:text-gold-300 transition-colors">hr@uzassembly.uz</a> manziliga yuboring
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-12 sm:py-20 bg-navy-800/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className="badge-gold mb-4 sm:mb-6 inline-flex">
              <Heart className="w-4 h-4" />
              Imtiyozlar
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4" style={{ letterSpacing: '-0.025em' }}>
              Nima Uchun <span className="text-gradient-gold font-display">Biz Bilan?</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/60 max-w-2xl mx-auto">
              Xodimlarimizga taqdim etiladigan imtiyozlar va imkoniyatlar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "glass rounded-xl sm:rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:border-white/20",
                  benefit.borderColor
                )}
              >
                <div className={cn(
                  "w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4",
                  benefit.bgColor
                )}>
                  <benefit.icon className={cn("w-5 h-5 sm:w-7 sm:h-7", benefit.color)} />
                </div>
                <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-12 sm:py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge-gold mb-4 sm:mb-6 inline-flex">
                <Users className="w-4 h-4" />
                Madaniyat
              </span>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 sm:mb-6" style={{ letterSpacing: '-0.025em' }}>
                Bizning <span className="text-gradient-gold font-display">Qadriyatlarimiz</span>
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-400 font-bold text-sm sm:text-base">01</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-1">Innovatsiya</h3>
                    <p className="text-xs sm:text-sm text-white/60">Yangi g'oyalar va yondashuvlarni qo'llab-quvvatlaymiz</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-turquoise-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-turquoise-400 font-bold text-sm sm:text-base">02</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-1">Hamkorlik</h3>
                    <p className="text-xs sm:text-sm text-white/60">Jamoaviy ish va o'zaro hurmat asosida ishlaymiz</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-violet-400 font-bold text-sm sm:text-base">03</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-1">Professionallik</h3>
                    <p className="text-xs sm:text-sm text-white/60">Yuqori standartlar va sifatli ish natijalariga intilamiz</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-400 font-bold text-sm sm:text-base">04</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-1">Rivojlanish</h3>
                    <p className="text-xs sm:text-sm text-white/60">Har bir xodimning shaxsiy va kasbiy o'sishini ta'minlaymiz</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Decorative */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold-500/10 to-turquoise-500/10 border border-white/10" />
                <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 border border-white/5 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <span className="text-navy-900 font-heading font-bold text-2xl sm:text-3xl">IA</span>
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-white mb-2">
                      Iqtisodiyot Assambleyasi
                    </h3>
                    <p className="text-xs sm:text-sm text-white/50">
                      Kelajakni birga quramiz
                    </p>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gold-500/20 border border-gold-500/30"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-turquoise-500/20 border border-turquoise-500/30"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-navy-800/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 sm:mb-6" style={{ letterSpacing: '-0.025em' }}>
              Savollaringiz Bormi?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/60 mb-6 sm:mb-8">
              HR bo'limimiz bilan bog'laning yoki ofisimizga tashrif buyuring
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                <span>Bog'lanish</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <a href="mailto:hr@uzassembly.uz" className="btn-secondary w-full sm:w-auto">
                hr@uzassembly.uz
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
