// Prepositions of place – Aufgaben je Level von leicht nach schwer.
import { aus, pick } from '../engine.js'

export const TIERE = [
  ['🐱', 'cat'], ['🐶', 'dog'], ['🐭', 'mouse'], ['🐰', 'rabbit'], ['🐸', 'frog'],
  ['🐷', 'pig'], ['🦊', 'fox'], ['🐵', 'monkey'], ['🐼', 'panda'], ['🐹', 'hamster'],
]
const FLIEGER = [['🐝', 'bee'], ['🦋', 'butterfly'], ['🐦', 'bird'], ['🎈', 'balloon']]

const BILD_PREP = {
  'p-in': 'in',
  'p-on': 'on',
  'p-on-table': 'on',
  'p-under': 'under',
  'p-above': 'above',
  'p-next-to': 'next to',
  'p-behind': 'behind',
  'p-in-front-of': 'in front of',
  'p-between': 'between',
}

const TIPP_BILD = {
  in: 'in = drinnen',
  on: 'on = auf (touching the top)',
  under: 'under = unter',
  above: 'above = über (not touching)',
  'next to': 'next to = neben',
  behind: 'behind = hinter',
  'in front of': 'in front of = vor',
  between: 'between = zwischen (two things)',
}

const RAHMEN = [
  'The {a} is ___ the {o}.',
  'Where is the {a}? It’s ___ the {o}.',
  'Look! The {a} is ___ the {o}.',
  'There is a {a} ___ the {o}.',
]

/**
 * Bildaufgabe: zufälliges Tier, zufälliger Satzrahmen, Bild zeigt die Lage.
 * @param {string[]} bilder   mögliche Bilder (Schlüssel aus BILD_PREP)
 * @param {string[]} pool     Präpositionen, aus denen die falschen Antworten kommen
 */
export function bildAufgabe(bilder, pool) {
  return () => {
    const bild = pick(bilder)
    const answer = BILD_PREP[bild]
    const [fig, a] = bild === 'p-above' ? pick(FLIEGER) : pick(TIERE)
    const o = bild === 'p-between' ? 'two boxes' : bild === 'p-under' || bild === 'p-on-table' ? 'table' : 'box'
    const text = pick(RAHMEN).replace('{a}', a).replace('{o}', o)
    // „next to" würde neben zwei Kisten auch irgendwie passen
    const ok = bild === 'p-between' ? ['next to'] : []
    return {
      text,
      answer,
      distractors: pool.filter((p) => p !== answer && !ok.includes(p)),
      scene: { bild, fig },
      tipp: TIPP_BILD[answer],
    }
  }
}

// ---------------------------------------------------------------------------
// Level 1 · in, on, under
// ---------------------------------------------------------------------------
const L1 = ['in', 'on', 'under']
const inBox = bildAufgabe(['p-in'], L1)
const onBox = bildAufgabe(['p-on', 'p-on-table'], L1)
const under = bildAufgabe(['p-under'], L1)
const l1Mix = bildAufgabe(['p-in', 'p-on', 'p-on-table', 'p-under'], L1)

// ---------------------------------------------------------------------------
// Level 2 · More positions
// ---------------------------------------------------------------------------
const L2 = ['in', 'on', 'under', 'above', 'next to', 'behind', 'in front of', 'between']
const nextTo = bildAufgabe(['p-next-to', 'p-on'], L2)
const between = bildAufgabe(['p-between', 'p-next-to'], L2)
const behindFront = bildAufgabe(['p-behind', 'p-in-front-of'], L2)
const above = bildAufgabe(['p-above', 'p-on', 'p-under'], L2)
const l2Mix = bildAufgabe(Object.keys(BILD_PREP), L2)

// ---------------------------------------------------------------------------
// Level 3 · at, in or on? (Orte)
// ---------------------------------------------------------------------------
const AOI = ['at', 'in', 'on']
const TIPP_ORT = {
  at: 'at + a point / a place where you do something: at home, at school, at the bus stop',
  in: 'in + inside / a closed space / a town or country: in the kitchen, in London',
  on: 'on + a surface or a line: on the wall, on the floor, on page 5, on the left',
}

const at = aus(
  [
    ['I’m ___ home.', 'at'],
    ['My mum is ___ work.', 'at'],
    ['We are ___ school from 8 to 1.', 'at'],
    ['Wait for me ___ the bus stop.', 'at'],
    ['I’ll meet you ___ the station.', 'at'],
    ['Someone is ___ the door.', 'at'],
    ['We had a lot of fun ___ the party.', 'at'],
    ['Turn left ___ the traffic lights.', 'at'],
    ['Write your name ___ the top of the page.', 'at'],
    ['Our house is ___ the end of the street.', 'at'],
    ['She is ___ the doctor’s.', 'at'],
    ['We sat ___ the table and had dinner.', 'at'],
  ],
  AOI,
  TIPP_ORT,
)

const inOrt = aus(
  [
    ['My aunt lives ___ London.', 'in'],
    ['We live ___ Germany.', 'in'],
    ['Mum is cooking ___ the kitchen.', 'in'],
    ['I read ___ bed every night.', 'in'],
    ['The children are playing ___ the garden.', 'in'],
    ['There are no clouds ___ the sky.', 'in'],
    ['The keys are ___ my bag.', 'in'],
    ['The fish are swimming ___ the water.', 'in'],
    ['Who is the boy ___ this photo?', 'in'],
    ['I found this word ___ a book.', 'in'],
    ['My grandpa is ___ hospital.', 'in'],
    ['There is a big shop ___ the city centre.', 'in'],
  ],
  AOI,
  TIPP_ORT,
)

