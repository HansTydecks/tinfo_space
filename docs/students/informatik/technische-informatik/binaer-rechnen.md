---
title: "Rechnen mit Binärzahlen"
description: "Binärzahlen schriftlich addieren mit Übertrag, Multiplikation und Schiebeoperationen."
---

# Rechnen mit Binärzahlen <Badge type="tip" text="Klasse 7" />

Binärzahlen addiert man **genau wie Dezimalzahlen** schriftlich untereinander, nur dass es bloß die Ziffern 0 und 1 gibt.

## Die vier Regeln

::: info Merke
| Rechnung | Ergebnis | Übertrag |
|---|---|---|
| 0 + 0 | 0 | 0 |
| 0 + 1 | 1 | 0 |
| 1 + 0 | 1 | 0 |
| 1 + 1 | **0** | **1** (denn 1 + 1 = 2 = 10₂) |
| 1 + 1 + 1 (mit Übertrag) | **1** | **1** (denn 3 = 11₂) |
:::

## Beispiel

```text:no-line-numbers
      1 1 0 1 0 1 0     (106)
  +   1 1 0 1 0 0 1     (105)
  Ü 1 1   1             (Überträge)
  ─────────────────
    1 1 0 1 0 0 1 1     (211)
```

Rechne von **rechts nach links**. Entsteht eine 2, schreibe 0 und übertrage 1 in die nächste Spalte.

::: tip Kontrolle
Rechne beide Zahlen und das Ergebnis ins Dezimalsystem um: 106 + 105 = 211 ✅
:::

## Schieben und Multiplizieren

Im Dezimalsystem multiplizierst du mit 10, indem du eine 0 anhängst. Im Binärsystem gilt das Gleiche für **2**:

| Operation | Beispiel | Dezimal |
|---|---|---|
| **Linksschieben** um 1 = mal 2 | `101` → `1010` | 5 → 10 |
| **Rechtsschieben** um 1 = durch 2 (ohne Rest) | `1010` → `101` | 10 → 5 |

Eine Multiplikation lässt sich damit auf **Schieben und Addieren** zurückführen: 5 · 3 = 5 · (2 + 1) = `1010` + `101` = `1111` = 15.

## Übungen

1. `1010 + 11`
2. `1001 + 10100`
3. `1001 + 111 + 11`
4. `10101 + 1001 + 1`

## Weiterlesen

- Wie ein Computer diese Addition **in Hardware** ausführt: [Schaltnetze – Halbaddierer](./schaltnetze) <Badge type="info" text="Oberstufe" />
