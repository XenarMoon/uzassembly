'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

// Seeded random function for consistent values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seededRandom(i * 1) * 100,
    y: seededRandom(i * 2) * 100,
    size: seededRandom(i * 3) * 3 + 1,
    duration: seededRandom(i * 4) * 20 + 15,
    delay: seededRandom(i * 5) * 10,
    opacity: seededRandom(i * 6) * 0.5 + 0.2,
  }))
}

export default function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false)
  const particles = useMemo(() => generateParticles(60), [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0">
        {/* Gold Orb - Large */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 70%)',
            filter: 'blur(80px)',
            top: '10%',
            left: '15%',
          }}
          animate={{
            x: [0, 100, 50, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Turquoise Orb - Medium */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(13, 148, 136, 0.12) 0%, rgba(13, 148, 136, 0) 70%)',
            filter: 'blur(100px)',
            bottom: '20%',
            right: '10%',
          }}
          animate={{
            x: [0, -80, 30, 0],
            y: [0, 80, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Navy/Purple Orb - Large, Center */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(36, 59, 103, 0.4) 0%, rgba(3, 7, 18, 0) 70%)',
            filter: 'blur(120px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Secondary Gold Orb - Small */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245, 215, 121, 0.1) 0%, rgba(245, 215, 121, 0) 70%)',
            filter: 'blur(60px)',
            top: '60%',
            left: '5%',
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Perspective Grid */}
      <div className="absolute inset-0" style={{ perspective: '1000px' }}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'rotateX(60deg) translateY(-50%)',
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Particle System - Only render on client to avoid hydration mismatch */}
      {isMounted && (
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: `${particle.size.toFixed(2)}px`,
                height: `${particle.size.toFixed(2)}px`,
                left: `${particle.x.toFixed(2)}%`,
                bottom: '-5%',
                background: particle.id % 3 === 0
                  ? 'rgba(212, 175, 55, 0.6)'
                  : 'rgba(255, 255, 255, 0.4)',
              }}
              animate={{
                y: [0, -1200],
                x: [0, (seededRandom(particle.id * 7) - 0.5) * 100],
                opacity: [0, particle.opacity, particle.opacity, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(3, 7, 18, 0.4) 100%)',
        }}
      />
    </div>
  )
}
