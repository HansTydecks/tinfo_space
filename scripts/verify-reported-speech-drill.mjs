// Prüft alle Aufgaben des Reporter-Spiels (Reported speech).
//
//   npm run test:reported-speech            alle Level, 300 Karten je Aufgabe
//   npm run test:reported-speech -- --runs 50 --zeige 3
//
// Geprüft wird pro Karte:
//   - direkte Rede hat keine Lücken, Bericht hat mindestens eine Lücke
//   - jede Lücke: genau 3 verschiedene Antworten, die richtige ist dabei, Tipp vorhanden
//   - keine übrig gebliebenen Platzhalter ({…}, [ ], undefined), keine doppelten Leerzeichen
//   - Satzanfang groß, Satzende mit Satzzeichen
// Außerdem: feste Grammatik-Stichproben und Anzahl verschiedener Karten je Level.

import { dirname, join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'docs', '.vitepress', 'theme', 'components', 'reported-speech', 'drill')
const load = (p) => import(pathToFileURL(join(dir, p)).href)

const { default: AUFGABEN } = await load('aufgaben.js')
const { LEVELS } = await load('levels.js')
const { naechsteKarte, aenderungen } = await load('engine.js')
const { verbForm, BACKSHIFT, VERBEN, NONE } = await load('grammatik.js')

const args = process.argv.slice(2)
const opt = (name, def) => {
  const i = args.indexOf(name)
  return i >= 0 ? Number(args[i + 1]) : def
}
const RUNS = opt('--runs', 300)
const ZEIGE = opt('--zeige', 0)

const fehler = []
const melde = (wo, text) => fehler.push(`${wo}: ${text}`)

// ---------------------------------------------------------------------------
// Grammatik-Stichproben
// ---------------------------------------------------------------------------
const go = { base: 'go', s: 'goes', past: 'went', pp: 'gone', ing: 'going', rest: '' }
const erwartet = [
  [verbForm('past perfect', '3sg', go), 'had gone'],
  [verbForm(BACKSHIFT['present perfect'], '3sg', go), 'had gone'],
  [verbForm(BACKSHIFT['past simple'], '3sg', go), 'had gone'],
  [verbForm(BACKSHIFT['present simple'], '3sg', go), 'went'],
  [verbForm(BACKSHIFT['present progressive'], 'pl', go), 'were going'],
  [verbForm(BACKSHIFT['present progressive'], 'I', go), 'was going'],
  [verbForm(BACKSHIFT['will'], '3sg', go), 'would go'],
  [verbForm(BACKSHIFT['must'], '3sg', go), 'had to go'],
  [verbForm(BACKSHIFT['going to'], '3sg', go), 'was going to go'],
  [verbForm('present simple', '3sg', go), 'goes'],
  [verbForm('present perfect', '3sg', go), 'has gone'],
]
erwartet.forEach(([ist, soll], i) => ist !== soll && melde(`Grammatik ${i + 1}`, `„${ist}" statt „${soll}"`))
for (const v of VERBEN) {
  for (const t of Object.keys(BACKSHIFT)) {
    const f = verbForm(BACKSHIFT[t], '3sg', v)
    if (!f || f.includes('undefined')) melde(`Verb ${v.base}`, `${t} → ${f}`)
  }
}

// ---------------------------------------------------------------------------
// Aufgaben
// ---------------------------------------------------------------------------
if (AUFGABEN.length !== LEVELS.length) melde('Level', `${AUFGABEN.length} Aufgaben-Level, ${LEVELS.length} in levels.js`)

const text = (k, teile) =>
  teile
    .map((t) => (typeof t === 'string' ? t : t.slot !== undefined ? k.slots[t.slot].answer : t.t))
    .join('')
    .replace(new RegExp(`\\s*${NONE}\\s*`, 'g'), ' ')

let gesamt = 0
AUFGABEN.forEach((aufgaben, li) => {
  const saetze = new Set()
  aufgaben.forEach((aufgabe, ai) => {
    const wo = `L${li + 1} A${ai + 1}`
    if (typeof aufgabe !== 'function') return melde(wo, 'keine Funktion')
    for (let r = 0; r < RUNS; r++) {
      const k = naechsteKarte([aufgabe], [], { punkte: 8, gezeigt: 1, letzteKarte: '' }, li)
      const d = text(k, k.direkt)
      const b = text(k, k.bericht)
      const w = `${wo} „${d}" → „${b}"`
      if (!k.sprecher?.e || !k.sprecher?.n) melde(w, 'Sprecher fehlt')
      if (k.direkt.some((t) => typeof t === 'object' && t.wrong)) melde(w, 'Lücke in der direkten Rede')
      if (k.slots.length === 0) melde(w, 'keine Lücke')
      for (const s of k.slots) {
        if (new Set(s.choices).size !== 3) melde(w, `Antworten nicht 3 verschiedene: ${s.choices.join(' / ')}`)
        if (!s.choices.includes(s.answer)) melde(w, 'richtige Antwort fehlt')
        if (!s.tipp) melde(w, 'kein Tipp')
        if (!['pron', 'tense', 'time', 'rep', 'order'].includes(s.k)) melde(w, `unbekannte Art ${s.k}`)
      }
      for (const [name, satz] of [['direkt', d], ['Bericht', b]]) {
        if (/[{}[\]]|undefined|null/.test(satz)) melde(w, `${name}: Platzhalter übrig`)
        if (/ {2}/.test(satz)) melde(w, `${name}: doppeltes Leerzeichen`)
        if (satz !== satz.trim()) melde(w, `${name}: Leerzeichen am Rand`)
        if (!/^[A-Z“]/.test(satz)) melde(w, `${name}: Satzanfang klein`)
        if (!/[.!?]$/.test(satz)) melde(w, `${name}: kein Satzzeichen am Ende`)
      }
      if (!/[.]$/.test(b)) melde(w, 'Bericht endet nicht mit Punkt')
      aenderungen(k)
      saetze.add(d + '|' + b)
      if (r < ZEIGE) console.log(`${wo}  ${k.sprecher.n}: „${d}"  →  ${b}`)
    }
  })
  console.log(`Level ${li + 1} (${LEVELS[li].titel}): ${saetze.size} verschiedene Karten`)
  gesamt += saetze.size
})

// ---------------------------------------------------------------------------
// Seiten und Anker
// ---------------------------------------------------------------------------
const lektion = join(root, 'docs', 'students', 'english', 'grammar', 'reported-speech', 'index.md')
const spiel = join(root, 'docs', 'students', 'english', 'grammar', 'reported-speech', 'reporter.md')
if (!existsSync(spiel)) melde('Seite', 'reporter.md fehlt')
const md = readFileSync(lektion, 'utf8')
for (const l of LEVELS) {
  if (l.anker && !md.includes(`{#${l.anker}}`)) melde('Lernseite', `Anker #${l.anker} fehlt`)
}

console.log(`\nInsgesamt: ${gesamt} verschiedene Karten (Stichprobe aus ${RUNS} Ziehungen je Aufgabe)`)
if (fehler.length) {
  const einzeln = [...new Set(fehler)]
  console.error(`\n${einzeln.length} Fehler:`)
  einzeln.slice(0, 60).forEach((f) => console.error(' - ' + f))
  process.exit(1)
}
console.log('Alles in Ordnung.')
