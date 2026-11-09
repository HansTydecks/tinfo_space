// Gemeinsame Maße für die Reported-Speech-Grafiken.
// Die Breite eines Wort-Chips wird aus der Zeichenzahl geschätzt (Schrift 15px).
export const CHAR = 8.2

// Wörter ohne Kasten (k = 'n' oder 'grau') brauchen kaum Innenabstand.
export function chipW(t, k = 'n') {
  return Math.round(t.length * CHAR + (k === 'n' || k === 'grau' ? 6 : 18))
}

/** Legt Chips nebeneinander: liefert x (links), w, cx (Mitte), r (rechts). */
export function reihe(teile, x = 0, gap = 6) {
  let cx = x
  return teile.map((p) => {
    const w = p.w ?? chipW(p.t, p.k)
    const r = { ...p, x: cx, w, cx: cx + w / 2, r: cx + w }
    cx += w + gap
    return r
  })
}

export const ende = (r) => r[r.length - 1].r
