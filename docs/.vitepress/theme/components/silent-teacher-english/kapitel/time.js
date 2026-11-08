// Prepositions of time – Aufgaben je Level von leicht nach schwer.
import { aus, kombi, NONE } from '../engine.js'

const AOI = ['at', 'on', 'in']
const TIPP_AOI = {
  at: 'at + clock time: at 7 o’clock, at half past six',
  on: 'on + day or date: on Monday, on 12 May',
  in: 'in + month, year, season: in July, in 2010, in winter',
}

// ---------------------------------------------------------------------------
// Level 1 · at, on, in
// ---------------------------------------------------------------------------
const UHRZEITEN = [
  '7 o’clock', '8 o’clock', 'half past six', 'half past three', 'quarter past nine',
  'quarter to eight', '6:30', '7:45', '10 am', '4 pm', '9 pm', '11:15',
].map((x) => [x, 'at'])

const TAGE = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Fridays', 'Mondays']
  .map((x) => [x, 'on'])

const MONATE = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December',
].map((x) => [x, 'in'])

const JAHRE = ['2010', '2015', '1999', '2020', '1985', '2008', '2024'].map((x) => [x, 'in'])

const DATEN = [
  '12 May', '3 June', '1 April', '24 December', '31 October', 'the 4th of July',
  'the 1st of September', 'the 15th of March', 'May 20th',
].map((x) => [x, 'on'])

const uhrzeit = aus(
  kombi(
    [
      'I get up ___ {x}.',
      'The film starts ___ {x}.',
      'School finishes ___ {x}.',
      'Let’s meet ___ {x}.',
      'The bus leaves ___ {x}.',
      'My piano lesson starts ___ {x}.',
      'We have dinner ___ {x}.',
      'The shop opens ___ {x}.',
    ],
    UHRZEITEN,
  ),
  AOI,
  TIPP_AOI,
)

const tag = aus(
  kombi(
    [
      'We have PE ___ {x}.',
      'Let’s meet ___ {x}.',
      'The museum is closed ___ {x}.',
      'I play football ___ {x}.',
      'My piano lesson is ___ {x}.',
      'We have a maths test ___ {x}.',
      'I visit my grandma ___ {x}.',
    ],
    TAGE,
  ),
  AOI,
  TIPP_AOI,
)

const monatJahr = aus(
  [
    ...kombi(
      [
        'My birthday is ___ {x}.',
        'We go on holiday ___ {x}.',
        'School starts again ___ {x}.',
        'It often rains ___ {x}.',
      ],
      MONATE,
    ),
    ...kombi(
      [
        'I was born ___ {x}.',
        'My parents got married ___ {x}.',
        'They moved to Berlin ___ {x}.',
        'This song came out ___ {x}.',
      ],
      JAHRE,
    ),
  ],
  AOI,
  TIPP_AOI,
)

const datum = aus(
  kombi(
    [
      'My birthday is ___ {x}.',
      'School starts again ___ {x}.',
      'The concert is ___ {x}.',
      'We are flying to London ___ {x}.',
      'My little sister was born ___ {x}.',
    ],
    DATEN,
  ),
  AOI,
  TIPP_AOI,
)

// alles gemischt – auch mit Satzanfang
const gemischt = aus(
  [
    ['The party is ___ Saturday.', 'on'],
    ['The party starts ___ 8 o’clock.', 'at'],
    ['The party is ___ June.', 'in'],
    ['I was born ___ 2012.', 'in'],
    ['I was born ___ 12 March.', 'on'],
    ['I was born ___ March.', 'in'],
    ['I was born ___ 5 o’clock in the morning.', 'at'],
    ['The holidays begin ___ July.', 'in'],
    ['The holidays begin ___ Friday.', 'on'],
    ['The holidays begin ___ 25 July.', 'on'],
    ['The train leaves ___ 9:15.', 'at'],
    ['The train leaves ___ Tuesday.', 'on'],
    ['Halloween is ___ October.', 'in'],
    ['Halloween is ___ 31 October.', 'on'],
    ['The World Cup was ___ 2014.', 'in'],
    ['Lunch is ___ half past twelve.', 'at'],
  ],
  AOI,
  TIPP_AOI,
)

