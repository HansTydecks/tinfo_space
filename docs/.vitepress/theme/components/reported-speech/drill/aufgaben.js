// Reporter-Spiel: Aufgaben je Level, von leicht nach schwer (wie beim Silent Teacher).
// Jede Aufgabe ist eine Funktion ohne Parameter, die eine zufällige Karte liefert:
//   { sprecher: { e, n }, an, kontext, direkt: [teile], bericht: [teile], tipp? }
// Die Teile kommen aus grammatik.js:parse() – Lücken stehen nur im Bericht.

import { pick } from '../../silent-teacher/engine.js'
import {
  FIGUREN, GRUPPEN, VERBEN, ZEIT, DRITTE, ICH, WIR, BACKSHIFT, FALSCH,
  verbForm, parse, ersetze, gross, zuhoerer,
} from './grammatik.js'

const ohneDoppelte = (liste, answer) => [...new Set(liste)].filter((w) => w && w !== answer)
const lueckeAus = (k, answer, falsch) => `[${k}:${[answer, ...ohneDoppelte(falsch, answer)].join('|')}]`

function karte({ sp, an = 'you', d, r, kontext = [], tipp }) {
  const l = typeof an === 'object' ? an : null
  return {
    sprecher: { e: sp.e, n: gross(sp.n) },
    an: l ? l.n : an,
    kontext,
    direkt: parse(gross(ersetze(d, sp, l))),
    bericht: parse(gross(ersetze(r, sp, l))),
    tipp,
  }
}

// ---------------------------------------------------------------------------
// Aussagen aus Bausteinen: Sprecher × Verb × Zeitform (× Zeitangabe)
// ---------------------------------------------------------------------------
/**
 * @param o.tenses  Zeitformen der direkten Rede
 * @param o.says    true: „says" (kein Backshift), Pronomen + Verb als eine Lücke
 * @param o.pron    Pronomen als Lücke (Standard: ja)
 * @param o.tense   Verbform als Lücke (Standard: ja, außer bei says)
 * @param o.poss    Possessivpronomen als Lücke (nur Verben mit {P})
 * @param o.plural  Sprecher ist eine Gruppe (we → they)
 * @param o.zeit    Zeitangabe als Lücke (Zeitform passt zur Zeitangabe)
 */
function aussage(o) {
  const verben = o.poss ? VERBEN.filter((v) => v.rest.includes('{P}')) : VERBEN
  return () => {
    const plural = Boolean(o.plural)
    const sp = pick(plural ? GRUPPEN : FIGUREN)
    const z = o.zeit ? pick(ZEIT) : null
    const t = z ? pick(z.t) : pick(o.tenses)
    const v = pick(verben)
    const says = Boolean(o.says)
    const tR = says ? t : BACKSHIFT[t]
    const agrD = plural ? 'pl' : 'I'
    const agrR = plural ? 'pl' : '3sg'
    const dir = plural ? WIR : ICH
    const rep = DRITTE[sp.g]
    const sonst = plural ? DRITTE[pick(['m', 'f'])] : DRITTE[sp.g === 'm' ? 'f' : 'm']
    const vD = verbForm(t, agrD, v)
    const vR = verbForm(tR, agrR, v)

    // direkte Rede
    const restD = v.rest.replace('{P}', `[pron:${dir.P}]`)
    const satzD = says
      ? `[pron:${gross(dir.S)} ${vD}] ${restD}`
      : `[pron:${gross(dir.S)}] [tense:${vD}] ${restD}`
    const d = `${satzD}${z ? ` [time:${z.d}]` : ''}.`

    // Bericht
    let kern
    if (says) {
      kern = lueckeAus('pron', `${rep.S} ${vR}`, [`${dir.S} ${vD}`, `${sonst.S} ${verbForm(t, '3sg', v)}`])
    } else {
      const p = o.pron === false ? `[pron:${rep.S}]` : lueckeAus('pron', rep.S, [dir.S, sonst.S])
      const falsch = FALSCH[t].map((t2) => verbForm(t2, agrR, v))
      const vb = o.tense === false ? `[tense:${vR}]` : lueckeAus('tense', vR, falsch)
      kern = `${p} ${vb}`
    }
    const restR = v.rest.replace('{P}', o.poss ? lueckeAus('pron', rep.P, [dir.P, sonst.P]) : `[pron:${rep.P}]`)
    const zeitR = z ? ` ${lueckeAus('time', z.r, z.w)}` : ''
    const verb = says ? pick(plural ? ['say', 'say that'] : ['says', 'says that']) : pick(['said', 'said', 'said that'])
    const r = `{N} ${verb} ${kern} ${restR}${zeitR}.`

    const kontext = z ? ['🗓️ said on Monday', '📝 you report it on Friday'] : []
    return karte({ sp, d, r, kontext })
  }
}

