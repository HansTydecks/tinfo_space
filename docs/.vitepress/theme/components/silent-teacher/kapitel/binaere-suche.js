// Aufgaben je Level von leicht nach schwer.
import { rnd, pick, rndDistinct, lit, out, lines, pyRepr, float } from '../engine.js'

const sortierteListe = (n, max = 60) => rndDistinct(1, max, n).sort((a, b) => a - b)

// binäre Suche wie in der Lektion; liefert Position und Anzahl der Schleifendurchläufe
function binaer(zahlen, gesucht) {
  let links = 0, rechts = zahlen.length - 1, schritte = 0
  while (links <= rechts) {
    schritte++
    const mitte = Math.floor((links + rechts) / 2)
    if (zahlen[mitte] === gesucht) return { position: mitte, schritte }
    if (zahlen[mitte] < gesucht) links = mitte + 1
    else rechts = mitte - 1
  }
  return { position: -1, schritte }
}

const SUCHE = [
  'links = 0',
  'rechts = len(zahlen) - 1',
  'position = -1',
  'schritte = 0',
  'while links <= rechts:',
  '    schritte += 1',
  '    mitte = (links + rechts) // 2',
  '    if zahlen[mitte] == gesucht:',
  '        position = mitte',
  '        break',
  '    elif zahlen[mitte] < gesucht:',
  '        links = mitte + 1',
  '    else:',
  '        rechts = mitte - 1',
]

