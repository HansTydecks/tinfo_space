---
title: "while-Schleife"
description: "Code wiederholen, solange eine Bedingung erfüllt ist – mit Zählvariable und Abbruch."
---

## Ziele
- Die `while`-Schleife lesen und schreiben
- Eine Zählvariable korrekt hoch- oder runterzählen
- Endlosschleifen erkennen und vermeiden

<SilentTeacherButton kapitel="while-schleife" />

## Wozu Schleifen?

Eine **Schleife** wiederholt einen Codeblock. Es gibt zwei Arten:

- `while` – wiederholt, **solange eine Bedingung** gilt (Anzahl oft unbekannt)
- `for` – arbeitet **jedes Element einer Folge** ab ([nächste Seite](./for-schleife))

## Aufbau der while-Schleife

<PyRunner>

```python
i = 1
while i <= 5:
    print(i)
    i = i + 1
print("fertig")
```

</PyRunner>

:::details Erklärung
1. `i` wird **vor** der Schleife angelegt.
2. Vor jedem Durchlauf prüft Python die Bedingung `i <= 5`.
3. Im Block muss `i` verändert werden (`i = i + 1`), sonst endet die Schleife nie.

Bei `i = 6` ist die Bedingung falsch – die Schleife stoppt.
:::

## Runterzählen und andere Schrittweiten

<PyRunner>

```python
countdown = 10
while countdown > 0:
    print(countdown)
    countdown -= 2      # in Zweierschritten
print("Start!")
```

</PyRunner>

:::danger Endlosschleife
Vergisst du `countdown -= 2`, läuft die Schleife ewig. Falls das passiert: In den Code-Fenstern
kannst du die Seite neu laden. In Thonny hilft der Stopp-Knopf.
:::

## Summe berechnen

<PyRunner>

```python
n = 100
summe = 0
i = 1
while i <= n:
    summe += i
    i += 1
print(f"1 + 2 + ... + {n} = {summe}")
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Vielfache
Gib die ersten 10 Vielfachen von 7 aus (7, 14, 21, …).

<PyRunner>

```python
# dein Code
```

</PyRunner>

### Aufgabe 2: Zuckerwürfel
`gewuenscht = 4`. Gib nacheinander aus: „1 Würfel", „2 Würfel", … bis zur gewünschten Zahl, dann
„fertig gesüßt".

<PyRunner>

```python
gewuenscht = 4
# dein Code
```

</PyRunner>

:::details Tipp
Zähler bei 0 starten, in der Schleife zuerst `+= 1`, dann ausgeben.
:::

### Aufgabe 3: Fakultät
Die Fakultät von `n` ist `1 * 2 * 3 * ... * n` (und `0! = 1`). Berechne sie für ein festes `n` mit
einer while-Schleife.

<PyRunner>

```python
n = 6
# ergebnis = ...
```

</PyRunner>

:::details Tipp
`ergebnis` mit **1** starten (nicht 0!). In der Schleife `ergebnis *= i`.
:::
