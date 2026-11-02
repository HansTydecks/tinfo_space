---
title: "Vererbung & Polymorphie"
description: "Klassen voneinander erben lassen, Methoden überschreiben und verschiedene Objekte einheitlich behandeln."
---

## Ziele
- Eine **Unterklasse** von einer **Oberklasse** ableiten
- Den Konstruktor der Oberklasse mit `super().__init__` aufrufen
- Methoden **überschreiben**
- **Polymorphie** nutzen: gleicher Methodenaufruf, unterschiedliches Verhalten
- Mit `isinstance` den Typ eines Objekts prüfen

::: tip Voraussetzung
Du solltest [Klassen & Objekte](./klassen-objekte) kennen: `__init__`, `self`, Methoden und `__str__`.
:::

## Die Idee

Autos und Fahrräder haben vieles gemeinsam: Sie haben eine Marke, eine Höchstgeschwindigkeit und
können fahren. Statt alles doppelt zu programmieren, schreibst du die Gemeinsamkeiten **einmal** in
eine **Oberklasse** `Fahrzeug`. Die **Unterklassen** `Auto` und `Fahrrad` **erben** alles davon und
ergänzen nur, was sie besonders macht.

```text
            ┌───────────────────┐
            │     Fahrzeug      │
            ├───────────────────┤
            │ + marke           │
            │ + max_kmh         │
            ├───────────────────┤
            │ + beschreibung()  │
            │ + geraeusch()     │
            └─────────▲─────────┘
                      │ erbt von
          ┌───────────┴───────────┐
┌─────────┴─────────┐   ┌─────────┴─────────┐
│       Auto        │   │      Fahrrad      │
├───────────────────┤   ├───────────────────┤
│ + tueren          │   │ + gaenge          │
├───────────────────┤   ├───────────────────┤
│ + geraeusch()     │   │ + geraeusch()     │
└───────────────────┘   └───────────────────┘
```

## Erben mit `class Unterklasse(Oberklasse)`

<PyRunner>

```python
class Fahrzeug:
    def __init__(self, marke, max_kmh):
        self.marke = marke
        self.max_kmh = max_kmh

    def beschreibung(self):
        return f"{self.marke}, bis {self.max_kmh} km/h"

class Auto(Fahrzeug):
    pass

a = Auto("VW", 180)
print(a.beschreibung())
```

</PyRunner>

