---
title: "Strukturierte Datentypen"
description: "Listen, Tupel und Dictionaries: Daten sinnvoll bündeln, verschachteln und den passenden Typ wählen."
---

## Ziele
- Listen und 2D-Listen sicher benutzen
- **Tupel** als unveränderliche Datensätze einsetzen
- **Dictionaries** anlegen, durchlaufen und als Zähler verwenden
- Verschachtelte Daten verarbeiten und den passenden Datentyp auswählen

## Listen – Wiederholung

Eine Liste speichert mehrere Werte **geordnet** und ist **veränderbar**:

<PyRunner>

```python
noten = [2, 1, 3, 2]
noten.append(1)
noten[0] = 4
print(noten, "Durchschnitt:", sum(noten) / len(noten))
```

</PyRunner>

### 2D-Listen

Eine Liste kann wieder Listen enthalten – so entsteht eine Tabelle oder ein Spielfeld.
Mit `feld[zeile][spalte]` greifst du auf ein Element zu:

<PyRunner>

```python
feld = [
    ["X", "O", "X"],
    [" ", "X", "O"],
    ["O", " ", "X"],
]
print(feld[1][2])          # Zeile 1, Spalte 2 -> O

for zeile in feld:
    print("|".join(zeile))
```

</PyRunner>

## Tupel

Ein **Tupel** sieht aus wie eine Liste, steht aber in runden Klammern und ist **unveränderlich**.
Es eignet sich für Daten, die fest zusammengehören, z. B. ein Punkt `(x, y)` oder ein Datum.

<PyRunner>

```python
punkt = (3, 4)
print(punkt[0], punkt[1])

x, y = punkt                # Entpacken
print("x =", x, "y =", y)

try:
    punkt[0] = 10
except TypeError as fehler:
    print("Fehler:", fehler)
```

</PyRunner>

### Mehrere Werte zurückgeben

Eine Funktion gibt eigentlich nur **einen** Wert zurück – aber das darf ein Tupel sein:

<PyRunner>

```python
def min_max(werte):
    return min(werte), max(werte)    # das ist ein Tupel

kleinster, groesster = min_max([7, 2, 9, 4])
print(kleinster, groesster)

a, b = 1, 2
a, b = b, a                          # Tauschen mit Tupeln
print(a, b)
```

</PyRunner>

## Dictionaries

Ein **Dictionary** speichert Paare aus **Schlüssel** und **Wert**. Statt über eine Position greifst
du über den Schlüssel zu:

<PyRunner>

```python
telefon = {"Ada": "0151-111", "Alan": "0160-222"}
telefon["Grace"] = "0170-333"        # hinzufügen
print(telefon["Alan"])

print(telefon.get("Linus", "unbekannt"))   # kein Fehler, wenn der Schlüssel fehlt

for name, nummer in telefon.items():
    print(name, "->", nummer)
```

</PyRunner>

:::details Erklärung
- `telefon["Linus"]` würde einen `KeyError` auslösen, weil es den Schlüssel nicht gibt.
  `.get(schluessel, standard)` liefert stattdessen den Standardwert.
- `for name in telefon:` durchläuft nur die **Schlüssel**, `.values()` nur die **Werte**,
  `.items()` liefert **Paare** (als Tupel!).
:::

### Zählen mit einem Dictionary

<PyRunner>

```python
farben = ["rot", "blau", "rot", "grün", "rot", "blau"]
anzahl = {}
for f in farben:
    anzahl[f] = anzahl.get(f, 0) + 1
print(anzahl)
```

</PyRunner>

## Verschachtelte Daten

Richtig mächtig wird es, wenn man die Typen kombiniert. Eine **Liste von Dictionaries** ist wie
eine Tabelle: Jedes Dictionary ist eine Zeile.

<PyRunner>

```python
schueler = [
    {"name": "Ada",   "noten": [1, 2, 1]},
    {"name": "Alan",  "noten": [3, 2, 2]},
    {"name": "Grace", "noten": [2, 1, 1]},
]

for s in schueler:
    schnitt = sum(s["noten"]) / len(s["noten"])
    print(f"{s['name']:6} {schnitt:.2f}")
```

