// All sounds synthesized via Web Audio API - no external files needed

export function playPageTurn(audioCtx) {
  const duration = 0.18
  const bufferSize = Math.floor(audioCtx.sampleRate * duration)
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < bufferSize; i++) {
    const envelope = Math.pow(1 - i / bufferSize, 3)
    data[i] = (Math.random() * 2 - 1) * envelope * 0.12
  }

  const source = audioCtx.createBufferSource()
  source.buffer = buffer

  const filter = audioCtx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1800
  filter.Q.value = 0.5

  const gain = audioCtx.createGain()
  gain.gain.value = 0.2

  source.connect(filter).connect(gain).connect(audioCtx.destination)
  source.start()
}

export function playInkSplash(audioCtx) {
  const duration = 0.25
  const bufferSize = Math.floor(audioCtx.sampleRate * duration)
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < bufferSize; i++) {
    const t = i / audioCtx.sampleRate
    const envelope = Math.pow(1 - i / bufferSize, 2)
    const lowBoom = Math.sin(2 * Math.PI * 60 * t) * 0.15 * Math.exp(-t * 25)
    data[i] = ((Math.random() * 2 - 1) * 0.06 + lowBoom) * envelope
  }

  const source = audioCtx.createBufferSource()
  source.buffer = buffer

  const filter = audioCtx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 1200
  filter.Q.value = 0.4

  const gain = audioCtx.createGain()
  gain.gain.value = 0.18

  source.connect(filter).connect(gain).connect(audioCtx.destination)
  source.start()
}

export function playEasterEggChime(audioCtx) {
  const notes = [262, 330, 392, 523, 659]
  const noteDuration = 0.12

  notes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    const gain = audioCtx.createGain()
    const startTime = audioCtx.currentTime + i * noteDuration
    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(0.06, startTime + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration + 0.3)

    osc.connect(gain).connect(audioCtx.destination)
    osc.start(startTime)
    osc.stop(startTime + noteDuration + 0.35)
  })
}

export function createAmbientNature(audioCtx) {
  const masterGain = audioCtx.createGain()
  masterGain.gain.value = 0.07
  masterGain.connect(audioCtx.destination)

  const nodes = []

  // Deep warm drone — very low, barely audible foundation
  const droneFreqs = [110, 165, 220]
  droneFreqs.forEach((freq) => {
    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    // Ultra-slow breathing vibrato
    const lfo = audioCtx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.05 + Math.random() * 0.04
    const lfoGain = audioCtx.createGain()
    lfoGain.gain.value = 0.8
    lfo.connect(lfoGain).connect(osc.frequency)
    lfo.start()

    const gain = audioCtx.createGain()
    gain.gain.value = 0.04

    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 280

    osc.connect(filter).connect(gain).connect(masterGain)
    osc.start()
    nodes.push(osc, lfo, gain, filter, lfoGain)
  })

  // Soft shimmer layer — high-frequency gentle wash
  const shimmerOsc = audioCtx.createOscillator()
  shimmerOsc.type = 'sine'
  shimmerOsc.frequency.value = 528

  const shimmerLfo = audioCtx.createOscillator()
  shimmerLfo.type = 'sine'
  shimmerLfo.frequency.value = 0.03
  const shimmerLfoGain = audioCtx.createGain()
  shimmerLfoGain.gain.value = 2
  shimmerLfo.connect(shimmerLfoGain).connect(shimmerOsc.frequency)
  shimmerLfo.start()

  const shimmerGain = audioCtx.createGain()
  shimmerGain.gain.value = 0.015

  const shimmerFilter = audioCtx.createBiquadFilter()
  shimmerFilter.type = 'lowpass'
  shimmerFilter.frequency.value = 600

  shimmerOsc.connect(shimmerFilter).connect(shimmerGain).connect(masterGain)
  shimmerOsc.start()
  nodes.push(shimmerOsc, shimmerLfo, shimmerGain, shimmerFilter, shimmerLfoGain)

  // Gentle wind chimes — soft, sparse bell-like tones
  let chimeTimer = null
  let stopped = false

  function scheduleChime() {
    if (stopped) return
    const delay = 4000 + Math.random() * 8000
    chimeTimer = setTimeout(() => {
      if (stopped) return
      playChime()
      // Occasionally a second softer chime
      if (Math.random() < 0.3) {
        setTimeout(() => { if (!stopped) playChime(0.5) }, 600 + Math.random() * 400)
      }
      scheduleChime()
    }, delay)
  }

  function playChime(volumeScale = 1) {
    const now = audioCtx.currentTime
    const duration = 1.2 + Math.random() * 0.8
    // Pentatonic notes — always harmonious
    const pentatonic = [523, 587, 659, 784, 880, 1047, 1175]
    const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)]

    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    // Gentle harmonic overtone
    const osc2 = audioCtx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = freq * 2.01

    const chimeGain = audioCtx.createGain()
    const peakVol = (0.03 + Math.random() * 0.02) * volumeScale
    chimeGain.gain.setValueAtTime(0, now)
    chimeGain.gain.linearRampToValueAtTime(peakVol, now + 0.05)
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    const chimeGain2 = audioCtx.createGain()
    chimeGain2.gain.setValueAtTime(0, now)
    chimeGain2.gain.linearRampToValueAtTime(peakVol * 0.3, now + 0.05)
    chimeGain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.7)

    const pan = audioCtx.createStereoPanner
      ? audioCtx.createStereoPanner()
      : null
    if (pan) pan.pan.value = (Math.random() - 0.5) * 1.2

    osc.connect(chimeGain)
    osc2.connect(chimeGain2)

    if (pan) {
      chimeGain.connect(pan).connect(masterGain)
      chimeGain2.connect(pan)
    } else {
      chimeGain.connect(masterGain)
      chimeGain2.connect(masterGain)
    }

    osc.start(now)
    osc.stop(now + duration + 0.1)
    osc2.start(now)
    osc2.stop(now + duration * 0.7 + 0.1)
  }

  scheduleChime()

  return {
    gain: masterGain,
    stop() {
      stopped = true
      if (chimeTimer) clearTimeout(chimeTimer)
      try {
        nodes.forEach((n) => { try { n.stop?.(); n.disconnect() } catch {} })
        masterGain.disconnect()
      } catch {}
    },
  }
}
