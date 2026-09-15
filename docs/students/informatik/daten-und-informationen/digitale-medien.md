---
title: "Digitale Medien"
description: "Wie Bilder, Texte und Tabellen als Daten gespeichert werden: Pixel- und Vektorgrafik, Auflösung und Farbtiefe, Klasse–Objekt–Attribut–Methode, Trennung von Inhalt und Design und Automatisierung mit Tabellenkalkulation."
---

# Digitale Medien <Badge type="tip" text="Klasse 7" />

Fotos, Präsentationen, Tabellen und Videos: Wir erstellen ständig digitale Medien. Wer die **Konzepte dahinter** versteht, findet sich in jeder neuen App schnell zurecht.

## Pixelgrafiken

Viele Bilder werden wie auf **Karopapier** gespeichert: Jedes Kästchen hat eine Farbe. Ein Kästchen heißt **Pixel** (*picture element*).

::: info Merke
- **Auflösung:** Anzahl der Pixel in Breite × Höhe, z. B. 1920 × 1080
- **Farbtiefe:** Anzahl der Bits pro Pixel. Mit 1 Bit gibt es nur Schwarz/Weiß, mit 24 Bit über 16 Millionen Farben (je 8 Bit für **R**ot, **G**rün, **B**lau)
- **Speicherbedarf** (unkomprimiert) = Breite × Höhe × Farbtiefe
:::

**Beispiel:** 1920 × 1080 Pixel × 24 Bit = 1920 × 1080 × 3 Byte ≈ **6,2 MB**

::: tip Ausprobieren
- [Pixel & Bits](https://pixel.tinfo.space/): Zeichne ein Bild aus Bits.
- Öffne auf deinem Handy ein Foto → **Details**: Welche Auflösung hat es? Wie groß ist die Datei?
:::

## Vektorgrafiken

Eine **Vektorgrafik** speichert keine Pixel, sondern **Formen mit Eigenschaften**: „Kreis, Mittelpunkt (50|50), Radius 20, Füllfarbe Rot“.

| Pixelgrafik | Vektorgrafik |
|---|---|
| Fotos | Logos, Symbole, Diagramme |
| wird beim Vergrößern **pixelig** | bleibt beim Vergrößern **scharf** |
| `.jpg`, `.png` | `.svg` |

## Klasse, Objekt, Attribut, Methode

In einer Vektorgrafik (und in fast jeder Software) begegnen dir **Objekte**:

::: info Merke
| Begriff | Bedeutung | Beispiel |
|---|---|---|
| **Klasse** | Bauplan für gleichartige Objekte | KREIS |
| **Objekt** | ein konkretes Exemplar einer Klasse | kreis1 |
| **Attribut** | Eigenschaft eines Objekts | radius, füllfarbe, linienstärke |
| **Attributwert** | konkreter Wert eines Attributs | radius = 20, füllfarbe = rot |
| **Methode** | Fähigkeit, die den Zustand ändert | verschieben(), vergrößern() |
:::

Diese Sichtweise hilft dir in allen Programmen: Ein **Textfeld** ist ein Objekt mit Attributen wie Schriftart und Schriftgröße. Das Wissen brauchst du auch später bei der [Objektorientierung](../algorithmen/objektorientierung) <Badge type="info" text="Oberstufe" />.

## Trennung von Inhalt und Design

In guten Präsentationen und Textdokumenten werden **Inhalt** (Text, Bilder) und **Design** (Schriftart, Farben, Layout) getrennt, z. B. mit **Formatvorlagen** und **Folienmastern**. Ändert man das Design einmal zentral, passt sich das ganze Dokument an. Dasselbe Prinzip nutzen Websites mit HTML und CSS (→ [Auszeichnungssprachen](../sprachen-und-automaten/auszeichnungssprachen)).

## Automatisierung mit Tabellenkalkulation

Eine Tabellenkalkulation rechnet **automatisch neu**, wenn sich ein Wert ändert, weil in den Zellen **Formeln** stehen, nicht nur Zahlen:

| | A | B | C |
|---|---|---|---|
| 1 | Anzahl | Preis | Gesamt |
| 2 | 3 | 1,50 | `=A2*B2` |
| 3 | | | `=SUMME(C2:C10)` |

## Das richtige Werkzeug

Wähle die Anwendung passend zur Aufgabe: **Textverarbeitung** für Briefe und Aufsätze, **Tabellenkalkulation** für Berechnungen und Diagramme, **Präsentationssoftware** für Vorträge, **Bildbearbeitung** für Fotos.
