---
title: "Steganografie"
description: "Nachrichten verstecken statt verschlüsseln: Steganografie in Texten und Bildern, das Least-Significant-Bit-Verfahren sowie Vor- und Nachteile."
---

# Steganografie <Badge type="info" text="Oberstufe" />

Finde den Unterschied zwischen zwei Urlaubsfotos. Du siehst keinen? Trotzdem kann in einem der beiden eine **geheime Nachricht** stecken.

::: info Merke: Steganografie
**Kryptographie** macht eine Nachricht **unlesbar**, aber jeder sieht, dass es eine Nachricht gibt.
**Steganografie** (griech. *verdecktes Schreiben*) **versteckt**, dass überhaupt eine Nachricht existiert.
Steganografie beantwortet die Frage: *Merkt überhaupt jemand, dass kommuniziert wird?*
:::

## Verstecken in Texten

- **Anfangsbuchstaben:** Die ersten Buchstaben jeder Zeile ergeben ein Wort (Akrostichon).
- **Unsichtbare Zeichen:** Leerzeichen oder Tabs am Zeilenende, unsichtbare Unicode-Zeichen.
- Historisch: **Geheimtinte**, die erst durch Wärme sichtbar wird.

## Verstecken in Bildern: das LSB-Verfahren

Ein Pixel speichert jede Farbe (Rot, Grün, Blau) als Zahl von 0 bis 255, also mit **8 Bit**. Das **letzte Bit** (*least significant bit*, LSB) ändert den Farbwert nur um 1. Das sieht kein Mensch.

```text:no-line-numbers
Rotwert vorher:   11001010  (202)
Rotwert nachher:  11001011  (203)   ← nur das letzte Bit trägt jetzt ein Nachrichtenbit
```

::: info Merke: Algorithmus
1. Die geheime Botschaft als Text speichern.
2. Den Text in eine **Bitfolge** umwandeln (z. B. über die [ASCII-Tabelle](../technische-informatik/hexadezimal-und-zeichencodes)).
3. Die **letzten Bits** der Farbwerte des Bildes nacheinander durch die Bits der Botschaft ersetzen.
:::

## Ausprobieren

- [Steganographie-Tool](https://stylesuxx.github.io/steganography/): Entschlüssle die geheime Nachricht aus der Bilddatei auf LernSax.
- [inf-schule: Steganographie](https://inf-schule.de/kids/datennetze/steganographie): Erarbeite, wie man Nachrichten in Text und in Bildern verbirgt.

## Diskussion

- Welche **Vor- und Nachteile** hat Steganografie gegenüber Verschlüsselung?
- Wo ist sie nützlich? (Beispiele: Kommunikation in Staaten mit Zensur, digitale **Wasserzeichen** zum Schutz von Urheberrechten)
- Gilt [Kerckhoffs' Prinzip](./kryptologie) auch für Steganografie? Was passiert, sobald jemand weiß, *wo* er suchen muss?
- **Bildforensik** versucht umgekehrt, Manipulationen und versteckte Daten in Bildern aufzuspüren.
