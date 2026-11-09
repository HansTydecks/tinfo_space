// Reporter-Spiel: Karten ziehen – gleiche Auswahl-Logik wie der Silent Teacher
// (Aufgabentypen werden mit den Punkten freigeschaltet, 20 % Wiederholung früherer Level).

import { pick, sample, shuffle, freigeschaltet, ZIEL_PUNKTE } from '../../silent-teacher/engine.js'
import { NONE } from './grammatik.js'
import { LEVELS } from './levels.js'

export { ZIEL_PUNKTE, NONE }

const WIEDERHOLUNG = 0.2
const WIEDERHOLUNG_AB_PUNKTEN = 3
const NEUESTER_TYP = 0.5

/** Frage über den Antwortknöpfen, je nach Art der Lücke */
export const FRAGE = {
  pron: 'Who is meant? Choose the pronoun.',
  tense: 'Which verb form?',
  time: 'Which time or place word?',
  rep: 'Which word fits?',
  order: 'What comes next?',
}

/** Standard-Tipps (eine Aufgabe kann einen eigenen Tipp haben) */
const TIPP = {
  pron: 'Who is speaking now? I → he / she, my → his / her, we → they – and “you” (to me) → I / me / my.',
  tense: 'After “said”: move the first verb one step back. play → played, am → was, have → had, will → would, played → had played.',
  modal: 'can → could, may → might, must → had to, will → would. could, should, might, would stay the same.',
  time: 'The time and place are different now: today → that day, tomorrow → the next day, yesterday → the day before, here → there, this → that.',
  rep: 'tell + person (told me) – no “to”! · say (that) … or say to + person.',
  order: 'Reported questions: no do / does / did, subject before verb, if / whether for yes/no questions.',
}

/** Abschnitt der Lernseite passend zur Lücke */
const ANKER = { pron: 'pronouns', tense: 'backshift', modal: 'modal-verbs', time: 'time-place', rep: 'say-tell', order: 'questions' }
function ankerFuer(art, levelIdx) {
  if (art === 'order' && levelIdx === 7) return 'commands'
  return ANKER[art] ?? LEVELS[levelIdx]?.anker ?? ''
}

export const label = (w) => (w === NONE ? '— (nothing)' : w)

export function kartenSchluessel(k) {
  const text = (teile) => teile.map((t) => (typeof t === 'string' ? t : t.t ?? t.answer)).join('')
  return text(k.direkt) + '\u0000' + text(k.bericht)
}

/** Lücken der Karte mit gemischten Antworten (richtig + die typische + eine weitere falsche) */
function mitAntworten(k, levelIdx) {
  const slots = []
  const bericht = k.bericht.map((t) => {
    if (typeof t === 'string' || !t.wrong) return t
    const [typisch, ...rest] = [...new Set(t.wrong)].filter((w) => w !== t.answer)
    const falsch = [typisch, ...sample(rest, 1)].filter(Boolean)
    const art = t.k === 'tense' && levelIdx === 3 ? 'modal' : t.k
    slots.push({
      k: t.k,
      answer: t.answer,
      choices: shuffle([t.answer, ...falsch]),
      tipp: k.tipp ?? TIPP[art] ?? '',
      anker: ankerFuer(art, levelIdx),
    })
    return { slot: slots.length - 1, k: t.k }
  })
  return { ...k, bericht, slots }
}

/**
 * Nächste Karte.
 * @param {Function[]} neu   Aufgaben des Levels, leicht → schwer
 * @param {Function[]} alt   Aufgaben früherer Level (Wiederholung)
 * @param {{ punkte: number, gezeigt: number, letzteKarte: string }} verlauf
 */
export function naechsteKarte(neu, alt, verlauf, levelIdx) {
  const punkte = verlauf.punkte ?? 0
  const offen = freigeschaltet(neu.length, punkte)
  const gezeigt = verlauf.gezeigt ?? 0
  let pool
  if (offen > gezeigt) {
    pool = [neu[gezeigt]]
    verlauf.gezeigt = gezeigt + 1
  } else if (alt.length > 0 && punkte >= WIEDERHOLUNG_AB_PUNKTEN && Math.random() < WIEDERHOLUNG) {
    pool = alt
  } else if (Math.random() < NEUESTER_TYP) {
    pool = [neu[offen - 1]]
  } else {
    pool = neu.slice(0, offen)
  }
  let k
  for (let versuch = 0; versuch < 12; versuch++) {
    k = pick(pool)()
    if (kartenSchluessel(k) !== verlauf.letzteKarte) break
  }
  return mitAntworten(k, levelIdx)
}

/**
 * „What changed?": Paare direkt → berichtet je Farbe, wenn die Anzahl übereinstimmt.
 * @param {object} k       Karte (nach mitAntworten)
 */
export function aenderungen(k) {
  const paare = []
  for (const art of ['pron', 'tense', 'time']) {
    const vorher = k.direkt.filter((t) => typeof t === 'object' && t.k === art).map((t) => t.t)
    const nachher = k.bericht
      .filter((t) => typeof t === 'object' && t.k === art)
      .map((t) => (t.slot !== undefined ? k.slots[t.slot].answer : t.t))
    if (vorher.length === 0 || vorher.length !== nachher.length) continue
    vorher.forEach((v, i) => {
      if (nachher[i] !== NONE && v.toLowerCase() !== nachher[i].toLowerCase()) paare.push({ k: art, von: v, zu: nachher[i] })
    })
  }
  return paare
}
