---
title: "Switch & DHCP"
description: "Ein Rechnernetz mit Filius aufbauen: Aufgabe des Switches, automatische IP-Vergabe mit DHCP und was bei einem Ausfall passiert (APIPA)."
---

# Switch & DHCP <Badge type="info" text="Oberstufe" />

::: info Merke: Rechnernetz
Ein **Rechnernetz** ist eine physische und logische Verbindung von **mindestens zwei Informatiksystemen** über ein Übertragungsmedium, damit sie **Ressourcen gemeinsam nutzen** können.
Beispiele: Client ↔ Server, Rechner ↔ Drucker, Rechner ↔ Router mit Internetzugang.
:::

## Der Switch

Ein **Switch** verbindet mehrere Geräte **im selben Netzwerk**. Er merkt sich, an welchem Anschluss welches Gerät (genauer: welche [MAC-Adresse](./ip-und-mac)) hängt, und leitet Pakete **gezielt** nur dorthin weiter.

```text:no-line-numbers
        A (192.168.0.10)
              │
B ─────── SWITCH ─────── C
(192.168.0.11)       (192.168.0.12)
```

## DHCP: IP-Adressen automatisch vergeben

Jedes Gerät braucht eine eindeutige IP-Adresse. Diese von Hand einzutragen ist mühsam und fehleranfällig (z. B. doppelt vergebene Adressen).

::: info Merke: DHCP
Das **Dynamic Host Configuration Protocol** läuft als **Server-Programm** (in der Regel eines pro Netzwerk). Meldet sich ein neues Gerät, bekommt es automatisch:
- eine **freie IP-Adresse** aus einem festgelegten Bereich (z. B. `192.168.0.11` bis `192.168.0.50`),
- die **Subnetzmaske**,
- das **Gateway** (Router ins nächste Netz) und den **DNS-Server**.

Doppelte oder falsche Adressen werden so vermieden.
:::

Vor der Zuweisung hat ein neues Gerät noch keine Adresse (`0.0.0.0`). Es ruft ins Netz: „Gibt es hier einen DHCP-Server?“, und der Server antwortet mit einem Adressangebot.

## Und wenn der DHCP-Server ausfällt?

Viele Betriebssysteme geben sich dann selbst eine Adresse aus dem Bereich **169.254.0.0/16**. Das nennt man **APIPA** (*Automatic Private IP Addressing*).

- ✅ Geräte mit APIPA-Adresse im **selben Netzsegment** können sich weiter erreichen.
- ❌ **Kein Internet**, denn es ist kein Gateway bekannt.
- Ist APIPA nicht aktiv, erhält das Gerät gar keine Adresse.

::: tip Fehlersuche im Alltag
Beginnt die IP-Adresse deines Rechners mit `169.254.`? Dann hat er keine Antwort vom DHCP-Server bekommen. Prüfe Kabel, WLAN oder Router.
:::

## Aufgabe mit Filius

1. Öffne [Filius](https://www.lernsoftware-filius.de/) und baue ein Netz aus drei Rechnern und einem Switch.
2. Vergib die IP-Adressen zuerst von Hand und teste die Verbindung mit `ping`.
3. Richte einen Rechner als DHCP-Server ein und lass die anderen ihre Adressen automatisch beziehen.

Anleitungen findest du auf [beuche.info](https://beuche.info/).
