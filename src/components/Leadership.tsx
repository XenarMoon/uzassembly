'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Linkedin, Mail } from 'lucide-react'

const leadership = [
  {
    name: 'Umarov Mukhtor Mansurkhodjayevich',
    title: 'Chairman',
    role: 'Chairman of the Assembly',
    bio: 'Leading the Assembly of Economy of Uzbekistan with a vision to transform the nation\'s economic landscape and strengthen international partnerships.',
    featured: true,
  },
  {
    name: 'Matyakubov Jurabek Kuziyevich',
    title: 'Deputy Chairman',
    role: 'Executive Leadership',
    bio: 'Overseeing strategic operations and coordinating initiatives across all member associations.',
    featured: false,
  },
  {
    name: 'Radjabova Gulrukh Alisherovna',
    title: 'Director',
    role: 'Administrative Leadership',
    bio: 'Managing organizational operations and ensuring effective implementation of Assembly programs.',
    featured: false,
  },
  {
    name: 'Aliyev Sunnat Kamilovich',
    title: 'Deputy Chairman',
    role: 'Security and Legal Services',
    bio: 'Overseeing legal compliance and security matters for the Assembly and its member organizations.',
    featured: false,
  },
  {
    name: 'Ruzmatova Sabrina Rustambekovna',
    title: 'Deputy Chairperson',
    role: 'Women\'s Affairs',
    bio: 'Championing women\'s economic empowerment and gender equality initiatives across sectors.',
    featured: false,
  },
  {
    name: 'Ruziyeva Malika Bakhrom Qizi',
    title: 'Press Secretary & Deputy Chairperson',
    role: 'Information Policy',
    bio: 'Managing communications and media relations for the Uzbekistan Economic Assembly.',
    featured: false,
  },
  {
    name: 'Mirzarakhmatov Mirsulton Mirodil Ugli',
    title: 'Head of Department',
    role: 'State Agencies Relations',
    bio: 'Coordinating work with State Agencies of the Chairman Board and government partnerships.',
    featured: false,
  },
  {
    name: 'Ahmadova Sarvara Bakhtiyor Qizi',
    title: 'Assistant to the Chairperson',
    role: 'Youth Affairs',
    bio: 'Leading youth engagement initiatives and developing programs for young entrepreneurs.',
    featured: false,
  },
  {
    name: 'Aziz Ergashev',
    title: 'Deputy Chairman',
    role: 'Alternative Energy Association',
    bio: 'Chairman of the Alternative Energy Association, driving sustainable energy initiatives.',
    featured: false,
  },
  {
    name: 'Ruslan Sodikov',
    title: 'Deputy Chairman',
    role: 'Legal Affairs',
    bio: 'Founder of law firm "Gulyamov, Sodikov & Partners", providing legal expertise to the Assembly.',
    featured: false,
  },
  {
    name: 'Shohrukhmirzo Hamrakulov',
    title: 'Chief Expert',
    role: 'Uzbek-Japan Relations',
    bio: 'Specializing in fostering economic cooperation and partnerships between Uzbekistan and Japan.',
    featured: false,
  },
]

export default function Leadership() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const chairman = leadership.find((l) => l.featured)!
  const directors = leadership.filter((l) => !l.featured)

  return (
    <section id="leadership" className="section-padding relative bg-navy-900">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 pattern-uzbek" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent" />
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
            Rahbariyat
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-display text-white mb-6"
          >
            Iqtisodiy Mukammallikka Rahbarlik
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70"
          >
            O'zbekiston iqtisodiy transformatsiyasini boshqaruvchi tajribali rahbarlar.
          </motion.p>
        </div>

        {/* Chairman Featured Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="glass rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Photo placeholder */}
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-navy-700 to-navy-800 overflow-hidden relative">
                  {/* Abstract portrait placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gold-500/20 flex items-center justify-center">
                      <span className="font-serif text-4xl text-gold-500">UM</span>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-navy-900 to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold-500 text-navy-900 text-xs font-medium">
                    Chairman
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center">
                <span className="text-gold-500 text-sm font-medium uppercase tracking-wider mb-2">
                  {chairman.role}
                </span>
                <h3 className="font-serif text-heading-xl text-white mb-2">
                  {chairman.name}
                </h3>
                <p className="text-white/50 text-lg mb-6">{chairman.title}</p>
                <p className="text-white/70 leading-relaxed mb-8">
                  {chairman.bio}
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold-500/20 hover:text-gold-500 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold-500/20 hover:text-gold-500 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Directors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {directors.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="glass rounded-2xl p-6 card-hover group"
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy-700 to-navy-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="font-serif text-xl text-gold-500">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              <span className="text-gold-500 text-xs font-medium uppercase tracking-wider">
                {member.role}
              </span>
              <h4 className="font-serif text-lg text-white mt-1 mb-1 group-hover:text-gold-500 transition-colors">
                {member.name}
              </h4>
              <p className="text-white/50 text-sm mb-4">{member.title}</p>
              <p className="text-white/60 text-sm leading-relaxed">
                {member.bio}
              </p>

              <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
                <a
                  href="#"
                  className="p-2 rounded-lg bg-white/5 text-white/40 hover:bg-gold-500/20 hover:text-gold-500 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-white/5 text-white/40 hover:bg-gold-500/20 hover:text-gold-500 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
