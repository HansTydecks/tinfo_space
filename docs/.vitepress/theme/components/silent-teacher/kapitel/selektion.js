// Aufgaben je Level von leicht nach schwer.
import { rnd, pick, sample, lit, out, lines } from '../engine.js'

const NOTEN = [
  [90, 'sehr gut'],
  [75, 'gut'],
  [60, 'befriedigend'],
  [0, 'üben'],
]

export default [
  // 1 · if ohne else
  [
    // Einstieg: die Bedingung stimmt deutlich – oder deutlich nicht
    () => {
      const t = pick([12, 15, 18, 30, 31, 34])
      return {
        code: lines(`temperatur = ${t}`, 'if temperatur > 25:', '    print("heiß")', 'print("Tag")'),
        answer: t > 25 ? lines('heiß', 'Tag') : 'Tag',
        distractors: [t > 25 ? 'Tag' : lines('heiß', 'Tag'), 'heiß', lines('Tag', 'heiß'), 'heiß Tag'],
      }
    },
    () => {
      const x = rnd(1, 9), g = rnd(3, 6), k = rnd(1, 5)
      const op = pick(['>', '<'])
      const bed = op === '>' ? x > g : x < g
      return {
        code: lines(`x = ${x}`, `if x ${op} ${g}:`, `    x = x + ${k}`, 'print(x)'),
        answer: out(bed ? x + k : x),
        distractors: [bed ? x : x + k, k, x + g, `x + ${k}`],
      }
    },
    () => {
      const x = rnd(1, 5), y = pick([x, x, rnd(1, 5)])
      return {
        code: lines(`a = ${x}`, `if a == ${y}:`, '    a = 0', 'print(a)'),
        answer: out(x === y ? 0 : x),
        distractors: [x === y ? x : 0, y, 'True', x === y ? 'False' : 'True', x + 1],
      }
    },
    // knapp daneben ist auch nicht größer
    () => {
      const t = pick([24, 25, 26])
      return {
        code: lines(`temperatur = ${t}`, 'if temperatur > 25:', '    print("heiß")', 'print("Tag")'),
        answer: t > 25 ? lines('heiß', 'Tag') : 'Tag',
        distractors: [t > 25 ? 'Tag' : lines('heiß', 'Tag'), 'heiß', lines('Tag', 'heiß'), 'heiß Tag'],
      }
    },
  ],

  // 2 · if und else
  [
    // Einstieg: genau einer der beiden Zweige läuft
    () => {
      const x = rnd(10, 99)
      const gerade = x % 2 === 0
      return {
        code: lines(`x = ${x}`, 'if x % 2 == 0:', '    print("gerade")', 'else:', '    print("ungerade")'),
        answer: gerade ? 'gerade' : 'ungerade',
        distractors: [gerade ? 'ungerade' : 'gerade', lines('gerade', 'ungerade'), x % 2, 'None'],
      }
    },
    () => {
      const x = rnd(1, 9), y = pick([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((v) => v !== x))
      return {
        code: lines(`a = ${x}`, `b = ${y}`, 'if a > b:', '    m = a', 'else:', '    m = b', 'print(m)'),
        answer: out(Math.max(x, y)),
        distractors: [Math.min(x, y), 'm', x + y, out(x, y)],
      }
    },
    () => {
      const x = rnd(2, 9), g = rnd(4, 6)
      const bed = x < g
      return {
        code: lines(`x = ${x}`, `if x < ${g}:`, '    x = x * 2', 'else:', `    x = x - ${g}`, 'print(x)'),
        answer: out(bed ? x * 2 : x - g),
        distractors: [bed ? x - g : x * 2, x, x * 2 - g, g],
      }
    },
  ],

  // 3 · elif-Ketten
  [
    // Einstieg: die Punktzahl liegt deutlich in einer Stufe
    () => {
      const p = pick([40, 50, 65, 70, 80, 85, 95, 99])
      const note = NOTEN.find(([grenze]) => p >= grenze)[1]
      return {
        code: lines(
          `punkte = ${p}`,
          'if punkte >= 90:',
          '    note = "sehr gut"',
          'elif punkte >= 75:',
          '    note = "gut"',
          'elif punkte >= 60:',
          '    note = "befriedigend"',
          'else:',
          '    note = "üben"',
          'print(note)',
        ),
        answer: note,
        distractors: NOTEN.map(([, n]) => n).filter((n) => n !== note).concat(['note']),
      }
    },
    // dieselbe Kette, aber direkt an der Grenze
    () => {
      const p = pick([59, 60, 74, 75, 89, 90])
      const note = NOTEN.find(([grenze]) => p >= grenze)[1]
      return {
        code: lines(
          `punkte = ${p}`,
          'if punkte >= 90:',
          '    note = "sehr gut"',
          'elif punkte >= 75:',
          '    note = "gut"',
          'elif punkte >= 60:',
          '    note = "befriedigend"',
          'else:',
          '    note = "üben"',
          'print(note)',
        ),
        answer: note,
        distractors: NOTEN.map(([, n]) => n).filter((n) => n !== note).concat(['note']),
      }
    },
    () => {
      // Die erste passende Bedingung gewinnt – "B" kann hier nie erscheinen
      const g1 = rnd(1, 3), g2 = rnd(5, 7), x = rnd(0, 9)
      const antwort = x > g1 ? 'A' : x > g2 ? 'B' : 'C'
      return {
        code: lines(`x = ${x}`, `if x > ${g1}:`, '    print("A")', `elif x > ${g2}:`, '    print("B")', 'else:', '    print("C")'),
        answer: antwort,
        distractors: ['A', 'B', 'C', lines('A', 'B')],
      }
    },
    () => {
      // zwei einzelne if: beide können zutreffen
      const g1 = rnd(2, 4), g2 = rnd(5, 7), x = rnd(g1 + 1, 9)
      return {
        code: lines(`x = ${x}`, `if x > ${g1}:`, '    print("A")', `if x > ${g2}:`, '    print("B")'),
        answer: x > g2 ? lines('A', 'B') : 'A',
        distractors: ['A', 'B', lines('A', 'B'), lines('B', 'A'), 'AB'],
      }
    },
  ],

  // 4 · Bedingungen kombinieren
  [
    // Einstieg: steht der Wert in der Liste?
    () => {
      const farbe = pick(['rot', 'grün', 'blau', 'gelb', 'lila'])
      const liste = sample(['rot', 'grün', 'blau', 'gelb'], 2)
      const drin = liste.includes(farbe)
      return {
        code: lines(`farbe = "${farbe}"`, `if farbe in ${lit(liste)}:`, '    print("dabei")', 'else:', '    print("fehlt")'),
        answer: drin ? 'dabei' : 'fehlt',
        distractors: [drin ? 'fehlt' : 'dabei', farbe, lines('dabei', 'fehlt'), 'True'],
      }
    },
    () => {
      const x = rnd(0, 10), u = rnd(2, 4), o = rnd(6, 8)
      const drin = x > u && x < o
      return {
        code: lines(`x = ${x}`, `if x > ${u} and x < ${o}:`, '    print("drin")', 'else:', '    print("draußen")'),
        answer: drin ? 'drin' : 'draußen',
        distractors: [drin ? 'draußen' : 'drin', lines('drin', 'draußen'), 'True', 'False'],
      }
    },
    () => {
      const alter = rnd(12, 19)
      const begleitung = pick([true, false])
      const ok = alter >= 16 || begleitung
      return {
        code: lines(
          `alter = ${alter}`,
          `begleitung = ${begleitung ? 'True' : 'False'}`,
          'if alter >= 16 or begleitung:',
          '    print("Einlass")',
          'else:',
          '    print("Kein Einlass")',
        ),
        answer: ok ? 'Einlass' : 'Kein Einlass',
        distractors: [ok ? 'Kein Einlass' : 'Einlass', lines('Einlass', 'Kein Einlass'), 'True', 'False'],
      }
    },
    () => {
      const x = rnd(1, 9), g = rnd(3, 7)
      const bed = !(x > g)
      return {
        code: lines(`x = ${x}`, `if not x > ${g}:`, '    x = 0', 'print(x)'),
        answer: out(bed ? 0 : x),
        distractors: [bed ? x : 0, g, 'False', -x],
      }
    },
    // Groß- und Kleinschreibung zählt auch hier
    () => {
      const eingabe = pick(['j', 'J', 'ja', 'Ja', 'JA', 'n', 'jo'])
      const ja = ['j', 'J', 'ja', 'Ja'].includes(eingabe)
      return {
        code: lines(
          `eingabe = "${eingabe}"`,
          'if eingabe in ["j", "J", "ja", "Ja"]:',
          '    print("ja")',
          'else:',
          '    print("nein")',
        ),
        answer: ja ? 'ja' : 'nein',
        distractors: [ja ? 'nein' : 'ja', eingabe === 'ja' ? 'Ja' : eingabe, 'True', lines('ja', 'nein')],
      }
    },
  ],
]
