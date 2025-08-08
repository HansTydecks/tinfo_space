---
title: "RobotKarol zu PyTurtle & Variablen"
description: "Einstieg in PyTurtle, erste Schritte mit Variablen und Aufgaben für den Einstieg."
---
## Algorithmen

Vor einiger Zeit hast Du dich schon intensiv mit Algorithmen hier im Informatikunterricht beschäftigt. Hier noch einmal eine Definition, auf die wir uns einigen.
:::info Definition: Algorithmus
Ein Algorithmus ist eine Handlungsanweisung zum Lösen einer Aufgabe bzw. einer Menge von Aufgaben.
:::details Eigenschaften
- **Ausführbarkeit**: Der Algorithmus sollte fehlerfrei ausführbar sein.
- **Endlichkeit**: Der Algorithmus hat endliche Länge.
- **Wiederholbarkeit**: Bei jeder Wiederholung erhält man für gleiche Eingaben gleiche Ausgaben.
- **Eindeutigkeit**: Für jeden Schritt gibt es genau einen festgelegten Folgeschritt.
:::




## 🤖 Von RobotKarol zu PyTurtle 🐢
Den Roboter Karol kennst du bereits. In der Vergangenheit hast Du ihr genau gesagt, was sie zu tun hatte.

::: info Aufgabe
Sammle gemeinsam mit deinem Partner **Anweisungen**, die ihr Karol geben konntet. Überlegt euch dazu, was Karol alles tun konnte. Öffnet anschließend den folgenden [Link](https://karol.arrrg.de/#WFCC). und schaut euch die Welt an, in der sich Karol befindet. Werft nun einen Blick auf den Code und überlegt, was Karol beim Ausführen wohl anstellt.
```js
wiederhole 4 mal
  Schritt(3)
  Hinlegen
  Schritt
  LinksDrehen
endewiederhole
```
:::


Karol hat leider ein kleines Problem. Obwohl sie sich sehr gut in ihrer Umgebung zurechtfinden, hat sie große Schwierigkeiten, sich Dinge zu merken. Um größere und komplexere Probleme zu lösen, müssen wir uns jedoch verschiedenste Daten merken und abrufen können. Ein Glück, dass Karol einen guten Freund hat: **Tobi die Schildkröte**, der sich so manches merken kann 🐢



## Ziele
- Wie du mit PyTurtle arbeitest
- Wie Befehle aus Karol in Python aussehen
- Was Variablen sind und
- Wozu man Variablen in der Informatik (und PyTurtle) verwendet



## PyTurtle: Kontext

"**Python** ([ˈpʰaɪθn̩] oder [ˈpʰyːtɔn]) ist eine universell nutzbare [...] *Programmiersprache*. Sie hat den Anspruch, einen gut lesbaren, knappen Programmierstil zu fördern." (offizielle Python [Website](https://www.python.org/doc/essays/blurb/)) Mit Hilfe Pythons werden wir unsere Fähigkeiten und unser Wissen rund um Algorithmen erweitern und vertiefen. Nun gut, aber war nicht gerade noch die Rede von einer Schildkröte?
PyTurtle erweitert die Programmiersprache Python um einige Funktionen. Neben unserem Code wird ein Bildschirm angezeigt, der eine kleine "Schildkröte" wandern und zeichnen lässt. Das ist praktisch, denn so können wir den ausgeführten Code wudnerbar visualisieren.

<img src="./python-logo-only.png" alt="Python Logo" width="80" />

## Erste Schritte

Während wir für Karol ein eigenes Programm hatten, bietet sich für die Schildkröte Tobi eine Website an, die speziell für die kleine Schildkröte gebaut wurde: [pythonsandbox.com/turtle](https://pythonsandbox.com/turtle)

Sobald Du die Website öffnest bekommst du den folgenden Code, der dir in Teilen schon sehr bekannt vorkommen könnte. Wir wollen uns den Code gemeinsam anschauen.

```python
import turtle # [!code focus]
t = turtle.Turtle()  # [!code focus]
t.speed(5) # 1:slowest, 3:slow, 5:normal, 10:fast, 0:fastest
t.forward(100)
```
Zu Beginn eines jeden Programmes müssen wir unsere Schildkröte Tobi erst rufen. Dazu nutzen wir den Befehl `import turtle`. Den Begriff "importieren" kennst du bereits aus anderen Fächern und er hält in den meisten Programmiersprachen eine sehr ähnliche Bedeutetung (*etwas zu sich holen*). Mit `t = turtle.Turtle()` erstellen wir nun ein Objekt, das wir `t` nennen, und das vom Typ `Turtle()` ist. Wer mehr schreiben möchte, kann die Schildkröte anstellen von `t` auch `tobi` nennen, doch mit `t` vermeidet man Schreibarbeit.

```python
import turtle
t = turtle.Turtle()  
t.speed(5) # 1:slowest, 3:slow, 5:normal, 10:fast, 0:fastest # [!code focus]
t.forward(100) # [!code focus]
```
Nun können wir Tobi (`t.`) herumkommandieren. Wir geben ihm erst eine Geschwindigkeit mit `t.speed(5)` und lassen ihn dann mit `t.forward(100)` eine Linie mit 100 Einheiten zeichnen. Führe das Programm aus und beobachte was passiert!

![Ausführen](press_play.gif)

Es gibt noch weitere Befehle, die sich als sehr nützlich erweisen: mit `t.right(180)` und `t.left(90)` dreht sich Tobi um den jeweiligen Grad (man denke an einen Kreis mit 360 Grad), `t.circle(10)` zeichnet einen Kreis der Größe 10, `t.penup()` und `t.pendown` heben bzw. senken den Stift und `t.goto(x, y)` teleportieren Tobi an die Koordinate, die du für x und y eingibst.

:::info Aufgabe
Schreibe ein Programm, das den ersten Buchstaben deines Nachnamens zeichnet. Schon fertig? Zeichne die Zahl 9 hinter deinen Buchstaben.
:::

:::warning Speichern
Speichere dein Programm oder lade es herunter. Es wird eine Datei im .py Format heruntergeladen. Das ist das Kürzel für Python-Dateien.
![Speichern](./Screenshot%202025-07-20%20124954.png)

![Python-Datei im Downloadordner](Screenshot%202025-07-20%20124507.png)
:::

## Variablen

Den Begriff der Variable kennst du bereits aus dem Mathematikunterricht. Für den Informatikunterricht ist es wichtig, dass Du dein Vorwissen beiseite legst und das Konzept der Variable in der Informatik neu lernst. Wir können uns **Variablen als Behälter für einen Wert** vorstellen, aus dem man etwas herausnehmen und hineinlegen kann. In Python können wir Variablen "erschaffen", indem wir folgenden Ausdruck in unseren Code schreiben: `variablenname = wert` oder `schuhgroeße = 39`.

::: info Hinweis
Variablennamen werden per Konvention klein geschrieben und sollten möglichst selbsterklärend sein. Namen wie `gfpr_123juhu` oder `dasistdiewichtigevariabledenkdaran` sind möglich, aber sehr ungern gesehen.
:::

::: details Detailliertere Erklärung, Begriffe
In Python ist `x = 10` ein einfacher Zuweisungsausdruck, der gleichzeitig folgendes leistet:
- Erstellt die Variable x, falls sie noch nicht existiert (**Definition**).
- Weist x den Wert 10 zu (**Zuweisung**).
- Da x damit ihren ersten Wert bekommt, kann man zugleich sagen, dass x damit **initialisiert** wird.
:::

Was wir mit solchen Behältern anstellen können wird in den folgenden Beispielen deutlich. Überlegt euch zu zweit, welches Ergebnis ihr am Bildschrim seht **bevor** ihr das Programm ausführt.

### Beispiel 1 
```python
import turtle
t = turtle.Turtle()

zahl = 5
t.write(zahl)

t.forward(50)  # Platz schaffen für die nächste Zahl

zahl = 10
t.write(zahl)
```
:::details Erklärung Beispiel 1
Die Variable `zahl` wird in Zeile 4 definiert und ihr wird gleichzeitig der Wert 5 zugewiesen. Dies geschieht mit dem Zuweisungsoperator `=`. Anschließend wird der Wert der Variable `Zahl` mit `t.write(zahl)` auf dem Bildschrim ausgegeben.
In Zeile 9 wird der Wert von `zahl` neu zugewiesen. Der alte Wert verfällt und dem Behälter wird der neue Wert 10 zugewiesen. Nun schreibt die Schildkröte den neuen Wert 10 auf den Bildschirm.
:::
### Beispiel 2 
```python
import turtle
t = turtle.Turtle()

a = 7
b = 3
summe = a + b

t.write("Summe: ")
t.forward(50)
t.write(summe)
```
:::details Erklärung Beispiel 2
Jetzt wird gerechnet! Zeilen 4 und 5 sind dir bekannt. In Zeile 6 wird eine Variable `summe` definiert und ihr wird der Inhalt rechts von dem Zuweisungsoperator `=` zugewiesen. Der Wert ist in diesem Fall die Summe aus a und b, leicht erkennbar durch das `+`. Nun trägt die Variable `summe` den Wert 10. 
:::

### Beispiel 3 
```python
import turtle
t = turtle.Turtle()

zahl = 5
zahl = zahl + 2 

t.write(zahl)
```
:::details Erklärung Beispiel 3
Hier wird sehr deutlich, wie das `=` als Zuweisungsoperator funktioniert. `zahl = zahl + 2` ist im mathematischen Sinne natürlich Humbug. In der Informatik ergibt diese Zeile aber Sinn. Der Variable `zahl` wird mit `=` der Wert der rechten Seite zugewiesen der Operation zugewiesen. Dieser rechte Teil ist die Summe aus dem ehemaligen Wert der Variable `zahl`, sprich 5, und 2. `zahl` ist trägt den Wert 7.
:::

### Rechenzeichen
Hier alle arithmetischen Operatoren auf einen Blick

| Operator | Name                    |
|:-------:|--------------------------|
| `+`     | Addition                 |
| `-`     | Subtraktion              |
| `*`     | Multiplikation           |
| `/`     | Division (float)         |
| `//`    | Ganzzahlige Division     |
| `%`     | Modulo (Rest)            |
| `**`    | Potenzierung             |

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Korrigieren

```python
import turtle
tobi = turtle.Turtle()

8 = zahl
t.write(zahl)
```

### Aufgabe 2: Rechnen
Erstelle ein Python-Programm mit Turtle, das zwei Zahlen in Variablen speichert (z. B. a und b). Berechne sowohl ihre Summe als auch ihre Differenz (a - b) und ihr Produkt (a * b). Gib alle drei Ergebnisse mit Turtle aus, jeweils mit einem passenden Text davor, z. B.:

```
Summe: 13
Differenz: 7
Produkt: 30
```

### Aufgabe 3: Kreise

Schreibe ein Python-Programm mit Turtle, das drei Kreise nebeneinander zeichnet.
- Der erste Kreis soll einen Radius von 50 haben.
- Nach jedem Kreis soll der Radius um 10 größer werden.
- Verwende dafür nur eine einzige Variable, z. B. radius.

Achte darauf, dass die Kreise nebeneinander stehen.
:::details Tipp
Setze `radius = 50` am Anfang.
Nach jedem Kreis: `radius = radius + 10`.
Zum Bewegen kannst du penup(), forward(...) und pendown() verwenden.
:::
### Aufgabe 4: Korrigieren

Erstelle zwei Varaiblen `a = 5` und `b = 7`. Tausche ihre Werte und gib das Ergebnis aus.

## Aufgaben vor dem folgenden Block
:::info 
1. Lies Dir die Definition und die Eigenschaften von Algorithmen erneut durch
2. Schaue Dir das folgende Video bis Minute 2:30 an und halte die Fehlvorstellungen zu Variablen in einem für die verständlichen Heftaufschrieb fest.
3. Erarbeite dir selbstständig das Kapitel "Datentypen von Variablen" unterhalb des Videos. Notiere Fragen für die nächste Stunde.
:::
<iframe width="560" height="315" src="https://www.youtube.com/embed/uqTvW5ZhxPc?si=xKEMdUOWaZvX63Rc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Datentypen von Variablen
Im letzten Block hast du gelernt wie man mit Variablen umgeht, bedeutet, du kannst Variablen nun *initiieren*, ihnen einen *Wert zuweisen* und mit ihnen *rechnen*. Nach dem Behältermodell scheinen also Variablen immer Zahlen zu halten. In der Realität können von uns definierte Variablen noch Werte ganz unterschiedlicher Art, also andere Werte als Zahlen, halten.
Dieses Prinzip kennst du bereits von den Datenbanken. Wirf einen Blick in deinen Hefter, um dich an das Konzept der Datentypen zu erinnern.

| Name des Datentyps | Was Python erwartet        | Beispiel in Python                      |
|--------------------|----------------------------|-----------------------------------------|
| Integer `(int)`    | ganze Zahl                 | `x = 3`, `zahl = -5`                    |
| Float `(float)`    | Gleitkommazahl             | `height = 163.5`, `speed = 4.52`        |
| String `(str)`     | Text                       | `name = "Thomas"`, `msg = "Hallo Welt"` |
| Boolean `(bool)`   | Wahrheitswert (true/false) | `win = TRUE`, `win = false`             |

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
# Dieser Code funktioniert nicht
import turtle
t = turtle.Turtle()

i = 10 # [!code focus]
msg = "Ich bin ein String" # [!code focus]
t.write(i - msg) # [!code focus]
```
Das leigt daran, dass Python nicht weiß, wie die `-` Operation bei einer ganzen Zahl und einem Text funktionieren soll. Im Matheunterricht fragt ja auch niemand wie man von der Zahl 10 ein Kuchenrezept subtrahieren kann.

Hier eine gute Zusammenfassung des Besprochenen.
<iframe width="560" height="315" src="https://www.youtube.com/embed/1WqFJ5wsA4o?si=2kRjkxJNG9SSbmtO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Nun passiert es aber ab und an, dass man sich eine Zahl in Kombination mit einem Text ausgeben lassen möchte. Hierfür lässt sich der Datentyp der ganzen Zahl von Integer zu String "casten". Hier ein Beispiel, wie das Problem gelöst werden kann.

```python
import turtle
t = turtle.Turtle()

i = 1 # [!code focus]
msg = "Ich bin" # [!code focus]
t.write(msg + str(i) + " String!") # [!code focus]
```