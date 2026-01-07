'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Globe2,
  MessageSquare,
  Users,
  Briefcase,
  HelpCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
  Navigation
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/sections/Footer'
import { cn } from '@/lib/utils'

// Official contact information from assembly.uz
const contactInfo = {
  address: {
    full: "100066, 1/1, Furqat ko'chasi, Toshkent shahri, O'zbekiston",
    street: "Furqat ko'chasi 1/1",
    city: "Toshkent shahri",
    country: "O'zbekiston",
    postal: "100066",
  },
  phone: {
    main: "+998 91 774 14 16",
    formatted: "+998 (91) 774-14-16",
  },
  email: {
    main: "info@uzassembly.uz",
    membership: "membership@uzassembly.uz",
    press: "press@uzassembly.uz",
  },
  hours: {
    weekdays: "Dushanba - Shanba",
    time: "09:00 - 18:00",
    full: "Du-Sha: 09:00 - 18:00",
  },
  social: {
    telegram: "https://t.me/uzassembly",
    instagram: "https://instagram.com/assemblyuz",
    facebook: "https://facebook.com/uzeconomyassembly",
    youtube: "https://youtube.com/@assemblyuz",
    linkedin: "https://linkedin.com/company/uzassembly",
  },
  map: {
    lat: 41.311081,
    lng: 69.279737,
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.8!2d69.279737!3d41.311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzM5LjkiTiA2OcKwMTYnNDcuMSJF!5e0!3m2!1sen!2s!4v1704067200000!5m2!1sen!2s",
  }
}

// Social links with icons
const socialLinks = [
  { name: 'Telegram', icon: Send, href: contactInfo.social.telegram, color: 'hover:bg-[#0088cc]/20 hover:text-[#0088cc]' },
  { name: 'Instagram', icon: Instagram, href: contactInfo.social.instagram, color: 'hover:bg-[#E4405F]/20 hover:text-[#E4405F]' },
  { name: 'Facebook', icon: Facebook, href: contactInfo.social.facebook, color: 'hover:bg-[#1877F2]/20 hover:text-[#1877F2]' },
  { name: 'YouTube', icon: Youtube, href: contactInfo.social.youtube, color: 'hover:bg-[#FF0000]/20 hover:text-[#FF0000]' },
  { name: 'LinkedIn', icon: Linkedin, href: contactInfo.social.linkedin, color: 'hover:bg-[#0A66C2]/20 hover:text-[#0A66C2]' },
]

// Contact reasons/departments
const contactReasons = [
  {
    id: 'membership',
    title: "A'zolik",
    description: "A'zo bo'lish yoki a'zolik haqida ma'lumot",
    icon: Users,
    email: contactInfo.email.membership,
  },
  {
    id: 'business',
    title: 'Biznes Hamkorlik',
    description: "Hamkorlik va investitsiya takliflari",
    icon: Briefcase,
    email: contactInfo.email.main,
  },
  {
    id: 'press',
    title: 'Matbuot',
    description: "OAV va media so'rovlari",
    icon: MessageSquare,
    email: contactInfo.email.press,
  },
  {
    id: 'general',
    title: 'Umumiy Savol',
    description: "Boshqa barcha savollar",
    icon: HelpCircle,
    email: contactInfo.email.main,
  },
]

