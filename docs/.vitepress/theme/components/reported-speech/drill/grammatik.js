// Reported Speech – Grammatik-Bausteine für das Reporter-Spiel (reine Logik, ohne Vue).
//
// Aufgaben werden als kleine Text-Schablonen geschrieben und mit parse() in Karten verwandelt:
//   [k:wort]              markiertes Wort (farbig, keine Lücke) – k = pron | tense | time | rep | order
//   [k:richtig|falsch|…]  Lücke mit richtiger Antwort und falschen Antworten
//   {N} {he} {him} {his}  Sprecher (Name, Pronomen); {o:he} … = anderes Geschlecht
//   {LN} {L:he} …         angesprochene Person (Name, Pronomen)

import { pick } from '../../silent-teacher/engine.js'

export const NONE = '—'

// ---------------------------------------------------------------------------
// Figuren
// ---------------------------------------------------------------------------
const F = (e, n, g) => ({ e, n, g })
export const FIGUREN = [
  F('👦', 'Tom', 'm'), F('👧', 'Anna', 'f'), F('🧒', 'Max', 'm'), F('👱‍♀️', 'Lisa', 'f'),
  F('👵', 'Grandma', 'f'), F('👴', 'Grandpa', 'm'), F('👨‍🏫', 'Mr Brown', 'm'), F('👩‍🏫', 'Ms Clark', 'f'),
  F('👩', 'Mum', 'f'), F('👨', 'Dad', 'm'), F('👨‍🍳', 'the chef', 'm'), F('👩‍⚕️', 'the doctor', 'f'),
  F('🧔', 'Uncle Joe', 'm'), F('👩‍🎤', 'the singer', 'f'), F('👮‍♂️', 'the police officer', 'm'), F('👩‍🦰', 'Emma', 'f'),
]
export const GRUPPEN = [
  F('👫', 'Tom and Anna', 'pl'), F('👯', 'the twins', 'pl'), F('👨‍👩‍👧', 'the Millers', 'pl'),
  F('👬', 'Ben and Max', 'pl'), F('👭', 'Lisa and Mia', 'pl'),
]
export const ZUHOERER = [F('', 'Ben', 'm'), F('', 'Jack', 'm'), F('', 'Mia', 'f'), F('', 'Sophie', 'f')]

export const gross = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// ---------------------------------------------------------------------------
// Pronomen
// ---------------------------------------------------------------------------
export const DRITTE = {
  m: { S: 'he', O: 'him', P: 'his' },
  f: { S: 'she', O: 'her', P: 'her' },
  pl: { S: 'they', O: 'them', P: 'their' },
}
export const ICH = { S: 'I', O: 'me', P: 'my' }
export const WIR = { S: 'we', O: 'us', P: 'our' }
export const SUBJ = ['I', 'you', 'he', 'she', 'we', 'they']
export const POSS = ['my', 'your', 'his', 'her', 'our', 'their']
const anders = (g) => (g === 'm' ? 'f' : 'm')

/** Platzhalter für Sprecher (sp) und angesprochene Person (an) ersetzen */
export function ersetze(text, sp, an) {
  const d = DRITTE[sp.g]
  const o = DRITTE[anders(sp.g)]
  const l = an ? DRITTE[an.g] : null
  return text
    .replaceAll('{N}', sp.n)
    .replaceAll('{he}', d.S)
    .replaceAll('{him}', d.O)
    .replaceAll('{his}', d.P)
    .replaceAll('{o:he}', o.S)
    .replaceAll('{o:him}', o.O)
    .replaceAll('{o:his}', o.P)
    .replaceAll('{LN}', an?.n ?? '')
    .replaceAll('{L:he}', l?.S ?? '')
    .replaceAll('{L:him}', l?.O ?? '')
    .replaceAll('{L:his}', l?.P ?? '')
}

