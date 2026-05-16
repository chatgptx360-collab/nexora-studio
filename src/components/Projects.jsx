import { motion } from 'framer-motion'
import { ExternalLink, Github, Sparkles, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'AI Startup Landing Page',
    desc: 'A high-conversion launch page for a B2B AI platform — animated hero, pricing flows, and waitlist capture.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    accent: 'from-electric-500 via-violet-glow to-cyan-glow',
    mock: 'ai',
  },
  {
    title: 'Modern Restaurant Website',
    desc: 'A cinematic dining experience site with reservation flow, menu showcase, and immersive scroll storytelling.',
    tags: ['Next.js', 'Tailwind', 'GSAP'],
    accent: 'from-amber-400 via-rose-500 to-violet-glow',
    mock: 'restaurant',
  },
  {
    title: 'Creator Portfolio',
    desc: 'A bold personal portfolio for a content creator — clean typography, project case studies, and press kit.',
    tags: ['React', 'Framer Motion', 'CMS'],
    accent: 'from-violet-glow via-fuchsia-500 to-cyan-glow',
    mock: 'creator',
  },
  {
    title: 'School Website Redesign',
    desc: 'A complete redesign for a private school — modern admissions journey, news hub, and parent portal.',
    tags: ['React', 'Tailwind', 'Headless CMS'],
    accent: 'from-cyan-glow via-electric-500 to-violet-glow',
    mock: 'school',
  },
]

function Mock({ kind, accent }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-30`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.18),_transparent_55%)]" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />

      {/* Browser chrome */}
      <div className="absolute top-3 left-3 right-3 h-7 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-1.5 px-3">
        <span className="h-2 w-2 rounded-full bg-rose-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-[9px] font-mono text-white/40 truncate">nexora.studio/{kind}</span>
      </div>

      {/* Faux content */}
      <div className="absolute top-14 left-4 right-4 bottom-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 p-4 flex flex-col gap-2.5">
        <div className="h-2.5 w-2/3 rounded-full bg-white/30" />
        <div className="h-2 w-1/2 rounded-full bg-white/15" />
        <div className="mt-2 grid grid-cols-3 gap-2 flex-1">
          <div className="rounded-lg bg-white/10 border border-white/10" />
          <div className="rounded-lg bg-white/5 border border-white/10" />
          <div className="rounded-lg bg-white/15 border border-white/10" />
        </div>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-6 w-16 rounded-full bg-white/80" />
          <div className="h-6 w-16 rounded-full bg-white/15 border border-white/15" />
        </div>
      </div>
    </div>
  )
}

const card = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-4">
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
            Selected Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="section-heading mt-5 max-w-3xl text-balance"
          >
            Projects that <span className="gradient-text">ship & convert.</span>
          </motion.h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              custom={i}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl glass p-3 transition-all duration-500 hover:border-white/20 hover:shadow-glow-violet"
            >
              {/* Image */}
              <div className="relative h-60 sm:h-64 w-full rounded-2xl overflow-hidden">
                <Mock kind={p.mock} accent={p.accent} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <div className="flex gap-2">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Preview
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-strong text-xs font-medium hover:bg-white/10 transition"
                    >
                      <Github className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 pt-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <ArrowUpRight className="h-5 w-5 text-white/40 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-[11px] uppercase tracking-widest text-white/70 bg-white/[0.04] border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
