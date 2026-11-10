// Kleine Helfer für Mathe, Zufall und Easing.

export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
export const lerp = (a, b, t) => a + (b - a) * t
export const invLerp = (a, b, v) => clamp((v - a) / (b - a), 0, 1)
export const TAU = Math.PI * 2

/** Zufallszahl: rand() → [0,1), rand(b) → [0,b), rand(a,b) → [a,b) */
export function rand(a = 1, b, rng = Math.random) {
  return b === undefined ? rng() * a : a + rng() * (b - a)
}
export const pick = (arr, rng = Math.random) => arr[Math.floor(rng() * arr.length)]
export function shuffle(arr, rng = Math.random) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Bildrate-unabhängiges Annähern: lambda ≈ „wie schnell“ (1/s). */
export const damp = (current, target, lambda, dt) => lerp(current, target, 1 - Math.exp(-lambda * dt))

/** Deterministische Pseudozufallszahlen (für feste Wolkenformen). */
export function seeded(seed) {
  let s = seed >>> 0 || 1
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return ((s >>> 0) % 100000) / 100000
  }
}
export function hash(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  return h >>> 0
}

export const ease = {
  linear: (t) => t,
  inQuad: (t) => t * t,
  outQuad: (t) => 1 - (1 - t) * (1 - t),
  inOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
  outCubic: (t) => 1 - (1 - t) ** 3,
  inCubic: (t) => t ** 3,
  inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  outBack: (t) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2
  },
  outElastic: (t) =>
    t === 0 || t === 1 ? t : 2 ** (-10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1,
}

/** Farben mischen: '#rrggbb' → '#rrggbb' */
export function mix(c1, c2, t) {
  const a = parseInt(c1.slice(1), 16)
  const b = parseInt(c2.slice(1), 16)
  const r = Math.round(lerp(a >> 16, b >> 16, t))
  const g = Math.round(lerp((a >> 8) & 255, (b >> 8) & 255, t))
  const bl = Math.round(lerp(a & 255, b & 255, t))
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | bl).toString(16).slice(1)
}
