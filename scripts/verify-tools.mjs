// Prüft die Liste der digitalen Tools (tools.js) gegen die Beschreibungsseiten.
//
//   npm run test:tools
//
// Geprüft wird:
//   - jede Tool-Id ist eindeutig, Kategorie und (bei Informatik) Thema existieren
//   - Datum im Format JJJJ-MM-TT, Kurzunterschrift passt auf eine Kachel
//   - jedes Tool hat entweder einen Live-Link oder einen Hinweis (note)
//   - zu jedem Tool gibt es docs/teachers/Digitale_Tools/<id>/index.md mit <ToolInfo id="<id>" />
//   - jeder Ordner unter Digitale_Tools gehört zu einem Tool

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const toolsDir = join(root, 'docs', 'teachers', 'Digitale_Tools')
const { tools, categories } = await import(
  pathToFileURL(join(root, 'docs', '.vitepress', 'theme', 'components', 'tools', 'tools.js')).href
)

const MAX_KURZ = 30

const fehler = []
const melde = (wo, text) => fehler.push(`${wo}: ${text}`)

const ids = new Set()
for (const tool of tools) {
  const wo = tool.id ?? '(ohne id)'
  if (ids.has(tool.id)) melde(wo, 'doppelte Id')
  ids.add(tool.id)

  for (const feld of ['id', 'name', 'icon', 'short', 'category', 'updated']) {
    if (!tool[feld]) melde(wo, `Feld "${feld}" fehlt`)
  }
  if (tool.short?.length > MAX_KURZ) melde(wo, `Kurzunterschrift länger als ${MAX_KURZ} Zeichen`)
  if (tool.updated && !/^\d{4}-\d{2}-\d{2}$/.test(tool.updated)) melde(wo, `Datum "${tool.updated}" nicht im Format JJJJ-MM-TT`)
  if (!tool.live && !tool.note) melde(wo, 'weder Live-Link noch Hinweis (note)')

  const kategorie = categories.find((c) => c.id === tool.category)
  if (!kategorie) melde(wo, `unbekannte Kategorie "${tool.category}"`)
  else if (kategorie.topics && !kategorie.topics.some((t) => t.id === tool.topic)) {
    melde(wo, `unbekanntes Thema "${tool.topic}" in Kategorie "${kategorie.id}"`)
  }

  const seite = join(toolsDir, tool.id, 'index.md')
  if (!existsSync(seite)) {
    melde(wo, `Beschreibungsseite fehlt (docs/teachers/Digitale_Tools/${tool.id}/index.md)`)
  } else if (!readFileSync(seite, 'utf8').includes(`<ToolInfo id="${tool.id}" />`)) {
    melde(wo, `Beschreibungsseite bindet <ToolInfo id="${tool.id}" /> nicht ein`)
  }
}

for (const ordner of readdirSync(toolsDir, { withFileTypes: true })) {
  if (ordner.isDirectory() && !ids.has(ordner.name)) {
    melde(`Digitale_Tools/${ordner.name}`, 'Ordner ohne Eintrag in tools.js')
  }
}

// ---------------------------------------------------------------------------
if (fehler.length) {
  for (const f of fehler) console.error(`  ${f}`)
  console.error(`\n✗ ${fehler.length} Problem(e)`)
  process.exit(1)
}

console.log(`✓ ${tools.length} Tools in ${categories.length} Kategorien geprüft – alles stimmt.`)
