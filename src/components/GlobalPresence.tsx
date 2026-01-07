'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const offices = [
  {
    id: 'tashkent',
    city: 'Tashkent',
    country: 'Uzbekistan',
    type: 'Headquarters',
    address: 'Mustakillik Square, Tashkent 100017',
    phone: '+998 71 238 0000',
    email: 'info@assembly.uz',
    coordinates: { x: 58, y: 35 },
    description: 'Main headquarters coordinating all domestic and international operations.',
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    type: 'Representative Office',
    address: 'Minato-ku, Tokyo 107-0052',
    phone: '+81 3 6722 0000',
    email: 'tokyo@assembly.uz',
    coordinates: { x: 85, y: 38 },
    description: 'Facilitating investment and trade relations with East Asian markets.',
  },
  {
    id: 'orlando',
    city: 'Orlando',
    country: 'United States',
    type: 'Representative Office',
    address: 'Downtown Orlando, FL 32801',
    phone: '+1 407 555 0000',
    email: 'usa@assembly.uz',
    coordinates: { x: 22, y: 42 },
    description: 'Gateway to North American investors and business partnerships.',
  },
  {
    id: 'ankara',
    city: 'Ankara',
    country: 'Turkey',
    type: 'Representative Office',
    address: 'Cankaya, Ankara 06690',
    phone: '+90 312 555 0000',
    email: 'turkey@assembly.uz',
    coordinates: { x: 50, y: 40 },
    description: 'Strategic hub for Middle Eastern and European market access.',
  },
]

export default function GlobalPresence() {
  const [activeOffice, setActiveOffice] = useState<string | null>('tashkent')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const selectedOffice = offices.find((o) => o.id === activeOffice)

  return (
    <section id="global" className="section-padding relative overflow-hidden bg-navy-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 to-navy-950" />
        <div className="absolute inset-0 geometric-accent opacity-30" />
      </div>

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-gold-500 text-sm font-medium uppercase tracking-wider mb-4"
          >
            Global Presence
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-display text-white mb-6"
          >
            Connecting Uzbekistan to the World
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70"
          >
            Strategic offices in key global markets ensuring seamless international partnerships.
          </motion.p>
        </div>

        {/* Map and Offices */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] glass rounded-2xl p-8 overflow-hidden">
              {/* Simplified world map outline */}
              <svg
                viewBox="0 0 100 60"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Stylized continents */}
                <g fill="#1b3264" fillOpacity="0.5" stroke="#C9A962" strokeWidth="0.2" strokeOpacity="0.3">
                  {/* North America */}
                  <path d="M5,15 Q15,10 25,15 Q30,20 25,30 Q20,35 15,32 Q10,30 8,25 Q5,20 5,15Z" />
                  {/* South America */}
                  <path d="M18,38 Q25,35 28,42 Q30,50 25,55 Q20,52 18,45 Q17,40 18,38Z" />
                  {/* Europe */}
                  <path d="M42,18 Q48,15 52,18 Q55,22 52,28 Q48,30 44,28 Q40,25 42,18Z" />
                  {/* Africa */}
                  <path d="M45,32 Q52,30 55,35 Q58,42 55,50 Q50,52 45,48 Q42,40 45,32Z" />
                  {/* Asia */}
                  <path d="M55,15 Q70,10 85,18 Q90,25 88,35 Q80,40 70,38 Q60,35 55,28 Q52,22 55,15Z" />
                  {/* Australia */}
                  <path d="M78,45 Q85,42 88,48 Q85,52 80,52 Q75,50 78,45Z" />
                </g>

                {/* Connection lines from Tashkent */}
                <g stroke="#C9A962" strokeWidth="0.3" strokeDasharray="2 1">
                  <motion.line
                    x1="58" y1="35"
                    x2="85" y2="38"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <motion.line
                    x1="58" y1="35"
                    x2="22" y2="42"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  />
                  <motion.line
                    x1="58" y1="35"
                    x2="50" y2="40"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.9 }}
                  />
                </g>

                {/* Office markers */}
                {offices.map((office, index) => (
                  <g key={office.id}>
                    {/* Pulse animation for active */}
                    {activeOffice === office.id && (
                      <circle
                        cx={office.coordinates.x}
                        cy={office.coordinates.y}
                        r="4"
                        fill="#C9A962"
                        fillOpacity="0.3"
                      >
                        <animate
                          attributeName="r"
                          values="4;8;4"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.3;0;0.3"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    <motion.circle
                      cx={office.coordinates.x}
                      cy={office.coordinates.y}
                      r={office.id === 'tashkent' ? 2.5 : 1.8}
                      fill={activeOffice === office.id ? '#C9A962' : '#C9A962'}
                      fillOpacity={activeOffice === office.id ? 1 : 0.6}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      className="cursor-pointer"
                      onClick={() => setActiveOffice(office.id)}
                    />
                    {/* City label */}
                    <text
                      x={office.coordinates.x}
                      y={office.coordinates.y - 4}
                      textAnchor="middle"
                      className="fill-white text-[2px] font-medium"
                      opacity={activeOffice === office.id ? 1 : 0.5}
                    >
                      {office.city}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gold-500" />
                  <span>Headquarters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold-500/60" />
                  <span>Representative Office</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Office Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Office selector */}
            <div className="flex flex-wrap gap-3 mb-8">
              {offices.map((office) => (
                <button
                  key={office.id}
                  onClick={() => setActiveOffice(office.id)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    activeOffice === office.id
                      ? 'bg-gold-500 text-navy-900'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  )}
                >
                  {office.city}
                </button>
              ))}
            </div>

            {/* Selected office details */}
            {selectedOffice && (
              <motion.div
                key={selectedOffice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-gold-500 text-sm font-medium uppercase tracking-wider">
                      {selectedOffice.type}
                    </span>
                    <h3 className="font-serif text-heading-lg text-white mt-1">
                      {selectedOffice.city}, {selectedOffice.country}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-gold-500" />
                  </div>
                </div>

                <p className="text-white/70 mb-6">{selectedOffice.description}</p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/60">
                    <MapPin className="w-5 h-5 text-gold-500" />
                    <span>{selectedOffice.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <Phone className="w-5 h-5 text-gold-500" />
                    <span>{selectedOffice.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <Mail className="w-5 h-5 text-gold-500" />
                    <span>{selectedOffice.email}</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-gold-500 font-medium hover:gap-3 transition-all"
                >
                  Contact This Office
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
