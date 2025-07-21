---
title: "🔀 Block 2: Bedingungen & Wahrheitstabellen"
description: "Wir lernen Bedingungen, logische Operatoren wie AND und OR und erstellen Wahrheitstabellen."
---

# 🔀 Block 2: Bedingungen & Wahrheitstabellen

Heute lernst du, wie Programme **Entscheidungen treffen** – mit Bedingungen und den Operatoren **AND** und **OR**.

---

## 🎯 Was lernst du?
✅ Bedingungen mit `if`  
✅ Logische Operatoren: `and`, `or`  
✅ Wahrheitstabellen verstehen

---

## 🔧 **1) Bedingungen mit if**

```python
zahl = 10
if zahl > 5:
    print("Zahl ist größer als 5")
```

---

## 🧩 **2) Logische Operatoren**

```python
a = True
b = False
if a and b:
    print("Beide sind wahr")
if a or b:
    print("Mindestens eines ist wahr")
```

---

## 📊 **3) Wahrheitstabelle erstellen**

| a     | b     | a and b | a or b |
|------|-------|--------|-------|
| True | True  | True   | True  |
| True | False | False  | True  |
| False| True  | False  | True  |
| False| False | False  | False |

---

## 🛠️ **4) Aufgaben**

### 🐢 Aufgabe 1: Schildkröte steuert nach Bedingungen

- Erstelle Variablen `links = True` und `frei = False`
- Prüfe mit `if`, ob `links` und `frei` beide True sind

```python
links = True
frei = False
if links and frei:
    tina.left(90)
```

---

### ✏️ Aufgabe 2: Mit or steuern
- Wenn `links` oder `frei` True ist, drehe nach rechts.

---

## ✅ **5) Zusammenfassung**
- Bedingungen steuern den Ablauf.
- Mit `and` müssen beide Bedingungen True sein.
- Mit `or` reicht es, wenn eine True ist.
