import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useGuestbook from '../hooks/useGuestbook'
import './Guestbook.css'

const MAX_MSG = 140
const DAY = 86400000

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

function InkDrop({ note, onClick }) {
  const age = getAge(note.createdAt)
  const style = {
    '--ink-color': note.color,
    '--ink-size': `${Math.round(note.size * 20)}px`,
    ...getEdgeStyle(note.edge, note.offset),
  }
  return (
    <motion.button
      className={`ink-drop ink-drop--${age} ink-drop--${note.edge}`}
      style={style}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 14, delay: Math.random() * 0.4 }}
      onClick={(e) => { e.stopPropagation(); onClick(note) }}
      aria-label={`${note.author || 'anonim'} tarafından bırakılan not`}
    >
      <svg viewBox="-10 -10 20 20" className="ink-drop__svg" aria-hidden="true">
        <defs>
          <filter id={`ink-${note.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed={hashSeed(note.id)} />
            <feDisplacementMap in="SourceGraphic" scale="3.5" />
          </filter>
        </defs>
        <circle r="7" fill="var(--ink-color)" filter={`url(#ink-${note.id})`} />
        <circle r="2" cx="-2" cy="-2" fill="var(--ink-color)" opacity="0.5" />
      </svg>
    </motion.button>
  )
}

export default function Guestbook() {
  const { notes, submit, submitting, error, clearError } = useGuestbook()
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
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
          <InkDrop key={note.id} note={note} onClick={setSelectedNote} />
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
