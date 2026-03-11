import { useState, useEffect, useCallback, useRef } from 'react'

const INTERACTIVE_SELECTOR = 'a, button, .card, .article-card, .back-button, .star-map__star-group, .theme-toggle, .sound-toggle, .night-toggle'
const MAX_EFFECTS = 5

export default function useCursorEffects() {
  const [splashes, setSplashes] = useState([])
  const [isTouch, setIsTouch] = useState(false)
  const idRef = useRef(0)

  useEffect(() => {
    setIsTouch(!window.matchMedia('(hover: hover)').matches)
  }, [])

  const addSplash = useCallback((x, y, size = 'small') => {
    const id = ++idRef.current
    setSplashes(prev => {
      const next = [...prev, { id, x, y, size }]
      return next.length > MAX_EFFECTS ? next.slice(-MAX_EFFECTS) : next
    })
    setTimeout(() => {
      setSplashes(prev => prev.filter(s => s.id !== id))
    }, 700)
  }, [])

  useEffect(() => {
    if (isTouch) return

    const handleClick = (e) => {
      addSplash(e.clientX, e.clientY, 'large')
    }

    const handleMouseEnter = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTOR)) {
        addSplash(e.clientX, e.clientY, 'small')
      }
    }

    window.addEventListener('click', handleClick)
    document.addEventListener('mouseenter', handleMouseEnter, true)

    return () => {
      window.removeEventListener('click', handleClick)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
    }
  }, [isTouch, addSplash])

  return { splashes, isTouch }
}