// ---------------------------------------------------------------------------
// Level 2 · Parts of the day & holidays
// ---------------------------------------------------------------------------
const TIPP_TAGESZEIT = {
  in: 'in the morning / in the afternoon / in the evening – in summer, in winter',
  at: 'at night, at noon, at midnight, at lunchtime, at Christmas, at Easter',
  on: 'on + a day: on Monday morning, on my birthday, on Christmas Day',
}

const tageszeit = aus(
  kombi(
    [
      'I do my homework ___ {x}.',
      'My dad goes jogging ___ {x}.',
      'I always feel tired ___ {x}.',
      'We usually watch TV ___ {x}.',
      'The bakery is very busy ___ {x}.',
    ],
    [['the morning', 'in'], ['the afternoon', 'in'], ['the evening', 'in']],
  ),
  AOI,
  TIPP_TAGESZEIT,
)

const nachtMittag = aus(
  [
    ...kombi(
      [
        'Owls hunt ___ {x}.',
        'I can’t sleep ___ {x}.',
        'The streets are quiet ___ {x}.',
      ],
      [['night', 'at'], ['midnight', 'at']],
    ),
    ...kombi(
      ['We have a break ___ {x}.', 'Let’s meet ___ {x}.', 'The church bells ring ___ {x}.'],
      [['noon', 'at'], ['lunchtime', 'at'], ['midday', 'at']],
    ),
    ['I do my homework ___ the afternoon.', 'in'],
    ['I read a book ___ the evening.', 'in'],
    ['I get up early ___ the morning.', 'in'],
    ['The stars come out ___ night.', 'at'],
  ],
  AOI,
  TIPP_TAGESZEIT,
)

const tagMitTageszeit = aus(
  [
    ...kombi(
      [
        'We have football practice ___ {x}.',
        'I’ll call you ___ {x}.',
        'The shop is closed ___ {x}.',
        'We often go for a walk ___ {x}.',
      ],
      [
        ['Monday morning', 'on'], ['Friday evening', 'on'], ['Sunday afternoon', 'on'],
        ['Saturday night', 'on'], ['Tuesday morning', 'on'],
      ],
    ),
    ['We often go for a walk ___ the afternoon.', 'in'],
    ['I’ll call you ___ the evening.', 'in'],
    ['We have football practice ___ the morning.', 'in'],
  ],
  AOI,
  TIPP_TAGESZEIT,
)

const feiertage = aus(
  [
    ...kombi(
      ['We visit our grandparents ___ {x}.', 'The whole family meets ___ {x}.', 'We eat a lot of chocolate ___ {x}.'],
      [
        ['Christmas', 'at'], ['Easter', 'at'],
        ['Christmas Day', 'on'], ['Easter Sunday', 'on'], ['New Year’s Eve', 'on'], ['my birthday', 'on'],
      ],
    ),
    ...kombi(
      ['It’s very hot here ___ {x}.', 'We go skiing ___ {x}.', 'The trees lose their leaves ___ {x}.', 'Many birds fly south ___ {x}.'],
      [['summer', 'in'], ['winter', 'in'], ['autumn', 'in'], ['spring', 'in']],
    ).filter(([s]) => !/skiing ___ (summer|spring|autumn)|hot here ___ (winter|autumn|spring)|leaves ___ (summer|spring|winter)|south ___ (spring|summer|winter)/.test(s)),
    ['My grandpa was young ___ the 1960s.', 'in'],
    ['Cars didn’t exist ___ the 18th century.', 'in'],
  ],
  AOI,
  {
    ...TIPP_TAGESZEIT,
    in: 'in + season, decade, century: in summer, in the 1990s, in the 21st century',
  },
)

