---
title: "Kontrollstrukturen: Schleifen und verknüpfte Bedingungen"
description: ""
---

:::info Definition: Kontrollstrukturen
Kontrollstrukturen verändern den Verlauf eines Programmes. Sie verändern die Reihenfolge der Abarbeitung von Anweisungen.
:::

## Ziele
- Bedingungen mit Variablen formulieren
- Logische Operatoren zur Verknüpfung von Bedingungen nutzen
- Bedingte und zählende Schleifen zur Bewältigung kleiner Probleme nutzen

## Bedingungen

### Einfache Bedingungen

Bedingungen kennst du bereits von Karol. Manchmal musste man mit `IstWand` prüfen, ob Karol vor einer Wand steht und anhand dieser Bedingung entscheiden, ob sie einen Schritt nach vorne machen sollte. Bedingungen sind also entscheidend für den Verlauf deines Programmes und werden besonders interessant, wenn wir sie mit Variablen selbst gestalten können. Schau dir das Beispiel an und stelle eine Vermutung auf, was Tobi wohl schreiben wird.

```python
import turtle
t = turtle.Turtle()

x = 6
if x < 5:
    t.write("x ist kleiner 5!")
if x >= 5:
    t.write("x ist groesser-gleich 5!")
```
:::detail Erklärung
Tobi prüft zuerst ob die Bedingung `x < 5` True ist. Das ist sie nicht, also führt er die Anweisung `t.write("x ist kleiner 5!")` nicht aus. `x >= 5` ist jedoch True. Daher führt er die Anweisung aus.
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
Einen der häufigsten Fehler beim Programmieren ist es, `=` und `==` zu vertauschen. `=` kennen wir als Zuweisungsoperator von den Variablen. Wir nutzen `=` um einer Variable einen Wert zuzuweisen z.B. `x = 5`. Mit `x == 5` **prüfen** wir nun, ob diese Bedingung stimmt, was sie in diesem Fall tut.
:::

### Verknüpfte Bedingungen

Hitzefrei bekommt man mancherorts unter zwei Bedingungen. Die Temperatur muss im Schatten über 30 Grad Celsius betragen und es muss vor 10:00 Uhr sein. Man könnte auch sagen: wenn `temp >= 30` und `schatten == True` und `time < 10` müssen alle True sein. Oder: `if temp >= 30 and schatten == True and time < 10: Hitzefrei = True` Ist eine der Bedingung False, so gibt es kein Hitzefrei.

Solche Verknüpfungen von Bedingungen sind an unsere Sprache angeknüpft wie im Beispiel zuvor gut erkenntlich. Ist Bedingung 1 True UND ist Bedingung 2 True, so tue etwas. Eine weitere Möglichkeit Bedingungen zu verknüpfen ist das logische ODER. Ist Bedingung 1 True ODER ist Bedingung 2 True, so tue etwas. Wirf einen Blick auf die Tabelle und versuche die Werte jeweils nachzuvollziehen.

| Operator | Name               | Beispiel-Bedingung             | Wert für `x`, der `True` ergibt | Wert für `x`, der `False` ergibt |
|:-------:|--------------------|-------------------------------:|--------------------------------:|---------------------------------:|
| `and`   | Logisches UND      | `x > 0 and x < 10`             | `5`                             | `0`                              |
| `or`    | Logisches ODER     | `x < 0 or x > 10`              | `11`                            | `5`                              |
| `not`   | Logisches NICHT    | `not (x == 5)`                 | `3`                             | `5`                              |

:::info Aufgabe
Verändere das Programm so, dass die Person mitfahren darf.
```python
import turtle
t = turtle.Turtle()

koerperhoehe = 
alter = 
if koerperhoehe > 150 and alter > 8:
    t.write("Du darfst mitfahren")
else:
    t.write("Du darfst NICHT mitfahren")
```

Verändere das Programm so, dass die Person nicht hereinkommt.
```python
import turtle
t = turtle.Turtle()

hat_ticket = True
ist_vip = True

if hat_ticket or ist_vip:
    t.write("Du kommst rein")
else:
    t.write("Kein Zutritt")
```
:::



## Schleifen

Sicher erinnerst du dich daran, wie du den Roboter Karol durch die kleinen Welten geschickt hast. Oft musste Karol bestimmte Anweisungen mehrmals hintereinander ausführen. Anstatt jede Anweisung einzeln zu tippen haben wir uns **Schleifen** zu Nutze gemacht. Sicher erinnerst du dich an folgendes Beispiel:

```
wiederhole 5 mal 
Schritt
RechtsDrehen
endewiederhole
```

### for-Schleifen

Schleifen gibt es nicht nur bei Karol, sondern auch bei Tobi der Schildkröte. Hier sehen sie zwar etwas anders aus, erfüllen aber den selben Zweck. Möchte man Anweisungen eine feste Anzahl von malen wiederholen (Karol: `wiederhole 5 mal`), so nimmt man in Python den `for i in range(anfang, ende):` Befehl. Schau dir das Beispiel an und überlege, was Tobi auf den Bildschirm schreibt.

```python
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

Zeichne eine Treppe mit 6 Stufen, jede Stufe z.B. 30 Schritte hoch und 30 Schritte breit.
Überlege dir gut, wie viele Drehungen Tobi pro Stufe braucht und wie du sie in der Schleife formulierst.

### Aufgabe 3: Haus mit Tür

Zeichne mit Tobi ein einfaches Haus: ein Quadrat als Wand und darüber ein Dach (gleichschenkliges Dreieck).
Ergänze anschließend noch eine Tür (ein kleines Rechteck an einer Seite der Wand).
Tipp: Teile den Code in Abschnitte auf (Wand, Dach, Tür).
Aufgabe 4: Abwechselnde Farben – Zickzackweg

Lass Tobi einen Zickzackweg zeichnen, bei dem er bei jedem Schritt die Farbe ändert (z.B. t.color("red"), t.color("blue")).
Der Weg soll aus 10 Linien bestehen, die abwechselnd nach oben rechts und unten rechts führen.
Nutze dafür eine Schleife mit verknüpfter Bedingung oder eine einfache for-Schleife, die prüft, ob der Schritt gerade oder ungerade ist.

## Aufgaben vor dem folgenden Block