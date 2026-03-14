import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const path = window.location.pathname
    return path.startsWith('/en') ? 'en' : 'tr'
  })

  useEffect(() => {
    const target = lang === 'en' ? '/en' : '/'
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target)
    }
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    const onPopState = () => {
      setLang(window.location.pathname.startsWith('/en') ? 'en' : 'tr')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'tr' ? 'en' : 'tr')
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
