<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
import {
  loadPyodideOnce,
  pyodideStatus,
  pyodideBusy,
  runExclusive,
} from '../composables/usePyodide.js'

const props = defineProps({
  // false -> code is runnable but not editable
  editable: { type: Boolean, default: true },
  // preset lines for input(), one per line
  stdin: { type: String, default: '' },
  // optional label shown on the right of the toolbar
  title: { type: String, default: '' },
})

const { isDark } = useData()

const slotHost = ref(null)   // wraps the SSR'd highlighted ```python block (fallback)
const editorHost = ref(null) // CodeMirror mounts here
const code = ref('')         // single source of truth for run/reset
const output = ref([])       // [{ text, stream: 'out' | 'err' }]
const hasRun = ref(false)
const running = ref(false)
// allow the literal sequence "\n" in the markdown prop to mean a line break
const stdinText = ref((props.stdin || '').replace(/\\n/g, '\n'))
const useTextarea = ref(false) // set if CodeMirror fails to load

let view = null
let originalCode = ''
let themeCompartment = null
let oneDarkExt = null

const needsStdin = computed(() => /(^|[^.\w])input\s*\(/.test(code.value))

const statusText = computed(() => {
  if (pyodideStatus.value === 'loading') return 'Python wird geladen …'
  if (running.value) return 'läuft …'
  if (pyodideStatus.value === 'error') return 'Python konnte nicht geladen werden'
  return ''
})

const runDisabled = computed(
  () => running.value || pyodideBusy.value || pyodideStatus.value === 'loading',
)

function extractCode(host) {
  if (!host) return ''
  const el = host.querySelector('pre code') || host.querySelector('code')
  return (el ? el.textContent : '').replace(/\n$/, '')
}

// Pyodide tracebacks carry its own internal frames (_pyodide/_base.py, CodeRunner…).
// Students should only see their own code, so drop those frames and label the rest
// with plain line numbers.
function cleanTraceback(message) {
  const raw = String(message ?? '')
  if (!raw.includes('Traceback (most recent call last)')) return raw.trim()

  const lines = raw.split('\n')
  const kept = []
  for (let i = 0; i < lines.length; i++) {
    const frame = lines[i].match(/^\s*File "([^"]*)", line (\d+)/)
    if (frame) {
      const file = frame[1]
      if (file.includes('_pyodide') || file.includes('.zip') || file.includes('site-packages')) {
        // also swallow this frame's source line and caret line
        while (i + 1 < lines.length && /^\s{4,}\S/.test(lines[i + 1])) i++
        continue
      }
      kept.push(`  Zeile ${frame[2]}`)
      continue
    }
    kept.push(lines[i])
  }
  return kept.join('\n').replace(/\n{2,}/g, '\n').trim()
}

function pushOutput(text, stream) {
  // batched() strips the trailing newline — put it back so lines don't run together
  output.value.push({ text: text.endsWith('\n') ? text : text + '\n', stream })
}

onMounted(async () => {
  originalCode = extractCode(slotHost.value)
  code.value = originalCode

  try {
    const [
      viewMod,
      cmdMod,
      stateMod,
      pyMod,
      oneDarkMod,
      langMod,
    ] = await Promise.all([
      import('@codemirror/view'),
      import('@codemirror/commands'),
      import('@codemirror/state'),
      import('@codemirror/lang-python'),
      import('@codemirror/theme-one-dark'),
      import('@codemirror/language'),
    ])

    const {
      EditorView, keymap, lineNumbers, highlightActiveLine,
      highlightActiveLineGutter, drawSelection,
    } = viewMod
    const { defaultKeymap, history, historyKeymap, indentWithTab } = cmdMod
    const { EditorState, Compartment } = stateMod
    const { python } = pyMod
    const { oneDark } = oneDarkMod
    const {
      syntaxHighlighting, defaultHighlightStyle, bracketMatching, indentUnit,
    } = langMod

    themeCompartment = new Compartment()
    oneDarkExt = oneDark

    const chrome = EditorView.theme({
      '&': {
        backgroundColor: 'var(--vp-c-bg-alt)',
        border: '1px solid var(--vp-c-divider)',
        borderRadius: '0',
        fontSize: 'var(--vp-code-font-size, 0.875em)',
      },
      '.cm-content': {
        fontFamily: 'var(--vp-font-family-mono)',
        padding: '10px 0',
      },
      '.cm-gutters': {
        backgroundColor: 'var(--vp-c-bg-soft)',
        color: 'var(--vp-c-text-3)',
        border: 'none',
      },
      '&.cm-focused': { outline: '2px solid var(--vp-c-brand-1)', outlineOffset: '-2px' },
      '.cm-scroller': { overflow: 'auto', maxHeight: '460px' },
    })

    view = new EditorView({
      parent: editorHost.value,
      doc: originalCode,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        history(),
        drawSelection(),
        bracketMatching(),
        indentUnit.of('    '),
        keymap.of([
          indentWithTab,
          { key: 'Mod-Enter', run: () => { run(); return true } },
          ...defaultKeymap,
          ...historyKeymap,
        ]),
        python(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        chrome,
        EditorView.editable.of(props.editable),
        EditorState.readOnly.of(!props.editable),
        EditorView.updateListener.of((u) => {
          if (u.docChanged) code.value = u.state.doc.toString()
        }),
        themeCompartment.of(isDark.value ? oneDark : []),
      ],
    })

    if (slotHost.value) slotHost.value.style.display = 'none'
  } catch (err) {
    // CodeMirror unavailable -> plain textarea, still fully runnable
    console.warn('[PyRunner] editor fell back to textarea:', err)
    useTextarea.value = true
    await nextTick()
    if (slotHost.value) slotHost.value.style.display = 'none'
  }
})

