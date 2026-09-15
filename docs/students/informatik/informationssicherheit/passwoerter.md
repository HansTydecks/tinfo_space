---
title: "Passwörter"
description: "Was ein sicheres Passwort ausmacht, wie man die Anzahl möglicher Kombinationen berechnet und wie Brute-Force-Angriffe funktionieren."
---

# Passwörter <Badge type="tip" text="Klasse 8" />

Ein Fahrradschloss mit **4 Ziffern**: Wie lange brauchst du, um es durch Ausprobieren zu öffnen?

## Kombinationen berechnen

::: info Merke
Anzahl möglicher Passwörter = **(Anzahl möglicher Zeichen)^(Länge)**
:::

| Passwort | Zeichenvorrat | Länge | Kombinationen | Zeit bei 1 Mrd. Versuchen pro Sekunde |
|---|---|---|---|---|
| Fahrradschloss | 10 Ziffern | 4 | 10⁴ = 10 000 | sofort |
| nur Kleinbuchstaben | 26 | 8 | 26⁸ ≈ 209 Mrd. | ca. 3,5 Minuten |
| Groß-, Kleinbuchstaben, Ziffern | 62 | 8 | 62⁸ ≈ 218 Billionen | ca. 2,5 Tage |
| alle Tastaturzeichen | 94 | 12 | 94¹² ≈ 4,8 · 10²³ | ca. 15 Millionen Jahre |

**Erkenntnis:** Die **Länge** bringt am meisten Sicherheit, dann ein großer **Zeichenvorrat**.

## Brute Force

::: info Merke: Brute-Force-Algorithmus
Ein **Brute-Force-Algorithmus** („rohe Gewalt“) probiert **systematisch alle möglichen Lösungen** aus, bis die richtige gefunden ist. Er findet jedes Passwort, aber lange Passwörter machen den Aufwand unbezahlbar.
:::

```text:no-line-numbers
für jede Kombination von 0000 bis 9999:
    wenn Kombination öffnet das Schloss:
        gib Kombination aus
        beende
```

::: warning Wörterbuch-Angriffe
Angreifer probieren zuerst **bekannte Passwörter** („123456“, „passwort“, „hallo123“) und Wörter aus Wörterbüchern. Ein langes, aber bekanntes Passwort ist deshalb **nicht** sicher.
:::

## Regeln für gute Passwörter

- **lang**: mindestens 12 Zeichen, besser ein ganzer Satz („Passphrase“)
- **nicht erratbar**: keine Namen, Geburtstage oder Wörter aus dem Wörterbuch
- **einzigartig**: für jeden Dienst ein anderes Passwort
- **Passwortmanager** nutzen
- **Zwei-Faktor-Authentifizierung** einschalten

## Ausprobieren

- [Schlosssimulation](https://lock.tinfo.space/): Brute Force am Zahlenschloss
- [checkdeinpasswort.de](https://checkdeinpasswort.de/): Beobachte, wie die Knackzeit mit jedem Zeichen steigt. **Niemals echte Passwörter eingeben!**
- [The Password Game](https://neal.fun/password-game/): wenn Passwortregeln aus dem Ruder laufen
