// Sortieraufgaben zur Seite „② Entity-Relationship-Modell“

export const ermBausteine = {
  id: 'erm-bausteine',
  titel: 'Bausteine der Schulbibliothek einsortieren',
  anleitung:
    'Ziehe jede Karte in den passenden Korb – oder tippe erst die Karte an und dann den Korb. Achte besonders darauf, zu wem ein Attribut gehört.',
  koerbe: [
    { id: 'entitaet', label: 'Entität (Rechteck)' },
    { id: 'attr-entitaet', label: 'Attribut einer Entität' },
    { id: 'beziehung', label: 'Beziehung (Raute)' },
    { id: 'attr-beziehung', label: 'Attribut einer Beziehung' },
  ],
  karten: [
    {
      text: 'Buch',
      korb: 'entitaet',
      hinweis: 'Ein Ding der realen Welt, über das Daten gespeichert werden. Im ERM ein Rechteck.',
    },
    {
      text: 'Leser:in',
      korb: 'entitaet',
      hinweis: 'Auch Personen sind Entitäten, wenn die Datenbank Daten über sie speichert.',
    },
    {
      text: 'Autor:in',
      korb: 'entitaet',
      hinweis: 'Eigene Entität, weil zu Autor:innen eigene Daten gespeichert werden (ID, Name, Geburtsjahr).',
    },
    {
      text: 'Titel',
      korb: 'attr-entitaet',
      hinweis: 'Eine Eigenschaft der Entität Buch. Im ERM eine Ellipse am Rechteck.',
    },
    {
      text: 'Seitenzahl',
      korb: 'attr-entitaet',
      hinweis: 'Eigenschaft des Buchs – sie ändert sich nicht, wenn jemand das Buch ausleiht.',
    },
    {
      text: 'Geburtsjahr',
      korb: 'attr-entitaet',
      hinweis: 'Eigenschaft der Entität Autor:in.',
    },
    {
      text: 'BuchID',
      korb: 'attr-entitaet',
      hinweis: 'Ein Primärschlüssel ist auch nur ein Attribut – nur wird sein Name unterstrichen.',
    },
    {
      text: 'schreibt',
      korb: 'beziehung',
      hinweis: 'Ein Verb, das zwei Entitäten verbindet. Im ERM eine Raute.',
    },
    {
      text: 'leiht aus',
      korb: 'beziehung',
      hinweis: 'Verbindet Leser:in und Buch. Im ERM eine Raute mit Kardinalitäten an den Linien.',
    },
    {
      text: 'Ausleihdatum',
      korb: 'attr-beziehung',
      hinweis:
        'Hängt vom Paar Leser:in–Buch ab, nicht vom Buch allein: Dasselbe Buch wird mehrmals an verschiedenen Tagen ausgeliehen. Die Ellipse hängt an der Raute.',
    },
    {
      text: 'Rückgabedatum',
      korb: 'attr-beziehung',
      hinweis: 'Gehört wie das Ausleihdatum zu einer einzelnen Ausleihe, also zur Beziehung.',
    },
  ],
}

export const ermSportverein = {
  id: 'erm-sportverein',
  titel: 'Den Text des Sportvereins auseinandernehmen',
  anleitung:
    'Schritt 1 bis 3 aus „So gehst du vor“: Substantive werden Entitäten, ihre Eigenschaften Attribute, verbindende Verben Beziehungen. Und manches gehört gar nicht ins Modell.',
  koerbe: [
    { id: 'entitaet', label: 'Entität' },
    { id: 'attribut', label: 'Attribut' },
    { id: 'beziehung', label: 'Beziehung' },
    { id: 'nicht', label: 'gehört nicht ins Modell' },
  ],
  karten: [
    {
      text: 'Mitglied',
      korb: 'entitaet',
      hinweis: 'Substantiv, zu dem eigene Daten gespeichert werden (Nummer, Name, Eintrittsdatum).',
    },
    {
      text: 'Trainingsgruppe',
      korb: 'entitaet',
      hinweis: 'Hat eigene Daten: Gruppen-ID, Name, Trainingstag. Also eine eigene Entität.',
    },
    {
      text: 'Mitgliedsnummer',
      korb: 'attribut',
      hinweis: 'Eigenschaft eines Mitglieds – und hier sogar der Primärschlüssel.',
    },
    {
      text: 'Eintrittsdatum',
      korb: 'attribut',
      hinweis: 'Wann jemand in den Verein eingetreten ist – Eigenschaft des Mitglieds.',
    },
    {
      text: 'Trainingstag',
      korb: 'attribut',
      hinweis: 'Eigenschaft der Trainingsgruppe.',
    },
    {
      text: 'Gruppen-ID',
      korb: 'attribut',
      hinweis: 'Primärschlüssel der Trainingsgruppe, also ein Attribut.',
    },
    {
      text: 'meldet sich an',
      korb: 'beziehung',
      hinweis: 'Ein Verb zwischen Mitglied und Trainingsgruppe. Im ERM eine Raute.',
    },
    {
      text: 'dabei seit',
      korb: 'attribut',
      hinweis:
        'Attribut – aber an der Beziehung: Es hängt vom Paar Mitglied–Gruppe ab, nicht vom Mitglied allein.',
    },
    {
      text: 'Vereinssatzung',
      korb: 'nicht',
      hinweis: 'Kommt im Text vor, soll laut Auftrag aber nicht gespeichert werden.',
    },
    {
      text: 'Nachbarverein',
      korb: 'nicht',
      hinweis: 'Laut Auftrag ausdrücklich nicht Teil der Datenbank.',
    },
  ],
}
