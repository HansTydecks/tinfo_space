<script setup>
// Modulo-Visualizer: sechs endlos laufende Ansichten auf einem <canvas>.
// Kein externes 3D-Paket – die Spirale wird mit einer kleinen eigenen
// Perspektiv-Projektion gezeichnet. Alles Canvas-Zeug läuft erst in onMounted
// (SSR-sicher).
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const VIEWS = [
  { id: 'tabelle', icon: '🔢', label: 'Tabelle' },
  { id: 'spirale', icon: '🌀', label: '3D-Spirale' },
  { id: 'uhr', icon: '🕒', label: 'Modulo-Uhr' },
  { id: 'kreis', icon: '💮', label: 'Multiplikationskreis' },
  { id: 'pascal', icon: '🔺', label: 'Pascal mod n' },
  { id: 'saege', icon: '📈', label: 'Sägezahn' },
]

const HINTS = {
  tabelle:
    'Die Zahlen laufen zeilenweise in n Spalten. Jede Spalte ist eine Restklasse: Alle Zahlen darin haben beim Teilen durch n denselben Rest.',
  tafel:
    'Jede Zeile ist eine Zahl a, jede Spalte ein Teiler n. Die Farbe zeigt a % n. Fahre mit der Maus über ein Feld, um die Rechnung zu sehen.',
  spirale:
    'Jede Umdrehung der Spirale hat genau n Plätze. Deshalb liegen alle Zahlen mit demselben Rest senkrecht übereinander und bilden eine leuchtende Säule. Ziehe mit der Maus, um die Spirale zu drehen.',
  uhr:
    'Wie bei einer Uhr: Nach n Schritten ist eine Runde voll und der Zeiger beginnt wieder bei 0. a // n zählt die Runden, a % n ist die Position auf dem Zifferblatt.',
  kreis:
    '200 Punkte auf einem Kreis. Jeder Punkt k wird mit dem Punkt (k · f) % 200 verbunden. Während der Faktor f langsam wächst, entstehen Herzen, Blüten und Sterne.',
  pascal:
    'Jedes Feld ist die Summe der beiden Felder darüber – gerechnet mit % m. Die Farbe zeigt den Rest, Felder mit Rest 0 bleiben dunkel. Bei m = 2 entsteht das Sierpinski-Dreieck.',
  saege:
    'Oben: x % n steigt an und fällt bei jedem Vielfachen von n auf 0 zurück – ein Sägezahn. Unten: x // n bleibt stehen und springt dann eine Stufe höher.',
}

const view = ref('tabelle')
const n = ref(7)
const speed = ref(1)
const playing = ref(true)
const tableMode = ref('reihen') // 'reihen' | 'tafel'
const readout = ref('')
const subReadout = ref('')

const usesN = computed(() => !(view.value === 'kreis' || (view.value === 'tabelle' && tableMode.value === 'tafel')))
const hint = computed(() => HINTS[view.value === 'tabelle' && tableMode.value === 'tafel' ? 'tafel' : view.value])
const legend = computed(() => Array.from({ length: n.value }, (_, r) => ({ r, color: col(r, n.value) })))

const stage = ref(null)
const canvas = ref(null)

// ---------- Zustand außerhalb von Vue (pro Frame) ----------
let ctx = null
let W = 0
let H = 0
let dpr = 1
let raf = 0
let last = 0
let t = 0 // Zählwert; a = floor(t)
let visible = true
let resizeObs = null
let interObs = null
let bgGrad = null
const mouse = { x: -1, y: -1, inside: false }
const drag = { active: false, x: 0, y: 0, yaw: 0, tilt: 0.42, autoYaw: 0 }
const RATE = 2 // Zählschritte pro Sekunde bei Tempo 1

// ---------- Farben ----------
function hue(r, m) {
  return (200 + (360 * r) / m) % 360
}
function col(r, m, l = 62, a = 1) {
  return `hsla(${hue(r, m).toFixed(1)}, 88%, ${l}%, ${a})`
}

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
const SANS = 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif'
const font = (size, weight = 600, fam = MONO) => `${weight} ${Math.round(size)}px ${fam}`

function roundRect(x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.arcTo(x + w, y, x + w, y + h, rr)
  ctx.arcTo(x + w, y + h, x, y + h, rr)
  ctx.arcTo(x, y + h, x, y, rr)
  ctx.arcTo(x, y, x + w, y, rr)
  ctx.closePath()
}

const ease = (x) => (x < 0 ? 0 : x > 1 ? 1 : 1 - Math.pow(1 - x, 3))

// ---------- Leuchtpunkte (vorgerendert) ----------
let spriteKey = ''
let sprites = []
function getSprites(m) {
  const key = `${m}`
  if (key === spriteKey) return sprites
  spriteKey = key
  sprites = []
  for (let r = 0; r < m; r++) {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const g = c.getContext('2d')
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.18, col(r, m, 75, 1))
    grad.addColorStop(0.45, col(r, m, 58, 0.45))
    grad.addColorStop(1, col(r, m, 50, 0))
    g.fillStyle = grad
    g.fillRect(0, 0, 64, 64)
    sprites.push(c)
  }
  return sprites
}

