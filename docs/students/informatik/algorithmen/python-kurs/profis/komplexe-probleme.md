---
title: "Komplexe Probleme lösen"
description: "Mehrteilige Prüfungsaufgaben systematisch bearbeiten: Operatoren verstehen und drei vollständige Aufgaben zu Dictionaries, Klassen und Rekursion üben."
---

## Ziele
- Operatoren wie „beschreibe", „implementiere", „analysiere" und „beurteile" richtig umsetzen
- Erkennen, wie Teilaufgaben aufeinander aufbauen
- Drei vollständige Aufgaben im Prüfungsformat bearbeiten

## Operatoren – was wird verlangt?

In Klausuren und Prüfungen steht am Anfang jeder Teilaufgabe ein **Operator**. Er sagt dir genau,
was du tun sollst – und was nicht.

| Operator | Was du tun sollst |
|---|---|
| **nenne / gib an** | Stichpunkte oder ein Ergebnis, ohne Begründung |
| **beschreibe** | Ablauf oder Aufbau in eigenen Worten, Pseudocode oder Struktogramm darstellen |
| **erläutere** | beschreiben **und** an einem Beispiel verständlich machen |
| **implementiere** | lauffähigen Code schreiben (hier: Python) |
| **analysiere** | Eigenschaften untersuchen, z. B. die Laufzeit in [O-Notation](../fortgeschritten/komplexitaet) |
| **beurteile / bewerte** | eine begründete eigene Einschätzung abgeben, oft mit Vor- und Nachteilen |

## So gehst du vor

1. **Ganze Aufgabe lesen**, bevor du anfängst. Teilaufgabe d) verrät oft, worauf b) hinausläuft.
2. **Operatoren markieren.** „Beschreibe" heißt: kein Code nötig. „Implementiere" heißt: Code.
3. **Daten verstehen:** Welche Datenstruktur ist gegeben (Liste, Dictionary, Objekte, 2D-Liste)?
   Schreib dir ein kleines Beispiel auf.
4. **Aufeinander aufbauen:** Funktionen aus a) oder b) darfst (und sollst) du in c) benutzen.
5. **Testen** mit den Beispielen aus der Aufgabe – und mit Randfällen (leere Liste, nichts gefunden).

::: tip Nicht hängen bleiben
Kommst du bei b) nicht weiter, bearbeite c) trotzdem und **nimm an**, dass die Funktion aus b)
funktioniert. Das gibt in der Regel trotzdem Punkte.
:::

## Aufgabe 1: Notenverwaltung

**Ausgangssituation:** Eine Lehrkraft speichert die Noten ihrer Klasse in einem Dictionary. Der
Schlüssel ist der Name, der Wert ist eine Liste von Noten (1 = sehr gut bis 6 = ungenügend).

```python
noten = {
    "Ada":   [2, 1, 2, 3],
    "Ben":   [4, 5, 3, 4],
    "Clara": [1, 2, 1, 1],
    "David": [5, 4, 5, 3],
    "Emma":  [3, 3, 2, 4],
}
```

**a)** Beschreibe in Pseudocode einen Algorithmus, der den Durchschnitt einer Notenliste berechnet,
ohne `sum()` zu benutzen. Berücksichtige auch eine leere Liste.

**b)** Implementiere `durchschnitt(liste)` und `klassenbeste(noten)`. Letztere gibt Name und
Durchschnitt der Person mit dem **besten** (also kleinsten) Durchschnitt zurück.

**c)** Implementiere `gefaehrdet(noten, grenze)`, die eine Liste aller Namen liefert, deren
Durchschnitt 4,0 oder schlechter ist.

**d)** Analysiere die Laufzeit von `klassenbeste` für *n* Personen mit je *m* Noten. Beurteile, ob
ein Dictionary hier besser geeignet ist als eine Liste von Paaren `[("Ada", [2, 1, 2, 3]), ...]`.

<PyRunner>

```python
noten = {
    "Ada":   [2, 1, 2, 3],
    "Ben":   [4, 5, 3, 4],
    "Clara": [1, 2, 1, 1],
    "David": [5, 4, 5, 3],
    "Emma":  [3, 3, 2, 4],
}

def durchschnitt(liste):
    pass

def klassenbeste(noten):
    pass

def gefaehrdet(noten, grenze=4.0):
    pass

print(durchschnitt(noten["Ada"]))     # 2.0
print(klassenbeste(noten))            # ('Clara', 1.25)
print(gefaehrdet(noten))              # ['Ben', 'David']
```

</PyRunner>

:::details Lösung
**a)**
```text
funktion durchschnitt(liste):
    wenn liste leer: gib 0 zurück
    summe = 0
    für jede note n in liste:
        summe = summe + n
    gib summe / Länge(liste) zurück
```

