---
title: "② Relationenmodell & Normalisierung"
description: "Vom ER-Modell zum Relationenmodell, Redundanz und Anomalien, Konsistenz und Integrität, Normalformen, Datenbankmodelle und das CAP-Theorem."
---

# ② Relationenmodell & Normalisierung <Badge type="info" text="Oberstufe" />

Das [ER-Modell](./er-modell) ist ein Bauplan. Im **Relationenmodell** wird daraus eine Sammlung von **Tabellen** (*Relationen*), die ein relationales Datenbanksystem direkt umsetzen kann.

## Vom ERM zu Tabellen

::: info Merke: Überführungsregeln
1. Jede **Entität** wird eine **Tabelle**, die Attribute werden **Spalten**, der Primärschlüssel wird **unterstrichen**.
2. **1 : n**-Beziehung → Primärschlüssel der 1-Seite als **Fremdschlüssel** in die n-Seite.
3. **1 : 1**-Beziehung → Fremdschlüssel in eine der beiden Tabellen.
4. **n : m**-Beziehung → eigene **Verbindungstabelle** mit beiden Fremdschlüsseln (plus Attribute der Beziehung).
:::

Schreibweise für die Bibliothek (Primärschlüssel zwischen _Unterstrichen_, Fremdschlüssel mit ↑):

```text:no-line-numbers
autor    (_autor_id_, name, geburtsjahr)
buch     (_buch_id_, titel, jahr, seiten, ↑autor_id)
leser    (_ausweis_nr_, vorname, klasse)
ausleihe (_↑ausweis_nr_, _↑buch_id_, _ausleihdatum_)
```

<SortierAufgabe aufgabe="relationen-ueberfuehrung" />

## Der Tabellen-Test

Ein ER-Diagramm sieht auch dann richtig aus, wenn es falsch ist. Eine Tabelle nicht. Deshalb gilt: **Schreibe drei Beispielzeilen hin, bevor du dem Diagramm glaubst.** Drei Symptome verraten einen Modellfehler sofort:

| Was passiert | Was es bedeutet |
|---|---|
| Du müsstest eine **Liste in eine Zelle** schreiben („Tschick, Momo“) | Die Beziehung ist **n : m**, die Verbindungstabelle fehlt |
| Derselbe Wert **wiederholt sich** über mehrere Zeilen | Das Attribut sitzt in der **falschen Tabelle** |
| Du kannst einen Datensatz **nicht eintragen**, ohne einen zweiten zu erfinden | Zwei unabhängige Dinge stehen in **derselben Tabelle** |

Genau danach fragt die nächste Übung: Wovon hängt ein Wert ab – von einer Entität allein oder erst von beiden zusammen?

<SortierAufgabe aufgabe="relationen-attribute" />

## Warum nicht alles in eine Tabelle?

Die Bibliothek hat ihre Ausleihen früher in **einer einzigen Liste** geführt:

| ausweis_nr | vorname | klasse | titel | autor | ausleihdatum |
|---|---|---|---|---|---|
| 103 | Emma | 9b | Tschick | Wolfgang Herrndorf | 2025-06-12 |
| 103 | Emma | 9b | Momo | Michael Ende | 2025-09-04 |
| 102 | Noah | 9b | Tschick | Wolfgang Herrndorf | 2025-09-03 |

::: warning Redundanz und Anomalien
Dieselben Informationen stehen **mehrfach** da (**Redundanz**). Das kostet Platz und führt zu Fehlern:
- **Änderungsanomalie:** Emma wechselt die Klasse. Vergisst man eine Zeile, ist sie gleichzeitig in 9b und 10a.
- **Einfügeanomalie:** Ein neues Buch kann man erst eintragen, wenn es jemand ausleiht.
- **Löschanomalie:** Gibt Noah „Tschick“ zurück und alle Ausleihen werden gelöscht, verschwindet mit der letzten Zeile auch die Information über das Buch.
:::

<SortierAufgabe aufgabe="relationen-anomalien" />

::: info Merke: Qualitätsziele
| Begriff | Bedeutung |
|---|---|
| **Redundanzfreiheit** | jede Information ist nur **einmal** gespeichert |
| **Konsistenz** | die Daten **widersprechen sich nicht** |
| **Integrität** | die Daten sind **korrekt** und halten alle Regeln ein (z. B. jeder Fremdschlüssel verweist auf einen existierenden Datensatz: *referentielle Integrität*) |
| **Persistenz** | die Daten bleiben **dauerhaft** gespeichert |
:::

## Normalformen <Badge type="warning" text="Lk" />

