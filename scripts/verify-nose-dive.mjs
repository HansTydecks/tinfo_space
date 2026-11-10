// Prüft Wörter, Antwortmöglichkeiten und Level von „Nose Dive“ (unregelmäßige Verben).
//
//   npm run test:nose-dive
//   npm run test:nose-dive -- --zeige 5      zeigt Beispielfragen

import { dirname, join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'docs', '.vitepress', 'theme', 'components', 'nose-dive', 'game')
const load = (p) => import(pathToFileURL(join(dir, p)).href)

const { VERBS, TIERS, verbsForTiers, validForms } = await load('vocab.js')
const { optionsFor, createDeck } = await load('questions.js')
const { LEVELS, endlessStage, starsFor, HEARTS } = await load('levels.js')

const args = process.argv.slice(2)
const zi = args.indexOf('--zeige')
const ZEIGE = zi >= 0 ? Number(args[zi + 1]) : 0

const fehler = []
const melde = (wo, text) => fehler.push(`${wo}: ${text}`)

// ---------------------------------------------------------------------------
// Wörter
// ---------------------------------------------------------------------------
if (VERBS.length !== 100) melde('Wörter', `${VERBS.length} statt 100 Verben`)
const infs = new Set()
for (const v of VERBS) {
  const wo = `Verb ${v.inf}`
  if (infs.has(v.inf)) melde(wo, 'doppelt')
  infs.add(v.inf)
  for (const k of ['inf', 'past', 'pp', 'de']) if (!v[k]) melde(wo, `${k} fehlt`)
  if (v.tier < 1 || v.tier > TIERS) melde(wo, `Stufe ${v.tier}`)
  if (v.wrong.length < 2) melde(wo, 'weniger als 2 falsche Formen')
  const alleRichtig = new Set([...validForms(v, 'past'), ...validForms(v, 'pp')])
  for (const w of v.wrong) {
    if (alleRichtig.has(w)) melde(wo, `falsche Form „${w}“ ist eigentlich richtig`)
    if (w === v.inf) melde(wo, `falsche Form „${w}“ = Infinitiv`)
    if (!/^[a-z]+$/.test(w)) melde(wo, `komische falsche Form „${w}“`)
  }
}
for (let t = 1; t <= TIERS; t++) if (verbsForTiers([t]).length !== 10) melde('Stufen', `Stufe ${t} hat nicht 10 Verben`)

// Stichproben: diese Formen dürfen nie als falsch angeboten werden
const nieFalsch = { hang: ['hanged'], shine: ['shined'], lie: ['lied'], kneel: ['kneeled'], show: ['showed'], get: ['gotten'] }

