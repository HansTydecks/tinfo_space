// Pyodide läuft hier – in einem Web Worker, NICHT im Haupt-Thread der Seite.
//
// Warum: Ein Worker hat kein `document`, kein `window` und kein `localStorage`.
// Python erreicht JavaScript nur über das `js`-Proxy, und das spiegelt genau
// diesen Worker-Scope. Ist hier nichts Gefährliches, kann Schülercode die
// Website also weder verändern noch auslesen – egal was er importiert.
// Zweiter Gewinn: Der Haupt-Thread kann uns per terminate() abschießen, womit
// ein Zeitlimit und ein Stopp-Knopf überhaupt erst möglich werden.
//
// Alles steckt in einer IIFE, damit die Variablen hier (insbesondere `post`)
// nicht im globalen Lexical Scope landen – sonst käme `js.eval("post")` aus
// Python heran und könnte dem Haupt-Thread gefälschte Nachrichten schicken.
//
// Geladen wird diese Datei als KLASSISCHER Worker (kein type:'module'), weil
// Pyodide als UMD-Bundle per importScripts() hereinkommt. Sie liegt in
// docs/public/, damit Vite sie unverarbeitet nach /pyworker.js kopiert – aus
// demselben Grund wie der Pyodide-Runtime selbst (scripts/vendor-pyodide.mjs).

