---
title: "Fraktale"
description: "Selbstähnliche Strukturen rekursiv erzeugen: Sierpinski-Dreieck, Koch-Kurve, Baum und Cantor-Menge als Text."
---

## Ziele
- Den Begriff **Selbstähnlichkeit** erklären
- Fraktale mit **rekursiven** Funktionen erzeugen
- Basisfall (Abbruchbedingung) und Rekursionsfall benennen
- Eigenschaften eines Fraktals (Anzahl, Länge) berechnen

## Was ist ein Fraktal?

Ein **Fraktal** ist ein Gebilde, das aus **verkleinerten Kopien von sich selbst** besteht. Diese
Eigenschaft heißt **Selbstähnlichkeit**. In der Natur findest du sie z. B. beim Farnblatt, bei
Romanesco, Blitzen oder Küstenlinien: Ein Ast sieht aus wie ein kleiner Baum.

Selbstähnlichkeit passt perfekt zur **Rekursion**: Eine Funktion **ruft sich selbst** mit einem
**kleineren Problem** auf – bis eine **Abbruchbedingung** (der Basisfall) erreicht ist. Mehr dazu
unter [Iterativ & rekursiv](./iterativ-rekursiv).

## Das Sierpinski-Dreieck

Bauplan: Ein Sierpinski-Dreieck der Stufe `n` besteht aus **drei** Dreiecken der Stufe `n - 1` –
eins oben, zwei nebeneinander unten. Stufe 0 ist ein einzelnes Zeichen.

<PyRunner>

```python
def sierpinski(n):
    if n == 0:                       # Basisfall
        return ["*"]
    klein = sierpinski(n - 1)        # Rekursionsfall: kleineres Problem
    rand = " " * (len(klein[0]) // 2 + 1)
    oben = [rand + zeile + rand for zeile in klein]
    unten = [zeile + " " + zeile for zeile in klein]
    return oben + unten

for zeile in sierpinski(4):
    print(zeile)
```

</PyRunner>

:::details Erklärung
`sierpinski(n)` liefert eine **Liste von Textzeilen**. Für Stufe `n` holt die Funktion sich das
Dreieck der Stufe `n - 1` und setzt es dreimal zusammen:

- **oben**: einmal, links und rechts mit Leerzeichen aufgefüllt (damit es mittig steht),
- **unten**: zweimal nebeneinander, getrennt durch ein Leerzeichen.

Die Anzahl der Zeilen verdoppelt sich mit jeder Stufe: 1, 2, 4, 8, 16 …
Ändere `"*"` in `"▲"` oder die Stufe in `5` und beobachte, was passiert.
:::

## Die Koch-Kurve – nachgerechnet

Die **Koch-Kurve** entsteht so: Man nimmt eine Strecke, teilt sie in drei Teile und ersetzt das
mittlere Drittel durch zwei Seiten eines gleichseitigen Dreiecks. Aus **1** Strecke werden **4**
Strecken, jede **1/3** so lang. Das wiederholt man für jede neue Strecke.

```
Stufe 0:  ________

Stufe 1:  __/\__
```

Ohne zu zeichnen können wir ausrechnen, was dabei passiert. Bei Startlänge 1 gilt für Stufe `n`:
**Anzahl Strecken = 4ⁿ** und **Gesamtlänge = (4/3)ⁿ**.

<PyRunner>

```python
print("Stufe  Strecken   Länge")
for n in range(8):
    strecken = 4 ** n
    laenge = (4 / 3) ** n
    print(f"{n:5}  {strecken:8}  {laenge:6.3f}")
```

</PyRunner>

Dasselbe **rekursiv** – direkt aus dem Bauplan abgelesen:

<PyRunner>

```python
def koch_strecken(n):
    if n == 0:
        return 1
    return 4 * koch_strecken(n - 1)

def koch_laenge(n, laenge=1.0):
    if n == 0:
        return laenge
    return 4 * koch_laenge(n - 1, laenge / 3)   # 4 Teile, jeweils 1/3 so lang

print(koch_strecken(5), round(koch_laenge(5), 3))
```

</PyRunner>

::: info Unendlich lang?
Die Länge wächst mit jeder Stufe um den Faktor 4/3 – also **über alle Grenzen**. Die Kurve passt
trotzdem immer auf dasselbe Blatt Papier. So etwas gibt es nur bei Fraktalen.
:::

