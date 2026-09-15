---
title: "RSA-Verfahren"
description: "Das asymmetrische RSA-Verfahren Schritt für Schritt: Einwegfunktionen, Teilerfremdheit, Modulo, eulersche Phi-Funktion, Schlüsselerzeugung und warum RSA sicher ist."
---

# RSA-Verfahren <Badge type="info" text="Oberstufe" />

RSA (nach **R**ivest, **S**hamir und **A**dleman, 1977) ist das bekannteste **asymmetrische** Verfahren. Es löst das [Schlüsseltauschproblem](./verschluesselung) mit Mathematik.

## Warum nicht einfach „irgendein“ Schlüsselpaar?

Ein naiver Versuch: Öffentlicher Schlüssel = „addiere 7“, privater Schlüssel = „subtrahiere 7“. Das Problem: Wer den öffentlichen Schlüssel kennt, kann den privaten sofort **ausrechnen**.
Wir brauchen eine Funktion, die in eine Richtung leicht, in die andere praktisch unmöglich ist.

::: info Merke: Einwegfunktion
Eine **Einwegfunktion** ist **leicht zu berechnen**, aber **sehr schwer umzukehren**.
Beispiel: Zwei große Primzahlen zu multiplizieren geht schnell. Eine riesige Zahl wieder in ihre Primfaktoren zu zerlegen dauert selbst für Supercomputer unvorstellbar lange.
Eine **Falltürfunktion** ist eine Einwegfunktion, die mit einer **Geheiminformation** (der „Falltür“) doch leicht umkehrbar ist.
:::

## Werkzeuge

| Werkzeug | Bedeutung | Beispiel |
|---|---|---|
| **teilerfremd** | einziger gemeinsamer Teiler ist 1 | 13 und 100 ✅, 10 und 50 ❌ |
| **Modulo** | Rest bei ganzzahliger Division | 17 mod 5 = 2 |
| **Eulersche Phi-Funktion** φ(n) | Anzahl der Zahlen von 1 bis n, die zu n teilerfremd sind | φ(10) = 4 (1, 3, 7, 9) |

::: tip Phi für Primzahlen
Ist p eine Primzahl, gilt φ(p) = p − 1.
Für n = p · q mit zwei Primzahlen gilt: **φ(n) = (p − 1) · (q − 1)**.
:::

## Schlüssel erzeugen

| Schritt | allgemein | Beispiel |
|---|---|---|
| 1. Zwei verschiedene Primzahlen wählen | p, q | p = 3, q = 11 |
| 2. Modul berechnen | n = p · q | n = 33 |
| 3. Phi berechnen | φ(n) = (p − 1)(q − 1) | φ(33) = 2 · 10 = 20 |
| 4. Öffentlichen Exponenten wählen | 1 < e < φ(n), e teilerfremd zu φ(n) | e = 3 |
| 5. Privaten Exponenten berechnen | (e · d) mod φ(n) = 1 | d = 7, denn 21 mod 20 = 1 |
| 6. Schlüssel angeben | öffentlich: **(e, n)**, privat: **(d, n)** | (3, 33) und (7, 33) |

## Ver- und Entschlüsseln

::: info Merke
- **Verschlüsseln:** C = Mᵉ mod n
- **Entschlüsseln:** M = Cᵈ mod n
:::

**Beispiel** mit M = 4:
- C = 4³ mod 33 = 64 mod 33 = **31**
- M = 31⁷ mod 33 = **4** ✅

::: warning Wichtig: M muss kleiner als n sein
Die Nachricht wird als **Zahl kleiner als n** verschlüsselt. Bei n = 33 funktionieren also nur Zahlen von 0 bis 32. Deshalb nutzt man in der Praxis riesige Primzahlen mit über 300 Dezimalstellen.
:::

## Warum ist RSA sicher?

Ein Angreifer kennt den Geheimtext C und den öffentlichen Schlüssel (e, n). Er hat zwei Möglichkeiten:
1. **Direkt umkehren:** die e-te Wurzel von C *modulo n* ziehen. Dafür ist kein effizienter Algorithmus bekannt.
2. **d berechnen:** Dafür braucht er φ(n), also p und q. Er müsste n in seine **Primfaktoren zerlegen**, und genau das ist bei großen Zahlen praktisch unmöglich.

Die Sicherheit liegt also nicht in d selbst, sondern darin, dass **nur Bob d berechnen kann**, weil nur er p und q kennt.

::: tip Ausblick
Quantencomputer könnten die Primfaktorzerlegung eines Tages effizient lösen. Deshalb wird bereits an **Post-Quanten-Kryptographie** geforscht.
:::

## Ausprobieren

[CrypTool: RSA Schritt für Schritt](https://www.cryptool.org/de/cto/rsa-step-by-step/). Prüfe unser Beispiel und probiere aus, was passiert, wenn M ≥ n ist.
