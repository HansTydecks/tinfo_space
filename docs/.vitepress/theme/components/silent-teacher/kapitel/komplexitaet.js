// Aufgaben je Level von leicht nach schwer.
import { rnd, pick, out, lines } from '../engine.js'

export default [
  // 1 · Schritte zählen
  [
    // Einstieg: eine Schleife, ein Schritt pro Durchlauf
    () => {
      const n = rnd(2, 8)
      return {
        code: lines('z = 0', `for x in range(${n}):`, '    z += 1', 'print(z)'),
        answer: out(n),
        distractors: [n - 1, n + 1, 1, 2 * n],
      }
    },
    () => {
      const n = rnd(9, 20)
      return {
        code: lines('z = 0', `for x in range(${n}):`, '    z += 1', 'print(z)'),
        answer: out(n),
        distractors: [n - 1, n + 1, 1, 2 * n],
      }
    },
    () => {
      const a = rnd(2, 8), b = a + rnd(3, 10)
      return {
        code: lines('z = 0', `for x in range(${a}, ${b}):`, '    z += 1', 'print(z)'),
        answer: out(b - a),
        distractors: [b, b - a + 1, b - a - 1, a],
      }
    },
    () => {
      const n = rnd(3, 12)
      return {
        code: lines('z = 0', `for x in range(${n}):`, '    z += 1', '    z += 1', 'print(z)'),
        answer: out(2 * n),
        distractors: [n, n + 2, n * n, 2 * n - 1],
      }
    },
    // nacheinander heißt plus, nicht mal
    () => {
      const n = rnd(2, 9), m = rnd(2, 9)
      return {
        code: lines('z = 0', `for x in range(${n}):`, '    z += 1', `for y in range(${m}):`, '    z += 1', 'print(z)'),
        answer: out(n + m),
        distractors: [n * m, Math.max(n, m), n + m + 1, n * m + n],
      }
    },
  ],

  // 2 · Verschachtelte Schleifen
  [
    // Einstieg: zwei kleine Schleifen ineinander
    () => {
      const n = rnd(2, 4)
      return {
        code: lines('paare = 0', `for a in range(${n}):`, `    for b in range(${n}):`, '        paare += 1', 'print(paare)'),
        answer: out(n * n),
        distractors: [2 * n, n, n * (n - 1), n * n + 1],
      }
    },
    () => {
      const n = rnd(2, 6), m = rnd(2, 6)
      return {
        code: lines('z = 0', `for a in range(${n}):`, `    for b in range(${m}):`, '        z += 1', 'print(z)'),
        answer: out(n * m),
        distractors: [n + m, n * m + 1, n * n, (n - 1) * m],
      }
    },
    () => {
      const n = rnd(5, 7)
      return {
        code: lines('paare = 0', `for a in range(${n}):`, `    for b in range(${n}):`, '        paare += 1', 'print(paare)'),
        answer: out(n * n),
        distractors: [2 * n, n, n * (n - 1), n * n + 1],
      }
    },
    // die innere Schleife wird jedes Mal kürzer
    () => {
      const n = rnd(3, 7)
      return {
        code: lines('z = 0', `for a in range(${n}):`, '    for b in range(a):', '        z += 1', 'print(z)'),
        answer: out((n * (n - 1)) / 2),
        distractors: [n * n, (n * (n + 1)) / 2, n * (n - 1), n],
      }
    },
    () => {
      const n = rnd(2, 5)
      return {
        code: lines('z = 0', 'for a in range(2):', `    for b in range(${n}):`, '        for c in range(2):', '            z += 1', 'print(z)'),
        answer: out(4 * n),
        distractors: [n + 4, 2 * n, n ** 3, 8 * n],
      }
    },
  ],

  // 3 · Halbieren
  [
    // Einstieg: Zweierpotenzen lassen sich glatt halbieren
    () => {
      const N = pick([2, 4, 8, 16])
      const schritte = Math.log2(N)
      return {
        code: lines(`n = ${N}`, 'schritte = 0', 'while n > 1:', '    n = n // 2', '    schritte += 1', 'print(schritte)'),
        answer: out(schritte),
        distractors: [N / 2, schritte + 1, schritte - 1, N],
      }
    },
    // egal wie groß: am Ende bleibt 1 übrig
    () => {
      const N = rnd(5, 100)
      return {
        code: lines(`n = ${N}`, 'while n > 1:', '    n = n // 2', 'print(n)'),
        answer: out(1),
        distractors: [0, 2, Math.floor(N / 2), N],
      }
    },
    () => {
      const N = pick([10, 20, 40, 50, 100, 24, 60])
      const schritte = Math.floor(Math.log2(N))
      return {
        code: lines(`n = ${N}`, 'schritte = 0', 'while n > 1:', '    n = n // 2', '    schritte += 1', 'print(schritte)'),
        answer: out(schritte),
        distractors: [N / 2, schritte + 1, schritte - 1, N],
      }
    },
    () => {
      const N = rnd(5, 70)
      let x = 1, s = 0
      while (x < N) { x *= 2; s++ }
      return {
        code: lines('x = 1', 'schritte = 0', `while x < ${N}:`, '    x = x * 2', '    schritte += 1', 'print(schritte)'),
        answer: out(s),
        distractors: [x, s - 1, s + 1, Math.floor(N / 2)],
      }
    },
    () => {
      const N = pick([rnd(1, 9), rnd(10, 99), rnd(100, 999), rnd(1000, 99999)])
      const s = String(N).length
      return {
        code: lines(`n = ${N}`, 'schritte = 0', 'while n > 0:', '    n = n // 10', '    schritte += 1', 'print(schritte)'),
        answer: out(s),
        distractors: [s - 1, s + 1, Math.floor(N / 10), N % 10 === s ? 10 : N % 10],
      }
    },
  ],
]
