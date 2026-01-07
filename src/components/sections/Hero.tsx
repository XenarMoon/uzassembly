'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Building2, Compass, MapPin, Globe2, Play } from 'lucide-react'
import AnimatedBackground from '@/components/animations/AnimatedBackground'
import { cn, formatNumber } from '@/lib/utils'

const stats = [
  {
    value: 46,
    suffix: '+',
    label: 'Assotsiatsiyalar',
    description: 'Sanoat birlashmalari',
    icon: Building2,
    gradient: 'from-gold-400 via-gold-500 to-amber-500',
    glowColor: 'rgba(212, 175, 55, 0.4)',
    bgGradient: 'from-gold-500/10 via-gold-500/5 to-transparent',
  },
  {
    value: 8,
    suffix: '',
    label: 'Xizmat Yo\'nalishi',
    description: 'Strategik xizmatlar',
    icon: Compass,
    gradient: 'from-turquoise-400 via-turquoise-500 to-emerald-500',
    glowColor: 'rgba(13, 148, 136, 0.4)',
    bgGradient: 'from-turquoise-500/10 via-turquoise-500/5 to-transparent',
  },
  {
    value: 6400,
    suffix: '',
    label: 'ga Smart City',
    description: 'Ohangaron, Toshkent',
    icon: MapPin,
    gradient: 'from-gold-400 via-amber-500 to-orange-500',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
  },
  {
    value: 3,
    suffix: '',
    label: 'Xalqaro Ofis',
    description: 'Dubay, Singapur, Pekin',
    icon: Globe2,
    gradient: 'from-purple-400 via-violet-500 to-indigo-500',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    bgGradient: 'from-violet-500/10 via-violet-500/5 to-transparent',
  },
]

function AnimatedCounter({
  value,
  suffix,
  duration = 2000
}: {
  value: number
  suffix: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const steps = 60
    const stepDuration = duration / steps
    const increment = value / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value, duration, isVisible])

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(count)}{suffix}
    </span>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex-1 flex flex-col"
      >
        {/* Hero Content */}
        <div className="flex-1 flex items-center pt-24 sm:pt-28 lg:pt-0">
          <div className="container-custom w-full px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Left Content - Takes more space */}
              <div className="lg:col-span-7 xl:col-span-6 text-center lg:text-left">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-6 sm:mb-8 flex justify-center lg:justify-start"
                >
                  <span className="badge-gold text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold-500 animate-pulse" />
                    <span>O'zbekistonda ilk bor yangi format</span>
                  </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold leading-[1.1] mb-4 sm:mb-6"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  <span className="text-white">Tadbirkorlar Uchun</span>
                  <br />
                  <span className="text-gradient-gold font-display" style={{ letterSpacing: '-0.02em' }}>Yagona Ekotizim</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed"
                >
                  8 ta strategik yo'nalish. 46+ sanoat assotsiatsiyasi.
                  <span className="text-white/80 font-medium"> Barcha biznes ehtiyojlaringiz — bir joyda.</span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
                >
                  <Link href="/services" className="btn-primary group w-full sm:w-auto justify-center">
                    <span>Xizmatlarni Ko'rish</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/contact" className="btn-secondary w-full sm:w-auto justify-center">
                    A'zo Bo'lish
                  </Link>
                  <button className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white transition-colors group">
                    <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 ml-0.5" />
                    </span>
                    <span className="font-medium text-sm sm:text-base">Video Ko'rish</span>
                  </button>
                </motion.div>
              </div>

              {/* Right Content - Stats Cards */}
              <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center mt-8 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 w-full max-w-md lg:max-w-xl"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.8 + index * 0.15,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      whileHover={{
                        y: -6,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      className="group relative"
                    >
                      {/* Ambient Glow - inside card bounds */}
                      <div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-700"
                        style={{ background: stat.glowColor }}
                      />

                      {/* Card Container with gradient border */}
                      <div className="relative rounded-2xl p-[1px] overflow-hidden">
                        {/* Gradient border - visible */}
                        <div className={cn(
                          'absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500',
                          'bg-gradient-to-br',
                          stat.gradient
                        )} />

                        {/* Card Body */}
                        <div className="relative rounded-2xl bg-navy-900/95 backdrop-blur-2xl p-4 sm:p-5 lg:p-6 overflow-hidden">
                          {/* Background gradient on hover */}
                          <div className={cn(
                            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                            'bg-gradient-to-br',
                            stat.bgGradient
                          )} />

                          {/* Animated light beam */}
                          <div className="absolute inset-0 overflow-hidden">
                            <motion.div
                              className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent skew-x-12"
                              initial={{ left: "-100%" }}
                              whileHover={{ left: "200%" }}
                              transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                          </div>

                          {/* Content - Centered */}
                          <div className="relative z-10 flex flex-col items-center text-center">
                            {/* Icon */}
                            <div className={cn(
                              'w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4',
                              'bg-gradient-to-br from-white/[0.1] to-transparent',
                              'border border-white/10',
                              'group-hover:border-white/20 group-hover:scale-110 transition-all duration-300'
                            )}>
                              <stat.icon className={cn(
                                'w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300',
                                index === 0 && 'text-gold-400',
                                index === 1 && 'text-turquoise-400',
                                index === 2 && 'text-amber-400',
                                index === 3 && 'text-violet-400'
                              )} />
                            </div>

                            {/* Number */}
                            <div className={cn(
                              'font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1',
                              index === 0 && 'text-gold-400',
                              index === 1 && 'text-turquoise-400',
                              index === 2 && 'text-amber-400',
                              index === 3 && 'text-violet-400'
                            )}>
                              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>

                            {/* Label */}
                            <div className="text-white font-heading font-semibold text-xs sm:text-sm lg:text-base mb-0.5">
                              {stat.label}
                            </div>

                            {/* Description */}
                            <div className="text-white/50 text-[10px] sm:text-xs lg:text-sm group-hover:text-white/70 transition-colors duration-300">
                              {stat.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="relative z-10 py-4 sm:py-6 lg:py-8 border-t border-white/5 bg-navy-900/50 backdrop-blur-sm"
        >
          <div className="container-custom px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-16">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-white/60 text-xs sm:text-sm">
                  <span className="text-emerald-400 font-mono font-semibold">15,000+</span> faol a'zolar
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold-500 animate-pulse" />
                <span className="text-white/60 text-xs sm:text-sm">
                  <span className="text-gold-400 font-mono font-semibold">$20B+</span> investitsiya
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-turquoise-400 animate-pulse" />
                <span className="text-white/60 text-xs sm:text-sm">
                  <span className="text-turquoise-400 font-mono font-semibold">2015</span> yildan beri
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 sm:bottom-24 lg:bottom-28 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#services"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1.5 sm:gap-2 text-white/30 hover:text-gold-400 transition-colors cursor-pointer"
        >
          <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em]">Pastga</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.a>
      </motion.div>
    </section>
  )
}