watch(isDark, (dark) => {
  if (view && themeCompartment) {
    view.dispatch({ effects: themeCompartment.reconfigure(dark ? oneDarkExt : []) })
  }
})

onBeforeUnmount(() => {
  if (view) view.destroy()
})

function onTextareaKeydown(e) {
  if (e.key === 'Tab') {
    e.preventDefault()
    const el = e.target
    const s = el.selectionStart
    const eend = el.selectionEnd
    code.value = code.value.slice(0, s) + '    ' + code.value.slice(eend)
    nextTick(() => { el.selectionStart = el.selectionEnd = s + 4 })
  } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    run()
  }
}

function reset() {
  if (view) {
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: originalCode } })
  } else {
    code.value = originalCode
  }
  output.value = []
  hasRun.value = false
}

async function run() {
  if (runDisabled.value) return
  output.value = []
  hasRun.value = true
  running.value = true
  pyodideBusy.value = true
  try {
    const py = await loadPyodideOnce()
    await runExclusive(async () => {
      py.setStdout({ batched: (s) => pushOutput(s, 'out') })
      py.setStderr({ batched: (s) => pushOutput(s, 'err') })

      const lines = stdinText.value.length ? stdinText.value.split('\n') : []
      let i = 0
      py.setStdin({ stdin: () => (i < lines.length ? lines[i++] : null) })

      let ns
      try {
        ns = py.toPy({ __name__: '__main__' })
        await py.runPythonAsync(code.value, { globals: ns })
      } catch (err) {
        pushOutput(cleanTraceback(err?.message || err), 'err')
      } finally {
        if (ns && ns.destroy) ns.destroy()
        py.setStdin({ stdin: () => null })
      }
    })
  } catch (err) {
    pushOutput('Python konnte nicht geladen werden: ' + (err?.message || err), 'err')
  } finally {
    running.value = false
    pyodideBusy.value = false
  }
}
</script>

<template>
  <div class="py-runner">
    <div ref="slotHost" class="py-runner__source"><slot /></div>

    <ClientOnly>
      <div class="py-runner__bar">
        <button
          class="py-runner__btn py-runner__btn--run"
          :disabled="runDisabled"
          @click="run"
        >▶&nbsp;Ausführen</button>
        <button class="py-runner__btn" :disabled="running" @click="reset">↺&nbsp;Zurücksetzen</button>
        <span v-if="statusText" class="py-runner__status">{{ statusText }}</span>
        <span v-if="title" class="py-runner__title">{{ title }}</span>
      </div>

      <textarea
        v-if="useTextarea"
        v-model="code"
        class="py-runner__textarea"
        :readonly="!editable"
        spellcheck="false"
        autocapitalize="off"
        autocomplete="off"
        rows="8"
        @keydown="onTextareaKeydown"
      ></textarea>
      <div v-else ref="editorHost" class="py-runner__editor"></div>

      <div v-if="needsStdin" class="py-runner__stdin">
        <label>Eingaben für <code>input()</code> — eine pro Zeile:</label>
        <textarea v-model="stdinText" rows="2" spellcheck="false" autocomplete="off"></textarea>
      </div>

      <pre v-if="hasRun" class="py-runner__output"><span
        v-for="(seg, idx) in output"
        :key="idx"
        :class="seg.stream === 'err' ? 'py-runner__err' : 'py-runner__out'"
      >{{ seg.text }}</span><span
        v-if="!output.length && !running"
        class="py-runner__muted"
      >(keine Ausgabe)</span></pre>
    </ClientOnly>
  </div>
</template>

<style scoped>
.py-runner {
  margin: 18px 0;
}

.py-runner__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}

.py-runner__btn {
  font: inherit;
  line-height: 1.4;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color 0.2s, color 0.2s, opacity 0.2s;
}
.py-runner__btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.py-runner__btn:disabled {
  opacity: 0.5;
  cursor: default;
}
.py-runner__btn--run {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
.py-runner__btn--run:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  color: #fff;
}

.py-runner__status {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}
.py-runner__title {
  margin-left: auto;
  font-size: 0.85em;
  color: var(--vp-c-text-3);
}

.py-runner__editor :deep(.cm-editor) {
  border-radius: 0;
}

.py-runner__textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: var(--vp-code-font-size, 0.875em);
  line-height: 1.6;
  tab-size: 4;
  resize: vertical;
}

.py-runner__stdin {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-top: none;
  font-size: 0.85em;
}
.py-runner__stdin textarea {
  font-family: var(--vp-font-family-mono);
  font-size: 0.95em;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  resize: vertical;
}

.py-runner__output {
  margin: 0;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-top: none;
  border-radius: 0 0 8px 8px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: var(--vp-code-font-size, 0.875em);
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 320px;
  overflow: auto;
}
.py-runner__out {
  color: var(--vp-c-text-1);
}
.py-runner__err {
  color: var(--vp-c-danger-1);
}
.py-runner__muted {
  color: var(--vp-c-text-3);
}

/* Hide VitePress' copy button / language tag inside the pre-hydration fallback block. */
.py-runner__source :deep(.copy),
.py-runner__source :deep(.lang) {
  display: none;
}
</style>
