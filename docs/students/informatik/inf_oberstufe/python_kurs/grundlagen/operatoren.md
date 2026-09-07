---
title: "Operatoren"
description: "Rechnen, vergleichen und logisch verknüpfen: die Operatoren von Python im Überblick."
---

## Ziele
- Die arithmetischen Operatoren sicher einsetzen, besonders `//` und `%`
- Vergleiche formulieren und ihr Ergebnis (`True`/`False`) verstehen
- Bedingungen mit `and`, `or`, `not` verknüpfen

## Arithmetische Operatoren

| Operator | Bedeutung | `17 ○ 5` |
|:--------:|-----------|:--------:|
| `+` `-` `*` | plus, minus, mal | `22`, `12`, `85` |
| `/` | Division (immer `float`) | `3.4` |
| `//` | Ganzzahldivision (rundet ab) | `3` |
| `%` | Rest der Division (*Modulo*) | `2` |
| `**` | Potenz | `1419857` |

<PyRunner>

```python
print(17 / 5)
print(17 // 5)
print(17 % 5)
print(2 ** 10)
```

</PyRunner>

:::tip Merke
`//` und `%` gehören zusammen: `17 = 3 * 5 + 2`. `%` ist enorm nützlich – z. B. ist eine Zahl
gerade, wenn `zahl % 2 == 0`.
:::

## Vergleichsoperatoren

`<`, `<=`, `>`, `>=`, `==` (gleich), `!=` (ungleich). Ein Vergleich ist immer `True` oder `False`:

<PyRunner>

```python
print(3 < 5)
print(3 == 3.0)
print("Anna" == "anna")
print("Apfel" < "Banane")   # alphabetisch
```

</PyRunner>

:::danger `=` ist nicht `==`
`=` weist zu (`x = 5`), `==` vergleicht (`x == 5`). Verwechslung ist der Klassiker unter den
Anfängerfehlern.
:::

## Logische Operatoren

| Operator | wahr, wenn … |
|----------|--------------|
| `and` | **beide** Bedingungen wahr sind |
| `or` | **mindestens eine** Bedingung wahr ist |
| `not` | die Bedingung falsch ist (kehrt um) |

<PyRunner>

```python
alter = 16
print(alter >= 6 and alter <= 17)   # schulpflichtig?
print(alter < 7 or alter > 65)
print(not (alter == 18))
```

</PyRunner>

## Kombinierte Zuweisungen

`x += 3` ist die Kurzform von `x = x + 3`. Es gibt sie für alle Rechenoperatoren
(`-=`, `*=`, `//=`, `%=`, …).

<PyRunner>

```python
punkte = 0
punkte += 10
punkte += 5
punkte *= 2
print(punkte)
```

</PyRunner>

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Gerade oder ungerade?
Die Zahl steht fest im Code. Gib `True` aus, wenn sie gerade ist, sonst `False` – in einer Zeile.

<PyRunner>

```python
zahl = 123456
# print(...)
```

</PyRunner>

:::details Tipp
Eine Zahl ist gerade, wenn beim Teilen durch 2 kein Rest bleibt.
:::

### Aufgabe 2: Wechselgeld
`cent = 287`. Berechne mit `//` und `%`, wie viele ganze Euro und wie viele Restcent das sind.

<PyRunner>

```python
cent = 287
# euro = ...
# rest = ...
```

</PyRunner>

### Aufgabe 3: Eintritt
Der Eintritt ist frei für Kinder unter 6 und für Personen ab 65. Teste mit verschiedenen Werten für
`alter`, ob dein logischer Ausdruck stimmt.

<PyRunner>

```python
alter = 70
frei = # dein logischer Ausdruck
print(frei)
```

</PyRunner>

:::details Tipp
„unter 6 **oder** ab 65" – der passende Operator ist `or`.
:::