// ---------------------------------------------------------------------------
// Antwortmöglichkeiten
// ---------------------------------------------------------------------------
let gezeigt = 0
for (const v of VERBS) {
  for (const form of ['past', 'pp']) {
    const valid = validForms(v, form)
    for (const count of [2, 3]) {
      let andereFormDabei = 0
      for (let r = 0; r < 60; r++) {
        const opts = optionsFor(v, form, count)
        const wo = `${v.inf} ${form} ×${count}`
        if (opts.length !== count) melde(wo, `${opts.length} Antworten`)
        if (new Set(opts.map((o) => o.text)).size !== opts.length) melde(wo, 'doppelte Antwort')
        const richtig = opts.filter((o) => o.correct)
        if (richtig.length !== 1 || richtig[0].text !== v[form]) melde(wo, 'richtige Antwort fehlt')
        for (const o of opts) {
          if (!o.correct && valid.has(o.text)) melde(wo, `„${o.text}“ ist auch richtig`)
          if (!o.correct && (nieFalsch[v.inf] || []).includes(o.text)) melde(wo, `„${o.text}“ darf nicht falsch sein`)
        }
        const other = form === 'past' ? v.pp : v.past
        if (opts.some((o) => !o.correct && o.text === other)) andereFormDabei++
      }
      // Bei drei Wolken soll die andere Form (went/gone) immer dabei sein, wenn sie anders und falsch ist
      const other = form === 'past' ? v.pp : v.past
      if (count === 3 && other !== v[form] && !valid.has(other) && andereFormDabei !== 60)
        melde(`${v.inf} ${form}`, 'andere Form fehlt bei 3 Wolken')
      if (gezeigt < ZEIGE && count === 3) {
        console.log(`${v.inf} (${form}): ${optionsFor(v, form, 3).map((o) => (o.correct ? `[${o.text}]` : o.text)).join(' · ')}`)
        gezeigt++
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Stapel
// ---------------------------------------------------------------------------
{
  const verbs = verbsForTiers([1])
  const deck = createDeck(verbs, 'past')
  const gesehen = new Set()
  let vorher = null
  for (let i = 0; i < 10; i++) {
    const c = deck.next()
    gesehen.add(c.verb.inf)
    if (c.verb === vorher) melde('Stapel', 'gleiches Verb direkt hintereinander')
    vorher = c.verb
  }
  if (gesehen.size !== 10) melde('Stapel', `in 10 Karten nur ${gesehen.size} verschiedene Verben`)

  for (let r = 0; r < 200; r++) {
    const d = createDeck(verbs, 'mixed')
    d.next()
    const verpasst = d.next()
    d.again(verpasst)
    let abstand = 0
    for (let i = 1; i <= 8; i++) {
      const c = d.next()
      if (c.verb === verpasst.verb && c.repeat) {
        abstand = i
        break
      }
    }
    if (abstand < 3 || abstand > 5) melde('Stapel', `verpasstes Verb kommt nach ${abstand} Karten (soll 3–5)`)
  }
  const m = createDeck(verbsForTiers([1, 2]), 'mixed')
  const formen = new Set()
  for (let i = 0; i < 40; i++) formen.add(m.next().form)
  if (formen.size !== 2) melde('Stapel', 'gemischter Stapel fragt nicht beide Formen')
}

// ---------------------------------------------------------------------------
// Level
// ---------------------------------------------------------------------------
LEVELS.forEach((l, i) => {
  const wo = `Level ${i + 1} (${l.name})`
  if (l.nr !== i + 1) melde(wo, 'Nummer falsch')
  if (!['past', 'pp', 'mixed'].includes(l.form)) melde(wo, `Form ${l.form}`)
  if (![2, 3].includes(l.choices)) melde(wo, `${l.choices} Wolken`)
  if (!(l.rise >= 2.2 && l.rise <= 6)) melde(wo, `rise ${l.rise}`)
  if (verbsForTiers(l.tiers).length < l.goal * 0.6) melde(wo, 'zu wenige Verben für das Ziel')
})
for (const h of [0, 9, 10, 35, 120]) {
  const s = endlessStage(h)
  if (!s.tiers.length || s.rise < 2.2) melde(`Endlos ${h}`, JSON.stringify(s))
}
if (starsFor(0) !== 3 || starsFor(1) !== 2 || starsFor(HEARTS - 1) !== 1) melde('Sterne', 'Sterne falsch')

// ---------------------------------------------------------------------------
// Seiten
// ---------------------------------------------------------------------------
const seite = join(root, 'docs', 'students', 'english', 'spiele', 'nose-dive.md')
if (!existsSync(seite)) melde('Seite', 'nose-dive.md fehlt')
const spiele = readFileSync(join(root, 'docs', 'students', 'english', 'spiele', 'index.md'), 'utf8')
if (!spiele.includes('nose-dive')) melde('Seite', 'Spiele-Übersicht verlinkt Nose Dive nicht')
const alt = join(root, 'docs', 'public', 'irr_verbs_game', 'endless_fall_prototype.html')
if (existsSync(alt) && !readFileSync(alt, 'utf8').includes('nose-dive')) melde('Seite', 'alte Adresse leitet nicht weiter')

console.log(`${VERBS.length} Verben, ${LEVELS.length} Level geprüft.`)
if (fehler.length) {
  const einzeln = [...new Set(fehler)]
  console.error(`\n${einzeln.length} Fehler:`)
  einzeln.slice(0, 60).forEach((f) => console.error(' - ' + f))
  process.exit(1)
}
console.log('Alles in Ordnung.')
