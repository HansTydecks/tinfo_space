// Aufgaben je Level von leicht nach schwer.
import { rnd, pick, sample, rndDistinct, lit, out, lines } from '../engine.js'

const reihe = (von, bis, schritt = 1) => {
  const r = []
  for (let i = von; i < bis; i += schritt) r.push(i)
  return r
}
const zeile = (zahlen, sep = ' ') => zahlen.join(sep)
const summe = (zahlen) => zahlen.reduce((a, b) => a + b, 0)

const TIERE = ['Hund', 'Katze', 'Maus', 'Pferd', 'Igel', 'Esel', 'Fuchs']
const KURZ = ['Hut', 'Ball', 'Eis', 'Tor', 'Uhr', 'Zoo']
const MIT_A = ['Banane', 'Ananas', 'Kakao', 'Salat', 'Tomate', 'Papagei', 'Tafel']

export default [
  // 1 · Über Listen
  [
    // Einstieg: jedes Element einmal ausgeben
    () => {
      const tiere = sample(TIERE, 2)
      return {
        code: lines(`for tier in ${lit(tiere)}:`, '    print(tier)'),
        answer: lines(...tiere),
        distractors: [lines(...[...tiere].reverse()), tiere.join(' '), 'tier', lit(tiere)],
      }
    },
    () => {
      const zahlen = rndDistinct(1, 9, 3)
      return {
        code: lines(`for z in ${lit(zahlen)}:`, '    print(z * 2, end=" ")'),
        answer: zeile(zahlen.map((z) => z * 2)),
        distractors: [zeile(zahlen), String(zahlen[2] * 2), String(summe(zahlen) * 2), zeile(zahlen.map((z) => `${z}${z}`))],
      }
    },
    () => {
      const zahlen = [rnd(1, 9), rnd(1, 9), rnd(1, 9)]
      return {
        code: lines('summe = 0', `for z in ${lit(zahlen)}:`, '    summe += z', 'print(summe)'),
        answer: out(summe(zahlen)),
        distractors: [zahlen[2], summe(zahlen) - zahlen[0], zahlen.join(''), 3],
      }
    },
    () => {
      const [a, b] = sample(TIERE.filter((t) => t.length !== 5), 1).concat(sample(TIERE.filter((t) => t.length === 5), 1))
      const paar = Math.random() < 0.5 ? [a, b] : [b, a]
      return {
        code: lines(`for tier in ${lit(paar)}:`, '    print(tier, len(tier))'),
        answer: lines(out(paar[0], paar[0].length), out(paar[1], paar[1].length)),
        distractors: [
          lines(out(paar[0], paar[1].length), out(paar[1], paar[0].length)),
          lines(out(paar[0], 2), out(paar[1], 2)),
          lines(out('tier', paar[0].length), out('tier', paar[1].length)),
          out(paar[0], paar[1], paar[0].length + paar[1].length),
        ],
      }
    },
    () => {
      const zahlen = Array.from({ length: 5 }, () => rnd(1, 9))
      const g = rnd(3, 6)
      const anzahl = zahlen.filter((z) => z > g).length
      return {
        code: lines('anzahl = 0', `for z in ${lit(zahlen)}:`, `    if z > ${g}:`, '        anzahl += 1', 'print(anzahl)'),
        answer: out(anzahl),
        distractors: [zahlen.filter((z) => z >= g).length, 5 - anzahl, summe(zahlen.filter((z) => z > g)), anzahl + 1],
      }
    },
  ],

  // 2 · range()
  [
    // Einstieg: range(n) beginnt bei 0
    () => {
      const n = rnd(2, 4)
      return {
        code: lines(`for i in range(${n}):`, '    print(i, end=" ")'),
        answer: zeile(reihe(0, n)),
        distractors: [zeile(reihe(1, n + 1)), zeile(reihe(0, n + 1)), zeile(reihe(1, n)), String(n)],
      }
    },
    () => {
      const n = rnd(4, 7)
      return {
        code: lines(`for i in range(${n}):`, '    print(i, end=" ")'),
        answer: zeile(reihe(0, n)),
        distractors: [zeile(reihe(1, n + 1)), zeile(reihe(0, n + 1)), zeile(reihe(1, n)), String(n)],
      }
    },
    () => {
      const a = rnd(1, 4), b = a + rnd(2, 5)
      return {
        code: lines(`for i in range(${a}, ${b}):`, '    print(i, end=" ")'),
        answer: zeile(reihe(a, b)),
        distractors: [zeile(reihe(a, b + 1)), zeile(reihe(a + 1, b + 1)), zeile(reihe(0, b)), zeile(reihe(a + 1, b))],
      }
    },
    () => {
      const n = rnd(3, 7)
      return {
        code: lines('summe = 0', `for i in range(1, ${n}):`, '    summe += i', 'print(summe)'),
        answer: out(summe(reihe(1, n))),
        distractors: [summe(reihe(1, n + 1)), summe(reihe(0, n - 1)), n - 1, n],
      }
    },
    () => {
      const a = rnd(0, 3), s = pick([2, 3]), b = a + s * rnd(2, 4) + rnd(0, 1)
      return {
        code: lines(`for i in range(${a}, ${b}, ${s}):`, '    print(i, end=" ")'),
        answer: zeile(reihe(a, b, s)),
        distractors: [zeile(reihe(a, b + s, s)), zeile(reihe(a, b - s, s)), zeile(reihe(a, b)), zeile(reihe(a + s, b + s, s)), zeile(reihe(a + 1, b, s))],
      }
    },
  ],

  // 3 · Über Strings
  [
    // Einstieg: jedes Zeichen einmal
    () => {
      const w = pick([...TIERE, ...KURZ])
      return {
        code: lines('n = 0', `for b in "${w}":`, '    n += 1', 'print(n)'),
        answer: out(w.length),
        distractors: [w.length - 1, 1, w, w.length + 1],
      }
    },
    () => {
      const w = pick(['abc', 'xyz', 'Hut', 'Eis', 'Kuh', 'Tag'])
      const sep = pick(['-', '.', '*'])
      return {
        code: lines(`for zeichen in "${w}":`, `    print(zeichen, end="${sep}")`),
        answer: [...w].map((c) => c + sep).join(''),
        distractors: [[...w].join(sep), w + sep, [...w].join(' '), sep + [...w].join(sep)],
      }
    },
    () => {
      const w = pick(MIT_A)
      const n = [...w].filter((c) => c === 'a').length
      return {
        code: lines('anzahl = 0', `for b in "${w}":`, '    if b == "a":', '        anzahl += 1', 'print(anzahl)'),
        answer: out(n),
        distractors: [[...w.toLowerCase()].filter((c) => c === 'a').length, n + 1, w.length, n - 1],
      }
    },
    () => {
      const w = pick(KURZ)
      return {
        code: lines('neu = ""', `for b in "${w}":`, '    neu = neu + b + b', 'print(neu)'),
        answer: [...w].map((c) => c + c).join(''),
        distractors: [w + w, [...w].map((c) => c + c).join(' '), w, [...w].map((c) => c + c).reverse().join('')],
      }
    },
  ],

  // 4 · Verschachtelt
  [
    // Einstieg: zwei kleine Schleifen ineinander
    () => {
      const n = rnd(2, 3), m = rnd(2, 3)
      return {
        code: lines('z = 0', `for a in range(${n}):`, `    for b in range(${m}):`, '        z += 1', 'print(z)'),
        answer: out(n * m),
        distractors: [n + m, n * m + n, (n - 1) * (m - 1), (n + 1) * (m + 1)],
      }
    },
    () => {
      const n = rnd(3, 5), m = rnd(2, 4)
      return {
        code: lines('z = 0', `for a in range(${n}):`, `    for b in range(${m}):`, '        z += 1', 'print(z)'),
        answer: out(n * m),
        distractors: [n + m, n * m + n, (n - 1) * (m - 1), (n + 1) * (m + 1)],
      }
    },
    () => {
      const xs = sample(['A', 'B', 'C'], 2).sort()
      const ys = [1, 2]
      return {
        code: lines(`for x in ${lit(xs)}:`, `    for y in ${lit(ys)}:`, '        print(x + str(y), end=" ")'),
        answer: `${xs[0]}1 ${xs[0]}2 ${xs[1]}1 ${xs[1]}2`,
        distractors: [
          `${xs[0]}1 ${xs[1]}1 ${xs[0]}2 ${xs[1]}2`,
          `${xs[0]}1 ${xs[1]}2`,
          `1${xs[0]} 2${xs[0]} 1${xs[1]} 2${xs[1]}`,
          `${xs[0]}3 ${xs[1]}3`,
        ],
      }
    },
    () => {
      const p = rnd(2, 3), q = rnd(2, 3)
      const paare = []
      for (let a = 1; a <= p; a++) for (let b = 1; b <= q; b++) paare.push(`${a}${b}`)
      const quer = []
      for (let b = 1; b <= q; b++) for (let a = 1; a <= p; a++) quer.push(`${a}${b}`)
      return {
        code: lines(`for a in range(1, ${p + 1}):`, `    for b in range(1, ${q + 1}):`, '        print(f"{a}{b}", end=" ")'),
        answer: zeile(paare),
        distractors: [zeile(quer), zeile(paare.filter((x) => x[0] === x[1])), zeile(paare.map((x) => x[1] + x[0])), zeile(paare.slice(0, -1))],
      }
    },
    () => {
      const n = rnd(2, 3), m = rnd(2, 4)
      return {
        code: lines('z = 0', `for a in range(${n}):`, '    z += 1', `    for b in range(${m}):`, '        z += 1', 'print(z)'),
        answer: out(n + n * m),
        distractors: [n * m, n + m, n * m + 1, n + m + 1],
      }
    },
  ],
]
