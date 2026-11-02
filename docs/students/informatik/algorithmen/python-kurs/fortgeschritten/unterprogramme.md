---
title: "Unterprogramme"
description: "Funktionen vertieft: Parameter, Rückgabewerte, Gültigkeitsbereiche, Seiteneffekte, Tests und Docstrings."
---

## Ziele
- Funktionen mit Standardwerten und Schlüsselwortargumenten aufrufen
- Mehrere Werte zurückgeben
- Lokale und globale Variablen unterscheiden
- Seiteneffekte erkennen und **reine Funktionen** schreiben
- Funktionen mit `assert` testen und mit Docstrings dokumentieren

## Wiederholung

Ein **Unterprogramm** (in Python: eine **Funktion**) fasst Anweisungen unter einem Namen zusammen.
Über **Parameter** bekommt es Werte hinein, mit `return` gibt es ein Ergebnis zurück.
Die Grundlagen findest du unter [Funktionen](../einsteiger/funktionen).

<PyRunner>

```python
def flaeche_rechteck(breite, hoehe):
    return breite * hoehe

print(flaeche_rechteck(3, 4))
```

</PyRunner>

## Standardwerte und Schlüsselwortargumente

Ein Parameter kann einen **Standardwert** haben. Lässt du ihn beim Aufruf weg, wird der Standardwert
benutzt. Beim Aufruf kannst du Argumente auch **mit Namen** übergeben – dann ist die Reihenfolge egal.

<PyRunner>

```python
def begruessen(name, gruss="Hallo", zeichen="!"):
    return gruss + " " + name + zeichen

print(begruessen("Ada"))
print(begruessen("Alan", "Moin"))
print(begruessen("Grace", zeichen="?"))
print(begruessen(zeichen=".", name="Linus", gruss="Servus"))
```

</PyRunner>

::: info Reihenfolge
Parameter **mit** Standardwert müssen in der Definition **hinter** denen ohne Standardwert stehen.
`print` benutzt das selbst: `print("a", "b", sep="-", end="\n")`.
:::

## Mehrere Rückgabewerte

Mit `return a, b` gibst du ein **Tupel** zurück, das du beim Aufruf direkt entpacken kannst:

<PyRunner>

```python
def teilen_mit_rest(a, b):
    return a // b, a % b

ganz, rest = teilen_mit_rest(17, 5)
print(f"17 : 5 = {ganz} Rest {rest}")
```

</PyRunner>

## Gültigkeitsbereich: lokal und global

Variablen, die **in** einer Funktion entstehen, sind **lokal**: Sie existieren nur während des
Aufrufs. Variablen außerhalb aller Funktionen sind **global**.

<PyRunner>

```python
zaehler = 0              # global

def erhoehen():
    zaehler = 100        # neue lokale Variable – "überschattet" die globale
    print("innen:", zaehler)

erhoehen()
print("außen:", zaehler)
```

</PyRunner>

:::details Erklärung
Die Zuweisung `zaehler = 100` in der Funktion erzeugt eine **neue lokale** Variable mit gleichem
Namen. Sie **überschattet** die globale – die globale bleibt `0`. Mit `global zaehler` könnte man
die globale Variable verändern. Das solltest du aber vermeiden: Dann kann jede Funktion jede Variable
ändern, und Fehler sind schwer zu finden. Besser: Werte **als Parameter hinein** und **mit return
heraus**.
:::

<PyRunner>

```python
def erhoehen(wert):
    return wert + 1

zaehler = 0
zaehler = erhoehen(zaehler)
zaehler = erhoehen(zaehler)
print(zaehler)
```

</PyRunner>

## Seiteneffekte und reine Funktionen

Eine **reine Funktion** hängt nur von ihren Parametern ab und verändert nichts außerhalb – gleiche
Eingabe, gleiche Ausgabe. Verändert eine Funktion dagegen etwas „draußen", hat sie einen
**Seiteneffekt**. Vorsicht bei Listen: Sie werden **nicht kopiert**, wenn man sie übergibt!

<PyRunner>

```python
def verdoppeln_mit_seiteneffekt(liste):
    for i in range(len(liste)):
        liste[i] *= 2          # ändert die Original-Liste!

def verdoppeln_rein(liste):
    return [x * 2 for x in liste]   # neue Liste, Original bleibt

zahlen = [1, 2, 3]
neu = verdoppeln_rein(zahlen)
print(zahlen, neu)

verdoppeln_mit_seiteneffekt(zahlen)
print(zahlen)
```

</PyRunner>

::: tip Warum reine Funktionen?
Reine Funktionen sind leichter zu verstehen, zu testen und wiederzuverwenden. Seiteneffekte
(Ausgaben mit `print`, Ändern von Listen, Dateien schreiben) sind manchmal nötig – setze sie
aber **bewusst** ein.
:::

