---
title: "③ Daten austauschen"
description: "Daten zwischen Systemen austauschen mit standardisierten Formaten wie CSV, JSON, XML und SQL-Dump, über APIs sowie Open Data."
---

# ③ Daten austauschen <Badge type="info" text="Oberstufe" />

Die Schulbibliothek möchte ihren Bestand mit der Stadtbibliothek teilen, und die Stadtbibliothek nutzt ein ganz anderes Programm. Damit das klappt, braucht man **standardisierte Datenformate**.

## Derselbe Datensatz in drei Formaten

**CSV** (*Comma-Separated Values*): einfache Tabellen, eine Zeile pro Datensatz

```csv
buch_id;titel;jahr;seiten
3;Tschick;2010;256
4;Krabat;1971;336
```

**JSON** (*JavaScript Object Notation*): verschachtelte Daten, sehr verbreitet im Web

```json
[
  { "buch_id": 3, "titel": "Tschick", "jahr": 2010, "autor": { "name": "Wolfgang Herrndorf" } },
  { "buch_id": 4, "titel": "Krabat",  "jahr": 1971, "autor": { "name": "Otfried Preußler" } }
]
```

**XML** (*Extensible Markup Language*): hierarchisch mit selbst definierten Tags

```xml
<bestand>
  <buch id="3">
    <titel>Tschick</titel>
    <jahr>2010</jahr>
  </buch>
</bestand>
```

| Format | Stärken | Schwächen |
|---|---|---|
| CSV | winzig, öffnet sich in jeder Tabellenkalkulation | keine Verschachtelung, Trennzeichen-Chaos (`,` oder `;`) |
| JSON | kompakt, verschachtelbar, gut für Programme | weniger gut von Hand zu lesen bei großen Daten |
| XML | sehr strukturiert, prüfbar gegen Regeln | viel „Drumherum“ |

**SQL-Dump:** eine Textdatei mit allen `CREATE TABLE`- und `INSERT`-Befehlen, um eine **komplette Datenbank** zu sichern oder umzuziehen.

## APIs

::: info Merke: API
Eine **API** (*Application Programming Interface*) ist eine **Schnittstelle**, über die Programme **automatisch** Daten von einem anderen System abfragen können, meist über das Internet und im JSON-Format.
Beispiel: Deine Wetter-App fragt über eine API bei einem Wetterdienst die Vorhersage für deinen Ort ab.
:::

## Open Data

**Offene Daten** werden von Behörden, Städten oder Forschungseinrichtungen **frei zur Nutzung** veröffentlicht: Fahrpläne, Luftqualität, Bevölkerungszahlen, Wahlergebnisse. Ein zentrales Portal in Deutschland ist [GovData](https://www.govdata.de/).

::: tip Aufgabe
Suche auf GovData oder dem Open-Data-Portal deiner Stadt einen Datensatz, der dich interessiert. In welchem Format liegt er vor? Öffne ihn und formuliere eine Frage, die du damit beantworten könntest.
:::
