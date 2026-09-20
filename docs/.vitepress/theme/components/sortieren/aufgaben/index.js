// Sammelt alle Sortieraufgaben aus den Geschwisterdateien zu einer Map id -> Aufgabe.
//
// Eine Aufgabe sieht so aus:
//   {
//     id: 'kardinalitaeten-basis',      eindeutig, wird im Markdown als aufgabe="..." benutzt
//     titel: '...',
//     anleitung: '...',
//     koerbe: [{ id: 'eins-n', label: '1 : n' }, ...],
//     karten: [{ text: '...', korb: 'eins-n', hinweis: 'Begründung, erscheint bei Fehlern' }, ...],
//   }

const MODULE = import.meta.glob(['./*.js', '!./index.js'], { eager: true })

export const AUFGABEN = {}

for (const [pfad, modul] of Object.entries(MODULE)) {
  for (const aufgabe of Object.values(modul)) {
    if (!aufgabe || typeof aufgabe !== 'object' || !aufgabe.id) continue
    if (AUFGABEN[aufgabe.id]) {
      throw new Error(`[SortierAufgabe] doppelte Aufgaben-Id "${aufgabe.id}" (${pfad})`)
    }
    AUFGABEN[aufgabe.id] = aufgabe
  }
}

export const findAufgabe = (id) => AUFGABEN[id] ?? null
