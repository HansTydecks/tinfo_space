// Prepositions of measure – Aufgaben je Level von leicht nach schwer.
import { aus, kombi } from '../engine.js'

// ---------------------------------------------------------------------------
// Level 1 · a cup of tea
// ---------------------------------------------------------------------------
const MENGEN = [
  'a cup ___ tea', 'a glass ___ water', 'a kilo ___ apples', 'a bottle ___ milk', 'a slice ___ pizza',
  'a piece ___ cake', 'a bar ___ chocolate', 'a loaf ___ bread', 'a litre ___ orange juice',
  'two packets ___ crisps', 'a box ___ chocolates', 'a can ___ lemonade', '200 grams ___ cheese',
  'a bowl ___ cereal', 'a bag ___ sweets', 'a jar ___ jam', 'a spoonful ___ sugar', 'a pair ___ socks',
  'a bunch ___ flowers', 'a carton ___ eggs',
]

const ofMenge = aus(
  kombi(
    ['Can I have {x}, please?', 'Mum bought {x}.', 'We need {x}.', 'I’d like {x}.'],
    MENGEN.map((m) => [m, 'of']),
  ),
  ['of', 'from', 'by', 'at'],
  'of + amount: a cup of tea, a kilo of apples, a piece of cake',
)

const ofViele = aus(
  [
    ['We have a lot ___ homework today.', 'of'],
    ['A group ___ students is waiting outside.', 'of'],
    ['There were lots ___ people at the concert.', 'of'],
    ['Can I have a bit ___ your sandwich?', 'of'],
    ['Most ___ my friends play football.', 'of'],
    ['Half ___ the class is ill.', 'of'],
    ['A few ___ us went swimming.', 'of'],
    ['I ate a plate ___ spaghetti.', 'of'],
    ['She bought a new pair ___ shoes.', 'of'],
    ['None ___ my friends came.', 'of'],
  ],
  ['of', 'from', 'by', 'at'],
  'of + amount or part: a lot of, a group of, half of, most of',
)

// ---------------------------------------------------------------------------
// Level 2 · by and per
// ---------------------------------------------------------------------------
const TIPP_BYPER = {
  by: 'by + a difference or a unit: up by 10%, won by two goals, paid by the hour, 4 by 3',
  per: 'per = pro: 10 euros per person, 50 km per hour',
}

const by = aus(
  [
    { text: 'Prices went up ___ 10 percent.', answer: 'by', wrong: ['with', 'per', 'at'] },
    { text: 'Our team won ___ two goals.', answer: 'by', wrong: ['with', 'per', 'of'] },
    { text: 'I’m taller than my sister ___ five centimetres.', answer: 'by', wrong: ['with', 'per', 'of'] },
    { text: 'The workers are paid ___ the hour.', answer: 'by', wrong: ['per', 'with', 'of'] },
    { text: 'At the market, apples are sold ___ the kilo.', answer: 'by', wrong: ['per', 'with', 'of'] },
    { text: 'If you multiply 4 ___ 3, you get 12.', answer: 'by', wrong: ['with', 'per', 'of'] },
    { text: 'If you divide 12 ___ 4, you get 3.', answer: 'by', wrong: ['with', 'per', 'of'] },
    { text: 'The room is 5 metres ___ 4 metres.', answer: 'by', wrong: ['with', 'per', 'of'] },
    { text: 'The temperature fell ___ 8 degrees in one night.', answer: 'by', wrong: ['with', 'per', 'of'] },
    { text: 'The price of the ticket went down ___ 2 euros.', answer: 'by', wrong: ['with', 'per', 'of'] },
  ],
  [],
  TIPP_BYPER,
)

const per = aus(
  [
    { text: 'The tickets cost 10 euros ___ person.', answer: 'per', wrong: ['by', 'with', 'of'] },
    { text: 'The speed limit here is 50 kilometres ___ hour.', answer: 'per', wrong: ['by', 'with', 'of'] },
    { text: 'She earns 15 euros ___ hour.', answer: 'per', wrong: ['by', 'with', 'of'] },
    { text: 'Take one tablet three times ___ day.', answer: 'per', wrong: ['by', 'with', 'of'] },
    { text: 'Each student gets two pencils. That’s two pencils ___ student.', answer: 'per', wrong: ['by', 'with', 'of'] },
    { text: 'The hotel costs 80 euros ___ night.', answer: 'per', wrong: ['by', 'with', 'of'] },
    { text: 'My heart beats about 70 times ___ minute.', answer: 'per', wrong: ['by', 'with', 'of'] },
    { text: 'The workers are paid 15 euros ___ hour.', answer: 'per', wrong: ['by', 'with', 'of'] },
    { text: 'The workers are paid ___ the hour.', answer: 'by', wrong: ['per', 'with', 'of'] },
    { text: 'Apples cost 2 euros ___ kilo.', answer: 'per', wrong: ['by', 'with', 'of'] },
    { text: 'Our school has about 25 students ___ class.', answer: 'per', wrong: ['by', 'with', 'of'] },
    { text: 'Apples are sold ___ the kilo.', answer: 'by', wrong: ['per', 'with', 'of'] },
  ],
  [],
  TIPP_BYPER,
)

