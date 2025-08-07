---
title: "Bibliotheken und Funktionen"
description: "Externe Bibliotheken nutzen, eigene Funktionen schreiben und Programme strukturieren."
---

## Ziele
- Externe Bibliotheken importieren und nutzen
- Eigene Funktionen definieren und verwenden
- Parameter und Rückgabewerte verstehen
- Programme sauber strukturieren

## Externe Bibliotheken

Python wird durch Bibliotheken noch mächtiger. Eine Bibliothek ist eine Sammlung von Funktionen, die andere Programmierer geschrieben haben.

### Die random-Bibliothek

```python
import turtle
import random  # [!code focus]

t = turtle.Turtle()

# Zufällige Zahlen generieren
zufallszahl = random.randint(1, 6)  # [!code focus]
t.write(f"Würfel: {zufallszahl}")

t.penup()
t.goto(0, -50)
t.pendown()

# Zufällige Farbe
farben = ["red", "blue", "green", "yellow", "purple"]
zufalls_farbe = random.choice(farben)  # [!code focus]
t.color(zufalls_farbe)
t.circle(30)
```

### Die math-Bibliothek

```python
import turtle
import math  # [!code focus]

t = turtle.Turtle()

# Mathematische Funktionen nutzen
radius = 50
umfang = 2 * math.pi * radius  # [!code focus]
flaeche = math.pi * radius * radius  # [!code focus]

t.write(f"Kreis: Umfang = {umfang:.1f}")
t.penup()
t.goto(0, -30)
t.pendown()
t.write(f"Fläche = {flaeche:.1f}")
```

:::details Nützliche Funktionen
**random-Bibliothek:**
- `random.randint(a, b)`: Zufällige ganze Zahl zwischen a und b
- `random.choice(liste)`: Zufälliges Element aus einer Liste
- `random.random()`: Zufällige Kommazahl zwischen 0 und 1

**math-Bibliothek:**  
- `math.pi`: Die Zahl Pi (3.14159...)
- `math.sqrt(x)`: Quadratwurzel von x
- `math.pow(x, y)`: x hoch y
:::

## Funktionen definieren

Du kennst bereits viele Funktionen: `t.forward()`, `t.left()`, `int()` usw. Funktionen geben dir die Möglichkeit, Programmcode an verschiedenen Stellen mit geringem Aufwand wiederzuverwenden.

### Einfache Funktionen ohne Parameter

```python
import turtle
t = turtle.Turtle()

def dreieck_zeichnen():  # [!code focus]
    for i in range(3):   # [!code focus]
        t.forward(50)    # [!code focus]
        t.left(120)      # [!code focus]

# Funktion aufrufen
dreieck_zeichnen()
t.forward(100)
dreieck_zeichnen()
```

:::details Erklärung
Mit `def` definieren wir eine neue Funktion namens `dreieck_zeichnen`. Der Code in der Funktion wird erst ausgeführt, wenn wir sie mit `dreieck_zeichnen()` aufrufen.
:::

### Funktionen mit Parametern

```python
import turtle
t = turtle.Turtle()

def quadrat_zeichnen(groesse):  # [!code focus]
    for i in range(4):          # [!code focus]
        t.forward(groesse)      # [!code focus]
        t.left(90)              # [!code focus]

# Verschiedene Quadrate zeichnen
quadrat_zeichnen(30)
t.penup()
t.forward(100)
t.pendown()
quadrat_zeichnen(50)
```

### Funktionen mit Rückgabewerten

```python
import turtle
t = turtle.Turtle()

def quadrat_umfang(seitenlaenge):  # [!code focus]
    umfang = seitenlaenge * 4      # [!code focus]
    return umfang                  # [!code focus]

# Funktion verwenden
seite = 25
umfang = quadrat_umfang(seite)
t.write(f"Umfang: {umfang}")
```

## Aufgaben

### Aufgabe 1: Stern-Funktion
Schreibe eine Funktion `stern_zeichnen(groesse)`, die einen 5-zackigen Stern zeichnet.

### Aufgabe 2: Zufälliges Kunstwerk
Erstelle ein Programm, das ein zufälliges Kunstwerk zeichnet:
- Zeichne 10 Kreise mit zufälligen Größen (zwischen 10 und 50)
- Jeder Kreis soll eine zufällige Farbe haben
- Die Position jedes Kreises soll zufällig sein
- Verwende eine Funktion `zufalls_kreis()`

### Aufgabe 3: Polygon-Generator
Erstelle eine Funktion `polygon_zeichnen(seiten, groesse)`, die ein beliebiges regelmäßiges Polygon zeichnet.

### Aufgabe 4: Geometrie-Rechner
Schreibe Funktionen für geometrische Berechnungen:
- `kreis_flaeche(radius)`: Berechnet die Fläche eines Kreises
- `rechteck_umfang(breite, hoehe)`: Berechnet den Umfang eines Rechtecks

## Vorbereitung für Block 6
Denke über komplexere Programme nach, die alle bisherigen Konzepte kombinieren.
