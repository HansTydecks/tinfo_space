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

1. Fußballverein – Mannschaft
2. Mannschaft – Spieler:in (in einer Saison)
3. Buslinie – Haltestelle
4. Mensch – Personalausweis (gültig)
5. Lehrkraft – Klassenleitung einer Klasse
6. Rezept – Zutat
7. YouTube-Kanal – Video
8. Kinovorstellung – Sitzplatzbuchung

::: details Lösungen
1. **1 : n**: ein Verein hat viele Mannschaften, eine Mannschaft gehört zu einem Verein
2. **1 : n**: eine Mannschaft hat viele Spieler:innen; pro Saison spielt man in einer Mannschaft (über mehrere Jahre betrachtet: n : m)
3. **n : m**: eine Linie hält an vielen Haltestellen, an einer Haltestelle halten viele Linien
4. **1 : 1**
5. **1 : 1** (wenn jede Klasse genau eine Klassenleitung hat und eine Lehrkraft höchstens eine Klasse leitet)
6. **n : m**
7. **1 : n**
8. **1 : n**: eine Vorstellung hat viele Buchungen, jede Buchung gilt für eine Vorstellung
:::

## Weiterlesen

Wie Beziehungen in Tabellen umgesetzt werden: [Primär- & Fremdschlüssel](./schluessel)
