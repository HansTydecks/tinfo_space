---
title: "Klassische KI"
description: "Symbolische KI: Wissensrepräsentation, Wissensverarbeitung, Expertensysteme und die Grenzen dieses Ansatzes."
---

# Klassische KI <Badge type="tip" text="Klasse 9" />

Lange bevor Computer aus Millionen Bildern lernen konnten, versuchte man, ihnen **menschliches Wissen direkt beizubringen**.

::: info Merke: Klassische (symbolische) KI
Bei der **klassischen KI** schreiben Menschen ihr Wissen als **Fakten und Regeln** auf. Der Computer zieht daraus mit festen Verfahren **Schlussfolgerungen**.
Das geschieht in zwei Schritten:
1. **Wissensrepräsentation:** Wissen sammeln und so formulieren, dass der Computer es verarbeiten kann (Wissensbasis).
2. **Wissensverarbeitung:** Algorithmen wenden die Regeln an und leiten neue Aussagen ab (z. B. durch logisches Schließen).
:::

## Beispiel: ein kleines Expertensystem

```text:no-line-numbers
Fakten:   Tier hat Federn.   Tier kann nicht fliegen.   Tier lebt in der Antarktis.

Regeln:   WENN Tier hat Federn               DANN Tier ist ein Vogel.
          WENN Vogel UND kann nicht fliegen
               UND lebt in der Antarktis     DANN Tier ist ein Pinguin.

Schluss:  Das Tier ist ein Pinguin.
```

Solche **Expertensysteme** wurden z. B. in der Medizin oder bei der Fehlersuche an Maschinen eingesetzt. Auch **Wissensgraphen**, die Begriffe und ihre Beziehungen speichern, gehören dazu <Badge type="warning" text="Lk" />.

## Vorteile und Grenzen

| ✅ Vorteile | ❌ Grenzen |
|---|---|
| **nachvollziehbar**: Man sieht, welche Regel zum Ergebnis führte | **jede Situation** muss vorher als Regel formuliert werden |
| braucht **keine riesigen Datenmengen** | viel Wissen lässt sich **nicht in Regeln fassen** (Wie erkennst du ein Gesicht?) |
| verhält sich **vorhersagbar** | schlecht **skalierbar**: Tausende Regeln widersprechen sich leicht |

::: tip Denkaufgabe
Versuche, Regeln zu formulieren, mit denen ein Computer auf Fotos **Katzen von Hunden** unterscheiden kann. Warum scheitert das schnell?
:::

## Weiterlesen

Wie Computer Regeln stattdessen **selbst aus Daten** finden: [Maschinelles Lernen](./maschinelles-lernen)
