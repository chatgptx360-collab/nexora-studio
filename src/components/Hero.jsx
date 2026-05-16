import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Mail, Sparkles, Code2, Palette, Zap } from 'lucide-react'

const float = {
  animate: {
    y: [0, -16, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-24"
    >
      {/* Floating UI cards */}
      <motion.div
        {...float}
        className="hidden lg:block absolute top-32 left-12 w-44 glass rounded-2xl p-3 shadow-glow-blue"
      >
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-electric-500 to-cyan-glow flex items-center justify-center">
            <Code2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Stack</div>
            <div className="text-xs font-medium">React + Tailwind</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute top-48 right-16 w-48 glass rounded-2xl p-3 shadow-glow-violet"
      >
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-glow to-electric-500 flex items-center justify-center">
            <Palette className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Design</div>
            <div className="text-xs font-medium">Modern UI / UX</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute bottom-28 left-24 w-52 glass rounded-2xl p-3 shadow-glow-cyan"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Status</div>
            <div className="text-xs font-medium">Booking Q2 Projects</div>
          </div>
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute bottom-40 right-24 w-44 glass rounded-2xl p-3 shadow-glow-blue"
      >
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-glow to-violet-glow flex items-center justify-center">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Perf</div>
            <div className="text-xs font-medium">99 / 100 Lighthouse</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl text-center"
      >
        <motion.div variants={item} className="flex justify-center">
          <div className="eyebrow">
            <Sparkles className="h-3 w-3 text-electric-400" />
            <span>A Futuristic Digital Studio</span>
          </div>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 font-display font-bold text-balance leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-[88px]"
        >
          Modern Websites That{' '}
          <span className="gradient-text">Elevate Brands.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 mx-auto max-w-2xl text-base sm:text-lg text-white/65 text-balance"
        >
          Nexora Studio creates sleek, high-performing digital experiences for
          creators, startups, and modern businesses — designed to convert and
          built to scale.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="btn-primary group">
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#contact" className="btn-secondary group">
            <Mail className="h-4 w-4" />
            Let's Work
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          variants={item}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.25em] text-white/40"
        >
          <span>React</span>
          <span className="text-white/15">/</span>
          <span>Tailwind</span>
          <span className="text-white/15">/</span>
          <span>Framer Motion</span>
          <span className="text-white/15">/</span>
          <span>AI-Assisted</span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-10 w-[1.5px] origin-top bg-gradient-to-b from-white/60 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}
