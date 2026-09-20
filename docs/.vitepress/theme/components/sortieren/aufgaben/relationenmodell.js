// Sortieraufgaben zur Seite „② Relationenmodell & Normalisierung“

export const relationenUeberfuehrung = {
  id: 'relationen-ueberfuehrung',
  titel: 'Welche Überführungsregel greift?',
  anleitung:
    'Jede Karte ist eine Beziehung mit ihrer Kardinalität. Entscheide, was beim Übergang zu Tabellen daraus wird.',
  koerbe: [
    { id: 'n-seite', label: 'Fremdschlüssel auf der n-Seite' },
    { id: 'eine-der-beiden', label: 'Fremdschlüssel in eine der beiden' },
    { id: 'verbindung', label: 'eigene Verbindungstabelle' },
  ],
  karten: [
    {
      text: 'Klasse 1:n Schüler:in',
      korb: 'n-seite',
      hinweis:
        'Die n-Seite bekommt den Fremdschlüssel: schueler erhält klasse_id. Andersherum müsste in der Klasse eine ganze Liste in einer Zelle stehen.',
    },
    {
      text: 'Verlag 1:n Buch',
      korb: 'n-seite',
      hinweis: 'buch bekommt die Spalte verlag_id.',
    },
    {
      text: 'Kinovorstellung 1:n Buchung',
      korb: 'n-seite',
      hinweis: 'Die Buchung ist die n-Seite und bekommt die Spalte vorstellung_id.',
    },
    {
      text: 'Mensch 1:1 Personalausweis',
      korb: 'eine-der-beiden',
      hinweis:
        'Bei 1 : 1 gibt es keine n-Seite. Der Fremdschlüssel darf in eine der beiden Tabellen – meist dorthin, wo er seltener leer bleibt.',
    },
    {
      text: 'Schüler:in 1:1 Schließfach',
      korb: 'eine-der-beiden',
      hinweis: 'schliessfach bekommt schueler_id – oder umgekehrt. Beides ist erlaubt.',
    },
    {
      text: 'Schüler:in n:m Wahlkurs',
      korb: 'verbindung',
      hinweis:
        'Auf beiden Seiten mehrere: Es entsteht die Tabelle teilnahme mit schueler_id und kurs_id als zusammengesetztem Primärschlüssel.',
    },
    {
      text: 'Buch n:m Autor:in',
      korb: 'verbindung',
      hinweis: 'Ein Buch kann mehrere Autor:innen haben und umgekehrt – also eine eigene Tabelle.',
    },
    {
      text: 'Leser:in n:m Buch, mit Ausleihdatum',
      korb: 'verbindung',
      hinweis:
        'Genau hier landet das Attribut der Beziehung: ausleihe (ausweis_nr, buch_id, ausleihdatum).',
    },
  ],
}

export const relationenAttribute = {
  id: 'relationen-attribute',
  titel: 'In welche Tabelle gehört die Spalte?',
  anleitung:
    'Die Bibliothek wird in die vier Tabellen autor, buch, leser und ausleihe zerlegt. Verteile die Spalten – frage dich bei jeder: Wovon hängt dieser Wert ab?',
  koerbe: [
    { id: 'autor', label: 'autor' },
    { id: 'buch', label: 'buch' },
    { id: 'leser', label: 'leser' },
    { id: 'ausleihe', label: 'ausleihe' },
  ],
  karten: [
    {
      text: 'titel',
      korb: 'buch',
      hinweis: 'Hängt allein von der buch_id ab.',
    },
    {
      text: 'seiten',
      korb: 'buch',
      hinweis: 'Eine Eigenschaft des Buchs – unabhängig davon, wer es leiht.',
    },
    {
      text: 'jahr (Erscheinungsjahr)',
      korb: 'buch',
      hinweis: 'Gehört zum Buch, nicht zur Autorin: Sie hat mehrere Bücher in verschiedenen Jahren.',
    },
    {
      text: 'geburtsjahr',
      korb: 'autor',
      hinweis: 'Hängt allein von der autor_id ab.',
    },
    {
      text: 'name der Autorin',
      korb: 'autor',
      hinweis:
        'Stand in der alten Liste bei jeder Ausleihe erneut – genau diese Redundanz verschwindet durch die eigene Tabelle.',
    },
    {
      text: 'vorname',
      korb: 'leser',
      hinweis: 'Eigenschaft der Person, unabhängig von jeder einzelnen Ausleihe.',
    },
    {
      text: 'klasse',
      korb: 'leser',
      hinweis:
        'Hängt nur von der ausweis_nr ab. In der alten Liste stand sie in jeder Zeile – deshalb die Änderungsanomalie beim Klassenwechsel.',
    },
    {
      text: 'ausleihdatum',
      korb: 'ausleihe',
      hinweis:
        'Hängt vom Paar Leser:in–Buch ab, nicht vom Buch allein. Attribute der Beziehung landen in der Verbindungstabelle.',
    },
    {
      text: 'rueckgabedatum',
      korb: 'ausleihe',
      hinweis: 'Gehört wie das Ausleihdatum zu einem einzelnen Ausleihvorgang.',
    },
    {
      text: 'autor_id als Fremdschlüssel',
      korb: 'buch',
      hinweis: 'autor 1:n buch – der Fremdschlüssel wandert auf die n-Seite, also nach buch.',
    },
    {
      text: 'buch_id als Fremdschlüssel',
      korb: 'ausleihe',
      hinweis: 'Teil des zusammengesetzten Primärschlüssels der Verbindungstabelle.',
    },
  ],
}

