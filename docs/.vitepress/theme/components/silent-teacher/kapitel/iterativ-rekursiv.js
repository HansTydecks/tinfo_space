// Aufgaben je Level von leicht nach schwer.
import { ERROR, rnd, pick, out, lines } from '../engine.js'

const dreieck = (n) => (n * (n + 1)) / 2
const fak = (n) => (n <= 1 ? 1 : n * fak(n - 1))
const zeile = (zahlen) => zahlen.join(' ')
const absteigend = (k) => Array.from({ length: k }, (_, i) => k - i)
const aufsteigend = (k) => Array.from({ length: k }, (_, i) => i + 1)

export default [
  // 1 · Rekursive Summe
  [
    // Einstieg: dieselbe Summe, aber iterativ mit einer Schleife
    () => {
      const k = rnd(2, 5)
      return {
        code: lines(
          'def summe_iterativ(n):',
          '    ergebnis = 0',
          '    for i in range(1, n + 1):',
          '        ergebnis += i',
          '    return ergebnis',
          '',
          `print(summe_iterativ(${k}))`,
        ),
        answer: out(dreieck(k)),
        distractors: [dreieck(k - 1), k, dreieck(k + 1), 0],
      }
    },
    // jetzt rekursiv: die Funktion ruft sich selbst auf
    () => {
      const k = rnd(2, 4)
      return {
        code: lines('def summe(n):', '    if n == 0:', '        return 0', '    return n + summe(n - 1)', '', `print(summe(${k}))`),
        answer: out(dreieck(k)),
        distractors: [dreieck(k - 1), k, dreieck(k + 1), k * k],
      }
    },
    () => {
      const k = rnd(3, 6)
      return {
        code: lines('def summe(n):', '    if n == 0:', '        return 0', '    return n + summe(n - 1)', '', `print(summe(${k}))`),
        answer: out(dreieck(k)),
        distractors: [dreieck(k - 1), k, dreieck(k + 1), k * k],
      }
    },
    () => {
      const k = rnd(2, 6), d = pick([2, 3, 5])
      return {
        code: lines('def f(n):', '    if n == 0:', '        return 0', `    return ${d} + f(n - 1)`, '', `print(f(${k}))`),
        answer: out(d * k),
        distractors: [d * (k - 1), d + k, dreieck(k) + d, d * (k + 1)],
      }
    },
    () => {
      const k = rnd(2, 5), basis = pick([1, 10])
      const erg = basis + dreieck(k) - 1
      return {
        code: lines('def f(n):', '    if n == 1:', `        return ${basis}`, '    return n + f(n - 1)', '', `print(f(${k}))`),
        answer: out(erg),
        distractors: [dreieck(k), erg + 1, basis, dreieck(k) + basis],
      }
    },
  ],

  // 2 · Fakultät
  [
    // Einstieg: die Fakultät mit einer Schleife
    () => {
      const k = rnd(2, 5)
      return {
        code: lines(
          'def fak_iterativ(n):',
          '    e = 1',
          '    for i in range(2, n + 1):',
          '        e *= i',
          '    return e',
          '',
          `print(fak_iterativ(${k}))`,
        ),
        answer: out(fak(k)),
        distractors: [fak(k - 1), fak(k + 1), dreieck(k), 1],
      }
    },
    () => {
      const k = rnd(2, 5)
      return {
        code: lines('def fak(n):', '    if n <= 1:', '        return 1', '    return n * fak(n - 1)', '', `print(fak(${k}))`),
        answer: out(fak(k)),
        distractors: [fak(k - 1), fak(k + 1), dreieck(k), k * k],
      }
    },
    () => {
      const b = rnd(2, 3), e = rnd(2, 4)
      return {
        code: lines('def p(b, e):', '    if e == 0:', '        return 1', '    return b * p(b, e - 1)', '', `print(p(${b}, ${e}))`),
        answer: out(b ** e),
        distractors: [b * e, b ** (e - 1), e ** b === b ** e ? b ** e + b : e ** b, b ** (e + 1)],
      }
    },
    () => {
      const k = rnd(3, 6)
      return {
        code: lines('def fak(n):', '    if n <= 1:', '        return 1', '    return n * fak(n - 1)', '', `print(fak(${k}) // fak(${k - 1}))`),
        answer: out(k),
        distractors: [k - 1, 1, fak(k - 1), k + 1],
      }
    },
  ],

  // 3 · Reihenfolge der Aufrufe
  [
    // Einstieg: erst ausgeben, dann weiter rekursiv
    () => {
      const k = rnd(2, 5)
      return {
        code: lines('def zaehle(n):', '    if n == 0:', '        return', '    print(n, end=" ")', '    zaehle(n - 1)', '', `zaehle(${k})`),
        answer: zeile(absteigend(k)),
        distractors: [zeile(aufsteigend(k)), zeile([...absteigend(k), 0]), String(k), zeile(absteigend(k - 1))],
      }
    },
    // andersherum: erst ganz nach unten, dann ausgeben
    () => {
      const k = rnd(2, 5)
      return {
        code: lines('def zaehle(n):', '    if n == 0:', '        return', '    zaehle(n - 1)', '    print(n, end=" ")', '', `zaehle(${k})`),
        answer: zeile(aufsteigend(k)),
        distractors: [zeile(absteigend(k)), zeile([0, ...aufsteigend(k)]), String(k), '1'],
      }
    },
    () => {
      const k = rnd(2, 4)
      return {
        code: lines('def f(n):', '    if n == 0:', '        return 0', '    print(n, end=" ")', '    return n + f(n - 1)', '', `f(${k})`),
        answer: zeile(absteigend(k)),
        distractors: [String(dreieck(k)), zeile([...absteigend(k), dreieck(k)]), zeile(aufsteigend(k)), zeile([...absteigend(k), 0])],
      }
    },
    () => {
      const k = rnd(2, 4)
      return {
        code: lines(
          'def f(n):',
          '    if n == 0:',
          '        return',
          '    print(n, end=" ")',
          '    f(n - 1)',
          '    print(n, end=" ")',
          '',
          `f(${k})`,
        ),
        answer: zeile([...absteigend(k), ...aufsteigend(k)]),
        distractors: [
          zeile([...absteigend(k), ...absteigend(k)]),
          zeile([...aufsteigend(k), ...absteigend(k)]),
          zeile(absteigend(k).flatMap((x) => [x, x])),
          zeile([...absteigend(k), 0, ...aufsteigend(k)]),
        ],
      }
    },
  ],

  // 4 · Ohne Basisfall
  [
    // Einstieg: ohne Abbruch läuft die Rekursion ewig
    () => {
      const k = rnd(2, 6)
      return {
        code: lines('def f(n):', '    return n + f(n - 1)', '', `print(f(${k}))`),
        answer: ERROR,
        distractors: [dreieck(k), 0, k, 'None', dreieck(k - 1)],
      }
    },
    // der Basisfall wird nie erreicht, weil n größer wird
    () => {
      const k = rnd(1, 5)
      return {
        code: lines('def f(n):', '    if n == 0:', '        return 1', '    return f(n + 1)', '', `print(f(${k}))`),
        answer: ERROR,
        distractors: [1, 0, k, k + 1, 'None'],
      }
    },
    () => {
      const k = rnd(2, 8)
      const erg = k % 2 === 0 ? (k / 2) * (k / 2 + 1) : ((k + 1) / 2) ** 2
      return {
        code: lines('def f(n):', '    if n <= 0:', '        return 0', '    return n + f(n - 2)', '', `print(f(${k}))`),
        answer: out(erg),
        distractors: [dreieck(k), erg - k, k, erg + 1],
      }
    },
    // Schrittweite 2 trifft die 0 nur bei geraden Zahlen
    () => {
      const k = rnd(2, 8)
      const gerade = k % 2 === 0
      const erg = gerade ? (k / 2) * (k / 2 + 1) : ERROR
      return {
        code: lines('def f(n):', '    if n == 0:', '        return 0', '    return n + f(n - 2)', '', `print(f(${k}))`),
        answer: gerade ? out(erg) : ERROR,
        distractors: gerade
          ? [dreieck(k), erg - k, k, erg + 1]
          : [dreieck(k), k, 0, (k * k + 2 * k + 1) / 4, 'None'],
      }
    },
  ],
]
