// Prepositions of movement – Aufgaben je Level von leicht nach schwer.
import { aus, pick, NONE } from '../engine.js'

const TIERE = [
  ['🐱', 'cat'], ['🐶', 'dog'], ['🐭', 'mouse'], ['🐰', 'rabbit'], ['🐸', 'frog'],
  ['🐷', 'pig'], ['🦊', 'fox'], ['🐵', 'monkey'], ['🐹', 'hamster'],
]

// Bild → Präposition, Figuren (Emoji, Name) und Satzrahmen
const BEWEGUNG = {
  'm-into': { prep: 'into', figuren: TIERE, saetze: ['The {a} jumps ___ the box.', 'The {a} climbs ___ the box.', 'Look! The {a} is jumping ___ the box.'] },
  'm-out-of': { prep: 'out of', figuren: TIERE, saetze: ['The {a} jumps ___ the box.', 'The {a} climbs ___ the box.', 'Look! The {a} is jumping ___ the box.'] },
  'm-onto': { prep: 'onto', figuren: TIERE, saetze: ['The {a} jumps ___ the box.', 'The {a} climbs ___ the box.', 'Look! The {a} is jumping ___ the box.'] },
  'm-off': { prep: 'off', figuren: TIERE, saetze: ['The {a} jumps ___ the box.', 'The {a} climbs ___ the box.', 'Look! The {a} is jumping ___ the box.'] },
  'm-up': { prep: 'up', figuren: [...TIERE, ['🐐', 'goat']], saetze: ['The {a} walks ___ the hill.', 'The {a} runs ___ the hill.', 'The {a} is climbing ___ the hill.'] },
  'm-down': { prep: 'down', figuren: [...TIERE, ['🐐', 'goat']], saetze: ['The {a} walks ___ the hill.', 'The {a} runs ___ the hill.', 'The {a} is rolling ___ the hill.'] },
  'm-over': { prep: 'over', figuren: [...TIERE, ['🐴', 'horse'], ['🦘', 'kangaroo']], saetze: ['The {a} jumps ___ the wall.', 'The {a} is climbing ___ the wall.'] },
  'm-under': { prep: 'under', figuren: [['🦆', 'duck'], ['🦢', 'swan'], ['🐟', 'fish']], saetze: ['The {a} swims ___ the bridge.', 'Look! The {a} is swimming ___ the bridge.'] },
  'm-through': { prep: 'through', figuren: [['🚂', 'train'], ['🚗', 'car'], ['🚌', 'bus'], ['🚲', 'bike']], saetze: ['The {a} goes ___ the tunnel.', 'The {a} is going ___ the tunnel.', 'The {a} goes ___ the hill.'] },
  'm-around': { prep: 'around', figuren: TIERE, saetze: ['The {a} runs ___ the tree.', 'The {a} is running ___ the tree.', 'The {a} walks ___ the tree.'] },
  'm-across': { prep: 'across', figuren: [['🐶', 'dog'], ['🐸', 'frog'], ['🦆', 'duck'], ['🐻', 'bear']], saetze: ['The {a} swims ___ the river.', 'The {a} is swimming ___ the river.'] },
  'm-along': { prep: 'along', figuren: [['🐶', 'dog'], ['🐸', 'frog'], ['🦆', 'duck'], ['🐻', 'bear']], saetze: ['The {a} swims ___ the river.', 'The {a} is swimming ___ the river.'] },
  'm-past': { prep: 'past', figuren: [...TIERE, ['🚶', 'man']], saetze: ['The {a} walks ___ the house.', 'The {a} runs ___ the house.', 'The {a} is walking ___ the house.'] },
  'm-to': { prep: 'to', figuren: [...TIERE, ['🚶', 'man']], saetze: ['The {a} walks ___ the house.', 'The {a} runs ___ the house.', 'The {a} is walking ___ the house.'] },
  'm-towards': { prep: 'towards', figuren: [...TIERE, ['🚶', 'man']], saetze: ['The {a} walks ___ the house.', 'The {a} runs ___ the house.', 'The {a} is walking ___ the house.'] },
}

const TIPP = {
  into: 'into = hinein (from outside to inside)',
  'out of': 'out of = heraus (from inside to outside)',
  onto: 'onto = auf … hinauf',
  off: 'off = von … herunter',
  up: 'up = hinauf',
  down: 'down = hinunter',
  over: 'over = über … hinweg',
  under: 'under = unter … hindurch',
  through: 'through = durch',
  around: 'around = um … herum',
  across: 'across = über … (to the other side)',
  along: 'along = entlang',
  past: 'past = an … vorbei',
  to: 'to = zu / nach (you get there)',
  towards: 'towards = in Richtung (you don’t get there yet)',
}

/** Bildaufgabe zu einem oder mehreren Bildern, falsche Antworten aus pool */
export function bewegung(bilder, pool) {
  return () => {
    const bild = pick(bilder)
    const b = BEWEGUNG[bild]
    const [fig, a] = pick(b.figuren)
    return {
      text: pick(b.saetze).replace('{a}', a),
      answer: b.prep,
      distractors: pool.filter((p) => p !== b.prep),
      scene: { bild, fig },
      tipp: TIPP[b.prep],
    }
  }
}

// ---------------------------------------------------------------------------
// Level 1 · into, out of, onto, off
// ---------------------------------------------------------------------------
const L1 = ['into', 'out of', 'onto', 'off']
const into = bewegung(['m-into'], L1)
const outOf = bewegung(['m-out-of', 'm-into'], L1)
const onto = bewegung(['m-onto'], L1)
const off = bewegung(['m-off', 'm-onto'], L1)

