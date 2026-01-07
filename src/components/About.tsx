'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Handshake, Building2, Globe2, TrendingUp } from 'lucide-react'

const functions = [
  {
    icon: Handshake,
    title: 'Davlat Munosabatlari',
    description: 'Xususiy sektor va davlat organlari o\'rtasida ko\'prik: Prezident Administratsiyasi, Vazirlar Mahkamasi va Senat bilan to\'g\'ridan-to\'g\'ri aloqa.',
  },
  {
    icon: TrendingUp,
    title: 'Investitsiya Boshqaruvi',
    description: 'Smart City, infratuzilma va sanoat rivojlanishi bo\'yicha $20 mlrd+ hajmdagi yirik loyihalarni jalb qilish va boshqarish.',
  },
  {
    icon: Globe2,
    title: 'Xalqaro Diplomatiya',
    description: 'Tokio, Orlando va Ankaradagi ofislar orqali O\'zbekiston iqtisodiy manfaatlarini jahon miqyosida ifodalash.',
  },
  {
    icon: Building2,
    title: 'Tarmoqlararo Integratsiya',
    description: 'Ishlab chiqarish, tadbirkorlik va xizmatlar sohalaridagi 46 ta tarmoq uyushmasini muvofiqlashtirish.',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-navy-900" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent" />
      <div className="absolute inset-0 pattern-uzbek" />

      <div ref={ref} className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-gold-500 text-sm font-medium uppercase tracking-wider mb-4"
            >
              Biz Haqimizda
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-display text-white mb-6 heading-decoration"
            >
              G'oya va Voqelik O'rtasida Ko'prik
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/70 leading-relaxed mb-8"
            >
              O'zbekiston Respublikasi Iqtisodiyot Assambleyasi — davlat va xususiy sektor
              hamkorligining asosiy tashkiloti. Biz iqtisodiyotning barcha tarmoqlarida
              faoliyat yurituvchi minglab korxonalarni birlashtirgan 46 ta tarmoq uyushmasini
              muvofiqlashtramiz.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-white/70 leading-relaxed mb-8"
            >
              Bizning vazifamiz — xususiy sektorni davlat institutlari bilan bog'lash,
              xalqaro investitsiyalarni jalb qilish va kelajak iqtisodiyoti uchun inson
              kapitalini rivojlantirish orqali barqaror iqtisodiy o'sishni ta'minlash.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#services" className="btn-primary">
                Xizmatlarimiz
              </a>
              <a href="#leadership" className="btn-secondary">
                Rahbariyat
              </a>
            </motion.div>
          </div>

          {/* Right Column - Impact Metrics Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-500/10 blur-3xl rounded-full" />

            {/* Impact Cards Grid */}
            <div className="relative grid grid-cols-2 gap-4">
              {/* Main Impact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="col-span-2 p-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-500/5 border border-gold-500/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Iqtisodiy Ta'sir</p>
                    <p className="text-gold-500 font-serif text-4xl font-light">$20B+</p>
                    <p className="text-white/60 text-sm mt-1">Investitsiya Loyihalari</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-gold-500" />
                  </div>
                </div>
              </motion.div>

              {/* Associations Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-3">
                  <Building2 className="w-5 h-5 text-gold-500" />
                </div>
                <p className="text-gold-500 font-serif text-3xl font-light">46</p>
                <p className="text-white/50 text-xs uppercase tracking-wider mt-1">Assotsiatsiyalar</p>
              </motion.div>

              {/* Global Offices Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="w-10 h-10 rounded-xl bg-turquoise-500/10 flex items-center justify-center mb-3">
                  <Globe2 className="w-5 h-5 text-turquoise-400" />
                </div>
                <p className="text-turquoise-400 font-serif text-3xl font-light">3</p>
                <p className="text-white/50 text-xs uppercase tracking-wider mt-1">Xalqaro Ofislar</p>
              </motion.div>

              {/* Members Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="w-10 h-10 rounded-xl bg-terracotta-500/10 flex items-center justify-center mb-3">
                  <Handshake className="w-5 h-5 text-terracotta-400" />
                </div>
                <p className="text-terracotta-400 font-serif text-3xl font-light">12K+</p>
                <p className="text-white/50 text-xs uppercase tracking-wider mt-1">A'zo Kompaniyalar</p>
              </motion.div>

              {/* Government Partners Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
                  </svg>
                </div>
                <p className="text-gold-500 font-serif text-3xl font-light">15+</p>
                <p className="text-white/50 text-xs uppercase tracking-wider mt-1">Davlat Hamkorlari</p>
              </motion.div>

              {/* Locations Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="col-span-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Xalqaro Ishtirok</p>
                <div className="flex items-center justify-between">
                  {['Toshkent', 'Tokio', 'Orlando', 'Ankara'].map((city) => (
                    <div key={city} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                      <span className="text-white/70 text-sm">{city}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Function Cards */}
        <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {functions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="group glass rounded-2xl p-6 card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                <item.icon className="w-7 h-7 text-gold-500" />
              </div>
              <h3 className="font-serif text-xl text-white mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
