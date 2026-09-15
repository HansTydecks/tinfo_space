---
title: "Rechnerinterne Zahlenformate"
description: "Wie Computer negative Zahlen und Kommazahlen speichern: Zweierkomplement, Festkommadarstellung und Gleitkommazahlen mit ihren Grenzen."
---

# Rechnerinterne Zahlenformate <Badge type="info" text="Oberstufe" />

Mit 8 Bit kann man die Zahlen 0 bis 255 speichern. Aber wie speichert ein Computer **−5** oder **3,75**?

## Negative Zahlen: das Zweierkomplement

::: info Merke: Zweierkomplement
So bildet man −x:
1. x binär aufschreiben (mit fester Bitanzahl),
2. **alle Bits umdrehen** (0 ↔ 1),
3. **1 addieren**.

Das **erste Bit** zeigt das Vorzeichen: 0 = positiv, 1 = negativ.
:::

Beispiel mit 8 Bit, gesucht −5:
```text:no-line-numbers
 5          = 0000 0101
 invertieren  1111 1010
 + 1        = 1111 1011   ← das ist −5
```

**Vorteil:** Man kann ganz normal addieren. 5 + (−5) = `0000 0101` + `1111 1011` = `1 0000 0000`. Der Übertrag vorne fällt weg, es bleibt **0** ✅
Mit 8 Bit lassen sich die Zahlen **−128 bis 127** darstellen.

## Kommazahlen mit Festkomma

Bei der **Festkommadarstellung** legt man fest, wie viele Bits **vor** und wie viele **nach** dem Komma stehen. Die Nachkommastellen haben die Werte ½, ¼, ⅛ …

| 8 | 4 | 2 | 1 | , | 0,5 | 0,25 | 0,125 | 0,0625 |
|---|---|---|---|---|---|---|---|---|
| 0 | 1 | 0 | 1 | , | 1 | 0 | 1 | 0 |

`0101,1010` = 4 + 1 + 0,5 + 0,125 = **5,625**

::: warning Probleme mit Festkomma
- Man muss sich entscheiden: **viele Vorkommabits** (große Zahlen) **oder viele Nachkommabits** (genaue Zahlen).
- Bei großen Zahlen bleiben Nachkommabits ungenutzt, bei kleinen Zahlen die Vorkommabits: Bits gehen „verloren“.
- Es lassen sich nur **Vielfache von 1/2ⁿ** darstellen. **0,1** zum Beispiel ist binär ein unendlicher Bruch und muss **gerundet** werden.
:::

## Gleitkommazahlen

Die Lösung ähnelt der wissenschaftlichen Schreibweise 6,022 · 10²³: Das Komma „gleitet“.

::: info Merke: Gleitkommazahl
Eine Gleitkommazahl besteht aus **Vorzeichen**, **Mantisse** (den Ziffern) und **Exponent** (wohin das Komma rutscht):
**Zahl = Vorzeichen · Mantisse · 2^Exponent**
Nach dem Standard **IEEE 754** hat eine 32-Bit-Zahl 1 Vorzeichenbit, 8 Exponentenbits und 23 Mantissenbits.
:::

So lassen sich **sehr große und sehr kleine** Zahlen mit denselben Bits speichern, allerdings mit **begrenzter Genauigkeit**:

```python
print(0.1 + 0.2)   # Ausgabe: 0.30000000000000004
```

::: tip Konsequenz für das Programmieren
Vergleiche Kommazahlen nie mit `==`. Prüfe stattdessen, ob der Unterschied **sehr klein** ist, z. B. `abs(a - b) < 0.000001`.
:::
