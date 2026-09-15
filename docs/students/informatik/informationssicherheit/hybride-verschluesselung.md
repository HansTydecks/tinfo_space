---
title: "Hybride Verschlüsselung"
description: "Wie symmetrische und asymmetrische Verschlüsselung kombiniert werden: Sitzungsschlüssel, Ablauf, Vor- und Nachteile im Vergleich."
---

# Hybride Verschlüsselung <Badge type="info" text="Oberstufe" />

Asymmetrische Verfahren lösen das Schlüsseltauschproblem, sind aber **langsam**. Symmetrische Verfahren sind **schnell**, haben aber das Schlüsseltauschproblem. Die Lösung in der Praxis: **beides kombinieren**.

## Vergleich

| Verfahren | Grundidee | Vorteile | Nachteile | Schutzziele |
|---|---|---|---|---|
| **symmetrisch** (z. B. AES) | ein gemeinsamer geheimer Schlüssel | sehr schnell, gut für große Datenmengen | Schlüsseltausch schwierig, viele Schlüssel bei vielen Partnern | Vertraulichkeit |
| **asymmetrisch** (z. B. RSA) | Schlüsselpaar aus öffentlichem und privatem Schlüssel | kein geheimer Austausch nötig, Grundlage für Signaturen | langsam, rechenintensiv | Vertraulichkeit; mit Signaturen auch Integrität und Authentizität |
| **hybrid** | asymmetrisch einen **Sitzungsschlüssel** übertragen, Daten dann symmetrisch verschlüsseln | sicherer Schlüsseltausch **und** hohe Geschwindigkeit | komplexer, beide Verfahren müssen korrekt zusammenspielen | Vertraulichkeit; mit Zertifikaten auch Integrität und Authentizität |

## Ablauf

::: info Merke: Hybride Verschlüsselung
1. Bob erzeugt ein **Schlüsselpaar** (öffentlich/privat).
2. Bob **veröffentlicht** seinen öffentlichen Schlüssel.
3. Alice möchte Bob eine Nachricht senden. Sie erzeugt einen **zufälligen symmetrischen Sitzungsschlüssel**, der nur für diese Sitzung gilt.
4. Alice verschlüsselt ihre **Nachricht** mit dem **Sitzungsschlüssel** (schnell, z. B. AES).
5. Alice verschlüsselt den **Sitzungsschlüssel** mit **Bobs öffentlichem Schlüssel**.
6. Alice sendet **beides**: verschlüsselte Nachricht und verschlüsselten Sitzungsschlüssel.
7. Bob entschlüsselt zuerst den **Sitzungsschlüssel** mit seinem **privaten Schlüssel**.
8. Mit dem Sitzungsschlüssel entschlüsselt Bob die **Nachricht**.
:::

```text:no-line-numbers
Alice                                                   Bob
─────                                                   ───
Nachricht ──[AES mit Sitzungsschlüssel]──► Geheimtext ─────────► [AES] ──► Nachricht
                                                                  ▲
Sitzungsschlüssel ──[RSA mit Bobs öff. Schlüssel]──► ─────► [RSA mit Bobs priv. Schlüssel]
```

::: tip Im Alltag
Jedes Mal, wenn du eine Website über **HTTPS** öffnest, passiert genau das: Browser und Server handeln per asymmetrischer Kryptographie einen Sitzungsschlüssel aus, und der eigentliche Datenverkehr läuft symmetrisch verschlüsselt (**TLS**). Auch ein **VPN** verschlüsselt den Transportweg auf ähnliche Weise.
:::

## Aufgabe

Bringe die acht Schritte oben ohne nachzusehen in die richtige Reihenfolge und zeichne dazu eine eigene Skizze mit Alice, Bob und den drei Schlüsseln.
