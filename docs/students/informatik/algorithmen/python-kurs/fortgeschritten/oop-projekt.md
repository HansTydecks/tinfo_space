---
title: "OOP-Projekt: Mediathek"
description: "Eine kleine Schulmediathek in Etappen programmieren – mit mehreren Klassen, Vererbung und Polymorphie."
outline: deep
---

## Ziele
- Ein Problem in **mehrere Klassen** zerlegen
- Vererbung und Polymorphie in einem echten Projekt einsetzen
- Objekte miteinander arbeiten lassen (ein Objekt kennt andere Objekte)
- Ein Programm schrittweise in **Etappen** entwickeln

::: tip Vorgehen
Wir bauen die Mediathek in **vier Etappen**. Führe jede Etappe aus, bevor du weiterliest.
Grundlagen: [Klassen & Objekte](./klassen-objekte) und [Vererbung & Polymorphie](./vererbung).
:::

## Der Plan

Die Schulmediathek verleiht **Bücher** und **Filme** an **Mitglieder**. Wir brauchen:

```text
┌────────────────────────┐        ┌────────────────────────┐
│        Medium          │        │       Mitglied         │
├────────────────────────┤        ├────────────────────────┤
│ + titel                │        │ + name                 │
│ + jahr                 │        │ + ausgeliehen: list    │
│ + ausleiher: Mitglied  │        └────────────────────────┘
├────────────────────────┤
│ + ist_verfuegbar()     │        ┌────────────────────────┐
│ + __str__()            │        │       Mediathek        │
└──────────▲─────────────┘        ├────────────────────────┤
           │                      │ + medien: list         │
     ┌─────┴──────┐               ├────────────────────────┤
┌────┴────┐  ┌────┴────┐          │ + hinzufuegen(medium)  │
│  Buch   │  │  Film   │          │ + ausleihen(...)       │
│ + autor │  │ + dauer │          │ + zurueckgeben(...)    │
└─────────┘  └─────────┘          │ + suchen(text)         │
                                  │ + liste_ausgeben()     │
                                  └────────────────────────┘
```

## Etappe 1: Medium, Buch und Film

`Medium` enthält alles, was Bücher und Filme gemeinsam haben. Die Unterklassen ergänzen ihre
Besonderheiten und überschreiben `__str__`.

<PyRunner>

```python
class Medium:
    def __init__(self, titel, jahr):
        self.titel = titel
        self.jahr = jahr
        self.ausleiher = None          # None = niemand hat es ausgeliehen

    def ist_verfuegbar(self):
        return self.ausleiher is None

    def __str__(self):
        return f"{self.titel} ({self.jahr})"

class Buch(Medium):
    def __init__(self, titel, jahr, autor):
        super().__init__(titel, jahr)
        self.autor = autor

    def __str__(self):
        return f"Buch: {super().__str__()} von {self.autor}"

class Film(Medium):
    def __init__(self, titel, jahr, dauer):
        super().__init__(titel, jahr)
        self.dauer = dauer

    def __str__(self):
        return f"Film: {super().__str__()}, {self.dauer} min"

print(Buch("Momo", 1973, "Michael Ende"))
print(Film("Das Boot", 1981, 149))
```

</PyRunner>

:::details Erklärung
`None` ist Pythons Wert für „nichts". Solange `ausleiher` gleich `None` ist, ist das Medium
verfügbar. Später speichern wir dort das **Mitglied-Objekt**, das es ausgeliehen hat.
:::

## Etappe 2: Mitglieder

Ein Mitglied merkt sich, welche Medien es gerade hat. Wir begrenzen die Ausleihe auf drei Medien:

<PyRunner>

```python
class Mitglied:
    MAX_AUSLEIHEN = 3

    def __init__(self, name):
        self.name = name
        self.ausgeliehen = []

    def darf_ausleihen(self):
        return len(self.ausgeliehen) < Mitglied.MAX_AUSLEIHEN

    def __str__(self):
        return f"{self.name} ({len(self.ausgeliehen)} ausgeliehen)"

ada = Mitglied("Ada")
print(ada, ada.darf_ausleihen())
```

</PyRunner>