// ---------------------------------------------------------------------------
// Level 2 · up, down, over, under, through, around
// ---------------------------------------------------------------------------
const L2 = ['up', 'down', 'over', 'under', 'through', 'around']
const upDown = bewegung(['m-up', 'm-down'], L2)
const over = bewegung(['m-over'], L2)
const underBridge = bewegung(['m-under'], L2)
const through = bewegung(['m-through'], L2)
const around = bewegung(['m-around'], L2)
const l2Mix = bewegung(['m-up', 'm-down', 'm-over', 'm-under', 'm-through', 'm-around'], L2)

// ---------------------------------------------------------------------------
// Level 3 · across, along, past, towards, to
// ---------------------------------------------------------------------------
const L3 = ['across', 'along', 'past', 'towards', 'to']
const acrossAlong = bewegung(['m-across', 'm-along'], L3)
const past = bewegung(['m-past'], L3)
const toTowards = bewegung(['m-to', 'm-towards'], L3)
const l3Mix = bewegung(['m-across', 'm-along', 'm-past', 'm-to', 'm-towards'], L3)

// ---------------------------------------------------------------------------
// Level 4 · go, get, arrive (ohne Bild)
// ---------------------------------------------------------------------------
const TIPP_L4 = {
  to: 'go to school / go to work / go to bed / go to London',
  [NONE]: 'no preposition: go home, come home, get home, go there',
  at: 'arrive at + a building or small place: arrive at the station',
  in: 'arrive in + a town or country: arrive in London',
  into: 'get into the car / walk into the room',
  'out of': 'get out of the car / the taxi',
  on: 'get on the bus / the train / the plane / your bike',
  off: 'get off the bus / the train / the plane / your bike',
}

const goTo = aus(
  [
    { text: 'I go ___ school by bus.', answer: 'to', wrong: ['at', 'in', NONE] },
    { text: 'My dad goes ___ work at 7 o’clock.', answer: 'to', wrong: ['at', 'in', NONE] },
    { text: 'It’s late. Go ___ bed!', answer: 'to', wrong: ['at', 'in', NONE] },
    { text: 'We are going ___ the cinema tonight.', answer: 'to', wrong: ['at', 'in', NONE] },
    { text: 'We drove ___ Italy last summer.', answer: 'to', wrong: ['at', 'on', NONE] },
    { text: 'After school I go ___ home.', answer: NONE, wrong: ['to', 'at', 'in'] },
    { text: 'What time did you come ___ home?', answer: NONE, wrong: ['to', 'at', 'in'] },
    { text: 'I want to go ___ there again!', answer: NONE, wrong: ['to', 'at', 'in'] },
    { text: 'Let’s walk ___ the park.', answer: 'to', wrong: ['at', 'on', NONE] },
    { text: 'Shall we go ___ the beach?', answer: 'to', wrong: ['at', 'in', NONE] },
  ],
  [],
  TIPP_L4,
)

const getOnOff = aus(
  [
    { text: 'Hurry up! Get ___ the bus.', answer: 'on', wrong: ['in', 'at', 'out of'] },
    { text: 'Our stop is next – we have to get ___ the train.', answer: 'off', wrong: ['on', 'into', 'at'] },
    { text: 'Get ___ the car, put on your seatbelt and let’s go!', answer: 'into', wrong: ['on', 'off', 'out of'] },
    { text: 'The taxi stopped and we got ___ it.', answer: 'out of', wrong: ['off', 'on', 'at'] },
    { text: 'She got ___ her bike and rode away.', answer: 'on', wrong: ['into', 'in', 'out of'] },
    { text: 'He fell ___ his bike and hurt his knee.', answer: 'off', wrong: ['out of', 'into', 'at'] },
    { text: 'The plane landed and the passengers got ___ it.', answer: 'off', wrong: ['on', 'into', 'at'] },
    { text: 'Mr Smith walked ___ the classroom and said “Good morning!”', answer: 'into', wrong: ['on', 'off', 'at'] },
    { text: 'The bus is full – we can’t get ___ it.', answer: 'on', wrong: ['off', 'out of', 'at'] },
    { text: 'The fire alarm rang and everybody ran ___ the building.', answer: 'out of', wrong: ['off', 'on', 'at'] },
  ],
  [],
  TIPP_L4,
)

const arrive = aus(
  [
    { text: 'We arrived ___ the station at 6 o’clock.', answer: 'at', wrong: ['to', 'in', NONE] },
    { text: 'We arrived ___ London at 6 o’clock.', answer: 'in', wrong: ['to', 'at', NONE] },
    { text: 'When did you arrive ___ the airport?', answer: 'at', wrong: ['to', 'in', NONE] },
    { text: 'The plane arrives ___ New York in the morning.', answer: 'in', wrong: ['to', 'at', NONE] },
    { text: 'Call me when you arrive ___ home.', answer: NONE, wrong: ['to', 'at', 'in'] },
    { text: 'They arrived ___ Germany last week.', answer: 'in', wrong: ['to', 'at', NONE] },
    { text: 'I arrived ___ school too late.', answer: 'at', wrong: ['to', 'in', NONE] },
    { text: 'What time did you get ___ home last night?', answer: NONE, wrong: ['to', 'at', 'in'] },
    { text: 'We arrived ___ the hotel after a long drive.', answer: 'at', wrong: ['to', 'in', NONE] },
    { text: 'She flew ___ Paris for the weekend.', answer: 'to', wrong: ['at', 'in', NONE] },
  ],
  [],
  TIPP_L4,
)

export default [
  [into, outOf, onto, off],
  [upDown, over, underBridge, through, around, l2Mix],
  [acrossAlong, past, toTowards, l3Mix],
  [goTo, getOnOff, arrive],
]
