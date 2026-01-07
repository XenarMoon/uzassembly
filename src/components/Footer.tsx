'use client'

import { motion } from 'framer-motion'
import { Facebook, Linkedin, Instagram, Youtube, ArrowUp, Globe, Send } from 'lucide-react'

const footerLinks = {
  about: {
    title: 'Biz Haqimizda',
    links: [
      { name: 'Missiyamiz', href: '#about' },
      { name: 'Rahbariyat', href: '#leadership' },
      { name: 'Tarix', href: '#' },
      { name: 'Hamkorlar', href: '#' },
    ],
  },
  services: {
    title: 'Xizmatlar',
    links: [
      { name: 'Biznes Darcha', href: '#services' },
      { name: 'Invest Hub', href: '#services' },
      { name: 'Edu Job', href: '#services' },
      { name: 'Smart City', href: '#smart-city' },
    ],
  },
  resources: {
    title: 'Resurslar',
    links: [
      { name: 'Yangiliklar', href: '#news' },
      { name: 'Nashrlar', href: '#' },
      { name: 'Tadqiqot Hisobotlari', href: '#' },
      { name: 'Media Kit', href: '#' },
    ],
  },
  associations: {
    title: 'Assotsiatsiyalar',
    links: [
      { name: 'A\'zolar Ro\'yxati', href: '#associations' },
      { name: 'A\'zo Bo\'lish', href: '#membership' },
      { name: 'Sanoat Tarmoqlari', href: '#' },
      { name: 'Tadbirlar Kalendari', href: '#' },
    ],
  },
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Send, href: '#', label: 'Telegram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

const languages = [
  { code: 'uz', name: "O'zbekcha" },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-navy-950 border-t border-white/5">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      {/* Main Footer Content */}
      <div className="container-custom py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-md">
                <span className="text-navy-900 font-sans font-bold text-lg tracking-tight">IA</span>
              </div>
              <div>
                <p className="font-sans text-lg font-semibold text-white tracking-tight">Iqtisodiyot Assambleyasi</p>
                <p className="text-[11px] text-gold-500/80 tracking-widest uppercase font-medium">O'zbekiston Respublikasi</p>
              </div>
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              O'zbekiston bo'ylab barqaror iqtisodiy o'sish va farovonlikni ta'minlash uchun
              46 ta tarmoq uyushmasini birlashtiruvchi platforma.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-gold-500/20 hover:text-gold-500 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-medium mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/50 text-sm hover:text-gold-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Language & Legal */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Language Selector */}
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-white/40" />
              <div className="flex gap-2">
                {languages.map((lang, index) => (
                  <button
                    key={lang.code}
                    className={`px-3 py-1.5 rounded text-sm transition-colors ${
                      index === 0
                        ? 'bg-gold-500/20 text-gold-500'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
              <a href="#" className="hover:text-gold-500 transition-colors">Maxfiylik Siyosati</a>
              <a href="#" className="hover:text-gold-500 transition-colors">Foydalanish Shartlari</a>
              <a href="#" className="hover:text-gold-500 transition-colors">Cookie Siyosati</a>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:border-gold-500 hover:text-gold-500 transition-colors"
              aria-label="Yuqoriga"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <p>
              © {new Date().getFullYear()} O'zbekiston Respublikasi Iqtisodiyot Assambleyasi.
              Barcha huquqlar himoyalangan.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-turquoise-500 animate-pulse" />
              Barcha tizimlar ishlayapti
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
