// Prepositions of manner – Aufgaben je Level von leicht nach schwer.
import { aus, kombi } from '../engine.js'

const TIPP_VERKEHR = {
  by: 'by + transport without a/the/my: by bus, by car, by train, by plane',
  on: 'on foot = zu Fuß – and on my bike, on the bus',
  in: 'in + my/the/a car or taxi: in my dad’s car, in a taxi',
}

// ---------------------------------------------------------------------------
// Level 1 · by bus, on foot
// ---------------------------------------------------------------------------
const VERKEHR = ['bus', 'car', 'train', 'plane', 'boat', 'taxi', 'underground', 'tram'].map((x) => [x, 'by'])

const byTransport = aus(
  kombi(
    [
      'I go to school ___ {x}.',
      'We travelled to Spain ___ {x}.',
      'My mum goes to work ___ {x}.',
      'You can get there ___ {x}.',
      'Did you come ___ {x}?',
    ],
    VERKEHR,
  ).filter(([s]) => !/school ___ plane|Spain ___ (tram|underground|taxi|bus)|work ___ (plane|boat)/.test(s)),
  ['by', 'with', 'on', 'in'],
  TIPP_VERKEHR,
)

const onFoot = aus(
  [
    ['I live near my school, so I go there ___ foot.', 'on'],
    ['It takes ten minutes ___ foot.', 'on'],
    ['We explored the old town ___ foot.', 'on'],
    ['Do you go to school ___ foot or by bus?', 'on'],
    ['I go to school ___ bus.', 'by'],
    ['We went to the lake ___ bike.', 'by'],
    ['The best way to see the city is ___ foot.', 'on'],
    ['My grandpa still goes everywhere ___ foot.', 'on'],
    ['They came ___ train.', 'by'],
  ],
  ['by', 'with', 'on', 'in'],
  TIPP_VERKEHR,
)

const mitBesitz = aus(
  [
    { text: 'I came ___ my dad’s car.', answer: 'in', wrong: ['by', 'with', 'on'] },
    { text: 'She goes to work ___ her bike.', answer: 'on', wrong: ['by', 'in', 'at'] },
    { text: 'We went to the airport ___ a taxi.', answer: 'in', wrong: ['by', 'on', 'at'] },
    { text: 'We went to the airport ___ taxi.', answer: 'by', wrong: ['with', 'on', 'in'] },
    { text: 'I go to school ___ the bus every day.', answer: 'on', wrong: ['by', 'with', 'at'] },
    { text: 'I go to school ___ bus every day.', answer: 'by', wrong: ['with', 'on', 'in'] },
    { text: 'He came ___ his new car.', answer: 'in', wrong: ['by', 'on', 'at'] },
    { text: 'He came ___ car.', answer: 'by', wrong: ['with', 'on', 'in'] },
    { text: 'We met ___ the train to Hamburg.', answer: 'on', wrong: ['by', 'with', 'at'] },
    { text: 'She travelled ___ train to Hamburg.', answer: 'by', wrong: ['with', 'on', 'in'] },
  ],
  [],
  TIPP_VERKEHR,
)

// ---------------------------------------------------------------------------
// Level 2 · Fixed phrases
// ---------------------------------------------------------------------------
const TIPP_FEST = {
  by: 'by email, by post, by heart, by hand, by mistake, by accident, by card',
  in: 'in English, in pencil, in ink, in cash, in a hurry, in silence, in a quiet voice',
  on: 'on purpose, on the phone, on the radio, on TV',
}

const fest = aus(
  [
    ['Can you send it to me ___ email?', 'by', ['with']],
    ['I learned the poem ___ heart.', 'by', []],
    ['She broke the vase ___ accident.', 'by', ['on']],
    ['I took your pen ___ mistake. Sorry!', 'by', []],
    ['These shoes were made ___ hand.', 'by', []],
    ['Can I pay ___ card?', 'by', ['with']],
    ['The letter came ___ post.', 'by', []],
    ['Please answer ___ English.', 'in', []],
    ['Write your test ___ pen, not pencil.', 'in', ['with']],
    ['I paid ___ cash.', 'in', ['with']],
    ['Sorry, I can’t talk now – I’m ___ a hurry.', 'in', []],
    ['We walked home ___ silence.', 'in', []],
    ['She spoke ___ a very quiet voice.', 'in', ['with']],
    ['The names are ___ alphabetical order.', 'in', []],
    ['He kicked me ___ purpose!', 'on', []],
    ['She is talking to her friend ___ the phone.', 'on', []],
    ['I heard the news ___ the radio.', 'on', []],
    ['There’s a great film ___ TV tonight.', 'on', []],
  ],
  ['by', 'in', 'on', 'with'],
  TIPP_FEST,
)

