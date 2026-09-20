// Sortieraufgabe zur Seite „② Primär- und Fremdschlüssel“

export const schluesselArten = {
  id: 'schluessel-arten',
  titel: 'Welcher Schlüssel ist das?',
  anleitung:
    'Prüfe bei jedem Kandidaten: Ist er wirklich eindeutig? Bleibt er gleich? Und reicht er allein aus?',
  koerbe: [
    { id: 'natuerlich', label: 'natürlicher Schlüssel' },
    { id: 'kuenstlich', label: 'künstlicher Schlüssel' },
    { id: 'zusammen', label: 'zusammengesetzter Schlüssel' },
    { id: 'ungeeignet', label: 'ungeeignet als Schlüssel' },
  ],
  karten: [
    {
      text: 'ISBN eines Buchs',
      korb: 'natuerlich',
      hinweis: 'Existiert ohnehin und ist weltweit eindeutig – niemand muss sie extra vergeben.',
    },
    {
      text: 'Kfz-Kennzeichen',
      korb: 'natuerlich',
      hinweis: 'Ein Merkmal, das es in der realen Welt schon gibt und das eindeutig ist.',
    },
    {
      text: 'IBAN eines Kontos',
      korb: 'natuerlich',
      hinweis: 'Eindeutig und bereits vorhanden, also ein natürlicher Schlüssel.',
    },
    {
      text: 'Kundennummer',
      korb: 'kuenstlich',
      hinweis: 'Wird eigens vergeben, nur damit jeder Datensatz eindeutig wird.',
    },
    {
      text: 'Bestellnummer',
      korb: 'kuenstlich',
      hinweis: 'Gibt es in der realen Welt nicht – der Shop erfindet sie für die Datenbank.',
    },
    {
      text: 'schueler_id',
      korb: 'kuenstlich',
      hinweis: 'Die klassische fortlaufende id: künstlich, kurz und ändert sich nie.',
    },
    {
      text: 'Raum + Wochentag + Stunde',
      korb: 'zusammen',
      hinweis: 'Jede Angabe für sich kommt mehrfach vor. Erst alle drei zusammen sind eindeutig.',
    },
    {
      text: 'Vorstellung + Reihe + Sitzplatz',
      korb: 'zusammen',
      hinweis: 'Reihe 7, Platz 12 gibt es in jeder Vorstellung – erst die Kombination ist eindeutig.',
    },
    {
      text: 'Vor- und Nachname',
      korb: 'ungeeignet',
      hinweis: 'An der Schule gibt es zwei Lena Schmidt. Namen sind nicht eindeutig und können sich ändern.',
    },
    {
      text: 'Wohnort',
      korb: 'ungeeignet',
      hinweis: 'Viele Menschen wohnen am selben Ort, und man zieht um. Weder eindeutig noch stabil.',
    },
  ],
}
