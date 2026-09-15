---
title: "Subnetze & Subnetzmasken"
description: "Netzwerkanteil und Hostanteil einer IPv4-Adresse, Subnetzmasken, CIDR-Schreibweise und die Anzahl möglicher Hosts."
---

# Subnetze & Subnetzmasken <Badge type="info" text="Oberstufe" />

Ein Router muss bei jedem Paket entscheiden: Liegt das Ziel **in meinem Netz** oder muss ich es **weiterschicken**? Dafür teilt er jede IP-Adresse in zwei Teile.

::: info Merke: Netzwerk- und Hostanteil
- Der **Netzwerkanteil** gibt an, **in welchem Netz** ein Gerät liegt.
- Der **Hostanteil** kennzeichnet das **einzelne Gerät** (*Host*) in diesem Netz.
- Die **Subnetzmaske** legt fest, wo die Grenze liegt: Wo in der Maske eine **1** steht, gehört das Bit zum Netzwerkanteil, wo eine **0** steht, zum Hostanteil.
:::

## Beispiel

```text:no-line-numbers
IP-Adresse     192.168.1.100   = 11000000.10101000.00000001.01100100
Subnetzmaske   255.255.255.0   = 11111111.11111111.11111111.00000000
                                 └──────── Netzwerk ───────┘└ Host ┘
Netzadresse    192.168.1.0
```

Die **Netzadresse** erhält man, indem man IP-Adresse und Maske **bitweise UND-verknüpft** (→ [Boolesche Algebra](../technische-informatik/boolesche-algebra)).

## CIDR-Schreibweise

Statt die ganze Maske aufzuschreiben, zählt man die Einsen:

| Subnetzmaske | Einsen | CIDR | Netz für 192.168.1.100 |
|---|---|---|---|
| 255.0.0.0 | 8 | /8 | 192.0.0.0/8 |
| 255.255.0.0 | 16 | /16 | 192.168.0.0/16 |
| 255.255.255.0 | 24 | /24 | 192.168.1.0/24 |
| 255.255.255.240 | 28 | /28 | 192.168.1.96/28 |

## Liegen zwei Geräte im selben Netz?

Zwei Geräte liegen im selben Netz, wenn ihr **Netzwerkanteil gleich** ist.

| # | IP A | IP B | Maske | Selbes Netz? |
|---|---|---|---|---|
| 1 | 192.178.0.1 | 192.200.74.3 | 255.0.0.0 | ja: nur das erste Byte zählt (192 = 192) |
| 2 | 192.178.0.1 | 192.200.74.3 | 255.255.255.0 | nein: 192.178.0 ≠ 192.200.74 |
| 3 | 15.230.54.2 | 15.230.200.60 | 255.255.0.0 | ja: 15.230 = 15.230 |
| 4 | 15.230.54.2 | 15.230.200.60 | 255.255.255.0 | nein: 15.230.54 ≠ 15.230.200 |

## Wie viele Hosts passen in ein Netz?

Hat der Hostanteil **h** Bits, gibt es 2ʰ Adressen. Zwei davon sind reserviert:
- die **Netzadresse** (alle Hostbits 0)
- die **Broadcast-Adresse** (alle Hostbits 1, „an alle“)

::: info Merke
Anzahl nutzbarer Hosts = **2ʰ − 2**
:::

| Maske | Hostbits h | nutzbare Hosts |
|---|---|---|
| /24 = 255.255.255.0 | 8 | 2⁸ − 2 = 254 |
| /16 = 255.255.0.0 | 16 | 2¹⁶ − 2 = 65 534 |
| /28 = 255.255.255.240 | 4 | 2⁴ − 2 = 14 |

## Für den Leistungskurs <Badge type="warning" text="Lk" />

Mit **Subnetting** teilt man ein großes Netz in kleinere Teilnetze auf, indem man Hostbits für den Netzwerkanteil „ausleiht“. Bei **VLSM** (*Variable Length Subnet Mask*) bekommen Teilnetze je nach Bedarf unterschiedlich große Masken. **VLANs** trennen Netze logisch, obwohl sie dieselben Switches nutzen.

## Übung

Rechne mit [Becimal](https://becimal.tinfo.space/): Gehören `10.20.30.40` und `10.20.31.5` bei `/23` zum selben Netz?
