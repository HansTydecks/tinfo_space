// Aufgaben je Level von leicht nach schwer.
import { ERROR, rnd, pick, sample, lit, out, lines, pyRepr, zweiBools } from '../engine.js'

const WORTSCHATZ = ['die', 'maus', 'katze', 'hund', 'ja', 'nein', 'rot', 'blau', 'eis']

// Text aus wenigen verschiedenen Wörtern, damit Zählen im Kopf klappt
function kurzerText(anzahl, verschiedene) {
  const woerter = sample(WORTSCHATZ, verschiedene)
  const text = [...woerter]
  while (text.length < anzahl) text.push(pick(woerter))
  return sample(text, text.length)
}

function zaehle(woerter) {
  const m = new Map()
  for (const w of woerter) m.set(w, (m.get(w) ?? 0) + 1)
  return m
}

export default [
  // 1 · Zerlegen
  [
    // Einstieg: split macht aus dem Satz eine Liste
    () => {
      const woerter = sample(WORTSCHATZ, 2)
      const i = rnd(0, 1)
      return {
        code: lines(`text = "${woerter.join(' ')}"`, `print(text.split()[${i}])`),
        answer: woerter[i],
        distractors: [woerter[1 - i], woerter.join(' '), `'${woerter[i]}'`, pyRepr(woerter)],
      }
    },
    () => {
      const woerter = sample(WORTSCHATZ, rnd(3, 5))
      const text = woerter.join(' ')
      return {
        code: lines(`text = "${text}"`, 'woerter = text.split()', 'print(len(woerter))'),
        answer: out(woerter.length),
        distractors: [text.length, woerter.length - 1, text.replaceAll(' ', '').length, 1],
      }
    },
    () => {
      const woerter = sample(WORTSCHATZ, 4)
      const i = rnd(0, 3)
      return {
        code: lines(`text = "${woerter.join(' ')}"`, `print(text.split()[${i}])`),
        answer: woerter[i],
        distractors: [woerter[(i + 1) % 4], woerter.join(' ')[i], `'${woerter[i]}'`, i === 0 ? woerter[3] : woerter[i - 1]],
      }
    },
    () => {
      const woerter = sample(WORTSCHATZ, 3)
      const i = rnd(0, 2)
      return {
        code: lines(`text = "${woerter.join(' ')}"`, 'woerter = text.split()', `print(len(woerter[${i}]))`),
        answer: out(woerter[i].length),
        distractors: [3, woerter.join(' ').length, woerter[i].length + 1, i === 0 ? woerter[1].length + 5 : woerter[0].length + 6],
      }
    },
    () => {
      const woerter = sample(WORTSCHATZ, 3)
      const text = woerter.join(' ')
      return {
        code: lines(`text = "${text}"`, 'print(text.split())'),
        answer: pyRepr(woerter),
        distractors: [pyRepr([text]), `[${woerter.join(', ')}]`, pyRepr(woerter.join('').split('').slice(0, 5)), text],
      }
    },
  ],

  // 2 · Dictionaries
  [
    // Einstieg: ein Eintrag hinein, derselbe wieder heraus
    () => {
      const w = pick(WORTSCHATZ)
      const x = rnd(1, 9)
      return {
        code: lines('zaehler = {}', `zaehler["${w}"] = ${x}`, `print(zaehler["${w}"])`),
        answer: out(x),
        distractors: [w, `'${w}'`, `${w}: ${x}`, x + 1],
      }
    },
    () => {
      const [a, b] = sample(WORTSCHATZ, 2)
      const [x, y] = [rnd(1, 9), rnd(1, 9)]
      const frage = pick([a, b])
      return {
        code: lines('zaehler = {}', `zaehler["${a}"] = ${x}`, `zaehler["${b}"] = ${y}`, `print(zaehler["${frage}"])`),
        answer: out(frage === a ? x : y),
        distractors: [frage === a ? `${a}: ${x}` : `${b}: ${y}`, frage, x + y, frage === a ? y + 10 : x + 10],
      }
    },
    () => {
      const [a, b] = sample(WORTSCHATZ, 2)
      const [x, y] = [rnd(1, 9), rnd(1, 9)]
      return {
        code: lines('zaehler = {}', `zaehler["${a}"] = ${x}`, `zaehler["${b}"] = ${y}`, 'print(zaehler)'),
        answer: pyRepr(new Map([[a, x], [b, y]])),
        distractors: [
          pyRepr(new Map([[b, y], [a, x]])),
          pyRepr([a, x, b, y]),
          `{${a}: ${x}, ${b}: ${y}}`,
          pyRepr(new Map([[a, y], [b, x]])),
        ],
      }
    },
    () => {
      const w = pick(WORTSCHATZ)
      const [x, k] = [rnd(1, 5), rnd(2, 3)]
      return {
        code: lines('zaehler = {}', `zaehler["${w}"] = ${x}`, ...Array(k).fill(`zaehler["${w}"] += 1`), 'print(zaehler)'),
        answer: pyRepr(new Map([[w, x + k]])),
        distractors: [pyRepr(new Map([[w, x]])), pyRepr(new Map([[w, x + 1]])), pyRepr(new Map([[w, k]])), pyRepr(Array(k + 1).fill(w))],
      }
    },
    () => {
      const [a, b, c] = sample(WORTSCHATZ, 3)
      const [p, q] = pick([[a, c], [c, a], [b, c], [c, b], [a, b]])
      return {
        code: lines(`zaehler = {"${a}": 1, "${b}": 2}`, `print("${p}" in zaehler, "${q}" in zaehler)`),
        ...zweiBools(p !== c, q !== c),
      }
    },
    () => {
      const [a, b, c] = sample(WORTSCHATZ, 3)
      return {
        code: lines(`zaehler = {"${a}": 1, "${b}": 2}`, `print(zaehler.get("${c}", 0), zaehler.get("${b}", 0))`),
        answer: out(0, 2),
        distractors: [out('None', 2), out(0, 0), out(1, 2), out(c, 2)],
      }
    },
    // ein unbekannter Schlüssel mit [] lässt das Programm abstürzen
    () => {
      const [a, b, c] = sample(WORTSCHATZ, 3)
      return {
        code: lines(`zaehler = {"${a}": 1, "${b}": 2}`, `print(zaehler["${c}"])`),
        answer: ERROR,
        distractors: [0, 'None', c, 1, 3],
      }
    },
  ],

  // 3 · Zählen
  [
    // Einstieg: ein Wort im kurzen Text zählen
    () => {
      const woerter = kurzerText(rnd(4, 6), rnd(2, 3))
      const z = zaehle(woerter)
      const frage = pick([...z.keys()])
      return {
        code: lines(
          `text = "${woerter.join(' ')}"`,
          'zaehler = {}',
          'for wort in text.split():',
          '    zaehler[wort] = zaehler.get(wort, 0) + 1',
          `print(zaehler["${frage}"])`,
        ),
        answer: out(z.get(frage)),
        distractors: [woerter.length, z.get(frage) + 1, z.get(frage) - 1, z.size],
      }
    },
    () => {
      const woerter = kurzerText(rnd(4, 6), rnd(2, 4))
      const z = zaehle(woerter)
      return {
        code: lines(
          `text = "${woerter.join(' ')}"`,
          'zaehler = {}',
          'for wort in text.split():',
          '    zaehler[wort] = zaehler.get(wort, 0) + 1',
          'print(len(zaehler))',
        ),
        answer: out(z.size),
        distractors: [woerter.length, z.size + 1, Math.max(...z.values()), z.size - 1],
      }
    },
    () => {
      const woerter = kurzerText(4, 2)
      const z = zaehle(woerter)
      const [a, b] = [...z.keys()]
      return {
        code: lines(
          `text = "${woerter.join(' ')}"`,
          'zaehler = {}',
          'for wort in text.split():',
          '    if wort in zaehler:',
          '        zaehler[wort] += 1',
          '    else:',
          '        zaehler[wort] = 1',
          'print(zaehler)',
        ),
        answer: pyRepr(z),
        distractors: [
          pyRepr(new Map([[b, z.get(b)], [a, z.get(a)]])),
          pyRepr(new Map([[a, 1], [b, 1]])),
          pyRepr(new Map([[a, z.get(b)], [b, z.get(a)]])),
          pyRepr(new Map([[a, z.get(a) + 1], [b, z.get(b)]])),
        ],
      }
    },
    () => {
      const w = pick(['banane', 'ananas', 'kakao', 'rentner', 'papagei', 'tomate'])
      const b = pick([...new Set(w)])
      const n = [...w].filter((c) => c === b).length
      return {
        code: lines(
          'zaehler = {}',
          `for zeichen in "${w}":`,
          '    zaehler[zeichen] = zaehler.get(zeichen, 0) + 1',
          `print(zaehler["${b}"], len(zaehler))`,
        ),
        answer: out(n, new Set(w).size),
        distractors: [out(n, w.length), out(n + 1, new Set(w).size), out(new Set(w).size, n), out(1, new Set(w).size)],
      }
    },
  ],

  // 4 · Das Häufigste
  [
    // Einstieg: klare Verhältnisse, ein eindeutiger Sieger
    () => {
      const woerter = sample(WORTSCHATZ, 3)
      const zahlen = sample([1, 2, 3, 4, 5, 6, 7], 3)
      const max = Math.max(...zahlen)
      const sieger = woerter[zahlen.indexOf(max)]
      return {
        code: lines(
          `zaehler = {"${woerter[0]}": ${zahlen[0]}, "${woerter[1]}": ${zahlen[1]}, "${woerter[2]}": ${zahlen[2]}}`,
          'haeufigstes = ""',
          'max_anzahl = 0',
          'for wort in zaehler:',
          '    if zaehler[wort] > max_anzahl:',
          '        max_anzahl = zaehler[wort]',
          '        haeufigstes = wort',
          'print(haeufigstes, max_anzahl)',
        ),
        answer: out(sieger, max),
        distractors: [
          out(woerter[2], zahlen[2]),
          out(woerter[zahlen.indexOf(Math.min(...zahlen))], Math.min(...zahlen)),
          out(sieger, zahlen.reduce((a, b) => a + b, 0)),
          out(woerter[0], max),
          out(max, sieger),
        ],
      }
    },
    () => {
      const woerter = kurzerText(5, 2)
      const z = zaehle(woerter)
      const [sieger, max] = [...z].reduce((best, e) => (e[1] > best[1] ? e : best), ['', 0])
      const anderes = [...z.keys()].find((w) => w !== sieger)
      return {
        code: lines(
          `text = "${woerter.join(' ')}"`,
          'zaehler = {}',
          'for wort in text.split():',
          '    zaehler[wort] = zaehler.get(wort, 0) + 1',
          'bestes = ""',
          'for wort in zaehler:',
          '    if bestes == "" or zaehler[wort] > zaehler[bestes]:',
          '        bestes = wort',
          'print(bestes, zaehler[bestes])',
        ),
        answer: out(sieger, max),
        distractors: [
          out(anderes, z.get(anderes)),
          out(sieger, 5),
          out(anderes, max),
          out(woerter[0], max) === out(sieger, max) ? out(sieger, max + 1) : out(woerter[0], max),
        ],
      }
    },
    // Gleichstand: bei > gewinnt das erste, bei >= das letzte Wort
    () => {
      const woerter = sample(WORTSCHATZ, 3)
      const hoch = rnd(3, 6), tief = rnd(1, hoch - 1)
      const zahlen = pick([[hoch, tief, hoch], [hoch, hoch, tief], [tief, hoch, hoch]])
      const op = pick(['>', '>='])
      const indizes = zahlen.map((z, i) => (z === hoch ? i : -1)).filter((i) => i >= 0)
      const sieger = woerter[op === '>' ? indizes[0] : indizes.at(-1)]
      const verlierer = woerter[op === '>' ? indizes.at(-1) : indizes[0]]
      return {
        code: lines(
          `zaehler = {"${woerter[0]}": ${zahlen[0]}, "${woerter[1]}": ${zahlen[1]}, "${woerter[2]}": ${zahlen[2]}}`,
          'haeufigstes = ""',
          'max_anzahl = 0',
          'for wort in zaehler:',
          `    if zaehler[wort] ${op} max_anzahl:`,
          '        max_anzahl = zaehler[wort]',
          '        haeufigstes = wort',
          'print(haeufigstes)',
        ),
        answer: sieger,
        distractors: [verlierer, woerter[zahlen.indexOf(tief)], `${woerter[indizes[0]]} ${woerter[indizes[1]]}`, String(hoch)],
      }
    },
  ],
]
