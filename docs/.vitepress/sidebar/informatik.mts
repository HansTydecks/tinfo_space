import type { DefaultTheme } from 'vitepress'

// Sidebars für den Informatik-Bereich.
// Jedes Kapitel bekommt eine eigene, schlanke Sidebar. VitePress wählt automatisch
// den tiefsten passenden Schlüssel, d. h. '/students/informatik/netzwerke/' schlägt
// '/students/informatik/'.

const B = '/students/informatik'

// Rücksprung zur Kachel-Übersicht (am Ende jeder Kapitel-Sidebar)
const zurueck: DefaultTheme.SidebarItem = { text: '↩ Alle Kapitel', link: `${B}/` }

// Liste aller Kapitel – wird als Fallback-Sidebar (z. B. für die Klassenstufen-Wegweiser) genutzt
const kapitel: DefaultTheme.SidebarItem[] = [
  {
    text: 'Informatik',
    items: [
      { text: 'Übersicht', link: `${B}/` },
      { text: 'Daten & Informationen', link: `${B}/daten-und-informationen/` },
      { text: 'Technische Informatik', link: `${B}/technische-informatik/` },
      { text: 'Algorithmen & Programmieren', link: `${B}/algorithmen/` },
      { text: 'Netzwerke', link: `${B}/netzwerke/` },
      { text: 'Informationssicherheit', link: `${B}/informationssicherheit/` },
      { text: 'Künstliche Intelligenz', link: `${B}/kuenstliche-intelligenz/` },
      { text: 'Sprachen & Automaten', link: `${B}/sprachen-und-automaten/` }
    ]
  },
  {
    text: 'Nach Klassenstufe',
    collapsed: true,
    items: [
      { text: 'Wegweiser', link: `${B}/klassenstufen/` },
      { text: 'Klasse 7', link: `${B}/klassenstufen/klasse-7` },
      { text: 'Klasse 8', link: `${B}/klassenstufen/klasse-8` },
      { text: 'Klasse 9', link: `${B}/klassenstufen/klasse-9` },
      { text: 'Klasse 10', link: `${B}/klassenstufen/klasse-10` },
      { text: 'Oberstufe', link: `${B}/klassenstufen/oberstufe` }
    ]
  }
]

// ---------------------------------------------------------------------------
// 1 · Daten & Informationen
// ---------------------------------------------------------------------------
const D = `${B}/daten-und-informationen`
const datenUndInformationen: DefaultTheme.SidebarItem[] = [
  { text: 'Daten & Informationen', link: `${D}/` },
  {
    text: 'Grundlagen · Klasse 7/8',
    items: [
      { text: 'Informationen und Daten', link: `${D}/informationen-und-daten` },
      { text: 'Codierung', link: `${D}/codierung` },
      { text: 'Digitale Medien', link: `${D}/digitale-medien` },
      { text: 'Informationen beurteilen', link: `${D}/informationen-beurteilen` }
    ]
  },
  {
    text: 'Datenbanken · Klasse 9',
    items: [
      { text: 'Daten in der Schule', link: `${D}/datenbanken/` },
      { text: 'Der Datenlebenszyklus', link: `${D}/datenbanken/datenlebenszyklus` },
      { text: 'Daten im Alltag', link: `${D}/datenbanken/daten-im-alltag` }
    ]
  },
  {
    text: '① Erfassen',
    items: [
      { text: 'Daten entstehen', link: `${D}/datenbanken/generieren-und-erfassen` }
    ]
  },
  {
    text: '② Speichern & Verwalten',
    items: [
      { text: 'Entity-Relationship-Modell', link: `${D}/datenbanken/er-modell` },
      { text: 'Kardinalitäten', link: `${D}/datenbanken/kardinalitaeten` },
      { text: 'Primär- & Fremdschlüssel', link: `${D}/datenbanken/schluessel` },
      { text: 'Relationenmodell', link: `${D}/datenbanken/relationenmodell` },
      { text: 'Übungen Modellierung', link: `${D}/datenbanken/uebungen-modellierung` }
    ]
  },
  {
    text: '③ Nutzen & Teilen',
    items: [
      { text: 'Abfragen mit SQL', link: `${D}/datenbanken/sql-abfragen` },
      { text: 'Daten auswerten', link: `${D}/datenbanken/daten-auswerten` },
      { text: 'Daten austauschen', link: `${D}/datenbanken/daten-austauschen` },
      { text: 'Tracking & Werbung', link: `${D}/datenbanken/tracking` }
    ]
  },
  {
    text: '④ Archivieren & Löschen',
    items: [
      { text: 'Archivieren oder löschen?', link: `${D}/datenbanken/archivieren-oder-loeschen` }
    ]
  },
  zurueck
]

