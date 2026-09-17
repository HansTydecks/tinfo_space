---
title: "Funktionen"
description: "Eigene Bausteine schreiben: Funktionen mit Parametern und Rückgabewert."
---

## Ziele
- Eine Funktion mit `def` definieren und aufrufen
- Parameter übergeben
- Ergebnisse mit `return` zurückgeben

<SilentTeacherButton kapitel="funktionen" />

## Von „benutzen" zu „schreiben"

`print()`, `len()`, `.upper()` hast du schon benutzt (siehe
[Methoden](../grundlagen/methoden)). Jetzt schreibst du **eigene** Funktionen – für Code, den du
öfter brauchst.

## Definition und Aufruf

<PyRunner>

```python
def begruessung():
    print("Hallo!")
    print("Schön, dass du da bist.")

begruessung()
begruessung()
```

</PyRunner>

:::details Erklärung
`def begruessung():` definiert die Funktion – der eingerückte Block wird **noch nicht** ausgeführt.
Erst der Aufruf `begruessung()` startet ihn. Danach kannst du ihn beliebig oft aufrufen.
:::

## Parameter: Werte hineingeben

<PyRunner>

```python
def begruesse(name):
    print(f"Hallo {name}!")

begruesse("Mia")
begruesse("Tom")
```

</PyRunner>

## return: ein Ergebnis herausgeben

Eine Funktion mit `return` liefert einen Wert zurück, mit dem du weiterrechnen kannst:

<PyRunner>

```python
def quadrat(x):
    return x * x

ergebnis = quadrat(5)
print(ergebnis)
print(quadrat(3) + quadrat(4))
```

</PyRunner>

:::danger print ist nicht return
`print` zeigt etwas an, `return` gibt einen Wert zurück. Nur mit `return` kannst du
`quadrat(3) + quadrat(4)` rechnen. Nach `return` endet die Funktion sofort.
:::

## Mehrere Parameter

<PyRunner>

```python
def rechteck_flaeche(breite, hoehe):
    return breite * hoehe

print(rechteck_flaeche(8, 3))
print(rechteck_flaeche(5, 5))
```

</PyRunner>

## Lokale Variablen

Variablen, die **in** einer Funktion angelegt werden, gibt es auch nur dort:

<PyRunner>

```python
def verdopple(zahl):
    doppelt = zahl * 2
    return doppelt

print(verdopple(21))
# print(doppelt)  # -> Fehler: außerhalb nicht bekannt
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Fahrenheit
Schreibe `celsius_zu_fahrenheit(c)` mit der Formel `c * 9 / 5 + 32` und teste mit 0, 20 und 37.

<PyRunner>

```python
def celsius_zu_fahrenheit(c):
    # return ...
    pass

print(celsius_zu_fahrenheit(20))
```

</PyRunner>

### Aufgabe 2: Fakultät als Funktion
Packe deine Fakultätsberechnung aus dem Schleifen-Kapitel in eine Funktion `fakultaet(n)`, die das
Ergebnis **zurückgibt**.

<PyRunner>

```python
def fakultaet(n):
    ergebnis = 1
    # for-Schleife
    return ergebnis

print(fakultaet(5))
```

</PyRunner>

### Aufgabe 3: Maximum von zwei Zahlen
Schreibe `groesser(a, b)`, das die größere der beiden Zahlen zurückgibt – ohne `max()`.

<PyRunner>

```python
def groesser(a, b):
    # if / else mit return
    pass

print(groesser(17, 42))
```

</PyRunner>

:::details Tipp
`if a > b: return a` – sonst `return b`.
:::
