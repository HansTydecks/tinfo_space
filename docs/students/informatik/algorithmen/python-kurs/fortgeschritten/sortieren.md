---
title: "Sortieren: Bubblesort, Selectionsort & Insertion Sort"
description: "Drei klassische Sortierverfahren verstehen, programmieren und vergleichen."
---

## Ziele
- Bubblesort, Selectionsort und Insertion Sort nachvollziehen
- Alle drei „in-place" programmieren
- Vergleiche und Vertauschungen zählen

<SilentTeacherButton kapitel="sortieren" />

## Worum geht es?

**Sortieren** heißt: die Elemente einer Liste in eine Reihenfolge bringen (meist aufsteigend). Alle
Verfahren hier arbeiten **in-place** – sie ordnen die vorhandene Liste um, ohne eine zweite anzulegen.

Grundbaustein ist das **Vertauschen** zweier Elemente:

<PyRunner>

```python
liste = [10, 20, 30]
liste[0], liste[2] = liste[2], liste[0]
print(liste)
```

</PyRunner>

## Bubblesort

Idee: Vergleiche benachbarte Elemente und vertausche sie, wenn sie in falscher Reihenfolge stehen.
Nach jedem Durchlauf „blubbert" das größte Element ganz nach rechts.

<PyRunner>

```python
def bubblesort(liste):
    n = len(liste)
    for runde in range(n - 1):
        for i in range(n - 1 - runde):
            if liste[i] > liste[i + 1]:
                liste[i], liste[i + 1] = liste[i + 1], liste[i]
    return liste

print(bubblesort([5, 2, 9, 1, 7, 3]))
```

</PyRunner>

::: tip 🎬 Interaktive Animation
<a href="/animationen/bubblesort/" target="_blank" rel="noopener">→ Animation: Bubblesort</a>
<!-- ANIM: bubblesort -->
:::

:::details Erklärung
Das `- runde` spart Arbeit: Nach Runde 1 steht das größte Element schon richtig, nach Runde 2 die
beiden größten usw. – man muss den hinteren Teil nicht mehr anschauen.
:::

## Selectionsort

Idee: Suche das **kleinste** Element im unsortierten Teil und tausche es an den Anfang. Dann den
Anfang um eins weiterschieben.

<PyRunner>

```python
def selectionsort(liste):
    n = len(liste)
    for start in range(n - 1):
        min_index = start
        for i in range(start + 1, n):
            if liste[i] < liste[min_index]:
                min_index = i
        liste[start], liste[min_index] = liste[min_index], liste[start]
    return liste

print(selectionsort([5, 2, 9, 1, 7, 3]))
```

</PyRunner>

::: tip 🎬 Interaktive Animation
<a href="/animationen/selectionsort/" target="_blank" rel="noopener">→ Animation: Selectionsort</a>
<!-- ANIM: selectionsort -->
:::

## Insertion Sort

Idee: So sortierst du Spielkarten auf der Hand. Der linke Teil der Liste ist schon sortiert. Nimm
das nächste Element und **schiebe** es nach links, bis es an der richtigen Stelle steht. Größere
Elemente rücken dabei um eins nach rechts.

<PyRunner>

```python
def insertionsort(liste):
    for i in range(1, len(liste)):
        aktuell = liste[i]
        j = i - 1
        while j >= 0 and liste[j] > aktuell:
            liste[j + 1] = liste[j]     # größeres Element nach rechts schieben
            j -= 1
        liste[j + 1] = aktuell          # in die Lücke einfügen
    return liste

print(insertionsort([5, 2, 9, 1, 7, 3]))
```

</PyRunner>

:::details Erklärung
Ablauf für `[5, 2, 9, 1, 7, 3]` (der sortierte Teil steht vor dem `|`):

```text
[5 | 2, 9, 1, 7, 3]    2 einfügen
[2, 5 | 9, 1, 7, 3]    9 bleibt stehen
[2, 5, 9 | 1, 7, 3]    1 wandert ganz nach vorn
[1, 2, 5, 9 | 7, 3]    7 vor die 9
[1, 2, 5, 7, 9 | 3]    3 hinter die 2
[1, 2, 3, 5, 7, 9]
```

