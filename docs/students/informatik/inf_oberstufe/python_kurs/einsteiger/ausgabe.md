---
title: "Ausgabe mit print()"
description: "Mehrere Werte ausgeben, direkt in print() rechnen und Text mit f-Strings sauber formatieren."
---

## Ziele
- Mehrere Werte in einem `print()` ausgeben
- Den Unterschied zwischen `,` und `+` in `print()` kennen
- f-Strings für lesbare Ausgaben nutzen

## Mehrere Werte mit Komma

Trennst du Werte in `print()` mit **Komma**, setzt Python automatisch ein Leerzeichen dazwischen –
egal welcher Datentyp:

<PyRunner>

```python
name = "Tom"
punkte = 42
print(name, "hat", punkte, "Punkte")
```

</PyRunner>

Mit `+` kannst du dagegen nur **Strings** verketten – und ohne Leerzeichen:

<PyRunner>

```python
print("Guten" + " " + "Morgen")
print("Punkte: " + str(42))   # str() nötig, sonst Fehler
```

</PyRunner>

:::danger Häufiger Fehler
`"Punkte: " + 42` stürzt ab (`can only concatenate str ... to str`). Entweder `str(42)` verwenden
oder – besser – das Komma.
:::

## Rechnen in print()

Du kannst direkt in `print()` rechnen:

<PyRunner>

```python
print("Summe:", 7 + 5)
print("3 Stunden =", 3 * 60, "Minuten")
```

</PyRunner>

## f-Strings: Werte in Text einbauen

Ein **f-String** beginnt mit `f"..."`. In geschweiften Klammern `{}` steht ein Wert oder eine
Rechnung:

<PyRunner>

```python
name = "Lena"
alter = 17
print(f"{name} ist {alter} Jahre alt.")
print(f"In 3 Jahren: {alter + 3}")

preis = 2.5
print(f"Gesamt: {preis * 4:.2f} Euro")   # :.2f = zwei Nachkommastellen
```

</PyRunner>

:::details Erklärung
`{alter + 3}` wird zu `20` ausgewertet und eingesetzt. `{preis * 4:.2f}` rechnet `10.0` und zeigt es
als `10.00`. f-Strings sind heute die übliche Art, Ausgaben zu bauen.
:::

## `sep` und `end`

<PyRunner>

```python
print("a", "b", "c", sep="-")   # Trennzeichen
print("kein Zeilenumbruch", end=" → ")
print("weiter in derselben Zeile")
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Kassenbon
`artikel = "Brötchen"`, `anzahl = 6`, `einzelpreis = 0.45`. Gib eine Zeile aus:
`6 x Brötchen = 2.70 Euro` (zwei Nachkommastellen).

<PyRunner>

```python
artikel = "Brötchen"
anzahl = 6
einzelpreis = 0.45
# dein f-String
```

</PyRunner>

:::details Tipp
`f"{anzahl} x {artikel} = {anzahl * einzelpreis:.2f} Euro"`
:::

### Aufgabe 2: Fehler finden
Warum stürzt das ab? Repariere es auf zwei verschiedene Arten.

<PyRunner>

```python
temperatur = 21
print("Es sind " + temperatur + " Grad")
```

</PyRunner>

### Aufgabe 3: Countdown-Zeile
Gib in **einer** `print()`-Zeile aus: `3 ... 2 ... 1 ... Start!`

<PyRunner>

```python
# nutze sep=" ... "
```

</PyRunner>
