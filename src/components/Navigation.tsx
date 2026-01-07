'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Biz Haqimizda', href: '#about' },
  { name: 'Xizmatlar', href: '#services' },
  { name: 'Smart City', href: '#smart-city' },
  { name: 'Assotsiatsiyalar', href: '#associations' },
  { name: 'Rahbariyat', href: '#leadership' },
  { name: 'A\'zolik', href: '#membership' },
  { name: 'Yangiliklar', href: '#news' },
  { name: 'Aloqa', href: '#contact' },
]

const languages = [
  { code: 'uz', name: 'O\'zbekcha' },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('uz')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-navy-900/95 backdrop-blur-lg shadow-lg shadow-black/10 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center transform group-hover:scale-[1.02] transition-transform shadow-md">
              <span className="text-navy-900 font-sans font-bold text-base tracking-tight">IA</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-sans text-[15px] font-semibold text-white leading-tight tracking-tight">Iqtisodiyot Assambleyasi</p>
              <p className="text-[10px] text-gold-500/80 tracking-widest uppercase font-medium">O'zbekiston Respublikasi</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-gold-500 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Language Selector */}
            <div className="relative ml-2">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-gold-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{currentLang}</span>
                <ChevronDown className={cn('w-3 h-3 transition-transform', isLangOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-36 glass rounded-xl shadow-xl overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code)
                          setIsLangOpen(false)
                        }}
                        className={cn(
                          'w-full px-4 py-2.5 text-left text-sm transition-colors',
                          currentLang === lang.code
                            ? 'bg-gold-500/20 text-gold-500'
                            : 'text-white/80 hover:bg-white/5'
                        )}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="#membership"
            className="hidden xl:inline-flex items-center gap-2 px-5 py-2 bg-gold-500 text-navy-900 text-sm font-semibold rounded-full hover:bg-gold-400 transition-all hover:shadow-lg hover:shadow-gold-500/20"
          >
            A'zo Bo'lish
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-navy-900/98 backdrop-blur-lg border-t border-white/10"
          >
            <div className="container-custom py-6">
              <div className="flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-medium text-white/80 hover:text-gold-500 transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <div className="pt-4 mt-2 border-t border-white/10">
                  <div className="flex gap-2 mb-4">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setCurrentLang(lang.code)}
                        className={cn(
                          'flex-1 px-4 py-2 text-sm rounded-lg transition-colors font-medium',
                          currentLang === lang.code
                            ? 'bg-gold-500 text-navy-900'
                            : 'bg-white/5 text-white/60 hover:text-white'
                        )}
                      >
                        {lang.code.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <a
                  href="#membership"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary text-center"
                >
                  A'zo Bo'lish
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