// ---------------------------------------------------------------------------
// Handverlesene Sätze: [direkt, bericht] oder { d, r, an: 'named', kontext, tipp }
// ---------------------------------------------------------------------------
function liste(saetze, standard = {}) {
  const items = saetze.map((s) => (Array.isArray(s) ? { d: s[0], r: s[1] } : s)).map((s) => ({ ...standard, ...s }))
  return () => {
    const it = pick(items)
    const sp = pick(FIGUREN)
    const an = it.an === 'named' ? zuhoerer(sp) : it.an ?? 'you'
    return karte({ sp, an, d: it.d, r: it.r, kontext: it.kontext ?? [], tipp: it.tipp })
  }
}

// ---------------------------------------------------------------------------
// Level 1 · Who is speaking? (says → nur Pronomen)
// ---------------------------------------------------------------------------
const zuDir = liste([
  ['[pron:I like] [pron:you].', '{N} says [pron:{he} likes|I like|{o:he} likes] [pron:me|you|{him}].'],
  ['[pron:You are] [pron:my] best friend.', '{N} says [pron:I am|you are|{he} is] [pron:{his}|my|your] best friend.'],
  ['[pron:I need] [pron:your] help.', '{N} says [pron:{he} needs|I need|you need] [pron:my|your|{his}] help.'],
  ['[pron:Your] bag is in [pron:my] car.', '{N} says [pron:my|your|{his}] bag is in [pron:{his}|my|your] car.'],
  ['[pron:I will] call [pron:you] later.', '{N} says [pron:{he} will|I will|you will] call [pron:me|you|{him}] later.'],
  ['[pron:You can] sit next to [pron:me].', '{N} says [pron:I can|you can|{he} can] sit next to [pron:{him}|me|you].'],
  ['[pron:I am] proud of [pron:you].', '{N} says [pron:{he} is|I am|you are] proud of [pron:me|you|{him}].'],
  ['[pron:I have] got a present for [pron:you].', '{N} says [pron:{he} has|I have|you have] got a present for [pron:me|you|{him}].'],
  ['[pron:Your] dog is very cute.', '{N} says [pron:my|your|{his}] dog is very cute.'],
  ['[pron:I know] [pron:your] brother.', '{N} says [pron:{he} knows|I know|you know] [pron:my|your|{his}] brother.'],
  ['[pron:You are] very good at football.', '{N} says [pron:I am|you are|{he} is] very good at football.'],
  ['[pron:I miss] [pron:you].', '{N} says [pron:{he} misses|I miss|you miss] [pron:me|you|{him}].'],
])

const zuJemandem = liste(
  [
    ['[pron:I like] [pron:you], {LN}.', '{N} tells {LN} that [pron:{he} likes|I like|you like] [pron:{L:him}|you|me].'],
    ['[pron:You are] late, {LN}!', '{N} tells {LN} that [pron:{L:he} is|you are|I am] late.'],
    ['[pron:Your] shoes are cool, {LN}.', '{N} tells {LN} that [pron:{L:his}|your|my] shoes are cool.'],
    ['[pron:I can] help [pron:you], {LN}.', '{N} tells {LN} that [pron:{he} can|I can|you can] help [pron:{L:him}|you|me].'],
    ['{LN}, [pron:you are] [pron:my] hero!', '{N} tells {LN} that [pron:{L:he} is|you are|I am] [pron:{his}|my|your] hero.'],
    ['[pron:We are] a great team, {LN}.', '{N} tells {LN} that [pron:they are|we are|you are] a great team.'],
    ['{LN}, [pron:your] phone is ringing.', '{N} tells {LN} that [pron:{L:his}|your|my] phone is ringing.'],
  ],
  { an: 'named' },
)

