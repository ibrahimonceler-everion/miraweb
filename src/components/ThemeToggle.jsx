import { useTheme, THEME_LABELS } from '../context/ThemeContext'
import './ThemeToggle.css'

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme()

  return (
    <button
      className="theme-toggle"
      onClick={cycleTheme}
      aria-label={`Tema: ${THEME_LABELS[theme]}`}
      title={THEME_LABELS[theme]}
    >
      <span className="theme-toggle__dot" />
      <span className="theme-toggle__label">{THEME_LABELS[theme]}</span>
    </button>
  )
}
