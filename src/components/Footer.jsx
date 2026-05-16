import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'Stack', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 px-4 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="glass-strong rounded-3xl px-6 sm:px-10 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="Nexora Studio"
                className="h-10 sm:h-11 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <div className="hidden sm:block text-xs text-white/45">
                Modern websites that elevate brands.
              </div>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Socials */}
            <div className="flex items-center gap-2">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="LinkedIn"
                className="h-10 w-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="GitHub"
                className="h-10 w-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@nexora.studio"
                aria-label="Email"
                className="h-10 w-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#top"
                aria-label="Back to top"
                className="ml-2 h-10 w-10 rounded-full bg-gradient-to-br from-electric-500 to-violet-glow flex items-center justify-center text-white hover:scale-105 transition"
              >
                <ArrowUp className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
            <div>© {new Date().getFullYear()} Nexora Studio. All rights reserved.</div>
            <div className="flex items-center gap-1">
              <span>Crafted with</span>
              <span className="gradient-text font-medium">React · Tailwind · Framer Motion</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
