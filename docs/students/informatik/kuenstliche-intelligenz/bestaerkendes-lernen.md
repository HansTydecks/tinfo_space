---
title: "Bestärkendes Lernen"
description: "Reinforcement Learning: Lernen durch Belohnung und Bestrafung am Beispiel Bauernschach, Exploration vs. Exploitation und das Multi-Armed-Bandit-Problem."
---

# Bestärkendes Lernen <Badge type="tip" text="Klasse 9" />

Ein Hund setzt sich zufällig hin, bekommt ein Leckerli und setzt sich beim nächsten Mal eher wieder. Nach dem gleichen Prinzip können Computer lernen.

::: info Merke: Bestärkendes Lernen (Reinforcement Learning)
Ein Programm (der **Agent**) probiert in einer **Umgebung** Aktionen aus und erhält dafür **Belohnungen** oder **Bestrafungen**. Mit der Zeit wählt es bevorzugt die Aktionen, die **langfristig die meiste Belohnung** bringen.
Es lernt also durch **Versuch und Irrtum**, ohne dass ihm jemand die richtige Lösung verrät.
:::

## Beispiel: Schlag das Krokodil

Im Spiel [Schlag das Krokodil](https://www.stefanseegerer.de/schlag-das-krokodil/) spielst du mit Affen gegen die Krokodile des Computers. Die Figuren ziehen wie Bauern im Schach: geradeaus vorwärts, schlagen schräg. Wer die letzte Reihe erreicht oder den Gegner zugunfähig macht, gewinnt.

::: info Aufgabe
1. Aktiviere „nur mögliche Züge“ und spiele mehrere Runden.
2. Beobachte genau, was mit den **bunten Kugeln** bei den möglichen Zügen des Computers passiert, wenn er gewinnt oder verliert.
3. Schaffst du es, die KI 15-mal zu schlagen? Was fällt dir auf?
:::

::: details Auflösung: Wie lernt das Krokodil?
- Für jede Spielsituation gibt es einen „Becher“ mit farbigen Kugeln, eine Farbe pro möglichem Zug.
- Der Computer zieht **zufällig eine Kugel**. Je mehr Kugeln einer Farbe, desto wahrscheinlicher der Zug.
- **Gewonnen → Belohnung:** Für die gespielten Züge kommt eine Kugel **dazu**. Der Zug wird wahrscheinlicher.
- **Verloren → Bestrafung:** Die Kugel des verlustbringenden Zugs wird **entfernt**. Der Zug wird unwahrscheinlicher.
- Nach vielen Spielen bleiben fast nur noch gute Züge übrig.
:::

## Exploration vs. Exploitation <Badge type="info" text="Oberstufe" />

Soll der Agent den bisher **besten bekannten** Zug wählen oder etwas **Neues ausprobieren**, das vielleicht noch besser ist?

| Exploration (Erkunden) | Exploitation (Ausnutzen) |
|---|---|
| neue Möglichkeiten testen, um **Informationen zu gewinnen** | das **bereits beste Wissen** nutzen, um Gewinn zu maximieren |
| Risiko: kurzfristig schlechtere Ergebnisse | Risiko: bessere Möglichkeiten werden nie entdeckt |

::: info Merke: Multi-Armed-Bandit-Problem
Du stehst vor mehreren Spielautomaten („einarmige Banditen“) mit **unbekannten Gewinnchancen**. Welche Hebel ziehst du wie oft, um insgesamt am meisten zu gewinnen? Das Problem beschreibt das Dilemma zwischen Exploration und Exploitation.
:::

::: tip Fun Fact
Öffne eine App mit endlosem Feed und aktualisiere ihn, indem du nach unten ziehst. Erinnert dich die Bewegung an einen Spielautomaten? Auch Empfehlungssysteme stehen ständig vor der Frage: Zeige ich dir mehr vom Bekannten oder etwas Neues?
:::

**Vertiefung** <Badge type="warning" text="Lk" />: Beim **Q-Learning** speichert der Agent in einer Tabelle (*Q-Table*), wie viel Belohnung er für jede Aktion in jedem Zustand erwartet, und aktualisiert diese Werte nach jedem Schritt.