// ---------- Hintergrund ----------
function drawBackground() {
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, W, H)
}

function caption(text, x, y, align = 'left', size = 13, color = 'rgba(226,232,255,0.75)') {
  ctx.font = font(size, 500, SANS)
  ctx.textAlign = align
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}

// =====================================================================
// 1a) Tabelle – Zahlen in n Spalten
// =====================================================================
function drawTabelle() {
  const m = n.value
  const a = Math.floor(t)
  const frac = t - a
  const pad = 14
  const headH = 40
  const cell = Math.min((W - 2 * pad - 34) / m, 58)
  const gridW = cell * m
  const x0 = Math.max(pad + 30, (W - gridW) / 2)
  const top = headH + 8
  const scroll = Math.max(0, t / m - ((H - top) / cell) * 0.62)
  const firstRow = Math.max(0, Math.floor(scroll) - 1)
  const lastRow = Math.ceil(scroll + (H - top) / cell) + 1
  const showText = cell >= 17
  const fs = Math.min(cell * 0.4, 18)

  ctx.save()
  ctx.beginPath()
  ctx.rect(0, headH + 4, W, H - headH - 4)
  ctx.clip()
  for (let row = firstRow; row <= lastRow; row++) {
    const y = top + (row - scroll) * cell
    // Zeilenbeschriftung q
    if (showText) {
      ctx.font = font(Math.min(fs * 0.8, 13), 500)
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = 'rgba(180,190,230,0.45)'
      ctx.fillText(`${row}·${m}`, x0 - 8, y + cell / 2)
    }
    for (let c = 0; c < m; c++) {
      const k = row * m + c
      const x = x0 + c * cell
      const inset = Math.max(1.5, cell * 0.06)
      if (k < a) {
        const age = a - k
        const fade = Math.max(0.35, 1 - age / (m * 8))
        roundRect(x + inset, y + inset, cell - 2 * inset, cell - 2 * inset, cell * 0.18)
        ctx.fillStyle = col(c, m, 52, 0.72 * fade)
        ctx.fill()
      } else if (k === a) {
        const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 160)
        ctx.save()
        ctx.shadowColor = col(c, m, 65, 1)
        ctx.shadowBlur = 18 + 10 * pulse
        roundRect(x + inset, y + inset, cell - 2 * inset, cell - 2 * inset, cell * 0.18)
        ctx.fillStyle = col(c, m, 62 + 10 * ease(frac * 3), 1)
        ctx.fill()
        ctx.restore()
        ctx.lineWidth = 2
        ctx.strokeStyle = 'rgba(255,255,255,0.9)'
        ctx.stroke()
      } else {
        roundRect(x + inset, y + inset, cell - 2 * inset, cell - 2 * inset, cell * 0.18)
        ctx.strokeStyle = 'rgba(150,165,220,0.16)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
      if (showText && k <= a + m) {
        ctx.font = font(fs, k === a ? 800 : 600)
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = k <= a ? 'rgba(255,255,255,0.95)' : 'rgba(170,180,220,0.35)'
        ctx.fillText(String(k), x + cell / 2, y + cell / 2 + 1)
      }
    }
  }
  ctx.restore()

  // Kopfzeile: Restklassen
  for (let c = 0; c < m; c++) {
    const x = x0 + c * cell
    roundRect(x + 2, 8, cell - 4, headH - 12, 8)
    ctx.fillStyle = col(c, m, 45, c === a % m ? 1 : 0.55)
    ctx.fill()
    if (cell >= 22) {
      ctx.font = font(Math.min(cell * 0.32, 14), 700)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#fff'
      ctx.fillText(cell >= 44 ? `Rest ${c}` : String(c), x + cell / 2, 8 + (headH - 12) / 2)
    }
  }
  setReadout(`${a} % ${m} = ${a % m}`, `${a} = ${Math.floor(a / m)} · ${m} + ${a % m}   →   Zeile ${Math.floor(a / m)}, Spalte ${a % m}`)
}

