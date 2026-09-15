---
title: "Primzahlen & GGT"
description: "Teilbarkeit mit dem Modulo-Operator: Primzahltest und der euklidische Algorithmus für den größten gemeinsamen Teiler."
---

## Ziele
- Teilbarkeit mit `%` prüfen
- Einen Primzahltest schreiben und ihn beschleunigen
- Den euklidischen Algorithmus (GGT) iterativ und rekursiv umsetzen

## Teilbarkeit

`a % b == 0` bedeutet: `a` ist ohne Rest durch `b` teilbar.

<PyRunner>

```python
for t in range(1, 13):
    if 12 % t == 0:
        print(t, "teilt 12")
```

</PyRunner>

## Primzahltest – naiv

Eine **Primzahl** ist eine ganze Zahl ≥ 2, die nur durch 1 und sich selbst teilbar ist.

<PyRunner>

```python
def ist_prim(n):
    if n < 2:
        return False
    for t in range(2, n):
        if n % t == 0:
            return False      # Teiler gefunden -> nicht prim
    return True

for z in range(2, 30):
    if ist_prim(z):
        print(z, end=" ")
```

</PyRunner>

## Primzahltest – schneller

Man muss nur bis zur **Wurzel** von `n` testen: Hat `n` einen Teiler größer als √n, gibt es auch
einen kleineren.

<PyRunner>

```python
def ist_prim(n):
    if n < 2:
        return False
    t = 2
    while t * t <= n:         # t <= Wurzel(n)
        if n % t == 0:
            return False
        t += 1
    return True

import time
start = time.time()
print(ist_prim(1_000_003))
print(f"{time.time() - start:.4f} s")
```

</PyRunner>

:::details Komplexität
Der naive Test ist `O(n)`, der mit der Wurzel-Grenze `O(√n)`. Für `n = 1.000.003` sind das statt
einer Million nur etwa 1000 Schritte.
:::

## Größter gemeinsamer Teiler (euklidischer Algorithmus)

Der GGT von `a` und `b`: Teile `a` durch `b`, nimm den **Rest**, mache mit `b` und dem Rest weiter –
bis der Rest 0 ist.

<PyRunner>

```python
def ggt(a, b):
    while b != 0:
        a, b = b, a % b
    return a

print(ggt(48, 18))   # 6
print(ggt(1071, 462))
```

</PyRunner>

:::details Erklärung
`a, b = b, a % b` weist beiden Variablen **gleichzeitig** neue Werte zu. Für `ggt(48, 18)`:
`(48,18) → (18,12) → (12,6) → (6,0)` → Ergebnis `6`.
:::

Rekursiv ist es noch kürzer:

<PyRunner>

```python
def ggt(a, b):
    if b == 0:
        return a
    return ggt(b, a % b)

print(ggt(48, 18))
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Teileranzahl
Schreibe `anzahl_teiler(n)`, das zählt, wie viele Teiler `n` hat. Teste: eine Primzahl hat genau 2.

<PyRunner>

```python
def anzahl_teiler(n):
    # for t in range(1, n + 1): ...
    pass

print(anzahl_teiler(28))
```

</PyRunner>

### Aufgabe 2: Primzahlen zählen
Wie viele Primzahlen gibt es unter 1000? Nutze deinen schnellen `ist_prim`.

<PyRunner>

```python
def ist_prim(n):
    if n < 2:
        return False
    t = 2
    while t * t <= n:
        if n % t == 0:
            return False
        t += 1
    return True

# for ... zählen
```

</PyRunner>

### Aufgabe 3: Kleinstes gemeinsames Vielfaches
Das kgV lässt sich aus dem GGT berechnen: `kgv(a, b) = a * b // ggt(a, b)`. Schreibe `kgv(a, b)`.

<PyRunner>

```python
def ggt(a, b):
    while b != 0:
        a, b = b, a % b
    return a

def kgv(a, b):
    # return ...
    pass

print(kgv(4, 6))   # 12
```

</PyRunner>
