<script setup>
// Pronomen hängen davon ab, WER JETZT spricht – und mit wem.
import Chip from '../parts/Chip.vue'
import Person from '../parts/Person.vue'
import Bubble from '../parts/Bubble.vue'
import { reihe, ende } from '../layout.js'

const TOM = { sub: '= Tom', subk: 'tom' }
const ANNA = { sub: '= Anna', subk: 'anna' }

const zeilen = [
  {
    titel: '1 · Tom talks to Anna:',
    sprecher: { name: 'Tom', k: 'tom' },
    hoerer: { name: 'Anna', k: 'anna' },
    chips: [
      { t: '“', k: 'n' }, { t: 'I', k: 'pron', ...TOM }, { t: 'like', k: 'n' },
      { t: 'you', k: 'pron', ...ANNA }, { t: '.”', k: 'n' },
    ],
  },
  {
    titel: '2 · Later, Anna tells her mum:',
    sprecher: { name: 'Anna', k: 'anna' },
    hoerer: { name: 'Mum', k: 'grau' },
    chips: [
      { t: 'Tom', k: 'n' }, { t: 'said', k: 'rep' }, { t: 'he', k: 'pron', ...TOM },
      { t: 'liked', k: 'tense' }, { t: 'me', k: 'pron', ...ANNA }, { t: '.', k: 'n' },
    ],
  },
  {
    titel: '3 · Ben tells his friend Lisa:',
    sprecher: { name: 'Ben', k: 'grau' },
    hoerer: { name: 'Lisa', k: 'grau' },
    chips: [
      { t: 'Tom', k: 'n' }, { t: 'said', k: 'rep' }, { t: 'he', k: 'pron', ...TOM },
      { t: 'liked', k: 'tense' }, { t: 'her', k: 'pron', ...ANNA }, { t: '.', k: 'n' },
    ],
  },
].map((z, i) => {
  const y0 = 8 + i * 126
  const chips = reihe(z.chips, 110)
  return { ...z, y0, chips, bw: ende(chips) + 14 - 95 }
})
</script>

<template>
  <svg viewBox="0 0 470 390" role="img" aria-label="Three situations. Tom tells Anna: I like you – I is Tom, you is Anna. Anna tells her mum: Tom said he liked me – he is Tom, me is Anna. Ben tells Lisa: Tom said he liked her – he is Tom, her is Anna. The pronoun depends on who is speaking now.">
    <g v-for="z in zeilen" :key="z.titel">
      <text class="rs-title" x="20" :y="z.y0 + 14">{{ z.titel }}</text>
      <Person :x="50" :y="z.y0 + 102" v-bind="z.sprecher" />
      <Bubble :x="95" :y="z.y0 + 28" :w="z.bw" :h="70" tail="left" />
      <Chip v-for="c in z.chips" :key="c.t" v-bind="c" :y="z.y0 + 38" />
      <Person :x="95 + z.bw + 42" :y="z.y0 + 102" v-bind="z.hoerer" :s="0.85" />
    </g>
  </svg>
</template>