// =====================================================================
// 1b) Tafel – a % n für viele n gleichzeitig
// =====================================================================
const TAFEL_COLS = 12
function drawTafel() {
  const pad = 12
  const cols = TAFEL_COLS
  const cell = Math.min((W - 2 * pad) / (cols + 1.4), 50)
  const labelW = cell * 1.4
  const gridW = labelW + cell * cols
  const x0 = (W - gridW) / 2
  const headH = cell * 0.9 + 6
  const a = Math.floor(t)
  const top = headH + 4
  const scroll = Math.max(0, t - ((H - top) / cell) * 0.7)
  const first = Math.max(0, Math.floor(scroll) - 1)
  const lastR = Math.ceil(scroll + (H - top) / cell) + 1
  const fs = Math.min(cell * 0.42, 17)
  let hover = null

  ctx.save()
  ctx.beginPath()
  ctx.rect(0, headH, W, H - headH)
  ctx.clip()
  for (let row = first; row <= lastR; row++) {
    const y = top + (row - scroll) * cell
    const done = row <= a
    ctx.font = font(fs, 700)
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = row === a ? '#fff' : `rgba(200,210,245,${done ? 0.7 : 0.25})`
    ctx.fillText(String(row), x0 + labelW - 8, y + cell / 2)
    for (let m = 1; m <= cols; m++) {
      const x = x0 + labelW + (m - 1) * cell
      const r = row % m
      roundRect(x + 2, y + 2, cell - 4, cell - 4, cell * 0.2)
      if (done) {
        ctx.fillStyle = r === 0 ? 'rgba(255,255,255,0.10)' : col(r, m, 50, row === a ? 1 : 0.7)
        ctx.fill()
        ctx.font = font(fs * 0.95, 600)
        ctx.textAlign = 'center'
        ctx.fillStyle = r === 0 ? 'rgba(255,255,255,0.55)' : '#fff'
        ctx.fillText(String(r), x + cell / 2, y + cell / 2 + 1)
      } else {
        ctx.strokeStyle = 'rgba(150,165,220,0.13)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
      if (mouse.inside && mouse.x >= x && mouse.x < x + cell && mouse.y >= y && mouse.y < y + cell && mouse.y > headH) {
        hover = { x, y, row, m, r, done }
      }
    }
    if (row === a) {
      roundRect(x0 + 2, y + 1, gridW - 4, cell - 2, cell * 0.24)
      ctx.strokeStyle = 'rgba(255,255,255,0.85)'
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }
  ctx.restore()

  // Kopf
  ctx.font = font(fs, 700)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(200,210,245,0.7)'
  ctx.fillText('a', x0 + labelW / 2, headH / 2)
  for (let m = 1; m <= cols; m++) {
    const x = x0 + labelW + (m - 1) * cell
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.fillText(`%${m}`, x + cell / 2, headH / 2)
  }

  if (hover && hover.done) {
    const text = `${hover.row} % ${hover.m} = ${hover.r}`
    ctx.font = font(15, 700)
    const tw = ctx.measureText(text).width + 20
    let bx = Math.min(W - tw - 6, hover.x + cell / 2 - tw / 2)
    bx = Math.max(6, bx)
    const by = Math.max(headH + 4, hover.y - 38)
    roundRect(bx, by, tw, 30, 8)
    ctx.fillStyle = 'rgba(10,14,30,0.92)'
    ctx.fill()
    ctx.strokeStyle = col(hover.r, hover.m, 60, 1)
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.fillText(text, bx + tw / 2, by + 16)
    setReadout(text, `${hover.row} = ${Math.floor(hover.row / hover.m)} · ${hover.m} + ${hover.r}`)
  } else {
    setReadout(`a = ${a}`, `Reste von ${a} bei Division durch 1 … ${cols}: ${Array.from({ length: cols }, (_, i) => a % (i + 1)).join(', ')}`)
  }
}

// =====================================================================
// 2) 3D-Spirale
// =====================================================================
function drawSpirale(dt) {
  const m = n.value
  const a = Math.floor(t)
  const frac = t - a
  const spr = getSprites(m)
  if (!drag.active) drag.autoYaw += dt * 0.25
  const yaw = drag.yaw + drag.autoYaw
  const tilt = drag.tilt
  const R = 100
  const pitch = 34 // Höhe pro Umdrehung
  const turns = m <= 6 ? 8 : m <= 12 ? 7 : 6
  const count = m * turns
  const topK = Math.max(t, count - 1) // oberes Ende der sichtbaren Spirale
  const height = turns * pitch
  const fit = Math.min((W * 0.36) / R, (H * 0.8) / (height * Math.cos(tilt) + 2 * R * Math.sin(tilt) + 40))
  const F = 520
  const cx = W / 2
  const cy = H * 0.5
  const cyaw = Math.cos(yaw)
  const syaw = Math.sin(yaw)
  const ct = Math.cos(tilt)
  const st = Math.sin(tilt)

  function proj(k) {
    const ang = (2 * Math.PI * k) / m
    const x = R * Math.cos(ang)
    const z = R * Math.sin(ang)
    const y = ((k - topK) / m) * pitch + height * 0.5
    const x1 = x * cyaw - z * syaw
    const z1 = x * syaw + z * cyaw
    const y2 = y * ct - z1 * st
    const z2 = y * st + z1 * ct
    const s = F / (F + z2 * 1.0 + 60)
    return { sx: cx + x1 * s * fit, sy: cy - y2 * s * fit, s, z: z2 }
  }

  const kMin = Math.max(0, a - count + 1)
  // noch freie Plätze (nur am Anfang): als schwache Ringe andeuten
  ctx.save()
  for (let k = a + 1; k < count; k++) {
    const p = proj(k)
    ctx.beginPath()
    ctx.arc(p.sx, p.sy, 3 * p.s * fit, 0, Math.PI * 2)
    ctx.strokeStyle = col(k % m, m, 60, 0.28)
    ctx.lineWidth = 1
    ctx.stroke()
  }
  ctx.restore()
  const pts = []
  for (let k = kMin; k <= a; k++) {
    const p = proj(k)
    p.k = k
    p.r = k % m
    p.age = Math.max(0, (a - k + 1 - frac) / count) // 0 = neu, 1 = alt
    pts.push(p)
  }

  // Bodenring (Orientierung)
  ctx.save()
  ctx.globalAlpha = 0.25
  ctx.beginPath()
  for (let i = 0; i <= 64; i++) {
    const ang = (2 * Math.PI * i) / 64
    const x = R * 1.25 * Math.cos(ang)
    const z = R * 1.25 * Math.sin(ang)
    const y = -height * 0.5 - pitch * 0.5
    const x1 = x * cyaw - z * syaw
    const z1 = x * syaw + z * cyaw
    const y2 = y * ct - z1 * st
    const z2 = y * st + z1 * ct
    const s = F / (F + z2 + 60)
    const sx = cx + x1 * s * fit
    const sy = cy - y2 * s * fit
    i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy)
  }
  ctx.strokeStyle = 'rgba(140,160,255,0.6)'
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.restore()

  // Säulen der Restklassen
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  for (let r = 0; r < m; r++) {
    const col_ = pts.filter((p) => p.r === r)
    if (col_.length < 2) continue
    const active = r === a % m
    for (const [w, al] of [[7, 0.06], [3, 0.16], [1.2, 0.55]]) {
      ctx.beginPath()
      col_.forEach((p, i) => (i === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy)))
      ctx.strokeStyle = col(r, m, 60, al * (active ? 1.8 : 1))
      ctx.lineWidth = w * (active ? 1.4 : 1)
      ctx.stroke()
    }
  }
  // Spirallinie
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1]
    const q = pts[i]
    ctx.beginPath()
    ctx.moveTo(p.sx, p.sy)
    ctx.lineTo(q.sx, q.sy)
    ctx.strokeStyle = col(p.r, m, 70, 0.5 * (1 - q.age) + 0.05)
    ctx.lineWidth = 1.4 * q.s
    ctx.stroke()
  }
  ctx.restore()

  // Punkte, nach Tiefe sortiert
  const sorted = [...pts].sort((p, q) => q.z - p.z)
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  for (const p of sorted) {
    const fresh = p.k === a ? ease(frac * 2.5) : 1
    const size = (p.k === a ? 46 : 26) * p.s * Math.max(0.6, fit) * fresh * (0.55 + 0.45 * (1 - p.age))
    ctx.globalAlpha = Math.max(0.08, 1 - p.age * 0.9)
    ctx.drawImage(spr[p.r], p.sx - size / 2, p.sy - size / 2, size, size)
  }
  ctx.restore()

  // Zahlen an der obersten Windung
  if (m <= 16) {
    ctx.font = font(Math.max(10, 13 * fit), 700)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (const p of pts) {
      if (a - p.k >= m) continue
      ctx.globalAlpha = p.k === a ? ease(frac * 2.5) : 0.85
      ctx.fillStyle = p.k === a ? '#fff' : col(p.r, m, 82, 1)
      ctx.fillText(String(p.k), p.sx, p.sy - 16 * p.s * Math.max(0.8, fit))
    }
    ctx.globalAlpha = 1
  }

  caption(`${m} Plätze pro Umdrehung · ${m} Säulen = ${m} mögliche Reste`, 14, H - 14, 'left', 12)
  setReadout(`${a} % ${m} = ${a % m}`, `${a} liegt in Windung ${Math.floor(a / m)}, auf Säule ${a % m}`)
}

