---
title: "① Erfassen – Daten entstehen"
description: "Bewusst erzeugte und automatisch erfasste Daten, Datenqualität sowie Datenextraktion und Datenbereinigung für die Oberstufe."
---

# ① Erfassen – Daten entstehen <Badge type="tip" text="Klasse 9" />

Bevor Daten gespeichert und ausgewertet werden, müssen sie **entstehen** und **ins System gelangen**. Fehler in dieser Phase ziehen sich durch alle weiteren.

## Zwei Arten von Daten

::: info Merke
- **Bewusst erzeugte Daten** gibst du **aktiv** ein: ein Profilbild hochladen, eine Nachricht schreiben, ein Formular ausfüllen, etwas liken.
- **Automatisch erfasste Daten** entstehen **im Hintergrund**, oft ohne dass du es merkst: Uhrzeit, Standort, Gerätetyp, wie lange du ein Video ansiehst, wohin du scrollst.
:::

::: info Aufgabe: Ein Foto, viele Daten
Du machst ein Foto mit deinem Handy und teilst es in einer App.
1. Welche Daten erzeugst du **bewusst**?
2. Welche werden **automatisch** erstellt, beim Fotografieren und beim Hochladen?
:::

::: details Mögliche Lösung
- **bewusst:** das Bild, eine Bildunterschrift, markierte Personen, gewählter Filter
- **automatisch:** Aufnahmezeit, GPS-Position, Kameramodell, Belichtung (→ [Metadaten](./daten-im-alltag)), dazu beim Hochladen: Uhrzeit, IP-Adresse, App-Version, wer das Bild wie lange ansieht
:::

## Datenqualität

Eine Datenbank ist nur so gut wie die Daten darin.

| Qualitätsmerkmal | Negativbeispiel |
|---|---|
| **korrekt** | Geburtsjahr `2099` |
| **vollständig** | Notfallnummer fehlt |
| **einheitlich** | `Dresden`, `DD`, `dresden` für denselben Ort |
| **aktuell** | alte Adresse nach einem Umzug |
| **eindeutig** | zwei Schüler namens „Max Müller“ ohne Unterscheidungsmerkmal |

**Gegenmaßnahmen beim Erfassen:** Auswahllisten statt Freitext, Pflichtfelder, Prüfungen („Geburtsdatum muss in der Vergangenheit liegen“).

## Für die Oberstufe <Badge type="warning" text="Lk" />

- **Zielgerichtete Erfassung:** Nur erfassen, was für den Zweck **wirklich nötig** ist (→ [Datensparsamkeit](../../informationssicherheit/datenschutz-und-gesellschaft)).
- **Datenextraktion:** Daten aus unstrukturierten Quellen herausziehen, z. B. Telefonnummern aus Texten mit [regulären Ausdrücken](../../sprachen-und-automaten/regulaere-ausdruecke), und Werte **normalisieren** (`0351/12345`, `+49 351 12345` → ein Format).
- **Datenbereinigung:** fehlende Werte ergänzen, entfernen oder kennzeichnen, Dubletten zusammenführen, Tippfehler korrigieren.
