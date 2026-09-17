---
title: "Selektion (if / elif / else)"
description: "Programme, die Entscheidungen treffen: Verzweigungen mit if, elif und else."
---

## Ziele
- Mit `if` eine Bedingung prüfen
- Mehrere Fälle mit `elif` und `else` abdecken
- Einrückung und Doppelpunkt korrekt setzen

<SilentTeacherButton kapitel="selektion" />

## Die einfache Verzweigung

Eine **Bedingung** ist ein Ausdruck, der `True` oder `False` ergibt. Ist sie wahr, wird der
eingerückte Block ausgeführt:

<PyRunner>

```python
temperatur = 28

if temperatur > 25:
    print("Heiß – nimm was zu trinken mit.")

print("Schönen Tag!")
```

</PyRunner>

:::danger Zwei Pflicht-Details
- Am Ende der `if`-Zeile steht ein **Doppelpunkt** `:`
- Der Block darunter wird mit **einer Tabulatortaste** (4 Leerzeichen) eingerückt

Fehlt eines von beidem, gibt es einen Fehler.
:::

## Mehrere Fälle: elif und else

<PyRunner>

```python
punkte = 74

if punkte >= 90:
    note = "sehr gut"
elif punkte >= 75:
    note = "gut"
elif punkte >= 60:
    note = "befriedigend"
else:
    note = "üben!"

print("Note:", note)
```

</PyRunner>

:::details Erklärung
Python prüft von oben nach unten. Der **erste** zutreffende Fall wird ausgeführt, der Rest
übersprungen. `else` fängt alles ab, was vorher nicht gepasst hat. Bei `punkte = 74` greift der
Zweig `>= 60`.
:::

## Bedingungen kombinieren

<PyRunner>

```python
alter = 15
begleitung = True

if alter >= 16 or begleitung:
    print("Einlass ok")
else:
    print("Kein Einlass")
```

</PyRunner>

## Mehrere Werte prüfen mit `in`

<PyRunner>

```python
eingabe = "j"

if eingabe in ["j", "J", "ja", "Ja"]:
    print("verstanden: ja")
else:
    print("nicht als Ja erkannt")
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Zahlenbereich
`zahl` steht fest. Gib aus, ob sie kleiner 10, zwischen 10 und 20 oder größer 20 ist. Teste alle drei
Fälle.

<PyRunner>

```python
zahl = 17
# if / elif / else
```

</PyRunner>

### Aufgabe 2: Gerade / ungerade / null
Gib für `zahl` aus: `"null"`, `"gerade"` oder `"ungerade"`.

<PyRunner>

```python
zahl = 8
# dein Code
```

</PyRunner>

:::details Tipp
Zuerst auf `== 0` prüfen, dann mit `% 2` gerade/ungerade unterscheiden.
:::

### Aufgabe 3: Getränkeautomat
`wahl` ist eine Zahl von 1 bis 3 (1 = Wasser, 2 = Saft, 3 = Cola). Gib das Getränk aus, bei jeder
anderen Zahl `"Ungültige Wahl"`.

<PyRunner>

```python
wahl = 2
# dein Code
```

</PyRunner>
