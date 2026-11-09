<script setup>
// Backshift: Jede Zeitform geht einen Schritt in die Vergangenheit.
// Present perfect und past simple landen beide im past perfect.
import Arrow from '../parts/Arrow.vue'

const L = 150 // Mitte links
const R = 505 // Mitte rechts
const LW = 236
const RW = 262
const top = (i) => 66 + i * 62

const links = [
  { tense: 'present simple', a: '“I ', v: 'work', b: '.”' },
  { tense: 'present progressive', a: '“I ', v: 'am', b: ' working.”' },
  { tense: 'present perfect', a: '“I ', v: 'have', b: ' worked.”' },
  { tense: 'past simple', a: '“I ', v: 'worked', b: '.”' },
  { tense: 'past progressive', a: '“I ', v: 'was', b: ' working.”' },
  { tense: 'will-future', a: '“I ', v: 'will', b: ' work.”' },
  { tense: 'can · may · must', a: '“I ', v: 'can / may / must', b: ' work.”' },
]
const rechts = [
  { i: 0, tense: 'past simple', a: '… he ', v: 'worked', b: '' },
  { i: 1, tense: 'past progressive', a: '… he ', v: 'was', b: ' working' },
  { i: 2.5, tense: 'past perfect', a: '… he ', v: 'had', b: ' worked' },
  { i: 4, tense: 'past perfect progressive', a: '… he ', v: 'had been', b: ' working' },
  { i: 5, tense: 'would', a: '… he ', v: 'would', b: ' work' },
  { i: 6, tense: 'could · might · had to', a: '… he ', v: 'could / might / had to', b: ' work' },
]
const pfeile = [
  [0, 0], [1, 1], [2, 2.5], [3, 2.5], [4, 4], [5, 5], [6, 6],
]
const S = 7 // Zeile „bleibt gleich“
</script>

<template>
  <svg viewBox="0 0 660 560" role="img" aria-label="Backshift table as a picture. Present simple becomes past simple, present progressive becomes past progressive, present perfect and past simple both become past perfect, past progressive becomes past perfect progressive, will becomes would, can, may and must become could, might and had to. Past perfect, would, could, should and might stay the same.">
    <text class="rs-label" :x="L" y="22" text-anchor="middle">direct speech</text>
    <text class="rs-label" :x="R" y="22" text-anchor="middle">reported speech · He said (that) …</text>
    <text class="rs-al k-tense" x="328" y="46" text-anchor="middle">one step back</text>

    <g v-for="(z, i) in links" :key="'l' + i">
      <text class="rs-small" :x="L - LW / 2 + 4" :y="top(i) - 6">{{ z.tense }}</text>
      <rect class="rs-band" :x="L - LW / 2" :y="top(i)" :width="LW" height="34" rx="8" />
      <text :x="L" :y="top(i) + 17" dy="0.35em" text-anchor="middle" font-size="15">
        <tspan>{{ z.a }}</tspan><tspan class="rs-v">{{ z.v }}</tspan><tspan>{{ z.b }}</tspan>
      </text>
    </g>

    <g v-for="z in rechts" :key="'r' + z.i" class="rs-chip k-tense">
      <text class="rs-small" :x="R - RW / 2 + 4" :y="top(z.i) - 6">{{ z.tense }}</text>
      <rect :x="R - RW / 2" :y="top(z.i)" :width="RW" height="34" rx="8" />
      <text :x="R" :y="top(z.i) + 17" dy="0.35em" text-anchor="middle" style="fill: var(--vp-c-text-1); font-weight: 500">
        <tspan>{{ z.a }}</tspan><tspan class="rs-v">{{ z.v }}</tspan><tspan>{{ z.b }}</tspan>
      </text>
    </g>

    <Arrow
      v-for="[a, b] in pfeile"
      :key="a"
      :x1="L + LW / 2 + 6"
      :y1="top(a) + 17"
      :x2="R - RW / 2 - 6"
      :y2="top(b) + 17"
      k="tense"
    />

    <!-- stays the same -->
    <text class="rs-small" :x="L - LW / 2 + 4" :y="top(S) - 6">already “far back” – no step left</text>
    <rect class="rs-band" :x="L - LW / 2" :y="top(S)" :width="LW" height="34" rx="8" style="stroke-dasharray: 4 3" />
    <text :x="L" :y="top(S) + 17" dy="0.35em" text-anchor="middle" font-size="14">had done · would · could · might</text>
    <Arrow :x1="L + LW / 2 + 6" :y1="top(S) + 17" :x2="R - RW / 2 - 6" :y2="top(S) + 17" k="grau" dash />
    <rect class="rs-band" :x="R - RW / 2" :y="top(S)" :width="RW" height="34" rx="8" style="stroke-dasharray: 4 3" />
    <text :x="R" :y="top(S) + 17" dy="0.35em" text-anchor="middle" font-size="14">stay the same ✓</text>
  </svg>
</template>