## Testen mit assert

`assert bedingung` prüft, ob eine Bedingung wahr ist. Falls nicht, bricht das Programm mit einem
`AssertionError` ab. So kannst du **Testfälle** formulieren – denke dabei besonders an **Randfälle**
(leere Liste, 0, negative Zahlen, nur ein Element):

<PyRunner>

```python
def maximum(werte):
    """Gibt das größte Element der Liste zurück, bei leerer Liste None."""
    if len(werte) == 0:
        return None
    groesstes = werte[0]
    for w in werte:
        if w > groesstes:
            groesstes = w
    return groesstes

assert maximum([3, 9, 2]) == 9
assert maximum([-5, -2, -8]) == -2     # nur negative Zahlen
assert maximum([7]) == 7               # ein Element
assert maximum([]) is None             # leere Liste
print("Alle Tests bestanden.")
```

</PyRunner>

:::details Erklärung
Hätten wir `groesstes = 0` als Startwert gewählt, würde der Test mit nur negativen Zahlen
fehlschlagen – die Funktion lieferte `0`. Genau solche Fehler decken Randfälle auf.
:::

## Docstrings

Der Text in dreifachen Anführungszeichen direkt unter `def` heißt **Docstring**. Er beschreibt, was
die Funktion tut, und wird von `help()` angezeigt:

<PyRunner>

```python
def celsius_zu_fahrenheit(c):
    """Rechnet eine Temperatur von Grad Celsius in Grad Fahrenheit um."""
    return c * 9 / 5 + 32

help(celsius_zu_fahrenheit)
print(celsius_zu_fahrenheit(100))
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Preis mit Rabatt
Schreibe `preis(netto, rabatt=0, mwst=19)`, die zuerst den Rabatt (in Prozent) abzieht und dann die
Mehrwertsteuer (in Prozent) aufschlägt. Runde auf 2 Nachkommastellen.

<PyRunner>

```python
def preis(netto, rabatt=0, mwst=19):
    pass

print(preis(100))              # 119.0
print(preis(100, rabatt=10))   # 107.1
print(preis(100, mwst=7))      # 107.0
```

</PyRunner>

:::details Lösung
```python
def preis(netto, rabatt=0, mwst=19):
    nach_rabatt = netto * (1 - rabatt / 100)
    return round(nach_rabatt * (1 + mwst / 100), 2)

print(preis(100))
print(preis(100, rabatt=10))
print(preis(100, mwst=7))
```
:::

### Aufgabe 2: Rein statt Seiteneffekt
Eine Funktion, die negative Zahlen direkt aus der übergebenen Liste löscht, hätte einen Seiteneffekt.
Schreibe stattdessen eine **reine** Funktion `ohne_negative(liste)`, die eine neue Liste zurückgibt.

<PyRunner>

```python
def ohne_negative(liste):
    pass

werte = [3, -1, 4, -1, 5]
print(ohne_negative(werte))   # [3, 4, 5]
print(werte)                  # [3, -1, 4, -1, 5] – unverändert!
```

</PyRunner>

:::details Lösung
```python
def ohne_negative(liste):
    ergebnis = []
    for x in liste:
        if x >= 0:
            ergebnis.append(x)
    return ergebnis

werte = [3, -1, 4, -1, 5]
print(ohne_negative(werte))
print(werte)
```
:::

### Aufgabe 3: Testfälle schreiben
Die Funktion `ist_schaltjahr` hat einen Fehler. Schreibe Testfälle mit `assert` (auch für 1900 und
2000!) und korrigiere die Funktion.

<PyRunner>

```python
def ist_schaltjahr(jahr):
    """Gibt True zurück, wenn jahr ein Schaltjahr ist."""
    return jahr % 4 == 0

assert ist_schaltjahr(2024) == True
# weitere Tests ...
print("Alle Tests bestanden.")
```

</PyRunner>

:::details Tipp
Durch 4 teilbar → Schaltjahr, **außer** durch 100 teilbar – **es sei denn**, durch 400 teilbar.
1900 ist also **kein** Schaltjahr, 2000 schon.
:::

:::details Lösung
```python
def ist_schaltjahr(jahr):
    """Gibt True zurück, wenn jahr ein Schaltjahr ist."""
    return jahr % 4 == 0 and (jahr % 100 != 0 or jahr % 400 == 0)

assert ist_schaltjahr(2024) == True
assert ist_schaltjahr(2023) == False
assert ist_schaltjahr(1900) == False
assert ist_schaltjahr(2000) == True
print("Alle Tests bestanden.")
```
:::
