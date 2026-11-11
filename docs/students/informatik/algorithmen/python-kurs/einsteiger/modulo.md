---
title: "Modulo – der Rest der Division"
description: "Der Operator % an vielen Beispielen: gerade/ungerade, Teilbarkeit, Ziffern, Uhrzeit, Wochentage, Kreisläufe, FizzBuzz, Caesar-Verschlüsselung, Prüfziffern – mit Modulo-Visualizer."
---

# Modulo – der Rest der Division

## Ziele
- Verstehen, was `a % n` berechnet und wie `%` mit `//` zusammenhängt
- Typische Anwendungen erkennen: Teilbarkeit, Ziffern, Uhrzeit, Kreisläufe
- Modulo in eigenen Programmen sicher einsetzen

::: tip 🌀 Modulo sehen statt nur rechnen
Im [**Modulo-Visualizer**](./modulo-visualizer) läuft Modulo als Tabelle, als leuchtende
3D-Spirale, als Uhr, als Multiplikationskreis, als Pascal-Dreieck und als Sägezahn – endlos.
Öffne ihn ruhig in einem zweiten Tab und schau immer wieder hinein.
:::

::: info Kleiner Vorgriff
Ein paar Beispiele unten benutzen schon `if` und `for`. Die lernst du auf den nächsten Seiten
genauer kennen – lies sie einfach mit und komm später noch einmal zurück.
:::

## 1. Division mit Rest

Erinnerst du dich an die Grundschule? *17 geteilt durch 5 ist 3, Rest 2.* Genau das rechnet
Python mit zwei Operatoren:

| Ausdruck | Bedeutung | Ergebnis |
|---|---|:-:|
| `17 // 5` | Wie oft passt 5 ganz in 17? | `3` |
| `17 % 5` | Was bleibt übrig? (*Modulo*, sprich „17 modulo 5“) | `2` |
| `divmod(17, 5)` | beides auf einmal | `(3, 2)` |

Es gilt immer: **`a = (a // n) * n + a % n`**, also hier `17 = 3 · 5 + 2`.

<PyRunner>

```python
print(17 // 5, 17 % 5)
print(divmod(17, 5))

for a in range(10):
    print(a, "%", 3, "=", a % 3)
```

</PyRunner>

:::tip Merke
Der Rest von `a % n` ist **immer** eine Zahl von `0` bis `n - 1`. Bei `% 3` gibt es also nur die
Reste `0`, `1` und `2` – sie wiederholen sich immer wieder: `0, 1, 2, 0, 1, 2, …`
Genau dieses „Im-Kreis-Laufen“ macht Modulo so nützlich.
:::

## 2. Gerade, ungerade, teilbar

Eine Zahl ist **durch n teilbar**, wenn beim Teilen kein Rest bleibt: `zahl % n == 0`.
Der wichtigste Sonderfall: **gerade** Zahlen haben bei `% 2` den Rest `0`.

<PyRunner>

```python
zahl = 42
print(zahl % 2 == 0)              # gerade?
print(15 % 3 == 0, 16 % 3 == 0)   # durch 3 teilbar?
```

</PyRunner>

## 3. Ziffern abschneiden

`% 10` liefert die **letzte Ziffer**, `// 10` schneidet sie ab. Zusammen kann man eine Zahl
Ziffer für Ziffer zerlegen – zum Beispiel für die **Quersumme**.

<PyRunner>

```python
zahl = 4711
print(zahl % 10)        # letzte Ziffer
print(zahl % 100)       # letzte zwei Ziffern
print(zahl // 10 % 10)  # Zehnerziffer

summe = 0
while zahl > 0:
    summe = summe + zahl % 10   # letzte Ziffer addieren
    zahl = zahl // 10           # letzte Ziffer abschneiden
print("Quersumme:", summe)
```

</PyRunner>

## 4. Uhrzeit und Wochentage

Uhren rechnen **modulo 24** (oder 12), Wochentage **modulo 7**. Nach dem Ende geht es wieder
von vorne los.

<PyRunner>

```python
jetzt = 22
print((jetzt + 5) % 24)          # 22 Uhr + 5 Stunden

tage = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
heute = 2                        # Mittwoch
print(tage[(heute + 100) % 7])   # Welcher Tag ist in 100 Tagen?
```

