---
title: "IP- und MAC-Adressen"
description: "Aufbau von IPv4- und IPv6-Adressen, private und öffentliche IP-Adressen, MAC-Adressen und der Unterschied zwischen beiden."
---

# IP- und MAC-Adressen <Badge type="tip" text="Klasse 8/9" />

Damit Datenpakete ankommen, braucht jedes Gerät im Netz eine eindeutige **Netzwerkadresse**, so wie ein Haus eine Postanschrift braucht.

## IPv4-Adressen

::: info Merke: IPv4
Eine **IPv4-Adresse** besteht aus **vier Zahlen von 0 bis 255**, getrennt durch Punkte, z. B. `192.168.0.15`.
Jede der vier Zahlen entspricht **8 Bit**, die ganze Adresse also **32 Bit**.
:::

```text:no-line-numbers
   192   .   168   .    0    .   15
11000000 . 10101000 . 00000000 . 00001111
```

Ein Teil der Adresse beschreibt das **Netzwerk**, der andere Teil das **Gerät** in diesem Netzwerk (→ [Subnetze](./subnetze) <Badge type="info" text="Oberstufe" />).

::: details Wie viele IPv4-Adressen gibt es?
32 Bit ergeben 2³² ≈ 4,3 Milliarden Adressen. Das klingt viel, reicht aber nicht für alle Smartphones, Laptops, Smart-TVs und vernetzten Kühlschränke der Welt.
:::

### Private und öffentliche IP-Adressen

| Private IP-Adressen | Öffentliche IP-Adressen |
|---|---|
| nur **innerhalb eines lokalen Netzes** gültig (zu Hause, Schule) | **weltweit eindeutig**, im Internet sichtbar |
| typisch: `192.168.x.x`, `10.x.x.x` | vom **Internetanbieter** vergeben |

Der **Router** verbindet beide Welten: Deine Geräte zu Hause haben private Adressen, der Router nutzt nach außen eine öffentliche Adresse.

::: tip Ausprobieren
- **Windows:** Eingabeaufforderung öffnen, `ipconfig` eingeben.
- **Android:** Einstellungen → Telefoninfo → Status.
- **iPhone:** Einstellungen → WLAN → ⓘ neben dem Netz.

Prüfe zu Hause, ob sich deine IP-Adresse im Heimnetz ändert. Woran könnte das liegen?
:::

## IPv6: die nächste Generation

Weil IPv4-Adressen knapp sind, gibt es **IPv6**: **128 Bit**, geschrieben als **8 Blöcke** mit je vier Hexadezimalziffern, getrennt durch **Doppelpunkte**:

```text:no-line-numbers
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

Damit gibt es 2¹²⁸ Adressen, mehr als genug für jedes Sandkorn der Erde. Heute laufen IPv4 und IPv6 oft parallel.

## MAC-Adressen

::: info Merke: MAC-Adresse
Die **MAC-Adresse** (*Media Access Control*) gehört fest zur **Netzwerkkarte** eines Geräts und wird vom **Hersteller** vergeben. Sie besteht aus **6 Paaren von Hexadezimalziffern**, z. B. `00:1A:2B:3C:4D:5E` (48 Bit).
Die ersten drei Paare verraten den Hersteller.
:::

## IP oder MAC?

| | IP-Adresse | MAC-Adresse |
|---|---|---|
| Vergeben von | Netzwerk / Internetanbieter | Hersteller |
| Änderbar? | ja, je nach Netz | bleibt meist gleich |
| Wofür? | Weg **zum Zielnetzwerk** finden (Router) | Gerät **im lokalen Netz** finden (Switch) |
| Vergleich | Straße und Hausnummer | der Name der Person im Haus |

## Übung

- Wandle die IP-Adresse `10.0.12.200` in Binärzahlen um. Hilfe: [Becimal](https://becimal.tinfo.space/) und [Binärzahlen](../technische-informatik/binaerzahlen).
- Wie viele MAC-Adressen kann es geben? Gehe vor wie bei IPv4.
