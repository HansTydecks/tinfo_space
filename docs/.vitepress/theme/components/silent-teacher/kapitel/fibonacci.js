// Aufgaben je Level von leicht nach schwer.
import { rnd, rndDistinct, out, lines } from '../engine.js'

const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2))
const aufrufe = (n) => (n < 2 ? 1 : 1 + aufrufe(n - 1) + aufrufe(n - 2))
const zeile = (zahlen) => zahlen.join(' ')

// Reihenfolge, in der fib_rekursiv aufgerufen wird
function spur(n, liste = []) {
  liste.push(n)
  if (n >= 2) {
    spur(n - 1, liste)
    spur(n - 2, liste)
  }
  return liste
}

const FIB_ITERATIV = [
  'def fib_iterativ(n):',
  '    a, b = 0, 1',
  '    for _ in range(n):',
  '        a, b = b, a + b',
  '    return a',
  '',
]

const FIB_REKURSIV = [
  'def fib_rekursiv(n):',
  '    if n < 2:',
  '        return n',
  '    return fib_rekursiv(n - 1) + fib_rekursiv(n - 2)',
  '',
]

export default [
  // 1 · Iterativ
  [
    // Einstieg: zwei Werte auf einmal zuweisen
    () => {
      const [a, b] = rndDistinct(1, 9, 2)
      return {
        code: lines(`a, b = ${a}, ${b}`, 'print(b, a)'),
        answer: out(b, a),
        distractors: [out(a, b), out(a, a), out(b, b), out(a + b, a)],
      }
    },
    // ein Fibonacci-Schritt: rechts wird zuerst komplett berechnet
    () => {
      const [a, b] = rndDistinct(1, 6, 2)
      return {
        code: lines(`a, b = ${a}, ${b}`, 'a, b = b, a + b', 'print(a, b)'),
        answer: out(b, a + b),
        distractors: [out(a + b, b), out(b, 2 * b), out(a, a + b), out(b, a), out(a + b, a + b)],
      }
    },
    () => {
      const n = rnd(2, 5)
      let a = 0, b = 1
      for (let i = 0; i < n; i++) [a, b] = [b, a + b]
      return {
        code: lines('a, b = 0, 1', `for _ in range(${n}):`, '    a, b = b, a + b', 'print(a, b)'),
        answer: out(a, b),
        distractors: [out(b, a + b), out(fib(n - 1), a), out(n, n + 1), out(a, a + b)],
      }
    },
    () => {
      const n = rnd(3, 9)
      return {
        code: lines(...FIB_ITERATIV, `print(fib_iterativ(${n}))`),
        answer: out(fib(n)),
        distractors: [fib(n - 1), fib(n + 1), fib(n) + 1, n],
      }
    },
    () => {
      const n = rnd(4, 7)
      return {
        code: lines(...FIB_ITERATIV, `for i in range(${n}):`, '    print(fib_iterativ(i), end=" ")'),
        answer: zeile(Array.from({ length: n }, (_, i) => fib(i))),
        distractors: [
          zeile(Array.from({ length: n }, (_, i) => fib(i + 1))),
          zeile(Array.from({ length: n + 1 }, (_, i) => fib(i))),
          zeile(Array.from({ length: n }, (_, i) => i)),
          zeile(Array.from({ length: n }, (_, i) => fib(i + 2))),
        ],
      }
    },
  ],

  // 2 · Rekursiv
  [
    // Einstieg: kleine n, der Basisfall ist schnell erreicht
    () => {
      const n = rnd(0, 4)
      return {
        code: lines(...FIB_REKURSIV, `print(fib_rekursiv(${n}))`),
        answer: out(fib(n)),
        distractors: [fib(n - 1) || 1, fib(n + 1), n + 1, 2 * n],
      }
    },
    () => {
      const n = rnd(5, 8)
      return {
        code: lines(...FIB_REKURSIV, `print(fib_rekursiv(${n}))`),
        answer: out(fib(n)),
        distractors: [fib(n - 1), fib(n + 1), n, 2 * n - 1],
      }
    },
    // anderer Basisfall, andere Folge
    () => {
      const n = rnd(2, 5)
      return {
        code: lines(
          'def fib(n):',
          '    if n < 2:',
          '        return 1',
          '    return fib(n - 1) + fib(n - 2)',
          '',
          `print(fib(${n}))`,
        ),
        answer: out(fib(n + 1)),
        distractors: [fib(n), fib(n + 2), n, n + 1],
      }
    },
    () => {
      const n = rnd(3, 7)
      return {
        code: lines(...FIB_REKURSIV, `print(fib_rekursiv(${n}) - fib_rekursiv(${n - 1}))`),
        answer: out(fib(n - 2)),
        distractors: [1, fib(n - 1), fib(n), 0],
      }
    },
  ],

  // 3 · Aufrufe zählen
  [
    // Einstieg: gleicher Aufbau wie fib, zählt aber die Aufrufe
    () => {
      const n = rnd(2, 4)
      return {
        code: lines(
          'def anzahl(n):',
          '    if n < 2:',
          '        return 1',
          '    return 1 + anzahl(n - 1) + anzahl(n - 2)',
          '',
          `print(anzahl(${n}))`,
        ),
        answer: out(aufrufe(n)),
        distractors: [fib(n), aufrufe(n) - 1, 2 ** n, n + 1, aufrufe(n - 1)],
      }
    },
    () => {
      const n = rnd(5, 7)
      return {
        code: lines(
          'def anzahl(n):',
          '    if n < 2:',
          '        return 1',
          '    return 1 + anzahl(n - 1) + anzahl(n - 2)',
          '',
          `print(anzahl(${n}))`,
        ),
        answer: out(aufrufe(n)),
        distractors: [fib(n), aufrufe(n) - 1, 2 ** n, n + 1, aufrufe(n - 1)],
      }
    },
    () => {
      const n = rnd(2, 6)
      return {
        code: lines(
          'def blaetter(n):',
          '    if n < 2:',
          '        return 1',
          '    return blaetter(n - 1) + blaetter(n - 2)',
          '',
          `print(blaetter(${n}))`,
        ),
        answer: out(fib(n + 1)),
        distractors: [aufrufe(n), fib(n), 2 ** n, n],
      }
    },
    // print vor dem Basisfall zeigt alle Aufrufe, danach nur die, die sich weiter aufteilen
    () => {
      const n = rnd(3, 4)
      const vorBasis = Math.random() < 0.5
      const alle = spur(n)
      const s = vorBasis ? alle : alle.filter((x) => x >= 2)
      const basis = ['    if n < 2:', '        return n']
      return {
        code: lines(
          'def fib_rekursiv(n):',
          ...(vorBasis ? ['    print(n, end=" ")', ...basis] : [...basis, '    print(n, end=" ")']),
          '    return fib_rekursiv(n - 1) + fib_rekursiv(n - 2)',
          '',
          `fib_rekursiv(${n})`,
        ),
        answer: zeile(s),
        distractors: [
          zeile(vorBasis ? alle.filter((x) => x >= 2) : alle),
          zeile(Array.from({ length: n + 1 }, (_, i) => n - i)),
          zeile([...s].sort((x, y) => y - x)),
          zeile([...s, fib(n)]),
          zeile(Array.from({ length: n - 1 }, (_, i) => n - i)),
        ],
      }
    },
  ],
]
