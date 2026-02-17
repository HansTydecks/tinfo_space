# VS Code kennenlernen

Zentrale Bereiche der Oberfläche

1. Äußerst linke Seitenleiste (Activity Bar)

**Explorer** (Datei-Symbol): Dateien und Ordner des Projekts. Der Dateiexplorer hier funktioniert genau wie der Dateiexplorer deines Betriebssystems. Erstelle und benenne Dateien und Ordner oder verschiebe und lösche sie.

**Suche** (Lupe): Git & Versionsverwaltung

**Extensions**: Erweiterungen installieren (für Fortgeschrittene)

2. Dateiexplorer (ebenfalls links)

- Zeigt alle Projektdateien.
- Rechtsklick → neue Datei / neuer Ordner (übernimmt in den meisten Fällen der Copilot)
- Hier entsteht die Projektstruktur.

1. Editor (Mitte)

- Hauptarbeitsbereich
- Hier wird Code geschrieben
- Mehrere Dateien können als Tabs geöffnet sein

4. KI‑Chatfenster (rechts)

- Kommunikation mit Copilot / LLM
- Fragen stellen, Code erklären lassen, Fehler analysieren

Wichtige Optionen im Chat (unten):
- Modell auswählen (die Auswahl ist groß undd lädt zum Ausprobieren ein. Meine Empfehlung: die Modelle von ClaudeAI)
- Antwortmodus wechseln


5. Terminal (unten)

- Direkte Befehle an den Computer
- Wird später für Git genutzt

6. Menüleiste oben
- File: Projekte/Ordner öffnen

# Der Vibecoding‑Workflow#

Hier ein Vorschlag, wie man an das Programmieren mit der KI herangehen kann.

## Idee formulieren

Das Arbeitsblatt ist etwas trocken? Der Aufgabe fehlt etwas Schwung? Etwas mehr Gamification würde die Klasse wirklich catchen? Das sind genau die Punkte an denen man mit einer interaktiven Simulation ansetzen könnte. Nun können zwei Fälle eintreten:
1. Man hat *bereits eine konkrete Idee* für ein fertiges "Produkt", samt Funktionen und Oberfläche.
2. Man hat das Gefühl, dass ein bestimmtes Problem mit Hilfe einer Computersimulation gelöst werden *könnte*.

Mit einer *konkreten Idee* kannst Du direkt im nächsten Schritt loslegen.
Möchtest du noch weiter Planen, so kann es hilfreich sein mit Kolleg_innen oder Schüler_innen zu sprechen. 

