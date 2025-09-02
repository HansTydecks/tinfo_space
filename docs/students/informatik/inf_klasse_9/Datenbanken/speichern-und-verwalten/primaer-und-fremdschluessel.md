# Primär- und Fremdschlüssel

Stell dir vor, du hast einen riesigen Schrank voller Sachen, und du möchtest deiner Schwester genau sagen, was sie dir daraus holen soll. Wie machst du das am besten? Genau, mit einem einzigartigen Merkmal! In der Welt der Datenbanken nennt man dieses besondere Merkmal einen Primärschlüssel. Er bestimmt jeden Eintrag in deiner Datenbank eindeutig.

## Primärschlüssel

Es gibt drei Hauptarten von Primärschlüsseln:

Der **natürliche Schlüssel** ist etwas, das von Natur aus einzigartig ist und bereits existiert. Beispiele dafür sind dein Fingerabdruck oder deine Iris - sie sind von Natur aus für jeden Menschen einzigartig.

Ein **künstlicher Schlüssel** wird extra erfunden oder zugewiesen, um etwas eindeutig zu identifizieren. Das könnte eine Schülernummer sein, die deine Schule dir gibt, oder eine Kundennummer in einem Onlineshop. Oft wird diese schlicht `id` für Identifikationsnummer genannt. Auch eine Telefonnummer ist eigentlich ein künstlicher Schlüssel, da sie von Menschen zugewiesen wird.

Wenn du mehrere Dinge zusammen brauchst, um etwas eindeutig zu machen, nennt man das einen **zusammengesetzten Schlüssel** - wie wenn du deinen Vornamen und Nachnamen zusammen benutzt, um dich von anderen zu unterscheiden.

## Übungsaufgaben Primärschlüssel

Überlege für jedes Szenario, ob ein natürlicher, künstlicher oder zusammengesetzter Schlüssel am besten passt und erkläre, warum du dich dafür entschieden hast.

1. Deine Playlist auf einem Musik-Streamingdienst
2. Die Mitglieder in deinem Sportverein
3. Die Bücher in deinem Bücherregal zu Hause
4. Deine Freund:innen
5. Die Photos in deinem digitalen Fotoalbum
6. Die Einträge in deinem persönlichen Tagebuch
7. Die Lehrer:innen an deiner Schule
8. Die Lage deiner Wohnung
9. Eine Stadt

## Fremdschlüssel

Ein Fremdschlüssel ist ein Attribut in einer Datenbanktabelle, das auf den Primärschlüssel einer anderen Tabelle verweist. Durch die Verwendung von Fremdschlüsseln können wir Daten in verschiedenen Tabellen miteinander verknüpfen.

Bei der Benennung von Fremdschlüsseln wird häufig eine bestimmte Konvention angewandt. Üblicherweise folgt man dem Schema `tabelle_primärschlüssel`, wobei `tabelle` für den Namen der referenzierten Tabelle steht und `primärschlüssel` für den Namen des Primärschlüssels in dieser Tabelle.

### 1:n-Beziehung

In einer 1:n-Beziehung wird der Fremdschlüssel auf der n-Seite (der "Viele"-Seite) platziert. Anders würde es nicht gehen, da ein Attribut nur ein Wert haben darf und auf der "Eine"-Seite sonst viele Werte stehen müssten.

**Beispiel:** Eine Schule hat mehrere Räume, aber jeder Raum gehört nur zu einer Schule.

Hier ist `school_id` in der `room` Tabelle der Fremdschlüssel.

### 1:1-Beziehung

Bei einer 1:1-Beziehung kann der Fremdschlüssel in einer der beiden Tabellen stehen, da es keine Rolle spielt, welche Tabelle auf die andere verweist.

**Beispiel:** Jeder Schüler hat genau ein Lieblingskuscheltier, und jedes Lieblingskuscheltier gehört genau einem Schüler.

### n:m-Beziehung

In einer n:m-Beziehung ist die Situation etwas komplexer: Hier tritt das Problem aus der 1:n-Beziehung auf beiden Seiten auf. Daher benötigt man eine zusätzliche Hilfstabelle, die Fremdschlüssel zu beiden beteiligten Tabellen enthält.

**Beispiel:** Schüler können mehreren Vereinen angehören, und jeder Verein kann mehrere Schüler als Mitglieder haben.

In diesem Fall enthält die Hilfstabelle `student_club` Fremdschlüssel zu beiden Haupttabellen und ermöglicht es, die vielfältigen Verbindungen zwischen Schülern und Vereinen abzubilden.