// ---------------------------------------------------------------------------
// Level 4 · Modalverben – Sätze, die sich schlecht aus Bausteinen bauen lassen
// ---------------------------------------------------------------------------
const modalSaetze = liste([
  ['[pron:I] [tense:would love] a cup of tea.', '{N} said [pron:{he}] [tense:would love|will love|had would love] a cup of tea.'],
  ['[pron:You] [tense:must wear] a helmet.', '{N} said [pron:I|you|{he}] [tense:had to wear|have to wear|had must wear] a helmet.'],
  ['[pron:You] [tense:should eat] more fruit.', '{N} said [pron:I|you|{he}] [tense:should eat|shall eat|had should eat] more fruit.'],
  ['[pron:You] [tense:can use] [pron:my] laptop.', '{N} said [pron:I|you|{he}] [tense:could use|can use|had could use] [pron:{his}|my|your] laptop.'],
  ['It [tense:may rain] later.', '{N} said it [tense:might rain|may rain|had might rain] later.'],
  ['[pron:I] [tense:can’t come] to [pron:your] party.', '{N} said [pron:{he}] [tense:couldn’t come|can’t come|hadn’t could come] to [pron:my|your|{his}] party.'],
  ['[pron:We] [tense:must leave] at six.', '{N} said [pron:they|we|you] [tense:had to leave|have to leave|had must leave] at six.'],
  ['[pron:You] [tense:might need] an umbrella.', '{N} said [pron:I|you|{he}] [tense:might need|may need|had might need] an umbrella.'],
])

// ---------------------------------------------------------------------------
// Level 5 · here → there, this → that
// ---------------------------------------------------------------------------
const PLATZ = { kontext: ['📍 said at the beach', '📝 you report it at school'] }
const ort = liste([
  { d: '[pron:I] [tense:love] it [time:here]!', r: '{N} said [pron:{he}] [tense:loved|loves|has loved] it [time:there|here|where].' },
  { d: 'It [tense:is] very windy [time:here].', r: '{N} said it [tense:was|is|has been] very windy [time:there|here|that].' },
  { d: '[pron:I] [tense:don’t like] [time:this] town.', kontext: [], r: '{N} said [pron:{he}] [tense:didn’t like|doesn’t like|hadn’t like] [time:that|this|there] town.' },
  { d: '[time:These] shoes [tense:are] too small.', kontext: [], r: '{N} said [time:those|these|them] shoes [tense:were|are|was] too small.' },
  { d: '[pron:I] [tense:have lived] [time:here] for ten years.', kontext: ['📍 said in London', '📝 you report it in Berlin'], r: '{N} said [pron:{he}] [tense:had lived|has lived|lives] [time:there|here|that] for ten years.' },
  { d: '[time:This] film [tense:is] boring.', kontext: [], r: '{N} said [time:the|this|these] film [tense:was|is|has been] boring.', tipp: 'this film → that film / the film (it is not here any more)' },
  { d: '[pron:I] [tense:am staying] [time:here] [time:tonight].', kontext: ['📍 said at a hotel on Monday', '📝 you report it at home on Friday'], r: '{N} said [pron:{he}] [tense:was staying|is staying|had stayed] [time:there|here|then] [time:that night|tonight|last night].' },
  { d: '[pron:I] [tense:will meet] [pron:you] [time:here] [time:tomorrow].', kontext: ['📍 said at the station on Monday', '📝 you report it at home on Friday'], r: '{N} said [pron:{he}] [tense:would meet|will meet|had met] [pron:me|you|{him}] [time:there|here|that] [time:the next day|tomorrow|the day before].' },
  { d: '[pron:I] [tense:bought] [time:this] bag [time:yesterday].', kontext: ['🗓️ said on Monday', '📝 you report it on Friday'], r: '{N} said [pron:{he}] [tense:had bought|has bought|buys] [time:that|this|those] bag [time:the day before|yesterday|the next day].' },
  { d: 'The food [tense:is] great [time:here].', r: '{N} said the food [tense:was|is|were] great [time:there|here|where].' },
], PLATZ)

