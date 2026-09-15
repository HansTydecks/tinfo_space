---
title: "Grammatik ↔ Automat"
description: "Reguläre Grammatiken in endliche Automaten umwandeln und umgekehrt, mit Überführungsregeln und Beispiel."
---

# Grammatik ↔ Automat <Badge type="info" text="Oberstufe" />

Reguläre Grammatiken und endliche Automaten beschreiben **genau dieselben Sprachen**, nur auf zwei verschiedene Arten:
- Die **Grammatik** **erzeugt** Wörter.
- Der **Automat** **prüft** Wörter.

Deshalb kann man das eine direkt in das andere umwandeln.

## Umwandlungsregeln

::: info Merke
| Grammatik (regulär) | Automat |
|---|---|
| Nichtterminal X | Zustand X |
| Startsymbol S | Startzustand S |
| Regel **X → aY** | Übergang **X ──a──► Y** |
| Regel **X → ε** | X ist ein **Endzustand** |
| Regel **X → a** | Übergang **X ──a──► E** zu einem zusätzlichen Endzustand E |
:::

## Beispiel: Automat → Grammatik

Der Automat für „gerade Anzahl Einsen“ aus [Endliche Automaten](./endliche-automaten):

| δ | 0 | 1 |
|---|---|---|
| → **G** (Ende) | G | U |
| U | U | G |

Jeder Pfeil wird eine Regel, und der Endzustand bekommt eine ε-Regel:

```text:no-line-numbers
G → 0G | 1U | ε
U → 0U | 1G
```

Ableitung von `0110`: G ⇒ 0G ⇒ 01U ⇒ 011G ⇒ 0110G ⇒ 0110 ✅

## Beispiel: Grammatik → Automat

Grammatik für Binärzahlen ohne führende Nullen (aus [Grammatiken](./formale-sprachen-und-grammatiken)):

```text:no-line-numbers
S → 0 | 1A
A → 0A | 1A | ε
```

| Regel | wird zu |
|---|---|
| S → 0 | S ──0──► E (E ist Endzustand) |
| S → 1A | S ──1──► A |
| A → 0A, A → 1A | Schleifen an A für 0 und 1 |
| A → ε | A ist Endzustand |

Ergebnis: Zustände {S, A, E}, Start S, Endzustände {A, E}. (Für einen vollständigen DEA ergänzt man noch einen Fehlerzustand für die fehlenden Übergänge aus E.)

## Aufgaben

1. Wandle deinen Automaten „Wörter, die auf `ab` enden“ in eine Grammatik um.
2. Gegeben ist die Grammatik `S → aS | bT`, `T → bT | ε`. Zeichne den Automaten. Welche Sprache beschreibt sie in Worten?
3. Ein Roboter versteht Befehlsfolgen aus `v` (vor), `l` (links), `r` (rechts), die immer mit `v` beginnen und mit `v` enden müssen. Beschreibe die Sprache als Grammatik **und** als Automat.

::: tip Werkzeug
Mit [FLACI](https://flaci.com/) kannst du Grammatiken und Automaten eingeben, ineinander umwandeln und Wörter testen.
:::

## Zusammenhang mit regulären Ausdrücken

Auch **reguläre Ausdrücke** aus Klasse 10 beschreiben genau die regulären Sprachen. Die Grammatik oben entspricht dem regulären Ausdruck `0|1[01]*` (→ [Reguläre Ausdrücke](./regulaere-ausdruecke)). Regex-Suchmaschinen wandeln Muster intern in Automaten um.
