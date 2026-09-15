---
title: "Netzwerktopologien"
description: "Netzwerke als Graphen modellieren: Knoten und Kanten, die Topologien Linie, Ring, Stern, Baum, vermascht und vollvermascht, Kantenanzahl und Redundanz."
---

# Netzwerktopologien <Badge type="info" text="Oberstufe" />

Straßenkarten, Freundeskreise, Stromnetze und Rechnernetze haben etwas gemeinsam: Man kann sie als **Graph** zeichnen.

::: info Merke: Graph
Ein **Graph** G = (V, E) besteht aus einer Menge von **Knoten** V (*vertices*) und einer Menge von **Kanten** E (*edges*), die jeweils zwei Knoten verbinden.
Im Rechnernetz sind die Knoten Geräte (Rechner, Switches, Router) und die Kanten Verbindungen.
:::

Die **Topologie** beschreibt, *wie* die Knoten verbunden sind. Sie bestimmt, wie Daten fließen, wie gut das Netz wachsen kann (**Skalierbarkeit**) und was bei Ausfällen passiert (**Ausfallsicherheit**).

## Die wichtigsten Topologien

Mit |V| ist die Anzahl der Knoten gemeint, mit |E| die Anzahl der Kanten.

| Topologie | Kantenanzahl \|E\| | Redundanz | Typisch für |
|---|---|---|---|
| **Linie (Bus)** | \|V\| − 1 | keine: Fällt eine Kante aus, zerfällt das Netz | frühe Netzwerke |
| **Ring** | \|V\| | gering: Der Ausfall **einer** Kante wird verkraftet | Glasfaserringe |
| **Stern** | \|V\| − 1 (Zentrum mitgezählt) | keine: Fällt das Zentrum aus, ist alles getrennt | Heimnetz mit Switch |
| **Baum** <Badge type="warning" text="Lk" /> | \|V\| − 1 | keine: jeder Knoten ist genau über einen Weg erreichbar | Firmennetze mit mehreren Switch-Ebenen |
| **vermascht** | zwischen \|V\| − 1 und \|V\|·(\|V\|−1)/2 | teilweise: mehrere Wege zwischen vielen Knoten | das Internet |
| **vollvermascht** | \|V\| · (\|V\| − 1) / 2 | maximal: jeder Knoten ist direkt mit jedem verbunden | kleine, kritische Netze |

::: details Warum |V| · (|V| − 1) / 2 beim vollvermaschten Netz?
Jeder der |V| Knoten ist mit den |V| − 1 anderen verbunden. Dabei zählt man jede Kante doppelt (A–B und B–A), also teilt man durch 2.
Beispiel: 5 Knoten → 5 · 4 / 2 = **10** Kanten.
:::

## Redundanz

::: info Merke: Redundanz
**Redundanz** bedeutet, dass es **mehr als einen Weg** zwischen zwei Knoten gibt. Fällt eine Verbindung aus, kommen die Daten trotzdem an. Redundanz kostet aber zusätzliche Kanten, also Kabel, Geld und Wartung.
:::

**Denkaufgabe:** Jeder Knoten ist eine Person, jede Kante eine Freundschaft. Person 1 will eine Information von Person 6 bekommen. Welche Freundschaften dürfen **auf keinen Fall** enden?

## Aufgabe

Öffne [graphs.tinfo.space](https://graphs.tinfo.space/). Baue die Topologien Linie, Ring, Stern, vermascht und vollvermascht nach. Bestimme für jede die Kantenanzahl in Abhängigkeit von |V| und prüfe die Redundanz, indem du Kanten entfernst.
