---
title: "Maschinelles Lernen"
description: "Überblick über maschinelles Lernen: Trainingsdaten, Modell und die drei Lernarten bestärkendes, überwachtes und unüberwachtes Lernen."
---

# Maschinelles Lernen <Badge type="tip" text="Klasse 9" />

Wie bringst du einem Hund bei, sich beim Kommando „Sitz!“ hinzusetzen? Wie einem Kleinkind, Äpfel von Birnen zu unterscheiden? Maschinen lernen erstaunlich ähnlich.

::: info Merke: Maschinelles Lernen
Beim **maschinellen Lernen** sucht ein Computer **selbst Muster und Regeln in (meist sehr vielen) Daten**. Das Gelernte wird in einem **Modell** gespeichert. Dieses Modell kann danach auf **neue, unbekannte Daten** angewendet werden.
:::

```text:no-line-numbers
Trainingsdaten ──► Lernverfahren ──► Modell
                                        │
                  neue Daten ──────────►└──► Vorhersage / Entscheidung
```

## Drei Arten des Lernens

| | Bestärkendes Lernen | Überwachtes Lernen | Unüberwachtes Lernen |
|---|---|---|---|
| **Idee** | lernen durch **Belohnung und Bestrafung** | lernen aus **beschrifteten Beispielen** | **Muster** in unbeschrifteten Daten finden |
| **Vergleich** | Hund bekommt Leckerli | Kind lernt mit Bilderbuch: „Das ist ein Apfel.“ | Kind sortiert Bausteine selbst in Gruppen |
| **Ziel** | Belohnung langfristig maximieren | vorhersagen oder klassifizieren | Gruppen oder Auffälligkeiten entdecken |
| **Beispiel** | Spiele, Roboter, Empfehlungen | Spamfilter, Tumor auf Röntgenbild erkennen | Kundengruppen, Betrugserkennung |
| **Seite** | [Bestärkendes Lernen](./bestaerkendes-lernen) | [Überwachtes Lernen](./ueberwachtes-lernen) | [Unüberwachtes Lernen](./unueberwachtes-lernen) |

::: warning Das Modell kennt nur seine Daten
Ein Modell, das mit **Bananen** trainiert wurde („gelb = reif, grün = unreif“), sagt über einen **Apfel** nichts Verlässliches, auch wenn der Apfel gelb ist. Ein Modell ist immer nur so gut wie die Daten, mit denen es trainiert wurde.
:::

## Aufgabe

Überlege für jede Aufgabe, welche Art des Lernens passt:
1. Ein Roboterstaubsauger soll lernen, möglichst schnell die ganze Wohnung zu saugen.
2. Ein Onlineshop will herausfinden, welche Kundengruppen es gibt.
3. Eine App soll Pilze auf Fotos als „essbar“ oder „giftig“ einstufen. (Würdest du ihr vertrauen?)
