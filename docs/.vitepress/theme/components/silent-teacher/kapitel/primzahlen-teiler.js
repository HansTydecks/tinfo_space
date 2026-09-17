// Aufgaben je Level von leicht nach schwer.
import { rnd, pick, sample, out, lines, zweiBools, float } from '../engine.js'

const teiler = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((t) => n % t === 0)
const istPrim = (n) => n >= 2 && teiler(n).length === 2
const ggt = (a, b) => (b === 0 ? a : ggt(b, a % b))
const zeile = (zahlen) => zahlen.join(' ')

const IST_PRIM = [
  'def ist_prim(n):',
  '    if n < 2:',
  '        return False',
  '    for t in range(2, n):',
  '        if n % t == 0:',
  '            return False',
  '    return True',
  '',
]

const IST_PRIM_SCHNELL = [
  'def ist_prim(n):',
  '    if n < 2:',
  '        return False',
  '    t = 2',
  '    while t * t <= n:',
  '        if n % t == 0:',
  '            return False',
  '        t += 1',
  '    return True',
  '',
]

const GGT_LEICHT = [[12, 8], [9, 6], [10, 4], [16, 12], [18, 12], [20, 15]]
const GGT_PAARE = [...GGT_LEICHT, [24, 16], [30, 18], [36, 24], [14, 21], [27, 18], [25, 10], [35, 14], [17, 5], [48, 18]]

