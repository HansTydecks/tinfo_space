---
title: "Kryptologie – Grundbegriffe"
description: "Kryptologie, Kryptographie und Kryptoanalyse, die Fachbegriffe Klartext, Geheimtext, Schlüssel und Schlüsselraum, die Skytale und Kerckhoffs' Prinzip."
---

# Kryptologie – Grundbegriffe <Badge type="info" text="Oberstufe" />

**Kryptologie** kommt aus dem Griechischen: *kryptós* = verborgen, *lógos* = Lehre.

```text:no-line-numbers
                  Kryptologie
          ┌────────────┴────────────┐
    Kryptographie              Kryptoanalyse
 (Verfahren entwickeln:      (Verfahren brechen:
  Daten verschlüsseln)        ohne Schlüssel entziffern)
```

Nahe verwandt ist die [Steganografie](./steganografie): Sie **versteckt**, *dass* es überhaupt eine Nachricht gibt.

## Fachbegriffe

::: info Merke
| Symbol | Begriff | Bedeutung |
|---|---|---|
| M | Klartext (*message*) | lesbare Nachricht |
| C | Geheimtext (*ciphertext*) | verschlüsselte Nachricht |
| K | Schlüssel (*key*) | Geheimnis für die Umwandlung |
| | Schlüsselraum | Menge **aller möglichen** Schlüssel |
| E | Verschlüsselung (*encryption*) | E(M, K) = C |
| D | Entschlüsselung (*decryption*) | D(C, K) = M |
:::

**Beispiel Caesar:** Der Schlüsselraum hat nur 26 Elemente (Verschiebungen 0–25). Bei n Personen, die paarweise geheim kommunizieren wollen, braucht man n · (n − 1) / 2 Schlüssel: bei 3 Personen 3, bei 5 Personen schon 10.

## Zwei Arten klassischer Verfahren

| Substitution (Ersetzen) | Transposition (Umstellen) |
|---|---|
| Buchstaben werden durch **andere Zeichen ersetzt** | Buchstaben bleiben gleich, ihre **Reihenfolge ändert sich** |
| Caesar, Vigenère | Skytale, Gartenzaun |

### Die Skytale

Die Spartaner wickelten einen Lederstreifen um einen Stab mit bestimmtem Durchmesser und schrieben die Nachricht längs darauf. Abgewickelt ergab sich scheinbarer Buchstabensalat. Der **Stabdurchmesser** ist der Schlüssel.

## Kerckhoffs' Prinzip

::: info Merke: Kerckhoffs' Prinzip (1883)
Die Sicherheit eines Verschlüsselungsverfahrens darf **nicht davon abhängen, dass das Verfahren geheim bleibt**. Sie darf **nur auf der Geheimhaltung des Schlüssels** beruhen.
:::

Deshalb sind moderne Verfahren wie AES und RSA **öffentlich bekannt** und werden von Fachleuten weltweit geprüft.

::: details Weitere Grundsätze von Kerckhoffs
Ein gutes System soll im Wesentlichen **unentzifferbar** sein, **keine Geheimhaltung des Verfahrens** erfordern, einen **leicht zu übermittelnden** Schlüssel haben, **transportabel** sein und **einfach anwendbar** sein.
**Aufgabe:** Bewerte das RSA-Verfahren nach diesen Grundsätzen.
:::