// ---------------------------------------------------------------------------
// Level 6 · say or tell? – und die Präpositionen der Redeverben
// ---------------------------------------------------------------------------
const TIPP_SAYTELL = 'tell + person (told me) – no “to”! · say (that) … or say to + person'
const sayTell = liste(
  [
    ['[pron:I] am tired.', '{N} [rep:told|said|talked] me (that) {he} was tired.'],
    ['[pron:I] am tired.', '{N} [rep:said|told|said me] (that) {he} was tired.'],
    ['[pron:I] am tired.', '{N} said [rep:to|—|for] me that {he} was tired.'],
    ['The test is easy.', '{N} [rep:told|said|said that] me the test was easy.'],
    ['[pron:I] live in Leeds.', '{N} [rep:told|said|told to] me that {he} lived in Leeds.'],
    ['[pron:I] like [pron:your] idea.', '{N} [rep:said|told|said me] that {he} liked my idea.'],
    ['[pron:Your] bike is in the garage.', '{N} told [rep:me|to me|—] that my bike was in the garage.'],
    ['[pron:I] am going home.', '{N} [rep:said|told|told that] {he} was going home.'],
    ['The bus is late.', '{N} [rep:told|said|talked] us that the bus was late.'],
    ['[pron:I] don’t know.', '{N} [rep:replied|told|said me] that {he} didn’t know.'],
    ['[pron:I] will be back soon.', '{N} [rep:said|told|said us] {he} would be back soon.'],
    ['[pron:You] have won!', '{N} [rep:told|said|talked] me that I had won.'],
  ],
  { tipp: TIPP_SAYTELL },
)

const TIPP_PREP = 'explain / reply / say + to sb · apologise for · complain about · thank sb for · tell sb (no to)'
const redeverben = liste(
  [
    { d: 'The bus is late because of the snow.', r: '{N} explained [rep:to|—|for] us that the bus was late.', tipp: 'explain + to + person: She explained to us … (not: explained us)' },
    { d: 'The answer is wrong.', r: '{N} [rep:explained|explained me|told to me] that the answer was wrong.', tipp: 'explain (to sb) that … – never “explain me”' },
    { d: 'I’m sorry I’m late.', r: '{N} apologised [rep:for|to|about] being late.', tipp: 'apologise for + -ing: He apologised for being late.' },
    { d: 'Sorry, Mr Smith!', r: '{N} apologised [rep:to|for|at] Mr Smith.', tipp: 'apologise to + person: She apologised to the teacher.' },
    { d: 'The music is too loud!', r: '{N} complained [rep:about|for|to] the loud music.', tipp: 'complain about + thing: He complained about the noise.' },
    { d: 'Thank you for the present!', r: '{N} thanked me [rep:for|about|to] the present.', tipp: 'thank sb for sth: She thanked me for the present.' },
    { d: '[pron:I] will call [pron:you].', r: '{N} promised [rep:to|for|—] call me.', tipp: 'promise to do: He promised to call me.' },
    { d: 'Yes, [pron:I] can come.', r: '{N} replied [rep:to|—|at] my message that {he} could come.', tipp: 'reply to + person / message' },
    { d: 'The ice is thin!', r: '{N} warned [rep:us|to us|for us] that the ice was thin.', tipp: 'warn + person (no to): She warned us that …' },
    { d: 'Don’t forget [pron:your] keys!', r: '{N} reminded [rep:me|to me|for me] not to forget my keys.', tipp: 'remind + person + to do: He reminded me to …' },
    { d: 'Pizza is my favourite food.', r: '{N} said [rep:to|—|at] me that pizza was {his} favourite food.', tipp: 'say to + person (or just: said that …)' },
  ],
  { tipp: TIPP_PREP },
)

