<script setup>
// Sprechblase mit Schwanz links, rechts oder unten (bei tx).
import { computed } from 'vue'

const p = defineProps({
  x: Number, y: Number, w: Number, h: Number,
  tail: { type: String, default: 'left' },
  tx: Number,
  label: String,
})

const d = computed(() => {
  const { x, y, w, h } = p
  const r = 12
  const b = y + h
  const R = x + w
  let s = `M${x + r} ${y} H${R - r} Q${R} ${y} ${R} ${y + r}`
  if (p.tail === 'right') s += ` V${b - r - 12} L${R + 15} ${b - 2} L${R} ${b - r}`
  s += ` V${b - r} Q${R} ${b} ${R - r} ${b}`
  if (p.tail === 'bottom') s += ` H${p.tx + 9} L${p.tx - 2} ${b + 14} L${p.tx - 7} ${b}`
  s += ` H${x + r} Q${x} ${b} ${x} ${b - r}`
  if (p.tail === 'left') s += ` L${x - 15} ${b - 2} L${x} ${b - r - 12}`
  s += ` V${y + r} Q${x} ${y} ${x + r} ${y} Z`
  return s
})
</script>

<template>
  <g class="rs-bubble">
    <path :d="d" />
    <text v-if="label" class="rs-label" :x="x + 4" :y="y - 7">{{ label }}</text>
  </g>
</template>
