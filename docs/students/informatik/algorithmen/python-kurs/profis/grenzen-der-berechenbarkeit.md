---
title: "Grenzen der Berechenbarkeit"
description: "Gibt es Probleme, die kein Programm lösen kann? Endlosschleifen, die Collatz-Vermutung, der Widerspruchsbeweis und das Halteproblem."
---

## Ziele
- Erkennen, dass man einem Programm nicht immer ansehen kann, ob es anhält
- Die Idee eines **Widerspruchsbeweises** verstehen
- Das **Halteproblem** und seinen Beweis Schritt für Schritt nachvollziehen
- Konsequenzen für die Praxis kennen: Es gibt keinen perfekten Bug-Finder

Bei den [schweren Problemen](./schwere-probleme) gab es immer eine Lösung – sie dauerte nur zu lange.
Jetzt geht es um etwas Radikaleres: Probleme, die **kein Programm der Welt** lösen kann, egal wie
schnell der Computer ist. Einen Überblick findest du auch auf der Seite
[Grenzen der Berechenbarkeit](../../grenzen-der-berechenbarkeit).

## Hält dieses Programm an?

Manchmal sieht man es sofort. Diese Schleife endet nach 10 Durchläufen:

```python
i = 0
while i < 10:
    i += 1
```

Diese hier läuft **endlos** (bitte nicht ausführen!):

```python
i = 0
while i != 10:
    i += 3
```

Warum? Schau dir die ersten Werte von `i` an:

<PyRunner>

```python
i = 0
for schritt in range(8):      # nur die ersten 8 Schritte anschauen
    print(i, end=" ")
    i += 3
```

</PyRunner>

:::details Erklärung
`i` nimmt die Werte 0, 3, 6, 9, 12, … an und springt damit über die 10 hinweg. Die Bedingung
`i != 10` ist also immer wahr. Mit `while i < 10` wäre das nicht passiert.
:::

## Collatz – wir wissen es nicht

Nimm eine Zahl *n*. Ist sie gerade, halbiere sie, sonst rechne 3·*n* + 1. Wiederhole, bis du bei 1
ankommst.

<PyRunner>

```python
def collatz_schritte(n):
    schritte = 0
    while n != 1:
        if n % 2 == 0:
            n = n // 2
        else:
            n = 3 * n + 1
        schritte += 1
    return schritte

for start in [6, 7, 27, 97, 871]:
    print(f"Start {start:>4}: nach {collatz_schritte(start):>3} Schritten bei 1")
```

</PyRunner>

::: warning Ein offenes Rätsel
Das Programm hat bisher für **jede** getestete Startzahl angehalten – Computer haben das bis weit
über 10²⁰ geprüft. Aber niemand konnte **beweisen**, dass es für jede Zahl anhält. Diese
**Collatz-Vermutung** ist seit 1937 ungelöst. Ein vier Zeilen langes Programm – und kein Mensch weiß,
ob es immer endet!
:::

„Dann lass das Programm doch einfach laufen und warte!" – Das hilft nicht: Wenn es nach einer Stunde
noch läuft, weißt du nicht, ob es nach zwei Stunden fertig wäre oder nie.

## Die Beweisidee: Widerspruchsbeweis

Um zu zeigen, dass etwas **unmöglich** ist, benutzen Mathematiker einen Trick:

1. Nimm das Gegenteil an.
2. Folgere daraus etwas, das nicht sein kann (einen **Widerspruch**).
3. Also war die Annahme falsch.

**Beispiel: Es gibt keine größte Primzahl.** Angenommen, es gäbe nur endlich viele Primzahlen, z. B.
nur 2, 3, 5, 7, 11, 13. Multipliziere alle und addiere 1:

<PyRunner>

```python
def kleinster_teiler(n):
    t = 2
    while t * t <= n:
        if n % t == 0:
            return t
        t += 1
    return n

# Annahme: Das sind ALLE Primzahlen.
primzahlen = [2, 3, 5, 7, 11, 13]

produkt = 1
for p in primzahlen:
    produkt *= p
n = produkt + 1
print("Produkt + 1 =", n)

for p in primzahlen:
    print(f"{n} % {p} = {n % p}")       # Rest ist immer 1

t = kleinster_teiler(n)
print("kleinster Primteiler:", t, "-> in der Liste?", t in primzahlen)
```

</PyRunner>

:::details Erklärung
30031 lässt bei der Division durch jede Primzahl der Liste den Rest 1. Trotzdem hat 30031 einen
Primteiler – nämlich 59, der **nicht** in der Liste steht. Das klappt mit **jeder** Liste: Es gibt
immer eine Primzahl, die fehlt. Widerspruch zur Annahme „das sind alle". Also gibt es unendlich
viele Primzahlen. (Dieser Beweis stammt von Euklid, ca. 300 v. Chr.)
:::

## Das Halteproblem

**Die Frage:** Gibt es ein Programm `haelt(programm, eingabe)`, das für **jedes** Programm und jede
Eingabe korrekt `True` („hält an") oder `False` („läuft endlos") antwortet?

Alan Turing bewies 1936: **Nein.** Wir gehen seinen Widerspruchsbeweis Schritt für Schritt durch.

**Schritt 1 – Annahme:** Angenommen, jemand hat `haelt` geschrieben und es funktioniert immer.

**Schritt 2 – Ein fieses Programm:** Damit bauen wir `paradox`. Es fragt `haelt`, was es selbst tun
wird – und macht dann genau das Gegenteil:

