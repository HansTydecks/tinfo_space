// Prüft die Sortieraufgaben (<SortierAufgabe>) auf Struktur und Verdrahtung mit den Seiten.
//
//   npm run test:db-uebungen                 alle Aufgaben
//   npm run test:db-uebungen -- kardinalitaeten-basis
//
// Geprüft wird:
//   - jede Aufgaben-Id ist eindeutig und hat Titel, Anleitung, Körbe und Karten
//   - jede Karte verweist auf einen deklarierten Korb, kein Korb bleibt leer
//   - jede Karte hat einen Hinweis; Texte sind kurz genug für eine Karte bzw. einen Korbkopf
//   - keine doppelten Kartentexte innerhalb einer Aufgabe
//   - jede im Markdown referenzierte Id existiert, und jede Id wird genau einmal verwendet

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const aufgabenDir = join(root, 'docs', '.vitepress', 'theme', 'components', 'sortieren', 'aufgaben')
const docsDir = join(root, 'docs')

const MAX_KARTE = 56
const MAX_LABEL = 40
const MIN_KOERBE = 2
const MIN_KARTEN = 4

const nurIds = process.argv.slice(2).filter((a) => !a.startsWith('--'))

const fehler = []
const melde = (wo, text) => fehler.push(`${wo}: ${text}`)

// ---------------------------------------------------------------------------
// Aufgaben laden (ohne index.js – das benutzt import.meta.glob und läuft nur in Vite)
// ---------------------------------------------------------------------------
const AUFGABEN = new Map()
const herkunft = new Map()

for (const datei of readdirSync(aufgabenDir).filter((d) => d.endsWith('.js') && d !== 'index.js')) {
  const modul = await import(pathToFileURL(join(aufgabenDir, datei)).href)
  for (const aufgabe of Object.values(modul)) {
    if (!aufgabe || typeof aufgabe !== 'object' || !aufgabe.id) continue
    if (AUFGABEN.has(aufgabe.id)) {
      melde(aufgabe.id, `doppelte Id (${herkunft.get(aufgabe.id)} und ${datei})`)
      continue
    }
    AUFGABEN.set(aufgabe.id, aufgabe)
    herkunft.set(aufgabe.id, datei)
  }
}

if (AUFGABEN.size === 0) {
  console.error(`✗ keine Aufgaben in ${aufgabenDir} gefunden`)
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Struktur prüfen
// ---------------------------------------------------------------------------
let kartenGesamt = 0
let geprueft = 0

for (const [id, a] of AUFGABEN) {
  if (nurIds.length && !nurIds.includes(id)) continue
  geprueft++

  if (!a.titel?.trim()) melde(id, 'kein Titel')
  if (!a.anleitung?.trim()) melde(id, 'keine Anleitung')

  const koerbe = Array.isArray(a.koerbe) ? a.koerbe : []
  const karten = Array.isArray(a.karten) ? a.karten : []
  kartenGesamt += karten.length

  if (koerbe.length < MIN_KOERBE) melde(id, `nur ${koerbe.length} Körbe (mindestens ${MIN_KOERBE})`)
  if (karten.length < MIN_KARTEN) melde(id, `nur ${karten.length} Karten (mindestens ${MIN_KARTEN})`)

  const korbIds = new Set()
  for (const korb of koerbe) {
    if (!korb?.id) melde(id, 'Korb ohne Id')
    else if (korbIds.has(korb.id)) melde(id, `doppelte Korb-Id "${korb.id}"`)
    else korbIds.add(korb.id)

    if (!korb?.label?.trim()) melde(id, `Korb "${korb?.id}" ohne Label`)
    else if (korb.label.length > MAX_LABEL) {
      melde(id, `Korb-Label zu lang (${korb.label.length} > ${MAX_LABEL}): "${korb.label}"`)
    }
  }

  const belegt = new Set()
  const texte = new Set()

  for (const karte of karten) {
    const text = karte?.text?.trim()
    if (!text) {
      melde(id, 'Karte ohne Text')
      continue
    }
    if (texte.has(text)) melde(id, `doppelter Kartentext "${text}"`)
    texte.add(text)

    if (text.length > MAX_KARTE) {
      melde(id, `Kartentext zu lang (${text.length} > ${MAX_KARTE}): "${text}"`)
    }
    if (!karte.hinweis?.trim()) melde(id, `Karte "${text}" ohne Hinweis`)
    if (!korbIds.has(karte.korb)) melde(id, `Karte "${text}" zeigt auf unbekannten Korb "${karte.korb}"`)
    else belegt.add(karte.korb)
  }

  for (const korbId of korbIds) {
    if (!belegt.has(korbId)) melde(id, `Korb "${korbId}" bleibt leer – keine Karte gehört hinein`)
  }
}

// ---------------------------------------------------------------------------
// Verdrahtung mit den Markdown-Seiten
// ---------------------------------------------------------------------------
function mdDateien(verzeichnis) {
  const treffer = []
  for (const eintrag of readdirSync(verzeichnis)) {
    if (eintrag === 'dist' || eintrag === 'cache' || eintrag === 'node_modules') continue
    const pfad = join(verzeichnis, eintrag)
    if (statSync(pfad).isDirectory()) treffer.push(...mdDateien(pfad))
    else if (eintrag.endsWith('.md')) treffer.push(pfad)
  }
  return treffer
}

const verwendet = new Map()

for (const pfad of mdDateien(docsDir)) {
  const text = readFileSync(pfad, 'utf8')
  for (const m of text.matchAll(/<SortierAufgabe\s+aufgabe="([^"]+)"\s*\/>/g)) {
    const seite = pfad.slice(root.length + 1).replace(/\\/g, '/')
    verwendet.set(m[1], [...(verwendet.get(m[1]) ?? []), seite])
  }
  // Ein <SortierAufgabe> ohne wohlgeformtes aufgabe="..." rutscht sonst stumm durch
  const alle = text.match(/<SortierAufgabe\b/g)?.length ?? 0
  const gut = text.match(/<SortierAufgabe\s+aufgabe="[^"]+"\s*\/>/g)?.length ?? 0
  if (alle !== gut) {
    melde(pfad.slice(root.length + 1).replace(/\\/g, '/'), `${alle - gut} <SortierAufgabe> ohne gültiges aufgabe="…"`)
  }
}

for (const [id, seiten] of verwendet) {
  if (!AUFGABEN.has(id)) melde(seiten[0], `unbekannte Aufgabe "${id}"`)
  else if (seiten.length > 1) melde(id, `wird mehrfach eingebunden (${seiten.join(', ')})`)
}

for (const id of AUFGABEN.keys()) {
  if (nurIds.length && !nurIds.includes(id)) continue
  if (!verwendet.has(id)) melde(id, 'wird auf keiner Seite eingebunden')
}

// ---------------------------------------------------------------------------
if (fehler.length) {
  for (const f of fehler) console.error(`  ${f}`)
  console.error(`\n✗ ${fehler.length} Problem(e)`)
  process.exit(1)
}

console.log(`✓ ${kartenGesamt} Karten in ${geprueft} Aufgabe(n) geprüft – alles stimmt.`)
