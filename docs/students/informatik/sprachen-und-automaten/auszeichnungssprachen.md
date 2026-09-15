---
title: "Auszeichnungssprachen"
description: "Dokumente strukturieren mit Auszeichnungssprachen wie HTML, Markdown und LaTeX: Überschriften, Listen, Tabellen, Bilder, Links, Trennung von Inhalt und Design sowie Barrierefreiheit."
---

# Auszeichnungssprachen <Badge type="tip" text="Klasse 10" />

Ein Medium hat immer zwei Seiten: **Inhalt** (Was steht da?) und **Design** (Wie sieht es aus?). Auszeichnungssprachen beschreiben vor allem den **Inhalt und seine Struktur**.

::: info Merke: Auszeichnungssprache
Eine **Auszeichnungssprache** (*Markup Language*) ist eine maschinenlesbare Sprache, mit der man Texte und andere Daten **gliedert und kennzeichnet** („Das ist eine Überschrift“, „Das ist ein Link“).
Bekannte Vertreter: **HTML** (Webseiten), **Markdown** (Notizen, Wikis, diese Website!), **LaTeX** (wissenschaftliche Texte, Formeln), **XML** (Datenaustausch).
:::

Anders als in einer Textverarbeitung siehst du beim Schreiben den **Quelltext**. Ein Programm (z. B. der Browser) erzeugt daraus die fertige Darstellung.

## Dasselbe in HTML und Markdown

| Element | HTML | Markdown |
|---|---|---|
| Überschrift | `<h1>Titel</h1>`, `<h2>…</h2>` | `# Titel`, `## …` |
| Absatz | `<p>Text</p>` | Leerzeile zwischen Absätzen |
| fett / kursiv | `<strong>`, `<em>` | `**fett**`, `*kursiv*` |
| Aufzählung | `<ul><li>Punkt</li></ul>` | `- Punkt` |
| Nummerierung | `<ol><li>Punkt</li></ol>` | `1. Punkt` |
| Link | `<a href="https://…">Text</a>` | `[Text](https://…)` |
| Bild | `<img src="bild.png" alt="Beschreibung">` | `![Beschreibung](bild.png)` |

## Ein kleines HTML-Dokument

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <title>Unser Wiki: Bienen</title>
  </head>
  <body>
    <h1>Bienen</h1>
    <p>Honigbienen leben in Völkern mit bis zu 50 000 Tieren.</p>

    <h2>Aufgaben im Bienenstock</h2>
    <ul>
      <li>Königin: legt Eier</li>
      <li>Arbeiterinnen: sammeln Nektar</li>
    </ul>

    <img src="biene.jpg" alt="Eine Biene auf einer Lavendelblüte">
    <p>Quelle: <a href="https://de.wikipedia.org/wiki/Honigbienen">Wikipedia</a></p>
  </body>
</html>
```

HTML-Elemente bestehen meist aus einem **öffnenden** und einem **schließenden Tag** und werden **ineinander verschachtelt**, wie ein Baum.

## Inhalt und Design trennen: CSS

Das Aussehen legt man in HTML nicht direkt fest, sondern in **CSS** (*Cascading Style Sheets*):

```css
h1 { color: darkgreen; font-family: sans-serif; }
p  { line-height: 1.6; }
```

Ändert man die CSS-Datei, sieht **jede Seite** des Wikis sofort anders aus. Das Prinzip kennst du von Formatvorlagen (→ [Digitale Medien](../daten-und-informationen/digitale-medien)).

## Verweise und Quellen

Wissenschaftliche Texte brauchen **Literaturverweise** und ein **Literaturverzeichnis**. In HTML nutzt man Links, in **LaTeX** erzeugt ein Befehl wie `\cite{…}` automatisch Verweise und Verzeichnis, eine große Stärke von LaTeX für Facharbeiten.

## Barrierefreiheit

- **Echte Überschriften** statt nur großer fetter Schrift, damit Screenreader die Gliederung vorlesen können
- **Alternativtexte** (`alt`) für Bilder
- **aussagekräftige Linktexte** („Lehrplan Informatik“ statt „hier klicken“)

## Projekt: Unser Wiki

1. Legt als Gruppe ein gemeinsames Dokument an. Recherchiert zu eurem Thema: mindestens drei Kapitel, Fließtext, Stichpunkte, eine Grafik, eine Tabelle und Quellen.
2. Übertragt euren Inhalt nach **HTML** und strukturiert ihn sauber. Nutzt dazu [SyncFiddle](https://syncfiddle.net/) zum gemeinsamen Schreiben und die HTML-Beispieldatei aus LernSax (Rechtsklick → im Texteditor öffnen).
3. **Erweiterung:** Gestaltet euer Wiki mit CSS.
