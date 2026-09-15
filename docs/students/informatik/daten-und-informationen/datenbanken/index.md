---
title: "Datenbanken – Daten in der Schule"
description: "Wie eine Schule ihre Daten verwaltet: analoge und digitale Speicherung im Vergleich, Datenbanksystem aus Datenbasis und Datenbankmanagementsystem und dessen Aufgaben."
---

# Datenbanken <Badge type="tip" text="Klasse 9" />

An unserer Schule gibt es Daten über hunderte Schüler:innen, ihre Eltern und die Lehrkräfte: Namen, Adressen, Klassen, Kurse, Noten, Allergien, Notfallnummern. **Wie werden diese Daten festgehalten und verwaltet?**

## Zwei Wege: analog und digital

| | Analog (Papier, Aktenordner) | Digital (Datenbank) |
|---|---|---|
| **Beispiele** | Zeugnisse, unterschriebene Belehrungen, Schülerakten im Schrank | Schulverwaltungsprogramm, Stundenplan, Klassenlisten |
| **Vorteile** | ohne Strom und Geräte lesbar · nicht versehentlich per Klick gelöscht · Unterschriften im Original | **schnelle, automatische Suche** · braucht wenig Platz · leicht zu ändern · von mehreren Orten abrufbar |
| **Nachteile** | braucht viel **Platz** und Papier · Suchen dauert · nur an einem Ort verfügbar | ohne Strom und Geräte kein Zugriff · was schnell erstellt ist, ist auch schnell gelöscht · Angriffe, Abstürze |
| **Zugriff** | wer den Schrankschlüssel hat | wer Benutzername und Passwort mit passenden Rechten hat |

::: tip Gedankenexperiment
Ein Kunstprojekt hat die englischsprachige Wikipedia als Buchreihe mit über 7 000 Bänden gestaltet. Wie viele Regalmeter bräuchte man dafür? Und wie lange würdest du darin nach „Datenbank“ suchen?
:::

## Datenbanksystem

::: info Merke
- **Datenbasis:** die **eigentlichen, gespeicherten Daten**
- **Datenbankmanagementsystem (DBMS):** die **Software**, die die Datenbasis **verwaltet** und den **Zugriff regelt**
- **Datenbanksystem = Datenbasis + DBMS**

Ein Datenbanksystem ist ein Informationssystem zum **Speichern, Wiederfinden, Bearbeiten und Auswerten großer Datenmengen**.
:::

## Wozu braucht man ein DBMS?

Man könnte Daten ja auch einfach in einer Tabellendatei speichern. Aber stell dir vor, **zwei Personen buchen gleichzeitig online den letzten freien Platz** im Theaterkurs …

Ein DBMS kümmert sich um:
- **Mehrbenutzerbetrieb:** Viele greifen gleichzeitig zu, ohne sich gegenseitig Daten zu zerstören.
- **Zugriffsrechte:** Das Sekretariat sieht Adressen, eine Fachlehrkraft nur ihre Kurse.
- **Konsistenz:** Regeln werden eingehalten, z. B. „Jede Schülerin gehört zu genau einer Klasse“ oder „Noten liegen zwischen 1 und 6“.
- **Datensicherheit:** Nach einem Absturz bleibt ein gültiger Stand erhalten, Backups werden unterstützt.
- **Abfragen:** Daten schnell suchen, sortieren und auswerten (→ [SQL](./sql-abfragen)).

::: details Für die Oberstufe: Transaktionen und ACID
Zusammengehörige Änderungen (Platz im Kurs belegen **und** Platz aus der Warteliste streichen) fasst ein DBMS zu einer **Transaktion** zusammen. Sie erfüllt die **ACID**-Eigenschaften:
**A**tomarität (ganz oder gar nicht) · **C**onsistency (Regeln bleiben erfüllt) · **I**solation (gleichzeitige Transaktionen stören sich nicht) · **D**auerhaftigkeit (Abgeschlossenes bleibt gespeichert).
:::

## Wie geht es weiter?

Daten durchlaufen einen **Lebenszyklus**: Sie werden erfasst, gespeichert, genutzt und irgendwann archiviert oder gelöscht. Entlang dieser Phasen ist der Datenbank-Teil aufgebaut → [Der Datenlebenszyklus](./datenlebenszyklus).

::: tip Shoutout 💚
Die Idee, Datenbanken entlang des **Datenlebenszyklus** zu unterrichten, verdanke ich dem großartigen, frei verfügbaren [Informatikbuch von **Julian Dorn**](https://buch.informatik.cc/dm/). Dort findest du viele weitere Übungen, zum Beispiel mit dem Lern-Netzwerk *InstaHub*. Die Texte und Beispiele hier sind eine eigene Fassung für unseren Unterricht.
:::