::: tip Klassenattribut
`MAX_AUSLEIHEN` steht direkt in der Klasse, nicht in `__init__`. Es ist ein **Klassenattribut** –
alle Mitglieder teilen sich denselben Wert.
:::

## Etappe 3: Ausleihen und Zurückgeben

Jetzt kommt die Klasse `Mediathek`, die alles verwaltet. Beim Ausleihen müssen **beide Seiten**
aktualisiert werden: Das Medium bekommt einen Ausleiher, das Mitglied ein Medium mehr.

<PyRunner>

```python
class Medium:
    def __init__(self, titel, jahr):
        self.titel = titel
        self.jahr = jahr
        self.ausleiher = None

    def ist_verfuegbar(self):
        return self.ausleiher is None

class Mitglied:
    def __init__(self, name):
        self.name = name
        self.ausgeliehen = []

class Mediathek:
    def __init__(self):
        self.medien = []

    def hinzufuegen(self, medium):
        self.medien.append(medium)

    def ausleihen(self, mitglied, medium):
        if not medium.ist_verfuegbar():
            print(f"'{medium.titel}' ist schon ausgeliehen.")
            return False
        medium.ausleiher = mitglied
        mitglied.ausgeliehen.append(medium)
        print(f"{mitglied.name} leiht '{medium.titel}' aus.")
        return True

    def zurueckgeben(self, medium):
        if medium.ist_verfuegbar():
            print(f"'{medium.titel}' war gar nicht ausgeliehen.")
            return
        medium.ausleiher.ausgeliehen.remove(medium)
        print(f"{medium.ausleiher.name} gibt '{medium.titel}' zurück.")
        medium.ausleiher = None

m = Mediathek()
momo = Medium("Momo", 1973)
m.hinzufuegen(momo)
ada, alan = Mitglied("Ada"), Mitglied("Alan")
m.ausleihen(ada, momo)
m.ausleihen(alan, momo)
m.zurueckgeben(momo)
m.ausleihen(alan, momo)
```

</PyRunner>

## Etappe 4: Das komplette Programm

Zum Schluss kommen Suche und Übersicht dazu. Achte in `liste_ausgeben` auf die **Polymorphie**:
`print(medium)` ruft automatisch das passende `__str__` von `Buch` oder `Film` auf.

<PyRunner>

```python
class Medium:
    def __init__(self, titel, jahr):
        self.titel = titel
        self.jahr = jahr
        self.ausleiher = None

    def ist_verfuegbar(self):
        return self.ausleiher is None

    def __str__(self):
        return f"{self.titel} ({self.jahr})"

class Buch(Medium):
    def __init__(self, titel, jahr, autor):
        super().__init__(titel, jahr)
        self.autor = autor

    def __str__(self):
        return f"Buch: {super().__str__()} von {self.autor}"

class Film(Medium):
    def __init__(self, titel, jahr, dauer):
        super().__init__(titel, jahr)
        self.dauer = dauer

    def __str__(self):
        return f"Film: {super().__str__()}, {self.dauer} min"

class Mitglied:
    MAX_AUSLEIHEN = 3

    def __init__(self, name):
        self.name = name
        self.ausgeliehen = []

    def darf_ausleihen(self):
        return len(self.ausgeliehen) < Mitglied.MAX_AUSLEIHEN

class Mediathek:
    def __init__(self):
        self.medien = []

    def hinzufuegen(self, medium):
        self.medien.append(medium)

    def ausleihen(self, mitglied, medium):
        if not medium.ist_verfuegbar():
            print(f"  '{medium.titel}' ist schon ausgeliehen.")
        elif not mitglied.darf_ausleihen():
            print(f"  {mitglied.name} hat schon zu viele Medien.")
        else:
            medium.ausleiher = mitglied
            mitglied.ausgeliehen.append(medium)
            print(f"  {mitglied.name} leiht '{medium.titel}' aus.")

    def zurueckgeben(self, medium):
        if medium.ist_verfuegbar():
            print(f"  '{medium.titel}' war nicht ausgeliehen.")
        else:
            medium.ausleiher.ausgeliehen.remove(medium)
            print(f"  {medium.ausleiher.name} gibt '{medium.titel}' zurück.")
            medium.ausleiher = None

    def suchen(self, text):
        return [m for m in self.medien if text.lower() in m.titel.lower()]

    def liste_ausgeben(self):
        for medium in self.medien:
            if medium.ist_verfuegbar():
                status = "verfügbar"
            else:
                status = "bei " + medium.ausleiher.name
            print(f"  {medium}  [{status}]")

# --- Testen ---
bib = Mediathek()
momo = Buch("Momo", 1973, "Michael Ende")
tschick = Buch("Tschick", 2010, "Wolfgang Herrndorf")
boot = Film("Das Boot", 1981, 149)
lola = Film("Lola rennt", 1998, 81)
for medium in [momo, tschick, boot, lola]:
    bib.hinzufuegen(medium)

ada = Mitglied("Ada")
alan = Mitglied("Alan")

print("Ausleihen:")
bib.ausleihen(ada, momo)
bib.ausleihen(ada, boot)
bib.ausleihen(alan, momo)
bib.ausleihen(alan, lola)

print("Bestand:")
bib.liste_ausgeben()

print("Zurückgeben:")
bib.zurueckgeben(momo)
bib.ausleihen(alan, momo)

print("Suche nach 'o':")
for treffer in bib.suchen("o"):
    print(" ", treffer)
```

