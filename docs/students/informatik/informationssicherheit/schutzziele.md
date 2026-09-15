---
title: "Schutzziele der Informationssicherheit"
description: "Vertraulichkeit, Integrität, Authentizität, Verfügbarkeit und Verbindlichkeit sowie die Handlungsfelder Datensicherheit, Datensicherung und Datenschutz."
---

# Schutzziele der Informationssicherheit <Badge type="info" text="Oberstufe" />

Alice und Bob tauschen in einem Peer-to-Peer-Netz Dateien. Alice bekommt eine Nachricht: *„Ich bin's, Bob. Hier sind wichtige Daten.“*
Kann Alice den Daten vertrauen? Welche Informationen bräuchte sie dafür?

## Die Schutzziele

::: info Merke
| Schutzziel | Bedeutung | Gefährdet durch … | Typische Maßnahme |
|---|---|---|---|
| **Vertraulichkeit** | Nur **autorisierte Personen** können die Daten einsehen. | Mitlesen im WLAN | [Verschlüsselung](./verschluesselung) |
| **Integrität** | Daten bleiben **vollständig und unverändert**, bzw. Änderungen werden **erkannt**. | Manipulation unterwegs | [Hashwerte](./hashes-und-signaturen) |
| **Authentizität** | **Echtheit** der Daten und **Identität** des Absenders sind nachweisbar. | Mallory gibt sich als Bob aus | [Digitale Signaturen](./hashes-und-signaturen) |
| **Verfügbarkeit** | Daten und Systeme sind für Berechtigte **zugänglich, wenn sie gebraucht werden**. | Festplattendefekt, Serverausfall, Ransomware | [Backups](./datensicherung) |
| **Verbindlichkeit** <Badge type="warning" text="Lk" /> | Ein Absender kann **nicht abstreiten**, eine Nachricht geschickt zu haben. | „Das war ich nicht!“ | digitale Signaturen |
:::

::: warning Authentisch ≠ vertrauenswürdig
Selbst wenn sicher ist, dass eine Datei **wirklich von Bob** stammt, kann Bob sich irren oder böse Absichten haben. Authentizität sagt nur etwas über die **Herkunft**, nicht über den **Inhalt**.
:::

## Drei Handlungsfelder

| Handlungsfeld | Leitfrage |
|---|---|
| **Datensicherheit** | Wie schütze ich Daten **technisch** vor Verlust, Manipulation und unbefugtem Zugriff? |
| **Datensicherung** | Wie stelle ich Daten **im Notfall wieder her**? |
| **Datenschutz** | **Ob** und unter welchen Bedingungen **darf** ich personenbezogene Daten überhaupt verarbeiten? |

## Aufgabe

Ordne jedem Schutzziel ein eigenes Beispiel aus deinem Alltag zu, bei dem es verletzt wird (z. B. „Mein Messenger ist nach einem Update zwei Tage nicht erreichbar“ → Verfügbarkeit).