// ---------------------------------------------------------------------------
// 2 · Technische Informatik
// ---------------------------------------------------------------------------
const T = `${B}/technische-informatik`
const technischeInformatik: DefaultTheme.SidebarItem[] = [
  { text: 'Technische Informatik', link: `${T}/` },
  {
    text: 'Informatiksysteme · Klasse 7',
    items: [
      { text: 'Informatiksysteme', link: `${T}/informatiksysteme` },
      { text: 'Hardware', link: `${T}/hardware` },
      { text: 'Software', link: `${T}/software` },
      { text: 'Das EVA-Prinzip', link: `${T}/eva-prinzip` }
    ]
  },
  {
    text: 'Zahlen & Codes · Klasse 7 bis Oberstufe',
    items: [
      { text: 'Binärzahlen', link: `${T}/binaerzahlen` },
      { text: 'Rechnen mit Binärzahlen', link: `${T}/binaer-rechnen` },
      { text: 'Speichergrößen', link: `${T}/speichergroessen` },
      { text: 'Hexadezimal & Zeichencodes', link: `${T}/hexadezimal-und-zeichencodes` },
      { text: 'Zahlenformate', link: `${T}/zahlenformate` }
    ]
  },
  {
    text: 'Logik & Schaltungen · Oberstufe',
    items: [
      { text: 'Boolesche Algebra', link: `${T}/boolesche-algebra` },
      { text: 'Schaltnetze', link: `${T}/schaltnetze` },
      { text: 'Mikrochips', link: `${T}/mikrochips` }
    ]
  },
  {
    text: 'Rechnerarchitektur · Oberstufe',
    items: [
      { text: 'Von-Neumann-Architektur', link: `${T}/von-neumann` },
      { text: 'Speichertechnik', link: `${T}/speichertechnik` },
      { text: 'Betriebssysteme', link: `${T}/betriebssysteme` },
      { text: 'Nachhaltige Hardware', link: `${T}/nachhaltige-hardware` }
    ]
  },
  zurueck
]

