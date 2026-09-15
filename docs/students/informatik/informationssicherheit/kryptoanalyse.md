---
title: "Kryptoanalyse"
description: "Verschlüsselung brechen ohne Schlüssel: Brute-Force-Angriffe, Häufigkeitsanalyse bei Substitutionsverfahren und Social Engineering."
---

# Kryptoanalyse <Badge type="info" text="Oberstufe" />

::: info Merke: Kryptoanalyse
**Kryptoanalyse** ist die Wissenschaft, verschlüsselte Informationen **ohne den vorgesehenen Schlüssel** zu entziffern oder die Sicherheit eines Verfahrens zu überprüfen.
Man unterscheidet **Brute Force** (alles ausprobieren) und **analytische Verfahren** (Schwächen ausnutzen).
:::

## Brute Force

Beim Brute-Force-Angriff werden **systematisch alle Schlüssel** des Schlüsselraums ausprobiert.
- **Caesar:** nur 25 sinnvolle Schlüssel, per Hand in Minuten erledigt.
- **AES-256:** 2²⁵⁶ Schlüssel, mit heutiger Technik unmöglich.

Theoretisch führt Brute Force **immer** zum Ziel, praktisch fehlen Zeit und Rechenleistung. Sichere Verfahren machen den Schlüsselraum deshalb **riesig** (→ [Passwörter](./passwoerter)).

## Häufigkeitsanalyse

Bei **monoalphabetischen Substitutionen** (jeder Buchstabe wird immer durch denselben ersetzt) bleibt eine Spur: die **Buchstabenhäufigkeit** der Sprache.

| Buchstabe (Deutsch) | E | N | I | S | R | A | T |
|---|---|---|---|---|---|---|---|
| ungefähre Häufigkeit | 17 % | 10 % | 8 % | 7 % | 7 % | 6,5 % | 6 % |

**Vorgehen:**
1. Im Geheimtext zählen, welche Zeichen am häufigsten vorkommen.
2. Das häufigste Zeichen ist wahrscheinlich **E**, das zweithäufigste vielleicht **N** …
3. Hypothesen testen, kurze Wörter („der“, „und“, „ist“) erkennen und schrittweise ersetzen.

::: info Aufgabe
Knacke diesen Geheimtext, der mit Caesar verschlüsselt wurde. Welche Hinweise gibt dir die Formatierung (Großbuchstaben, Satzzeichen, Wortlängen)?

`Nhufnkriiv' SulqCls ehvdjw: „Glh Vlfkhukhlw hlqhv NuBswrvBvwhpv gdui qlfkw yrq ghu Jhkhlpkdowxqj ghv Dojrulwkpxv dekäqjhq."`
:::

::: tip Warum hilft die Häufigkeitsanalyse nicht bei Vigenère?
Bei **polyalphabetischen** Verfahren wie Vigenère wird derselbe Buchstabe je nach Position unterschiedlich verschlüsselt. Die Häufigkeiten werden „verschmiert“.
:::

## Social Engineering <Badge type="warning" text="Lk" />

Oft ist nicht die Mathematik die Schwachstelle, sondern der **Mensch**. Beim **Social Engineering** bringen Angreifer Menschen dazu, Geheimnisse preiszugeben, etwa durch einen gefälschten Anruf „vom IT-Support“ oder [Phishing](./phishing).
Mit **Open Source Intelligence (OSINT)** sammeln Angreifer vorher öffentlich verfügbare Informationen, z. B. aus Social Media: Name des Haustiers, Geburtstag, Schule.
