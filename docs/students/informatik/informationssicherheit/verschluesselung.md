---
title: "Verschlüsselung"
description: "Warum wir verschlüsseln, die Caesar-Verschlüsselung, das Schlüsseltauschproblem sowie symmetrische und asymmetrische Verschlüsselung."
---

# Verschlüsselung <Badge type="tip" text="Klasse 8/9" />

Woher weißt du eigentlich, dass niemand deine Nachricht **unterwegs liest**? Dieses Problem ist viel älter als das Internet.

## Caesar und Kleopatra

Julius Caesar schickte Botschaften über weite Strecken, zu Pferd oder per Schiff. Fiel ein Bote in feindliche Hände, war die Nachricht verraten. Caesars Lösung: Er **verschob jeden Buchstaben** um eine feste Anzahl von Stellen im Alphabet.

```text:no-line-numbers
Klartext:   a b c d e f g h i j k l m n o p q r s t u v w x y z
Schlüssel 3 ↓ ↓ ↓ …
Geheimtext: D E F G H I J K L M N O P Q R S T U V W X Y Z A B C

"hallo"  →  "KDOOR"
```

::: info Merke: Bausteine einer Verschlüsselung
- **Klartext** (*M*, message): die lesbare Nachricht
- **Geheimtext** (*C*, ciphertext): die verschlüsselte Nachricht
- **Schlüssel** (*K*, key): das Geheimnis, mit dem umgewandelt wird, bei Caesar die **Verschiebung**
:::

::: details Übung: Entschlüssle mit Schlüssel 2
`i g j g k o` → Tipp: Gehe jeden Buchstaben zwei Stellen **zurück**.
:::

**Schwäche:** Es gibt nur 25 sinnvolle Schlüssel. Man probiert sie einfach alle aus (→ [Kryptoanalyse](./kryptoanalyse)).

## Ziele der Verschlüsselung

| Schutzziel | Frage |
|---|---|
| **Vertraulichkeit** | Können **nur Berechtigte** die Nachricht lesen? |
| **Integrität** | Wurde die Nachricht **unterwegs verändert**? |
| **Authentizität** | Stammt die Nachricht **wirklich vom Absender**? |

## Das Schlüsseltauschproblem

Caesar schickt Kleopatra eine verschlüsselte Nachricht und den Schlüssel „3“ **auf demselben Schiff**. Wird das Schiff gekapert, ist alles verloren.

::: info Merke: Schlüsseltauschproblem
- Der Schlüssel muss **auf sicherem Weg** übertragen werden.
- Er darf **nicht auf demselben Weg** wie die Nachricht und **nicht im Klartext** reisen.
- Aber: Wie tauscht man einen Schlüssel sicher aus, **bevor** man sicher kommunizieren kann?
:::

## Symmetrisch und asymmetrisch

| | Symmetrische Verschlüsselung | Asymmetrische Verschlüsselung |
|---|---|---|
| Idee | **derselbe** Schlüssel zum Ver- und Entschlüsseln | ein **Schlüsselpaar**: öffentlicher und privater Schlüssel |
| Beispiel | Caesar, AES | RSA |
| Schlüsseltausch | problematisch | kein geheimer Austausch nötig |
| Schlüssel bei n Personen | jedes Paar braucht einen eigenen: **n · (n − 1) / 2** | jede Person ein Paar: **2 · n** |

### So funktioniert das Schlüsselpaar

::: info Merke: Asymmetrische Verschlüsselung
1. Bob erzeugt ein **Schlüsselpaar**. Den **privaten Schlüssel** behält er geheim, den **öffentlichen Schlüssel** darf jeder haben.
2. Alice verschlüsselt ihre Nachricht mit **Bobs öffentlichem Schlüssel**.
3. **Nur Bobs privater Schlüssel** kann diese Nachricht wieder entschlüsseln, nicht einmal Alice selbst.
:::

Man kann sich den öffentlichen Schlüssel wie ein **offenes Vorhängeschloss** vorstellen, das Bob an alle verteilt: Jeder kann damit eine Kiste zuschließen, aber nur Bob hat den Schlüssel zum Aufschließen.

## Weiterlesen

- Mathematik dahinter: [RSA](./rsa) <Badge type="info" text="Oberstufe" />
- Historische Verfahren wie Vigenère oder Gartenzaun: [CrypTool Online](https://www.cryptool.org/de/cto/)