// ---------------------------------------------------------------------------
// Level 7 · Questions
// ---------------------------------------------------------------------------
const TIPP_JANEIN = 'yes/no question → asked if / whether + subject + verb: Are you OK? → asked if I was OK.'
const jaNein = liste(
  [
    ['Are [pron:you] hungry?', '{N} asked me [order:if|that|what] [order:I was|was I|I am] hungry.'],
    ['Do [pron:you] like pizza?', '{N} asked me [order:if|that|do] [order:I liked|did I like|I like] pizza.'],
    ['Can [pron:you] swim?', '{N} asked me [order:whether|that|can] [order:I could swim|could I swim|I can swim].'],
    ['Have [pron:you] finished?', '{N} asked me [order:if|that|have] [order:I had finished|had I finished|I have finished].'],
    ['Is it raining?', '{N} asked me [order:if|that|is] [order:it was raining|was it raining|it is raining].'],
    ['Will [pron:you] help [pron:me]?', '{N} asked me [order:if|that|will] [order:I would help|would I help|I will help] [pron:{him}|me|you].'],
    ['Did [pron:you] see the match?', '{N} asked me [order:if|that|did] [order:I had seen|did I see|had I seen] the match.'],
    ['Are [pron:you] OK?', '{N} asked me [order:if|that|are] [order:I was|was I|I am] OK.'],
    ['Do [pron:you] have a pet?', '{N} asked me [order:whether|that|do] [order:I had|did I have|I have] a pet.'],
    ['Is [pron:your] sister at home?', '{N} asked me [order:if|that|is] [order:my sister was|was my sister|my sister is] at home.'],
    ['Does [pron:your] dad cook?', '{N} asked me [order:if|that|does] [order:my dad cooked|did my dad cook|my dad cooks].'],
    ['Shall [pron:I] open the window?', '{N} asked [order:if|that|shall] [order:{he} should open|should {he} open|{he} shall open] the window.'],
    ['Can [pron:I] borrow [pron:your] pen?', '{N} asked [order:if|that|can] [order:{he} could borrow|could {he} borrow|{he} can borrow] my pen.'],
    ['Are [pron:you] coming to the party?', '{N} asked me [order:whether|that|are] [order:I was coming|was I coming|I am coming] to the party.'],
  ],
  { tipp: TIPP_JANEIN },
)

const TIPP_W = 'wh-question → asked + question word + subject + verb (no do / does / did, no ?)'
const wFragen = liste(
  [
    ['Where do [pron:you] live?', '{N} asked me [order:where I lived|where did I live|where I live].'],
    ['What do [pron:you] want for [pron:your] birthday?', '{N} asked me [order:what I wanted|what did I want|what I want] for my birthday.'],
    ['Why are [pron:you] sad?', '{N} asked me [order:why I was sad|why was I sad|why I am sad].'],
    ['What are [pron:you] doing?', '{N} asked me [order:what I was doing|what was I doing|what I am doing].'],
    ['How old are [pron:you]?', '{N} asked me [order:how old I was|how old was I|how old I am].'],
    ['Where have [pron:you] been?', '{N} asked me [order:where I had been|where had I been|where I have been].'],
    ['What will [pron:you] do after school?', '{N} asked me [order:what I would do|what would I do|what I will do] after school.'],
    ['When does the film start?', '{N} asked me [order:when the film started|when did the film start|when the film starts].'],
    ['Where is the station?', '{N} asked me [order:where the station was|where was the station|where the station is].'],
    ['What time is it?', '{N} asked me [order:what time it was|what time was it|what time it is].'],
    ['How do [pron:you] get to school?', '{N} asked me [order:how I got to school|how did I get to school|how I get to school].'],
    ['Why did [pron:you] leave early?', '{N} asked me [order:why I had left early|why did I leave early|why had I left early].'],
    ['What is [pron:your] name?', '{N} asked me [order:what my name was|what was my name|what my name is].'],
    ['Which bus do [pron:you] take?', '{N} asked me [order:which bus I took|which bus did I take|which bus I take].'],
    ['Where are [pron:you] going?', '{N} asked me [order:where I was going|where was I going|where I am going].'],
    ['What did [pron:you] eat?', '{N} asked me [order:what I had eaten|what did I eat|what had I eaten].'],
    ['What can [pron:you] see?', '{N} asked me [order:what I could see|what could I see|what I can see].'],
    ['How much does it cost?', '{N} asked me [order:how much it cost|how much did it cost|how much it costs].'],
  ],
  { tipp: TIPP_W },
)