// ---------------------------------------------------------------------------
// 3 · Algorithmen & Programmieren
// ---------------------------------------------------------------------------
const A = `${B}/algorithmen`
const PK = `${A}/python-kurs`
const algorithmen: DefaultTheme.SidebarItem[] = [
  { text: 'Algorithmen & Programmieren', link: `${A}/` },
  {
    text: 'Algorithmen verstehen · Klasse 7/8',
    items: [
      { text: 'Was ist ein Algorithmus?', link: `${A}/algorithmusbegriff` },
      { text: 'Eigenschaften', link: `${A}/eigenschaften` },
      { text: 'Darstellungsformen', link: `${A}/darstellungsformen` },
      { text: 'Kontrollstrukturen', link: `${A}/kontrollstrukturen` },
      { text: 'Algorithmen im Alltag', link: `${A}/algorithmen-im-alltag` },
      { text: 'Blockbasiert programmieren', link: `${A}/blockbasiert-programmieren` }
    ]
  },
  {
    text: 'Python-Kurs',
    collapsed: true,
    items: [
      { text: 'Kursübersicht', link: `${PK}/` },
      { text: '🤫 Silent Teacher', link: `${PK}/silent-teacher` },
      { text: '📖 Wiki', link: `${PK}/wiki` },
      {
        text: '1 · Für Einsteiger',
        collapsed: true,
        items: [
          { text: 'Übersicht', link: `${PK}/einsteiger/` },
          { text: 'Erste Schritte', link: `${PK}/einsteiger/erste-schritte` },
          { text: 'Datentypen', link: `${PK}/einsteiger/datentypen` },
          { text: 'Ausgabe mit print()', link: `${PK}/einsteiger/ausgabe` },
          { text: 'Operatoren', link: `${PK}/einsteiger/operatoren` },
          { text: 'Selektion (if/elif/else)', link: `${PK}/einsteiger/selektion` },
          { text: 'while-Schleife', link: `${PK}/einsteiger/while-schleife` },
          { text: 'for-Schleife', link: `${PK}/einsteiger/for-schleife` },
          { text: 'Listen', link: `${PK}/einsteiger/listen` },
          { text: 'Methoden', link: `${PK}/einsteiger/methoden` },
          { text: 'Funktionen', link: `${PK}/einsteiger/funktionen` },
          { text: 'Eingabe mit input()', link: `${PK}/einsteiger/eingabe` }
        ]
      },
      {
        text: '2 · Für Fortgeschrittene',
        collapsed: true,
        items: [
          { text: 'Übersicht', link: `${PK}/fortgeschritten/` },
          { text: '1 · Erweiterter Algorithmusbegriff', link: `${PK}/fortgeschritten/algorithmusbegriff` },
          { text: '2 · Strukturierte Datentypen', link: `${PK}/fortgeschritten/strukturierte-datentypen` },
          { text: '↳ Textanalyse', link: `${PK}/fortgeschritten/textanalyse` },
          { text: '↳ Ziffern & Stellenwerte', link: `${PK}/fortgeschritten/ziffern` },
          { text: '↳ Palindrome', link: `${PK}/fortgeschritten/palindrom` },
          { text: '3 · Unterprogramme', link: `${PK}/fortgeschritten/unterprogramme` },
          { text: '4 · Klassen & Objekte', link: `${PK}/fortgeschritten/klassen-objekte` },
          { text: '5 · Vererbung & Polymorphie', link: `${PK}/fortgeschritten/vererbung` },
          { text: '6 · OOP-Projekt: Mediathek', link: `${PK}/fortgeschritten/oop-projekt` },
          { text: '7 · Iteration & Rekursion', link: `${PK}/fortgeschritten/iterativ-rekursiv` },
          { text: '↳ Schleifen steuern', link: `${PK}/fortgeschritten/schleifen-steuern` },
          { text: '↳ do-while & try/except', link: `${PK}/fortgeschritten/do-while` },
          { text: '↳ Fibonacci', link: `${PK}/fortgeschritten/fibonacci` },
          { text: '8 · Fraktale', link: `${PK}/fortgeschritten/fraktale` },
          { text: '9 · Lineare Suche, Max/Min', link: `${PK}/fortgeschritten/lineare-suche` },
          { text: '9 · Binäre Suche', link: `${PK}/fortgeschritten/binaere-suche` },
          { text: '10 · Bubble-, Selection-, Insertion Sort', link: `${PK}/fortgeschritten/sortieren` },
          { text: '10 · Quicksort & Mergesort', link: `${PK}/fortgeschritten/sortieren-schnell` },
          { text: '11 · Effizienz & Komplexität', link: `${PK}/fortgeschritten/komplexitaet` }
        ]
      },
      {
        text: '3 · Profis',
        collapsed: true,
        items: [
          { text: 'Übersicht', link: `${PK}/profis/` },
          { text: '12 · Schwere Probleme', link: `${PK}/profis/schwere-probleme` },
          { text: '↳ Primzahlen, Primfaktoren & GGT', link: `${PK}/profis/primzahlen-teiler` },
          { text: '13 · Grenzen der Berechenbarkeit', link: `${PK}/profis/grenzen-der-berechenbarkeit` },
          { text: '14 · Komplexe Probleme lösen', link: `${PK}/profis/komplexe-probleme` },
          { text: 'Projekt: Ratespiel', link: `${PK}/profis/ratespiel` },
          { text: 'Projekt: Minesweeper', link: `${PK}/profis/minesweeper` },
          { text: 'Vertiefung: Dezimal ↔ Binär', link: `${PK}/profis/dezimal-binaer` }
        ]
      }
    ]
  },
  {
    text: 'Vertiefung · Oberstufe',
    items: [
      { text: 'Objektorientierung', link: `${A}/objektorientierung` },
      { text: 'Grenzen der Berechenbarkeit', link: `${A}/grenzen-der-berechenbarkeit` }
    ]
  },
  {
    text: 'Softwareentwicklung',
    items: [
      { text: 'Wasserfallmodell', link: `${A}/softwareentwicklung/wasserfallmodell` },
      { text: 'Agile Entwicklung', link: `${A}/softwareentwicklung/agile-entwicklung` },
      { text: 'Projektmanagement', link: `${A}/softwareentwicklung/projektmanagement` }
    ]
  },
  zurueck
]