// ---------------------------------------------------------------------------
// Verben und Zeitformen
// ---------------------------------------------------------------------------
/** base | 3. Person | past | past participle | -ing | Ergänzung ({P} = Possessivpronomen) */
const VERB_LISTE = [
  'play|plays|played|played|playing|football',
  'watch|watches|watched|watched|watching|a film',
  'read|reads|read|read|reading|a comic',
  'cook|cooks|cooked|cooked|cooking|dinner',
  'clean|cleans|cleaned|cleaned|cleaning|{P} room',
  'do|does|did|done|doing|{P} homework',
  'write|writes|wrote|written|writing|a letter',
  'learn|learns|learned|learned|learning|Spanish',
  'visit|visits|visited|visited|visiting|{P} grandma',
  'call|calls|called|called|calling|{P} best friend',
  'ride|rides|rode|ridden|riding|{P} bike',
  'eat|eats|ate|eaten|eating|pizza',
  'help|helps|helped|helped|helping|{P} dad',
  'paint|paints|painted|painted|painting|a picture',
  'practise|practises|practised|practised|practising|the piano',
  'wash|washes|washed|washed|washing|the car',
  'feed|feeds|fed|fed|feeding|the cat',
  'make|makes|made|made|making|a cake',
  'tidy|tidies|tidied|tidied|tidying|the kitchen',
  'listen|listens|listened|listened|listening|to music',
  'sing|sings|sang|sung|singing|a song',
  'take|takes|took|taken|taking|photos',
  'fix|fixes|fixed|fixed|fixing|{P} skateboard',
  'build|builds|built|built|building|a treehouse',
  'buy|buys|bought|bought|buying|new shoes',
  'drink|drinks|drank|drunk|drinking|hot chocolate',
  'draw|draws|drew|drawn|drawing|a dragon',
  'walk|walks|walked|walked|walking|the dog',
  'swim|swims|swam|swum|swimming|in the lake',
  'bake|bakes|baked|baked|baking|cookies',
  'wear|wears|wore|worn|wearing|{P} new jacket',
  'meet|meets|met|met|meeting|{P} cousins',
  'feed|feeds|fed|fed|feeding|{P} rabbits',
  'study|studies|studied|studied|studying|for the test',
  'carry|carries|carried|carried|carrying|the boxes',
]
export const VERBEN = VERB_LISTE.map((z) => {
  const [base, s, past, pp, ing, rest] = z.split('|')
  return { base, s, past, pp, ing, rest }
})

const bePres = (agr) => (agr === 'I' ? 'am' : agr === '3sg' ? 'is' : 'are')
const bePast = (agr) => (agr === 'pl' ? 'were' : 'was')
const MODALE = ['can', 'could', 'may', 'might', 'must', 'should', 'shall', 'will', 'would']

/**
 * Verbform. agr: 'I' | '3sg' | 'pl' (we, you, they).
 * Zeitformen: present simple … past perfect progressive, will, would, going to, was going to,
 * Modalverben (can, could …), 'had to', 'have to' und falsche Formen wie 'had could'.
 */
export function verbForm(tense, agr, v) {
  switch (tense) {
    case 'present simple': return agr === '3sg' ? v.s : v.base
    case 'present progressive': return `${bePres(agr)} ${v.ing}`
    case 'present perfect': return `${agr === '3sg' ? 'has' : 'have'} ${v.pp}`
    case 'past simple': return v.past
    case 'past progressive': return `${bePast(agr)} ${v.ing}`
    case 'past perfect': return `had ${v.pp}`
    case 'past perfect progressive': return `had been ${v.ing}`
    case 'going to': return `${bePres(agr)} going to ${v.base}`
    case 'was going to': return `${bePast(agr)} going to ${v.base}`
    case 'had to': return `had to ${v.base}`
    case 'have to': return `${agr === '3sg' ? 'has' : 'have'} to ${v.base}`
  }
  if (MODALE.includes(tense)) return `${tense} ${v.base}`
  if (tense.startsWith('had ') && MODALE.includes(tense.slice(4))) return `${tense} ${v.base}`
  throw new Error(`verbForm: unbekannte Zeitform ${tense}`)
}

