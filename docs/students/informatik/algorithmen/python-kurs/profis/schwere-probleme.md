---
title: "Schwere Probleme"
description: "Handlungsreisender, Rucksack, Landkarten färben, Königsberger Brücken und Primfaktoren: Warum manche Probleme selbst für Computer zu schwer sind."
---

## Ziele
- Verstehen, was ein Problem „schwer" macht: Eine Lösung **prüfen** ist leicht, eine Lösung **finden** schwer
- Exponentielles Wachstum an Beispielen erleben
- Brute-Force-Lösungen schreiben und mit schnellen **Heuristiken** vergleichen
- Erkennen, dass nicht jedes Problem, das schwer aussieht, auch schwer ist

## Was heißt „schwer"?

Stell dir ein Sudoku vor. Ob eine ausgefüllte Lösung stimmt, prüfst du in einer Minute: Jede Zeile,
Spalte und jedes Kästchen durchgehen. Die Lösung zu **finden** dauert dagegen viel länger.

Genau so ist es bei vielen Problemen in der Informatik:

- **Prüfen** einer vorgeschlagenen Lösung geht schnell.
- **Finden** der besten Lösung geht (soweit man weiß) nur durch Ausprobieren sehr vieler Möglichkeiten.

Und die Zahl der Möglichkeiten wächst **exponentiell** – viel schneller als alles, was du aus der
[O-Notation](../fortgeschritten/komplexitaet) kennst:

<PyRunner>

```python
import math

print(f"{'n':>3} {'n²':>6} {'2^n':>12} {'n!':>28}")
for n in [5, 10, 15, 20, 25]:
    print(f"{n:>3} {n**2:>6} {2**n:>12} {math.factorial(n):>28}")
```

</PyRunner>

