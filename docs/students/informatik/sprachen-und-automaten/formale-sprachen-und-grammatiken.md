---
title: "Formale Sprachen & Grammatiken"
description: "Natürliche und formale Sprachen, Alphabet, Wort und Sprache, formale Grammatiken mit Terminalen, Nichtterminalen, Produktionsregeln und Startsymbol, Ableitungen, Backus-Naur-Form und Chomsky-Hierarchie."
---

# Formale Sprachen & Grammatiken <Badge type="info" text="Oberstufe" />

„Der Hund beißt den Mann.“ und „Den Mann beißt der Hund.“ bedeuten dasselbe. Natürliche Sprachen sind **flexibel und mehrdeutig**. Programmiersprachen dürfen das nicht sein: Ein Compiler muss **jedes** Programm eindeutig verstehen.

## Natürliche und formale Sprachen

| Natürliche Sprache | Formale Sprache |
|---|---|
| Deutsch, Englisch, Arabisch | Python, HTML, reguläre Ausdrücke, IP-Adressen |
| hat sich **entwickelt** | wurde **festgelegt** |
| Regeln mit Ausnahmen, mehrdeutig | **exakte** Regeln, eindeutig |
| Fehler werden oft trotzdem verstanden | ein Fehler, und das Wort gehört nicht zur Sprache |

::: info Merke: Grundbegriffe
- **Alphabet Σ:** endliche Menge von Zeichen, z. B. Σ = {0, 1}
- **Wort:** endliche Folge von Zeichen aus Σ, z. B. `0110`. Das **leere Wort** heißt ε.
- **Formale Sprache L:** eine Menge von Wörtern über Σ, z. B. „alle Binärzahlen ohne führende Null“
:::

## Formale Grammatiken

Eine **Grammatik** beschreibt mit Regeln, **wie man alle Wörter einer Sprache erzeugen** kann.

::: info Merke: Grammatik G = (N, T, P, S)
| Bestandteil | Bedeutung | Beispiel |
|---|---|---|
| **N** Nichtterminale | Platzhalter, die noch ersetzt werden (Großbuchstaben) | S, A |
| **T** Terminale | Zeichen, die im fertigen Wort stehen (das Alphabet) | 0, 1 |
| **P** Produktionsregeln | Ersetzungsregeln der Form links → rechts | S → 1A |
| **S** Startsymbol | Nichtterminal, mit dem jede Ableitung beginnt | S |
:::

**Beispiel:** Binärzahlen ohne führende Nullen

```text:no-line-numbers
N = {S, A}      T = {0, 1}      Startsymbol S

P:  S → 0
    S → 1A
    A → 0A | 1A | ε        (| heißt „oder“, ε = leeres Wort)
```

### Wörter ableiten

Man beginnt beim Startsymbol und ersetzt Schritt für Schritt, bis nur noch Terminale übrig sind:

```text:no-line-numbers
S ⇒ 1A ⇒ 10A ⇒ 101A ⇒ 101
```

Also gehört `101` zur Sprache. Das Wort `011` lässt sich **nicht** ableiten: Beginnt man mit S → 0, ist die Ableitung sofort zu Ende.

::: info Aufgabe
1. Leite `1100` ab.
2. Schreibe eine Grammatik für alle Wörter über {a, b}, die mit `b` **enden**.
:::

## Backus-Naur-Form <Badge type="warning" text="Lk" />

Für Programmiersprachen nutzt man eine lesbarere Schreibweise, die **BNF**. Nichtterminale stehen in spitzen Klammern:

```text:no-line-numbers
<zuweisung> ::= <name> "=" <zahl>
<name>      ::= <buchstabe> | <buchstabe> <name>
<zahl>      ::= <ziffer> | <ziffer> <zahl>
<ziffer>    ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```

Damit ist `x = 42` gültig, `42 = x` nicht.

## Chomsky-Hierarchie <Badge type="warning" text="Lk" />

Noam Chomsky ordnete Grammatiken nach der **Form ihrer Regeln**. Je weiter oben, desto mächtiger:

| Typ | Name | Regelform (vereinfacht) | erkennbar durch |
|---|---|---|---|
| 0 | unbeschränkt | beliebig | Turingmaschine |
| 1 | kontextsensitiv | rechte Seite nicht kürzer als linke | linear beschränkter Automat |
| 2 | kontextfrei | links genau **ein** Nichtterminal | Kellerautomat |
| 3 | **regulär** | A → a, A → aB, A → ε | **endlicher Automat** |

Jede reguläre Sprache ist auch kontextfrei, aber nicht umgekehrt. Beispiel: Die Sprache der korrekt geklammerten Ausdrücke `(()())` ist kontextfrei, aber **nicht** regulär.

## Weiterlesen

- Wie ein Automat prüft, ob ein Wort zur Sprache gehört: [Endliche Automaten](./endliche-automaten)
