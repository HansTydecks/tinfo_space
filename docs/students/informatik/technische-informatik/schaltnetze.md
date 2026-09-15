---
title: "Schaltnetze"
description: "Transistoren als Schalter, Gatter für AND, OR und NOT, Schaltnetz-Analyse und -Synthese sowie Halb- und Volladdierer."
---

# Schaltnetze <Badge type="info" text="Oberstufe" />

Wir können Binärzahlen addieren und logische Ausdrücke auswerten. Aber wie **steuert** ein Computer eigentlich den Strom?

## Der Transistor als Schalter

Ein **Transistor** ist ein elektronischer Schalter ohne bewegliche Teile. Er hat drei Anschlüsse:
- Liegt an der **Basis** (Steuereingang) eine Spannung an, **fließt Strom** zwischen den beiden anderen Anschlüssen (Kollektor → Emitter).
- Liegt keine Spannung an, **sperrt** er.

Moderne Prozessoren enthalten **Milliarden** Transistoren, die nur wenige Nanometer groß sind.

## Gatter aus Schaltern

::: info Aufgabe
Überlegt zu zweit: Wie lassen sich **AND**, **OR** und **NOT** mit Transistoren (bzw. vereinfacht mit Schaltern) bauen? Orientiert euch an den [Wahrheitstabellen](./boolesche-algebra) und zeichnet jeweils eine Skizze.
:::

::: details Lösungsidee
- **AND:** zwei Schalter **hintereinander** (in Reihe). Die Lampe leuchtet nur, wenn beide geschlossen sind.
- **OR:** zwei Schalter **nebeneinander** (parallel). Einer reicht.
- **NOT:** Der Schalter liegt parallel zur Lampe. Ist er geschlossen, fließt der Strom an der Lampe vorbei, und sie geht aus.
:::

Aus solchen **Gattern** setzt man **Schaltnetze** zusammen. Bei einem Schaltnetz hängt die Ausgabe **nur von den aktuellen Eingängen** ab.

## Analyse und Synthese

| Schaltnetz-**Analyse** | Schaltnetz-**Synthese** |
|---|---|
| Gegeben ist eine Schaltung → **Wahrheitstabelle bzw. Term aufstellen** | Gegeben ist eine Wahrheitstabelle oder ein Term → **Schaltung entwerfen** |

## Der Halbaddierer

Beim [Addieren zweier Binärziffern](./binaer-rechnen) entstehen eine **Summe** und ein **Übertrag**:

| A | B | Summe S | Übertrag Ü |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

::: info Merke: Halbaddierer
Vergleiche mit den Wahrheitstabellen:
- **S = A XOR B**
- **Ü = A AND B**

Ein Halbaddierer besteht also aus einem XOR- und einem AND-Gatter.
:::

## Der Volladdierer <Badge type="warning" text="Lk" />

Ab der zweiten Stelle muss zusätzlich der **Übertrag der vorherigen Stelle** (Cᵢₙ) addiert werden, also drei Eingänge.

::: info Merke: Volladdierer
Ein Volladdierer besteht aus **zwei Halbaddierern und einem OR-Gatter**:
1. Halbaddierer 1 addiert A und B.
2. Halbaddierer 2 addiert dessen Summe und Cᵢₙ, das Ergebnis ist **S**.
3. Die beiden Überträge werden mit **OR** zum Übertrag **Cₒᵤₜ** verknüpft.

Hängt man n Volladdierer hintereinander, erhält man ein **Addierwerk** für n-Bit-Zahlen.
:::

## Ausprobieren

Baue Halb- und Volladdierer in einem Simulator nach und prüfe die Wahrheitstabellen: [Logicly](https://logic.ly/demo/) oder [CircuitVerse](https://circuitverse.org/simulator).
