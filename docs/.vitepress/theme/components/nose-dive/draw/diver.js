// Der Fallschirmspringer – komplett aus Pfaden gezeichnet.
//
// d: { x, y, tilt, spin, chute (0…1), pose (0 = freier Fall, 1 = hängt am Schirm), hurt (Sekunden),
//      blink, mood: 'happy' | 'oops' | 'dizzy' | 'cheer' }

import { lerp, TAU } from '../engine/util.js'

const SUIT = '#ff7a3d'
const SUIT_DARK = '#d9551d'
const STRIPE = '#ffd166'
const SKIN = '#ffd2a6'
const HELMET = '#e63946'
const BOOT = '#2b2d42'
const CANOPY = ['#ff5d73', '#ffffff', '#ffd166', '#ffffff', '#4cc9f0', '#ffffff', '#ff5d73']

const P = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)]

function limb(ctx, pts, width, color) {
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
  ctx.stroke()
}

export function drawDiver(ctx, d, t) {
  const pose = d.pose || 0
  const f = Math.sin(t * 14) * 1.6 * (1 - pose)
  const cheer = d.mood === 'cheer' ? 1 : 0

  ctx.save()
  ctx.translate(d.x, d.y)
  if (d.chute > 0) drawCanopy(ctx, d, t)
  ctx.rotate((d.tilt || 0) + (d.spin || 0))
  const s = d.scale || 1
  if (s !== 1) ctx.scale(s, s)
  if (d.hurt > 0 && Math.floor(d.hurt * 14) % 2 === 0) ctx.globalAlpha = 0.45

  // Schal (flattert nach oben, weg von der Lenkrichtung)
  const dir = (d.tilt || 0) > 0.05 ? -1 : 1
  ctx.strokeStyle = STRIPE
  ctx.lineCap = 'round'
  for (let pass = 0; pass < 2; pass++) {
    ctx.lineWidth = pass === 0 ? 6 : 3
    ctx.strokeStyle = pass === 0 ? '#f4b733' : STRIPE
    ctx.beginPath()
    for (let i = 0; i <= 7; i++) {
      const up = lerp(-1, 0.6, pose) // am Schirm hängt der Schal eher nach unten
      const x = 5 * dir + i * 3.2 * dir + Math.sin(t * 11 - i * 0.9) * i * 0.9
      const y = -15 + i * 6 * up
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  // Beine
  const legL = [[-6, 12], P([-15, 23 - f], [-6, 27], pose), P([-13, 34 - f], [-7, 40], pose)]
  const legR = legL.map(([x, y], i) => [-x, i ? y + (i === 2 ? f * 2 : f) : y])
  limb(ctx, legL, 8.5, SUIT)
  limb(ctx, legR, 8.5, SUIT)
  ctx.fillStyle = BOOT
  for (const leg of [legL, legR]) {
    ctx.beginPath()
    ctx.ellipse(leg[2][0], leg[2][1] + 2, 5, 4, 0, 0, TAU)
    ctx.fill()
  }

  // Arme: im Fall als „W“, am Schirm nach oben an die Gurte, beim Jubeln hoch
  const armUp = Math.max(pose, cheer)
  const armL = [[-9, -8], P([-22, -15 + f], [-14, -22], armUp), P([-24, -29 + f], [-15, -36], armUp)]
  const armR = armL.map(([x, y], i) => [-x, i ? y - f * 2 : y])
  limb(ctx, armL, 7, SUIT)
  limb(ctx, armR, 7, SUIT)
  ctx.fillStyle = BOOT
  for (const arm of [armL, armR]) {
    ctx.beginPath()
    ctx.arc(arm[2][0], arm[2][1], 3.8, 0, TAU)
    ctx.fill()
  }

  // Körper
  ctx.fillStyle = SUIT
  roundRect(ctx, -11.5, -15, 23, 31, 10)
  ctx.fill()
  ctx.fillStyle = SUIT_DARK
  roundRect(ctx, -11.5, 6, 23, 10, 6)
  ctx.fill()
  ctx.fillStyle = STRIPE
  ctx.fillRect(-11.5, -5, 23, 4.5)
  ctx.fillStyle = BOOT
  ctx.fillRect(-11.5, 8, 23, 3)
  // Gurte
  ctx.strokeStyle = 'rgba(43, 45, 66, 0.55)'
  ctx.lineWidth = 2.2
  ctx.beginPath()
  ctx.moveTo(-7, -14)
  ctx.lineTo(-4, 8)
  ctx.moveTo(7, -14)
  ctx.lineTo(4, 8)
  ctx.stroke()

  // Kopf
  ctx.fillStyle = SKIN
  ctx.beginPath()
  ctx.arc(0, -25, 11.5, 0, TAU)
  ctx.fill()
  // Helm
  ctx.fillStyle = HELMET
  ctx.beginPath()
  ctx.arc(0, -26, 12.5, Math.PI * 1.02, Math.PI * 1.98)
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.beginPath()
  ctx.ellipse(-5, -34, 4, 2, -0.4, 0, TAU)
  ctx.fill()
  // Brille
  ctx.fillStyle = BOOT
  ctx.fillRect(-12, -28, 24, 3.5)
  for (const gx of [-8.5, 1.5]) {
    ctx.fillStyle = BOOT
    roundRect(ctx, gx - 1, -31, 9, 8, 3)
    ctx.fill()
    const g = ctx.createLinearGradient(0, -30, 0, -24)
    g.addColorStop(0, '#9be7ff')
    g.addColorStop(1, '#2b8fd6')
    ctx.fillStyle = g
    roundRect(ctx, gx, -30, 7, 6, 2.5)
    ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.fillRect(gx + 1.2, -29, 2, 1.6)
  }
  // Mund
  ctx.strokeStyle = '#7a3b2e'
  ctx.fillStyle = '#7a3b2e'
  ctx.lineWidth = 1.8
  ctx.lineCap = 'round'
  ctx.beginPath()
  if (d.mood === 'oops' || d.mood === 'dizzy') {
    ctx.ellipse(0, -17.5, 2.6, 3, 0, 0, TAU)
    ctx.fill()
  } else if (cheer || d.mood === 'happy') {
    ctx.arc(0, -19.5, 4.2, 0.15 * Math.PI, 0.85 * Math.PI)
    if (cheer) ctx.fill()
    else ctx.stroke()
  }
  // Bäckchen
  ctx.fillStyle = 'rgba(255, 120, 120, 0.35)'
  ctx.beginPath()
  ctx.arc(-7.5, -19.5, 2.4, 0, TAU)
  ctx.arc(7.5, -19.5, 2.4, 0, TAU)
  ctx.fill()

  ctx.restore()
}

function drawCanopy(ctx, d, t) {
  const k = d.chute
  const sway = Math.sin(t * 2.2) * 0.05 * k
  ctx.save()
  ctx.rotate(sway)
  const w = 108 * k
  const top = -112 + 30 * (1 - k)
  const h = 44 * Math.min(1, k * 1.4)
  const bottom = top + h

  // Leinen zu den Händen
  ctx.strokeStyle = 'rgba(60, 60, 80, 0.6)'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  for (const sx of [-1, -0.45, 0.45, 1]) {
    const hand = sx < 0 ? -15 : 15
    ctx.moveTo((sx * w) / 2, bottom)
    ctx.lineTo(hand, -36)
  }
  ctx.stroke()

  // Kappe in Streifen
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(-w / 2, bottom)
  ctx.bezierCurveTo(-w / 2, top - h * 0.25, w / 2, top - h * 0.25, w / 2, bottom)
  // gewellter Rand
  const n = CANOPY.length
  for (let i = n; i > 0; i--) {
    const x1 = -w / 2 + (w * i) / n
    const x0 = -w / 2 + (w * (i - 1)) / n
    ctx.quadraticCurveTo((x0 + x1) / 2, bottom - h * 0.22, x0, bottom)
  }
  ctx.closePath()
  ctx.clip()
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = CANOPY[i]
    ctx.fillRect(-w / 2 + (w * i) / n, top - h, w / n + 0.5, h * 2.5)
  }
  const g = ctx.createLinearGradient(0, top - h * 0.2, 0, bottom)
  g.addColorStop(0, 'rgba(255,255,255,0.25)')
  g.addColorStop(1, 'rgba(0,0,40,0.18)')
  ctx.fillStyle = g
  ctx.fillRect(-w / 2, top - h, w, h * 2.5)
  ctx.restore()
  ctx.restore()
}

export function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
