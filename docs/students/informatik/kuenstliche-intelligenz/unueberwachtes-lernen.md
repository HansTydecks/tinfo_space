---
title: "Unüberwachtes Lernen"
description: "Unsupervised Learning: Muster in unbeschrifteten Daten finden, Clustering mit k-Means am Goldrausch-Beispiel und typische Anwendungen."
---

# Unüberwachtes Lernen <Badge type="tip" text="Klasse 9" />

## Gedankenexperiment: Goldrausch

Kalifornien, 1850. Deine Crew kann an **drei Orten gleichzeitig** graben. Auf einer Karte legst du drei Grabungsorte zufällig ab. Dann bekommst du nach und nach Hinweise, wo schon Gold gefunden wurde. Leider hast du ein schlechtes Gedächtnis.

Wiederhole:
1. Ziehe eine Hinweiskarte (ein Fundort).
2. Schiebe den **nächstgelegenen** Grabungsort ein Stück **in Richtung** des Fundorts.
3. Lege die Karte verdeckt weg.

Nach vielen Karten liegen deine drei Grabungsorte ungefähr **in der Mitte von drei Fundgebieten**. Niemand hat dir gesagt, wo diese Gebiete sind: Du hast die **Gruppen selbst gefunden**.

::: info Merke: Unüberwachtes Lernen
Beim **unüberwachten Lernen** gibt es **keine Beschriftungen**. Das Verfahren sucht selbstständig **Ähnlichkeiten, Gruppen (Cluster) oder Auffälligkeiten** in den Daten und macht so Zusammenhänge sichtbar, die man vorher nicht kannte.
:::

## k-Means

Das Goldrausch-Spiel ist eine Variante des **k-Means-Verfahrens** (k = Anzahl der Gruppen):
1. Wähle k **Zentren** zufällig.
2. Ordne jeden Datenpunkt dem **nächstgelegenen** Zentrum zu.
3. Verschiebe jedes Zentrum in die **Mitte** „seiner“ Punkte.
4. Wiederhole 2 und 3, bis sich die Zentren kaum noch bewegen.

## Vergleich mit überwachtem Lernen

| Überwachtes Lernen | Unüberwachtes Lernen |
|---|---|
| Daten **mit** Beschriftung („beißt“ / „beißt nicht“) | Daten **ohne** Beschriftung |
| Ziel: neue Daten **einer bekannten Kategorie zuordnen** | Ziel: **unbekannte Gruppen** oder Ausreißer entdecken |
| Beispiel: [Affen-Spiel](./ueberwachtes-lernen) | Beispiel: Goldrausch |

## Anwendungen

- **Kundengruppen** erkennen (z. B. „Schnäppchenjäger“, „Markentreue“)
- „Kunden, die das kauften, kauften auch …“
- **Cyberangriffe** und Kreditkartenbetrug erkennen: ungewöhnliches Verhalten fällt aus allen Gruppen heraus
- Fotos in der Galerie nach Gesichtern sortieren

**Vertiefung** <Badge type="warning" text="Lk" />: Bei der **Vektorquantisierung** wird jeder Datenpunkt durch sein nächstgelegenes Zentrum ersetzt, z. B. um Bilder mit wenigen Farben darzustellen.
