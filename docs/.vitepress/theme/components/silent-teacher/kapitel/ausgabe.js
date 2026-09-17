// Aufgaben je Level von leicht nach schwer.
import { ERROR, rnd, pick, sample, rndDistinct, out, lines, pyRepr } from '../engine.js'

const NAMEN = ['Tom', 'Lena', 'Mia', 'Ben', 'Ali']

export default [
  // 1 · Mehrere Werte
  [
    // Einstieg: zwei Zahlen, ein Leerzeichen dazwischen
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      return {
        code: `print(${x}, ${y})`,
        answer: out(x, y),
        distractors: [`${x}${y}`, `${x}, ${y}`, x + y, `(${x}, ${y})`],
      }
    },
    () => {
      const name = pick(NAMEN)
      return {
        code: `name = "${name}"\nprint("Hallo", name)`,
        answer: `Hallo ${name}`,
        distractors: ['Hallo name', `Hallo${name}`, `Hallo, ${name}`, `Hallo "${name}"`],
      }
    },
    () => {
      const a = rnd(2, 9), b = rnd(2, 9)
      return {
        code: `print("Summe:", ${a} + ${b})`,
        answer: `Summe: ${a + b}`,
        distractors: [`Summe: ${a} + ${b}`, `Summe:${a + b}`, `Summe: ${a}${b}`, `"Summe:" ${a + b}`],
      }
    },
    () => {
      const h = rnd(2, 5)
      return {
        code: `print(${h}, "Stunden =", ${h} * 60, "Minuten")`,
        answer: `${h} Stunden = ${h * 60} Minuten`,
        distractors: [`${h} Stunden = ${h} * 60 Minuten`, `${h}Stunden =${h * 60}Minuten`, `${h} Stunden = ${h}60 Minuten`, `${h} Stunden = 60 Minuten`],
      }
    },
    () => {
      const name = pick(NAMEN), p = rnd(10, 99)
      return {
        code: `name = "${name}"\npunkte = ${p}\nprint(name, "hat", punkte, "Punkte")`,
        answer: `${name} hat ${p} Punkte`,
        distractors: [`${name}hat${p}Punkte`, 'name hat punkte Punkte', `${name} hat punkte Punkte`, `${name}, hat, ${p}, Punkte`],
      }
    },
  ],

  // 2 · Plus bei Text
  [
    // Einstieg: Plus klebt Text zusammen
    () => {
      const [a, b] = pick([['Guten', 'Tag'], ['Haus', 'tür'], ['Fuß', 'ball'], ['Schul', 'hof']])
      return {
        code: `print("${a}" + "${b}")`,
        answer: `${a}${b}`,
        distractors: [`${a} ${b}`, `${a}+${b}`, `"${a}" + "${b}"`, `${b}${a}`],
      }
    },
    () => {
      const [a, b] = sample(['Anna', 'Bob', 'Emil', 'Olga'], 2)
      const mitLeer = Math.random() < 0.5
      return {
        code: `a = "${a}"\nb = "${b}"\nprint(a + ${mitLeer ? '" " + ' : ''}b)`,
        answer: mitLeer ? `${a} ${b}` : `${a}${b}`,
        distractors: [mitLeer ? `${a}${b}` : `${a} ${b}`, 'a + b', 'ab', `${a} + ${b}`],
      }
    },
    () => {
      const p = rnd(10, 99)
      return {
        code: `print("Punkte: " + str(${p}))`,
        answer: `Punkte: ${p}`,
        distractors: [`Punkte:${p}`, `Punkte: str(${p})`, `"Punkte: " + ${p}`, `Punkte: + ${p}`],
      }
    },
    // Text oder Zahl? Das Plus macht zwei verschiedene Dinge
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      return {
        code: `print("${x}" + "${y}", ${x} + ${y})`,
        answer: out(`${x}${y}`, x + y),
        distractors: [out(`${x}${y}`, `${x}${y}`), out(x + y, x + y), out(x + y, `${x}${y}`), out(`${x}${y}`, `${x} + ${y}`)],
      }
    },
    () => {
      const p = rnd(10, 99)
      return {
        code: `punkte = ${p}\nprint("Punkte: " + punkte)`,
        answer: ERROR,
        distractors: [`Punkte: ${p}`, `Punkte:${p}`, 'Punkte: punkte', `Punkte: + ${p}`, `Punkte: ${p + 1}`],
      }
    },
  ],

  // 3 · f-Strings
  [
    // Einstieg: ein Platzhalter
    () => {
      const name = pick(NAMEN)
      return {
        code: `name = "${name}"\nprint(f"Hallo {name}")`,
        answer: `Hallo ${name}`,
        distractors: ['Hallo {name}', 'Hallo name', `Hallo f{${name}}`, `f"Hallo ${name}"`],
      }
    },
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      return {
        code: `a = ${x}\nb = ${y}\nprint(f"{a}{b}")`,
        answer: `${x}${y}`,
        distractors: [x + y, `${x} ${y}`, '{a}{b}', `${y}${x}`],
      }
    },
    () => {
      const name = pick(NAMEN), alter = rnd(12, 19)
      return {
        code: `name = "${name}"\nalter = ${alter}\nprint(f"{name} ist {alter}")`,
        answer: `${name} ist ${alter}`,
        distractors: ['{name} ist {alter}', 'name ist alter', `${name} ist {alter}`, `f${name} ist ${alter}`],
      }
    },
    () => {
      const x = rnd(12, 19), d = rnd(2, 5)
      return {
        code: `alter = ${x}\nprint(f"In ${d} Jahren: {alter + ${d}}")`,
        answer: `In ${d} Jahren: ${x + d}`,
        distractors: [`In ${d} Jahren: {alter + ${d}}`, `In ${d} Jahren: ${x} + ${d}`, `In ${d} Jahren: ${x}${d}`, `In ${d} Jahren: ${x}`],
      }
    },
    () => {
      const [x, y] = rndDistinct(2, 9, 2)
      return {
        code: `a = ${x}\nb = ${y}\nprint(f"{a} * {b} = {a * b}")`,
        answer: `${x} * ${y} = ${x * y}`,
        distractors: [`a * b = ${x * y}`, `${x} * ${y} = a * b`, `${x * y} = ${x * y}`, `${x} * ${y} = ${x}${y}`],
      }
    },
    // ohne f bleiben die geschweiften Klammern stehen
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      return {
        code: `a = ${x}\nb = ${y}\nprint("{a} + {b}")`,
        answer: '{a} + {b}',
        distractors: [`${x} + ${y}`, x + y, 'a + b', `{${x}} + {${y}}`],
      }
    },
    () => {
      const preis = pick([0.25, 0.5, 1.25, 1.5, 2.5]), n = rnd(2, 4)
      const summe = preis * n
      return {
        code: `preis = ${preis}\nprint(f"Gesamt: {preis * ${n}:.2f} Euro")`,
        answer: `Gesamt: ${summe.toFixed(2)} Euro`,
        distractors: [`Gesamt: ${String(summe)} Euro`, `Gesamt: ${Math.round(summe)} Euro`, `Gesamt: ${summe.toFixed(1)} Euro`, `Gesamt: {preis * ${n}:.2f} Euro`],
      }
    },
  ],

  // 4 · sep und end
  [
    // Einstieg: sep="" lässt das Leerzeichen weg
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      return {
        code: `print(${x}, ${y}, sep="")`,
        answer: `${x}${y}`,
        distractors: [out(x, y), x + y, `${x}""${y}`, `${x},${y}`],
      }
    },
    () => {
      const [a, b, c] = sample(['a', 'b', 'c', 'x', 'y', 'z'], 3)
      const sep = pick(['-', '+', '/', '*'])
      return {
        code: `print("${a}", "${b}", "${c}", sep="${sep}")`,
        answer: [a, b, c].join(sep),
        distractors: [`${a} ${b} ${c}`, [a, b, c].join(` ${sep} `), sep + [a, b, c].join(sep), `${a}${b}${c}`],
      }
    },
    () => {
      const zahlen = sample([1, 2, 3, 4, 5, 6], 3)
      return {
        code: `print(${zahlen.join(', ')}, sep=", ")`,
        answer: zahlen.join(', '),
        distractors: [zahlen.join(' '), pyRepr(zahlen), zahlen.join(' , '), zahlen.join('')],
      }
    },
    // end bestimmt, was statt des Zeilenumbruchs kommt
    () => {
      const [a, b] = sample(['A', 'B', 'C', 'Hallo', 'Welt', 'Tschüss'], 2)
      const end = pick([' ', '', '!', '-'])
      return {
        code: `print("${a}", end="${end}")\nprint("${b}")`,
        answer: `${a}${end}${b}`,
        distractors: [lines(a, b), lines(a + end, b), `${b}${end}${a}`, end === ' ' ? `${a}${b}` : `${a} ${b}`],
      }
    },
    () => {
      const [a, b] = sample(['A', 'B', 'C', 'Hi', 'Ok'], 2)
      const end = pick(['!', '?', '.'])
      return {
        code: `print("${a}")\nprint("${b}", end="${end}")`,
        answer: lines(a, b + end),
        distractors: [`${a}${b}${end}`, lines(a + end, b), lines(a, b, end), `${a} ${b}${end}`],
      }
    },
  ],
]
