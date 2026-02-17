# Tutorial – GitHub & Entwicklungsumgebung einrichten

Diese Anleitung führt Schritt für Schritt durch die grundlegende Einrichtung:

1. GitHub-Account erstellen
2. Schullizenz & GitHub Copilot aktivieren
3. Entwicklungsumgebung (IDE) installieren
4. IDE mit GitHub verbinden

---

## Disclaimer

Viele Wege führen bekanntlich ans Ziel. Die hier vorgestellte Art und Weise zu vibecoden ist nur eine von vielen. Sie hat selbstverständlich [Vor- und Nachteile](bedenken.md), die man bedenken sollte. Ich möchte diese Methode vor allem deshalb vorstellen, weil ich damit persönlich Erfahrung gesammelt habe und diese teilen kann.

## 0. Grundbegriffe (kurz erklärt)

**GitHub**
Eine Online-Plattform, auf der Programmcode gespeichert wird. Man kann dort Projekte sichern, teilen und gemeinsam bearbeiten. GitHub ist heute fest mit seinem eigenen KI-Assistenten verknüpft.

**GitHub Copilot**
Ein KI-Assistent, der eine Vielzahl von LLMs bzw. KI-Modellen zur Verfügung stellt. Er lässt sich nach der Anmeldung bei GitHub kostenfrei nutzen und ist am Ende "verantwortlich" für das Schreiben der gewünschten Programme.

**Repository („Repo“)**
Ein Projektordner auf GitHub. Enthält Dateien, Code und Versionsstände. Die Dateien eines Repositorys können mit wenigen Klicks als Webseite veröffentlicht werden.

**IDE (Integrated Development Environment)**
Ein Programm zum Schreiben von Code. Es bündelt Editor, Fehlerhilfe und Werkzeuge (hier auch den KI-Assistenten) an einem Ort.

**Prompt**
Nachricht, die man an das LLM schickt, um eine Antwort zu erhalten.
---

## 2. GitHub-Account erstellen

1. Webseite **github.com** öffnen.
2. Auf **Sign up** klicken.
3. Account erstellen.

✅ Persönlicher GitHub-Account existiert. Du solltest dich einloggen können und dein Profil anpassen können.

---

## 3. Schullizenz & GitHub Copilot aktivieren

Schulen erhalten Copilot kostenlos über Education-Lizenzen.

1. Bei GitHub einloggen.
2. Oben rechts auf das Profilbild klicken
3. EN: **Settings** → **Billing and licensing** → **Education benefits**
4. Schulstatus bestätigen, indem man eine PDF der Schulbescheinigung hochlädt, die vom Sekretariat binnen weniger Minuten ausgedruckt wird.
5. Warten auf automatisierte Bestätigung


✅ Durch die Anmeldung beim Education-Programm GitHubs erhält man ein stark erhöhtes Kontingent an Tokens. Man kann also deutlich mehr programmieren lassen.

---

## 4. IDE installieren (empfohlen: Visual Studio Code)

Warum diese IDE?

* kostenlos
* sehr verbreitet
* Copilot funktioniert nach dem Einloggen automatisch

### Installation

1. Webseite **code.visualstudio.com** öffnen.
2. Version für das eigene Betriebssystem herunterladen.
3. Installation starten → Standardoptionen übernehmen.

✅ Programm zum Schreiben von Programmen ist installiert.

---

## 5. VS Code mit GitHub verbinden

1. VS Code öffnen.
2. Links im Menü auf **Accounts** (Profil-Symbol) klicken.
3. **Sign in with GitHub** auswählen.
4. Browser öffnet sich → Anmeldung bestätigen.
5. Zurück zu VS Code wechseln.

✅ IDE und GitHub sind verbunden.

---

## 6. GitHub Copilot in der IDE aktivieren

1. In VS Code links auf **Accounts** (Profil-Symbol).
2. Mit GitHub-Account einloggen
4. Anmeldung bestätigen.

Man kann das Ganze nun testen:

* Datei → Ordner öffnen
* Neuen Ordner erstellen. Dieser wird nun links im Dateiexplorer der IDE angezeigt
* Chatfenster öffnen
* Prompt: "Erstelle mir eine HTML-Datei, die Hello-World schreibt."
* Chatfenster (rechts) beobachten. Es sollte ein KI-Dialog beginnen, der beschreibt, was derzeit passiert.
* Links wird eine HTML-Datei erstellt und benannt.
* HTML-Datei öffnen
* (Korrekturen im Chatfenster erfragen, HTML-Datei prüfen...)
* 
Weitere Details [hier](how-to-vibecode.md).

Probleme beim Setup? Im Internet finden sich eine Vielzahl von Lösungen. Neben dem altgewohnten Googlen stehen dir nun auch die KIs zur Verfügung. Diese funktionieren bei spezifischen Setup-Fragen sehr zuverlässig.

✅ Das Setup ist nun vollständig

---

## 7. Häufige Probleme (Kurzlösung)

**Copilot macht keine Vorschläge**
→ Prüfen, ob die Erweiterung installiert und angemeldet ist.

**Git wird verlangt**
→ VS Code bietet automatische Installation an → bestätigen.


