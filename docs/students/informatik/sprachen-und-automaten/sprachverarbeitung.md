---
title: "Sprachverarbeitung"
description: "Wie Compiler und Interpreter Programmiersprachen übersetzen (lexikalische und syntaktische Analyse), sowie Chancen und Risiken automatischer Verarbeitung natürlicher Sprache und der Turing-Test."
---

# Sprachverarbeitung <Badge type="info" text="Oberstufe" />

Der Prozessor versteht nur Maschinenbefehle aus Nullen und Einsen. Wie wird aus `print("Hallo")` etwas, das er ausführen kann? Und wie versteht ein Sprachassistent „Stell einen Wecker auf sieben“?

## Compiler und Interpreter

| Compiler | Interpreter |
|---|---|
| übersetzt das **ganze Programm vorab** in Maschinencode | übersetzt und führt **Anweisung für Anweisung** aus |
| Ergebnis: eigenständige ausführbare Datei | Programm braucht immer den Interpreter |
| schnell bei der Ausführung, Fehler zeigen sich vor dem Start | flexibel, gut zum Ausprobieren, Fehler erst bei Erreichen der Zeile |
| Beispiele: C, C++, Rust | Beispiele: Python, JavaScript (vereinfacht) |

::: tip Programmiersprachen klassifizieren (Leistungskurs)
**Maschinensprache** (Bits) → **Assembler** (kurze Befehle wie `MOV`, `ADD`, nah an der Hardware) → **höhere Programmiersprachen** (Python, Java; unabhängig von der Hardware, gut lesbar).
:::

## Der Übersetzungsprozess <Badge type="warning" text="Lk" />

Beispiel: `summe = a + 42`

::: info Merke
1. **Lexikalische Analyse** (*Scanner*): Der Text wird in **Tokens** zerlegt. Dafür nutzt man reguläre Ausdrücke bzw. endliche Automaten.
   `BEZEICHNER(summe)` `ZUWEISUNG` `BEZEICHNER(a)` `PLUS` `ZAHL(42)`
2. **Syntaktische Analyse** (*Parser*): Mit der **Grammatik** der Sprache wird geprüft, ob die Tokens in einer erlaubten Reihenfolge stehen, und ein **Syntaxbaum** aufgebaut.
3. **Semantische Analyse:** Ist die Bedeutung sinnvoll? Ist `a` überhaupt definiert?
4. **Code-Erzeugung:** Aus dem Baum entsteht Maschinen- oder Bytecode.
:::

```text:no-line-numbers
          =
        /   \
    summe     +
            /   \
           a     42
```

So erklären sich auch Fehlermeldungen: `SyntaxError` kommt vom **Parser**, `NameError` (unbekannte Variable) von einer späteren Prüfung.

## Natürliche Sprache verarbeiten

Sprachassistenten, Übersetzer, Chatbots und Sprachsteuerung im Auto verarbeiten **natürliche Sprache**, die mehrdeutig ist, Dialekte hat und sich ständig verändert. Heute geschieht das meist mit [maschinellem Lernen](../kuenstliche-intelligenz/generative-ki) statt mit festen Grammatiken.

::: info Merke: Turing-Test
Alan Turing schlug 1950 vor: Eine Person unterhält sich schriftlich mit einem Menschen und einer Maschine, ohne zu wissen, wer wer ist. **Kann sie die Maschine nicht zuverlässig erkennen**, hat die Maschine den Test bestanden.
:::

## Chancen und Risiken

| Chancen | Risiken |
|---|---|
| Barrierefreiheit (Vorlesen, Sprachsteuerung) | Mikrofone, die ständig „zuhören“ |
| Übersetzung und Verständigung über Sprachgrenzen | Fehler und Missverständnisse bei wichtigen Entscheidungen |
| Programmieren mit Hilfe von KI-Assistenten | Bots, die sich als Menschen ausgeben und Meinungen beeinflussen |
| schneller Zugang zu Informationen | Abhängigkeit und Verlust eigener Fähigkeiten |

::: tip Diskussion
Chatbots bestehen den Turing-Test heute in vielen Situationen. Bedeutet das, dass sie **denken** können? Und sollten Bots im Netz immer als Bots **gekennzeichnet** sein müssen?
:::
