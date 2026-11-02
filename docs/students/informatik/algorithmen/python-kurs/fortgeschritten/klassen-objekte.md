---
title: "Klassen & Objekte"
description: "Eigene Datentypen bauen: Klassen als Bauplan, Objekte als Exemplare – mit Attributen, Methoden und Kapselung."
---

## Ziele
- Den Unterschied zwischen **Klasse** (Bauplan) und **Objekt** (Exemplar) erklären
- Eine Klasse mit `__init__`, Attributen und Methoden schreiben
- Verstehen, wofür `self` steht
- Objekte mit `__str__` lesbar ausgeben
- Attribute durch **Kapselung** vor falschen Werten schützen
- Eine Klasse als **UML-Klassendiagramm** darstellen

## Bauplan und Exemplar

Eine **Klasse** ist ein Bauplan: Sie legt fest, welche Eigenschaften (**Attribute**) und welche
Fähigkeiten (**Methoden**) etwas hat. Ein **Objekt** ist ein konkretes Exemplar, das nach diesem
Bauplan gebaut wurde – so wie viele Häuser nach demselben Plan gebaut werden können.

Du kennst Objekte schon: `"Hallo"` ist ein Objekt der Klasse `str`, `[1, 2]` eines der Klasse `list`.
`"Hallo".upper()` ruft eine **Methode** dieses Objekts auf. Jetzt baust du eigene Klassen.

<PyRunner>

```python
class Konto:
    def __init__(self, inhaber, kontostand):
        self.inhaber = inhaber
        self.kontostand = kontostand

k1 = Konto("Ada", 100)
print(k1.inhaber)
print(k1.kontostand)
```

</PyRunner>

:::details Erklärung
- `class Konto:` beginnt den Bauplan. Klassennamen schreibt man groß.
- `__init__` ist der **Konstruktor**: Er wird automatisch aufgerufen, wenn du mit `Konto(...)` ein
  neues Objekt erzeugst, und setzt die Startwerte.
- `self.inhaber = inhaber` legt ein **Attribut** im Objekt an. Mit `k1.inhaber` liest du es aus.
:::

## Was ist `self`?

`self` ist das Objekt, mit dem gerade gearbeitet wird. Schreibst du `k1.einzahlen(50)`, dann ruft
Python intern `Konto.einzahlen(k1, 50)` auf – `self` ist also `k1`. Deshalb steht `self` bei jeder
Methode als erster Parameter, wird beim Aufruf aber nicht mitgeschrieben.

## Methoden

Methoden sind Funktionen, die zu einer Klasse gehören und mit den Attributen des Objekts arbeiten:

<PyRunner>

```python
class Konto:
    def __init__(self, inhaber, kontostand=0):
        self.inhaber = inhaber
        self.kontostand = kontostand

    def einzahlen(self, betrag):
        if betrag <= 0:
            print("Fehler: Betrag muss positiv sein.")
            return
        self.kontostand += betrag

    def abheben(self, betrag):
        if betrag > self.kontostand:
            print("Fehler: Nicht genug Geld auf dem Konto.")
            return
        self.kontostand -= betrag

k = Konto("Ada", 100)
k.einzahlen(50)
k.abheben(500)
k.abheben(30)
print(k.kontostand)
```

</PyRunner>

:::details Erklärung
Am Ende stehen **120** Euro auf dem Konto: 100 + 50 − 30. Das Abheben von 500 Euro wird abgelehnt,
weil die Methode vorher prüft, ob genug Geld da ist.
:::

## Mehrere Objekte

Jedes Objekt hat **eigene** Attributwerte. Ändert sich das eine Konto, bleibt das andere gleich:

<PyRunner>

```python
class Konto:
    def __init__(self, inhaber, kontostand=0):
        self.inhaber = inhaber
        self.kontostand = kontostand

    def einzahlen(self, betrag):
        self.kontostand += betrag

    def __str__(self):
        return f"Konto von {self.inhaber}: {self.kontostand} €"

a = Konto("Ada")
b = Konto("Alan", 200)
a.einzahlen(75)

konten = [a, b]
for konto in konten:
    print(konto)
```

</PyRunner>

::: tip `__str__` für schöne Ausgaben
Ohne `__str__` gibt `print(a)` nur etwas wie `<__main__.Konto object at 0x...>` aus. Die Methode
`__str__` gibt einen Text zurück, den `print` (und `str(a)`) dann verwendet.
:::

## Kapselung

Bisher kann jeder von außen schreiben: `k.kontostand = -1000000`. Die Prüfung in `abheben` wäre damit
umgangen. **Kapselung** heißt: Ein Objekt schützt seine Daten und erlaubt Änderungen nur über
Methoden, die prüfen.

