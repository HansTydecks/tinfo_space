<script setup>
// Aufforderungen: tell / ask + Person + (not) to + Verb
import Chip from '../parts/Chip.vue'
import Arrow from '../parts/Arrow.vue'
import { reihe, ende, chipW } from '../layout.js'

// Bitte
const u1 = reihe([
  { t: 'She', k: 'n' }, { t: 'asked', k: 'rep' }, { t: 'me', k: 'pron' }, { t: 'to', k: 'order' },
  { t: 'open', k: 'n' }, { t: 'the window', k: 'n' }, { t: '.', k: 'n' },
], 150)
const [, asked1, , to1, open1, win1] = u1
const o1 = reihe([
  { t: 'Open', k: 'n' }, { t: 'the window,', k: 'n' }, { t: 'please', k: 'rep' }, { t: '!”', k: 'n' },
], open1.x)
const please = o1[2]
const auf1 = open1.x - chipW('“') - 2

// Verbot
const u2 = reihe([
  { t: 'He', k: 'n' }, { t: 'told', k: 'rep' }, { t: 'us', k: 'pron' }, { t: 'not to', k: 'order' },
  { t: 'shout', k: 'n' }, { t: '.', k: 'n' },
], 150)
const notTo = u2[3]
const o2 = [
  { t: '“', k: 'n', cx: notTo.x - 12 },
  { t: 'Don’t', k: 'order', cx: notTo.cx },
  { t: 'shout', k: 'n', cx: u2[4].cx },
  { t: '!”', k: 'n', cx: u2[4].r + 12 },
]

const muster = reihe(
  [{ t: 'told / asked', k: 'rep' }, { t: '+ person', k: 'pron' }, { t: '+ (not) to', k: 'order' }, { t: '+ verb', k: 'n' }],
  150,
  8,
)
</script>

<template>
  <svg viewBox="0 0 600 430" role="img" aria-label="Commands and requests. Open the window, please! becomes: She asked me to open the window. Don’t shout! becomes: He told us not to shout. The pattern is: told or asked, plus a person, plus to or not to, plus the verb.">
    <!-- request -->
    <text class="rs-title" x="16" y="20">request (with please)</text>
    <text class="rs-label" x="16" y="53">direct</text>
    <rect class="rs-band" :x="auf1 - 10" y="26" :width="ende(o1) + 12 - auf1 + 10" height="44" rx="12" />
    <Chip t="“" :x="auf1" :y="32" />
    <Chip v-for="c in o1" :key="c.t" v-bind="c" :y="32" />

    <Arrow :x1="please.cx" :y1="68" :x2="asked1.cx + 6" :y2="124" :qx="please.cx - 40" :qy="112" k="grau" dash />
    <text class="rs-al k-grau" :x="please.cx + 12" y="94">please</text>
    <text class="rs-al k-grau" :x="please.cx + 12" y="110">→ asked</text>
    <text class="rs-al k-order" :x="to1.cx" y="113" text-anchor="middle">+ to</text>

    <text class="rs-label" x="16" y="149">reported</text>
    <rect class="rs-band" x="136" y="122" :width="ende(u1) + 14 - 136" height="44" rx="12" />
    <Chip v-for="c in u1" :key="c.t" v-bind="c" :y="128" />

    <!-- command -->
    <text class="rs-title" x="16" y="206">command (Don’t …)</text>
    <text class="rs-label" x="16" y="239">direct</text>
    <rect class="rs-band" :x="notTo.x - 30" y="212" :width="u2[4].r + 32 - notTo.x + 30" height="44" rx="12" />
    <Chip v-for="c in o2" :key="c.t" v-bind="c" :y="218" />

    <Arrow :x1="notTo.cx" :y1="254" :x2="notTo.cx" :y2="310" k="order" />
    <text class="rs-al k-order" :x="notTo.cx + 10" y="287">Don’t → not to</text>

    <text class="rs-label" x="16" y="335">reported</text>
    <rect class="rs-band" x="136" y="308" :width="ende(u2) + 14 - 136" height="44" rx="12" />
    <Chip v-for="c in u2" :key="c.t" v-bind="c" :y="314" />

    <!-- pattern -->
    <line class="rs-line" x1="16" y1="372" x2="584" y2="372" style="stroke-dasharray: 3 4" />
    <text class="rs-title" x="16" y="408">pattern</text>
    <Chip v-for="c in muster" :key="c.t" v-bind="c" :y="388" />
  </svg>
</template>
