// Fragen bauen: richtige Form + passende falsche Formen, und ein Stapel mit Wiederholung.

import { shuffle } from '../engine/util.js'
import { validForms } from './vocab.js'

export const FORMS = {
  past: { key: 'past', en: 'simple past', de: '2. Form' },
  pp: { key: 'pp', en: 'past participle', de: '3. Form' },
}

/**
 * Antwortmöglichkeiten für ein Verb.
 * Die stärkste falsche Antwort ist die jeweils andere Form (went ↔ gone) – sie ist bei 3 Wolken immer dabei
 * und bei 2 Wolken meistens. Dazu kommen typische Fehler (goed, wented).
 */
export function optionsFor(verb, form, count, rng = Math.random) {
  const answer = verb[form]
  const other = form === 'past' ? verb.pp : verb.past
  const valid = validForms(verb, form)
  const used = new Set([answer])
  const ok = (w) => w && !valid.has(w) && !used.has(w)

  const cross = ok(other) ? [other] : []
  const wrongs = shuffle(verb.wrong.filter(ok), rng)
  let pool
  if (count <= 2) pool = cross.length && rng() < 0.6 ? cross : [...wrongs, ...cross]
  else pool = [...cross, ...wrongs]

  const options = [{ text: answer, correct: true }]
  for (const w of pool) {
    if (options.length >= count) break
    if (!ok(w)) continue
    used.add(w)
    options.push({ text: w, correct: false })
  }
  return shuffle(options, rng)
}

/**
 * Kartenstapel: jedes Verb einmal pro Runde, gemischt.
 * Ein verpasstes Verb kommt nach 3–5 Karten noch einmal.
 * formMode: 'past' | 'pp' | 'mixed'
 */
export function createDeck(verbs, formMode, rng = Math.random) {
  let pool = verbs.slice()
  let queue = []
  let last = null
  const formFor = () => (formMode === 'mixed' ? (rng() < 0.5 ? 'past' : 'pp') : formMode)

  function refill() {
    const neu = shuffle(pool.slice(), rng).map((verb) => ({ verb, form: formFor() }))
    if (neu.length > 1 && neu[0].verb === last) [neu[0], neu[1]] = [neu[1], neu[0]]
    queue.push(...neu)
  }

  return {
    next() {
      if (!queue.length) refill()
      let card = queue.shift()
      // nie zweimal dasselbe Verb direkt hintereinander
      if (card.verb === last && queue.length) {
        const i = queue.findIndex((c) => c.verb !== last)
        if (i >= 0) {
          const [other] = queue.splice(i, 1)
          queue.unshift(card)
          card = other
        }
      }
      last = card.verb
      return card
    },
    /** Verpasste Karte kommt nach 3–5 weiteren Karten wieder. */
    again(card) {
      const pos = Math.min(queue.length, 2 + Math.floor(rng() * 3))
      queue.splice(pos, 0, { verb: card.verb, form: card.form, repeat: true })
    },
    /** Für den Endlos-Modus: neue Verben dazunehmen, Wiederholungen behalten. */
    setVerbs(verbsNeu, formNeu = formMode) {
      pool = verbsNeu.slice()
      formMode = formNeu
      queue = queue.filter((c) => c.repeat)
    },
    get size() {
      return pool.length
    },
  }
}
