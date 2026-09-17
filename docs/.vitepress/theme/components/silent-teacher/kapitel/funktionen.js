// Aufgaben je Level von leicht nach schwer.
import { ERROR, rnd, pick, sample, rndDistinct, out, lines } from '../engine.js'

export default [
  // 1 · def und return
  [
    // Einstieg: eine Funktion ohne alles, dafür zweimal aufgerufen
    () => {
      const wort = pick(['Hallo', 'Hi', 'Moin', 'Servus'])
      const mal = rnd(1, 2)
      return {
        code: lines('def gruss():', `    print("${wort}")`, '', ...Array(mal).fill('gruss()')),
        answer: lines(...Array(mal).fill(wort)),
        distractors: [lines(...Array(3 - mal).fill(wort)), 'gruss', wort.toLowerCase(), 'None'],
      }
    },
    () => {
      const n = rnd(2, 9)
      return {
        code: lines('def quadrat(x):', '    return x * x', '', `print(quadrat(${n}))`),
        answer: out(n * n),
        distractors: [2 * n, n, n * n + 1, 'x * x'],
      }
    },
    () => {
      const [x, y] = sample(['Mia', 'Tom', 'Ali', 'Eva'], 2)
      return {
        code: lines('def begruesse(name):', '    print("Hallo", name)', '', `begruesse("${x}")`, `begruesse("${y}")`),
        answer: lines(`Hallo ${x}`, `Hallo ${y}`),
        distractors: [lines('Hallo name', 'Hallo name'), `Hallo ${x}`, `Hallo ${x} ${y}`, lines(`Hallo ${y}`, `Hallo ${x}`)],
      }
    },
    () => {
      const a = rnd(2, 9), b = rnd(1, 5)
      return {
        code: lines('def doppelt(x):', '    return x * 2', '', `print(doppelt(${a}) + ${b})`),
        answer: out(a * 2 + b),
        distractors: [(a + b) * 2, a + b, a * 2, `${a * 2}${b}`],
      }
    },
    // eine Funktion, die nie aufgerufen wird, tut auch nichts
    () => {
      const [a, b] = sample(['A', 'B', 'C'], 2)
      return {
        code: lines('def zeige():', `    print("${a}")`, '', `print("${b}")`),
        answer: b,
        distractors: [lines(a, b), a, lines(b, a), 'None'],
      }
    },
  ],

  // 2 · Mehrere Parameter
  [
    // Einstieg: zwei Zahlen hineingeben
    () => {
      const a = rnd(2, 9), b = rnd(2, 9)
      return {
        code: lines('def flaeche(breite, hoehe):', '    return breite * hoehe', '', `print(flaeche(${a}, ${b}))`),
        answer: out(a * b),
        distractors: [a + b, 2 * (a + b), `${a}${b}`, a],
      }
    },
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      return {
        code: lines('def minus(a, b):', '    return a - b', '', `print(minus(${x}, ${y}))`),
        answer: out(x - y),
        distractors: [y - x, x + y, Math.abs(x - y) + 1, x],
      }
    },
    () => {
      const b = rnd(2, 5), k = rnd(1, 5), r = rnd(0, b - 1)
      const a = b * k + r
      return {
        code: lines('def teile(a, b):', '    return a // b', '', `print(teile(${a}, ${b}))`),
        answer: out(k),
        distractors: [r, k + 1, b, `${k}.${r}`],
      }
    },
    // Es zählt die Reihenfolge, nicht der Name außerhalb
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      return {
        code: lines('def minus(a, b):', '    return a - b', '', `b = ${x}`, `a = ${y}`, 'print(minus(b, a))'),
        answer: out(x - y),
        distractors: [y - x, x + y, x, y],
      }
    },
    () => {
      const a = rnd(2, 9)
      return {
        code: lines('def flaeche(breite, hoehe):', '    return breite * hoehe', '', `print(flaeche(${a}))`),
        answer: ERROR,
        distractors: [a, a * a, 0, 'None', 2 * a],
      }
    },
  ],

  // 3 · Aufrufe verschachteln
  [
    // Einstieg: dieselbe Funktion zweimal hintereinander
    () => {
      const n = rnd(1, 9), d = rnd(2, 4)
      return {
        code: lines('def f(x):', `    return x + ${d}`, '', `print(f(f(${n})))`),
        answer: out(n + 2 * d),
        distractors: [n + d, n + 4 * d, 2 * n + d, (n + d) * 2],
      }
    },
    () => {
      const n = rnd(1, 5)
      return {
        code: lines('def f(x):', '    return x * 3', '', `a = f(${n})`, 'b = f(a)', 'print(b)'),
        answer: out(n * 9),
        distractors: [n * 3, n * 6, n + 6, n * 27],
      }
    },
    () => {
      const [a, b] = rndDistinct(1, 5, 2)
      return {
        code: lines('def quadrat(x):', '    return x * x', '', `print(quadrat(${a}) + quadrat(${b}))`),
        answer: out(a * a + b * b),
        distractors: [(a + b) ** 2, 2 * (a + b), a * a + b, a * b * 2],
      }
    },
    () => {
      const n = rnd(1, 9)
      const erst = pick(['plus1', 'doppelt'])
      const erg = erst === 'plus1' ? (n + 1) * 2 : n * 2 + 1
      const anders = erst === 'plus1' ? n * 2 + 1 : (n + 1) * 2
      return {
        code: lines(
          'def plus1(x):',
          '    return x + 1',
          '',
          'def doppelt(x):',
          '    return x * 2',
          '',
          erst === 'plus1' ? `print(doppelt(plus1(${n})))` : `print(plus1(doppelt(${n})))`,
        ),
        answer: out(erg),
        distractors: [anders, n + 1, n * 2, n + 3],
      }
    },
  ],

  // 4 · None und lokale Variablen
  [
    // Einstieg: ohne return kommt None zurück
    () => {
      const n = rnd(2, 9)
      return {
        code: lines('def f(x):', '    y = x * 2', '', `print(f(${n}))`),
        answer: 'None',
        distractors: [n * 2, n, 'y', 0],
      }
    },
    () => {
      const n = rnd(2, 9)
      return {
        code: lines('def f(x):', '    print(x * 2)', '', `print(f(${n}))`),
        answer: lines(out(n * 2), 'None'),
        distractors: [out(n * 2), lines(out(n * 2), out(n * 2)), 'None', lines('None', out(n * 2))],
      }
    },
    // nach return passiert nichts mehr
    () => {
      const n = rnd(1, 9)
      return {
        code: lines('def f(x):', '    return x', '    print("fertig")', '', `print(f(${n}))`),
        answer: out(n),
        distractors: [lines('fertig', out(n)), lines(out(n), 'fertig'), 'None', 'fertig'],
      }
    },
    () => {
      const [a, b] = rndDistinct(1, 9, 2)
      return {
        code: lines(`x = ${a}`, '', 'def f(x):', '    x = x + 10', '    return x', '', `print(f(${b}), x)`),
        answer: out(b + 10, a),
        distractors: [out(b + 10, b + 10), out(a + 10, a), out(b + 10, b), out(a + 10, b + 10)],
      }
    },
    () => {
      const n = rnd(2, 9)
      return {
        code: lines('def verdopple(zahl):', '    doppelt = zahl * 2', '    return doppelt', '', `verdopple(${n})`, 'print(doppelt)'),
        answer: ERROR,
        distractors: [n * 2, n, 'None', 'doppelt', 0],
      }
    },
  ],
]
