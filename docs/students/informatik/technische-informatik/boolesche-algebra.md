---
title: "Boolesche Algebra"
description: "Wahrheitswerte, die Grundoperationen NOT, AND, OR und XOR, Wahrheitstabellen sowie Rechengesetze und De Morgansche Regeln."
---

# Boolesche Algebra <Badge type="info" text="Oberstufe" />

Strom an, Strom aus. Wahr, falsch. 1, 0. Mit nur zwei Werten lässt sich rechnen, und zwar nach den Regeln des Mathematikers **George Boole** (1815–1864).

## Grundoperationen

::: info Merke
| Operation | Schreibweise | Bedeutung |
|---|---|---|
| **NOT** (Negation) | ¬A | kehrt den Wert um |
| **AND** (Konjunktion) | A ∧ B | nur wahr, wenn **beide** wahr sind |
| **OR** (Disjunktion) | A ∨ B | wahr, wenn **mindestens einer** wahr ist |
| **XOR** (exklusives Oder) | A ⊕ B | wahr, wenn **genau einer** wahr ist |
:::

## Wahrheitstabellen

| A | B | ¬A | A ∧ B | A ∨ B | A ⊕ B |
|---|---|---|---|---|---|
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 | 1 | 0 |

Bei n Eingängen hat eine Wahrheitstabelle **2ⁿ** Zeilen.

::: tip Kennst du schon
In Python heißen die Operatoren `not`, `and`, `or` (→ [Python-Kurs: Operatoren](../algorithmen/python-kurs/grundlagen/operatoren)). Und die Subnetzmaske wird bitweise **UND**-verknüpft (→ [Subnetze](../netzwerke/subnetze)).
:::

## Zusammengesetzte Ausdrücke

Beispiel: **(A ∨ B) ∧ ¬C**

| A | B | C | A ∨ B | ¬C | (A ∨ B) ∧ ¬C |
|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 | 0 |
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 | **1** |
| 0 | 1 | 1 | 1 | 0 | 0 |
| 1 | 0 | 0 | 1 | 1 | **1** |
| 1 | 0 | 1 | 1 | 0 | 0 |
| 1 | 1 | 0 | 1 | 1 | **1** |
| 1 | 1 | 1 | 1 | 0 | 0 |

## Rechengesetze <Badge type="warning" text="Lk" />

| Gesetz | Regel |
|---|---|
| Doppelnegation | ¬¬A = A |
| Kommutativgesetz | A ∧ B = B ∧ A · A ∨ B = B ∨ A |
| Assoziativgesetz | (A ∧ B) ∧ C = A ∧ (B ∧ C) |
| Distributivgesetz | A ∧ (B ∨ C) = (A ∧ B) ∨ (A ∧ C) |
| **De Morgan** | ¬(A ∧ B) = ¬A ∨ ¬B · ¬(A ∨ B) = ¬A ∧ ¬B |

**Vereinfachen:** Mit den Gesetzen lassen sich Ausdrücke kürzen, und so spart man in der Hardware Bauteile.
Beispiel: (A ∧ B) ∨ (A ∧ ¬B) = A ∧ (B ∨ ¬B) = A ∧ 1 = **A**

## Weiterlesen

Wie diese Operationen als Hardware gebaut werden: [Schaltnetze](./schaltnetze)
