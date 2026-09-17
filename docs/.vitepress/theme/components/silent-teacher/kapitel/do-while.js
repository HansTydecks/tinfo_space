// Aufgaben je Level von leicht nach schwer.
import { ERROR, rnd, pick, sample, rndDistinct, out, lines, float } from '../engine.js'

export default [
  // 1 · while True
  [
    // Einstieg: die Schleife läuft, bis break kommt
    () => {
      const k = rnd(2, 7)
      return {
        code: lines('n = 0', 'while True:', '    n += 1', `    if n >= ${k}:`, '        break', 'print(n)'),
        answer: out(k),
        distractors: [k - 1, k + 1, 0, 1],
      }
    },
    () => {
      const g = rnd(5, 40)
      let z = 0
      do z += 1
      while (!(z * z > g))
      return {
        code: lines('zaehler = 0', 'while True:', '    zaehler += 1', `    if zaehler * zaehler > ${g}:`, '        break', 'print(zaehler)'),
        answer: out(z),
        distractors: [z - 1, z + 1, z * z, g],
      }
    },
    // Der Rumpf läuft mindestens einmal – auch wenn x schon groß genug ist
    () => {
      const x = rnd(1, 20), g = rnd(5, 15)
      let y = x
      do y *= 2
      while (y <= g)
      return {
        code: lines(`x = ${x}`, 'while True:', '    x = x * 2', `    if x > ${g}:`, '        break', 'print(x)'),
        answer: out(y),
        distractors: [x, y / 2 === x ? y * 2 : y / 2, g, y + 1],
      }
    },
    () => {
      const falsch = Array.from({ length: rnd(1, 2) }, () => pick([0, 11, 12, 15, 20, -3]))
      const gut = rnd(1, 10)
      return {
        stdin: [...falsch, gut].join('\n'),
        code: lines(
          'while True:',
          '    zahl = int(input())',
          '    if 1 <= zahl <= 10:',
          '        break',
          '    print("Ungültig")',
          'print("Danke:", zahl)',
        ),
        answer: lines(...falsch.map(() => 'Ungültig'), `Danke: ${gut}`),
        distractors: [
          `Danke: ${gut}`,
          `Danke: ${falsch[0]}`,
          lines('Ungültig', `Danke: ${falsch[0]}`),
          falsch.length === 1 ? lines('Ungültig', 'Ungültig', `Danke: ${gut}`) : lines('Ungültig', `Danke: ${gut}`),
        ],
      }
    },
  ],

  // 2 · try und except
  [
    // Einstieg: klappt die Umwandlung oder nicht?
    () => {
      const [w, ok] = pick([
        [String(rnd(1, 99)), true],
        [String(rnd(1, 99)), true],
        [`${rnd(1, 9)}.${rnd(1, 9)}`, false],
        [pick(['drei', 'zehn', 'acht']), false],
      ])
      return {
        code: lines('try:', `    zahl = int("${w}")`, '    print("ok")', 'except ValueError:', '    print("keine Zahl")'),
        answer: ok ? 'ok' : 'keine Zahl',
        distractors: [ok ? 'keine Zahl' : 'ok', lines('ok', 'keine Zahl'), w, 'ValueError'],
      }
    },
    // nach dem Fehler wird der Rest im try-Block übersprungen
    () => {
      const [a, b, c] = sample(['A', 'B', 'C', 'D', 'X', 'Y'], 3)
      const fehler = Math.random() < 0.7
      const [wort, ziffer] = pick([['zwei', '2'], ['drei', '3'], ['sieben', '7']])
      return {
        code: lines('try:', `    print("${a}")`, `    x = int("${fehler ? wort : ziffer}")`, `    print("${b}")`, 'except ValueError:', `    print("${c}")`),
        answer: fehler ? lines(a, c) : lines(a, b),
        distractors: fehler
          ? [lines(a, b, c), c, lines(a, b), a]
          : [lines(a, b, c), lines(a, c), a, b],
      }
    },
    () => {
      const [w, wert] = pick([[`"${rnd(1, 9)}"`, null], ['"sieben"', -1], ['"2.5"', -1]])
      const zahl = wert === null ? Number(w.slice(1, -1)) + 1 : -1
      return {
        code: lines('ergebnis = 0', 'try:', `    ergebnis = int(${w}) + 1`, 'except ValueError:', '    ergebnis = -1', 'print(ergebnis)'),
        answer: out(zahl),
        distractors: [0, zahl === -1 ? 1 : -1, zahl === -1 ? 3 : zahl - 1, zahl === -1 ? 8 : `${zahl - 1}1`],
      }
    },
    () => {
      const b = pick([0, 0, rnd(1, 4)])
      const a = b === 0 ? rnd(1, 9) : b * rnd(1, 4)
      return {
        code: lines('try:', `    x = ${a} / ${b}`, '    print(x)', 'except ZeroDivisionError:', '    print("durch null")'),
        answer: b === 0 ? 'durch null' : out(float(a / b)),
        distractors: b === 0
          ? [0, a, lines('0', 'durch null'), 'inf']
          : [a / b, 'durch null', lines(out(float(a / b)), 'durch null'), float(a * b)],
      }
    },
    () => {
      const falsch = pick(['abc', 'x', 'vier', '3.5'])
      const n = rnd(2, 9)
      return {
        stdin: `${falsch}\n${n}`,
        code: lines(
          'while True:',
          '    try:',
          '        zahl = int(input())',
          '        break',
          '    except ValueError:',
          '        print("nochmal")',
          'print(zahl * 2)',
        ),
        answer: lines('nochmal', out(n * 2)),
        distractors: [out(n * 2), lines('nochmal', 'nochmal', out(n * 2)), lines(out(n * 2), 'nochmal'), lines('nochmal', `${n}${n}`)],
      }
    },
  ],

  // 3 · Nicht abgefangen
  [
    // Einstieg: durch null geht nicht
    () => {
      const a = rnd(1, 9)
      return {
        code: `print(${a} // 0)`,
        answer: ERROR,
        distractors: [0, a, 'inf', 'None'],
      }
    },
    () => {
      const b = pick([0, rnd(1, 4)])
      const a = b === 0 ? rnd(1, 9) : b * rnd(1, 4)
      return {
        code: lines('try:', `    x = ${a} // ${b}`, 'except ZeroDivisionError:', '    x = 0', 'print(x)'),
        answer: out(b === 0 ? 0 : a / b),
        distractors: [a, b === 0 ? 'None' : 0, b === 0 ? 1 : float(a / b), b === 0 ? 'inf' : a * b],
      }
    },
    // except fängt nur die Fehlerart, die dort steht
    () => {
      const w = pick(['drei', 'x', 'eins'])
      return {
        code: lines('try:', `    x = int("${w}")`, 'except ZeroDivisionError:', '    print("null")'),
        answer: ERROR,
        distractors: ['null', w, 0, 'None', 'ValueError'],
      }
    },
    () => {
      const w = pick(['0', '0', String(rnd(1, 5)), 'null', 'zwei'])
      const x = /^\d+$/.test(w) ? Number(w) : 0
      return {
        code: lines('try:', `    x = int("${w}")`, 'except ValueError:', '    x = 0', 'print(10 // x)'),
        answer: x === 0 ? ERROR : out(Math.floor(10 / x)),
        distractors: x === 0
          ? [0, 10, 'None', 'inf', 1]
          : [float(10 / x), 0, x, 10 % x === 0 ? 10 : 10 % x],
      }
    },
    () => {
      const [a, b] = rndDistinct(1, 9, 2)
      return {
        code: lines('try:', `    x = ${a} + ${b}`, 'except ValueError:', '    x = 0', 'print("Summe: " + x)'),
        answer: ERROR,
        distractors: [`Summe: ${a + b}`, 'Summe: 0', `Summe: ${a}${b}`, 'Summe: x'],
      }
    },
  ],
]
