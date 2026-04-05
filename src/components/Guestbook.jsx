import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useGuestbook from '../hooks/useGuestbook'
import './Guestbook.css'

const MAX_MSG = 140
const DAY = 86400000

// Gül mürekkebi paleti — renk client tarafında belirlenir,
// böylece eski notlar da otomatik uyumlu olur
const INK_PALETTE = [
  '#b26d83', '#9e5870', '#a35f70', '#ae687e',
  '#8a4d63', '#b87692', '#a85f7a', '#956275',
]

function pickInkColor(id) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  return INK_PALETTE[Math.abs(h) % INK_PALETTE.length]
}

function getAge(ts) {
  const diff = Date.now() - ts
  if (diff < DAY) return 'fresh'
  if (diff < 7 * DAY) return 'recent'
  if (diff < 30 * DAY) return 'old'
  return 'ancient'
}

function formatDate(ts) {
  const diff = Date.now() - ts
  if (diff < 60000) return 'az önce'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} dakika önce`
  if (diff < DAY) return `${Math.floor(diff / 3600000)} saat önce`
  const d = new Date(ts)
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function hashSeed(id) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  return Math.abs(h) % 1000
}

// id'den deterministik rastgelelik üret — her damlada sabit "dağılım" için
function seededRandom(seed) {
  let s = seed | 0
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

// Damlanın etrafına sıçrayan küçük noktalar üret
function generateSplatters(id, count = 4) {
  const rand = seededRandom(hashSeed(id))
  const splatters = []
  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2
    const distance = 8 + rand() * 6
    const r = 0.6 + rand() * 1.4
    splatters.push({
      cx: Math.cos(angle) * distance,
      cy: Math.sin(angle) * distance,
      r,
      opacity: 0.35 + rand() * 0.4,
    })
  }
  return splatters
}

function getEdgeStyle(edge, offset) {
  const pct = `${(offset * 100).toFixed(2)}%`
  switch (edge) {
    case 'top': return { top: '6px', left: pct }
    case 'bottom': return { bottom: '6px', left: pct }
    case 'left': return { left: '6px', top: pct }
    case 'right': return { right: '6px', top: pct }
    default: return {}
  }
}

function getCenterOrigin(edge) {
  // Yeni not: sayfanın merkezinden damlanın kenarına doğru düşer
  switch (edge) {
    case 'top': return { x: 0, y: '38vh' }
    case 'bottom': return { x: 0, y: '-38vh' }
    case 'left': return { x: '32vw', y: 0 }
    case 'right': return { x: '-32vw', y: 0 }
    default: return { x: 0, y: 0 }
  }
}

function InkDrop({ note, onClick, isNew }) {
  const age = getAge(note.createdAt)
  const seed = hashSeed(note.id)
  const spreadDelay = (seed % 400) / 100
  const spreadDuration = 6 + (seed % 400) / 100 // 6 - 10s
  const inkColor = pickInkColor(note.id)
  const style = {
    '--ink-color': inkColor,
    '--ink-size': `${Math.round(note.size * 22)}px`,
    '--spread-delay': `${spreadDelay}s`,
    '--spread-duration': `${spreadDuration}s`,
    ...getEdgeStyle(note.edge, note.offset),
  }

  const initial = isNew
    ? { ...getCenterOrigin(note.edge), scale: 1.4, opacity: 0, filter: 'blur(8px)' }
    : { x: 0, y: 0, scale: 0.2, opacity: 0, filter: 'blur(6px)' }

  const transition = isNew
    ? {
        x: { type: 'spring', stiffness: 60, damping: 14 },
        y: { type: 'spring', stiffness: 60, damping: 14 },
        scale: { type: 'spring', stiffness: 90, damping: 10, delay: 0.1 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.7, delay: 0.2 },
      }
    : {
        scale: { type: 'spring', stiffness: 120, damping: 11, delay: (seed % 500) / 1000 },
        opacity: { duration: 0.6, delay: (seed % 500) / 1000 },
        filter: { duration: 0.8, delay: (seed % 500) / 1000 },
      }

  return (
    <motion.button
      className={`ink-drop ink-drop--${age} ink-drop--${note.edge}${isNew ? ' ink-drop--new' : ''}`}
      style={style}
      initial={initial}
      animate={{ x: 0, y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
      transition={transition}
      onClick={(e) => { e.stopPropagation(); onClick(note) }}
      aria-label={`${note.author || 'anonim'} tarafından bırakılan not`}
    >
      <svg viewBox="-16 -16 32 32" className="ink-drop__svg" aria-hidden="true">
        <defs>
          <filter id={`ink-${note.id}`} x="-100%" y="-100%" width="300%" height="300%">
            <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="3" seed={hashSeed(note.id)} />
            <feDisplacementMap in="SourceGraphic" scale="6" />
          </filter>
          <filter id={`ink-soft-${note.id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={hashSeed(note.id) + 1} />
            <feDisplacementMap in="SourceGraphic" scale="2" />
          </filter>
        </defs>
        {/* Ana damla — yumuşak dış halo (yayılma-çekilme animasyonu) */}
        <circle className="ink-drop__halo" r="8" fill="var(--ink-color)" opacity="0.22" filter={`url(#ink-${note.id})`} />
        {/* Ana damla — iç gövde */}
        <circle r="6" fill="var(--ink-color)" filter={`url(#ink-${note.id})`} />
        {/* Işık yansıması — üst sol */}
        <circle r="1.6" cx="-1.8" cy="-2" fill="var(--ink-color)" opacity="0.35" filter={`url(#ink-soft-${note.id})`} />
        {/* Etrafa sıçrayan mürekkep noktaları */}
        {generateSplatters(note.id).map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="var(--ink-color)"
            opacity={s.opacity}
            filter={`url(#ink-soft-${note.id})`}
          />
        ))}
      </svg>
    </motion.button>
  )
}

