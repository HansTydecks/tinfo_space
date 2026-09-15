---
title: "Endliche Automaten"
description: "Deterministische endliche Automaten entwerfen: Zustände, Übergangsgraph, formale Definition als 5-Tupel, Wörter prüfen, Grenzen endlicher Automaten und weitere Automatentypen."
---

# Endliche Automaten <Badge type="info" text="Oberstufe" />

Ein Getränkeautomat, eine Ampel, ein Türschloss mit Zahlencode: Sie alle befinden sich immer in einem **Zustand** und wechseln je nach **Eingabe** in einen anderen. Genau das ist die Idee eines **Automaten**.

## Beispiel: Gerade Anzahl Einsen

Ein Automat soll prüfen, ob ein Binärwort eine **gerade Anzahl von Einsen** enthält (`0110` ✅, `0100` ❌).

<svg class="diagramm" viewBox="0 0 420 190" width="420" role="img" aria-label="Übergangsgraph: Zustand G (gerade, Start und Endzustand) und Zustand U (ungerade). Bei 1 wechselt der Zustand, bei 0 bleibt er.">
  <defs>
    <marker id="pfeil-dea" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
    </marker>
  </defs>
  <g fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="120" cy="115" r="30" />
    <circle cx="120" cy="115" r="24" />
    <circle cx="320" cy="115" r="30" />
    <line x1="30" y1="115" x2="88" y2="115" marker-end="url(#pfeil-dea)" />
    <path d="M146,100 Q220,55 294,100" marker-end="url(#pfeil-dea)" />
    <path d="M294,130 Q220,175 146,130" marker-end="url(#pfeil-dea)" />
    <path d="M104,89 C85,30 155,30 136,89" marker-end="url(#pfeil-dea)" />
    <path d="M304,89 C285,30 355,30 336,89" marker-end="url(#pfeil-dea)" />
  </g>
  <g fill="currentColor" font-size="16" text-anchor="middle" font-family="inherit">
    <text x="120" y="121">G</text>
    <text x="320" y="121">U</text>
    <text x="45" y="105" font-size="13">Start</text>
    <text x="220" y="68">1</text>
    <text x="220" y="172">1</text>
    <text x="120" y="30">0</text>
    <text x="320" y="30">0</text>
  </g>
</svg>

- **G** = „bisher gerade viele Einsen“ (Startzustand, **Endzustand**: doppelter Kreis)
- **U** = „bisher ungerade viele Einsen“
- Bei **1** wechselt der Zustand, bei **0** bleibt er.

## Wörter prüfen

Der Automat liest das Wort **Zeichen für Zeichen** und folgt den Pfeilen. Ist er am Ende in einem **Endzustand**, wird das Wort **akzeptiert**.

```text:no-line-numbers
Wort 0110:   G ─0→ G ─1→ U ─1→ G ─0→ G    Endzustand ✅ akzeptiert
Wort 0100:   G ─0→ G ─1→ U ─0→ U ─0→ U    kein Endzustand ❌ abgelehnt
```

## Formale Definition

::: info Merke: Deterministischer endlicher Automat (DEA)
Ein DEA ist ein 5-Tupel **A = (Q, Σ, δ, q₀, F)** mit
- **Q:** endliche Menge von **Zuständen**, hier {G, U}
- **Σ:** **Eingabealphabet**, hier {0, 1}
- **δ:** **Überführungsfunktion** Q × Σ → Q, sie sagt, wohin ein Zeichen führt
- **q₀ ∈ Q:** **Startzustand**, hier G
- **F ⊆ Q:** Menge der **Endzustände**, hier {G}

*Deterministisch* heißt: Aus jedem Zustand führt für jedes Zeichen **genau ein** Pfeil.
:::

Die Überführungsfunktion als Tabelle:

| δ | 0 | 1 |
|---|---|---|
| → **G** (Ende) | G | U |
| U | U | G |

::: tip Fehlerzustand
Soll ein Wort sofort ungültig sein (z. B. eine führende Null bei Binärzahlen), führt man einen **Fehlerzustand** (*Falle*) ein, aus dem kein Weg mehr herausführt.
:::

## Aufgaben

1. Entwirf einen DEA über {a, b}, der alle Wörter akzeptiert, die mit `ab` **enden**.
2. Entwirf einen DEA, der Binärzahlen ohne führende Nullen akzeptiert (`0`, `1`, `10`, `110`, aber nicht `01`).
3. Ein Roboter kennt die Befehle `v` (vor) und `d` (drehen). Nach zwei `d` direkt hintereinander soll er stoppen. Modelliere das als Automat.

Zeichne und teste deine Automaten mit [FLACI](https://flaci.com/).

## Grenzen endlicher Automaten

::: warning Endliche Automaten haben kein Gedächtnis
Ein endlicher Automat „merkt“ sich nur seinen aktuellen Zustand, und davon gibt es endlich viele. Deshalb kann er z. B. **Palindrome** (`abba`, `racecar`) nicht erkennen: Er müsste sich die gesamte erste Hälfte des Wortes merken, die beliebig lang sein kann. Auch „gleich viele a wie b“ oder korrekte Klammerungen schafft er nicht.
:::

## Weitere Automatentypen <Badge type="warning" text="Lk" />

| Automat | Besonderheit | erkennt |
|---|---|---|
| **DEA** | genau ein Folgezustand | reguläre Sprachen |
| **NEA** (nichtdeterministisch) | **mehrere** Folgezustände möglich; ist gleich mächtig wie ein DEA | reguläre Sprachen |
| **Kellerautomat** | zusätzlich ein **Stapelspeicher** (Keller) | kontextfreie Sprachen, z. B. Klammerungen |
| **Turingmaschine** | unendliches **Band**, auf dem gelesen **und geschrieben** wird | alles Berechenbare (→ [Grenzen der Berechenbarkeit](../algorithmen/grenzen-der-berechenbarkeit)) |
| **Registermaschine** | Speicherzellen und einfache Befehle, ähnlich einem echten Rechner | gleich mächtig wie die Turingmaschine |
