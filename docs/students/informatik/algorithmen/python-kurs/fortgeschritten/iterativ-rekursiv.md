---
title: "Iterativ & rekursiv"
description: "Zwei Wege zum selben Ziel: Wiederholung mit einer Schleife oder eine Funktion, die sich selbst aufruft."
---

## Ziele
- Iterative und rekursive Lösungen unterscheiden
- Basisfall und Rekursionsfall benennen
- Den Aufrufstapel und die Rekursionstiefe verstehen

<SilentTeacherButton kapitel="iterativ-rekursiv" />

## Zwei Denkweisen

**Iterativ** heißt: Ein Codeblock wird mit einer **Schleife** wiederholt, bis eine Bedingung erreicht
ist. Der Zwischenstand steckt in Variablen.

**Rekursiv** heißt: Eine Funktion **ruft sich selbst** auf – mit einem kleineren Teilproblem – bis
ein einfachster Fall erreicht ist (der **Basisfall**). Dann lösen sich die Aufrufe rückwärts auf.

## Beispiel: Summe von 1 bis n

Iterativ:

<PyRunner>

```python
def summe_iterativ(n):
    ergebnis = 0
    for i in range(1, n + 1):
        ergebnis += i
    return ergebnis

print(summe_iterativ(5))
```

</PyRunner>

Rekursiv:

<PyRunner>

```python
def summe_rekursiv(n):
    if n == 0:          # Basisfall
        return 0
    return n + summe_rekursiv(n - 1)   # Rekursionsfall

print(summe_rekursiv(5))
```

</PyRunner>

:::details Wie läuft die Rekursion ab?
```
summe_rekursiv(3)
= 3 + summe_rekursiv(2)
= 3 + (2 + summe_rekursiv(1))
= 3 + (2 + (1 + summe_rekursiv(0)))
= 3 + (2 + (1 + 0))
= 6
```
Jeder Aufruf wartet auf das Ergebnis des nächsten. Diese wartenden Aufrufe liegen auf dem
**Aufrufstapel**. Ohne Basisfall würde der Stapel überlaufen (`RecursionError`).
:::

## Fakultät – beide Varianten

<PyRunner>

```python
def fak_iterativ(n):
    e = 1
    for i in range(2, n + 1):
        e *= i
    return e

def fak_rekursiv(n):
    if n <= 1:
        return 1
    return n * fak_rekursiv(n - 1)

print(fak_iterativ(6), fak_rekursiv(6))
```

</PyRunner>

## Wann was?

| | iterativ | rekursiv |
|---|---|---|
| Speicher | konstant | wächst mit der Tiefe (Aufrufstapel) |
| große `n` | gut geeignet | kann überlaufen |
| Baum-/Teilprobleme | umständlich | oft die natürliche Lösung |

Rekursion glänzt bei baumartigen Strukturen – z. B. beim Aufdecken im
[Minesweeper-Projekt](../komplexe-aufgaben/minesweeper).

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Potenz rekursiv
Schreibe `potenz(basis, exponent)` rekursiv: `basis ** exponent` ohne den `**`-Operator.

<PyRunner>

```python
def potenz(basis, exponent):
    # Basisfall: exponent == 0 -> 1
    pass

print(potenz(2, 10))
```

</PyRunner>

:::details Tipp
`potenz(b, e) = b * potenz(b, e - 1)`, und `potenz(b, 0) = 1`.
:::

### Aufgabe 2: String umkehren rekursiv
Kehre einen String um, ohne `[::-1]`.

<PyRunner>

```python
def umkehren(text):
    if text == "":
        return ""
    # letztes Zeichen + Rest umgekehrt
    pass

print(umkehren("Rekursion"))
```

</PyRunner>

### Aufgabe 3: Vergleich
Berechne `summe_rekursiv(1000)`. Erhöhe schrittweise (2000, 5000 …), bis ein `RecursionError` kommt.
Notiere, ab wann. Die iterative Version schafft auch `1_000_000` mühelos – probiere es.

<PyRunner>

```python
def summe_rekursiv(n):
    if n == 0:
        return 0
    return n + summe_rekursiv(n - 1)

print(summe_rekursiv(1000))
```

</PyRunner>
