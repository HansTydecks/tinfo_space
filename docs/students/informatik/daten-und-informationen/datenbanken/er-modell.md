---
title: "② Entity-Relationship-Modell"
description: "Datenmodellierung mit dem Entity-Relationship-Modell: Entitäten, Attribute, Beziehungen und ihre Symbole am Beispiel einer Schulbibliothek."
---

# ② Entity-Relationship-Modell <Badge type="tip" text="Klasse 9" />

Bevor man eine Datenbank baut, plant man sie, so wie ein Architekt einen Bauplan zeichnet, bevor gebaut wird. Dafür nutzt man das **Entity-Relationship-Modell (ERM)**.

## Der Auftrag

Die **Schulbibliothek** meldet sich: *„Wir brauchen eine Datenbank! Wir haben keine Lust mehr, alles von Hand in Karteikarten zu sortieren.“*

## Die Bausteine

::: info Merke
| Baustein | Bedeutung | Symbol | Beispiel |
|---|---|---|---|
| **Entität** (*Entity*) | ein „Ding“ oder Objekt der realen Welt, über das Daten gespeichert werden | **Rechteck** | Buch, Leser:in |
| **Attribut** | eine Eigenschaft einer Entität oder Beziehung | **Ellipse** | Titel, Erscheinungsjahr |
| **Primärschlüssel** | Attribut, das jede Entität **eindeutig** macht | Ellipse mit **unterstrichenem** Namen | Buch-ID |
| **Beziehung** (*Relationship*) | Verbindung zwischen Entitäten, kann selbst Attribute haben | **Raute** | leiht aus (mit Ausleihdatum) |
:::

## Beispiel: Schulbibliothek

> In der Bibliothek gibt es **Bücher** mit eindeutiger Buch-ID, Titel, Erscheinungsjahr und Seitenzahl. Bücher werden von **Autor:innen** geschrieben, zu denen eine eindeutige ID, der Name und das Geburtsjahr gespeichert werden. **Leser:innen** haben einen eindeutigen Leserausweis, einen Namen und ein Eintrittsdatum. Leser:innen **leihen** Bücher **aus**; dabei wird das Ausleihdatum festgehalten.

<svg class="diagramm" viewBox="0 0 790 230" width="790" role="img" aria-label="ER-Modell der Schulbibliothek: Autor:in schreibt Buch (n zu m), Leser:in leiht Buch aus (n zu m) mit Ausleihdatum.">
  <g fill="none" stroke="currentColor" stroke-width="2">
    <!-- Entitäten -->
    <rect x="20" y="110" width="120" height="40" />
    <rect x="330" y="110" width="120" height="40" />
    <rect x="645" y="110" width="120" height="40" />
    <!-- Beziehungen -->
    <polygon points="175,130 230,100 285,130 230,160" />
    <polygon points="485,130 540,100 595,130 540,160" />
    <!-- Verbindungslinien -->
    <line x1="140" y1="130" x2="175" y2="130" />
    <line x1="285" y1="130" x2="330" y2="130" />
    <line x1="450" y1="130" x2="485" y2="130" />
    <line x1="595" y1="130" x2="645" y2="130" />
    <!-- Attribute Autor:in -->
    <ellipse cx="40" cy="45" rx="34" ry="16" />
    <ellipse cx="125" cy="45" rx="46" ry="16" />
    <ellipse cx="80" cy="200" rx="42" ry="16" />
    <line x1="45" y1="61" x2="65" y2="110" /><line x1="120" y1="61" x2="100" y2="110" /><line x1="80" y1="150" x2="80" y2="184" />
    <!-- Attribute Buch -->
    <ellipse cx="320" cy="45" rx="32" ry="16" />
    <ellipse cx="390" cy="45" rx="30" ry="16" />
    <ellipse cx="462" cy="45" rx="36" ry="16" />
    <ellipse cx="390" cy="200" rx="38" ry="16" />
    <line x1="328" y1="61" x2="360" y2="110" /><line x1="390" y1="61" x2="390" y2="110" /><line x1="455" y1="61" x2="420" y2="110" /><line x1="390" y1="150" x2="390" y2="184" />
    <!-- Attribut der Beziehung -->
    <ellipse cx="540" cy="200" rx="52" ry="16" />
    <line x1="540" y1="160" x2="540" y2="184" />
    <!-- Attribute Leser:in -->
    <ellipse cx="665" cy="45" rx="34" ry="16" />
    <ellipse cx="748" cy="45" rx="38" ry="16" />
    <ellipse cx="705" cy="200" rx="50" ry="16" />
    <line x1="670" y1="61" x2="690" y2="110" /><line x1="742" y1="61" x2="725" y2="110" /><line x1="705" y1="150" x2="705" y2="184" />
  </g>
  <g fill="currentColor" font-size="13" text-anchor="middle" font-family="inherit">
    <text x="80" y="135" font-weight="bold">Autor:in</text>
    <text x="390" y="135" font-weight="bold">Buch</text>
    <text x="705" y="135" font-weight="bold">Leser:in</text>
    <text x="230" y="134">schreibt</text>
    <text x="540" y="134">leiht aus</text>
    <text x="40" y="49">Name</text>
    <text x="125" y="49">Geburtsjahr</text>
    <text x="80" y="204" text-decoration="underline">AutorID</text>
    <text x="320" y="49">Titel</text>
    <text x="390" y="49">Jahr</text>
    <text x="462" y="49">Seiten</text>
    <text x="390" y="204" text-decoration="underline">BuchID</text>
    <text x="540" y="204">Ausleihdatum</text>
    <text x="665" y="49">Name</text>
    <text x="748" y="49">Eintritt</text>
    <text x="705" y="204" text-decoration="underline">AusweisNr</text>
    <text x="157" y="122">n</text>
    <text x="307" y="122">m</text>
    <text x="467" y="122">m</text>
    <text x="620" y="122">n</text>
  </g>
</svg>

Die Zahlen an den Linien heißen **Kardinalitäten** (→ [nächste Seite](./kardinalitaeten)).

## So gehst du vor

1. **Substantive** im Text suchen → Kandidaten für **Entitäten**
2. **Eigenschaften** dieser Substantive → **Attribute**
3. **Verben**, die Entitäten verbinden → **Beziehungen**
4. Für jede Entität einen **Primärschlüssel** festlegen
5. **Kardinalitäten** bestimmen

::: info Aufgabe
Zeichne das ERM der Schulbibliothek mit den richtigen Symbolen auf ein Blatt. Ergänze anschließend: Die Bibliothek möchte auch speichern, **in welchem Regal** ein Buch steht.
:::

## Weiterlesen

- [Kardinalitäten](./kardinalitaeten) · [Primär- & Fremdschlüssel](./schluessel)
- Wie aus dem ERM Tabellen werden: [Relationenmodell](./relationenmodell) <Badge type="info" text="Oberstufe" />