::: info P und NP – die Idee
Probleme, die sich **schnell lösen** lassen, nennt man **P**. Probleme, deren Lösungen sich
**schnell prüfen** lassen, nennt man **NP**. Ob beide Klassen in Wahrheit gleich sind („P = NP?"),
ist eine der berühmtesten offenen Fragen der Mathematik – auf die Antwort ist eine Million Dollar
Preisgeld ausgesetzt.
:::

## Das Problem des Handlungsreisenden

Eine Vertreterin will alle Städte genau einmal besuchen und am Ende wieder zu Hause sein. Welche
Rundreise ist die **kürzeste**? Die einfachste Idee: alle Reihenfolgen ausprobieren.
`itertools.permutations` liefert alle Reihenfolgen einer Liste.

<PyRunner>

```python
from itertools import permutations
import time

staedte = ["Berlin", "Hamburg", "München", "Köln", "Frankfurt", "Leipzig"]
# Entfernungen in km (ungefähr, Luftlinie gerundet)
dist = [
    #  B    HH   M    K    F    L
    [  0, 255, 505, 475, 425, 150],   # Berlin
    [255,   0, 610, 355, 395, 295],   # Hamburg
    [505, 610,   0, 455, 305, 360],   # München
    [475, 355, 455,   0, 150, 380],   # Köln
    [425, 395, 305, 150,   0, 295],   # Frankfurt
    [150, 295, 360, 380, 295,   0],   # Leipzig
]

def laenge(route):
    summe = 0
    for i in range(len(route)):
        a = route[i]
        b = route[(i + 1) % len(route)]   # am Ende zurück zum Start
        summe += dist[a][b]
    return summe

start = time.time()
beste_route = None
beste_laenge = float("inf")
anzahl = 0
for rest in permutations(range(1, len(staedte))):   # Stadt 0 ist immer der Start
    route = (0,) + rest
    anzahl += 1
    l = laenge(route)
    if l < beste_laenge:
        beste_laenge = l
        beste_route = route

print("geprüfte Routen:", anzahl)
print("kürzeste Rundreise:", " -> ".join(staedte[i] for i in beste_route), "-> Berlin")
print("Länge:", beste_laenge, "km")
print(f"Zeit: {time.time() - start:.4f} s")
```

</PyRunner>

:::details Erklärung
Der Start ist fest (Berlin), die übrigen 5 Städte werden in allen 5! = 120 Reihenfolgen
durchprobiert. Ergebnis: Berlin → Hamburg → Köln → Frankfurt → München → Leipzig → Berlin mit
1575 km. Jede Route wird dabei doppelt gezählt (einmal vorwärts, einmal rückwärts) – es gibt also
eigentlich nur 60 verschiedene Rundreisen.
:::

Bei *n* Städten gibt es **(n − 1)! / 2** verschiedene Rundreisen:

<PyRunner>

```python
import math

print(f"{'Städte':>6} {'verschiedene Rundreisen':>28}")
for n in [4, 5, 6, 10, 15, 20, 25]:
    routen = math.factorial(n - 1) // 2
    print(f"{n:>6} {routen:>28}")
```

</PyRunner>

::: warning Hoffnungslos
Bei 25 Städten sind es etwa 3 · 10²³ Rundreisen. Selbst wenn ein Computer eine Milliarde Routen pro
Sekunde prüft, bräuchte er rund **zehn Millionen Jahre**.
:::

### Heuristik: Nächster Nachbar

In der Praxis verzichtet man auf die *beste* Lösung und nimmt eine *gute*. Eine **Heuristik** ist
eine Faustregel, die schnell ein brauchbares Ergebnis liefert. Hier: Fahre immer zur
nächstgelegenen Stadt, die du noch nicht besucht hast.

<PyRunner>

```python
staedte = ["Berlin", "Hamburg", "München", "Köln", "Frankfurt", "Leipzig"]
dist = [
    [  0, 255, 505, 475, 425, 150],
    [255,   0, 610, 355, 395, 295],
    [505, 610,   0, 455, 305, 360],
    [475, 355, 455,   0, 150, 380],
    [425, 395, 305, 150,   0, 295],
    [150, 295, 360, 380, 295,   0],
]

def naechster_nachbar(start):
    route = [start]
    besucht = {start}
    while len(route) < len(staedte):
        aktuell = route[-1]
        # die nächstgelegene noch nicht besuchte Stadt suchen
        naechste = None
        for s in range(len(staedte)):
            if s not in besucht:
                if naechste is None or dist[aktuell][s] < dist[aktuell][naechste]:
                    naechste = s
        route.append(naechste)
        besucht.add(naechste)
    return route

route = naechster_nachbar(0)
laenge = sum(dist[route[i]][route[(i + 1) % len(route)]] for i in range(len(route)))
print(" -> ".join(staedte[i] for i in route), "-> Berlin")
print("Länge:", laenge, "km")
```

</PyRunner>

:::details Vergleich
Die Heuristik findet eine Route mit 1760 km statt 1575 km – etwa 12 % länger. Dafür braucht sie nur
ungefähr n² Schritte statt n!. Bei 1000 Städten ist sie in Sekundenbruchteilen fertig.
:::

## Das Rucksackproblem

Dein Rucksack trägt höchstens 10 kg. Welche Gegenstände nimmst du mit, damit der **Gesamtwert**
möglichst groß ist? Brute-Force: Probiere jede **Teilmenge** aus. Bei *n* Gegenständen gibt es
2ⁿ Teilmengen (jeder Gegenstand ist drin oder nicht).

<PyRunner>

```python
from itertools import combinations

# (Name, Gewicht in kg, Wert in €)
gegenstaende = [
    ("Laptop",   3, 900),
    ("Kamera",   1, 450),
    ("Gitarre",  5, 700),
    ("Bücher",   4, 120),
    ("Konsole",  2, 400),
    ("Jacke",    2,  80),
    ("Schmuck",  1, 350),
    ("Werkzeug", 6, 300),
]
kapazitaet = 10

beste_auswahl = ()
bester_wert = 0
gepruefte = 0
for k in range(len(gegenstaende) + 1):
    for auswahl in combinations(gegenstaende, k):      # alle Teilmengen der Größe k
        gepruefte += 1
        gewicht = sum(g[1] for g in auswahl)
        wert = sum(g[2] for g in auswahl)
        if gewicht <= kapazitaet and wert > bester_wert:
            bester_wert = wert
            beste_auswahl = auswahl

print("geprüfte Teilmengen:", gepruefte)
print("beste Auswahl:", [g[0] for g in beste_auswahl])
print("Gewicht:", sum(g[1] for g in beste_auswahl), "kg, Wert:", bester_wert, "€")
```

</PyRunner>

Bei 8 Gegenständen sind das 2⁸ = 256 Teilmengen. Bei 60 Gegenständen wären es schon über 10¹⁸.

### Heuristik: Greedy nach Wert pro kg

Ein **gieriger** (engl. *greedy*) Ansatz: Sortiere nach „Wert pro Kilogramm" und packe ein, solange
es passt.

<PyRunner>

```python
gegenstaende = [
    ("Laptop",   3, 900),
    ("Kamera",   1, 450),
    ("Gitarre",  5, 700),
    ("Bücher",   4, 120),
    ("Konsole",  2, 400),
    ("Jacke",    2,  80),
    ("Schmuck",  1, 350),
    ("Werkzeug", 6, 300),
]
kapazitaet = 10

# nach "Wert pro kg" absteigend sortieren
sortiert = sorted(gegenstaende, key=lambda g: g[2] / g[1], reverse=True)

auswahl = []
gewicht = 0
for name, g, w in sortiert:
    if gewicht + g <= kapazitaet:      # passt noch rein? -> einpacken
        auswahl.append(name)
        gewicht += g

wert = sum(w for name, g, w in gegenstaende if name in auswahl)
print("Greedy-Auswahl:", auswahl)
print("Gewicht:", gewicht, "kg, Wert:", wert, "€")
```

</PyRunner>

:::details Erklärung
Greedy kommt auf 2180 €, die Brute-Force-Lösung auf 2400 €. Die Heuristik ist blitzschnell, findet
aber **nicht immer** das Optimum: Sie packt früh die kleinen, „wertvollen" Gegenstände ein, und am
Ende ist kein Platz mehr für die Gitarre.
:::

## Landkarten färben

Eine Landkarte soll so eingefärbt werden, dass benachbarte Länder **verschiedene** Farben haben.
Der **Vierfarbensatz** sagt: Für jede Landkarte reichen vier Farben. (Bewiesen wurde das erst 1976 –
mit Computerhilfe!) Ob aber **drei** Farben reichen, ist im Allgemeinen ein schweres Problem.

Wir speichern die Karte als Dictionary „Land → Liste der Nachbarn" und färben mit **Backtracking**:
Farbe ausprobieren, weitermachen – und wenn es später nicht klappt, die Farbe wieder zurücknehmen.

<PyRunner>

```python
# Welche Länder grenzen aneinander?
nachbarn = {
    "Deutschland": ["Frankreich", "Belgien", "Niederlande", "Luxemburg", "Schweiz", "Österreich"],
    "Frankreich":  ["Deutschland", "Belgien", "Luxemburg", "Schweiz"],
    "Belgien":     ["Deutschland", "Frankreich", "Niederlande", "Luxemburg"],
    "Niederlande": ["Deutschland", "Belgien"],
    "Luxemburg":   ["Deutschland", "Frankreich", "Belgien"],
    "Schweiz":     ["Deutschland", "Frankreich", "Österreich"],
    "Österreich":  ["Deutschland", "Schweiz"],
}
laender = list(nachbarn)

def erlaubt(land, farbe, faerbung):
    for n in nachbarn[land]:
        if faerbung.get(n) == farbe:      # Nachbar hat schon diese Farbe
            return False
    return True

def faerben(i, farben, faerbung):
    if i == len(laender):                 # alle Länder gefärbt -> fertig
        return True
    land = laender[i]
    for farbe in farben:
        if erlaubt(land, farbe, faerbung):
            faerbung[land] = farbe        # ausprobieren ...
            if faerben(i + 1, farben, faerbung):
                return True
            del faerbung[land]            # ... und wieder zurücknehmen (Backtracking)
    return False

for farben in [["rot", "grün", "blau"], ["rot", "grün", "blau", "gelb"]]:
    faerbung = {}
    if faerben(0, farben, faerbung):
        print(len(farben), "Farben reichen:", faerbung)
    else:
        print(len(farben), "Farben reichen nicht.")
```

</PyRunner>

:::details Warum reichen drei Farben nicht?
Deutschland, Frankreich, Belgien und Luxemburg grenzen **alle paarweise** aneinander. Vier Länder,
die sich gegenseitig berühren, brauchen vier verschiedene Farben.
:::

## Die Königsberger Brücken – leicht!

In Königsberg führten sieben Brücken über den Fluss Pregel. Die Frage: Kann man einen Spaziergang
machen, der **jede Brücke genau einmal** überquert? Ausprobieren wäre mühsam – aber Leonhard Euler
fand 1736 eine einfache Regel. Zähle für jedes Landstück, wie viele Brücken dort enden (den **Grad**):

- **0** Landstücke mit ungeradem Grad → es gibt einen Rundweg.
- **2** Landstücke mit ungeradem Grad → es gibt einen Weg (Start und Ziel sind diese beiden).
- sonst → es gibt keinen solchen Weg.

<PyRunner>

```python
# Landstücke: A (Nordufer), B (Südufer), C (Insel Kneiphof), D (Ostinsel)
bruecken = [("A", "C"), ("A", "C"), ("B", "C"), ("B", "C"),
            ("A", "D"), ("B", "D"), ("C", "D")]

grad = {}
for a, b in bruecken:
    grad[a] = grad.get(a, 0) + 1
    grad[b] = grad.get(b, 0) + 1
print("Grade:", grad)

ungerade = [k for k in grad if grad[k] % 2 == 1]
print("Knoten mit ungeradem Grad:", ungerade)

if len(ungerade) == 0:
    print("Es gibt einen Rundweg über alle Brücken.")
elif len(ungerade) == 2:
    print("Es gibt einen Weg über alle Brücken (aber keinen Rundweg).")
else:
    print("Es gibt keinen Weg, der jede Brücke genau einmal benutzt.")
```

</PyRunner>

::: tip Nicht jedes Graphenproblem ist schwer
„Jede **Brücke** (Kante) genau einmal" ist leicht: Grade zählen, fertig – das geht in O(n).
„Jede **Stadt** (Knoten) genau einmal" wie beim Handlungsreisenden ist schwer. Zwei Probleme, die
fast gleich klingen, können völlig unterschiedlich schwer sein.
:::

## Primfaktoren – die Grundlage von RSA

Zwei Primzahlen zu **multiplizieren** ist leicht. Aus dem Produkt die beiden Primzahlen
**zurückzugewinnen** ist schwer. Mit dem Primzahltest aus [Primzahlen, Primfaktoren & GGT](./primzahlen-teiler)
können wir das ausprobieren:

<PyRunner>

```python
import time

def kleinster_teiler(n):
    t = 2
    while t * t <= n:
        if n % t == 0:
            return t
        t += 1
    return n

for p, q in [(1009, 1013), (10007, 10009), (100003, 100019), (1000003, 1000033)]:
    n = p * q                                # Multiplizieren: sofort fertig
    start = time.time()
    t = kleinster_teiler(n)                  # Zurückrechnen: Teiler suchen
    print(f"{n:>14} = {t} · {n // t}   ({time.time() - start:.4f} s)")
```

</PyRunner>

:::details Erklärung
Jede weitere Stelle der Primzahlen macht die Suche etwa **zehnmal** langsamer. Das
Verschlüsselungsverfahren **RSA**, das z. B. beim Online-Banking benutzt wird, verwendet Primzahlen
mit über 300 Stellen. Das Produkt darf jeder kennen – aber niemand kann es in vernünftiger Zeit
zerlegen. Die Schwere des Problems ist hier also **erwünscht**!
:::

## Zusammenfassung

| Problem | Brute-Force-Aufwand | schnelle exakte Lösung bekannt? | Ausweg |
|---|---|---|---|
| Handlungsreisender | (n − 1)! / 2 Routen | nein | Heuristik (nächster Nachbar) |
| Rucksack | 2ⁿ Teilmengen | nein | Greedy (nicht immer optimal) |
| Färben mit 3 Farben | 3ⁿ Färbungen | nein | Backtracking, Heuristiken |
| Königsberger Brücken (Euler-Weg) | – | **ja**, Grade zählen | – |
| Primfaktorzerlegung | ≈ √n Probedivisionen | nein | (Schwere wird für RSA genutzt) |

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Zeit messen
Miss, wie lange die Brute-Force-Suche für 5, 6, 7, 8 und 9 Städte mit zufälligen Entfernungen
braucht. Um welchen Faktor wächst die Zeit von Stadt zu Stadt? Schätze damit ab, wie lange 15 Städte
dauern würden.

<PyRunner>

```python
from itertools import permutations
import random
import time

def zufalls_matrix(n):
    d = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(i + 1, n):
            d[i][j] = d[j][i] = random.randint(50, 500)
    return d

def kuerzeste_rundreise(dist):
    # alle Routen durchprobieren, kürzeste Länge zurückgeben
    pass

# for n in range(5, 10): ...
```

</PyRunner>

:::details Lösung
```python
def kuerzeste_rundreise(dist):
    n = len(dist)
    beste = float("inf")
    for rest in permutations(range(1, n)):
        route = (0,) + rest
        l = sum(dist[route[i]][route[(i + 1) % n]] for i in range(n))
        beste = min(beste, l)
    return beste

for n in range(5, 10):
    dist = zufalls_matrix(n)
    start = time.time()
    kuerzeste_rundreise(dist)
    print(f"{n} Städte: {time.time() - start:.3f} s")
```
Von *n* auf *n + 1* Städte wächst die Zeit etwa um den Faktor *n* (noch etwas mehr, weil jede Route
länger wird). Von 9 auf 15 Städte also etwa 9 · 10 · 11 · 12 · 13 · 14 ≈ 2,2 Millionen Mal länger –
das wären mehrere Stunden bis Tage.
:::

### Aufgabe 2: Greedy reinlegen
Schreibe die Funktionen `greedy(gegenstaende, kapazitaet)` und
`brute_force(gegenstaende, kapazitaet)`, die jeweils den erreichten Gesamtwert zurückgeben. Teste
mit der kleinen Liste unten: Wie weit liegt Greedy daneben?

<PyRunner>

```python
from itertools import combinations

def greedy(gegenstaende, kapazitaet):
    pass

def brute_force(gegenstaende, kapazitaet):
    pass

liste = [("A", 6, 60), ("B", 5, 45), ("C", 5, 45)]
print("Greedy:", greedy(liste, 10))
print("Optimal:", brute_force(liste, 10))
```

</PyRunner>

:::details Lösung
```python
def greedy(gegenstaende, kapazitaet):
    sortiert = sorted(gegenstaende, key=lambda g: g[2] / g[1], reverse=True)
    gewicht = 0
    wert = 0
    for name, g, w in sortiert:
        if gewicht + g <= kapazitaet:
            gewicht += g
            wert += w
    return wert

def brute_force(gegenstaende, kapazitaet):
    bester = 0
    for k in range(len(gegenstaende) + 1):
        for auswahl in combinations(gegenstaende, k):
            if sum(g[1] for g in auswahl) <= kapazitaet:
                bester = max(bester, sum(g[2] for g in auswahl))
    return bester
```
Greedy nimmt A (10 €/kg) und hat dann nur noch 4 kg frei – B und C passen nicht mehr: 60 €.
Optimal sind B + C mit 90 €.
:::

### Aufgabe 3: Eine Brücke mehr
Später wurde in Königsberg eine zusätzliche Brücke zwischen B und D gebaut. Ergänze sie im
Programm. Gibt es jetzt einen Weg über alle Brücken? Wo muss er beginnen?

:::details Lösung
Mit `("B", "D")` zusätzlich haben B und D den Grad 4, A den Grad 3 und C den Grad 5. Genau zwei
Landstücke haben ungeraden Grad – es gibt also einen Weg. Er beginnt bei A und endet bei C (oder
umgekehrt).
:::
