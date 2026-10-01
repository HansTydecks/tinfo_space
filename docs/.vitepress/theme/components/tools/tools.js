// Zentrale Liste aller digitalen Tools.
// Aus diesen Daten entstehen die Kachel-Übersicht (ToolOverview.vue), der Kopfbereich
// jeder Beschreibungsseite (ToolInfo.vue) und die Sidebar (sidebar/tools.mts).
//
// Neues Tool hinzufügen:
//   1. Eintrag unten ergänzen (id = Ordnername unter docs/teachers/Digitale_Tools/)
//   2. Beschreibungsseite docs/teachers/Digitale_Tools/<id>/index.md mit <ToolInfo id="<id>" /> anlegen
//   3. `npm run test:tools` prüft, ob Liste und Seiten zusammenpassen
//
// `updated` ist der Tag des letzten Pushs ins GitHub-Repository (Format JJJJ-MM-TT).

export const TOOLS_BASE = '/teachers/Digitale_Tools'

export const categories = [
  {
    id: 'unterricht',
    title: 'Für jeden Unterricht',
    icon: '🧰',
    intro: 'Werkzeuge ohne festen Inhalt – du bringst den Stoff mit.'
  },
  {
    id: 'informatik',
    title: 'Informatikunterricht',
    icon: '💻',
    intro: 'Simulationen, Lernpfade und Spiele zu Themen des Informatik-Lehrplans.',
    topics: [
      { id: 'daten', title: 'Daten & Codierung' },
      { id: 'technik', title: 'Rechner & Technik' },
      { id: 'programmieren', title: 'Algorithmen & Programmieren' },
      { id: 'netzwerke', title: 'Netzwerke' },
      { id: 'sicherheit', title: 'Sicherheit & Gesellschaft' }
    ]
  },
  {
    id: 'organisation',
    title: 'Organisation',
    icon: '🗂️',
    intro: 'Unterricht planen und Klassen organisieren.'
  }
]