</PyRunner>

:::details Warum Freitag?
`100 % 7 = 2` – nach 14 vollen Wochen bleiben 2 Tage übrig. Mittwoch + 2 Tage = Freitag.
:::

## 5. Umrechnen: Sekunden, Minuten, Stunden

Mit `//` holst du die großen Einheiten heraus, mit `%` den Rest, der übrig bleibt.

<PyRunner>

```python
sekunden = 500
print(sekunden // 60, "min", sekunden % 60, "s")

gesamt = 10000
stunden = gesamt // 3600
minuten = gesamt % 3600 // 60
rest = gesamt % 60
print(stunden, "h", minuten, "min", rest, "s")
```

</PyRunner>

## 6. Im Kreis laufen

Mit `i % len(liste)` läuft ein Index immer wieder durch die Liste – ohne `IndexError`.
Und mit `i % 4 == 0` erwischst du jedes vierte Element.

<PyRunner>

```python
farben = ["rot", "gelb", "grün"]
for i in range(8):
    print(i, farben[i % len(farben)])

for i in range(1, 13):
    if i % 4 == 0:
        print(i, "<- jede vierte")

for zeile in range(6):          # Zebra-Muster
    if zeile % 2 == 0:
        print("██████")
    else:
        print("░░░░░░")
```

</PyRunner>

## 7. FizzBuzz und Schaltjahre

**FizzBuzz** ist ein Klassiker in Bewerbungsgesprächen: Zähle hoch, sage aber „Fizz“ bei
Vielfachen von 3, „Buzz“ bei Vielfachen von 5 und „FizzBuzz“ bei beidem.

<PyRunner>

```python
for i in range(1, 16):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
```

</PyRunner>

Ein Jahr ist ein **Schaltjahr**, wenn es durch 4 teilbar ist – außer es ist durch 100 teilbar.
Durch 400 teilbare Jahre sind aber wieder Schaltjahre.

<PyRunner>

```python
for jahr in [1900, 2000, 2024, 2025]:
    schalt = (jahr % 4 == 0 and jahr % 100 != 0) or jahr % 400 == 0
    print(jahr, schalt)
```

</PyRunner>

## 8. Caesar-Verschlüsselung

Jeder Buchstabe wird um `k` Stellen im Alphabet verschoben. Damit nach dem `z` wieder das `a`
kommt, rechnen wir **modulo 26**.

<PyRunner>

```python
alphabet = "abcdefghijklmnopqrstuvwxyz"
text = "hallo zebra"
k = 3

geheim = ""
for z in text:
    if z in alphabet:
        pos = alphabet.index(z)
        geheim = geheim + alphabet[(pos + k) % 26]
    else:
        geheim = geheim + z
print(geheim)
```

</PyRunner>

## 9. Prüfziffern

Auf jedem Strichcode (EAN) steht am Ende eine **Prüfziffer**. Sie wird aus den ersten 12 Ziffern
berechnet: abwechselnd mal 1 und mal 3 nehmen, alles addieren – und mit Modulo die Ziffer
bestimmen, die auf den nächsten Zehner fehlt. Ein Tippfehler an der Kasse fällt so sofort auf.

<PyRunner>

```python
ean = "400638133393"     # die ersten 12 Ziffern
summe = 0
for i in range(12):
    ziffer = int(ean[i])
    if i % 2 == 0:
        summe = summe + ziffer
    else:
        summe = summe + 3 * ziffer
pruef = (10 - summe % 10) % 10
print("Summe:", summe, "Prüfziffer:", pruef)
```

</PyRunner>

:::info
Das ganze Produkt hat die Nummer `4006381333931` – die letzte Ziffer `1` ist genau die
berechnete Prüfziffer. Auch IBAN, ISBN und Personalausweis nutzen Prüfziffern mit Modulo.
:::

## 10. Achtung bei negativen Zahlen

In Python hat der Rest **immer das Vorzeichen des Teilers**. Bei positivem `n` ist `a % n`
also nie negativ – auch wenn `a` negativ ist. (In Java oder C ist das anders!)

<PyRunner>

```python
print(-7 % 3, -7 // 3)   # -7 = -3 · 3 + 2
print(7 % -3)
print((2 - 3) % 7)       # 3 Tage vor Mittwoch (2) -> Sonntag (6)
```

