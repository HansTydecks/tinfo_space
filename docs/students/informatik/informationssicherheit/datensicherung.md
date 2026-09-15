---
title: "Datensicherung"
description: "Verfügbarkeit von Daten sichern: Ursachen für Datenverlust, vollständige, differentielle und inkrementelle Backups sowie RAID."
---

# Datensicherung <Badge type="info" text="Oberstufe" />

Dein Handy fällt ins Wasser, der Laptop wird gestohlen, oder ein Erpressungstrojaner verschlüsselt alle Dateien. Sind deine Fotos, Hausarbeiten und Notizen dann weg?

## Was gefährdet die Verfügbarkeit?

- **Hardwareausfälle** (defekte Festplatte, Wasserschaden)
- **Softwarefehler** und fehlerhafte Updates
- **Cyberangriffe**, z. B. Ransomware
- **Menschliche Fehler** (versehentlich gelöscht)
- **Netzwerk- oder Stromausfälle**
- **Diebstahl** und Sabotage

::: info Merke: Backup
Ein **Backup** ist eine **Kopie** von Daten an einem **anderen Ort**, mit der man den Zustand zu einem früheren Zeitpunkt wiederherstellen kann. Backups sichern das Schutzziel **Verfügbarkeit**.
:::

## Drei Backup-Strategien

| | Vollständiges Backup | Differentielles Backup | Inkrementelles Backup |
|---|---|---|---|
| **Was wird gesichert?** | **alle** Daten | Änderungen **seit dem letzten Vollbackup** | Änderungen **seit dem letzten Backup** (egal welcher Art) |
| **Speicherbedarf** | hoch | wächst mit jedem Tag | gering |
| **Dauer der Sicherung** | lang | mittel | kurz |
| **Wiederherstellung** | einfach: ein Backup | Vollbackup + **letztes** differentielles | Vollbackup + **alle** inkrementellen der Reihe nach |
| **Risiko** | – | – | ist ein Glied der Kette beschädigt, fehlen spätere Stände |

**Beispiel:** Sonntag Vollbackup. Montag ändert sich Datei A, Dienstag Datei B.
- **Differentiell** am Dienstag: sichert A **und** B.
- **Inkrementell** am Dienstag: sichert **nur** B (A wurde schon am Montag gesichert).

::: tip Faustregel 3-2-1
**3** Kopien deiner Daten, auf **2** verschiedenen Speichermedien, davon **1** an einem anderen Ort, z. B. in der Cloud oder bei Verwandten.
:::

## Cloud-Speicher

Cloudbasierte Speicher sichern automatisch und ortsunabhängig. Aber: Die Daten liegen auf **fremden Servern**. Wer hat Zugriff? Sind sie verschlüsselt? Was, wenn der Anbieter den Dienst einstellt?

## RAID <Badge type="warning" text="Lk" />

**RAID** (*Redundant Array of Independent Disks*) verbindet mehrere Festplatten:
- **RAID 0:** Daten werden verteilt → schneller, aber **keine** Ausfallsicherheit.
- **RAID 1:** Daten werden **gespiegelt** → fällt eine Platte aus, ist alles auf der anderen noch da.
- **RAID 5:** Daten plus **Paritätsinformation** über mindestens 3 Platten → eine Platte darf ausfallen.

::: warning RAID ersetzt kein Backup
Löschst du versehentlich eine Datei oder verschlüsselt Ransomware deine Daten, passiert das auf **allen** gespiegelten Platten gleichzeitig.
:::

## Aufgabe

Entwirf ein Sicherungskonzept für deine eigenen Daten (Handy, Schulrechner, Cloud): Was sicherst du, wie oft, wie und wo?