const frageMix = liste(
  [
    ['Where do [pron:you] live?', '{N} asked me [order:where|if|that] [order:I lived|did I live|I live].'],
    ['Do [pron:you] live near here?', '{N} asked me [order:if|where|that] [order:I lived|did I live|I live] near there.'],
    ['What are [pron:you] reading?', '{N} asked me [order:what|if|that] [order:I was reading|was I reading|I am reading].'],
    ['Are [pron:you] reading?', '{N} asked me [order:if|what|that] [order:I was reading|was I reading|I am reading].'],
    ['Why is [pron:your] brother angry?', '{N} asked me [order:why|if|that] [order:my brother was|was my brother|my brother is] angry.'],
    ['Is [pron:your] brother angry?', '{N} asked me [order:if|why|that] [order:my brother was|was my brother|my brother is] angry.'],
    ['Where did [pron:you] buy [pron:your] jacket?', '{N} asked me [order:where|if|that] [order:I had bought|did I buy|I buy] [pron:my|your|{his}] jacket.'],
    ['Has [pron:your] cat had kittens?', '{N} asked me [order:whether|what|that] [order:my cat had had|had my cat had|my cat has had] kittens.'],
  ],
  { tipp: 'Question word? → keep it (where, what …). No question word? → if / whether. Then: subject + verb.' },
)

// ---------------------------------------------------------------------------
// Level 8 · Commands & requests
// ---------------------------------------------------------------------------
const TIPP_BEFEHL = 'told / asked + person + to + verb: Sit down! → She told me to sit down.'
const befehle = liste(
  [
    ['Open the window, please!', '{N} [rep:asked|said|said to] me [order:to open|open|that I open] the window.'],
    ['Sit down!', '{N} [rep:told|said|told to] me [order:to sit|sit|sitting] down.'],
    ['Close the door, please.', '{N} [rep:asked|said|asked to] me [order:to close|close|closing] the door.'],
    ['Be quiet!', '{N} [rep:told|said|told to] us [order:to be|be|being] quiet.'],
    ['Wait here!', '{N} told me [order:to wait|wait|waiting] [time:there|here|that].'],
    ['Please help me!', '{N} asked me [order:to help|help|that I help] [pron:{him}|me|{o:him}].'],
    ['Tidy [pron:your] room!', '{N} told me [order:to tidy|tidy|tidying] [pron:my|your|{his}] room.'],
    ['Wash [pron:your] hands!', '{N} told us [order:to wash|wash|washing] [pron:our|your|their] hands.'],
    ['Could you carry my bag, please?', '{N} asked me [order:to carry|carry|if I carry] [pron:{his}|my|your] bag.'],
    ['Stay in bed for two days!', '{N} [rep:advised|said|advised to] me [order:to stay|stay|staying] in bed for two days.'],
    ['Turn off [pron:your] phones!', '{N} told us [order:to turn off|turn off|turning off] [pron:our|your|their] phones.'],
  ],
  { tipp: TIPP_BEFEHL },
)