</PyRunner>

:::warning
Das ist praktisch: Rückwärts rechnen auf der Uhr oder im Alphabet (`(pos - k) % 26`) funktioniert
in Python ohne Sonderfall.
:::

## Aufgaben

### Aufgabe 1: Teilbar?
Prüfe, ob `2026` durch `7` teilbar ist. Gib außerdem den Rest aus.

<PyRunner>

```python
zahl = 2026
# dein Code
```

</PyRunner>

:::details Lösung
```python
zahl = 2026
print(zahl % 7 == 0)   # False
print(zahl % 7)        # 3
```
:::

### Aufgabe 2: Eine Million Sekunden
Wie viele Tage, Stunden, Minuten und Sekunden sind `1000000` Sekunden?

<PyRunner>

```python
s = 1000000
# tage = ...
```

</PyRunner>

:::details Lösung
```python
s = 1000000
tage = s // 86400
stunden = s % 86400 // 3600
minuten = s % 3600 // 60
sekunden = s % 60
print(tage, "d", stunden, "h", minuten, "min", sekunden, "s")
# 11 d 13 h 46 min 40 s
```
:::

### Aufgabe 3: Nachtzug
Ein Zug fährt um 17 Uhr los und ist 30 Stunden unterwegs. Um wie viel Uhr kommt er an?

<PyRunner>

```python
abfahrt = 17
dauer = 30
# ankunft = ...
```

</PyRunner>

:::details Lösung
```python
print((abfahrt + dauer) % 24)   # 23 Uhr (am übernächsten Tag)
```
:::

### Aufgabe 4: Zahl rückwärts
Gib die Ziffern von `2026` rückwärts aus, also `6202`. Benutze nur `%` und `//`.

<PyRunner>

```python
zahl = 2026
```

</PyRunner>

:::details Lösung
```python
zahl = 2026
rueckwaerts = ""
while zahl > 0:
    rueckwaerts = rueckwaerts + str(zahl % 10)
    zahl = zahl // 10
print(rueckwaerts)   # 6202
```
:::

### Aufgabe 5: Durchzählen
26 Schülerinnen und Schüler zählen „1, 2, 3, 4, 1, 2, …“ durch und bilden so vier Gruppen.
Gib für jede Nummer `0` bis `25` aus, in welche Gruppe sie kommt. Wie groß werden die Gruppen?

<PyRunner>

```python
for i in range(26):
    # gruppe = ...
    pass
```

</PyRunner>

:::details Lösung
```python
for i in range(26):
    gruppe = i % 4 + 1
    print(i, "-> Gruppe", gruppe)
```
Die Gruppen 1 und 2 bekommen 7 Personen, die Gruppen 3 und 4 je 6 – denn `26 = 6 · 4 + 2`.
:::

### Aufgabe 6: Caesar knacken
Entschlüssele `"kdoor cheud"` (verschoben um `k = 3`). Tipp: Schiebe einfach zurück.

<PyRunner>

```python
alphabet = "abcdefghijklmnopqrstuvwxyz"
geheim = "kdoor cheud"
```

</PyRunner>

:::details Lösung
```python
klar = ""
for z in geheim:
    if z in alphabet:
        klar = klar + alphabet[(alphabet.index(z) - 3) % 26]
    else:
        klar = klar + z
print(klar)   # hallo zebra
```
:::

### Aufgabe 7: Heiligabend
Der 1. Januar 2026 war ein Donnerstag. Der 24. Dezember ist der 358. Tag des Jahres.
Auf welchen Wochentag fällt Heiligabend 2026?

<PyRunner>

```python
tage = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
neujahr = 3     # Donnerstag
tag_im_jahr = 358
```

</PyRunner>

:::details Lösung
```python
print(tage[(neujahr + tag_im_jahr - 1) % 7])   # Do
```
Zwischen dem 1. und dem 358. Tag liegen 357 Tage, und `357 % 7 = 0` – genau 51 Wochen. Also
wieder ein Donnerstag.
:::

::: tip Weiter
Schau dir jetzt im [Modulo-Visualizer](./modulo-visualizer) an, wie die Reste in der
3D-Spirale senkrechte Säulen bilden – und weiter geht's mit der [Selektion](./selektion).
:::
