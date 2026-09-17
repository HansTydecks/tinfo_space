// Aufgaben je Level von leicht nach schwer.
import { rnd, pick, out, lines } from '../engine.js'

const reihe = (von, bis, schritt = 1) => {
  const r = []
  if (schritt > 0) for (let i = von; i < bis; i += schritt) r.push(i)
  else for (let i = von; i > bis; i += schritt) r.push(i)
  return r
}
const zeile = (zahlen) => zahlen.join(' ')

export default [
  // 1 · Hochzählen
  [
    // Einstieg: von 0 bis zur Grenze zählen
    () => {
      const n = rnd(2, 5)
      return {
        code: lines('i = 0', `while i < ${n}:`, '    i = i + 1', 'print(i)'),
        answer: out(n),
        distractors: [n - 1, n + 1, 0, 1],
      }
    },
    () => {
      const s = rnd(0, 3), e = s + rnd(2, 6)
      const kleinerGleich = Math.random() < 0.4
      const ende = kleinerGleich ? e + 1 : e
      return {
        code: lines(`i = ${s}`, `while i ${kleinerGleich ? '<=' : '<'} ${e}:`, '    i = i + 1', 'print(i)'),
        answer: out(ende),
        distractors: [ende - 1, ende + 1, s, e - s],
      }
    },
    () => {
      const n = rnd(2, 5)
      const kleinerGleich = Math.random() < 0.6
      const zahlen = reihe(1, kleinerGleich ? n + 1 : n)
      return {
        code: lines('i = 1', `while i ${kleinerGleich ? '<=' : '<'} ${n}:`, '    print(i, end=" ")', '    i = i + 1'),
        answer: zeile(zahlen),
        distractors: [zeile(reihe(1, n)), zeile(reihe(1, n + 1)), zeile(reihe(0, n)), zeile(reihe(2, n + 2)), zeile(reihe(1, n + 2))],
      }
    },
    () => {
      const s = rnd(0, 4), e = s + rnd(2, 6)
      return {
        code: lines('zaehler = 0', `i = ${s}`, `while i < ${e}:`, '    zaehler += 1', '    i += 1', 'print(zaehler)'),
        answer: out(e - s),
        distractors: [e, e - s + 1, e - s - 1, s],
      }
    },
  ],

  // 2 · Schrittweiten
  [
    // Einstieg: rückwärts in Einerschritten
    () => {
      const start = rnd(3, 6)
      return {
        code: lines(`countdown = ${start}`, 'while countdown > 0:', '    print(countdown, end=" ")', '    countdown -= 1'),
        answer: zeile(reihe(start, 0, -1)),
        distractors: [zeile(reihe(start, -1, -1)), zeile(reihe(1, start + 1)), zeile(reihe(start - 1, 0, -1)), String(start)],
      }
    },
    () => {
      const schritt = pick([2, 3])
      const start = pick(schritt === 2 ? [6, 8, 10, 9, 7] : [9, 10, 12, 8])
      const zahlen = reihe(start, 0, -schritt)
      return {
        code: lines(`countdown = ${start}`, 'while countdown > 0:', '    print(countdown, end=" ")', `    countdown -= ${schritt}`),
        answer: zeile(zahlen),
        distractors: [
          zeile([...zahlen, zahlen.at(-1) - schritt]),
          zeile(zahlen.slice(1)),
          zeile(reihe(start, 0, -1)),
          zeile([...zahlen].reverse()),
          zeile(zahlen.map((z) => z - schritt).filter((z) => z >= 0)),
        ],
      }
    },
    () => {
      const s = pick([2, 3, 4]), start = rnd(5, 12)
      const runden = Math.ceil(start / s)
      return {
        code: lines('runden = 0', `x = ${start}`, 'while x > 0:', `    x -= ${s}`, '    runden += 1', 'print(runden)'),
        answer: out(runden),
        distractors: [Math.floor(start / s), runden + 1, start, start - s],
      }
    },
    () => {
      const s = pick([2, 3, 4, 5]), n = rnd(5, 14)
      const ende = Math.ceil(n / s) * s
      return {
        code: lines('i = 0', `while i < ${n}:`, `    i += ${s}`, 'print(i)'),
        answer: out(ende),
        distractors: [n, ende - s, n - 1, ende + s],
      }
    },
    () => {
      const n = rnd(5, 40)
      let x = 1
      while (x < n) x *= 2
      return {
        code: lines('x = 1', `while x < ${n}:`, '    x = x * 2', 'print(x)'),
        answer: out(x),
        distractors: [x / 2, n, x * 2, n * 2],
      }
    },
  ],

  // 3 · Summen
  [
    // Einstieg: 1 + 2 + … mit wenigen Zahlen
    () => {
      const n = rnd(2, 4)
      return {
        code: lines('summe = 0', 'i = 1', `while i <= ${n}:`, '    summe += i', '    i += 1', 'print(summe)'),
        answer: out((n * (n + 1)) / 2),
        distractors: [(n * (n - 1)) / 2, n, n * n, ((n + 1) * (n + 2)) / 2],
      }
    },
    () => {
      const n = rnd(5, 8)
      return {
        code: lines('summe = 0', 'i = 1', `while i <= ${n}:`, '    summe += i', '    i += 1', 'print(summe)'),
        answer: out((n * (n + 1)) / 2),
        distractors: [(n * (n - 1)) / 2, ((n + 1) * (n + 2)) / 2, n, n * n],
      }
    },
    () => {
      const n = rnd(2, 5)
      return {
        code: lines('p = 1', 'i = 0', `while i < ${n}:`, '    p *= 2', '    i += 1', 'print(p)'),
        answer: out(2 ** n),
        distractors: [2 * n, 2 ** (n - 1), 2 ** (n + 1), n],
      }
    },
    () => {
      const n = rnd(4, 8)
      const summe = reihe(0, n + 1, 2).reduce((a, b) => a + b, 0)
      return {
        code: lines('summe = 0', 'i = 0', `while i <= ${n}:`, '    summe += i', '    i += 2', 'print(summe)'),
        answer: out(summe),
        distractors: [(n * (n + 1)) / 2, reihe(0, n, 2).reduce((a, b) => a + b, 0), reihe(1, n + 1, 2).reduce((a, b) => a + b, 0), summe + 2],
      }
    },
    () => {
      const g = rnd(5, 15)
      let summe = 0, i = 1
      while (summe < g) { summe += i; i += 1 }
      return {
        code: lines('summe = 0', 'i = 1', `while summe < ${g}:`, '    summe += i', '    i += 1', 'print(summe)'),
        answer: out(summe),
        distractors: [g, summe - (i - 1), summe + i, i],
      }
    },
  ],
]