// =====================================================================
// 3) Modulo-Uhr
// =====================================================================
function drawUhr() {
  const m = n.value
  const a = Math.floor(t)
  const frac = t - a
  const q = Math.floor(a / m)
  const r = a % m
  const cx = W / 2
  const cy = H / 2 + 6
  const Rc = Math.min(W, H) * 0.31
  const angOf = (pos) => -Math.PI / 2 + (2 * Math.PI * pos) / m
  const scale = Math.min(1, 12 / m) * 0.35 + 0.65

  // Ziffernring
  ctx.beginPath()
  ctx.arc(cx, cy, Rc, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(150,165,230,0.25)'
  ctx.lineWidth = 2
  ctx.stroke()

  // Fortschritt der aktuellen Runde
  // Zeiger wandert vom vorigen Platz (r - 1) zum aktuellen Platz r
  const e = ease(Math.min(1, frac * 2.2))
  let pos = r - 1 + e
  if (r === 0) pos = e >= 1 || a === 0 ? 0 : m - 1 + e
  const arcSteps = Math.max(1, Math.ceil(pos * 8))
  for (let i = 0; i < arcSteps; i++) {
    const p0 = (pos * i) / arcSteps
    const p1 = (pos * (i + 1)) / arcSteps
    ctx.beginPath()
    ctx.arc(cx, cy, Rc, angOf(p0), angOf(p1))
    ctx.strokeStyle = col(Math.min(m - 1, Math.floor(p0)), m, 60, 0.9)
    ctx.lineWidth = 6
    ctx.lineCap = 'round'
    ctx.stroke()
  }

  // Rundenzähler als Ringe innen
  const ringCount = Math.min(q, 6)
  for (let j = 1; j <= ringCount; j++) {
    ctx.beginPath()
    ctx.arc(cx, cy, Rc * (0.31 - j * 0.035) + 6, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(160,180,255,${0.28 - j * 0.03})`
    ctx.lineWidth = 2
    ctx.stroke()
  }

  // Positionen mit Geschichte (frühere Zahlen mit gleichem Rest)
  for (let p = 0; p < m; p++) {
    const ang = angOf(p)
    const x = cx + Math.cos(ang) * Rc
    const y = cy + Math.sin(ang) * Rc
    const isNow = p === r
    ctx.beginPath()
    ctx.arc(x, y, (isNow ? 13 : 9) * scale, 0, Math.PI * 2)
    ctx.fillStyle = col(p, m, isNow ? 64 : 46, isNow ? 1 : 0.8)
    if (isNow) {
      ctx.save()
      ctx.shadowColor = col(p, m, 65, 1)
      ctx.shadowBlur = 24
      ctx.fill()
      ctx.restore()
    } else ctx.fill()
    ctx.font = font(13 * scale, 800)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#fff'
    ctx.fillText(String(p), x, y + 0.5)

    // außen: Zahlen, die hier gelandet sind
    const hist = []
    for (let j = 0; j < 2; j++) {
      const k = (q - j) * m + p
      if (k >= 0 && k <= a) hist.push(k)
    }
    hist.forEach((k, j) => {
      const rad = Rc + (24 + j * 18) * scale + 6
      ctx.font = font((j === 0 ? 13 : 11) * scale, j === 0 ? 700 : 500)
      ctx.fillStyle = col(p, m, 78, k === a ? 1 : 0.75 - j * 0.22)
      ctx.fillText(String(k), cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad)
    })
  }

  // Zeiger
  const ang = angOf(pos)
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + Math.cos(ang) * (Rc - 18), cy + Math.sin(ang) * (Rc - 18))
  ctx.strokeStyle = 'rgba(255,255,255,0.9)'
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(cx, cy, 5, 0, Math.PI * 2)
  ctx.fillStyle = '#fff'
  ctx.fill()

  // Mitte: Rechnung
  ctx.fillStyle = 'rgba(8,12,28,0.78)'
  ctx.beginPath()
  ctx.arc(cx, cy, Rc * 0.3, 0, Math.PI * 2)
  ctx.fill()
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = font(Math.max(14, Rc * 0.13), 800)
  ctx.fillStyle = '#fff'
  ctx.fillText(String(a), cx, cy - Rc * 0.07)
  ctx.font = font(Math.max(10, Rc * 0.06), 600)
  ctx.fillStyle = col(r, m, 75, 1)
  ctx.fillText(`${q} Runden + ${r}`, cx, cy + Rc * 0.1)

  setReadout(`${a} % ${m} = ${r}`, `${a} // ${m} = ${q} Runden   ·   ${a} = ${q} · ${m} + ${r}`)
}

// =====================================================================
// 4) Multiplikationskreis
// =====================================================================
const KREIS_N = 200
function drawKreis() {
  const M = KREIS_N
  const f = 2 + t * 0.02
  const cx = W / 2
  const cy = H / 2
  const Rk = Math.min(W, H) * 0.43
  const shift = (t * 4) % 360
  const pt = (k) => {
    const ang = Math.PI + (2 * Math.PI * k) / M
    return [cx + Rk * Math.cos(ang), cy + Rk * Math.sin(ang)]
  }

  ctx.beginPath()
  ctx.arc(cx, cy, Rk, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(150,165,230,0.25)'
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.lineWidth = 1
  for (let k = 0; k < M; k++) {
    const [x1, y1] = pt(k)
    const [x2, y2] = pt((k * f) % M)
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = `hsla(${(shift + (k * 360) / M) % 360}, 90%, 62%, 0.42)`
    ctx.stroke()
  }
  ctx.restore()

  for (let k = 0; k < M; k += 1) {
    const [x, y] = pt(k)
    ctx.fillStyle = 'rgba(220,230,255,0.55)'
    ctx.fillRect(x - 1, y - 1, 2, 2)
  }

  const k0 = Math.floor(t * 3) % M
  const [hx, hy] = pt(k0)
  const tgt = (k0 * f) % M
  const [tx, ty] = pt(tgt)
  ctx.beginPath()
  ctx.moveTo(hx, hy)
  ctx.lineTo(tx, ty)
  ctx.strokeStyle = 'rgba(255,255,255,0.95)'
  ctx.lineWidth = 2
  ctx.stroke()
  for (const [x, y] of [[hx, hy], [tx, ty]]) {
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
  }

  caption(`f = ${f.toFixed(2)}`, 14, 26, 'left', 16, '#fff')
  caption(`Punkte: ${M}`, 14, 46, 'left', 12)
  setReadout(`k → (k · ${f.toFixed(2)}) % ${M}`, `Beispiel: ${k0} · ${f.toFixed(2)} = ${(k0 * f).toFixed(1)}   →   % ${M} = ${tgt.toFixed(1)}`)
}

// =====================================================================
// 5) Pascal-Dreieck mod m
// =====================================================================
const PASCAL_ROWS = 64
let pascal = { m: 0, rows: [] }
let pascalProg = 0
let pascalHold = 0
let pascalM = 2
function buildPascal(m) {
  const rows = [Uint8Array.of(1 % m)]
  for (let i = 1; i < PASCAL_ROWS; i++) {
    const prev = rows[i - 1]
    const row = new Uint8Array(i + 1)
    row[0] = 1 % m
    row[i] = 1 % m
    for (let k = 1; k < i; k++) row[k] = (prev[k - 1] + prev[k]) % m
    rows.push(row)
  }
  pascal = { m, rows }
}
function drawPascal(dt) {
  if (pascal.m !== pascalM) buildPascal(pascalM)
  const m = pascalM
  if (playing.value) {
    if (pascalProg < PASCAL_ROWS) pascalProg += dt * speed.value * 10
    else {
      pascalHold += dt * speed.value
      if (pascalHold > 3) {
        pascalHold = 0
        pascalProg = 0
        pascalM = pascalM >= 12 ? 2 : pascalM + 1
      }
    }
  }
  const shown = Math.min(PASCAL_ROWS, pascalProg)
  const cs = Math.min((W - 24) / PASCAL_ROWS, (H - 70) / (PASCAL_ROWS * 0.88))
  const rowH = cs * 0.88
  const top = (H - rowH * PASCAL_ROWS) / 2 + 14
  const cx = W / 2
  for (let i = 0; i < Math.ceil(shown); i++) {
    const row = pascal.rows[i]
    const alpha = Math.min(1, shown - i)
    const y = top + i * rowH
    for (let k = 0; k <= i; k++) {
      const v = row[k]
      const x = cx + (k - i / 2) * cs - cs / 2
      if (v === 0) {
        ctx.fillStyle = `rgba(120,135,200,${0.08 * alpha})`
      } else {
        ctx.fillStyle = col(v, m, 58, alpha)
      }
      ctx.beginPath()
      ctx.arc(x + cs / 2, y + rowH / 2, cs * 0.46, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  caption(`Modul m = ${m}`, 14, 26, 'left', 16, '#fff')
  caption(`danach automatisch m = ${m >= 12 ? 2 : m + 1}`, 14, 46, 'left', 12)
  const i = Math.max(0, Math.min(PASCAL_ROWS - 1, Math.floor(shown) - 1))
  const k = Math.floor(i / 2)
  const val = i >= 1 && k >= 1 ? `(${pascal.rows[i - 1][k - 1]} + ${pascal.rows[i - 1][k]}) % ${m} = ${pascal.rows[i][k]}` : `Zeile ${i}`
  setReadout(`Pascal-Dreieck % ${m}`, `Zeile ${i}, Mitte: ${val}`)
}

// =====================================================================
// 6) Sägezahn
// =====================================================================
function drawSaege() {
  const m = n.value
  const span = Math.max(24, m * 4)
  const x0 = t - span * 0.8
  const x1 = x0 + span
  const a = Math.floor(t)
  const left = 52
  const right = 18
  const gap = 34
  const topH = (H - gap - 40) * 0.58
  const botH = H - gap - 40 - topH
  const yTop = 18
  const yBot = yTop + topH + gap
  const sx = (x) => left + ((x - x0) / span) * (W - left - right)

  // Panelrahmen
  for (const [y, h, label] of [[yTop, topH, `x % ${m}`], [yBot, botH, `x // ${m}`]]) {
    ctx.strokeStyle = 'rgba(150,165,230,0.18)'
    ctx.lineWidth = 1
    ctx.strokeRect(left, y, W - left - right, h)
    caption(label, left + 8, y + 18, 'left', 13, 'rgba(255,255,255,0.85)')
  }

  // Vielfache von m
  for (let q = Math.ceil(x0 / m); q * m <= x1; q++) {
    const x = sx(q * m)
    ctx.beginPath()
    ctx.setLineDash([4, 5])
    ctx.moveTo(x, yTop)
    ctx.lineTo(x, yBot + botH)
    ctx.strokeStyle = 'rgba(160,175,240,0.22)'
    ctx.stroke()
    ctx.setLineDash([])
    ctx.font = font(11, 600)
    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgba(200,210,245,0.6)'
    ctx.fillText(`${q * m}`, x, yBot + botH + 16)
  }

  // y-Achsen
  const yT = (v) => yTop + topH - 10 - (v / m) * (topH - 30)
  ctx.font = font(11, 500)
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  for (const v of [0, m - 1]) {
    ctx.fillStyle = 'rgba(200,210,245,0.6)'
    ctx.fillText(String(v), left - 6, yT(v))
  }
  const qMin = Math.floor(Math.max(0, x0) / m)
  const qMax = Math.floor(x1 / m) + 1
  const yB = (v) => yBot + botH - 10 - ((v - qMin) / Math.max(1, qMax - qMin)) * (botH - 30)
  for (const v of [qMin, qMax - 1]) ctx.fillText(String(v), left - 6, yB(v))

  // Sägezahn bis zum aktuellen t
  const xa = Math.max(0, x0)
  ctx.save()
  ctx.beginPath()
  ctx.rect(left, 0, W - left - right, H)
  ctx.clip()
  ctx.lineWidth = 2.5
  ctx.lineJoin = 'round'
  for (let k = Math.floor(xa); k < t; k++) {
    const r = ((k % m) + m) % m
    const e = Math.min(t, k + 1)
    // Rampe innerhalb eines Schritts: x % m wächst stetig
    ctx.beginPath()
    ctx.moveTo(sx(k), yT(r))
    ctx.lineTo(sx(e), yT(r + (e - k)))
    ctx.strokeStyle = col(r, m, 62, 0.9)
    ctx.stroke()
    if (r === m - 1 && e === k + 1) {
      ctx.beginPath()
      ctx.setLineDash([2, 4])
      ctx.moveTo(sx(k + 1), yT(m))
      ctx.lineTo(sx(k + 1), yT(0))
      ctx.strokeStyle = 'rgba(255,255,255,0.35)'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.setLineDash([])
      ctx.lineWidth = 2.5
    }
    // Treppe
    const q = Math.floor(k / m)
    ctx.beginPath()
    ctx.moveTo(sx(k), yB(q))
    ctx.lineTo(sx(e), yB(q))
    ctx.strokeStyle = 'rgba(190,200,255,0.85)'
    ctx.stroke()
    if (r === 0 && k > 0) {
      ctx.beginPath()
      ctx.moveTo(sx(k), yB(q - 1))
      ctx.lineTo(sx(k), yB(q))
      ctx.strokeStyle = 'rgba(190,200,255,0.35)'
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.lineWidth = 2.5
    }
  }
  // ganzzahlige Punkte
  for (let k = Math.ceil(xa); k <= a; k++) {
    const r = k % m
    const now = k === a
    ctx.beginPath()
    ctx.arc(sx(k), yT(r), now ? 6 : 3.5, 0, Math.PI * 2)
    ctx.fillStyle = col(r, m, now ? 72 : 60, 1)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(sx(k), yB(Math.floor(k / m)), now ? 5 : 2.5, 0, Math.PI * 2)
    ctx.fillStyle = now ? '#fff' : 'rgba(200,210,255,0.8)'
    ctx.fill()
  }
  ctx.restore()

  // Markierung aktuelle Zahl
  const xs = sx(a)
  ctx.font = font(13, 700)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = col(a % m, m, 78, 1)
  ctx.fillText(`${a} % ${m} = ${a % m}`, Math.min(W - 60, Math.max(left + 50, xs)), Math.max(yTop + 14, yT(a % m) - 12))
  ctx.fillStyle = '#fff'
  ctx.fillText(`${a} // ${m} = ${Math.floor(a / m)}`, Math.min(W - 60, Math.max(left + 50, xs)), Math.max(yBot + 14, yB(Math.floor(a / m)) - 12))

  setReadout(`${a} % ${m} = ${a % m}`, `${a} // ${m} = ${Math.floor(a / m)}   ·   ${a} = ${Math.floor(a / m)} · ${m} + ${a % m}`)
}

// ---------- Anzeige (nur bei Änderung in Vue schreiben) ----------
function setReadout(main, sub) {
  if (readout.value !== main) readout.value = main
  if (subReadout.value !== sub) subReadout.value = sub
}

// ---------- Hauptschleife ----------
function frame(now) {
  raf = requestAnimationFrame(frame)
  const dt = Math.min(0.1, (now - last) / 1000 || 0)
  last = now
  if (!visible || !ctx) return
  if (playing.value && view.value !== 'pascal') t += dt * RATE * speed.value
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  drawBackground()
  switch (view.value) {
    case 'tabelle':
      tableMode.value === 'tafel' ? drawTafel() : drawTabelle()
      break
    case 'spirale':
      drawSpirale(playing.value ? dt * speed.value : 0)
      break
    case 'uhr':
      drawUhr()
      break
    case 'kreis':
      drawKreis()
      break
    case 'pascal':
      drawPascal(dt)
      break
    case 'saege':
      drawSaege()
      break
  }
}

function resize() {
  const el = stage.value
  const cv = canvas.value
  if (!el || !cv) return
  const w = el.clientWidth
  const h = Math.round(Math.max(380, Math.min(620, w * (w < 600 ? 1.15 : 0.62))))
  dpr = Math.min(2, window.devicePixelRatio || 1)
  W = w
  H = h
  cv.width = Math.round(w * dpr)
  cv.height = Math.round(h * dpr)
  cv.style.height = `${h}px`
  bgGrad = ctx.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H * 0.45, Math.max(W, H) * 0.75)
  bgGrad.addColorStop(0, '#141a3a')
  bgGrad.addColorStop(1, '#05060f')
}

// ---------- Bedienung ----------
function togglePlay() {
  playing.value = !playing.value
}
function step() {
  if (view.value === 'pascal') {
    pascalProg = Math.min(PASCAL_ROWS, Math.floor(pascalProg) + 1)
    return
  }
  t = Math.floor(t) + 1
}
function restart() {
  t = 0
  pascalProg = 0
  pascalHold = 0
  pascalM = n.value <= 12 ? n.value : 2
}
watch(n, (m) => {
  pascalM = m <= 12 ? m : 2
  pascalProg = 0
  pascalHold = 0
})

function onPointerDown(e) {
  if (view.value !== 'spirale') return
  drag.active = true
  drag.x = e.clientX
  drag.y = e.clientY
  canvas.value.setPointerCapture?.(e.pointerId)
}
function onPointerMove(e) {
  const rect = canvas.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  mouse.inside = true
  if (!drag.active) return
  drag.yaw += (e.clientX - drag.x) * 0.01
  drag.tilt = Math.max(0.05, Math.min(1.25, drag.tilt + (e.clientY - drag.y) * 0.006))
  drag.x = e.clientX
  drag.y = e.clientY
}
function onPointerUp() {
  drag.active = false
}
function onPointerLeave() {
  mouse.inside = false
  drag.active = false
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  pascalM = n.value <= 12 ? n.value : 2
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) playing.value = false
  resize()
  resizeObs = new ResizeObserver(resize)
  resizeObs.observe(stage.value)
  interObs = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true
  })
  interObs.observe(stage.value)
  last = performance.now()
  raf = requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  resizeObs?.disconnect()
  interObs?.disconnect()
  ctx = null
})
</script>

<template>
  <div class="mv">
    <div class="mv__tabs" role="tablist" aria-label="Ansicht wählen">
      <button
        v-for="v in VIEWS"
        :key="v.id"
        role="tab"
        :aria-selected="view === v.id"
        :class="['mv__tab', { 'is-active': view === v.id }]"
        @click="view = v.id"
      >
        <span aria-hidden="true">{{ v.icon }}</span> {{ v.label }}
      </button>
    </div>

    <div class="mv__controls">
      <label v-if="usesN" class="mv__ctrl">
        <span>Modul n = <b>{{ n }}</b></span>
        <input v-model.number="n" type="range" min="2" max="24" step="1" />
      </label>
      <label class="mv__ctrl">
        <span>Tempo <b>{{ speed }}×</b></span>
        <input v-model.number="speed" type="range" min="0.25" max="4" step="0.25" />
      </label>
      <div v-if="view === 'tabelle'" class="mv__seg" role="group" aria-label="Tabellenart">
        <button :class="{ 'is-active': tableMode === 'reihen' }" @click="tableMode = 'reihen'">n Spalten</button>
        <button :class="{ 'is-active': tableMode === 'tafel' }" @click="tableMode = 'tafel'">a % n-Tafel</button>
      </div>
      <div class="mv__buttons">
        <button class="mv__btn mv__btn--main" @click="togglePlay">{{ playing ? '⏸ Pause' : '▶ Weiter' }}</button>
        <button class="mv__btn" title="Einen Schritt weiter" @click="step">+1</button>
        <button class="mv__btn" title="Wieder bei 0 beginnen" @click="restart">↺ 0</button>
      </div>
    </div>

    <div class="mv__readout" aria-live="off">
      <code class="mv__main">{{ readout }}</code>
      <span class="mv__sub">{{ subReadout }}</span>
    </div>

    <div ref="stage" class="mv__stage">
      <canvas
        ref="canvas"
        :class="{ 'is-draggable': view === 'spirale' }"
        role="img"
        :aria-label="`Modulo-Visualisierung: ${VIEWS.find((v) => v.id === view).label}`"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @pointerleave="onPointerLeave"
      />
    </div>

    <div v-if="usesN && view !== 'pascal'" class="mv__legend" aria-label="Farben der Reste">
      <span v-for="l in legend" :key="l.r" class="mv__chip" :style="{ background: l.color }">{{ l.r }}</span>
    </div>

    <p class="mv__hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.mv {
  margin: 20px 0;
}
.mv__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}
.mv__tab {
  font: inherit;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}
