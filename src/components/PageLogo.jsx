import { motion } from 'framer-motion'
import logoImg from '../assets/image.png'
import './PageLogo.css'

const gems = [
  { x: -75, y: -20, size: 4, delay: 0 },
  { x: 80, y: -15, size: 3.5, delay: 0.4 },
  { x: -55, y: 50, size: 3, delay: 0.8 },
  { x: 65, y: 45, size: 3.5, delay: 1.2 },
  { x: -20, y: -65, size: 3, delay: 0.6 },
  { x: 25, y: -60, size: 4, delay: 1.0 },
]

export default function PageLogo() {
  return (
    <div className="page-logo">
      <motion.img
        src={logoImg}
        alt="Mira"
        className="page-logo__img"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />
      {gems.map((gem, i) => (
        <motion.span
          key={i}
          className="page-logo__gem"
          style={{
            left: `calc(50% + ${gem.x}px)`,
            top: `calc(50% + ${gem.y}px)`,
            width: gem.size,
            height: gem.size,
          }}
          animate={{
            opacity: [0.2, 0.9, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: gem.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
