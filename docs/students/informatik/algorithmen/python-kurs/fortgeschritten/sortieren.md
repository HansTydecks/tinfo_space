---
title: "Sortieren: Bubblesort & Selectionsort"
description: "Zwei klassische Sortierverfahren verstehen, programmieren und vergleichen."
---

## Ziele
- Bubblesort und Selectionsort nachvollziehen
- Beide „in-place" programmieren
- Vergleiche und Vertauschungen zählen

<SilentTeacherButton kapitel="sortieren" />

## Worum geht es?

**Sortieren** heißt: die Elemente einer Liste in eine Reihenfolge bringen (meist aufsteigend). Beide
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

## Vergleich

Beide sind `O(n²)` – bei doppelter Listenlänge etwa vierfache Laufzeit. Unterschied:

| | Bubblesort | Selectionsort |
|---|---|---|
| Vergleiche | ~n²/2 | ~n²/2 |
| Vertauschungen | viele | höchstens `n-1` |
| stabil? | ja | nein |

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
