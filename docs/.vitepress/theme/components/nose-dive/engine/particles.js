// Partikel: Funken, Wölkchen, Konfetti, Sterne – und schwebende Texte („+10“).

import { rand, TAU } from './util.js'

const CONFETTI = ['#ff5d73', '#ffd166', '#06d6a0', '#4cc9f0', '#b388ff', '#ff9f1c']

export function createParticles() {
  const list = []
  const texts = []
  let factor = 1 // weniger Partikel bei „Bewegung reduzieren“

  function add(p) {
    list.push({ life: 1, age: 0, vx: 0, vy: 0, g: 0, drag: 0, rot: 0, vr: 0, size: 3, alpha: 1, ...p })
  }

  return {
    setFactor(f) {
      factor = f
    },
    sparks(x, y, color = '#fff6c2', n = 26) {
      for (let i = 0; i < n * factor; i++) {
        const a = rand(TAU)
        const s = rand(80, 260)
        add({ kind: rand() < 0.35 ? 'star' : 'dot', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, drag: 3.2, life: rand(0.45, 0.9), size: rand(2, 5), color: rand() < 0.5 ? color : '#ffffff', vr: rand(-8, 8) })
      }
    },
    puff(x, y, color = '#c9d3df', n = 12, spread = 40) {
      for (let i = 0; i < n * factor; i++) {
        const a = rand(TAU)
        const s = rand(20, 70)
        add({ kind: 'puff', x: x + rand(-spread, spread), y: y + rand(-10, 10), vx: Math.cos(a) * s, vy: Math.sin(a) * s - 20, drag: 2, life: rand(0.5, 0.9), size: rand(8, 16), color })
      }
    },
    confetti(x0, x1, y, n = 90) {
      for (let i = 0; i < n * factor; i++) {
        add({ kind: 'confetti', x: rand(x0, x1), y: y + rand(-40, 0), vx: rand(-60, 60), vy: rand(-380, -160), g: 420, drag: 1.4, life: rand(1.8, 3), size: rand(4, 8), color: CONFETTI[i % CONFETTI.length], rot: rand(TAU), vr: rand(-10, 10) })
      }
    },
    dizzy(x, y) {
      for (let i = 0; i < 5; i++) add({ kind: 'star', x, y, life: 1.2, size: 5, color: '#ffd166', orbit: (i / 5) * TAU, cx: x, cy: y })
    },
    text(x, y, str, o = {}) {
      texts.push({ x, y, str, age: 0, life: o.life ?? 0.9, color: o.color || '#ffffff', size: o.size || 22, vy: o.vy ?? -60 })
    },
    update(dt, scrollY = 0) {
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i]
        p.age += dt
        if (p.age >= p.life) {
          list.splice(i, 1)
          continue
        }
        if (p.orbit !== undefined) {
          p.orbit += dt * 5
          p.x = p.cx + Math.cos(p.orbit) * 22
          p.y = p.cy + Math.sin(p.orbit) * 7
          continue
        }
        const k = Math.exp(-p.drag * dt)
        p.vx *= k
        p.vy = p.vy * k + p.g * dt
        p.x += p.vx * dt
        p.y += p.vy * dt + scrollY * dt
        p.rot += p.vr * dt
      }
      for (let i = texts.length - 1; i >= 0; i--) {
        const t = texts[i]
        t.age += dt
        t.y += t.vy * dt
        t.vy *= Math.exp(-2 * dt)
        if (t.age >= t.life) texts.splice(i, 1)
      }
    },
    /** Partikel, die am Diver hängen (Schwindel-Sterne), mitbewegen */
    follow(x, y) {
      for (const p of list) if (p.orbit !== undefined) {
        p.cx = x
        p.cy = y
      }
    },
    draw(ctx) {
      for (const p of list) {
        const t = p.age / p.life
        ctx.globalAlpha = p.kind === 'confetti' ? Math.min(1, (1 - t) * 3) : 1 - t
        ctx.fillStyle = p.color
        if (p.kind === 'dot') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * (1 - t * 0.5), 0, TAU)
          ctx.fill()
        } else if (p.kind === 'star') {
          drawStar(ctx, p.x, p.y, p.size * (p.orbit !== undefined ? 1 : 1.6 - t), p.rot)
        } else if (p.kind === 'puff') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * (0.6 + t * 0.9), 0, TAU)
          ctx.fill()
        } else if (p.kind === 'confetti') {
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.scale(1, Math.cos(p.rot * 1.7))
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
          ctx.restore()
        }
      }
      ctx.globalAlpha = 1
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (const t of texts) {
        const k = t.age / t.life
        const pop = k < 0.15 ? 0.6 + (k / 0.15) * 0.5 : 1.1 - Math.min(0.1, (k - 0.15) * 0.4)
        ctx.globalAlpha = k > 0.6 ? 1 - (k - 0.6) / 0.4 : 1
        ctx.font = `800 ${Math.round(t.size * pop)}px ${FONT}`
        ctx.lineWidth = 5
        ctx.strokeStyle = 'rgba(20, 40, 80, 0.55)'
        ctx.lineJoin = 'round'
        ctx.strokeText(t.str, t.x, t.y)
        ctx.fillStyle = t.color
        ctx.fillText(t.str, t.x, t.y)
      }
      ctx.globalAlpha = 1
    },
    clear() {
      list.length = 0
      texts.length = 0
    },
    get count() {
      return list.length
    },
  }
}

export const FONT = "Inter, ui-rounded, 'Segoe UI', system-ui, -apple-system, sans-serif"

export function drawStar(ctx, x, y, r, rot = 0) {
  ctx.beginPath()
  for (let i = 0; i < 10; i++) {
    const a = rot + (i / 10) * TAU - Math.PI / 2
    const rr = i % 2 ? r * 0.45 : r
    ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr)
  }
  ctx.closePath()
  ctx.fill()
}
