---
title: "Methoden"
description: "Eingebaute Werkzeuge für Strings und Listen – und Zufallszahlen mit dem Modul random."
---

## Ziele
- Den Unterschied zwischen Funktion und Methode kennen
- Wichtige String- und Listen-Methoden anwenden
- Mit `random` Zufallswerte erzeugen

<SilentTeacherButton kapitel="methoden" />

## Funktion oder Methode?

Eine **Funktion** rufst du direkt auf: `len(farben)`, `print("Hi")`.

Eine **Methode** gehört zu einem bestimmten Wert und wird mit einem Punkt aufgerufen:
`objekt.methode(...)`. Welche Methoden es gibt, hängt vom Datentyp ab.

<PyRunner>

```python
kurs = "Python-Grundlagen"
print(kurs.upper())
print(kurs.replace("Grundlagen", "Kurs"))
print(kurs.split("-"))
```

</PyRunner>

## String-Methoden

| Methode | Wirkung |
|---------|---------|
| `.upper()` / `.lower()` | in Groß- bzw. Kleinbuchstaben |
| `.strip()` | Leerzeichen am Rand entfernen |
| `.replace(alt, neu)` | alle Vorkommen ersetzen |
| `.split(trenner)` | Text an `trenner` in eine Liste zerlegen |
| `.count(teil)` | zählt, wie oft `teil` vorkommt |
| `.find(teil)` | Index des ersten Vorkommens (oder `-1`) |

<PyRunner>

```python
satz = "  Der schnelle Fuchs  "
sauber = satz.strip()
print(sauber.count("e"))
print(sauber.split(" "))
```

</PyRunner>

## Listen-Methoden

| Methode | Wirkung |
|---------|---------|
| `.append(x)` | `x` hinten anhängen |
| `.insert(i, x)` | `x` an Position `i` einfügen |
| `.pop(i)` | Element an `i` entfernen **und** zurückgeben |
| `.remove(x)` | erstes Vorkommen von `x` löschen |
| `.index(x)` | Index von `x` |
| `.count(x)` | Anzahl von `x` |
| `.sort()` | Liste sortieren (verändert die Liste) |

<PyRunner>

```python
zahlen = [4, 1, 8, 1]
zahlen.append(6)
zahlen.sort()
print(zahlen)
print(zahlen.count(1))
print(zahlen.pop(0), "entfernt →", zahlen)
```

</PyRunner>

:::details Erklärung
`.sort()` gibt **nichts** zurück, sondern ändert `zahlen` direkt. `print(zahlen.sort())` würde
`None` ausgeben – ein häufiger Stolperstein.
:::

## Zufall mit `random`

Zuerst `import random`, dann stehen u. a. zur Verfügung:

<PyRunner>

```python
import random

print(random.randint(1, 6))            # ganze Zahl 1..6
print(random.choice(["Kopf", "Zahl"])) # zufälliges Listenelement
print(round(random.random(), 3))       # Kommazahl 0 <= x < 1
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Komplimente-Automat
Zwei Listen (Adjektive, Nomen) stehen bereit. Gib mit `random.choice` einen Satz aus:
„Du bist der/die *Adjektiv* *Nomen*".

<PyRunner>

```python
import random
adjektive = ["großartige", "geniale", "beste", "coolste"]
nomen = ["Mensch", "Programmiererin", "Person", "Legende"]
# dein Code
```

</PyRunner>

### Aufgabe 2: Buchstaben zählen
`text = "Programmieren macht Spaß"`. Gib aus, wie oft `"r"` vorkommt und an welcher Stelle das
erste `"m"` steht.

<PyRunner>

```python
text = "Programmieren macht Spaß"
# dein Code
```

</PyRunner>

### Aufgabe 3: Top 3
Sortiere die Liste `punkte = [42, 7, 99, 13, 60]` und gib die drei größten Werte aus.

<PyRunner>

```python
punkte = [42, 7, 99, 13, 60]
# dein Code
```

</PyRunner>

:::details Tipp
Nach `punkte.sort()` stehen die größten Werte am Ende – mit Slicing `punkte[-3:]` bekommst du sie.
:::
