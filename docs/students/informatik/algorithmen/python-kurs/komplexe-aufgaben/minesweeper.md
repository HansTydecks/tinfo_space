---
title: "Projekt: Minesweeper"
description: "Der Klassiker als Textversion – in Etappen entwickelt: 2D-Listen, Minen platzieren, Nachbarn zählen, rekursives Aufdecken."
outline: deep
---

## Ziele
- Ein Spielfeld als **2D-Liste** aufbauen
- Nachbarfelder systematisch durchgehen
- Leere Felder **rekursiv** aufdecken (Flood-Fill)
- Alle Kurskonzepte in einem Projekt verbinden

::: tip Vorgehen
Großes Projekt – wir bauen es in **fünf Etappen**. Führe jede Etappe aus, bevor du weiterliest.
Nutze den [Problemlöseprozess](../grundlagen/problemloeseprozess).
:::

## Etappe 1: Das Spielfeld

Ein Spielfeld mit `zeilen × spalten` Feldern ist eine **Liste von Listen**. Wir nutzen zwei davon:
`minen` (wo liegt eine Mine?) und `sichtbar` (was hat der Spieler schon aufgedeckt?).

<PyRunner>

```python
ZEILEN, SPALTEN = 5, 6

minen = [[False] * SPALTEN for _ in range(ZEILEN)]
sichtbar = [[False] * SPALTEN for _ in range(ZEILEN)]

minen[1][2] = True
minen[3][4] = True

for zeile in minen:
    print(zeile)
```

</PyRunner>

:::danger Häufige Falle
`[[False] * SPALTEN] * ZEILEN` erzeugt **dieselbe** Zeile mehrfach – Änderungen wirken dann überall.
Deshalb die Schleife: `[[False] * SPALTEN for _ in range(ZEILEN)]`.
:::

## Etappe 2: Minen zufällig platzieren

<PyRunner>

```python
import random

ZEILEN, SPALTEN, ANZAHL_MINEN = 5, 6, 5

def leeres_feld():
    return [[False] * SPALTEN for _ in range(ZEILEN)]

def minen_setzen(anzahl):
    feld = leeres_feld()
    gesetzt = 0
    while gesetzt < anzahl:
        z = random.randint(0, ZEILEN - 1)
        s = random.randint(0, SPALTEN - 1)
        if not feld[z][s]:
            feld[z][s] = True
            gesetzt += 1
    return feld

minen = minen_setzen(ANZAHL_MINEN)
print(sum(zeile.count(True) for zeile in minen), "Minen gesetzt")
```

</PyRunner>

## Etappe 3: Nachbarminen zählen

Jedes Feld hat bis zu **8 Nachbarn**. Wir prüfen alle Richtungen und zählen die Minen – aber nur
Felder, die auf dem Spielfeld liegen.

<PyRunner>

```python
ZEILEN, SPALTEN = 5, 6
minen = [[False] * SPALTEN for _ in range(ZEILEN)]
minen[1][2] = True
minen[2][3] = True
minen[3][2] = True

def zaehle_nachbarn(minen, z, s):
    anzahl = 0
    for dz in (-1, 0, 1):
        for ds in (-1, 0, 1):
            if dz == 0 and ds == 0:
                continue
            nz, ns = z + dz, s + ds
            if 0 <= nz < ZEILEN and 0 <= ns < SPALTEN and minen[nz][ns]:
                anzahl += 1
    return anzahl

for z in range(ZEILEN):
    zeile = ""
    for s in range(SPALTEN):
        zeile += "*" if minen[z][s] else str(zaehle_nachbarn(minen, z, s))
    print(zeile)
```

</PyRunner>

