// Prepositions of possession – Aufgaben je Level von leicht nach schwer.
import { aus } from '../engine.js'

// ---------------------------------------------------------------------------
// Level 1 · of
// ---------------------------------------------------------------------------
const OF_POOL = ['of', 'from', 'by', 'with']
const TIPP_OF = 'of = von (a part of something or belonging to it): the end of the film, the capital of France'

const ofTeil = aus(
  [
    ['I didn’t like the end ___ the film.', 'of'],
    ['Berlin is the capital ___ Germany.', 'of'],
    ['Paris is the capital ___ France.', 'of'],
    ['The roof ___ the house is red.', 'of'],
    ['What’s the name ___ this song?', 'of'],
    ['We climbed to the top ___ the mountain.', 'of'],
    ['I love the colour ___ your eyes.', 'of'],
    ['The first day ___ school was exciting.', 'of'],
    ['Read the back ___ the book.', 'of'],
    ['She is the leader ___ the group.', 'of'],
    ['The king ___ Spain lives in Madrid.', 'of', ['from']],
    ['The legs ___ the table are broken.', 'of'],
    ['The streets ___ London are busy.', 'of'],
    ['The price ___ the ticket is 12 euros.', 'of'],
    ['The owner ___ the shop is very friendly.', 'of', ['from']],
  ],
  OF_POOL,
  TIPP_OF,
)

const ofStatt = aus(
  [
    ['Who is the singer ___ this band?', 'of', ['from', 'with']],
    ['The door ___ the classroom is open.', 'of', ['from']],
    ['The wheels ___ my bike are flat.', 'of', ['from']],
    ['He is a member ___ our football club.', 'of'],
    ['The history ___ England is interesting.', 'of'],
    ['The population ___ China is very big.', 'of'],
    ['I lost the key ___ my locker.', 'of', ['to', 'from']],
    ['The beginning ___ the story is boring.', 'of'],
  ],
  [...OF_POOL, 'at'],
  TIPP_OF,
)

// ---------------------------------------------------------------------------
// Level 2 · with and without
// ---------------------------------------------------------------------------
const TIPP_WITH = {
  with: 'with = mit (it has something): a girl with long hair, a house with a garden',
  without: 'without = ohne (it doesn’t have something): coffee without milk',
}

const mit = aus(
  [
    ['My sister is the girl ___ long red hair.', 'with'],
    ['They live in a house ___ a big garden.', 'with'],
    ['Who is the man ___ the long beard?', 'with'],
    ['I want a room ___ a view of the sea.', 'with'],
    ['I’ve got a T-shirt ___ a dinosaur on it.', 'with'],
    ['We have a dog ___ only three legs.', 'with'],
    ['She has a car ___ four doors.', 'with'],
    ['I’d like a pizza ___ extra cheese, please.', 'with'],
    ['He’s the boy ___ the green backpack.', 'with'],
    ['A cat ___ blue eyes is sitting on the wall.', 'with'],
  ],
  ['with', 'of', 'at'],
  TIPP_WITH,
)

const ohne = aus(
  [
    ['I like my coffee ___ milk – black, please.', 'without'],
    ['It’s so dark – it’s a room ___ windows.', 'without'],
    ['A sandwich ___ cheese, please. I don’t like cheese.', 'without'],
    ['A phone ___ a battery is useless.', 'without'],
    ['He is a man ___ any friends. He’s always alone.', 'without'],
    ['I can’t live ___ music!', 'without'],
    ['Never go out ___ your keys!', 'without'],
    ['We were ___ electricity for two days.', 'without'],
  ],
  ['without', 'of', 'at'],
  TIPP_WITH,
)

const mitOhne = aus(
  [
    { text: 'The bird can’t fly. It’s a bird ___ wings.', answer: 'without', wrong: ['with', 'of', 'by'] },
    { text: 'An elephant is an animal ___ a long trunk.', answer: 'with', wrong: ['without', 'of', 'by'] },
    { text: 'A desert is a place ___ much water.', answer: 'without', wrong: ['with', 'of', 'by'] },
    { text: 'A zebra is a horse-like animal ___ black and white stripes.', answer: 'with', wrong: ['without', 'of', 'by'] },
    { text: 'I hate tea ___ sugar – it’s too bitter for me.', answer: 'without', wrong: ['with', 'of', 'by'] },
    { text: 'A unicorn is a horse ___ a horn on its head.', answer: 'with', wrong: ['without', 'of', 'by'] },
    { text: 'A snake is an animal ___ legs.', answer: 'without', wrong: ['with', 'of', 'by'] },
    { text: 'A giraffe is an animal ___ a very long neck.', answer: 'with', wrong: ['without', 'of', 'by'] },
  ],
  [],
  TIPP_WITH,
)

// ---------------------------------------------------------------------------
// Level 3 · belong to, a friend of mine
// ---------------------------------------------------------------------------
const TIPP_L3 = {
  to: 'belong to = gehören: This bike belongs to me. – the key to the door',
  of: 'a friend of mine / a cousin of Lisa’s = one of my friends / one of Lisa’s cousins',
}

const belongTo = aus(
  [
    ['This bike belongs ___ my brother.', 'to'],
    ['Does this phone belong ___ you?', 'to'],
    ['That house belongs ___ my grandparents.', 'to'],
    ['Who does this jacket belong ___?', 'to'],
    ['The ball belongs ___ the boy next door.', 'to'],
    ['These books belong ___ the school library.', 'to'],
    ['Greenland belongs ___ Denmark.', 'to'],
    ['This dog belongs ___ nobody.', 'to'],
    ['Does this pen belong ___ anyone?', 'to'],
    ['The Canary Islands belong ___ Spain.', 'to'],
    ['Which team does he belong ___?', 'to'],
  ],
  ['to', 'of', 'from', 'at'],
  TIPP_L3,
)

const friendOfMine = aus(
  [
    ['She’s a friend ___ mine.', 'of'],
    ['He’s a cousin ___ Lisa’s.', 'of'],
    ['Is he a friend ___ yours?', 'of'],
    ['That’s an old idea ___ my dad’s.', 'of'],
    ['A neighbour ___ ours has five cats.', 'of'],
    ['I met a friend ___ my sister’s at the party.', 'of'],
    { text: 'This bike belongs ___ a friend of mine.', answer: 'to', wrong: ['of', 'from', 'at'] },
    ['She is a classmate ___ mine.', 'of'],
    ['Tom is an old friend ___ ours.', 'of'],
    ['Are they neighbours ___ yours?', 'of'],
    ['That’s a favourite song ___ mine.', 'of'],
  ],
  ['to', 'of', 'with', 'from'],
  TIPP_L3,
)

export default [
  [ofTeil, ofStatt],
  [mit, ohne, mitOhne],
  [belongTo, friendOfMine],
]
