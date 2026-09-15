---
title: "Objektorientierung"
description: "Objektorientierte Programmierung in Python: Klasse und Objekt, Attribute und Methoden, Kapselung, Vererbung und Polymorphie mit interaktiven Beispielen."
---

# Objektorientierung <Badge type="info" text="Oberstufe" />

In Klasse 7 hast du Vektorgrafiken als **Objekte mit Attributen** betrachtet (→ [Digitale Medien](../daten-und-informationen/digitale-medien)). In der **objektorientierten Programmierung (OOP)** baust du solche Objekte selbst.

::: info Merke
| Begriff | Bedeutung |
|---|---|
| **Klasse** | Bauplan, der festlegt, welche Attribute und Methoden Objekte haben |
| **Objekt** (Instanz) | ein konkretes Exemplar, das nach dem Bauplan erzeugt wurde |
| **Attribut** | Eigenschaft eines Objekts; der aktuelle **Attributwert** beschreibt seinen Zustand |
| **Methode** | Fähigkeit eines Objekts, eine Funktion, die zur Klasse gehört |
| **Konstruktor** | besondere Methode, die beim Erzeugen eines Objekts die Attribute setzt (`__init__`) |
:::

## Klasse und Objekt

<PyRunner>

```python
class Haustier:
    def __init__(self, name, art):
        self.name = name          # Attribut
        self.art = art            # Attribut
        self.hunger = 5           # Attribut mit Startwert

    def fuettern(self):           # Methode
        self.hunger = max(0, self.hunger - 3)
        print(f"{self.name} ist satt. Hunger: {self.hunger}")

bello = Haustier("Bello", "Hund")     # Objekt 1
mimi = Haustier("Mimi", "Katze")      # Objekt 2

bello.fuettern()
print(mimi.hunger)   # Mimi wurde nicht gefüttert
```

</PyRunner>

`self` steht für **das Objekt selbst**. So weiß die Methode, **wessen** Hunger sie ändern soll.

## Kapselung

::: info Merke: Kapselung
Die Attribute eines Objekts sollen **nicht beliebig von außen** verändert werden. Zugriff erfolgt über **Methoden**, die prüfen können, ob eine Änderung erlaubt ist. In Python kennzeichnet ein Unterstrich `_attribut` „bitte nicht direkt benutzen“.
:::

<PyRunner>

```python
class Konto:
    def __init__(self, inhaber):
        self.inhaber = inhaber
        self._kontostand = 0

    def einzahlen(self, betrag):
        if betrag > 0:
            self._kontostand += betrag

    def abheben(self, betrag):
        if 0 < betrag <= self._kontostand:
            self._kontostand -= betrag
        else:
            print("Abheben nicht möglich!")

    def get_kontostand(self):
        return self._kontostand

k = Konto("Emma")
k.einzahlen(50)
k.abheben(80)
print(k.get_kontostand())
```

</PyRunner>

## Vererbung

::: info Merke: Vererbung
Eine **Unterklasse** übernimmt alle Attribute und Methoden einer **Oberklasse** und kann **eigene ergänzen** oder **vorhandene überschreiben**. So vermeidet man doppelten Code („ist ein“-Beziehung: Ein Hund *ist ein* Haustier).
:::

## Polymorphie

::: info Merke: Polymorphie
**Polymorphie** (Vielgestaltigkeit): Derselbe Methodenaufruf verhält sich je nach **Klasse des Objekts** unterschiedlich.
:::

<PyRunner>

```python
class Haustier:
    def __init__(self, name):
        self.name = name

    def geraeusch(self):
        return "..."

    def vorstellen(self):
        print(f"{self.name} sagt {self.geraeusch()}")

class Hund(Haustier):             # Hund erbt von Haustier
    def geraeusch(self):          # überschreibt die Methode
        return "Wuff!"

class Katze(Haustier):
    def geraeusch(self):
        return "Miau!"

tiere = [Hund("Bello"), Katze("Mimi"), Haustier("Nemo")]
for tier in tiere:
    tier.vorstellen()             # gleicher Aufruf, verschiedenes Verhalten
```

</PyRunner>

## Klassen entwerfen

Vor dem Programmieren plant man Klassen oft als **Klassendiagramm**:

<table class="struktogramm">
  <tr><td><strong>Konto</strong></td></tr>
  <tr><td>− inhaber: Text<br>− kontostand: Zahl</td></tr>
  <tr><td>+ einzahlen(betrag)<br>+ abheben(betrag)<br>+ get_kontostand(): Zahl</td></tr>
</table>

Oben der Klassenname, in der Mitte die Attribute, unten die Methoden. `−` bedeutet privat, `+` öffentlich.

## Für den Leistungskurs <Badge type="warning" text="Lk" />

- **Assoziation:** Objekte kennen sich („Schüler:in *besucht* Kurs“).
- **Aggregation:** Ein Objekt besteht aus anderen, die auch allein existieren können (Kurs *hat* Schüler:innen).
- **Botschaften und Ereignisse:** Objekte kommunizieren, indem sie Methoden anderer Objekte aufrufen; grafische Oberflächen reagieren auf **Ereignisse** wie Mausklicks.

## Aufgaben

1. Ergänze `Haustier` um eine Methode `spielen()`, die den Hunger um 1 erhöht.
2. Schreibe eine Klasse `Rechteck` mit den Attributen `breite` und `hoehe` und den Methoden `flaeche()` und `umfang()`.
3. Leite von `Konto` eine Klasse `Sparkonto` ab, die zusätzlich eine Methode `zinsen_gutschreiben(prozent)` besitzt.