Die `while`-Schleife stoppt, sobald links ein Element steht, das **nicht größer** ist. Ist die Liste
schon fast sortiert, stoppt sie fast sofort – dann ist Insertion Sort sehr schnell (`O(n)` im Best
Case).
:::

## Vergleich

Alle drei sind `O(n²)` – bei doppelter Listenlänge etwa vierfache Laufzeit. Unterschied:

| | Bubblesort | Selectionsort | Insertion Sort |
|---|---|---|---|
| Vergleiche | ~n²/2 | ~n²/2 | ~n²/4 im Durchschnitt, `n-1` bei sortierter Liste |
| Vertauschungen / Verschiebungen | viele | höchstens `n-1` | viele |
| stabil? | ja | nein | ja |

<PyRunner>

```python
def bubblesort_gezaehlt(liste):
    vergleiche = tausche = 0
    n = len(liste)
    for runde in range(n - 1):
        for i in range(n - 1 - runde):
            vergleiche += 1
            if liste[i] > liste[i + 1]:
                liste[i], liste[i + 1] = liste[i + 1], liste[i]
                tausche += 1
    return vergleiche, tausche

import random
daten = [random.randint(1, 100) for _ in range(20)]
print("Bubblesort:", bubblesort_gezaehlt(daten[:]))

def insertionsort_gezaehlt(liste):
    vergleiche = schiebe = 0
    for i in range(1, len(liste)):
        aktuell = liste[i]
        j = i - 1
        while j >= 0:
            vergleiche += 1
            if liste[j] <= aktuell:
                break
            liste[j + 1] = liste[j]
            schiebe += 1
            j -= 1
        liste[j + 1] = aktuell
    return vergleiche, schiebe

print("Insertion Sort:", insertionsort_gezaehlt(daten[:]))
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Absteigend sortieren
Ändere Bubblesort so, dass **absteigend** sortiert wird.

<PyRunner>

```python
def bubblesort_ab(liste):
    # nur eine Zeile ändern
    pass

print(bubblesort_ab([5, 2, 9, 1, 7, 3]))
```

</PyRunner>

### Aufgabe 2: Früher aufhören
Wenn Bubblesort eine ganze Runde **ohne** Vertauschung schafft, ist die Liste fertig sortiert. Baue
diesen Abbruch ein (`break`).

<PyRunner>

```python
def bubblesort_schnell(liste):
    n = len(liste)
    for runde in range(n - 1):
        getauscht = False
        # innere Schleife; bei Tausch getauscht = True
        if not getauscht:
            break
    return liste

print(bubblesort_schnell([1, 2, 3, 5, 4]))
```

</PyRunner>

### Aufgabe 3: Selectionsort zählen
Erweitere Selectionsort um Zähler für Vergleiche und Vertauschungen. Vergleiche die
Vertauschungszahl mit Bubblesort bei derselben Liste.

<PyRunner>

```python
import random
daten = [random.randint(1, 100) for _ in range(20)]
# selectionsort_gezaehlt(daten[:])
```

</PyRunner>

:::details Tipp
Selectionsort tauscht pro `start` **genau einmal** – also höchstens `n-1` mal, egal wie
durcheinander die Liste ist.
:::

### Aufgabe 4: Insertion Sort bei fast sortierten Listen
Zähle mit `insertionsort_gezaehlt` die Vergleiche für eine **sortierte** Liste `list(range(20))`,
für eine **umgekehrt** sortierte Liste `list(range(20, 0, -1))` und für eine zufällige Liste. Was
fällt dir auf?

:::details Tipp
Bei der sortierten Liste bricht die `while`-Schleife jedes Mal sofort ab: nur `n-1 = 19` Vergleiche.
Bei der umgekehrten Liste muss jedes Element ganz nach vorn: `n·(n-1)/2 = 190` Vergleiche.
:::

::: tip Weiterlesen
Es geht auch viel schneller als `O(n²)`: In [Quicksort & Mergesort](./sortieren-schnell) lernst du
zwei Verfahren mit `O(n log n)` kennen.
:::
