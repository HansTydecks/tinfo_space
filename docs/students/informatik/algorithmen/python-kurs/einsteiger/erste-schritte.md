---
title: "Erste Schritte"
description: "Dein erstes Python-Programm, Variablen als Behälter für Werte und Kommentare."
---

## Ziele
- Ein Programm ausführen und die Ausgabe verstehen
- Variablen anlegen und benutzen
- Fehlermeldungen nicht fürchten

<SilentTeacherButton kapitel="erste-schritte" />

## Jede Zeile ein Befehl

In Python steht in jeder Zeile normalerweise **ein Befehl**. Das Programm wird von oben nach unten
abgearbeitet.

<PyRunner>

```python
print("Hallo Welt")
print("Los geht's!")
```

</PyRunner>

`print(...)` gibt aus, was in den Klammern steht. Text muss in Anführungszeichen (`"..."` oder
`'...'`).

## Variablen: Behälter für Werte

Eine **Variable** ist ein benannter Behälter. Mit `=` legst du einen Wert hinein:

<PyRunner>

```python
name = "Mia"
alter = 16
print(name, "ist", alter, "Jahre alt")

alter = alter + 1
print("Nächstes Jahr:", alter)
```

</PyRunner>

:::details Erklärung
`alter = alter + 1` ist mathematisch Unsinn, in der Programmierung aber normal: Rechts wird der
*alte* Wert (16) plus 1 gerechnet, und das Ergebnis (17) kommt zurück in den Behälter `alter`.
:::

### Regeln für Variablennamen
- klein anfangen, keine Umlaute, keine Leerzeichen (nimm `_`): `breite_rechteck`
- sprechend wählen: `x` sagt nichts, `punktzahl` schon
- Python merkt sich den Datentyp automatisch

## Kommentare

Alles hinter `#` ist ein **Kommentar** – Python ignoriert es. Kommentare erklären *warum*, nicht
*was*.

<PyRunner>

```python
# Umrechnung Euro -> Cent
euro = 3.5
cent = euro * 100
print(cent)
```

</PyRunner>

## Fehlermeldungen lesen

Fehler gehören dazu. Python sagt dir die **Zeile** und die **Art** des Fehlers. Führe das aus und
lies die letzte Zeile der Meldung:

<PyRunner>

```python
print("Start")
print(Hallo)
```

</PyRunner>

:::details Was bedeutet die Meldung?
`NameError: name 'Hallo' is not defined` – `Hallo` ohne Anführungszeichen hält Python für eine
Variable, die es nicht gibt. Richtig: `print("Hallo")`.
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Steckbrief
Lege Variablen für Name, Wohnort und Lieblingsfach an und gib einen Satz daraus aus.

<PyRunner>

```python
# deine Variablen
# print(...)
```

</PyRunner>

### Aufgabe 2: Vorhersagen
Was gibt das Programm aus? Erst überlegen, dann ausführen.

<PyRunner>

```python
a = 5
b = a
a = 10
print(a, b)
```

</PyRunner>

:::details Tipp
`b = a` kopiert den *Wert* von `a` (also 5) in `b`. Dass `a` später geändert wird, betrifft `b` nicht.
:::

### Aufgabe 3: Rechteck
`breite = 8`, `hoehe = 3`. Berechne Fläche und Umfang und gib beide beschriftet aus.

<PyRunner>

```python
breite = 8
hoehe = 3
# dein Code
```

</PyRunner>
