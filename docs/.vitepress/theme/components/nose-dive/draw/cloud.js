// Wolken: die Form (aus Kreisen), die Antwort-Wolken und vorgerenderte Hintergrund-Wolken.

import { TAU, seeded, hash, ease } from '../engine/util.js'
import { FONT } from '../engine/particles.js'

/** Kreise einer Wolke (zentriert, Breite w, Höhe h). Unterseite flach, oben Beulen. */
export function cloudPuffs(w, h, seed = 1) {
  const rng = seeded(seed)
  const puffs = []
  const rBase = h * 0.34
  const n = Math.max(2, Math.ceil((w - rBase * 2) / (rBase * 1.1)) + 1)
  for (let i = 0; i < n; i++) {
    const cx = -w / 2 + rBase + ((w - rBase * 2) * i) / (n - 1)
    puffs.push([cx, h * 0.16, rBase])
  }
  const m = Math.max(1, Math.round(w / (h * 0.85)))
  for (let j = 0; j < m; j++) {
    const cx = -w / 2 + (w * (j + 0.5)) / m + (rng() - 0.5) * h * 0.25
    const r = h * (0.3 + rng() * 0.17)
    const edge = Math.min(cx + w / 2, w / 2 - cx) // am Rand kleiner
    const rr = Math.min(r, edge * 0.95 + h * 0.08)
    puffs.push([cx, -h * 0.02 - rng() * h * 0.08, rr])
  }
  return puffs
}

export function cloudPath(ctx, puffs, w, h, scale = 1) {
  ctx.beginPath()
  for (const [x, y, r] of puffs) {
    ctx.moveTo(x * scale + r * scale, y * scale)
    ctx.arc(x * scale, y * scale, r * scale, 0, TAU)
  }
  const r0 = h * 0.34 * scale
  ctx.rect((-w / 2) * scale + r0, 0, w * scale - r0 * 2, h * 0.5 * scale)
}

/** Weiche Wolke mit Schatten an der Unterseite – für den Hintergrund. */
export function drawSoftCloud(ctx, puffs, w, h, { top = '#ffffff', bottom = '#e3efff', shade = 'rgba(120, 160, 215, 0.35)' } = {}) {
  ctx.save()
  ctx.translate(0, h * 0.09)
  ctx.fillStyle = shade
  cloudPath(ctx, puffs, w, h)
  ctx.fill()
  ctx.restore()
  const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2)
  g.addColorStop(0, top)
  g.addColorStop(1, bottom)
  ctx.fillStyle = g
  cloudPath(ctx, puffs, w, h)
  ctx.fill()
}

/** Vorgerenderte Wolke als Bild (für viele Hintergrund-Wolken). */
export function makeCloudSprite(w, h, seed, pxPerUnit, colors) {
  const pad = h * 0.25
  const c = document.createElement('canvas')
  c.width = Math.ceil((w + pad * 2) * pxPerUnit)
  c.height = Math.ceil((h + pad * 2) * pxPerUnit)
  const ctx = c.getContext('2d')
  ctx.scale(pxPerUnit, pxPerUnit)
  ctx.translate(w / 2 + pad, h / 2 + pad)
  drawSoftCloud(ctx, cloudPuffs(w, h, seed), w, h, colors)
  return { img: c, w: w + pad * 2, h: h + pad * 2 }
}

// ---------------------------------------------------------------------------
// Antwort-Wolken
// ---------------------------------------------------------------------------

export function cloudFont(size) {
  return `800 ${size}px ${FONT}`
}

/** Wolke für eine Antwort anlegen (Maße aus der Textbreite). */
export function makeAnswerCloud(ctx, text, correct, fontSize) {
  ctx.font = cloudFont(fontSize)
  const tw = ctx.measureText(text).width
  const w = Math.max(fontSize * 3.6, tw + fontSize * 1.7)
  const h = fontSize * 2.45
  return { text, correct, w, h, fs: fontSize, puffs: cloudPuffs(w, h, hash(text) + 7), x: 0, y: 0, state: 'idle', t: 0, aim: 0, shake: 0 }
}

