<script setup>
// Überblick: Was ändert sich, wenn Anna am Freitag erzählt, was Tom am Montag gesagt hat?
import Chip from '../parts/Chip.vue'
import Arrow from '../parts/Arrow.vue'
import Person from '../parts/Person.vue'
import Bubble from '../parts/Bubble.vue'
import { reihe, ende, chipW } from '../layout.js'

const unten = reihe(
  [
    { t: 'Tom', k: 'n' }, { t: 'said', k: 'rep' }, { t: '(that)', k: 'm' }, { t: 'he', k: 'pron' },
    { t: 'was', k: 'tense' }, { t: 'tired', k: 'n' }, { t: 'that day', k: 'time' }, { t: '.', k: 'n' },
  ],
  120,
)
const [, , , he, was, tired, day] = unten

const oben = [
  { t: 'I', k: 'pron', cx: he.cx },
  { t: 'am', k: 'tense', cx: was.cx },
  { t: 'tired', k: 'n', cx: tired.cx },
  { t: 'today', k: 'time', cx: day.cx },
]
const auf = he.cx - chipW('I', 'pron') / 2 - chipW('“') - 2
const zu = day.cx + chipW('today', 'time') / 2 + 2
const ob = { x: auf - 12, w: zu + chipW('.”') + 12 - (auf - 12) }
const ub = { x: 100, w: ende(unten) + 14 - 100 }
const pfeile = [
  { x: he.cx, k: 'pron' },
  { x: was.cx, k: 'tense' },
  { x: day.cx, k: 'time' },
]
</script>

<template>
  <svg viewBox="0 0 600 300" role="img" aria-label="Tom says on Monday: “I am tired today.” On Friday Anna reports: Tom said he was tired that day. Three things change: the pronoun I becomes he, the tense am becomes was, and the time word today becomes that day.">
    <!-- direct speech -->
    <Person :x="ob.x - 36" :y="94" k="tom" name="Tom" name2="on Monday" />
    <Bubble :x="ob.x" :y="28" :w="ob.w" :h="58" tail="left" label="direct speech" />
    <Chip t="“" :x="auf" :y="41" />
    <Chip v-for="c in oben" :key="c.t" v-bind="c" :y="41" />
    <Chip t=".”" :x="zu" :y="41" />

    <!-- what changes -->
    <Arrow v-for="p in pfeile" :key="p.k" :x1="p.x" :y1="78" :x2="p.x" :y2="203" :k="p.k" />
    <text class="rs-al k-pron" :x="he.cx - 9" :y="146" text-anchor="end">pronoun</text>
    <text class="rs-al k-tense" :x="was.cx + 9" :y="134">tense:</text>
    <text class="rs-al k-tense" :x="was.cx + 9" :y="150">one step back</text>
    <text class="rs-al k-time" :x="day.cx + 9" :y="146">time word</text>

    <!-- reported speech -->
    <Person :x="58" :y="258" k="anna" name="Anna" name2="on Friday" />
    <Bubble :x="ub.x" :y="194" :w="ub.w" :h="58" tail="left" label="reported speech" />
    <Chip v-for="c in unten" :key="c.t" v-bind="c" :y="207" />
  </svg>
</template>
