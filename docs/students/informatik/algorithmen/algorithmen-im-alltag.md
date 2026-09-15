---
title: "Algorithmen im Alltag"
description: "Algorithmen in sozialen Medien, Smarthome, In-App-Käufen und Werbung, maschinelle Entscheidungen und die Bedeutung von Algorithmen für die Gesellschaft."
---

# Algorithmen im Alltag <Badge type="tip" text="Klasse 8/10" />

Algorithmen entscheiden jeden Tag mit, **was du siehst, kaufst und erlebst**, meistens, ohne dass du es merkst.

## Wo steckt ein Algorithmus?

| Bereich | Was entscheidet der Algorithmus? |
|---|---|
| **Soziale Medien** | welches Video als Nächstes in deinem Feed erscheint |
| **Smarthome** | wann die Heizung anspringt oder das Licht angeht |
| **In-App-Käufe** | wann dir ein „nur heute!“-Angebot angezeigt wird, oft genau dann, wenn du im Spiel feststeckst |
| **Werbung** | welche Anzeige zu deinem Profil passt (→ [Tracking](../daten-und-informationen/datenbanken/tracking)) |
| **Navigation** | welche Route am schnellsten ist |
| **Musik & Streaming** | welche Songs dir vorgeschlagen werden |

::: info Aufgabe
Suche dir drei Beispiele aus der Tabelle aus. Prüfe mit dem [EVA-Prinzip](../technische-informatik/eva-prinzip): Was ist die **Eingabe**, was die **Verarbeitung**, was die **Ausgabe**? Und erfüllt es alle [Eigenschaften eines Algorithmus](./eigenschaften)?
:::

## Maschinelle Entscheidungen <Badge type="tip" text="Klasse 10" />

Immer öfter treffen Algorithmen **Entscheidungen über Menschen**:
- **autonomes Fahren:** Bremsen oder ausweichen?
- **Gesichtserkennung:** Wer darf ein Gebäude betreten?
- **Wahlcomputer:** Werden Stimmen korrekt gezählt? Kann man das überprüfen?
- **Bewerbungen, Kredite:** Wer kommt in die nächste Runde?

Im Kern sind das oft **verknüpfte Bedingungen** (→ [PyTurtle Block 3](./pyturtle/block3)):

```python
if hindernis_erkannt and geschwindigkeit > 30:
    bremse_stark()
elif hindernis_erkannt:
    bremse_leicht()
```

Heute werden solche Regeln aber häufig nicht mehr von Menschen geschrieben, sondern **aus Daten gelernt** (→ [Künstliche Intelligenz](../kuenstliche-intelligenz/was-ist-ki)).

## Algorithmen und Gesellschaft

::: tip Diskussion
- Wer ist **verantwortlich**, wenn ein Algorithmus eine falsche Entscheidung trifft: die Programmiererin, das Unternehmen, die Nutzer:innen?
- Sollten Plattformen offenlegen müssen, **wie** ihr Feed-Algorithmus funktioniert?
- Welche Entscheidungen sollten **immer Menschen** treffen?
:::
