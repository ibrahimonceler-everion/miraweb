import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import QuoteWall from './QuoteWall'
import './Background.css'

export default function Background({ children, onNavigate }) {
  const canvasRef = useRef(null)
  const { colors } = useTheme()
  const colorsRef = useRef(colors)

  useEffect(() => {
    colorsRef.current = colors
  }, [colors])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const shapes = Array.from({ length: 12 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 80 + Math.random() * 300,
      speedX: (Math.random() - 0.5) * 0.12,
      speedY: (Math.random() - 0.5) * 0.08,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.001,
      type: Math.floor(Math.random() * 4),
      opacity: 0.01 + Math.random() * 0.025,
      colorIndex: Math.floor(Math.random() * 5),
    }))

    const draw = () => {
      const c = colorsRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const grad = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.2, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.9
      )
      grad.addColorStop(0, c.bgGradient[0])
      grad.addColorStop(0.3, c.bgGradient[1])
      grad.addColorStop(0.6, c.bgGradient[2])
      grad.addColorStop(1, c.bgGradient[3])
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const glow = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.45, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.45
      )
      glow.addColorStop(0, c.bgGlow[0])
      glow.addColorStop(0.5, c.bgGlow[1])
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      shapes.forEach(s => {
        s.x += s.speedX
        s.y += s.speedY
        s.rotation += s.rotSpeed

        if (s.x < -s.size) s.x = canvas.width + s.size
        if (s.x > canvas.width + s.size) s.x = -s.size
        if (s.y < -s.size) s.y = canvas.height + s.size
        if (s.y > canvas.height + s.size) s.y = -s.size

        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(s.rotation)
        ctx.fillStyle = `${c.shapes[s.colorIndex]} ${s.opacity})`

        if (s.type === 0) {
          ctx.beginPath()
          ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else if (s.type === 1) {
          ctx.beginPath()
          ctx.moveTo(0, -s.size / 2)
          ctx.lineTo(s.size / 3, 0)
          ctx.lineTo(0, s.size / 2)
          ctx.lineTo(-s.size / 3, 0)
          ctx.closePath()
          ctx.fill()
        } else if (s.type === 2) {
          const r = s.size * 0.1
          ctx.beginPath()
          ctx.roundRect(-s.size / 3, -s.size / 2, s.size * 0.66, s.size, r)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, s.size / 2, 0, Math.PI * 1.2)
          ctx.lineTo(0, 0)
          ctx.closePath()
          ctx.fill()
        }
        ctx.restore()
      })

      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="background">
      <canvas ref={canvasRef} className="background__canvas" />
      <div className="background__grain" />
      <div className="background__vignette" />
      <QuoteWall onNavigate={onNavigate} />
      {children}
    </div>
  )
}
