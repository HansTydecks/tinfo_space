---
title: "Quicksort & Mergesort"
description: "Schnell sortieren mit Teile-und-herrsche: Quicksort und Mergesort verstehen, programmieren und mit Bubblesort vergleichen."
---

## Ziele
- Das Prinzip **Teile und herrsche** erklären
- Quicksort und Mergesort rekursiv programmieren
- Vergleiche zählen und `O(n log n)` mit `O(n²)` vergleichen
- Wissen, was eine **stabile** Sortierung ist

::: tip Voraussetzung
Du kennst die einfachen Verfahren aus [Sortieren](./sortieren), [Rekursion](./iterativ-rekursiv) und
die [O-Notation](./komplexitaet).
:::

## Teile und herrsche

Bubblesort und Selectionsort brauchen `O(n²)` Schritte – bei 10 000 Elementen also rund 50 Millionen
Vergleiche. Schneller geht es mit dem Prinzip **Teile und herrsche** (*divide and conquer*):

1. **Teilen:** Zerlege das Problem in kleinere Teilprobleme.
2. **Herrschen:** Löse die Teilprobleme – meist **rekursiv** mit demselben Verfahren.
3. **Zusammensetzen:** Baue aus den Teillösungen die Gesamtlösung.

Eine Liste mit 0 oder 1 Element ist schon sortiert – das ist der **Rekursionsanker**.

## Quicksort

Idee: Wähle ein Element als **Pivot** (Drehpunkt). Verteile alle anderen Elemente auf drei Listen:
**kleiner**, **gleich** und **größer** als das Pivot. Sortiere „kleiner" und „größer" rekursiv und
hänge alles zusammen.

<PyRunner>

```python
def quicksort(liste):
    if len(liste) <= 1:
        return liste
    pivot = liste[0]
    kleiner = [x for x in liste if x < pivot]
    gleich  = [x for x in liste if x == pivot]
    groesser = [x for x in liste if x > pivot]
    return quicksort(kleiner) + gleich + quicksort(groesser)

print(quicksort([5, 2, 9, 1, 7, 3, 5]))
```

</PyRunner>

:::details Erklärung am Beispiel
`[5, 2, 9, 1, 7, 3, 5]` mit Pivot `5`:
- kleiner: `[2, 1, 3]` → rekursiv sortiert `[1, 2, 3]`
- gleich: `[5, 5]`
- größer: `[9, 7]` → rekursiv sortiert `[7, 9]`

Ergebnis: `[1, 2, 3] + [5, 5] + [7, 9]`. Diese einfache Version legt neue Listen an – sie ist also
nicht in-place, dafür aber gut verständlich.
:::

::: warning Schlechtes Pivot
Ist die Liste schon sortiert und nimmst du immer das erste Element als Pivot, ist „kleiner" jedes Mal
leer. Dann wird Quicksort zu `O(n²)`. Abhilfe: das Pivot zufällig wählen (`random.choice(liste)`).
Im Durchschnitt braucht Quicksort `O(n log n)`.
:::

## Mergesort

Idee: Teile die Liste in der **Mitte** in zwei Hälften, sortiere beide rekursiv und **verschmelze**
(*merge*) sie danach zu einer sortierten Liste.

Das Herzstück ist `merge`: Zwei bereits sortierte Listen werden zusammengeführt, indem man immer das
kleinere der beiden vordersten Elemente nimmt.

<PyRunner>

```python
def merge(links, rechts):
    ergebnis = []
    i = j = 0
    while i < len(links) and j < len(rechts):
        if links[i] <= rechts[j]:
            ergebnis.append(links[i])
            i += 1
        else:
            ergebnis.append(rechts[j])
            j += 1
    ergebnis += links[i:]      # Rest anhängen (eine der beiden ist leer)
    ergebnis += rechts[j:]
    return ergebnis

def mergesort(liste):
    if len(liste) <= 1:
        return liste
    mitte = len(liste) // 2
    links = mergesort(liste[:mitte])
    rechts = mergesort(liste[mitte:])
    return merge(links, rechts)

print(merge([1, 4, 8], [2, 3, 9]))
print(mergesort([5, 2, 9, 1, 7, 3, 5]))
```

</PyRunner>

:::details Warum O(n log n)?
Die Liste wird so lange halbiert, bis nur noch Einzelelemente übrig sind – das sind etwa `log₂ n`
Ebenen. Auf jeder Ebene werden beim Mergen insgesamt `n` Elemente angefasst. Zusammen:
`n · log₂ n`. Anders als Quicksort hat Mergesort **keinen** schlechten Fall – er ist immer
`O(n log n)`, braucht aber zusätzlichen Speicher für die neuen Listen.
:::

## Vergleich: Vergleiche zählen

Wir zählen, wie oft zwei Elemente verglichen werden – bei Bubblesort und Mergesort mit derselben
zufälligen Liste:

<PyRunner>

