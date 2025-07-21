---
title: "♻️ Block 3: Modularisierung & Bibliotheken"
description: "Wir lernen, wie man Code in Funktionen aufteilt und externe Bibliotheken verwendet."
---

# ♻️ Block 3: Modularisierung & Bibliotheken

Heute lernst du, wie du deinen Code besser organisierst.

---

## 🎯 Was lernst du?
✅ Funktionen schreiben  
✅ Eigene Module nutzen  
✅ Externe Bibliotheken einbinden

---

## 📦 **1) Funktionen**

```python
def quadrat(t, seite):
    for i in range(4):
        t.forward(seite)
        t.left(90)
```

---

## 🧩 **2) Modul erstellen**

- Speichere die Funktion in `formen.py`
- Importiere sie in deinem Hauptprogramm:

```python
import turtle
import formen

tina = turtle.Turtle()
formen.quadrat(tina, 100)
```

---

## 📚 **3) Externe Bibliotheken**
- Python hat viele fertige Module.
- Beispiel: `random` für Zufallszahlen.

```python
import random
zahl = random.randint(1, 10)
print(zahl)
```

---

## 🛠️ **4) Aufgaben**

### 🐢 Aufgabe 1: Funktion schreiben
- Erstelle eine Funktion `dreieck(t, seite)`

---

### ✏️ Aufgabe 2: Zufällige Farbe
- Nutze `random.choice(["red", "green", "blue"])` für zufällige Farben.

---

## ✅ **5) Zusammenfassung**
- Funktionen machen Code übersichtlich.
- Bibliotheken erweitern Python um viele Möglichkeiten.
