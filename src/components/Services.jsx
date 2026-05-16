import { motion } from 'framer-motion'
import {
  Globe,
  Rocket,
  Smartphone,
  PenTool,
  RefreshCcw,
  Gem,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Website Design',
    desc: 'Modern, conversion-focused websites tailored to your brand and audience.',
    accent: 'from-electric-500/30 to-cyan-glow/30',
    glow: 'shadow-glow-blue',
  },
  {
    icon: Rocket,
    title: 'Landing Pages',
    desc: 'High-impact landing pages built to launch products and drive sign-ups.',
    accent: 'from-violet-glow/30 to-electric-500/30',
    glow: 'shadow-glow-violet',
  },
  {
    icon: Smartphone,
    title: 'Responsive Development',
    desc: 'Pixel-perfect React builds that feel premium on every screen.',
    accent: 'from-cyan-glow/30 to-electric-500/30',
    glow: 'shadow-glow-cyan',
  },
  {
    icon: PenTool,
    title: 'UI/UX Design',
    desc: 'Thoughtful flows and interface systems that feel intuitive and refined.',
    accent: 'from-violet-glow/30 to-cyan-glow/30',
    glow: 'shadow-glow-violet',
  },
  {
    icon: RefreshCcw,
    title: 'Website Redesign',
    desc: 'Modernize dated sites into fast, on-brand experiences without losing momentum.',
    accent: 'from-electric-500/30 to-violet-glow/30',
    glow: 'shadow-glow-blue',
  },
  {
    icon: Gem,
    title: 'Brand Identity',
    desc: 'Cohesive visual systems — logo, color, type — that scale across surfaces.',
    accent: 'from-cyan-glow/30 to-violet-glow/30',
    glow: 'shadow-glow-cyan',
  },
]

const card = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <Sparkles className="h-3 w-3 text-cyan-glow" />
            What We Do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="section-heading mt-5 max-w-3xl text-balance"
          >
            Services built for{' '}
            <span className="gradient-text">modern brands.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-2xl text-white/60 text-balance"
          >
            End-to-end web design, development, and identity work — delivered with
            studio-grade quality and startup speed.
          </motion.p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href="#contact"
              aria-label={`Inquire about ${s.title}`}
              custom={i}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8 }}
              className={`group relative block overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:border-white/20 hover:${s.glow}`}
            >
              {/* hover glow */}
              <div className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${s.accent} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative">
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${s.accent} border border-white/10 flex items-center justify-center`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>

                <div className="mt-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  Get a quote
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
