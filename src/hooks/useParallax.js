import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

export default function useParallax(depth = 1) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const isTouch = !window.matchMedia('(hover: hover)').matches
    if (isTouch) return

    const handler = (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2
      const cy = (e.clientY / window.innerHeight - 0.5) * 2
      x.set(cx * depth * 8)
      y.set(cy * depth * 5)
    }

    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [depth, x, y])

  return { x, y }
}
