import { useTheme } from '../context/ThemeContext'
import './Logo.css'

export default function Logo({ size = 80 }) {
  const { colors } = useTheme()
  const l = colors.logo

  return (
    <div className="logo" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="logo__svg">
        <defs>
          <radialGradient id="glow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor={l.glow} stopOpacity="0.6" />
            <stop offset="100%" stopColor={l.glow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={l.wing1} />
            <stop offset="50%" stopColor={l.wing2} />
            <stop offset="100%" stopColor={l.wing2} />
          </linearGradient>
          <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={l.crown} />
            <stop offset="100%" stopColor={l.crown} />
          </linearGradient>
          <linearGradient id="letterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={l.letter} />
            <stop offset="100%" stopColor={l.letter} />
          </linearGradient>
        </defs>

        <ellipse cx="100" cy="120" rx="80" ry="60" fill="url(#glow)" />

        <g transform="translate(100, 110) scale(-1, 1) translate(-60, 0)">
          <path d="M60 0 C40 -10, 15 -30, 5 -50 C0 -60, 5 -45, 15 -35 C25 -25, 40 -15, 60 -10 Z"
                fill="url(#wingGrad)" opacity="0.5" />
          <path d="M60 -5 C35 -18, 10 -40, 2 -55 C-2 -63, 3 -50, 12 -40 C22 -30, 40 -18, 60 -12 Z"
                fill="url(#wingGrad)" opacity="0.6" />
          <path d="M60 5 C45 -2, 25 -15, 12 -25 C5 -30, 10 -22, 20 -15 C30 -8, 45 0, 60 3 Z"
                fill="url(#wingGrad)" opacity="0.7" />
        </g>

        <g transform="translate(100, 110) translate(-60, 0)">
          <path d="M60 0 C40 -10, 15 -30, 5 -50 C0 -60, 5 -45, 15 -35 C25 -25, 40 -15, 60 -10 Z"
                fill="url(#wingGrad)" opacity="0.5" />
          <path d="M60 -5 C35 -18, 10 -40, 2 -55 C-2 -63, 3 -50, 12 -40 C22 -30, 40 -18, 60 -12 Z"
                fill="url(#wingGrad)" opacity="0.6" />
          <path d="M60 5 C45 -2, 25 -15, 12 -25 C5 -30, 10 -22, 20 -15 C30 -8, 45 0, 60 3 Z"
                fill="url(#wingGrad)" opacity="0.7" />
        </g>

        <g transform="translate(100, 55)">
          <path d="M-18 12 L-22 -5 L-12 3 L-5 -12 L0 -5 L5 -12 L12 3 L22 -5 L18 12 Z"
                fill="url(#crownGrad)" stroke={l.crown} strokeWidth="0.5" />
          <circle cx="0" cy="-10" r="3" fill={l.jewel} stroke={l.crown} strokeWidth="0.5" />
          <rect x="-18" y="12" width="36" height="4" rx="1" fill="url(#crownGrad)" />
        </g>

        <text x="100" y="140" textAnchor="middle"
              fontFamily="'Playfair Display', serif"
              fontSize="72" fontWeight="700"
              fill="url(#letterGrad)">
          M
        </text>

        <g fill={l.sparkle} opacity="0.8">
          <polygon points="40,60 42,56 44,60 42,64" />
          <polygon points="160,60 162,56 164,60 162,64" />
          <polygon points="50,45 51,42 52,45 51,48" />
          <polygon points="150,45 151,42 152,45 151,48" />
          <polygon points="35,80 36.5,77 38,80 36.5,83" />
          <polygon points="165,80 166.5,77 168,80 166.5,83" />
        </g>
      </svg>
    </div>
  )
}
