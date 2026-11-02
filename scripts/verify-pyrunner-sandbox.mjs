// Prüft, dass der Python-Runner (PyRunner.vue + docs/public/pyworker.js)
// weiterhin funktioniert UND eingesperrt bleibt.
//
//   npm run test:pyrunner
//
// Dazu wird die gebaute Seite ausgeliefert und mit einem echten Chromium
// bedient. Geprüft wird:
//   a) ein normales Snippet gibt noch korrekt aus
//   b) input() liest die voreingestellten Zeilen
//   c) `import js` erreicht das DOM der Seite nicht
//   d) localStorage der Seite ist unerreichbar (Silent-Teacher-Fortschritt!)
//   e) eine Endlosschleife wird abgebrochen, die Seite bleibt bedienbar,
//      und danach läuft wieder ein Snippet
//   f) eine Druckbombe wird abgeschnitten statt den DOM zu sprengen
//   g) die Standardbibliothek laeuft nach dem Haerten noch (wichtigster
//      Regressionsschutz bei einem Pyodide-Update!)
//   h) kein gefaehrliches JS-Global ist aus Python erreichbar
//   i) ein veraenderter Interpreter wird vor dem naechsten Lauf aufgeraeumt
//
// Voraussetzung: `npm run build` lief vorher (macht das Skript sonst selbst).

import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'

// Playwright per require() holen: so wird es auch gefunden, wenn es global
// installiert ist (ESM-import schaut nur ins lokale node_modules).
let chromium
try {
  chromium = createRequire(import.meta.url)('playwright').chromium
} catch {
  console.error('Playwright fehlt. Einmalig installieren mit:')
  console.error('  npm i -D playwright && npx playwright install chromium')
  process.exit(1)
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'docs', '.vitepress', 'dist')
const PORT = 4173
const SEITE = `http://localhost:${PORT}/students/informatik/algorithmen/python-kurs/einsteiger/erste-schritte`

const fehler = []
const melde = (wo, text) => fehler.push(`${wo}: ${text}`)
const ok = (wo) => console.log(`  ✓ ${wo}`)

// ---------------------------------------------------------------------------
// Gebaute Seite ausliefern
// ---------------------------------------------------------------------------
if (!existsSync(dist)) {
  console.error('dist/ fehlt – bitte zuerst `npm run build` ausführen.')
  process.exit(1)
}

const server = spawn('npx', ['vitepress', 'serve', 'docs', '--port', String(PORT)], {
  cwd: root,
  stdio: 'ignore',
})
const aufraeumen = () => { try { server.kill('SIGKILL') } catch {} }
process.on('exit', aufraeumen)
// Auch bei Abbruch aufraeumen, sonst bleiben Server-Prozesse liegen und
// verlangsamen den naechsten Lauf.
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => { aufraeumen(); process.exit(1) })
}

