---
title: "Künstliche neuronale Netze"
description: "Aufbau eines künstlichen Neurons, Gewichte und Schwellenwert, logische Schaltungen, Lernregeln, Trennlinie und warum man mehrere Schichten braucht."
---

# Künstliche neuronale Netze <Badge type="info" text="Oberstufe" />

::: info Merke: Künstliches neuronales Netz (KNN)
Ein **künstliches neuronales Netz** besteht aus vielen **künstlichen Neuronen**, die miteinander verbunden sind. Das Vorbild sind Nervenzellen im Gehirn.
KNNs lösen Probleme, für die man **nur schwer ausdrückliche Regeln** formulieren könnte, z. B. Bild- oder Spracherkennung.
:::

## Das künstliche Neuron

```text:no-line-numbers
 e₁ ──(w₁)──┐
 e₂ ──(w₂)──┼──► Σ = w₁·e₁ + w₂·e₂ + … + wₙ·eₙ ──► Σ > s ? ──► a
 eₙ ──(wₙ)──┘                                    (Schwellenwert)
```

| Symbol | Bedeutung |
|---|---|
| e₁ … eₙ | **Eingänge** (hier meist 0 oder 1) |
| w₁ … wₙ | **Kantengewichte**: Wie wichtig ist ein Eingang? |
| Σ | gewichtete **Summe** der Eingänge |
| s | **Schwellenwert** |
| a | **Ausgabe** |

::: info Merke: Wann feuert das Neuron?
- Σ **>** s ⟹ a = 1 (das Neuron **feuert**)
- Σ **≤** s ⟹ a = 0
:::

- **Positive Gewichte** verstärken einen Eingang (in der Biologie *erregend*).
- **Negative Gewichte** schwächen ihn ab (*hemmend*).
- Große Gewichte und ein niedriger Schwellenwert lassen das Neuron **leichter feuern**, kleine Gewichte und ein hoher Schwellenwert **seltener**.

## Logische Schaltungen mit einem Neuron

| Funktion | Gewichte | Schwellenwert s | Prüfung |
|---|---|---|---|
| **AND** | w₁ = 1, w₂ = 1 | 1,5 | nur bei e₁ = e₂ = 1 ist Σ = 2 > 1,5 |
| **OR** | w₁ = 1, w₂ = 1 | 0,5 | sobald ein Eingang 1 ist, gilt Σ ≥ 1 > 0,5 |
| **NOT** | w = −1 | −0,5 | e = 0: Σ = 0 > −0,5 → 1; e = 1: Σ = −1 → 0 |

(→ [Boolesche Algebra](../technische-informatik/boolesche-algebra))

## Das lernende Neuron

Gewichte von Hand zu suchen ist mühsam. Stattdessen **lernt** das Neuron an Beispielen, deren richtige Ausgabe bekannt ist (→ [überwachtes Lernen](./ueberwachtes-lernen)).

::: info Merke: Lernregeln
Gehe alle Beispiele durch und vergleiche die Ausgabe mit der richtigen Antwort:
1. **Feuert das Neuron, obwohl es nicht soll:** Verringere die Gewichte der **aktiven** Eingänge (e = 1) um 0,5.
2. **Feuert das Neuron nicht, obwohl es soll:** Erhöhe die Gewichte der **aktiven** Eingänge um 0,5.
3. Passe bei Bedarf auch den **Schwellenwert** an (erhöhen bzw. verringern).

Wiederhole das, bis alle Beispiele richtig sind.
:::

## Die Trennlinie

Ein Neuron mit zwei Eingängen x₁, x₂ und den Gewichten 2 und 1 bei s = 1,5 feuert, wenn

```text:no-line-numbers
2·x₁ + x₂ > 1,5
```

Die Grenze 2·x₁ + x₂ = 1,5 lässt sich umstellen zu **x₂ = −2·x₁ + 1,5**, einer **Geraden** (y = m·x + n).

::: info Merke
Ein einzelnes Neuron teilt die Ebene mit einer **Geraden** in zwei Bereiche: „feuert“ und „feuert nicht“. Es kann also nur Daten trennen, die sich **durch eine Gerade trennen lassen** (*linear separierbar*).
:::

## Beispiel: Die gemeine Steinlaus

Eine Steinlaus hat sich in die Schule verirrt (bekannt aus einem Loriot-Sketch). Sie ist kaum von harmlosen Insekten zu unterscheiden. Messungen von zwei Merkmalen ergeben ein Diagramm: rote Punkte sind Steinläuse, blaue die anderen Insekten.
Ein Neuron lernt, die Gewichte w₁, w₂ und den Schwellenwert s so zu wählen, dass die **Trennlinie** Steinläuse und andere Insekten sauber trennt:
w₁ · x₁ + w₂ · x₂ > s ⟹ Steinlaus.

## Grenzen eines Neurons

::: warning Das XOR-Problem
Für XOR (genau ein Eingang ist 1) gibt es **keine einzelne Gerade**, die die Fälle trennt. Die Lösung: **mehrere Neuronen in Schichten** (*hidden layers*). Jede zusätzliche Schicht kann kompliziertere Grenzen formen. Bei sehr vielen Schichten spricht man von **Deep Learning**.
:::

## Ausprobieren

Öffne den [TensorFlow Playground](https://playground.tensorflow.org/):
1. Reduziere auf **1 hidden layer** mit **3 Neuronen** und wähle die kreisförmige Punktmenge.
2. Lass das Netz schrittweise lernen: Nach wie vielen Schritten liegt der *Training loss* unter 10 %?
3. Fahre mit der Maus über die Neuronen der versteckten Schicht: Welche „Teilentscheidung“ trifft jedes?
4. Wie wenige Neuronen reichen für andere Datensätze?
