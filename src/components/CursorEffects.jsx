import { AnimatePresence, motion } from 'framer-motion'
import useCursorEffects from '../hooks/useCursorEffects'
import './CursorEffects.css'

export default function CursorEffects() {
  const { splashes, isTouch } = useCursorEffects()

  if (isTouch) return null

  return (
    <div className="cursor-effects">
      <AnimatePresence>
        {splashes.map(s => (
          <motion.div
            key={s.id}
            className={`ink-splash ink-splash--${s.size}`}
            style={{ left: s.x, top: s.y }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <svg viewBox="0 0 40 40" className="ink-splash__svg">
              <circle cx="20" cy="20" r="16" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="30" cy="14" r="3" />
              <circle cx="8" cy="26" r="3.5" />
              <circle cx="28" cy="30" r="2.5" />
              <circle cx="18" cy="34" r="2" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
