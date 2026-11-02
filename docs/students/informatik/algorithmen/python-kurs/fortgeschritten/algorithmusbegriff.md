---
title: "Erweiterter Algorithmusbegriff"
description: "Über den klassischen Algorithmus hinaus: reaktive, randomisierte und heuristische Algorithmen in Python."
---

## Ziele
- Die Eigenschaften eines Algorithmus wiederholen
- **Reaktive** Algorithmen kennenlernen, die auf Ereignisse antworten
- **Randomisierte** Algorithmen mit dem Zufall nutzen und reproduzierbar machen
- **Heuristische** Algorithmen einsetzen und ihre Grenzen erkennen

## Wiederholung: Eigenschaften

Ein klassischer Algorithmus erfüllt diese Eigenschaften:

| Eigenschaft | Bedeutung |
|---|---|
| **Ausführbarkeit** | Jeder Schritt kann tatsächlich ausgeführt werden. |
| **Endlichkeit** | Die Beschreibung ist endlich lang, und der Algorithmus **hält** nach endlich vielen Schritten. |
| **Eindeutigkeit** | Jeder Schritt ist unmissverständlich beschrieben. |
| **Determinismus** | Der nächste Schritt ist immer eindeutig festgelegt. |
| **Determiniertheit** | Gleiche Eingabe liefert immer die gleiche Ausgabe. |

In der Praxis gibt es aber viele Programme, die bewusst gegen eine dieser Eigenschaften verstoßen –
und trotzdem sehr nützlich sind.

## Reaktive Algorithmen

Ein Spiel, eine App oder eine Ampelsteuerung **hält nie von selbst an**. Sie warten auf
**Ereignisse** (Tastendruck, Mausklick, Sensorwert) und reagieren darauf. Das Herzstück ist die
**Ereignisschleife** (engl. *event loop*). Hier simulieren wir die Ereignisse mit einer Liste:

<PyRunner>

```python
ereignisse = ["taste_rechts", "taste_rechts", "taste_oben", "klick", "taste_links", "ende"]

x, y = 0, 0
for ereignis in ereignisse:          # in echt: while True
    if ereignis == "taste_rechts":
        x += 1
    elif ereignis == "taste_links":
        x -= 1
    elif ereignis == "taste_oben":
        y += 1
    elif ereignis == "klick":
        print("Klick bei", (x, y))
    elif ereignis == "ende":
        print("Programm beendet.")
        break
    print(ereignis, "->", (x, y))
```

</PyRunner>

:::details Erklärung
Das Programm „weiß" vorher nicht, welche Ereignisse kommen. Es **reagiert** auf jedes einzelne.
In einem echten Programm steht dort `while True:` – die Schleife läuft, bis jemand das Programm
schließt. Die Eigenschaft **Endlichkeit** (Terminierung) gilt hier also nicht mehr: Ein reaktives
System *soll* gar nicht anhalten.
:::

## Randomisierte Algorithmen

Ein **randomisierter** Algorithmus trifft Entscheidungen mithilfe von **Zufallszahlen**. Damit ist
er nicht mehr determiniert: Zwei Läufe können verschiedene Ergebnisse liefern.

### Monte-Carlo: π schätzen

Wir werfen zufällig Punkte in das Quadrat von (0,0) bis (1,1). Der Anteil der Punkte im
Viertelkreis mit Radius 1 ist ungefähr π/4.

<PyRunner>

```python
import random

def schaetze_pi(anzahl):
    treffer = 0
    for _ in range(anzahl):
        x = random.random()
        y = random.random()
        if x * x + y * y <= 1:
            treffer += 1
    return 4 * treffer / anzahl

for n in [100, 10_000, 100_000]:
    print(n, "Punkte:", schaetze_pi(n))
```

</PyRunner>

:::details Erklärung
Je mehr Punkte, desto näher liegt das Ergebnis meist an 3,14159… Führe das Programm mehrmals aus:
Die Zahlen ändern sich jedes Mal. Das Ergebnis ist nur **wahrscheinlich** gut, nicht garantiert.
:::

### Zufallsauswahl

<PyRunner>

```python
import random

klasse = ["Ada", "Alan", "Grace", "Linus", "Margaret", "Tim"]
print("Heute an der Tafel:", random.choice(klasse))

gruppen = klasse[:]          # Kopie, das Original bleibt unverändert
random.shuffle(gruppen)
print("Gruppe 1:", gruppen[:3])
print("Gruppe 2:", gruppen[3:])
```

</PyRunner>

::: tip Reproduzierbarer Zufall mit random.seed
Computer erzeugen **Pseudo-Zufallszahlen**: Sie werden aus einem Startwert (*seed*) berechnet. Mit
`random.seed(42)` legst du diesen Startwert fest – dann erhältst du bei jedem Lauf **dieselben**
„Zufallszahlen". Das ist beim Testen und Fehlersuchen sehr praktisch.
:::

