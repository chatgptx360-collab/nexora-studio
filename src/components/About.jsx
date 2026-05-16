import { motion } from 'framer-motion'
import { Code2, Layers, Palette, Sparkles, Wand2, MonitorSmartphone } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

const highlights = [
  { icon: Palette, title: 'Web Design', desc: 'Pixel-perfect layouts with clear visual hierarchy.' },
  { icon: Code2, title: 'Frontend Dev', desc: 'Clean, fast React interfaces that feel alive.' },
  { icon: MonitorSmartphone, title: 'Responsive', desc: 'Flawless experience on every screen size.' },
  { icon: Layers, title: 'Branding', desc: 'Identity systems that resonate and scale.' },
  { icon: Sparkles, title: 'Modern UI/UX', desc: 'Interactions that feel premium and intentional.' },
  { icon: Wand2, title: 'AI-Assisted', desc: 'Modern tooling for faster, smarter shipping.' },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center text-center"
        >
          <div className="eyebrow">
            <Sparkles className="h-3 w-3 text-violet-glow" />
            About the Studio
          </div>
          <h2 className="section-heading mt-5 max-w-3xl text-balance">
            A studio obsessed with <span className="gradient-text">premium</span> digital craft.
          </h2>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-5 gap-8 items-stretch">
          {/* Big intro card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-3 gradient-border p-8 sm:p-10 rounded-3xl"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-electric-500 to-violet-glow flex items-center justify-center font-display font-bold text-xl">
                NX
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-500 to-violet-glow blur-lg opacity-50" />
              </div>
              <div>
                <div className="text-sm text-white/50">We are</div>
                <div className="font-display text-2xl font-semibold">Nexora Studio</div>
              </div>
            </div>

            <p className="mt-6 text-white/75 text-lg leading-relaxed">
              Nexora is a small, focused studio building
              <span className="text-white"> sleek, high-performing websites</span> for ambitious brands,
              creators, and startups.
            </p>
            <p className="mt-4 text-white/65 leading-relaxed">
              We blend thoughtful UI/UX, strong branding, and modern frontend engineering with
              AI-assisted workflows — so every project ships fast without compromising on craft.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { k: '40+', v: 'Projects' },
                { k: '15+', v: 'Brands' },
                { k: '100%', v: 'Client Focus' },
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl p-4 text-center">
                  <div className="font-display text-2xl font-bold gradient-text">{s.k}</div>
                  <div className="text-xs text-white/50 mt-1 uppercase tracking-widest">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlight grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-5 transition-all hover:bg-white/[0.06] hover:border-white/20"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-electric-500/30 to-violet-glow/30 border border-white/10 flex items-center justify-center">
                  <h.icon className="h-5 w-5 text-electric-400" />
                </div>
                <div className="mt-4 font-semibold">{h.title}</div>
                <div className="mt-1 text-sm text-white/55">{h.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
