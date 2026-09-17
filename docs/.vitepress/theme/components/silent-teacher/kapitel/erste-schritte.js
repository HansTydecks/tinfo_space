// Aufgaben je Level von leicht nach schwer.
import { ERROR, rnd, pick, rndDistinct, out } from '../engine.js'

const NAMEN = ['a', 'b', 'x', 'y', 'zahl', 'punkte']

export default [
  // 1 · Mit Variablen rechnen
  [
    // Einstieg: eine Variable ausgeben
    () => {
      const v = pick(NAMEN)
      const x = rnd(1, 20)
      return {
        code: `${v} = ${x}\nprint(${v})`,
        answer: out(x),
        distractors: [v, `"${v}"`, `${v} = ${x}`, x + 1],
      }
    },
    () => {
      const v = pick(NAMEN)
      const x = rnd(1, 9), y = rnd(1, 9)
      return {
        code: `${v} = ${x}\nprint(${v} + ${y})`,
        answer: out(x + y),
        distractors: [`${v} + ${y}`, x, `${x}${y}`, x * y],
      }
    },
    () => {
      const [x, y] = rndDistinct(2, 9, 2)
      return {
        code: `a = ${x}\nb = ${y}\nprint(a * b)`,
        answer: out(x * y),
        distractors: [x + y, 'ab', `${x}${y}`, 'a * b', x * y + x],
      }
    },
    () => {
      const preis = rnd(2, 9), anzahl = rnd(2, 5)
      return {
        code: `preis = ${preis}\nanzahl = ${anzahl}\ngesamt = preis * anzahl\nprint(gesamt)`,
        answer: out(preis * anzahl),
        distractors: ['gesamt', preis + anzahl, 'preis * anzahl', `${preis}${anzahl}`],
      }
    },
    // Anführungszeichen machen aus dem Namen einen Text
    () => {
      const v = pick(['a', 'x', 'name', 'zahl'])
      const x = rnd(1, 9)
      return {
        code: `${v} = ${x}\nprint("${v}")`,
        answer: v,
        distractors: [x, `"${v}"`, `${v} = ${x}`, 'None'],
      }
    },
  ],

  // 2 · Werte überschreiben
  [
    // Einstieg: der zweite Wert gewinnt
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      return {
        code: `a = ${x}\na = ${y}\nprint(a)`,
        answer: out(y),
        distractors: [x, x + y, out(x, y), `${x}${y}`],
      }
    },
    () => {
      const x = rnd(1, 9), y = rnd(1, 5)
      return {
        code: `a = ${x}\na = a + ${y}\nprint(a)`,
        answer: out(x + y),
        distractors: [x, y, `a + ${y}`, x + 2 * y],
      }
    },
    () => {
      const start = rnd(0, 5), n = rnd(2, 4)
      return {
        code: `zaehler = ${start}\n` + 'zaehler = zaehler + 1\n'.repeat(n) + 'print(zaehler)',
        answer: out(start + n),
        distractors: [start + 1, start, n, start + n + 1],
      }
    },
    () => {
      const x = rnd(2, 6), d = rnd(1, 3)
      const erst = pick(['mal', 'minus'])
      const code = erst === 'mal'
        ? `a = ${x}\na = a * 2\na = a - ${d}\nprint(a)`
        : `a = ${x}\na = a - ${d}\na = a * 2\nprint(a)`
      const erg = erst === 'mal' ? x * 2 - d : (x - d) * 2
      const anders = erst === 'mal' ? (x - d) * 2 : x * 2 - d
      return {
        code,
        answer: out(erg),
        distractors: [anders, x * 2, x - d, x],
      }
    },
  ],

  // 3 · Zwei Variablen
  [
    // Einstieg: eine Variable kopieren
    () => {
      const x = rnd(1, 20)
      return {
        code: `a = ${x}\nb = a\nprint(b)`,
        answer: out(x),
        distractors: ['a', 'b', x + 1, 'None'],
      }
    },
    // die Kopie bleibt, auch wenn das Original sich ändert
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      return {
        code: `a = ${x}\nb = a\na = ${y}\nprint(b)`,
        answer: out(x),
        distractors: [y, 'a', x + y, 'None'],
      }
    },
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      return {
        code: `a = ${x}\nb = ${y}\na = b\nprint(a, b)`,
        answer: out(y, y),
        distractors: [out(x, y), out(y, x), out(x, x), out('b', y)],
      }
    },
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      return {
        code: `a = ${x}\nb = ${y}\na = b\nb = a\nprint(a, b)`,
        answer: out(y, y),
        distractors: [out(y, x), out(x, y), out(x, x), out(x + y, y)],
      }
    },
    () => {
      const x = rnd(1, 9)
      return {
        code: `a = ${x}\nprint(a + b)`,
        answer: ERROR,
        distractors: [x, 0, `${x}b`, 'a + b', 'None'],
      }
    },
    () => {
      const [falsch, name] = pick([['Name', 'Mia'], ['Alter', '16'], ['Punkte', '42']])
      const variable = falsch.toLowerCase()
      const wert = /^\d+$/.test(name) ? name : `"${name}"`
      return {
        code: `${variable} = ${wert}\nprint(${falsch})`,
        answer: ERROR,
        distractors: [name, falsch, variable, 'None', `"${name}"`],
      }
    },
    () => {
      const x = rnd(1, 9)
      return {
        code: `print(alter)\nalter = ${x}`,
        answer: ERROR,
        distractors: [x, 'alter', 0, 'None'],
      }
    },
  ],
]