```python
def paradox(p):
    if haelt(p, p):      # Würde p mit sich selbst als Eingabe anhalten?
        while True:      # Dann laufe ich endlos!
            pass
    else:
        return           # Sonst halte ich sofort an.
```

**Schritt 3 – Die entscheidende Frage:** Was passiert bei `paradox(paradox)`?

- Sagt `haelt(paradox, paradox)` **„hält"**, dann läuft `paradox` endlos. → `haelt` lag falsch.
- Sagt `haelt(paradox, paradox)` **„läuft endlos"**, dann hält `paradox` sofort. → `haelt` lag
  falsch.

**Schritt 4 – Widerspruch:** Egal, was `haelt` antwortet, es ist falsch. Also kann es `haelt` nicht
geben.

Da es `haelt` nicht gibt, können wir das Gedankenexperiment nur **simulieren**. Wir setzen eine
„Wunderfunktion" ein, die einfach rät – und schauen, ob sie bei `paradox(paradox)` richtig liegt.
Statt wirklich endlos zu laufen, gibt `paradox` nur zurück, was es tun würde:

<PyRunner>

```python
# Gedankenexperiment: Angenommen, jemand hat haelt() programmiert.
# Wir testen beide möglichen Antworten, die haelt(paradox, paradox) geben könnte.

def paradox(p):
    if haelt(p, p):
        return "läuft endlos"     # hier stünde eigentlich: while True: pass
    else:
        return "hält"

for antwort in [True, False]:
    def haelt(programm, eingabe):
        return antwort           # diese "Wunderfunktion" gibt immer dieselbe Antwort

    vorhersage = "hält" if haelt(paradox, paradox) else "läuft endlos"
    tatsaechlich = paradox(paradox)
    print(f"haelt sagt: {vorhersage:<13} | paradox(paradox) tut: {tatsaechlich:<13}",
          "-> Widerspruch!" if vorhersage != tatsaechlich else "-> passt")
```

</PyRunner>

:::details Erklärung
Es gibt nur zwei mögliche Antworten, und beide führen zum Widerspruch. Dabei ist es egal, wie
schlau `haelt` innen programmiert ist: `paradox` fragt `haelt` immer selbst und tut dann das
Gegenteil. Deshalb kann **kein** Programm das Halteproblem für alle Programme lösen.
:::

::: info Programme als Eingabe
Dass man einem Programm ein anderes Programm (oder sich selbst) übergeben kann, ist gar nicht so
seltsam: Ein Compiler oder Python selbst bekommt Programmtext als Eingabe. In Python kann man
Funktionen wie jeden anderen Wert an Funktionen übergeben.
:::

## Was folgt daraus?

- **Kein perfekter Bug-Finder:** Ein Programm, das bei *jedem* Programm sicher alle
  Endlosschleifen findet, kann es nicht geben.
- **Kein perfekter Virenscanner:** Ob ein Programm *irgendwann* etwas Bösartiges tut, lässt sich
  im Allgemeinen nicht entscheiden. Virenscanner arbeiten deshalb mit Mustern und Heuristiken – und
  irren sich manchmal.
- **Grenzen, nicht Hoffnungslosigkeit:** Für *viele einzelne* Programme kann man sehr wohl beweisen,
  dass sie anhalten (wie bei `while i < 10`). Unmöglich ist nur ein Verfahren, das für **alle**
  Programme funktioniert.

## Aufgaben

Löse die folgenden Aufgaben selbstständig oder mit einem Partner oder Partnerin.

### Aufgabe 1: Collatz-Rekord
Welche Startzahl von 1 bis 10 000 braucht die meisten Schritte, bis sie bei 1 ankommt?

<PyRunner>

```python
def collatz_schritte(n):
    schritte = 0
    while n != 1:
        n = n // 2 if n % 2 == 0 else 3 * n + 1
        schritte += 1
    return schritte

# for start in range(1, 10001): ...
```

</PyRunner>

:::details Lösung
```python
bester_start = 1
meiste = 0
for start in range(1, 10001):
    s = collatz_schritte(start)
    if s > meiste:
        meiste = s
        bester_start = start
print(bester_start, meiste)
```
Ergebnis: Die Startzahl 6171 braucht 261 Schritte.
:::

### Aufgabe 2: Endlos oder nicht?
Entscheide für jedes Programm, ob es anhält. Begründe – ohne es auszuführen!

```python
# a)
n = 100
while n > 0:
    n -= 7

# b)
n = 1
while n != 0:
    n *= 2

# c)
x = 5
while x != 1:
    x = x // 2
```

:::details Lösung
- **a)** hält: `n` wird immer kleiner und irgendwann ≤ 0 (bei −5).
- **b)** läuft endlos: `n` wird immer größer (1, 2, 4, 8, …) und nie 0.
- **c)** hält: 5 → 2 → 1. Ganzzahlige Division durch 2 kommt bei jeder positiven Zahl bei 1 an.
:::

### Aufgabe 3: Der Zeitlimit-Trick
Lisa schlägt vor: „Wir lassen jedes Programm eine Stunde laufen. Ist es dann nicht fertig, sagen
wir: läuft endlos." Erkläre, warum `haelt` so nicht funktioniert.

:::details Lösung
Ein Programm kann ganz regulär **länger als eine Stunde** rechnen und dann anhalten (z. B. eine
Brute-Force-Suche beim [Handlungsreisenden](./schwere-probleme)). Lisas Verfahren würde dann
fälschlich „läuft endlos" sagen. Egal welches Zeitlimit man wählt – es gibt immer Programme, die
knapp länger brauchen.
:::