export default [
  // 1 · Teilbarkeit
  [
    // Einstieg: bleibt ein Rest?
    () => {
      const t = rnd(2, 9), n = rnd(4, 30)
      return {
        code: `print(${n} % ${t})`,
        answer: out(n % t),
        distractors: [Math.floor(n / t), t - (n % t), t, (n % t) + 1],
      }
    },
    () => {
      const a = rnd(10, 60), b = rnd(2, 9)
      let c = rnd(2, 9)
      if (c === b) c = b === 9 ? 2 : b + 1
      return {
        code: `zahl = ${a}\nprint(zahl % ${b} == 0, zahl % ${c} == 0)`,
        ...zweiBools(a % b === 0, a % c === 0),
      }
    },
    () => {
      const n = pick([6, 8, 9, 10, 12, 14, 15, 16, 18, 20])
      const t = teiler(n)
      return {
        code: lines(`for t in range(1, ${n + 1}):`, `    if ${n} % t == 0:`, '        print(t, end=" ")'),
        answer: zeile(t),
        distractors: [zeile(t.slice(1, -1)), zeile(t.slice(0, -1)), zeile(t.filter(istPrim)), zeile(t.map((x) => n / x))],
      }
    },
    () => {
      const n = pick([6, 12, 18, 24, 30, 8, 9, 10, 15, 21, 14, 16])
      return {
        code: `n = ${n}\nprint(n % 2 == 0 and n % 3 == 0, n % 2 == 0 or n % 3 == 0)`,
        ...zweiBools(n % 2 === 0 && n % 3 === 0, n % 2 === 0 || n % 3 === 0),
      }
    },
  ],

  // 2 · Teiler zählen
  [
    // Einstieg: kleine Zahl, wenige Teiler
    () => {
      const n = rnd(4, 12)
      const k = teiler(n).length
      return {
        code: lines('anzahl = 0', `for t in range(1, ${n + 1}):`, `    if ${n} % t == 0:`, '        anzahl += 1', 'print(anzahl)'),
        answer: out(k),
        distractors: [k - 2, k + 1, k - 1, n],
      }
    },
    () => {
      const n = rnd(13, 30)
      const k = teiler(n).length
      return {
        code: lines('anzahl = 0', `for t in range(1, ${n + 1}):`, `    if ${n} % t == 0:`, '        anzahl += 1', 'print(anzahl)'),
        answer: out(k),
        distractors: [k - 2, k + 1, k - 1, n],
      }
    },
    () => {
      const n = rnd(6, 30)
      const t = teiler(n)
      const groesster = t.at(-2)
      return {
        code: lines('groesster = 1', `for t in range(1, ${n}):`, `    if ${n} % t == 0:`, '        groesster = t', 'print(groesster)'),
        answer: out(groesster),
        distractors: [n, t[1], t.length, groesster === 1 ? 2 : groesster - 1, Math.floor(n / 2)],
      }
    },
    () => {
      const n = pick([6, 8, 9, 10, 12, 14, 15, 16, 28])
      const echte = teiler(n).slice(0, -1)
      const s = echte.reduce((a, b) => a + b, 0)
      return {
        code: lines('summe = 0', `for t in range(1, ${n}):`, `    if ${n} % t == 0:`, '        summe += t', 'print(summe)'),
        answer: out(s),
        distractors: [s + n, s - 1, echte.length, s + 1],
      }
    },
  ],

  // 3 · Primzahltest
  [
    // Einstieg: kleine Zahlen
    () => {
      const [a, b] = sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 2)
      return {
        code: lines(...IST_PRIM, `print(ist_prim(${a}), ist_prim(${b}))`),
        ...zweiBools(istPrim(a), istPrim(b)),
      }
    },
    () => {
      const [a, b] = sample([11, 15, 17, 21, 23, 25, 27, 29, 33, 49], 2)
      return {
        code: lines(...IST_PRIM, `print(ist_prim(${a}), ist_prim(${b}))`),
        ...zweiBools(istPrim(a), istPrim(b)),
      }
    },
    () => {
      // In jedem dieser Bereiche liegt mindestens eine Primzahl
      const a = rnd(2, 20), b = a + rnd(6, 10)
      const zahlen = Array.from({ length: b - a }, (_, i) => a + i)
      const primzahlen = zahlen.filter(istPrim)
      const ungeradeNichtPrim = zahlen.find((z) => z % 2 === 1 && !istPrim(z))
      return {
        code: lines(...IST_PRIM, `for z in range(${a}, ${b}):`, '    if ist_prim(z):', '        print(z, end=" ")'),
        answer: zeile(primzahlen),
        distractors: [
          zeile(zahlen.filter((z) => z % 2 === 1)),
          zeile(zahlen.filter((z) => !istPrim(z))),
          ungeradeNichtPrim ? zeile([...primzahlen, ungeradeNichtPrim].sort((x, y) => x - y)) : zeile([...primzahlen, b]),
          primzahlen.length > 1 ? zeile(primzahlen.slice(1)) : zeile([primzahlen[0] + 2]),
          zeile([...primzahlen, b]),
        ],
      }
    },
    () => {
      const [a, b] = sample([1, 2, 9, 15, 16, 17, 21, 23, 25, 29, 49], 2)
      return {
        code: lines(...IST_PRIM_SCHNELL, `print(ist_prim(${a}), ist_prim(${b}))`),
        ...zweiBools(istPrim(a), istPrim(b)),
      }
    },
  ],

  // 4 · Euklid
  [
    // Einstieg: ein einziger Schritt
    () => {
      const [a, b] = pick(GGT_LEICHT)
      return {
        code: lines(`a = ${a}`, `b = ${b}`, 'a, b = b, a % b', 'print(a, b)'),
        answer: out(b, a % b),
        distractors: [out(a % b, b), out(b, Math.floor(a / b)), out(a, a % b), out(b, float(a / b))],
      }
    },
    () => {
      const [a, b] = pick(GGT_PAARE)
      const g = ggt(a, b)
      return {
        code: lines('def ggt(a, b):', '    while b != 0:', '        a, b = b, a % b', '    return a', '', `print(ggt(${a}, ${b}))`),
        answer: out(g),
        distractors: [Math.min(a, b), a % b === 0 ? 1 : a % b, 1, a - b, g * 2],
      }
    },
    () => {
      const [a, b] = pick(GGT_PAARE)
      const g = ggt(a, b)
      return {
        code: lines('def ggt(a, b):', '    if b == 0:', '        return a', '    return ggt(b, a % b)', '', `print(ggt(${a}, ${b}))`),
        answer: out(g),
        distractors: [Math.min(a, b), 0, 1, a - b, g * 2],
      }
    },
    () => {
      const [a, b] = pick(GGT_PAARE)
      let x = a, y = b, s = 0
      while (y !== 0) { [x, y] = [y, x % y]; s++ }
      return {
        code: lines(`a = ${a}`, `b = ${b}`, 'schritte = 0', 'while b != 0:', '    a, b = b, a % b', '    schritte += 1', 'print(schritte)'),
        answer: out(s),
        distractors: [s + 1, s - 1, ggt(a, b), s + 2],
      }
    },
  ],
]
