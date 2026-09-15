---
title: "Dezimal ↔ Binär"
description: "Zahlen zwischen dem Zehner- und dem Zweiersystem umrechnen – in mehreren Ausbaustufen."
---

## Ziele
- Das Stellenwertsystem verstehen
- Dezimal → Binär mit dem Divisionsrest-Verfahren umsetzen
- Binär → Dezimal berechnen
- Die Umrechnung in Funktionen kapseln

## Stellenwerte

Im Zehnersystem: `4827 = 4·1000 + 8·100 + 2·10 + 7·1`.
Im Zweiersystem gibt es nur die Ziffern 0 und 1, die Stellenwerte sind Zweierpotenzen:
`1, 2, 4, 8, 16, 32, …`

`1011` (binär) `= 1·8 + 0·4 + 1·2 + 1·1 = 11`.

## Binär → Dezimal

<PyRunner>

```python
def bin_zu_dez(bits):
    wert = 0
    for ziffer in bits:          # bits ist ein String wie "1011"
        wert = wert * 2 + int(ziffer)
    return wert

print(bin_zu_dez("1011"))
print(bin_zu_dez("11111111"))
```

</PyRunner>

:::details Erklärung
`wert = wert * 2 + ziffer` – dasselbe Muster wie „Zahl rückwärts" bei den
[Ziffern](../fortgeschritten/ziffern), nur mit Basis 2. Für `"1011"`:
`0 → 1 → 2 → 5 → 11`.
:::

## Dezimal → Binär (Divisionsrest-Verfahren)

Teile die Zahl wiederholt durch 2 und notiere die **Reste** – von unten nach oben gelesen ergeben
sie die Binärzahl.

```text
11 : 2 = 5  Rest 1
 5 : 2 = 2  Rest 1
 2 : 2 = 1  Rest 0
 1 : 2 = 0  Rest 1   -> von unten: 1011
```

<PyRunner>

```python
def dez_zu_bin(zahl):
    if zahl == 0:
        return "0"
    bits = ""
    while zahl > 0:
        bits = str(zahl % 2) + bits    # Rest vorne anfügen
        zahl = zahl // 2
    return bits

print(dez_zu_bin(11))
print(dez_zu_bin(255))
```

</PyRunner>

## Feste Bitbreite

Oft will man eine feste Länge (z. B. 8 Bit) mit führenden Nullen:

<PyRunner>

```python
def dez_zu_bin(zahl, breite):
    bits = ""
    for _ in range(breite):
        bits = str(zahl % 2) + bits
        zahl = zahl // 2
    return bits

print(dez_zu_bin(11, 8))   # 00001011
print(dez_zu_bin(200, 8))
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Hin und zurück
Wandle eine Zahl nach binär und wieder zurück. Prüfe für viele Zahlen, dass das Original herauskommt.

<PyRunner>

```python
def dez_zu_bin(zahl):
    if zahl == 0:
        return "0"
    bits = ""
    while zahl > 0:
        bits = str(zahl % 2) + bits
        zahl //= 2
    return bits

def bin_zu_dez(bits):
    w = 0
    for z in bits:
        w = w * 2 + int(z)
    return w

# for n in range(0, 50): prüfe bin_zu_dez(dez_zu_bin(n)) == n
```

</PyRunner>

### Aufgabe 2: Nötige Bitanzahl
Schreibe `bits_noetig(zahl)`: die kleinste Bitbreite, in die `zahl` passt (z. B. 200 → 8, 300 → 9).

<PyRunner>

```python
def bits_noetig(zahl):
    anzahl = 1
    grenze = 2
    # while zahl >= grenze: ...
    return anzahl

print(bits_noetig(200), bits_noetig(300))
```

</PyRunner>

### Aufgabe 3: Ins Hexadezimalsystem
Passe das Divisionsrest-Verfahren auf **Basis 16** an. Für Reste 10–15 nutze die Buchstaben A–F.

<PyRunner>

```python
ziffern = "0123456789ABCDEF"

def dez_zu_hex(zahl):
    if zahl == 0:
        return "0"
    # bits = ziffern[zahl % 16] + bits ; zahl //= 16
    pass

print(dez_zu_hex(255))   # FF
```

</PyRunner>

:::details Tipp
Statt `str(zahl % 16)` nimmst du `ziffern[zahl % 16]` – so wird aus dem Rest 12 automatisch `"C"`.
:::
