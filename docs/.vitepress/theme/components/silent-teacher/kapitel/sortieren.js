// Aufgaben je Level von leicht nach schwer.
import { rnd, pick, rndDistinct, lit, out, lines, pyRepr } from '../engine.js'

const aufsteigend = (l) => [...l].sort((a, b) => a - b)
const istSortiert = (l) => l.every((x, i) => i === 0 || l[i - 1] <= x)

// typische Verwechslungen, wenn eine Liste als Antwort gefragt ist
const tausch = (l, i, j) => l.map((x, k) => (k === i ? l[j] : k === j ? l[i] : x))
const varianten = (l) => [
  [...l].reverse(),
  tausch(l, 0, 1),
  tausch(l, l.length - 2, l.length - 1),
  [...l.slice(1), l[0]],
].map(pyRepr)

// unsortierte Liste mit verschiedenen Zahlen
function unsortiert(n, max = 9) {
  let l
  do l = rndDistinct(1, max, n)
  while (istSortiert(l))
  return l
}

function bubbleDurchlauf(liste) {
  const l = [...liste]
  for (let i = 0; i < l.length - 1; i++) if (l[i] > l[i + 1]) [l[i], l[i + 1]] = [l[i + 1], l[i]]
  return l
}

function selectionSchritte(liste, schritte) {
  const l = [...liste]
  for (let start = 0; start < schritte; start++) {
    let m = start
    for (let i = start + 1; i < l.length; i++) if (l[i] < l[m]) m = i
    ;[l[start], l[m]] = [l[m], l[start]]
  }
  return l
}

function bubbleZaehlen(liste) {
  const l = [...liste]
  let vergleiche = 0, tausche = 0
  for (let runde = 0; runde < l.length - 1; runde++) {
    for (let i = 0; i < l.length - 1 - runde; i++) {
      vergleiche++
      if (l[i] > l[i + 1]) { [l[i], l[i + 1]] = [l[i + 1], l[i]]; tausche++ }
    }
  }
  return { vergleiche, tausche }
}

const BUBBLESORT = [
  'def bubblesort(liste):',
  '    n = len(liste)',
  '    for runde in range(n - 1):',
  '        for i in range(n - 1 - runde):',
  '            if liste[i] > liste[i + 1]:',
  '                liste[i], liste[i + 1] = liste[i + 1], liste[i]',
  '    return liste',
  '',
]

const BUBBLE_GEZAEHLT = [
  'def bubblesort_gezaehlt(liste):',
  '    vergleiche = 0',
  '    tausche = 0',
  '    n = len(liste)',
  '    for runde in range(n - 1):',
  '        for i in range(n - 1 - runde):',
  '            vergleiche += 1',
  '            if liste[i] > liste[i + 1]:',
  '                liste[i], liste[i + 1] = liste[i + 1], liste[i]',
  '                tausche += 1',
  '    return vergleiche, tausche',
  '',
]

