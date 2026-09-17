---
title: "Fibonacci"
description: "Dieselbe Zahlenfolge iterativ und rekursiv – und warum die eine Variante millionenfach langsamer ist."
---

## Ziele
- Die Fibonacci-Folge iterativ berechnen
- Die rekursive Definition umsetzen
- Den Laufzeitunterschied selbst messen

<SilentTeacherButton kapitel="fibonacci" />

## Die Folge

Jede Zahl ist die Summe der beiden vorherigen:

```
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...
```

Formal: `fib(0) = 0`, `fib(1) = 1`, `fib(n) = fib(n-1) + fib(n-2)`.

## Iterativ

Wir merken uns immer nur die **letzten zwei** Werte:

<PyRunner>

```python
def fib_iterativ(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

for i in range(15):
    print(fib_iterativ(i), end=" ")
```

</PyRunner>

## Rekursiv

Die Definition lässt sich fast wörtlich hinschreiben:

<PyRunner>

```python
def fib_rekursiv(n):
    if n < 2:
        return n
    return fib_rekursiv(n - 1) + fib_rekursiv(n - 2)

print(fib_rekursiv(10))
```

</PyRunner>

:::danger Diese Rekursion ist eine Falle
`fib_rekursiv(5)` ruft `fib_rekursiv(4)` und `fib_rekursiv(3)` auf – und `fib_rekursiv(4)` ruft
wieder `fib_rekursiv(3)` auf … Vieles wird **mehrfach** berechnet. Der Aufwand wächst exponentiell:
`O(2ⁿ)`.
:::

## Der Unterschied in Zahlen

<PyRunner>

```python
import time

def fib_iterativ(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

def fib_rekursiv(n):
    if n < 2:
        return n
    return fib_rekursiv(n - 1) + fib_rekursiv(n - 2)

for n in [10, 20, 30, 35]:
    start = time.time()
    fib_rekursiv(n)
    t_rek = time.time() - start
    start = time.time()
    fib_iterativ(n)
    t_it = time.time() - start
    print(f"n={n:>2}  rekursiv {t_rek:.4f}s   iterativ {t_it:.6f}s")
```

</PyRunner>

:::details Beobachtung
Ab etwa `n = 35` dauert die rekursive Version spürbar lange, die iterative bleibt sofort. Erhöhe `n`
für die rekursive Variante nur vorsichtig. Mehr dazu unter
[Komplexität](./komplexitaet) und [Iterativ & rekursiv](./iterativ-rekursiv).
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Fibonacci-Liste
Baue eine Liste mit den ersten `n` Fibonacci-Zahlen – iterativ, in **einer** Schleife.

<PyRunner>

```python
n = 20
folge = [0, 1]
# folge weiter füllen, bis len(folge) == n
print(folge)
```

</PyRunner>

### Aufgabe 2: Rekursion mit Zähler
Zähle mit einer globalen Variablen, wie oft `fib_rekursiv` für `n = 25` aufgerufen wird. Vergleiche
mit `n = 30`.

<PyRunner>

```python
aufrufe = 0

def fib_rekursiv(n):
    global aufrufe
    aufrufe += 1
    if n < 2:
        return n
    return fib_rekursiv(n - 1) + fib_rekursiv(n - 2)

fib_rekursiv(25)
print("Aufrufe:", aufrufe)
```

</PyRunner>

### Aufgabe 3: Goldener Schnitt
Der Quotient `fib(n+1) / fib(n)` nähert sich dem goldenen Schnitt (≈ 1,618). Gib die Quotienten für
`n = 1..15` aus.

<PyRunner>

```python
def fib_iterativ(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

# for n in range(1, 16): print(fib_iterativ(n + 1) / fib_iterativ(n))
```

</PyRunner>
