---
title: "Aufbau des Internets"
description: "Wie eine Website vom Webserver auf dein Handy kommt: Heimnetz, Router, Provider, Webserver, DNS und wichtige Protokolle."
---

# Aufbau des Internets <Badge type="tip" text="Klasse 9" />

Du tippst eine Adresse wie `www.tagesschau.de` ein und Sekunden später steht die Seite auf deinem Bildschirm. Aber **wo liegt diese Seite eigentlich**, und **welchen Weg** nimmt sie bis zu dir?

## Wo liegen die Inhalte?

Websites, Videos und Musik liegen auf **Servern**, also auf Rechnern, die rund um die Uhr laufen und Anfragen beantworten. Eine Website liegt auf einem **Webserver**.

## Warum nicht einfach alles mit Kabeln verbinden?

Wollte man jedes Gerät direkt mit jedem Server verbinden, bräuchte man für jede Verbindung ein eigenes Kabel. Bei Milliarden Geräten ist das unmöglich. Die Lösung sind **Router**, die Netze miteinander verbinden und Pakete weiterreichen, und **Provider**, die diese Infrastruktur betreiben.

```text:no-line-numbers
 Dein Handy ─ WLAN ─ Router (zu Hause) ─── Provider A ─── Router ─── Router ─── Provider B ─── Webserver
                                              │                                                (tagesschau.de)
                                           DNS-Server
```

| Begriff | Aufgabe |
|---|---|
| **Client** | stellt die Anfrage, z. B. dein Browser |
| **Router** | verbindet Netzwerke und leitet Pakete Richtung Ziel weiter |
| **Provider** (Internetanbieter) | „verkauft“ den Internetzugang, betreibt Leitungen und Router und regelt den Transport zwischen den Netzen |
| **Webserver** | speichert die Website und schickt sie auf Anfrage zurück |
| **DNS-Server** | übersetzt Namen wie `tagesschau.de` in IP-Adressen, das „Telefonbuch des Internets“ |

::: info Merke: Der Weg einer Website
1. Du gibst einen **Namen** ein → ein **DNS-Server** liefert die passende **IP-Adresse**.
2. Dein Browser schickt eine **Anfrage** an diese IP-Adresse.
3. Die Datenpakete laufen über **viele Router** und die Netze verschiedener **Provider**.
4. Der **Webserver** antwortet, die Pakete finden den Weg zurück und dein Browser setzt die Seite zusammen.
:::

## Protokolle: gemeinsame Regeln

Damit Geräte verschiedener Hersteller sich verstehen, halten sich alle an **Protokolle**.

| Protokoll | Wofür? |
|---|---|
| **TCP/IP** | Adressierung und zuverlässiger Transport von Datenpaketen |
| **HTTPS** | Webseiten sicher (verschlüsselt) abrufen |
| **SMTP** | E-Mails **versenden** |
| **IMAP** | E-Mails vom Server **abrufen** (sie bleiben auf dem Server) |
| **DNS** | Namen in IP-Adressen übersetzen |

## Aufgaben

1. Erweitere die Skizze deines Heimnetzes aus [Grundlagen](./grundlagen) um Provider, Router im Internet und einen Webserver.
2. Frag zu Hause nach, welchen **Provider** ihr für euren Internetzugang bezahlt.
3. Erkläre, warum man DNS-Server auch „Telefonbücher des Internets“ nennt.

## Weiterlesen

- DNS im Detail: [Namensauflösung](./dns) <Badge type="info" text="Oberstufe" />
- Wie Router den Weg finden: [Routing](./routing) <Badge type="info" text="Oberstufe" />
