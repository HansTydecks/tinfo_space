// Aufgaben je Level von leicht nach schwer.
import { rnd, pick, sample, out, lines, zweiBools } from '../engine.js'

const umkehren = (s) => [...s].reverse().join('')
const sauber = (s) => s.toLowerCase().replaceAll(' ', '')
const istPal = (s) => s === umkehren(s)

const KURZ = ['Hut', 'Ball', 'Eis', 'Tor', 'Uhr', 'Zoo', 'Rad']
const WOERTER = ['Informatik', 'Python', 'Schule', 'Tafel', 'Laptop', 'Maus', 'Regal']
const PALINDROME = ['otto', 'anna', 'kajak', 'radar', 'rotor', 'uhu', 'rentner', 'reittier']
const KEINE = ['haus', 'hund', 'regal', 'tomate', 'anker', 'kakao']
// Groß-/Kleinschreibung und Leerzeichen machen den Unterschied
const TEXTE = ['Otto', 'Anna', 'Rentner', 'Kajak', 'Tim mit', 'Die Eid', 'Haus', 'Ein Esel', 'Tim Tom', 'Lagerregal']

const IST_PALINDROM_SCHLEIFE = [
  'def ist_palindrom(wort):',
  '    links = 0',
  '    rechts = len(wort) - 1',
  '    while links < rechts:',
  '        if wort[links] != wort[rechts]:',
  '            return False',
  '        links += 1',
  '        rechts -= 1',
  '    return True',
  '',
]

export default [
  // 1 · Umkehren
  [
    // Einstieg: ein kurzes Wort rückwärts
    () => {
      const w = pick(KURZ)
      return {
        code: lines(`wort = "${w}"`, 'print(wort[::-1])'),
        answer: umkehren(w),
        distractors: [w, umkehren(w).toLowerCase(), [...w].join(' '), w.at(-1)],
      }
    },
    () => {
      const w = pick(WOERTER)
      return {
        code: lines(`wort = "${w}"`, 'print(wort[::-1])'),
        answer: umkehren(w),
        distractors: [w, umkehren(w).toLowerCase(), umkehren(w.slice(1)), w.at(-1) + w.slice(1, -1) + w[0]],
      }
    },
    () => {
      const w = pick(WOERTER)
      const k = rnd(1, 3)
      return {
        code: lines(`wort = "${w}"`, `print(wort[::-1][:${k}])`),
        answer: umkehren(w).slice(0, k),
        distractors: [w.slice(0, k), umkehren(w.slice(0, k)), umkehren(w).slice(0, k + 1), w.slice(-k), w.at(-2), umkehren(w).slice(1, k + 1)],
      }
    },
    () => {
      const [a, b] = Math.random() < 0.5
        ? [pick(PALINDROME), pick(KEINE)]
        : sample([...PALINDROME, ...KEINE], 2)
      return {
        code: lines(`a = "${a}"`, `b = "${b}"`, 'print(a == a[::-1], b == b[::-1])'),
        ...zweiBools(istPal(a), istPal(b)),
      }
    },
  ],

  // 2 · Aufräumen
  [
    // Einstieg: alles klein schreiben
    () => {
      const t = pick(TEXTE)
      return {
        code: lines(`text = "${t}"`, 'print(text.lower())'),
        answer: t.toLowerCase(),
        distractors: [t, t.toUpperCase(), umkehren(t), sauber(t), umkehren(t.toLowerCase())],
      }
    },
    () => {
      const t = pick(TEXTE.filter((x) => x.includes(' ')))
      return {
        code: lines(`text = "${t}"`, 'print(text.lower().replace(" ", ""))'),
        answer: sauber(t),
        distractors: [t.toLowerCase(), t.replaceAll(' ', ''), umkehren(sauber(t)) === sauber(t) ? sauber(t).toUpperCase() : umkehren(sauber(t)), t],
      }
    },
    () => {
      const t = pick(['Otto', 'Anna', 'Kajak', 'Rentner', 'Radar'])
      return {
        code: lines(`text = "${t}"`, 'klein = text.lower()', 'print(text == text[::-1], klein == klein[::-1])'),
        ...zweiBools(istPal(t), istPal(t.toLowerCase())),
      }
    },
    () => {
      const [a, b] = sample(TEXTE, 2)
      return {
        code: lines(
          'def ist_palindrom(text):',
          '    sauber = text.lower().replace(" ", "")',
          '    return sauber == sauber[::-1]',
          '',
          `print(ist_palindrom("${a}"), ist_palindrom("${b}"))`,
        ),
        ...zweiBools(istPal(sauber(a)), istPal(sauber(b))),
      }
    },
  ],

  // 3 · Mit einer Schleife
  [
    // Einstieg: umdrehen ohne Slicing
    () => {
      const w = pick(KURZ)
      return {
        code: lines('neu = ""', `for b in "${w}":`, '    neu = b + neu', 'print(neu)'),
        answer: umkehren(w),
        distractors: [w, umkehren(w).toLowerCase(), [...w].join(' '), w + umkehren(w)],
      }
    },
    () => {
      const w = pick([...PALINDROME, ...KEINE])
      const i = rnd(0, Math.floor(w.length / 2) - 1)
      return {
        code: lines(`wort = "${w}"`, `links = ${i}`, 'rechts = len(wort) - 1 - links', 'print(wort[links], wort[rechts])'),
        answer: out(w[i], w.at(-1 - i)),
        distractors: [
          out(w.at(-1 - i), w[i]),
          out(w[i], w[i + 1]),
          out(i, w.length - 1 - i),
          out(w[i + 1], w.at(-2 - i)),
          out(w[i], w.at(-2 - i)),
          out(w[i + 1], w[i + 1]),
          out(w[0], w.at(-1)) === out(w[i], w.at(-1 - i)) ? out(w[1], w.at(-1)) : out(w[0], w.at(-1)),
          out(w[i], w.length - 1 - i),
        ],
      }
    },
    () => {
      const w = pick([...PALINDROME, ...KEINE, 'informatik', 'ab'])
      const s = Math.floor(w.length / 2)
      return {
        code: lines(
          `wort = "${w}"`,
          'links = 0',
          'rechts = len(wort) - 1',
          'schritte = 0',
          'while links < rechts:',
          '    links += 1',
          '    rechts -= 1',
          '    schritte += 1',
          'print(schritte)',
        ),
        answer: out(s),
        distractors: [w.length, s + 1, s - 1, w.length - 1],
      }
    },
    () => {
      const [a, b] = sample([...PALINDROME, ...KEINE], 2)
      return {
        code: lines(...IST_PALINDROM_SCHLEIFE, `print(ist_palindrom("${a}"), ist_palindrom("${b}"))`),
        ...zweiBools(istPal(a), istPal(b)),
      }
    },
  ],
]