export const BACKSHIFT = {
  'present simple': 'past simple',
  'present progressive': 'past progressive',
  'present perfect': 'past perfect',
  'past simple': 'past perfect',
  'past progressive': 'past perfect progressive',
  'past perfect': 'past perfect',
  'will': 'would',
  'going to': 'was going to',
  'can': 'could',
  'may': 'might',
  'must': 'had to',
  'could': 'could',
  'would': 'would',
  'should': 'should',
  'might': 'might',
}

/** Typische falsche Formen nach „said" (die erste ist immer die unverschobene Form) */
export const FALSCH = {
  'present simple': ['present simple', 'present perfect', 'past perfect'],
  'present progressive': ['present progressive', 'past perfect', 'present simple'],
  'present perfect': ['present perfect', 'present simple', 'past progressive'],
  'past simple': ['present perfect', 'present simple'],
  'past progressive': ['present progressive', 'present perfect'],
  'will': ['will', 'past simple'],
  'going to': ['going to', 'past perfect'],
  'can': ['can', 'had could'],
  'may': ['may', 'had might'],
  'must': ['have to', 'had must'],
  'could': ['can', 'had could'],
  'should': ['shall', 'had should'],
  'might': ['may', 'had might'],
  'would': ['will', 'had would'],
}

// ---------------------------------------------------------------------------
// Zeit- und Ortsangaben
// ---------------------------------------------------------------------------
const Z = (d, r, w, t) => ({ d, r, w, t })
export const ZEIT = [
  Z('today', 'that day', ['today', 'the day before'], ['present progressive', 'past simple']),
  Z('tomorrow', 'the next day', ['tomorrow', 'the day before'], ['will', 'going to']),
  Z('yesterday', 'the day before', ['yesterday', 'the next day'], ['past simple']),
  Z('tonight', 'that night', ['tonight', 'last night'], ['will', 'going to']),
  Z('now', 'then', ['now', 'there'], ['present progressive']),
  Z('last week', 'the week before', ['last week', 'the week after'], ['past simple']),
  Z('next week', 'the week after', ['next week', 'the week before'], ['will', 'going to']),
  Z('two days ago', 'two days before', ['two days ago', 'two days after'], ['past simple']),
  Z('this morning', 'that morning', ['this morning', 'the morning after'], ['past simple']),
  Z('last year', 'the year before', ['last year', 'the next year'], ['past simple']),
  Z('next year', 'the year after', ['next year', 'the year before'], ['will', 'going to']),
  Z('this week', 'that week', ['this week', 'the week before'], ['present progressive', 'will']),
]

// ---------------------------------------------------------------------------
// Schablonen → Karte
// ---------------------------------------------------------------------------
const MARKE = /\[(\w+):([^\]]+)\]/g

/**
 * Text mit Marken/Lücken in Teile zerlegen:
 *   'text' | { t, k } (Marke) | { k, answer, wrong } (Lücke)
 */
export function parse(text) {
  const teile = []
  let pos = 0
  for (const m of text.matchAll(MARKE)) {
    if (m.index > pos) teile.push(text.slice(pos, m.index))
    const [answer, ...wrong] = m[2].split('|')
    teile.push(wrong.length ? { k: m[1], answer, wrong } : { t: answer, k: m[1] })
    pos = m.index + m[0].length
  }
  if (pos < text.length) teile.push(text.slice(pos))
  return teile
}

/** zufällige Figur, optional ohne bestimmte Namen */
export function figur(liste = FIGUREN) {
  return pick(liste)
}

/** angesprochene Person mit anderem Geschlecht als der Sprecher */
export function zuhoerer(sp) {
  return pick(ZUHOERER.filter((z) => z.g !== sp.g && z.n !== sp.n))
}
