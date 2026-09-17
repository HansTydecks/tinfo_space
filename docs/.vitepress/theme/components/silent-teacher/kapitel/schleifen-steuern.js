// Aufgaben je Level von leicht nach schwer.
import { rnd, pick, rndDistinct, lit, out, lines } from '../engine.js'

const reihe = (von, bis) => Array.from({ length: Math.max(0, bis - von) }, (_, i) => von + i)
const zeile = (zahlen) => zahlen.join(' ')

export default [
  // 1 · break
  [
    // Einstieg: break beendet die Schleife sofort
    () => {
      const k = rnd(1, 3)
      return {
        code: lines('for i in range(5):', `    if i == ${k}:`, '        break', '    print(i, end=" ")'),
        answer: zeile(reihe(0, k)),
        distractors: [zeile(reihe(0, k + 1)), zeile(reihe(0, 5)), String(k), zeile(reihe(k, 5))],
      }
    },
    () => {
      const k = rnd(2, 7)
      return {
        code: lines('for i in range(10):', `    if i == ${k}:`, '        break', 'print(i)'),
        answer: out(k),
        distractors: [k - 1, 9, 10, k + 1],
      }
    },
    () => {
      // 1–3 kleine Zahlen, dann eine zu große, dann beliebige
      const g = rnd(4, 6)
      const vorne = Array.from({ length: rnd(1, 3) }, () => rnd(1, g))
      const zahlen = [...vorne, rnd(g + 1, 9)]
      while (zahlen.length < 5) zahlen.push(rnd(1, 9))
      const bruch = zahlen.findIndex((z) => z > g)
      const vorher = bruch === -1 ? zahlen : zahlen.slice(0, bruch)
      return {
        code: lines(`for z in ${lit(zahlen)}:`, `    if z > ${g}:`, '        break', '    print(z, end=" ")'),
        answer: zeile(vorher),
        distractors: [
          zeile(zahlen.filter((z) => z <= g)),
          zeile(bruch === -1 ? zahlen.slice(0, -1) : zahlen.slice(0, bruch + 1)),
          zeile(zahlen),
          zeile(vorher.slice(0, -1).length ? vorher.slice(0, -1) : [zahlen[1]]),
          zeile(zahlen.filter((z) => z > g)),
        ],
      }
    },
    () => {
      const g = rnd(5, 20)
      let summe = 0
      for (let i = 1; i < 10; i++) {
        summe += i
        if (summe > g) break
      }
      const vorher = summe - Math.round((Math.sqrt(8 * summe + 1) - 1) / 2)
      return {
        code: lines('summe = 0', 'for i in range(1, 10):', '    summe += i', `    if summe > ${g}:`, '        break', 'print(summe)'),
        answer: out(summe),
        distractors: [g, vorher, 45, g + 1],
      }
    },
  ],

  // 2 · continue
  [
    // Einstieg: continue überspringt genau diesen Durchlauf
    () => {
      const k = rnd(1, 3)
      return {
        code: lines('for i in range(5):', `    if i == ${k}:`, '        continue', '    print(i, end=" ")'),
        answer: zeile(reihe(0, 5).filter((i) => i !== k)),
        distractors: [zeile(reihe(0, 5)), zeile(reihe(0, k)), String(k), zeile(reihe(0, 5).filter((i) => i !== k + 1))],
      }
    },
    () => {
      const n = rnd(5, 10)
      const rest = pick([0, 1])
      return {
        code: lines(`for i in range(1, ${n}):`, `    if i % 2 == ${rest}:`, '        continue', '    print(i, end=" ")'),
        answer: zeile(reihe(1, n).filter((i) => i % 2 !== rest)),
        distractors: [
          zeile(reihe(1, n).filter((i) => i % 2 === rest)),
          zeile(reihe(1, n)),
          zeile(reihe(1, n + 1).filter((i) => i % 2 !== rest)),
          zeile(reihe(1, n).filter((i) => i % 2 !== rest).slice(0, 1)),
        ],
      }
    },
    () => {
      const zahlen = [rnd(1, 9), -rnd(1, 9), rnd(1, 9), -rnd(1, 9), rnd(1, 9)]
      if (Math.random() < 0.5) zahlen.reverse()
      return {
        code: lines(`for z in ${lit(zahlen)}:`, '    if z < 0:', '        continue', '    print(z, end=" ")'),
        answer: zeile(zahlen.filter((z) => z >= 0)),
        distractors: [
          zeile(zahlen.slice(0, zahlen.findIndex((z) => z < 0))) || String(zahlen[0]),
          zeile(zahlen),
          zeile(zahlen.filter((z) => z < 0)),
          zeile(zahlen.map(Math.abs)),
        ],
      }
    },
    () => {
      const n = rnd(5, 9)
      const ohne = reihe(1, n).filter((i) => i % 3 !== 0)
      const summe = (z) => z.reduce((a, b) => a + b, 0)
      return {
        code: lines('summe = 0', `for i in range(1, ${n}):`, '    if i % 3 == 0:', '        continue', '    summe += i', 'print(summe)'),
        answer: out(summe(ohne)),
        distractors: [summe(reihe(1, n)), summe(reihe(1, n).filter((i) => i % 3 === 0)), summe(reihe(1, 3)), summe(ohne) + n],
      }
    },
  ],

  // 3 · Gemischt
  [
    // Einstieg: pass tut nichts – der else-Zweig druckt
    () => {
      const k = rnd(0, 2)
      return {
        code: lines('for i in range(3):', `    if i == ${k}:`, '        pass', '    else:', '        print(i, end=" ")'),
        answer: zeile([0, 1, 2].filter((i) => i !== k)),
        distractors: ['0 1 2', String(k), zeile([0, 1, 2].slice(0, k)) || '1 2 3', zeile([1, 2, 3].filter((i) => i !== k + 1))],
      }
    },
    // pass ohne else ändert gar nichts
    () => {
      const k = rnd(1, 3)
      return {
        code: lines('for i in range(5):', `    if i == ${k}:`, '        pass', '    print(i, end=" ")'),
        answer: '0 1 2 3 4',
        distractors: [zeile(reihe(0, 5).filter((i) => i !== k)), zeile(reihe(0, k)), String(k), zeile(reihe(0, k + 1))],
      }
    },
    () => {
      const [a, b] = [rnd(2, 3), rnd(4, 6)]
      return {
        code: lines('for i in range(1, 8):', `    if i == ${a}:`, '        continue', `    if i == ${b}:`, '        break', '    print(i, end=" ")'),
        answer: zeile(reihe(1, b).filter((i) => i !== a)),
        distractors: [
          zeile(reihe(1, b)),
          zeile(reihe(1, a)),
          zeile(reihe(1, b + 1).filter((i) => i !== a)),
          zeile(reihe(1, 8).filter((i) => i !== a && i !== b)),
        ],
      }
    },
    () => {
      const zahlen = rndDistinct(1, 9, 5)
      const g = rnd(3, 7)
      const treffer = zahlen.find((z) => z > g)
      return {
        code: lines('gefunden = 0', `for z in ${lit(zahlen)}:`, `    if z <= ${g}:`, '        continue', '    gefunden = z', '    break', 'print(gefunden)'),
        answer: out(treffer ?? 0),
        distractors: [zahlen.filter((z) => z > g).at(-1) ?? zahlen[0], zahlen[0], g, Math.max(...zahlen)],
      }
    },
  ],
]
