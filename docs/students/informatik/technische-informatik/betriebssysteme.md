---
title: "Betriebssysteme"
description: "Aufgaben und Aufbau von Betriebssystemen: Schichtenmodell, Betriebsmittelverwaltung, Prozesse und Threads, Speicherverwaltung, Rechte sowie Open Source und proprietäre Systeme."
---

# Betriebssysteme <Badge type="warning" text="Leistungskurs" />

In Klasse 7 hast du die [Aufgaben eines Betriebssystems](./software) kennengelernt. Hier geht es darum, **wie** ein Betriebssystem diese Aufgaben erfüllt.

::: info Merke: Betriebssystem
Ein **Betriebssystem** ist die Software, die die **Betriebsmittel** eines Rechners (Prozessor, Speicher, Geräte, Dateien) **verwaltet** und Anwendungen eine **einheitliche Schnittstelle** zur Hardware bietet. Für Programme wirkt es wie eine **virtuelle Maschine**: Sie müssen nicht wissen, welche Festplatte oder Grafikkarte genau verbaut ist.
:::

## Schichtenmodell

```text:no-line-numbers
┌──────────────────────────────┐
│ Anwendungen (Browser, Spiele)│
├──────────────────────────────┤
│ Systemprogramme, Bibliotheken│
├──────────────────────────────┤
│ Betriebssystemkern (Kernel)  │
├──────────────────────────────┤
│ Treiber                      │
├──────────────────────────────┤
│ Hardware                     │
└──────────────────────────────┘
```

Jede Schicht nutzt nur die Dienste der Schicht direkt darunter.

## Grundlegende Konzepte

| Konzept | Kurz erklärt |
|---|---|
| **Prozess** | ein **laufendes Programm** mit eigenem Speicherbereich |
| **Thread** | ein **Ausführungsstrang** innerhalb eines Prozesses; mehrere Threads teilen sich den Speicher |
| **Scheduling** | Das Betriebssystem verteilt die Rechenzeit so schnell zwischen Prozessen, dass alles gleichzeitig wirkt. |
| **Speicherverwaltung** | Jeder Prozess bekommt Speicher zugeteilt. Beim **Paging** wird der Speicher in gleich große Seiten geteilt, beim **Swapping** werden selten genutzte Daten auf die SSD ausgelagert. |
| **Dateisystem & Dateirechte** | legt fest, wie Dateien gespeichert werden und **wer** sie lesen, schreiben oder ausführen darf |
| **Nutzer- und Gruppenverwaltung** | Benutzerkonten, Administratorrechte |
| **Paket- und Softwareverwaltung** | Programme installieren, aktualisieren, entfernen |

## Ausprobieren

Öffne den **Task-Manager** (Windows: `Strg` + `Umschalt` + `Esc`) bzw. die **Aktivitätsanzeige** (macOS) oder `top` (Linux):
- Wie viele Prozesse laufen gerade?
- Welcher Prozess nutzt am meisten CPU oder Arbeitsspeicher?

## Sich positionieren

- **Open Source** (z. B. Linux) oder **proprietär** (z. B. Windows, iOS)? Vergleiche Kosten, Sicherheit, Datenschutz, Anpassbarkeit und Support.
- Welche Rolle spielen alternative Betriebssysteme, um **alte Geräte** länger nutzbar zu machen? (→ [Nachhaltige Hardware](./nachhaltige-hardware))
