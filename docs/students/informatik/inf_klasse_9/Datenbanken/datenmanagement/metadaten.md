# Metadaten

Metadaten sind Daten über Daten. Sie fallen an, wenn du etwa ein Foto machst. Dann wird der Ort und der Zeitpunkt mit in dem Foto gespeichert. Während es zwar möglich aber aufwendig ist, den Inhalt von Bildern zu erkennen, ist es sehr einfach möglich mithilfe von Metadaten von Bildern Informationen zu extrahieren. Das kann soweit gehen, dass bei der Auswertung die Metadaten spannender sind, als die eigentlichen Daten.

## Tracking im Internet

Hier findest du mit vielen spannenden Übungen aufbereitet, wie dein Mobilfunkanbieter, Google, Apps, Amazon und andere Webseiten Daten über dich sammeln und auswerten:

[https://buch.informatik.cc/tracking/](https://buch.informatik.cc/tracking/)

## Tracking auf InstaHub

::: warning Achtung
Für diesen Abschnitt benötigst du ein wenig Hintergrundwissen über Datenbanken.
:::

::: info Aufgabe
Öffne einen gut besuchten Hub auf [InstaHub.org](http://instahub.org/) etwa [public.instahub.org](https://public.instahub.org/) und untersuche das Nutzungsverhalten der Benutzer.
:::

## Werbung auf InstaHub

::: warning Achtung
Für diesen Abschnitt benötigst du grundlegende Kenntnisse in SQL.
:::

Lege dir mit deiner Lehrer:in einen Hub auf [InstaHub.org](http://instahub.org/) an.

::: info Aufgabe
Erstelle die folgenden beiden Werbeanzeigen und beobachte, wo diese erscheinen.

```sql
INSERT INTO `ads` (`id`, `priority`, `name`, `type`, `url`, `img`, `query`, `created_at`, `updated_at`) VALUES
(7, 3, 'andromeda ', 'photo', '/noad', '/img/ad/smoothie.jpg', 'SELECT id FROM users WHERE id=$user', '2018-10-07 21:58:59', '2018-10-07 21:58:59'),
(8, 3, 'burgerhaus', 'banner', '/noad', '/img/ad/brokkolie.jpg', 'SELECT id FROM users WHERE id=$user', '2018-10-07 21:58:59', '2018-10-07 21:58:59');
```
:::

::: info Aufgabe
Erstelle 4 selbst ausgedachte Regeln für verschiedene Werbeanzeige (Die Bilder findest du im Menüeintrag 'Business').

**Hinweis:** Lies dir unbedingt die [Dokumentation](https://wi-wissen.github.io/instahub-doc-de/#/frontend?id=business) dazu durch.
:::
