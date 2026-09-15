---
title: "③ Abfragen mit SQL"
description: "Daten mit SQL abfragen, filtern, sortieren, zählen, gruppieren und verknüpfen sowie Datensätze einfügen, ändern und löschen, am Beispiel der Schulbibliothek."
---

# ③ Abfragen mit SQL <Badge type="tip" text="Klasse 9" />

Die Bibliotheksdatenbank ist gefüllt. Jetzt wollen wir Fragen stellen: *Welche Bücher sind über 300 Seiten lang? Wer hat „Tschick“ ausgeliehen? Welche Klasse liest am meisten?*
Dafür gibt es die Abfragesprache **SQL** (*Structured Query Language*).

## Unsere Beispieldatenbank

**autor**

| autor_id | name | geburtsjahr |
|---|---|---|
| 1 | Michael Ende | 1929 |
| 2 | Wolfgang Herrndorf | 1965 |
| 3 | Otfried Preußler | 1923 |

**buch**

| buch_id | titel | jahr | seiten | autor_id |
|---|---|---|---|---|
| 1 | Momo | 1973 | 304 | 1 |
| 2 | Die unendliche Geschichte | 1979 | 480 | 1 |
| 3 | Tschick | 2010 | 256 | 2 |
| 4 | Krabat | 1971 | 336 | 3 |
| 5 | Die kleine Hexe | 1957 | 128 | 3 |

**leser**

| ausweis_nr | vorname | klasse |
|---|---|---|
| 101 | Mia | 7a |
| 102 | Noah | 9b |
| 103 | Emma | 9b |
| 104 | Ali | 10c |

**ausleihe**

| ausweis_nr | buch_id | ausleihdatum |
|---|---|---|
| 101 | 5 | 2025-09-01 |
| 102 | 3 | 2025-09-03 |
| 103 | 3 | 2025-06-12 |
| 103 | 1 | 2025-09-04 |
| 104 | 4 | 2025-09-05 |

## Grundgerüst: SELECT … FROM … WHERE

::: info Merke
```sql
SELECT spalten      -- WAS will ich sehen?
FROM tabelle        -- WOHER kommen die Daten?
WHERE bedingung     -- WELCHE Zeilen? (optional)
```
Mit `SELECT *` bekommst du **alle** Spalten.
:::

```sql
SELECT titel, seiten FROM buch WHERE seiten > 300;
```
→ Momo (304), Die unendliche Geschichte (480), Krabat (336)

| Bedingung | Beispiel |
|---|---|
| Vergleich `=`, `<>`, `<`, `>`, `<=`, `>=` | `WHERE klasse = '9b'` |
| verknüpfen mit `AND`, `OR`, `NOT` | `WHERE jahr < 1975 AND seiten < 320` → Momo, Die kleine Hexe |
| Textmuster mit `LIKE` (`%` = beliebig viele Zeichen) | `WHERE titel LIKE '%Geschichte%'` |

## Sortieren, begrenzen, doppelte entfernen

```sql
SELECT titel, jahr FROM buch ORDER BY jahr DESC LIMIT 3;
```
→ Tschick (2010), Die unendliche Geschichte (1979), Momo (1973)

- `ORDER BY spalte ASC` aufsteigend, `DESC` absteigend
- `LIMIT n` nur die ersten n Zeilen
- `SELECT DISTINCT klasse FROM leser;` → jede Klasse nur einmal: 7a, 9b, 10c

## Zählen und berechnen: Aggregatfunktionen

| Funktion | Bedeutung | Beispiel | Ergebnis |
|---|---|---|---|
| `COUNT(*)` | Anzahl Zeilen | `SELECT COUNT(*) FROM buch;` | 5 |
| `MIN()`, `MAX()` | kleinster/größter Wert | `SELECT MIN(jahr), MAX(jahr) FROM buch;` | 1957, 2010 |
| `AVG()` | Durchschnitt | `SELECT AVG(seiten) FROM buch;` | 300,8 |
| `SUM()` | Summe | `SELECT SUM(seiten) FROM buch;` | 1504 |

### Gruppieren mit GROUP BY

```sql
SELECT autor_id, COUNT(*) AS anzahl
FROM buch
GROUP BY autor_id;
```
→ Autor 1: 2 Bücher · Autor 2: 1 Buch · Autor 3: 2 Bücher

Mit `HAVING` filtert man **nach** dem Gruppieren: `… GROUP BY autor_id HAVING COUNT(*) > 1`.

## Tabellen verknüpfen: JOIN

Im `buch` steht nur die `autor_id`. Den **Namen** holen wir über den Fremdschlüssel aus `autor`:

```sql
SELECT buch.titel, autor.name
FROM buch
JOIN autor ON buch.autor_id = autor.autor_id;
```

| titel | name |
|---|---|
| Momo | Michael Ende |
| Die unendliche Geschichte | Michael Ende |
| Tschick | Wolfgang Herrndorf |
| … | … |

**Wer aus der 9b hat was ausgeliehen?** Drei Tabellen verknüpfen:

```sql
SELECT leser.vorname, buch.titel, ausleihe.ausleihdatum
FROM ausleihe
JOIN leser ON ausleihe.ausweis_nr = leser.ausweis_nr
JOIN buch  ON ausleihe.buch_id    = buch.buch_id
WHERE leser.klasse = '9b';
```
→ Noah: Tschick · Emma: Tschick · Emma: Momo

## Daten verändern

```sql
-- Einfügen
INSERT INTO leser (ausweis_nr, vorname, klasse) VALUES (105, 'Lina', '8c');

-- Ändern
UPDATE leser SET klasse = '10b' WHERE ausweis_nr = 104;

-- Löschen
DELETE FROM ausleihe WHERE ausweis_nr = 101 AND buch_id = 5;
```

::: danger Vorsicht
`UPDATE` und `DELETE` **ohne** `WHERE` betreffen **alle** Zeilen der Tabelle!
:::

## Übungen

1. Gib alle Titel aus, die vor 1975 erschienen sind, sortiert nach Titel.
2. Wie viele Leser:innen gibt es in der Klasse 9b?
3. Gib zu jedem Buch den Titel und das Geburtsjahr der Autorin bzw. des Autors aus.
4. Welche Klasse hat wie viele Ausleihen? (Tipp: JOIN und GROUP BY)
5. Das Sekretariat meldet: Ali ist in die 10b gewechselt. Ändere den Datensatz.

::: tip Selbst ausprobieren
- [SQL Island](https://sql-island.informatik.uni-kl.de/): Ein Abenteuerspiel, das nur mit SQL gelöst werden kann
- [SQLite Online](https://sqliteonline.com/): eigene Tabellen anlegen und abfragen
:::
