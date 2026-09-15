---
title: "Grenzen der Berechenbarkeit"
description: "Praktische und theoretische Grenzen von Algorithmen: Komplexitätsklassen, exponentieller Aufwand, P und NP, Näherungslösungen, das Halteproblem und die Church-Turing-These."
---

# Grenzen der Berechenbarkeit <Badge type="info" text="Oberstufe" />

Computer werden jedes Jahr schneller. Kann man also irgendwann **jedes** Problem lösen? Nein, und zwar aus zwei ganz unterschiedlichen Gründen.

## 1 · Praktische Grenze: Es dauert zu lange

Wie der Aufwand eines Algorithmus mit der Eingabegröße n wächst, beschreibt die **O-Notation** (→ [Komplexität im Python-Kurs](./python-kurs/fortgeschritten/komplexitaet)).

| Komplexität | Beispiel | n = 10 | n = 100 |
|---|---|---|---|
| O(log n) | binäre Suche | ≈ 3 Schritte | ≈ 7 Schritte |
| O(n) | lineare Suche | 10 | 100 |
| O(n²) | Bubble Sort | 100 | 10 000 |
| O(2ⁿ) | alle Teilmengen ausprobieren | 1 024 | ≈ 1,3 · 10³⁰ |
| O(n!) | alle Reihenfolgen ausprobieren | 3 628 800 | ≈ 9,3 · 10¹⁵⁷ |

::: info Merke: Exponentieller Aufwand
Wächst der Aufwand **exponentiell** (2ⁿ) oder noch schneller (n!), hilft auch ein tausendmal schnellerer Computer kaum: Schon wenige zusätzliche Eingabeelemente machen den Gewinn zunichte.
:::

### Klassische schwere Probleme

| Problem | Frage |
|---|---|
| **Problem des Handlungsreisenden** (TSP) | Was ist die kürzeste Rundreise durch n Städte? |
| **Rucksackproblem** | Welche Gegenstände packe ich ein, um mit begrenztem Gewicht den größten Wert zu tragen? |
| **Hamiltonkreis** | Gibt es einen Rundweg, der jeden Knoten eines Graphen genau einmal besucht? |
| **Primfaktorzerlegung** | Aus welchen Primzahlen besteht eine riesige Zahl? (Grundlage von [RSA](../informationssicherheit/rsa)) |

Zum Vergleich: Das **Königsberger Brückenproblem** (Gibt es einen Weg, der jede *Kante* genau einmal benutzt?) lässt sich dagegen schnell entscheiden.

### P und NP <Badge type="warning" text="Lk" />

- **P:** Probleme, die sich in **polynomieller Zeit lösen** lassen (z. B. O(n²)). Sie gelten als „praktisch lösbar“.
- **NP:** Probleme, bei denen man eine **vorgeschlagene Lösung** in polynomieller Zeit **überprüfen** kann. Ist diese Rundreise kürzer als 1000 km? Das ist schnell nachgerechnet, sie zu **finden** scheint aber nur mit exponentiellem Aufwand zu gehen.
- Ob **P = NP** gilt, ist eine der größten offenen Fragen der Mathematik.

::: tip Näherungslösungen
Für schwere Probleme gibt man sich oft mit **guten statt perfekten** Lösungen zufrieden, z. B. beim TSP: „Fahre immer zur nächstgelegenen noch nicht besuchten Stadt.“ Das geht schnell und ist meist ordentlich, aber nicht garantiert optimal.
:::

## 2 · Theoretische Grenze: Es geht grundsätzlich nicht

::: info Merke: Halteproblem
Es gibt **kein** Programm, das für **jedes beliebige** Programm und jede Eingabe entscheiden kann, ob dieses Programm irgendwann **anhält** oder **endlos läuft**. Das hat Alan Turing 1936 bewiesen.
:::

::: details Die Beweisidee (Widerspruch)
Angenommen, es gäbe ein Programm `haelt(p, x)`, das immer richtig „ja“ oder „nein“ sagt. Dann baue ein Programm `trotz(p)`:
- Wenn `haelt(p, p)` „ja“ sagt → laufe endlos.
- Wenn es „nein“ sagt → halte an.

Was passiert bei `trotz(trotz)`? Hält es an, hätte es endlos laufen müssen, und umgekehrt. Ein Widerspruch! Also kann `haelt` nicht existieren.
:::

Solche Probleme heißen **algorithmisch unlösbar** bzw. **unentscheidbar**.

## Church-Turing-These <Badge type="warning" text="Lk" />

Alles, was **intuitiv berechenbar** ist, kann auch eine **Turingmaschine** berechnen, und damit jeder heutige Computer (mit genug Zeit und Speicher). Die These lässt sich nicht beweisen, gilt aber als allgemein anerkannt.
Man unterscheidet **berechenbare** und **nicht berechenbare Funktionen** sowie **entscheidbare** und **unentscheidbare Mengen**.

## Aufgabe

Berechne, wie viele verschiedene Rundreisen es bei 5, 10 und 20 Städten gibt (Tipp: (n − 1)! / 2). Wie lange bräuchte ein Computer, der eine Milliarde Rundreisen pro Sekunde prüft, für 20 Städte?
