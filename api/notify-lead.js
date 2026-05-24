// Serverless Telegram notifier for new contact-form leads.
//
// The bot token lives ONLY in Vercel environment variables and never reaches
// the browser — the client just POSTs the lead here. From the client's point
// of view this is fire-and-forget: email (Formspree) is the source of truth,
// so a failure here never blocks the visitor.
//
// Required env vars (set in Vercel → Settings → Environment Variables):
//   TELEGRAM_BOT_TOKEN — from @BotFather
//   TELEGRAM_CHAT_ID   — your chat id (from getUpdates after messaging the bot)

const MAX = { name: 100, email: 200, message: 5000 }

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  if (!chunks.length) return {}
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return {}
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  // Browsers set Origin and JS cannot forge it, so this blocks casual
  // cross-site abuse. Requests with no Origin (some same-origin/non-browser
  // clients) are allowed since the payload is low-risk (owner-only ping).
  // Add a custom domain here if/when one is connected.
  const origin = req.headers.origin
  if (origin && !/^https?:\/\/(localhost(:\d+)?|[a-z0-9-]+\.vercel\.app)$/i.test(origin)) {
    return res.status(403).json({ ok: false, error: 'Forbidden origin' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  // Not configured yet → silent no-op so the client never sees an error.
  if (!token || !chatId) {
    return res.status(200).json({ ok: true, skipped: 'not_configured' })
  }

  const body = await readJson(req)

  // Honeypot backstop: a filled trap field means a bot — drop silently.
  if (clean(body._gotcha, 50)) {
    return res.status(200).json({ ok: true, skipped: 'honeypot' })
  }

  const name = clean(body.name, MAX.name)
  const email = clean(body.email, MAX.email)
  const message = clean(body.message, MAX.message)
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' })
  }

  const text =
    '🚀 <b>New Nexora Studio Lead</b>\n\n' +
    `👤 <b>Name:</b> ${escapeHtml(name)}\n` +
    `✉️ <b>Email:</b> ${escapeHtml(email)}\n\n` +
    `💬 <b>Message:</b>\n${escapeHtml(message)}\n\n` +
    `🕒 ${new Date().toUTCString()}`

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
    if (!tgRes.ok) {
      const detail = await tgRes.text().catch(() => '')
      console.error('Telegram API error:', tgRes.status, detail)
      return res.status(502).json({ ok: false, error: 'Telegram send failed' })
    }
  } catch (err) {
    console.error('Telegram notify failed:', err)
    return res.status(502).json({ ok: false, error: 'Telegram unreachable' })
  }

  return res.status(200).json({ ok: true })
}
