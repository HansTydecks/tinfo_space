---
title: "② Primär- und Fremdschlüssel"
description: "Datensätze eindeutig identifizieren mit Primärschlüsseln, Tabellen verknüpfen mit Fremdschlüsseln und Beziehungen 1:1, 1:n und n:m in Tabellen umsetzen."
---

# ② Primär- und Fremdschlüssel <Badge type="tip" text="Klasse 9" />

An unserer Schule gibt es zwei Schülerinnen mit dem Namen **Lena Schmidt**. Wie weiß die Datenbank, welche Lena welche Note bekommen hat?

## Wichtige Begriffe

| Begriff | Bedeutung | Beispiel |
|---|---|---|
| **Tabelle** (Relation) | speichert alle Entitäten eines Typs | Tabelle `schueler` |
| **Datensatz** | eine **Zeile** = eine Entität | Lena Schmidt, 9b |
| **Attribut** | eine **Spalte** | `vorname` |
| **Attributwert** | ein einzelner Eintrag | `Lena` |

## Primärschlüssel

::: info Merke: Primärschlüssel
Ein **Primärschlüssel** ist ein Attribut (oder eine Kombination von Attributen), dessen Wert **jeden Datensatz eindeutig** identifiziert. Er darf **nie doppelt** vorkommen und **nie leer** sein.
:::

| `schueler_id` | vorname | nachname | klasse |
|---|---|---|---|
| **1041** | Lena | Schmidt | 9b |
| **1187** | Lena | Schmidt | 7a |
| **1203** | Jonas | Weber | 9b |

| Art | Idee | Beispiele |
|---|---|---|
| **natürlicher Schlüssel** | ein Merkmal, das **ohnehin eindeutig** existiert | ISBN eines Buchs, Kfz-Kennzeichen |
| **künstlicher Schlüssel** | eine **eigens vergebene** Nummer, oft `id` genannt | Schülernummer, Kundennummer, Bestellnummer |
| **zusammengesetzter Schlüssel** | erst **mehrere Attribute zusammen** sind eindeutig | Raumnummer + Wochentag + Stunde für einen Stundenplaneintrag |

::: warning Namen sind keine guten Schlüssel
Namen sind nicht eindeutig und können sich ändern (z. B. durch Heirat). Deshalb nimmt man meist **künstliche Schlüssel**.
:::

<SortierAufgabe aufgabe="schluessel-arten" />

**Weiterdenken:** Welcher Schlüssel eignet sich für: Gerichte in der Schulmensa · Sitzplätze in einem Kinosaal · Spielstände in einem Onlinespiel · Parkplätze eines Parkhauses · Einträge im Klassenbuch?

## Fremdschlüssel

::: info Merke: Fremdschlüssel
Ein **Fremdschlüssel** ist ein Attribut in einer Tabelle, das auf den **Primärschlüssel einer anderen Tabelle verweist**. So werden Tabellen **miteinander verknüpft**.
Konvention für den Namen: `tabelle_primaerschluessel`, z. B. `klasse_id`
:::

## Beziehungen in Tabellen umsetzen

### 1 : n → Fremdschlüssel auf die n-Seite

Eine Klasse hat viele Schüler:innen. Deshalb bekommt **jede Schülerin** einen Verweis auf **ihre** Klasse. (Andersherum müsste bei der Klasse eine ganze Liste in einem Feld stehen, und das geht nicht.)

**klasse**

| **klasse_id** | bezeichnung | raum |
|---|---|---|
| 7 | 9b | 204 |

**schueler**

| **schueler_id** | vorname | *klasse_id* |
|---|---|---|
| 1041 | Lena | *7* |
| 1203 | Jonas | *7* |

### 1 : 1 → Fremdschlüssel auf einer der beiden Seiten

Schüler:in – Schließfach: `schliessfach` bekommt den Fremdschlüssel `schueler_id` (oder umgekehrt).

### n : m → eigene Verbindungstabelle

Schüler:innen besuchen viele Wahlkurse, Wahlkurse haben viele Teilnehmer:innen. Man braucht eine **Hilfstabelle** mit **zwei Fremdschlüsseln**; zusammen bilden sie den Primärschlüssel:

**teilnahme**

| ***schueler_id*** | ***kurs_id*** | angemeldet_am |
|---|---|---|
| 1041 | 3 | 2025-09-01 |
| 1041 | 5 | 2025-09-02 |
| 1203 | 3 | 2025-09-01 |

::: tip Bibliothek
Die Beziehung „Leser:in **leiht aus** Buch“ wird genauso zur Tabelle `ausleihe(ausweis_nr, buch_id, ausleihdatum)`.
:::
