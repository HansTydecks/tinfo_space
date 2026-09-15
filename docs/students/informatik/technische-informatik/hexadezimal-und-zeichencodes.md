---
title: "Hexadezimalsystem & Zeichencodes"
description: "Das Hexadezimalsystem, Zeichenkodierung mit ASCII und Unicode (UTF-8)."
---

# Hexadezimalsystem & Zeichencodes <Badge type="info" text="Oberstufe" />

## Das Hexadezimalsystem

Lange Binärzahlen sind für Menschen schwer lesbar. Das **Hexadezimalsystem** (Basis **16**) fasst jeweils **4 Bit** zu **einer Ziffer** zusammen.

| Dezimal | 0–9 | 10 | 11 | 12 | 13 | 14 | 15 |
|---|---|---|---|---|---|---|---|
| Hex | 0–9 | A | B | C | D | E | F |
| Binär | 0000–1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |

::: info Merke: Umrechnen
- **Binär → Hex:** von rechts in 4er-Gruppen teilen, jede Gruppe in eine Hex-Ziffer übersetzen.
  `1111 1010` → `F A` → **FA**₁₆
- **Hex → Dezimal:** Stellenwerte 16⁰ = 1, 16¹ = 16, 16² = 256 …
  FA₁₆ = 15 · 16 + 10 · 1 = **250**
:::

**Hier begegnet dir Hex:** Farbcodes in HTML (`#FF0000` = Rot), [MAC-Adressen](../netzwerke/ip-und-mac), IPv6-Adressen, Hashwerte.

## Zeichencodes

Ein Computer speichert keine Buchstaben, sondern Zahlen. Eine **Zeichenkodierung** legt fest, **welche Zahl für welches Zeichen** steht.

### ASCII

::: info Merke: ASCII
Der **American Standard Code for Information Interchange** ordnet **128 Zeichen** eine Zahl zu (7 Bit): Groß- und Kleinbuchstaben, Ziffern, Satzzeichen und Steuerzeichen.
:::

| Zeichen | Dezimal | Binär |
|---|---|---|
| `0` | 48 | 0011 0000 |
| `A` | 65 | 0100 0001 |
| `a` | 97 | 0110 0001 |
| Leerzeichen | 32 | 0010 0000 |

**Problem:** Kein Platz für ä, ö, ü, ß, é, kyrillische, arabische oder chinesische Schriftzeichen, von Emojis ganz zu schweigen.

### Unicode und UTF-8

**Unicode** ist ein weltweiter Standard, der **jedem Schriftzeichen** der Welt eine eindeutige Nummer gibt (über 150 000 Zeichen). **UTF-8** speichert diese Nummern platzsparend mit **1 bis 4 Byte**:
- ASCII-Zeichen brauchen weiterhin **1 Byte** (UTF-8 ist abwärtskompatibel).
- `ä` braucht 2 Byte (`C3 A4`), `€` 3 Byte (`E2 82 AC`), viele Emojis 4 Byte.

::: tip Kaputte Umlaute
Siehst du auf einer Website `Ã¤` statt `ä`? Dann wurde UTF-8-Text fälschlich als eine ältere Kodierung gelesen.
:::

## Ausprobieren

- [Binär-ASCII-Visualizer](https://bascii.tinfo.space/): Text Zeichen für Zeichen in Bits sehen
- Kodiere deinen Vornamen in ASCII (dezimal, binär und hexadezimal).
