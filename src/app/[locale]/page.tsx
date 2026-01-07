import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Associations from '@/components/sections/Associations'
import Projects from '@/components/sections/Projects'
import News from '@/components/sections/News'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#030712]">
      <Header />
      <Hero />
      <Services />
      <About />
      <Associations />
      <Projects />
      <News />
      <Contact />
      <Footer />
    </main>
  )
}
