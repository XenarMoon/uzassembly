'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowLeft, Building2, MapPin, Calendar, TrendingUp, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const projects = [
  {
    id: 1,
    title: 'Central Asia Smart City',
    value: '$20B',
    location: 'Tashkent Region',
    status: 'In Development',
    progress: 25,
    description: 'A groundbreaking urban development project creating a sustainable, technology-driven metropolis serving as Central Asia\'s economic hub.',
    partners: ['International Investors', 'Government of Uzbekistan', 'Tech Consortium'],
    highlights: ['500,000 residents capacity', '100% renewable energy', 'Smart infrastructure'],
    featured: true,
  },
  {
    id: 2,
    title: 'Tashkent Metro Expansion',
    value: '$2.5B',
    location: 'Tashkent',
    status: 'Active',
    progress: 45,
    description: 'Expanding the metro network with new lines and modern stations to serve growing urban population.',
    partners: ['Transport Ministry', 'Asian Development Bank'],
    highlights: ['3 new lines', '28 new stations', 'Automated systems'],
    featured: false,
  },
  {
    id: 3,
    title: 'Industrial Free Zones',
    value: '$5B',
    location: 'Multiple Regions',
    status: 'Active',
    progress: 60,
    description: 'Development of special economic zones with tax incentives and modern infrastructure for manufacturing.',
    partners: ['Ministry of Investment', 'Foreign Industrial Partners'],
    highlights: ['15 zones', 'Tax benefits', 'Export-oriented'],
    featured: false,
  },
  {
    id: 4,
    title: 'Ring Road Project',
    value: '$1.8B',
    location: 'Tashkent',
    status: 'In Progress',
    progress: 35,
    description: 'Modern highway ring around Tashkent improving logistics and reducing urban congestion.',
    partners: ['Road Authority', 'International Contractors'],
    highlights: ['180km highway', 'Smart traffic', 'Green corridors'],
    featured: false,
  },
  {
    id: 5,
    title: 'Healthcare Modernization',
    value: '$800M',
    location: 'Nationwide',
    status: 'Active',
    progress: 40,
    description: 'Construction and equipping of modern hospitals and medical centers across Uzbekistan.',
    partners: ['Ministry of Health', 'Medical Equipment Suppliers'],
    highlights: ['50 hospitals', 'Telemedicine', 'Training centers'],
    featured: false,
  },
]

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const featuredProject = projects[0]
  const otherProjects = projects.slice(1)

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % otherProjects.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + otherProjects.length) % otherProjects.length)
  }

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-navy-950 to-transparent" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-gold-500 text-sm font-medium uppercase tracking-wider mb-4"
          >
            Flagship Projects
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-display text-white mb-6 heading-decoration"
          >
            Transforming Vision Into Reality
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70"
          >
            Managing and facilitating major investment projects that shape
            Uzbekistan&apos;s economic future.
          </motion.p>
        </div>

        {/* Featured Project - Smart City */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="relative glass rounded-3xl overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/30 via-transparent to-navy-600/30" />
              <div className="absolute inset-0 geometric-accent" />
            </div>

            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left - Project Info */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-gold-500/20 text-gold-500 text-sm font-medium">
                      Mega Project
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                      {featuredProject.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-heading-xl md:text-display text-white mb-4">
                    {featuredProject.title}
                  </h3>

                  <p className="text-white/70 text-lg mb-8 leading-relaxed">
                    {featuredProject.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-gold-500" />
                      </div>
                      <div>
                        <div className="text-2xl font-serif font-bold text-gold-500">{featuredProject.value}</div>
                        <div className="text-white/50 text-xs">Investment</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-gold-500" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{featuredProject.location}</div>
                        <div className="text-white/50 text-xs">Location</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-gold-500" />
                      </div>
                      <div>
                        <div className="text-white font-medium">500K+</div>
                        <div className="text-white/50 text-xs">Capacity</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">Project Progress</span>
                      <span className="text-gold-500 font-medium">{featuredProject.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${featuredProject.progress}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
                      />
                    </div>
                  </div>

                  <a href="#contact" className="btn-primary inline-flex">
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </div>

                {/* Right - Visual */}
                <div className="relative">
                  {/* Abstract city visualization */}
                  <div className="aspect-square relative">
                    <div className="absolute inset-0 bg-gradient-radial from-gold-500/20 via-transparent to-transparent rounded-full" />

                    {/* Stylized building visualization */}
                    <svg
                      viewBox="0 0 400 400"
                      className="w-full h-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Base platform */}
                      <ellipse cx="200" cy="350" rx="150" ry="30" fill="#C9A962" fillOpacity="0.1" />

                      {/* Buildings */}
                      <g>
                        {/* Central tower */}
                        <rect x="170" y="120" width="60" height="200" fill="url(#buildingGrad)" rx="4" />
                        <rect x="175" y="125" width="50" height="10" fill="#C9A962" fillOpacity="0.3" />
                        {[0.45, 0.6, 0.35, 0.7, 0.5, 0.55, 0.4, 0.65, 0.5, 0.75, 0.45, 0.6, 0.55, 0.4, 0.7].map((opacity, i) => (
                          <rect
                            key={`window-c-${i}`}
                            x="180"
                            y={145 + i * 12}
                            width="8"
                            height="6"
                            fill="#C9A962"
                            fillOpacity={opacity}
                          />
                        ))}
                        {[0.5, 0.65, 0.4, 0.55, 0.7, 0.45, 0.6, 0.35, 0.75, 0.5, 0.55, 0.4, 0.65, 0.5, 0.45].map((opacity, i) => (
                          <rect
                            key={`window-c2-${i}`}
                            x="212"
                            y={145 + i * 12}
                            width="8"
                            height="6"
                            fill="#C9A962"
                            fillOpacity={opacity}
                          />
                        ))}

                        {/* Left building */}
                        <rect x="100" y="180" width="50" height="140" fill="url(#buildingGrad)" rx="4" />
                        {[0.4, 0.55, 0.35, 0.6, 0.45, 0.5, 0.65, 0.4, 0.55, 0.5].map((opacity, i) => (
                          <rect
                            key={`window-l-${i}`}
                            x="110"
                            y={190 + i * 12}
                            width="6"
                            height="5"
                            fill="#C9A962"
                            fillOpacity={opacity}
                          />
                        ))}

                        {/* Right building */}
                        <rect x="250" y="160" width="55" height="160" fill="url(#buildingGrad)" rx="4" />
                        {[0.5, 0.4, 0.6, 0.45, 0.55, 0.35, 0.65, 0.5, 0.4, 0.55, 0.45, 0.6].map((opacity, i) => (
                          <rect
                            key={`window-r-${i}`}
                            x="262"
                            y={170 + i * 12}
                            width="6"
                            height="5"
                            fill="#C9A962"
                            fillOpacity={opacity}
                          />
                        ))}

                        {/* Far left */}
                        <rect x="60" y="220" width="35" height="100" fill="url(#buildingGrad)" rx="3" />

                        {/* Far right */}
                        <rect x="315" y="200" width="35" height="120" fill="url(#buildingGrad)" rx="3" />
                      </g>

                      {/* Connecting lines (infrastructure) */}
                      <g stroke="#C9A962" strokeWidth="0.5" strokeOpacity="0.3">
                        <line x1="125" y1="320" x2="200" y2="320" />
                        <line x1="200" y1="320" x2="277" y2="320" />
                        <line x1="77" y1="320" x2="125" y2="320" />
                        <line x1="277" y1="320" x2="332" y2="320" />
                      </g>

                      {/* Glowing dots (smart points) */}
                      <g>
                        <circle cx="200" cy="115" r="4" fill="#C9A962">
                          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="125" cy="175" r="3" fill="#C9A962" fillOpacity="0.7">
                          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="277" cy="155" r="3" fill="#C9A962" fillOpacity="0.7">
                          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.8s" repeatCount="indefinite" />
                        </circle>
                      </g>

                      <defs>
                        <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#1b3264" />
                          <stop offset="100%" stopColor="#0A1628" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Highlights */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex flex-wrap gap-3">
                        {featuredProject.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-3 py-1.5 rounded-full bg-navy-900/80 backdrop-blur text-white/80 text-xs"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Projects Carousel */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-heading-lg text-white">More Projects</h3>
            <div className="flex gap-3">
              <button
                onClick={prevProject}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold-500 hover:border-gold-500 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextProject}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold-500 hover:border-gold-500 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="glass rounded-2xl p-6 card-hover group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gold-500" />
                  </div>
                  <span className={cn(
                    'px-2 py-0.5 rounded text-xs font-medium',
                    project.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                  )}>
                    {project.status}
                  </span>
                </div>

                <h4 className="font-serif text-lg text-white mb-2 group-hover:text-gold-500 transition-colors">
                  {project.title}
                </h4>

                <p className="text-white/50 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <div className="text-gold-500 font-serif font-bold">{project.value}</div>
                    <div className="text-white/40 text-xs">Investment</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/70 text-sm">{project.progress}%</div>
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold-500 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
