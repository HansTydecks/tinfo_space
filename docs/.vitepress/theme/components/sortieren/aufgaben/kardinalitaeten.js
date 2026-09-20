// Sortieraufgaben zur Seite „② Kardinalitäten“

export const kardinalitaetenBasis = {
  id: 'kardinalitaeten-basis',
  titel: 'Kardinalitäten sortieren',
  anleitung:
    'Frage bei jedem Paar in beide Richtungen und ziehe es dann in den passenden Korb – oder tippe erst die Karte an und dann den Korb.',
  koerbe: [
    { id: 'eins-eins', label: '1 : 1' },
    { id: 'eins-n', label: '1 : n' },
    { id: 'n-m', label: 'n : m' },
  ],
  karten: [
    {
      text: 'Fußballverein – Mannschaft',
      korb: 'eins-n',
      hinweis: 'Ein Verein hat viele Mannschaften, eine Mannschaft gehört zu genau einem Verein.',
    },
    {
      text: 'Mannschaft – Spieler:in (eine Saison)',
      korb: 'eins-n',
      hinweis:
        'Eine Mannschaft hat viele Spieler:innen, pro Saison spielt man in genau einer Mannschaft. Über mehrere Jahre betrachtet wäre es n : m.',
    },
    {
      text: 'Buslinie – Haltestelle',
      korb: 'n-m',
      hinweis: 'Eine Linie hält an vielen Haltestellen, an einer Haltestelle halten viele Linien.',
    },
    {
      text: 'Mensch – gültiger Personalausweis',
      korb: 'eins-eins',
      hinweis: 'Ein Mensch hat genau einen gültigen Ausweis, ein Ausweis gehört genau einem Menschen.',
    },
    {
      text: 'Lehrkraft – Klassenleitung',
      korb: 'eins-eins',
      hinweis:
        'Jede Klasse hat genau eine Klassenleitung und eine Lehrkraft leitet höchstens eine Klasse.',
    },
    {
      text: 'Rezept – Zutat',
      korb: 'n-m',
      hinweis: 'Ein Rezept braucht viele Zutaten, eine Zutat kommt in vielen Rezepten vor.',
    },
    {
      text: 'YouTube-Kanal – Video',
      korb: 'eins-n',
      hinweis: 'Ein Kanal hat viele Videos, ein Video gehört zu genau einem Kanal.',
    },
    {
      text: 'Kinovorstellung – Sitzplatzbuchung',
      korb: 'eins-n',
      hinweis: 'Eine Vorstellung hat viele Buchungen, jede Buchung gilt für genau eine Vorstellung.',
    },
    {
      text: 'Bestellung – Artikel (Onlineshop)',
      korb: 'n-m',
      hinweis: 'Eine Bestellung enthält viele Artikel, ein Artikel steht in vielen Bestellungen.',
    },
  ],
}

export const kardinalitaetenKontext = {
  id: 'kardinalitaeten-kontext',
  titel: 'Kommt es auf den Zeitraum an?',
  anleitung:
    'Bei manchen Paaren ändert sich die Kardinalität, je nachdem ob du einen Zeitpunkt oder einen Zeitraum betrachtest. Bei anderen nicht. Sortiere.',
  koerbe: [
    { id: 'immer-1n', label: 'immer 1 : n' },
    { id: 'immer-nm', label: 'immer n : m' },
    { id: 'zeitraum', label: 'hängt vom Zeitraum ab' },
  ],
  karten: [
    {
      text: 'Buchexemplar – Leser:in',
      korb: 'zeitraum',
      hinweis:
        'Zu einem Zeitpunkt ist ein Exemplar an genau eine Person verliehen (1 : n). Über die ganze Ausleihgeschichte hatte es viele Leser:innen (n : m).',
    },
    {
      text: 'Wohnung – Mieter:in',
      korb: 'zeitraum',
      hinweis: 'Heute wohnt dort eine Partei, über die Jahre hatte die Wohnung viele Mieter:innen.',
    },
    {
      text: 'Spieler:in – Verein',
      korb: 'zeitraum',
      hinweis: 'In einer Saison genau ein Verein, über die ganze Karriere mehrere.',
    },
    {
      text: 'Mensch – Geburtsort',
      korb: 'immer-1n',
      hinweis:
        'Der Geburtsort steht ein für alle Mal fest. In einem Ort werden viele Menschen geboren, aber jeder Mensch hat nur einen Geburtsort.',
    },
    {
      text: 'Rechnung – Rechnungsposten',
      korb: 'immer-1n',
      hinweis: 'Ein Posten gehört dauerhaft zu genau einer Rechnung, das ändert sich nie mehr.',
    },
    {
      text: 'Film – Schauspieler:in',
      korb: 'immer-nm',
      hinweis:
        'Ein Film hat viele Mitwirkende, und wer einmal mitgespielt hat, bleibt in der Besetzung. Beide Seiten sind von Anfang an mehrfach.',
    },
  ],
}
