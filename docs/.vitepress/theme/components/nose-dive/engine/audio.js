// Klang ohne Dateien: kleine WebAudio-Synths für Effekte und eine leichte Musikschleife.
// Der AudioContext entsteht erst bei der ersten Berührung/Taste (iOS/Chrome verlangen das).

const NOTE = (n) => 440 * 2 ** ((n - 69) / 12) // MIDI → Hz

// C-Dur-Pentatonik, für die steigenden Treffer-Töne
const CATCH_STEPS = [72, 74, 76, 79, 81, 84, 86, 88, 91, 93]

// Akkordfolge C – Am – F – G (MIDI-Grundton, Akkordtöne)
const CHORDS = [
  { root: 48, tones: [60, 64, 67] },
  { root: 45, tones: [57, 60, 64] },
  { root: 41, tones: [57, 60, 65] },
  { root: 43, tones: [59, 62, 67] },
]
const MELODY = [72, 74, 76, 79, 81, 84]

export function createAudio({ sound = true, music = true } = {}) {
  let ctx = null
  let master, sfxBus, musicBus, delay, noiseBuf
  let sfxOn = sound
  let musicOn = music
  let intensity = 0
  let timer = 0
  let nextTime = 0
  let step = 0
  const EIGHTH = 60 / 100 / 2

  function init() {
    if (ctx) return true
    const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)
    if (!AC) return false
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0.9
    master.connect(ctx.destination)

    sfxBus = ctx.createGain()
    sfxBus.gain.value = sfxOn ? 1 : 0
    sfxBus.connect(master)

    musicBus = ctx.createGain()
    musicBus.gain.value = musicOn ? 0.55 : 0
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 2600
    musicBus.connect(lp)
    lp.connect(master)

    // leichtes Echo für die Melodie
    delay = ctx.createDelay(1)
    delay.delayTime.value = EIGHTH * 3
    const fb = ctx.createGain()
    fb.gain.value = 0.28
    const wet = ctx.createGain()
    wet.gain.value = 0.35
    delay.connect(fb)
    fb.connect(delay)
    delay.connect(wet)
    wet.connect(musicBus)

    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
    const d = noiseBuf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    return true
  }

  function unlock() {
    if (!init()) return
    if (ctx.state === 'suspended') ctx.resume()
    if (musicOn && !timer) startMusic()
  }

  // -------------------------------------------------------------------------
  // Bausteine
  // -------------------------------------------------------------------------
  function tone(freq, dur, o = {}) {
    if (!ctx) return
    const t = ctx.currentTime + (o.delay || 0) + (o.at ? o.at - ctx.currentTime : 0)
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = o.type || 'sine'
    osc.frequency.setValueAtTime(freq, t)
    if (o.slideTo) osc.frequency.exponentialRampToValueAtTime(o.slideTo, t + dur)
    const vol = o.vol ?? 0.2
    const a = o.attack ?? 0.005
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vol, t + a)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    let node = osc
    if (o.filter) {
      const f = ctx.createBiquadFilter()
      f.type = o.filter.type || 'lowpass'
      f.frequency.value = o.filter.freq
      osc.connect(f)
      node = f
    }
    node.connect(g)
    g.connect(o.dest || sfxBus)
    if (o.send) g.connect(o.send)
    osc.start(t)
    osc.stop(t + dur + 0.05)
  }

  function noise(dur, o = {}) {
    if (!ctx) return
    const t = ctx.currentTime + (o.delay || 0) + (o.at ? o.at - ctx.currentTime : 0)
    const src = ctx.createBufferSource()
    src.buffer = noiseBuf
    const f = ctx.createBiquadFilter()
    f.type = o.type || 'bandpass'
    f.frequency.setValueAtTime(o.freq || 1000, t)
    if (o.slideTo) f.frequency.exponentialRampToValueAtTime(o.slideTo, t + dur)
    f.Q.value = o.q ?? 0.8
    const g = ctx.createGain()
    const vol = o.vol ?? 0.2
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vol, t + (o.attack ?? 0.01))
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    src.connect(f)
    f.connect(g)
    g.connect(o.dest || sfxBus)
    src.start(t, Math.random() * 0.5)
    src.stop(t + dur + 0.05)
  }

  // -------------------------------------------------------------------------
  // Effekte
  // -------------------------------------------------------------------------
  const sfx = {
    click() {
      tone(880, 0.06, { type: 'triangle', vol: 0.08 })
    },
    catch(combo = 0) {
      const n = CATCH_STEPS[Math.min(combo, CATCH_STEPS.length - 1)]
      tone(NOTE(n), 0.16, { type: 'triangle', vol: 0.2 })
      tone(NOTE(n + 7), 0.22, { type: 'triangle', vol: 0.14, delay: 0.06 })
      tone(NOTE(n + 19), 0.18, { type: 'sine', vol: 0.05, delay: 0.11 })
      noise(0.12, { type: 'highpass', freq: 5000, vol: 0.05 })
    },
    wrong() {
      tone(196, 0.4, { type: 'square', vol: 0.09, slideTo: 98, filter: { freq: 900 } })
      tone(185, 0.4, { type: 'sawtooth', vol: 0.05, slideTo: 92, filter: { freq: 700 } })
      noise(0.25, { type: 'lowpass', freq: 400, vol: 0.25 })
    },
    whoosh() {
      noise(0.7, { freq: 400, slideTo: 2400, q: 1.2, vol: 0.22, attack: 0.25 })
    },
    chute() {
      noise(0.5, { type: 'lowpass', freq: 300, slideTo: 1200, vol: 0.3, attack: 0.08 })
      tone(110, 0.3, { type: 'sine', vol: 0.25, slideTo: 70, delay: 0.05 })
    },
    land() {
      noise(0.25, { type: 'lowpass', freq: 500, vol: 0.25 })
      tone(150, 0.2, { type: 'sine', vol: 0.25, slideTo: 80 })
    },
    jingle() {
      ;[72, 76, 79, 84, 88].forEach((n, i) => tone(NOTE(n), 0.3, { type: 'triangle', vol: 0.15, delay: i * 0.09 }))
      tone(NOTE(96), 0.6, { type: 'sine', vol: 0.06, delay: 0.45 })
    },
    star(i = 0) {
      const n = [79, 84, 88][i] || 88
      tone(NOTE(n), 0.35, { type: 'triangle', vol: 0.16 })
      tone(NOTE(n + 12), 0.3, { type: 'sine', vol: 0.05, delay: 0.03 })
    },
    crash() {
      tone(392, 0.9, { type: 'triangle', vol: 0.12, slideTo: 98 })
      noise(0.5, { type: 'lowpass', freq: 600, vol: 0.2, delay: 0.15 })
    },
    record() {
      ;[72, 79, 84, 79, 84, 91].forEach((n, i) => tone(NOTE(n), 0.22, { type: 'square', vol: 0.05, delay: i * 0.08, filter: { freq: 3000 } }))
    },
  }

  // -------------------------------------------------------------------------
  // Musik
  // -------------------------------------------------------------------------
  function schedule() {
    if (!ctx) return
    while (nextTime < ctx.currentTime + 0.15) {
      playStep(step, nextTime)
      nextTime += EIGHTH
      step++
    }
  }

  function playStep(s, at) {
    const bar = Math.floor(s / 8) % CHORDS.length
    const e = s % 8
    const ch = CHORDS[bar]
    const m = { dest: musicBus, at }
    if (e === 0) {
      for (const n of ch.tones) tone(NOTE(n), EIGHTH * 8.5, { ...m, vol: 0.035, attack: 0.35 })
    }
    if (e === 0 || e === 3 || e === 4 || e === 6) {
      tone(NOTE(ch.root), EIGHTH * 1.4, { ...m, type: 'triangle', vol: e === 0 ? 0.16 : 0.1 })
    }
    // Melodie: festes, aber pro Takt verschiedenes Muster
    const pattern = [0b10110101, 0b10010110, 0b11010010, 0b10100111][bar]
    if ((pattern >> (7 - e)) & 1) {
      const k = (s * 7 + bar * 3) % MELODY.length
      tone(NOTE(MELODY[k]), 0.25, { ...m, type: 'triangle', vol: 0.045, send: delay })
    }
    if (intensity > 0) {
      noise(0.035, { ...m, type: 'highpass', freq: 7000, vol: e % 2 ? 0.035 * intensity : 0.018 * intensity })
      if (e === 4) noise(0.12, { ...m, type: 'bandpass', freq: 1800, q: 0.6, vol: 0.05 * intensity })
    }
    if (e === 0 || e === 4) tone(60, 0.18, { ...m, vol: 0.18 * Math.max(0.4, intensity), slideTo: 40 })
  }

  function startMusic() {
    if (!ctx || timer) return
    nextTime = ctx.currentTime + 0.1
    timer = setInterval(schedule, 40)
  }
  function stopMusic() {
    clearInterval(timer)
    timer = 0
  }

  return {
    unlock,
    sfx: new Proxy(sfx, {
      get: (o, k) => (...a) => {
        if (ctx && sfxOn && o[k]) o[k](...a)
      },
    }),
    get sound() {
      return sfxOn
    },
    get music() {
      return musicOn
    },
    setSound(on) {
      sfxOn = on
      if (sfxBus) sfxBus.gain.value = on ? 1 : 0
    },
    setMusic(on) {
      musicOn = on
      if (!ctx) return
      musicBus.gain.setTargetAtTime(on ? 0.55 : 0, ctx.currentTime, 0.05)
      if (on) startMusic()
      else setTimeout(() => !musicOn && stopMusic(), 300)
    },
    setIntensity(v) {
      intensity = v
    },
    suspend() {
      if (ctx && ctx.state === 'running') ctx.suspend()
    },
    resume() {
      if (ctx && ctx.state === 'suspended') ctx.resume()
    },
    destroy() {
      stopMusic()
      if (ctx) ctx.close()
      ctx = null
    },
  }
}
