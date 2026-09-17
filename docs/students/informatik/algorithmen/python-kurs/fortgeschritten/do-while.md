---
title: "do-while & try/except"
description: "Schleifen, die mindestens einmal laufen, und wie man Abstürze bei falschen Eingaben abfängt."
---

## Ziele
- Eine „fußgesteuerte" Schleife in Python nachbauen
- Falsche Eingaben mit `try` / `except` abfangen
- Eine Eingabe so lange wiederholen, bis sie gültig ist

<SilentTeacherButton kapitel="do-while" />

## Python hat kein do-while

Die `while`-Schleife prüft die Bedingung **vorher** (kopfgesteuert) – sie läuft also evtl. gar nicht.
Manchmal will man aber, dass ein Block **mindestens einmal** ausgeführt wird. Das baut man mit
`while True` und `break` nach:

<PyRunner stdin="0\n0\n7">

```python
while True:
    zahl = int(input("Zahl zwischen 1 und 10: "))
    if 1 <= zahl <= 10:
        break
    print("Ungültig, nochmal.")

print("Danke:", zahl)
```

</PyRunner>

:::details Erklärung
`while True` läuft „ewig", bis ein `break` kommt. Der Block wird garantiert **einmal** ausgeführt,
bevor die Bedingung (`1 <= zahl <= 10`) geprüft wird. Genau das leistet ein do-while.
:::

## Abstürze abfangen mit try/except

`int("acht")` löst einen `ValueError` aus und beendet das Programm. Mit `try` / `except` fängst du
das ab:

<PyRunner stdin="acht\n42">

```python
while True:
    try:
        zahl = int(input("Gib eine ganze Zahl ein: "))
        break
    except ValueError:
        print("Das war keine ganze Zahl. Versuch es nochmal.")

print("Quadrat:", zahl ** 2)
```

</PyRunner>

:::details Erklärung
Python führt den `try`-Block aus. Tritt darin ein `ValueError` auf, springt es sofort in den
`except`-Block – ohne Absturz. Sonst wird `except` übersprungen.
:::

## Kombiniert: robuste Fakultät

<PyRunner stdin="-2\nfünf\n5">

```python
def fakultaet(n):
    ergebnis = 1
    for i in range(2, n + 1):
        ergebnis *= i
    return ergebnis

while True:
    try:
        n = int(input("n (>= 0): "))
        if n < 0:
            print("Bitte keine negative Zahl.")
            continue
        break
    except ValueError:
        print("Bitte eine ganze Zahl.")

print(f"{n}! = {fakultaet(n)}")
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Passwort
Frage so lange nach einem Passwort, bis der Nutzer `"geheim"` eingibt. Dann „Zugang gewährt".

<PyRunner stdin="test\nhallo\ngeheim">

```python
# while True + break
```

</PyRunner>

### Aufgabe 2: Nur Kommazahlen
Lies eine Kommazahl ein. Bei ungültiger Eingabe eine Meldung und erneut fragen.

<PyRunner stdin="x\n3,5\n3.5">

```python
# try / except ValueError
```

</PyRunner>

:::details Tipp
Achtung: Python erwartet einen Punkt (`3.5`), kein Komma. `float("3,5")` schlägt fehl – genau das
soll die Aufgabe zeigen.
:::

### Aufgabe 3: Menü
Zeige ein Menü (1–3) und wiederhole die Frage, bis eine gültige Zahl kommt. Gib die Auswahl aus.

<PyRunner stdin="9\n0\n2">

```python
# dein Code
```

</PyRunner>