export const relationenAnomalien = {
  id: 'relationen-anomalien',
  titel: 'Welche Anomalie ist das?',
  anleitung:
    'Sechs Vorfälle aus der alten Ausleihliste, in der alles in einer einzigen Tabelle stand. Ordne sie zu.',
  koerbe: [
    { id: 'aenderung', label: 'Änderungsanomalie' },
    { id: 'einfuegen', label: 'Einfügeanomalie' },
    { id: 'loeschen', label: 'Löschanomalie' },
  ],
  karten: [
    {
      text: 'Emma wechselt in die 10a, eine Zeile bleibt 9b.',
      korb: 'aenderung',
      hinweis: 'Ein Wert steht mehrfach da und wird nur teilweise geändert – die Daten widersprechen sich.',
    },
    {
      text: 'Titel nur in zwei von fünf Zeilen korrigiert.',
      korb: 'aenderung',
      hinweis: 'Wieder derselbe Wert an mehreren Stellen, wieder nur zum Teil gepflegt.',
    },
    {
      text: 'Neues Buch nur eintragbar, wenn es jemand leiht.',
      korb: 'einfuegen',
      hinweis: 'Ein Datensatz lässt sich nicht speichern, ohne einen anderen zu erfinden.',
    },
    {
      text: 'Autorin ohne Buch lässt sich nicht speichern.',
      korb: 'einfuegen',
      hinweis: 'Auch hier blockiert die eine große Tabelle das Eintragen für sich genommen sinnvoller Daten.',
    },
    {
      text: 'Letzte Ausleihe gelöscht, Buchdaten sind weg.',
      korb: 'loeschen',
      hinweis: 'Mit der letzten Zeile verschwindet Information, die man behalten wollte.',
    },
    {
      text: 'Letzte Zeile gelöscht, die Klasse 9b ist weg.',
      korb: 'loeschen',
      hinweis: 'Dieselbe Ursache: Zwei voneinander unabhängige Dinge stehen in derselben Zeile.',
    },
  ],
}

export const relationenNormalformen = {
  id: 'relationen-normalformen',
  titel: 'Welche Normalform ist verletzt?',
  anleitung:
    'Jede Karte beschreibt eine Tabelle oder eine Spalte darin. Prüfe der Reihe nach: atomar? ganzer Schlüssel? keine Abhängigkeit zwischen Nicht-Schlüsselattributen?',
  koerbe: [
    { id: 'nf1', label: 'verletzt die 1. NF' },
    { id: 'nf2', label: 'verletzt die 2. NF' },
    { id: 'nf3', label: 'verletzt die 3. NF' },
    { id: 'ok', label: 'ist in der 3. NF' },
  ],
  karten: [
    {
      text: 'In der Zelle steht: Tschick, Momo',
      korb: 'nf1',
      hinweis: 'Zwei Werte in einer Zelle – nicht atomar, also scheitert es schon an der 1. NF.',
    },
    {
      text: 'Die Spalte telefon enthält zwei Nummern.',
      korb: 'nf1',
      hinweis: 'Auch das ist eine Liste in einer Zelle.',
    },
    {
      text: 'Schlüssel (ausweis_nr, buch_id), Spalte vorname',
      korb: 'nf2',
      hinweis:
        'vorname hängt nur von ausweis_nr ab, also nur von einem Teil des Schlüssels. Das ist eine partielle Abhängigkeit.',
    },
    {
      text: 'Schlüssel (kurs_id, schueler_id), Spalte kursname',
      korb: 'nf2',
      hinweis: 'kursname hängt nur an kurs_id – wieder nur ein Teil des zusammengesetzten Schlüssels.',
    },
    {
      text: 'Die Spalte plz bestimmt die Spalte ort.',
      korb: 'nf3',
      hinweis:
        'Eine Abhängigkeit zwischen zwei Nicht-Schlüsselattributen. Der Schlüssel bestimmt plz, und plz bestimmt ort: transitiv.',
    },
    {
      text: 'titel bestimmt autor in derselben Tabelle',
      korb: 'nf3',
      hinweis: 'Genau der Fall aus der Ausleihliste: autor hängt am titel, nicht direkt am Schlüssel.',
    },
    {
      text: 'buch (buch_id, titel, jahr, seiten)',
      korb: 'ok',
      hinweis: 'Alle Werte sind atomar und hängen direkt und vollständig von buch_id ab.',
    },
    {
      text: 'leser (ausweis_nr, vorname, klasse)',
      korb: 'ok',
      hinweis: 'Ebenfalls sauber: vorname und klasse hängen beide direkt an ausweis_nr.',
    },
  ],
}