// ---------------------------------------------------------------------------
// Level 3 · at, out of, about, up to, over, under
// ---------------------------------------------------------------------------
const TIPP_L3 = {
  at: 'at + speed, temperature or price: at 100 km/h, at 100 degrees, at 2 euros each',
  'out of': 'out of = von (9 out of 10 = 9 von 10)',
  about: 'about = ungefähr',
  'up to': 'up to = bis zu (that’s the maximum)',
  over: 'over = über (more than)',
  under: 'under = unter (less than)',
}

const atOutOf = aus(
  [
    { text: 'The train was travelling ___ 200 km/h.', answer: 'at', wrong: ['out of', 'by', 'of'] },
    { text: 'Water boils ___ 100 degrees.', answer: 'at', wrong: ['out of', 'by', 'of'] },
    { text: 'The T-shirts are on sale ___ 5 euros each.', answer: 'at', wrong: ['out of', 'by', 'of'] },
    { text: 'Water freezes ___ 0 degrees.', answer: 'at', wrong: ['out of', 'by', 'of'] },
    { text: 'Nine ___ ten people like chocolate.', answer: 'out of', wrong: ['at', 'by', 'from'] },
    { text: 'I got 18 ___ 20 points in the test.', answer: 'out of', wrong: ['at', 'by', 'per'] },
    { text: 'One ___ three students walks to school.', answer: 'out of', wrong: ['at', 'by', 'per'] },
    { text: 'She scored 7 ___ 10 in the quiz.', answer: 'out of', wrong: ['at', 'by', 'per'] },
    { text: 'Two ___ five children in my class have a pet.', answer: 'out of', wrong: ['at', 'by', 'per'] },
    { text: 'Drive slowly! Cars must go ___ 30 km/h near the school.', answer: 'at', wrong: ['out of', 'by', 'of'] },
  ],
  [],
  TIPP_L3,
)

const mehrWeniger = aus(
  [
    { text: 'It’s ___ 20 km from here – I’m not sure exactly.', answer: 'about', wrong: ['at', 'out of', 'up to'] },
    { text: 'There were ___ 50 people at the party, maybe a few more or a few less.', answer: 'about', wrong: ['at', 'out of', 'up to'] },
    { text: 'The film lasts ___ two hours, I think.', answer: 'about', wrong: ['at', 'out of', 'by'] },
    { text: 'The tickets cost ___ 10 euros – I don’t remember exactly.', answer: 'about', wrong: ['at', 'out of', 'by'] },
    { text: 'Our class trip costs ___ 200 euros – it can’t be more.', answer: 'up to', wrong: ['out of', 'at', 'by'] },
    { text: 'This lift can carry ___ eight people. Nine is too many!', answer: 'up to', wrong: ['under', 'out of', 'at'] },
    { text: 'You can borrow ___ five books, but not more.', answer: 'up to', wrong: ['over', 'out of', 'at'] },
    { text: 'Some turtles live ___ 150 years!', answer: 'up to', wrong: ['out of', 'at', 'by'] },
    { text: 'This film is only for people ___ 18.', answer: 'over', wrong: ['under', 'out of', 'at'] },
    { text: 'The bag weighs ___ 20 kilos – it’s too heavy for the plane!', answer: 'over', wrong: ['under', 'out of', 'at'] },
    { text: 'Children ___ six travel for free – they are still very young.', answer: 'under', wrong: ['over', 'out of', 'at'] },
    { text: 'Everything in this shop costs ___ 5 euros. It’s really cheap!', answer: 'under', wrong: ['over', 'out of', 'at'] },
  ],
  [],
  TIPP_L3,
)

export default [
  [ofMenge, ofViele],
  [by, per],
  [atOutOf, mehrWeniger],
]
