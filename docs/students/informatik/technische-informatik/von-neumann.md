---
title: "Von-Neumann-Architektur"
description: "Aufbau eines Von-Neumann-Rechners mit Rechenwerk, Steuerwerk, Speicherwerk, Ein- und Ausgabewerk und Bussystem, Vergleich mit EVAS, Arbeitsspeicher und Prozessoren."
---

# Von-Neumann-Architektur <Badge type="info" text="Oberstufe" />

Fast alle heutigen Computer, vom Smartphone bis zum Server, folgen einem Bauplan, den **John von Neumann** 1945 beschrieben hat.

## Vom EVAS-Prinzip zu von Neumann

| [EVAS-Prinzip](./eva-prinzip) | Von-Neumann-Architektur |
|---|---|
| Eingabe, Verarbeitung, Ausgabe, Speicher | **Eingabewerk, Ausgabewerk, Speicherwerk** |
| „Verarbeitung“ als Blackbox | Verarbeitung = **CPU** aus **Rechenwerk** und **Steuerwerk** |
| – | Transport aller Daten über ein **Bussystem** |

```text:no-line-numbers
            ┌───────────────── CPU ─────────────────┐
            │  Steuerwerk (CU)     Rechenwerk (ALU) │
            └───────────────────┬───────────────────┘
                                │
 ═══════════════════════════ BUS ══════════════════════════
      │                     │                     │
 Eingabewerk           Speicherwerk          Ausgabewerk
```

::: info Merke: Die Komponenten
| Komponente | Aufgabe |
|---|---|
| **Rechenwerk** (ALU, *Arithmetic Logic Unit*) | führt **Rechen- und Logikoperationen** aus |
| **Steuerwerk** (CU, *Control Unit*) | holt Befehle aus dem Speicher, **entschlüsselt** sie und **steuert** alle anderen Komponenten |
| **Speicherwerk** | speichert **Programme und Daten gemeinsam** |
| **Eingabewerk / Ausgabewerk** | Verbindung zu Ein- und Ausgabegeräten |
| **Bussystem** | Leitungen zum Datentransport zwischen allen Komponenten |
:::

Rechenwerk und Steuerwerk bilden zusammen die **CPU** (*Central Processing Unit*).

## Das Speicherwerk und der Bus

- Der **Arbeitsspeicher (RAM)** enthält die Programme und Daten, die die CPU **gerade** verarbeitet. *Random Access* bedeutet: Die CPU kann auf **jede beliebige Speicherzelle direkt** zugreifen.
- RAM ist **flüchtig**: Ohne Strom sind die Daten weg. **Nichtflüchtige** Speicher (SSD, Festplatte) behalten sie.

Der Bus besteht aus drei Arten von Leitungen:

| Bus | Aufgabe |
|---|---|
| **Datenbus** | überträgt die eigentlichen **Daten** |
| **Adressbus** | gibt an, **welche Speicherzelle** angesprochen wird |
| **Steuerbus** | überträgt Steuersignale (z. B. „lesen“ oder „schreiben“) |

::: tip Adressleitungen und Speichergröße
Mit **n Adressleitungen** kann man **2ⁿ Speicherzellen** unterscheiden. Mit 32 Leitungen sind das 2³² ≈ 4 GiB, deshalb konnten 32-Bit-Systeme nicht mehr als etwa 4 GB RAM nutzen.
:::

::: warning Von-Neumann-Flaschenhals
Alle Daten und Befehle müssen **nacheinander über denselben Bus**. Die CPU ist oft schneller, als Daten nachgeliefert werden können.
:::

## Prozessoren heute

| Merkmal | Bedeutung |
|---|---|
| **Befehlssatz** | welche Grundbefehle die CPU versteht (z. B. x86 in PCs, ARM in Smartphones) |
| **Taktfrequenz** | wie viele Arbeitsschritte pro Sekunde (in GHz) |
| **Energieeffizienz** | Rechenleistung pro Watt, wichtig für Akkulaufzeit und Kühlung |
| **Mehrkern / Multi-Threading** <Badge type="warning" text="Lk" /> | mehrere Aufgaben werden wirklich gleichzeitig bearbeitet |

## Aufgabe

Verschaffe dir mit einer interaktiven Darstellung einen Überblick über die sechs Elemente (CPU = ALU + CU) und notiere zu jedem eine Aufgabe. Recherchiere dann die Daten deines eigenen Computers oder Handys: Prozessor, Kerne, Arbeitsspeicher.
