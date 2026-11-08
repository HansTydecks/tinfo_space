// Alle Kapitel des englischen Silent Teachers (Prepositions) – nur Metadaten, damit der Button auf
// den Lektionsseiten klein bleibt. Die Aufgaben liegen in ./<id>.js (ein Array pro Level, gleiche
// Reihenfolge wie `level`). Die id ist zugleich der Dateiname der Lektionsseite.

const P = '/students/english/grammar/prepositions'

export const KURS_PFAD = `${P}/`
export const SILENT_TEACHER_PFAD = `${P}/silent-teacher`

export const ABSCHNITTE = [
  { id: 'types', titel: 'Types of prepositions' },
  { id: 'mixed', titel: 'Everything mixed' },
]

const kapitel = (abschnitt, id, titel, deutsch, level, lektion = `${P}/${id}`) => ({
  id,
  titel,
  deutsch,
  abschnitt,
  lektion,
  level,
})

export const KAPITEL = [
  kapitel('types', 'time', 'Prepositions of time', 'Zeit: wann? wie lange?', [
    'at, on, in',
    'Parts of the day & holidays',
    'No preposition',
    'for, since, until, by, during',
  ]),
  kapitel('types', 'place', 'Prepositions of place', 'Ort: wo?', [
    'in, on, under',
    'More positions',
    'at, in or on?',
    'near, opposite, among …',
  ]),
  kapitel('types', 'movement', 'Prepositions of movement', 'Bewegung: wohin?', [
    'into, out of, onto, off',
    'up, down, over, under …',
    'across, along, past …',
    'go, get, arrive',
  ]),
  kapitel('types', 'manner', 'Prepositions of manner', 'Art und Weise: wie?', [
    'by bus, on foot',
    'Fixed phrases',
    'with, without, like, as',
  ]),
  kapitel('types', 'agent-instrument', 'Prepositions of agent & instrument', 'Wer? Womit?', [
    'by – who did it?',
    'with – what tool?',
    'by or with?',
  ]),
  kapitel('types', 'measure', 'Prepositions of measure', 'Menge und Maß: wie viel?', [
    'a cup of tea',
    'by and per',
    'at, out of, about, up to …',
  ]),
  kapitel('types', 'source', 'Prepositions of source', 'Herkunft: woher?', [
    'from',
    'made of or made from?',
    'from, by, out of',
  ]),
  kapitel('types', 'possession', 'Prepositions of possession', 'Besitz: wem? mit was?', [
    'of',
    'with and without',
    'belong to, a friend of mine',
  ]),
  kapitel(
    'mixed',
    'mixed',
    'All prepositions',
    'Alles gemischt',
    ['Time or place?', 'Where and where to?', 'How, who, with what?', 'How much, where from, whose?', 'Everything'],
    KURS_PFAD,
  ),
]

export function findKapitel(id) {
  return KAPITEL.find((k) => k.id === id) ?? null
}

export function kapitelIndex(id) {
  return KAPITEL.findIndex((k) => k.id === id)
}