export default [
  // 1 · Tauschen
  [
    // Einstieg: zwei Variablen in einer Zeile tauschen
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      return {
        code: lines(`a = ${x}`, `b = ${y}`, 'a, b = b, a', 'print(a, b)'),
        answer: out(y, x),
        distractors: [out(x, y), out(y, y), out(x, x), out(x + y, x)],
      }
    },
    () => {
      const l = rndDistinct(1, 9, 3)
      return {
        code: lines(`liste = ${lit(l)}`, 'liste[0], liste[2] = liste[2], liste[0]', 'print(liste)'),
        answer: pyRepr([l[2], l[1], l[0]]),
        distractors: [
          pyRepr(l),
          pyRepr([l[2], l[1], l[2]]),
          pyRepr([l[1], l[0], l[2]]),
          pyRepr(aufsteigend(l)) === pyRepr([l[2], l[1], l[0]]) ? pyRepr([l[0], l[2], l[1]]) : pyRepr(aufsteigend(l)),
        ],
      }
    },
    () => {
      const l = rndDistinct(1, 9, 4)
      const i = rnd(0, 2)
      const erg = [...l]
      ;[erg[i], erg[i + 1]] = [erg[i + 1], erg[i]]
      return {
        code: lines(`liste = ${lit(l)}`, `i = ${i}`, 'liste[i], liste[i + 1] = liste[i + 1], liste[i]', 'print(liste)'),
        answer: pyRepr(erg),
        distractors: [
          pyRepr(l),
          pyRepr(l.map((x, k) => (k === i + 1 ? l[i + 2] ?? l[0] : k === i + 2 ? l[i + 1] : x))),
          pyRepr(l.map((x, k) => (k === i ? l[i + 1] : x))),
          pyRepr(aufsteigend(l)),
        ],
      }
    },
    // Ohne Mehrfachzuweisung geht der erste Wert verloren
    () => {
      const l = rndDistinct(1, 9, 3)
      const [i, j] = pick([[0, 1], [1, 2], [0, 2]])
      const erg = [...l]
      erg[i] = erg[j]
      erg[j] = erg[i]
      const getauscht = [...l]
      ;[getauscht[i], getauscht[j]] = [getauscht[j], getauscht[i]]
      return {
        code: lines(`liste = ${lit(l)}`, `liste[${i}] = liste[${j}]`, `liste[${j}] = liste[${i}]`, 'print(liste)'),
        answer: pyRepr(erg),
        distractors: [pyRepr(getauscht), pyRepr(l), pyRepr(l.map((x, k) => (k === j ? l[i] : x))), pyRepr(l.map((x, k) => (k === i || k === j ? l[i] : x)))],
      }
    },
  ],

  // 2 · Bubblesort
  [
    // Einstieg: ein einziger Vergleich
    () => {
      const [x, y] = rndDistinct(1, 9, 2)
      const l = [x, y]
      const erg = aufsteigend(l)
      return {
        code: lines(
          `liste = ${lit(l)}`,
          'if liste[0] > liste[1]:',
          '    liste[0], liste[1] = liste[1], liste[0]',
          'print(liste)',
        ),
        answer: pyRepr(erg),
        distractors: [pyRepr([...erg].reverse()), pyRepr([x, x]), pyRepr([y, y]), pyRepr([x + y])],
      }
    },
    () => {
      const l = unsortiert(4)
      const erg = bubbleDurchlauf(l)
      const nurErster = [...l]
      if (nurErster[0] > nurErster[1]) [nurErster[0], nurErster[1]] = [nurErster[1], nurErster[0]]
      return {
        code: lines(
          `liste = ${lit(l)}`,
          'for i in range(len(liste) - 1):',
          '    if liste[i] > liste[i + 1]:',
          '        liste[i], liste[i + 1] = liste[i + 1], liste[i]',
          'print(liste)',
        ),
        answer: pyRepr(erg),
        distractors: [pyRepr(aufsteigend(l)), pyRepr(l), pyRepr(nurErster), pyRepr(bubbleDurchlauf(erg)), pyRepr([...aufsteigend(l)].reverse()), ...varianten(erg)],
      }
    },
    // nach einem Durchlauf steht die größte Zahl hinten
    () => {
      const l = unsortiert(5)
      const erg = bubbleDurchlauf(l)
      return {
        code: lines(
          `liste = ${lit(l)}`,
          'for i in range(len(liste) - 1):',
          '    if liste[i] > liste[i + 1]:',
          '        liste[i], liste[i + 1] = liste[i + 1], liste[i]',
          'print(liste[-1], liste[0])',
        ),
        answer: out(erg.at(-1), erg[0]),
        distractors: [
          out(l.at(-1), l[0]),
          out(Math.max(...l), Math.min(...l)),
          out(erg[0], erg.at(-1)),
          out(Math.max(...l), l[0]),
          out(aufsteigend(l).at(-2), erg[0]),
          out(Math.min(...l), Math.max(...l)),
          out(erg.at(-1), erg[1]),
          out(erg.at(-2), erg[0]),
        ],
      }
    },
    () => {
      const l = unsortiert(rnd(4, 5))
      return {
        code: lines(...BUBBLESORT, `print(bubblesort(${lit(l)}))`),
        answer: pyRepr(aufsteigend(l)),
        distractors: [pyRepr([...aufsteigend(l)].reverse()), pyRepr(l), pyRepr(bubbleDurchlauf(l)), 'None'],
      }
    },
  ],

  // 3 · Selectionsort
  [
    // Einstieg: wo steht die kleinste Zahl?
    () => {
      const l = rndDistinct(1, 20, 5)
      const m = l.indexOf(Math.min(...l))
      return {
        code: lines(
          `liste = ${lit(l)}`,
          'min_index = 0',
          'for i in range(1, len(liste)):',
          '    if liste[i] < liste[min_index]:',
          '        min_index = i',
          'print(min_index)',
        ),
        answer: out(m),
        distractors: [Math.min(...l), m + 1, l.indexOf(Math.max(...l)), 4, 0],
      }
    },
    () => {
      const l = unsortiert(4)
      const erg = selectionSchritte(l, 1)
      return {
        code: lines(
          `liste = ${lit(l)}`,
          'min_index = 0',
          'for i in range(1, len(liste)):',
          '    if liste[i] < liste[min_index]:',
          '        min_index = i',
          'liste[0], liste[min_index] = liste[min_index], liste[0]',
          'print(liste)',
        ),
        answer: pyRepr(erg),
        distractors: [
          pyRepr(aufsteigend(l)),
          pyRepr([Math.min(...l), ...l.filter((x) => x !== Math.min(...l))]),
          pyRepr(l),
          pyRepr(bubbleDurchlauf(l)),
          pyRepr(selectionSchritte(l, 2)),
          ...varianten(erg),
        ],
      }
    },
    () => {
      const l = unsortiert(5)
      const erg = selectionSchritte(l, 2)
      return {
        code: lines(
          `liste = ${lit(l)}`,
          'for start in range(2):',
          '    min_index = start',
          '    for i in range(start + 1, len(liste)):',
          '        if liste[i] < liste[min_index]:',
          '            min_index = i',
          '    liste[start], liste[min_index] = liste[min_index], liste[start]',
          'print(liste)',
        ),
        answer: pyRepr(erg),
        distractors: [
          pyRepr(selectionSchritte(l, 1)),
          pyRepr(aufsteigend(l)),
          pyRepr(selectionSchritte(l, 3)),
          pyRepr(l),
          pyRepr([...aufsteigend(l).slice(0, 2), ...l.filter((x) => !aufsteigend(l).slice(0, 2).includes(x))]),
          ...varianten(erg),
        ],
      }
    },
  ],

  // 4 · Vertauschungen zählen
  [
    // Einstieg: drei Zahlen, die Vergleiche kann man abzählen
    () => {
      const l = rndDistinct(1, 9, 3)
      const { vergleiche } = bubbleZaehlen(l)
      return {
        code: lines(...BUBBLE_GEZAEHLT, `v, t = bubblesort_gezaehlt(${lit(l)})`, 'print(v)'),
        answer: out(vergleiche),
        distractors: [9, 2, 6, vergleiche + 1],
      }
    },
    // sortiert oder genau falsch herum – die Extremfälle
    () => {
      const n = rnd(3, 5)
      const art = pick(['sortiert', 'umgekehrt'])
      const l = art === 'sortiert' ? aufsteigend(rndDistinct(1, 9, n)) : aufsteigend(rndDistinct(1, 9, n)).reverse()
      const { vergleiche, tausche } = bubbleZaehlen(l)
      return {
        code: lines(...BUBBLE_GEZAEHLT, `v, t = bubblesort_gezaehlt(${lit(l)})`, 'print(t)'),
        answer: out(tausche),
        distractors: [art === 'sortiert' ? vergleiche : 0, n, n - 1, tausche + 1, n * n],
      }
    },
    () => {
      const n = rnd(4, 5)
      const l = rndDistinct(1, 9, n)
      const { vergleiche } = bubbleZaehlen(l)
      return {
        code: lines(...BUBBLE_GEZAEHLT, `v, t = bubblesort_gezaehlt(${lit(l)})`, 'print(v)'),
        answer: out(vergleiche),
        distractors: [n * n, n - 1, n * (n - 1), vergleiche + 1],
      }
    },
    () => {
      const l = rndDistinct(1, 9, rnd(3, 4))
      const { vergleiche, tausche } = bubbleZaehlen(l)
      return {
        code: lines(...BUBBLE_GEZAEHLT, `print(bubblesort_gezaehlt(${lit(l)}))`),
        answer: `(${vergleiche}, ${tausche})`,
        distractors: [
          `(${tausche}, ${vergleiche})`,
          `(${vergleiche}, ${tausche + 1})`,
          `(${l.length * l.length}, ${tausche})`,
          `(${vergleiche}, ${vergleiche})`,
          `(${l.length - 1}, ${tausche})`,
        ],
      }
    },
  ],
]
