// Aufgaben je Level von leicht nach schwer.
import { ERROR, rnd, pick, sample, rndDistinct, lit, out, float, pyRepr, zweiBools } from '../engine.js'

const WOERTER = ['Katze', 'Python', 'Tiger', 'Blume', 'Wolke', 'Schule']

// [Wort, Buchstabe, Ersatz] – der Buchstabe kommt mehrfach vor, nie als Großbuchstabe
const ERSETZEN = [
  ['Banane', 'a', 'o'],
  ['Kakao', 'a', 'e'],
  ['Hallo', 'l', 't'],
  ['Otto', 't', 'b'],
  ['Rollerblade', 'l', 'n'],
]
// hier zählt die Groß-/Kleinschreibung mit: der Buchstabe kommt auch als Großbuchstabe vor
const GROSS_FALLE = [['Ananas', 'a'], ['Mama', 'm'], ['Otto', 'o'], ['Tomate', 't']]

const replaceFirst = (s, a, b) => s.replace(a, b)
const replaceAll = (s, a, b) => s.split(a).join(b)
const replaceIgnoreCase = (s, a, b) => s.replace(new RegExp(a, 'gi'), b)
const countOf = (s, c) => s.split(c).length - 1

export default [
  // 1 · String-Methoden
  [
    // Einstieg: groß und klein schreiben
    () => {
      const w = pick(WOERTER)
      const [methode, ergebnis] = pick([['upper', w.toUpperCase()], ['lower', w.toLowerCase()]])
      return {
        code: `wort = ${lit(w)}\nprint(wort.${methode}())`,
        answer: ergebnis,
        distractors: [w, methode === 'upper' ? w.toLowerCase() : w.toUpperCase(), ergebnis[0], `${w}.${methode}()`],
      }
    },
    () => {
      const [w, a] = pick(ERSETZEN)
      const n = countOf(w, a)
      return {
        code: `text = ${lit(w)}\nprint(text.count("${a}"))`,
        answer: out(n),
        distractors: [n + 1, n - 1, w.indexOf(a), w.length],
      }
    },
    () => {
      const [w, a, b] = pick(ERSETZEN)
      return {
        code: `text = ${lit(w)}\nprint(text.replace("${a}", "${b}"))`,
        answer: replaceAll(w, a, b),
        distractors: [replaceFirst(w, a, b), w, replaceAll(w, b, a) === w ? `${w}${b}` : replaceAll(w, b, a), b, `${w}${b}`],
      }
    },
    () => {
      const w = pick(WOERTER)
      const i = rnd(1, w.length - 1)
      return {
        code: `wort = ${lit(w)}\nprint(wort.find("${w[i]}"))`,
        answer: out(i),
        distractors: [i + 1, i - 1, -1, w[i]],
      }
    },
    () => {
      const w = pick(WOERTER)
      const links = rnd(1, 3), rechts = rnd(1, 3)
      return {
        code: `wort = "${' '.repeat(links)}${w}${' '.repeat(rechts)}"\nprint(len(wort.strip()))`,
        answer: out(w.length),
        distractors: [w.length + links + rechts, w.length + links, w.length + rechts, w.length - 1],
      }
    },
    () => {
      const w = pick(WOERTER)
      const fehlt = pick(['x', 'q', 'j', 'v'])
      return {
        code: `wort = ${lit(w)}\nprint(wort.find("${fehlt}"))`,
        answer: out(-1),
        distractors: [0, 'None', w.length, 'False'],
      }
    },
    // Groß- und Kleinbuchstaben sind verschiedene Zeichen
    () => {
      const [w, a] = pick(GROSS_FALLE)
      const n = countOf(w, a)
      return {
        code: `text = ${lit(w)}\nprint(text.count("${a}"), text.lower().count("${a}"))`,
        answer: out(n, countOf(w.toLowerCase(), a)),
        distractors: [
          out(countOf(w.toLowerCase(), a), n),
          out(n, n),
          out(countOf(w.toLowerCase(), a), countOf(w.toLowerCase(), a)),
          out(n + 1, n),
        ],
      }
    },
  ],

  // 2 · Zerlegen mit split
  [
    // Einstieg: das erste Wort herausholen
    () => {
      const woerter = sample(['Der', 'kleine', 'Hund', 'bellt', 'laut'], 3)
      return {
        code: `satz = ${lit(woerter.join(' '))}\nteile = satz.split()\nprint(teile[0])`,
        answer: woerter[0],
        distractors: [woerter[1], woerter[2], `'${woerter[0]}'`, woerter.join(' ')],
      }
    },
    () => {
      const woerter = sample(['Der', 'kleine', 'Hund', 'bellt', 'laut', 'heute', 'nicht'], rnd(3, 5))
      const text = woerter.join(' ')
      return {
        code: `satz = ${lit(text)}\nteile = satz.split()\nprint(len(teile))`,
        answer: out(woerter.length),
        distractors: [text.length, woerter.length - 1, 1, woerter.length + 1],
      }
    },
    () => {
      const woerter = sample(['Der', 'kleine', 'Hund', 'bellt', 'laut', 'heute'], 3)
      const text = woerter.join(' ')
      const i = rnd(1, 2)
      return {
        code: `satz = ${lit(text)}\nwoerter = satz.split(" ")\nprint(woerter[${i}])`,
        answer: woerter[i],
        distractors: [text[i], woerter[(i + 1) % 3], woerter[(i + 2) % 3], `'${woerter[i]}'`],
      }
    },
    () => {
      const h = rnd(7, 18), m = pick([10, 15, 20, 30, 45, 50])
      const i = rnd(0, 1)
      return {
        code: `zeit = "${h}:${m}"\nprint(zeit.split(":")[${i}])`,
        answer: [String(h), String(m)][i],
        distractors: [[String(h), String(m)][1 - i], `${h}:${m}`[i], pyRepr([String(h), String(m)]), `${h}${m}`],
      }
    },
    () => {
      const teile = sample(['rot', 'grün', 'blau', 'gelb', 'lila'], 3)
      const sep = pick(['-', ',', ';'])
      const text = teile.join(sep)
      return {
        code: `text = ${lit(text)}\nprint(text.split("${sep}"))`,
        answer: pyRepr(teile),
        distractors: [pyRepr([text]), `[${teile.join(', ')}]`, pyRepr(text.split('')).slice(0, 38), pyRepr([teile[0], teile[2]]), teile.join(' ')],
      }
    },
  ],

  // 3 · Listen-Methoden
  [
    // Einstieg: hinten anhängen
    () => {
      const [a, b, c] = rndDistinct(1, 9, 3)
      return {
        code: `zahlen = [${a}, ${b}]\nzahlen.append(${c})\nprint(zahlen)`,
        answer: pyRepr([a, b, c]),
        distractors: [pyRepr([c, a, b]), pyRepr([a, b]), `[${a}, ${b}, [${c}]]`, pyRepr([a, c, b]), pyRepr([a, b + c])],
      }
    },
    () => {
      let zahlen
      do zahlen = rndDistinct(1, 9, 4)
      while (zahlen.every((z, i) => i === 0 || zahlen[i - 1] < z))
      const sortiert = [...zahlen].sort((x, y) => x - y)
      const fastSortiert = [sortiert[0], sortiert[2], sortiert[1], sortiert[3]]
      return {
        code: `zahlen = ${pyRepr(zahlen)}\nzahlen.sort()\nprint(zahlen)`,
        answer: pyRepr(sortiert),
        distractors: [pyRepr(zahlen), pyRepr([...sortiert].reverse()), pyRepr([...zahlen].reverse()), pyRepr(fastSortiert), 'None'],
      }
    },
    () => {
      const liste = rndDistinct(10, 40, 4)
      const i = rnd(0, 3)
      return {
        code: `zahlen = ${pyRepr(liste)}\nprint(zahlen.index(${liste[i]}))`,
        answer: out(i),
        distractors: [i + 1, liste[i], -1, 4],
      }
    },
    () => {
      const [a, b, c] = rndDistinct(1, 9, 3)
      const vorne = Math.random() < 0.4
      const rest = vorne ? [b, c] : [a, b]
      return {
        code: `zahlen = [${a}, ${b}, ${c}]\nx = zahlen.pop(${vorne ? 0 : ''})\nprint(x, zahlen)`,
        answer: out(vorne ? a : c, rest),
        distractors: [
          out(vorne ? c : a, vorne ? [a, b] : [b, c]),
          out(vorne ? a : c, [a, b, c]),
          out(rest, vorne ? a : c),
          out(b, [a, c]),
        ],
      }
    },
    () => {
      const liste = sample(['Anna', 'Ben', 'Cem', 'Dana', 'Eli'], 3)
      const neu = pick(['Fin', 'Gus', 'Ida'])
      const pos = rnd(0, 2)
      const mit = (i) => [...liste.slice(0, i), neu, ...liste.slice(i)]
      return {
        code: `namen = ${lit(liste)}\nnamen.insert(${pos}, ${lit(neu)})\nprint(namen)`,
        answer: pyRepr(mit(pos)),
        distractors: [pyRepr(mit(pos + 1)), pyRepr(liste.map((n, i) => (i === pos ? neu : n))), pyRepr([...liste, neu]), pos > 0 ? pyRepr(mit(pos - 1)) : pyRepr(mit(3))],
      }
    },
    // remove entfernt nur das erste Vorkommen
    () => {
      const [a, b, x] = rndDistinct(1, 9, 3)
      const liste = [a, x, b, x]
      return {
        code: `zahlen = ${pyRepr(liste)}\nzahlen.remove(${x})\nprint(zahlen)`,
        answer: pyRepr([a, b, x]),
        distractors: [pyRepr([a, b]), pyRepr([a, x, b]), x < 4 ? pyRepr(liste.filter((_, i) => i !== x)) : pyRepr([x, b, x]), pyRepr(liste)],
      }
    },
    () => {
      const liste = rndDistinct(1, 9, 3)
      const fehlt = pick([0, 10, 12])
      return {
        code: `zahlen = ${pyRepr(liste)}\nzahlen.remove(${fehlt})\nprint(zahlen)`,
        answer: ERROR,
        distractors: [pyRepr(liste), pyRepr(liste.slice(0, 2)), pyRepr(liste.slice(1)), 'None', pyRepr([...liste, fehlt])],
      }
    },
  ],

  // 4 · Zufall und Runden
  [
    // Einstieg: runden auf ganze Zahlen
    () => {
      const a = rnd(0, 9), d = pick([1, 2, 3, 4, 6, 7, 8, 9])
      const gerundet = d > 5 ? a + 1 : a
      return {
        code: `print(round(${a}.${d}))`,
        answer: out(gerundet),
        distractors: [d > 5 ? a : a + 1, `${a}.${d}`, float(gerundet), d],
      }
    },
    // randint nimmt beide Grenzen mit
    () => {
      const n = rnd(1, 9)
      return {
        code: `import random\n\nprint(random.randint(${n}, ${n}))`,
        answer: out(n),
        distractors: [n + 1, n - 1, 0, 'None', n * 2],
      }
    },
    () => {
      const w = pick(['Kopf', 'Zahl', 'Stein', 'Papier'])
      const n = rnd(2, 4)
      return {
        code: `import random\n\nwahl = random.choice(${lit(Array(n).fill(w))})\nprint(wahl)`,
        answer: w,
        distractors: [pyRepr([w]), `'${w}'`, n, 'None', w[0]],
      }
    },
    () => {
      const a = rnd(0, 9), d = rnd(0, 9), e = pick([1, 2, 3, 4, 6, 7, 8, 9])
      const zehntel = a * 10 + d + (e > 5 ? 1 : 0)
      const gerundet = float(zehntel / 10)
      const andersrum = float((a * 10 + d + (e > 5 ? 0 : 1)) / 10)
      return {
        code: `print(round(${a}.${d}${e}, 1))`,
        answer: out(gerundet),
        distractors: [andersrum, `${a}.${d}${e}`, zehntel % 10 === 0 ? a + 1 : a, `${a}.${e}`],
      }
    },
    () => {
      const a = rnd(1, 5), b = a + rnd(2, 6)
      const [z1, z2] = pick([
        [[`x >= ${a}`, true], [`x > ${b}`, false]],
        [[`x <= ${b}`, true], [`x < ${a}`, false]],
        [[`x == ${b + 1}`, false], [`x != ${a - 1}`, true]],
      ])
      return {
        code: `import random\n\nx = random.randint(${a}, ${b})\nprint(${z1[0]}, ${z2[0]})`,
        ...zweiBools(z1[1], z2[1]),
      }
    },
    () => {
      const [z1, z2] = pick([
        [['x >= 0', true], ['x < 1', true]],
        [['x < 0', false], ['x >= 1', false]],
        [['x >= 0', true], ['x > 1', false]],
      ])
      return {
        code: `import random\n\nx = random.random()\nprint(${z1[0]}, ${z2[0]})`,
        ...zweiBools(z1[1], z2[1]),
      }
    },
  ],
]
