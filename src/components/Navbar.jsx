import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Work', href: '#projects', id: 'projects' },
  { label: 'Stack', href: '#skills', id: 'skills' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('top')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['top', ...links.map((l) => l.id)]
    const observers = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${
          scrolled ? 'glass-strong shadow-glow-blue' : 'glass'
        }`}
      >
        <a
          href="#top"
          aria-label="Nexora Studio — home"
          className="group relative flex items-center"
        >
          <img
            src="/logo.png"
            alt="Nexora Studio"
            className="relative z-10 h-10 sm:h-12 w-auto object-contain"
            loading="eager"
            decoding="async"
          />
          <span className="pointer-events-none absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-electric-500/0 via-violet-glow/30 to-cyan-glow/0 opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = active === l.id
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-sm transition-colors rounded-full ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            )
          })}
        </nav>

        <a href="#contact" className="hidden md:inline-flex btn-primary !px-5 !py-2 text-sm">
          Let's Work
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full glass-strong"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-20 left-4 right-4 glass-strong rounded-2xl p-4 flex flex-col gap-1"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 text-sm rounded-xl transition ${
                  active === l.id
                    ? 'text-white bg-white/[0.07]'
                    : 'text-white/75 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 !py-2.5 text-sm"
            >
              Let's Work
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
