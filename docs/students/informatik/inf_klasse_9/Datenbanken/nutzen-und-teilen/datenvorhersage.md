# Datenvorhersage

## Kommentare und Likes

Ein alter Freund aus der Mathematik ist die lineare Regression. Mit dieser kann man durch bestehende Datenpunkte eine mathematische Funktion legen, die zu allen Punkten einen möglichst geringen Abstand hat. Kommt später ein neuer Datenpunkt dazu, kann man fehlende Eigenschaften errechnen.

Mit diesem Programm haben wir errechnet, wie sich die Likes in Abhängigkeit der Kommentare (bzw. andersrum) entwickeln.

## Freundschaft und Liebe

Wer kennt wen? Und noch wichtiger, wer könnte wen kennen? So findest du deine Freunde in einem sozialen Netz, die du im echten Leben kennst, aber noch nicht im Internet gefunden hast. Oder du suchst die große Liebe? Aber bei wem ist es ein "Match"? Das versuchen Algorithmen herauszufinden.

### Der InstaHub-Algorithmus

Eine einfache Idee wurde etwa hier in InstaHub für neue spannende Menschen für dich umgesetzt:

Stell dir vor, du bist Ayla und suchst neue Freunde in InstaHub. Der Algorithmus hilft dir dabei, indem er drei Hauptfaktoren berücksichtigt:

1. **Gemeinsame Follows (4 Punkte pro Übereinstimmung):** Der Algorithmus schaut, wem du und andere Nutzer folgen. Beispiel: Du und Bao folgt beide der Nutzerin modelunatica.

2. **Gemeinsame Follower (1 Punkt pro Übereinstimmung):** Es wird geprüft, wer dir und anderen Nutzern folgt. Beispiel: Dir und Chris folgt fitnessfuchs_luca.

3. **Aktivität des Nutzers (0,1 Punkte pro Foto):** Der Algorithmus zählt, wie viele Fotos jeder Nutzer hochgeladen hat. Beispiel: Bao hat 50 Fotos hochgeladen und bekommt dafür 5 Punkte.

Der Algorithmus addiert alle Punkte für jeden Nutzer. Je mehr Punkte, desto wahrscheinlicher ist es, dass dieser Nutzer dir vorgeschlagen wird. So sollten die Nutzer einerseits für dich interessant aber zugleich auch aktiv sein.

Nehmen wir an, der Algorithmus vergleicht dich (Ayla) mit Bao und Chris:

1. **Bao:**
   - 5 gemeinsame Follows (5 × 4 = 20 Punkte)
   - 2 gemeinsame Follower (2 × 1 = 2 Punkte)
   - 50 Fotos hochgeladen (50 × 0,1 = 5 Punkte)
   - **Gesamt: 27 Punkte**

2. **Chris:**
   - 2 gemeinsame Follows (2 × 4 = 8 Punkte)
   - 10 gemeinsame Follower (10 × 1 = 10 Punkte)
   - 10 Fotos hochgeladen (10 × 0,1 = 1 Punkt)
   - **Gesamt: 19 Punkte**

In diesem Fall würde der Algorithmus dir zuerst Bao und dann Chris als neue Freunde vorschlagen.

### Maschinelles Lernen

Nun ist der obige Algorithmus sicher eine Idee, aber wie gut er ist, wissen wir ehrlich gesagt nicht. Wie viele Freunde oder Matches sind uns entgangen? Wie schön wäre es, wenn wir einfach beobachten würden, wer mit wem und dann im gleichen Muster Vorschläge unterbreiten können? Fitnessfan mit Bücherfan oder eher gleiche Augenfarbe?

Wir schauen uns das am Beispiel eines neuronalen Netzwerks an.

Ganz grob können wir uns den Vorgang etwa beim Unterscheiden von Hunden und Katzen so vorstellen:

Es gibt Eingabeneuronen, die Merkmale des Hunde- oder Katzenbildes erhalten. Diese sind über mehrere Schichten miteinander alle miteinander verbunden und am Ende erhält man eine Wahrscheinlichkeitsbestimmung. Ist diese falsch, so werden die Verbindungen der künstlichen Neuronen anders bewertet.

Die Wahl der Eingangsneuronen ist wichtig. Sie bestimmt, ob Chance auf Erfolg besteht. Wir untersuchen in InstaHub diese Größen:

- Altersunterschied
- Gleiche Stadt
- Größenunterschied
- Gleiches Geschlecht

Diese Daten wurden bereits exportiert und hier aufbereitet.

Wir erhalten dieses Ergebnis:

```
             Feature  Gewicht
0     age_difference    -0.58
1          same_city     0.97
2  height_difference    -0.00
3        same_gender    -0.37
```

Das heißt, wir können uns unser Neuronales Netz so vorstellen:

Negative Werte sind abträglich, während positive Werte förderlich sind.

Rechnet man dies nun für alle bestehenden und potenziellen Freunde von Mila Rosendahl durch, so erhält man folgendes Ergebnis:

```
Aktuelle Freund:innen (9):
 - Lian Schäfer: Wahrscheinlichkeit: 0.38
 - Joel Berghaus: Wahrscheinlichkeit: 0.38
 - Amelie Kornblume: Wahrscheinlichkeit: 0.30
 - Mira Rosenstein: Wahrscheinlichkeit: 0.30
 - Matteo Pfeifer: Wahrscheinlichkeit: 0.28
 - Julian Berger: Wahrscheinlichkeit: 0.28
 - Noah Schneider: Wahrscheinlichkeit: 0.28
 - Samuel Brinkmann: Wahrscheinlichkeit: 0.19
 - Jette Dornbusch: Wahrscheinlichkeit: 0.14

Potentielle Freund:innen (Top 10 von 306):
 - Amelie Kirchhoff: Wahrscheinlichkeit: 0.21
 - Jannik Wegener: Wahrscheinlichkeit: 0.20
 - Lennard Gehrke: Wahrscheinlichkeit: 0.19
 - Neville Rottmann: Wahrscheinlichkeit: 0.19
 - Simon Reiter: Wahrscheinlichkeit: 0.19
 - Moritz Schindler: Wahrscheinlichkeit: 0.19
 - Matteo Ziegler: Wahrscheinlichkeit: 0.19
 - Luca Bergstein: Wahrscheinlichkeit: 0.19
 - Lenny Weidner: Wahrscheinlichkeit: 0.19
 - Vincent Eberhardt: Wahrscheinlichkeit: 0.19
```
