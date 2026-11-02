---
title: "Effizienz & Komplexität"
description: "Wie man abschätzt, wie viel Zeit und Speicher ein Algorithmus mit wachsender Eingabe braucht – mit der O-Notation."
---

## Ziele
- Operationen in Abhängigkeit von der Eingabegröße `n` zählen
- Die wichtigsten Komplexitätsklassen kennen
- Zwei Algorithmen anhand ihrer Laufzeit vergleichen
- Die **Speicherkomplexität** eines Algorithmus abschätzen

<SilentTeacherButton kapitel="komplexitaet" />

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

## Speicherkomplexität

Nicht nur die Zeit zählt, sondern auch der **Speicher**: Wie viel **zusätzlichen** Speicher braucht
ein Algorithmus – neben der Eingabe selbst? Auch das beschreibt man mit der O-Notation:

- `O(1)` – nur ein paar Hilfsvariablen, egal wie groß die Eingabe ist (**in-place**)
- `O(n)` – zusätzlicher Speicher wächst mit der Eingabe, z. B. eine neue Liste

Beispiel: Eine Liste umdrehen – einmal mit neuer Liste, einmal in-place:

<PyRunner>

```python
def umdrehen_neu(liste):
    ergebnis = []                 # neue Liste: O(n) Speicher
    for x in liste:
        ergebnis.insert(0, x)
    return ergebnis

def umdrehen_inplace(liste):
    links, rechts = 0, len(liste) - 1   # nur zwei Variablen: O(1) Speicher
    while links < rechts:
        liste[links], liste[rechts] = liste[rechts], liste[links]
        links += 1
        rechts -= 1
    return liste

print(umdrehen_neu([1, 2, 3, 4, 5]))
print(umdrehen_inplace([1, 2, 3, 4, 5]))
```

</PyRunner>

:::details Erklärung
Beide liefern `[5, 4, 3, 2, 1]`. `umdrehen_neu` legt eine zweite Liste mit `n` Elementen an.
`umdrehen_inplace` tauscht nur innerhalb der vorhandenen Liste und braucht unabhängig von `n` bloß
zwei Zahlen. Übrigens: `umdrehen_neu` ist wegen `insert(0, ...)` auch zeitlich schlechter –
`O(n²)`, weil bei jedem Einfügen alle Elemente nach rechts rücken.
:::

### Versteckter Speicher: Rekursion

Auch **Rekursion** kostet Speicher: Jeder Aufruf, der noch nicht fertig ist, wird auf dem
**Aufrufstapel** (*call stack*) gemerkt. Die Speicherkomplexität hängt also von der **Rekursionstiefe**
ab:

<PyRunner>

```python
def summe_rekursiv(n):
    if n == 0:
        return 0
    return n + summe_rekursiv(n - 1)    # Tiefe n -> O(n) Speicher

def summe_iterativ(n):
    s = 0
    for i in range(n + 1):              # O(1) Speicher
        s += i
    return s

print(summe_iterativ(100_000))
print(summe_rekursiv(500))
try:
    print(summe_rekursiv(100_000))
except RecursionError:
    print("RecursionError: Rekursion zu tief!")
```

</PyRunner>

:::details Erklärung
`summe_rekursiv(100_000)` müsste 100 000 Aufrufe gleichzeitig offen halten. Python begrenzt die
Tiefe (standardmäßig etwa 1000) und bricht mit einem `RecursionError` ab. Die iterative Version
kommt mit einer einzigen Variablen `s` aus. Bei der [binären Suche](./binaere-suche) ist die
rekursive Tiefe dagegen nur `O(log n)` – das ist unproblematisch.
:::

::: tip Zeit gegen Speicher
Oft kann man Zeit sparen, indem man mehr Speicher nutzt – und umgekehrt. Mergesort ist zum Beispiel
schneller als Bubblesort, braucht aber `O(n)` zusätzlichen Speicher.
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

### Aufgabe 3: Speicher abschätzen
Gib für jede Funktion die **Speicherkomplexität** an (zusätzlicher Speicher, nur überlegen):

<PyRunner>

```python
def maximum(liste):
    m = liste[0]
    for x in liste:
        if x > m:
            m = x
    return m

def quadrate(liste):
    return [x * x for x in liste]

def countdown(n):
    if n == 0:
        return
    countdown(n - 1)

print(maximum([3, 8, 2]), quadrate([1, 2, 3]))
```

</PyRunner>

:::details Lösung
`maximum`: `O(1)` – nur die Variable `m`. `quadrate`: `O(n)` – eine neue Liste mit `n` Elementen.
`countdown`: `O(n)` – die Rekursion wird `n` Aufrufe tief.
:::