;(function () {
  'use strict'

  // Referenzen sichern, SOLANGE die Globals noch existieren – harden() nimmt
  // sie anschließend weg. Nur über diese Closure reden wir noch mit der Seite.
  const post = self.postMessage.bind(self)

  // Timer ebenfalls festhalten: unser Ausgabe-Puffer haengt daran, und
  // `js.self.setTimeout = ...` aus Python soll ihn nicht aushebeln koennen.
  const setT = self.setTimeout.bind(self)
  const clearT = self.clearTimeout.bind(self)

  // ---------------------------------------------------------------------------
  // Grenzen
  // ---------------------------------------------------------------------------
  const FLUSH_MS = 50       // Ausgabe gebündelt verschicken, nicht pro print()
  const MAX_ZEICHEN = 200000
  const MAX_ZEILEN = 5000

  let pyodide = null
  let reset = null
  let laufId = null
  let pyodideBasis = ''     // absolute URL von /pyodide/ – die einzige erlaubte Netzadresse

  // ---------------------------------------------------------------------------
  // Ausgabe puffern und deckeln
  // ---------------------------------------------------------------------------
  let puffer = []
  let timer = null
  let zeichen = 0
  let zeilen = 0
  let abgeschnitten = false

  function flush() {
    if (timer) { clearT(timer); timer = null }
    if (!puffer.length) return
    // Aufeinanderfolgende Stücke desselben Streams zu EINER Nachricht
    // zusammenfassen – sonst entsteht im Haupt-Thread pro print() ein
    // eigener DOM-Knoten.
    const zusammen = []
    for (const stueck of puffer) {
      const letztes = zusammen[zusammen.length - 1]
      if (letztes && letztes.stream === stueck.stream) letztes.text += stueck.text
      else zusammen.push({ stream: stueck.stream, text: stueck.text })
    }
    puffer = []
    for (const stueck of zusammen) {
      post({ type: stueck.stream, id: laufId, text: stueck.text })
    }
  }

  function ausgabe(stream, rohtext) {
    if (abgeschnitten) return // Druckbombe: ab hier kostet jedes print() fast nichts
    // batched() schneidet den Zeilenumbruch ab – zurückgeben, SONST kleben beim
    // Zusammenfassen in flush() die Zeilen aneinander.
    const text = rohtext.endsWith('\n') ? rohtext : rohtext + '\n'
    const neueZeilen = (text.match(/\n/g) || []).length
    if (zeichen + text.length > MAX_ZEICHEN || zeilen + neueZeilen > MAX_ZEILEN) {
      const rest = MAX_ZEICHEN - zeichen
      if (rest > 0) puffer.push({ stream, text: text.slice(0, rest) })
      abgeschnitten = true
      flush()
      post({ type: 'truncated', id: laufId })
      return
    }
    zeichen += text.length
    zeilen += neueZeilen
    puffer.push({ stream, text })
    if (!timer) timer = setT(flush, FLUSH_MS)
  }

  // ---------------------------------------------------------------------------
  // Fluchtwege aus dem Worker zunageln
  // ---------------------------------------------------------------------------
  // Läuft ERST NACH dem Pyodide-Boot: vorher braucht der Boot importScripts
  // und fetch selbst.
  const GESPERRT = [
    'XMLHttpRequest', 'WebSocket', 'EventSource',   // Netz
    'importScripts',                                 // Code nachladen
    'indexedDB', 'caches',                           // Persistenz in unserer Origin
    'BroadcastChannel',                              // echter Kanal zurück zur Seite!
    'Worker', 'SharedWorker',                        // frische, unverhärtete Scopes
    'postMessage', 'close',                          // nur noch über `post` oben
    'Notification',                                  // in Workern teils vorhanden
    'loadPyodide', '_createPyodideModule',           // sonst: zweiter Interpreter = Speicherbombe
  ]

  // NICHT anfassen, sonst bricht der Kurs:
  //   crypto            -> os.urandom -> random, secrets, hashlib
  //   setTimeout/clearTimeout -> Pyodides asyncio-Loop und unser Ausgabe-Puffer
  //   performance, Date -> time.time()
  //   location          -> WorkerLocation hat keine Setter, ist also harmlos
  //   WebAssembly, TextEncoder/Decoder, console -> gebraucht oder harmlos

  function prototypenKette() {
    const kette = []
    for (
      let proto = Object.getPrototypeOf(self);
      proto && proto !== Object.prototype;
      proto = Object.getPrototypeOf(proto)
    ) {
      kette.push(proto)
    }
    return kette
  }

  // Namen überall aus der Kette entfernen, OHNE ihn danach festzunageln –
  // für fetch, das anschließend durch eine eingeschnürte Fassung ersetzt wird.
  function freilegen(name) {
    for (const proto of prototypenKette()) {
      try { delete proto[name] } catch (err) { /* nicht konfigurierbar */ }
    }
    try { delete self[name] } catch (err) { /* s. o. */ }
  }

  function versiegeln(namen) {
    // Diese Globals sind teils eigene Eigenschaften des Worker-Globals, teils
    // Getter an WorkerGlobalScope.prototype. Ein Schatten auf `self` allein
    // genügt NICHT – über
    //   js.Object.getOwnPropertyDescriptor(proto, 'fetch').get.call(js.self)
    // käme Python sonst wieder an das Original. Darum beides: aus der ganzen
    // Prototypenkette löschen und am Global eine unveränderliche Eigenschaft
    // `undefined` anlegen.
    //
    // Bewusst `value: undefined` und kein werfender Getter: Emscripten und
    // Pyodide prüfen Fähigkeiten mit `typeof X !== 'undefined'`, und ein
    // werfender Getter würde genau dort abstürzen.
    for (const name of namen) {
      freilegen(name)
      // In drei Stufen, weil `var`/`function`-Globals (so legt das UMD-Bundle
      // `loadPyodide` an) nicht konfigurierbar, aber enumerable sind: ein
      // Deskriptor mit enumerable:false wird dort abgelehnt, ein reiner
      // value-Wechsel ist erlaubt.
      let fest = false
      for (const deskriptor of [
        { value: undefined, writable: false, configurable: false, enumerable: false },
        { value: undefined, writable: false },
        { value: undefined },
      ]) {
        try {
          Object.defineProperty(self, name, deskriptor)
          fest = true
          break
        } catch (err) { /* nächste Stufe */ }
      }
      if (!fest) {
        try { self[name] = undefined } catch (err) { /* nicht mehr zu machen */ }
      }
    }
  }

  // WorkerNavigator bietet navigator.storage (= OPFS, echter Dateispeicher in
  // unserer Origin) und navigator.locks. Einzelne Eigenschaften lassen sich
  // nicht zuverlässig entfernen, also das Ganze durch einen Stummel ersetzen.
  function navigatorStummel() {
    const n = self.navigator
    const stummel = Object.freeze({
      userAgent: n && n.userAgent,
      language: n && n.language,
      hardwareConcurrency: n && n.hardwareConcurrency,
    })
    try {
      Object.defineProperty(self, 'navigator', {
        value: stummel, writable: false, configurable: false,
      })
    } catch (err) { /* s. o. */ }
  }

  function harden() {
    // fetch wird nicht entfernt, sondern eingeschnürt: Pyodide darf damit
    // weiterhin seine eigenen Dateien unter /pyodide/ nachladen, alles andere
    // ist dicht. (Ganz entfernen wäre riskant, falls der Runtime es braucht.)
    const echtesFetch = self.fetch ? self.fetch.bind(self) : null
    const nurPyodide = function (eingabe, optionen) {
      let ziel
      try {
        const roh = typeof eingabe === 'string'
          ? eingabe
          : (eingabe && eingabe.url) || String(eingabe)
        ziel = new URL(roh, self.location.href).href
      } catch (err) {
        return Promise.reject(new Error('Ungültige Adresse.'))
      }
      if (!pyodideBasis || !ziel.startsWith(pyodideBasis)) {
        return Promise.reject(
          new Error('Netzwerkzugriff ist im Übungs-Python gesperrt: ' + ziel),
        )
      }
      return echtesFetch(eingabe, optionen)
    }

    versiegeln(GESPERRT)

    // Diese beiden brauchen wir UND Pyodides asyncio-Loop – also nicht
    // entfernen, sondern mit dem echten Wert festnageln, damit Schülercode sie
    // nicht ersetzen kann.
    for (const name of ['setTimeout', 'clearTimeout']) {
      const echt = self[name]
      try {
        Object.defineProperty(self, name, {
          value: echt, writable: false, configurable: false,
        })
      } catch (err) { /* nicht konfigurierbar – dann bleibt es wie es ist */ }
    }

    freilegen('fetch') // nur aus der Prototypenkette holen, nicht festnageln
    try {
      Object.defineProperty(self, 'fetch', {
        value: nurPyodide, writable: false, configurable: false, enumerable: false,
      })
    } catch (err) { /* s. o. */ }

    navigatorStummel()
  }

  // ---------------------------------------------------------------------------
  // Zweite Schicht: Module sperren, die hier nichts zu suchen haben
  // ---------------------------------------------------------------------------
  // ACHTUNG, Einordnung: Das ist Bequemlichkeit, keine Sicherheitsgrenze. Auf
  // Python-Ebene ist so eine Sperre umgehbar (object.__subclasses__() & Co.).
  // Sie sorgt vor allem dafür, dass neugierige Schüler eine verständliche
  // Meldung bekommen statt eines kaputten Verhaltens. Die echte Grenze ist der
  // Worker – ein Ausbruch aus dieser Liste findet dort nichts mehr vor.
  const MODUL_SPERRE = `
import sys

# Exakte Namen (Untermodule, deren Elternpaket erlaubt bleiben muss)
_EXAKT = {
    'pyodide.http', 'urllib.request', 'urllib.error',
    'http.client', 'http.server',
}
# Ganze Pakete samt Untermodulen
_WURZEL = {
    'ctypes', 'socket', 'socketserver', 'subprocess',
    'webbrowser', 'multiprocessing', 'asyncio.subprocess',
}

class _Sandkasten:
    """Blockt Module, die im Browser-Übungs-Python nichts zu suchen haben."""

    def find_spec(self, fullname, path=None, target=None):
        wurzel = fullname.split('.')[0]
        if fullname in _EXAKT or fullname in _WURZEL or wurzel in _WURZEL:
            raise ImportError(
                "Das Modul '%s' ist in diesem Übungs-Python gesperrt." % fullname
            )
        return None

if not any(type(f).__name__ == '_Sandkasten' for f in sys.meta_path):
    sys.meta_path.insert(0, _Sandkasten())

# Schon geladene Exemplare entfernen, sonst greift die Sperre nicht
for _name in list(sys.modules):
    _w = _name.split('.')[0]
    if _name in _EXAKT or _w in _WURZEL:
        del sys.modules[_name]
del _name, _w


# --- Interpreter-Zustand sichern -------------------------------------------
# Alle Boxen einer Seite teilen EINEN Interpreter. Ohne das Folgende wuerde
# 'import builtins; builtins.print = ...' in einer Box jede andere Box der
# Seite lahmlegen - und zwar unsichtbar. Darum vor jedem Lauf zuruecksetzen.
import builtins

_BUILTINS = dict(builtins.__dict__)
_MODULE = set(sys.modules)
_META_PATH = list(sys.meta_path)
_PATH = list(sys.path)
_REKURSION = sys.getrecursionlimit()

# Pyodides eigene Module nicht anfassen: der Runtime haelt Verweise darauf,
# ein Neu-Import wuerde zweite Modulobjekte erzeugen.
_GESCHUETZT = ('pyodide', '_pyodide', 'js', 'pyodide_js')


def _ist_geschuetzt(name):
    # Auf Paketgrenzen pruefen, nicht auf den reinen Namensanfang:
    # 'json'.startswith('js') waere sonst True.
    return name in _GESCHUETZT or any(name.startswith(p + '.') for p in _GESCHUETZT)


def _reset():
    """Macht rueckgaengig, was das letzte Programm am Interpreter verstellt hat."""
    # Die Liste VOR dem clear() bauen - zwischen clear() und update() darf kein
    # builtin nachgeschlagen werden.
    neu = [
        n for n in sys.modules
        if n not in _MODULE and not _ist_geschuetzt(n)
    ]
    builtins.__dict__.clear()
    builtins.__dict__.update(_BUILTINS)
    for n in neu:
        sys.modules.pop(n, None)
    sys.meta_path[:] = _META_PATH
    sys.path[:] = _PATH
    sys.setrecursionlimit(_REKURSION)
`

  // ---------------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------------
  async function boot(basis) {
    pyodideBasis = new URL(basis + 'pyodide/', self.location.href).href
    importScripts(pyodideBasis + 'pyodide.js')
    pyodide = await self.loadPyodide({ indexURL: pyodideBasis })

    pyodide.setStdout({ batched: (s) => ausgabe('out', s) })
    pyodide.setStderr({ batched: (s) => ausgabe('err', s) })

    harden()
    pyodide.runPython(MODUL_SPERRE)
    reset = pyodide.globals.get('_reset')

    post({ type: 'ready' })
  }

  // ---------------------------------------------------------------------------
  // Einen Lauf ausführen
  // ---------------------------------------------------------------------------
  async function run(nachricht) {
    laufId = nachricht.id
    puffer = []
    zeichen = 0
    zeilen = 0
    abgeschnitten = false

    // stdin steht vorab fest (die Zeilen aus dem „Eingaben“-Feld), deshalb
    // genügt ein synchroner Callback, der sie der Reihe nach herausgibt.
    // Kein SharedArrayBuffer nötig – das wäre auf GitHub Pages auch nicht
    // möglich, weil dort keine COOP/COEP-Header gesetzt werden können.
    const zeilenEin = Array.isArray(nachricht.stdin) ? nachricht.stdin.slice() : []
    let i = 0
    pyodide.setStdin({ stdin: () => (i < zeilenEin.length ? zeilenEin[i++] : null) })

    // Aufräumen, was der vorige Lauf am gemeinsamen Interpreter verstellt hat.
    if (reset) {
      try { reset() } catch (err) { /* lieber weiterlaufen als den Lauf verlieren */ }
    }

    let ns = null
    try {
      ns = pyodide.toPy({ __name__: '__main__' })
      await pyodide.runPythonAsync(nachricht.code, { globals: ns })
      flush()
      post({ type: 'done', id: laufId })
    } catch (err) {
      flush()
      post({ type: 'error', id: laufId, message: String((err && err.message) || err) })
    } finally {
      if (ns && ns.destroy) ns.destroy()
      pyodide.setStdin({ stdin: () => null })
    }
  }

  // ---------------------------------------------------------------------------
  // Nachrichtenschleife
  // ---------------------------------------------------------------------------
  let kette = Promise.resolve()

  // addEventListener statt `self.onmessage = ...`, damit ein Zuweisen von
  // onmessage (durch Pyodide/Emscripten oder durch Schülercode) uns nicht
  // den Draht zur Seite kappen kann.
  self.addEventListener('message', (ereignis) => {
    const nachricht = ereignis.data || {}
    if (nachricht.type !== 'run') return

    kette = kette.then(async () => {
      try {
        if (!pyodide) await boot(nachricht.base || '/')
        await run(nachricht)
      } catch (err) {
        flush()
        post({
          type: 'error',
          id: nachricht.id,
          message: 'Python konnte nicht geladen werden: ' + String((err && err.message) || err),
        })
      }
    })
  })
})()
