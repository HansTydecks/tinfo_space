---
title: "Generative KI"
description: "Wie KI Bilder und Texte erzeugt: Trainingsdaten, das Entrauschen bei Bildgeneratoren und die Wortvorhersage bei Sprachmodellen."
---

# Generative KI <Badge type="tip" text="Klasse 9" />

Bisher haben unsere Modelle **eingeordnet** (beißt / beißt nicht). **Generative KI** erzeugt **neue Inhalte**: Bilder, Texte, Musik oder Videos, meist aus einer Texteingabe, dem **Prompt**.

## Bilder aus Text

| | |
|---|---|
| **Ziel** | aus einer Beschreibung („ein Fuchs mit Sonnenbrille am Strand“) ein Bild erzeugen |
| **Trainingsdaten** | sehr viele Bilder **mit passender Beschreibung** (beschriftet) |
| **Training** | Die Bilder werden Schritt für Schritt mit **Rauschen** (zufälligen Pixelstörungen) überdeckt. Das Modell lernt, **einen Schritt davon rückgängig zu machen**, also aus einem etwas verrauschten Bild ein etwas klareres zu machen. |
| **Generieren** | Start mit **reinem Rauschen**. Das Modell „entrauscht“ es in vielen Schritten, gesteuert durch den Prompt, bis ein neues Bild entsteht. |

::: tip Bild im Kopf
Es ist, als würdest du in Wolken ein Gesicht erkennen und die Wolke Stück für Stück so umformen, dass das Gesicht immer deutlicher wird.
:::

## Text aus Text

| | |
|---|---|
| **Ziel** | auf einen Prompt eine passende Textantwort erzeugen |
| **Trainingsdaten** | riesige Mengen von Menschen geschriebener Texte (Bücher, Websites, Foren, …) |
| **Training** | Jedes Wort bekommt eine Position in einem vieldimensionalen Raum. **Wörter mit ähnlicher Bedeutung liegen nah beieinander** („König“ nah an „Königin“). Das Modell lernt, welches Wort **wahrscheinlich als Nächstes** folgt. |
| **Generieren** | Das Modell berechnet aus dem bisherigen Text das **wahrscheinlichste nächste Wort**, hängt es an und wiederholt das Wort für Wort. |

::: info Merke
Ein Sprachmodell **„weiß“ nicht, was wahr ist**. Es erzeugt Texte, die **wahrscheinlich klingen**. Deshalb können Antworten flüssig, überzeugend **und trotzdem falsch** sein (sogenannte *Halluzinationen*).
:::

## Aufgabe

Erkläre einer Partnerin oder einem Partner, die oder der nichts über KI weiß, ein Verfahren deiner Wahl:
- Welche **Trainingsdaten** werden verwendet?
- Wie wird das Modell **trainiert**?
- Wie **generiert** das Modell?

Mehr Details mit anschaulichen Grafiken: [Informatikbuch: Bildgenerierung](https://buch.informatik.cc/ki/stable-diffusion) und [Sprachmodelle](https://buch.informatik.cc/ki/llm).

## Weiterlesen

- [Prompting](./prompting): So bekommst du bessere Ergebnisse
- [KI & Gesellschaft](./ki-und-gesellschaft): Was generierte Inhalte für unser Vertrauen bedeuten
