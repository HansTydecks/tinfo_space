// Winziger Python-Highlighter für die Code-Karten (eine Zeile = ein Token-Durchlauf).
// Die Farben kommen aus CSS-Klassen in SilentTeacher.vue.

const KEYWORDS = new Set([
  'and', 'as', 'break', 'continue', 'def', 'del', 'elif', 'else', 'except', 'False', 'finally',
  'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'None', 'not', 'or', 'pass',
  'raise', 'return', 'True', 'try', 'while',
])

const BUILTINS = new Set([
  'abs', 'bool', 'dict', 'float', 'input', 'int', 'len', 'list', 'max', 'min', 'print', 'range',
  'reversed', 'round', 'sorted', 'str', 'sum', 'tuple', 'type',
])

const TOKEN = /(#.*$)|([fF]?"(?:[^"\\]|\\.)*"|[fF]?'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)/g

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function span(cls, text) {
  return `<span class="st-tok-${cls}">${esc(text)}</span>`
}

function highlightLine(line) {
  let html = ''
  let last = 0
  let prevWord = ''
  for (const m of line.matchAll(TOKEN)) {
    html += esc(line.slice(last, m.index))
    const [text, comment, string, number, word] = m
    if (comment) html += span('comment', text)
    else if (string) html += span('string', text)
    else if (number) html += span('number', text)
    else if (word) {
      if (prevWord === 'def') html += span('fn', text)
      else if (KEYWORDS.has(word)) html += span('kw', text)
      else if (BUILTINS.has(word)) html += span('builtin', text)
      else html += esc(text)
      prevWord = word
    }
    last = m.index + text.length
  }
  return html + esc(line.slice(last))
}

export function highlightPython(code) {
  return code.split('\n').map(highlightLine).join('\n')
}
