'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const featuredArticle = {
  id: 1,
  title: 'Smart City Loyihasi $5 mlrd Yangi Investitsiya Majburiyatlarini Jalb Qildi',
  excerpt: 'Xalqaro konsorsium Markaziy Osiyodagi eng yirik shahar qurilish loyihasi uchun muhim moliyalashtirish bosqichini e\'lon qildi — bu O\'zbekiston iqtisodiy modernizatsiyasida muhim qadam.',
  category: 'Investitsiya',
  date: '2026-yil 2-yanvar',
  readTime: '5 daqiqa',
  featured: true,
}

const articles = [
  {
    id: 2,
    title: 'Assambleya 2026-yilgi Markaziy Osiyo Iqtisodiy Forumiga Mezbonlik Qilmoqda',
    excerpt: '15 davlat rahbarlari mintaqaviy iqtisodiy integratsiya bo\'yicha uch kunlik sammit uchun Toshkentda yig\'ildi.',
    category: 'Tadbirlar',
    date: '2025-yil 28-dekabr',
    readTime: '3 daqiqa',
  },
  {
    id: 3,
    title: 'Yangi Savdo Bitimi Yevropa Bozorlarini Ochadi',
    excerpt: 'O\'zbekiston YI bilan keng qamrovli savdo sheriklarini imzoladi, asosiy eksport sektorlarida tariflarni kamaytirdi.',
    category: 'Savdo',
    date: '2025-yil 20-dekabr',
    readTime: '4 daqiqa',
  },
  {
    id: 4,
    title: 'To\'qimachilik Assotsiatsiyasi Rekord Eksport O\'sishini Qayd Etdi',
    excerpt: 'A\'zo assotsiatsiya to\'qimachilik va kiyim-kechak eksportida yildan-yilga 40% o\'sishni nishonlamoqda.',
    category: 'Sanoat',
    date: '2025-yil 15-dekabr',
    readTime: '3 daqiqa',
  },
  {
    id: 5,
    title: 'Milliy Malaka Rivojlantirish Tashabbusi Ishga Tushirildi',
    excerpt: 'Assambleya Ta\'lim vazirligi bilan keng qamrovli kadrlar tayyorlash dasturi bo\'yicha hamkorlik qilmoqda.',
    category: 'Ta\'lim',
    date: '2025-yil 10-dekabr',
    readTime: '4 daqiqa',
  },
]

const categories = ['Barchasi', 'Investitsiya', 'Savdo', 'Tadbirlar', 'Sanoat', 'Ta\'lim']

export default function News() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="news" className="section-padding relative bg-navy-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 pattern-registan" />
      </div>

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-gold-500 text-sm font-medium uppercase tracking-wider mb-4"
            >
              Yangiliklar
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-display text-white heading-decoration"
            >
              So'nggi Yangilanishlar
            </motion.h2>
          </div>

          <motion.a
            href="#"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-gold-500 font-medium hover:gap-3 transition-all"
          >
            Barcha Maqolalar
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                index === 0
                  ? 'bg-gold-500 text-navy-900'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:row-span-2 group"
          >
            <div className="h-full glass rounded-2xl overflow-hidden card-hover">
              {/* Image placeholder */}
              <div className="aspect-[16/10] bg-gradient-to-br from-navy-700 via-navy-800 to-navy-700 relative overflow-hidden">
                <div className="absolute inset-0 pattern-uzbek opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-turquoise-500/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-turquoise-500/30" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-turquoise-500 text-white text-xs font-medium">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 text-white/50 text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredArticle.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-heading-lg text-white mb-4 group-hover:text-gold-500 transition-colors">
                  {featuredArticle.title}
                </h3>

                <p className="text-white/60 leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-gold-500 font-medium hover:gap-3 transition-all"
                >
                  Batafsil O'qish
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.article>

          {/* Other Articles */}
          <div className="space-y-6">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="group glass rounded-xl p-6 card-hover"
              >
                <div className="flex gap-6">
                  {/* Thumbnail placeholder */}
                  <div className="hidden sm:block w-24 h-24 rounded-lg bg-gradient-to-br from-navy-700 to-navy-800 flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full pattern-uzbek opacity-50" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-0.5 rounded bg-gold-500/10 text-gold-500 text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="text-white/40 text-xs">{article.date}</span>
                    </div>

                    <h4 className="font-medium text-white mb-2 group-hover:text-gold-500 transition-colors line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="text-white/50 text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 glass rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="font-serif text-heading-lg text-white mb-4">
            Xabardor Bo'ling
          </h3>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Iqtisodiy rivojlanish, investitsiya imkoniyatlari va Assambleya
            tashabbuslaridagi so'nggi yangiliklar uchun obuna bo'ling.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email manzilingizni kiriting"
              className="flex-1 px-6 py-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500 transition-colors"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Obuna Bo'lish
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