## Ein Baum als Text

Ein Baum besteht aus einem Stamm, der sich in **zwei kleinere Bäume** teilt. Jede Rekursionsebene
rücken wir ein Stück weiter ein:

<PyRunner>

```python
def baum(tiefe, laenge, ebene=0):
    einrueckung = "    " * ebene
    if tiefe == 0:                                   # Abbruchbedingung
        print(einrueckung + "Blatt")
        return
    print(einrueckung + f"Ast (Länge {laenge})")
    baum(tiefe - 1, laenge // 2, ebene + 1)          # linker Teilbaum
    baum(tiefe - 1, laenge // 2, ebene + 1)          # rechter Teilbaum

baum(3, 80)
```

</PyRunner>

:::details Erklärung
`baum(3, 80)` gibt einen Ast aus und ruft sich **zweimal** mit Tiefe 2 auf. Jeder dieser Aufrufe
macht wieder zwei Aufrufe … bis Tiefe 0 erreicht ist und nur noch „Blatt" ausgegeben wird.
Bei Tiefe 3 entstehen 1 + 2 + 4 = **7 Äste** und 2³ = **8 Blätter**.
:::

## Die Cantor-Menge

Nimm eine Strecke und entferne das **mittlere Drittel**. Mit den zwei Reststücken machst du dasselbe –
immer wieder:

<PyRunner>

```python
def cantor(n):
    if n == 0:
        return "#"
    teil = cantor(n - 1)
    return teil + " " * len(teil) + teil

stufen = 4
for n in range(stufen + 1):
    breite = 3 ** (stufen - n)             # jedes Zeichen strecken
    zeile = ""
    for zeichen in cantor(n):
        zeile += zeichen * breite
    print(zeile)
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Sierpinski zählen
Wie viele `*` enthält ein Sierpinski-Dreieck der Stufe `n`? Schreibe eine **rekursive** Funktion
`anzahl_sterne(n)` und überprüfe sie, indem du die Sterne in `sierpinski(n)` zählst.

<PyRunner>

```python
def anzahl_sterne(n):
    pass

for n in range(6):
    print(n, anzahl_sterne(n))
```

</PyRunner>

:::details Tipp
Stufe `n` besteht aus **drei** Kopien der Stufe `n - 1`. Zum Überprüfen:
`sum(zeile.count("*") for zeile in sierpinski(n))`.
:::

:::details Lösung
```python
def anzahl_sterne(n):
    if n == 0:
        return 1
    return 3 * anzahl_sterne(n - 1)

for n in range(6):
    print(n, anzahl_sterne(n))
```
Ergebnis: 1, 3, 9, 27, 81, 243 – also 3ⁿ.
:::

### Aufgabe 2: Äste und Blätter
Ändere `baum`, sodass die Funktion nichts ausgibt, sondern die **Anzahl der Blätter** zurückgibt.
Wie viele Blätter hat ein Baum der Tiefe 10?

<PyRunner>

```python
def blaetter(tiefe):
    pass

print(blaetter(3))    # 8
print(blaetter(10))
```

</PyRunner>

:::details Lösung
```python
def blaetter(tiefe):
    if tiefe == 0:
        return 1
    return blaetter(tiefe - 1) + blaetter(tiefe - 1)

print(blaetter(3))
print(blaetter(10))
```
Ein Baum der Tiefe 10 hat 2¹⁰ = 1024 Blätter.
:::

### Aufgabe 3: Cantor-Länge
Bei der Cantor-Menge bleiben in jeder Stufe 2 von 3 Dritteln übrig. Berechne mit einer Schleife,
ab welcher Stufe die Gesamtlänge (Start: 1) **kleiner als 0,01** ist.

<PyRunner>

```python
laenge = 1
stufe = 0
# while laenge >= 0.01: ...
```

</PyRunner>

:::details Lösung
```python
laenge = 1
stufe = 0
while laenge >= 0.01:
    laenge = laenge * 2 / 3
    stufe += 1
print(stufe, laenge)
```
Ab Stufe 12 ist die Länge kleiner als 0,01 (etwa 0,0077). Die Länge geht gegen 0 – trotzdem bleiben
unendlich viele Punkte übrig.
:::
