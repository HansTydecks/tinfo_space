---
title: "Binäre Suche"
description: "In einer sortierten Liste blitzschnell finden – durch fortgesetztes Halbieren."
---

## Ziele
- Das Prinzip „Suchbereich halbieren" verstehen
- Die binäre Suche iterativ programmieren
- Erkennen, warum sie `O(log n)` ist

<SilentTeacherButton kapitel="binaere-suche" />

## Die Idee

Wie im Wörterbuch: Du schlägst in der Mitte auf. Steht das gesuchte Wort weiter hinten, kannst du
die **ganze vordere Hälfte** überspringen – und wiederholst das mit dem Rest.

::: warning Voraussetzung
Die Liste muss **sortiert** sein. Sonst funktioniert das Verfahren nicht.
:::

## Iterative binäre Suche

<PyRunner>

```python
zahlen = [1, 4, 7, 9, 13, 18, 25, 31, 42, 56]
gesucht = 25

links = 0
rechts = len(zahlen) - 1
position = -1

while links <= rechts:
    mitte = (links + rechts) // 2
    if zahlen[mitte] == gesucht:
        position = mitte
        break
    elif zahlen[mitte] < gesucht:
        links = mitte + 1      # vordere Hälfte weg
    else:
        rechts = mitte - 1     # hintere Hälfte weg

print("Position:", position)
```

</PyRunner>

::: tip 🎬 Interaktive Animation
Schritt-für-Schritt-Visualisierung der binären Suche:
<a href="/animationen/binaere-suche/" target="_blank" rel="noopener">→ Animation öffnen</a>
<!-- ANIM: binaere-suche -->
:::

:::details Warum O(log n)?
Jeder Schritt **halbiert** den Suchbereich. Bei 1000 Elementen: 1000 → 500 → 250 → … → 1. Das sind
nur etwa **10** Schritte (2¹⁰ = 1024). Bei 1.000.000 Elementen sind es rund 20. Die lineare Suche
bräuchte im Worst Case eine Million.
:::

## Sehen, wie schnell es geht

<PyRunner>

```python
daten = list(range(1_000_000))   # bereits sortiert
gesucht = 987_654

links, rechts, schritte = 0, len(daten) - 1, 0
while links <= rechts:
    schritte += 1
    mitte = (links + rechts) // 2
    if daten[mitte] == gesucht:
        break
    elif daten[mitte] < gesucht:
        links = mitte + 1
    else:
        rechts = mitte - 1

print(f"gefunden nach {schritte} Schritten")
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Schritte zählen
Erweitere die erste binäre Suche um einen Zähler und gib aus, nach wie vielen Schritten der Wert
gefunden wurde. Teste verschiedene `gesucht`-Werte.

<PyRunner>

```python
zahlen = [1, 4, 7, 9, 13, 18, 25, 31, 42, 56]
gesucht = 1
# mit Zähler
```

</PyRunner>

### Aufgabe 2: Nicht enthalten
Was passiert, wenn `gesucht` nicht in der Liste ist? Teste es und erkläre, warum die Schleife
trotzdem endet.

<PyRunner>

```python
zahlen = [1, 4, 7, 9, 13, 18, 25]
gesucht = 10
# ...
```

</PyRunner>

:::details Tipp
`links` und `rechts` nähern sich an. Sobald `links > rechts`, ist der Suchbereich leer – die Schleife
endet mit `position == -1`.
:::

### Aufgabe 3: Rekursiv (Zusatz)
Schreibe die binäre Suche als **rekursive** Funktion `bsuche(liste, gesucht, links, rechts)`.
(Siehe [Iterativ & rekursiv](./iterativ-rekursiv).)

<PyRunner>

```python
def bsuche(liste, gesucht, links, rechts):
    if links > rechts:
        return -1
    mitte = (links + rechts) // 2
    # drei Fälle wie oben, in den letzten beiden bsuche(...) erneut aufrufen
    pass

zahlen = [1, 4, 7, 9, 13, 18, 25, 31, 42, 56]
print(bsuche(zahlen, 42, 0, len(zahlen) - 1))
```

</PyRunner>
