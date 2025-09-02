# Archivieren oder Vernichten

Am Ende des Lebenszyklus von Daten stellt sich eine wichtige Frage: Was passiert mit den Daten, die nicht mehr täglich gebraucht werden?

## Archivieren oder Vernichten von Daten

### Warum archivieren wir Daten?

Nicht alle Daten werden regelmäßig genutzt, sind aber trotzdem wichtig. Manche Daten müssen wir aufgrund gesetzlicher Vorgaben aufbewahren - etwa Rechnungen für das Finanzamt oder Personalakten für die Rentenversicherung. Andere Daten haben eine historische Bedeutung und könnten für die Forschung oder spätere Analysen wertvoll sein. Besonders wichtig ist auch die **Datensicherung**: Archivierte Daten dienen als Backup, falls aktuelle Daten verloren gehen oder beschädigt werden.

### Wie werden Daten archiviert?

Bei der Archivierung kommen verschiedene Speichermedien zum Einsatz. Für kurzfristige Archivierung nutzt man oft Festplatten oder SSDs. Für längerfristige Archivierung eignen sich besonders **Magnetbänder**, da sie kostengünstig sind und sehr lange halten. Besonders wichtige Daten werden auch auf optischen Medien wie speziellen BluRays gesichert.

Um verschiedene Versionen von Daten zu verwalten, nutzt man **Versionierungssysteme**. Diese speichern nicht nur den aktuellen Stand, sondern auch die Historie von Änderungen. So kann man frühere Versionen wiederherstellen oder nachvollziehen, wer wann welche Änderungen vorgenommen hat. Beim Programmieren ist das etwa Git.

Hier kannst du dir alle Änderungen von InstaHub.org ansehen:
[GitHub InstaHub Commits](https://github.com/wi-wissen/InstaHub/commits/master/)

### Wann werden Daten vernichtet?

Manchmal müssen Daten endgültig gelöscht werden. Das ist der Fall, wenn es keinen Grund mehr gibt die Daten zu haben, etwa wenn du dein Konto löschst, die gesetzliche Aufbewahrungsfrist endet oder wenn Nutzer:innen von ihrem **"Recht auf Vergessenwerden"** Gebrauch machen. Auch wenn die Einwilligung zur Datenverarbeitung widerrufen wird, müssen die Daten gelöscht werden. Bei sozialen Netzwerken wie InstaHub werden Daten auch vernichtet, wenn Nutzer:innen gegen Richtlinien verstoßen oder wenn sie ihren Account löschen möchten.

### Wie werden Daten sicher vernichtet?

Das sichere Löschen von Daten ist komplexer als viele denken. Daten liegen auf Speichermedien wie einer SSD. Damit diese schnell gefunden werden, gibt es einen Index in dem steht wo auf dem Speichermedium welche Daten liegen. Beim normalen Löschen wird nur der Hinweis auf Daten aus dem Index gelöscht, die Daten aber noch auf dem Speichermedium vorhanden. Man spricht hier vom **logischen Löschen**. Dies lässt sich daher auch rückgängig machen, solange der scheinbar freie Speicherplatz nicht überschrieben wurde.

[Recuva - Datenwiederherstellung](https://www.ccleaner.com/de-de/recuva)

Für sensible Daten ist das nicht ausreichend. Beim **physischen Löschen** werden die Bereiche auf der Festplatte mehrfach mit Zufallsdaten überschrieben. Nur so ist sichergestellt, dass die ursprünglichen Daten nicht wiederhergestellt werden können.

[Eraser - Sicheres Löschen](https://eraser.heidi.ie/)

Bei besonders sensiblen Daten werden die Speichermedien sogar **physisch zerstört** - etwa durch spezielle Schredder oder durch Einschmelzen. Sofern du eine Schutzbrille aufsetzt, kannst du dich auch mit einem Hammer daran versuchen.

### Sicherungskonzept für die Schule

Entwickelt ein Sicherungskonzept für eure Schule. Berücksichtigt dabei:

- Verschiedene Datenarten (Noten, E-Mails, Projektarbeiten, ...)
- Aufbewahrungsfristen
- Speichermethoden
- Löschungsrichtlinien

Erstellt eine Übersicht:

| Datenart | Aufbewahrungsfrist | Speichermethode | Löschung |
|----------|-------------------|-----------------|----------|
| Zeugnis  | 50 Jahre          | Ausgedruckt     | Nie      |
| ...      | ...               | ...             | ...      |