In Python gilt die **Konvention**: Ein Unterstrich am Anfang (`_kontostand`) bedeutet „intern – bitte
nicht direkt von außen benutzen". Zugriff gibt es über **Getter** (lesen) und **Setter** (schreiben
mit Prüfung):

<PyRunner>

```python
class Konto:
    def __init__(self, inhaber, kontostand=0):
        self.inhaber = inhaber
        self._kontostand = 0
        self.set_kontostand(kontostand)

    def get_kontostand(self):
        return self._kontostand

    def set_kontostand(self, wert):
        if wert < 0:
            print("Fehler: Kontostand darf nicht negativ sein.")
        else:
            self._kontostand = wert

k = Konto("Grace", 50)
k.set_kontostand(-20)
print(k.get_kontostand())
k.set_kontostand(80)
print(k.get_kontostand())
```

</PyRunner>

:::details Für Profis: `@property`
Python bietet eine elegantere Schreibweise. Mit `@property` sieht der Zugriff von außen aus wie ein
normales Attribut, läuft aber trotzdem durch deine Prüfung:

```python
class Konto:
    def __init__(self, kontostand=0):
        self._kontostand = kontostand

    @property
    def kontostand(self):
        return self._kontostand

    @kontostand.setter
    def kontostand(self, wert):
        if wert >= 0:
            self._kontostand = wert

k = Konto(10)
k.kontostand = -5     # wird ignoriert
print(k.kontostand)   # 10
```
:::

## UML-Klassendiagramm

Klassen plant man oft mit einem **UML-Klassendiagramm**: oben der Name, in der Mitte die Attribute,
unten die Methoden. `-` heißt privat/intern, `+` heißt öffentlich.

```text
┌──────────────────────────────┐
│            Konto             │
├──────────────────────────────┤
│ + inhaber: str               │
│ - _kontostand: float         │
├──────────────────────────────┤
│ + einzahlen(betrag)          │
│ + abheben(betrag)            │
│ + get_kontostand(): float    │
└──────────────────────────────┘
```

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Die Klasse Schueler
Schreibe eine Klasse `Schueler` mit den Attributen `name` und `noten` (anfangs leere Liste), einer
Methode `note_hinzufuegen(note)` und einer Methode `durchschnitt()`.

<PyRunner>

```python
class Schueler:
    def __init__(self, name):
        pass   # Attribute name und noten anlegen

    # note_hinzufuegen(self, note) ...
    # durchschnitt(self) ...

s = Schueler("Linus")
s.note_hinzufuegen(2)
s.note_hinzufuegen(1)
s.note_hinzufuegen(3)
print(s.name, s.durchschnitt())   # Linus 2.0
```

</PyRunner>

:::details Lösung
```python
class Schueler:
    def __init__(self, name):
        self.name = name
        self.noten = []

    def note_hinzufuegen(self, note):
        self.noten.append(note)

    def durchschnitt(self):
        if not self.noten:
            return 0
        return sum(self.noten) / len(self.noten)
```
:::

### Aufgabe 2: Gültige Noten
Ergänze `note_hinzufuegen` um eine Prüfung: Nur Noten von 1 bis 6 werden angenommen, sonst erscheint
eine Fehlermeldung. Füge außerdem eine Methode `__str__` hinzu, die z. B. `Linus (Ø 2.0)` liefert.

:::details Tipp
`if 1 <= note <= 6:` – und in `__str__` mit `round(self.durchschnitt(), 1)` runden.
:::

### Aufgabe 3: Überweisen
Erweitere die Klasse `Konto` um eine Methode `ueberweisen(self, ziel, betrag)`, die Geld vom eigenen
Konto auf das Konto `ziel` bucht – aber nur, wenn genug Geld vorhanden ist.

<PyRunner>

```python
class Konto:
    def __init__(self, inhaber, kontostand=0):
        self.inhaber = inhaber
        self.kontostand = kontostand

    def ueberweisen(self, ziel, betrag):
        pass

a = Konto("Ada", 100)
b = Konto("Alan", 20)
a.ueberweisen(b, 30)
print(a.kontostand, b.kontostand)   # 70 50
```

</PyRunner>

:::details Lösung
```python
    def ueberweisen(self, ziel, betrag):
        if betrag <= 0 or betrag > self.kontostand:
            print("Überweisung nicht möglich.")
            return
        self.kontostand -= betrag
        ziel.kontostand += betrag
```
:::

### Aufgabe 4: UML zeichnen
Zeichne (auf Papier) das UML-Klassendiagramm deiner Klasse `Schueler` aus Aufgabe 1 und 2.

::: tip Weiterlesen
Die Grundideen der Objektorientierung ohne Python-Code findest du im Kapitel
[Objektorientierung](../../objektorientierung). Weiter geht es mit
[Vererbung & Polymorphie](./vererbung).
:::
