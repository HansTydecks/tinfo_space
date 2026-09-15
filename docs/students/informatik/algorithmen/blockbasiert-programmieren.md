---
title: "Blockbasiert programmieren"
description: "Erste Programme mit dem Calliope mini in MakeCode: Text anzeigen, Lautstärkemesser, Ampelschaltung und Tieranimation."
---

# Blockbasiert programmieren <Badge type="tip" text="Klasse 7/8" />

In einer **Blocksprache** setzt du Programme aus farbigen **Puzzleteilen** zusammen. Du musst dir keine Befehle merken und kannst keine Tippfehler machen, und trotzdem programmierst du echte Algorithmen.

## Der Calliope mini

Der **Calliope mini** ist ein Einplatinenrechner mit LED-Matrix, Knöpfen, Mikrofon, Lautsprecher, Lagesensor und einer RGB-LED (→ [Hardware](../technische-informatik/hardware)). Programmiert wird er im Browser mit **MakeCode**.

::: info So startest du
1. Öffne [makecode.calliope.cc](https://makecode.calliope.cc/) und lege ein **neues Projekt** mit sinnvollem Namen an.
2. Ziehe Blöcke aus den Kategorien (Grundlagen, Eingabe, Logik, Schleifen …) in die Arbeitsfläche.
3. Teste dein Programm im **Simulator** links.
4. Verbinde den Calliope per USB und **lade** das Programm herunter.
:::

## Wichtige Blöcke

| Block | Kontrollstruktur |
|---|---|
| `beim Start` | Anweisungen einmal ausführen |
| `dauerhaft` | Endlosschleife |
| `wenn Knopf A gedrückt` | Ereignis (Eingabe) |
| `wenn … dann … ansonsten` | [Verzweigung](./kontrollstrukturen) |
| `wiederhole 4-mal` | Zählschleife |
| `pausiere (ms)` | warten |

## Projekte

::: info 1 · Hallo Calliope
Lass einen Text über die LED-Matrix laufen und zeige deiner Sitznachbarin oder deinem Sitznachbarn eine lustige Nachricht. Anleitung: [calliopemini.info](https://calliopemini.info/)
:::

::: info 2 · Lautstärkemesser
Baue einen Detektor, der sich beschwert, wenn es in der Klasse zu laut wird: **Eingabe** Mikrofon → **Verarbeitung** „lauter als Grenzwert?“ → **Ausgabe** trauriges Gesicht.
:::

::: info 3 · Ampelschaltung
1. Plane zuerst ein **Struktogramm**: Welche Farben leuchten in welcher Reihenfolge und wie lange?
2. Setze es mit der **RGB-LED**, `pausiere` und `dauerhaft` um.
3. **Erweiterung:** Die Autoampel ist dauerhaft grün. Drückt ein Fußgänger **Knopf A**, schaltet sie auf Gelb und Rot. (Tipp: Kategorie *Logik* → `wenn … dann`)
:::

::: info 4 · Calliope-Tiere
Arbeite selbstständig mit den Aufgaben auf [callianimal.tinfo.space](https://callianimal.tinfo.space/). Zu jeder Lösung gehört ein **Flussdiagramm**.
:::

::: tip Schon fertig?
Weitere Ideen: Herzschlag-Animation, Würfel beim Schütteln, Schrittzähler, eigene Spiele mit **Variablen**. Anregungen: [calliope.tinfo.space](https://calliope.tinfo.space/)
:::

## Regeln bei Problemen

1. Selbst nachdenken und im Simulator testen
2. Nachbarin oder Nachbarn fragen
3. Lehrkraft fragen

## Weiterlesen

- Vom Block zum Text: [PyTurtle-Einführung](./pyturtle/block0) <Badge type="tip" text="Klasse 10" />
