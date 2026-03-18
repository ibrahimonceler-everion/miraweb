import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const ThemeContext = createContext()

const THEME_COLORS = {
  'pastel-pink': {
    bgGradient: ['#FDF5F7', '#FAF0F3', '#F8E8EE', '#FDF5F7'],
    bgGlow: ['rgba(232,160,180,0.08)', 'rgba(192,112,136,0.04)'],
    shapes: [
      'rgba(232,160,180,', 'rgba(192,112,136,', 'rgba(212,132,154,',
      'rgba(200,150,170,', 'rgba(180,120,140,',
    ],
    logo: {
      glow: '#E8A0B4', wing1: '#D4708A', wing2: '#C06078',
      crown: '#D4708A', letter: '#C07088', sparkle: '#D4708A',
      jewel: '#E8A0B4',
    },
  },
}

const NIGHT_COLORS = {
  bgGradient: ['#2C2218', '#261E15', '#201A10', '#1A150C'],
  bgGlow: ['rgba(200,170,120,0.06)', 'rgba(180,150,100,0.03)'],
  shapes: [
    'rgba(200,170,120,', 'rgba(160,130,80,', 'rgba(140,110,70,',
    'rgba(180,150,100,', 'rgba(120,90,60,',
  ],
  logo: {
    glow: '#D4B896', wing1: '#C8A878', wing2: '#B89868',
    crown: '#C8A878', letter: '#D4B896', sparkle: '#C8A878',
    jewel: '#D4B896',
  },
}

export function ThemeProvider({ children }) {
  const theme = 'pastel-pink'

  const [nightMode, setNightMode] = useState(() => {
    try {
      return localStorage.getItem('miraweb-night') === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-night', nightMode)
    try { localStorage.setItem('miraweb-night', String(nightMode)) } catch {}
  }, [nightMode])

  const toggleNight = useCallback(() => {
    setNightMode(prev => !prev)
  }, [])

  const colors = useMemo(() => nightMode ? NIGHT_COLORS : THEME_COLORS[theme], [nightMode])

  const value = useMemo(() => ({
    theme, colors, nightMode, toggleNight,
  }), [colors, nightMode, toggleNight])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
