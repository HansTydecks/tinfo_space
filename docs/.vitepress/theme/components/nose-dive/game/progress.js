// Fortschritt im Browser speichern (localStorage kann fehlen oder gesperrt sein).

const KEY = 'nose-dive-v1'
const DEFAULT = { stars: {}, best: 0, sound: true, music: true }

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULT, stars: {} }
    const p = JSON.parse(raw)
    return { ...DEFAULT, ...p, stars: { ...(p.stars || {}) } }
  } catch {
    return { ...DEFAULT, stars: {} }
  }
}

export function saveProgress(p) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* privates Fenster o. Ä. – dann eben ohne Speichern */
  }
}

/** Erstes Level ohne Sterne (oder das letzte). */
export function nextLevel(progress, count) {
  for (let i = 1; i <= count; i++) if (!progress.stars[i]) return i
  return count
}
