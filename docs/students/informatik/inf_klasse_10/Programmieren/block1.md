---
title: "Variablen & maschinelle Entscheidungen"
description: "Erste Schritte mit Variablen und deren Anwendung in maschinellen Entscheidungsprozessen."
---

## Variablen

Den Begriff der Variable kennst du bereits aus dem Mathematikunterricht. Für den Informatikunterricht ist es wichtig, dass Du dein Vorwissen beiseite legst und das Konzept der Variable in der Informatik neu lernst. Wir können uns **Variablen als Behälter für einen Wert** vorstellen, aus dem man etwas herausnehmen und hineinlegen kann. In Python können wir Variablen "erschaffen", indem wir folgenden Ausdruck in unseren Code schreiben: `variablenname = wert` oder `schuhgroeße = 39`.

::: info Hinweis
Variablennamen werden per Konvention klein geschrieben und sollten möglichst selbsterklärend sein. Namen wie `gfpr_123juhu` oder `dasistdiewichtigevariabledenkdaran` sind möglich, aber sehr ungern gesehen.
:::

::: details Detailliertere Erklärung, Begriffe
In Python ist `x = 10` ein einfacher Zuweisungsausdruck, der gleichzeitig folgendes leistet:
- Erstellt die Variable x, falls sie noch nicht existiert (**Definition**).
- Weist x den Wert 10 zu (**Zuweisung**).
- Da x damit ihren ersten Wert bekommt, kann man zugleich sagen, dass x damit **initialisiert** wird.
:::

Was wir mit solchen Behältern anstellen können wird in den folgenden Beispielen deutlich. Überlegt euch zu zweit, welches Ergebnis ihr am Bildschrim seht **bevor** ihr das Programm ausführt.

### Beispiel 1
```python
import turtle
t = turtle.Turtle()

zahl = 5
t.write(zahl)

t.forward(50)  # Platz schaffen für die nächste Zahl

zahl = 10
t.write(zahl)
```
:::details Erklärung Beispiel 1
Die Variable `zahl` wird in Zeile 4 definiert und ihr wird gleichzeitig der Wert 5 zugewiesen. Dies geschieht mit dem Zuweisungsoperator `=`. Anschließend wird der Wert der Variable `Zahl` mit `t.write(zahl)` auf dem Bildschrim ausgegeben.
In Zeile 9 wird der Wert von `zahl` neu zugewiesen. Der alte Wert verfällt und der Variable wird der neue Wert 10 zugewiesen. Nun schreibt die Schildkröte den neuen Wert 10 auf den Bildschirm.
:::

### Aufgabe 1: Korrigieren

```python
import turtle
tobi = turtle.Turtle()

8 = zahl
t.write(zahl)
```
:::info Hinweis
Lies dir die Fehlermeldungen genau durch. Sie zeigen dir, in welcher Zeile du anch den Fehlern schauen musst.
:::

### Beispiel 2 
```python
import turtle
t = turtle.Turtle()

a = 7
b = 3
summe = a + b

t.write("Summe: ")
t.forward(50)
t.write(summe)
```
:::details Erklärung Beispiel 2
Jetzt wird gerechnet! Zeilen 4 und 5 sind dir bekannt. In Zeile 6 wird eine Variable `summe` definiert und ihr wird der Inhalt rechts durch den Zuweisungsoperator `=` zugewiesen. Der Wert ist in diesem Fall die Summe aus a und b, leicht erkennbar durch das `+`. Nun trägt die Variable `summe` den Wert 10. 
:::

### Aufgabe 2: Rechnen
Erstelle ein Python-Programm mit Turtle, das zwei Zahlen in Variablen speichert (z. B. `a` und `b`). Berechne sowohl ihre Summe (`a + b`) als auch ihre Differenz (`a - b`) und ihr Produkt (`a * b`). Gib alle drei Ergebnisse mit Turtle aus, jeweils mit einem passenden Text davor, z. B.:

```
Summe: 13
Differenz: 7
Produkt: 30
```

### Beispiel 3 
```python
import turtle
t = turtle.Turtle()

zahl = 5
zahl = zahl + 2 

t.write(zahl)
```
:::details Erklärung Beispiel 3
Hier wird sehr deutlich, wie das `=` als Zuweisungsoperator funktioniert. `zahl = zahl + 2` ist im mathematischen Sinne natürlich Humbug. In der Informatik ergibt diese Zeile aber Sinn. Der Variable `zahl` wird mit `=` der Wert der rechten Seite zugewiesen der Operation zugewiesen. Dieser rechte Teil ist die Summe aus dem ehemaligen Wert der Variable `zahl`, sprich 5, und 2. `zahl` trägt den Wert 7.
:::

### Rechenzeichen
Hier alle arithmetischen Operatoren auf einen Blick

| Operator| Name                     |
|:-------:|--------------------------|
| `+`     | Addition                 |
| `-`     | Subtraktion              |
| `*`     | Multiplikation           |
| `/`     | Division (float)         |
| `//`    | Ganzzahlige Division     |
| `%`     | Modulo (Rest)            |
| `**`    | Potenzierung             |

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe: Eingaben von Usern

Wenn du an deinen Alltag mit Computern oder Smartphones denkst, dann denkst du sicher oft an Interaktionen zwischen dir und deinen Geräten. Solche Interaktionen nennt man auch **Input oder Eingabe** Du tippst etwas ein oder klickst auf einen Button und es passiert etwas. Das klappt in Python selbstverständlich auch:

```python
import turtle
t = turtle.Turtle()

zahl = int(input()) # [!code focus]
zahl = zahl + 10
t.write(zahl)
```
:::details Erklärung Userinput
Das Program startet die einzelnen Zeilen Code werden abgearbeitet, bis sie zur `input()` Funktion gelangen. Nun wartet das Programm... auf deine Eingabe. Tipp doch mal eine Zahl ein und bestätige mit **Enter** und schau dir das Ergebnis an.
:::warning Vorsicht
Erwarten wir eine ganze Zahl, so müssen wir den Befehl `input()` in die Klammern des `int()` Casts schreiben wie im Beispiel darüber (bspw. `zahl = int(input())`). Erwarten wir einen Text, so reicht ein einfaches `input()` (bspw. `name = input()`)
:::

### Aufgabe 3: Frage zu Userdaten

Frage in deinem Programm zuerst nach dem Namen des Users. Frage anschließend nach dem Alter. Nutze dazu die `input()` Funktion. Speichere beides jeweils in einer eigenen Variable. Gib anschließend beide Eingaben aus:

```
Name des Users: Martha Musterfrau
Alter des Users: 34
```

### Aufgabe 4: Kreise

Schreibe ein Python-Programm mit Turtle, das drei Kreise nebeneinander zeichnet.
- Der erste Kreis soll einen Radius von 50 haben.
- Nach jedem Kreis soll der Radius um 10 größer werden.
- Verwende dafür nur eine einzige Variable, z. B. radius.

Achte darauf, dass die Kreise nebeneinander stehen.
:::details Tipp
Setze `radius = 50` am Anfang.
Nach jedem Kreis: `radius = radius + 10`.
Zum Bewegen kannst du `penup()`, `forward()` und `pendown()` verwenden.
:::

### Aufgabe 5: Vertauschen

Erstelle zwei Variablen `a = 5` und `b = 7`. Tausche ihre Werte und gib das Ergebnis aus.




## Aufgaben vor dem folgenden Block
:::info 
1. Schaue Dir das folgende Video bis Minute 2:30 an und halte die Fehlvorstellungen zu Variablen fest
:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/uqTvW5ZhxPc?si=xKEMdUOWaZvX63Rc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>