export default [
  // 1 · Die Mitte
  [
    // Einstieg: die Mitte zwischen 0 und einer geraden Zahl
    () => {
      const b = 2 * rnd(1, 4)
      return {
        code: lines('links = 0', `rechts = ${b}`, 'mitte = (links + rechts) // 2', 'print(mitte)'),
        answer: out(b / 2),
        distractors: [b, b / 2 + 1, b / 2 - 1, float(b / 2)],
      }
    },
    // bei ungerader Summe wird abgerundet
    () => {
      const a = rnd(0, 8), b = a + rnd(1, 9)
      const m = Math.floor((a + b) / 2)
      return {
        code: lines(`links = ${a}`, `rechts = ${b}`, 'mitte = (links + rechts) // 2', 'print(mitte)'),
        answer: out(m),
        distractors: [float((a + b) / 2), m + 1, Math.floor((b - a) / 2), a + b],
      }
    },
    () => {
      const zahlen = sortierteListe(rnd(5, 8))
      const m = Math.floor((zahlen.length - 1) / 2)
      return {
        code: lines(
          `zahlen = ${lit(zahlen)}`,
          'links = 0',
          'rechts = len(zahlen) - 1',
          'mitte = (links + rechts) // 2',
          'print(mitte, zahlen[mitte])',
        ),
        answer: out(m, zahlen[m]),
        distractors: [
          out(m + 1, zahlen[m + 1]),
          out(m, zahlen[m + 1]),
          out(zahlen[m], m),
          out(m - 1, zahlen[m - 1]),
          out(zahlen.length / 2, zahlen[m]),
        ],
      }
    },
    () => {
      const zahlen = sortierteListe(7)
      const [links, rechts] = pick([[0, 6], [0, 2], [4, 6], [2, 6], [0, 4]])
      const m = Math.floor((links + rechts) / 2)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, `links = ${links}`, `rechts = ${rechts}`, 'print(zahlen[(links + rechts) // 2])'),
        answer: out(zahlen[m]),
        distractors: [zahlen[m + 1], m, zahlen[m - 1] ?? zahlen[6], zahlen[3] === zahlen[m] ? zahlen[0] : zahlen[3]],
      }
    },
  ],

  // 2 · Ein Schritt
  [
    // Einstieg: in welcher Hälfte geht es weiter?
    () => {
      const zahlen = sortierteListe(7)
      const mitte = 3
      const gesucht = pick(zahlen.filter((_, i) => i !== mitte))
      const rechtsWeiter = zahlen[mitte] < gesucht
      return {
        code: lines(
          `zahlen = ${lit(zahlen)}`,
          `gesucht = ${gesucht}`,
          'mitte = 3',
          'if zahlen[mitte] < gesucht:',
          '    print("rechts weiter")',
          'else:',
          '    print("links weiter")',
        ),
        answer: rechtsWeiter ? 'rechts weiter' : 'links weiter',
        distractors: [rechtsWeiter ? 'links weiter' : 'rechts weiter', 'gefunden', out(zahlen[mitte]), out(gesucht)],
      }
    },
    () => {
      const zahlen = sortierteListe(7)
      const mitte = 3
      const gesucht = pick(zahlen.filter((_, i) => i !== mitte))
      const rechtsWeiter = zahlen[mitte] < gesucht
      const [links, rechts] = rechtsWeiter ? [mitte + 1, 6] : [0, mitte - 1]
      return {
        code: lines(
          `zahlen = ${lit(zahlen)}`,
          `gesucht = ${gesucht}`,
          'links = 0',
          'rechts = len(zahlen) - 1',
          'mitte = (links + rechts) // 2',
          'if zahlen[mitte] < gesucht:',
          '    links = mitte + 1',
          'else:',
          '    rechts = mitte - 1',
          'print(links, rechts)',
        ),
        answer: out(links, rechts),
        distractors: [
          rechtsWeiter ? out(0, mitte - 1) : out(mitte + 1, 6),
          rechtsWeiter ? out(mitte, 6) : out(0, mitte),
          out(0, 6),
          rechtsWeiter ? out(zahlen[mitte + 1], zahlen[6]) : out(zahlen[0], zahlen[mitte - 1]),
        ],
      }
    },
    () => {
      const zahlen = sortierteListe(7, 40)
      const gesucht = pick(zahlen.filter((_, i) => i !== 3))
      const rest = zahlen[3] < gesucht ? zahlen.slice(4) : zahlen.slice(0, 3)
      const andere = zahlen[3] < gesucht ? zahlen.slice(0, 3) : zahlen.slice(4)
      return {
        code: lines(
          `zahlen = ${lit(zahlen)}`,
          `gesucht = ${gesucht}`,
          'links = 0',
          'rechts = 6',
          'mitte = 3',
          'if zahlen[mitte] < gesucht:',
          '    links = mitte + 1',
          'else:',
          '    rechts = mitte - 1',
          'print(zahlen[links:rechts + 1])',
        ),
        answer: pyRepr(rest),
        distractors: [
          pyRepr(andere),
          pyRepr(zahlen[3] < gesucht ? zahlen.slice(3) : zahlen.slice(0, 4)),
          pyRepr([gesucht]),
          pyRepr(zahlen[3] < gesucht ? zahlen.slice(4, 6) : zahlen.slice(0, 2)),
        ],
      }
    },
  ],

  // 3 · Schritte zählen
  [
    // Einstieg: an welcher Stelle steckt die Zahl?
    () => {
      const zahlen = sortierteListe(7, 90)
      const gesucht = pick(zahlen)
      const { position } = binaer(zahlen, gesucht)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, `gesucht = ${gesucht}`, ...SUCHE, 'print(position)'),
        answer: out(position),
        distractors: [position + 1, gesucht, -1, position - 1],
      }
    },
    () => {
      const zahlen = sortierteListe(rnd(7, 10), 90)
      const gesucht = pick(zahlen)
      const { position, schritte } = binaer(zahlen, gesucht)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, `gesucht = ${gesucht}`, ...SUCHE, 'print(schritte)'),
        answer: out(schritte),
        distractors: [position + 1, schritte + 1, schritte - 1, position],
      }
    },
    () => {
      const zahlen = sortierteListe(7, 90).map((z) => z * 2)
      const gesucht = pick([1, zahlen[2] + 1, zahlen[4] - 1, 199])
      const { schritte } = binaer(zahlen, gesucht)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, `gesucht = ${gesucht}`, ...SUCHE, 'print(position, schritte)'),
        answer: out(-1, schritte),
        distractors: [out(-1, 7), out(-1, schritte + 1), out(0, schritte), out(-1, 0)],
      }
    },
  ],
]
