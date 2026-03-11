import useTypewriter from '../hooks/useTypewriter'
import './TypewriterText.css'

export default function TypewriterText({ text, speed = 45, delay = 0, enabled = true, tag = 'span', className = '' }) {
  const { displayedText, isComplete } = useTypewriter({ text, speed, delay, enabled })
  const Tag = tag

  return (
    <Tag className={`typewriter ${className} ${isComplete ? 'typewriter--done' : ''}`}>
      {displayedText}
      <span className="typewriter__cursor" />
    </Tag>
  )
}
