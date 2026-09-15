---
title: "Das EVA-Prinzip"
description: "Eingabe, Verarbeitung, Ausgabe: das EVA-Modell an realen Informatiksystemen, seine Erweiterung um Speicherung und Zustandsdiagramme."
---

# Das EVA-Prinzip <Badge type="tip" text="Klasse 7" />

Informatiksysteme arbeiten nach einem einfachen Muster: Etwas kommt **herein**, wird **verarbeitet**, und etwas kommt **heraus**.

::: info Merke: EVA-Prinzip
**E**ingabe → **V**erarbeitung → **A**usgabe
:::

```text:no-line-numbers
   Eingabe          Verarbeitung            Ausgabe
 ┌──────────┐      ┌──────────────┐      ┌──────────────┐
 │ Mikrofon │ ───► │  Prozessor   │ ───► │ Lautsprecher │
 │ Kamera   │      │  (Programm)  │      │ Bildschirm   │
 │ Tastatur │      └──────────────┘      │ Drucker      │
 └──────────┘                            └──────────────┘
```

## Beispiele

| System | Eingabe | Verarbeitung | Ausgabe |
|---|---|---|---|
| Supermarktkasse | Barcode scannen | Preis in der Datenbank nachschlagen | Preis auf dem Display |
| Sprachassistent | Sprache über Mikrofon | Sprache erkennen, Antwort suchen | Sprache über Lautsprecher |
| Calliope-Lautstärkemesser | Mikrofon misst Lautstärke | „Ist es lauter als ein Grenzwert?“ | Symbol auf der LED-Matrix |

::: tip Nicht nur Computer
Das EVA-Prinzip steckt auch im Alltag: Zutaten (**E**) werden gekocht (**V**) und ergeben ein Essen (**A**). Finde ein eigenes Beispiel!
:::

## Grenzen des Modells: EVAS

Viele Systeme **merken sich** etwas: Fotos, Spielstände, Kontakte. Das einfache EVA-Modell zeigt das nicht. Deshalb erweitert man es um **S** wie **Speicherung**:

::: info Merke: EVAS-Prinzip
**E**ingabe → **V**erarbeitung → **A**usgabe, dazu **S**peicherung (Daten werden für später abgelegt und wieder abgerufen)
:::

## Zustände beschreiben

Manche Systeme verhalten sich je nach **Zustand** unterschiedlich. Ein **Zustandsdiagramm** (Übergangsgraph) zeigt Zustände als Kreise und Übergänge als Pfeile.

```text:no-line-numbers
          Knopf gedrückt            5 Sekunden vergangen
 ( Autos Grün ) ─────────► ( Autos Gelb ) ─────────► ( Autos Rot / Fußgänger Grün )
        ▲                                                        │
        └──────────────────── 20 Sekunden vergangen ─────────────┘
```

Solche Diagramme begegnen dir in der Oberstufe wieder bei den [endlichen Automaten](../sprachen-und-automaten/endliche-automaten).

## Ausprobieren

- [EVA-Stationen](https://scanner.eva.tinfo.space/): Scanner, [Mikrofon](https://mic.eva.tinfo.space), [Tastatur](https://keys.eva.tinfo.space) und [Kamera](https://camera.eva.tinfo.space/) als Eingabe erleben
- Programmiere mit dem Calliope mini einen Lautstärkedetektor: [calliopemini.info](https://calliopemini.info/)
- Für die Oberstufe: Wie EVAS mit der [Von-Neumann-Architektur](./von-neumann) zusammenhängt
