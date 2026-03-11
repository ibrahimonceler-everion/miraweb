import { useState, useCallback, useRef } from 'react'
import { playPageTurn, playInkSplash, playEasterEggChime, createAmbientNature } from '../audio/SoundEngine'

export default function useAmbientSound() {
  const [enabled, setEnabled] = useState(false)
  const [ambientPlaying, setAmbientPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const ambientRef = useRef(null)

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [])

  const triggerPageTurn = useCallback(() => {
    if (!enabled) return
    playPageTurn(getCtx())
  }, [enabled, getCtx])

  const triggerInkSplash = useCallback(() => {
    if (!enabled) return
    playInkSplash(getCtx())
  }, [enabled, getCtx])

  const triggerEasterEgg = useCallback(() => {
    if (!enabled) return
    playEasterEggChime(getCtx())
  }, [enabled, getCtx])

  const toggleAmbient = useCallback(() => {
    if (ambientRef.current) {
      ambientRef.current.stop()
      ambientRef.current = null
      setAmbientPlaying(false)
    } else {
      ambientRef.current = createAmbientNature(getCtx())
      setAmbientPlaying(true)
    }
  }, [getCtx])

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev
      if (!next && ambientRef.current) {
        ambientRef.current.stop()
        ambientRef.current = null
        setAmbientPlaying(false)
      }
      if (next) {
        // Initialize AudioContext on user gesture
        getCtx()
      }
      return next
    })
  }, [getCtx])

  return {
    enabled,
    toggle,
    ambientPlaying,
    toggleAmbient,
    triggerPageTurn,
    triggerInkSplash,
    triggerEasterEgg,
  }
}
