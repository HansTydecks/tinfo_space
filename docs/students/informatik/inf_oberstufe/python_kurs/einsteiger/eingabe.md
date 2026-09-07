---
title: "Eingabe mit input()"
description: "Die letzte Zutat: Programme, die den Nutzer nach Werten fragen."
---

## Ziele
- Werte mit `input()` einlesen
- Eingaben in Zahlen umwandeln
- Eine einfache Prüfung der Eingabe einbauen

## Bisher stand alles fest im Code

In allen bisherigen Programmen hast du die Werte selbst in den Code geschrieben. Jetzt kommt die
letzte Zutat: Der **Nutzer** gibt sie ein.

<PyRunner stdin="Mia">

```python
name = input("Wie heißt du? ")
print("Hallo", name)
```

</PyRunner>

::: info Das Eingabe-Feld
Weil dieses Programm `input()` benutzt, ist über dem Code ein Feld **„Eingaben"** erschienen. Was du
dort einträgst (eine Zeile pro `input()`), liest das Programm beim Ausführen der Reihe nach ein.
:::

## input() liefert immer einen String

Auch wenn du eine Zahl eintippst – `input()` gibt **Text** zurück. Zum Rechnen musst du umwandeln:

<PyRunner stdin="8\n5">

```python
a = input("Erste Zahl: ")
b = input("Zweite Zahl: ")
print(a + b)             # "8" + "5" -> "85" (Text!)
print(int(a) + int(b))   # 8 + 5 -> 13
```

</PyRunner>

Kürzer geht es, indem du direkt umwandelst:

<PyRunner stdin="8\n5">

```python
a = int(input("Erste Zahl: "))
b = int(input("Zweite Zahl: "))
print("Summe:", a + b)
```

</PyRunner>

:::danger Falsche Eingabe
`int("acht")` stürzt ab. Wie man das sauber abfängt, lernst du bei
[do-while & try/except](../fortgeschritten/do-while).
:::

## Eingaben prüfen

<PyRunner stdin="-4">

```python
alter = int(input("Dein Alter: "))

if alter < 0:
    print("Ein Alter kann nicht negativ sein.")
elif alter < 18:
    print("Noch nicht volljährig.")
else:
    print("Volljährig.")
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Begrüßung mit Alter
Frage nach Name und Alter und gib aus: „Hallo *Name*, in 10 Jahren bist du *X*."

<PyRunner stdin="Tom\n15">

```python
# dein Code
```

</PyRunner>

### Aufgabe 2: Rechteck interaktiv
Frage nach Breite und Höhe (als Zahlen) und gib Fläche und Umfang aus.

<PyRunner stdin="8\n3">

```python
# dein Code
```

</PyRunner>

### Aufgabe 3: Countdown
Frage nach einer Startzahl und zähle mit einer Schleife von dort auf 0 herunter, dann „Start!".

<PyRunner stdin="5">

```python
start = int(input("Startzahl: "))
# while-Schleife
```

</PyRunner>

:::tip Weiter geht's
Ab jetzt darfst du `input()` überall einsetzen. Im nächsten Kapitel bleiben die Beispiele aber
meist bei festen Werten – damit man sich auf die Algorithmen konzentrieren kann.
:::