```python
import random

zaehler = 0

def bubblesort(liste):
    global zaehler
    n = len(liste)
    for runde in range(n - 1):
        for i in range(n - 1 - runde):
            zaehler += 1
            if liste[i] > liste[i + 1]:
                liste[i], liste[i + 1] = liste[i + 1], liste[i]
    return liste

def merge(links, rechts):
    global zaehler
    ergebnis = []
    i = j = 0
    while i < len(links) and j < len(rechts):
        zaehler += 1
        if links[i] <= rechts[j]:
            ergebnis.append(links[i])
            i += 1
        else:
            ergebnis.append(rechts[j])
            j += 1
    return ergebnis + links[i:] + rechts[j:]

def mergesort(liste):
    if len(liste) <= 1:
        return liste
    mitte = len(liste) // 2
    return merge(mergesort(liste[:mitte]), mergesort(liste[mitte:]))

for n in [100, 1000, 2000]:
    daten = [random.randint(1, 10_000) for _ in range(n)]
    zaehler = 0
    bubblesort(daten[:])
    bubble = zaehler
    zaehler = 0
    mergesort(daten[:])
    print(f"n = {n:>5}: Bubblesort {bubble:>9} | Mergesort {zaehler:>6}")
```

</PyRunner>

:::details Erklärung
Bubblesort braucht immer genau `n·(n−1)/2` Vergleiche: bei `n = 1000` also 499 500, bei `n = 2000`
schon 1 999 000 – **viermal** so viele. Mergesort kommt bei `n = 1000` mit weniger als 10 000
Vergleichen aus und braucht bei doppelter Länge nur gut **doppelt** so viele.
:::

| | Bubblesort / Selectionsort | Quicksort | Mergesort |
|---|---|---|---|
| Laufzeit (Durchschnitt) | `O(n²)` | `O(n log n)` | `O(n log n)` |
| Laufzeit (Worst Case) | `O(n²)` | `O(n²)` | `O(n log n)` |
| zusätzlicher Speicher | keiner (in-place) | hier: neue Listen | neue Listen |
| stabil? | Bubble: ja, Selection: nein | diese Version: ja | ja |

## Stabile Sortierung

Ein Verfahren ist **stabil**, wenn gleich große Elemente ihre ursprüngliche Reihenfolge behalten.
Das ist wichtig, wenn man nach einem Merkmal sortiert, aber die Reihenfolge eines anderen erhalten
möchte. Pythons eingebautes `sorted()` ist stabil (es nutzt *Timsort*, eine Mischung aus Mergesort
und Insertion Sort):

<PyRunner>

```python
schueler = [("Ada", 2), ("Alan", 1), ("Grace", 2), ("Linus", 1)]
nach_note = sorted(schueler, key=lambda s: s[1])
print(nach_note)
```

</PyRunner>

:::details Erklärung
Ada steht vor Grace (beide Note 2) und Alan vor Linus (beide Note 1) – genau wie in der
Ausgangsliste. Beim Mergesort sorgt das `<=` in `merge` für Stabilität: Bei Gleichheit wird das
Element aus der **linken** Hälfte zuerst genommen.
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Absteigend
Ändere Quicksort so, dass absteigend sortiert wird. Es reicht, die Reihenfolge im `return` zu ändern.

<PyRunner>

```python
def quicksort_ab(liste):
    if len(liste) <= 1:
        return liste
    pivot = liste[0]
    kleiner = [x for x in liste if x < pivot]
    gleich  = [x for x in liste if x == pivot]
    groesser = [x for x in liste if x > pivot]
    return []   # anpassen

print(quicksort_ab([5, 2, 9, 1, 7, 3]))
```

</PyRunner>

:::details Lösung
`return quicksort_ab(groesser) + gleich + quicksort_ab(kleiner)`
:::

### Aufgabe 2: Zufälliges Pivot
Teste Quicksort mit der bereits sortierten Liste `list(range(2000))`. Was passiert? Ersetze dann
`liste[0]` durch `random.choice(liste)` und teste erneut.

:::details Tipp
Mit `liste[0]` als Pivot wird die Rekursion `n` Ebenen tief – bei 2000 Elementen überschreitet
Python die maximale Rekursionstiefe (`RecursionError`). Mit zufälligem Pivot sind es nur etwa
`log₂ n` Ebenen.
:::

### Aufgabe 3: Merge von Hand
Führe `merge([2, 5, 6], [1, 3, 7, 8])` auf Papier aus: Notiere nach jedem Schritt `i`, `j` und
`ergebnis`. Wie viele Vergleiche sind nötig? Prüfe dein Ergebnis mit Python.

:::details Lösung
5 Vergleiche (1, 2, 3, 5, 6 werden per Vergleich gewählt), danach wird `[7, 8]` ohne Vergleich
angehängt. Ergebnis: `[1, 2, 3, 5, 6, 7, 8]`.
:::

### Aufgabe 4: Zeit messen
Miss mit `time.time()` die Laufzeit von Bubblesort, Mergesort und `sorted()` für `n = 2000`.
Welches Verfahren ist am schnellsten?
