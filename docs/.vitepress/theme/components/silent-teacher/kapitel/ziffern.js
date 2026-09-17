// Aufgaben je Level von leicht nach schwer.
import { rnd, pick, out, lines, zweiBools, float } from '../engine.js'

const quersumme = (n) => [...String(n)].reduce((s, z) => s + Number(z), 0)
const rueckwaerts = (n) => Number([...String(n)].reverse().join(''))
const ziffernRueckwaerts = (n) => [...String(n)].reverse().join(' ')

const QUERSUMME = [
  'def quersumme(zahl):',
  '    summe = 0',
  '    while zahl > 0:',
  '        summe += zahl % 10',
  '        zahl //= 10',
  '    return summe',
  '',
]

const RUECKWAERTS = [
  'def rueckwaerts(zahl):',
  '    ergebnis = 0',
  '    while zahl > 0:',
  '        ergebnis = ergebnis * 10 + zahl % 10',
  '        zahl //= 10',
  '    return ergebnis',
  '',
]

export default [
  // 1 · Letzte Ziffer
  [
    // Einstieg: zweistellige Zahl, ein Rechenschritt
    () => {
      const n = rnd(10, 99)
      const op = pick(['%', '//'])
      const erg = op === '%' ? n % 10 : Math.floor(n / 10)
      return {
        code: lines(`zahl = ${n}`, `print(zahl ${op} 10)`),
        answer: out(erg),
        distractors: [op === '%' ? Math.floor(n / 10) : n % 10, n, float(n / 10), erg + 1],
      }
    },
    () => {
      const n = rnd(100, 9999)
      return {
        code: lines(`zahl = ${n}`, 'print(zahl % 10, zahl // 10)'),
        answer: out(n % 10, Math.floor(n / 10)),
        distractors: [
          out(Math.floor(n / 10), n % 10),
          out(Number(String(n)[0]), Number(String(n).slice(1))),
          out(n % 10, float(n / 10)),
          out(n % 10, Math.floor(n / 10) * 10),
        ],
      }
    },
    () => {
      const n = rnd(100, 9999)
      const op = pick(['%', '//'])
      const erg = op === '%' ? n % 100 : Math.floor(n / 100)
      return {
        code: lines(`zahl = ${n}`, `print(zahl ${op} 100)`),
        answer: out(erg),
        distractors: [
          op === '%' ? Math.floor(n / 100) : n % 100,
          op === '%' ? n % 10 : Math.floor(n / 10),
          Number(String(n).slice(0, 2)) === erg ? Number(String(n).slice(-2)) : Number(String(n).slice(0, 2)),
          erg + 1,
        ],
      }
    },
    () => {
      const n = rnd(100, 9999)
      return {
        code: lines(`zahl = ${n}`, 'while zahl > 0:', '    print(zahl % 10, end=" ")', '    zahl = zahl // 10'),
        answer: ziffernRueckwaerts(n),
        distractors: [[...String(n)].join(' '), String(rueckwaerts(n)), ziffernRueckwaerts(n) + ' 0', ziffernRueckwaerts(Math.floor(n / 10))],
      }
    },
  ],

  // 2 · Quersumme
  [
    // Einstieg: zwei Ziffern addieren
    () => {
      const n = rnd(10, 99)
      const q = quersumme(n)
      return {
        code: lines(...QUERSUMME, `print(quersumme(${n}))`),
        answer: out(q),
        distractors: [n % 10, Math.floor(n / 10), q + 1, q - 1, n],
      }
    },
    () => {
      const n = rnd(100, 999)
      const q = quersumme(n)
      return {
        code: lines(...QUERSUMME, `print(quersumme(${n}))`),
        answer: out(q),
        distractors: [q - (n % 10), q + 1, String(n).length, q - 1],
      }
    },
    () => {
      const n = rnd(10, 999)
      const q = quersumme(n)
      return {
        code: lines(`zahl = ${n}`, 'summe = 0', 'while zahl > 0:', '    summe += zahl % 10', '    zahl //= 10', 'print(summe, zahl)'),
        answer: out(q, 0),
        distractors: [out(q, n), out(q - (n % 10), 0), out(q, Math.floor(n / 10)), out(n % 10, 0)],
      }
    },
    // die Quersumme verrät die Teilbarkeit durch 3
    () => {
      const n = pick([rnd(10, 99) * 3, rnd(10, 99) * 3 + 1, rnd(100, 300)])
      return {
        code: lines(...QUERSUMME, `n = ${n}`, 'print(quersumme(n) % 3 == 0, n % 3 == 0)'),
        ...zweiBools(quersumme(n) % 3 === 0, n % 3 === 0),
      }
    },
  ],

  // 3 · Rückwärts
  [
    // Einstieg: Ziffern zählen
    () => {
      const n = rnd(1, 99999)
      const s = String(n).length
      return {
        code: lines(`zahl = ${n}`, 'anzahl = 0', 'while zahl > 0:', '    zahl //= 10', '    anzahl += 1', 'print(anzahl)'),
        answer: out(s),
        distractors: [s - 1, s + 1, quersumme(n), n % 10 === s ? 0 : n % 10],
      }
    },
    () => {
      const n = rnd(12, 98)
      const r = rueckwaerts(n)
      return {
        code: lines(...RUECKWAERTS, `print(rueckwaerts(${n}))`),
        answer: out(r),
        distractors: [n, ziffernRueckwaerts(n), r + 1, quersumme(n)],
      }
    },
    // eine 0 am Ende verschwindet beim Umdrehen
    () => {
      const n = pick([rnd(100, 999), rnd(1, 9) * 10, rnd(10, 99) * 10])
      const r = rueckwaerts(n)
      return {
        code: lines(...RUECKWAERTS, `print(rueckwaerts(${n}))`),
        answer: out(r),
        distractors: [[...String(n)].reverse().join(''), n, ziffernRueckwaerts(n), r + 1, quersumme(n)],
      }
    },
    () => {
      const pal = pick([121, 131, 202, 353, 44, 77, 1221, 909])
      const nicht = pick([123, 120, 210, 45, 1231, 910, 100])
      const [a, b] = Math.random() < 0.5 ? [pal, nicht] : [nicht, pal]
      return {
        code: lines(...RUECKWAERTS, `print(rueckwaerts(${a}) == ${a}, rueckwaerts(${b}) == ${b})`),
        ...zweiBools(rueckwaerts(a) === a, rueckwaerts(b) === b),
      }
    },
  ],
]
