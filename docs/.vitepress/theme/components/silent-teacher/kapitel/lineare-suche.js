// Aufgaben je Level von leicht nach schwer.
import { rnd, pick, sample, rndDistinct, lit, out, lines, float } from '../engine.js'

const summe = (zahlen) => zahlen.reduce((a, b) => a + b, 0)

const SUCHE = [
  'position = -1',
  'for i in range(len(zahlen)):',
  '    if zahlen[i] == gesucht:',
  '        position = i',
  '        break',
  'print(position)',
]

export default [
  // 1 · Lineare Suche
  [
    // Einstieg: die Zahl steht in der Liste
    () => {
      const zahlen = rndDistinct(1, 20, 4)
      const gesucht = pick(zahlen)
      const pos = zahlen.indexOf(gesucht)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, `gesucht = ${gesucht}`, ...SUCHE),
        answer: out(pos),
        distractors: [pos + 1, gesucht, -1, pos - 1],
      }
    },
    // …oder eben nicht: dann bleibt position auf -1
    () => {
      const zahlen = rndDistinct(1, 50, 6)
      const drin = Math.random() < 0.5
      const gesucht = drin ? pick(zahlen) : pick([0, 51, 60, 99])
      const pos = zahlen.indexOf(gesucht)
      return {
        code: lines(`zahlen = ${lit(zahlen)}`, `gesucht = ${gesucht}`, ...SUCHE),
        answer: out(pos),
        distractors: drin ? [pos + 1, gesucht, -1, pos - 1] : [0, 6, 'None', 5],
      }
    },
    () => {
      const namen = sample(['Ada', 'Ben', 'Cem', 'Dana', 'Eli', 'Fin'], 4)
      const i = rnd(0, 3)
      return {
        code: lines(
          `namen = ${lit(namen)}`,
          'position = -1',
          'for i in range(len(namen)):',
          `    if namen[i] == "${namen[i]}":`,
          '        position = i',
          'print(position)',
        ),
        answer: out(i),
        distractors: [i + 1, namen[i], -1, 4],
      }
    },
    // ohne break gewinnt der letzte Treffer
    () => {
      const [x, a, b, c] = rndDistinct(1, 9, 4)
      const zahlen = sample([x, x, a, b, c], 5)
      const erster = zahlen.indexOf(x), letzter = zahlen.lastIndexOf(x)
      return {
        code: lines(
          `zahlen = ${lit(zahlen)}`,
          'position = -1',
          'for i in range(len(zahlen)):',
          `    if zahlen[i] == ${x}:`,
          '        position = i',
          'print(position)',
        ),
        answer: out(letzter),
        distractors: [erster, letzter + 1, x, 2, -1],
      }
    },
  ],

  // 2 · Maximum und Minimum
  [
    // Einstieg: nur das Maximum
    () => {
      const werte = rndDistinct(1, 20, 4)
      return {
        code: lines(
          `werte = ${lit(werte)}`,
          'groesstes = werte[0]',
          'for w in werte:',
          '    if w > groesstes:',
          '        groesstes = w',
          'print(groesstes)',
        ),
        answer: out(Math.max(...werte)),
        distractors: [Math.min(...werte), werte[0], werte.at(-1), summe(werte)],
      }
    },
    () => {
      const werte = rndDistinct(1, 50, 5)
      return {
        code: lines(
          `werte = ${lit(werte)}`,
          'groesstes = werte[0]',
          'kleinstes = werte[0]',
          'for w in werte:',
          '    if w > groesstes:',
          '        groesstes = w',
          '    if w < kleinstes:',
          '        kleinstes = w',
          'print(groesstes, kleinstes)',
        ),
        answer: out(Math.max(...werte), Math.min(...werte)),
        distractors: [
          out(Math.min(...werte), Math.max(...werte)),
          out(werte.at(-1), werte[0]),
          out(Math.max(...werte), werte[0]),
          out([...werte].sort((a, b) => b - a)[1], Math.min(...werte)),
          out(Math.max(...werte), [...werte].sort((a, b) => a - b)[1]),
          out(werte[0], werte[0]),
        ],
      }
    },
    () => {
      const werte = rndDistinct(1, 50, 5)
      const pos = werte.indexOf(Math.max(...werte))
      return {
        code: lines(
          `werte = ${lit(werte)}`,
          'pos = 0',
          'for i in range(len(werte)):',
          '    if werte[i] > werte[pos]:',
          '        pos = i',
          'print(pos)',
        ),
        answer: out(pos),
        distractors: [Math.max(...werte), pos + 1, 4, werte.indexOf(Math.min(...werte))],
      }
    },
    // Startwert 0 geht schief, wenn alle Zahlen negativ sind
    () => {
      const negativ = Math.random() < 0.6
      const werte = rndDistinct(1, 9, 4).map((w) => (negativ ? -w : w))
      const erg = negativ ? 0 : Math.max(...werte)
      return {
        code: lines(`werte = ${lit(werte)}`, 'groesstes = 0', 'for w in werte:', '    if w > groesstes:', '        groesstes = w', 'print(groesstes)'),
        answer: out(erg),
        distractors: negativ
          ? [Math.max(...werte), Math.min(...werte), werte[0], -1]
          : [Math.min(...werte), 0, werte.at(-1), summe(werte)],
      }
    },
  ],

  // 3 · Summe und Mittelwert
  [
    // Einstieg: Mittelwert von zwei Zahlen – geteilt wird immer zur Kommazahl
    () => {
      const noten = Array.from({ length: 2 }, () => rnd(1, 6))
      const s = summe(noten)
      return {
        code: lines(`noten = ${lit(noten)}`, 'summe = 0', 'for n in noten:', '    summe += n', 'print(summe / len(noten))'),
        answer: out(float(s / 2)),
        distractors: [Math.floor(s / 2), s, float((s + 1) / 2), 2],
      }
    },
    () => {
      const n = pick([4, 5])
      const noten = Array.from({ length: n }, () => rnd(1, 6))
      const s = summe(noten)
      return {
        code: lines(`noten = ${lit(noten)}`, 'summe = 0', 'for n in noten:', '    summe += n', 'print(summe / len(noten))'),
        answer: out(float(s / n)),
        distractors: [Math.floor(s / n), s, float((s + 1) / n), float(Math.floor(s / n))],
      }
    },
    () => {
      const noten = Array.from({ length: 5 }, () => rnd(1, 6))
      const g = rnd(2, 4)
      const auswahl = noten.filter((x) => x > g)
      return {
        code: lines(
          `noten = ${lit(noten)}`,
          'summe = 0',
          'anzahl = 0',
          'for n in noten:',
          `    if n > ${g}:`,
          '        summe += n',
          '        anzahl += 1',
          'print(summe, anzahl)',
        ),
        answer: out(summe(auswahl), auswahl.length),
        distractors: [
          out(summe(noten), 5),
          out(summe(noten.filter((x) => x >= g)), noten.filter((x) => x >= g).length),
          out(auswahl.length, summe(auswahl)),
          out(summe(noten.filter((x) => x <= g)), 5 - auswahl.length),
          out(summe(auswahl), auswahl.length + 1),
          out(summe(auswahl) + g, auswahl.length + 1),
        ],
      }
    },
    () => {
      const noten = Array.from({ length: 4 }, () => rnd(1, 6))
      const mittel = summe(noten) / 4
      return {
        code: lines(
          `noten = ${lit(noten)}`,
          'summe = 0',
          'for n in noten:',
          '    summe += n',
          'mittel = summe / len(noten)',
          'print(f"{mittel:.2f}")',
        ),
        answer: mittel.toFixed(2),
        distractors: [String(mittel), mittel.toFixed(1), String(Math.round(mittel)), (summe(noten) / 3).toFixed(2)],
      }
    },
  ],

  // 4 · Vergleiche zählen
  [
    // Einstieg: bis zum Treffer wird jedes Element angeschaut
    () => {
      const zahlen = rndDistinct(1, 30, 4)
      const g = pick(zahlen)
      const erg = zahlen.indexOf(g) + 1
      return {
        code: lines(
          `zahlen = ${lit(zahlen)}`,
          'vergleiche = 0',
          'for z in zahlen:',
          '    vergleiche += 1',
          `    if z == ${g}:`,
          '        break',
          'print(vergleiche)',
        ),
        answer: out(erg),
        distractors: [erg - 1, 4, erg + 1, g],
      }
    },
    // steht die Zahl nicht in der Liste, läuft die Schleife ganz durch
    () => {
      const zahlen = rndDistinct(1, 30, 6)
      const drin = Math.random() < 0.5
      const g = drin ? pick(zahlen) : 0
      const erg = drin ? zahlen.indexOf(g) + 1 : zahlen.length
      return {
        code: lines(
          `zahlen = ${lit(zahlen)}`,
          'vergleiche = 0',
          'for z in zahlen:',
          '    vergleiche += 1',
          `    if z == ${g}:`,
          '        break',
          'print(vergleiche)',
        ),
        answer: out(erg),
        distractors: drin ? [erg - 1, 6, erg + 1, g] : [0, 5, 7, 1],
      }
    },
    () => {
      const werte = rndDistinct(1, 20, 6)
      let groesstes = werte[0], wechsel = 0
      for (const w of werte) if (w > groesstes) { groesstes = w; wechsel++ }
      return {
        code: lines(
          `werte = ${lit(werte)}`,
          'wechsel = 0',
          'groesstes = werte[0]',
          'for w in werte:',
          '    if w > groesstes:',
          '        groesstes = w',
          '        wechsel += 1',
          'print(wechsel)',
        ),
        answer: out(wechsel),
        distractors: [wechsel + 1, groesstes, 6, werte.indexOf(groesstes), wechsel - 1],
      }
    },
  ],
]
