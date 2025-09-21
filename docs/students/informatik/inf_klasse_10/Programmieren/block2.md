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
Dieses Prinzip kennst du bereits von den Datenbanken. Wirf einen Blick in deinen Hefter, um dich an das Konzept der Datentypen zu erinnern.

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
Probieren: [pythonsandbox.com/turtle](https://pythonsandbox.com/turtle)

Versucht man jedoch einfach mit einem String von Buchstaben zu rechnen, so wird das nicht funktionieren.
```python
# Dieser Code funktioniert nicht
import turtle
t = turtle.Turtle()

i = 10 # [!code focus]
msg = "Ich bin ein String" # [!code focus]
t.write(i - msg) # [!code focus]
```
Das liegt daran, dass Python nicht weiß, wie die `-` Operation bei einer ganzen Zahl und einem Text funktionieren soll. Im Matheunterricht fragt ja auch niemand wie man von der Zahl 10 ein Kuchenrezept subtrahieren kann.

Nun passiert es aber ab und an, dass man sich eine Zahl in Kombination mit einem Text ausgeben lassen möchte. Hierfür lässt sich der Datentyp der ganzen Zahl von Integer zu String "casten". Hier ein Beispiel, wie das Problem gelöst werden kann.

```python
import turtle
t = turtle.Turtle()

i = 1 # [!code focus]
msg = "Ich bin" # [!code focus]
t.write(msg + str(i) + " String!") # [!code focus]
```

Hier eine gute Zusammenfassung des Besprochenen.
<iframe width="560" height="315" src="https://www.youtube.com/embed/1WqFJ5wsA4o?si=2kRjkxJNG9SSbmtO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Einfache Verzweigungen

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

:::details Erklärung
Tobi prüft zuerst ob die Bedingung `x < 5` True ist. Das ist sie nicht, also führt er die Anweisung `t.write("x ist kleiner 5!")` nicht aus. Da es ein `else` gibt, führt er die Alternative aus.
:::

Man beachte den **häufig vergessenen Doppelpunkt hinter der Bedingung**.

### Mögliche Vergleichsoperatoren
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

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Altersgruppen
Schreibe ein Programm, das das Alter einer Person per `input()` erfragt und in einer Variable speichert und je nach Alter eine passende Nachricht ausgibt:
- Unter 18: "Du bist minderjährig"
- Ab 18: "Du bist erwachsen"

### Aufgabe 2: Passwort-Check
Schreibe ein Programm, das ein gespeichertes Passwort mit einem eingegebenen Passwort vergleicht und "Zugang gewährt" oder "Zugang verweigert" ausgibt. 

### Aufgabe 3: Temperatur-Umrechner mit Beratung

Erstelle ein Programm, das eine Temperatur in Celsius per input() abfragt und folgende Funktionen bietet:

1. Umrechnung in Fahrenheit (Formel: F = C * 9/5 + 32)
2. Ausgabe beider Temperaturen
3. Zusätzliche Beratung: Bei unter 0°C "Es ist eiskalt!", bei über 30°C "Es ist sehr heiß!"