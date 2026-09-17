---
title: "for-Schleife"
description: "Jedes Element einer Folge abarbeiten – mit for und range()."
---

## Ziele
- Mit `for` über Listen und Strings gehen
- `range()` in seinen drei Varianten nutzen
- for- und while-Schleife unterscheiden

<SilentTeacherButton kapitel="for-schleife" />

## for über eine Folge

Die `for`-Schleife nimmt sich **nacheinander jedes Element** einer Folge. Die Laufvariable musst du
nicht selbst hochzählen:

<PyRunner>

```python
tiere = ["Hund", "Katze", "Maus"]
for tier in tiere:
    print(tier, "hat", len(tier), "Buchstaben")
```

</PyRunner>

Auch ein String ist eine Folge – aus einzelnen Zeichen:

<PyRunner>

```python
for zeichen in "Hallo":
    print(zeichen)
```

</PyRunner>

## range() – Zahlenfolgen

| Aufruf | erzeugt |
|--------|---------|
| `range(5)` | `0, 1, 2, 3, 4` |
| `range(2, 8)` | `2, 3, 4, 5, 6, 7` |
| `range(0, 10, 2)` | `0, 2, 4, 6, 8` |

<PyRunner>

```python
for i in range(1, 6):
    print(i, "zum Quadrat ist", i ** 2)
```

</PyRunner>

:::tip Wann for, wann while?
- **Anzahl bekannt** oder du gehst eine Liste durch → `for`
- **Anzahl unbekannt**, du wartest auf eine Bedingung → `while`
:::

## Verschachtelte Schleifen

Eine Schleife in einer Schleife – z. B. für ein kleines Einmaleins:

<PyRunner>

```python
for a in range(1, 4):
    for b in range(1, 4):
        print(f"{a} * {b} = {a * b}")
    print("---")
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Notenschnitt
Berechne den Durchschnitt der festen Notenliste.

<PyRunner>

```python
noten = [2, 1, 3, 2, 4, 1]
summe = 0
# for-Schleife, dann summe / len(noten)
```

</PyRunner>

:::details Tipp
In der Schleife `summe += note`. Nach der Schleife durch `len(noten)` teilen.
:::

### Aufgabe 2: Sterne-Treppe
Gib mit einer verschachtelten Schleife aus:
```
*
**
***
****
```

<PyRunner>

```python
# for i in range(1, 5): ...
```

</PyRunner>

:::details Tipp
`"*" * i` erzeugt `i` Sterne als String.
:::

### Aufgabe 3: Fakultät mit for
Berechne `n!` (wie auf der [vorigen Seite](./while-schleife)), diesmal mit einer `for`-Schleife und
`range()`.

<PyRunner>

```python
n = 6
ergebnis = 1
# for i in range(2, n + 1): ...
```

</PyRunner>
