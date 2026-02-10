'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@/lib/navigation'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { MoreVertical, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import type { Locale } from '@/i18n/config'

export default function Header() {
  const locale = useLocale() as Locale
  const t = useTranslations('navigation')

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [settings, setSettings] = useState<Record<string, string>>({})

  const navLinks = [
    { name: t('about'), href: '/about' },
    {
      name: t('services'),
      href: '/services',
      submenu: [
        { name: t('servicesSubmenu.biznesDarcha'), href: '/services/biznes-darcha' },
        { name: t('servicesSubmenu.investHub'), href: '/services/invest-hub' },
        { name: t('servicesSubmenu.eduJob'), href: '/services/edu-job' },
        { name: t('servicesSubmenu.reportajGo'), href: '/services/reportaj-go' },
        { name: t('servicesSubmenu.gr'), href: '/services/government-relations' },
        { name: t('servicesSubmenu.fr'), href: '/services/foreign-relations' },
        { name: t('servicesSubmenu.br'), href: '/services/business-relations' },
        { name: t('servicesSubmenu.smartCity'), href: '/services/smart-city' },
      ]
    },
    { name: t('associations'), href: '/associations' },
    { name: t('projects'), href: '/projects' },
    // { name: t('news'), href: '/news' },
    { name: t('contact'), href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch site settings for dynamic logo
  useEffect(() => {
    fetch('/api/public/settings')
      .then(r => r.ok ? r.json() : {})
      .then(data => setSettings(data))
      .catch(() => {})
  }, [])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-primary-500/95 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-primary-500/0 py-5'
      )}
      style={{ transform: 'translateZ(0)', willChange: 'transform', backfaceVisibility: 'hidden' }}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <nav className="flex items-center justify-between">
          {/* Logo - Responsive sizing */}
          <Link href="/" className="group flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative h-12 w-40 sm:h-16 sm:w-52 md:h-20 md:w-64 lg:h-24 lg:w-80 xl:h-28 xl:w-[380px]"
            >
              <Image
                src={
                  locale === 'en'
                    ? (settings.logoEn || '/images/logo/assembly-logo-en.png')
                    : (settings.logo || '/images/logo/assembly-logo-uz.png')
                }
                alt="Iqtisodiyot Assambleyasi"
                fill
                sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, (max-width: 1024px) 256px, (max-width: 1280px) 320px, 380px"
                className="object-contain object-left"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden xl:flex items-center justify-center flex-1 gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => link.submenu && setActiveSubmenu(link.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                    'text-white/70 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.name}
                  {link.submenu && (
                    <ChevronDown className={cn(
                      'w-3.5 h-3.5 transition-transform',
                      activeSubmenu === link.name && 'rotate-180'
                    )} />
                  )}
                </Link>

                {/* Submenu */}
                {link.submenu && (
                  <AnimatePresence>
                    {activeSubmenu === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-2 w-56"
                      >
                        <div className="bg-primary-600 border border-white/20 rounded-xl p-2 shadow-2xl backdrop-blur-xl">
                          {link.submenu.map((sublink) => (
                            <Link
                              key={sublink.name}
                              href={sublink.href}
                              className="block px-4 py-2.5 text-sm text-white/80 hover:text-sky-400 hover:bg-white/5 rounded-lg transition-colors"
                            >
                              {sublink.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* Language Selector */}
            <div className="ml-2">
              <LanguageSwitcher variant="desktop" />
            </div>
          </div>

          {/* CTA + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden xl:inline-flex btn-primary text-sm px-6 py-2.5">
              {t('becomeMember')}
            </Link>

            {/* Mobile Menu Button - 3 Dots */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "xl:hidden p-2.5 rounded-xl transition-all duration-300",
                isMobileMenuOpen
                  ? "bg-sky-500 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MoreVertical className="w-5 h-5" />}
            </motion.button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden fixed inset-0 bg-black/60 z-[998]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="xl:hidden fixed right-4 sm:right-6 top-20 w-[calc(100%-2rem)] sm:w-72 md:w-80 max-h-[75vh] overflow-y-auto bg-primary-600 rounded-2xl border border-white/20 shadow-2xl z-[999]"
            >
              <div className="p-4">
                {/* Navigation Links */}
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      {link.submenu ? (
                        <div>
                          <button
                            onClick={() => setActiveSubmenu(activeSubmenu === link.name ? null : link.name)}
                            className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-white/80 hover:text-sky-400 hover:bg-white/5 rounded-xl transition-colors"
                          >
                            {link.name}
                            <ChevronDown className={cn(
                              'w-4 h-4 transition-transform',
                              activeSubmenu === link.name && 'rotate-180'
                            )} />
                          </button>
                          <AnimatePresence>
                            {activeSubmenu === link.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 pl-4 py-1 border-l border-white/20 space-y-0.5">
                                  {link.submenu.map((sublink) => (
                                    <Link
                                      key={sublink.name}
                                      href={sublink.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block px-3 py-2 text-sm text-white/60 hover:text-sky-400 rounded-lg transition-colors"
                                    >
                                      {sublink.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-3 text-base font-medium text-white/80 hover:text-sky-400 hover:bg-white/5 rounded-xl transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Language Selector */}
                <div className="mb-4">
                  <p className="px-4 text-xs text-white/40 uppercase tracking-wider mb-2">{t('selectLanguage')}</p>
                  <div className="px-2">
                    <LanguageSwitcher variant="mobile" />
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full justify-center text-sm"
                >
                  {t('becomeMember')}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