<PyRunner>

```python
import random

random.seed(42)
print([random.randint(1, 6) for _ in range(5)])
random.seed(42)
print([random.randint(1, 6) for _ in range(5)])   # exakt dieselbe Liste
```

</PyRunner>

## Heuristische Algorithmen

Manche Probleme sind so aufwendig, dass man die **beste** Lösung nicht (schnell genug) finden kann.
Eine **Heuristik** ist eine Faustregel, die schnell eine **gute**, aber nicht unbedingt **optimale**
Lösung liefert.

### Gierig wechseln (Greedy)

Beim Wechselgeld nimmt der **gierige** (*greedy*) Algorithmus immer die größte Münze, die noch passt:

<PyRunner>

```python
def wechselgeld_gierig(betrag, muenzen):
    ergebnis = []
    for m in sorted(muenzen, reverse=True):
        while betrag >= m:
            ergebnis.append(m)
            betrag -= m
    return ergebnis

print(wechselgeld_gierig(68, [1, 2, 5, 10, 20, 50]))
print(wechselgeld_gierig(6, [1, 3, 4]))
```

</PyRunner>

:::details Erklärung
Bei Euro-Münzen klappt das perfekt: 68 = 50 + 10 + 5 + 2 + 1 – weniger Münzen geht nicht.

Bei den Münzen `[1, 3, 4]` und dem Betrag 6 liefert der Algorithmus aber `[4, 1, 1]`, also **drei**
Münzen. Optimal wären **zwei**: `[3, 3]`. Die Heuristik war schnell, aber nicht optimal.
:::

::: info Warum dann Heuristiken?
Für viele Probleme (z. B. die kürzeste Rundreise durch 50 Städte) gibt es so viele Möglichkeiten,
dass selbst ein Supercomputer nicht alle ausprobieren kann. Eine gute Lösung **jetzt** ist dann
wertvoller als die beste Lösung in tausend Jahren.
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Getränkeautomat
Erweitere die Ereignisschleife zu einem Getränkeautomaten: `"muenze"` erhöht das Guthaben um 1 €,
`"cola"` gibt eine Cola aus, wenn mindestens 2 € Guthaben vorhanden sind, sonst „Zu wenig Geld".

<PyRunner>

```python
ereignisse = ["muenze", "cola", "muenze", "cola", "cola"]
guthaben = 0
# for ereignis in ereignisse: ...
```

</PyRunner>

:::details Lösung
```python
ereignisse = ["muenze", "cola", "muenze", "cola", "cola"]
guthaben = 0
for ereignis in ereignisse:
    if ereignis == "muenze":
        guthaben += 1
        print("Guthaben:", guthaben)
    elif ereignis == "cola":
        if guthaben >= 2:
            guthaben -= 2
            print("Cola ausgegeben!")
        else:
            print("Zu wenig Geld")
```
Ausgabe: Guthaben 1, Zu wenig Geld, Guthaben 2, Cola ausgegeben!, Zu wenig Geld.
:::

### Aufgabe 2: Würfelstatistik
Würfle 6000-mal mit `random.randint(1, 6)` und zähle in einer Liste, wie oft jede Augenzahl fällt.
Was erwartest du? Setze dann `random.seed(1)` an den Anfang und vergleiche zwei Läufe.

<PyRunner>

```python
import random

anzahl = [0] * 7      # Index 1 bis 6 benutzen
# ...
print(anzahl[1:])
```

</PyRunner>

:::details Tipp
`wurf = random.randint(1, 6)` und dann `anzahl[wurf] += 1`. Jede Zahl sollte ungefähr 1000-mal
vorkommen.
:::

### Aufgabe 3: Wann scheitert gierig?
Finde für die Münzen `[1, 5, 6, 9]` einen Betrag, bei dem der gierige Algorithmus **mehr** Münzen
benutzt als nötig. Teste mit einer Schleife alle Beträge von 1 bis 20.

<PyRunner>

```python
def wechselgeld_gierig(betrag, muenzen):
    ergebnis = []
    for m in sorted(muenzen, reverse=True):
        while betrag >= m:
            ergebnis.append(m)
            betrag -= m
    return ergebnis

for betrag in range(1, 21):
    print(betrag, wechselgeld_gierig(betrag, [1, 5, 6, 9]))
```

</PyRunner>

:::details Lösung
Zum Beispiel 11: gierig `[9, 1, 1]` (3 Münzen), optimal `[6, 5]` (2 Münzen). Auch 12 (`[9, 1, 1, 1]`
statt `[6, 6]`) funktioniert.
:::

## Weiterlesen

- [Algorithmusbegriff](../../algorithmusbegriff)
- [Eigenschaften von Algorithmen](../../eigenschaften)
