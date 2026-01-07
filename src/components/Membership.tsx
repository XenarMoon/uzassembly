'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Shield,
  Users,
  TrendingUp,
  Globe2,
  FileCheck,
  Handshake,
  ArrowRight,
  Check,
  Star
} from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Manfaatlarni Himoya',
    description: 'Davlat idoralarida biznesingiz manfaatlarini himoya qilish',
  },
  {
    icon: FileCheck,
    title: 'Litsenziya va Ruxsatlar',
    description: 'Barcha turdagi litsenziya va ruxsatnomalarni olishda yordam',
  },
  {
    icon: TrendingUp,
    title: 'Investitsiya Imkoniyatlari',
    description: 'Xalqaro investorlar bilan bog\'lanish platformasi',
  },
  {
    icon: Globe2,
    title: 'Xalqaro Aloqalar',
    description: 'Xorijiy bozorlar va hamkorliklarga kirish',
  },
  {
    icon: Users,
    title: 'Networking',
    description: '46 ta assotsiatsiya va 12,000+ a\'zo kompaniyalar tarmog\'i',
  },
  {
    icon: Handshake,
    title: 'GR Xizmatlari',
    description: 'Davlat bilan munosabatlarda professional yordam',
  },
]

const membershipTiers = [
  {
    name: 'Standart',
    price: 'Bepul',
    description: 'Yangi tadbirkorlar uchun',
    features: [
      'Axborot byulletenlari',
      'Tadbirlar haqida xabar',
      'Biznes yangiliklar',
      'Onlayn resurslar',
    ],
    highlighted: false,
  },
  {
    name: 'Premium',
    price: 'So\'rov bo\'yicha',
    description: 'Faol tadbirkorlar uchun',
    features: [
      'Standart imkoniyatlari',
      'GR xizmatlari',
      'Investor matching',
      'B2B uchrashuvlar',
      'Eksport qo\'llab-quvvatlash',
      'Maxsus tadbirlar',
    ],
    highlighted: true,
  },
  {
    name: 'Korporativ',
    price: 'Kelishuv bo\'yicha',
    description: 'Yirik kompaniyalar uchun',
    features: [
      'Premium imkoniyatlari',
      'Shaxsiy menejer',
      'Strategik maslahatlar',
      'Davlat loyihalariga kirish',
      'VIP networking',
      'Boshqaruv kengashiga kirish',
    ],
    highlighted: false,
  },
]

export default function Membership() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="membership" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-section" />
      <div className="absolute inset-0 pattern-registan" />

      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-turquoise-500/10 rounded-full blur-3xl" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-gold-500 text-sm font-medium uppercase tracking-wider mb-4"
          >
            A'zolik
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-display text-white mb-6"
          >
            <span className="text-gradient">12,000+</span> Kompaniyalar Bilan Birga
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70"
          >
            O'zbekiston Iqtisodiyot Assambleyasiga a'zo bo'ling va biznesingizni
            yangi bosqichga olib chiqing.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="glass rounded-2xl p-6 group card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-gold-500" />
              </div>
              <h4 className="font-serif text-xl text-white mb-2">{benefit.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Membership Tiers */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                tier.highlighted
                  ? 'bg-gradient-to-b from-gold-500/20 to-gold-500/5 border-2 border-gold-500/30 scale-105'
                  : 'glass hover:bg-white/[0.04]'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold-500 text-navy-900 text-xs font-semibold uppercase tracking-wider">
                    <Star className="w-3 h-3" />
                    Tavsiya etiladi
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`font-serif text-2xl mb-2 ${tier.highlighted ? 'text-gold-500' : 'text-white'}`}>
                  {tier.name}
                </h3>
                <div className="text-3xl font-serif text-white mb-2">{tier.price}</div>
                <p className="text-white/50 text-sm">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-gold-500' : 'text-turquoise-400'}`} />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm transition-all ${
                  tier.highlighted
                    ? 'bg-gold-500 text-navy-900 hover:bg-gold-400'
                    : 'border border-white/20 text-white hover:bg-white/5 hover:border-white/40'
                }`}
              >
                Ariza Topshirish
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-white/50 text-sm mb-4">
            Savollaringiz bormi? Biz bilan bog'laning
          </p>
          <a href="tel:+998712000000" className="text-gold-500 text-lg font-medium hover:text-gold-400 transition-colors">
            +998 71 200 00 00
          </a>
        </motion.div>
      </div>
    </section>
  )
}
