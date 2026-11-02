---
title: "Datentypen"
description: "Zahlen, Text, Wahrheitswerte und Sammlungen: die Datentypen von Python und was man mit ihnen machen kann."
---

## Ziele
- Die wichtigsten Datentypen unterscheiden
- Den Datentyp eines Werts mit `type()` bestimmen
- Werte gezielt umwandeln
- Auf einzelne Zeichen und Listenelemente zugreifen

<SilentTeacherButton kapitel="datentypen" />

## Was ist ein Datentyp?

Jeder Wert in Python hat einen **Datentyp**. Der Datentyp legt fest, *welche Werte* möglich sind und
*welche Rechenoperationen* erlaubt sind. Mit `2 + 3` kann Python etwas anfangen, mit
`"Apfel" - "l"` nicht.

## Die einfachen Datentypen

| Datentyp | Bedeutung | Beispiele |
|----------|-----------|-----------|
| `int` | ganze Zahl | `-3`, `0`, `42` |
| `float` | Kommazahl | `-9.3`, `0.5`, `3.0` |
| `str` | Text (*string*) | `"hallo"`, `'A'`, `""` |
| `bool` | Wahrheitswert | `True`, `False` |
| `NoneType` | „nichts" | `None` |

Mit `type()` fragst du den Datentyp ab:

<PyRunner>

```python
print(type(42))
print(type(3.0))
print(type("hallo"))
print(type(True))
```

</PyRunner>

:::details Erklärung
`type(42)` liefert `<class 'int'>`. Beachte den Unterschied zwischen `3` (int) und `3.0` (float):
Sobald ein Punkt im Spiel ist, rechnet Python mit Kommazahlen. Auch `10 / 2` ergibt `5.0`, nicht `5`.
:::

## Datentypen umwandeln

Die Namen der Datentypen sind gleichzeitig **Umwandlungsfunktionen**:

<PyRunner>

```python
text = "17"
zahl = int(text)      # aus dem Text "17" wird die Zahl 17
print(zahl + 3)

print(float("2.5") * 2)
print(str(100) + " Punkte")
```

</PyRunner>

:::danger Häufiger Fehler
`int("3.5")` stürzt ab – Python wandelt nur „saubere" ganze Zahlen um. Nimm den Umweg
`int(float("3.5"))`, wenn du die Nachkommastellen abschneiden willst.
:::

## Sammlungen: Strings, Listen und Tupel

Diese Datentypen enthalten **mehrere Elemente in einer festen Reihenfolge**.

| Datentyp | Schreibweise | veränderbar? |
|----------|--------------|--------------|
| `str` | `"Apfel"` | nein |
| `list` | `["Apfel", "Banane", "Kirsche"]` | ja |
| `tuple` | `("x", "y")` | nein (z. B. für Koordinaten) |

Auf einzelne Elemente greifst du über ihren **Index** zu. Gezählt wird ab `0`:

<PyRunner>

```python
wort = "Python"
print(wort[0])     # erstes Zeichen
print(wort[-1])    # letztes Zeichen
print(wort[0:3])   # Zeichen 0, 1, 2

farben = ["rot", "grün", "blau"]
print(farben[1])
farben[1] = "gelb"   # bei Listen erlaubt
print(farben)
print(len(farben))   # Anzahl der Elemente
```

</PyRunner>

:::details Erklärung
`wort[0:3]` heißt „ab Index 0 bis **vor** Index 3", also die Zeichen 0, 1 und 2. Das nennt man
*Slicing*. `wort[1] = "x"` würde abstürzen, weil Strings nicht veränderbar sind – bei der Liste
`farben` geht es dagegen.
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Typen raten
Sag für jede Zeile voraus, was `type(...)` ausgibt. Prüfe dann mit dem Code-Fenster.

<PyRunner>

```python
print(type(5 + 5))
print(type(5 / 5))
print(type("5" + "5"))
print(type(5 == 5))
```

</PyRunner>

:::details Tipp
Achte auf `/` (macht immer eine Kommazahl) und auf die Anführungszeichen bei `"5"`.
:::

### Aufgabe 2: Buchstabensalat
Gegeben ist `name = "Informatik"`. Gib nur mit Slicing aus: das erste Zeichen, das letzte Zeichen
und die ersten vier Zeichen.

<PyRunner>

```python
name = "Informatik"
# dein Code
```

</PyRunner>

### Aufgabe 3: Liste umbauen
Lege eine Liste mit drei Lieblingsgerichten an. Ersetze das mittlere durch ein anderes und gib die
Anzahl der Elemente aus.

<PyRunner>

```python
gerichte = ["Pizza", "Pasta", "Pommes"]
# dein Code
```

</PyRunner>

:::details Tipp
Zugriff über den Index: `gerichte[1] = "..."`. Anzahl mit `len(gerichte)`.
:::