// ---------------------------------------------------------------------------
// Level 3 · No preposition
// ---------------------------------------------------------------------------
const MIT_NONE = [...AOI, NONE]
const TIPP_NONE = {
  [NONE]: 'no preposition before next, last, this, every, tomorrow, yesterday, today, tonight',
  at: 'at + clock time / at night / at the weekend',
  on: 'on + day: on Monday, on Friday morning',
  in: 'in + month, year, season, part of the day',
}

const nextLast = aus(
  kombi(
    [
      'See you ___ {x}!',
      'We are going to Spain ___ {x}.',
      'I started a new hobby ___ {x}.',
      'There is a school trip ___ {x}.',
    ],
    [
      ['next week', NONE], ['next Monday', NONE], ['next year', NONE], ['next summer', NONE],
      ['last week', NONE], ['last Friday', NONE], ['last year', NONE], ['last summer', NONE],
      ['this weekend', NONE], ['this month', NONE],
    ],
  ).filter(([s]) => !/See you ___ last|I started .* ___ (next|this)|going to Spain ___ last|school trip ___ last/.test(s)),
  MIT_NONE,
  TIPP_NONE,
)

const kontrast = aus(
  [
    ['We have a test ___ next Monday.', NONE],
    ['We have a test ___ Monday.', 'on'],
    ['I went to the dentist ___ last Tuesday.', NONE],
    ['I went to the dentist ___ Tuesday.', 'on'],
    ['I’m going to Italy ___ next summer.', NONE],
    ['I’m going to Italy ___ the summer.', 'in'],
    ['We moved here ___ last year.', NONE],
    ['We moved here ___ 2019.', 'in'],
    ['There is a party ___ this Saturday.', NONE],
    ['There is a party ___ Saturday.', 'on'],
    ['I’m meeting my friends ___ this afternoon.', NONE],
    ['I’m meeting my friends ___ the afternoon.', 'in'],
    ['It was really cold ___ last winter.', NONE],
    ['It is really cold here ___ winter.', 'in'],
  ],
  MIT_NONE,
  TIPP_NONE,
)

const morgenGestern = aus(
  [
    ['I’ll do it ___ tomorrow.', NONE],
    ['Where were you ___ yesterday?', NONE],
    ['I’m very busy ___ today.', NONE],
    ['What are you doing ___ tonight?', NONE],
    ['I brush my teeth ___ every morning.', NONE],
    ['We play tennis ___ every Sunday.', NONE],
    ['I was ill ___ yesterday morning.', NONE],
    ['I’m going to the cinema ___ tomorrow evening.', NONE],
    ['I can’t sleep ___ night.', 'at'],
    ['I brush my teeth ___ the morning.', 'in'],
    ['We play tennis ___ Sundays.', 'on'],
    ['I’ll do it ___ 5 o’clock.', 'at'],
    ['The film was ___ Sunday evening.', 'on'],
    ['I’ll see you ___ the morning.', 'in'],
  ],
  MIT_NONE,
  TIPP_NONE,
)

// ---------------------------------------------------------------------------
// Level 4 · for, since, until, by, during
// ---------------------------------------------------------------------------
const DAUER = ['for', 'since', 'until', 'by', 'during']
const TIPP_DAUER = {
  for: 'for + a length of time: for ten years, for three hours',
  since: 'since + a starting point: since 2015, since Monday, since I was six',
  until: 'until = bis (something continues up to this time)',
  by: 'by = spätestens bis (a deadline)',
  during: 'during + an event or period: during the film, during the holidays',
}

