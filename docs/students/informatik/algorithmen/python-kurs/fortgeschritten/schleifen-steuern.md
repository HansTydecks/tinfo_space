---
title: "Schleifen steuern"
description: "Mit break, continue und pass den Ablauf einer Schleife gezielt beeinflussen."
---

## Ziele
- Eine Schleife vorzeitig verlassen (`break`)
- Einen Durchlauf überspringen (`continue`)
- `pass` als Platzhalter einsetzen

<SilentTeacherButton kapitel="schleifen-steuern" />

## break – raus aus der Schleife

`break` bricht die Schleife **sofort** ab:

<PyRunner>

```python
zahlen = [4, 8, 15, 16, 23, 42]

for z in zahlen:
    if z > 20:
        print("erste Zahl über 20:", z)
        break
    print("geprüft:", z)
```

</PyRunner>

:::details Erklärung
Sobald `z = 23` ist, wird `break` erreicht – die Schleife endet, `42` wird nicht mehr angeschaut.
Praktisch, wenn du nur das *erste* passende Element suchst.
:::

## continue – diesen Durchlauf überspringen

`continue` bricht **nur den aktuellen Durchlauf** ab und macht mit dem nächsten weiter:

<PyRunner>

```python
for i in range(1, 11):
    if i % 2 == 0:
        continue          # gerade Zahlen überspringen
    print(i)
```

</PyRunner>

## pass – nichts tun

`pass` ist ein Platzhalter für „hier kommt noch Code". Python verlangt in jedem Block mindestens eine
Anweisung:

<PyRunner>

```python
for i in range(3):
    if i == 1:
        pass              # später hier etwas ergänzen
    else:
        print(i)
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Erste durch 7 teilbare Zahl
Durchlaufe `range(50, 100)` und gib die erste Zahl aus, die durch 7 teilbar ist. Dann Schluss.

<PyRunner>

```python
# for ... if ... break
```

</PyRunner>

### Aufgabe 2: Nur positive summieren
Summiere aus der Liste nur die positiven Zahlen – negative mit `continue` überspringen.

<PyRunner>

```python
werte = [5, -3, 8, -1, 2, -7, 10]
summe = 0
# for + if + continue
print(summe)
```

</PyRunner>

### Aufgabe 3: Suchen mit Meldung
Suche in einer Liste einen bestimmten Namen. Gib „gefunden an Position i" oder – nach der Schleife –
„nicht gefunden" aus.

<PyRunner>

```python
namen = ["Ada", "Alan", "Grace", "Linus"]
gesucht = "Grace"
# for i in range(len(namen)): ... break
```

</PyRunner>

:::details Tipp
Setze eine Variable `gefunden = False`. In der Schleife bei Treffer `gefunden = True` und `break`.
Nach der Schleife `if not gefunden: ...`.
:::
