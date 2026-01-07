'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Bosh Ofis',
    value: 'Mustaqillik Maydoni, Toshkent 100017, O\'zbekiston',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+998 71 238 0000',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@assembly.uz',
  },
  {
    icon: Clock,
    label: 'Ish Vaqti',
    value: 'Dush - Juma: 9:00 - 18:00 (UZT)',
  },
]

const inquiryTypes = [
  'Umumiy So\'rov',
  'Investitsiya Imkoniyati',
  'Hamkorlik Taklifi',
  'Media va Matbuot',
  'A\'zolik Ma\'lumoti',
  'Tadbir Ishtiroki',
]

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    setTimeout(() => {
      setFormStatus('success')
    }, 1500)
  }

  return (
    <section id="contact" className="section-padding relative bg-navy-900">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 pattern-registan" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-navy-950 to-transparent" />
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
            Bog'lanish
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-display text-white mb-6"
          >
            Kelajakni Birga Yaratamiz
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70"
          >
            Investor, tadbirkor yoki davlat xodimi bo'lasizmi — O'zbekiston iqtisodiy
            imkoniyatlari bilan bog'lanishda sizga yordam berishga tayyormiz.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass rounded-2xl p-8 md:p-10">
              {formStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-turquoise-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-turquoise-400" />
                  </div>
                  <h3 className="font-serif text-heading text-white mb-4">
                    Xabar Muvaffaqiyatli Yuborildi
                  </h3>
                  <p className="text-white/60 mb-6">
                    Murojaat uchun rahmat. Jamoamiz 24-48 soat ichida javob beradi.
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="text-gold-500 font-medium hover:underline"
                  >
                    Yangi Xabar Yuborish
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Ism *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="Ismingiz"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Familiya *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="Familiyangiz"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="email@kompaniya.uz"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Tashkilot</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="Kompaniya yoki Tashkilot nomi"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">So'rov Turi *</label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-navy-800">So'rov turini tanlang</option>
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type} className="bg-navy-800">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Xabar *</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      placeholder="So'rovingiz haqida yozing..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Yuborilmoqda...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Xabar Yuborish
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div className="glass rounded-2xl p-8">
              <h3 className="font-serif text-heading text-white mb-6">Aloqa Ma'lumotlari</h3>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-white/50 text-sm">{item.label}</p>
                      <p className="text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass rounded-2xl p-4 overflow-hidden">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-navy-700 to-navy-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-gold-500" />
                    </div>
                    <p className="text-white/60 text-sm">Toshkent, O'zbekiston</p>
                    <p className="text-white/40 text-xs mt-1">Mustaqillik Maydoni</p>
                  </div>
                </div>
                <div className="absolute inset-0 pattern-uzbek opacity-30" />
              </div>
            </div>

            {/* Quick links */}
            <div className="glass rounded-2xl p-6">
              <h4 className="text-white/50 text-sm uppercase tracking-wider mb-4">Tezkor Havolalar</h4>
              <div className="flex flex-wrap gap-3">
                {['Investitsiya Broshura', 'Media Kit', 'Yillik Hisobot', 'TSS'].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="px-4 py-2 rounded-lg bg-white/5 text-white/70 text-sm hover:bg-gold-500/10 hover:text-gold-500 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