// ---------------------------------------------------------------------------
// 4 · Netzwerke
// ---------------------------------------------------------------------------
const N = `${B}/netzwerke`
const netzwerke: DefaultTheme.SidebarItem[] = [
  { text: 'Netzwerke', link: `${N}/` },
  {
    text: 'Vernetzte Systeme · Klasse 8',
    items: [
      { text: 'Vernetzte Systeme', link: `${N}/vernetzte-systeme` },
      { text: 'Adressen & E-Mail', link: `${N}/adressen-und-e-mail` },
      { text: 'Kooperation & Kollaboration', link: `${N}/kooperation-und-kollaboration` }
    ]
  },
  {
    text: 'Netzwerke & Internet · Klasse 9',
    items: [
      { text: 'Grundlagen', link: `${N}/grundlagen` },
      { text: 'Datenpakete', link: `${N}/datenpakete` },
      { text: 'IP- und MAC-Adressen', link: `${N}/ip-und-mac` },
      { text: 'Aufbau des Internets', link: `${N}/aufbau-des-internets` },
      { text: 'Netzwerke & Gesellschaft', link: `${N}/netzwerke-und-gesellschaft` }
    ]
  },
  {
    text: 'Rechnernetze · Oberstufe',
    items: [
      { text: 'Topologien', link: `${N}/topologien` },
      { text: 'Switch & DHCP', link: `${N}/switch-und-dhcp` },
      { text: 'DNS – Namensauflösung', link: `${N}/dns` },
      { text: 'Subnetze', link: `${N}/subnetze` },
      { text: 'Routing', link: `${N}/routing` }
    ]
  },
  zurueck
]

// ---------------------------------------------------------------------------
// 5 · Informationssicherheit
// ---------------------------------------------------------------------------
const S = `${B}/informationssicherheit`
const informationssicherheit: DefaultTheme.SidebarItem[] = [
  { text: 'Informationssicherheit', link: `${S}/` },
  {
    text: 'Sicher im Netz · Klasse 8',
    items: [
      { text: 'Phishing', link: `${S}/phishing` },
      { text: 'Persönliche Daten', link: `${S}/persoenliche-daten` },
      { text: 'Passwörter', link: `${S}/passwoerter` }
    ]
  },
  {
    text: 'Sichere Kommunikation · Klasse 9',
    items: [
      { text: 'Authentifizierung', link: `${S}/authentifizierung` },
      { text: 'Verschlüsselung', link: `${S}/verschluesselung` }
    ]
  },
  {
    text: 'Kryptographie · Oberstufe',
    items: [
      { text: 'Schutzziele', link: `${S}/schutzziele` },
      { text: 'Kryptologie', link: `${S}/kryptologie` },
      { text: 'RSA', link: `${S}/rsa` },
      { text: 'Hybride Verschlüsselung', link: `${S}/hybride-verschluesselung` },
      { text: 'Hashes & Signaturen', link: `${S}/hashes-und-signaturen` },
      { text: 'Kryptoanalyse', link: `${S}/kryptoanalyse` },
      { text: 'Steganografie', link: `${S}/steganografie` }
    ]
  },
  {
    text: 'Verfügbarkeit & Datenschutz · Oberstufe',
    items: [
      { text: 'Datensicherung', link: `${S}/datensicherung` },
      { text: 'Datenschutz & Gesellschaft', link: `${S}/datenschutz-und-gesellschaft` }
    ]
  },
  zurueck
]

