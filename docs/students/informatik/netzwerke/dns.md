---
title: "DNS – Namensauflösung"
description: "Wie das Domain Name System Namen wie www.beispiel.de schrittweise in IP-Adressen übersetzt: Resolver, Root-Server, TLD- und Second-Level-Server."
---

# DNS – Namensauflösung <Badge type="info" text="Oberstufe" />

Menschen merken sich Namen, Rechner arbeiten mit Zahlen. Das **Domain Name System (DNS)** übersetzt zwischen beiden Welten.

::: tip Zeitreise
Es ist 1990. Du musst einen Freund eines Freundes im Nachbarort erreichen, kennst aber nur seinen Vor- und Nachnamen. Wie kommst du an seine Telefonnummer? Genau: über das **Telefonbuch** oder die Auskunft. DNS ist das Telefonbuch des Internets.
:::

## Ausprobieren: `ping`

Öffne die Eingabeaufforderung bzw. das Terminal und vergleiche:

```text:no-line-numbers
ping google.com            → zeigt zuerst die aufgelöste IP-Adresse
ping 142.250.185.78        → direkt mit IP-Adresse
ping gibtsnicht.website    → Name kann nicht aufgelöst werden
```

## Namen sind hierarchisch

Domainnamen werden **von rechts nach links** gelesen, wie ein Baum:

```text:no-line-numbers
                    . (Root)
          ┌─────────┼─────────┐
         de        com        org          ← Top-Level-Domains (TLD)
      ┌───┴───┐
  beispiel   schule                        ← Second-Level-Domains
     │
    www                                    ← Rechnername
```

## Namensauflösung in 5 Schritten

Beispiel: Dein Rechner möchte `www.beispiel.de` erreichen.

::: info Merke
1. **Lokaler Resolver:** Der Rechner fragt den DNS-Resolver (oft beim Router oder Provider). Kennt dieser die Antwort schon aus seinem **Cache**, antwortet er sofort.
2. **Root-Server:** Sonst fragt der Resolver einen Root-Server. Der kennt die Adresse nicht, weiß aber, **welcher Server für `.de`** zuständig ist.
3. **TLD-Server:** Der `.de`-Server weiß, **welcher Server für `beispiel.de`** zuständig ist.
4. **Autoritativer Server von `beispiel.de`:** Er liefert die **IP-Adresse** von `www.beispiel.de`.
5. **Rückgabe:** Der Resolver speichert die Antwort im Cache und gibt sie an den Rechner zurück. Jetzt kann die Verbindung zum Webserver aufgebaut werden.
:::

## Root-Server in der Welt

::: info Aufgabe
Öffne [root-servers.org](https://root-servers.org/) und untersuche, wo die meisten Root-Server-Standorte liegen. Vergleiche mit der Verteilung der Internetnutzer:innen weltweit. Welche Gründe könnte es für Unterschiede geben?
:::

## DNS und Privatsphäre

Klassische DNS-Anfragen sind **unverschlüsselt**. Wer die Leitung mitliest (z. B. im öffentlichen WLAN), sieht, welche Seiten du aufrufst, auch wenn die Seite selbst per HTTPS verschlüsselt ist. **DNS over HTTPS (DoH)** verschlüsselt die DNS-Anfragen.

## Begriffe

| Begriff | Erklärung |
|---|---|
| **Server** | Programm (oder Rechner), das Dienste anbietet und Anfragen beantwortet |
| **Client** | Programm, das Dienste eines Servers nutzt (z. B. Browser) |
| **Web-Server** | stellt Webseiten bereit; ohne genauen Pfad liefert er meist `index.html` |
| **Provider** | Internetanbieter, betreibt Leitungen, Router und oft den DNS-Resolver |
