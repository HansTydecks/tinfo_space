---
title: "Questapp"
description: "Browserbasierte Schnitzeljagd für Klassenausflüge – mit GPS, Fotos und Live-Rangliste."
---

# Questapp

<ToolInfo id="questapp" />

Eine browserbasierte Schnitzeljagd für Klassenausflüge. Lehrkräfte bauen vorab einen Ausflug aus Stationen, Schülergruppen treten mit einem Code bei (ein Handy pro Gruppe) und lösen die Stationen live im Browser – ganz ohne App-Store.

## Stationstypen

| Typ | Ablauf |
|---|---|
| 📍 Ort finden | Die Gruppe checkt per GPS am Zielort ein |
| ❓ Frage | Freitext (tippfehlertolerant), Zahl oder Multiple Choice |
| 📸 Foto-Challenge | Foto aufnehmen, die Lehrkraft prüft |
| 🔥 Heiß & Kalt | Verstecktes Ziel, die App zeigt nur „wärmer“ oder „kälter“ |
| 🧭 Kompass-Jagd | Ein Pfeil zeigt zum versteckten Ziel |
| 📳 Schüttel-Challenge | Der Bewegungssensor zählt mit |

Stationen laufen der Reihe nach oder in freier Reihenfolge.

## Für Lehrkräfte

- Ausflugs- und Stationseditor mit Kartenauswahl
- Lobby mit Beitrittscode und QR-Code
- Live-Ansicht mit Karte, Fortschritt und Nachrichten an alle Gruppen
- Beamer-Ansicht mit Live-Rangliste und Siegerehrung
- Export von Fotos und Ergebnissen; Ausflüge als Vorlage wiederverwenden

## Datenschutz

- Schülergruppen haben keine Konten, nur einen frei gewählten Gruppennamen.
- Die Sichtbarkeit der Standorte ist pro Ausflug einstellbar; Positionen werden nie gespeichert.
- Fotos werden ohne Metadaten (EXIF/GPS) gespeichert.
- Nach Spielende werden Gruppen, Antworten und Fotos automatisch gelöscht.

::: info Selbst hosten
Questapp ist eine Server-Anwendung mit Datenbank und läuft deshalb nicht auf GitHub Pages. Für den Betrieb braucht es einen eigenen Server mit Docker und eine Domain. Die Anleitung steht im [Repository](https://github.com/HansTydecks/Photo-Trip).
:::
