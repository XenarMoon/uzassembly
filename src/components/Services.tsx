'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  FileCheck,
  TrendingUp,
  GraduationCap,
  Video,
  Building2,
  Wallet,
  Handshake,
  Building,
  ArrowRight,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  {
    id: 'biznes-darcha',
    icon: FileCheck,
    title: 'Biznes Darcha',
    titleEn: 'Business Gateway',
    subtitle: 'Litsenziyalar va ruxsatnomalar',
    description: 'Tadbirkorlik faoliyatini boshlash va rivojlantirish uchun barcha kerakli litsenziyalar, ruxsatnomalar va tashqi savdo xizmatlari.',
    features: [
      'Litsenziyalar rasmiylashtirish',
      'Ruxsatnomalar olish',
      'Tashqi savdo bo\'yicha maslahat',
      'Guvohnomalar va sertifikatlar',
      'Bojxona rasmiylashtiruvi',
    ],
    color: 'gold',
    stats: { value: '500+', label: 'Korxonalarga yordam' },
  },
  {
    id: 'invest-hub',
    icon: TrendingUp,
    title: 'Invest Hub',
    titleEn: 'Investment Hub',
    subtitle: 'Investitsiya loyihalari platformasi',
    description: 'Mahalliy va xalqaro investorlarni ulash, loyihalarni ekspertiza qilish va moliyalashtirish bo\'yicha to\'liq qo\'llab-quvvatlash.',
    features: [
      'Investitsiya loyihalarini taqdim etish',
      'Due Diligence xizmatlari',
      'Investor matching platformasi',
      'Moliyaviy modellashtirish',
      'Shartnoma tuzishda yordam',
    ],
    color: 'turquoise',
    stats: { value: '$20B+', label: 'Investitsiya loyihalari' },
  },
  {
    id: 'edu-job',
    icon: GraduationCap,
    title: 'Edu Job',
    titleEn: 'Education & Employment',
    subtitle: 'Ta\'lim va bandlik',
    description: 'Malakali kadrlar tayyorlash, ta\'lim dasturlari va ish o\'rinlarini yaratish orqali inson kapitalini rivojlantirish.',
    features: [
      'Professional ta\'lim dasturlari',
      'Ish o\'rinlarini yaratish',
      'Kadrlar tayyorlash',
      'Universitetlar bilan hamkorlik',
      'Sertifikatsiya dasturlari',
    ],
    color: 'terracotta',
    stats: { value: '50K+', label: 'Mutaxassislar tayyorlandi' },
  },
  {
    id: 'reportaj-go',
    icon: Video,
    title: 'Reportaj GO',
    titleEn: 'Media & Analytics',
    subtitle: 'Media va KPI monitoring',
    description: 'Biznes yangiliklari, iqtisodiy tahlillar va kompaniyalar faoliyatini monitoring qilish platformasi.',
    features: [
      'Biznes yangiliklar portali',
      'KPI monitoring tizimi',
      'Media coverage tahlili',
      'Iqtisodiy tadqiqotlar',
      'Soha bo\'yicha reportajlar',
    ],
    color: 'gold',
    stats: { value: '1M+', label: 'Oylik o\'quvchilar' },
  },
  {
    id: 'gr',
    icon: Building2,
    title: 'GR',
    titleEn: 'Government Relations',
    subtitle: 'Davlat munosabatlari',
    description: 'Tadbirkorlar manfaatlarini davlat idoralarida himoya qilish va qonunchilik jarayonlarida ishtirok etish.',
    features: [
      'Qonunchilik lobbisi',
      'Vazirliklar bilan aloqa',
      'Davlat-xususiy sheriklik',
      'Regulyatorlar bilan muloqot',
      'Siyosiy tavakkalchilik tahlili',
    ],
    color: 'turquoise',
    stats: { value: '15+', label: 'Davlat hamkorlari' },
  },
  {
    id: 'fr',
    icon: Wallet,
    title: 'FR',
    titleEn: 'Financial Relations',
    subtitle: 'Moliyaviy munosabatlar',
    description: 'Bank va moliya institutlari bilan hamkorlik, kredit olish va moliyaviy instrumentlardan foydalanishda yordam.',
    features: [
      'Kredit olishda ko\'maklashish',
      'Bank munosabatlari',
      'Moliyaviy rejalashtirish',
      'Grant va subsidiyalar',
      'Xalqaro moliya institutlari',
    ],
    color: 'terracotta',
    stats: { value: '$500M+', label: 'Jalb qilingan mablag\'' },
  },
  {
    id: 'br',
    icon: Handshake,
    title: 'BR',
    titleEn: 'Business Relations',
    subtitle: 'Biznes aloqalar',
    description: 'Mahalliy va xalqaro biznes hamkorliklarni shakllantirish, B2B uchrashuvlar va savdo missiyalarini tashkil etish.',
    features: [
      'B2B matchmaking',
      'Savdo missiyalari',
      'Biznes forumlar',
      'Eksport qo\'llab-quvvatlash',
      'Xalqaro hamkorliklar',
    ],
    color: 'gold',
    stats: { value: '46', label: 'Assotsiatsiyalar' },
  },
  {
    id: 'smart-city',
    icon: Building,
    title: 'Smart City',
    titleEn: 'Smart City Project',
    subtitle: '6,400 gektar aqlli shahar',
    description: 'O\'zbekistonning eng yirik smart city loyihasi — zamonaviy infratuzilma, raqamli texnologiyalar va barqaror rivojlanish.',
    features: [
      'Raqamli infratuzilma',
      'Yashil texnologiyalar',
      'Aqlli transport tizimi',
      'Innovatsion hub',
      'Zamonaviy turar-joy',
    ],
    color: 'turquoise',
    stats: { value: '6,400', label: 'Gektar maydon' },
    featured: true,
  },
]