**b) und c)**
```python
def durchschnitt(liste):
    if len(liste) == 0:
        return 0
    summe = 0
    for n in liste:
        summe += n
    return summe / len(liste)

def klassenbeste(noten):
    bester_name = None
    bester_schnitt = 7          # schlechter als jede mögliche Note
    for name in noten:
        s = durchschnitt(noten[name])
        if s < bester_schnitt:
            bester_schnitt = s
            bester_name = name
    return bester_name, bester_schnitt

def gefaehrdet(noten, grenze=4.0):
    ergebnis = []
    for name in noten:
        if durchschnitt(noten[name]) >= grenze:
            ergebnis.append(name)
    return ergebnis
```

**d)** Für jede der *n* Personen wird der Durchschnitt über *m* Noten berechnet: **O(n · m)**.
Für `klassenbeste` muss man ohnehin alle Personen anschauen, da ist eine Liste von Paaren genauso
schnell. Will man aber die Noten **einer bestimmten Person** nachschlagen, braucht die Liste O(n)
(lineare Suche), das Dictionary nur O(1). Außerdem verhindert das Dictionary doppelte Namen. Das
Dictionary ist also besser geeignet.
:::

## Aufgabe 2: Lagerverwaltung

**Ausgangssituation:** Ein Baumarkt verwaltet seine Artikel. Jeder Artikel hat einen Namen, einen
Stückpreis und einen Bestand. Das Lager enthält eine Liste von Artikeln.

**a)** Beschreibe die beiden Klassen `Artikel` und `Lager`: Welche Attribute und welche Methoden
brauchen sie? (Eine Tabelle oder ein Klassendiagramm genügt.)

**b)** Implementiere die Klasse `Artikel` mit der Methode `wert()` (Preis · Bestand) sowie die
Klasse `Lager` mit `hinzufuegen(artikel)`, `suchen(name)` und `gesamtwert()`.

**c)** Implementiere `entnehmen(name, menge)`. Die Methode gibt `False` zurück, wenn es den Artikel
nicht gibt, die Menge nicht positiv ist oder der Bestand nicht reicht – sonst wird der Bestand
verringert und `True` zurückgegeben. Implementiere außerdem `nachbestellen(grenze)`, das die Namen
aller Artikel mit Bestand unter `grenze` liefert.

**d)** Analysiere die Laufzeit von `suchen` und `entnehmen` bei *n* Artikeln. Beurteile einen
Vorschlag, die Artikel statt in einer Liste in einem Dictionary `{name: artikel}` zu speichern.

<PyRunner>

```python
class Artikel:
    def __init__(self, name, preis, bestand):
        pass

    def wert(self):
        pass


class Lager:
    def __init__(self):
        self.artikel = []

    def hinzufuegen(self, artikel):
        pass

    def suchen(self, name):
        pass

    def gesamtwert(self):
        pass

    def entnehmen(self, name, menge):
        pass

    def nachbestellen(self, grenze):
        pass


lager = Lager()
lager.hinzufuegen(Artikel("Schraube", 0.10, 500))
lager.hinzufuegen(Artikel("Dübel", 0.05, 80))
lager.hinzufuegen(Artikel("Hammer", 12.50, 4))

print(lager.entnehmen("Dübel", 50))     # True
print(lager.entnehmen("Hammer", 10))    # False
print(lager.entnehmen("Säge", 1))       # False
print(lager.gesamtwert())               # 101.5
print(lager.nachbestellen(40))          # ['Dübel', 'Hammer']
```

</PyRunner>

:::details Lösung
**a)**

| Klasse | Attribute | Methoden |
|---|---|---|
| `Artikel` | `name`, `preis`, `bestand` | `wert()` |
| `Lager` | `artikel` (Liste von `Artikel`-Objekten) | `hinzufuegen()`, `suchen()`, `gesamtwert()`, `entnehmen()`, `nachbestellen()` |

**b) und c)**
```python
class Artikel:
    def __init__(self, name, preis, bestand):
        self.name = name
        self.preis = preis
        self.bestand = bestand

    def wert(self):
        return self.preis * self.bestand


class Lager:
    def __init__(self):
        self.artikel = []

    def hinzufuegen(self, artikel):
        self.artikel.append(artikel)

    def suchen(self, name):
        for a in self.artikel:
            if a.name == name:
                return a
        return None

    def gesamtwert(self):
        summe = 0
        for a in self.artikel:
            summe += a.wert()
        return summe

    def entnehmen(self, name, menge):
        a = self.suchen(name)            # Methode aus b) wiederverwenden
        if a is None or menge <= 0 or menge > a.bestand:
            return False
        a.bestand -= menge
        return True

    def nachbestellen(self, grenze):
        return [a.name for a in self.artikel if a.bestand < grenze]
```

**d)** `suchen` ist eine lineare Suche: **O(n)** im schlechtesten Fall. `entnehmen` ruft `suchen`
auf und macht danach nur noch konstant viele Schritte, ist also ebenfalls **O(n)**. Mit einem
Dictionary wäre das Nachschlagen **O(1)** – bei Tausenden Artikeln ein deutlicher Vorteil. Nachteil:
Jeder Name darf nur einmal vorkommen, und beim Umbenennen muss der Schlüssel angepasst werden. Für
einen Baumarkt überwiegt der Vorteil.
:::

