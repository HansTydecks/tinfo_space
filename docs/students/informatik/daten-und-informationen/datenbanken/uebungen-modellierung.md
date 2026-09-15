---
title: "② Übungen zur Datenmodellierung"
description: "Modellierungsaufgaben zu ER-Modell, Schlüsseln, Kardinalitäten und SQL: Fahrradverleih, Schülerzeitung, Tierheim und E-Sport-Turnier."
---

# ② Übungen zur Datenmodellierung <Badge type="tip" text="Klasse 9" />

Für jedes Szenario gilt, wenn nichts anderes steht:
1. Erstelle das **ER-Modell** mit den richtigen Symbolen.
2. Ergänze **Primär- und Fremdschlüssel** und die **Kardinalitäten**.
3. Füge ein **weiteres sinnvolles Attribut** hinzu.
4. Formuliere die angegebenen **SQL-Abfragen**.

## Einstieg

### 🚲 Der Fahrradverleih

> Ein Fahrradverleih am Elberadweg verleiht **Fahrräder**. Jedes Fahrrad hat eine Rahmennummer, eine Marke und eine Farbe. **Kund:innen** werden mit Kundennummer, Name und Telefonnummer gespeichert. Eine Kundin kann mehrere Fahrräder ausleihen; zu jeder Ausleihe werden Datum und Mietdauer in Stunden festgehalten.

SQL:
- Gib alle roten Fahrräder aus.
- Füge eine neue Kundin hinzu.
- Zähle, wie viele Ausleihen es insgesamt gab.

### 📰 Die Schülerzeitung

> Die Schülerzeitung erscheint in **Ausgaben** mit Nummer und Erscheinungsdatum. Jede Ausgabe enthält mehrere **Artikel** mit Überschrift und Rubrik (Sport, Schule, Kultur …). Ein Artikel kann von mehreren **Redakteur:innen** geschrieben werden, die mit Name und Klasse gespeichert werden.

SQL:
- Gib alle Artikel der Rubrik „Sport“ aus.
- Zeige zu jedem Artikel die Nummer der Ausgabe, in der er erschienen ist.
- Welche Redakteurin hat die meisten Artikel geschrieben?

## Fortgeschritten

### 🐾 Das Tierheim

> Im Tierheim leben **Tiere** mit Name, Art, Geburtsjahr und Aufnahmedatum. Jedes Tier wohnt in genau einem **Gehege**; ein Gehege kann mehrere Tiere beherbergen. **Pfleger:innen** betreuen mehrere Gehege, und manche Gehege werden von mehreren Pfleger:innen betreut. Wird ein Tier vermittelt, speichert man die **neue Besitzerin** oder den neuen Besitzer und das Vermittlungsdatum.

1. Erstelle das ERM und das Relationenmodell.
2. SQL: Welche Tiere sind älter als 10 Jahre? Wie viele Tiere leben pro Gehege? Welche Pfleger:innen betreuen Katzen?
3. **Erweiterung:** Das Tierheim eröffnet eine zweite Außenstelle. Passe dein Modell an.

### 🎮 Das E-Sport-Turnier

> Beim Schul-E-Sport-Turnier treten **Teams** gegeneinander an. Jedes Team hat einen Namen und besteht aus mehreren **Spieler:innen** (Gamertag, Klasse). In jedem **Match** spielen genau zwei Teams gegeneinander; gespeichert werden Datum, Spiel und das Ergebnis.

Überlege besonders: Wie modellierst du, dass an einem Match **genau zwei** Teams beteiligt sind?

## Eigene Modellierung

1. Wähle eine App oder Website, die du gut kennst (Onlineshop, Musikstreaming, Ticketverkauf, ein Spiel).
2. Erstelle das **vermutlich zugrunde liegende** Datenmodell als ERM.
3. Überlege dir drei Datenabfragen, die der Anbieter vermutlich täglich stellt. Was verraten sie über die Nutzer:innen?
