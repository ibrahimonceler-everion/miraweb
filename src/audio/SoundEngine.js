// All sounds synthesized via Web Audio API — Magical Fantasy style
// Inspired by Celestial Aeon Project: celesta, glockenspiel, vibraphone, ethereal pads

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
  gain.gain.value = 0.15

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
  gain.gain.value = 0.15

  source.connect(filter).connect(gain).connect(audioCtx.destination)
  source.start()
}

export function playEasterEggChime(audioCtx) {
  const notes = [523, 659, 784, 1047, 1319]
  const noteDuration = 0.15

  notes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    const gain = audioCtx.createGain()
    const startTime = audioCtx.currentTime + i * noteDuration
    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(0.05, startTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration + 0.4)

    osc.connect(gain).connect(audioCtx.destination)
    osc.start(startTime)
    osc.stop(startTime + noteDuration + 0.45)
  })
}

export function createAmbientNature(audioCtx) {
  const masterGain = audioCtx.createGain()
  masterGain.gain.value = 0.10
  masterGain.connect(audioCtx.destination)

  const nodes = []
  const timers = []
  let stopped = false

  // ─── 1. ETHEREAL PAD ─── warm sustained chord (Cmaj7: C3, E3, G3, B3)
  const padNotes = [130.81, 164.81, 196.00, 246.94]
  padNotes.forEach((freq) => {
    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    // Ultra-slow breathing vibrato
    const lfo = audioCtx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.04 + Math.random() * 0.02
    const lfoGain = audioCtx.createGain()
    lfoGain.gain.value = 0.6
    lfo.connect(lfoGain).connect(osc.frequency)
    lfo.start()

    const gain = audioCtx.createGain()
    gain.gain.value = 0.035

    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 320

    osc.connect(filter).connect(gain).connect(masterGain)
    osc.start()
    nodes.push(osc, lfo, gain, filter, lfoGain)
  })

  // Secondary shimmer pad — higher octave, very quiet
  const shimmerNotes = [523.25, 659.26, 783.99]
  shimmerNotes.forEach((freq) => {
    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    const lfo = audioCtx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.02 + Math.random() * 0.015
    const lfoGain = audioCtx.createGain()
    lfoGain.gain.value = 1.5
    lfo.connect(lfoGain).connect(osc.frequency)
    lfo.start()

    const gain = audioCtx.createGain()
    gain.gain.value = 0.008

    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 900

    osc.connect(filter).connect(gain).connect(masterGain)
    osc.start()
    nodes.push(osc, lfo, gain, filter, lfoGain)
  })

  // ─── 2. CELESTA / MUSIC BOX MELODY ─── gentle repeating arpeggio
  // Two alternating phrases in C major pentatonic
  const phrases = [
    // Phrase A — ascending magical
    [
      { freq: 523.25, time: 0 },     // C5
      { freq: 659.26, time: 0.7 },   // E5
      { freq: 783.99, time: 1.4 },   // G5
      { freq: 1046.50, time: 2.1 },  // C6
      { freq: 880.00, time: 3.0 },   // A5
      { freq: 783.99, time: 3.7 },   // G5
      { freq: 659.26, time: 4.6 },   // E5
    ],
    // Phrase B — descending dreamy
    [
      { freq: 880.00, time: 0 },     // A5
      { freq: 783.99, time: 0.8 },   // G5
      { freq: 659.26, time: 1.5 },   // E5
      { freq: 587.33, time: 2.3 },   // D5
      { freq: 523.25, time: 3.2 },   // C5
      { freq: 659.26, time: 4.0 },   // E5
      { freq: 783.99, time: 4.8 },   // G5
    ],
    // Phrase C — gentle variation
    [
      { freq: 587.33, time: 0 },     // D5
      { freq: 783.99, time: 0.7 },   // G5
      { freq: 880.00, time: 1.4 },   // A5
      { freq: 1046.50, time: 2.3 },  // C6
      { freq: 880.00, time: 3.1 },   // A5
      { freq: 659.26, time: 3.8 },   // E5
      { freq: 523.25, time: 4.7 },   // C5
    ],
  ]

  const phraseDuration = 6.0 // seconds per phrase
  const pauseBetween = 2.0   // silence between phrases
  let phraseIndex = 0

  function playCelestaNote(freq) {
    if (stopped) return
    const now = audioCtx.currentTime
    const dur = 2.0 + Math.random() * 0.5

    // Main celesta tone
    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    // Harmonic overtone — gives celesta/bell quality
    const osc2 = audioCtx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = freq * 2.005 // slight detune for shimmer

    // Third partial — very faint, adds sparkle
    const osc3 = audioCtx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.value = freq * 3.01

    const peakVol = 0.045
    const gain1 = audioCtx.createGain()
    gain1.gain.setValueAtTime(0, now)
    gain1.gain.linearRampToValueAtTime(peakVol, now + 0.015)
    gain1.gain.exponentialRampToValueAtTime(peakVol * 0.35, now + 0.4)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + dur)

    const gain2 = audioCtx.createGain()
    gain2.gain.setValueAtTime(0, now)
    gain2.gain.linearRampToValueAtTime(peakVol * 0.18, now + 0.01)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + dur * 0.5)

    const gain3 = audioCtx.createGain()
    gain3.gain.setValueAtTime(0, now)
    gain3.gain.linearRampToValueAtTime(peakVol * 0.06, now + 0.01)
    gain3.gain.exponentialRampToValueAtTime(0.001, now + dur * 0.3)

    osc.connect(gain1).connect(masterGain)
    osc2.connect(gain2).connect(masterGain)
    osc3.connect(gain3).connect(masterGain)

    osc.start(now)
    osc.stop(now + dur + 0.1)
    osc2.start(now)
    osc2.stop(now + dur * 0.5 + 0.1)
    osc3.start(now)
    osc3.stop(now + dur * 0.3 + 0.1)
  }

  function playPhrase() {
    if (stopped) return
    const phrase = phrases[phraseIndex % phrases.length]
    phraseIndex++

    phrase.forEach(({ freq, time }) => {
      const t = setTimeout(() => {
        if (!stopped) playCelestaNote(freq)
      }, time * 1000)
      timers.push(t)
    })

    // Schedule next phrase
    const t = setTimeout(() => {
      if (!stopped) playPhrase()
    }, (phraseDuration + pauseBetween) * 1000)
    timers.push(t)
  }

  // Start first phrase after a brief intro pause
  const startTimer = setTimeout(() => {
    if (!stopped) playPhrase()
  }, 1500)
  timers.push(startTimer)

  // ─── 3. GLOCKENSPIEL SPARKLES ─── occasional high bell tones
  function scheduleSparkle() {
    if (stopped) return
    const delay = 5000 + Math.random() * 8000
    const t = setTimeout(() => {
      if (stopped) return
      playSparkle()
      if (Math.random() < 0.35) {
        const t2 = setTimeout(() => { if (!stopped) playSparkle(0.5) }, 300 + Math.random() * 200)
        timers.push(t2)
      }
      scheduleSparkle()
    }, delay)
    timers.push(t)
  }

  function playSparkle(volumeScale = 1) {
    if (stopped) return
    const sparkleNotes = [1046.50, 1174.66, 1318.51, 1567.98, 1760.00, 2093.00]
    const freq = sparkleNotes[Math.floor(Math.random() * sparkleNotes.length)]
    const now = audioCtx.currentTime
    const dur = 1.5 + Math.random() * 0.8

    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    const osc2 = audioCtx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = freq * 2.003

    const peakVol = (0.02 + Math.random() * 0.012) * volumeScale
    const gain1 = audioCtx.createGain()
    gain1.gain.setValueAtTime(0, now)
    gain1.gain.linearRampToValueAtTime(peakVol, now + 0.008)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + dur)

    const gain2 = audioCtx.createGain()
    gain2.gain.setValueAtTime(0, now)
    gain2.gain.linearRampToValueAtTime(peakVol * 0.12, now + 0.008)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + dur * 0.5)

    const pan = audioCtx.createStereoPanner
      ? audioCtx.createStereoPanner()
      : null
    if (pan) pan.pan.value = (Math.random() - 0.5) * 1.4

    osc.connect(gain1)
    osc2.connect(gain2)

    if (pan) {
      gain1.connect(pan).connect(masterGain)
      gain2.connect(pan)
    } else {
      gain1.connect(masterGain)
      gain2.connect(masterGain)
    }

    osc.start(now)
    osc.stop(now + dur + 0.1)
    osc2.start(now)
    osc2.stop(now + dur * 0.5 + 0.1)
  }

  scheduleSparkle()

  // ─── 4. VIBRAPHONE TOUCHES ─── occasional low warm bell tones
  function scheduleVibe() {
    if (stopped) return
    const delay = 8000 + Math.random() * 12000
    const t = setTimeout(() => {
      if (stopped) return
      playVibe()
      scheduleVibe()
    }, delay)
    timers.push(t)
  }

  function playVibe() {
    if (stopped) return
    const vibeNotes = [261.63, 329.63, 392.00, 440.00, 523.25]
    const freq = vibeNotes[Math.floor(Math.random() * vibeNotes.length)]
    const now = audioCtx.currentTime
    const dur = 3.0 + Math.random() * 1.5

    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    // Tremolo (vibraphone motor effect)
    const tremolo = audioCtx.createOscillator()
    tremolo.type = 'sine'
    tremolo.frequency.value = 4.5
    const tremoloGain = audioCtx.createGain()
    tremoloGain.gain.value = 0.012

    const gain = audioCtx.createGain()
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.025, now + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur)

    tremolo.connect(tremoloGain).connect(gain.gain)
    tremolo.start(now)
    tremolo.stop(now + dur + 0.1)

    const pan = audioCtx.createStereoPanner
      ? audioCtx.createStereoPanner()
      : null
    if (pan) pan.pan.value = (Math.random() - 0.5) * 0.8

    osc.connect(gain)
    if (pan) {
      gain.connect(pan).connect(masterGain)
    } else {
      gain.connect(masterGain)
    }

    osc.start(now)
    osc.stop(now + dur + 0.1)
  }

  scheduleVibe()

  return {
    gain: masterGain,
    stop() {
      stopped = true
      timers.forEach(t => clearTimeout(t))
      timers.length = 0
      try {
        nodes.forEach((n) => { try { n.stop?.(); n.disconnect() } catch {} })
        masterGain.disconnect()
      } catch {}
    },
  }
}