const STATE_COLORS = {
  idle: ['#ffffff', '#e8f1ff'],
  good: ['#e9fff1', '#b8f5cf'],
  bad: ['#d5dbe3', '#aab4c2'],
  reveal: ['#e9fff1', '#b8f5cf'],
}

/** Eine Antwort-Wolke zeichnen. c.state: idle | good (getroffen, richtig) | bad (falsch) | reveal (die richtige zeigen) | fade */
export function drawAnswerCloud(ctx, c, time) {
  let scale = 1
  let alpha = 1
  let dx = 0
  const st = c.state
  if (st === 'good') {
    const k = Math.min(1, c.t / 0.35)
    scale = 1 + ease.outCubic(k) * 0.35
    alpha = 1 - k
  } else if (st === 'bad') {
    dx = Math.sin(c.t * 60) * 6 * Math.max(0, 1 - c.t / 0.45)
    alpha = c.t > 0.9 ? Math.max(0, 1 - (c.t - 0.9) / 0.4) : 1
  } else if (st === 'fade') {
    alpha = Math.max(0, 1 - c.t / 0.35)
    scale = 1 - Math.min(1, c.t / 0.35) * 0.15
  } else if (st === 'reveal') {
    scale = 1 + Math.sin(c.t * 9) * 0.04 + Math.min(1, c.t * 5) * 0.06
  }
  if (alpha <= 0) return
  const [top, bottom] = STATE_COLORS[st] || STATE_COLORS.idle
  const { w, h } = c

  ctx.save()
  ctx.globalAlpha = alpha
  ctx.translate(c.x + dx, c.y)
  ctx.scale(scale, scale)

  // Schatten
  ctx.save()
  ctx.translate(0, h * 0.16)
  ctx.fillStyle = 'rgba(25, 70, 140, 0.16)'
  cloudPath(ctx, c.puffs, w, h)
  ctx.fill()
  ctx.restore()

  // Leuchten, wenn der Springer darüber ist / bei der richtigen Lösung
  const glow = st === 'reveal' ? 1 : st === 'idle' ? c.aim : 0
  if (glow > 0.01) {
    ctx.save()
    ctx.globalAlpha = alpha * glow * (st === 'reveal' ? 0.85 + Math.sin(time * 10) * 0.15 : 0.9)
    ctx.fillStyle = st === 'reveal' ? '#3ddc84' : '#fff3a8'
    const s = 1 + 9 / w
    ctx.scale(s, 1 + 9 / h)
    cloudPath(ctx, c.puffs, w, h)
    ctx.fill()
    ctx.restore()
  }

  // Unterseite + Körper
  ctx.save()
  ctx.translate(0, h * 0.08)
  ctx.fillStyle = st === 'bad' ? '#8f9aab' : st === 'idle' ? '#bcd3f2' : '#86e0aa'
  cloudPath(ctx, c.puffs, w, h)
  ctx.fill()
  ctx.restore()
  const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2)
  g.addColorStop(0, top)
  g.addColorStop(1, bottom)
  ctx.fillStyle = g
  cloudPath(ctx, c.puffs, w, h)
  ctx.fill()

  // Text
  ctx.font = cloudFont(c.fs)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = st === 'bad' ? '#4f5b6b' : st === 'reveal' || st === 'good' ? '#0d6b3a' : '#1b2a4a'
  ctx.fillText(c.text, 0, h * 0.1)
  if (st === 'bad') {
    // durchstreichen
    const tw = ctx.measureText(c.text).width
    ctx.strokeStyle = '#e63946'
    ctx.lineWidth = 3.5
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(-tw / 2 - 4, h * 0.12)
    ctx.lineTo(tw / 2 + 4, h * 0.06)
    ctx.stroke()
  }
  ctx.restore()
}
