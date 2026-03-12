import { useState, useCallback, useRef, useEffect } from 'react'
import { playPageTurn, playInkSplash, playEasterEggChime, createAmbientNature } from '../audio/SoundEngine'

export default function useAmbientSound() {
  const [enabled, setEnabled] = useState(true) // sound ON by default
  const [started, setStarted] = useState(false)
  const audioCtxRef = useRef(null)
  const ambientRef = useRef(null)
  const enabledRef = useRef(true)

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [])

  // Start ambient music
  const startAmbient = useCallback(() => {
    if (ambientRef.current) return
    try {
      const ctx = getCtx()
      ambientRef.current = createAmbientNature(ctx)
      setStarted(true)
    } catch {}
  }, [getCtx])

  // Stop ambient music
  const stopAmbient = useCallback(() => {
    if (ambientRef.current) {
      ambientRef.current.stop()
      ambientRef.current = null
      setStarted(false)
    }
  }, [])

  // Auto-start on first user interaction (browser autoplay policy requires gesture)
  useEffect(() => {
    function handleFirstInteraction() {
      if (enabledRef.current && !ambientRef.current) {
        startAmbient()
      }
      cleanup()
    }

    function cleanup() {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('scroll', handleFirstInteraction, true)
    }

    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)
    document.addEventListener('scroll', handleFirstInteraction, { capture: true })

    return cleanup
  }, [startAmbient])

  const triggerPageTurn = useCallback(() => {
    if (!enabledRef.current) return
    playPageTurn(getCtx())
  }, [getCtx])

  const triggerInkSplash = useCallback(() => {
    if (!enabledRef.current) return
    playInkSplash(getCtx())
  }, [getCtx])

  const triggerEasterEgg = useCallback(() => {
    if (!enabledRef.current) return
    playEasterEggChime(getCtx())
  }, [getCtx])

  // Single toggle: mute / unmute (also starts/stops ambient)
  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev
      enabledRef.current = next
      if (!next) {
        stopAmbient()
      } else {
        // Restart ambient immediately (toggle click is a user gesture)
        startAmbient()
      }
      return next
    })
  }, [stopAmbient, startAmbient])

  return {
    enabled,
    toggle,
    ambientPlaying: started,
    toggleAmbient: toggle,
    triggerPageTurn,
    triggerInkSplash,
    triggerEasterEgg,
  }
}
