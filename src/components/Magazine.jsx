import { forwardRef } from 'react'
import SoundToggle from './SoundToggle'
import './Magazine.css'

const Magazine = forwardRef(function Magazine({ children, sound }, ref) {
  return (
    <div className="magazine-wrapper">
      <div className="magazine" ref={ref}>
        <div className="magazine__edge magazine__edge--top" />
        <div className="magazine__edge magazine__edge--bottom" />
        <div className="magazine__edge magazine__edge--left" />
        <div className="magazine__edge magazine__edge--right" />
        <div className="magazine__spine" />
        <div className="magazine__content">
          {children}
        </div>
        <div className="magazine__texture" />
        {sound && (
          <SoundToggle
            enabled={sound.enabled}
            onToggle={sound.toggle}
          />
        )}
      </div>
    </div>
  )
})

export default Magazine
