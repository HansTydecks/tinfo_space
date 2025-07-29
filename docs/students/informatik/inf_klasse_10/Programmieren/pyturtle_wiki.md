---
title: "Python Turtle - Cheat Sheet & Wiki"
description: "Schnelle Übersicht aller wichtigen Befehle, Regeln und Funktionen aus dem Kurs"
---

# 🐢 Python Turtle - Cheat Sheet & Wiki

Eine schnelle Übersicht aller wichtigen Befehle und Regeln aus dem Python-Kurs.

## 🚀 Grundlagen - Immer zuerst!

```python
import turtle
t = turtle.Turtle()
t.speed(5)  # 1:slowest, 3:slow, 5:normal, 10:fast, 0:fastest
```

## 🎨 Turtle-Befehle

| Befehl | Was passiert | Beispiel |
|--------|--------------|----------|
| `t.forward(zahl)` | Tobi geht vorwärts | `t.forward(100)` |
| `t.backward(zahl)` | Tobi geht rückwärts | `t.backward(50)` |
| `t.right(grad)` | Tobi dreht sich rechts | `t.right(90)` |
| `t.left(grad)` | Tobi dreht sich links | `t.left(45)` |
| `t.circle(radius)` | Tobi zeichnet einen Kreis | `t.circle(30)` |
| `t.goto(x, y)` | Tobi springt zur Position | `t.goto(100, 50)` |
| `t.penup()` | Stift heben (nicht zeichnen) | `t.penup()` |
| `t.pendown()` | Stift senken (zeichnen) | `t.pendown()` |
| `t.color("farbe")` | Farbe ändern | `t.color("red")` |
| `t.write("text")` | Text schreiben | `t.write("Hallo!")` |
| `t.heading()` | Aktuelle Richtung abfragen | `if t.heading() == 90:` |

## 📊 Variablen

| Regel | Erklärung | Beispiel |
|-------|-----------|----------|
| **Erstellen** | `name = wert` | `alter = 15` |
| **Überschreiben** | Neuer Wert mit `=` | `alter = 16` |
| **Rechnen** | Variable = alte Variable + Zahl | `alter = alter + 1` |
| **Namen** | Klein, selbsterklärend, keine Leerzeichen | `schuh_groesse = 42` |

### Datentypen

| Typ | Was es ist | Beispiel | Umwandeln |
|-----|------------|----------|-----------|
| **Integer** | Ganze Zahl | `x = 5` | `int("5")` |
| **Float** | Kommazahl | `y = 3.14` | `float("3.14")` |
| **String** | Text | `name = "Max"` | `str(5)` |
| **Boolean** | Wahr/Falsch | `win = True` | - |

## 🔢 Rechenzeichen

| Operator | Name | Beispiel | Ergebnis |
|----------|------|----------|----------|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraktion | `5 - 3` | `2` |
| `*` | Multiplikation | `5 * 3` | `15` |
| `/` | Division | `10 / 3` | `3.333...` |
| `//` | Ganzzahl-Division | `10 // 3` | `3` |
| `%` | Rest (Modulo) | `10 % 3` | `1` |
| `**` | Potenz | `2 ** 3` | `8` |

## ✅ Bedingungen

### Vergleichsoperatoren

| Operator | Bedeutung | Beispiel |
|----------|-----------|----------|
| `==` | ist gleich | `if x == 5:` |
| `!=` | ist ungleich | `if x != 5:` |
| `<` | kleiner als | `if x < 5:` |
| `<=` | kleiner oder gleich | `if x <= 5:` |
| `>` | größer als | `if x > 5:` |
| `>=` | größer oder gleich | `if x >= 5:` |

### Logische Operatoren

| Operator | Bedeutung | Beispiel |
|----------|-----------|----------|
| `and` | UND (beide müssen wahr sein) | `if x > 0 and x < 10:` |
| `or` | ODER (einer muss wahr sein) | `if x < 0 or x > 10:` |
| `not` | NICHT (kehrt um) | `if not (x == 5):` |

