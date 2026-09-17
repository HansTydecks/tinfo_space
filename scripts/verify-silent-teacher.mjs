// Prüft alle Silent-Teacher-Aufgaben gegen echtes Python (Pyodide in Node).
//
//   npm run test:silent-teacher              alle Kapitel, 200 Durchläufe je Aufgabe
//   npm run test:silent-teacher -- operatoren --runs 50
//
// Geprüft wird pro Durchlauf:
//   - die echte Ausgabe entspricht `answer` (bzw. das Programm stürzt genau dann ab, wenn answer === ERROR)
//   - ein abstürzendes Programm gibt vorher nichts aus
//   - es gibt genug verschiedene falsche Antworten (bei Zahlen dürfen Nachbarzahlen auffüllen)
//   - Antworten sind kurz genug für einen Button
// Außerdem: Metadaten passen zu den Aufgaben-Dateien, jede Lektionsseite existiert und enthält
// genau einen passenden <SilentTeacherButton>.

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadPyodide } from 'pyodide'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const stDir = join(root, 'docs', '.vitepress', 'theme', 'components', 'silent-teacher')
const load = (p) => import(pathToFileURL(join(stDir, p)).href)

const { KAPITEL } = await load('kapitel/index.js')
const { ERROR, normalize, cleanDistractors, nachbarn, kartenSchluessel } = await load('engine.js')

const args = process.argv.slice(2)
const runsIdx = args.indexOf('--runs')
const RUNS = runsIdx >= 0 ? Number(args[runsIdx + 1]) : 200
const nurKapitel = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--runs')

const MAX_ZEILEN = 3
const MAX_ZEICHEN = 40

const fehler = []
const melde = (wo, text) => fehler.push(`${wo}: ${text}`)

// ---------------------------------------------------------------------------
// Python vorbereiten
// ---------------------------------------------------------------------------
const py = await loadPyodide()
py.runPython(`
import sys, io, json, random, builtins

def _st_run_batch(cases_json):
    results = []
    for case in json.loads(cases_json):
        out = io.StringIO()
        old_out, old_in = sys.stdout, sys.stdin
        sys.stdout = out
        sys.stdin = io.StringIO(case["stdin"])
        err = None
        try:
            code = compile(case["code"], "<karte>", "exec")
            exec(code, {"__name__": "__main__"})
        except BaseException as e:
            err = type(e).__name__
        finally:
            sys.stdout, sys.stdin = old_out, old_in
        results.append({"out": out.getvalue(), "err": err})
    return json.dumps(results)
`)
const runBatch = py.globals.get('_st_run_batch')

// ---------------------------------------------------------------------------
// Metadaten und Seiten
// ---------------------------------------------------------------------------
const ids = new Set()
for (const k of KAPITEL) {
  if (ids.has(k.id)) melde(k.id, 'doppelte Kapitel-id')
  ids.add(k.id)

  const md = join(root, 'docs', k.lektion + '.md')
  if (!existsSync(md)) {
    melde(k.id, `Lektionsseite fehlt: ${md}`)
  } else {
    const text = readFileSync(md, 'utf8')
    const buttons = [...text.matchAll(/<SilentTeacherButton\s+kapitel="([^"]+)"\s*\/>/g)]
    if (buttons.length !== 1) melde(k.id, `${buttons.length} Buttons auf der Lektionsseite (erwartet: 1)`)
    else if (buttons[0][1] !== k.id) melde(k.id, `Button zeigt auf "${buttons[0][1]}"`)
  }
}

// Jede Kursseite mit Button muss ein bekanntes Kapitel meinen
const kursDir = join(root, 'docs', 'students', 'informatik', 'algorithmen', 'python-kurs')
for (const abschnitt of readdirSync(kursDir, { withFileTypes: true })) {
  if (!abschnitt.isDirectory()) continue
  for (const datei of readdirSync(join(kursDir, abschnitt.name))) {
    if (!datei.endsWith('.md')) continue
    const text = readFileSync(join(kursDir, abschnitt.name, datei), 'utf8')
    for (const m of text.matchAll(/<SilentTeacherButton\s+kapitel="([^"]+)"/g)) {
      if (!ids.has(m[1])) melde(`${abschnitt.name}/${datei}`, `unbekanntes Kapitel "${m[1]}"`)
    }
  }
}

