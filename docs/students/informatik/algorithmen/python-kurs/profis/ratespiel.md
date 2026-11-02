---
title: "Projekt: Ratespiel"
description: "Ein vollständiges interaktives Programm: Rate die Zahl – oder Galgenraten als Erweiterung."
---

## Ziele
- Ein größeres Programm nach dem Problemlöseprozess entwickeln
- Zufall, Schleife, Verzweigung und Eingabe kombinieren
- Fehleingaben abfangen

## Phase 1: Analyse

*„Rate die Zahl":* Das Programm denkt sich eine Zahl von 1 bis 100 aus. Der Spieler rät, das
Programm sagt „zu groß" oder „zu klein". Nach spätestens *X* Versuchen ist Schluss.

- **Eingabe:** die geratenen Zahlen
- **Ausgabe:** Hinweise, Gewinn/Verlust, Versuchszahl
- **Ende:** Zahl erraten **oder** Versuche aufgebraucht

## Phase 2: Entwurf (Pseudocode)

```text
geheim = zufällige Zahl 1..100
versuche = 0
solange versuche < maximum:
    lies tipp
    versuche += 1
    wenn tipp == geheim:  gewonnen, abbrechen
    wenn tipp < geheim:   "zu klein"
    sonst:                "zu groß"
wenn nicht gewonnen:  verloren, geheim verraten
```

## Phase 3: Umsetzung

<PyRunner stdin="50\n75\n62\n68\n65">

```python
import random

geheim = random.randint(1, 100)
maximum = 7
gewonnen = False

print("Ich denke an eine Zahl zwischen 1 und 100.")

for versuch in range(1, maximum + 1):
    tipp = int(input(f"Versuch {versuch}/{maximum}: "))
    if tipp == geheim:
        print(f"Richtig! In {versuch} Versuchen.")
        gewonnen = True
        break
    elif tipp < geheim:
        print("zu klein")
    else:
        print("zu groß")

if not gewonnen:
    print(f"Verloren. Die Zahl war {geheim}.")
```

</PyRunner>

::: info Zum Ausprobieren
Im Eingabefeld stehen ein paar Tipps vorbereitet. Weil `geheim` zufällig ist, gewinnst du damit
nicht immer – trag eigene Zahlen ein und spiele mehrmals.
:::

## Phase 4: Test & Absicherung

Was passiert bei `int("abc")`? Fang es ab (siehe
[do-while & try/except](../fortgeschritten/do-while)):

<PyRunner stdin="fünfzig\n50\n30\n40\n45\n43\n42">

```python
import random

geheim = random.randint(1, 100)
maximum = 7
gewonnen = False
versuch = 0

while versuch < maximum:
    try:
        tipp = int(input(f"Versuch {versuch + 1}/{maximum}: "))
    except ValueError:
        print("Bitte eine ganze Zahl.")
        continue
    versuch += 1
    if tipp == geheim:
        print(f"Richtig, in {versuch} Versuchen!")
        gewonnen = True
        break
    print("zu klein" if tipp < geheim else "zu groß")

if not gewonnen:
    print(f"Verloren. Die Zahl war {geheim}.")
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Der Computer rät
Dreh das Spiel um: **Du** denkst dir eine Zahl, der Computer rät mit
[binärer Suche](../fortgeschritten/binaere-suche). Du antwortest mit `h` (höher), `t` (tiefer),
`r` (richtig).

<PyRunner stdin="h\nh\nt\nr">

```python
links, rechts = 1, 100
while links <= rechts:
    rate = (links + rechts) // 2
    antwort = input(f"Ist es {rate}? (h/t/r) ")
    # antwort auswerten, links/rechts anpassen
```

</PyRunner>

### Aufgabe 2: Galgenraten
Baue stattdessen *Hangman*: Ein Wort aus einer Liste wird zufällig gewählt und als `_ _ _`
angezeigt. Der Spieler rät Buchstaben, hat 8 Fehlversuche.

<PyRunner stdin="e\nn\na\nt\nr">

```python
import random
woerter = ["python", "schleife", "variable", "funktion"]
wort = random.choice(woerter)
geraten = []
fehler = 0
# Spielschleife: Anzeige bauen, Buchstabe lesen, prüfen
```

</PyRunner>

:::details Tipp
Anzeige: `"".join(b if b in geraten else "_" for b in wort)`. Gewonnen, wenn kein `_` mehr drin ist.
:::

### Aufgabe 3: Highscore
Erweitere „Rate die Zahl" so, dass es nach einer Runde fragt „Nochmal? (j/n)" und die wenigsten
benötigten Versuche über alle Runden merkt.
