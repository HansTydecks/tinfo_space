---
title: " RobotKarol zu PyTurtle & Variablen"
description: "Einstieg in PyTurtle, erste Schritte mit Variablen und Aufgaben für den Einstieg."
---
# Algorithmen

Vor einiger Zeit hast Du dich schon ganz intensiv mit Algorithmen hier im Informatikunterricht beschäftigt. Hier noch einmal eine Definition, auf die wir uns einigen.
:::info Definition

:::



# 🤖 Von RobotKarol zu PyTurtle 🐢
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



## 🎯 Was erarbeitest du dir auf dieser Seite?
- Wie du mit PyTurtle arbeitest
- Wie Befehle aus Karol in Python aussehen
- Was Variablen sind und
- Wozu man Variablen in der Informatik (und PyTurtle) verwendet



##  PyTurtle: Kontext

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

Es gibt noch weitere Befehle, die sich als sehr nützlich erweisen: mit `t.right(180)` und `t.left(90)` dreht sich Tobi um den jeweiligen Grad (man denke an einen Kreis mit 360 Grad), `t.circle(10)` zeichnet einen Kreis der Größe 10, `t.penup()` und `t.pendown` heben bzw. senken den Stift und `t.goto(x, y)` teleportieren Tobi an die Koordinate, die du für x und y eingbist.

:::info Aufgabe
Schreibe ein Programm, das den ersten Buchstaben deines Nachnamens zeichnet. Schon fertig? Zeichne die Zahl 9 hinter deinen Buchstaben.
:::

:::warning Speichern
Speichere dein Programm oder lade es herunter. Es wird eine Datei im .py Format heruntergeladen. Das ist das Kürzel für Python-Dateien.
![Speichern](./Screenshot%202025-07-20%20124954.png)
![Python-Datei im Downloadordner](Screenshot%202025-07-20%20124507.png)
:::
## 📦 **3) Was ist eine Variable?**

Eine Variable ist wie eine **Schachtel**, in der wir etwas aufbewahren.

Beispiel:

```python
seite = 100
tina.forward(seite)
tina.left(90)
```

Hier merken wir uns in `seite` die Länge der Linie.

---

## 🛠️ **4) Erste Aufgaben**

> Nutze Variablen und probiere selbst!

### 🐢 Aufgabe 1: Quadrat mit Variablen
- Lege eine Variable `seite` fest.
- Die Schildkröte soll ein Quadrat zeichnen.

**Tipp:**
```python
seite = 100
for i in range(4):
    tina.forward(seite)
    tina.left(90)
```



---

### ✏️ Aufgabe 2: Name schreiben
- Speichere deinen Namen in einer Variable `name`.
- Lass die Schildkröte den Namen schreiben.

**Tipp:**
```python
name = "DeinName"
tina.write(name)
```

---

### 🎨 Aufgabe 3: Farbe als Variable
- Speichere eine Farbe (z. B. `"blue"`) in einer Variable `farbe`.
- Nutze `tina.pencolor(farbe)`.

---

## ✅ **5) Zusammenfassung**
- PyTurtle ist wie Karol, aber viel mächtiger.
- Variablen speichern Zahlen, Texte oder Wahrheitswerte.
- Mit Variablen wird dein Code flexibler.

---

## 🧪 **6) Extra: Spiel doch mal mit…**
- Ändere `seite` auf 50 oder 200 – was passiert?
- Ändere die Farbe.
- Schreibe verschiedene Namen.
