---
title: "Komplexität & O-Notation"
description: "Wie man abschätzt, wie schnell ein Algorithmus mit wachsender Eingabe langsamer wird."
---

## Ziele
- Operationen in Abhängigkeit von der Eingabegröße `n` zählen
- Die wichtigsten Komplexitätsklassen kennen
- Zwei Algorithmen anhand ihrer Laufzeit vergleichen

## Die Idee

Nicht die Sekunden auf *deinem* Rechner zählen, sondern: **Wie viele Schritte** braucht ein
Algorithmus, wenn die Eingabe `n` groß wird? Das beschreibt die **O-Notation** (sprich: „O von n").

## Die wichtigsten Klassen

| Notation | Name | Beispiel |
|----------|------|----------|
| `O(1)` | konstant | auf `liste[5]` zugreifen |
| `O(log n)` | logarithmisch | binäre Suche |
| `O(n)` | linear | lineare Suche, Summe einer Liste |
| `O(n log n)` | – | gute Sortierverfahren |
| `O(n²)` | quadratisch | Bubblesort, alle Paare vergleichen |
| `O(2ⁿ)` | exponentiell | naive rekursive Fibonacci |

## Schritte zählen

<PyRunner>

```python
liste = list(range(1000))

# O(1): eine Operation, egal wie groß die Liste
print(liste[500])

# O(n): eine Schleife über alle Elemente
summe = 0
for x in liste:
    summe += x
print(summe)
```

</PyRunner>

Eine Schleife **in** einer Schleife über dieselben `n` Elemente ergibt `O(n²)`:

<PyRunner>

```python
liste = [3, 1, 4, 1, 5, 9]
paare = 0
for a in liste:
    for b in liste:
        paare += 1
print("Vergleiche:", paare, "= 6 * 6")
```

</PyRunner>

## Best, Average, Worst Case

Die Laufzeit hängt oft von der konkreten Eingabe ab:

- **Best Case** – günstigster Fall (z. B. gesuchtes Element ganz vorn)
- **Average Case** – durchschnittlich
- **Worst Case** – ungünstigster Fall (Element fehlt / steht ganz hinten)

Meist interessiert der **Worst Case** – man will wissen, wie schlimm es maximal wird.

## Messen statt schätzen

<PyRunner>

```python
import time

def summe(n):
    s = 0
    for i in range(n):
        s += i
    return s

for n in [100_000, 1_000_000, 10_000_000]:
    start = time.time()
    summe(n)
    print(f"n = {n:>10}: {time.time() - start:.3f} s")
```

</PyRunner>

:::details Erklärung
Verzehnfachst du `n`, verzehnfacht sich ungefähr die Zeit – typisch für `O(n)`. Bei `O(n²)` würde
sie sich *verhundertfachen*.
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Klassen zuordnen
Gib für jeden Codeblock die O-Klasse an (nur überlegen):
1. eine einzelne Zuweisung
2. eine Schleife `for i in range(n)`
3. zwei verschachtelte Schleifen über `n`
4. eine Schleife, die `n` jedes Mal halbiert

:::details Tipp
4. „halbieren bis 1" → wie oft geht das? Das ist der Logarithmus.
:::

### Aufgabe 2: Doppelte finden
Dieser Code prüft, ob eine Liste doppelte Werte enthält. Welche O-Klasse hat er? Miss die Zeit für
wachsende Listen.

<PyRunner>

```python
import time

def hat_doppelte(liste):
    for i in range(len(liste)):
        for j in range(i + 1, len(liste)):
            if liste[i] == liste[j]:
                return True
    return False

for n in [1000, 2000, 4000]:
    daten = list(range(n))
    start = time.time()
    hat_doppelte(daten)
    print(n, f"{time.time() - start:.3f} s")
```

</PyRunner>
