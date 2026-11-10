// Spielschleife: feste Logik-Schritte (gleiches Verhalten bei 30, 60 oder 120 Hz), Zeichnen pro Bild.

export function createLoop(update, render, step = 1 / 120) {
  let raf = 0
  let last = 0
  let acc = 0
  let running = false

  function frame(t) {
    raf = requestAnimationFrame(frame)
    const now = t / 1000
    let dt = now - last
    last = now
    if (!(dt > 0)) dt = 0
    if (dt > 0.1) dt = 0.1 // nach Tab-Wechsel o. Ä. nicht „vorspulen“
    acc += dt
    let n = 0
    while (acc >= step && n < 15) {
      update(step)
      acc -= step
      n++
    }
    if (n >= 15) acc = 0
    render(dt)
  }

  return {
    start() {
      if (running) return
      running = true
      last = performance.now() / 1000
      acc = 0
      raf = requestAnimationFrame(frame)
    },
    stop() {
      running = false
      cancelAnimationFrame(raf)
    },
    get running() {
      return running
    },
  }
}
