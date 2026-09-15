---
title: "Speichergrößen"
description: "Bit, Byte, Kilobyte, Megabyte, Gigabyte und Terabyte umrechnen, der Unterschied zwischen SI- und Binärpräfixen sowie Übertragungsraten."
---

# Speichergrößen <Badge type="tip" text="Klasse 7" />

Ein Foto auf deinem Handy ist vielleicht 3 MB groß, ein Film 2 GB, und dein Handy hat 128 GB Speicher. Was bedeuten diese Angaben?

::: info Merke
- **1 Bit** ist die kleinste Einheit: 0 oder 1.
- **1 Byte** = **8 Bit**
:::

## Die SI-Präfixe (Tausenderschritte)

| Einheit | Abkürzung | in Byte |
|---|---|---|
| Kilobyte | kB | 1 000 |
| Megabyte | MB | 1 000 000 |
| Gigabyte | GB | 1 000 000 000 |
| Terabyte | TB | 1 000 000 000 000 |

Beim Umrechnen gilt: **Jede Stufe ist das Tausendfache** der vorherigen.
Beispiel: 3,5 GB = 3 500 MB = 3 500 000 kB.

## Binärpräfixe (1024er-Schritte)

Computer rechnen binär, und 2¹⁰ = **1024** liegt nahe an 1000. Deshalb wurden „Kilobyte“ früher oft mit 1024 Byte gleichgesetzt. Um Verwechslungen zu vermeiden, gibt es eigene **Binärpräfixe**:

| Einheit | Abkürzung | in Byte |
|---|---|---|
| Kibibyte | KiB | 1 024 |
| Mebibyte | MiB | 1 024² = 1 048 576 |
| Gibibyte | GiB | 1 024³ = 1 073 741 824 |
| Tebibyte | TiB | 1 024⁴ |

::: tip Warum hat meine 1-TB-Festplatte nur 931 GB?
Der Hersteller rechnet mit **SI-Präfixen** (1 TB = 10¹² Byte). Windows zeigt die Größe in **Binärpräfixen** an, schreibt aber „GB“: 10¹² Byte ÷ 1024³ ≈ **931 GiB**. Es fehlt also nichts, es wird nur anders gezählt.
:::

## Übertragungsraten

Beim Internet wird in **Bit pro Sekunde** gemessen, nicht in Byte!

| Tarif | Bit pro Sekunde | Byte pro Sekunde |
|---|---|---|
| 100 Mbit/s | 100 000 000 bit/s | ÷ 8 = **12,5 MB/s** |

**Beispiel:** Ein 2-GB-Film (2 000 MB) braucht bei 12,5 MB/s etwa 2 000 ÷ 12,5 = **160 Sekunden**.

## Üben

- [Memory-Visualizer](https://memory.tinfo.space/): Arbeite **genau**, und achte auf die Präfixe!
- Schau auf deinem Handy nach, wie groß ein Foto ist (Galerie → Details). Wie viele solcher Fotos passen auf eine 128-GB-Speicherkarte?
