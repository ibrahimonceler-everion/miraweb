import { useState, useCallback, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Background from './components/Background'
import Magazine from './components/Magazine'
import CoverPage from './pages/CoverPage'
import YazilarPage from './pages/YazilarPage'
import KitaplarPage from './pages/KitaplarPage'
import SerbestPage from './pages/SerbestPage'
import GizliPage from './pages/GizliPage'
import InkTransition from './components/InkTransition'
import CursorEffects from './components/CursorEffects'
import useAmbientSound from './hooks/useAmbientSound'
import useKonamiCode from './hooks/useKonamiCode'

const pages = [
  { id: 'cover', component: CoverPage },
  { id: 'yazilar', component: YazilarPage },
  { id: 'siirler', component: KitaplarPage },
  { id: 'serbest', component: SerbestPage },
  { id: 'gizli', component: GizliPage },
]

function getInitialPage() {
  const path = window.location.pathname.replace(/^\//, '')
  if (!path) return 0
  const idx = pages.findIndex(p => p.id === path)
  return idx >= 0 ? idx : 0
}

function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage)
  const [direction, setDirection] = useState(1)
  const [clickOrigin, setClickOrigin] = useState(null)
  const magazineRef = useRef(null)
  const sound = useAmbientSound()
  const konami = useKonamiCode()

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '')
      const idx = pages.findIndex(p => p.id === path)
      setCurrentPage(idx >= 0 ? idx : 0)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (konami.triggered) {
      sound.triggerEasterEgg()
      setClickOrigin(null)
      setDirection(1)
      setCurrentPage(4)
      konami.reset()
    }
  }, [konami.triggered])

  const navigateTo = useCallback((pageIndex, event) => {
    if (pageIndex === currentPage) return
    sound.triggerPageTurn()
    if (event?.clientX) {
      const rect = magazineRef.current?.getBoundingClientRect()
      setClickOrigin({
        x: event.clientX - (rect?.left ?? 0),
        y: event.clientY - (rect?.top ?? 0),
      })
    } else {
      setClickOrigin(null)
    }
    setDirection(pageIndex > currentPage ? 1 : -1)
    setCurrentPage(pageIndex)
    const slug = pages[pageIndex].id === 'cover' ? '/' : `/${pages[pageIndex].id}`
    window.history.pushState(null, '', slug)
  }, [currentPage, sound])

  const goBack = useCallback((event) => {
    sound.triggerPageTurn()
    if (event?.clientX) {
      const rect = magazineRef.current?.getBoundingClientRect()
      setClickOrigin({
        x: event.clientX - (rect?.left ?? 0),
        y: event.clientY - (rect?.top ?? 0),
      })
    } else {
      setClickOrigin(null)
    }
    setDirection(-1)
    setCurrentPage(0)
    window.history.pushState(null, '', '/')
  }, [sound])

  const CurrentPageComponent = pages[currentPage].component

  return (
    <ThemeProvider>
    <LanguageProvider>
    <Background onNavigate={navigateTo}>
      <Magazine ref={magazineRef}>
        <AnimatePresence mode="wait" custom={direction}>
          <InkTransition
            key={pages[currentPage].id}
            direction={direction}
            origin={clickOrigin}
          >
            <CurrentPageComponent
              onNavigate={navigateTo}
              onBack={goBack}
              iscover={currentPage === 0}
            />
          </InkTransition>
        </AnimatePresence>
      </Magazine>
    </Background>
    <CursorEffects />
    </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
