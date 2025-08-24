---
title: "Verknüpfte Verzweigungen und while-Schleifen"
description: "Komplexe Bedingungen mit logischen Operatoren und erste Schleifen mit while."
---

## Ziele
- Bedingungen mit logischen Operatoren verknüpfen
- While-Schleifen verstehen und anwenden
- Komplexere Entscheidungsstrukturen programmieren

## Verknüpfte Bedingungen

Hitzefrei bekommt man mancherorts unter zwei Bedingungen. Die Temperatur muss im Schatten über 30 Grad Celsius betragen und es muss vor 10:00 Uhr sein. Man könnte auch sagen: wenn `temp >= 30` und `schatten == True` und `time < 10` müssen alle True sein.

Solche Verknüpfungen von Bedingungen sind an unsere Sprache angeknüpft wie im Beispiel zuvor gut erkenntlich. Ist Bedingung 1 True UND ist Bedingung 2 True, so tue etwas. Eine weitere Möglichkeit Bedingungen zu verknüpfen ist das logische ODER.

### Logische Operatoren
| Operator | Name               | Beispiel-Bedingung             | Wert für `x`, der `True` ergibt | Wert für `x`, der `False` ergibt |
|:-------:|--------------------|-------------------------------:|--------------------------------:|---------------------------------:|
| `and`   | Logisches UND      | `x > 0 and x < 10`             | `5`                             | `0`                              |
| `or`    | Logisches ODER     | `x < 0 or x > 10`              | `11`                            | `5`                              |
| `not`   | Logisches NICHT    | `not (x == 5)`                 | `3`                             | `5`                              |

```python
import turtle
t = turtle.Turtle()

koerperhoehe = 160
alter = 12

if koerperhoehe > 150 and alter > 8:
    t.write("Du darfst mitfahren")
else:
    t.write("Du darfst NICHT mitfahren")
```

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
:::

## While-Schleifen

Auch die while-Schleife kennen wir bereits von Karol.

```
wiederhole solange IstWand
  LinksDrehen
endewiederhole
```

Hier wiederholt Karol das LinksDrehen solange bis die Bedingung nicht mehr erfüllt ist, sprich sie nicht mehr vor einer Wand steht.

Versuche das Pythonprogramm gut nachzuvollziehen, bevor du dir die Erklärung anschaust:

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

:::details Erklärung
Tobi soll ein kleines Rennen bestreiten. Dazu muss er Strecke zurücklegen und gewinnen. Solange er nicht gewonnen hat, muss er immer weiter laufen (`win == False`). Nun läuft er 10 Schritte und es wird geprüft, ob er bereits mehr als 100 Schritte getan hat. Ist das der Fall, so hat er gewonnen `win = True` und die Bedingung `win == False` ist nicht mehr erfüllt.
:::

:::danger Warnung
Anders als in vielen Programmiersprachen wird der Inhalt der Schleife bei Python um eine Tabulatortaste eingerückt. Vergiss nie den Doppelpunkt am Ende der Schleife hinter dem while().
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Einlass-Kontrolle
Schreibe ein Programm für eine Disco. Eine Person kommt nur rein, wenn sie:
- Mindestens 18 Jahre alt ist UND ein Ticket hat
- ODER wenn sie VIP-Status hat (unabhängig vom Alter)

### Aufgabe 2: Countdown
Erstelle einen Countdown von 10 bis 0 mit einer while-Schleife. Tobi soll jede Zahl einzeln schreiben.

### Aufgabe 3: Würfel-Spiel
Simuliere das Würfeln, bis eine 6 kommt. Zähle dabei mit, wie oft gewürfelt wurde.
:::details Tipp
Nutze `import random` und `random.randint(1,6)` für den Würfel.
:::

