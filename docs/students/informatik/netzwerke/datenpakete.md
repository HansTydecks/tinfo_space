---
title: "Datenpakete"
description: "Warum Daten im Netzwerk in Pakete zerlegt werden, was in einem Paket steht und welche Probleme dabei auftreten können."
---

# Datenpakete <Badge type="tip" text="Klasse 9" />

Stell dir vor, du willst ein ganzes **Haus** per Post verschicken. Kein Lieferwagen ist groß genug. Also baust du das Haus in Einzelteile auseinander, nummerierst jedes Teil, legst eine Bauanleitung bei und verschickst viele kleine Pakete. Der Empfänger baut das Haus wieder zusammen.

Genau so funktioniert die Datenübertragung im Netzwerk.

::: info Merke: Paketvermittlung
1. Große Daten (ein Video, eine Website) werden in viele **kleine Datenpakete** zerlegt.
2. Jedes Paket enthält neben den Nutzdaten **Absender-Adresse, Ziel-Adresse** und eine **Nummer**.
3. Die Pakete werden **einzeln** durch das Netz geschickt, eventuell sogar auf **unterschiedlichen Wegen**.
4. Das Zielgerät **setzt die Pakete** anhand der Nummern wieder **zusammen**.
:::

## Was kann schiefgehen?

| Problem | Lösung im Internet |
|---|---|
| Ein Paket geht verloren | Der Empfänger bestätigt den Empfang; fehlende Pakete werden **neu angefordert**. |
| Pakete kommen in falscher Reihenfolge an | Die **Paketnummern** stellen die Reihenfolge wieder her. |
| Ein Paket wurde beschädigt | Eine **Prüfsumme** macht Fehler erkennbar. |
| Ein Weg ist gestört | Router schicken die Pakete über einen **anderen Weg**. |

::: tip TCP/IP
Im Internet teilen sich zwei Protokolle die Arbeit:
- **IP** (*Internet Protocol*) kümmert sich um die **Adressierung** und den Weg der Pakete.
- **TCP** (*Transmission Control Protocol*) sorgt dafür, dass **alle Pakete vollständig und in der richtigen Reihenfolge** ankommen.
:::

## Planspiel

Im Unterricht spielen wir die Paketvermittlung nach: „Rechner“ zerlegen eine Nachricht auf Zettel und stecken sie in nummerierte Umschläge, „Drucker“ setzen sie wieder zusammen, und niemand darf sprechen.

**Beobachtungsauftrag:** An welchen Stellen hätte das Erstellen, Versenden oder Zusammensetzen schiefgehen können?
