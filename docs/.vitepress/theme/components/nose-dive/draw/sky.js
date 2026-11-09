// Der Himmel: Farbverlauf, Sonne, drei Ebenen Wolken, Ballone, Springer, Vögel, Zeppelin, Fahrtwind.
// Alles steigt nach oben – so fühlt es sich an, als würde man fallen.

import { rand, pick, mix, TAU, clamp } from '../engine/util.js'
import { makeCloudSprite } from './cloud.js'
import { roundRect } from './diver.js'
import { FONT } from '../engine/particles.js'

const BALLOON_COLORS = [
  ['#ff5d73', '#ffd166'],
  ['#4cc9f0', '#ffffff'],
  ['#06d6a0', '#ffd166'],
  ['#b388ff', '#ffffff'],
  ['#ff9f1c', '#ff5d73'],
]
const CHUTE_COLORS = ['#ff5d73', '#4cc9f0', '#06d6a0', '#ffd166', '#b388ff']
const BANNERS = ['I have flown!', 'We flew!', 'Gone with the wind', 'You have done it!', 'I fell for you', 'Who has seen the wind?']

export function createSky() {
  let sprites = { far: [], near: [] }
  let far = []
  let mid = []
  let near = []
  let streaks = []
  let zeppelin = null
  let zepTimer = rand(6, 14)
  let builtFor = ''
  const sky = { alt: 1, time: 0 }

  function build(v) {
    const key = `${v.scale}|${v.dpr}`
    if (key === builtFor) return
    builtFor = key
    const px = v.scale * v.dpr
    sprites = {
      far: [0, 1, 2, 3].map((i) => makeCloudSprite(rand(50, 90), rand(20, 30), 100 + i, px * 0.8, { top: '#ffffff', bottom: '#eaf4ff', shade: 'rgba(140, 180, 230, 0.25)' })),
      near: [0, 1, 2, 3, 4].map((i) => makeCloudSprite(rand(150, 260), rand(56, 80), 200 + i, px, {})),
    }
  }

  function spanX(v, w = 0) {
    return rand(v.left - w * 0.3, v.right - w * 0.7)
  }

  function spawnFar(v, initial) {
    const s = pick(sprites.far)
    const k = rand(0.6, 1)
    return { s, k, x: spanX(v, s.w * k), y: initial ? rand(-20, v.H) : v.H + rand(10, 80), vy: rand(14, 26), vx: rand(3, 8), a: rand(0.45, 0.75) }
  }
  function spawnNear(v, initial) {
    const s = pick(sprites.near)
    const k = rand(0.8, 1.25)
    return { s, k, x: spanX(v, s.w * k), y: initial ? rand(0, v.H * 1.4) : v.H + rand(40, 260), vy: rand(150, 210), vx: rand(-6, 6), a: rand(0.7, 0.92) }
  }
  function spawnMid(v, initial) {
    const r = Math.random()
    const y = initial ? rand(60, v.H) : v.H + rand(20, 120)
    if (r < 0.3) return { type: 'balloon', x: rand(v.left + 20, v.right - 20), y, vy: rand(40, 55), vx: rand(-8, 8), k: rand(0.55, 0.9), c: pick(BALLOON_COLORS) }
    if (r < 0.55) return { type: 'chute', x: rand(v.left + 20, v.right - 20), base: 0, y, vy: rand(48, 60), ph: rand(TAU), amp: rand(6, 14), k: rand(0.5, 0.75), c: pick(CHUTE_COLORS) }
    const dir = Math.random() < 0.5 ? -1 : 1
    return { type: 'birds', x: dir > 0 ? v.left - 40 : v.right + 40, y: initial ? rand(80, v.H) : v.H * rand(0.4, 1), vy: rand(30, 45), vx: dir * rand(45, 70), n: 2 + Math.floor(rand(4)), ph: rand(TAU), k: rand(0.8, 1.1) }
  }

  function reset(v) {
    build(v)
    far = Array.from({ length: 9 }, () => spawnFar(v, true))
    mid = Array.from({ length: 4 }, () => spawnMid(v, true))
    near = Array.from({ length: 3 }, () => spawnNear(v, true))
    streaks = []
    zeppelin = null
  }

  sky.reset = reset
  sky.resize = (v) => {
    build(v)
    if (!far.length) reset(v)
  }

  /** speed: 1 = normaler Fall, 0 = stillstehend (Landung) */
  sky.update = (dt, v, speed) => {
    sky.time += dt
    for (let i = 0; i < far.length; i++) {
      const e = far[i]
      e.y -= e.vy * (0.3 + speed * 0.7) * dt
      e.x += e.vx * dt
      if (e.y < -60 || e.x > v.right + 40) far[i] = spawnFar(v, false)
    }
    for (let i = 0; i < near.length; i++) {
      const e = near[i]
      e.y -= e.vy * speed * dt
      e.x += e.vx * dt
      if (e.y < -e.s.h * e.k - 20) near[i] = spawnNear(v, false)
    }
    for (let i = 0; i < mid.length; i++) {
      const e = mid[i]
      e.y -= e.vy * (0.25 + speed * 0.75) * dt
      e.x += (e.vx || 0) * dt
      if (e.ph !== undefined) e.ph += dt * (e.type === 'birds' ? 9 : 1.4)
      const out = e.y < -60 || (e.type === 'birds' && (e.x < v.left - 90 || e.x > v.right + 90))
      if (out) mid[i] = spawnMid(v, false)
    }
    // Fahrtwind
    const want = Math.round(speed * 9)
    if (streaks.length < want && Math.random() < dt * 30) streaks.push({ x: rand(v.left, v.right), y: v.H + 20, len: rand(30, 90), vy: rand(500, 800), a: rand(0.15, 0.35) })
    for (let i = streaks.length - 1; i >= 0; i--) {
      const s = streaks[i]
      s.y -= s.vy * Math.max(speed, 0.2) * dt
      if (s.y < -s.len) streaks.splice(i, 1)
    }
    // Zeppelin ab und zu
    if (zeppelin) {
      zeppelin.x += zeppelin.vx * dt
      zeppelin.y -= zeppelin.vy * (0.3 + speed * 0.7) * dt
      zeppelin.prop += dt * 30
      if (zeppelin.x < v.left - 320 || zeppelin.x > v.right + 320 || zeppelin.y < -80) {
        zeppelin = null
        zepTimer = rand(16, 30)
      }
    } else {
      zepTimer -= dt
      if (zepTimer <= 0) {
        const dir = Math.random() < 0.5 ? -1 : 1
        zeppelin = { x: dir > 0 ? v.left - 200 : v.right + 200, y: v.H * rand(0.55, 0.9), vx: dir * rand(28, 38), vy: rand(14, 20), dir, prop: 0, text: pick(BANNERS) }
      }
    }
  }

  sky.drawBack = (ctx, v) => {
    const low = 1 - sky.alt
    const g = ctx.createLinearGradient(0, 0, 0, v.H)
    g.addColorStop(0, mix('#1b63c9', '#4aa8f5', low))
    g.addColorStop(0.55, mix('#4f9cf0', '#8fd0ff', low))
    g.addColorStop(1, mix('#a7d8ff', '#e4f6ff', low))
    ctx.fillStyle = g
    ctx.fillRect(v.left - 2, -2, v.right - v.left + 4, v.H + 4)

    // Sonne
    const sx = v.left + Math.min(70, (v.right - v.left) * 0.16)
    const sy = 74
    const glow = ctx.createRadialGradient(sx, sy, 10, sx, sy, 140)
    glow.addColorStop(0, 'rgba(255, 246, 200, 0.85)')
    glow.addColorStop(0.3, 'rgba(255, 240, 180, 0.3)')
    glow.addColorStop(1, 'rgba(255, 240, 180, 0)')
    ctx.fillStyle = glow
    ctx.fillRect(sx - 140, sy - 140, 280, 280)
    ctx.save()
    ctx.translate(sx, sy)
    ctx.rotate(sky.time * 0.05)
    ctx.fillStyle = 'rgba(255, 248, 210, 0.22)'
    for (let i = 0; i < 12; i++) {
      ctx.rotate(TAU / 12)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(-9, 120)
      ctx.lineTo(9, 120)
      ctx.fill()
    }
    ctx.restore()
    ctx.fillStyle = '#fff6c9'
    ctx.beginPath()
    ctx.arc(sx, sy, 26, 0, TAU)
    ctx.fill()

    for (const e of far) {
      ctx.globalAlpha = e.a
      ctx.drawImage(e.s.img, e.x, e.y, e.s.w * e.k, e.s.h * e.k)
    }
    ctx.globalAlpha = 1
    for (const e of mid) drawMid(ctx, e)
    if (zeppelin) drawZeppelin(ctx, zeppelin)
    for (const e of near) {
      ctx.globalAlpha = e.a
      ctx.drawImage(e.s.img, e.x, e.y, e.s.w * e.k, e.s.h * e.k)
    }
    ctx.globalAlpha = 1
    ctx.strokeStyle = '#ffffff'
    ctx.lineCap = 'round'
    ctx.lineWidth = 1.6
    for (const s of streaks) {
      ctx.globalAlpha = s.a
      ctx.beginPath()
      ctx.moveTo(s.x, s.y)
      ctx.lineTo(s.x, s.y + s.len)
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }

  return sky
}

// ---------------------------------------------------------------------------
// Figuren am Himmel
// ---------------------------------------------------------------------------

function drawMid(ctx, e) {
  ctx.save()
  ctx.translate(e.type === 'chute' ? e.x + Math.sin(e.ph) * e.amp : e.x, e.y)
  ctx.scale(e.k, e.k)
  if (e.type === 'balloon') drawBalloon(ctx, e.c)
  else if (e.type === 'chute') drawMiniChute(ctx, e.c, Math.sin(e.ph) * 0.15)
  else drawBirds(ctx, e)
  ctx.restore()
}

function drawBalloon(ctx, [c1, c2]) {
  ctx.globalAlpha = 0.92
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(0, 26)
  ctx.bezierCurveTo(-26, 8, -26, -30, 0, -30)
  ctx.bezierCurveTo(26, -30, 26, 8, 0, 26)
  ctx.clip()
  ctx.fillStyle = c1
  ctx.fillRect(-30, -32, 60, 60)
  ctx.fillStyle = c2
  for (const x of [-14, 6]) ctx.fillRect(x, -32, 8, 60)
  const g = ctx.createLinearGradient(-26, 0, 26, 0)
  g.addColorStop(0, 'rgba(255,255,255,0.3)')
  g.addColorStop(1, 'rgba(0,0,40,0.25)')
  ctx.fillStyle = g
  ctx.fillRect(-30, -32, 60, 60)
  ctx.restore()
  ctx.strokeStyle = 'rgba(80, 60, 40, 0.8)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(-6, 24)
  ctx.lineTo(-5, 34)
  ctx.moveTo(6, 24)
  ctx.lineTo(5, 34)
  ctx.stroke()
  ctx.fillStyle = '#a0643b'
  roundRect(ctx, -6, 33, 12, 9, 2)
  ctx.fill()
  ctx.globalAlpha = 1
}

function drawMiniChute(ctx, color, tilt) {
  ctx.rotate(tilt)
  ctx.globalAlpha = 0.9
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(-22, 0)
  ctx.bezierCurveTo(-22, -24, 22, -24, 22, 0)
  ctx.quadraticCurveTo(11, -5, 0, 0)
  ctx.quadraticCurveTo(-11, -5, -22, 0)
  ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.beginPath()
  ctx.moveTo(-4, -17)
  ctx.bezierCurveTo(-3, -18, 3, -18, 4, -17)
  ctx.lineTo(3, -1)
  ctx.lineTo(-3, -1)
  ctx.fill()
  ctx.strokeStyle = 'rgba(40,40,60,0.5)'
  ctx.lineWidth = 0.8
  ctx.beginPath()
  ctx.moveTo(-21, 0)
  ctx.lineTo(0, 20)
  ctx.lineTo(21, 0)
  ctx.stroke()
  ctx.fillStyle = '#2b2d42'
  ctx.beginPath()
  ctx.arc(0, 21, 3.2, 0, TAU)
  ctx.fill()
  ctx.fillRect(-2.2, 23, 4.4, 8)
  ctx.globalAlpha = 1
}

function drawBirds(ctx, e) {
  ctx.strokeStyle = 'rgba(30, 50, 80, 0.7)'
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  const dir = e.vx > 0 ? 1 : -1
  for (let i = 0; i < e.n; i++) {
    const ox = -i * 16 * dir
    const oy = (i % 2 ? 1 : -1) * Math.ceil(i / 2) * 9
    const flap = Math.sin(e.ph + i * 0.9) * 5
    ctx.beginPath()
    ctx.moveTo(ox - 8, oy - flap)
    ctx.quadraticCurveTo(ox - 3, oy - 3, ox, oy + 1)
    ctx.quadraticCurveTo(ox + 3, oy - 3, ox + 8, oy - flap)
    ctx.stroke()
  }
}

function drawZeppelin(ctx, z) {
  ctx.save()
  ctx.translate(z.x, z.y)
  ctx.globalAlpha = 0.95
  // Banner hinterher
  const bx = -z.dir * 150
  ctx.font = `700 13px ${FONT}`
  const tw = ctx.measureText(z.text).width + 20
  const bannerX = z.dir > 0 ? bx - tw / 2 : bx - tw / 2
  ctx.strokeStyle = 'rgba(60,60,80,0.6)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(-z.dir * 60, 4)
  ctx.lineTo(z.dir > 0 ? bannerX + tw : bannerX, 0)
  ctx.stroke()
  ctx.fillStyle = '#fffaf0'
  ctx.beginPath()
  const wave = (x) => Math.sin(x * 0.08 + z.prop * 0.15) * 2
  ctx.moveTo(bannerX, -10 + wave(0))
  for (let x = 0; x <= tw; x += 8) ctx.lineTo(bannerX + x, -10 + wave(x))
  for (let x = tw; x >= 0; x -= 8) ctx.lineTo(bannerX + x, 10 + wave(x))
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = '#e63946'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(z.text, bannerX + tw / 2, 1)

  // Hülle
  if (z.dir < 0) ctx.scale(-1, 1)
  const g = ctx.createLinearGradient(0, -24, 0, 24)
  g.addColorStop(0, '#f1f4f8')
  g.addColorStop(1, '#9aa7b8')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.ellipse(0, 0, 62, 21, 0, 0, TAU)
  ctx.fill()
  ctx.fillStyle = '#e63946'
  ctx.fillRect(-20, -21, 8, 42)
  // Flossen
  ctx.fillStyle = '#7d8aa0'
  ctx.beginPath()
  ctx.moveTo(-48, -10)
  ctx.lineTo(-68, -24)
  ctx.lineTo(-62, -2)
  ctx.closePath()
  ctx.moveTo(-48, 10)
  ctx.lineTo(-68, 24)
  ctx.lineTo(-62, 2)
  ctx.closePath()
  ctx.fill()
  // Gondel
  ctx.fillStyle = '#5c6b80'
  roundRect(ctx, -10, 18, 26, 9, 4)
  ctx.fill()
  ctx.fillStyle = '#bfe6ff'
  for (const x of [-6, 1, 8]) ctx.fillRect(x, 20, 4, 3)
  // Propeller
  ctx.fillStyle = 'rgba(60,60,80,0.5)'
  ctx.beginPath()
  ctx.ellipse(-64, 0, 2, 9 * Math.abs(Math.sin(z.prop)), 0, 0, TAU)
  ctx.fill()
  ctx.restore()
}

/** Flugzeug für den Absprung. */
export function drawPlane(ctx, x, y, t) {
  ctx.save()
  ctx.translate(x, y)
  // Rumpf
  const g = ctx.createLinearGradient(0, -14, 0, 14)
  g.addColorStop(0, '#ffffff')
  g.addColorStop(1, '#c9d6e6')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.moveTo(-58, -4)
  ctx.quadraticCurveTo(-60, -14, -40, -14)
  ctx.lineTo(40, -12)
  ctx.quadraticCurveTo(70, -8, 74, 6)
  ctx.lineTo(60, 12)
  ctx.lineTo(-40, 12)
  ctx.quadraticCurveTo(-60, 10, -58, -4)
  ctx.fill()
  // Streifen
  ctx.fillStyle = '#e63946'
  ctx.fillRect(-40, 1, 96, 4)
  // Fenster + Tür
  ctx.fillStyle = '#4c8fd6'
  for (let i = 0; i < 5; i++) ctx.fillRect(-28 + i * 13, -7, 7, 5)
  ctx.fillStyle = '#2b2d42'
  roundRect(ctx, 34, -8, 11, 18, 2)
  ctx.fill()
  // Cockpit
  ctx.fillStyle = '#8fd0ff'
  ctx.beginPath()
  ctx.moveTo(-50, -6)
  ctx.quadraticCurveTo(-48, -13, -38, -13)
  ctx.lineTo(-38, -5)
  ctx.closePath()
  ctx.fill()
  // Flügel
  ctx.fillStyle = '#e63946'
  ctx.beginPath()
  ctx.moveTo(-14, 4)
  ctx.lineTo(24, 4)
  ctx.lineTo(6, 22)
  ctx.lineTo(-10, 22)
  ctx.closePath()
  ctx.fill()
  // Leitwerk
  ctx.beginPath()
  ctx.moveTo(50, -10)
  ctx.lineTo(70, -34)
  ctx.lineTo(78, -34)
  ctx.lineTo(70, -4)
  ctx.closePath()
  ctx.fill()
  // Propeller
  ctx.fillStyle = 'rgba(40,40,60,0.45)'
  ctx.beginPath()
  ctx.ellipse(-61, -1, 2.5, 16 * Math.abs(Math.sin(t * 40)), 0, 0, TAU)
  ctx.fill()
  ctx.fillStyle = '#2b2d42'
  ctx.beginPath()
  ctx.arc(-60, -1, 3, 0, TAU)
  ctx.fill()
  ctx.restore()
}

/** Wiese zum Landen. gy = Oberkante der Wiese (Spiel-Einheiten). */
export function drawGround(ctx, v, gy, t) {
  if (gy > v.H + 160) return
  const L = v.left - 4
  const R = v.right + 4
  // ferne Hügel
  ctx.fillStyle = '#9ad8a0'
  ctx.beginPath()
  ctx.moveTo(L, gy + 10)
  for (let x = L; x <= R + 40; x += 40) ctx.quadraticCurveTo(x + 20, gy - 40 - Math.sin(x * 0.02) * 22, x + 40, gy + 6)
  ctx.lineTo(R, v.H + 200)
  ctx.lineTo(L, v.H + 200)
  ctx.fill()
  // Bäume hinten
  for (let x = L + 20; x < R; x += 46) {
    const ty = gy + 4 + Math.sin(x) * 4
    ctx.fillStyle = '#6b4f3a'
    ctx.fillRect(x - 2, ty - 6, 4, 12)
    ctx.fillStyle = '#4caf6a'
    ctx.beginPath()
    ctx.arc(x, ty - 12, 11 + Math.sin(x * 3) * 3, 0, TAU)
    ctx.fill()
  }
  // Wiese
  const g = ctx.createLinearGradient(0, gy, 0, gy + 160)
  g.addColorStop(0, '#7ed36f')
  g.addColorStop(1, '#4caf50')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.moveTo(L, gy + 22)
  ctx.quadraticCurveTo((L + R) / 2, gy - 4, R, gy + 22)
  ctx.lineTo(R, v.H + 200)
  ctx.lineTo(L, v.H + 200)
  ctx.fill()
  // Landeziel
  const cx = v.W / 2
  const cy = gy + 44
  for (const [r, c] of [[46, '#ffffff'], [34, '#ff5d73'], [22, '#ffffff'], [10, '#ff5d73']]) {
    ctx.fillStyle = c
    ctx.beginPath()
    ctx.ellipse(cx, cy, r, r * 0.32, 0, 0, TAU)
    ctx.fill()
  }
  // Fahne
  const fx = cx + 92
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(fx, cy - 52, 3, 54)
  ctx.fillStyle = '#ffd166'
  ctx.beginPath()
  ctx.moveTo(fx + 3, cy - 52)
  ctx.quadraticCurveTo(fx + 18, cy - 48 + Math.sin(t * 6) * 3, fx + 30, cy - 44)
  ctx.lineTo(fx + 3, cy - 36)
  ctx.fill()
  // Blumen
  for (let i = 0; i < 18; i++) {
    const x = L + ((i * 97) % Math.max(1, R - L))
    const y = gy + 60 + ((i * 53) % 90)
    ctx.fillStyle = ['#ffffff', '#ffd166', '#ff8fab'][i % 3]
    ctx.beginPath()
    ctx.arc(x, y, 2.6, 0, TAU)
    ctx.fill()
  }
  return clamp(cy, 0, v.H)
}
