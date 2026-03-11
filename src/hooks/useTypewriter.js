import { useState, useEffect, useRef, useCallback } from 'react'

export default function useTypewriter({ text, speed = 45, delay = 0, enabled = true }) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const startTimeRef = useRef(null)
  const rafRef = useRef(null)

  const restart = useCallback(() => {
    indexRef.current = 0
    startTimeRef.current = null
    setDisplayed('')
    setIsComplete(false)
  }, [])

  useEffect(() => {
    if (!enabled || !text) return

    indexRef.current = 0
    startTimeRef.current = null
    setDisplayed('')
    setIsComplete(false)

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp

      const elapsed = timestamp - startTimeRef.current - delay
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      const targetIndex = Math.min(Math.floor(elapsed / speed), text.length)

      if (targetIndex !== indexRef.current) {
        indexRef.current = targetIndex
        setDisplayed(text.slice(0, targetIndex))
      }

      if (targetIndex >= text.length) {
        setIsComplete(true)
        return
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [text, speed, delay, enabled])

  return { displayedText: displayed, isComplete, restart }
}
