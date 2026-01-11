'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  originalX: number
  originalY: number
  originalZ: number
}

export default function ParticleGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    if (!mounted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let rotation = 0
    let currentWidth = window.innerWidth
    let currentHeight = window.innerHeight

    // Check if mobile
    const checkMobile = () => window.innerWidth < 768
    const checkTablet = () => window.innerWidth < 1024

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      currentWidth = window.innerWidth
      currentHeight = window.innerHeight
      canvas.width = currentWidth * dpr
      canvas.height = currentHeight * dpr
      canvas.style.width = `${currentWidth}px`
      canvas.style.height = `${currentHeight}px`
      ctx.scale(dpr, dpr)
      setIsMobile(checkMobile())
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Generate sphere points using fibonacci distribution
    const generateSpherePoints = (count: number, radius: number): Particle[] => {
      const particles: Particle[] = []
      const phi = Math.PI * (3 - Math.sqrt(5))

      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2
        const radiusAtY = Math.sqrt(1 - y * y)
        const theta = phi * i

        const x = Math.cos(theta) * radiusAtY * radius
        const z = Math.sin(theta) * radiusAtY * radius
        const yPos = y * radius

        particles.push({
          x, y: yPos, z,
          originalX: x, originalY: yPos, originalZ: z
        })
      }

      return particles
    }

    // Generate latitude lines
    const generateLatitudeLines = (lineCount: number, pointsPerLine: number, radius: number): Particle[] => {
      const particles: Particle[] = []

      for (let i = 1; i < lineCount; i++) {
        const phi = (Math.PI / lineCount) * i
        const r = Math.sin(phi) * radius
        const y = Math.cos(phi) * radius

        for (let j = 0; j < pointsPerLine; j++) {
          const theta = (2 * Math.PI / pointsPerLine) * j
          const x = Math.cos(theta) * r
          const z = Math.sin(theta) * r

          particles.push({
            x, y, z,
            originalX: x, originalY: y, originalZ: z
          })
        }
      }

      return particles
    }

    // Generate longitude lines
    const generateLongitudeLines = (lineCount: number, pointsPerLine: number, radius: number): Particle[] => {
      const particles: Particle[] = []

      for (let i = 0; i < lineCount; i++) {
        const theta = (2 * Math.PI / lineCount) * i

        for (let j = 0; j <= pointsPerLine; j++) {
          const phi = (Math.PI / pointsPerLine) * j
          const x = Math.sin(phi) * Math.cos(theta) * radius
          const y = Math.cos(phi) * radius
          const z = Math.sin(phi) * Math.sin(theta) * radius

          particles.push({
            x, y, z,
            originalX: x, originalY: y, originalZ: z
          })
        }
      }

      return particles
    }

    // Generate arc/orbit lines
    const generateArcs = (arcCount: number, pointsPerArc: number, radius: number): Particle[] => {
      const particles: Particle[] = []

      for (let i = 0; i < arcCount; i++) {
        const tilt = (Math.PI / 5) * (i - arcCount / 2)
        const rotOffset = (Math.PI * 2 / arcCount) * i

        for (let j = 0; j < pointsPerArc; j++) {
          const t = (j / pointsPerArc) * Math.PI * 1.3 - Math.PI * 0.15
          let x = Math.cos(t) * radius * 1.25
          let y = Math.sin(t) * Math.cos(tilt) * radius * 1.25
          let z = Math.sin(t) * Math.sin(tilt) * radius * 1.25

          const cosR = Math.cos(rotOffset)
          const sinR = Math.sin(rotOffset)
          const newX = x * cosR - z * sinR
          const newZ = x * sinR + z * cosR

          particles.push({
            x: newX, y, z: newZ,
            originalX: newX, originalY: y, originalZ: newZ
          })
        }
      }

      return particles
    }

    // Generate background particles
    const generateBackground = (count: number, width: number, height: number): Particle[] => {
      const particles: Particle[] = []

      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * width * 2
        const y = (Math.random() - 0.5) * height * 2
        const z = Math.random() * 500 - 250

        particles.push({
          x, y, z,
          originalX: x, originalY: y, originalZ: z
        })
      }

      return particles
    }

    // Rotate point around Y axis
    const rotateY = (particle: Particle, angle: number): { x: number; y: number; z: number } => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return {
        x: particle.originalX * cos - particle.originalZ * sin,
        y: particle.originalY,
        z: particle.originalX * sin + particle.originalZ * cos
      }
    }

    // Project 3D to 2D with perspective
    const project = (x: number, y: number, z: number, offsetX: number, offsetY: number): { x: number; y: number; scale: number } => {
      const perspective = 800
      const scale = perspective / (perspective + z)
      return {
        x: x * scale + offsetX,
        y: y * scale + offsetY,
        scale: Math.max(0, scale)
      }
    }

    // Draw particle
    const drawParticle = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = color.replace(')', `, ${opacity})`)
      ctx.fill()
    }

    // Pre-generate background particles (only once)
    const bgParticles = generateBackground(150, 1920, 1080)

    // Animation loop
    const animate = () => {
      const width = currentWidth
      const height = currentHeight
      const mobile = checkMobile()
      const tablet = checkTablet()

      // Clear canvas - Assembly Brand Color
      ctx.fillStyle = '#005E85'
      ctx.fillRect(0, 0, width, height)

      const time = Date.now() * 0.001
      rotation = time * 0.05

      // Responsive globe parameters
      let globeRadius: number
      let centerX: number
      let centerY: number
      let particleScale: number

      if (mobile) {
        // Mobile: smaller globe, positioned lower and more centered
        globeRadius = Math.min(width, height) * 0.35
        centerX = width * 0.5
        centerY = height * 0.55
        particleScale = 0.7
      } else if (tablet) {
        // Tablet: medium size, positioned right
        globeRadius = Math.min(width, height) * 0.32
        centerX = width * 0.65
        centerY = height * 0.52
        particleScale = 0.85
      } else {
        // Desktop: full size, positioned far right and lower
        globeRadius = Math.min(width, height) * 0.38
        centerX = width * 0.72
        centerY = height * 0.52
        particleScale = 1
      }

      // Adjust particle counts based on device
      const sphereCount = mobile ? 800 : tablet ? 1200 : 1500
      const latLineCount = mobile ? 5 : 8
      const latPointsPerLine = mobile ? 50 : 80
      const longLineCount = mobile ? 8 : 12
      const longPointsPerLine = mobile ? 25 : 40
      const arcCount = mobile ? 3 : 5
      const arcPointsPerArc = mobile ? 40 : 60

      // Generate particles with current radius
      const sphereParticles = generateSpherePoints(sphereCount, globeRadius)
      const latitudeParticles = generateLatitudeLines(latLineCount, latPointsPerLine, globeRadius)
      const longitudeParticles = generateLongitudeLines(longLineCount, longPointsPerLine, globeRadius)
      const arcParticles = generateArcs(arcCount, arcPointsPerArc, globeRadius)

      // Draw background particles (sparse on mobile) - Assembly Brand
      if (!mobile) {
        bgParticles.forEach(p => {
          const projected = project(p.x, p.y, p.z, width / 2, height / 2)
          if (projected.scale > 0) {
            drawParticle(projected.x, projected.y, 1.5 * projected.scale, 'rgba(0, 77, 109', 0.3)
          }
        })
      }

      // Draw arcs (Sky Blue - Assembly Secondary)
      arcParticles.forEach(p => {
        const rotated = rotateY(p, rotation * 1.15)
        const projected = project(rotated.x, rotated.y, rotated.z, centerX, centerY)
        if (projected.scale > 0.3) {
          const opacity = Math.min(0.7, projected.scale * 0.8) * particleScale
          drawParticle(projected.x, projected.y, 2.2 * projected.scale * particleScale, 'rgba(62, 158, 238', opacity)
        }
      })

      // Draw longitude lines (Light Sky Blue)
      longitudeParticles.forEach(p => {
        const rotated = rotateY(p, rotation)
        const projected = project(rotated.x, rotated.y, rotated.z, centerX, centerY)
        if (projected.scale > 0.3) {
          const opacity = Math.min(0.45, projected.scale * 0.55) * particleScale
          drawParticle(projected.x, projected.y, 1.6 * projected.scale * particleScale, 'rgba(95, 181, 247', opacity)
        }
      })

      // Draw latitude lines (Light Sky Blue)
      latitudeParticles.forEach(p => {
        const rotated = rotateY(p, rotation)
        const projected = project(rotated.x, rotated.y, rotated.z, centerX, centerY)
        if (projected.scale > 0.3) {
          const opacity = Math.min(0.45, projected.scale * 0.55) * particleScale
          drawParticle(projected.x, projected.y, 1.6 * projected.scale * particleScale, 'rgba(95, 181, 247', opacity)
        }
      })

      // Draw main sphere (Primary Blue - Assembly Primary)
      sphereParticles.forEach(p => {
        const rotated = rotateY(p, rotation)
        const projected = project(rotated.x, rotated.y, rotated.z, centerX, centerY)
        if (projected.scale > 0.3) {
          const opacity = Math.min(0.8, projected.scale * 0.95) * particleScale
          drawParticle(projected.x, projected.y, 2 * projected.scale * particleScale, 'rgba(0, 94, 133', opacity)
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [mounted])

  if (!mounted) {
    return <div className="absolute inset-0 bg-primary-500" />
  }

  return (
    <div className="absolute inset-0">
      {/* Solid background - Assembly Brand */}
      <div className="absolute inset-0 bg-primary-500" style={{ top: '-20px', bottom: '-20px' }} />

      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          background: '#005E85',
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Desktop: Strong left gradient for text readability - Assembly Brand */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(90deg, rgba(0, 94, 133, 0.95) 0%, rgba(0, 94, 133, 0.85) 20%, rgba(0, 94, 133, 0.6) 35%, rgba(0, 94, 133, 0.3) 50%, transparent 70%)',
        }}
      />

      {/* Mobile: Full overlay gradient for readability - Assembly Brand */}
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 94, 133, 0.9) 0%, rgba(0, 94, 133, 0.5) 30%, rgba(0, 94, 133, 0.3) 50%, rgba(0, 94, 133, 0.6) 80%, rgba(0, 94, 133, 0.95) 100%)',
        }}
      />

      {/* Bottom gradient - Assembly Brand */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(0, 94, 133, 0.95) 0%, rgba(0, 94, 133, 0.4) 15%, transparent 35%)',
        }}
      />

      {/* Top gradient - covers header area - Assembly Brand */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '-10px',
          height: '120px',
          background: 'linear-gradient(180deg, #005E85 0%, rgba(0, 94, 133, 0.95) 40%, rgba(0, 94, 133, 0.7) 70%, transparent 100%)',
        }}
      />
    </div>
  )
}
