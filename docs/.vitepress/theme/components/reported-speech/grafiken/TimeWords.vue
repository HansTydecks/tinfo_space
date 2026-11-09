<script setup>
// Zeitangaben: Tom spricht am Montag, Anna erzählt es am Freitag.
import Chip from '../parts/Chip.vue'
import Person from '../parts/Person.vue'
import Arrow from '../parts/Arrow.vue'

const tage = [
  { t: 'Sun', x: 80 }, { t: 'Mon', x: 210, b: true }, { t: 'Tue', x: 340 },
  { t: 'Fri', x: 500, b: true }, { t: 'Sat', x: 610 },
]
const AX = 150
const paare = [
  { x: 80, d: '“yesterday”', r: 'the day before' },
  { x: 210, d: '“today”', r: 'that day' },
  { x: 340, d: '“tomorrow”', r: 'the next day' },
]
</script>

<template>
  <svg viewBox="0 0 680 250" role="img" aria-label="A timeline. Tom speaks on Monday and says yesterday (Sunday), today (Monday) and tomorrow (Tuesday). Anna reports on Friday and says the day before, that day and the next day. From Friday, tomorrow would mean Saturday – that is wrong.">
    <!-- Achse mit Lücke für Mi/Do -->
    <path class="rs-line" :d="`M20 ${AX} H405 M435 ${AX} H660`" />
    <path class="rs-line" :d="`M401 ${AX + 8} L409 ${AX - 8} M431 ${AX + 8} L439 ${AX - 8}`" />
    <text class="rs-small" x="420" :y="AX + 24" text-anchor="middle">Wed · Thu</text>
    <polygon :points="`670,${AX} 660,${AX - 5} 660,${AX + 5}`" style="fill: var(--vp-c-text-3)" />
    <g v-for="d in tage" :key="d.t">
      <line class="rs-line" :x1="d.x" :y1="AX - 6" :x2="d.x" :y2="AX + 6" />
      <text :x="d.x" :y="AX + 24" text-anchor="middle" :font-weight="d.b ? 800 : 400" font-size="13">{{ d.t }}</text>
    </g>

    <!-- Tom am Montag -->
    <Person :x="210" :y="AX - 6" k="tom" />
    <text class="rs-name k-tom" x="232" :y="AX - 10">Tom</text>
    <line class="rs-dots" x1="80" y1="50" x2="80" :y2="AX - 8" />
    <line class="rs-dots" x1="210" y1="50" x2="210" y2="90" />
    <line class="rs-dots" x1="340" y1="50" x2="340" :y2="AX - 8" />
    <Chip v-for="p in paare" :key="p.d" :t="p.d" k="time" :cx="p.x" :y="16" />

    <!-- Anna am Freitag -->
    <Person :x="500" :y="AX - 6" k="anna" />
    <text class="rs-name k-anna" x="522" :y="AX - 10">Anna</text>
    <Chip v-for="p in paare" :key="p.r" :t="p.r" k="time" :cx="p.x" :y="AX + 42" />
    <text class="rs-al k-time" x="418" :y="AX + 63">◀ what Anna says on Friday</text>

    <!-- falsch: „tomorrow“ von Freitag aus -->
    <Chip t="tomorrow?" k="slot" :cx="610" :y="16" strike />
    <Arrow :x1="520" :y1="98" :x2="553" :y2="38" :qx="522" :qy="50" k="grau" dash />
    <line class="rs-dots" x1="610" y1="80" x2="610" :y2="AX - 8" />
    <text class="rs-small" x="610" y="68" text-anchor="middle">= Saturday · wrong</text>
  </svg>
</template>