// ---------------------------------------------------------------------------
// Aufgaben
// ---------------------------------------------------------------------------
let gesamt = 0
for (const k of KAPITEL) {
  if (nurKapitel.length && !nurKapitel.includes(k.id)) continue
  const datei = join(stDir, 'kapitel', `${k.id}.js`)
  if (!existsSync(datei)) {
    melde(k.id, 'Aufgaben-Datei fehlt')
    continue
  }
  const levels = (await load(`kapitel/${k.id}.js`)).default
  if (!Array.isArray(levels) || levels.length !== k.level.length) {
    melde(k.id, `${levels?.length} Aufgaben-Level, aber ${k.level.length} Level-Titel`)
    continue
  }

  for (const [li, aufgaben] of levels.entries()) {
    if (!aufgaben.length) melde(`${k.id} L${li + 1}`, 'keine Aufgaben')
    for (const [ai, gen] of aufgaben.entries()) {
      const wo = `${k.id} L${li + 1} A${ai + 1}`
      const cases = []
      for (let r = 0; r < RUNS; r++) {
        try {
          cases.push(gen())
        } catch (e) {
          melde(wo, `Generator wirft: ${e.message}`)
          break
        }
      }
      const results = JSON.parse(runBatch(JSON.stringify(cases.map((c) => ({ code: c.code, stdin: c.stdin ?? '' })))))
      const codes = new Set()
      let gemeldet = 0
      for (const [i, c] of cases.entries()) {
        const res = results[i]
        codes.add(kartenSchluessel(c))
        const probleme = []
        const erwartet = c.answer === ERROR ? ERROR : normalize(c.answer)
        if (erwartet === ERROR) {
          if (!res.err) probleme.push(`sollte abstürzen, gibt aber aus: ${JSON.stringify(res.out)}`)
          else if (res.out) probleme.push(`gibt vor dem Absturz etwas aus: ${JSON.stringify(res.out)}`)
        } else if (res.err) {
          probleme.push(`stürzt ab (${res.err}), erwartet ${JSON.stringify(erwartet)}`)
        } else if (normalize(res.out) !== erwartet) {
          probleme.push(`Ausgabe ${JSON.stringify(normalize(res.out))} ≠ answer ${JSON.stringify(erwartet)}`)
        }
        // Ganzzahlige Antworten dürfen mit Nachbarzahlen aufgefüllt werden, alles andere nicht
        const noetig = erwartet === ERROR ? 4 : 3
        const eigene = cleanDistractors(erwartet, c.distractors)
        const falsche = cleanDistractors(erwartet, [...eigene, ...(eigene.length ? nachbarn(erwartet) : [])])
        if (falsche.length < noetig) {
          probleme.push(`nur ${falsche.length} verschiedene falsche Antworten (${JSON.stringify(falsche)})`)
        }
        for (const t of [erwartet, ...eigene]) {
          if (t === ERROR) continue
          const zeilen = t.split('\n')
          if (zeilen.length > MAX_ZEILEN || zeilen.some((z) => z.length > MAX_ZEICHEN)) {
            probleme.push(`Antwort zu lang für einen Button: ${JSON.stringify(t)}`)
          }
        }
        if (probleme.length && gemeldet < 3) {
          gemeldet++
          melde(wo, probleme.join('; ') + `\n    Code:\n      ${c.code.replace(/\n/g, '\n      ')}`)
        }
      }
      if (RUNS >= 50 && codes.size < 3) melde(wo, `zu wenig Abwechslung (${codes.size} verschiedene Karten)`)
      gesamt += cases.length
    }
  }
}

if (fehler.length) {
  console.error(`✗ ${fehler.length} Problem(e):\n`)
  for (const f of fehler) console.error('  - ' + f)
  process.exit(1)
}
console.log(`✓ ${gesamt} Karten geprüft – alles stimmt.`)
