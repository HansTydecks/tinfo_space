---
title: "Hashes, Signaturen & Zertifikate"
description: "Integrität und Authentizität mit Kryptographie: Hashfunktionen, digitale Signaturen, Man-in-the-Middle-Angriffe, Zertifizierungsstellen und Public-Key-Infrastruktur."
---

# Hashes, Signaturen & Zertifikate <Badge type="info" text="Oberstufe" />

Mit Verschlüsselung erreichen wir **Vertraulichkeit**. Zwei weitere [Schutzziele](./schutzziele), **Integrität** und **Authentizität**, lassen sich ebenfalls mit Kryptographie sichern.

## Hashfunktionen

::: info Merke: Hashfunktion
Eine **Hashfunktion** berechnet aus einer **beliebig langen Eingabe** (Text, Datei) einen **kurzen Wert fester Länge**, den **Hashwert** („digitaler Fingerabdruck“).
- **Gleiche Eingabe → immer gleicher Hashwert.**
- **Kleinste Änderung → völlig anderer Hashwert.**
- Aus dem Hashwert lässt sich die Eingabe **praktisch nicht zurückrechnen** (Einwegfunktion).
:::

Beispiel mit SHA-256 (nur **eine** Ziffer ist anders):

```text:no-line-numbers
"Treffen um 15 Uhr"  →  aca9317f66e499aff61dae582f3fb510950e035f54ae74be722f2db7771af949
"Treffen um 16 Uhr"  →  6573f6f1720e1e3a192b8dc53dc09c8a8377f5b608a2f9a5b58991123190ec12
```

**Integrität prüfen:** Der Empfänger berechnet selbst den Hashwert und vergleicht ihn mit dem mitgeschickten. Stimmen sie nicht überein, wurde die Nachricht verändert.
Auch **Passwörter** werden auf Servern als Hashwert gespeichert, und Blockchains verketten Blöcke über Hashwerte <Badge type="warning" text="Lk" />.

## Digitale Signaturen

Ein Hashwert allein reicht nicht: Ein Angreifer könnte Nachricht **und** Hashwert austauschen. Deshalb wird der Hashwert **signiert**.

::: info Merke: Digitale Signatur
**Signieren (Alice):**
1. Alice bildet den **Hashwert** ihrer Nachricht.
2. Sie verschlüsselt den Hashwert mit **ihrem privaten Schlüssel**. Das Ergebnis ist die **Signatur**.
3. Sie sendet Nachricht und Signatur.

**Prüfen (Bob):**
1. Bob entschlüsselt die Signatur mit **Alices öffentlichem Schlüssel** und erhält den ursprünglichen Hashwert.
2. Bob berechnet selbst den Hashwert der empfangenen Nachricht.
3. **Stimmen beide überein**, ist die Nachricht **unverändert** (Integrität) und stammt **von Alice** (Authentizität), denn nur sie besitzt den privaten Schlüssel.
:::

::: tip Umgekehrte Richtung
Beim **Verschlüsseln** nutzt man den öffentlichen Schlüssel des **Empfängers**, beim **Signieren** den privaten Schlüssel des **Absenders**.
:::

## Das Problem: Wem gehört ein öffentlicher Schlüssel?

::: warning Man-in-the-Middle-Angriff
Mallory schaltet sich **zwischen** Alice und Bob. Er schickt Alice **seinen eigenen** öffentlichen Schlüssel und behauptet, es sei Bobs. Beide glauben, direkt miteinander zu sprechen, doch Mallory kann **alles mitlesen und verändern**.
:::

Ein öffentlicher Schlüssel allein beweist also nicht, **wem** er gehört.

## Zertifikate und Public-Key-Infrastruktur (PKI)

::: info Merke: Zertifizierungsstelle
Eine **Zertifizierungsstelle** (*Certificate Authority*, **CA**) prüft, ob ein öffentlicher Schlüssel wirklich zu einer Website oder Person gehört, und bestätigt das mit einem **digitalen Zertifikat**.
Ein System aus CAs, die Zertifikate ausstellen, verteilen und prüfen, heißt **Public-Key-Infrastruktur (PKI)**.
:::

**So entsteht ein Zertifikat für `bank24.de`:**
1. Die Bank beantragt ein Zertifikat bei einer CA.
2. Die CA prüft, ob der Antragsteller die Domain wirklich kontrolliert.
3. Die CA erstellt das Zertifikat mit **Domain, öffentlichem Schlüssel der Bank, Gültigkeitsdauer und Aussteller**.
4. Die CA **signiert** das Zertifikat mit **ihrem privaten Schlüssel**: Hash bilden, Hash verschlüsseln.

**Warum vertraut dein Browser?** Die öffentlichen Schlüssel vertrauenswürdiger CAs sind **bereits im Browser bzw. Betriebssystem eingebaut**. Damit prüft der Browser die Signatur des Zertifikats. Das 🔒 in der Adresszeile zeigt: Prüfung erfolgreich.

## Fragen zum Weiterdenken

- Warum wäre ein erfolgreicher Angriff auf eine **Zertifizierungsstelle** besonders gefährlich?
- Erkläre den Satz: „Das Internet basiert auf Vertrauen.“
- <Badge type="warning" text="Lk" /> Auch E-Mails lassen sich signieren und verschlüsseln: **S/MIME** (mit CA-Zertifikaten) oder **PGP** (mit einem „Netz des Vertrauens“ ohne zentrale CA).