const festKontrast = aus(
  [
    { text: 'I didn’t do it ___ purpose. It was an accident!', answer: 'on', wrong: ['by', 'in', 'with'] },
    { text: 'I didn’t do it on purpose. It happened ___ accident!', answer: 'by', wrong: ['in', 'with', 'at'] },
    { text: 'Can you say that ___ German, please?', answer: 'in', wrong: ['by', 'on', 'with'] },
    { text: 'Don’t call me, send it ___ email.', answer: 'by', wrong: ['in', 'on', 'at'] },
    { text: 'Don’t send an email – talk to her ___ the phone.', answer: 'on', wrong: ['by', 'in', 'at'] },
    { text: 'You don’t need to read it – you know it ___ heart.', answer: 'by', wrong: ['in', 'on', 'with'] },
    { text: 'Everybody was quiet. We ate ___ silence.', answer: 'in', wrong: ['by', 'on', 'at'] },
    { text: 'You don’t need cash – you can pay ___ card.', answer: 'by', wrong: ['in', 'on', 'at'] },
    { text: 'You don’t need a card – you can pay ___ cash.', answer: 'in', wrong: ['by', 'on', 'at'] },
  ],
  [],
  TIPP_FEST,
)

// ---------------------------------------------------------------------------
// Level 3 · with, without, like, as
// ---------------------------------------------------------------------------
// with und without sind oft beide möglich – deshalb ist das jeweils andere nie eine falsche Antwort
const TIPP_L3 = {
  with: 'with = mit (with a smile, with care)',
  without: 'without = ohne (without a word, without help)',
  like: 'like = wie (it is similar, but it is not really that)',
  as: 'as = als (that is your job or role)',
}

const withWithout = aus(
  [
    ['She answered ___ a big smile.', 'with', ['without']],
    ['Please carry the glasses ___ care.', 'with', ['without']],
    ['He opened the present ___ great excitement.', 'with', ['without']],
    ['She listened ___ interest.', 'with', ['without']],
    ['He left ___ saying goodbye.', 'without', ['with']],
    ['I can’t see anything ___ my glasses.', 'without', ['with']],
    ['She solved the problem ___ any help.', 'without', ['with']],
    ['He went out ___ a jacket and got wet.', 'without', ['with']],
  ],
  ['with', 'without', 'like', 'as'],
  TIPP_L3,
)

const likeAs = aus(
  [
    { text: 'He sings ___ a bird.', answer: 'like', wrong: ['as', 'from'] },
    { text: 'Don’t behave ___ a baby!', answer: 'like', wrong: ['as', 'from'] },
    { text: 'You look ___ your mum.', answer: 'like', wrong: ['as', 'from'] },
    { text: 'She runs ___ the wind.', answer: 'like', wrong: ['as', 'of'] },
    { text: 'This cake tastes ___ banana.', answer: 'like', wrong: ['as', 'with'] },
    { text: 'She has a voice ___ an angel.', answer: 'like', wrong: ['as', 'from'] },
    { text: 'My mum works ___ a nurse.', answer: 'as', wrong: ['like', 'from'] },
    { text: 'He worked ___ a waiter in a café.', answer: 'as', wrong: ['like', 'of'] },
    { text: 'I used my jacket ___ a pillow.', answer: 'as', wrong: ['like', 'from'] },
    { text: 'She is famous ___ a singer.', answer: 'as', wrong: ['like', 'from'] },
    { text: 'He has a job ___ a bus driver.', answer: 'as', wrong: ['like', 'from'] },
  ],
  [],
  TIPP_L3,
)

const l3Mix = aus(
  [
    { text: 'He ran ___ a rocket.', answer: 'like', wrong: ['as', 'of'] },
    { text: 'He ran ___ a rocket in his hand.', answer: 'with', wrong: ['like', 'as'] },
    { text: 'She works ___ a teacher at my school.', answer: 'as', wrong: ['like', 'without'] },
    { text: 'She talks ___ a teacher, but she is a student.', answer: 'like', wrong: ['as', 'of'] },
    { text: 'Stop shouting ___ a crazy person!', answer: 'like', wrong: ['as', 'of'] },
    { text: 'He drinks his coffee ___ milk – he likes it black.', answer: 'without', wrong: ['with', 'like', 'as'] },
    { text: 'I like my tea ___ milk and sugar.', answer: 'with', wrong: ['like', 'as'] },
    { text: 'He arrived ___ a present for me.', answer: 'with', wrong: ['like', 'as'] },
  ],
  [],
  TIPP_L3,
)

export default [
  [byTransport, onFoot, mitBesitz],
  [fest, festKontrast],
  [withWithout, likeAs, l3Mix],
]
