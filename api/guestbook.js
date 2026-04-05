import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const KEY = 'guestbook:notes'
const MAX_NOTES = 200
const MAX_MSG = 140
const MAX_NAME = 24
const RL_SECONDS = 300 // 5 dk IP başına

const INK_COLORS = [
  '#b26d83', '#9e5870', '#a35f70', '#ae687e',
  '#8a4d63', '#b87692', '#a85f7a', '#956275',
]
const EDGES = ['top', 'right', 'bottom', 'left']

// Basit içerik filtresi — TR + EN
const PROFANITY = [
  'fuck', 'shit', 'bitch', 'asshole', 'cunt', 'nigger', 'faggot',
  'amk', 'aq', 'oç', 'piç', 'sik', 'göt', 'orospu', 'yarrak', 'kahpe',
  'pezevenk', 'ibne', 'gavat',
]

function getIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string') return fwd.split(',')[0].trim()
  return req.headers['x-real-ip'] || 'unknown'
}

function sanitize(s) {
  return String(s || '')
    .replace(/[\x00-\x1f\x7f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function hasProfanity(s) {
  const lower = s.toLowerCase()
  return PROFANITY.some(w => lower.includes(w))
}

function parseNote(raw) {
  if (raw == null) return null
  if (typeof raw === 'object') return raw
  try { return JSON.parse(raw) } catch { return null }
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const raw = await redis.lrange(KEY, 0, MAX_NOTES - 1)
      const notes = (raw || []).map(parseNote).filter(Boolean)
      res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60')
      return res.status(200).json({ notes })
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
      const { message, author, website } = body

      // Honeypot — bot ise sessizce başarılı dön
      if (website) {
        return res.status(200).json({ ok: true })
      }

      const msg = sanitize(message).slice(0, MAX_MSG)
      const name = sanitize(author).slice(0, MAX_NAME)

      if (!msg) {
        return res.status(400).json({ error: 'Mesaj boş olamaz.' })
      }
      if (msg.length < 2) {
        return res.status(400).json({ error: 'Mesaj çok kısa.' })
      }
      if (hasProfanity(msg) || hasProfanity(name)) {
        return res.status(400).json({ error: 'Lütfen daha nazik bir dil.' })
      }

      // Rate limit
      const ip = getIp(req)
      const rlKey = `guestbook:rl:${ip}`
      const allowed = await redis.set(rlKey, '1', { nx: true, ex: RL_SECONDS })
      if (!allowed) {
        return res.status(429).json({ error: 'Biraz bekle, mürekkebin kuruması lazım.' })
      }

      const note = {
        id: (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) + Date.now().toString(36),
        message: msg,
        author: name || null,
        createdAt: Date.now(),
        color: INK_COLORS[Math.floor(Math.random() * INK_COLORS.length)],
        edge: EDGES[Math.floor(Math.random() * EDGES.length)],
        offset: Math.round(Math.random() * 1000) / 1000,
        size: Math.round((0.7 + Math.min(msg.length / MAX_MSG, 1) * 0.6) * 100) / 100,
      }

      await redis.lpush(KEY, JSON.stringify(note))
      await redis.ltrim(KEY, 0, MAX_NOTES - 1)

      return res.status(200).json({ ok: true, note })
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('guestbook api error', err)
    return res.status(500).json({ error: 'Sunucu hatası' })
  }
}
