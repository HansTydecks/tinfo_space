// Level-Daten. rise = Sekunden, bis eine Wolkenreihe vom unteren Rand beim Springer ist
// (gleich lang auf jedem Bildschirm).

export const LEVELS = [
  { name: 'First jump', form: 'past', tiers: [1], choices: 2, rise: 4.6, goal: 8 },
  { name: 'Cloud hopper', form: 'past', tiers: [1, 2], choices: 2, rise: 4.1, goal: 10 },
  { name: 'Speed drill', form: 'past', tiers: [2, 3], choices: 2, rise: 3.4, goal: 10 },
  { name: 'Triple threat', form: 'past', tiers: [3, 4, 5], choices: 3, rise: 3.8, goal: 12 },
  { name: 'Participle warm-up', form: 'pp', tiers: [1], choices: 2, rise: 4.6, goal: 8 },
  { name: 'Perfect patterns', form: 'pp', tiers: [1, 2], choices: 2, rise: 4.0, goal: 10 },
  { name: 'Exam review', form: 'pp', tiers: [2, 3, 4], choices: 3, rise: 3.8, goal: 12 },
  { name: 'Tricky irregulars', form: 'pp', tiers: [5, 6, 7], choices: 3, rise: 3.5, goal: 12 },
  { name: 'Mix it up', form: 'mixed', tiers: [1, 2, 3, 4, 5, 6], choices: 3, rise: 3.7, goal: 14 },
  { name: 'Final flight', form: 'mixed', tiers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], choices: 3, rise: 3.1, goal: 16 },
].map((l, i) => ({ ...l, nr: i + 1 }))

export const HEARTS = 3

/** Sterne nach Fehlern: 0 → 3, 1 → 2, 2 → 1 */
export const starsFor = (misses) => (misses === 0 ? 3 : misses === 1 ? 2 : 1)

/** Endlos-Modus: alle 10 Treffer eine neue Stufe – mehr Verben, schneller, ab Stufe 2 drei Wolken. */
export function endlessStage(hits) {
  const stage = Math.floor(hits / 10) + 1
  const maxTier = Math.min(10, 2 + stage)
  return {
    stage,
    tiers: Array.from({ length: maxTier }, (_, i) => i + 1),
    choices: stage === 1 ? 2 : 3,
    rise: Math.max(2.3, 4.3 - (stage - 1) * 0.28),
    form: 'mixed',
  }
}

export const FORM_INFO = {
  past: { en: 'simple past', de: '2. Form', short: '2nd form' },
  pp: { en: 'past participle', de: '3. Form', short: '3rd form' },
  mixed: { en: 'both forms', de: '2. und 3. Form', short: 'mixed' },
}