Die **Normalisierung** zerlegt Tabellen schrittweise, bis Redundanzen verschwinden.

| Normalform | Regel | In unserer Liste verletzt, weil … |
|---|---|---|
| **1. NF** | Jeder Attributwert ist **atomar** (nur ein Wert pro Zelle). | stünde „Tschick, Momo“ in einer Zelle |
| **2. NF** | 1. NF **und** jedes Nicht-Schlüsselattribut hängt vom **ganzen** Schlüssel ab. | `vorname` hängt nur von `ausweis_nr` ab, nicht vom ganzen Schlüssel (`ausweis_nr`, `titel`, `ausleihdatum`) |
| **3. NF** | 2. NF **und** keine Abhängigkeit zwischen Nicht-Schlüsselattributen (**keine transitiven** Abhängigkeiten). | `autor` hängt von `titel` ab, nicht direkt vom Schlüssel |

Ergebnis der Normalisierung: genau die vier Tabellen oben.

<SortierAufgabe aufgabe="relationen-normalformen" />

## Datenbankmodelle <Badge type="warning" text="Lk" />

| Modell | Idee | Einsatz |
|---|---|---|
| **relational** | Tabellen mit Schlüsseln, Abfragen mit SQL | Verwaltung, Shops, Banken |
| **hierarchisch** | Baumstruktur: jeder Datensatz hat genau einen Elternknoten | Dateisysteme, XML |
| **objektorientiert** | speichert Objekte mit Attributen und Methoden | eng mit OOP-Programmen verzahnt |
| **Graphdatenbank** | Knoten und Kanten | soziale Netzwerke, Empfehlungen, Wissensgraphen |

::: info Merke: CAP-Theorem
Ein **verteiltes** Datenbanksystem (auf vielen Servern) kann **höchstens zwei** der drei Eigenschaften gleichzeitig garantieren:
- **C**onsistency: Alle sehen zur selben Zeit dieselben Daten.
- **A**vailability: Jede Anfrage bekommt eine Antwort.
- **P**artition tolerance: Das System arbeitet weiter, auch wenn die Verbindung zwischen Servern ausfällt.

Da Netzausfälle in der Praxis vorkommen, muss man meist zwischen **Konsistenz** (Bank) und **Verfügbarkeit** (Social-Media-Feed) abwägen.
:::

## Aufgabe: ein eigenes Schema

> Eine **Musikschule** verwaltet ihren Unterricht. Zu jeder **Lehrkraft** werden Personalnummer, Name und Instrument gespeichert, zu jedem **Kind** eine Schülernummer, Name und Geburtsdatum. Ein Kind kann bei mehreren Lehrkräften Unterricht haben, und eine Lehrkraft unterrichtet viele Kinder; für jeden Unterricht werden **Wochentag und Uhrzeit** festgehalten. Jedes Kind gehört außerdem zu genau einer **Rechnungsadresse** (Adress-ID, Straße, Ort), zu der mehrere Kinder gehören können.

::: info Aufgabe
1. Bestimme die Kardinalitäten der beiden Beziehungen.
2. Notiere das Relationenschema in der Schreibweise von oben (Primärschlüssel zwischen Unterstrichen, Fremdschlüssel mit ↑).
3. Mach den **Tabellen-Test**: Schreibe für zwei Kinder mit je zwei Unterrichtsstunden Beispielzeilen und prüfe, ob dein Schema sie aufnehmen kann.
:::

::: details Lösung
```text:no-line-numbers
lehrkraft  (_personalnr_, name, instrument)
adresse    (_adress_id_, strasse, ort)
kind       (_schuelernr_, name, geburtsdatum, ↑adress_id)
unterricht (_↑personalnr_, _↑schuelernr_, wochentag, uhrzeit)
```

- Lehrkraft – Kind ist **n : m** → eigene Verbindungstabelle `unterricht`, und Wochentag und Uhrzeit sind Attribute der **Beziehung**, also landen sie genau dort.
- Adresse – Kind ist **1 : n** → der Fremdschlüssel wandert auf die n-Seite, also nach `kind`.

Der Tabellen-Test zeigt noch eine Feinheit: Nimmt ein Kind bei **derselben** Lehrkraft zweimal pro Woche Unterricht, reicht der Schlüssel (`personalnr`, `schuelernr`) nicht mehr – dann muss `wochentag` mit in den Primärschlüssel.
:::

## Weiterlesen

- Grundlagen: [ER-Modell](./er-modell) · [Kardinalitäten](./kardinalitaeten) · [Primär- & Fremdschlüssel](./schluessel)
- Die fertigen Tabellen abfragen: [Abfragen mit SQL](./sql-abfragen)
