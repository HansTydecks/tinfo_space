---
title: "Datentypen und einfache Verzweigungen"
description: "Verschiedene Datentypen verstehen und einfache Entscheidungen mit if-Anweisungen programmieren."
---

## Ziele
- Verschiedene Datentypen unterscheiden und anwenden
- Einfache Bedingungen mit if-else formulieren
- Vergleichsoperatoren korrekt verwenden

## Datentypen von Variablen

Im letzten Block hast du gelernt wie man mit Variablen umgeht, bedeutet, du kannst Variablen nun *initiieren*, ihnen einen *Wert zuweisen* und mit ihnen *rechnen*. Nach dem Behältermodell scheinen also Variablen immer Zahlen zu halten. In der Realität können von uns definierte Variablen noch Werte ganz unterschiedlicher Art, also andere Werte als Zahlen, halten.

| Name des Datentyps | Was Python erwartet        | Beispiel in Python                      |
|--------------------|----------------------------|-----------------------------------------|
| Integer `(int)`    | ganze Zahl                 | `x = 3`, `zahl = -5`                    |
| Float `(float)`    | Gleitkommazahl             | `height = 163.5`, `speed = 4.52`        |
| String `(str)`     | Text                       | `name = "Thomas"`, `msg = "Hallo Welt"` |
| Boolean `(bool)`   | Wahrheitswert (true/false) | `win = True`, `verloren = False`        |

Die gute Nachricht: Python kümmert sich um die Verwaltung häufig selbstständig. Wollen wir z.B. mit ganzen und Kommazahlen gleichzeitig rechnen, so ist das überhaupt kein Problem.

```python
import turtle
t = turtle.Turtle()

i = 10 # [!code focus]
f = 3.6 # [!code focus]
t.write(i - f) # [!code focus]
```

Versucht man jedoch einfach mit einem String von Buchstaben zu rechnen, so wird das nicht funktionieren.

```python
import turtle
t = turtle.Turtle()

text = "Hallo"
t.write(10 + text)
```

:::detail Erklärung
Hier kommt es zu einem Fehler, da Python nicht weiß, wie es eine Zahl mit einem Text zusammenzählen soll.
:::

## Einfache Verzweigungen

### Einfache Bedingungen

Bedingungen kennst du bereits von Karol. Manchmal musste man mit `IstWand` prüfen, ob Karol vor einer Wand steht und anhand dieser Bedingung entscheiden, ob sie einen Schritt nach vorne machen sollte. Bedingungen sind also entscheidend für den Verlauf deines Programmes und werden besonders interessant, wenn wir sie mit Variablen selbst gestalten können.

```python
import turtle
t = turtle.Turtle()

x = 6
if x < 5:
    t.write("x ist kleiner 5!")
else:
    t.write("x ist groesser-gleich 5!")
```

:::detail Erklärung
Tobi prüft zuerst ob die Bedingung `x < 5` True ist. Das ist sie nicht, also führt er die Anweisung `t.write("x ist kleiner 5!")` nicht aus. Da es ein `else` gibt, führt er die Alternative aus.
:::

Man beachte den **häufig vergessenen Doppelpunkt hinter der Bedingung**.

#### Mögliche Vergleichsoperatoren
| Operator | Name                     | Beispiel-Bedingung | Wert für `x`, der `True` ergibt | Wert für `x`, der `False` ergibt |
|:-------:|---------------------------|-------------------:|--------------------------------:|---------------------------------:|
| `==`    | Gleichheit                | `x == 5`           | `5`                             | `3`                              |
| `!=`    | Ungleichheit              | `x != 5`           | `3`                             | `5`                              |
| `<`     | Kleiner als               | `x < 5`            | `4`                             | `5`                              |
| `<=`    | Kleiner oder gleich       | `x <= 5`           | `5`                             | `6`                              |
| `>`     | Größer als                | `x > 5`            | `6`                             | `5`                              |
| `>=`    | Größer oder gleich        | `x >= 5`           | `5`                             | `4`                              |

:::danger Warnung
Einen der häufigsten Fehler beim Programmieren ist es, `=` und `==` zu vertauschen. `=` kennen wir als Zuweisungsoperator von den Variablen. Mit `x == 5` **prüfen** wir, ob diese Bedingung stimmt.
:::

## Aufgaben

### Aufgabe 1: Altersgruppen
Schreibe ein Programm, das das Alter einer Person in einer Variable speichert und je nach Alter eine passende Nachricht ausgibt:
- Unter 12: "Du bist ein Kind"
- 12-17: "Du bist ein Jugendlicher"  
- Ab 18: "Du bist erwachsen"

### Aufgabe 2: Notenausgabe
Erstelle ein Programm, das eine Punktzahl (0-15) in eine Note umwandelt:
- 15-13 Punkte: "Sehr gut"
- 12-10 Punkte: "Gut"
- 9-7 Punkte: "Befriedigend"
- 6-4 Punkte: "Ausreichend"
- Unter 4 Punkte: "Mangelhaft"

