// Fernsteuerung für den Python-Worker (docs/public/pyworker.js).
//
// Pyodide läuft bewusst NICHT im Haupt-Thread: ein Web Worker hat kein
// `document`, kein `window` und kein `localStorage`, also kann Schülercode die
// Seite nicht anfassen. Und nur deshalb lassen sich eine Endlosschleife und
// ein hängendes Programm überhaupt abbrechen – per worker.terminate().
//
// Ein Worker pro Seite, plus eine Warteschlange, damit die stdout-Handler
// verschiedener <PyRunner>-Blöcke sich nicht überlagern.
//
// SSR-sicher: hier wird beim Import nichts angefasst; der Worker entsteht erst
// beim ersten „Ausführen“.

import { ref } from 'vue'

export const pyodideStatus = ref('idle') // 'idle' | 'loading' | 'ready' | 'error'
export const pyodideBusy = ref(false)    // true, solange IRGENDEIN Runner läuft

export const ABGESCHNITTEN =
  '\n[Ausgabe abgeschnitten – das Programm hat zu viel ausgegeben.]\n'

// Dateien in docs/public/ bekommen von Vite KEINEN Inhalts-Hash, und GitHub
// Pages liefert sie mit max-age aus. Nach jeder Änderung an
// docs/public/pyworker.js diese Zahl hochzählen, sonst bekommen Schüler bis zu
// zehn Minuten lang die alte Fassung aus dem Browser-Cache.
const PYWORKER_VERSION = '3'

let worker = null
let naechsteId = 1
let aktiverLauf = null // { id, onOutput, resolve, timer }

function basisUrl() {
  return import.meta.env.BASE_URL || '/'
}

function getWorker() {
  if (worker) return worker
  worker = new Worker(`${basisUrl()}pyworker.js?v=${PYWORKER_VERSION}`)
  worker.addEventListener('message', onMessage)
  worker.addEventListener('error', onError)
  return worker
}

// Worker wegwerfen. Der nächste Lauf startet einen frischen – das kostet den
// Pyodide-Boot (ein paar Sekunden), räumt aber auch einen vergifteten
// Interpreter auf (z. B. nach `import builtins; builtins.print = ...`).
function workerWegwerfen() {
  if (worker) {
    worker.removeEventListener('message', onMessage)
    worker.removeEventListener('error', onError)
    worker.terminate()
    worker = null
  }
  pyodideStatus.value = 'idle'
}

function beenden(lauf, ergebnis) {
  clearTimeout(lauf.timer)
  if (aktiverLauf === lauf) aktiverLauf = null
  lauf.resolve(ergebnis)
}

// Laufenden Lauf hart abbrechen. Geht nur, weil Python im Worker sitzt.
function abbrechen(grund) {
  const lauf = aktiverLauf
  workerWegwerfen()
  if (lauf) beenden(lauf, { status: grund })
}

function onMessage(ereignis) {
  const nachricht = ereignis.data || {}

  if (nachricht.type === 'ready') {
    pyodideStatus.value = 'ready'
    return
  }

  const lauf = aktiverLauf
  // Nachzügler eines abgebrochenen Laufs verwerfen
  if (!lauf || nachricht.id !== lauf.id) return

  switch (nachricht.type) {
    case 'out':
    case 'err':
      lauf.onOutput(nachricht.text, nachricht.type)
      break
    case 'truncated':
      lauf.onOutput(ABGESCHNITTEN, 'err')
      break
    case 'done':
      beenden(lauf, { status: 'ok' })
      break
    case 'error':
      beenden(lauf, { status: 'error', message: nachricht.message })
      break
  }
}

function onError(ereignis) {
  const lauf = aktiverLauf
  workerWegwerfen()
  pyodideStatus.value = 'error'
  if (lauf) {
    beenden(lauf, {
      status: 'load-error',
      message: ereignis?.message || 'Der Python-Worker konnte nicht geladen werden.',
    })
  }
}

/**
 * Führt Code im Worker aus. Lehnt nie ab, sondern liefert immer
 * { status: 'ok' | 'error' | 'timeout' | 'stopped' | 'load-error', message? },
 * damit die Komponente nur einen Pfad behandeln muss.
 */
export function runInWorker({ code, stdin = [], onOutput, timeoutMs = 10000 }) {
  if (typeof Worker === 'undefined') {
    // Absichtlich KEIN Rückfall auf den Haupt-Thread: das war genau die Lücke,
    // die hier geschlossen wird.
    pyodideStatus.value = 'error'
    return Promise.resolve({
      status: 'load-error',
      message: 'Dieser Browser unterstützt keine Web Worker – bitte einen aktuellen Browser nutzen.',
    })
  }

  return new Promise((resolve) => {
    let w
    try {
      w = getWorker()
    } catch (err) {
      pyodideStatus.value = 'error'
      resolve({ status: 'load-error', message: String(err?.message || err) })
      return
    }

    if (pyodideStatus.value !== 'ready') pyodideStatus.value = 'loading'

    const id = naechsteId++
    aktiverLauf = {
      id,
      onOutput,
      resolve,
      timer: setTimeout(() => abbrechen('timeout'), timeoutMs),
    }

    w.postMessage({ type: 'run', id, code, stdin, base: basisUrl() })
  })
}

/** Stopp-Knopf: bricht den laufenden Lauf ab. */
export function stopRun() {
  if (aktiverLauf) abbrechen('stopped')
}

/** „Python neu starten“: frischer Interpreter, auch ohne laufendes Programm. */
export function restartWorker() {
  if (aktiverLauf) abbrechen('stopped')
  else workerWegwerfen()
}

// Läufe aller Runner einer Seite serialisieren – wir haben nur einen Worker.
let queue = Promise.resolve()
export function runExclusive(task) {
  const result = queue.then(task)
  queue = result.catch(() => {})
  return result
}
