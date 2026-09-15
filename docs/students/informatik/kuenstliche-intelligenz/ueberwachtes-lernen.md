---
title: "Überwachtes Lernen"
description: "Supervised Learning: aus beschrifteten Beispielen Regeln lernen, Entscheidungsbäume am Affen-Beispiel, gute Trainingsdaten und Garbage In, Garbage Out."
---

# Überwachtes Lernen <Badge type="tip" text="Klasse 9" />

Ein Kind lernt Formen mit einem Bilderbuch: Auf jeder Seite steht, was zu sehen ist. Nach vielen Beispielen erkennt es Zylinder und Quader auch dann, wenn es sie zum ersten Mal sieht.

::: info Merke: Überwachtes Lernen (Supervised Learning)
Beim **überwachten Lernen** bekommt das Lernverfahren **Beispieldaten mit der richtigen Antwort** (einem *Label*, einer Beschriftung). Daraus sucht es Regeln, die Eingaben den passenden Beschriftungen zuordnen. Das trainierte **Modell** wendet diese Regeln auf **neue Daten** an.
**Ziel:** etwas **vorhersagen** oder **klassifizieren**.
:::

## Beispiel: Beißt das Äffchen?

Du bist Tierpfleger:in im Zoo. Von den Affen, die schon da sind, weißt du, welche beißen. Bald kommen neue Affen dazu. Kannst du vorhersagen, welche beißen, **ohne es auszuprobieren**?

::: info Aufgabe
Öffne das [Affen-Spiel](https://www.stefanseegerer.de/decision-tree-monkey-game/) (zuerst Anfänger, dann Fortgeschritten).
1. **Merkmale untersuchen:** Worin unterscheiden sich beißende und nicht beißende Affen?
2. **Regeln finden:** Baue einen Entscheidungsbaum.
3. **An neuen Daten prüfen:** Wie viele neue Affen ordnet dein Baum richtig ein?
:::

Ein **Entscheidungsbaum** stellt Fragen zu Merkmalen, bis eine Entscheidung feststeht. So könnte ein Baum aussehen (ausgedachtes Beispiel, die Merkmale im Spiel sind andere):

```text:no-line-numbers
               Zähne sichtbar?
              /              \
            ja               nein
       Ohren spitz?       beißt nicht
        /       \
      ja        nein
   beißt      beißt nicht
```

::: warning Kein Modell ist perfekt
Oft ordnet selbst das beste Modell nicht **alle** Affen richtig ein. Man wählt das Modell, das auf **neuen** Daten am häufigsten richtig liegt, und bleibt vorsichtig.
:::

## Gute Trainingsdaten

Beim Trainieren eines Bilderkennungsmodells (z. B. mit [Teachable Machine](https://teachablemachine.withgoogle.com/)) haben wir herausgefunden:
- **viele** Beispiele pro Kategorie
- **vielfältige** Beispiele: verschiedene Perspektiven, Abstände, Lichtverhältnisse
- **Störfaktoren vermeiden**: gleichmäßiger Hintergrund, keine Hände im Bild
- **Merkmale gut sichtbar** machen (Form, Farbe)
- Kategorien, die sich **sehr ähnlich** sehen, werden leicht verwechselt

::: info Merke: Garbage In, Garbage Out (GIGO)
**Schlechte Trainingsdaten führen zu schlechten Ergebnissen.**
Beispiel: 2016 veröffentlichte Microsoft den Chatbot **Tay**, der von Nutzer:innen auf Twitter lernen sollte. Nach wenigen Stunden verbreitete er beleidigende und hetzerische Posts und wurde nach 16 Stunden abgeschaltet.
:::

## Wo wird überwachtes Lernen eingesetzt?

- Spam-Erkennung in E-Mails
- Tumore auf Röntgen- oder MRT-Bildern erkennen
- Handschrift und Sprache erkennen
- Katzen- von Hundebildern unterscheiden

**Vertiefung** <Badge type="info" text="Oberstufe" />: Weitere Verfahren sind die **lineare Regression** (Zahlenwerte vorhersagen, z. B. Preise) und **künstliche neuronale Netze** (→ [Neuronale Netze](./neuronale-netze)).
