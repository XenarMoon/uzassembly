'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  MapPin,
  Phone,
  Mail,
  ArrowUp
} from 'lucide-react'
import { cn } from '@/lib/utils'

const footerLinks = {
  xizmatlar: [
    { name: 'Smart City', href: '/services/smart-city' },
    { name: 'Biznes Darcha', href: '/services/biznes-darcha' },
    { name: 'Invest Hub', href: '/services/invest-hub' },
    { name: 'Edu Job', href: '/services/edu-job' },
    { name: 'Reportaj GO', href: '/services/reportaj-go' },
    { name: 'GR / FR / BR', href: '/services/government-relations' },
  ],
  tashkilot: [
    { name: 'Biz Haqimizda', href: '/about' },
    { name: 'Assotsiatsiyalar', href: '/associations' },
    { name: 'Loyihalar', href: '/projects' },
    { name: 'Yangiliklar', href: '/news' },
    { name: 'Rahbariyat', href: '/about#leadership' },
    { name: 'Vakansiyalar', href: '/careers' },
  ],
  azolar: [
    { name: "A'zo Bo'lish", href: '/membership' },
    { name: 'Tariflar', href: '/membership#plans' },
    { name: 'Imtiyozlar', href: '/membership#benefits' },
    { name: 'Investorlarga', href: '/invest' },
    { name: "FAQ", href: '/faq' },
  ],
}

const socialLinks = [
  { name: 'Telegram', icon: Send, href: 'https://t.me/uzassembly' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/assemblyuz' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/uzeconomyassembly' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@assemblyuz' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/uzassembly' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-navy-900 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
      </div>

      <div className="container-custom px-4 sm:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-block mb-4 sm:mb-6 group">
              <div className="relative h-14 w-48 sm:h-20 sm:w-72">
                <Image
                  src="/images/logo/footer-white.jpg"
                  alt="Iqtisodiyot Assambleyasi"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-sm">
              O'zbekiston Iqtisodiyot Assambleyasi — tadbirkorlar uchun yagona ekotizim.
              35+ assotsiatsiya, 5 ta strategik yo'nalish.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <a href="tel:+998917741416" className="flex items-center gap-2 sm:gap-3 text-white/50 hover:text-gold-400 transition-colors text-xs sm:text-sm">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>+998 91 774 14 16</span>
              </a>
              <a href="mailto:info@uzassembly.uz" className="flex items-center gap-2 sm:gap-3 text-white/50 hover:text-gold-400 transition-colors text-xs sm:text-sm">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>info@uzassembly.uz</span>
              </a>
              <div className="flex items-start gap-2 sm:gap-3 text-white/50 text-xs sm:text-sm">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                <span>Toshkent sh., Furqat ko'chasi 1/1</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center',
                    'bg-white/5 text-white/50 hover:bg-gold-500/20 hover:text-gold-400',
                    'transition-all duration-300'
                  )}
                  title={social.name}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Xizmatlar</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.xizmatlar.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-gold-400 transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Tashkilot</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.tashkilot.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-gold-400 transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">A'zolar</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.azolar.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-gold-400 transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-4 text-white/30 text-xs sm:text-sm text-center">
              <p>&copy; {new Date().getFullYear()} O'zbekiston Iqtisodiyot Assambleyasi</p>
              <div className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-3 sm:gap-4">
                <Link href="/privacy" className="hover:text-white/60 transition-colors">
                  Maxfiylik siyosati
                </Link>
                <Link href="/terms" className="hover:text-white/60 transition-colors">
                  Foydalanish shartlari
                </Link>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className={cn(
                'w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center',
                'bg-gold-500/20 text-gold-400 hover:bg-gold-500 hover:text-navy-900',
                'transition-all duration-300'
              )}
              title="Yuqoriga"
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
