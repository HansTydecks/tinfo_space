---
outline: deep
title: Reguläre Ausdrücke -- Datensatz retten
---

# Reguläre Ausdrücke -- Datensatz retten

## Szenario

Die Schule plant eine große Sonntagsveranstaltung.\
Leider ist das Anmeldesystem abgestürzt. Übrig geblieben ist nur eine
große Textdatei mit vielen Einträgen.

Einige Daten sind korrekt -- andere enthalten Fehler.

Eure Aufgabe als Informatik‑Team:

👉 **Findet mithilfe regulärer Ausdrücke alle gültigen Daten heraus.**

## Ziel

Aus dem Datensatz sollen drei Arten von Informationen herausgefiltert werden:

-   ✅ alle **E‑Mail‑Adressen**
-   ✅ alle **Namen** (Vorname Nachname)
-   ✅ alle **Telefonnummern**

Am Ende habt ihr herausgefunden:

-   Wie viele gültige E‑Mails gibt es?
-   Wie viele gültige Namen gibt es?
-   Wie viele Telefonnummern wurden gefunden?

### Aufgabe 1 - E‑Mails
Um die <a href="/regex_datensatz.txt" download>Daten</a> zu prüfen, öffne folgende Seite: https://regex101.com/. Hier kannst du sowohl die Daten (Test String) als auch deinen Ausdruck eingeben.
Findet alle gültigen E‑Mail‑Adressen.
::: details Ausdrücke
Beliebige Buchstabenfolge: `\w`
Mindestens ein Buchstabe: `\w+`
Ein einfacher . (Punkt): `.`
:::

Notiert die Gesamtanzahl.

### Aufgabe 2 -- Namen

Findet alle korrekt geschriebenen Namen.
Korrekte Namen sind z.B Max Mustermann.
Als falsch gilt z.B. anne 123

1. Überlege dir, welchem Muster die Namen folgen.
2. Formuliere einen regulären Ausdruck 

::: details Ausdrücke
Großbuchstaben werden wie folgt gefunden: `[A-Z]`
Kleinbuchstaben analog dazu.
:::

Notiert die Gesamtanzahl.

### Aufgabe 3 -- Telefonnummern

Findet alle Telefonnummern.

Überlegt: - Welche Struktur haben die Telefonnummern im Datensatz? - Welche Varianten könnten auftreten? Prüft dazu den Datensatz.

Notiert die Gesamtanzahl.

::: details Ausdrücke
Um auf eine bestimmte Anzahl von Ziffern zu prüfen nutzen wir `\d{ANZAHL}` z.B. `\d{3}` prüft, ob genau drei Ziffern zu finden sind.
:::
## Reflexion

1.  Prüft der Computer die Bedeutung oder nur die Form?
2.  Was hat das mit **Syntax** zu tun?
3.  Warum kann man sagen, dass reguläre Ausdrücke eine *Sprache*
    beschreiben?