### If-Struktur

```python
if bedingung:
    # Wird ausgeführt wenn wahr
    t.write("Wahr!")
else:
    # Wird ausgeführt wenn falsch
    t.write("Falsch!")
```

## 🔄 Schleifen

### For-Schleife (bestimmte Anzahl)

```python
for i in range(5):          # 0, 1, 2, 3, 4
    t.forward(10)

for i in range(2, 8):       # 2, 3, 4, 5, 6, 7
    t.write(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8 (Schrittweite 2)
    t.circle(i)
```

### While-Schleife (solange Bedingung wahr)

```python
x = 0
while x < 5:
    t.forward(x)
    x = x + 1
```

## 💬 Benutzereingaben

| Befehl | Was passiert | Beispiel |
|--------|--------------|----------|
| `input("text")` | Benutzer gibt Text ein | `name = input("Dein Name: ")` |
| `int(input())` | Eingabe zu Zahl umwandeln | `alter = int(input("Alter: "))` |
| `float(input())` | Eingabe zu Kommazahl | `groesse = float(input("Größe: "))` |

## ⚙️ Funktionen

### Einfache Funktion

```python
def meine_funktion():
    t.forward(50)
    t.left(90)

# Aufrufen:
meine_funktion()
```

### Funktion mit Parametern

```python
def quadrat(groesse):
    for i in range(4):
        t.forward(groesse)
        t.left(90)

# Aufrufen:
quadrat(50)
```

### Funktion mit Rückgabe

```python
def addieren(a, b):
    ergebnis = a + b
    return ergebnis

# Verwenden:
summe = addieren(5, 3)
t.write(summe)
```

## 📚 Wichtige Bibliotheken

### Random (Zufallszahlen)

```python
import random

# Zufällige ganze Zahl zwischen 1 und 6
wuerfel = random.randint(1, 6)

# Zufälliges Element aus Liste
farben = ["red", "blue", "green"]
farbe = random.choice(farben)

# Zufällige Kommazahl zwischen 0 und 1
zufall = random.random()
```

### Math (Mathematik)

```python
import math

# Pi verwenden
umfang = 2 * math.pi * radius

# Quadratwurzel
wurzel = math.sqrt(25)  # = 5.0

# Potenz
potenz = math.pow(2, 3)  # = 8.0
```

## ⚠️ Häufige Fehler

| Fehler | Richtig | Falsch |
|--------|---------|--------|
| **Doppelpunkt vergessen** | `if x == 5:` | `if x == 5` |
| **Einrückung vergessen** | `    t.forward(10)` | `t.forward(10)` |
| **= statt ==** | `if x == 5:` | `if x = 5:` |
| **String + Zahl** | `"Alter: " + str(15)` | `"Alter: " + 15` |
| **Groß-/Kleinschreibung** | `True` | `true` |

## 🎯 Nützliche Tricks

### String-Formatierung

```python
name = "Max"
alter = 15
t.write(f"Hallo {name}, du bist {alter} Jahre alt!")
```

### Listen

```python
zahlen = [1, 2, 3, 4, 5]
farben = ["red", "blue", "green"]

# Erstes Element: liste[0]
erste_zahl = zahlen[0]  # = 1

# Durch Liste gehen:
for farbe in farben:
    t.color(farbe)
    t.circle(20)
```

### Mehrere Turtle-Objekte

```python
import turtle

tobi = turtle.Turtle()
lisa = turtle.Turtle()

tobi.color("red")
lisa.color("blue")

tobi.forward(100)
lisa.backward(100)
```

---

## 📝 Schnell-Vorlage

```python
import turtle
import random
import math

t = turtle.Turtle()
t.speed(5)

# Dein Code hier

# Fenster offen halten (am Ende):
turtle.done()
```