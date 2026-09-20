---
title: "② Kardinalitäten"
description: "Beziehungstypen 1:1, 1:n und n:m in Datenbanken bestimmen, mit der Zwei-Richtungen-Methode und Übungen aus dem Schulalltag."
---

# ② Kardinalitäten <Badge type="tip" text="Klasse 9" />

Wir planen die Bibliotheksdatenbank. Es gibt **Leser:innen** und **Bücher**. Aber darf ein Buch gleichzeitig an 100 Personen verliehen werden? Ohne klare Angabe wüsste das System es nicht.

::: info Merke: Kardinalität
Die **Kardinalität** gibt an, **mit wie vielen** Entitäten auf der anderen Seite eine Entität **in Beziehung stehen kann**.

| Typ | gelesen | Bedeutung |
|---|---|---|
| **1 : 1** | eins zu eins | jedem Element links ist **genau eins** rechts zugeordnet und umgekehrt |
| **1 : n** | eins zu viele | einem Element links sind **viele** rechts zugeordnet, jedem rechts aber nur **eins** links |
| **n : m** | viele zu viele | auf **beiden Seiten** sind mehrere Zuordnungen möglich |
:::

## Die Zwei-Richtungen-Methode

👉 Frage **immer in beide Richtungen**:

**Beispiel 1: Klasse – Schüler:in**
- Eine Klasse hat wie viele Schüler:innen? → **viele** (n)
- Eine Schülerin ist in wie vielen Klassen? → **genau einer** (1)
- ➡️ **1 : n**

**Beispiel 2: Schüler:in – Wahlkurs**
- Eine Schülerin besucht wie viele Wahlkurse? → **mehrere** (n)
- Ein Wahlkurs hat wie viele Teilnehmer:innen? → **mehrere** (m)
- ➡️ **n : m**

**Beispiel 3: Schüler:in – Schließfach**
- Ein Schüler hat wie viele Schließfächer? → **genau eins**
- Ein Schließfach gehört wie vielen Schüler:innen? → **genau einer**
- ➡️ **1 : 1**

::: tip Es kommt auf die Situation an
Kardinalitäten hängen davon ab, **was die Datenbank abbilden soll**. In einer Bibliothek kann ein **Exemplar** gleichzeitig nur an **eine** Person verliehen sein. Betrachtet man aber die **Ausleihgeschichte** über Jahre, hatte ein Buch viele Leser:innen. Überlege also immer, **welcher Zeitpunkt oder Zeitraum** gemeint ist.
:::

## Übungen

Bestimme die Kardinalität und begründe mit der Zwei-Richtungen-Methode.

<SortierAufgabe aufgabe="kardinalitaeten-basis" />

Und jetzt der Zeitraum aus dem Hinweis oben – hier ist nicht jedes Paar eindeutig:

<SortierAufgabe aufgabe="kardinalitaeten-kontext" />

::: details Lösungen zum Nachlesen und Ausdrucken
| Paar | Typ | Begründung |
|---|---|---|
| Fußballverein – Mannschaft | **1 : n** | ein Verein hat viele Mannschaften, eine Mannschaft gehört zu einem Verein |
| Mannschaft – Spieler:in (eine Saison) | **1 : n** | eine Mannschaft hat viele Spieler:innen; pro Saison spielt man in einer Mannschaft (über mehrere Jahre: n : m) |
| Buslinie – Haltestelle | **n : m** | eine Linie hält an vielen Haltestellen, an einer Haltestelle halten viele Linien |
| Mensch – gültiger Personalausweis | **1 : 1** | genau einer pro Mensch, genau ein Mensch pro Ausweis |
| Lehrkraft – Klassenleitung | **1 : 1** | wenn jede Klasse genau eine Klassenleitung hat und eine Lehrkraft höchstens eine Klasse leitet |
| Rezept – Zutat | **n : m** | ein Rezept braucht viele Zutaten, eine Zutat kommt in vielen Rezepten vor |
| YouTube-Kanal – Video | **1 : n** | ein Kanal hat viele Videos, ein Video gehört zu einem Kanal |
| Kinovorstellung – Sitzplatzbuchung | **1 : n** | eine Vorstellung hat viele Buchungen, jede Buchung gilt für eine Vorstellung |
| Bestellung – Artikel | **n : m** | eine Bestellung enthält viele Artikel, ein Artikel steht in vielen Bestellungen |
:::

## Weiterlesen

Wie Beziehungen in Tabellen umgesetzt werden: [Primär- & Fremdschlüssel](./schluessel)
