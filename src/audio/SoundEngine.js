// All sounds synthesized via Web Audio API - no external files needed

export function playPageTurn(audioCtx) {
  const duration = 0.15
  const bufferSize = Math.floor(audioCtx.sampleRate * duration)
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < bufferSize; i++) {
    const envelope = Math.pow(1 - i / bufferSize, 2)
    data[i] = (Math.random() * 2 - 1) * envelope * 0.25
  }

  const source = audioCtx.createBufferSource()
  source.buffer = buffer

  const filter = audioCtx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 2500
  filter.Q.value = 0.8

  const gain = audioCtx.createGain()
  gain.gain.value = 0.4

  source.connect(filter).connect(gain).connect(audioCtx.destination)
  source.start()
}

export function playInkSplash(audioCtx) {
  const duration = 0.2
  const bufferSize = Math.floor(audioCtx.sampleRate * duration)
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < bufferSize; i++) {
    const t = i / audioCtx.sampleRate
    const envelope = Math.pow(1 - i / bufferSize, 1.5)
    const lowBoom = Math.sin(2 * Math.PI * 80 * t) * 0.3 * Math.exp(-t * 20)
    data[i] = ((Math.random() * 2 - 1) * 0.15 + lowBoom) * envelope
  }

  const source = audioCtx.createBufferSource()
  source.buffer = buffer

  const filter = audioCtx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1800
  filter.Q.value = 0.6

  const gain = audioCtx.createGain()
  gain.gain.value = 0.35

  source.connect(filter).connect(gain).connect(audioCtx.destination)
  source.start()
}

export function playEasterEggChime(audioCtx) {
  const notes = [200, 300, 400, 500, 650, 800]
  const noteDuration = 0.08

  notes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    const gain = audioCtx.createGain()
    const startTime = audioCtx.currentTime + i * noteDuration
    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration + 0.15)

    osc.connect(gain).connect(audioCtx.destination)
    osc.start(startTime)
    osc.stop(startTime + noteDuration + 0.2)
  })
}

export function createAmbientNature(audioCtx) {
  const masterGain = audioCtx.createGain()
  masterGain.gain.value = 0.12
  masterGain.connect(audioCtx.destination)

  const nodes = []

  // Gentle ambient pad: soft detuned sine drones
  const padFreqs = [174, 220, 261]
  padFreqs.forEach((freq) => {
    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    // Slow gentle vibrato
    const lfo = audioCtx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.15 + Math.random() * 0.1
    const lfoGain = audioCtx.createGain()
    lfoGain.gain.value = 1.5
    lfo.connect(lfoGain).connect(osc.frequency)
    lfo.start()

    const gain = audioCtx.createGain()
    gain.gain.value = 0.06

    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 400

    osc.connect(filter).connect(gain).connect(masterGain)
    osc.start()
    nodes.push(osc, lfo, gain, filter, lfoGain)
  })

  // Bird chirps: random short sine sweeps
  let chirpTimer = null
  let stopped = false

  function scheduleChirp() {
    if (stopped) return
    const delay = 2000 + Math.random() * 5000
    chirpTimer = setTimeout(() => {
      if (stopped) return
      playChirp()
      // Sometimes a double chirp
      if (Math.random() < 0.4) {
        setTimeout(() => { if (!stopped) playChirp() }, 120 + Math.random() * 80)
      }
      scheduleChirp()
    }, delay)
  }

  function playChirp() {
    const now = audioCtx.currentTime
    const duration = 0.06 + Math.random() * 0.1
    const startFreq = 2200 + Math.random() * 1800
    const endFreq = startFreq + (Math.random() < 0.5 ? 1 : -1) * (400 + Math.random() * 800)

    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(startFreq, now)
    osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 100), now + duration)

    const chirpGain = audioCtx.createGain()
    chirpGain.gain.setValueAtTime(0, now)
    chirpGain.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.06, now + 0.01)
    chirpGain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    const pan = audioCtx.createStereoPanner
      ? audioCtx.createStereoPanner()
      : null
    if (pan) pan.pan.value = (Math.random() - 0.5) * 1.4

    osc.connect(chirpGain)
    if (pan) {
      chirpGain.connect(pan).connect(masterGain)
    } else {
      chirpGain.connect(masterGain)
    }

    osc.start(now)
    osc.stop(now + duration + 0.05)
  }

  scheduleChirp()

  return {
    gain: masterGain,
    stop() {
      stopped = true
      if (chirpTimer) clearTimeout(chirpTimer)
      try {
        nodes.forEach((n) => { try { n.stop?.(); n.disconnect() } catch {} })
        masterGain.disconnect()
      } catch {}
    },
  }
}
