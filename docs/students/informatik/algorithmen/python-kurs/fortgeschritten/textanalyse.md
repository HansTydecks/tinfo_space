---
title: "Textanalyse"
description: "Häufigstes Wort, häufigster Buchstabe: Texte auswerten mit Dictionary als Zähler."
---

## Ziele
- Text mit `.split()` in Wörter zerlegen
- Ein **Dictionary** als Zähler benutzen
- Das häufigste Element bestimmen

## Text in Wörter zerlegen

<PyRunner>

```python
text = "die katze jagt die maus die maus rennt"
woerter = text.split()      # trennt an Leerzeichen
print(woerter)
print("Anzahl Wörter:", len(woerter))
```

</PyRunner>

## Das Dictionary

Eine **Liste** greift über eine Zahl (Index) zu. Ein **Dictionary** greift über einen frei
wählbaren Schlüssel zu – hier: das Wort → seine Anzahl.

<PyRunner>

```python
zaehler = {}
zaehler["die"] = 3
zaehler["maus"] = 2
print(zaehler)
print(zaehler["die"])
print("katze" in zaehler)
```

</PyRunner>

## Wörter zählen

<PyRunner>

```python
text = "die katze jagt die maus die maus rennt"
woerter = text.split()

zaehler = {}
for wort in woerter:
    if wort in zaehler:
        zaehler[wort] += 1
    else:
        zaehler[wort] = 1

print(zaehler)
```

</PyRunner>

:::details Kürzer mit get()
`zaehler[wort] = zaehler.get(wort, 0) + 1` – `.get(wort, 0)` liefert die bisherige Anzahl oder `0`,
falls das Wort neu ist. Dann entfällt das `if`.
:::

## Das häufigste Wort

<PyRunner>

```python
text = "die katze jagt die maus die maus rennt"

zaehler = {}
for wort in text.split():
    zaehler[wort] = zaehler.get(wort, 0) + 1

haeufigstes = ""
max_anzahl = 0
for wort in zaehler:
    if zaehler[wort] > max_anzahl:
        max_anzahl = zaehler[wort]
        haeufigstes = wort

print(f"'{haeufigstes}' kommt {max_anzahl}x vor")
```

</PyRunner>

## Der häufigste Buchstabe

Dasselbe Muster – nur über die Zeichen statt über die Wörter:

<PyRunner>

```python
text = "programmieren macht wirklich freude"

zaehler = {}
for zeichen in text:
    if zeichen != " ":
        zaehler[zeichen] = zaehler.get(zeichen, 0) + 1

bester = ""
max_anzahl = 0
for z in zaehler:
    if zaehler[z] > max_anzahl:
        max_anzahl = zaehler[z]
        bester = z

print(f"'{bester}': {max_anzahl}x")
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Wie viele verschiedene Wörter?
Gib aus, wie viele **unterschiedliche** Wörter der Text enthält.

<PyRunner>

```python
text = "wenn fliegen hinter fliegen fliegen fliegen fliegen fliegen nach"
# Tipp: len(zaehler)
```

</PyRunner>

### Aufgabe 2: Vokale zählen
Zähle, wie oft jeder Vokal (a, e, i, o, u) im Text vorkommt.

<PyRunner>

```python
text = "informatik ist ein spannendes fach"
# for zeichen in text: if zeichen in "aeiou": ...
```

</PyRunner>

### Aufgabe 3: Wörter ab einer Mindesthäufigkeit
Gib alle Wörter aus, die **mindestens 2x** vorkommen.

<PyRunner>

```python
text = "rot blau rot grün blau rot gelb blau"
zaehler = {}
for wort in text.split():
    zaehler[wort] = zaehler.get(wort, 0) + 1
# for wort in zaehler: if zaehler[wort] >= 2: ...
```

</PyRunner>

:::details Tipp
Über ein Dictionary läuft `for schluessel in zaehler:`. Den Wert bekommst du mit `zaehler[schluessel]`.
:::
