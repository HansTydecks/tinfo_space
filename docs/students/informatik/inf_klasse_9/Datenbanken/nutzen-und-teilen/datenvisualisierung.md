# Datenvisualisierung

## Altersstruktur

1. Ermittle, in welcher Altersspanne die angemeldeten Nutzer:innen sind.
2. Visualisiere die Geburtstage und prüfe, ob du ein Muster oder eine Häufigkeitsverteilung erkennst.

Um die Geburtstage zu visualisieren, kannst du je nach Einstellung deines InstaHubs, die graphische Oberfläche oder den SQL-Editor bzw. die KI verwenden:

```sql
SELECT birthday, COUNT(*) AS member_count
FROM users
GROUP BY birthday;
```

Über den Download-Knopf kannst du die Daten als CSV-Datei runterladen.

Die Daten lassen sich in einer Tabellenkalkulation oder etwa der Webseite Datawrapper aufbereiten. 

## Geographische Verteilung

Visualisiere auf einer Karte aus welchen Städten die Benutzer kommen.

## Likes je Photo

1. Visualisiere die Anzahl der durchschnittlichen Likes in Abhängigkeit mit den Followern eines Benutzers.
2. Gibt es einen Zusammenhang?

## Photos je Benutzer

Es gibt verschiedene Hypothesen, warum manche Benutzer mehr Photos hochladen als andere. Prüft gemeinsam, ob eine der folgenden Hypothesen stimmt:

1. Es hängt von der Stadt ab.
2. Es hängt vom Geschlecht ab.
3. Es hängt vom Alter ab.
4. Es hängt von der Anzahl der Follower ab.
