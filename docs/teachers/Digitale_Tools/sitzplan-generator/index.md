---
title: "Sitzplan-Generator"
description: "Sitzplan aus den Sitznachbar-Wünschen einer Klasse berechnen – komplett im Browser."
---

# Sitzplan-Generator

<ToolInfo id="sitzplan-generator" />

Erstellt aus den Sitznachbar-Wünschen einer Klasse einen Sitzplan. Dabei werden Sonderwünsche (vorne, Fenster, Gang) und bindende Trennungen berücksichtigt.

## So funktioniert's

1. Raum anlegen – Frontalreihen, U-Form oder Gruppentische.
2. Klasse eintragen und Wünsche erfassen: Wer möchte neben wem sitzen? Wer darf nicht nebeneinander sitzen?
3. Plan berechnen lassen, per Ziehen & Ablegen nachjustieren und ausdrucken. Einzelne Personen lassen sich auf ihrem Platz festpinnen.

Der Algorithmus achtet darauf, dass möglichst niemand ganz ohne erfüllten Wunsch bleibt, und gewichtet gegenseitige Wünsche stärker als einseitige.

## Datenschutz

- Kein Server: Nach dem Laden stellt die Seite keine Netzwerkverbindung mehr her.
- Die Daten liegen ausschließlich im Browser; per JSON-Export lassen sie sich sichern.
- Die Namensanzeige lässt sich auf Vorname bzw. Vorname mit Anfangsbuchstaben reduzieren.

Verwandt: [Klassenverwaltung](../klassenverwaltung/) – Desktop-App für Klassenlisten, Sitzpläne und Gruppen.