</PyRunner>

:::details Erklärung
- `bib.suchen("o")` findet alle Medien, deren Titel ein „o" enthält – egal ob groß oder klein,
  weil beide Seiten mit `.lower()` verglichen werden. Hier sind das „Momo", „Das Boot" und
  „Lola rennt" – in „Tschick" steckt kein „o".
- Die Objekte **kennen sich gegenseitig**: Ein Medium speichert sein Mitglied in `ausleiher`, ein
  Mitglied seine Medien in `ausgeliehen`. Deshalb muss `Mediathek` beim Ausleihen und Zurückgeben
  immer beide Seiten ändern.
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin. Arbeite jeweils mit
dem kompletten Programm aus Etappe 4.

### Aufgabe 1: Neuer Medientyp
Ergänze eine Klasse `Hoerbuch`, die von `Buch` erbt und zusätzlich einen `sprecher` hat. Ihr
`__str__` soll mit `Hörbuch:` beginnen. Füge ein Hörbuch zur Mediathek hinzu – `liste_ausgeben`
muss dafür **nicht** geändert werden.

:::details Tipp
`super().__init__(titel, jahr, autor)` ruft den Konstruktor von `Buch` auf, der wiederum den von
`Medium` aufruft.
:::

### Aufgabe 2: Was hat Ada?
Schreibe in `Mediathek` eine Methode `ausgeliehen_von(mitglied)`, die alle Medien des Mitglieds
ausgibt. Gibt es nichts, soll „keine Medien" erscheinen.

### Aufgabe 3: Nur verfügbare Filme
Schreibe eine Methode `verfuegbare_filme()`, die eine Liste aller Filme zurückgibt, die gerade nicht
ausgeliehen sind. Nutze `isinstance`.

:::details Lösung
```python
    def verfuegbare_filme(self):
        return [m for m in self.medien
                if isinstance(m, Film) and m.ist_verfuegbar()]
```
:::

### Aufgabe 4: Leihfrist und Gebühren
Filme dürfen 7 Tage, Bücher 21 Tage ausgeliehen werden. Gib `Medium` eine Methode `leihfrist()`, die
von `Buch` und `Film` überschrieben wird. Erweitere `zurueckgeben(medium, tage)`: Für jeden Tag über
der Frist werden 0,50 € fällig.

### Aufgabe 5: Menü
Baue mit `input()` ein Textmenü (`1` = Liste, `2` = Suchen, `3` = Ausleihen, `4` = Zurückgeben,
`0` = Ende), über das man die Mediathek bedienen kann.

:::tip Geschafft!
Du hast ein Programm aus fünf zusammenarbeitenden Klassen gebaut – genau so werden auch große
Softwareprojekte organisiert: viele kleine Klassen mit klaren Aufgaben.
:::
