import { motion } from 'framer-motion'
import useParallax from '../hooks/useParallax'

export default function ParallaxLayer({ children, depth = 1, className = '', style = {} }) {
  const { x, y } = useParallax(depth)

  return (
    <motion.div
      className={className}
      style={{ x, y, willChange: 'transform', ...style }}
    >
      {children}
    </motion.div>
  )
}
