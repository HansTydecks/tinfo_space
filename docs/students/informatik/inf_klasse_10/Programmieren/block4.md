---
title: "For-Schleifen und Zählschleifen"
description: "Schleifen mit fester Anzahl von Wiederholungen programmieren und komplexere Muster zeichnen."
---

## Ziele
- For-Schleifen verstehen und anwenden
- Zählvariablen sinnvoll einsetzen
- Komplexere geometrische Muster programmieren

## For-Schleifen

Sicher erinnerst du dich daran, wie du den Roboter Karol durch die kleinen Welten geschickt hast. Oft musste Karol bestimmte Anweisungen mehrmals hintereinander ausführen. Anstatt jede Anweisung einzeln zu tippen haben wir uns **Schleifen** zu Nutze gemacht. Sicher erinnerst du dich an folgendes Beispiel:

```
wiederhole 5 mal 
Schritt
RechtsDrehen
endewiederhole
```

Schleifen gibt es nicht nur bei Karol, sondern auch bei Tobi der Schildkröte. Hier sehen sie zwar etwas anders aus, erfüllen aber den selben Zweck. Möchte man Anweisungen eine feste Anzahl von malen wiederholen (Karol: `wiederhole 5 mal`), so nimmt man in Python den `for i in range(anfang, ende):` Befehl.

```python
import turtle
t = turtle.Turtle()

for i in range(1, 10):
    t.write(i)
    t.forward(10)
t.forward(10)
```

Dabei ist `i` eine Variable, die genau wie die Variablen aus Block 1 genutzt werden kann. Wichtig: sie wird am Ende der Schleife immer um 1 erhöht. Häufig wird sie auch Zählvariable genannt.

:::details Wichtiger Hinweis
Die Zählvariable `i` ist zu Beginn der Schleife gleich der ersten Zahl in `range(anfang, ende)`. `i` wird jedoch nie zu `ende`, da die Abbruchbedingung der Schleife erreicht ist *sobald `i` das `ende`* erreicht. In unserem Beispiel zählt `i` also hoch bis 9, wird dann um 1 erhöht und bricht somit die Schleife ab.
:::

### Verschiedene range()-Varianten

```python
# Nur eine Zahl: von 0 bis n-1
for i in range(5):      # 0, 1, 2, 3, 4
    t.write(i)

# Zwei Zahlen: von start bis ende-1  
for i in range(2, 8):   # 2, 3, 4, 5, 6, 7
    t.write(i)

# Drei Zahlen: von start bis ende-1 in Schritten
for i in range(0, 10, 2):  # 0, 2, 4, 6, 8
    t.write(i)
```

## Geometrische Muster mit For-Schleifen

### Einfache Formen
```python
import turtle
t = turtle.Turtle()

# Gleichseitiges Dreieck
for i in range(3):
    t.forward(100)
    t.left(120)

# Quadrat  
for i in range(4):
    t.forward(80)
    t.left(90)
```

### Komplexere Muster
```python
import turtle
t = turtle.Turtle()

# Spirale
for i in range(50):
    t.forward(i * 2)
    t.left(90)

# Konzentrische Kreise
for i in range(1, 6):
    t.circle(i * 20)
    t.penup()
    t.right(90)
    t.forward(20)
    t.left(90)
    t.pendown()
```

## Aufgaben

### Aufgabe 1: Zebrastreifen
Zeichne mit einer Schleife 5 kurze, parallele Linien nebeneinander, die wie ein Zebrastreifen aussehen.
:::details Tipp
Nutze t.forward() und t.penup() / t.pendown(), damit Tobi zwischendurch springen kann, ohne zu zeichnen.
:::

### Aufgabe 2: Treppenstufen
Zeichne eine Treppe mit 6 Stufen, jede Stufe z.B. 10 Schritte hoch und 10 Schritte breit.

### Aufgabe 3: Stern
Schreibe eine Schleife, die einen 5-zackigen Stern zeichnet. Ein Stern entsteht, wenn du 5 Mal folgendes machst: vorwärts gehen, dann 144 Grad nach rechts drehen.

### Aufgabe 4: Blütenmuster
Zeichne 8 Kreise um einen Mittelpunkt herum, sodass sie wie eine Blüte aussehen.
:::details Tipp
Nach jedem Kreis: `t.left(45)` für gleichmäßige Verteilung.
:::

### Aufgabe 5: Regenbogen-Rechtecke
Zeichne 7 Rechtecke in verschiedenen Farben nebeneinander. Jedes Rechteck soll eine andere Farbe haben.

```python
farben = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
```

## Vorbereitung für Block 5
Überlege dir, welche Teile deines Codes du öfter verwendest und wie man diese in wiederverwendbare Bausteine packen könnte.
