import { motion } from 'framer-motion'
import {
  Atom,
  Wind,
  Activity,
  MonitorSmartphone,
  Layout,
  Gem,
  Wand2,
  Gauge,
  Sparkles,
} from 'lucide-react'

const skills = [
  { icon: Atom, name: 'React', tone: 'text-cyan-glow' },
  { icon: Wind, name: 'Tailwind CSS', tone: 'text-electric-400' },
  { icon: Activity, name: 'Framer Motion', tone: 'text-violet-glow' },
  { icon: MonitorSmartphone, name: 'Responsive Design', tone: 'text-cyan-glow' },
  { icon: Layout, name: 'UI / UX Design', tone: 'text-electric-400' },
  { icon: Gem, name: 'Branding', tone: 'text-violet-glow' },
  { icon: Wand2, name: 'AI-Assisted Dev', tone: 'text-cyan-glow' },
  { icon: Gauge, name: 'Performance', tone: 'text-electric-400' },
]

const card = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <Sparkles className="h-3 w-3 text-electric-400" />
            Tech Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="section-heading mt-5 max-w-3xl text-balance"
          >
            The tools behind the <span className="gradient-text">craft.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-xl text-white/60 text-balance"
          >
            A modern, production-tested stack chosen for speed, polish, and longevity.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              custom={i}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:border-white/20"
            >
              <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-electric-500/20 to-violet-glow/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col items-start">
                <div className="h-11 w-11 rounded-xl glass-strong border-white/10 flex items-center justify-center">
                  <s.icon className={`h-5 w-5 ${s.tone}`} />
                </div>
                <div className="mt-5 font-medium">{s.name}</div>
                <div className="mt-2 h-[1px] w-10 bg-gradient-to-r from-electric-500 to-violet-glow group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
