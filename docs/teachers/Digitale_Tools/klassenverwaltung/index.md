---
title: "Klassenverwaltung"
description: "Desktop-App für Klassenlisten, Sitzpläne, Gruppenbildung und Zufallsauswahl."
---

# Klassenverwaltung

<ToolInfo id="klassenverwaltung" />

Eine kleine Desktop-App (Repository *Sitzplan-Fenster*), die alle Klassen an einem Ort verwaltet und im Unterricht schnell zur Hand ist.

## Funktionen

- **Klassen und Schülerlisten** anlegen und pflegen
- **Sitzpläne** im Raster: Plätze blockieren, Tafel oben oder unten, Sitzordnung mischen
- **Gruppen bilden** per Knopfdruck
- **Zufällig aufrufen**, wer als Nächstes dran ist
- **Notizen** zu einzelnen Lernenden
- **Schuljahreswechsel:** Klassennamen automatisch hochzählen (z. B. 7-1 → 8-1)

## Technik & Datenschutz

Die App ist mit Tauri gebaut und speichert alle Daten in einer Datei auf dem eigenen Rechner – nichts verlässt das Gerät. Gebaut wird sie aus dem Quellcode auf GitHub (Node.js und Rust, `npm run tauri build`).

Verwandt: [Sitzplan-Generator](../sitzplan-generator/) – Sitzplan aus Schülerwünschen im Browser berechnen.