export default function Guestbook() {
  const { notes, submit, submitting, error, clearError } = useGuestbook()
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  // Mount zamanından sonra eklenen notları "yeni" say — farklı animasyon
  const mountedAt = useRef(Date.now())
  const [message, setMessage] = useState('')
  const [author, setAuthor] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [successMsg, setSuccessMsg] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim() || submitting) return
    const result = await submit({
      message: message.trim(),
      author: author.trim(),
      website,
    })
    if (result.ok) {
      setMessage('')
      setAuthor('')
      setSuccessMsg('Mürekkebin sayfaya düştü.')
      setTimeout(() => {
        setPanelOpen(false)
        setSuccessMsg(null)
      }, 1600)
    }
  }

  const closePanel = () => {
    if (submitting) return
    setPanelOpen(false)
    setSuccessMsg(null)
    clearError()
  }

  return (
    <>
      <div className="guestbook-drops" aria-hidden={panelOpen || !!selectedNote}>
        {notes.map(note => (
          <InkDrop
            key={note.id}
            note={note}
            onClick={setSelectedNote}
            isNew={note.createdAt > mountedAt.current}
          />
        ))}
      </div>

      <button
        className="guestbook-pen"
        onClick={() => setPanelOpen(true)}
        aria-label="Misafir defterine yaz"
        title="Bir mürekkep damlası bırak"
      >
        <svg viewBox="0 0 20 20" className="guestbook-pen__icon" aria-hidden="true">
          <path d="M13.5 2.5l4 4-10.5 10.5H3v-4L13.5 2.5z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M12 4l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="4" cy="16" r="0.8" fill="currentColor" />
        </svg>
      </button>

      <AnimatePresence>
        {selectedNote && (
          <motion.div
            key="card-backdrop"
            className="guestbook-card-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              className="guestbook-card"
              initial={{ scale: 0.85, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 12, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="guestbook-card__message">{selectedNote.message}</p>
              <footer className="guestbook-card__footer">
                <span className="guestbook-card__author">
                  — {selectedNote.author || 'anonim'}
                </span>
                <span className="guestbook-card__date">
                  {formatDate(selectedNote.createdAt)}
                </span>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {panelOpen && (
          <motion.div
            key="panel-backdrop"
            className="guestbook-panel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
          >
            <motion.form
              className="guestbook-panel"
              initial={{ x: 420, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 420, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
            >
              <header className="guestbook-panel__header">
                <h2 className="guestbook-panel__title">Misafir Defteri</h2>
                <button
                  type="button"
                  className="guestbook-panel__close"
                  onClick={closePanel}
                  aria-label="Kapat"
                >×</button>
              </header>
              <p className="guestbook-panel__hint">
                Sayfaya bir mürekkep damlası bırak. Küçük bir iz, bir satır.
              </p>

              <label className="guestbook-panel__label">
                <span>İsim <small>opsiyonel</small></span>
                <input
                  type="text"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  maxLength={24}
                  placeholder="anonim"
                  disabled={submitting}
                />
              </label>

              <label className="guestbook-panel__label">
                <span>Not <small>{message.length}/{MAX_MSG}</small></span>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value.slice(0, MAX_MSG))}
                  rows={4}
                  placeholder="Bir satır, bir iz..."
                  required
                  disabled={submitting}
                />
              </label>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                tabIndex="-1"
                autoComplete="off"
                className="guestbook-panel__honeypot"
                aria-hidden="true"
              />

              {error && <p className="guestbook-panel__error">{error}</p>}
              {successMsg && <p className="guestbook-panel__success">{successMsg}</p>}

              <div className="guestbook-panel__actions">
                <button
                  type="button"
                  onClick={closePanel}
                  className="guestbook-panel__btn guestbook-panel__btn--ghost"
                  disabled={submitting}
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={submitting || !message.trim()}
                  className="guestbook-panel__btn"
                >
                  {submitting ? 'Damla düşüyor...' : 'Bırak'}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
