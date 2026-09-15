---
title: "Codierung"
description: "Codieren und Decodieren, das Sender-Empfänger-Modell und historische und digitale Codes wie Balkentelegrafie, Morsecode und ASCII."
---

# Codierung <Badge type="tip" text="Klasse 7" />

Mit einem Computer zu „sprechen“ ist nicht einfach: Er versteht nur Nullen und Einsen. Damit er unsere Informationen verarbeiten kann, müssen wir sie **codieren**.

::: info Merke
- **Codieren** heißt, eine Information in eine **andere Darstellungsform** umzuwandeln, sodass bestimmte Personen oder Maschinen sie verstehen.
- **Decodieren** heißt, aus den Daten die **Information zurückzugewinnen**.
:::

## Das Sender-Empfänger-Modell

```text:no-line-numbers
  Sender                                                     Empfänger
"Ich bin in Gefahr!" ──► codieren ──► SOS ──► übertragen ──► SOS ──► decodieren ──► "Da braucht jemand Hilfe!"
```

1. Der **Sender** hat eine Information.
2. Er **codiert** sie in Daten (z. B. Morsecode).
3. Die Daten werden **übertragen** (Licht, Funk, Kabel).
4. Der **Empfänger** **decodiert** die Daten und erhält die Information.

::: tip Das Stille-Post-Experiment
Beim Spiel „Satz → Bild → Satz → Bild“ geht unterwegs Information verloren. Warum? Weil nicht alle **denselben Code** benutzen und Bilder **mehrdeutig** sind.
:::

::: info Merke: Eigenschaften eines guten Codes
- **Eindeutig:** Jedes Zeichen hat genau **eine** Bedeutung.
- Sender und Empfänger nutzen **denselben Code** (eine gemeinsame „Tabelle“).
- Die Codewörter lassen sich **voneinander trennen**.
:::

## Drei Codes

| Code | Idee | Beispiel |
|---|---|---|
| **Balkentelegrafie** | Stellungen beweglicher Balken auf Türmen stehen für Buchstaben; Nachrichten wurden von Turm zu Turm weitergegeben | Preußische Telegrafenlinie Berlin–Koblenz (19. Jh.) |
| **Morsecode** | kurze und lange Signale (· und −) mit **Pausen** dazwischen | S = `···`, O = `−−−` → SOS = `··· −−− ···` |
| **ASCII** | jedes Zeichen ist eine Zahl mit 8 Bit | A = `01000001` |

::: details Knobelfrage: Warum kann man Morsecode nicht einfach mit 0 und 1 schreiben?
Morsezeichen sind **unterschiedlich lang** (E = `·`, H = `····`). Die **Pause** zwischen den Buchstaben ist also ein drittes Zeichen. Ohne sie wäre `····` nicht von `·· ··` (I I) oder `· · · ·` (E E E E) zu unterscheiden. ASCII hat dieses Problem nicht, weil **jedes Zeichen genau 8 Bit** lang ist.
:::

## Ausprobieren

- [Binär-ASCII-Visualizer](https://bascii.tinfo.space/): Schreibe deinen Namen in ASCII.
- Für die Oberstufe: [Hexadezimal & Zeichencodes](../technische-informatik/hexadezimal-und-zeichencodes) (ASCII-Tabelle, Unicode)
