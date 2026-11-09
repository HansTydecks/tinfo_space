// Nose Dive – das eigentliche Spiel auf dem Canvas.
//
// Ablauf: attract (Menü-Hintergrund) → intro (Absprung aus dem Flugzeug) → play → landing / crash
// Die Oberfläche (Menüs, Anzeige oben) ist HTML in NoseDive.vue; das Spiel meldet sich über onEvent().

import { createView } from '../engine/view.js'
import { createLoop } from '../engine/loop.js'
import { createInput } from '../engine/input.js'
import { createParticles } from '../engine/particles.js'
import { clamp, damp, lerp, ease, invLerp } from '../engine/util.js'
import { createSky, drawPlane, drawGround } from '../draw/sky.js'
import { drawDiver } from '../draw/diver.js'
import { makeAnswerCloud, drawAnswerCloud } from '../draw/cloud.js'
import { verbsForTiers } from './vocab.js'
import { optionsFor, createDeck } from './questions.js'
import { HEARTS, endlessStage } from './levels.js'

const MARGIN = 26 // Springer bleibt so weit vom Rand weg
const KEY_SPEED = 440 // Einheiten pro Sekunde mit den Pfeiltasten

export function createGame(canvas, { audio, onEvent = () => {}, reducedMotion = false } = {}) {
  const view = createView(canvas)
  const sky = createSky()
  const fx = createParticles()
  if (reducedMotion) fx.setFactor(0.4)
  sky.resize(view)

  const emit = (type, data = {}) => onEvent(type, data)

  const g = {
    mode: 'attract',
    paused: false,
    t: 0,
    slowmo: 0,
    topInset: 150,
    speed: 0.6,
    speedTarget: 0.6,
    rows: [],
    nextRowIn: 0,
    level: null,
    endless: false,
    stage: 1,
    deck: null,
    hits: 0,
    misses: 0,
    combo: 0,
    bestCombo: 0,
    score: 0,
    hearts: HEARTS,
    missed: [],
    phaseT: 0,
    plane: null,
    groundY: 99999,
    released: false,
    landedSent: false,
    dragBase: null,
    attractY: null,
  }

  const diver = { x: 180, y: 300, target: 180, vx: 0, tilt: 0, spin: 0, chute: 0, pose: 0, hurt: 0, mood: 'happy', scale: 1 }

  const diverY = () => clamp(g.topInset + 66, 120, view.H * 0.5)
  const attractY = () => clamp(g.attractY ?? view.H * 0.74, view.H * 0.3, view.H - 46)

  // -------------------------------------------------------------------------
  // Eingabe
  // -------------------------------------------------------------------------
  const input = createInput(canvas, {
    active: () => g.mode === 'play' && !g.paused,
    onKey(code) {
      if ((code === 'Escape' || code === 'KeyP') && g.mode === 'play') emit('pauseRequest')
    },
    onDragStart() {
      g.dragBase = diver.target
    },
    onDrag(dxCss) {
      if (g.mode !== 'play' || g.paused || g.dragBase === null) return
      diver.target = clamp(g.dragBase + (dxCss / view.scale) * 1.2, MARGIN, view.W - MARGIN)
    },
    onDragEnd() {
      g.dragBase = null
    },
    onTap(cx, cy) {
      if (g.mode !== 'play' || g.paused) return
      const p = view.toWorld(cx, cy)
      const row = activeRow()
      const hit = row?.clouds.find((c) => Math.abs(p.x - c.x) < c.w / 2 && Math.abs(p.y - c.y) < c.h / 2 + 10)
      diver.target = clamp(hit ? hit.x : p.x, MARGIN, view.W - MARGIN)
    },
  })

  // -------------------------------------------------------------------------
  // Reihen mit Antwort-Wolken
  // -------------------------------------------------------------------------
  const activeRow = () => g.rows.find((r) => !r.resolved) || null

  function rowSettings() {
    if (g.endless) return endlessStage(g.hits)
    return g.level
  }

  function spawnRow() {
    const set = rowSettings()
    const card = g.deck.next()
    const options = optionsFor(card.verb, card.form, set.choices)
    const ctx = view.ctx
    const W = view.W
    const n = options.length
    let fs = 26
    let clouds
    for (;;) {
      clouds = options.map((o) => makeAnswerCloud(ctx, o.text, o.correct, fs))
      const total = clouds.reduce((s, c) => s + c.w, 0) + 14 * (n - 1)
      if (total <= W - 16 || fs <= 14) break
      fs -= 1
    }
    const free = W - clouds.reduce((s, c) => s + c.w, 0)
    const gap = free / (n + 1)
    let x = gap
    for (const c of clouds) {
      c.x = x + c.w / 2
      x += c.w + gap
    }
    const h = Math.max(...clouds.map((c) => c.h))
    const y = view.H + h * 0.7
    const row = { card, clouds, h, y, vy: (y - diverY()) / set.rise, resolved: false, age: 0 }
    for (const c of clouds) c.y = y
    g.rows.push(row)
    emit('card', { inf: card.verb.inf, de: card.verb.de, form: card.form, repeat: !!card.repeat })
  }

  function forms(card) {
    const v = card.verb
    return { inf: v.inf, past: v.past, pp: v.pp, de: v.de, form: card.form }
  }

  function resolveRow(row, cloud) {
    row.resolved = true
    row.vy *= 0.45
    const correct = row.clouds.find((c) => c.correct)
    for (const c of row.clouds) {
      c.t = 0
      c.state = c === cloud ? (c.correct ? 'good' : 'bad') : c.correct && cloud !== c ? 'reveal' : 'fade'
    }
    if (cloud && cloud.correct) hit(row, cloud)
    else miss(row, cloud, correct)
  }

  function hit(row, cloud) {
    g.hits++
    g.combo++
    g.bestCombo = Math.max(g.bestCombo, g.combo)
    const mult = Math.min(5, 1 + Math.floor(g.combo / 4))
    const pts = 10 * mult
    g.score += pts
    fx.sparks(cloud.x, cloud.y, '#fff3a8', 28)
    fx.text(cloud.x, cloud.y - 30, mult > 1 ? `+${pts}  ×${mult}` : `+${pts}`, { color: mult > 1 ? '#ffe066' : '#ffffff', size: mult > 1 ? 24 : 22 })
    audio?.sfx.catch(g.combo - 1)
    g.speedTarget = 1 + Math.min(g.combo, 12) * 0.045
    diver.mood = 'happy'
    emit('hit', { ...forms(row.card), score: g.score, combo: g.combo, mult, hits: g.hits })
    emit('progress', progressInfo())

    if (g.endless) {
      const st = endlessStage(g.hits)
      if (st.stage !== g.stage) {
        g.stage = st.stage
        g.deck.setVerbs(verbsForTiers(st.tiers), 'mixed')
        fx.text(view.W / 2, view.H * 0.55, `Stage ${st.stage}`, { color: '#ffe066', size: 34, life: 1.6, vy: -30 })
        emit('stage', { stage: st.stage })
      }
      g.nextRowIn = 0.35
    } else if (g.hits >= g.level.goal) {
      startLanding()
    } else {
      g.nextRowIn = 0.35
    }
  }

  function miss(row, picked, correct) {
    g.misses++
    g.combo = 0
    g.hearts--
    g.missed.push(row.card.verb)
    g.deck.again(row.card)
    if (picked) fx.puff(picked.x, picked.y, '#aeb8c6', 14, picked.w * 0.35)
    view.addShake(reducedMotion ? 2 : 9)
    g.slowmo = 0.55
    g.speedTarget = 0.85
    diver.hurt = 1.1
    diver.mood = 'oops'
    audio?.sfx.wrong()
    emit('miss', { ...forms(row.card), picked: picked ? picked.text : null, hearts: g.hearts })
    if (g.hearts <= 0) startCrash()
    else g.nextRowIn = 1.45
  }

  function progressInfo() {
    if (g.endless) return { endless: true, hits: g.hits, stage: g.stage, score: g.score }
    return { hits: g.hits, goal: g.level.goal, altitude: Math.round(4000 * (1 - g.hits / g.level.goal)) }
  }

  // -------------------------------------------------------------------------
  // Spielabschnitte
  // -------------------------------------------------------------------------
  function resetRun() {
    g.rows = []
    g.hits = 0
    g.misses = 0
    g.combo = 0
    g.bestCombo = 0
    g.score = 0
    g.hearts = HEARTS
    g.missed = []
    g.stage = 1
    g.slowmo = 0
    g.groundY = 99999
    g.landedSent = false
    fx.clear()
    Object.assign(diver, { x: view.W / 2, target: view.W / 2, vx: 0, tilt: 0, spin: 0, chute: 0, pose: 0, hurt: 0, mood: 'happy', scale: 1 })
  }

  function start(level) {
    resetRun()
    g.endless = level === 'endless'
    g.level = g.endless ? null : level
    const set = g.endless ? endlessStage(0) : level
    g.deck = createDeck(verbsForTiers(set.tiers), set.form)
    g.mode = 'intro'
    g.phaseT = 0
    g.released = false
    g.plane = { x: view.right + 110, y: diverY(), y0: diverY() }
    diver.y = -100
    g.speedTarget = 0.9
    g.paused = false
    audio?.setIntensity(1)
    emit('hearts', { hearts: g.hearts })
    emit('progress', progressInfo())
  }

  function startLanding() {
    g.mode = 'landing'
    g.phaseT = 0
    g.speedTarget = 0.12
    audio?.sfx.chute()
    emit('landing')
  }

  function startCrash() {
    g.mode = 'crash'
    g.phaseT = 0
    g.speedTarget = 0.35
    diver.mood = 'dizzy'
    audio?.sfx.crash()
    fx.dizzy(diver.x, diver.y - 26)
  }

  function toAttract() {
    resetRun()
    g.mode = 'attract'
    g.paused = false
    g.speedTarget = 0.6
    diver.y = attractY()
    audio?.setIntensity(0)
  }

  // -------------------------------------------------------------------------
  // Update
  // -------------------------------------------------------------------------
  function update(rdt) {
    if (g.paused) return
    if (g.slowmo > 0) g.slowmo -= rdt
    const dt = rdt * (g.slowmo > 0 ? 0.35 : 1)
    g.t += dt
    g.phaseT += dt
    g.speed = damp(g.speed, g.speedTarget, 2.5, dt)
    sky.update(dt, view, g.speed)
    view.updateShake(rdt)
    if (diver.hurt > 0) diver.hurt = Math.max(0, diver.hurt - rdt)
    if (diver.hurt === 0 && diver.mood === 'oops') diver.mood = 'happy'

    if (g.mode === 'attract') {
      diver.target = view.W / 2 + Math.sin(g.t * 0.7) * 50
      diver.y = damp(diver.y, attractY() + Math.sin(g.t * 1.3) * 8, 3, dt)
      moveDiver(dt, 3)
    } else if (g.mode === 'intro') {
      updateIntro(dt)
    } else if (g.mode === 'play') {
      if (g.plane) {
        g.plane.x -= 250 * dt
        g.plane.y -= 120 * dt
        if (g.plane.x < view.left - 140) g.plane = null
      }
      if (input.axis) diver.target = clamp(diver.target + input.axis * KEY_SPEED * dt, MARGIN, view.W - MARGIN)
      diver.y = damp(diver.y, diverY() + Math.sin(g.t * 2.1) * 3, 6, dt)
      moveDiver(dt, 13)
      updateRows(dt)
      if (!g.rows.some((r) => !r.resolved)) {
        g.nextRowIn -= dt
        if (g.nextRowIn <= 0 && g.mode === 'play') spawnRow()
      }
    } else if (g.mode === 'landing') {
      updateLanding(dt)
      updateRows(dt)
    } else if (g.mode === 'crash') {
      updateRows(dt)
      diver.spin += dt * Math.max(1.5, 9 - g.phaseT * 6)
      diver.y = damp(diver.y, diverY() + 30, 2, dt)
      moveDiver(dt, 4)
      fx.follow(diver.x, diver.y - 30)
      if (g.phaseT > 1.3 && !g.landedSent) {
        g.landedSent = true
        diver.spin = diver.spin % (Math.PI * 2)
        emit('crash', result())
      }
      if (g.landedSent) diver.spin = damp(diver.spin, Math.round(diver.spin / (Math.PI * 2)) * Math.PI * 2, 3, dt)
    }
    fx.update(dt)
    if (g.mode !== 'play' && g.mode !== 'crash' && g.mode !== 'landing') updateRows(dt)
  }

  function moveDiver(dt, stiffness) {
    const before = diver.x
    diver.x = damp(diver.x, diver.target, stiffness, dt)
    diver.vx = (diver.x - before) / Math.max(dt, 1e-4)
    diver.tilt = damp(diver.tilt, clamp(diver.vx / 650, -0.5, 0.5), 10, dt)
  }

  function updateRows(dt) {
    const dy = diverY()
    for (const row of g.rows) {
      row.age += dt
      row.y -= row.vy * dt
      for (const c of row.clouds) {
        c.y = row.y
        c.t += dt
        // Leuchten: über welcher Wolke ist der Springer gerade?
        const over = !row.resolved && Math.abs(diver.x - c.x) <= c.w / 2
        c.aim = damp(c.aim, over ? 1 : 0, 12, dt)
      }
      if (!row.resolved && g.mode === 'play' && row.y - row.h * 0.45 <= dy + 24) {
        let best = null
        let bestD = Infinity
        for (const c of row.clouds) {
          const d = Math.abs(diver.x - c.x)
          if (d <= c.w / 2 + 6 && d < bestD) {
            best = c
            bestD = d
          }
        }
        resolveRow(row, best)
      }
    }
    g.rows = g.rows.filter((r) => r.y > -r.h - 40 || r.clouds.some((c) => c.state === 'reveal' && c.t < 0.6))
  }

  function updateIntro(dt) {
    const p = g.plane
    p.x -= 250 * dt
    const door = p.x + 40
    if (!g.released) {
      diver.target = view.W / 2
      if (door <= view.W / 2 + 6) {
        g.released = true
        g.phaseT = 0
        diver.x = door
        diver.y = p.y0
        audio?.sfx.whoosh()
      }
    } else {
      // Flugzeug zieht nach oben weg, der Springer purzelt aus der Tür
      p.y -= 120 * dt * Math.min(1, g.phaseT * 1.5)
      const k = Math.min(1, g.phaseT / 0.85)
      diver.scale = lerp(0.45, 1, ease.outBack(k))
      diver.y = lerp(p.y0, diverY(), ease.inOutSine(k)) + Math.sin(k * Math.PI) * 42
      diver.spin = (1 - ease.outCubic(k)) * 2.2
      moveDiver(dt, 8)
      if (k >= 1 && p.x < view.left - 120) {
        g.plane = null
      }
      if (k >= 1 && g.mode === 'intro') {
        diver.spin = 0
        g.mode = 'play'
        g.nextRowIn = 0.15
        emit('play')
      }
    }
  }

  function updateLanding(dt) {
    const t = g.phaseT
    diver.chute = damp(diver.chute, t < 3.1 ? 1 : 0, t < 3.1 ? 7 : 4, dt)
    diver.pose = damp(diver.pose, t < 3.3 ? 1 : 0.3, 5, dt)
    diver.target = view.W / 2
    moveDiver(dt, 2.5)
    const groundTop = view.H * 0.66
    const k = ease.outCubic(invLerp(0.5, 3.0, t))
    g.groundY = lerp(view.H + 170, groundTop, k)
    const feet = 40 * diver.scale
    const landY = groundTop + 44 - feet
    diver.y = lerp(diverY(), landY, ease.inOutSine(invLerp(0.6, 3.0, t)))
    sky.alt = damp(sky.alt, 0, 2, dt)
    if (t >= 3.0 && diver.mood !== 'cheer') {
      diver.mood = 'cheer'
      audio?.sfx.land()
      audio?.sfx.jingle()
      fx.confetti(view.left + 20, view.right - 20, view.H * 0.15, 110)
      fx.puff(diver.x, landY + feet, '#e6f5d0', 10, 30)
    }
    if (t >= 3.9 && !g.landedSent) {
      g.landedSent = true
      emit('landed', result())
    }
  }

  function result() {
    return {
      endless: g.endless,
      level: g.level?.nr || null,
      hits: g.hits,
      goal: g.level?.goal || null,
      misses: g.misses,
      score: g.score,
      bestCombo: g.bestCombo,
      stage: g.stage,
      missed: [...new Map(g.missed.map((v) => [v.inf, { inf: v.inf, past: v.past, pp: v.pp, de: v.de }])).values()],
    }
  }

  // -------------------------------------------------------------------------
  // Zeichnen
  // -------------------------------------------------------------------------
  function render() {
    const ctx = view.ctx
    view.begin(true)
    if (g.mode !== 'landing') sky.alt = damp(sky.alt, targetAlt(), 1.5, 1 / 60)
    sky.drawBack(ctx, view)
    if (g.groundY < view.H + 160) drawGround(ctx, view, g.groundY, g.t)

    // Auf breiten Bildschirmen: außerhalb der Spielfläche etwas abdunkeln
    if (view.left < -8) {
      for (const [x, dir] of [[0, -1], [view.W, 1]]) {
        const grad = ctx.createLinearGradient(x, 0, x + dir * 36, 0)
        grad.addColorStop(0, 'rgba(10, 30, 80, 0)')
        grad.addColorStop(1, 'rgba(10, 30, 80, 0.13)')
        ctx.fillStyle = grad
        const w = -view.left + 12
        ctx.fillRect(dir < 0 ? x - w : x, -12, w, view.H + 24)
      }
    }

    // Wolken: erst die erledigten, dann die aktuelle Reihe
    for (const row of g.rows) if (row.resolved) for (const c of row.clouds) drawAnswerCloud(ctx, c, g.t)
    for (const row of g.rows) if (!row.resolved) for (const c of row.clouds) drawAnswerCloud(ctx, c, g.t)

    if (g.plane) drawPlane(ctx, g.plane.x, g.plane.y, g.t)
    if (g.mode !== 'intro' || g.released) drawDiver(ctx, diver, g.t)
    fx.draw(ctx)
  }

  function targetAlt() {
    if (g.mode === 'attract') return 1
    if (g.endless) return 1 - Math.min(0.7, g.hits / 90)
    if (g.level) return 1 - (g.hits / g.level.goal) * 0.85
    return 1
  }

  const loop = createLoop(update, render)

  function resize() {
    view.resize()
    sky.resize(view)
    diver.target = clamp(diver.target, MARGIN, view.W - MARGIN)
    diver.x = clamp(diver.x, MARGIN, view.W - MARGIN)
  }

  sky.reset(view)
  toAttract()
  diver.x = view.W / 2

  const api = {
    start,
    toAttract,
    pause() {
      if (g.mode === 'attract') return
      g.paused = true
      audio?.setIntensity(0)
    },
    resume() {
      g.paused = false
      audio?.setIntensity(1)
    },
    get paused() {
      return g.paused
    },
    get mode() {
      return g.mode
    },
    /** Höhe der Anzeige oben (CSS-Pixel) – der Springer bleibt darunter */
    setTopInset(px) {
      g.topInset = px / view.scale
    },
    /** Wo der Springer im Menü schwebt (CSS-Pixel von oben) */
    setAttractY(px) {
      g.attractY = px / view.scale
    },
    resize,
    run() {
      loop.start()
    },
    destroy() {
      loop.stop()
      input.destroy()
    },
    /** Nur zum Testen */
    debug: {
      get g() {
        return g
      },
      get diver() {
        return diver
      },
      get view() {
        return view
      },
      activeRow,
      steer(x) {
        diver.target = clamp(x, MARGIN, view.W - MARGIN)
      },
    },
  }
  return api
}
