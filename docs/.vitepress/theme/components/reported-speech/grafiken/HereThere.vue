<script setup>
// here → there: „hier“ ist immer da, wo der Sprecher gerade ist.
import Chip from '../parts/Chip.vue'
import Person from '../parts/Person.vue'
import Bubble from '../parts/Bubble.vue'
import Arrow from '../parts/Arrow.vue'
import { reihe, ende } from '../layout.js'

const links = reihe(
  [{ t: '“', k: 'n' }, { t: 'I', k: 'pron' }, { t: 'love', k: 'tense' }, { t: 'it', k: 'n' }, { t: 'here', k: 'time' }, { t: '!”', k: 'n' }],
  50,
  5,
)
const rechts = reihe(
  [{ t: 'He', k: 'n' }, { t: 'said', k: 'rep' }, { t: 'he', k: 'pron' }, { t: 'loved', k: 'tense' }, { t: 'it', k: 'n' }, { t: 'there', k: 'time' }, { t: '.', k: 'n' }],
  362,
  4,
)
</script>

<template>
  <svg viewBox="0 0 680 240" role="img" aria-label="Tom is at the beach and says: I love it here! Two days later Anna is at school and reports: He said he loved it there. Here means where the speaker is. Anna is not at the beach, so she says there.">
    <!-- Strand -->
    <rect x="10" y="10" width="310" height="220" rx="12" style="fill: var(--rs-sky)" />
    <circle cx="290" cy="38" r="16" style="fill: var(--rs-sun)" />
    <path d="M10 182 H320 V218 Q320 230 308 230 H22 Q10 230 10 218 Z" style="fill: var(--rs-sand)" />
    <path d="M180 182 H320 V218 Q320 230 308 230 H200 Q190 205 180 182 Z" style="fill: var(--rs-sea)" />
    <path class="rs-line" d="M215 200 q8 -6 16 0 t16 0 M245 214 q8 -6 16 0 t16 0" style="stroke: var(--vp-c-bg)" />
    <Person :x="100" :y="184" k="tom" />
    <Bubble :x="38" :y="34" :w="ende(links) + 12 - 38" :h="54" tail="bottom" :tx="104" />
    <Chip v-for="c in links" :key="c.t" v-bind="c" :y="45" />
    <text class="rs-title" x="24" y="210">Tom at the beach</text>

    <!-- Schule -->
    <rect x="350" y="10" width="320" height="220" rx="12" style="fill: var(--rs-wall)" />
    <rect x="560" y="110" width="80" height="50" rx="4" class="rs-band" />
    <path class="rs-line" d="M600 110 V160 M560 135 H640" />
    <path d="M350 182 H670 V218 Q670 230 658 230 H362 Q350 230 350 218 Z" style="fill: var(--rs-wood)" />
    <Person :x="470" :y="184" k="anna" />
    <Bubble :x="352 - 2" :y="34" :w="ende(rechts) + 10 - 350" :h="54" tail="bottom" :tx="474" />
    <Chip v-for="c in rechts" :key="c.t + c.x" v-bind="c" :y="45" />
    <text class="rs-title" x="364" y="210" style="fill: #fff">Anna at school, two days later</text>

    <!-- Anna zeigt zum Strand -->
    <Arrow :x1="448" :y1="150" :x2="228" :y2="150" k="time" dash />
    <text class="rs-al k-time" x="338" y="140" text-anchor="middle">there = at the beach</text>
  </svg>
</template>
