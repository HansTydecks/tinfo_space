// Eingabe: Tastatur + Zeiger (Finger, Maus, Stift) in einem.
//
// - axis: −1 / 0 / +1 aus Pfeiltasten bzw. A/D
// - Ziehen: onDrag(dxCss) mit der Strecke seit dem Aufsetzen
// - Tippen: onTap(clientX, clientY) bei kurzer Berührung ohne Bewegung

export function createInput(el, handlers = {}) {
  const keys = new Set()
  let drag = null

  const LEFT = ['ArrowLeft', 'KeyA']
  const RIGHT = ['ArrowRight', 'KeyD']
  const GAME_KEYS = [...LEFT, ...RIGHT, 'ArrowUp', 'ArrowDown', 'Space']

  function keydown(e) {
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return
    if (handlers.active?.() && GAME_KEYS.includes(e.code)) e.preventDefault()
    if (!e.repeat) handlers.onKey?.(e.code, e)
    keys.add(e.code)
  }
  function keyup(e) {
    keys.delete(e.code)
  }
  function blur() {
    keys.clear()
    drag = null
  }

  function down(e) {
    if (e.button !== undefined && e.button > 0) return
    if (drag) return
    drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, t0: performance.now(), moved: false }
    try {
      el.setPointerCapture(e.pointerId)
    } catch {
      /* egal */
    }
    handlers.onDragStart?.(e.clientX, e.clientY)
  }
  function move(e) {
    if (!drag || e.pointerId !== drag.id) return
    const dx = e.clientX - drag.x0
    const dy = e.clientY - drag.y0
    if (!drag.moved && dx * dx + dy * dy > 64) drag.moved = true
    if (drag.moved) handlers.onDrag?.(dx)
  }
  function up(e) {
    if (!drag || e.pointerId !== drag.id) return
    const kurz = performance.now() - drag.t0 < 350
    if (!drag.moved && kurz) handlers.onTap?.(e.clientX, e.clientY)
    handlers.onDragEnd?.()
    drag = null
  }

  window.addEventListener('keydown', keydown)
  window.addEventListener('keyup', keyup)
  window.addEventListener('blur', blur)
  el.addEventListener('pointerdown', down)
  el.addEventListener('pointermove', move)
  el.addEventListener('pointerup', up)
  el.addEventListener('pointercancel', up)

  return {
    get axis() {
      const l = LEFT.some((k) => keys.has(k)) ? 1 : 0
      const r = RIGHT.some((k) => keys.has(k)) ? 1 : 0
      return r - l
    },
    get dragging() {
      return !!drag?.moved
    },
    destroy() {
      window.removeEventListener('keydown', keydown)
      window.removeEventListener('keyup', keyup)
      window.removeEventListener('blur', blur)
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    },
  }
}