export const tools = [
  // ---------------------------------------------------------------- Für jeden Unterricht
  {
    id: 'card-creator-website',
    name: 'Card Creator',
    icon: '🃏',
    short: 'Karteikarten als PDF',
    category: 'unterricht',
    live: 'https://ccreator.tinfo.space/',
    repo: 'https://github.com/HansTydecks/card-creator-website',
    updated: '2026-08-25'
  },
  {
    id: 'word-reveal',
    name: 'Wort-Versteck',
    icon: '✏️',
    short: 'Lückentexte erstellen',
    category: 'unterricht',
    live: 'https://words.tinfo.space/',
    repo: 'https://github.com/HansTydecks/word-reveal',
    updated: '2025-09-19'
  },
  {
    id: 'table-reveal',
    name: 'Table Reveal',
    icon: '📋',
    short: 'Tabellen aufdecken',
    category: 'unterricht',
    live: 'https://tabula.tinfo.space/',
    repo: 'https://github.com/HansTydecks/table-reveal',
    updated: '2025-09-19'
  },
  {
    id: 'lock_simulation',
    name: 'Schlosssimulation',
    icon: '🔒',
    short: 'Zahlenschloss für Escape Rooms',
    category: 'unterricht',
    live: 'https://lock.tinfo.space/',
    repo: 'https://github.com/HansTydecks/combination-lock',
    updated: '2026-02-17'
  },
  {
    id: 'questapp',
    name: 'Questapp',
    icon: '🧭',
    short: 'Schnitzeljagd für Ausflüge',
    category: 'unterricht',
    live: null,
    note: 'Server-Anwendung zum Selbsthosten',
    repo: 'https://github.com/HansTydecks/Photo-Trip',
    updated: '2026-09-22'
  },

  // ---------------------------------------------------------------- Informatik: Daten & Codierung
  {
    id: 'edu-pixel-draw',
    name: 'Pixel & Bits',
    icon: '🎨',
    short: 'Bilder aus Bits',
    category: 'informatik',
    topic: 'daten',
    live: 'https://pixel.tinfo.space/',
    repo: 'https://github.com/HansTydecks/edu-pixel-draw',
    updated: '2025-09-19'
  },
  {
    id: 'binary-ascii-visualizer',
    name: 'Binär-ASCII-Visualizer',
    icon: '🔤',
    short: 'Bits als Zeichen',
    category: 'informatik',
    topic: 'daten',
    live: 'https://bascii.tinfo.space/',
    repo: 'https://github.com/HansTydecks/binary-ascii-visualizer',
    updated: '2025-09-19'
  },
  {
    id: 'becimal',
    name: 'Becimal',
    icon: '🔢',
    short: 'Zahlensysteme von 2 bis 16',
    category: 'informatik',
    topic: 'daten',
    live: 'https://becimal.tinfo.space/',
    repo: 'https://github.com/HansTydecks/binary-decimal-visualizer',
    updated: '2026-08-25'
  },
  {
    id: 'memory',
    name: 'Memory-Visualizer',
    icon: '💾',
    short: 'Speichergrößen vergleichen',
    category: 'informatik',
    topic: 'daten',
    live: 'https://memory.tinfo.space/',
    repo: 'https://github.com/HansTydecks/memory-visualizer',
    updated: '2025-09-28'
  },
  {
    id: 'pfade',
    name: 'Pfade verstehen',
    icon: '📁',
    short: 'Absolute & relative Pfade',
    category: 'informatik',
    topic: 'daten',
    live: 'https://paths.tinfo.space/',
    repo: 'https://github.com/HansTydecks/Paths-Tutorial',
    updated: '2026-04-12'
  },

  // ---------------------------------------------------------------- Informatik: Rechner & Technik
  {
    id: 'wie-rechnet-ein-computer',
    name: 'Wie rechnet ein Computer?',
    icon: '🧮',
    short: 'Vom Bit zum Addierer',
    category: 'informatik',
    topic: 'technik',
    live: 'https://techninfo.tinfo.space/',
    repo: 'https://github.com/HansTydecks/Tutorial_Bin-r_Hex',
    updated: '2026-08-31'
  },
  {
    id: 'tiny-johnny',
    name: 'Tiny Johnny',
    icon: '🖥️',
    short: 'Von-Neumann-Modellrechner',
    category: 'informatik',
    topic: 'technik',
    live: 'https://tinyjohnny.tinfo.space/',
    repo: 'https://github.com/HansTydecks/Tiny-Johnny',
    updated: '2026-09-22'
  },
  {
    id: 'eva-stationen',
    name: 'EVA-Stationen',
    icon: '🎹',
    short: 'Ein- & Ausgabe erleben',
    category: 'informatik',
    topic: 'technik',
    live: null,
    note: 'Fünf Stationen – Links auf dieser Seite',
    repo: null,
    updated: '2025-11-09'
  },
  {
    id: 'understand-3d',
    name: 'Understand 3D',
    icon: '🧊',
    short: 'Koordinaten für Tinkercad',
    category: 'informatik',
    topic: 'technik',
    live: 'https://understand3d.tinfo.space/',
    repo: 'https://github.com/HansTydecks/Understand-3D',
    updated: '2026-09-30'
  },

  // ---------------------------------------------------------------- Informatik: Algorithmen & Programmieren
  {
    id: 'lories',
    name: 'Logic Stories',
    icon: '📖',
    short: 'Logik in Geschichten',
    category: 'informatik',
    topic: 'programmieren',
    live: 'https://lories.tinfo.space/',
    repo: 'https://github.com/HansTydecks/logic-story',
    updated: '2025-09-29'
  },
  {
    id: 'hase-und-schildkroete',
    name: 'Hase & Schildkröte',
    icon: '🐢',
    short: 'Calliope-Abenteuer',
    category: 'informatik',
    topic: 'programmieren',
    live: 'https://callianimal.tinfo.space/',
    repo: 'https://github.com/HansTydecks/Calliope-Hare-And-Turtoise',
    updated: '2026-03-09'
  },
  {
    id: 'calliope',
    name: 'Calliope-Kurs',
    icon: '🤖',
    short: 'Calliope mini kennenlernen',
    category: 'informatik',
    topic: 'programmieren',
    live: 'https://calliope.tinfo.space/',
    repo: 'https://github.com/HansTydecks/calliope_v2',
    updated: '2025-11-09'
  },
  {
    id: 'analog-programming',
    name: 'Quizmaster',
    icon: '🎡',
    short: 'Variablen-Kartenspiel',
    category: 'informatik',
    topic: 'programmieren',
    live: 'https://cardcode.tinfo.space/',
    repo: 'https://github.com/HansTydecks/analog-programming',
    updated: '2025-09-15'
  },
  {
    id: 'fraktale',
    name: 'Fraktale',
    icon: '❄️',
    short: 'Rekursion sichtbar machen',
    category: 'informatik',
    topic: 'programmieren',
    live: 'https://fractals.tinfo.space/',
    repo: 'https://github.com/HansTydecks/recursive-iterative-fractals',
    updated: '2026-03-22'
  },

  // ---------------------------------------------------------------- Informatik: Netzwerke
  {
    id: 'netzblick',
    name: 'NETZBLICK',
    icon: '🕹️',
    short: 'Netzwerk-Rollenspiel',
    category: 'informatik',
    topic: 'netzwerke',
    live: 'https://hanstydecks.github.io/network-RPG/',
    repo: 'https://github.com/HansTydecks/network-RPG',
    updated: '2026-09-29'
  },
  {
    id: 'Graphs',
    name: 'Graphs',
    icon: '🕸️',
    short: 'Netzwerktopologien',
    category: 'informatik',
    topic: 'netzwerke',
    live: 'https://graphs.tinfo.space/',
    repo: 'https://github.com/HansTydecks/network-topology',
    updated: '2026-02-13'
  },

  // ---------------------------------------------------------------- Informatik: Sicherheit & Gesellschaft
  {
    id: 'cryptosim',
    name: 'CryptoSim',
    icon: '🔑',
    short: 'Kryptographie interaktiv',
    category: 'informatik',
    topic: 'sicherheit',
    live: 'https://cryptosim.tinfo.space/',
    repo: 'https://github.com/HansTydecks/CryptoSim',
    updated: '2026-05-06'
  },
  {
    id: 'phishing-sax',
    name: 'Phishing-Sax',
    icon: '🎣',
    short: 'Phishing-Demo',
    category: 'informatik',
    topic: 'sicherheit',
    live: 'https://lernnsax.tinfo.space/',
    repo: 'https://github.com/HansTydecks/Phishing-Sax',
    updated: '2026-04-19'
  },
  {
    id: 'dilemmataxi',
    name: 'Dilemmataxi',
    icon: '🚕',
    short: 'Ethik autonomer Autos',
    category: 'informatik',
    topic: 'sicherheit',
    live: 'https://dilemmataxi.tinfo.space/',
    repo: 'https://github.com/HansTydecks/car-dilemma',
    updated: '2025-11-28'
  },

  // ---------------------------------------------------------------- Organisation
  {
    id: 'lessplan',
    name: 'Lessplan',
    icon: '📝',
    short: 'Stunden & Schuljahr planen',
    category: 'organisation',
    live: 'https://lessplan.tinfo.space/',
    repo: 'https://github.com/HansTydecks/fast-lessonplan',
    updated: '2026-01-31'
  },
  {
    id: 'sitzplan-generator',
    name: 'Sitzplan-Generator',
    icon: '🪑',
    short: 'Sitzplan aus Wünschen',
    category: 'organisation',
    live: 'https://hanstydecks.github.io/classroom-arranger/',
    repo: 'https://github.com/HansTydecks/classroom-arranger',
    updated: '2026-08-30'
  },
  {
    id: 'klassenverwaltung',
    name: 'Klassenverwaltung',
    icon: '🏫',
    short: 'Sitzpläne & Gruppen am PC',
    category: 'organisation',
    live: null,
    note: 'Desktop-App – Installation aus dem Quellcode',
    repo: 'https://github.com/HansTydecks/Sitzplan-Fenster',
    updated: '2026-04-19'
  }
]

