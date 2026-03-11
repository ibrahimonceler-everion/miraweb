import { useTheme } from '../context/ThemeContext'
import './NightModeToggle.css'

export default function NightModeToggle() {
  const { nightMode, toggleNight } = useTheme()

  return (
    <button
      className={`night-toggle ${nightMode ? 'night-toggle--active' : ''}`}
      onClick={toggleNight}
      aria-label={nightMode ? 'Gece modu kapat' : 'Gece modu aç'}
      title={nightMode ? 'Gece Modu' : 'Okuma Modu'}
    >
      <svg viewBox="0 0 20 20" className="night-toggle__icon">
        {nightMode ? (
          <path d="M10 3a1 1 0 011 1v1a1 1 0 01-2 0V4a1 1 0 011-1zm0 11a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zm7-4a1 1 0 010 2h-1a1 1 0 010-2h1zM5 10a1 1 0 010 2H4a1 1 0 010-2h1zm10.66-4.66a1 1 0 010 1.42l-.7.7a1 1 0 01-1.42-1.42l.7-.7a1 1 0 011.42 0zM6.46 13.54a1 1 0 010 1.42l-.7.7a1 1 0 01-1.42-1.42l.7-.7a1 1 0 011.42 0zm8.48 0a1 1 0 011.42 0l.7.7a1 1 0 01-1.42 1.42l-.7-.7a1 1 0 010-1.42zM5.76 5.34a1 1 0 011.42 0l.7.7a1 1 0 01-1.42 1.42l-.7-.7a1 1 0 010-1.42zM10 7a3 3 0 100 6 3 3 0 000-6z"
            fill="currentColor" />
        ) : (
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.003 8.003 0 1010.586 10.586z"
            fill="currentColor" />
        )}
      </svg>
    </button>
  )
}