</PyRunner>

Umgekehrt kann ein **Dictionary Listen** als Werte enthalten, z. B. Kurse mit Teilnehmenden:

<PyRunner>

```python
kurse = {"Informatik": ["Ada", "Alan"], "Physik": ["Grace"]}
kurse["Physik"].append("Linus")
kurse["Kunst"] = []

for kurs, teilnehmer in kurse.items():
    print(kurs, len(teilnehmer), teilnehmer)
```

</PyRunner>

## Wann welcher Typ?

| Typ | Schreibweise | veränderbar | Zugriff | typischer Einsatz |
|---|---|---|---|---|
| Liste | `[1, 2, 3]` | ja | Index `0, 1, …` | Folge gleichartiger Werte, Reihenfolge wichtig |
| Tupel | `(3, 4)` | nein | Index `0, 1, …` | fester Datensatz, mehrere Rückgabewerte |
| Dictionary | `{"a": 1}` | ja | Schlüssel | Nachschlagen, Zählen, benannte Felder |

::: tip Faustregel
Fragst du „das **wievielte** Element?" → Liste. Fragst du „der Wert **zu** …?" → Dictionary.
Soll sich nichts ändern dürfen → Tupel.
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Zeilensummen
Gib für jede Zeile der 2D-Liste die Summe aus und danach die Gesamtsumme.

<PyRunner>

```python
tabelle = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
# for zeile in tabelle: ...
```

</PyRunner>

:::details Lösung
```python
tabelle = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
gesamt = 0
for zeile in tabelle:
    print(sum(zeile))
    gesamt += sum(zeile)
print("Gesamt:", gesamt)
```
Ausgabe: 6, 15, 24 und `Gesamt: 45`.
:::

### Aufgabe 2: Statistik als Tupel
Schreibe `statistik(werte)`, die Minimum, Maximum und Durchschnitt als Tupel zurückgibt. Entpacke das
Ergebnis in drei Variablen.

<PyRunner>

```python
def statistik(werte):
    pass

mini, maxi, schnitt = statistik([4, 8, 15, 16, 23, 42])
print(mini, maxi, schnitt)
```

</PyRunner>

:::details Lösung
```python
def statistik(werte):
    return min(werte), max(werte), sum(werte) / len(werte)

mini, maxi, schnitt = statistik([4, 8, 15, 16, 23, 42])
print(mini, maxi, schnitt)
```
Ausgabe: `4 42 18.0`
:::

### Aufgabe 3: Bestnote finden
Gib aus der Schülerliste den Namen mit dem besten (kleinsten) Notendurchschnitt aus.

<PyRunner>

```python
schueler = [
    {"name": "Ada",   "noten": [1, 2, 1]},
    {"name": "Alan",  "noten": [3, 2, 2]},
    {"name": "Grace", "noten": [2, 1, 1]},
]
# beste = None, bester_schnitt = 7 ...
```

</PyRunner>

:::details Tipp
Merke dir in zwei Variablen den bisher besten Namen und Schnitt. Ada und Grace haben beide 1,33 – mit
`<` gewinnt, wer zuerst kommt.
:::

:::details Lösung
```python
schueler = [
    {"name": "Ada",   "noten": [1, 2, 1]},
    {"name": "Alan",  "noten": [3, 2, 2]},
    {"name": "Grace", "noten": [2, 1, 1]},
]
beste = None
bester_schnitt = 7
for s in schueler:
    schnitt = sum(s["noten"]) / len(s["noten"])
    if schnitt < bester_schnitt:
        bester_schnitt = schnitt
        beste = s["name"]
print(beste, round(bester_schnitt, 2))
```
Ausgabe: `Ada 1.33`
:::

## Übungen zu diesem Kapitel

Diese Seiten wenden strukturierte Datentypen an:

- [Textanalyse](./textanalyse) – Dictionary als Zähler
- [Ziffern & Stellenwerte](./ziffern) – Zahlen in Ziffern zerlegen und sammeln
- [Palindrome](./palindrom) – Zeichenketten als Folgen von Zeichen vergleichen
