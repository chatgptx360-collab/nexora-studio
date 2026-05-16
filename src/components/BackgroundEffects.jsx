import { motion } from 'framer-motion'

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.10),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(34,211,238,0.08),_transparent_50%)]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />

      {/* Floating orbs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-electric-500/30 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-violet-glow/25 blur-[140px]"
        animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[24rem] w-[24rem] rounded-full bg-cyan-glow/20 blur-[120px]"
        animate={{ x: [0, 30, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.6)_100%)]" />
    </div>
  )
}
