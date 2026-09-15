---
title: "Kontrollstrukturen"
description: "Die algorithmischen Grundstrukturen Sequenz, Verzweigung und Wiederholung (Zählschleife, kopf- und fußgesteuerte Schleife) mit Struktogramm und Python-Code."
---

# Kontrollstrukturen <Badge type="tip" text="Klasse 8" />

Jeder Algorithmus, egal wie kompliziert, lässt sich aus **drei Grundbausteinen** zusammensetzen.

::: info Merke
| Kontrollstruktur | Idee | Alltag |
|---|---|---|
| **Sequenz** | Anweisungen **nacheinander** | Zähne putzen: Zahnpasta drauf, putzen, ausspülen |
| **Verzweigung** | **wenn** Bedingung, **dann** … **sonst** … | Wenn es regnet, nimm einen Schirm, sonst eine Sonnenbrille. |
| **Wiederholung** (Schleife) | Anweisungen **mehrfach** ausführen | Rühre 20-mal um. |
:::

## Sequenz

<table class="struktogramm">
  <tr><td>Zahnpasta auf die Bürste</td></tr>
  <tr><td>2 Minuten putzen</td></tr>
  <tr><td>Mund ausspülen</td></tr>
</table>

## Verzweigung

<table class="struktogramm">
  <tr><td class="bedingung" colspan="2">Regnet es?<br><small>ja&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nein</small></td></tr>
  <tr><td>Schirm mitnehmen</td><td>Sonnenbrille mitnehmen</td></tr>
</table>

```python
if regnet:
    print("Schirm mitnehmen")
else:
    print("Sonnenbrille mitnehmen")
```

## Wiederholung

| Schleifenart | Wann? | Beispiel |
|---|---|---|
| **Zählschleife** | Anzahl der Wiederholungen ist **vorher bekannt** | „Wiederhole 4-mal: gehe 100 Schritte, drehe dich um 90°.“ |
| **kopfgesteuerte Schleife** | Bedingung wird **vor** jedem Durchlauf geprüft; eventuell läuft sie **nie** | „Solange der Teller nicht leer ist: iss einen Bissen.“ |
| **fußgesteuerte Schleife** | Bedingung wird **nach** jedem Durchlauf geprüft; läuft **mindestens einmal** | „Würfle, bis du eine 6 hast.“ |

**Zählschleife als Struktogramm**

<table class="struktogramm">
  <tr><td colspan="2">wiederhole 4-mal</td></tr>
  <tr><td class="einrueckung" rowspan="2"></td><td>gehe 100 Schritte</td></tr>
  <tr><td>drehe dich um 90°</td></tr>
</table>

```python
for i in range(4):          # Zählschleife
    t.forward(100)
    t.left(90)

while teller_voll:          # kopfgesteuerte Schleife
    bissen_essen()
```

::: tip Kopf oder Fuß?
Python kennt keine eigene fußgesteuerte Schleife. Wie man sie nachbaut, steht im Python-Kurs unter [do-while](./python-kurs/fortgeschritten/do-while).
:::

## Aufgaben

1. Finde zu jeder Kontrollstruktur zwei Beispiele aus deinem Alltag.
2. Zeichne ein Struktogramm für: „Ein Roboter läuft geradeaus, bis er auf ein Hindernis trifft. Ist rechts frei, dreht er nach rechts, sonst nach links. Das macht er zehnmal.“
3. Programmiere eine **Ampelschaltung** auf dem Calliope mini (→ [Blockbasiert programmieren](./blockbasiert-programmieren)).