// ---------------------------------------------------------------------------
// 6 · Künstliche Intelligenz
// ---------------------------------------------------------------------------
const K = `${B}/kuenstliche-intelligenz`
const kuenstlicheIntelligenz: DefaultTheme.SidebarItem[] = [
  { text: 'Künstliche Intelligenz', link: `${K}/` },
  {
    text: 'Grundlagen · Klasse 9',
    items: [
      { text: 'Was ist KI?', link: `${K}/was-ist-ki` },
      { text: 'Klassische KI', link: `${K}/klassische-ki` },
      { text: 'Maschinelles Lernen', link: `${K}/maschinelles-lernen` },
      { text: 'Bestärkendes Lernen', link: `${K}/bestaerkendes-lernen` },
      { text: 'Überwachtes Lernen', link: `${K}/ueberwachtes-lernen` },
      { text: 'Unüberwachtes Lernen', link: `${K}/unueberwachtes-lernen` }
    ]
  },
  {
    text: 'Generative KI & Gesellschaft · Klasse 9',
    items: [
      { text: 'Generative KI', link: `${K}/generative-ki` },
      { text: 'Prompting', link: `${K}/prompting` },
      { text: 'KI & Gesellschaft', link: `${K}/ki-und-gesellschaft` }
    ]
  },
  {
    text: 'Vertiefung · Oberstufe',
    items: [
      { text: 'Künstliche neuronale Netze', link: `${K}/neuronale-netze` },
      { text: 'KI & Ressourcen', link: `${K}/ki-und-ressourcen` }
    ]
  },
  zurueck
]

// ---------------------------------------------------------------------------
// 7 · Sprachen & Automaten
// ---------------------------------------------------------------------------
const L = `${B}/sprachen-und-automaten`
const sprachenUndAutomaten: DefaultTheme.SidebarItem[] = [
  { text: 'Sprachen & Automaten', link: `${L}/` },
  {
    text: 'Sprachen · Klasse 10',
    items: [
      { text: 'Syntax & Semantik', link: `${L}/syntax-und-semantik` },
      { text: 'Reguläre Ausdrücke', link: `${L}/regulaere-ausdruecke` },
      { text: 'Auszeichnungssprachen', link: `${L}/auszeichnungssprachen` }
    ]
  },
  {
    text: 'Formale Sprachen · Oberstufe',
    items: [
      { text: 'Grammatiken', link: `${L}/formale-sprachen-und-grammatiken` },
      { text: 'Endliche Automaten', link: `${L}/endliche-automaten` },
      { text: 'Grammatik ↔ Automat', link: `${L}/grammatik-und-automat` },
      { text: 'Sprachverarbeitung', link: `${L}/sprachverarbeitung` }
    ]
  },
  zurueck
]

export const informatikSidebar: DefaultTheme.Sidebar = {
  [`${B}/`]: kapitel,
  [`${D}/`]: datenUndInformationen,
  [`${T}/`]: technischeInformatik,
  [`${A}/`]: algorithmen,
  [`${N}/`]: netzwerke,
  [`${S}/`]: informationssicherheit,
  [`${K}/`]: kuenstlicheIntelligenz,
  [`${L}/`]: sprachenUndAutomaten
}
