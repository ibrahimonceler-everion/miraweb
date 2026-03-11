import { motion } from 'framer-motion'
import './BackButton.css'

export default function BackButton({ onClick }) {
  return (
    <motion.button
      className="back-button"
      onClick={onClick}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      whileHover={{ x: -3 }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>Kapağa Dön</span>
    </motion.button>
  )
}
