---
title: "Listen"
description: "Mehrere Werte in einer Variablen: Listen anlegen, ändern und durchlaufen."
---

## Ziele
- Listen anlegen und einzelne Elemente ansprechen
- Elemente hinzufügen und entfernen
- Eine Liste mit einer Schleife auswerten

## Warum Listen?

Statt `note1`, `note2`, `note3` … packst du zusammengehörige Werte in **eine** Liste. Danach kannst
du mit einer Schleife alle auf einmal bearbeiten.

<PyRunner>

```python
noten = [2, 1, 3, 2, 4]
print(noten)
print("Anzahl:", len(noten))
print("Erste:", noten[0], "– Letzte:", noten[-1])
```

</PyRunner>

## Elemente ändern, hinzufügen, entfernen

<PyRunner>

```python
einkauf = ["Milch", "Brot", "Eier"]

einkauf[1] = "Brötchen"     # ändern
einkauf.append("Butter")    # hinten anhängen
einkauf.remove("Eier")      # nach Wert löschen
print(einkauf)
```

</PyRunner>

:::details Erklärung
- `einkauf[1]` ist das **zweite** Element (Zählung ab 0).
- `.append(x)` hängt an, `.remove(x)` löscht das erste `x`, `.pop(i)` löscht per Index und gibt den
  Wert zurück.
:::

## Eine Liste durchlaufen

<PyRunner>

```python
preise = [1.20, 3.50, 0.99, 2.40]

summe = 0
for p in preise:
    summe += p
print(f"Gesamt: {summe:.2f} Euro")
```

</PyRunner>

Manchmal brauchst du den **Index** mit – dann über `range(len(...))`:

<PyRunner>

```python
namen = ["Ada", "Alan", "Grace"]
for i in range(len(namen)):
    print(f"Platz {i + 1}: {namen[i]}")
```

</PyRunner>

## Teillisten (Slicing)

<PyRunner>

```python
zahlen = [10, 20, 30, 40, 50, 60]
print(zahlen[1:4])   # Index 1 bis 3
print(zahlen[:3])    # die ersten drei
print(zahlen[-2:])   # die letzten zwei
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Größter Wert
Finde den größten Wert der Liste **ohne** `max()`.

<PyRunner>

```python
zahlen = [3, 17, 9, 42, 8, 25]
groesstes = zahlen[0]
# for-Schleife: vergleichen und ggf. groesstes aktualisieren
print(groesstes)
```

</PyRunner>

:::details Tipp
Startwert ist das erste Element. Für jedes weitere: `if element > groesstes: groesstes = element`.
:::

### Aufgabe 2: Nur die geraden
Baue aus `zahlen` eine neue Liste `gerade` mit allen geraden Zahlen.

<PyRunner>

```python
zahlen = [4, 7, 10, 13, 16, 21, 24]
gerade = []
# for + if + gerade.append(...)
print(gerade)
```

</PyRunner>

### Aufgabe 3: Wörter umdrehen
Gegeben eine Liste von Wörtern. Gib sie in umgekehrter Reihenfolge aus (ohne `.reverse()`).

<PyRunner>

```python
woerter = ["eins", "zwei", "drei", "vier"]
# for i in range(len(woerter) - 1, -1, -1): ...
```

</PyRunner>
