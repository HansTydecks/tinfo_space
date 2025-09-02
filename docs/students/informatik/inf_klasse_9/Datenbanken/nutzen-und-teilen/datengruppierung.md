# Datengruppierung

Das Gruppieren oder Clustern von Daten ermöglicht es Cluster (Gruppen) zu finden, und so...

In kleinen Datenmengen mit nur zwei Eigenschaften kann man Cluster noch gut als Mensch sehen. Danach bedarf es oft eines mathematischen Vorgehens.

## Likes pro Fotos

Hier siehst du die Likes eines Fotos in Abhängigkeit der Follower des Urhebers.

**Aufgabe:** Erkennst du ein Muster?

## Nutzer nach Nutzungsverhalten

Lass uns schauen, ob wir anhand der hochgeladenen Fotos und Kommentare Gruppen unserer Benutzern finden.

Dazu sehen wir uns zuerst an, wie das grundsätzlich alles funktionieren wird. Dazu sehen wir in folgendem Video, wie man Menschen anhand ihrer Nutzungszeiten von Social Media und wie oft sie ins Fitnessstudio gehen gruppiert.

### Zettel & Stift (oder Tabellenkalkulation)

Wir betrachten die Aktivität von fünf Nutzern auf InstaHub. Die folgende Tabelle zeigt die Anzahl der hochgeladenen Fotos und geschriebenen Kommentare für jeden Nutzer in den letzten 30 Tagen:

| Nutzer | Fotos | Kommentare |
|--------|-------|------------|
| Ayla   | 20    | 15         |
| Bao    | 2     | 3          |
| Chris  | 18    | 12         |
| Dagur  | 1     | 2          |
| Ella   | 10    | 8          |

**Aufgabe:** Lass uns das zuerst per Hand machen: Eure Aufgabe ist es, diese Nutzer mithilfe des hierarchischen Clusterings in Gruppen einzuteilen.

Folgt dazu diesen Schritten:

1. Berechnet die Manhattan-Distanz zwischen allen Nutzerpaaren.
2. Erstellt eine Distanzmatrix mit den berechneten Werten.
3. Führt die Cluster-Bildung schrittweise durch, indem ihr immer die zwei nächstgelegenen Cluster zusammenführt.
4. Berechnet für jedes neue Cluster den Mittelpunkt.
5. Zeichnet am Ende ein Dendrogramm, das den Clustering-Prozess visualisiert.

#### Lösungsschritte

1. **Berechnung der Manhattan-Distanz:**
   - Formel: d = |x₁ - x₂| + |y₁ - y₂|
   - Beispiel für A und B: d = |20 - 2| + |15 - 3| = 18 + 12 = 30

2. **Erstellen der Distanzmatrix:**
   - Berechnet die Distanzen zwischen allen Nutzerpaaren
   - Tragt die Werte in eine symmetrische Matrix ein

3. **Cluster-Bildung:**
   - Identifiziert die kleinste Distanz in der Matrix
   - Fasst diese zwei Nutzer/Cluster zusammen
   - Berechnet den Mittelpunkt des neuen Clusters: (Durchschnitt der Fotos, Durchschnitt der Kommentare)
   - Berechnet die neue Distanz von diesem Mittelpunkt zu anderen Clustern/Nutzern
   - Wiederholt den Vorgang, bis alle Nutzer in einem Cluster sind

4. **Zeichnen des Dendrogramms:**
   - Stellt jeden Nutzer als Blatt dar
   - Verbindet die Cluster entsprechend ihrer Zusammenführung
   - Die Höhe der Verbindung entspricht der Distanz zwischen den Clustern

#### Tabellenkalkulation

Du kannst eine Tabellenkalkulation verwenden, um dir viel manuelle Rechenarbeit zu sparen und trotzdem alle Schritte durchzugehen.

### Automatisch in Python

**Aufgabe:** Schaue in den folgenden Analysen, ob wir anhand der hochgeladenen Fotos, vergebenen Likes und Followeranzahl Gruppen in unseren Benutzern finden.