.mv__tab:hover {
  border-color: var(--vp-c-brand-1);
}
.mv__tab.is-active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}
.mv__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 18px;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  background: var(--vp-c-bg-soft);
}
.mv__ctrl {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  min-width: 150px;
  flex: 1 1 150px;
  max-width: 240px;
}
.mv__ctrl b {
  color: var(--vp-c-text-1);
}
.mv__ctrl input {
  accent-color: var(--vp-c-brand-1);
  width: 100%;
}
.mv__seg {
  display: inline-flex;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}
.mv__seg button {
  font: inherit;
  font-size: 13px;
  padding: 5px 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: none;
  cursor: pointer;
}
.mv__seg button + button {
  border-left: 1px solid var(--vp-c-divider);
}
.mv__seg button.is-active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.mv__buttons {
  display: flex;
  gap: 6px;
  margin-left: auto;
}
.mv__btn {
  font: inherit;
  font-size: 14px;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}
.mv__btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.mv__btn--main {
  min-width: 96px;
}
.mv__readout {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 14px;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-bottom: none;
  background: var(--vp-c-bg);
  min-height: 44px;
}
.mv__main {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: none !important;
  padding: 0 !important;
}
.mv__sub {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.mv__stage {
  border: 1px solid var(--vp-c-divider);
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  background: #05060f;
  line-height: 0;
}
.mv__stage canvas {
  display: block;
  width: 100%;
  touch-action: pan-y;
}
.mv__stage canvas.is-draggable {
  cursor: grab;
  touch-action: none;
}
.mv__stage canvas.is-draggable:active {
  cursor: grabbing;
}
.mv__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 10px;
}
.mv__chip {
  min-width: 26px;
  padding: 1px 6px;
  border-radius: 6px;
  text-align: center;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
}
.mv__hint {
  margin: 10px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
@media (max-width: 640px) {
  .mv__buttons {
    margin-left: 0;
  }
  .mv__ctrl {
    max-width: none;
  }
}
</style>
