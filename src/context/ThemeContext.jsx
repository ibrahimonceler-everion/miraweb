import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const ThemeContext = createContext()

export const THEMES = ['dark', 'light', 'rose', 'pastel-pink', 'dark-rose']

export const THEME_LABELS = {
  dark: 'Koyu',
  light: 'Aydınlık',
  rose: 'Gül',
  'pastel-pink': 'Pastel',
  'dark-rose': 'Bordo',
}

const THEME_COLORS = {
  dark: {
    bgGradient: ['#1E1215', '#150D10', '#0F0A0C', '#0A0608'],
    bgGlow: ['rgba(232,160,180,0.05)', 'rgba(201,169,110,0.02)'],
    shapes: [
      'rgba(232,160,180,', 'rgba(140,60,80,', 'rgba(100,45,60,',
      'rgba(201,169,110,', 'rgba(80,35,50,',
    ],
    logo: {
      glow: '#F5D5E0', wing1: '#F2C4D0', wing2: '#E8A0B4',
      crown: '#E8A0B4', letter: '#E8A0B4', sparkle: '#E8A0B4',
      jewel: '#F2C4D0',
    },
  },
  light: {
    bgGradient: ['#F5EDE5', '#F0E5DA', '#FAF6F2', '#F5F0EA'],
    bgGlow: ['rgba(196,112,138,0.06)', 'rgba(168,140,85,0.03)'],
    shapes: [
      'rgba(196,112,138,', 'rgba(168,140,85,', 'rgba(200,180,150,',
      'rgba(180,120,140,', 'rgba(160,130,110,',
    ],
    logo: {
      glow: '#E8C0D0', wing1: '#D4849A', wing2: '#C4708A',
      crown: '#C4708A', letter: '#A88C55', sparkle: '#C4708A',
      jewel: '#D4849A',
    },
  },
  rose: {
    bgGradient: ['#D890A4', '#D08098', '#C47090', '#C06888'],
    bgGlow: ['rgba(255,255,255,0.08)', 'rgba(245,213,192,0.05)'],
    shapes: [
      'rgba(255,255,255,', 'rgba(245,200,180,', 'rgba(200,80,120,',
      'rgba(245,213,192,', 'rgba(180,60,90,',
    ],
    logo: {
      glow: '#FFF5F0', wing1: '#FFF0E8', wing2: '#F5D5C0',
      crown: '#FFF0E8', letter: '#FFF5F0', sparkle: '#FFF0E8',
      jewel: '#FFFFFF',
    },
  },
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
  'dark-rose': {
    bgGradient: ['#3A1828', '#30101E', '#2A0E18', '#220A14'],
    bgGlow: ['rgba(240,184,200,0.06)', 'rgba(232,160,180,0.03)'],
    shapes: [
      'rgba(240,184,200,', 'rgba(180,80,110,', 'rgba(140,50,80,',
      'rgba(232,160,180,', 'rgba(100,30,55,',
    ],
    logo: {
      glow: '#F0B8C8', wing1: '#E8A0B4', wing2: '#D4849A',
      crown: '#E8A0B4', letter: '#F0B8C8', sparkle: '#E8A0B4',
      jewel: '#F0B8C8',
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
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('miraweb-theme') || 'dark'
    } catch {
      return 'dark'
    }
  })

  const [nightMode, setNightMode] = useState(() => {
    try {
      return localStorage.getItem('miraweb-night') === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('miraweb-theme', theme) } catch {}
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-night', nightMode)
    try { localStorage.setItem('miraweb-night', String(nightMode)) } catch {}
  }, [nightMode])

  const cycleTheme = useCallback(() => {
    setTheme(prev => {
      const idx = THEMES.indexOf(prev)
      return THEMES[(idx + 1) % THEMES.length]
    })
  }, [])

  const toggleNight = useCallback(() => {
    setNightMode(prev => !prev)
  }, [])

  const colors = useMemo(() => nightMode ? NIGHT_COLORS : THEME_COLORS[theme], [theme, nightMode])

  const value = useMemo(() => ({
    theme, setTheme, cycleTheme, colors, nightMode, toggleNight,
  }), [theme, cycleTheme, colors, nightMode, toggleNight])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
