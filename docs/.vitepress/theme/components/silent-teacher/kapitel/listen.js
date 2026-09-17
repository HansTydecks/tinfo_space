// Aufgaben je Level von leicht nach schwer.
import { ERROR, rnd, pick, sample, rndDistinct, lit, out, lines, pyRepr } from '../engine.js'

const EINKAUF = ['Milch', 'Brot', 'Eier', 'Käse', 'Obst', 'Tee', 'Reis']
const NAMEN = ['Ada', 'Alan', 'Grace', 'Linus', 'Hedy']

const summe = (zahlen) => zahlen.reduce((a, b) => a + b, 0)

export default [
  // 1 · Zugriff per Index
  [
    // Einstieg: das erste Element
    () => {
      const zahlen = rndDistinct(1, 9, 3)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, 'print(zahlen[0])'),
        answer: out(zahlen[0]),
        distractors: [zahlen[1], zahlen[2], pyRepr(zahlen), 0],
      }
    },
    () => {
      const n = rnd(3, 6)
      const liste = sample(EINKAUF, n)
      return {
        code: lines(`einkauf = ${lit(liste)}`, 'print(len(einkauf))'),
        answer: out(n),
        distractors: [n - 1, n + 1, liste.join('').length, 1],
      }
    },
    () => {
      const noten = rndDistinct(1, 6, 5)
      const i = rnd(1, 4)
      return {
        code: lines(`noten = ${lit(noten)}`, `print(noten[${i}])`),
        answer: out(noten[i]),
        distractors: [noten[i - 1], noten[(i + 1) % 5], i, noten[0]],
      }
    },
    () => {
      const zahlen = rndDistinct(1, 9, 4)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, 'print(zahlen[0], zahlen[-1])'),
        answer: out(zahlen[0], zahlen[3]),
        distractors: [out(zahlen[1], zahlen[3]), out(zahlen[0], zahlen[2]), out(zahlen[3], zahlen[0]), out(0, -1)],
      }
    },
    () => {
      const noten = rndDistinct(1, 9, 5)
      const k = rnd(2, 3)
      return {
        code: lines(`noten = ${lit(noten)}`, `print(noten[-${k}])`),
        answer: out(noten.at(-k)),
        distractors: [noten[k], noten[k - 1], noten.at(-k - 1), -k, noten.at(-k + 1) ?? noten[0]],
      }
    },
    () => {
      const zahlen = rndDistinct(1, 9, 4)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, 'print(zahlen[len(zahlen)])'),
        answer: ERROR,
        distractors: [zahlen[3], zahlen[0], 4, 'None', zahlen[2]],
      }
    },
  ],

  // 2 · Listen verändern
  [
    // Einstieg: ein Element mehr
    () => {
      const zahlen = rndDistinct(1, 9, rnd(2, 4))
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, 'zahlen.append(zahlen[0])', 'print(len(zahlen))'),
        answer: out(zahlen.length + 1),
        distractors: [zahlen.length, zahlen.length + zahlen[0], zahlen[0], zahlen.length + 2],
      }
    },
    () => {
      const [a, b, c, neu] = sample(EINKAUF, 4)
      const i = rnd(0, 2)
      const alt = [a, b, c]
      const mit = (j) => alt.map((x, k) => (k === j ? neu : x))
      return {
        code: lines(`einkauf = ${lit(alt)}`, `einkauf[${i}] = ${lit(neu)}`, 'print(einkauf)'),
        answer: pyRepr(mit(i)),
        distractors: [pyRepr(mit((i + 1) % 3)), pyRepr(mit((i + 2) % 3)), pyRepr([...alt, neu]), pyRepr(alt)],
      }
    },
    () => {
      const [x, y, z] = rndDistinct(1, 9, 3)
      return {
        code: lines(`zahlen = ${lit([x, y, z])}`, 'zahlen[0] = zahlen[0] + zahlen[2]', 'print(zahlen)'),
        answer: pyRepr([x + z, y, z]),
        distractors: [pyRepr([x + y, y, z]), pyRepr([x, y, x + z]), pyRepr([x, y, z, x + z]), pyRepr([x + z, y])],
      }
    },
    () => {
      const [a, b, c, neu] = sample(EINKAUF, 4)
      const weg = pick([a, b, c])
      const alt = [a, b, c]
      const ohne = alt.filter((x) => x !== weg)
      return {
        code: lines(`einkauf = ${lit(alt)}`, `einkauf.append(${lit(neu)})`, `einkauf.remove(${lit(weg)})`, 'print(einkauf)'),
        answer: pyRepr([...ohne, neu]),
        distractors: [pyRepr([...alt, neu]), pyRepr([neu, ...ohne]), pyRepr(ohne), pyRepr([...ohne, neu, weg])],
      }
    },
  ],

  // 3 · Listen auswerten
  [
    // Einstieg: alles aufaddieren
    () => {
      const preise = Array.from({ length: 4 }, () => rnd(1, 9))
      return {
        code: lines(`preise = ${lit(preise)}`, 'summe = 0', 'for p in preise:', '    summe += p', 'print(summe)'),
        answer: out(summe(preise)),
        distractors: [summe(preise) - preise[3], preise[3], preise.join(''), 4],
      }
    },
    () => {
      const zahlen = rndDistinct(1, 9, 3)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, 'neu = []', 'for z in zahlen:', '    neu.append(z * 10)', 'print(neu)'),
        answer: pyRepr(zahlen.map((z) => z * 10)),
        distractors: [pyRepr(zahlen), pyRepr([zahlen[2] * 10]), pyRepr(zahlen.map((z) => z * 10).reverse()), '[]'],
      }
    },
    () => {
      const zahlen = rndDistinct(1, 9, rnd(3, 5))
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, 'print(max(zahlen), len(zahlen))'),
        answer: out(Math.max(...zahlen), zahlen.length),
        distractors: [
          out(Math.min(...zahlen), zahlen.length),
          out(Math.max(...zahlen), zahlen.length - 1),
          out(zahlen.at(-1), zahlen.length),
          out(zahlen.length, Math.max(...zahlen)),
          out(Math.max(...zahlen), zahlen.length + 1),
          out(summe(zahlen), zahlen.length),
        ],
      }
    },
    () => {
      const zahlen = Array.from({ length: 5 }, () => rnd(1, 9))
      const gerade = zahlen.filter((z) => z % 2 === 0).length
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, 'gerade = 0', 'for z in zahlen:', '    if z % 2 == 0:', '        gerade += 1', 'print(gerade)'),
        answer: out(gerade),
        distractors: [5 - gerade, summe(zahlen.filter((z) => z % 2 === 0)), gerade + 1, 0],
      }
    },
    () => {
      const namen = sample(NAMEN, 2)
      return {
        code: lines(`namen = ${lit(namen)}`, 'for i in range(len(namen)):', '    print(i + 1, namen[i])'),
        answer: lines(out(1, namen[0]), out(2, namen[1])),
        distractors: [
          lines(out(0, namen[0]), out(1, namen[1])),
          lines(out(1, namen[1]), out(2, namen[0])),
          lines(namen[0], namen[1]),
          lines(out(1, 'namen[i]'), out(2, 'namen[i]')),
        ],
      }
    },
  ],

  // 4 · Slicing
  [
    // Einstieg: die ersten k Elemente
    () => {
      const zahlen = rndDistinct(1, 9, 6)
      const k = rnd(2, 4)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, `print(zahlen[:${k}])`),
        answer: pyRepr(zahlen.slice(0, k)),
        distractors: [pyRepr(zahlen.slice(0, k + 1)), pyRepr(zahlen.slice(k)), pyRepr(zahlen.slice(-k)), pyRepr(zahlen.slice(0, k - 1))],
      }
    },
    () => {
      const zahlen = rndDistinct(1, 9, 6)
      const a = rnd(1, 3), b = a + rnd(2, 3)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, `print(zahlen[${a}:${b}])`),
        answer: pyRepr(zahlen.slice(a, b)),
        distractors: [pyRepr(zahlen.slice(a, b + 1)), pyRepr(zahlen.slice(a - 1, b)), pyRepr(zahlen.slice(a + 1, b + 1)), pyRepr([zahlen[a], zahlen[b]])],
      }
    },
    () => {
      const zahlen = rndDistinct(1, 9, 6)
      const k = rnd(2, 3)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, `print(zahlen[-${k}:])`),
        answer: pyRepr(zahlen.slice(-k)),
        distractors: [pyRepr(zahlen.slice(0, k)), pyRepr(zahlen.slice(-k - 1)), pyRepr(zahlen.slice(-k).reverse()), pyRepr(zahlen.slice(0, -k))],
      }
    },
    () => {
      const zahlen = rndDistinct(1, 9, 6)
      const a = rnd(0, 2), b = a + rnd(1, 4)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, `print(len(zahlen[${a}:${b}]))`),
        answer: out(b - a),
        distractors: [b - a + 1, b, 6 - a, summe(zahlen.slice(a, b))],
      }
    },
  ],
]
