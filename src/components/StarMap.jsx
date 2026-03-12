import { useMemo } from 'react'
import { motion } from 'framer-motion'
import './StarMap.css'

const stars = [
  { id: 1, label: 'Yazılar', x: 25, y: 22, page: 1 },
  { id: 2, label: 'Şiirler', x: 75, y: 18, page: 2 },
  { id: 3, label: 'Düşünceler', x: 50, y: 72, page: 3 },
]

const connections = [[0, 1], [1, 2], [2, 0]]

/* Diamond sparkles scattered around the constellation triangle */
const diamonds = [
  { x: 15, y: 12, size: 1.2, delay: 0, dur: 2.2 },
  { x: 82, y: 10, size: 1.0, delay: 0.5, dur: 2.8 },
  { x: 90, y: 38, size: 0.9, delay: 1.1, dur: 2.4 },
  { x: 60, y: 85, size: 1.1, delay: 0.3, dur: 2.6 },
  { x: 30, y: 80, size: 0.8, delay: 1.4, dur: 2.0 },
  { x: 8, y: 50, size: 1.0, delay: 0.8, dur: 3.0 },
  { x: 50, y: 5, size: 0.9, delay: 1.8, dur: 2.5 },
  { x: 70, y: 55, size: 0.7, delay: 0.6, dur: 2.3 },
  { x: 38, y: 48, size: 0.8, delay: 1.0, dur: 2.7 },
  { x: 55, y: 30, size: 1.0, delay: 1.5, dur: 2.1 },
  { x: 20, y: 60, size: 0.7, delay: 2.0, dur: 2.9 },
  { x: 85, y: 70, size: 0.8, delay: 0.2, dur: 2.4 },
]

export default function StarMap({ onNavigate }) {
  const dust = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      cx: Math.random() * 100,
      cy: Math.random() * 100,
      r: 0.2 + Math.random() * 0.5,
      delay: Math.random() * 5,
      dur: 2 + Math.random() * 3,
    })),
  [])

  return (
    <div className="star-map">
      <svg viewBox="0 0 100 100" className="star-map__svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="star-glow">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="star-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--gold-light)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--gold-light)" stopOpacity="0" />
          </radialGradient>
          <filter id="diamond-glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Subtle center glow */}
        <circle cx="50" cy="40" r="35" fill="url(#star-center-glow)" />

        {/* Background dust particles */}
        {dust.map(d => (
          <motion.circle
            key={`dust-${d.id}`}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill="var(--text-light)"
            animate={{ opacity: [0, 0.35, 0] }}
            transition={{ duration: d.dur, repeat: Infinity, delay: d.delay }}
          />
        ))}

        {/* Diamond sparkles — twinkle in place */}
        {diamonds.map((d, i) => (
          <motion.g
            key={`diamond-${i}`}
            filter="url(#diamond-glow)"
            animate={{
              opacity: [0, 0.9, 0.2, 0.85, 0],
            }}
            transition={{
              duration: d.dur,
              repeat: Infinity,
              delay: d.delay,
              ease: 'easeInOut',
            }}
          >
            {/* Vertical ray */}
            <polygon
              points={`${d.x},${d.y - d.size * 1.8} ${d.x + d.size * 0.5},${d.y} ${d.x},${d.y + d.size * 1.8} ${d.x - d.size * 0.5},${d.y}`}
              fill="#fff"
            />
            {/* Horizontal ray */}
            <polygon
              points={`${d.x - d.size * 1.8},${d.y} ${d.x},${d.y - d.size * 0.5} ${d.x + d.size * 1.8},${d.y} ${d.x},${d.y + d.size * 0.5}`}
              fill="#fff"
              opacity="0.85"
            />
            {/* Center core */}
            <circle cx={d.x} cy={d.y} r={d.size * 0.45} fill="#fff" />
          </motion.g>
        ))}

        {/* Constellation lines */}
        {connections.map(([a, b], i) => (
          <motion.line
            key={`line-${i}`}
            x1={stars[a].x}
            y1={stars[a].y}
            x2={stars[b].x}
            y2={stars[b].y}
            stroke="var(--gold)"
            strokeWidth="0.35"
            strokeDasharray="1.2 1.2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 + i * 0.3, duration: 0.8 }}
          />
        ))}

        {/* Stars — 4-ray diamond sparkle shapes (like logo crown sparkles) */}
        {stars.map((star, i) => {
          const s = 3.5 // sparkle size
          const x = star.x
          const y = star.y
          return (
            <g
              key={star.id}
              className="star-map__star-group"
              onClick={(e) => onNavigate(star.page, e)}
            >
              {/* Larger invisible hit area */}
              <circle cx={x} cy={y} r="8" fill="transparent" />

              {/* Outer glow sparkle — faint ring */}
              <motion.g
                animate={{ opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.8 }}
              >
                <polygon
                  points={`${x},${y - s * 2.2} ${x + s * 0.35},${y} ${x},${y + s * 2.2} ${x - s * 0.35},${y}`}
                  fill="none" stroke="var(--gold-dim)" strokeWidth="0.15"
                />
                <polygon
                  points={`${x - s * 2.2},${y} ${x},${y - s * 0.35} ${x + s * 2.2},${y} ${x},${y + s * 0.35}`}
                  fill="none" stroke="var(--gold-dim)" strokeWidth="0.15"
                />
              </motion.g>

              {/* Main sparkle — vertical ray */}
              <motion.polygon
                points={`${x},${y - s * 1.6} ${x + s * 0.4},${y} ${x},${y + s * 1.6} ${x - s * 0.4},${y}`}
                fill="var(--gold-light)"
                filter="url(#star-glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  delay: 0.6 + i * 0.2,
                  duration: 2.5 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Main sparkle — horizontal ray */}
              <motion.polygon
                points={`${x - s * 1.6},${y} ${x},${y - s * 0.4} ${x + s * 1.6},${y} ${x},${y + s * 0.4}`}
                fill="var(--gold-light)"
                filter="url(#star-glow)"
                opacity="0.85"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.6, 0.85, 0.6] }}
                transition={{
                  delay: 0.6 + i * 0.2,
                  duration: 2.5 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Center bright core */}
              <motion.circle
                cx={x} cy={y} r={s * 0.4}
                fill="#fff"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.8 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: 'easeInOut',
                }}
              />

              {/* Label — subtle glow pulse */}
              <motion.text
                x={x}
                y={y + 8}
                textAnchor="middle"
                className="star-map__label"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  delay: 1.2 + i * 0.2,
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {star.label}
              </motion.text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
