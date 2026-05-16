import { motion } from 'framer-motion'
import { Quote, Star, Sparkles } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Nexora delivered a launch site that felt months ahead of our competitors. The animations, the typography, the small details — everything just lands.',
    name: 'Amara Chen',
    role: 'Founder, Vellum AI',
    initials: 'AC',
    accent: 'from-electric-500 to-violet-glow',
  },
  {
    quote:
      'They redesigned our entire web presence in under three weeks. Conversions on our pricing page jumped 38% in the first month. Wildly impressed.',
    name: 'Daniel Okafor',
    role: 'CEO, Northwind Capital',
    initials: 'DO',
    accent: 'from-violet-glow to-cyan-glow',
  },
  {
    quote:
      'The team treated our brand like their own. Beautiful work, fast turnaround, and zero hand-holding required. I would hire Nexora again tomorrow.',
    name: 'Sofia Marín',
    role: 'Creative Director, Atelier 9',
    initials: 'SM',
    accent: 'from-cyan-glow to-electric-500',
  },
]

const card = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <Sparkles className="h-3 w-3 text-violet-glow" />
            Kind Words
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="section-heading mt-5 max-w-3xl text-balance"
          >
            Trusted by <span className="gradient-text">modern founders.</span>
          </motion.h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl glass p-7 flex flex-col transition-all duration-500 hover:border-white/20"
            >
              <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-electric-500/20 to-violet-glow/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Quote className="h-7 w-7 text-electric-400/70" />

              <p className="mt-5 text-white/80 leading-relaxed">"{t.quote}"</p>

              <div className="mt-6 flex items-center gap-1 text-amber-300">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                <div
                  className={`relative h-11 w-11 rounded-full bg-gradient-to-br ${t.accent} flex items-center justify-center font-display font-semibold text-sm`}
                >
                  {t.initials}
                  <span
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${t.accent} blur-md opacity-50`}
                  />
                </div>
                <div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-white/50">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-xs text-white/35"
        >
          Sample testimonials representing the kind of feedback we aim for —
          real client quotes will replace these as projects ship.
        </motion.p>
      </div>
    </section>
  )
}
