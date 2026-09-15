---
title: "Agile Softwareentwicklung"
description: "Klassische und agile Vorgehensmodelle im Vergleich, Scrum mit Sprints, Kanban, User Stories, Prototyping, Softwarearchitektur und Versionsverwaltung mit Git."
---

# Agile Softwareentwicklung <Badge type="info" text="Oberstufe" />

Mit dem [Wasserfallmodell](./wasserfallmodell) wird ein Projekt in festen Phasen nacheinander abgearbeitet. Das funktioniert gut, **wenn von Anfang an klar ist, was gebaut werden soll**. Doch was, wenn die Kund:innen erst beim Ausprobieren merken, was sie wirklich wollen?

## Klassisch oder agil?

| | Klassisch (Wasserfall, V-Modell) | Agil (z. B. Scrum, Kanban) |
|---|---|---|
| **Planung** | alles zu Beginn | grob zu Beginn, Details laufend |
| **Ablauf** | Phasen nacheinander | kurze **Iterationen** (Sprints) |
| **Ergebnis** | am Ende ein fertiges Produkt | nach jedem Sprint ein **lauffähiger Zwischenstand** |
| **Änderungen** | teuer und schwierig | ausdrücklich erwünscht |
| **Kund:innen** | vor allem am Anfang und Ende beteiligt | regelmäßig beteiligt, geben Feedback |
| **geeignet für** | klare, stabile Anforderungen (Brückenbau, Medizintechnik) | unklare, sich ändernde Anforderungen (Apps, Websites) |

::: tip V-Modell
Das **V-Modell** erweitert den Wasserfall: Zu jeder Entwurfsphase auf der linken Seite des „V“ gehört eine **Testphase** auf der rechten Seite (Anforderungen ↔ Abnahmetest, Grobentwurf ↔ Systemtest, Feinentwurf ↔ Modultest).
:::

## Scrum in Kürze

::: info Merke
- **Product Backlog:** Liste aller Wünsche, formuliert als **User Stories**: *„Als **Schüler:in** möchte ich **meine Noten sehen**, damit **ich weiß, wo ich stehe**.“*
- **Sprint:** fester Zeitraum (z. B. 1–2 Wochen), in dem das Team ausgewählte Stories umsetzt
- **Daily:** kurzes tägliches Treffen: Was habe ich geschafft? Was mache ich als Nächstes? Wo hänge ich?
- **Review und Retrospektive:** Ergebnis vorführen, Feedback holen, **Zusammenarbeit verbessern**
:::

## Kanban

Ein **Kanban-Board** macht den Arbeitsstand sichtbar:

| 📋 To Do | 🔨 In Arbeit | 👀 Review | ✅ Fertig |
|---|---|---|---|
| Startbildschirm | Spielfigur bewegen | Punktezähler | Menü |
| Highscore speichern | | | |

Regel: Nur **wenige Aufgaben gleichzeitig** „In Arbeit“, erst fertig machen, dann Neues anfangen.

## Prototyping

Ein **Prototyp** ist eine frühe, einfache Version (Papierskizze, Klick-Dummy, Minimalprogramm), an der man Ideen **testet, bevor** man viel Arbeit investiert.

## Softwarearchitektur

| Monolith | Model-View-Controller (MVC) |
|---|---|
| alles in **einem** großen Programmblock | Aufteilung in **Model** (Daten und Logik), **View** (Darstellung) und **Controller** (verarbeitet Eingaben) |
| am Anfang einfach, später schwer zu ändern | Teile lassen sich getrennt entwickeln und austauschen |

## Versionsverwaltung <Badge type="warning" text="Lk" />

Wenn mehrere Personen am selben Code arbeiten, braucht man eine **Versionsverwaltung** wie **Git**:
- Jede Änderung wird als **Commit** mit Beschreibung gespeichert, und man kann jederzeit zu früheren Ständen zurück.
- In **Branches** entwickelt man neue Funktionen, ohne den funktionierenden Stand zu gefährden.
- Plattformen wie GitHub oder GitLab ermöglichen das **gemeinsame Arbeiten** und Überprüfen (*Code Review*).

## Weiterlesen

- [Projektmanagement](./projektmanagement)
- Systematisch programmieren: [Problemlöseprozess im Python-Kurs](../python-kurs/grundlagen/problemloeseprozess)
