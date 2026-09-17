// Aufgaben je Level von leicht nach schwer.
import { rnd, pick, out, float, idiv, mod, zweiBools } from '../engine.js'

const VERGLEICHE = {
  '<': (a, b) => a < b,
  '<=': (a, b) => a <= b,
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
  '==': (a, b) => a === b,
  '!=': (a, b) => a !== b,
}

const KURZ = {
  '+=': (x, v) => x + v,
  '-=': (x, v) => x - v,
  '*=': (x, v) => x * v,
}

export default [
  // 1 · Punkt vor Strich
  [
    // Einstieg: eine einzige Rechnung mit kleinen Zahlen
    () => {
      const a = rnd(1, 9), b = rnd(1, 9)
      const op = pick(['+', '-', '*'])
      const erg = op === '+' ? a + b : op === '-' ? a - b : a * b
      return {
        code: `print(${a} ${op} ${b})`,
        answer: out(erg),
        distractors: [a + b, a * b, a - b, `${a}${b}`],
      }
    },
    () => {
      const a = rnd(1, 9), b = rnd(2, 5), c = rnd(2, 5)
      return {
        code: `print(${a} + ${b} * ${c})`,
        answer: out(a + b * c),
        distractors: [(a + b) * c, a + b + c, a * b + c, a + b * c + 1, a + b * c - 1, a * b * c],
      }
    },
    () => {
      const a = rnd(1, 6), b = rnd(1, 5), c = rnd(2, 4)
      return {
        code: `print((${a} + ${b}) * ${c})`,
        answer: out((a + b) * c),
        distractors: [a + b * c, a + b + c, a * c + b, (a + b) * c + 1, (a + b) * c - 1, a + b, a * b * c + 2],
      }
    },
    () => {
      const a = rnd(8, 15), b = rnd(1, 4), c = rnd(1, 4)
      return {
        code: `print(${a} - ${b} + ${c})`,
        answer: out(a - b + c),
        distractors: [a - (b + c), a - b - c, a + b + c, a - b + c + 1],
      }
    },
    () => {
      const a = rnd(2, 5), b = rnd(2, 5), c = rnd(1, 3)
      return {
        code: `print(${a} * ${b} - ${c})`,
        answer: out(a * b - c),
        distractors: [a * (b - c), a * b + c, a * b, a + b - c],
      }
    },
    () => {
      const a = rnd(2, 5), b = a === 5 ? 2 : rnd(2, 3)
      return {
        code: `print(${a} ** ${b})`,
        answer: out(a ** b),
        distractors: [a * b, a + b, b ** a, a ** b + 1, a ** b - 1, `${a}${b}`, 2 * a * b],
      }
    },
  ],

  // 2 · Teilen und Rest
  [
    // Einstieg: geteilt ohne Rest – trotzdem eine Kommazahl
    () => {
      const y = rnd(2, 5), k = rnd(2, 5)
      return {
        code: `print(${y * k} / ${y})`,
        answer: out(float(k)),
        distractors: [k, float(k + 1), float(y), y * k * y],
      }
    },
    // dasselbe mit // – dabei bleibt es eine ganze Zahl
    () => {
      const y = rnd(2, 5), k = rnd(2, 5)
      return {
        code: `print(${y * k} // ${y})`,
        answer: out(k),
        distractors: [float(k), 0, y, k + 1],
      }
    },
    () => {
      const y = rnd(2, 6), k = rnd(1, 6), r = rnd(1, y - 1)
      const x = y * k + r
      return {
        code: `print(${x} // ${y})`,
        answer: out(idiv(x, y)),
        distractors: [r, k + 1, float(k), x - y, k + 2, `${k}.${r}`],
      }
    },
    () => {
      const y = rnd(2, 6), k = rnd(1, 6), r = rnd(0, y - 1)
      const x = y * k + r
      return {
        code: `print(${x} % ${y})`,
        answer: out(mod(x, y)),
        distractors: [k, y - r, r + 1, x - y, y, k + 1, float(r)],
      }
    },
    () => {
      const n = rnd(10, 99)
      return {
        code: `zahl = ${n}\nprint(zahl % 2)`,
        answer: out(n % 2),
        distractors: [1 - (n % 2), 2, idiv(n, 2), n % 10],
      }
    },
    () => {
      const y = pick([2, 4]), k = rnd(1, 5)
      const x = y * k + y / 2
      return {
        code: `print(${x} / ${y})`,
        answer: out(x / y),
        distractors: [k, k + 1, float(k), `${k},5`],
      }
    },
    () => {
      const y = rnd(3, 6), k = rnd(1, 5), r = rnd(1, y - 1)
      const x = y * k + r
      return {
        code: `print(${x} // ${y}, ${x} % ${y})`,
        answer: out(k, r),
        distractors: [out(r, k), out(k + 1, r), out(k, y - r), out(k, r + 1), out(k - 1, r), out(k + 1, 0)],
      }
    },
  ],

  // 3 · Vergleichen und verknüpfen
  [
    // Einstieg: ein einzelner Vergleich
    () => {
      const a = rnd(1, 9), b = rnd(1, 9)
      const op = pick(['<', '>', '==', '!='])
      const erg = VERGLEICHE[op](a, b)
      return {
        code: `print(${a} ${op} ${b})`,
        answer: out(erg),
        distractors: [!erg, `${a} ${op} ${b}`, 'None', erg ? 1 : 0],
      }
    },
    () => {
      const a = rnd(1, 9), b = a + pick([-1, 0, 1])
      const [op1, op2] = pick([['<', '=='], ['<=', '!='], ['>', '>='], ['==', '<='], ['!=', '>']])
      return {
        code: `a = ${a}\nb = ${b}\nprint(a ${op1} b, a ${op2} b)`,
        ...zweiBools(VERGLEICHE[op1](a, b), VERGLEICHE[op2](a, b)),
      }
    },
    () => {
      const x = rnd(1, 6), y = rnd(1, 6), g = rnd(2, 5)
      return {
        code: `x = ${x}\ny = ${y}\nprint(x > ${g} and y > ${g}, x > ${g} or y > ${g})`,
        ...zweiBools(x > g && y > g, x > g || y > g),
      }
    },
    () => {
      const alter = rnd(3, 20), u = rnd(5, 8), o = rnd(15, 18)
      return {
        code: `alter = ${alter}\nprint(alter >= ${u} and alter <= ${o}, not alter < ${u})`,
        ...zweiBools(alter >= u && alter <= o, !(alter < u)),
      }
    },
    () => {
      const w = pick(['Anna', 'Ben', 'Mia', 'Tom'])
      const v = pick([w, w.toLowerCase(), w.toUpperCase()])
      const n = rnd(1, 9)
      const zahlGleich = pick([`${n} == ${n}.0`, `${n} == "${n}"`])
      return {
        code: `print("${w}" == "${v}", ${zahlGleich})`,
        ...zweiBools(w === v, zahlGleich.includes('.0')),
      }
    },
  ],

  // 4 · Kurzschreibweisen
  [
    // Einstieg: eine einzige Kurzschreibweise
    () => {
      const start = rnd(1, 9)
      const op = pick(['+=', '-=', '*='])
      const wert = op === '*=' ? rnd(2, 3) : rnd(1, 5)
      return {
        code: `x = ${start}\nx ${op} ${wert}\nprint(x)`,
        answer: out(KURZ[op](start, wert)),
        distractors: [start, wert, start + wert, start * wert],
      }
    },
    () => {
      const a = rnd(5, 10), b = rnd(1, 5)
      return {
        code: `punkte = 0\npunkte += ${a}\npunkte += ${b}\nprint(punkte)`,
        answer: out(a + b),
        distractors: [a, b, `${a}${b}`, a * b],
      }
    },
    () => {
      const start = rnd(1, 6)
      const ops = [pick(['+=', '-=']), '*=']
      if (Math.random() < 0.5) ops.reverse()
      const werte = ops.map((op) => (op === '*=' ? rnd(2, 3) : rnd(1, 5)))
      let x = start
      ops.forEach((op, i) => { x = KURZ[op](x, werte[i]) })
      const nurErste = KURZ[ops[0]](start, werte[0])
      const vertauscht = KURZ[ops[0]](KURZ[ops[1]](start, werte[1]), werte[0])
      return {
        code: `x = ${start}\n` + ops.map((op, i) => `x ${op} ${werte[i]}`).join('\n') + '\nprint(x)',
        answer: out(x),
        distractors: [nurErste, vertauscht, start, x + 1, x - 1],
      }
    },
    () => {
      const a = rnd(5, 10), b = rnd(1, 5)
      return {
        code: `punkte = 0\npunkte += ${a}\npunkte += ${b}\npunkte *= 2\nprint(punkte)`,
        answer: out((a + b) * 2),
        distractors: [a + b * 2, a + b, (a + b) * 2 + 1, 2, a * 2 + b],
      }
    },
    () => {
      const x0 = rnd(2, 6), y0 = rnd(2, 6), d = rnd(1, 3)
      return {
        code: `x = ${x0}\ny = ${y0}\nx += y\ny -= ${d}\nprint(x, y)`,
        answer: out(x0 + y0, y0 - d),
        distractors: [out(x0, y0 - d), out(x0 + y0, y0), out(x0 + y0 - d, y0 - d), out(x0 + y0, y0 + d)],
      }
    },
    () => {
      const y = rnd(3, 5), k = rnd(2, 4), r = rnd(1, y - 1), plus = rnd(1, 3)
      const start = y * k + r
      const op = pick(['//=', '%='])
      const zwischen = op === '//=' ? k : r
      return {
        code: `x = ${start}\nx ${op} ${y}\nx += ${plus}\nprint(x)`,
        answer: out(zwischen + plus),
        distractors: [(op === '//=' ? r : k) + plus, zwischen, start + plus, zwischen + plus + 1],
      }
    },
  ],
]
