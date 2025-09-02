# Übungen

## Modellierungsaufgaben (Einstieg)

### Das sprechende Baumhaus

Du kletterst eine knorrige alte Eiche hinauf und findest dich plötzlich in einem magischen Baumhaus wieder. Die Wände sind mit lebendigen Bildern bedeckt, und aus den Bücherregalen flüstern dir Geschichten zu. Eine weise alte Eule sitzt auf einem Ast vor dem Fenster und erklärt dir, dass das Baumhaus seine Magie verliert, weil sein Organisationssystem durcheinander geraten ist. Sie bittet dich um Hilfe bei der Erstellung eines neuen ERMs.

Die Eule erklärt dir Folgendes:

> In unserem Baumhaus gibt es viele magische Räume. Jeder Raum hat einen eindeutigen Namen und eine besondere Eigenschaft. In jedem Raum befinden sich verschiedene verzauberte Gegenstände. Jeder Gegenstand hat einen Namen und eine magische Fähigkeit.

1. Erstelle für obige Anforderungen das ERM.
2. Ergänze alle Primär- und Fremdschlüssel an der richtigen Stelle.
3. Füge den Räumen ein weiteres sinnvolles Attribut hinzu.
4. Erstelle nach deinem ERM folgende SQL-Sätze:
   a. Erstelle für alle CRUD-Operatoren auf die Tabelle "Verzauberte Gegenstände" je ein Beispiel.
   b. Gib alle Räume aus.
   c. Finde alle Gegenstände in einem bestimmten Raum.
   d. Zähle, wie viele Gegenstände es insgesamt gibt.

### Die Zeitkapsel-Werkstatt

In unserer Werkstatt werden Zeitkapseln hergestellt. Jede Zeitkapsel hat ein Zieljahr und eine Beschreibung. Zeitkapseln werden nach einer berühmten Wissenschaftlerin eindeutig benannt. In jeder Zeitkapsel werden verschiedene Gegenwartsartefakte aufbewahrt. Jedes Artefakt hat einen Namen und ein Herstellungsjahr.

1. Erstelle für obige Anforderungen das ERM.
2. Ergänze alle Primär- und Fremdschlüssel an der richtigen Stelle.
3. Füge den Zeitkapseln ein weiteres sinnvolles Attribut hinzu.
4. Erstelle nach deinem ERM folgende SQL-Sätze:
   a. Erstelle für alle CRUD-Operatoren auf die Tabelle "Zeitkapseln" je ein Beispiel.
   b. Gib alle Artefakte aus.
   c. Finde alle Artefakte in einer bestimmten Zeitkapsel.
   d. Zähle, wie viele Zeitkapseln es insgesamt gibt.

### Das kosmische Recycling-Zentrum

Ein Sternschnuppen-Shuttle bringt dich zu einer schwebenden Raumstation, die aussieht wie ein gigantischer Würfel aus glitzerndem Weltraumschrott. Du schwebst durch die Luftschleuse und wirst von einem freundlichen Alien mit sechs Armen begrüßt. Es erklärt dir, dass dies das kosmische Recycling-Zentrum ist, wo Weltraumschrott in nützliche Dinge umgewandelt wird.

Das Alien gibt dir folgende Details:

> Unser Zentrum sammelt verschiedene Arten von Weltraumschrott. Jedes Schrottteil hat eine eindeutige ID und ein Gewicht. Aus dem Schrott stellen wir recycelte Produkte her. Jedes Produkt hat einen Namen und einen Verwendungszweck.

1. Erstelle für obige Anforderungen das ERM.
2. Ergänze alle Primär- und Fremdschlüssel an der richtigen Stelle.
3. Füge dem Weltraumschrott ein weiteres sinnvolles Attribut hinzu.
4. Erstelle nach deinem ERM folgende SQL-Sätze:
   a. Erstelle für alle CRUD-Operatoren auf die Tabelle "Recycelte Produkte" je ein Beispiel.
   b. Gib allen Weltraumschrott aus.
   c. Finde alle Schrottteile, die für ein bestimmtes Produkt verwendet wurden.
   d. Zähle, wie viele recycelte Produkte es insgesamt gibt.

## Modellierungsaufgaben (Fortgeschritten)

### Der Bibliothekar

Du bist in einer dunklen Gasse falsch abgebogen und findest dich unversehens in einer großen Halle voller Bücher wieder. Gerade als du beschließt zu gehen, erhebt sich hinter einem Stapel veralteter Lexika ein alter Mann und blickt dich mit traurigen, grauen Augen an. Er bittet dich ihm bei seinem ERM zu helfen.

Ein jedes Buch hat seinen Platz in einem Regal. Dabei wird der Platz in dem Regal durch das Regalbrett genauer bestimmt. Alle Regale befinden sich in diesem Saal. Die Bücher werden verschiedenen Genres zugeordnet. Beispielsweise ist das Werk "Der Frosch zu Gast bei Helmut" nicht nur eine Komödie, sondern auch ein Krimi.

1. Erstelle für obige Anforderungen das ERM.
2. Ergänze alle Primär- und Fremdschlüssel an der richtigen Stelle.
3. Füge den Büchern weitere sinnvolle Attribute hinzu.
4. Erstelle nach deinem ERM folgende SQL-Sätze:
   - Erstelle für alle CRUD-Operatoren auf die Tabelle Bücher je ein Beispiel
   - Gib alle Bücher aus
   - Gib alle Bücher mit dem Titel "Der Frosch zu Gast bei Helmut" aus
   - Finde alle Bücher die im Titel "Helmut" tragen
   - Zähle alle Bücher
5. Dich beschleicht ein schrecklicher Verdacht. Hinter einem verschlissenen Vorhang befindet sich eine weitere Kammer mit Büchern. Passe dein ERM so an, dass statt des einzelnen Saals auch die Kammer mit erfasst werden kann.

## Modellierungsaufgaben (Geübt)

1. Erstelle für eine bestehende Webseite, Anwendung oder App das vermutlich zugrundeliegende Datenbankmodell als ERM. Gut geeignet sind etwa:
   - Online-Shops
   - Musikstreamingdienste
   - Ticketverkaufsdienste
   - Spiele
2. Ergänze alle Primär- und Fremdschlüssel an der richtigen Stelle.
3. Erstell drei beispielhafte Datenabfragen.
