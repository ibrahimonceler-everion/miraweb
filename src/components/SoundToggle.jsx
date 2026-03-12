import './SoundToggle.css'

export default function SoundToggle({ enabled, onToggle }) {
  return (
    <div className="sound-toggle">
      <button
        className={`sound-toggle__btn ${enabled ? 'sound-toggle__btn--active' : ''}`}
        onClick={onToggle}
        aria-label={enabled ? 'Sesi kapat' : 'Sesi aç'}
        title={enabled ? 'Ses Açık' : 'Ses Kapalı'}
      >
        <svg viewBox="0 0 20 20" className="sound-toggle__icon">
          {enabled ? (
            <>
              <path d="M10 3L5 7H2v6h3l5 4V3z" fill="currentColor" />
              <path d="M14 7.5c.7.7 1 1.6 1 2.5s-.3 1.8-1 2.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M16 5.5c1.3 1.3 2 3 2 4.5s-.7 3.2-2 4.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M10 3L5 7H2v6h3l5 4V3z" fill="currentColor" opacity="0.4" />
              <line x1="14" y1="7" x2="19" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="19" y1="7" x2="14" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>
    </div>
  )
}
