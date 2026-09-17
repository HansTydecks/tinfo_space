// Die Aufgaben jedes Levels stehen von leicht nach schwer: Die erste ist der Einstieg,
// die weiteren werden nach und nach freigeschaltet (siehe engine.js → freigeschaltet).
import { ERROR, rnd, pick, sample, lit, out, float, pyRepr } from '../engine.js'

const cls = (name) => `<class '${name}'>`
const TYPEN = ['int', 'float', 'str', 'bool']
const andere = (typ) => TYPEN.filter((t) => t !== typ).map(cls)

// Wörter ohne doppelte Buchstaben, damit falsche Antworten eindeutig bleiben
const WOERTER = ['Katze', 'Python', 'Tiger', 'Blume', 'Wolke', 'Zucker', 'Fisch', 'Mond', 'Hund', 'Brot']
const LISTEN = [
  ['rot', 'grün', 'blau', 'gelb'],
  ['Pizza', 'Pasta', 'Pommes', 'Salat'],
  ['Hund', 'Katze', 'Maus', 'Pferd'],
  ['Mo', 'Di', 'Mi', 'Do'],
]

export default [
  // 1 · Welcher Typ?
  [
    // Einstieg: nur ganze Zahl oder Text
    () => {
      const [wert, typ] = pick([
        [String(rnd(1, 99)), 'int'],
        [`"${pick(WOERTER)}"`, 'str'],
      ])
      return { code: `print(type(${wert}))`, answer: cls(typ), distractors: andere(typ) }
    },
    // dazu Kommazahlen und Wahrheitswerte
    () => {
      const [wert, typ] = pick([
        [`${rnd(1, 20)}.${rnd(1, 9)}`, 'float'],
        [pick(['True', 'False']), 'bool'],
        [String(rnd(1, 99)), 'int'],
      ])
      return { code: `print(type(${wert}))`, answer: cls(typ), distractors: andere(typ) }
    },
    // Anführungszeichen und der Punkt entscheiden
    () => {
      const a = rnd(1, 99)
      const b = rnd(1, 9)
      const [wert, typ] = pick([
        [`"${a}"`, 'str'],
        [`"${a}.${b}"`, 'str'],
        [`${a}.0`, 'float'],
        [`"${pick(['True', 'False'])}"`, 'str'],
      ])
      return { code: `print(type(${wert}))`, answer: cls(typ), distractors: andere(typ) }
    },
    // Ausdrücke: erst rechnen, dann den Typ bestimmen
    () => {
      const a = rnd(2, 9)
      const b = rnd(1, 9)
      const [ausdruck, typ] = pick([
        [`${a} + ${b}`, 'int'],
        [`${a} * ${b}`, 'int'],
        [`${a * b} / ${a}`, 'float'],
        [`${a} + ${b}.5`, 'float'],
        [`"${a}" + "${b}"`, 'str'],
        [`${a} == ${b}`, 'bool'],
        [`${a} < ${b}`, 'bool'],
      ])
      return { code: `print(type(${ausdruck}))`, answer: cls(typ), distractors: andere(typ) }
    },
  ],

  // 2 · Umwandeln
  [
    // Einstieg: Text wird zur Zahl
    () => {
      const a = rnd(2, 30)
      return {
        code: `text = "${a}"\nzahl = int(text)\nprint(zahl)`,
        answer: out(a),
        distractors: [`"${a}"`, `'${a}'`, a + 1, 'text'],
      }
    },
    () => {
      const a = rnd(1, 9)
      const b = rnd(1, 9)
      return {
        code: `print("${a}" + "${b}")`,
        answer: `${a}${b}`,
        distractors: [a + b, `${a} ${b}`, `${b}${a}`, `"${a}${b}"`],
      }
    },
    () => {
      const a = rnd(2, 20)
      const b = rnd(1, 9)
      return {
        code: `text = "${a}"\nzahl = int(text)\nprint(zahl + ${b})`,
        answer: out(a + b),
        distractors: [`${a}${b}`, a + b + 1, a * b, `${a} + ${b}`],
      }
    },
    () => {
      const a = rnd(1, 20)
      const b = pick([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => x !== a))
      return {
        code: `print(str(${a}) + str(${b}))`,
        answer: `${a}${b}`,
        distractors: [a + b, `${a} ${b}`, `${b}${a}`, a * b],
      }
    },
    () => {
      const a = rnd(1, 9)
      const d = rnd(1, 9)
      return {
        code: `print(int(${a}.${d}))`,
        answer: out(a),
        distractors: [a + 1, `${a}.${d}`, `${a}.0`, d],
      }
    },
    () => {
      const a = rnd(1, 9)
      const b = rnd(1, 9)
      return {
        code: `print(float("${a}") + ${b})`,
        answer: out(float(a + b)),
        distractors: [a + b, `${a}${b}`, `${a}.0${b}`, `${a}.${b}`],
      }
    },
    () => {
      const a = rnd(1, 9)
      const b = rnd(1, 9)
      return {
        code: `print("${a}" + ${b})`,
        answer: ERROR,
        distractors: [a + b, `${a}${b}`, `${a} ${b}`, `${b}${a}`, `${a}+${b}`],
      }
    },
    () => {
      const a = rnd(1, 9)
      const d = rnd(1, 9)
      return {
        code: `print(int("${a}.${d}"))`,
        answer: ERROR,
        distractors: [a, a + 1, `${a}.${d}`, `${a}.0`, d],
      }
    },
  ],

  // 3 · Zeichen und Elemente
  [
    // Einstieg: das erste Zeichen
    () => {
      const w = pick(WOERTER)
      return {
        code: `wort = ${lit(w)}\nprint(wort[0])`,
        answer: w[0],
        distractors: [w[1], w.at(-1), w, `${w}[0]`],
      }
    },
    () => {
      const w = pick(WOERTER)
      return {
        code: `wort = ${lit(w)}\nprint(len(wort))`,
        answer: out(w.length),
        distractors: [w.length - 1, w.length + 1, w, 1],
      }
    },
    () => {
      const w = pick(WOERTER)
      const i = rnd(1, w.length - 2)
      return {
        code: `wort = ${lit(w)}\nprint(wort[${i}])`,
        answer: w[i],
        distractors: [w[i - 1], w[i + 1], w[0], w.at(-1), i],
      }
    },
    () => {
      const w = pick(WOERTER)
      const k = rnd(1, 2)
      return {
        code: `wort = ${lit(w)}\nprint(wort[-${k}])`,
        answer: w.at(-k),
        distractors: [w[k - 1], w.at(-k - 1), w[0], w.at(-1), `${w}[-${k}]`],
      }
    },
    () => {
      const liste = sample(pick(LISTEN), 3)
      const i = rnd(0, 2)
      return {
        code: `werte = ${lit(liste)}\nprint(werte[${i}])`,
        answer: liste[i],
        distractors: [...liste.filter((_, j) => j !== i), `'${liste[i]}'`, i],
      }
    },
    () => {
      const w = pick(WOERTER)
      const k = rnd(2, w.length - 1)
      return {
        code: `wort = ${lit(w)}\nprint(wort[0:${k}])`,
        answer: w.slice(0, k),
        distractors: [w.slice(0, k + 1), w.slice(0, k - 1), w.slice(1, k + 1), w.slice(k)],
      }
    },
    () => {
      const [a, b, c, neu] = sample(pick(LISTEN), 4)
      const i = rnd(0, 2)
      const liste = [a, b, c]
      const ergebnis = liste.map((x, j) => (j === i ? neu : x))
      const falsch = liste.map((x, j) => (j === i + 1 ? neu : x))
      return {
        code: `werte = ${lit(liste)}\nwerte[${i}] = ${lit(neu)}\nprint(werte)`,
        answer: pyRepr(ergebnis),
        distractors: [
          pyRepr(liste),
          pyRepr(falsch),
          pyRepr([...liste, neu]),
          pyRepr(liste.map((x, j) => (j === i - 1 ? neu : x))),
          pyRepr([neu, ...liste]),
        ],
      }
    },
    () => {
      const w = pick(WOERTER)
      return {
        code: `wort = ${lit(w)}\nprint(wort[${w.length}])`,
        answer: ERROR,
        distractors: [w.at(-1), w.at(-2), w[0], w.length, 'None'],
      }
    },
    () => {
      const w = pick(WOERTER)
      const i = rnd(0, w.length - 1)
      const neu = w[i] === 'x' ? 'y' : 'x'
      return {
        code: `wort = ${lit(w)}\nwort[${i}] = "${neu}"\nprint(wort)`,
        answer: ERROR,
        distractors: [w.slice(0, i) + neu + w.slice(i + 1), w, w + neu, neu + w, neu],
      }
    },
  ],
]
