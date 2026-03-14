import { useCallback, useRef } from 'react'
import { playPageTurn, playInkSplash, playEasterEggChime } from '../audio/SoundEngine'

export default function useAmbientSound() {
  const audioCtxRef = useRef(null)

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
    playPageTurn(getCtx())
  }, [getCtx])

  const triggerInkSplash = useCallback(() => {
    playInkSplash(getCtx())
  }, [getCtx])

  const triggerEasterEgg = useCallback(() => {
    playEasterEggChime(getCtx())
  }, [getCtx])

  return {
    triggerPageTurn,
    triggerInkSplash,
    triggerEasterEgg,
  }
}
