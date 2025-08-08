---
title: "Komplexe Übungen und Projektarbeit"
description: "Anspruchsvolle Aufgaben, die alle gelernten Konzepte kombinieren."
---

## Ziele
- Alle gelernten Konzepte in komplexeren Programmen anwenden
- Eigenständige Problemlösung entwickeln
- Programme planen und strukturieren

## Komplexe Projekte

### Projekt 1: Interaktiver Taschenrechner

Schreibe ein umfassendes Taschenrechner-Programm, das:
1. Den Benutzer nach zwei Zahlen fragt
2. Nach der gewünschten Operation fragt (+, -, *, /, Potenz)
3. Das Ergebnis berechnet und anzeigt
4. Fragt, ob eine weitere Rechnung durchgeführt werden soll
5. Bei Division durch 0 eine Fehlermeldung ausgibt

Verwende dafür:
- Benutzereingaben mit `input()`
- Funktionen für jede Rechenart
- While-Schleife für Wiederholung
- Verknüpfte Bedingungen für Eingabe-Validierung

### Projekt 2: Mustergenerator

Erstelle ein Programm, das dem Benutzer verschiedene Muster zur Auswahl anbietet:
- "1" für Spirale: Zeichnet eine Spirale mit 50 Schritten
- "2" für Blume: Zeichnet 8 Kreise um einen Mittelpunkt herum
- "3" für Stern-Explosion: Zeichnet 20 Linien vom Mittelpunkt nach außen
- "4" für Zufallskunst: 15 zufällige Formen in zufälligen Farben
- "5" für Regenbogen-Spirale: Spirale mit wechselnden Farben

Anforderungen:
- Verwende für jedes Muster eine eigene Funktion
- Nutze Schleifen und Zufallszahlen
- Lass den Benutzer Parameter eingeben (z.B. Größe, Anzahl)

### Projekt 3: Geometrie-Quiz

Schreibe ein interaktives Quiz-Programm:
1. Generiere zufällige geometrische Aufgaben:
   - Kreisumfang bei gegebenem Radius
   - Rechteckfläche bei gegebenen Seiten
   - Dreieckswinkel (180° - andere Winkel)
2. Frage den Benutzer nach der Lösung
3. Vergleiche mit der korrekten Antwort
4. Führe Statistik (richtige/falsche Antworten)
5. Gib am Ende eine Bewertung aus

### Projekt 4: Turtle-Kunstgalerie

Erstelle ein Programm, das verschiedene Kunstwerke zeichnet:

```python
def fraktal_baum(laenge, winkel, tiefe):
    """Zeichnet einen Fraktal-Baum"""
    if tiefe == 0:
        return
    
    t.forward(laenge)
    t.left(winkel)
    fraktal_baum(laenge * 0.7, winkel, tiefe - 1)
    t.right(2 * winkel)
    fraktal_baum(laenge * 0.7, winkel, tiefe - 1)
    t.left(winkel)
    t.backward(laenge)

def mandala(groesse, details):
    """Zeichnet ein Mandala"""
    for i in range(details):
        t.circle(groesse)
        t.right(360 / details)

def koch_schneeflocke(laenge, ordnung):
    """Zeichnet eine Koch-Schneeflocke"""
    # Implementierung für fortgeschrittene Schüler
```

## Herausfordernde Einzelaufgaben

### Aufgabe 1: Zahlenrätsel
Programmiere ein Zahlenratespiel:
- Computer wählt zufällige Zahl zwischen 1-100
- Benutzer rät, Computer gibt Hinweise ("zu hoch", "zu niedrig")
- Zähle die Anzahl der Versuche
- Nach dem Spiel: Statistik über bisherige Spiele

### Aufgabe 2: Turtle-Grafik-Editor
Erstelle einen einfachen Grafik-Editor:
- Menü mit verschiedenen Zeichenoptionen
- Benutzer kann Farben wählen
- Verschiedene Formen verfügbar
- "Radiergummi"-Funktion (weiße Farbe)
- Speichern/Laden von Zeichnungen (als Koordinatenliste)

### Aufgabe 3: Labyrinth-Generator
Generiere einfache Labyrinthe:
- Erstelle ein Gitter aus Linien
- Entferne zufällig Wände um Wege zu schaffen
- Stelle sicher, dass Start und Ziel erreichbar sind
- Bonus: Löse das Labyrinth automatisch

### Aufgabe 4: Wetter-Simulation
Simuliere Wetter-Daten:
- Generiere zufällige Temperaturen über 30 Tage
- Berechne Durchschnitt, Maximum, Minimum
- Zeichne ein einfaches Diagramm der Temperaturen
- Vorhersage für den nächsten Tag basierend auf Trend

## Bewertungskriterien für Projekte

Bei der Bewertung eurer Projekte achte ich auf:

1. **Funktionalität**: Läuft das Programm fehlerfrei?
2. **Code-Qualität**: Ist der Code sauber strukturiert und kommentiert?
3. **Verwendung der Konzepte**: Werden Funktionen, Schleifen, Bedingungen sinnvoll eingesetzt?
4. **Kreativität**: Eigene Ideen und Erweiterungen
5. **Problemlösung**: Wie werden Herausforderungen gelöst?

## Zusammenfassung des Kurses

In diesem Python-Kurs hast du gelernt:
- **Variablen und Datentypen**: Daten speichern und verarbeiten
- **Bedingungen**: Programme Entscheidungen treffen lassen
- **Schleifen**: Code wiederholen lassen
- **Funktionen**: Code strukturieren und wiederverwenden
- **Bibliotheken**: Fertige Funktionen nutzen
- **Benutzereingaben**: Interaktive Programme erstellen

Mit diesen Werkzeugen kannst du bereits viele interessante Programme schreiben. Das ist erst der Anfang deiner Programmier-Reise!
