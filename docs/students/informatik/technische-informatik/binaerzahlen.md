---
title: "Binärzahlen"
description: "Warum Computer mit 0 und 1 arbeiten, das Stellenwertsystem, Umrechnung zwischen Binär- und Dezimalzahlen sowie Bit und Byte."
---

# Binärzahlen <Badge type="tip" text="Klasse 7" />

## Warum 0 und 1?

In einem Computer stecken Milliarden winziger **Schalter** (Transistoren). Jeder kennt nur zwei Zustände: **Strom fließt** oder **kein Strom fließt**. Zwei Zustände lassen sich sehr zuverlässig unterscheiden, auch wenn die Spannung etwas schwankt.

::: info Merke
Computer arbeiten mit nur **zwei Zuständen**: **1** (Strom an, wahr) und **0** (Strom aus, falsch).
Eine solche Stelle heißt **Bit** (*binary digit*). **8 Bit** ergeben ein **Byte**.
:::

::: tip Analog und digital
- **Analog / kontinuierlich:** Zwischen zwei Werten gibt es beliebig viele Zwischenwerte (Temperatur: 20 °C, 20,1 °C, 20,01 °C …).
- **Digital / diskret:** Es gibt nur klar getrennte Werte (Ampel: Rot, Gelb, Grün).

Computer speichern alles **digital**. Musik, Fotos und Messwerte müssen dafür erst in einzelne Zahlenwerte umgewandelt werden.
:::

## Das Stellenwertsystem

Im **Dezimalsystem** hat jede Stelle den **zehnfachen** Wert der Stelle rechts daneben:

| Tausender | Hunderter | Zehner | Einer |
|---|---|---|---|
| 10³ = 1000 | 10² = 100 | 10¹ = 10 | 10⁰ = 1 |
| 8 | 7 | 5 | 3 |

8753 = 8 · 1000 + 7 · 100 + 5 · 10 + 3 · 1

Im **Binärsystem** (Zweiersystem) gibt es nur die Ziffern 0 und 1, und jede Stelle hat den **doppelten** Wert:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|
| 2⁷ | 2⁶ | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰ |

## Binär → Dezimal

Addiere die Stellenwerte, unter denen eine **1** steht.

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 | Dezimal |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 | 0 | 1 | 0 | 1 | 0 | 1 | 128 + 16 + 4 + 1 = **149** |
| 0 | 0 | 1 | 1 | 1 | 0 | 1 | 1 | 32 + 16 + 8 + 2 + 1 = **59** |

## Dezimal → Binär

**Methode 1: Stellenwerte abziehen.** Beginne beim größten Stellenwert, der noch hineinpasst.
Beispiel 45: 45 − 32 = 13 → 13 − 8 = 5 → 5 − 4 = 1 → 1 − 1 = 0, also 32, 8, 4, 1 → **101101**

**Methode 2: Durch 2 teilen.** Die Reste von unten nach oben gelesen ergeben die Binärzahl.

```text:no-line-numbers
45 : 2 = 22 Rest 1   ▲
22 : 2 = 11 Rest 0   │
11 : 2 =  5 Rest 1   │   von unten nach oben lesen:
 5 : 2 =  2 Rest 1   │   101101
 2 : 2 =  1 Rest 0   │
 1 : 2 =  0 Rest 1   │
```

::: tip Gerade oder ungerade?
Eine Binärzahl ist **ungerade**, wenn die letzte Stelle eine **1** ist, denn nur die Einer-Stelle ist ungerade.
:::

::: details Wie weit zählst du mit einer Hand?
Jeder Finger ist ein Bit (ausgestreckt = 1). Mit 5 Fingern kommst du bis 11111 = **31**, mit zwei Händen bis **1023**.
:::

## Mit n Bits

Mit **n** Bits kann man **2ⁿ** verschiedene Werte darstellen: mit 8 Bit also 2⁸ = 256 Werte (0 bis 255). Das begegnet dir wieder bei [IP-Adressen](../netzwerke/ip-und-mac) und Farbwerten in [Pixelgrafiken](../daten-und-informationen/digitale-medien).

## Üben

- [Becimal](https://becimal.tinfo.space/): Binär ↔ Dezimal umrechnen
- Welche Dezimalzahlen stecken in `101`, `1010` und `11011`?
