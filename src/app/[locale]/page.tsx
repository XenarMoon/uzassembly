import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'

// Below-fold sections - lazy loaded for faster initial page load
const Services = dynamic(() => import('@/components/sections/Services'))
const About = dynamic(() => import('@/components/sections/About'))
const Associations = dynamic(() => import('@/components/sections/Associations'))
const Projects = dynamic(() => import('@/components/sections/Projects'))
const News = dynamic(() => import('@/components/sections/News'))
const Statistics = dynamic(() => import('@/components/sections/Statistics'))
const Partners = dynamic(() => import('@/components/sections/Partners'))
const Contact = dynamic(() => import('@/components/sections/Contact'))

export default function Home() {
  return (
    <main className="min-h-screen relative bg-primary-500">
      <Hero />
      <Services />
      <About />
      <Associations />
      <Projects />
      <News />
      <Statistics />
      <Partners />
      <Contact />
    </main>
  )
}