const TIPP_NICHT = 'Don’t … ! → told + person + not to + verb: Don’t shout! → He told us not to shout.'
const verbote = liste(
  [
    ['Don’t shout!', '{N} told us [order:not to shout|don’t shout|to don’t shout].'],
    ['Don’t be late!', '{N} told me [order:not to be|don’t be|to not being] late.'],
    ['Don’t touch the dog!', '{N} [rep:warned|said|warned to] me [order:not to touch|don’t touch|to touch not] the dog.'],
    ['Don’t eat in class!', '{N} told us [order:not to eat|don’t eat|not eating] in class.'],
    ['Don’t forget [pron:your] keys!', '{N} reminded me [order:not to forget|don’t forget|to forget not] [pron:my|your|{his}] keys.'],
    ['Please don’t tell anyone.', '{N} asked me [order:not to tell|don’t tell|to don’t tell] anyone.'],
    ['Don’t run in the corridor!', '{N} told us [order:not to run|don’t run|not running] in the corridor.'],
    ['Don’t worry!', '{N} told me [order:not to worry|don’t worry|to not worrying].'],
    ['Don’t open the box!', '{N} [rep:told|said|told to] me [order:not to open|don’t open|to don’t open] the box.'],
  ],
  { tipp: TIPP_NICHT },
)

const befehlMix = liste(
  [
    ['Please call [pron:me] [time:tomorrow].', '{N} asked me [order:to call|call|calling] [pron:{him}|me|{o:him}] [time:the next day|tomorrow|the day before].'],
    ['Don’t touch [pron:my] laptop!', '{N} told me [order:not to touch|don’t touch|to not touching] [pron:{his}|my|your] laptop.'],
    ['Bring [pron:your] books [time:tomorrow]!', '{N} told us [order:to bring|bring|bringing] [pron:our|your|their] books [time:the next day|tomorrow|that day].'],
    ['Help [pron:me] with [time:this] box, please.', '{N} asked me [order:to help|help|helping] [pron:{him}|me|you] with [time:that|this|these] box.'],
  ],
  { kontext: ['🗓️ said on Monday', '📝 you report it on Friday'], tipp: 'Command → (not) to + verb. Then check the pronouns and time / place words.' },
)

// ---------------------------------------------------------------------------
// Alle Level: je ein Array von Aufgaben, von leicht nach schwer
// ---------------------------------------------------------------------------
const PRES = ['present simple', 'present progressive']
const ALLE_ZEITEN = ['present simple', 'present progressive', 'present perfect', 'past simple', 'past progressive', 'will', 'going to']

const L1 = [
  aussage({ says: true, tenses: ['present simple'] }),
  aussage({ says: true, tenses: ['present simple', 'present progressive', 'will', 'can'] }),
  aussage({ says: true, tenses: ['present simple'], plural: true }),
  zuDir,
  zuJemandem,
]
const L2 = [
  aussage({ tenses: ['present simple'], pron: false }),
  aussage({ tenses: ['present simple'] }),
  aussage({ tenses: ['present progressive'] }),
  aussage({ tenses: PRES, poss: true }),
  aussage({ tenses: PRES, plural: true, poss: true }),
]
const L3 = [
  aussage({ tenses: ['present perfect'] }),
  aussage({ tenses: ['past simple'] }),
  aussage({ tenses: ['will', 'going to'] }),
  aussage({ tenses: ['past progressive'] }),
  aussage({ tenses: ALLE_ZEITEN, poss: true }),
]
const L4 = [
  aussage({ tenses: ['can'], pron: false }),
  aussage({ tenses: ['may', 'must'], pron: false }),
  aussage({ tenses: ['could', 'should', 'might'], pron: false }),
  modalSaetze,
  aussage({ tenses: ['can', 'may', 'must', 'could', 'should', 'might'], poss: true }),
]
const L5 = [
  aussage({ zeit: true, pron: false, tense: false }),
  aussage({ zeit: true, pron: false }),
  ort,
  aussage({ zeit: true }),
]
const L6 = [sayTell, redeverben]
const L7 = [jaNein, wFragen, frageMix]
const L8 = [befehle, verbote, befehlMix]
const L9 = [
  aussage({ tenses: ALLE_ZEITEN, poss: true }),
  aussage({ zeit: true }),
  aussage({ tenses: ['can', 'may', 'must', 'could', 'should', 'might'] }),
  ort, sayTell, redeverben, frageMix, befehlMix,
]

export default [L1, L2, L3, L4, L5, L6, L7, L8, L9]
