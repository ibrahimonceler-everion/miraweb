import { useId, useMemo } from 'react'
import { motion } from 'framer-motion'
import './InkTransition.css'

export default function InkTransition({ children, direction, origin }) {
  const clipId = useId()
  const filterId = `${clipId}-ink`

  const maxRadius = useMemo(() => {
    if (!origin) return 1500
    const dx = Math.max(origin.x, 900 - origin.x)
    const dy = Math.max(origin.y, 1200 - origin.y)
    return Math.sqrt(dx * dx + dy * dy) + 100
  }, [origin])

  const cx = origin?.x ?? 450
  const cy = origin?.y ?? 400

  return (
    <motion.div
      className="ink-transition"
      initial="enter"
      animate="center"
      exit="exit"
      variants={{
        enter: { opacity: 1, zIndex: 0 },
        center: { opacity: 1, zIndex: 1 },
        exit: { opacity: 1, zIndex: 2 },
      }}
    >
      <svg width="0" height="0" className="ink-transition__defs">
        <defs>
          <clipPath id={clipId}>
            <motion.circle
              cx={cx}
              cy={cy}
              variants={{
                enter: { r: maxRadius },
                center: { r: maxRadius },
                exit: { r: 0 },
              }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </clipPath>
          <filter id={filterId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed={Math.floor(Math.random() * 100)} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <motion.div
        className="ink-transition__content"
        style={{
          clipPath: `url(#${clipId})`,
          filter: `url(#${filterId})`,
        }}
        variants={{
          enter: {},
          center: {
            filter: 'none',
            transition: { filter: { delay: 0.8, duration: 0.3 } },
          },
          exit: {},
        }}
      >
        {children}
      </motion.div>

      {/* Ink edge glow */}
      <motion.div
        className="ink-transition__edge-glow"
        variants={{
          enter: { opacity: 0 },
          center: { opacity: 0 },
          exit: (dir) => ({
            opacity: [0, 0.6, 0.8, 0.4, 0],
            transition: {
              duration: 1.1,
              times: [0, 0.15, 0.4, 0.7, 1],
            },
          }),
        }}
      />
    </motion.div>
  )
}
