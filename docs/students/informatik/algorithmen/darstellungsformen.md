---
title: "Darstellungsformen von Algorithmen"
description: "Algorithmen verbal, als Flussdiagramm, als Struktogramm, in Blöcken und als Programmcode darstellen, am Beispiel Handy entsperren."
---

# Darstellungsformen von Algorithmen <Badge type="tip" text="Klasse 7/8" />

Damit wir Algorithmen mit anderen Menschen teilen können, nutzen wir **einheitliche Darstellungen**. Gleiche Elemente sehen immer gleich aus, dann versteht jede:r sie.

## Beispiel: Handy entsperren

### 1 · Verbale Beschreibung

> Lies den eingegebenen Code ein. Solange der Code falsch ist: Zeige „Falscher Code“ an und lies den Code erneut ein. Entsperre dann das Handy.

### 2 · Flussdiagramm (Programmablaufplan)

<svg class="diagramm" viewBox="0 0 440 420" width="440" role="img" aria-label="Flussdiagramm: Handy entsperren">
  <defs>
    <marker id="pfeil-df" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
    </marker>
  </defs>
  <g fill="none" stroke="currentColor" stroke-width="2">
    <ellipse cx="160" cy="30" rx="60" ry="20" />
    <polygon points="95,80 245,80 225,120 75,120" />
    <polygon points="160,150 250,200 160,250 70,200" />
    <rect x="90" y="290" width="140" height="40" rx="3" />
    <ellipse cx="160" cy="390" rx="60" ry="20" />
    <rect x="290" y="180" width="140" height="40" rx="3" />
    <line x1="160" y1="50" x2="160" y2="78" marker-end="url(#pfeil-df)" />
    <line x1="160" y1="120" x2="160" y2="148" marker-end="url(#pfeil-df)" />
    <line x1="160" y1="250" x2="160" y2="288" marker-end="url(#pfeil-df)" />
    <line x1="160" y1="330" x2="160" y2="368" marker-end="url(#pfeil-df)" />
    <line x1="250" y1="200" x2="288" y2="200" marker-end="url(#pfeil-df)" />
    <polyline points="360,180 360,100 237,100" marker-end="url(#pfeil-df)" />
  </g>
  <g fill="currentColor" font-size="14" text-anchor="middle" font-family="inherit">
    <text x="160" y="35">Start</text>
    <text x="160" y="105">Code einlesen</text>
    <text x="160" y="205">Code richtig?</text>
    <text x="160" y="315">Handy entsperren</text>
    <text x="160" y="395">Ende</text>
    <text x="360" y="205">„Falscher Code“</text>
    <text x="178" y="273">ja</text>
    <text x="268" y="190">nein</text>
  </g>
</svg>

| Symbol | Bedeutung |
|---|---|
| Oval | **Start** und **Ende** |
| Rechteck | **Anweisung** (Aktion) |
| Raute | **Verzweigung** (Ja/Nein-Frage) |
| Parallelogramm | **Ein- oder Ausgabe** |
| Pfeil | Ablaufrichtung |

### 3 · Struktogramm (Nassi-Shneiderman-Diagramm)

<table class="struktogramm">
  <tr><td colspan="2">Code einlesen</td></tr>
  <tr><td colspan="2">solange Code falsch</td></tr>
  <tr><td class="einrueckung" rowspan="2"></td><td>„Falscher Code“ anzeigen</td></tr>
  <tr><td>Code einlesen</td></tr>
  <tr><td colspan="2">Handy entsperren</td></tr>
</table>

Struktogramme bestehen aus **ineinander geschachtelten Rechtecken**. Sie haben keine Pfeile und zwingen deshalb zu einer sauberen Struktur. Die Bausteine findest du unter [Kontrollstrukturen](./kontrollstrukturen).

### 4 · Blöcke

In MakeCode oder Scratch sehen die gleichen Strukturen aus wie farbige Puzzleteile, die ineinander gesteckt werden (→ [Blockbasiert programmieren](./blockbasiert-programmieren)).

### 5 · Programmcode (Python)

```python
code = input("Code: ")
while code != "4711":
    print("Falscher Code")
    code = input("Code: ")
print("Entsperrt!")
```

::: info Aufgabe: Fußgängerampel
Autos haben normalerweise Grün. Drückt jemand den Knopf, schaltet die Autoampel auf Gelb, dann Rot, und die Fußgänger bekommen Grün. Danach geht alles von vorn los, den ganzen Tag.
Zeichne den Ablauf als **Flussdiagramm** und als **Struktogramm**.
:::