## Aufgabe 3: Weg durchs Labyrinth

**Ausgangssituation:** Ein Labyrinth ist als Liste von Zeichenketten gespeichert und wird in eine
2D-Liste umgewandelt. `#` ist eine Wand, `.` ein freies Feld, `S` der Start und `Z` das Ziel. Man
darf nach oben, unten, links und rechts gehen.

**a)** Beschreibe in Pseudocode eine **rekursive** Suche, die einen Weg von einem Feld zum Ziel
findet. Erläutere, warum man sich besuchte Felder merken muss.

**b)** Implementiere `nachbarn(feld, z, s)`, die eine Liste aller begehbaren Nachbarfelder
`(zeile, spalte)` liefert.

**c)** Implementiere `suche(feld, z, s, besucht, weg)`. Sie gibt `True` zurück, wenn vom Feld
`(z, s)` aus das Ziel erreichbar ist, und sammelt dabei den Weg in der Liste `weg`.

**d)** Analysiere die Laufzeit für ein Labyrinth mit *z* Zeilen und *s* Spalten. Beurteile, ob die
Suche den **kürzesten** Weg findet.

<PyRunner>

```python
labyrinth = [
    "###########",
    "#S......Z.#",
    "#.#######.#",
    "#.#.......#",
    "#.#.#####.#",
    "#.........#",
    "###########",
]
feld = [list(zeile) for zeile in labyrinth]

def finde(feld, zeichen):
    for z in range(len(feld)):
        for s in range(len(feld[z])):
            if feld[z][s] == zeichen:
                return (z, s)
    return None

def nachbarn(feld, z, s):
    # Reihenfolge: oben, unten, links, rechts
    pass

def suche(feld, z, s, besucht, weg):
    pass

start = finde(feld, "S")
print(nachbarn(feld, 1, 1))        # [(2, 1), (1, 2)]
weg = []
if suche(feld, start[0], start[1], set(), weg):
    for z, s in weg[1:-1]:
        feld[z][s] = "+"
    for zeile in feld:
        print("".join(zeile))
    print("Weglänge:", len(weg) - 1)
else:
    print("kein Weg")
```

</PyRunner>

:::details Lösung
**a)**
```text
funktion suche(feld, position):
    wenn position schon besucht: gib falsch zurück
    markiere position als besucht, hänge sie an den Weg an
    wenn position das Ziel ist: gib wahr zurück
    für jeden begehbaren Nachbarn:
        wenn suche(feld, nachbar) wahr ist: gib wahr zurück
    entferne position wieder aus dem Weg   (Sackgasse)
    gib falsch zurück
```
Ohne Markierung würde die Suche zwischen zwei Feldern endlos hin- und herlaufen – die Rekursion
bricht dann nie ab.

**b) und c)**
```python
def nachbarn(feld, z, s):
    ergebnis = []
    for dz, ds in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        nz, ns = z + dz, s + ds
        if 0 <= nz < len(feld) and 0 <= ns < len(feld[nz]) and feld[nz][ns] != "#":
            ergebnis.append((nz, ns))
    return ergebnis

def suche(feld, z, s, besucht, weg):
    if (z, s) in besucht:
        return False
    besucht.add((z, s))
    weg.append((z, s))
    if feld[z][s] == "Z":
        return True
    for nz, ns in nachbarn(feld, z, s):
        if suche(feld, nz, ns, besucht, weg):
            return True
    weg.pop()                      # Sackgasse: Feld wieder aus dem Weg entfernen
    return False
```

**d)** Jedes Feld wird höchstens einmal besucht, und pro Feld werden höchstens 4 Nachbarn geprüft:
**O(z · s)**. Den kürzesten Weg findet die Suche aber **nicht** unbedingt: Weil sie zuerst nach
unten geht, findet sie hier einen Umweg der Länge 17, obwohl das Ziel nur 7 Schritte rechts vom
Start liegt. Für den kürzesten Weg bräuchte man eine **Breitensuche**, die alle Felder in
Entfernung 1, dann 2, dann 3, … der Reihe nach untersucht.
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Notenverwaltung erweitern
Ergänze Aufgabe 1 um eine Funktion `notenspiegel(noten)`, die ein Dictionary zurückgibt, wie oft
jede Note 1 bis 6 in der ganzen Klasse vorkommt. Analysiere ihre Laufzeit.

### Aufgabe 2: Eigene Prüfungsaufgabe
Denke dir selbst eine Aufgabe mit Teilaufgaben a) bis d) zu einem Thema deiner Wahl aus (z. B.
Bibliothek, Kinoreservierung, Bundesjugendspiele). Verwende jeden der Operatoren *beschreibe*,
*implementiere*, *analysiere* und *beurteile* mindestens einmal. Tausche die Aufgabe mit einem
Partner oder einer Partnerin und löst sie gegenseitig.
