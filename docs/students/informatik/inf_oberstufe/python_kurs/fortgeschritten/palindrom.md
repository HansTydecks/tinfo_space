---
title: "Palindrome"
description: "Wörter und Sätze prüfen, die vorwärts wie rückwärts gleich sind."
---

## Ziele
- Einen String umkehren
- Groß-/Kleinschreibung und Leerzeichen sauber behandeln
- Einen Palindromtest als Funktion schreiben

## Was ist ein Palindrom?

Ein Wort, das rückwärts gelesen gleich bleibt: *otto*, *reliefpfeiler*, *rentner*.

## String umkehren

Am kürzesten mit Slicing:

<PyRunner>

```python
wort = "Informatik"
print(wort[::-1])
```

</PyRunner>

`[::-1]` heißt „alle Zeichen, Schrittweite -1" – also rückwärts.

## Einfacher Palindromtest

<PyRunner>

```python
def ist_palindrom(wort):
    return wort == wort[::-1]

print(ist_palindrom("otto"))
print(ist_palindrom("haus"))
```

</PyRunner>

## Groß-/Kleinschreibung und Leerzeichen

„Otto" ist mit großem O kein Palindrom mehr (`"Otto"[::-1]` ist `"ottO"`). Und Sätze enthalten
Leerzeichen. Beides räumt man vorher weg:

<PyRunner>

```python
def ist_palindrom(text):
    sauber = text.lower().replace(" ", "")
    return sauber == sauber[::-1]

print(ist_palindrom("Otto"))
print(ist_palindrom("Erika feuert nur untreue Fakire"))
```

</PyRunner>

:::details Erklärung
`.lower()` macht alles klein, `.replace(" ", "")` entfernt alle Leerzeichen. Erst danach wird
verglichen.
:::

## Ohne Slicing: mit einer Schleife

Manchmal soll man es „zu Fuß" können – von außen nach innen vergleichen:

<PyRunner>

```python
def ist_palindrom(wort):
    links = 0
    rechts = len(wort) - 1
    while links < rechts:
        if wort[links] != wort[rechts]:
            return False
        links += 1
        rechts -= 1
    return True

print(ist_palindrom("reliefpfeiler"))
print(ist_palindrom("reliefpfeiler"))
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Palindrome in einer Liste
Gib aus einer Wortliste nur die Palindrome aus.

<PyRunner>

```python
woerter = ["otto", "haus", "anna", "python", "reittier"]
# for w in woerter: ...
```

</PyRunner>

### Aufgabe 2: Auch Satzzeichen ignorieren
Erweitere den Test so, dass `"Was, muss, das sein?"` … (denk dir ein echtes Satz-Palindrom aus) –
oder teste `"Anna, hol das Kajak, Salonhalona"` und ignoriere `,`, `.`, `?`, `!`.

<PyRunner>

```python
def ist_palindrom(text):
    sauber = text.lower()
    for zeichen in " ,.?!":
        sauber = sauber.replace(zeichen, "")
    return sauber == sauber[::-1]

print(ist_palindrom("Eine güldene, gemeine Tugend nie!"))
```

</PyRunner>

### Aufgabe 3: Längstes Palindrom
Gegeben eine Wortliste. Gib das längste Palindrom aus.

<PyRunner>

```python
woerter = ["otto", "rentner", "haus", "reliefpfeiler", "anna"]
# Akkumulator-Muster: bestes bisher merken
```

</PyRunner>

:::details Tipp
Wie beim [Maximum finden](./lineare-suche): eine Variable `bestes = ""`, und wenn ein Palindrom
länger ist als `bestes`, ersetzen.
:::
