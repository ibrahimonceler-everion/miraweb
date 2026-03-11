import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { quotes } from '../data/quotes'
import './QuoteWall.css'

export default function QuoteWall({ onNavigate }) {
  const [activeQuotes, setActiveQuotes] = useState([])
  const idRef = useRef(0)

  const spawnQuote = useCallback(() => {
    setActiveQuotes(prev => {
      if (prev.length >= 4) return prev
      const quote = quotes[Math.floor(Math.random() * quotes.length)]
      return [...prev, {
        ...quote,
        id: ++idRef.current,
        y: 80 + Math.random() * (window.innerHeight - 200),
        speed: 20 + Math.random() * 15,
      }]
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(spawnQuote, 3000)
    const interval = setInterval(spawnQuote, 8000 + Math.random() * 4000)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [spawnQuote])

  const removeQuote = useCallback((id) => {
    setActiveQuotes(prev => prev.filter(q => q.id !== id))
  }, [])

  return (
    <div className="quote-wall">
      <AnimatePresence>
        {activeQuotes.map(q => (
          <motion.div
            key={q.id}
            className="quote-wall__quote"
            style={{ top: q.y }}
            initial={{ x: -400, opacity: 0 }}
            animate={{
              x: window.innerWidth + 400,
              opacity: [0, 0.18, 0.18, 0],
            }}
            transition={{
              duration: q.speed,
              ease: 'linear',
              opacity: { duration: q.speed, times: [0, 0.05, 0.9, 1] },
            }}
            onAnimationComplete={() => removeQuote(q.id)}
            onClick={(e) => onNavigate?.(q.pageIndex, e)}
          >
            {q.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