:::details Erklärung
`Auto` enthält selbst gar keinen Code (`pass`), kann aber trotzdem `__init__` und `beschreibung`
benutzen – beides wurde von `Fahrzeug` **geerbt**. Ein Auto **ist ein** Fahrzeug („ist-ein-Beziehung").
:::

## Eigene Attribute und `super().__init__`

Meist braucht die Unterklasse zusätzliche Attribute. Dann schreibt sie einen eigenen Konstruktor und
ruft darin mit `super().__init__(...)` den Konstruktor der Oberklasse auf – so werden die geerbten
Attribute nicht doppelt programmiert:

<PyRunner>

```python
class Fahrzeug:
    def __init__(self, marke, max_kmh):
        self.marke = marke
        self.max_kmh = max_kmh

class Auto(Fahrzeug):
    def __init__(self, marke, max_kmh, tueren):
        super().__init__(marke, max_kmh)   # Oberklasse erledigt marke, max_kmh
        self.tueren = tueren                # nur das Neue selbst

a = Auto("Opel", 170, 5)
print(a.marke, a.max_kmh, a.tueren)
```

</PyRunner>

## Methoden überschreiben

Eine Unterklasse kann eine geerbte Methode **überschreiben**, indem sie eine Methode mit demselben
Namen definiert. Mit `super().methode()` kann sie die Version der Oberklasse trotzdem mitbenutzen:

<PyRunner>

```python
class Fahrzeug:
    def __init__(self, marke, max_kmh):
        self.marke = marke
        self.max_kmh = max_kmh

    def beschreibung(self):
        return f"{self.marke}, bis {self.max_kmh} km/h"

    def geraeusch(self):
        return "..."

class Auto(Fahrzeug):
    def __init__(self, marke, max_kmh, tueren):
        super().__init__(marke, max_kmh)
        self.tueren = tueren

    def geraeusch(self):
        return "Brumm!"

    def beschreibung(self):
        return "Auto: " + super().beschreibung() + f", {self.tueren} Türen"

class Fahrrad(Fahrzeug):
    def __init__(self, marke, gaenge):
        super().__init__(marke, 30)
        self.gaenge = gaenge

    def geraeusch(self):
        return "Kling kling!"

print(Auto("VW", 180, 3).beschreibung())
print(Fahrrad("Cube", 21).geraeusch())
```

</PyRunner>

## Polymorphie

**Polymorphie** (griechisch: „Vielgestaltigkeit") heißt: Du rufst bei verschiedenen Objekten
**dieselbe Methode** auf – und jedes Objekt reagiert auf seine eigene Weise. Der aufrufende Code muss
nicht wissen, welches Objekt genau vor ihm liegt:

<PyRunner>

```python
class Tier:
    def __init__(self, name):
        self.name = name

    def laut(self):
        return "..."

class Hund(Tier):
    def laut(self):
        return "Wuff!"

class Katze(Tier):
    def laut(self):
        return "Miau!"

class Kuh(Tier):
    def laut(self):
        return "Muuh!"

tiere = [Hund("Bello"), Katze("Minka"), Kuh("Elsa"), Tier("Unbekannt")]
for tier in tiere:
    print(f"{tier.name} sagt {tier.laut()}")
```

</PyRunner>

:::details Erklärung
Die Schleife ruft viermal `tier.laut()` auf. Python schaut jedes Mal nach, zu welcher Klasse das
Objekt gehört, und nimmt deren Methode. Kommt später eine Klasse `Schaf` dazu, muss die Schleife
**nicht** geändert werden – das macht Programme leicht erweiterbar.
:::

## Typ prüfen mit `isinstance`

`isinstance(objekt, Klasse)` prüft, ob ein Objekt zu einer Klasse gehört – **auch über Vererbung**:

<PyRunner>

```python
class Tier:
    pass

class Hund(Tier):
    pass

class Katze(Tier):
    pass

bello = Hund()
print(isinstance(bello, Hund))    # True
print(isinstance(bello, Tier))    # True – ein Hund ist ein Tier
print(isinstance(bello, Katze))   # False
```

</PyRunner>

::: tip Wann isinstance?
Wenn du sehr viele `if isinstance(...)`-Abfragen schreibst, ist das oft ein Zeichen, dass eine
überschriebene Methode (Polymorphie) die bessere Lösung wäre.
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Neues Tier
Ergänze eine Klasse `Schaf`, die von `Tier` erbt, und füge ein Schaf zur Liste hinzu. Die Schleife
selbst bleibt unverändert.

<PyRunner>

```python
class Tier:
    def __init__(self, name):
        self.name = name

    def laut(self):
        return "..."

class Hund(Tier):
    def laut(self):
        return "Wuff!"

# class Schaf ...

tiere = [Hund("Bello")]
for tier in tiere:
    print(f"{tier.name} sagt {tier.laut()}")
```

</PyRunner>

### Aufgabe 2: Formen und Flächen
Schreibe eine Oberklasse `Form` mit einer Methode `flaeche()`, die `0` zurückgibt, und die
Unterklassen `Rechteck(breite, hoehe)` und `Kreis(radius)`, die `flaeche()` überschreiben. Berechne
die Gesamtfläche einer Liste von Formen.

<PyRunner>

```python
import math

class Form:
    def flaeche(self):
        return 0

# class Rechteck(Form): ...
# class Kreis(Form): ...

# formen = [Rechteck(2, 3), Kreis(1), Rechteck(4, 4)]
# print(sum(f.flaeche() for f in formen))
```

</PyRunner>

:::details Lösung
```python
class Rechteck(Form):
    def __init__(self, breite, hoehe):
        self.breite = breite
        self.hoehe = hoehe

    def flaeche(self):
        return self.breite * self.hoehe

class Kreis(Form):
    def __init__(self, radius):
        self.radius = radius

    def flaeche(self):
        return math.pi * self.radius ** 2
```
Die Gesamtfläche beträgt etwa `25.14` (6 + 3,14… + 16).
:::

### Aufgabe 3: Nur die Autos
Gegeben ist eine gemischte Liste aus `Auto`- und `Fahrrad`-Objekten. Zähle mit `isinstance`, wie
viele Autos darin sind.

:::details Tipp
```python
anzahl = 0
for f in fahrzeuge:
    if isinstance(f, Auto):
        anzahl += 1
```
:::
