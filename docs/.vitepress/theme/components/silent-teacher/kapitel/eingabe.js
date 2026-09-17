// Eingaben stehen im Feld über dem Code (`stdin`, eine Eingabe pro Zeile).
// input() ohne Text in den Klammern, damit die Ausgabe nur aus print() besteht.
// Aufgaben je Level von leicht nach schwer.
import { ERROR, rnd, pick, rndDistinct, out, lines, float } from '../engine.js'

export default [
  // 1 · input() liefert Text
  [
    // Einstieg: die Eingabe landet in einer Variablen
    () => {
      const name = pick(['Mia', 'Tom', 'Ali', 'Eva', 'Ben'])
      return {
        stdin: name,
        code: lines('name = input()', 'print("Hallo", name)'),
        answer: `Hallo ${name}`,
        distractors: ['Hallo name', `Hallo${name}`, 'Hallo input()', `Hallo "${name}"`],
      }
    },
    () => {
      const a = rnd(1, 9)
      return {
        stdin: `${a}`,
        code: lines('x = input()', 'print(x + x)'),
        answer: `${a}${a}`,
        distractors: [2 * a, `${a} ${a}`, 'xx', a],
      }
    },
    () => {
      const [a, b] = rndDistinct(1, 9, 2)
      return {
        stdin: `${a}\n${b}`,
        code: lines('a = input()', 'b = input()', 'print(a + b)'),
        answer: `${a}${b}`,
        distractors: [a + b, `${a} ${b}`, `${b}${a}`, 'ab'],
      }
    },
    () => {
      const a = rnd(1, 99)
      return {
        stdin: `${a}`,
        code: lines('x = input()', 'print(type(x))'),
        answer: "<class 'str'>",
        distractors: ["<class 'int'>", "<class 'float'>", "<class 'bool'>"],
      }
    },
    () => {
      const zahl = rnd(100, 9999)
      return {
        stdin: `${zahl}`,
        code: lines('x = input()', 'print(len(x))'),
        answer: out(String(zahl).length),
        distractors: [zahl, 1, [...String(zahl)].reduce((s, z) => s + Number(z), 0), String(zahl).length + 1],
      }
    },
  ],

  // 2 · Umwandeln
  [
    // Einstieg: int() macht aus dem Text eine Zahl
    () => {
      const a = rnd(1, 9)
      return {
        stdin: `${a}`,
        code: lines('x = input()', 'print(int(x) + 1)'),
        answer: out(a + 1),
        distractors: [`${a}1`, a, 'x1', a + 2],
      }
    },
    () => {
      const [a, b] = rndDistinct(1, 9, 2)
      return {
        stdin: `${a}\n${b}`,
        code: lines('a = int(input())', 'b = int(input())', 'print(a + b)'),
        answer: out(a + b),
        distractors: [`${a}${b}`, a * b, `${a} + ${b}`, a],
      }
    },
    () => {
      const ganz = rnd(1, 4), halb = pick([0, 5])
      const wert = ganz + halb / 10
      return {
        stdin: `${ganz}.${halb}`,
        code: lines('x = float(input())', 'print(x * 2)'),
        answer: out(float(wert * 2)),
        distractors: [
          wert * 2 === Math.floor(wert * 2) ? wert * 2 : Math.floor(wert * 2),
          `${ganz}.${halb}${ganz}.${halb}`,
          float(wert),
          `${ganz * 2}.${halb * 2}`,
        ],
      }
    },
    () => {
      const ganz = rnd(1, 8), d = rnd(1, 9)
      return {
        stdin: `${ganz}.${d}`,
        code: lines('x = float(input())', 'print(int(x))'),
        answer: out(ganz),
        distractors: [ganz + 1, `${ganz}.${d}`, `${ganz}.0`, d],
      }
    },
    () => {
      const alter = rnd(14, 20)
      const voll = alter >= 18
      return {
        stdin: `${alter}`,
        code: lines('alter = int(input())', 'if alter < 18:', '    print("minderjährig")', 'else:', '    print("volljährig")'),
        answer: voll ? 'volljährig' : 'minderjährig',
        distractors: [voll ? 'minderjährig' : 'volljährig', alter, lines('minderjährig', 'volljährig'), 'True'],
      }
    },
  ],

  // 3 · Ungültige Eingaben
  [
    // Einstieg: aus einem Wort wird keine Zahl
    () => {
      const [wort, zahl] = pick([['drei', 3], ['vier', 4], ['zwei', 2], ['sieben', 7]])
      return {
        stdin: wort,
        code: lines('x = int(input())', 'print(x)'),
        answer: ERROR,
        distractors: [zahl, wort, 0, 'None', `"${wort}"`],
      }
    },
    () => {
      const [a, b] = rndDistinct(1, 9, 2)
      return {
        stdin: `${a}\n${b}`,
        code: lines('a = input()', 'b = input()', 'print(int(a) + int(b))'),
        answer: out(a + b),
        distractors: [`${a}${b}`, `${a} ${b}`, a * b, a],
      }
    },
    () => {
      const ganz = rnd(1, 8), d = rnd(1, 9)
      return {
        stdin: `${ganz}.${d}`,
        code: lines('x = int(input())', 'print(x)'),
        answer: ERROR,
        distractors: [ganz, ganz + 1, `${ganz}.${d}`, `${ganz}.0`, d],
      }
    },
    () => {
      const [a, b] = rndDistinct(1, 9, 2)
      return {
        stdin: `${a}\n${b}`,
        code: lines('a = input()', 'b = int(input())', 'print(a + b)'),
        answer: ERROR,
        distractors: [a + b, `${a}${b}`, `${a} ${b}`, `${a} + ${b}`],
      }
    },
  ],
]
