# Datenbankmanagementsystem

Daten in einer Datenbank gemeinsam zu bearbeiten und zu verwalten ist ziemlich schwierig. Lass uns mal folgendes Beispiel von der Landesbank Oberlausitz (LOL) ansehen:

Niamh und Hedda stehen in je einer Niederlassung der LOL am Schalter und möchten sich gegenseitig jeweils gleichzeitig 50€ überweisen. Dabei glucksen sie vor Freude.

Ohne Vorkehrungen könnte jetzt folgendes passieren:

**Aufgabe:** Notiere dir nach jeden Schritt den Kontostand der beiden, wenn Niamh mit 100€ und Hedda mit 200€ gestartet ist.

Um die Probleme zu lösen, die wir im Bankbeispiel gesehen haben, werden Datenbanken (DB) durch Datenbankmanagementsysteme (DBMS) verwaltet. Gemeinsam ergeben Sie ein Datenbanksystem (DBS).

Diese DBMS wenden die Prinzipien des ACID-Modells an. Hier ist, wie eine ACID-konforme Lösung aussehen würde:

Zunächst würde das Datenbankmanagementsystem (DBMS) jede Überweisung als eine Transaktion behandeln. Eine Transaktion ist eine Folge von Datenbankoperationen, die als eine Einheit ausgeführt werden. In unserem Fall besteht jede Transaktion aus zwei Operationen: dem Abbuchen vom Konto des Senders und dem Gutschreiben auf dem Konto des Empfängers.

Um die **Atomarität** zu gewährleisten, würde das DBMS sicherstellen, dass entweder beide Operationen einer Transaktion erfolgreich durchgeführt werden oder keine von beiden. Wenn also bei Niamhs Überweisung an Hedda ein Fehler auftritt, nachdem das Geld von Niamhs Konto abgebucht wurde, würde das System automatisch ein Rollback durchführen und Niamhs Kontostand auf den ursprünglichen Wert zurücksetzen.

Für die **Konsistenz** würde das System vor und nach jeder Transaktion prüfen, ob alle definierten Integritätsbedingungen erfüllt sind. In unserem Fall könnte eine solche Bedingung sein, dass kein Konto einen negativen Saldo haben darf oder Beträge immer in Euro in dem Format `1,23` und nicht in Cent eingeben werden müssen. Wenn eine Transaktion diese Bedingung verletzen würde, würde sie abgebrochen.

Die **Isolation** wird durch Sperrmechanismen oder Versionierung erreicht. Bei der Verwendung von Sperren würde das System vorübergehend den Zugriff auf die betroffenen Konten blockieren, während eine Transaktion läuft. So könnte Bankangestellter B nicht auf Heddas Konto zugreifen, während Bankangestellter A gerade eine Transaktion damit durchführt. Alternativ könnte das System mit Versionierung arbeiten, wobei jede Transaktion mit einer "Schnappschuss"-Version der Daten arbeitet und Änderungen erst nach erfolgreicher Durchführung aller Transaktionen zusammengeführt werden.

Zur Gewährleistung der **Dauerhaftigkeit** würde das DBMS jede abgeschlossene Transaktion in einem dauerhaften Speicher, wie einer Festplatte, sichern. Da dies aus Performance-Gründen nicht sofort geschieht, würde es ein Transaktionsprotokoll führen, das alle Änderungen aufzeichnet. Im Falle eines Systemausfalls könnte das DBMS dieses Protokoll nutzen, um den letzten konsistenten Zustand wiederherzustellen.