### Aufgabe 3: Temperatur-Check
Schreibe ein Programm, das eine Temperatur auswertet:
- Unter 0°C: "Es ist gefroren"
- 0-10°C: "Es ist kalt"
- 11-25°C: "Angenehme Temperatur"
- Über 25°C: "Es ist warm"

## Vorbereitung für Block 3
Bereite dich auf verknüpfte Bedingungen vor, indem du überlegst, wie man mehrere Bedingungen gleichzeitig prüfen könnte.
import turtle
t = turtle.Turtle()

for i in range(1, 10):
    t.write(i)
    t.forward(10)
t.forward(10)
```
 Dabei ist `i` eine Variable, die genau wie die Variablen aus Block 1 genutzt werden kann. Wichtig: sie wird am Ende des Schleife immer um 1 erhöht. Häufig wird sie auch Zählvariable genannt. Schau dir das Ergebnis am Bildschirm erneut an. Fällt dir auf, wo die Schleife beginnt und endet?
:::details Wichtiger Hinweis
Die Zählvariable `i` ist zu Beginn der Schleife gleich der ersten Zahl in `range(anfang, ende)`. `i` wird jedoch nie zu `ende`, da die Abbruchbedingung der Schleife (wann sie nicht mehr ausgeführt werden soll) erreicht ist *sobald `i` das `ende`* erreicht. In unserem Beispiel zählt `i` also hoch bis 9, wird dann um 1 erhöht und bricht somit die Schleife ab, weil unser `ende` gleich 10 ist.
:::

:::danger Warnung
Anders als in vielen Programmiersprachen wird der Inhalt der Schleife bei Python um eine Tabulatortaste eingerückt. Das ist die Taste mit den zwei Pfeilen am linken Ende der Tastatur.
Vergiss nie den Doppelpunkt am Ende der Schleife
:::

:::info Aufgaben
1. Schreibe das obige Programm so um, sodass nur eine einzige Zahl in der `range()` Funktion steht. Beobachte, was Tobi auf den Bidlschirm schreibt.
2. Schreibe ein Programm, das Tobi dazu bringt, ein gleichseitiges Dreieck zu zeichnen. Nutze eine Schleife. Bedenke: Tobi dreht sich immer um die angegebene Gradzahl.
3. Schreibe das Programm so um das Tobi erst das Dreieck zeichnet und anschließend die Kanten mit 1, 2 und 3 beschriftet.
:::

### while-Schleifen

Auch die while-Schleife kennen wir bereits von Karol.

```
wiederhole solange IstWand
  LinksDrehen
endewiederhole
```
Hier wiederholt Karol das LinksDrehen solange bis die Bedingung nicht mehr erfüllt ist, sprich sie nicht mehr vor einer Wand steht.

Versuche das Pythonprogramm gut nachzuvollziehen, bevor du dir die Erklärung anschaust. Sprich mit einer Partnerin oder einem Partner.

```python
import turtle
t = turtle.Turtle()

strecke = 0
win = False
while win == False:
    t.left(12)
    t.forward(10)
    strecke = strecke + 10
    if strecke > 100:
        win = True
```

:::detail Erklärung
Tobi soll ein kleines Rennen bestreiten. Dazu muss er Strecke zurücklegen und gewinnen. Solange er nicht gewonnen hat, muss er immer weiter laufen (`win == False`). Nun läuft er 10 Schritte und es wird geprüft, ober bereits mehr als 100 Schritte getan hat. Ist das der Fall, so hat er gewonnen `win = True` und die Bedingung `win == False` ist nicht mehr erfüllt.
:::

:::info Aufgabe
Erweitere das Programm, sodass die while-Schleife eine verknüpfte Bedingung erhält, die prüft ob Tobi mindestens 100 Schritte gegangen ist und nach links blickt. Die Blickrichtung kannst du mit `t.heading()` prüfen. `t.heading()` liefert eine ganze Zahl zwischen 0 und 360, sprich den Winkel in den Tobi gerade schaut. Dabei ist `t.heading == 0` wenn Tobi nach rechts schaut, `t.heading() == 90` wenn er nach oben schaut, usw.
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Zebrastreifen

Zeichne mit einer Schleife 5 kurze, parallele Linien nebeneinander, die wie ein Zebrastreifen aussehen.
:::details Tipp
Tipp: Nutze t.forward() und t.penup() / t.pendown(), damit Tobi zwischendurch springen kann, ohne zu zeichnen.
:::
### Aufgabe 2: Treppenstufen

Zeichne eine Treppe mit 6 Stufen, jede Stufe z.B. 10 Schritte hoch und 10 Schritte breit.
Überlege dir gut, wie viele Drehungen Tobi pro Stufe braucht und wie du sie in der Schleife formulierst.


### Aufgabe 3: Abwechselnde Farben – Zickzackweg

Lass Tobi einen Zickzackweg zeichnen, bei dem er bei jedem Schritt die Farbe ändert (z.B. t.color("red"), t.color("blue")).
Der Weg soll aus 10 Linien bestehen, die abwechselnd nach oben rechts und unten rechts führen.
Nutze dafür eine Schleife mit verknüpfter Bedingung oder eine einfache for-Schleife, die prüft, ob der Schritt gerade oder ungerade ist.

## Aufgaben vor dem folgenden Block

