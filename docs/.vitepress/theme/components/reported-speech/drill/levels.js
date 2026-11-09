// Reporter-Spiel: Metadaten und Fortschritt – klein, damit der Button auf der Lernseite
// nicht alle Aufgaben laden muss.

export const LEKTION_PFAD = '/students/english/grammar/reported-speech/'
export const SPIEL_PFAD = '/students/english/grammar/reported-speech/reporter'

export const LEVELS = [
  { icon: '🗣️', titel: 'Who is speaking?', de: 'Pronomen: I → he, my → his, you → me', anker: 'pronouns' },
  { icon: '⏪', titel: 'Backshift: present → past', de: 'play → played, am doing → was doing', anker: 'backshift' },
  { icon: '⏮️', titel: 'Backshift: more tenses', de: 'have done → had done, will → would …', anker: 'backshift' },
  { icon: '🔧', titel: 'Modal verbs', de: 'can → could, must → had to, should bleibt', anker: 'modal-verbs' },
  { icon: '🗓️', titel: 'Time & place', de: 'tomorrow → the next day, here → there', anker: 'time-place' },
  { icon: '💬', titel: 'say, tell & co.', de: 'told me, said to me, apologised for …', anker: 'say-tell' },
  { icon: '❓', titel: 'Questions', de: 'asked if I was …, asked where I lived', anker: 'questions' },
  { icon: '📣', titel: 'Commands', de: 'told me (not) to …', anker: 'commands' },
  { icon: '📰', titel: 'Newsroom mix', de: 'alles gemischt', anker: 'everything-at-a-glance' },
]

export const RAENGE = [
  { ab: 0, icon: '🧃', titel: 'Intern' },
  { ab: 1, icon: '✏️', titel: 'Junior Reporter' },
  { ab: 3, icon: '🎙️', titel: 'Reporter' },
  { ab: 5, icon: '📸', titel: 'Senior Reporter' },
  { ab: 7, icon: '🗞️', titel: 'Editor' },
  { ab: 9, icon: '🏆', titel: 'Chief Editor' },
]

/** Rang und nächster Rang nach Anzahl geschaffter Level */
export function rang(geschafft) {
  let i = 0
  while (i + 1 < RAENGE.length && geschafft >= RAENGE[i + 1].ab) i++
  return { ...RAENGE[i], naechster: RAENGE[i + 1] ?? null }
}

/** Sterne nach Fehlern im Level */
export const sterneFuer = (fehler) => (fehler <= 1 ? 3 : fehler <= 4 ? 2 : 1)

const STORAGE_KEY = 'reported-speech-reporter-v1'

/** { "1": 3, "2": 2 } = Level-Nummer → beste Sterne */
export function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return data && typeof data === 'object' ? data : {}
  } catch {
    return {}
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // privater Modus o. Ä.
  }
}