/** Link zur Beschreibungsseite eines Tools */
export function toolPage(tool) {
  return `${TOOLS_BASE}/${tool.id}/`
}

/** '2026-09-30' → '30.09.2026' (ohne Date-Objekt, damit keine Zeitzone dazwischenfunkt) */
export function formatDate(iso) {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

/** Neueste zuerst – so landen frisch aktualisierte Tools oben in ihrer Gruppe */
export function byUpdatedDesc(a, b) {
  return b.updated.localeCompare(a.updated)
}

/** Tools einer Kategorie (optional eines Themas), neueste zuerst */
export function toolsOf(categoryId, topicId) {
  return tools
    .filter((t) => t.category === categoryId && (!topicId || t.topic === topicId))
    .sort(byUpdatedDesc)
}

/**
 * Eine Kategorie in Gruppen zerlegt, genau in der Reihenfolge der Übersicht.
 * Kategorien ohne Themen bestehen aus einer einzigen Gruppe ohne Titel.
 */
export function groupsOf(category) {
  if (!category.topics) return [{ id: null, title: null, tools: toolsOf(category.id) }]
  return category.topics
    .map((topic) => ({ ...topic, tools: toolsOf(category.id, topic.id) }))
    .filter((group) => group.tools.length > 0)
}

export function findTool(id) {
  return tools.find((t) => t.id === id)
}

export function findCategory(id) {
  return categories.find((c) => c.id === id)
}
