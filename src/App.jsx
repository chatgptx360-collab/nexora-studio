import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BackgroundEffects from './components/BackgroundEffects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Loader() {
  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-electric-500 border-r-violet-glow animate-spin" />
          <img
            src="/favicon.png"
            alt=""
            className="absolute inset-2 w-16 h-16 rounded-2xl object-contain"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric-500/20 to-violet-glow/20 blur-xl -z-10" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-sm tracking-[0.4em] text-white/50"
        >
          NEXORA · STUDIO
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

      <div className="relative min-h-screen w-full overflow-hidden">
        <BackgroundEffects />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Services />
          <Projects />
          <Skills />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
