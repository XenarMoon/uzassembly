'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/navigation';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
}

export default function LanguageSwitcher({ variant = 'desktop' }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  // Mobile variant - horizontal buttons
  if (variant === 'mobile') {
    return (
      <div className="flex gap-2">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
              locale === loc
                ? 'bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/20'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            )}
          >
            <span>{localeFlags[loc]}</span>
            <span>{loc.toUpperCase()}</span>
          </button>
        ))}
      </div>
    );
  }

  // Desktop variant - dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
        <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-44 bg-[#0a1628] border border-white/10 rounded-xl p-2 shadow-2xl backdrop-blur-xl z-50"
          >
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors text-left',
                  locale === loc
                    ? 'bg-gold-500/20 text-gold-400'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                )}
              >
                <span className="text-base">{localeFlags[loc]}</span>
                <span className="font-medium">{localeNames[loc]}</span>
                {locale === loc && (
                  <motion.div
                    layoutId="activeLocale"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-400"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
