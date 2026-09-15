---
title: "Routing"
description: "Wie ein Router mit Routingtabelle, Schnittstelle und Gateway den Weg in andere Netze findet, Longest Prefix Match sowie statisches und dynamisches Routing."
---

# Routing <Badge type="info" text="Oberstufe" />

::: info Merke: Routing
**Routing** bedeutet, für ein Datenpaket einen **Weg** vom Absender- zum Zielnetz zu finden. Das erledigen **Router** (in Filius: *Vermittlungsrechner*). Sie verbinden verschiedene Netze und entscheiden bei jedem Paket, **wohin es als Nächstes** geht.
:::

Voraussetzung: Du weißt, wie man mit der [Subnetzmaske](./subnetze) den Netzwerkanteil einer Adresse bestimmt.

## Schnittstelle und Gateway

| Begriff | Bedeutung |
|---|---|
| **Schnittstelle** (*Interface*) | der **eigene Ausgang** des Routers: eine Netzwerkkarte mit eigener IP-Adresse, über die das Paket physisch losgeschickt wird |
| **Gateway** | der **nächste Router** („nächster Hop“), an den das Paket übergeben wird, wenn das Ziel nicht direkt erreichbar ist |

## Die Routingtabelle

Jeder Router besitzt eine **Routingtabelle**. Jede Zeile sagt: „Pakete für *dieses Zielnetz* schicke über *diese Schnittstelle* an *dieses Gateway*.“

| Ziel | Subnetzmaske | Schnittstelle | Gateway |
|---|---|---|---|
| 192.168.0.0 | 255.255.255.0 | 192.168.0.1 | 192.168.0.1 |
| 172.16.0.0 | 255.255.0.0 | 172.16.0.1 | 172.16.0.1 |
| 10.0.0.0 | 255.0.0.0 | 172.16.0.1 | 172.16.0.2 |
| 0.0.0.0 | 0.0.0.0 | 172.16.0.1 | 172.16.0.2 |

- In den ersten beiden Zeilen ist das Gateway die eigene Schnittstelle: Die Netze hängen **direkt** am Router.
- Zeile 3: Das Netz `10.0.0.0/8` ist nur **über den Nachbarrouter** `172.16.0.2` erreichbar.
- Zeile 4 ist die **Standardroute** (*default route*): „alles andere“ geht an `172.16.0.2`.

## Welche Zeile gilt? Longest Prefix Match

Ein Ziel kann zu mehreren Einträgen passen. Beispiel: Ziel `192.168.10.25`.

| Eintrag | passt? |
|---|---|
| 192.168.10.0 /24 | ✅ (24 Bit stimmen überein) |
| 192.168.0.0 /16 | ✅ (16 Bit) |
| 192.0.0.0 /8 | ✅ (8 Bit) |
| 0.0.0.0 /0 | ✅ (passt immer) |

::: info Merke: Longest Prefix Match
Passen mehrere Einträge, nimmt der Router den **genauesten**, also den mit dem **längsten Präfix** (den meisten Einsen in der Maske). Hier: `/24`.
:::

**Ablauf für jedes Paket:**
1. Ziel-IP mit jeder Zeile vergleichen (Ziel-IP UND Maske = Zielnetz?).
2. Von den passenden Zeilen die mit dem längsten Präfix wählen.
3. Paket über die **Schnittstelle** dieser Zeile an das **Gateway** senden.

## Statisches vs. dynamisches Routing

| Kriterium | Statisches Routing | Dynamisches Routing |
|---|---|---|
| Definition | Routen werden **von Hand** eingetragen | Routen werden **automatisch** über Routingprotokolle berechnet |
| Wartung | hoch | gering |
| Skalierbarkeit | gering | hoch |
| Reaktion auf Ausfälle | keine automatische Anpassung | findet selbstständig neue Wege |
| Ressourcenbedarf | sehr gering | höher (Rechenleistung, Bandbreite) |
| Fehleranfälligkeit | hoch (Tippfehler) | geringer |
| typisch für | kleine, stabile Netze | große Netze, das Internet |

## Aufgabe mit Filius

1. Baue zwei Netzwerke, die über einen Vermittlungsrechner verbunden sind. Alle Rechner aus Netz A sollen einen Webserver in Netz B erreichen.
2. Erweitere um einen zweiten und dritten Vermittlungsrechner mit einem dritten Netz. Lässt sich deine Konfiguration so erweitern?

Hilfe: [beuche.info](https://beuche.info/)
