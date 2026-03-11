import { useState, useEffect, useRef, useCallback } from 'react'

export default function useKonamiCode(sequence = 'mira') {
  const [triggered, setTriggered] = useState(false)
  const bufferRef = useRef('')

  const reset = useCallback(() => setTriggered(false), [])

  useEffect(() => {
    const handler = (e) => {
      // Ignore if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      bufferRef.current += e.key.toLowerCase()
      if (bufferRef.current.length > sequence.length) {
        bufferRef.current = bufferRef.current.slice(-sequence.length)
      }
      if (bufferRef.current === sequence) {
        setTriggered(true)
        bufferRef.current = ''
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [sequence])

  return { triggered, reset }
}
