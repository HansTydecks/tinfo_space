---
title: "Authentifizierung"
description: "Unterschied zwischen Identifizierung und Authentifizierung, die drei Faktoren Wissen, Besitz und Eigenschaft sowie Zwei-Faktor-Authentifizierung."
---

# Authentifizierung <Badge type="tip" text="Klasse 9" />

Wenn du dich bei einer App anmeldest, passieren zwei Dinge: Du sagst, **wer du bist**, und du **beweist** es.

::: info Merke
- **Identifizierung:** Eine Person oder ein System **gibt eine Identität an** („Ich bin *max.muster*“).
- **Authentifizierung:** Es wird **überprüft**, ob diese Angabe **stimmt** (z. B. durch das richtige Passwort).
:::

## Drei Kategorien der Authentifizierung

Damit etwas als Nachweis taugt, muss es möglichst **nur zu dir** gehören.

| 1 · Wissen | 2 · Besitz | 3 · Eigenschaft (Biometrie) |
|---|---|---|
| etwas, das **nur du weißt** | etwas, das **nur du hast** | etwas, das **nur du bist** |
| Passwort, PIN, Sicherheitsfrage | Smartphone mit Authenticator-App, Chipkarte, TAN-Generator, Sicherheitsschlüssel | Fingerabdruck, Gesicht, Iris |

## Zwei-Faktor-Authentifizierung (2FA)

::: info Merke: 2FA
Bei der **Zwei-Faktor-Authentifizierung** werden **zwei Nachweise aus unterschiedlichen Kategorien** kombiniert, z. B. Passwort (Wissen) **und** ein Code auf dem Handy (Besitz).
:::

::: details Warum nicht einfach zwei Passwörter?
Zwei Passwörter stammen aus **derselben Kategorie**. Wer eines durch Phishing oder ein Datenleck erbeutet, bekommt das zweite oft auf demselben Weg. Bei 2FA bräuchte ein Angreifer zusätzlich **dein Handy** oder **deinen Finger**.
:::

## Diskussion

Würdest du älteren Menschen (z. B. deinen Großeltern) empfehlen, **überall** 2FA zu nutzen? Wäge Sicherheit gegen Aufwand ab, und was passiert, wenn das Handy verloren geht?

## Weiterlesen

- In Rechnernetzen wird oft zusätzlich zentral authentifiziert, z. B. über **RADIUS** im Schul-WLAN <Badge type="warning" text="Lk" />.
- Wie Websites *ihre* Identität beweisen: [Hashes & Signaturen](./hashes-und-signaturen) <Badge type="info" text="Oberstufe" />