// FAQ items
const faqItems = [
  {
    question: "Assambleyaga qanday a'zo bo'lish mumkin?",
    answer: "A'zo bo'lish uchun onlayn ariza to'ldiring yoki ofisimizga tashrif buyuring. A'zolik arizasi ko'rib chiqilgandan so'ng siz bilan bog'lanamiz.",
  },
  {
    question: "A'zolik to'lovi qancha?",
    answer: "A'zolik to'lovi kompaniya hajmi va tanlangan tarifga qarab farqlanadi. Batafsil ma'lumot uchun a'zolik bo'limiga murojaat qiling.",
  },
  {
    question: "Qanday xizmatlar taqdim etiladi?",
    answer: "Biz GR (Government Relations), investitsiya jalb qilish, kadrlar tayyorlash, xalqaro hamkorlik va boshqa ko'plab xizmatlarni taqdim etamiz.",
  },
  {
    question: "Ofis ish vaqti qanday?",
    answer: `Ofisimiz ${contactInfo.hours.weekdays} kunlari ${contactInfo.hours.time} da ishlaydi. Dam olish kunlari - Yakshanba.`,
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    reason: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const orbY1 = useTransform(smoothProgress, [0, 1], [0, -200])
  const orbY2 = useTransform(smoothProgress, [0, 1], [0, -300])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
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
                <MessageSquare className="w-4 h-4" />
                Biz Bilan Bog'laning
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
                Aloqa{' '}
                <span className="text-gradient-gold font-display">Ma'lumotlari</span>
              </h1>

              <p className="text-lg lg:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
                Savollaringiz bormi? Biz bilan bog'laning — jamoamiz sizga yordam berishga tayyor.
              </p>
            </motion.div>
          </div>
        </section>

        {/* === CONTACT INFO CARDS === */}
        <section className="relative py-8 lg:py-12">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Manzil</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {contactInfo.address.street}<br />
                  {contactInfo.address.city}<br />
                  {contactInfo.address.postal}
                </p>
                <a
                  href={`https://maps.google.com/?q=${contactInfo.address.full}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-gold-400 text-sm font-medium hover:text-gold-300 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Xaritada ko'rish
                </a>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-turquoise-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-turquoise-500/10 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-turquoise-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Telefon</h3>
                <a
                  href={`tel:${contactInfo.phone.main.replace(/\s/g, '')}`}
                  className="text-white/50 text-sm hover:text-turquoise-400 transition-colors block"
                >
                  {contactInfo.phone.formatted}
                </a>
                <p className="text-white/30 text-xs mt-2">
                  {contactInfo.hours.full}
                </p>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Email</h3>
                <a
                  href={`mailto:${contactInfo.email.main}`}
                  className="text-white/50 text-sm hover:text-emerald-400 transition-colors block"
                >
                  {contactInfo.email.main}
                </a>
                <p className="text-white/30 text-xs mt-2">
                  24 soat ichida javob
                </p>
              </motion.div>

              {/* Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Ish Vaqti</h3>
                <p className="text-white/50 text-sm">
                  {contactInfo.hours.weekdays}
                </p>
                <p className="text-white font-medium">
                  {contactInfo.hours.time}
                </p>
                <p className="text-white/30 text-xs mt-2">
                  Yakshanba - dam olish
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* === MAIN CONTENT: FORM + MAP === */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-2 block">
                    Aloqa Formasi
                  </span>
                  <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                    Xabar{' '}
                    <span className="text-gradient-gold font-display">Yuboring</span>
                  </h2>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-white text-xl mb-2">Xabaringiz yuborildi!</h3>
                    <p className="text-white/50 mb-6">
                      Tez orada siz bilan bog'lanamiz. Odatda 24 soat ichida javob beramiz.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false)
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          reason: 'general',
                          message: '',
                        })
                      }}
                      className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                    >
                      Yangi xabar yuborish
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Contact Reason */}
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Murojaat turi</label>
                      <div className="grid grid-cols-2 gap-3">
                        {contactReasons.map((reason) => {
                          const IconComponent = reason.icon
                          return (
                            <button
                              key={reason.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, reason: reason.id }))}
                              className={cn(
                                'p-3 rounded-xl border text-left transition-all',
                                formData.reason === reason.id
                                  ? 'bg-gold-500/10 border-gold-500/30'
                                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                              )}
                            >
                              <IconComponent className={cn(
                                'w-5 h-5 mb-1',
                                formData.reason === reason.id ? 'text-gold-400' : 'text-white/40'
                              )} />
                              <p className={cn(
                                'font-medium text-sm',
                                formData.reason === reason.id ? 'text-white' : 'text-white/70'
                              )}>
                                {reason.title}
                              </p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Ism-familiya *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="To'liq ismingiz"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="email@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone & Company */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Telefon</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+998 90 123 45 67"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Kompaniya</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Kompaniya nomi"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Xabar *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Xabaringizni yozing..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'w-full btn-primary justify-center',
                        isSubmitting && 'opacity-70 cursor-not-allowed'
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Yuborilmoqda...</span>
                        </>
                      ) : (
                        <>
                          <span>Xabar Yuborish</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-white/30 text-xs text-center">
                      Yuborish orqali maxfiylik siyosatimizga rozilik bildirasiz
                    </p>
                  </form>
                )}
              </motion.div>

              {/* Map & Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Map */}
                <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
                  <div className="w-full h-full bg-navy-800 relative">
                    {/* Map Placeholder with Pattern */}
                    <div className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/20 flex items-center justify-center mb-4">
                          <MapPin className="w-8 h-8 text-gold-400" />
                        </div>
                        <h3 className="font-semibold text-white mb-2">Toshkent, O'zbekiston</h3>
                        <p className="text-white/50 text-sm mb-4">{contactInfo.address.street}</p>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address.full)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 text-navy-900 rounded-full text-sm font-medium hover:bg-gold-400 transition-colors"
                        >
                          <Navigation className="w-4 h-4" />
                          Google Maps da ochish
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h3 className="font-semibold text-white mb-4">Ijtimoiy Tarmoqlar</h3>
                  <p className="text-white/50 text-sm mb-4">
                    Bizni ijtimoiy tarmoqlarda kuzatib boring va so'nggi yangiliklerdan xabardor bo'ling.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'flex items-center gap-2 px-4 py-2.5 rounded-xl',
                            'bg-white/5 text-white/60 border border-white/10',
                            'transition-all duration-300',
                            social.color
                          )}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="text-sm font-medium">{social.name}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-500/10 via-navy-800/50 to-navy-900 border border-gold-500/20">
                  <h3 className="font-semibold text-white mb-3">Tezkor Aloqa</h3>
                  <p className="text-white/50 text-sm mb-4">
                    Telegram orqali tezkor javob oling yoki telefon qiling.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={contactInfo.social.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0088cc] text-white rounded-xl font-medium hover:bg-[#0088cc]/90 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                      Telegram
                    </a>
                    <a
                      href={`tel:${contactInfo.phone.main.replace(/\s/g, '')}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Qo'ng'iroq
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* === FAQ SECTION === */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-2 block">
                Ko'p So'raladigan Savollar
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
                <span className="text-gradient-gold font-display">FAQ</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className={cn(
                      'w-full p-5 rounded-xl text-left transition-all',
                      'bg-white/[0.02] border',
                      openFaq === index ? 'border-gold-500/30' : 'border-white/5 hover:border-white/10'
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className={cn(
                        'font-medium',
                        openFaq === index ? 'text-gold-400' : 'text-white'
                      )}>
                        {faq.question}
                      </h3>
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all',
                        openFaq === index ? 'bg-gold-500/20 rotate-45' : 'bg-white/5'
                      )}>
                        <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>
                    {openFaq === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-white/50 text-sm mt-3 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
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
                Assambleyaga{' '}
                <span className="text-gradient-gold font-display">qo'shiling</span>
              </h2>
              <p className="text-white/50 mb-8">
                46+ sanoat assotsiatsiyasi bilan birga biznesingizni rivojlantiring
                va yangi imkoniyatlardan foydalaning.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/membership" className="btn-primary">
                  <span>A'zo bo'lish</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/about" className="btn-secondary">
                  Batafsil
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