const colorMap = {
  gold: {
    bg: 'bg-gold-500/10',
    bgHover: 'bg-gold-500/20',
    text: 'text-gold-500',
    border: 'border-gold-500',
    borderLight: 'border-gold-500/30',
  },
  turquoise: {
    bg: 'bg-turquoise-500/10',
    bgHover: 'bg-turquoise-500/20',
    text: 'text-turquoise-400',
    border: 'border-turquoise-500',
    borderLight: 'border-turquoise-500/30',
  },
  terracotta: {
    bg: 'bg-terracotta-500/10',
    bgHover: 'bg-terracotta-500/20',
    text: 'text-terracotta-400',
    border: 'border-terracotta-500',
    borderLight: 'border-terracotta-500/30',
  },
}

export default function Services() {
  const [activeService, setActiveService] = useState('biznes-darcha')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const currentService = services.find((s) => s.id === activeService)!
  const colors = colorMap[currentService.color as keyof typeof colorMap]

  return (
    <section id="services" className="section-padding relative bg-navy-900">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 pattern-uzbek" />
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gold-500/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-turquoise-500/5 to-transparent" />
      </div>

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-gold-500 text-sm font-medium uppercase tracking-wider mb-4"
          >
            Xizmatlar
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-display text-white mb-6"
          >
            8 ta Yo'nalishda <span className="text-gradient">Professional</span> Xizmatlar
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70"
          >
            Tadbirkorlik faoliyatining barcha bosqichlarida keng qamrovli qo'llab-quvvatlash —
            litsenziyalardan tortib xalqaro investitsiyalargacha.
          </motion.p>
        </div>

        {/* Services Grid - Icon Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {services.map((service, index) => {
            const sColors = colorMap[service.color as keyof typeof colorMap]
            const isActive = activeService === service.id

            return (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                onClick={() => setActiveService(service.id)}
                className={cn(
                  'relative p-6 rounded-2xl transition-all duration-300 text-left group',
                  isActive
                    ? `glass-gold border-2 ${sColors.borderLight}`
                    : 'glass hover:bg-white/[0.04]',
                  service.featured && 'md:col-span-2'
                )}
              >
                {service.featured && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] uppercase tracking-wider bg-turquoise-500/20 text-turquoise-400 rounded-full">
                    Flagship
                  </span>
                )}

                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors',
                  isActive ? sColors.bgHover : sColors.bg
                )}>
                  <service.icon className={cn('w-6 h-6', sColors.text)} />
                </div>

                <h4 className={cn(
                  'font-serif text-xl mb-1 transition-colors',
                  isActive ? sColors.text : 'text-white group-hover:text-gold-500'
                )}>
                  {service.title}
                </h4>
                <p className="text-white/50 text-sm">{service.subtitle}</p>

                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn('absolute bottom-3 right-3 w-2 h-2 rounded-full', sColors.bg.replace('/10', ''))}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Active Service Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left - Info */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center', colors.bg)}>
                    <currentService.icon className={cn('w-8 h-8', colors.text)} />
                  </div>
                  <div>
                    <h3 className="font-serif text-heading-lg text-white">{currentService.title}</h3>
                    <p className="text-white/50">{currentService.titleEn}</p>
                  </div>
                </div>

                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  {currentService.description}
                </p>

                <div className={cn(
                  'inline-flex items-center gap-3 px-5 py-3 rounded-xl',
                  colors.bg
                )}>
                  <span className={cn('font-serif text-3xl', colors.text)}>{currentService.stats.value}</span>
                  <span className="text-white/60 text-sm">{currentService.stats.label}</span>
                </div>
              </div>

              {/* Right - Features */}
              <div>
                <h4 className="text-white/50 text-sm uppercase tracking-wider mb-6">Asosiy Xizmatlar</h4>
                <div className="space-y-3">
                  {currentService.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] group hover:bg-white/[0.04] transition-colors"
                    >
                      <div className={cn('w-2 h-2 rounded-full flex-shrink-0', colors.bg.replace('/10', ''))} />
                      <span className="text-white/80">{feature}</span>
                      <ChevronRight className="w-4 h-4 text-white/20 ml-auto group-hover:text-white/40 transition-colors" />
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <a
                    href="#contact"
                    className="btn-primary"
                  >
                    Murojaat Qilish
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  {currentService.featured && (
                    <a
                      href="#smart-city"
                      className="btn-secondary"
                    >
                      Batafsil
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
