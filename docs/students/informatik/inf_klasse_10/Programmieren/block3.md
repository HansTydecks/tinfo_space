---
title: "Inputs, Funktionen & Bibliotheken"
description: "Interaktive Programme mit Benutzereingaben, eigene Funktionen schreiben und externe Bibliotheken nutzen."
---

:::info Definition: Funktionen
Eine Funktion ist ein wiederverwendbarer Codeblock, der eine bestimmte Aufgabe erfüllt. Funktionen können Parameter entgegennehmen und Werte zurückgeben.
:::

## Ziele
- Programme interaktiv mit Benutzereingaben gestalten
- Eigene Funktionen definieren und verwenden
- Parameter und Rückgabewerte verstehen
- Externe Bibliotheken importieren und nutzen

## Benutzereingaben mit input()

Bisher waren alle unsere Programme statisch - die Werte der Variablen haben wir fest im Code definiert. Richtig spannend wird es erst, wenn der Benutzer selbst Werte eingeben kann! Dafür gibt es in Python die `input()` Funktion.

```python
import turtle
t = turtle.Turtle()

name = input("Wie heißt du? ")
t.write("Hallo " + name + "!")
```

:::details Erklärung
Die `input()` Funktion pausiert das Programm und wartet auf eine Eingabe des Benutzers. Der Text in den Anführungszeichen wird als Aufforderung angezeigt. Sobald der Benutzer etwas eingibt und Enter drückt, wird die Eingabe als String in der Variable `name` gespeichert.
:::

:::warning Wichtiger Hinweis
Die `input()` Funktion gibt **immer** einen String (Zeichenkette) zurück, auch wenn der Benutzer eine Zahl eingibt. Möchtest du mit der Eingabe rechnen, musst du sie erst zu einer Zahl umwandeln! Dies funktioniert mit einem sogenannten **Cast** (Umwandlung). Benötigst du bei der Eingabe eine ganze Zahl mit der du rechnen oder zählen möchtest, so castest du die Eingabe wie folgt: `eingabe = int(input("Ich brauche eine ganze Zahl:"))`. Benötigst du eine Gleitkommazahl, so nimmst du `eingabe = float(input("Bitte eine Gleitkommazahl:"))`. Das selbe gilt auch für Strings.
:::

### Eingaben zu Zahlen umwandeln

```python
import turtle
t = turtle.Turtle()

alter_text = input("Wie alt bist du? ")
alter = int(alter_text)  # String zu Integer umwandeln

if alter >= 18:
    t.write("Du bist volljährig!")
else:
    t.write("Du bist noch minderjährig.")
```

Noch kürzer geht es so:
```python
import turtle
t = turtle.Turtle()

alter = int(input("Wie alt bist du? "))

if alter >= 18:
    t.write("Du bist volljährig!")
else:
    t.write("Du bist noch minderjährig.")
```

:::info Aufgabe
Schreibe ein Programm, das den Benutzer nach seinem Namen, seinem Alter und seinem Lieblingsfach fragt. Tobi soll dann eine personalisierte Nachricht schreiben wie: "Hallo Max, cool dass du Informatik magst!"
:::

## Funktionen definieren

Du kennst bereits viele Funktionen: `t.forward()`, `t.left()`, `input()`, `int()` usw. Funktionen geben dir die Möglichkeit, Programmcode an verschiedenen Stellen mit geringem Aufwand wiederzuverwenden. Möchtest du, dass Tobi vorwärst läuft, so nutzt du mit geringem Aufwand `t.forward()` und Tobi bewegt sich über den Bildschirm. Wir können Funktionen auch selbst schreiben und aufrufen.

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
Mit `def` definieren wir eine neue Funktion namens `dreieck_zeichnen`. Der Code in der Funktion wird erst ausgeführt, wenn wir sie mit `dreieck_zeichnen()` aufrufen. So können wir den gleichen Code mehrmals verwenden, ohne ihn zu wiederholen.
:::

### Funktionen mit Parametern

Noch praktischer werden Funktionen, wenn wir ihnen Werte übergeben können:

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

### Funktionen mit mehreren Parametern

```python
import turtle
t = turtle.Turtle()

def rechteck_zeichnen(breite, hoehe):  # [!code focus]
    for i in range(2):                 # [!code focus]
        t.forward(breite)              # [!code focus]
        t.left(90)                     # [!code focus]
        t.forward(hoehe)               # [!code focus]
        t.left(90)                     # [!code focus]

rechteck_zeichnen(80, 40)
t.penup()
t.goto(0, -100)
t.pendown()
rechteck_zeichnen(60, 80)
```

