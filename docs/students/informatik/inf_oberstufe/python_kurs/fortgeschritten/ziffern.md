---
title: "Ziffern & Stellenwerte"
description: "Einzelne Ziffern einer Zahl herauslösen: Quersumme, Zahl rückwärts, Ziffern zählen."
---

## Ziele
- Die letzte Ziffer mit `% 10` bestimmen
- Die letzte Ziffer mit `// 10` entfernen
- Damit Quersumme und weitere Aufgaben lösen

## Das Grundprinzip

Für jede natürliche Zahl gilt:

- `zahl % 10` → die **letzte Ziffer**
- `zahl // 10` → die Zahl **ohne** letzte Ziffer

<PyRunner>

```python
zahl = 4827
print(zahl % 10)    # 7
print(zahl // 10)   # 482
```

</PyRunner>

Wiederholt man das, bekommt man alle Ziffern – von hinten nach vorn:

<PyRunner>

```python
zahl = 4827
while zahl > 0:
    ziffer = zahl % 10
    print(ziffer)
    zahl = zahl // 10
```

</PyRunner>

## Quersumme

<PyRunner>

```python
def quersumme(zahl):
    summe = 0
    while zahl > 0:
        summe += zahl % 10
        zahl //= 10
    return summe

print(quersumme(4827))     # 4+8+2+7 = 21
print(quersumme(999999))
```

</PyRunner>

:::details Erklärung
`zahl //= 10` ist die Kurzform von `zahl = zahl // 10`. Die Schleife endet, wenn `zahl` auf `0`
geschrumpft ist.
:::

## Zahl rückwärts

<PyRunner>

```python
def rueckwaerts(zahl):
    ergebnis = 0
    while zahl > 0:
        ergebnis = ergebnis * 10 + zahl % 10
        zahl //= 10
    return ergebnis

print(rueckwaerts(1234))   # 4321
```

</PyRunner>

:::tip Brücke zu Dezimal ↔ Binär
Genau dieses „letzte Ziffer abtrennen, Zahl verkleinern" steckt auch hinter der Umrechnung ins
Binärsystem – nur mit `% 2` und `// 2` statt 10. Siehe
[Dezimal ↔ Binär](../komplexe-aufgaben/dezimal-binaer).
:::

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Anzahl der Ziffern
Schreibe `ziffernanzahl(n)` – ohne die Zahl in einen String umzuwandeln.

<PyRunner>

```python
def ziffernanzahl(n):
    # Sonderfall: n == 0 hat eine Ziffer
    pass

print(ziffernanzahl(4827), ziffernanzahl(0))
```

</PyRunner>

### Aufgabe 2: Iterierte Quersumme
Bilde so lange die Quersumme, bis nur noch eine einstellige Zahl übrig ist
(z. B. 9875 → 29 → 11 → 2).

<PyRunner>

```python
def quersumme(zahl):
    s = 0
    while zahl > 0:
        s += zahl % 10
        zahl //= 10
    return s

zahl = 9875
# while zahl >= 10: zahl = quersumme(zahl)
print(zahl)
```

</PyRunner>

### Aufgabe 3: Palindromzahl
Prüfe, ob eine Zahl vorwärts wie rückwärts gleich ist (z. B. 12321). Nutze `rueckwaerts` von oben.

<PyRunner>

```python
def rueckwaerts(zahl):
    e = 0
    while zahl > 0:
        e = e * 10 + zahl % 10
        zahl //= 10
    return e

zahl = 12321
# print(zahl == rueckwaerts(zahl))
```

</PyRunner>

:::details Tipp
Vergleiche einfach `zahl == rueckwaerts(zahl)`. Auf der [Palindrom-Seite](./palindrom) machst du
dasselbe mit Wörtern.
:::
