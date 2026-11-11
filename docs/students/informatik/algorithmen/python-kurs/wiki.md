---
title: "Python-Wiki – Cheat Sheet"
description: "Schnelle Übersicht aller wichtigen Python-Befehle, Regeln und Funktionen aus dem Python-Kurs."
---

# 📖 Python-Wiki – Cheat Sheet

Eine schnelle Übersicht aller wichtigen Befehle und Regeln aus dem [Python-Kurs](./). Jedes Thema wird dort ausführlich erklärt – hier kannst du schnell nachschlagen.

## 📚 Algorithmus-Grundlagen

:::info Definition: Algorithmus
Ein Algorithmus ist eine Handlungsanweisung zum Lösen einer Aufgabe bzw. einer Menge von Aufgaben.
:::

### Eigenschaften von Algorithmen
- **Ausführbarkeit**: Der Algorithmus sollte fehlerfrei ausführbar sein
- **Endlichkeit**: Der Algorithmus hat endliche Länge
- **Wiederholbarkeit**: Bei gleichen Eingaben gleiche Ausgaben
- **Eindeutigkeit**: Für jeden Schritt gibt es genau einen Folgeschritt

## 📊 Variablen & Behältermodell

Variablen sind **Behälter für Werte**, aus denen man etwas herausnehmen und hineinlegen kann.

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

### Casting (Umwandlung)
```python
# String zu Zahl
alter = int(input("Alter: "))        # zu Integer
groesse = float(input("Größe: "))    # zu Float

# Zahl zu String
nachricht = "Ich bin " + str(25) + " Jahre alt"
```

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

💡 Alles zu `%` mit vielen Beispielen: [Modulo](./einsteiger/modulo) · [🌀 Modulo-Visualizer](./einsteiger/modulo-visualizer)

## ✅ Bedingungen & Verzweigungen

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

### If-Strukturen

```python
# Einfache Bedingung
if bedingung:
    # Wird ausgeführt wenn wahr
    print("Wahr!")
else:
    # Wird ausgeführt wenn falsch
    print("Falsch!")

# Mehrfache Bedingungen
if x < 0:
    print("Negativ")
elif x == 0:
    print("Null")
else:
    print("Positiv")
```

## 🔄 Schleifen

### For-Schleife (bestimmte Anzahl)

```python
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 8):       # 2, 3, 4, 5, 6, 7
    print(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8 (Schrittweite 2)
    print(i)
```

:::details Range-Varianten
- `range(5)`: 0 bis 4
- `range(2, 8)`: 2 bis 7
- `range(0, 10, 2)`: 0, 2, 4, 6, 8 (Schritte von 2)
:::

### While-Schleife (solange Bedingung wahr)

```python
x = 0
while x < 5:
    print(x)
    x = x + 1
```

:::warning Wichtig
- Immer Doppelpunkt nach Bedingung/Schleife: `:`
- Inhalt muss eingerückt sein (Tabulator-Taste)
- Bei while-Schleifen: Variable ändern, sonst Endlosschleife!
:::

## 💬 Benutzereingaben

| Befehl | Was passiert | Beispiel |
|--------|--------------|----------|
| `input("text")` | Benutzer gibt Text ein | `name = input("Dein Name: ")` |
| `int(input())` | Eingabe zu Zahl umwandeln | `alter = int(input("Alter: "))` |
| `float(input())` | Eingabe zu Kommazahl | `groesse = float(input("Größe: "))` |

:::danger Wichtiger Hinweis
`input()` gibt **immer** einen String zurück! Für Rechnungen musst du casten:
```python
# Falsch:
alter = input("Alter: ")  # String!

# Richtig:
alter = int(input("Alter: "))  # Integer!
```
:::

## ⚙️ Funktionen

### Einfache Funktion

```python
def meine_funktion():
    print("Hallo!")
    print("Ich bin eine Funktion.")

# Aufrufen:
meine_funktion()
```

### Funktion mit Parametern

```python
def begruessen(name):
    for i in range(3):
        print("Hallo", name)

# Aufrufen:
begruessen("Max")
```

### Funktion mit mehreren Parametern

```python
def rechteck_ausgeben(breite, hoehe):
    print("Breite:", breite)
    print("Höhe:", hoehe)
    print("Fläche:", breite * hoehe)

# Aufrufen:
rechteck_ausgeben(80, 40)
```

### Funktion mit Rückgabe

```python
def addieren(a, b):
    ergebnis = a + b
    return ergebnis

# Verwenden:
summe = addieren(5, 3)
print(summe)
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
| **Einrückung vergessen** | `    print(x)` | `print(x)` |
| **= statt ==** | `if x == 5:` | `if x = 5:` |
| **String + Zahl** | `"Alter: " + str(15)` | `"Alter: " + 15` |
| **Groß-/Kleinschreibung** | `True` | `true` |
| **Variable vor Zuweisung** | `x = 5` dann `print(x)` | `print(x)` dann `x = 5` |

## 🎯 Nützliche Tricks

### String-Formatierung

```python
name = "Max"
alter = 15
print(f"Hallo {name}, du bist {alter} Jahre alt!")
```

### Listen

```python
zahlen = [1, 2, 3, 4, 5]
farben = ["red", "blue", "green"]

# Erstes Element: liste[0]
erste_zahl = zahlen[0]  # = 1

# Durch Liste gehen:
for farbe in farben:
    print(farbe)
```

## 🔧 Debugging-Tipps

1. **Print-Debugging**: Verwende `print()` um Variablenwerte zu prüfen
```python
x = 10
print(f"x hat den Wert: {x}")
```

2. **Schritt für Schritt**: Teste kleine Teile einzeln

3. **Kommentare nutzen**: Erkläre schwierige Stellen
```python
# Hier werden die Zahlen von 1 bis 10 aufsummiert
summe = 0
for i in range(1, 11):
    summe = summe + i
```

4. **Häufige Probleme**:
   - Vergessene Doppelpunkte
   - Falsche Einrückung
   - `=` statt `==`
   - Endlosschleifen bei while

## 📋 Projekt-Planungstipps

1. **Plane zuerst**: Überlege dir den Ablauf, bevor du codest
2. **Kleine Schritte**: Programmiere in kleinen, testbaren Abschnitten
3. **Teste häufig**: Führe dein Programm regelmäßig aus
4. **Kommentiere**: Erkläre schwierige Stellen im Code
5. **Frage um Hilfe**: Bei Problemen nicht zu lange alleine kämpfen

## 🏆 Bewertungskriterien

Bei Projekten wird bewertet:
- **Funktionalität**: Läuft das Programm fehlerfrei?
- **Code-Qualität**: Saubere Struktur und Kommentare?
- **Konzept-Verwendung**: Sinnvoller Einsatz von Funktionen, Schleifen, etc.?
- **Kreativität**: Eigene Ideen und Erweiterungen
- **Problemlösung**: Wie werden Herausforderungen gelöst?