:::details Erklärung
`dz` und `ds` (die „Deltas") laufen über `-1, 0, 1`. Die Kombination `(0, 0)` überspringen wir – das
ist das Feld selbst. Die Bedingung `0 <= nz < ZEILEN` stellt sicher, dass wir nicht über den Rand
hinausgreifen.
:::

## Etappe 4: Aufdecken – mit Rekursion

Deckt der Spieler ein Feld mit **0** Nachbarminen auf, werden bei Minesweeper automatisch alle
angrenzenden Felder mit aufgedeckt – und von dort aus weiter. Das ist ein **Flood-Fill**, die
natürliche Aufgabe für [Rekursion](../fortgeschritten/iterativ-rekursiv).

<PyRunner>

```python
ZEILEN, SPALTEN = 5, 6
minen = [[False] * SPALTEN for _ in range(ZEILEN)]
minen[0][5] = True
minen[4][0] = True
sichtbar = [[False] * SPALTEN for _ in range(ZEILEN)]

def zaehle_nachbarn(z, s):
    return sum(
        minen[z + dz][s + ds]
        for dz in (-1, 0, 1) for ds in (-1, 0, 1)
        if (dz or ds) and 0 <= z + dz < ZEILEN and 0 <= s + ds < SPALTEN
    )

def aufdecken(z, s):
    if not (0 <= z < ZEILEN and 0 <= s < SPALTEN):
        return
    if sichtbar[z][s] or minen[z][s]:
        return
    sichtbar[z][s] = True
    if zaehle_nachbarn(z, s) == 0:          # leeres Feld -> Nachbarn mit aufdecken
        for dz in (-1, 0, 1):
            for ds in (-1, 0, 1):
                aufdecken(z + dz, s + ds)

aufdecken(2, 2)
for z in range(ZEILEN):
    print("".join("." if sichtbar[z][s] else "#" for s in range(SPALTEN)))
```

</PyRunner>

:::details Warum bricht die Rekursion ab?
Drei Stopp-Bedingungen: außerhalb des Felds, schon sichtbar, oder eine Mine. Da jedes Feld nur
**einmal** sichtbar wird, kann sich die Rekursion nicht endlos im Kreis drehen.
:::

## Etappe 5: Das ganze Spiel

<PyRunner stdin="2 2\n0 0\n1 1\n3 4">

```python
import random

ZEILEN, SPALTEN, ANZAHL_MINEN = 5, 6, 5

minen = [[False] * SPALTEN for _ in range(ZEILEN)]
sichtbar = [[False] * SPALTEN for _ in range(ZEILEN)]

gesetzt = 0
while gesetzt < ANZAHL_MINEN:
    z, s = random.randint(0, ZEILEN - 1), random.randint(0, SPALTEN - 1)
    if not minen[z][s]:
        minen[z][s] = True
        gesetzt += 1

def nachbarn(z, s):
    return sum(
        minen[z + dz][s + ds]
        for dz in (-1, 0, 1) for ds in (-1, 0, 1)
        if (dz or ds) and 0 <= z + dz < ZEILEN and 0 <= s + ds < SPALTEN
    )

def aufdecken(z, s):
    if not (0 <= z < ZEILEN and 0 <= s < SPALTEN) or sichtbar[z][s] or minen[z][s]:
        return
    sichtbar[z][s] = True
    if nachbarn(z, s) == 0:
        for dz in (-1, 0, 1):
            for ds in (-1, 0, 1):
                aufdecken(z + dz, s + ds)

def zeige_feld(alles=False):
    print("  " + " ".join(str(s) for s in range(SPALTEN)))
    for z in range(ZEILEN):
        zeile = [str(z)]
        for s in range(SPALTEN):
            if alles and minen[z][s]:
                zeile.append("*")
            elif sichtbar[z][s]:
                n = nachbarn(z, s)
                zeile.append(str(n) if n else " ")
            else:
                zeile.append("#")
        print(" ".join(zeile))

frei_gesamt = ZEILEN * SPALTEN - ANZAHL_MINEN
while True:
    zeige_feld()
    z, s = map(int, input("Feld (zeile spalte): ").split())
    if minen[z][s]:
        print("BOOM! Verloren.")
        zeige_feld(alles=True)
        break
    aufdecken(z, s)
    aufgedeckt = sum(zeile.count(True) for zeile in sichtbar)
    if aufgedeckt == frei_gesamt:
        print("Gewonnen! Alle sicheren Felder aufgedeckt.")
        break
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Erster Zug immer sicher
Sorge dafür, dass beim allerersten aufgedeckten Feld garantiert keine Mine liegt (Minen erst **nach**
der ersten Eingabe setzen, das erste Feld aussparen).

### Aufgabe 2: Flaggen setzen
Erlaube die Eingabe `f 2 3`, um Feld (2,3) als vermutete Mine zu markieren (`⚑` in der Anzeige).
Gewonnen ist, wenn genau alle Minen eine Flagge haben.

### Aufgabe 3: Nachbarn als Funktion mit Liste
Schreibe `nachbar_positionen(z, s)`, das eine **Liste** der gültigen Nachbar-Koordinaten zurückgibt.
Nutze sie in `zaehle_nachbarn` und `aufdecken` statt der doppelten Schleife.

<PyRunner>

```python
ZEILEN, SPALTEN = 5, 6

def nachbar_positionen(z, s):
    positionen = []
    for dz in (-1, 0, 1):
        for ds in (-1, 0, 1):
            if dz or ds:
                nz, ns = z + dz, s + ds
                if 0 <= nz < ZEILEN and 0 <= ns < SPALTEN:
                    positionen.append((nz, ns))
    return positionen

print(nachbar_positionen(0, 0))   # nur 3 Nachbarn in der Ecke
print(nachbar_positionen(2, 3))   # 8 Nachbarn in der Mitte
```

</PyRunner>

:::tip Geschafft!
Wenn du bis hierher gekommen bist, hast du alle Bausteine des Kurses in einem echten Programm
verbunden: Listen, Schleifen, Verzweigungen, Funktionen, Zufall, Eingabe und Rekursion.
:::