:::info Aufgabe
Schreibe eine Funktion `stern_zeichnen(groesse)`, die einen 5-zackigen Stern zeichnet. Ein Stern entsteht, wenn du 5 Mal folgendes machst: vorwärts gehen, dann 144 Grad nach rechts drehen. Die Kanten des Sterns sollen eine Länge von 50 haben.
Verändere das funktionierende Programm so, dass der User die Größe selbst bestimmen kann.
:::

### Funktionen mit Rückgabewerten

Funktionen können auch Werte zurückgeben, die wir in unserem Programm weiterverwenden:

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

:::info Aufgabe
Schreibe eine Funktion `kreis_flaeche(radius)`, die die Fläche eines Kreises berechnet und zurückgibt. Die Formel ist: Fläche = 3.14159 * radius * radius. Lass Tobi das Ergebnis für einen Radius von 10 anzeigen.
:::


:::info Aufgabe
Erstelle ein interaktives Python-Programm, das ein beliebiges regelmäßiges Polygon zeichnet. Dein Programm soll folgende Anforderungen erfüllen:

Schreibe eine Funktion polygon_zeichnen, die
- zwei Parameter erwartet: die Anzahl der Seiten und die Länge jeder Seite,
- automatisch den passenden Innenwinkel berechnet,
- und mithilfe einer Schleife das Polygon zeichnet.

Frage den Benutzer oder die Benutzerin über die Konsole interaktiv:
- Wie viele Seiten das Polygon haben soll (z. B. 3 für ein Dreieck, 4 für ein Quadrat usw.),
- und wie lang die Seiten sein sollen.

Rufe anschließend deine Funktion mit den eingegebenen Werten auf, sodass das gewünschte Polygon auf dem Bildschirm erscheint.

💡 Hinweis: Überlege dir, wie du den Drehwinkel berechnest, damit das Polygon geschlossen wird.
:::

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

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Taschenrechner

Schreibe ein interaktives Taschenrechner-Programm, das:
1. Den Benutzer nach zwei Zahlen fragt
2. Nach der gewünschten Operation fragt (+, -, *, /)
3. Das Ergebnis mit Tobi auf dem Bildschirm anzeigt

Verwende dafür eine Funktion `rechnen(zahl1, zahl2, operation)`.

### Aufgabe 2: Zufälliges Kunstwerk

Erstelle ein Programm, das ein zufälliges Kunstwerk zeichnet:
- Zeichne 10 Kreise mit zufälligen Größen (zwischen 10 und 50)
- Jeder Kreis soll eine zufällige Farbe haben
- Die Position jedes Kreises soll zufällig sein
- Verwende eine Funktion `zufalls_kreis()`

:::details Tipp
Nutze `t.goto(x, y)` mit `random.randint(-200, 200)` für zufällige Positionen.
:::

### Aufgabe 3: Geometrie-Quiz

Schreibe ein interaktives Quiz-Programm:
1. Frage den Benutzer nach dem Radius eines Kreises
2. Berechne Umfang und Fläche mit Funktionen
3. Frage den Benutzer, was er für den Umfang schätzt
4. Vergleiche die Schätzung mit dem echten Wert
5. Gib eine Bewertung aus ("Sehr gut!" wenn Unterschied < 5, "Nicht schlecht!" wenn < 20, sonst "Das war weit daneben!")

### Aufgabe 4: Mustergenerator

Erstelle ein Programm, das dem Benutzer verschiedene Muster zur Auswahl anbietet:
- "1" für Spirale: Zeichnet eine Spirale mit 50 Schritten, bei jedem Schritt wird die Linie um 2 länger
- "2" für Blume: Zeichnet 8 Kreise um einen Mittelpunkt herum
- "3" für Stern-Explosion: Zeichnet 20 Linien vom Mittelpunkt nach außen in verschiedene Richtungen

Verwende für jedes Muster eine eigene Funktion.

## Zusammenfassung

In diesem Block hast du gelernt:
- **Benutzereingaben**: Mit `input()` können Programme interaktiv werden
- **Eigene Funktionen**: Code wiederverwendbar machen mit `def funktionsname():`
- **Parameter**: Funktionen flexibel gestalten durch Übergabe von Werten
- **Rückgabewerte**: Funktionen können Ergebnisse mit `return` zurückgeben  
- **Bibliotheken**: Fertige Funktionen nutzen (random, math)

Mit diesen Werkzeugen kannst du bereits richtig interessante und interaktive Programme schreiben!