// Silent Teacher: reine Spiellogik, ohne Vue.
//
// Eine Aufgabe ist eine Funktion ohne Parameter, die bei jedem Aufruf neue Zufallswerte zieht und
//   { code, answer, distractors, stdin? }
// liefert. `answer` ist die exakte Ausgabe des Programms (wie print sie schreibt) oder ERROR, wenn
// das Programm abstürzt. `distractors` sind typische Denkfehler. Ob `answer` stimmt, prüft
// scripts/verify-silent-teacher.mjs gegen echtes Python.

export const ERROR = '__FEHLER__'
export const ZIEL_PUNKTE = 8

// ---------------------------------------------------------------------------
// Zufall
// ---------------------------------------------------------------------------

/** ganze Zufallszahl in [a, b] */
export function rnd(a, b) {
  return a + Math.floor(Math.random() * (b - a + 1))
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** k verschiedene Elemente aus arr */
export function sample(arr, k) {
  return shuffle(arr).slice(0, k)
}

/** k verschiedene ganze Zahlen aus [a, b] */
export function rndDistinct(a, b, k) {
  const all = []
  for (let i = a; i <= b; i++) all.push(i)
  return sample(all, k)
}

/** 50:50 */
export function coin() {
  return Math.random() < 0.5
}

// ---------------------------------------------------------------------------
// Python-Werte nachbilden
// ---------------------------------------------------------------------------

// JavaScript unterscheidet 4 und 4.0 nicht – Python schon. float(4) markiert eine Kommazahl.
class PyFloat {
  constructor(v) { this.v = v }
}
class PyTuple {
  constructor(items) { this.items = items }
}

export const float = (v) => new PyFloat(v)
export const tuple = (...items) => new PyTuple(items)

/** Pythons `repr()` */
export function pyRepr(v) {
  if (v === null || v === undefined) return 'None'
  if (v === true) return 'True'
  if (v === false) return 'False'
  if (v instanceof PyFloat) return floatRepr(v.v)
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : floatRepr(v)
  if (typeof v === 'string') return strRepr(v)
  if (Array.isArray(v)) return '[' + v.map(pyRepr).join(', ') + ']'
  if (v instanceof PyTuple) {
    return v.items.length === 1
      ? '(' + pyRepr(v.items[0]) + ',)'
      : '(' + v.items.map(pyRepr).join(', ') + ')'
  }
  if (v instanceof Map) {
    return '{' + [...v].map(([k, x]) => pyRepr(k) + ': ' + pyRepr(x)).join(', ') + '}'
  }
  throw new Error('pyRepr: unbekannter Wert ' + v)
}

/** Pythons `str()` – so erscheint ein Wert bei print() */
export function pyStr(v) {
  return typeof v === 'string' ? v : pyRepr(v)
}

function floatRepr(x) {
  if (Number.isInteger(x)) return x.toFixed(1)
  // JS und Python erzeugen beide die kürzeste eindeutige Darstellung
  return String(x)
}

function strRepr(s) {
  const q = s.includes("'") && !s.includes('"') ? '"' : "'"
  const body = s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(new RegExp(q, 'g'), '\\' + q)
  return q + body + q
}

/** eine Zeile, wie print(*werte) sie ausgibt */
export function out(...werte) {
  return werte.map(pyStr).join(' ')
}

/** print(p, q) mit zwei Wahrheitswerten: die anderen drei Kombinationen sind die falschen Antworten */
export function zweiBools(p, q) {
  const alle = [[true, true], [true, false], [false, true], [false, false]]
  return {
    answer: out(p, q),
    distractors: alle.filter(([x, y]) => x !== p || y !== q).map(([x, y]) => out(x, y)),
  }
}

/** mehrere Ausgabezeilen zu einer Antwort zusammensetzen */
export function lines(...zeilen) {
  return zeilen.join('\n')
}

/** Python-Literal für Code-Karten (Strings in doppelten Anführungszeichen, wie im Kurs) */
export function lit(v) {
  if (typeof v === 'string') return '"' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'
  if (Array.isArray(v)) return '[' + v.map(lit).join(', ') + ']'
  return pyRepr(v)
}

/** Pythons Ganzzahldivision und Rest (runden Richtung -unendlich) */
export function idiv(a, b) {
  return Math.floor(a / b)
}
export function mod(a, b) {
  return ((a % b) + b) % b
}

// ---------------------------------------------------------------------------
// Antworten
// ---------------------------------------------------------------------------

/** Vergleichsform einer Ausgabe: Leerzeichen am Zeilenende und Leerzeilen am Ende zählen nicht.
 *  Nicht-Strings werden wie bei print() dargestellt. */
export function normalize(text) {
  return (typeof text === 'string' ? text : pyStr(text))
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((z) => z.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n+$/, '')
}

/** Distraktoren bereinigen: als Text, ohne Duplikate, ohne die richtige Antwort */
export function cleanDistractors(answer, distractors) {
  const seen = new Set([answer, ERROR])
  const result = []
  for (const d of distractors ?? []) {
    if (d === undefined || d === null) continue
    const t = normalize(d)
    if (t === '' || seen.has(t)) continue
    seen.add(t)
    result.push(t)
  }
  return result
}

// Reserve für ganzzahlige Antworten: Nachbarzahlen. Bei kleinen Zahlen fallen typische
// Denkfehler oft zusammen (2 + 2 = 2 * 2), dann füllen diese auf.
export function nachbarn(answer) {
  if (!/^-?\d+$/.test(answer)) return []
  const n = Number(answer)
  return [n + 1, n - 1, n + 2, n - 2, n + 3].map(String)
}

// letzter Notnagel, damit die Oberfläche nie mit zu wenigen Buttons dasteht
function fillers(answer) {
  if (answer === ERROR) return ['0', '1', 'None', 'True']
  return [...nachbarn(answer), answer + answer, 'None', '0', '1']
}

/**
 * Baut die fünf Buttons: 1 richtige + 3 falsche Antworten (gemischt) und „Fehler" am Ende.
 * Ist die richtige Antwort ERROR, gibt es 4 falsche Ausgaben.
 */
export function buildChoices(answer, distractors) {
  const needed = answer === ERROR ? 4 : 3
  let pool = cleanDistractors(answer, distractors)
  let chosen = sample(pool, needed)
  if (chosen.length < needed) {
    pool = cleanDistractors(answer, [...pool, ...nachbarn(answer), ...fillers(answer)])
    chosen = [...chosen, ...pool.filter((t) => !chosen.includes(t))].slice(0, needed)
  }
  const outputs = answer === ERROR ? chosen : [answer, ...chosen]
  return [...shuffle(outputs), ERROR]
}

// ---------------------------------------------------------------------------
// Aufgaben auswählen
// ---------------------------------------------------------------------------

const WIEDERHOLUNG = 0.2
const WIEDERHOLUNG_AB_PUNKTEN = 3
const NEUESTER_TYP = 0.5
// spätestens bei ZIEL_PUNKTE - FREI_VOR_ZIEL Punkten sind alle Aufgabentypen eines Levels dabei
const FREI_VOR_ZIEL = 3

/** gleiche Karte = gleicher Code und gleiche Eingabe */
export function kartenSchluessel(q) {
  return normalize(q.code) + '\u0000' + (q.stdin ?? '')
}

/**
 * Die Aufgaben eines Levels stehen von leicht nach schwer. Zu Beginn ist nur die erste
 * freigeschaltet, mit steigenden Punkten kommen die weiteren dazu – nach Fehlern wieder weniger.
 */
export function freigeschaltet(anzahl, punkte) {
  if (anzahl <= 1) return anzahl
  const spanne = ZIEL_PUNKTE - FREI_VOR_ZIEL
  return Math.min(anzahl, 1 + Math.floor((Math.max(0, punkte) * (anzahl - 1)) / spanne))
}

/**
 * Zieht die nächste Karte.
 * @param {Function[]} neu      Aufgaben des aktuellen Levels, leicht → schwer
 * @param {Function[]} alt      leichte Aufgaben früherer Level (Wiederholung)
 * @param {{ punkte: number, gezeigt: number, letzteKarte: string }} verlauf
 *        `gezeigt` zählt die schon vorgestellten Aufgabentypen und wird hier weitergezählt
 */
export function nextQuestion(neu, alt, verlauf) {
  const punkte = verlauf.punkte ?? 0
  const offen = freigeschaltet(neu.length, punkte)
  const gezeigt = verlauf.gezeigt ?? 0
  let pool
  if (offen > gezeigt) {
    // gerade freigeschalteter Typ: erst einmal genau diesen zeigen
    pool = [neu[gezeigt]]
    verlauf.gezeigt = gezeigt + 1
  } else if (alt.length > 0 && punkte >= WIEDERHOLUNG_AB_PUNKTEN && Math.random() < WIEDERHOLUNG) {
    pool = alt
  } else if (Math.random() < NEUESTER_TYP) {
    pool = [neu[offen - 1]]
  } else {
    pool = neu.slice(0, offen)
  }
  let q
  for (let versuch = 0; versuch < 12; versuch++) {
    q = pick(pool)()
    if (kartenSchluessel(q) !== verlauf.letzteKarte) break
  }
  const answer = q.answer === ERROR ? ERROR : normalize(q.answer)
  return {
    code: q.code,
    stdin: q.stdin ?? '',
    answer,
    choices: buildChoices(answer, q.distractors),
  }
}

// ---------------------------------------------------------------------------
// Fortschritt (nur im Browser dieses Geräts)
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'pykurs-silent-teacher-v1'

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
