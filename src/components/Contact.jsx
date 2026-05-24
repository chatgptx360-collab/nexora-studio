import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Send,
  Linkedin,
  Github,
  Sparkles,
  CheckCircle2,
  User,
  MessageSquare,
} from 'lucide-react'

function Field({ icon: Icon, label, type = 'text', name, value, onChange, as = 'input' }) {
  const [focused, setFocused] = useState(false)
  const filled = value && value.length > 0
  const float = focused || filled

  return (
    <div className="relative">
      <div
        className={`relative rounded-2xl border transition-all duration-300 ${
          focused
            ? 'border-electric-500/60 bg-white/[0.05] shadow-glow-blue'
            : 'border-white/10 bg-white/[0.03]'
        }`}
      >
        <Icon
          className={`pointer-events-none absolute top-4 left-4 h-4 w-4 transition-colors ${
            focused ? 'text-electric-400' : 'text-white/40'
          }`}
        />
        <label
          className={`pointer-events-none absolute left-11 transition-all duration-200 ${
            float
              ? 'top-1.5 text-[10px] uppercase tracking-widest text-white/50'
              : 'top-1/2 -translate-y-1/2 text-sm text-white/50'
          } ${as === 'textarea' && float ? 'top-2.5' : ''} ${as === 'textarea' && !float ? 'top-4 translate-y-0' : ''}`}
        >
          {label}
        </label>
        {as === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={5}
            className="w-full bg-transparent outline-none pl-11 pr-4 pt-7 pb-3 text-sm text-white placeholder-transparent resize-none"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full h-14 bg-transparent outline-none pl-11 pr-4 pt-4 text-sm text-white placeholder-transparent"
          />
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 🔧 CONTACT FORM INTEGRATIONS
// ─────────────────────────────────────────────────────────────────────────────
// 1) Formspree — sends a real email to your inbox + auto-reply to the client.
//    This endpoint is public by design (visible in the network tab); it is
//    safe to keep in committed client-side source. Swap it at formspree.io.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykvdwvv'

// 2) Telegram instant-notification bot — pings your phone the moment a lead
//    lands. Create a bot via @BotFather on Telegram, then grab your chat id
//    from https://api.telegram.org/bot<TOKEN>/getUpdates after messaging it.
//    Leave the placeholder values to disable.
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID'

// Helper: fire-and-forget Telegram notification. Runs in parallel with
// Formspree and never blocks the user — if it fails, we silently log and
// the user still sees the success toast (the email is the source of truth).
async function notifyTelegram({ name, email, message }) {
  if (
    TELEGRAM_BOT_TOKEN.includes('YOUR_TELEGRAM_BOT_TOKEN') ||
    TELEGRAM_CHAT_ID.includes('YOUR_TELEGRAM_CHAT_ID')
  ) {
    return // not configured — skip silently
  }

  const text = [
    '🚀 *New Nexora Studio Lead*',
    '',
    `👤 *Name:* ${name}`,
    `✉️ *Email:* \`${email}\``,
    '',
    '💬 *Message:*',
    message,
    '',
    `🕒 ${new Date().toLocaleString()}`,
  ].join('\n')

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    })
  } catch (err) {
    // Notification is non-critical — log and move on.
    console.warn('Telegram notify failed:', err)
  }
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [botField, setBotField] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    // Honeypot: bots auto-fill every field, but humans never see this one.
    // Silently pretend success so the bot moves on without a real send.
    if (botField) {
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 5000)
      return
    }

    // Catch malformed emails client-side so they don't silently bounce.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      setTimeout(() => setError(''), 6000)
      return
    }

    setSending(true)
    setError('')

    // Dev fallback: if the endpoint hasn't been set yet, simulate a send
    // so the form still demos correctly. Real submissions kick in the
    // moment you paste in your Formspree endpoint above.
    const isConfigured = !FORMSPREE_ENDPOINT.includes('YOUR_FORMSPREE_ID')

    try {
      if (!isConfigured) {
        await new Promise((r) => setTimeout(r, 900))
      } else {
        // Fire Formspree + Telegram in parallel — Telegram failures
        // don't block the user, but Formspree errors do (it's the
        // source of truth).
        const [formspreeRes] = await Promise.all([
          fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              message: form.message,
              _subject: `New inquiry from ${form.name} — Nexora Studio`,
              _replyto: form.email,
              _gotcha: botField,
            }),
          }),
          notifyTelegram(form),
        ])

        if (!formspreeRes.ok) {
          const data = await formspreeRes.json().catch(() => ({}))
          throw new Error(data?.errors?.[0]?.message || 'Something went wrong')
        }
      }

      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch (err) {
      setError(err.message || 'Failed to send. Please try again or email hello@nexora.studio')
      setTimeout(() => setError(''), 6000)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative py-28 px-4">
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
            Get In Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="section-heading mt-5 max-w-3xl text-balance"
          >
            Let's build something{' '}
            <span className="gradient-text">unforgettable.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-xl text-white/60 text-balance"
          >
            Tell us about your project — we usually reply within 24 hours.
          </motion.p>
        </div>

        <div className="mt-16 grid lg:grid-cols-5 gap-6 items-stretch">
          {/* Side panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 gradient-border rounded-3xl p-7 flex flex-col"
          >
            <h3 className="font-display text-xl font-semibold">Talk to the studio</h3>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Booking new projects for the next quarter. Drop a message and we'll get back fast.
            </p>

            <div className="mt-7 space-y-4">
              <a
                href="mailto:hello@nexora.studio"
                className="flex items-center gap-3 group"
              >
                <div className="h-10 w-10 rounded-xl glass-strong flex items-center justify-center group-hover:bg-white/10 transition">
                  <Mail className="h-4 w-4 text-electric-400" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Email</div>
                  <div className="text-sm text-white/85 group-hover:text-white transition">
                    hello@nexora.studio
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-auto pt-8">
              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-3">
                Find us on
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="btn-secondary !px-4 !py-2 text-xs"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="btn-secondary !px-4 !py-2 text-xs"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
                <a
                  href="mailto:hello@nexora.studio"
                  className="btn-secondary !px-4 !py-2 text-xs"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={submit}
            className="lg:col-span-3 glass rounded-3xl p-7 flex flex-col gap-4"
          >
            {/* Honeypot: off-screen, hidden from humans — catches form-filling bots. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px', top: 0 }}>
              <label>
                Leave this field empty
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />
              </label>
            </div>

            <Field icon={User} label="Your name" name="name" value={form.name} onChange={update} />
            <Field
              icon={Mail}
              label="Email address"
              type="email"
              name="email"
              value={form.email}
              onChange={update}
            />
            <Field
              icon={MessageSquare}
              label="Tell us about your project"
              name="message"
              value={form.message}
              onChange={update}
              as="textarea"
            />

            <div className="mt-2 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-xs text-white/40">
                By submitting, you agree to be contacted about your project.
              </p>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary group disabled:opacity-70"
              >
                {sending ? 'Sending…' : 'Send Message'}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            <AnimatePresence>
              {sent && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-2 flex items-start gap-2 rounded-xl bg-emerald-400/10 border border-emerald-400/30 px-4 py-3 text-sm text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    Message received — thanks! We'll be in touch within 24 hours.
                  </span>
                </motion.div>
              )}
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-2 flex items-start gap-2 rounded-xl bg-rose-400/10 border border-rose-400/30 px-4 py-3 text-sm text-rose-300"
                >
                  <span className="mt-0.5">⚠</span>
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
