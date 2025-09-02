# Datenoperationen

## CRUD

CRUD ist die Abkürzung für Create Read Update und Delete. Damit lassen sich alle grundlegenden Operationen mit Daten durchführen.

### INSERT

1. Füge zwei ausgedachte Datensätze nach folgendem Muster ein:

```sql
INSERT INTO users (username, email, password, name, bio, gender, birthday, city, country, centimeters, avatar, role, is_active, remember_token, created_at, updated_at)
VALUES ('guenther37', 'guenther@instahub.test', '12345', 'Günther Müller', 'Günther mag Kartoffelsalat.', 'male', '2006-06-06 00:00:00', 'Leipzig', 'Deutschland', '173', 'avatar.png', 'user', '0', NULL, now(), now());
```

1. Was bedeutet `now()`?

**Expertenaufgabe:** Wieso wird in dem obigen SQL-Befehl die ID nicht mit übergeben?

1. Welche ID hat der neue Datensatz? Auf welche Arten können diese ermittelt werden?
2. Füge den User Mila Bach aus Hamburg hinzu. Du kannst dir die fehlenden Attribute selbst ausdenken.
3. Registriere dich in deinem InstaHub, indem du im privaten Modus deines Browsers deinen Hub aufrufst und auf Registrieren klickst.
4. Prüfe nun wieder als admin, welche ID das neue Mitglied erhalten hat.

### SELECT

Schau gern direkt bei [Datenbankabfragen](./datenabfragen.md) rein.

### UPDATE

1. Setze die Körpergröße von allen Mitgliedern auf 160.
2. Ändere in dem zuletzt hinzugefügten Eintrag die Stadt auf Dresden. (Du kannst die ID mit einem extra SELECT-Befehl ermitteln.)
3. Ersetze den Begriff "Germany" überall durch "Deutschland".
4. Ersetze die Körpergröße mit dem Wert `FLOOR(RAND()*45)+150`
5. Was hat dieser Befehl bewirkt?
6. Recherchiere was die Befehle FLOOR und RAND bewirken.

### DELETE

1. Lösche den vorletzten Datensatz.
