# Übung Tracking und Werbung

## Tabelle Analytics (Tracking)

```sql
CREATE TABLE `analytics` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ip` varchar(191) NOT NULL,
  `device` varchar(191) NOT NULL,
  `brand_family` varchar(191) NOT NULL,
  `brand_model` varchar(191) NOT NULL,
  `browser_family` varchar(191) NOT NULL,
  `browser_version` varchar(191) NOT NULL,
  `platform_family` varchar(191) NOT NULL,
  `platform_version` varchar(191) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `photo_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`photo_id`) REFERENCES `photos`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
)
```

1. Verstehe den obigen SQL-Befehl.
2. Führe den obigen SQL-Befehl aus.
3. Rufe mehrere Bilder in der Einzelansicht auf und beobachte, welche Einträge in der Tabelle hinzugekommen sind.

## Tabelle Ads (Werbung)

```sql
CREATE TABLE `ads` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `priority` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `type` enum('banner','photo') NOT NULL,
  `url` varchar(191) NOT NULL,
  `img` varchar(191) NOT NULL,
  `query` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
```

1. Verstehe den obigen SQL-Befehl.
2. Führe den obigen SQL-Befehl aus.
3. Erstelle mit dem folgenden SQL-Befehl zwei Werbeanzeigen

```sql
INSERT INTO `ads` (`id`, `priority`, `name`, `type`, `url`, `img`, `query`, `created_at`, `updated_at`) VALUES
(7, 99, 'andromeda ', 'photo', '/noad', '/img/ad/smoothie.jpg', 'SELECT id FROM users WHERE id=$user', '2020-05-15 21:58:59', '2020-05-15 21:58:59'),
(8, 99, 'burgerhaus', 'banner', '/noad', '/img/ad/brokkolie.jpg', 'SELECT id FROM photos WHERE id=$photo', '2020-05-15 21:58:59', '2020-05-15 21:58:59');
```

4. Erstelle eine selbstausgedachte Regel für eine Werbeanzeige.

Hier findest du in der Dokumentation eine Erklärung, wie die Werbeanzeigen funktionieren. Du kannst vorgegebenen Werbeanzeigen aus dem Menueintrag Kampagnen umsetzen oder dir selbst eine Anzeige ausdenken. Dazu entwirfst du die Werbung auf deinem Rechner und lädst diese anschließend als Photo hoch. Jetzt kannst du den Link zu diesem Bild (nicht der Photo-Seite!) verwenden.
