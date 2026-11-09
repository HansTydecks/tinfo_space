<script setup>
// Einfache Figur; y = Fußlinie.
defineProps({
  x: Number,
  y: Number,
  k: { type: String, default: 'grau' },
  name: String,
  name2: String,
  s: { type: Number, default: 1 },
})
</script>

<template>
  <g :class="['rs-person', 'k-' + k]">
    <circle :cx="x" :cy="y - 40 * s" :r="10 * s" />
    <path :d="`M${x - 15 * s} ${y} Q${x - 15 * s} ${y - 26 * s} ${x} ${y - 26 * s} Q${x + 15 * s} ${y - 26 * s} ${x + 15 * s} ${y} Z`" />
    <text v-if="name" class="rs-name" :x="x" :y="y + 15" text-anchor="middle">{{ name }}</text>
    <text v-if="name2" class="rs-name2" :x="x" :y="y + 28" text-anchor="middle">{{ name2 }}</text>
  </g>
</template>
