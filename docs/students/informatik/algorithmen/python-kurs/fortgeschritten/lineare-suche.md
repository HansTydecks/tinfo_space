---
title: "Lineare Suche, Max/Min, Mittelwert"
description: "Eine Liste in einem einzigen Durchlauf auswerten: suchen, Extremwerte finden, Durchschnitt bilden."
---

## Ziele
- Die lineare Suche verstehen und programmieren
- Maximum, Minimum und Mittelwert in einem Durchlauf bestimmen
- Das „Akkumulator"-Muster erkennen

## Lineare Suche

Die einfachste Suche: Gehe die Liste **von vorn nach hinten** durch und vergleiche jedes Element mit
dem gesuchten Wert.

<PyRunner>

```python
zahlen = [7, 3, 9, 42, 1, 18]
gesucht = 42

position = -1
for i in range(len(zahlen)):
    if zahlen[i] == gesucht:
        position = i
        break

if position == -1:
    print("nicht gefunden")
else:
    print("gefunden an Position", position)
```

</PyRunner>

::: tip 🎬 Interaktive Animation
Schritt-für-Schritt-Visualisierung der linearen Suche:
<a href="/animationen/lineare-suche/" target="_blank" rel="noopener">→ Animation öffnen</a>
<!-- ANIM: lineare-suche -->
:::

:::details Komplexität
Im **Worst Case** (Element fehlt oder steht hinten) werden alle `n` Elemente angeschaut → `O(n)`.
Best Case: Element steht vorn → `O(1)`. Für unsortierte Listen geht es nicht besser.
:::

## Das Akkumulator-Muster

Sehr viele Listen-Auswertungen folgen demselben Bauplan:

1. **Startwert** merken (in einer Variablen)
2. Liste **einmal** durchlaufen
3. pro Element den Merkwert **aktualisieren**

### Maximum und Minimum

<PyRunner>

```python
werte = [17, 4, 23, 8, 42, 15, 4]

groesstes = werte[0]
kleinstes = werte[0]
for w in werte:
    if w > groesstes:
        groesstes = w
    if w < kleinstes:
        kleinstes = w

print("max:", groesstes, "– min:", kleinstes)
```

</PyRunner>

:::danger Falscher Startwert
Starte mit `werte[0]`, **nicht** mit `0`. Bei einer Liste aus lauter negativen Zahlen wäre das
Maximum sonst fälschlich `0`.
:::

### Summe und Mittelwert

<PyRunner>

```python
noten = [2, 1, 3, 2, 4, 1, 2]

summe = 0
for n in noten:
    summe += n

mittel = summe / len(noten)
print(f"Summe {summe}, Schnitt {mittel:.2f}")
```

</PyRunner>

### Alles in einem Durchlauf

<PyRunner>

```python
messungen = [19.5, 21.0, 18.2, 24.7, 20.1]

groesste = messungen[0]
kleinste = messungen[0]
summe = 0
for m in messungen:
    summe += m
    if m > groesste:
        groesste = m
    if m < kleinste:
        kleinste = m

print(f"min {kleinste}, max {groesste}, Schnitt {summe / len(messungen):.1f}")
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Alle Fundstellen
Erweitere die lineare Suche so, dass sie **alle** Positionen eines Werts ausgibt (nicht nur die
erste). Kein `break`.

<PyRunner>

```python
zahlen = [4, 1, 4, 2, 4, 7]
gesucht = 4
# for-Schleife, gefundene Positionen sammeln
```

</PyRunner>

### Aufgabe 2: Position des Maximums
Gib nicht den größten Wert aus, sondern **an welcher Position** er steht.

<PyRunner>

```python
werte = [17, 4, 23, 8, 42, 15]
# max_index = ...
```

</PyRunner>

:::details Tipp
Merke dir `max_index = 0` und vergleiche `werte[i]` mit `werte[max_index]`.
:::

### Aufgabe 3: Über dem Schnitt
Berechne den Mittelwert und gib danach alle Werte aus, die **über** dem Schnitt liegen. (Zwei
Durchläufe sind ok.)

<PyRunner>

```python
punkte = [55, 90, 42, 78, 63, 88, 30]
# 1. Durchlauf: Schnitt   2. Durchlauf: ausgeben
```

</PyRunner>
