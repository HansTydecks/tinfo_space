// Prepositions of source – Aufgaben je Level von leicht nach schwer.
import { aus, kombi } from '../engine.js'

// ---------------------------------------------------------------------------
// Level 1 · from
// ---------------------------------------------------------------------------
const FROM_POOL = ['from', 'of', 'by', 'at']
const TIPP_FROM = 'from = von / aus (where something comes from or who gave it)'

const herkunft = aus(
  kombi(
    ['I come ___ {x}.', 'My best friend is ___ {x}.', 'Our new teacher comes ___ {x}.', 'My grandparents are ___ {x}.'],
    [
      ['Germany'], ['Turkey'], ['Poland'], ['Syria'], ['Italy'], ['Ukraine'], ['Spain'], ['Scotland'],
      ['a small village'], ['Hamburg'], ['the USA'],
    ].map(([x]) => [x, 'from']),
  ),
  ['from', 'of', 'by'],
  TIPP_FROM,
)

const vonJemandem = aus(
  [
    ['This is a letter ___ my aunt.', 'from'],
    ['I got a present ___ my grandma.', 'from'],
    ['We got an email ___ our teacher.', 'from'],
    ['Where are you ___?', 'from', ['at']],
    ['I borrowed this book ___ the library.', 'from', ['at']],
    ['I heard the news ___ a friend.', 'from', ['of']],
    ['The coffee comes ___ Brazil.', 'from'],
    ['The train ___ Munich is late.', 'from', ['at']],
    ['Bananas often come ___ Ecuador.', 'from'],
    ['I got a text message ___ my brother.', 'from'],
    ['Can I borrow a pen ___ you?', 'from'],
    ['The light ___ the sun is very bright.', 'from', ['of']],
    ['The shop is open ___ 9 to 6.', 'from'],
  ],
  FROM_POOL,
  TIPP_FROM,
)

// ---------------------------------------------------------------------------
// Level 2 · made of or made from?
// ---------------------------------------------------------------------------
const MADE_POOL = ['of', 'from', 'by', 'at']
const TIPP_MADE = {
  of: 'made of: you can still see the material (a wooden table is made of wood)',
  from: 'made from: the material has changed (paper is made from wood)',
}

const madeOf = aus(
  [
    ['This table is made ___ wood.', 'of'],
    ['Her ring is made ___ gold.', 'of'],
    ['The bottle is made ___ glass.', 'of'],
    ['My scarf is made ___ wool.', 'of'],
    ['This T-shirt is made ___ cotton.', 'of'],
    ['The toy is made ___ plastic.', 'of'],
    ['The bridge is made ___ steel.', 'of'],
    ['The old house is made ___ stone.', 'of'],
    ['The hat is made ___ paper.', 'of'],
    ['The coin is made ___ silver.', 'of'],
  ],
  MADE_POOL,
  TIPP_MADE,
)

const madeFrom = aus(
  [
    ['Paper is made ___ wood.', 'from'],
    ['Cheese is made ___ milk.', 'from'],
    ['Wine is made ___ grapes.', 'from'],
    ['Glass is made ___ sand.', 'from'],
    ['Bread is made ___ flour.', 'from'],
    ['Chocolate is made ___ cocoa beans.', 'from'],
    ['Butter is made ___ cream.', 'from'],
    ['Petrol is made ___ oil.', 'from'],
    ['This jam is made ___ strawberries.', 'from'],
    ['Chips are made ___ potatoes.', 'from'],
    ['Yoghurt is made ___ milk.', 'from'],
  ],
  MADE_POOL,
  TIPP_MADE,
)

const madeMix = aus(
  [
    ['The window is made ___ glass.', 'of'],
    ['Glass is made ___ sand.', 'from'],
    ['The chair is made ___ wood.', 'of'],
    ['Paper is made ___ wood.', 'from'],
    ['The necklace is made ___ gold.', 'of'],
    ['Apple juice is made ___ apples.', 'from'],
    ['My jacket is made ___ leather.', 'of'],
    ['Popcorn is made ___ corn.', 'from'],
  ],
  MADE_POOL,
  TIPP_MADE,
)

// ---------------------------------------------------------------------------
// Level 3 · from, by, out of
// ---------------------------------------------------------------------------
const TIPP_L3 = {
  from: 'from = von (the person who gives or sends it, or where it comes from)',
  by: 'by + the person who made it: a song by Adele, a book by Roald Dahl',
  'out of': 'out of = aus … heraus (from inside something)',
}

const fromBy = aus(
  [
    { text: 'I love this song ___ Billie Eilish.', answer: 'by', wrong: ['of', 'out of'] },
    { text: '“Matilda” is a book ___ Roald Dahl.', answer: 'by', wrong: ['of', 'out of'] },
    { text: '“Hamlet” is a play ___ Shakespeare.', answer: 'by', wrong: ['from', 'out of'] },
    { text: 'We read a poem ___ Goethe.', answer: 'by', wrong: ['from', 'out of'] },
    { text: '“Jaws” is a film ___ Steven Spielberg.', answer: 'by', wrong: ['of', 'from', 'out of'] },
    { text: 'I got a birthday card ___ my best friend.', answer: 'from', wrong: ['by', 'of', 'out of'] },
    { text: 'This is a present ___ my parents.', answer: 'from', wrong: ['by', 'of', 'out of'] },
    { text: 'I learned this ___ a YouTube video.', answer: 'from', wrong: ['by', 'of', 'at'] },
    { text: 'Translate this sentence ___ German into English.', answer: 'from', wrong: ['by', 'of', 'out of'] },
    { text: '“The Lion King” is a film ___ Disney.', answer: 'by', wrong: ['of', 'out of'] },
    { text: 'I got a postcard ___ my cousin in Spain.', answer: 'from', wrong: ['by', 'of', 'out of'] },
    { text: 'Here is a message ___ your teacher.', answer: 'from', wrong: ['by', 'of', 'out of'] },
    { text: 'You can drink the water ___ the tap.', answer: 'from', wrong: ['by', 'of', 'off'] },
  ],
  [],
  TIPP_L3,
)

const outOf = aus(
  [
    { text: 'She took her phone ___ her bag.', answer: 'out of', wrong: ['by', 'of', 'off'] },
    { text: 'The cat climbed ___ the basket.', answer: 'out of', wrong: ['of', 'at'] },
    { text: 'He took the milk ___ the fridge.', answer: 'out of', wrong: ['by', 'of', 'at'] },
    { text: 'A rabbit came ___ the magician’s hat!', answer: 'out of', wrong: ['of', 'at', 'off'] },
    { text: 'He pulled a coin ___ his pocket.', answer: 'out of', wrong: ['by', 'of', 'at'] },
    { text: 'Take your hands ___ your pockets!', answer: 'out of', wrong: ['by', 'of', 'at'] },
    { text: 'She poured the milk ___ the bottle into a glass.', answer: 'out of', wrong: ['by', 'of', 'at'] },
    { text: 'Get ___ my room!', answer: 'out of', wrong: ['by', 'of', 'from'] },
    { text: 'She made a dress ___ an old curtain.', answer: 'out of', wrong: ['by', 'at', 'off'] },
  ],
  [],
  TIPP_L3,
)

export default [
  [herkunft, vonJemandem],
  [madeOf, madeFrom, madeMix],
  [fromBy, outOf],
]
