---
title: "③ Tracking & Werbung"
description: "Wie Apps, Websites und Kundenkarten Daten sammeln, Nutzerprofile bilden und personalisierte Werbung ausspielen, und was mit Standortdaten passieren kann."
---

# ③ Tracking & Werbung <Badge type="tip" text="Klasse 9" />

Viele Apps und Websites sind **kostenlos**. Trotzdem verdienen die Anbieter Milliarden. Wie?

::: info Merke: Tracking
**Tracking** bedeutet, das **Verhalten** von Nutzer:innen über längere Zeit und oft über verschiedene Websites und Apps hinweg **aufzuzeichnen**. Aus den gesammelten Daten entsteht ein **Profil** (Interessen, Wohnort, Alter, Kaufkraft …), mit dem **personalisierte Werbung** verkauft wird.
:::

## Wie wird getrackt?

| Methode | Was passiert? |
|---|---|
| **Cookies** | kleine Dateien im Browser, die dich beim nächsten Besuch wiedererkennen, auch auf fremden Seiten (Third-Party-Cookies) |
| **App-Berechtigungen** | Zugriff auf Standort, Kontakte, Mikrofon (→ [Persönliche Daten](../../informationssicherheit/persoenliche-daten)) |
| **Nutzungsverhalten** | Was du likest, wie lange du ein Video ansiehst, wann du die App öffnest |
| **Kundenkarten und Rabatt-Apps** | Rabatt im Tausch gegen **jeden Einkauf** mit Uhrzeit und Filiale |
| **Werbe-IDs** | eine Nummer deines Handys, über die verschiedene Apps dich demselben Profil zuordnen |

## Beispiel: Rabatt-App im Supermarkt

Du bekommst 10 % Rabatt auf Schokolade. Dafür weiß der Supermarkt:
- **was** du kaufst (vegetarisch? Energy-Drinks? Babynahrung?)
- **wann** und **wo** du einkaufst
- **wie sich dein Leben verändert** (plötzlich Windeln im Einkaufskorb …)

::: warning Daten als Handelsware
Standortdaten aus Apps werden teilweise über **Datenhändler** weiterverkauft. Journalist:innen konnten auf diesem Weg Datensätze kaufen, in denen sich einzelne Personen bis zu ihrer Wohnadresse und ihrem Arbeitsplatz verfolgen ließen.
:::

## Die SQL-Sicht auf Werbung

Hinter „Das könnte dich auch interessieren“ steckt oft nichts anderes als eine Datenbankabfrage:

```sql
SELECT nutzer_id FROM likes
WHERE kategorie = 'Fitness' AND alter_jahre BETWEEN 14 AND 18;
-- → Allen gefundenen Nutzer:innen wird die Anzeige für Proteinriegel gezeigt.
```

## Aufgaben

1. Überlege: Welche Werbung wurde dir zuletzt angezeigt? Welche Daten könnte die App verwendet haben, um genau **dich** auszuwählen?
2. Formuliere drei eigene „Werberegeln“ als SQL-Abfrage wie oben. Welche davon findest du **unfair** oder **manipulativ**?
3. Viele spannende Übungen dazu, wie Mobilfunkanbieter, Apps und Websites Daten sammeln: [Informatikbuch – Tracking](https://buch.informatik.cc/tracking/)