const forSince = aus(
  [
    ['I have lived here ___ ten years.', 'for'],
    ['I have lived here ___ 2015.', 'since'],
    ['She has played the guitar ___ three years.', 'for'],
    ['She has played the guitar ___ she was eight.', 'since'],
    ['We have known each other ___ a long time.', 'for'],
    ['We have known each other ___ primary school.', 'since'],
    ['It has been raining ___ two hours.', 'for'],
    ['It has been raining ___ 6 o’clock.', 'since'],
    ['He has been ill ___ Monday.', 'since'],
    ['He has been ill ___ five days.', 'for'],
    ['I haven’t seen her ___ last summer.', 'since'],
    ['I haven’t seen her ___ months.', 'for'],
    ['They have been married ___ 25 years.', 'for'],
    ['They have been married ___ 1999.', 'since'],
  ],
  DAUER,
  TIPP_DAUER,
)

const untilBy = aus(
  [
    { text: 'The shop is open ___ 8 pm.', answer: 'until', wrong: ['since', 'during', 'for'] },
    { text: 'Please hand in your homework ___ Friday at the latest.', answer: 'by', wrong: ['since', 'during', 'for'] },
    { text: 'I’ll wait here ___ you come back.', answer: 'until', wrong: ['by', 'during', 'for'] },
    { text: 'We stayed at the party ___ midnight.', answer: 'until', wrong: ['by', 'during', 'since'] },
    { text: 'The letter must arrive ___ Monday – that’s the deadline.', answer: 'by', wrong: ['since', 'during', 'for'] },
    { text: 'I slept ___ 10 o’clock this morning.', answer: 'until', wrong: ['by', 'during', 'since'] },
    { text: 'You have to be home ___ 9 pm, not later!', answer: 'by', wrong: ['since', 'during', 'for'] },
    { text: 'The film will be finished ___ 8 o’clock, so we can eat then.', answer: 'by', wrong: ['since', 'during', 'for'] },
    { text: 'Our holiday lasts ___ the end of August.', answer: 'until', wrong: ['by', 'during', 'since'] },
    { text: 'Can you finish the project ___ tomorrow?', answer: 'by', wrong: ['since', 'during', 'for'] },
  ],
  DAUER,
  TIPP_DAUER,
)

const duringFor = aus(
  [
    { text: 'I fell asleep ___ the film.', answer: 'during', wrong: ['for', 'since', 'by'] },
    { text: 'Nobody is allowed to talk ___ the exam.', answer: 'during', wrong: ['for', 'since', 'by'] },
    { text: 'It rained ___ three hours.', answer: 'for', wrong: ['during', 'since', 'by'] },
    { text: '___ the summer holidays we went to Spain.', answer: 'During', wrong: ['For', 'Since', 'By'] },
    { text: 'We stayed in Spain ___ two weeks.', answer: 'for', wrong: ['during', 'since', 'by'] },
    { text: 'My phone rang ___ the lesson.', answer: 'during', wrong: ['for', 'since', 'by'] },
    { text: 'I have to practise the piano ___ 30 minutes every day.', answer: 'for', wrong: ['during', 'since', 'by'] },
    { text: 'The lights went out ___ the concert.', answer: 'during', wrong: ['for', 'since', 'by'] },
    { text: 'He was quiet ___ a few seconds, then he laughed.', answer: 'for', wrong: ['during', 'since', 'by'] },
    { text: 'Please turn off your phones ___ the show.', answer: 'during', wrong: ['for', 'since', 'by'] },
    { text: 'I have been waiting ___ an hour!', answer: 'for', wrong: ['during', 'by', 'until'] },
    { text: 'I have been waiting ___ 3 o’clock!', answer: 'since', wrong: ['during', 'by', 'for'] },
  ],
  DAUER,
  {
    ...TIPP_DAUER,
    During: TIPP_DAUER.during,
  },
)

export default [
  [uhrzeit, tag, monatJahr, datum, gemischt],
  [tageszeit, nachtMittag, tagMitTageszeit, feiertage],
  [nextLast, kontrast, morgenGestern],
  [forSince, untilBy, duringFor],
]
