---
title: "Problemlöseprozess"
description: "In fünf Phasen von der Aufgabenstellung zum fertigen, getesteten Programm."
---

## Ziele
- Ein Programmierproblem strukturiert angehen
- Vor dem Tippen einen Plan haben
- Programme bewusst testen und dokumentieren

## Warum ein Prozess?

Direkt loszutippen führt bei größeren Aufgaben ins Chaos. Erfahrene Programmiererinnen und
Programmierer arbeiten in **fünf Phasen** – vom Verstehen bis zur Dokumentation.

## Die fünf Phasen

### 1. Analyse – *Was ist zu tun?*
- Was soll das Programm am Ende können?
- Welche **Eingaben** gibt es, welche **Ausgabe** wird erwartet? (EVA-Prinzip)
- Welche Sonderfälle sind zu bedenken (leere Eingabe, negative Zahlen …)?

### 2. Entwurf – *Wie gehe ich vor?*
- Das Problem in kleinere Teilprobleme **zerlegen** (Teile und herrsche).
- Den Ablauf als **Pseudocode** oder **Programmablaufplan** aufschreiben.
- Überlegen, welche Datentypen und Schleifen/Verzweigungen du brauchst.

### 3. Implementierung – *Code schreiben*
- Den Entwurf in Python übersetzen, ein Teilproblem nach dem anderen.
- Nach jedem Teilstück kurz ausführen, statt am Ende alles auf einmal.

### 4. Test – *Funktioniert es wirklich?*
- Mit typischen **und** mit fiesen Eingaben testen.
- Fehler suchen (*debuggen*) und beheben.
- Abstürze abfangen, z. B. bei falschen Eingaben.

### 5. Dokumentation – *Verständlich machen*
- Kommentare (`#`) an den kniffligen Stellen.
- Sprechende Variablen- und Funktionsnamen.

## Beispiel: Pseudocode zuerst

Aufgabe: *Gib die Quersumme einer festen Zahl aus.*

```text
setze summe auf 0
solange die Zahl größer als 0 ist:
    hole die letzte Ziffer (Zahl modulo 10)
    addiere sie zu summe
    entferne die letzte Ziffer (Zahl ganzzahlig durch 10)
gib summe aus
```

Erst wenn dieser Plan steht, wird daraus Code:

<PyRunner>

```python
zahl = 4827
summe = 0
while zahl > 0:
    summe += zahl % 10
    zahl = zahl // 10
print(summe)
```

</PyRunner>

::: tip Vorgehen
In diesem Kurs verweisen viele Aufgaben auf diese Seite. Halte dich an die Reihenfolge:
**erst verstehen, dann zerlegen, dann coden, dann testen.**
:::

::: info Siehe auch
Für die Planung *ganzer Software-Projekte* gibt es Vorgehensmodelle wie das
[Wasserfallmodell](/students/informatik/inf_klasse_10/Programmieren/wasserfall). Der
Problemlöseprozess hier ist die „kleine" Variante für einzelne Programme.
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Analyse üben
Für die Aufgabe *„Prüfe, ob ein fest vorgegebenes Wort ein Palindrom ist"*: Notiere Eingabe,
Ausgabe und mindestens zwei Sonderfälle. (Keine Programmierung nötig.)

### Aufgabe 2: Pseudocode
Schreibe Pseudocode für: *„Finde die größte Zahl in einer festen Liste."* Übersetze ihn danach in
Python.

<PyRunner>

```python
zahlen = [3, 17, 9, 42, 8]
# dein Code nach deinem Pseudocode
```

</PyRunner>

:::details Tipp
Merke dir das erste Element als bisheriges Maximum und vergleiche es nacheinander mit allen anderen.
:::
