<script setup>
// Ein Wort als Kästchen. Lage über x (links) oder cx (Mitte).
import { computed } from 'vue'
import { chipW } from '../layout.js'

const p = defineProps({
  t: { type: String, default: '' },
  k: { type: String, default: 'n' },
  x: Number,
  cx: Number,
  y: { type: Number, required: true },
  w: Number,
  h: { type: Number, default: 32 },
  strike: Boolean,
  sub: String,
  subk: String,
})
const bw = computed(() => p.w ?? chipW(p.t, p.k))
const lx = computed(() => p.x ?? p.cx - bw.value / 2)
</script>

<template>
  <g :class="['rs-chip', 'k-' + k, { 'rs-strike': strike }]">
    <rect :x="lx" :y="y" :width="bw" :height="h" rx="8" />
    <text :x="lx + bw / 2" :y="y + h / 2" dy="0.35em" text-anchor="middle">{{ t }}</text>
    <line v-if="strike" class="rs-strike-line" :x1="lx + 3" :y1="y + h - 7" :x2="lx + bw - 3" :y2="y + 7" />
    <text v-if="sub" :class="['rs-sub', 'k-' + (subk || k)]" :x="lx + bw / 2" :y="y + h + 15" text-anchor="middle">{{ sub }}</text>
  </g>
</template>
