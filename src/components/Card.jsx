import { motion } from 'framer-motion'
import './Card.css'

export default function Card({ children, onClick, className = '', delay = 0 }) {
  return (
    <motion.div
      className={`card ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="card__inner">
        {children}
      </div>
    </motion.div>
  )
}
