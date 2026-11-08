// Prüft alle Aufgaben des englischen Silent Teachers (Prepositions).
//
//   npm run test:silent-teacher-english              alle Kapitel, 300 Karten je Aufgabe
//   npm run test:silent-teacher-english -- time --runs 50
//
// Geprüft wird pro Karte:
//   - genau eine Lücke ___ im Satz
//   - mindestens 2 verschiedene falsche Antworten, keine davon ist die richtige
//   - Bilder (scene) gibt es wirklich
// Außerdem: Metadaten passen zu den Aufgaben-Dateien, jede Lektionsseite existiert und enthält
// mindestens einen <EnglishSilentTeacherButton>, und zwar nur für dieses Kapitel. Am Ende: Anzahl verschiedener Sätze.

import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const stDir = join(root, 'docs', '.vitepress', 'theme', 'components', 'silent-teacher-english')
const load = (p) => import(pathToFileURL(join(stDir, p)).href)

const { KAPITEL } = await load('kapitel/index.js')
const { GAP, cleanDistractors, nextCard, fuelle } = await load('engine.js')
const { BILDER } = await load('szenen.js')

const args = process.argv.slice(2)
const runsIdx = args.indexOf('--runs')
const RUNS = runsIdx >= 0 ? Number(args[runsIdx + 1]) : 300
const nur = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--runs')

const fehler = []
const melde = (wo, text) => fehler.push(`${wo}: ${text}`)
let gesamt = 0

for (const kap of KAPITEL) {
  if (nur.length && !nur.includes(kap.id)) continue
  const levels = (await load(`kapitel/${kap.id}.js`)).default
  if (levels.length !== kap.level.length) {
    melde(kap.id, `${levels.length} Level in der Datei, ${kap.level.length} in index.js`)
  }
  const saetzeKapitel = new Set()
  levels.forEach((aufgaben, li) => {
    const saetze = new Set()
    aufgaben.forEach((aufgabe, ai) => {
      const wo = `${kap.id} L${li + 1} A${ai + 1}`
      if (typeof aufgabe !== 'function') return melde(wo, 'keine Funktion')
      for (let r = 0; r < RUNS; r++) {
        const k = aufgabe()
        const w = `${wo} „${k.text}"`
        if (typeof k.text !== 'string' || k.text.split(GAP).length !== 2) melde(w, 'nicht genau eine Lücke')
        if (typeof k.answer !== 'string' || !k.answer) melde(w, 'keine Antwort')
        const d = cleanDistractors(k.answer, k.distractors)
        if (d.length < 2) melde(w, `nur ${d.length} falsche Antwort(en): ${d.join(', ')}`)
        if ((k.distractors ?? []).includes(k.answer)) melde(w, 'richtige Antwort steht bei den falschen')
        if (k.scene && !BILDER[k.scene.bild]) melde(w, `unbekanntes Bild ${k.scene.bild}`)
        if (/\{|\}|undefined/.test(k.text)) melde(w, 'Platzhalter nicht ersetzt')
        if (!k.tipp) melde(w, 'kein Tipp')
        fuelle(k.text, k.answer)
        saetze.add(k.text + '|' + k.answer + '|' + (k.scene?.bild ?? ''))
      }
    })
    // Ziehung wie im Spiel
    const v = { punkte: 0, gezeigt: 0, letzteKarte: '' }
    for (let p = 0; p < 10; p++) {
      v.punkte = p
      const c = nextCard(aufgaben, [], v)
      if (c.choices.length < 3 || !c.choices.includes(c.answer)) melde(`${kap.id} L${li + 1}`, 'Antwortknöpfe kaputt')
    }
    saetze.forEach((s) => saetzeKapitel.add(s))
    console.log(`  ${kap.id.padEnd(17)} L${li + 1} ${kap.level[li].padEnd(30)} ${String(saetze.size).padStart(4)} verschiedene Karten`)
  })
  gesamt += saetzeKapitel.size

  // Lektionsseite
  const datei = join(root, 'docs', kap.lektion.endsWith('/') ? kap.lektion + 'index.md' : kap.lektion + '.md')
  if (!existsSync(datei)) {
    melde(kap.id, `Lektionsseite fehlt: ${datei}`)
  } else {
    const md = readFileSync(datei, 'utf8')
    const buttons = [...md.matchAll(/<EnglishSilentTeacherButton\s+kapitel="([^"]+)"/g)].map((m) => m[1])
    if (buttons.length < 1 || buttons.some((b) => b !== kap.id)) melde(kap.id, `Lektionsseite hat Buttons: ${buttons.join(', ') || 'keinen'}`)
  }
}

console.log(`\n${gesamt} verschiedene Karten insgesamt (Kapitel „mixed" wiederholt die anderen).`)
if (fehler.length) {
  const einzeln = [...new Set(fehler)]
  console.error(`\n${einzeln.length} Problem(e):\n` + einzeln.slice(0, 80).join('\n'))
  process.exit(1)
}
console.log('Alles in Ordnung.')
