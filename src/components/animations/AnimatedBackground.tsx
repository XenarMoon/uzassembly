'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - deep navy */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Secondary gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(17, 24, 39, 1) 0%, transparent 100%)',
        }}
      />

      {/* Top horizontal glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.4) 20%, rgba(212, 175, 55, 0.8) 50%, rgba(212, 175, 55, 0.4) 80%, transparent 100%)',
          boxShadow: '0 0 30px 10px rgba(212, 175, 55, 0.3), 0 0 60px 20px rgba(212, 175, 55, 0.1)',
        }}
      />

      {/* Bottom horizontal glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(13, 148, 136, 0.3) 30%, rgba(13, 148, 136, 0.5) 50%, rgba(13, 148, 136, 0.3) 70%, transparent 100%)',
          boxShadow: '0 0 20px 5px rgba(13, 148, 136, 0.2)',
        }}
      />

      {/* Lightning/Glow Effects */}
      {isMounted && (
        <>
          {/* Primary lightning - gold, top left */}
          <motion.div
            className="absolute"
            style={{
              width: '60%',
              height: '400px',
              top: '-10%',
              left: '-10%',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 100%)',
              filter: 'blur(80px)',
              transformOrigin: 'center center',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
              scale: [1, 1.1, 1.05, 1.15, 1],
              x: [0, 30, -20, 40, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Secondary lightning - turquoise, right side */}
          <motion.div
            className="absolute"
            style={{
              width: '50%',
              height: '500px',
              top: '30%',
              right: '-15%',
              background: 'linear-gradient(225deg, rgba(13, 148, 136, 0.12) 0%, rgba(6, 182, 212, 0.06) 50%, transparent 100%)',
              filter: 'blur(100px)',
              transformOrigin: 'center center',
            }}
            animate={{
              opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
              scale: [1, 1.15, 1, 1.1, 1],
              y: [0, -40, 20, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          {/* Third lightning - gold/amber, bottom left */}
          <motion.div
            className="absolute"
            style={{
              width: '45%',
              height: '350px',
              bottom: '5%',
              left: '5%',
              background: 'linear-gradient(45deg, rgba(245, 158, 11, 0.1) 0%, rgba(212, 175, 55, 0.05) 60%, transparent 100%)',
              filter: 'blur(90px)',
              transformOrigin: 'center center',
            }}
            animate={{
              opacity: [0.2, 0.4, 0.25, 0.5, 0.2],
              scale: [1, 1.08, 0.98, 1.12, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />

          {/* Center glow pulse */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '800px',
              height: '800px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(17, 24, 39, 0) 60%)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Floating energy particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${80 + i * 30}px`,
                height: `${80 + i * 30}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                background: i % 2 === 0
                  ? 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(13, 148, 136, 0.12) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{
                y: [0, -30 - i * 10, 0],
                x: [0, 20 - i * 5, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1 + i * 0.05, 1],
              }}
              transition={{
                duration: 5 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.8,
              }}
            />
          ))}

          {/* Horizontal scanning light beam */}
          <motion.div
            className="absolute top-0 left-0 h-full"
            style={{
              width: '200px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.03) 50%, transparent 100%)',
              filter: 'blur(30px)',
            }}
            animate={{
              x: ['-200px', 'calc(100vw + 200px)'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 5,
            }}
          />

          {/* Vertical accent lines */}
          <motion.div
            className="absolute left-[20%] top-0 w-[1px] h-full"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.1) 30%, rgba(212, 175, 55, 0.05) 70%, transparent 100%)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute right-[25%] top-0 w-[1px] h-full"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(13, 148, 136, 0.08) 40%, rgba(13, 148, 136, 0.04) 60%, transparent 100%)',
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          />
        </>
      )}

      {/* Grid overlay - subtle */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial Vignette - darker edges */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, rgba(3, 7, 18, 0.7) 100%)',
        }}
      />

      {/* Top edge fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(180deg, rgba(3, 7, 18, 0.8) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
