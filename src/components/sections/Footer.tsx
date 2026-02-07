'use client'

import { Link } from '@/lib/navigation'
import Image from 'next/image'
import {
  Facebook,
  Instagram,
  Youtube,
  Send,
  MapPin,
  Phone,
  Mail,
  ArrowUp
} from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import type { Locale } from '@/i18n/config'
import { Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'

const defaultSocialLinks = [
  { name: 'Telegram', icon: Send, key: 'telegram', href: 'https://t.me/uzassembly' },
  { name: 'Instagram', icon: Instagram, key: 'instagram', href: 'https://instagram.com/assemblyuz' },
  { name: 'Facebook', icon: Facebook, key: 'facebook', href: 'https://facebook.com/uzeconomyassembly' },
  { name: 'YouTube', icon: Youtube, key: 'youtube', href: 'https://youtube.com/@assemblyuz' },
  { name: 'LinkedIn', icon: Linkedin, key: 'linkedin', href: 'https://linkedin.com/company/assemblyuz' },
]

const servicesLinks = [
  { key: 'smartCity', href: '/services/smart-city' },
  { key: 'biznesDarcha', href: '/services/biznes-darcha' },
  { key: 'investHub', href: '/services/invest-hub' },
  { key: 'eduJob', href: '/services/edu-job' },
  { key: 'reportajGo', href: '/services/reportaj-go' },
]

const organizationLinks = [
  { key: 'aboutUs', href: '/about' },
  { key: 'associations', href: '/associations' },
  { key: 'projects', href: '/projects' },
  { key: 'news', href: '/news' },
  { key: 'leadership', href: '/about#leadership' },
]

const membersLinks = [
  { key: 'becomeMember', href: '/membership' },
  { key: 'pricing', href: '/membership#pricing' },
  { key: 'benefits', href: '/membership#benefits' },
  { key: 'forInvestors', href: '/investors' },
  { key: 'faq', href: '/contact#faq' },
]

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale() as Locale
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/public/settings')
      .then(r => r.ok ? r.json() : {})
      .then(data => setSettings(data))
      .catch(() => {})
  }, [])

  const phone1 = settings.phone1 || '+99877 736 55 60'
  const phone2 = settings.phone2
  const email = settings.email || 'info@assembly.uz'
  const address = locale === 'en' ? (settings.addressEn || settings.address || "Toshkent sh., Furqat ko'chasi 1/1") :
                  locale === 'ru' ? (settings.addressRu || settings.address || "Toshkent sh., Furqat ko'chasi 1/1") :
                  (settings.address || "Toshkent sh., Furqat ko'chasi 1/1")

  const socialLinks = defaultSocialLinks.map(s => ({
    ...s,
    href: settings[s.key] || s.href,
  })).filter(s => s.href)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#0a1628] pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 overflow-hidden">
      {/* Watermark Background */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-8 lg:pt-12">
        <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] opacity-[0.03]">
          <Image
            src="/images/logo/footer-blue.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="container-custom px-4 sm:px-6 relative z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-12 sm:mb-16">
          {/* Left Side - Logo, Description & Contact */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <div className="relative h-24 w-72">
                <Image
                  src={locale === 'en' ? '/images/logo/assembly-logo-en.png' : '/images/logo/assembly-logo-uz.png'}
                  alt="Assembly"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Description */}
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href={`tel:${phone1.replace(/\s/g, '')}`} className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{phone1}</span>
              </a>
              {phone2 && (
                <a href={`tel:${phone2.replace(/\s/g, '')}`} className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{phone2}</span>
                </a>
              )}
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>{email}</span>
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center',
                    'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white',
                    'transition-all duration-300'
                  )}
                  title={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-heading font-semibold text-white text-sm mb-5">
              {t('columns.services')}
            </h4>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Organization Column */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-semibold text-white text-sm mb-5">
              {t('columns.organization')}
            </h4>
            <ul className="space-y-3">
              {organizationLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Members Column */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-semibold text-white text-sm mb-5">
              {t('columns.members')}
            </h4>
            <ul className="space-y-3">
              {membersLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-white/30 text-sm text-center">
              <p>&copy; {new Date().getFullYear()} {t('legal.copyright')}</p>
              <span className="hidden md:inline text-white/20">•</span>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-white/60 transition-colors">
                  {t('legal.privacy')}
                </Link>
                <Link href="/terms" className="hover:text-white/60 transition-colors">
                  {t('legal.terms')}
                </Link>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white',
                'transition-all duration-300 border border-white/10'
              )}
              title={t('scrollToTop')}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