async function warteAufServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/`)
      if (r.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('Server ist nicht hochgekommen.')
}

await warteAufServer()

// ---------------------------------------------------------------------------
// Browser
// ---------------------------------------------------------------------------
const browser = await chromium.launch()
const page = await browser.newPage()
page.on('pageerror', (err) => melde('Seitenfehler', String(err)))
page.on('console', (m) => {
  if (m.type() === 'error') melde('Konsolenfehler', m.text().slice(0, 200))
})
await page.goto(SEITE, { waitUntil: 'networkidle' })

// Auf die Hydrierung warten: der Runner rendert Werkzeugleiste und Editor erst
// clientseitig. In einer frisch belasteten Umgebung (z. B. direkt nach
// `npm run build`) kann das deutlich laenger dauern als die Playwright-Vorgabe.
await page
  .locator('.py-runner__btn--run')
  .first()
  .waitFor({ state: 'visible', timeout: 120000 })

const RUNNER = '.py-runner'

/** Setzt Code in die n-te Box, drückt Ausführen und liefert die Ausgabe. */
async function fuehreAus(n, quellcode, { stdin = null, wartenMs = 60000 } = {}) {
  const box = page.locator(RUNNER).nth(n)

  // PyRunner faellt auf ein <textarea> zurueck, wenn CodeMirror nicht laedt.
  // Beide Wege bedienen, sonst haengt der Test am falschen Selektor.
  await box
    .locator('.cm-content, .py-runner__textarea')
    .first()
    .waitFor({ state: 'visible', timeout: 120000 })

  const textarea = box.locator('.py-runner__textarea')
  if (await textarea.count()) {
    await textarea.fill(quellcode)
  } else {
    const inhalt = box.locator('.cm-content')
    await inhalt.click()
    await page.keyboard.press('ControlOrMeta+a')
    // insertText fuegt woertlich ein; pressSequentially wuerde die
    // Auto-Einrueckung von CodeMirror ausloesen und den Code verbiegen.
    await page.keyboard.insertText(quellcode)
  }

  if (stdin !== null) {
    const feld = box.locator('.py-runner__stdin textarea')
    await feld.waitFor({ state: 'visible', timeout: 5000 })
    await feld.fill(stdin)
  }

  await box.locator('.py-runner__btn--run').click()

  // Fertig ist der Lauf, wenn „Ausführen“ wieder klickbar ist
  await box
    .locator('.py-runner__btn--run:not([disabled])')
    .waitFor({ state: 'visible', timeout: wartenMs })

  return (await box.locator('.py-runner__output').innerText()).trim()
}

// --- a) normales Snippet ----------------------------------------------------
{
  const aus = await fuehreAus(0, 'print("Hallo", 2 + 2)')
  if (aus.includes('Hallo 4')) ok('a) normale Ausgabe')
  else melde('a) normale Ausgabe', `erwartet "Hallo 4", bekommen: ${JSON.stringify(aus)}`)
}

// --- b) input() -------------------------------------------------------------
{
  const aus = await fuehreAus(0, 'name = input("Name? ")\nprint("Hallo", name)', { stdin: 'Mia' })
  if (aus.includes('Hallo Mia')) ok('b) input() mit voreingestellten Zeilen')
  else melde('b) input()', `erwartet "Hallo Mia", bekommen: ${JSON.stringify(aus)}`)
}

// --- c) import js erreicht das DOM nicht ------------------------------------
{
  const titelVorher = await page.title()
  await page.evaluate(() => { document.body.setAttribute('data-probe', 'unberuehrt') })

  const aus = await fuehreAus(
    0,
    'import js\nprint("document:", getattr(js, "document", None))\n' +
      'print("window:", getattr(js, "window", None))\n' +
      'js.document.title = "GEKAPERT"',
  )
  const titelNachher = await page.title()
  const probe = await page.evaluate(() => document.body.getAttribute('data-probe'))
  const bodyText = await page.evaluate(() => document.body.innerText.length)

  if (titelNachher !== titelVorher) {
    melde('c) DOM-Zugriff', `Seitentitel wurde verändert: ${titelNachher}`)
  } else if (probe !== 'unberuehrt') {
    melde('c) DOM-Zugriff', 'body wurde verändert')
  } else if (!bodyText) {
    melde('c) DOM-Zugriff', 'Seiteninhalt wurde geleert')
  } else if (/document:\s*(None|undefined)/.test(aus) || /Error|error/.test(aus)) {
    ok('c) import js erreicht das DOM nicht')
  } else {
    melde('c) DOM-Zugriff', `js.document war erreichbar: ${JSON.stringify(aus)}`)
  }
}

// --- d) localStorage der Seite bleibt unberührt -----------------------------
{
  await page.evaluate(() => localStorage.setItem('st-probe', 'fortschritt'))

  await fuehreAus(0, 'import js\njs.localStorage.clear()\nprint("geleert")')

  const wert = await page.evaluate(() => localStorage.getItem('st-probe'))
  if (wert === 'fortschritt') ok('d) localStorage unerreichbar')
  else melde('d) localStorage', `Eintrag wurde gelöscht/verändert: ${wert}`)
}

// --- e) Endlosschleife wird abgebrochen -------------------------------------
{
  const start = Date.now()
  const aus = await fuehreAus(0, 'while True:\n    pass', { wartenMs: 90000 })
  const dauer = Date.now() - start

  if (!/Abgebrochen/.test(aus)) {
    melde('e) Endlosschleife', `keine Abbruchmeldung, Ausgabe: ${JSON.stringify(aus)}`)
  } else if (dauer > 60000) {
    melde('e) Endlosschleife', `Abbruch dauerte ${dauer} ms – Zeitlimit greift nicht`)
  } else {
    ok(`e) Endlosschleife abgebrochen (${dauer} ms)`)
  }

  // Seite noch bedienbar? Und läuft danach wieder ein Snippet?
  const danach = await fuehreAus(0, 'print("weiter geht es")')
  if (danach.includes('weiter geht es')) ok('e) Snippet läuft nach dem Abbruch wieder')
  else melde('e) nach Abbruch', `erwartet "weiter geht es", bekommen: ${JSON.stringify(danach)}`)
}

// --- f) Druckbombe wird abgeschnitten ---------------------------------------
{
  const aus = await fuehreAus(0, 'while True:\n    print("x" * 80)', { wartenMs: 90000 })
  const knoten = await page
    .locator(RUNNER)
    .nth(0)
    .locator('.py-runner__output span')
    .count()

  if (!/abgeschnitten/i.test(aus)) {
    melde('f) Druckbombe', `keine Abschneide-Meldung, Ausgabe endet mit: ${JSON.stringify(aus.slice(-200))}`)
  } else if (knoten > 600) {
    melde('f) Druckbombe', `${knoten} DOM-Knoten in der Ausgabe – Deckel greift nicht`)
  } else {
    ok(`f) Druckbombe abgeschnitten (${knoten} DOM-Knoten)`)
  }
}

// ---------------------------------------------------------------------------
// g/h/i) Den Worker direkt ansprechen – schneller und genauer als durch den
// Editor, und es prueft genau die Datei, die ausgeliefert wird.
// ---------------------------------------------------------------------------
const WORKER_FAELLE = [
  // g) Standardbibliothek: der wichtigste Regressionsschutz. Beim Haerten wird
  // fetch eingeschnuert – bricht dabei das Nachladen aus python_stdlib.zip,
  // faellt es hier auf.
  {
    name: 'g) Standardbibliothek',
    code: 'import random, time, math, json, re, datetime, collections, itertools,'
      + ' string, decimal, fractions, statistics, functools, copy, textwrap,'
      + ' zipfile, hashlib, secrets\n'
      + 'print("stdlib:", random.randint(1, 6) in range(1, 7), round(time.time()) > 0)',
    pruefe: (t) => (t.includes('stdlib: True True') ? null : `Ausgabe: ${JSON.stringify(t)}`),
  },
  // h) Inventar: nichts Gefaehrliches darf aus Python erreichbar sein.
  // js.fetch bleibt absichtlich da (auf /pyodide/ eingeschnuert, s. u.),
  // js.crypto ebenfalls (random/secrets/hashlib brauchen es).
  {
    name: 'h) JS-Globals unerreichbar',
    code: 'import js\n'
      + 'for z in ["js.document","js.window","js.localStorage","js.sessionStorage",'
      + '"js.parent","js.XMLHttpRequest","js.WebSocket","js.EventSource",'
      + '"js.importScripts","js.indexedDB","js.caches","js.BroadcastChannel",'
      + '"js.Worker","js.postMessage","js.close","js.loadPyodide",'
      + '"js._createPyodideModule","js.Notification","js.navigator.storage"]:\n'
      + '    try:\n'
      + '        print(z, "ERREICHBAR" if eval(z) is not None else "dicht")\n'
      + '    except Exception:\n'
      + '        print(z, "dicht")',
    pruefe: (t) => {
      const offen = t.split('\n').filter((z) => z.includes('ERREICHBAR'))
      return offen.length ? `erreichbar: ${offen.join(', ')}` : null
    },
  },
  // h2) Netzwerk nach draussen muss abgelehnt werden.
  {
    name: 'h) Netzwerkzugriff gesperrt',
    code: 'import js\n'
      + 'try:\n'
      + '    js.fetch("https://example.com/")\n'
      + '    print("ACHTUNG: fetch angenommen")\n'
      + 'except Exception as e:\n'
      + '    print("abgelehnt")',
    // Der Fehler kommt als abgelehntes Promise, also auch im Fehlertext.
    pruefe: (t, fehler) =>
      /gesperrt|abgelehnt/.test(t + fehler) ? null : `Ausgabe: ${JSON.stringify(t + fehler)}`,
  },
  // i) Interpreter-Aufraeumen: Lauf 1 ueberschreibt print, Lauf 2 muss wieder
  // ausgeben. Ohne das Zuruecksetzen wuerde eine Box alle anderen der Seite
  // unsichtbar lahmlegen.
  {
    name: 'i) Interpreter wird aufgeraeumt (Lauf 1)',
    code: 'import builtins, sys\nbuiltins.print = lambda *a, **k: None\n'
      + 'sys.stderr.write("print ueberschrieben\\n")',
    pruefe: (t) => (t.includes('ueberschrieben') ? null : `Ausgabe: ${JSON.stringify(t)}`),
  },
  {
    name: 'i) Interpreter wird aufgeraeumt (Lauf 2)',
    code: 'print("wieder da")',
    pruefe: (t) => (t.includes('wieder da') ? null : `print blieb kaputt: ${JSON.stringify(t)}`),
  },
]

const workerErgebnisse = await page.evaluate(async (faelle) => {
  const w = new Worker('/pyworker.js')
  const msgs = []
  w.addEventListener('message', (e) => msgs.push(e.data))
  w.addEventListener('error', (e) => msgs.push({ type: 'workerFehler', message: e.message }))
  const raus = []
  let id = 0
  for (const fall of faelle) {
    id++
    const ab = msgs.length
    w.postMessage({ type: 'run', id, code: fall.code, stdin: [], base: '/' })
    let fertig = null
    for (let i = 0; i < 400; i++) {
      await new Promise((r) => setTimeout(r, 200))
      fertig = msgs
        .slice(ab)
        .find((m) => m.type === 'done' || m.type === 'error' || m.type === 'workerFehler')
      if (fertig) break
    }
    raus.push({
      status: fertig ? fertig.type : 'keineAntwort',
      fehler: (fertig && fertig.message) || '',
      text: msgs
        .slice(ab)
        .filter((m) => m.type === 'out' || m.type === 'err')
        .map((m) => m.text)
        .join(''),
    })
  }
  w.terminate()
  return raus
}, WORKER_FAELLE.map(({ name, code }) => ({ name, code })))

WORKER_FAELLE.forEach((fall, i) => {
  const r = workerErgebnisse[i]
  if (r.status === 'keineAntwort' || r.status === 'workerFehler') {
    melde(fall.name, `Worker antwortete nicht (${r.status}) ${r.fehler}`)
    return
  }
  const problem = fall.pruefe(r.text, r.fehler)
  if (problem) melde(fall.name, problem)
  else ok(fall.name)
})

await browser.close()
aufraeumen()

// ---------------------------------------------------------------------------
if (fehler.length) {
  console.error(`\n${fehler.length} Problem(e):`)
  for (const f of fehler) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log('\nAlles in Ordnung: Der Runner läuft und bleibt eingesperrt.')
