// Silent Teacher (English): reine Spiellogik, ohne Vue.
//
// Eine Aufgabe ist eine Funktion ohne Parameter, die bei jedem Aufruf eine (zufällige) Karte liefert:
//   { text, answer, distractors, scene?, tipp? }
// `text` enthält genau eine Lücke `___`. `answer` ist die Präposition, die hineingehört (NONE =
// keine Präposition). `distractors` sind Präpositionen, die in diesem Satz FALSCH sind.
// `scene` beschreibt ein Bild (siehe szenen.js), `tipp` erscheint nur nach einer falschen Antwort.
//
// Die Auswahl der Aufgaben (leicht → schwer, Wiederholung, 8 Punkte pro Level) übernimmt die
// Logik des Python-Silent-Teachers.

import { pick, sample, shuffle, freigeschaltet, ZIEL_PUNKTE } from '../silent-teacher/engine.js'

export { pick, sample, shuffle, ZIEL_PUNKTE }

export const GAP = '___'
/** „keine Präposition" (next week, tomorrow, go home …) */
export const NONE = '—'

// ---------------------------------------------------------------------------
// Aufgaben bauen
// ---------------------------------------------------------------------------

/**
 * Ein Satz: [text, answer, ok?] oder { text, answer, ok?, wrong?, scene?, tipp? }.
 * `ok`    – Präpositionen, die hier AUCH richtig wären (kommen nie als falsche Antwort vor)
 * `wrong` – feste Liste falscher Antworten (statt der Auswahl aus dem Pool)
 */
function alsSatz(s) {
  if (Array.isArray(s)) {
    const [text, answer, ok] = s
    return { text, answer, ok: ok ?? [] }
  }
  return { ok: [], ...s }
}

/**
 * Aufgabe aus einer Liste von Sätzen. Falsche Antworten kommen aus `pool` (ohne die richtige
 * Antwort und ohne `ok`). `tipp` ist ein Text oder ein Objekt { antwort: text }.
 */
export function aus(saetze, pool, tipp) {
  const liste = saetze.map(alsSatz)
  if (liste.length === 0) throw new Error('aus(): leere Satzliste')
  return () => {
    const s = pick(liste)
    const verboten = new Set([s.answer, ...s.ok])
    const distractors = s.wrong ?? (s.pool ?? pool).filter((p) => !verboten.has(p))
    const t = s.tipp ?? (typeof tipp === 'string' ? tipp : tipp?.[s.answer])
    return { text: s.text, answer: s.answer, distractors, scene: s.scene, tipp: t }
  }
}

/**
 * Viele Sätze aus Rahmen × Ausdrücken: rahmen enthalten `{x}`, ausdruecke sind [x, answer].
 * Ergebnis: Satzliste für aus().
 */
export function kombi(rahmen, ausdruecke) {
  const saetze = []
  for (const r of rahmen) {
    for (const [x, answer, ok] of ausdruecke) {
      saetze.push([r.replace('{x}', x), answer, ok])
    }
  }
  return saetze
}

/** Großbuchstabe am Satzanfang */
export function gross(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// ---------------------------------------------------------------------------
// Karten
// ---------------------------------------------------------------------------

/** Satz an der Lücke teilen: [vorher, nachher] */
export function teile(text) {
  const i = text.indexOf(GAP)
  return i < 0 ? [text, ''] : [text.slice(0, i), text.slice(i + GAP.length)]
}

/** Satz mit eingesetzter Präposition (NONE = Lücke fällt weg) */
export function fuelle(text, wort) {
  if (wort === NONE) return text.replace(/\s*___\s*/, ' ').replace(/^ /, '').replace(/ ([.,!?])/, '$1')
  return text.replace(GAP, wort)
}

export function cleanDistractors(answer, distractors) {
  const seen = new Set([answer])
  const result = []
  for (const d of distractors ?? []) {
    if (typeof d !== 'string' || d === '' || seen.has(d)) continue
    seen.add(d)
    result.push(d)
  }
  return result
}

/** Antwortknöpfe: richtige Antwort + bis zu 3 falsche, gemischt */
export function buildChoices(answer, distractors) {
  return shuffle([answer, ...sample(cleanDistractors(answer, distractors), 3)])
}

export function kartenSchluessel(k) {
  return k.text + '\u0000' + k.answer + '\u0000' + JSON.stringify(k.scene ?? null)
}

const WIEDERHOLUNG = 0.2
const WIEDERHOLUNG_AB_PUNKTEN = 3
const NEUESTER_TYP = 0.5

/**
 * Zieht die nächste Karte (gleiche Logik wie im Python-Silent-Teacher).
 * @param {Function[]} neu      Aufgaben des aktuellen Levels, leicht → schwer
 * @param {Function[]} alt      Aufgaben früherer Level (Wiederholung)
 * @param {{ punkte: number, gezeigt: number, letzteKarte: string }} verlauf
 */
export function nextCard(neu, alt, verlauf) {
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
  return {
    text: k.text,
    answer: k.answer,
    scene: k.scene ?? null,
    tipp: k.tipp ?? '',
    choices: buildChoices(k.answer, k.distractors),
  }
}

// ---------------------------------------------------------------------------
// Fortschritt (nur im Browser dieses Geräts)
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'english-silent-teacher-v1'

export function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return data && typeof data === 'object' ? data : {}
  } catch {
    return {}
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // privater Modus o. Ä. – Fortschritt gilt dann nur bis zum Neuladen
  }
}

export const progressKey = (kapitelId, levelIndex) => `${kapitelId}/${levelIndex + 1}`
