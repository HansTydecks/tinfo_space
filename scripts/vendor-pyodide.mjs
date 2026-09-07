// Copies the Pyodide core runtime from node_modules into docs/public/pyodide/
// so the VitePress site can serve it same-origin (no CDN, DSGVO-clean).
//
// Runs automatically before `npm run docs:dev` / `docs:build` / `dev` / `build`
// and on `postinstall`. The target folder is gitignored.
//
// Upgrade Pyodide: bump the version in package.json, `npm install`, done.

import { existsSync, mkdirSync, copyFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'node_modules', 'pyodide')
const dest = join(root, 'docs', 'public', 'pyodide')

// Only the files loadPyodide({ indexURL }) actually fetches. No science wheels.
// pyodide.js is the UMD build: it is loaded via a <script> tag (NOT import()),
// because Vite refuses to import modules that live in /public.
const FILES = [
  'pyodide.js',
  'pyodide.asm.js',
  'pyodide.asm.wasm',
  'python_stdlib.zip',
  'pyodide-lock.json',
]

if (!existsSync(src)) {
  console.warn('[vendor-pyodide] node_modules/pyodide not found — run `npm install` first. Skipping.')
  process.exit(0)
}

mkdirSync(dest, { recursive: true })

let copied = 0
let skipped = 0
for (const file of FILES) {
  const from = join(src, file)
  const to = join(dest, file)
  if (!existsSync(from)) {
    console.warn(`[vendor-pyodide] missing in package: ${file}`)
    continue
  }
  // Skip if the destination is already up to date (same size).
  if (existsSync(to) && statSync(to).size === statSync(from).size) {
    skipped++
    continue
  }
  copyFileSync(from, to)
  copied++
}

console.log(`[vendor-pyodide] ${copied} copied, ${skipped} up to date → docs/public/pyodide/`)