const onOrt = aus(
  [
    ['There’s a poster ___ the wall.', 'on'],
    ['Your phone is ___ the table.', 'on'],
    ['Don’t leave your clothes ___ the floor!', 'on'],
    ['We live ___ the second floor.', 'on'],
    ['The bank is ___ the left.', 'on'],
    ['The answer is ___ page 12.', 'on'],
    ['There’s a fly ___ the ceiling.', 'on'],
    ['Can you find Berlin ___ the map?', 'on'],
    ['Pizza is not ___ the menu today.', 'on'],
    ['There is a sign ___ the door.', 'on'],
    ['I saw it ___ TV.', 'on'],
    ['You can find everything ___ the internet.', 'on'],
  ],
  AOI,
  TIPP_ORT,
)

const ortMix = aus(
  [
    ['She is ___ the bus stop.', 'at'],
    ['She is ___ the kitchen.', 'in'],
    ['There is a picture ___ the wall.', 'on'],
    ['There is a spider ___ the bath.', 'in'],
    ['The cat is sleeping ___ the sofa.', 'on'],
    ['I was ___ home all day.', 'at'],
    ['My cousin lives ___ Paris.', 'in'],
    ['My cousin lives ___ a farm.', 'on'],
    ['He is ___ the swimming pool – he’s swimming.', 'in'],
    ['Put the milk ___ the fridge.', 'in'],
  ],
  AOI,
  TIPP_ORT,
)

// ---------------------------------------------------------------------------
// Level 4 · near, opposite, among …
// ---------------------------------------------------------------------------
const L4 = ['near', 'opposite', 'between', 'among', 'next to', 'behind', 'in front of']
const TIPP_L4 = {
  near: 'near = in der Nähe von',
  opposite: 'opposite = gegenüber',
  between: 'between = zwischen two (separate) things',
  among: 'among = (mitten) unter many things or people',
  'next to': 'next to = direkt neben',
  behind: 'behind = hinter',
  'in front of': 'in front of = vor',
}

const l4 = aus(
  [
    { text: 'The letter B is ___ A and C.', answer: 'between', wrong: ['among', 'opposite', 'behind'] },
    { text: 'The post office is in the middle, ___ the bank and the café.', answer: 'between', wrong: ['among', 'opposite', 'behind'] },
    { text: 'There was one red apple ___ all the green ones.', answer: 'among', wrong: ['between', 'opposite'] },
    { text: 'Is there a bus stop ___ your house?', answer: 'near', wrong: ['among', 'between'] },
    { text: 'My friend lives ___ me – I can see her house from my window, across the street.', answer: 'opposite', wrong: ['among', 'between', 'behind'] },
    { text: 'Tuesday comes ___ Monday and Wednesday.', answer: 'between', wrong: ['among', 'opposite', 'near'] },
    { text: 'In the photo I’m in the middle: I’m ___ my mum and my dad.', answer: 'between', wrong: ['among', 'opposite', 'behind'] },
    { text: 'I found my ring ___ the leaves.', answer: 'among', wrong: ['between', 'opposite'] },
    { text: 'Be careful! There is a spy ___ us.', answer: 'among', wrong: ['between', 'opposite'] },
    { text: 'She was standing in the crowd, ___ hundreds of other fans.', answer: 'among', wrong: ['between', 'opposite'] },
    { text: 'The bank is ___ the post office, on the other side of the street.', answer: 'opposite', wrong: ['next to', 'among', 'between'] },
    { text: 'At dinner I sit ___ my brother, so I look right at him.', answer: 'opposite', wrong: ['next to', 'among', 'behind'] },
    { text: 'Our house is ___ the park – just cross the road.', answer: 'opposite', wrong: ['among', 'between', 'behind'] },
    { text: 'We live ___ the sea – it’s only a five-minute walk.', answer: 'near', wrong: ['among', 'between', 'opposite'] },
    { text: 'Is there a supermarket ___ here?', answer: 'near', wrong: ['among', 'between', 'opposite'] },
    { text: 'In the photo, I’m standing ___ my brother – we’re side by side.', answer: 'next to', wrong: ['opposite', 'among', 'behind'] },
    { text: 'The teacher stands ___ the class so that everybody can see her.', answer: 'in front of', wrong: ['behind', 'between', 'among'] },
    { text: 'I can’t see the board because a tall boy is sitting ___ me.', answer: 'in front of', wrong: ['behind', 'among', 'between'] },
    { text: 'The garage is ___ the house, so you can’t see it from the street.', answer: 'behind', wrong: ['in front of', 'among', 'between'] },
    { text: 'The sun is ___ a cloud – I can’t see it.', answer: 'behind', wrong: ['in front of', 'among', 'opposite'] },
  ],
  L4,
  TIPP_L4,
)

export default [
  [inBox, onBox, under, l1Mix],
  [nextTo, between, behindFront, above, l2Mix],
  [at, inOrt, onOrt, ortMix],
  [l4],
]
