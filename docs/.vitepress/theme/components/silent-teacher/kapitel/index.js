// Alle Silent-Teacher-Kapitel in Kursreihenfolge – nur Metadaten, damit der Button auf den
// Lektionsseiten klein bleibt. Die Aufgaben liegen in ./<id>.js (ein Array pro Level, gleiche
// Reihenfolge wie `level`). Die id ist zugleich der Dateiname der Lektionsseite.

const PK = '/students/informatik/algorithmen/python-kurs'

export const KURS_PFAD = `${PK}/`
export const SILENT_TEACHER_PFAD = `${PK}/silent-teacher`

export const ABSCHNITTE = [
  { id: 'grundlagen', titel: 'Grundlagen' },
  { id: 'einsteiger', titel: 'Für Einsteiger' },
  { id: 'fortgeschritten', titel: 'Für Fortgeschrittene' },
]

const kapitel = (abschnitt, id, titel, level) => ({
  id,
  titel,
  abschnitt,
  lektion: `${PK}/${abschnitt}/${id}`,
  level,
})

export const KAPITEL = [
  // Grundlagen
  kapitel('grundlagen', 'datentypen', 'Datentypen', [
    'Welcher Typ?',
    'Umwandeln',
    'Zeichen und Elemente',
  ]),
  kapitel('grundlagen', 'operatoren', 'Operatoren', [
    'Punkt vor Strich',
    'Teilen und Rest',
    'Vergleichen und verknüpfen',
    'Kurzschreibweisen',
  ]),
  kapitel('grundlagen', 'methoden', 'Methoden', [
    'String-Methoden',
    'Zerlegen mit split',
    'Listen-Methoden',
    'Zufall und Runden',
  ]),

  // Für Einsteiger
  kapitel('einsteiger', 'erste-schritte', 'Erste Schritte', [
    'Mit Variablen rechnen',
    'Werte überschreiben',
    'Zwei Variablen',
  ]),
  kapitel('einsteiger', 'ausgabe', 'Ausgabe mit print()', [
    'Mehrere Werte',
    'Plus bei Text',
    'f-Strings',
    'sep und end',
  ]),
  kapitel('einsteiger', 'selektion', 'Selektion', [
    'if ohne else',
    'if und else',
    'elif-Ketten',
    'Bedingungen kombinieren',
  ]),
  kapitel('einsteiger', 'while-schleife', 'while-Schleife', [
    'Hochzählen',
    'Schrittweiten',
    'Summen',
  ]),
  kapitel('einsteiger', 'for-schleife', 'for-Schleife', [
    'Über Listen',
    'range()',
    'Über Strings',
    'Verschachtelt',
  ]),
  kapitel('einsteiger', 'listen', 'Listen', [
    'Zugriff per Index',
    'Listen verändern',
    'Listen auswerten',
    'Slicing',
  ]),
  kapitel('einsteiger', 'funktionen', 'Funktionen', [
    'def und return',
    'Mehrere Parameter',
    'Aufrufe verschachteln',
    'None und lokale Variablen',
  ]),
  kapitel('einsteiger', 'eingabe', 'Eingabe mit input()', [
    'input() liefert Text',
    'Umwandeln',
    'Ungültige Eingaben',
  ]),

  // Für Fortgeschrittene
  kapitel('fortgeschritten', 'schleifen-steuern', 'Schleifen steuern', [
    'break',
    'continue',
    'Gemischt',
  ]),
  kapitel('fortgeschritten', 'do-while', 'do-while & try/except', [
    'while True',
    'try und except',
    'Nicht abgefangen',
  ]),
  kapitel('fortgeschritten', 'iterativ-rekursiv', 'Iterativ & rekursiv', [
    'Rekursive Summe',
    'Fakultät',
    'Reihenfolge der Aufrufe',
    'Ohne Basisfall',
  ]),
  kapitel('fortgeschritten', 'komplexitaet', 'Komplexität', [
    'Schritte zählen',
    'Verschachtelte Schleifen',
    'Halbieren',
  ]),
  kapitel('fortgeschritten', 'lineare-suche', 'Lineare Suche, Max/Min', [
    'Lineare Suche',
    'Maximum und Minimum',
    'Summe und Mittelwert',
    'Vergleiche zählen',
  ]),
  kapitel('fortgeschritten', 'binaere-suche', 'Binäre Suche', [
    'Die Mitte',
    'Ein Schritt',
    'Schritte zählen',
  ]),
  kapitel('fortgeschritten', 'primzahlen-teiler', 'Primzahlen & GGT', [
    'Teilbarkeit',
    'Teiler zählen',
    'Primzahltest',
    'Euklid',
  ]),
  kapitel('fortgeschritten', 'fibonacci', 'Fibonacci', [
    'Iterativ',
    'Rekursiv',
    'Aufrufe zählen',
  ]),
  kapitel('fortgeschritten', 'ziffern', 'Ziffern & Stellenwerte', [
    'Letzte Ziffer',
    'Quersumme',
    'Rückwärts',
  ]),
  kapitel('fortgeschritten', 'palindrom', 'Palindrome', [
    'Umkehren',
    'Aufräumen',
    'Mit einer Schleife',
  ]),
  kapitel('fortgeschritten', 'textanalyse', 'Textanalyse', [
    'Zerlegen',
    'Dictionaries',
    'Zählen',
    'Das Häufigste',
  ]),
  kapitel('fortgeschritten', 'sortieren', 'Sortieren', [
    'Tauschen',
    'Bubblesort',
    'Selectionsort',
    'Vertauschungen zählen',
  ]),
]

export function findKapitel(id) {
  return KAPITEL.find((k) => k.id === id) ?? null
}

export function kapitelIndex(id) {
  return KAPITEL.findIndex((k) => k.id === id)
}
