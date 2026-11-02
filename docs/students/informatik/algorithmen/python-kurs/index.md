---
title: "Python-Kurs"
description: "Interaktiver Python-Kurs – programmieren direkt im Browser, vom ersten Programm bis zu komplexen Projekten."
---

# Python-Kurs

Willkommen im Python-Kurs. Du lernst hier Schritt für Schritt zu programmieren –
und zwar so, dass du jeden Codeschnipsel **sofort ausprobieren** kannst.

## So funktionieren die Code-Fenster

Überall im Kurs findest du Boxen wie diese:

<PyRunner>

```python
name = "Welt"
print("Hallo", name)
```

</PyRunner>

- **▶ Ausführen** startet das Programm. Beim allerersten Mal lädt der Browser einmalig die
  Python-Umgebung (ein paar Sekunden) – danach geht es sofort. Nach einem Abbruch lädt sie
  einmal neu.
- Du kannst den Code **direkt bearbeiten** und erneut ausführen. Tipp: `Strg`+`Enter` führt aus.
- **↺ Zurücksetzen** stellt den ursprünglichen Code wieder her.
- **🔍 Schritt für Schritt** öffnet den Code (so wie er gerade im Fenster steht) in einem neuen Tab
  bei [Python Tutor](https://pythontutor.com/). Dort kannst du Zeile für Zeile durchklicken und
  sehen, welche Werte in den Variablen stehen.
- Braucht ein Programm eine Eingabe (`input()`), erscheint ein Feld **„Eingaben"**. Trag dort
  vorher ein, was das Programm nacheinander einlesen soll – eine Eingabe pro Zeile.
- **■ Stoppen** erscheint, solange ein Programm läuft. Nach 10 Sekunden bricht es außerdem
  von allein ab – meistens steckt dann eine Endlosschleife drin. Die Seite bleibt dabei
  bedienbar, du musst den Tab nicht schließen.
- Wer sehr viel ausgibt, bekommt den Hinweis „Ausgabe abgeschnitten". Das schützt nur die
  Seite – dein Programm läuft normal weiter.
- **↻ Python neu starten** setzt die Python-Umgebung zurück, falls sich ein Programm darin
  verrannt hat.

::: info Deine Daten bleiben bei dir
Python läuft komplett **in deinem Browser**. Dein Code wird nirgendwo hochgeladen und nicht
gespeichert. Wenn du etwas behalten willst, kopiere es dir heraus.
:::

::: info Python läuft in einem eigenen Bereich
Dein Programm läuft in einem abgeschotteten Rechenbereich des Browsers (einem **Web Worker**).
Dort gibt es keine Webseite: Dein Code kann diese Seite nicht verändern, keine gespeicherten
Fortschritte löschen, nichts aus dem Netz nachladen und den Tab nicht blockieren.
Ausprobieren ist also ausdrücklich erlaubt – schlimmstenfalls bricht dein eigenes Programm ab.
:::

## Silent Teacher: erst ausprobieren, dann lesen

Unter den Zielen fast jeder Lektion findest du einen Button wie diesen:

<SilentTeacherButton kapitel="operatoren" />

Er führt dich zum **[Silent Teacher](./silent-teacher)**. Dort gibt es keine Erklärungen – nur kleine
Programme. Du tippst an, was sie ausgeben (oder „💥 Fehler", wenn sie abstürzen), und erkennst
die Regeln aus deinen Treffern und Fehlern. Richtige Antworten bringen einen Punkt, falsche kosten
einen; mit **8 Punkten** ist ein Level geschafft. Die Zahlen sind jedes Mal neu – Auswendiglernen
hilft also nicht, Verstehen schon.

## Die drei Kapitel

### 1 · [Für Einsteiger](./einsteiger/)
Vom [ersten Programm](./einsteiger/erste-schritte) mit Variablen und [Datentypen](./einsteiger/datentypen)
über [Operatoren](./einsteiger/operatoren), [Verzweigungen](./einsteiger/selektion) und
[Schleifen](./einsteiger/while-schleife) bis zu [Methoden](./einsteiger/methoden) und
[eigenen Funktionen](./einsteiger/funktionen). Ganz am Ende kommt die [Eingabe mit `input()`](./einsteiger/eingabe).

### 2 · [Für Fortgeschrittene](./fortgeschritten/)
[Algorithmusbegriff](./fortgeschritten/algorithmusbegriff),
[strukturierte Datentypen](./fortgeschritten/strukturierte-datentypen),
[Unterprogramme](./fortgeschritten/unterprogramme),
[Objektorientierung](./fortgeschritten/klassen-objekte),
[Rekursion](./fortgeschritten/iterativ-rekursiv) und [Fraktale](./fortgeschritten/fraktale),
[Suchen](./fortgeschritten/lineare-suche), [Sortieren](./fortgeschritten/sortieren) und
[Komplexität](./fortgeschritten/komplexitaet).

### 3 · [Profis](./profis/)
[Schwere Probleme](./profis/schwere-probleme),
[Grenzen der Berechenbarkeit](./profis/grenzen-der-berechenbarkeit),
[komplexe Aufgaben im Prüfungsformat](./profis/komplexe-probleme) und die Projekte
[Ratespiel](./profis/ratespiel) und [Minesweeper](./profis/minesweeper).

## Wiki zum Nachschlagen

Im **[Python-Wiki](./wiki)** findest du alle wichtigen Befehle und Regeln auf einen Blick –
von Variablen über Schleifen bis zu Funktionen und häufigen Fehlern.

::: tip Vorwissen
Der Kurs setzt keine Programmiererfahrung voraus. Wenn du schon mit Scratch oder dem Calliope mini
gearbeitet hast, wird dir vieles bekannt vorkommen.
:::
