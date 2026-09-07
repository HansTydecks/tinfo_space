// One shared Pyodide instance per page, plus a run queue so the stdout/stdin/stderr
// handlers of different <PyRunner> blocks never overlap.
//
// SSR-safe: nothing here touches the DOM at import time; Pyodide itself is only
// pulled in via a runtime import() of a /public URL when the first "Run" happens.

import { ref } from 'vue'

let pyodidePromise = null

export const pyodideStatus = ref('idle') // 'idle' | 'loading' | 'ready' | 'error'
export const pyodideBusy = ref(false)    // true while ANY runner is executing

// Pyodide lives in /public, so Vite will not let us import() it as a module
// ("can only be referenced via HTML tags"). We inject the UMD build with a
// <script> tag instead; it sets globalThis.loadPyodide.
function loadPyodideScript(src) {
  return new Promise((resolve, reject) => {
    if (typeof globalThis.loadPyodide === 'function') return resolve()

    let script = document.querySelector('script[data-pyodide-loader]')
    if (!script) {
      script = document.createElement('script')
      script.src = src
      script.async = true
      script.setAttribute('data-pyodide-loader', '')
      document.head.appendChild(script)
    }
    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener(
      'error',
      () => reject(new Error(`Konnte ${src} nicht laden.`)),
      { once: true },
    )
  })
}

export function loadPyodideOnce() {
  if (!pyodidePromise) {
    pyodideStatus.value = 'loading'
    const base = import.meta.env.BASE_URL || '/'
    pyodidePromise = loadPyodideScript(`${base}pyodide/pyodide.js`)
      .then(() => globalThis.loadPyodide({ indexURL: `${base}pyodide/` }))
      .then((py) => {
        pyodideStatus.value = 'ready'
        return py
      })
      .catch((err) => {
        pyodideStatus.value = 'error'
        pyodidePromise = null // allow a retry
        throw err
      })
  }
  return pyodidePromise
}

// Serialise executions across all runners on the page.
let queue = Promise.resolve()
export function runExclusive(task) {
  const result = queue.then(task)
  queue = result.catch(() => {})
  return result
}