**Mein Tipp**: sprich mit einer KI deiner Wahl. Im Dialog sprudeln oft die eigenen Ideen. Auch die KI bringt gelegentlich Aspekte in das Gespräch, die man zuvor nicht bedacht hat. Nutze dazu am besten gleich das KI-Fenster der IDE im Planungsmodus. Dieser lässt sich unterhalb des Texteingabefeldes aktivieren (Agent/Ask/**Plan**). Wechselt man am Ende der Planung den Agentenmodus zu "Agent", so wird die Planung direkt umgesetzt.

## Langen Prompt schreiben

Der (erste) Prompt ist Schlüssel zu einem zufriedenstellendem Ergebnis. Es gibt einige Tricks, die man hierzu beachten kann:

- **Mikrofon ein**: die KI interessiert sich nicht dafür, ob umgangssprachlich formuliert wird. Im Gegenteil. Umso mehr Kontext desto besser, also rede einfach drauf los.
- Fachbegriffe sind kein Muss. Ob du dich an den Begriff Drop-down Menü oder Pop-up Fenster beim Beschreiben erinnerst, ist nicht unbedingt wichtig, solange du ausführlich genug beschreibst.
- Beschreibe die Funktionen, die dein Programm haben soll (positiver Prompt).
- Beschreibe die Funktionen, die dein Programm **nicht** haben soll (negativer Prompt).
- Technische Details: soll das Programm später als Webseite funktionieren? Möchtest du ein Fenster auf dem Bildschirm? Soll eine einzelne .exe-Datei das Ergebnis sein?
- Platzhalter erklären, falls man selbst etwas hinzufügen möchte.
- Beschreibe die Oberfläche (Farben, Formen, UI).
- Viel Details führen zu guten Ergebnissen.

Prompten ist schnell gelernt. Weiß man, was man mit seinem Prompt erreichen möchte, so gibt es keine Geheimnisse im Prompten. Möchte man sich dennoch verbessern, so sollte man sich in das Thema [Promptengineering](https://de.wikipedia.org/wiki/Prompt_Engineering) einlesen.

## Programm debuggen und verbessern
Den folgenden Prozess kennst du sicher vom Erstellen deiner Arbeitsblätter. Öffne dein Programm und stelle dir folgende Fragen:

Startet das Programm/Webseite?
Gibt es Fehlermeldungen?
Ist das Layout korrekt?
Funktionieren die Buttons wie erwartet?
Verstehe ich, was passiert und was ich tun soll? Fehlen Hinweise für die Lernenden?
Ist die Logik des Programmes korrekt?
...

Fehler, Probleme und Ungenauigkeiten werden im Dialog wieder an das LLM zurückgegeben. Erkläre deine Erwartungen detailliert. Je nach Programm braucht man mal mehr und mal weniger Iterationen um das Programm zum Laufen zu bringen.

Wichtig: du kannst dem LLM auch Zugriff zum Terminal geben. Das LLM wird dich automatisch danach fragen. Die Probleme sind meistens trivial und das LLM löst die Probleme selbstständig, aber du solltest trotzdem darauf achten, dass hier keine [gravierenden Fehler](https://www.golem.de/news/programmieren-mit-gemini-googles-ki-loescht-daten-und-entschuldigt-sich-dafuer-2507-198501.html) auftreten.

## Projekt auf GitHub hochladen

Git ist ein Werkzeug, um deinen Code zu versionieren, den Überblick über Veränderungen zu behalten und notfalls eine ältere, funktionierende Version zurückzuholen. Die drei wichtigsten Befehle, die du nacheinander im **Terminal** ausführen musst, sind folgende: 
´´´
git add .
git commit -m "Erste funktionierende Version"
git push
´´´
Bedeutung:
- add → Änderungen vormerken
- commit → Version speichern
- push → Online zu GitHub hochladen

Git ist ein Thema für sich. Mehr dazu [hier](https://www.youtube.com/watch?v=uGLQF2kUwOA). Aber Moment mal. Kann der Agent nicht auch selbst auf das Terminal zugreifen? Klar, das klappt. Und LLMs kennen sich auch gut mit Git aus. Man kann diesen Schritt also ebenfalls getrost an den Agenten abgeben.

## Statische Webseite mit GitHub Pages veröffentlichen

Am Ende solltest du dein Projekt abgeschlossen haben und wissen, ob und in welcher Form du es teilen möchtest. Hast du dein Programm als Webseite konzipiert, so folgt hier ein Tutorial, wie du die Webseite veröffentlichen kannst.

**Vorarbeit**:
1. Deine Webseite funktioniert bereits lokal.
2. Die fertigen Versionen deiner Dateien sind auf GitHub hochgeladen.

1. Öffne dein Repository (das Projekt) auf GitHub.
2. Du siehst deine Dateien in einem Verzeichnis. Oben rechts findest du Settings → Pages
3. Source: main branch auswählen
4. Speichern
5. Nach kurzer Zeit entsteht eine öffentliche Webseite.

## Eigene Domain hinzufügen (optional für Fortgeschrittene)

1. Domain registrieren (z.B. unter [namecheap.com/](https://www.namecheap.com/))
2. In GitHub Pages unter Custom domain eintragen
3. Beim Domainanbieter DNS‑Eintrag (CNAME) setzen

Änderungen können bis zu 24 Stunden dauern.

Es hilft dieses [Tutorial](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Einmal eingestellt dauert das Erstellen einer neuen Subdomain nur wenige Augenblicke.