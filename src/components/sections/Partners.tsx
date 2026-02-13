'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Handshake } from 'lucide-react'

interface Partner {
  id: number
  name: string
  logo: string | null
  link: string | null
  order: number
}

function PartnerLogo({ partner }: { partner: Partner }) {
  // ✅ Logo URL ni to'g'rilash
  const logoSrc = partner.logo 
    ? (partner.logo.startsWith('http') || partner.logo.startsWith('/') 
        ? partner.logo 
        : `/uploads/partners/${partner.logo}`)
    : null

  const inner = (
    <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:border-sky-500/40 transition-all duration-300 group flex items-center justify-center h-20 sm:h-24 md:h-28 px-6 sm:px-8">
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={partner.name}
          className="h-10 sm:h-12 md:h-14 max-w-[140px] md:max-w-[180px] object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
          onError={(e) => {
            // ✅ Agar rasm yuklanmasa, text ko'rsat
            console.error('Failed to load partner logo:', partner.name, logoSrc)
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling?.classList.remove('hidden')
          }}
        />
      ) : null}
      <span className={`text-sm sm:text-base md:text-lg font-semibold text-primary-700/80 group-hover:text-primary-700 transition-colors whitespace-nowrap font-heading ${logoSrc ? 'hidden' : ''}`}>
        {partner.name}
      </span>
    </div>
  )

  if (partner.link) {
    return (
      <a href={partner.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
        {inner}
      </a>
    )
  }
  return <div className="flex-shrink-0">{inner}</div>
}

export default function Partners() {
  const t = useTranslations('partnersSection')
  const [partners, setPartners] = useState<Partner[]>([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null) // ✅ Error state

  useEffect(() => {
    // ✅ Debug logging
    console.log('Fetching partners...')
    
    fetch('/api/public/partners')
      .then(r => {
        console.log('Partners response status:', r.status)
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => {
        console.log('Partners data:', data)
        setPartners(Array.isArray(data) ? data : [])
        setLoaded(true)
      })
      .catch(err => {
        console.error('Partners fetch error:', err)
        setError(err.message)
        setLoaded(true)
      })
  }, [])

  // Duplicate partners
  const marqueeItems = useMemo(() => {
    if (partners.length === 0) return []
    const repeatCount = Math.max(Math.ceil(8 / partners.length), 2)
    const items: Partner[] = []
    for (let i = 0; i < repeatCount; i++) items.push(...partners)
    return items
  }, [partners])

  // ✅ Loading state
  if (!loaded) {
    return (
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-primary-700 via-primary-600 to-primary-700">
        <div className="container-custom text-center">
          <p className="text-white/40">Loading partners...</p>
        </div>
      </section>
    )
  }

  const hasPartners = partners.length > 0

  const speed = Math.max(marqueeItems.length * 3, 20)

  return (
    <section
      id="partners"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-primary-700 via-primary-600 to-primary-700"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(62, 158, 238, 0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
            top: '20%',
            left: '-10%',
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 94, 133, 0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
            bottom: '10%',
            right: '-5%',
          }}
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="badge-primary mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            {t('badge')}
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-4 sm:mb-6" style={{ letterSpacing: '-0.025em' }}>
            {t('title')}{' '}
            <span className="text-gradient-sky font-display">{t('titleHighlight')}</span>
          </h2>

          <p className="text-lg lg:text-xl text-white/60 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
      </div>

      {hasPartners ? (
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-40 bg-gradient-to-r from-primary-700 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-40 bg-gradient-to-l from-primary-700 to-transparent z-10 pointer-events-none" />

          <div className="partners-marquee-wrap overflow-hidden">
            <div className="partners-marquee-track flex items-center gap-4 sm:gap-6 md:gap-8 py-2 w-max">
              {marqueeItems.map((p, i) => (
                <PartnerLogo key={`a-${i}`} partner={p} />
              ))}
              {marqueeItems.map((p, i) => (
                <PartnerLogo key={`b-${i}`} partner={p} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-2xl text-center text-white/60">
            <p className="text-base">
              {error ? 'Partners data load failed.' : 'No partners found yet.'}
            </p>
            {error && (
              <p className="text-sm text-white/40 mt-2">Check /api/public/partners and server logs.</p>
            )}
          </div>
        </div>
      )}

      {hasPartners && (
        <div className="container-custom relative z-10 mt-10 lg:mt-14">
          <div className="flex items-center justify-center gap-3 text-white/30">
            <Handshake className="w-5 h-5" />
            <span className="text-sm font-medium">
              {partners.length}+ {t('badge')}
            </span>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes partnerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .partners-marquee-track {
          animation: partnerScroll ${speed}s linear infinite;
        }
        .partners-marquee-wrap:hover .partners-marquee-track {
          animation-play-state: paused;
        }
      `}} />
    </section>
  )
}