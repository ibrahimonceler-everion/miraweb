import { motion } from 'framer-motion'
import './PageTransition.css'

export default function PageTransition({ children, direction }) {
  return (
    <motion.div
      className="page-transition"
      custom={direction}
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
      initial="enter"
      animate="center"
      exit="exit"
      variants={{
        enter: {
          rotateY: 0,
          zIndex: 0,
        },
        center: {
          rotateY: 0,
          zIndex: 1,
          transition: {
            zIndex: { delay: 0.75, duration: 0 },
          },
        },
        exit: (dir) => ({
          rotateY: dir > 0 ? -105 : 105,
          zIndex: 2,
          originX: dir > 0 ? 0 : 1,
          transition: {
            originX: { duration: 0 },
            rotateY: {
              duration: 0.9,
              ease: [0.4, 0.0, 0.2, 1],
            },
            zIndex: { duration: 0 },
          },
        }),
      }}
    >
      {/* Shadow overlay on the revealed page underneath */}
      <motion.div
        className="page-turn__reveal-shadow"
        variants={{
          enter: { opacity: 0.5 },
          center: {
            opacity: 0,
            transition: { duration: 0.65, delay: 0.2, ease: 'easeOut' },
          },
          exit: { opacity: 0 },
        }}
      />

      {/* Darkening gradient on the flipping page */}
      <motion.div
        className="page-turn__darken"
        custom={direction}
        variants={{
          enter: { opacity: 0 },
          center: { opacity: 0 },
          exit: (dir) => ({
            opacity: [0, 0.1, 0.45, 0.85],
            transition: {
              duration: 0.9,
              times: [0, 0.2, 0.5, 1],
              ease: 'easeIn',
            },
          }),
        }}
      />

      {/* Moving fold highlight / crease line */}
      <motion.div
        className="page-turn__fold"
        custom={direction}
        variants={{
          enter: { opacity: 0 },
          center: { opacity: 0 },
          exit: (dir) => ({
            opacity: [0, 0.6, 0.9, 0.6, 0],
            left: dir > 0
              ? ['92%', '60%', '30%', '8%', '-5%']
              : ['8%', '40%', '70%', '92%', '105%'],
            transition: {
              duration: 0.9,
              times: [0, 0.15, 0.4, 0.7, 1],
            },
          }),
        }}
      />

      {/* Spine shadow near the fold edge */}
      <motion.div
        className="page-turn__spine-shadow"
        custom={direction}
        variants={{
          enter: { opacity: 0 },
          center: { opacity: 0 },
          exit: (dir) => ({
            opacity: [0, 0.5, 0.7, 0.3, 0],
            transition: {
              duration: 0.9,
              times: [0, 0.2, 0.45, 0.7, 1],
            },
          }),
        }}
      />

      {children}
    </motion.div>
  )
}
