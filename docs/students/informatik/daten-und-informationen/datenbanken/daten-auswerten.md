---
title: "③ Daten auswerten"
description: "Kennzahlen berechnen, Daten gruppieren und visualisieren, passende Diagramme wählen, Korrelation und Kausalität unterscheiden und Datenquellen auf Bias prüfen."
---

# ③ Daten auswerten <Badge type="tip" text="Klasse 9" />

Daten zu speichern ist nur der Anfang. Spannend wird es, wenn wir aus ihnen **Informationen gewinnen**: Wie viel lesen die Klassen? Welche Bücher sind beliebt? Werden es mehr oder weniger Ausleihen?

## Kennzahlen

| Kennzahl | Bedeutung | SQL |
|---|---|---|
| **Anzahl** | Wie viele? | `COUNT(*)` |
| **Summe** | Wie viel insgesamt? | `SUM(seiten)` |
| **Mittelwert** | Durchschnitt | `AVG(seiten)` |
| **Minimum / Maximum** | kleinster / größter Wert | `MIN(jahr)`, `MAX(jahr)` |
| **Median** | der mittlere Wert, wenn man alle sortiert | (in Tabellenkalkulation: `MEDIAN`) |

::: tip Mittelwert oder Median?
Taschengeld in einer Gruppe: 10 €, 12 €, 15 €, 15 €, 200 €. Der **Mittelwert** ist 50,40 €, der **Median** 15 €. Ein einzelner Ausreißer verzerrt den Mittelwert stark.
:::

**Gruppieren** heißt, Kennzahlen **pro Gruppe** zu berechnen, z. B. Ausleihen pro Klasse (→ `GROUP BY` in [SQL](./sql-abfragen)).

## Daten visualisieren

| Diagramm | geeignet für | Beispiel |
|---|---|---|
| **Balkendiagramm** | Kategorien vergleichen | Ausleihen pro Klasse |
| **Liniendiagramm** | Entwicklung über die Zeit | Ausleihen pro Monat |
| **Kreisdiagramm** | Anteile eines Ganzen (wenige Kategorien!) | Anteil der Genres am Bestand |
| **Streudiagramm** | Zusammenhang zweier Größen | Seitenzahl ↔ Ausleihdauer |

::: warning Diagramme können täuschen
Eine y-Achse, die nicht bei 0 beginnt, lässt kleine Unterschiede riesig wirken. Prüfe bei jedem Diagramm **Achsen, Einheiten und Quelle**.
:::

## Korrelation ist nicht Kausalität

Die Bibliothek stellt fest: Klassen mit mehr Ausleihen haben bessere Deutschnoten. **Machen Bücher bessere Noten?** Vielleicht. Vielleicht haben diese Klassen aber auch eine Lehrkraft, die Lesen fördert **und** gut unterrichtet.

::: info Merke
Daten zeigen, dass zwei Dinge **gemeinsam auftreten** (**Korrelation**). Ob das eine das andere **verursacht** (**Kausalität**), lässt sich daraus allein **nicht** ablesen.
:::

## Vorhersagen

Aus vergangenen Daten lassen sich Vorhersagen ableiten: *Im September werden viele Bücher ausgeliehen, also bestellen wir im August nach.* Wie Computer solche Muster selbstständig finden, lernst du im Kapitel [Maschinelles Lernen](../../kuenstliche-intelligenz/maschinelles-lernen).

## Datenquellen beurteilen <Badge type="warning" text="Lk" />

Auswertungen sind nur so gut wie die Daten. Prüfe auf **Bias** (Verzerrung):
- **Selbstauskünfte:** Geben Menschen ehrlich an, wie viel sie lesen oder am Handy sind?
- **Repräsentativität:** Wurden nur die befragt, die ohnehin in die Bibliothek kommen?
- **Fehlende Gruppen:** Wer taucht in den Daten gar nicht auf?
- **Urheber:** Wer hat die Daten erhoben, und mit welchem Interesse?

## Aufgabe

Erhebt in eurer Klasse anonym, wie viele Bücher jede:r im letzten Jahr gelesen hat. Berechnet Mittelwert und Median, erstellt ein passendes Diagramm und diskutiert: Ist das Ergebnis **repräsentativ** für die ganze Schule?
